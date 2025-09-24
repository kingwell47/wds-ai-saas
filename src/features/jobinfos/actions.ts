"use server";

import z from "zod";
import { jobInfoSchema } from "./schemas";
import { getCurrentUser } from "@/services/clerk/components/lib/getCurrentUser";
import { redirect } from "next/navigation";
import { insertJobInfo, updateJobInfo as updateJobInfoDb } from "./db";
import { JobInfoTable } from "@/drizzle/schema";
import { and, eq } from "drizzle-orm";
import { db } from "@/drizzle/db";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";
import { getJobInfoIdTag } from "./dbCache";

export async function createJobInfo(unsafeData: z.infer<typeof jobInfoSchema>) {
  const { userId } = await getCurrentUser();
  if (userId == null) {
    return {
      error: true,
      message: "You don't have permission to do this.",
    };
  }

  const { success, data } = jobInfoSchema.safeParse(unsafeData);
  if (!success) {
    return {
      error: true,
      message: "Invalid job data.",
    };
  }

  const jobInfo = await insertJobInfo({ ...data, userId });

  redirect(`/jobinfos/${jobInfo.id}`); // Redirect to the new job info page
}

export async function updateJobInfo(
  id: string,
  unsafeData: z.infer<typeof jobInfoSchema>
) {
  const { userId } = await getCurrentUser();
  if (userId == null) {
    return {
      error: true,
      message: "You don't have permission to do this.",
    };
  }

  const { success, data } = jobInfoSchema.safeParse(unsafeData);
  if (!success) {
    return {
      error: true,
      message: "Invalid job data.",
    };
  }

  const existingJobInfo = await getJobInfo(id, userId);

  if (existingJobInfo == null) {
    return {
      error: true,
      message: "You don't have permission to do this.",
    };
  }

  const jobInfo = await updateJobInfoDb(id, data);

  redirect(`/jobinfos/${jobInfo.id}`); // Redirect to the new job info page
}

async function getJobInfo(id: string, userId: string) {
  "use cache";
  cacheTag(getJobInfoIdTag(id));

  return await db.query.JobInfoTable.findFirst({
    where: and(eq(JobInfoTable.id, id), eq(JobInfoTable.userId, userId)),
    with: { user: true },
  });
}
