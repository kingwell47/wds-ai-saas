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
  FormDescription,
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
import { jobInfoSchema } from "../schemas";
import { experienceLevels } from "@/drizzle/schema";
import { formatExperienceLevel } from "../lib/formatters";

type JobInfoFormValues = z.infer<typeof jobInfoSchema>;

export function JobInfoForm() {
  const form = useForm<JobInfoFormValues>({
    resolver: zodResolver(jobInfoSchema),
    defaultValues: {
      name: "",
      title: null,
      description: "",
      experienceLevel: "junior", // <-- use string literal to match schema
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
                <Input {...field} />
              </FormControl>
              <FormDescription>
                This is the name that will appear on the UI for easy
                identification.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className={cn("flex flex-col gap-4", "lg:flex-row")}>
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem className='flex-1'>
                <FormLabel>Job Title</FormLabel>
                <FormControl>
                  <Input {...field} value={field.value ?? ""} />
                </FormControl>
                <FormDescription>
                  Optional: Only enter if there is a specific job title you are
                  targeting.
                </FormDescription>
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
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className='w-full'>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(experienceLevels).map((level) => (
                        <SelectItem key={level} value={level}>
                          {formatExperienceLevel(level)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>
                  Select the experience level that best matches your target job.
                </FormDescription>
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
                <Textarea
                  placeholder='Describe the job requirements, responsibilities, and any other relevant  details...'
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Be as specific as possible to get the best results.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          disabled={form.formState.isSubmitting}
          type='submit'
          className='w-full'>
          Save Job Information
        </Button>
      </form>
    </Form>
  );
}
