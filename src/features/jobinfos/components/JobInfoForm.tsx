"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

// Enum for experience levels
export enum JobExperienceLevel {
  Junior = "Junior",
  Mid = "Mid",
  Senior = "Senior",
  Lead = "Lead",
}

// Zod schema
const jobInfoSchema = z.object({
  name: z.string().min(1, "Name is required"),
  jobTitle: z.string().optional(),
  experienceLevel: z.nativeEnum(JobExperienceLevel).optional(),
  description: z.string().min(1, "Description is required"),
});

type JobInfoFormValues = z.infer<typeof jobInfoSchema>;

export function JobInfoForm() {
  const form = useForm<JobInfoFormValues>({
    resolver: zodResolver(jobInfoSchema),
    defaultValues: {
      name: "",
      jobTitle: "",
      experienceLevel: undefined,
      description: "",
    },
  });

  function onSubmit(values: JobInfoFormValues) {
    // handle submit
    // (no action/database code as requested)
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder='Enter name' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className={cn("flex flex-col gap-4", "lg:flex-row")}>
          <FormField
            control={form.control}
            name='jobTitle'
            render={({ field }) => (
              <FormItem className='flex-1'>
                <FormLabel>Job Title</FormLabel>
                <FormControl>
                  <Input placeholder='Enter job title' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='experienceLevel'
            render={({ field }) => (
              <FormItem className='flex-1'>
                <FormLabel>Experience Level</FormLabel>
                <FormControl>
                  <Select
                    value={field.value ?? ""}
                    onValueChange={(value) =>
                      field.onChange(value as JobExperienceLevel)
                    }>
                    <SelectTrigger>
                      <SelectValue placeholder='Select experience level' />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(JobExperienceLevel).map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder='Enter description' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  );
}
