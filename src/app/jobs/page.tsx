import { JobInterface } from "@/lib/types";
import JobsGrid from "@/components/JobsGrid";

export default function JobsPage({ jobs }: { jobs: JobInterface[] }) {
  return (
    <div className="p-6">
      <JobsGrid jobs={jobs} />
    </div>
  );
}