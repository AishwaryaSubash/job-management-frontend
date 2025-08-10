"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { JobInterface } from "@/lib/types";
import JobsGrid from "@/components/JobsGrid";
import JobsSkeleton from "@/components/JobsSkeleton";

export default function JobsList({
  initialJobs,
}: {
  initialJobs: JobInterface[];
}) {
  const sp = useSearchParams();
  const [jobs, setJobs] = useState<JobInterface[]>(initialJobs);
  const [loading, setLoading] = useState(false);
  const initialQSRef = useRef<string | null>(null);

  const queryString = useMemo(() => {
    const params = new URLSearchParams();
    const search = sp.get("search");
    const location = sp.get("location");
    const jobType = sp.get("jobType");
    const salaryMin = sp.get("salaryMin");
    const salaryMax = sp.get("salaryMax");
    if (search) params.set("search", search);
    if (location) params.set("location", location);
    if (jobType) params.set("jobType", jobType);
    if (salaryMin) params.set("salaryMin", salaryMin);
    if (salaryMax) params.set("salaryMax", salaryMax);
    return params.toString();
  }, [sp]);

  useEffect(() => {
    if (initialQSRef.current === null) {
      initialQSRef.current = queryString;
    }
  }, [queryString]);

  useEffect(() => {
    if (initialQSRef.current === queryString) return;
    const controller = new AbortController();
    setLoading(true);
    
    const url = `/api/jobs${queryString ? `?${queryString}` : ""}`;
    fetch(url, { cache: "no-store", signal: controller.signal })
      .then((r) => r.json())
      .then((data: JobInterface[]) => {
        if (!controller.signal.aborted) setJobs(data);
      })
      .catch((e) => {
        if (e?.name !== "AbortError") {
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [queryString]);

  if (loading) {
    return (
      <div className="p-6">
        <JobsSkeleton />
      </div>
    );
  }

  return (
    <div className="p-6">
      <JobsGrid jobs={jobs} />
    </div>
  );
}
