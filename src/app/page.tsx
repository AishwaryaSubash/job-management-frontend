import { JobInterface } from "@/lib/types";
import AppHeader from "@/components/AppHeader";
import JobsFilterBar from "../components/filters/JobsFilterBar";
import JobsList from "@/components/JobsList";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
    location?: string;
    jobType?: string;
    salaryMin?: string;
    salaryMax?: string;
  }>;
}) {
  const sp = await searchParams;
  const params = new URLSearchParams();
  if (sp?.search) params.set("search", sp.search);
  if (sp?.location) params.set("location", sp.location);
  if (sp?.jobType) params.set("jobType", sp.jobType);
  if (sp?.salaryMin) params.set("salaryMin", sp.salaryMin);
  if (sp?.salaryMax) params.set("salaryMax", sp.salaryMax);

  const url = `${process.env.BACKEND_URL}/jobs${
    params.toString() ? `?${params.toString()}` : ""
  }`;
  const res = await fetch(url, { cache: "no-store" });
  const initialJobs: JobInterface[] = await res.json();

  return (
    <div>
      <AppHeader />
      <div className="px-6">
        <JobsFilterBar />
      </div>
      <JobsList initialJobs={initialJobs} />
    </div>
  );
}