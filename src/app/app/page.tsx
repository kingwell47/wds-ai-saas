import { Card, CardContent } from "@/components/ui/card";
import { db } from "@/drizzle/db";
import { JobInfoTable } from "@/drizzle/schema";
import { JobInfoForm } from "@/features/jobinfos/components/JobInfoForm";
import { getJobInfoUserTag } from "@/features/jobinfos/dbCache";
import { getCurrentUser } from "@/services/clerk/components/lib/getCurrentUser";
import { desc, eq } from "drizzle-orm";
import { Loader2Icon } from "lucide-react";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";
import { Suspense } from "react";

export default function AppPage() {
  return (
    <Suspense
      fallback={
        <div className='h-screen-header flex items-center justify-center'>
          <Loader2Icon className='size-24 animate-spin' />
        </div>
      }>
      <JobInfos />
    </Suspense>
  );
}

async function JobInfos() {
  const { userId, redirectToSignIn } = await getCurrentUser();

  if (userId == null) return redirectToSignIn();

  const jobInfos = await getJobInfos(userId);

  if (jobInfos.length === 0) {
    return <NoJobInfos />;
  }

  return null;
}

function NoJobInfos() {
  return (
    <div className='container my-4 max-w-5xl'>
      <h1 className='text-3xl md:text-4xl lg:text-5xl mb-4'>
        Welcome to Landr
      </h1>
      <p className='text-muted-foreground mb-8'>
        To get started, enter information about the type of job you are looking
        for. Landr will help you create a tailored resume and cover letter to
        increase your chances of landing the job. This information can be
        updated later as needed. You can add multiple job profiles to target
        different types of roles.
      </p>
      <Card>
        <CardContent>
          <JobInfoForm />
        </CardContent>
      </Card>
    </div>
  );
}

async function getJobInfos(userId: string) {
  "use cache";
  cacheTag(getJobInfoUserTag(userId));

  return db.query.JobInfoTable.findMany({
    where: eq(JobInfoTable.userId, userId),
    orderBy: desc(JobInfoTable.updatedAt),
  });
}
