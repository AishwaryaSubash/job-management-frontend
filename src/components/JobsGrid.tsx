"use client";
import { SimpleGrid, Text, Center } from "@mantine/core";
import { JobCard } from "@/components/JobCard";
import { JobInterface } from "@/lib/types";
import { ErrorPage } from "@/app/ErrorPage";

export default function JobsGrid({ jobs }: { jobs: JobInterface[] }) {
  if (!jobs || jobs.length === 0) {
    return (
      <ErrorPage />
    );
  }

  return (
    <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="md">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </SimpleGrid>
  );
}
