"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import type { JobsQuery } from "./types";

export function useJobsQuery(): [JobsQuery, (q: JobsQuery) => void] {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const current = useMemo<JobsQuery>(() => {
    const salaryMin = sp.get("salaryMin");
    const salaryMax = sp.get("salaryMax");
    return {
      search: sp.get("search") ?? undefined,
      location: sp.get("location") ?? undefined,
      jobType: sp.get("jobType") ?? undefined,
      salaryMin: salaryMin ? Number(salaryMin) : undefined,
      salaryMax: salaryMax ? Number(salaryMax) : undefined,
    };
  }, [sp]);

  const set = (q: JobsQuery) => {
    const params = new URLSearchParams();
    if (q.search) params.set("search", q.search);
    if (q.location) params.set("location", q.location);
    if (q.jobType) params.set("jobType", q.jobType);
    if (typeof q.salaryMin === "number")
      params.set("salaryMin", String(q.salaryMin));
    if (typeof q.salaryMax === "number")
      params.set("salaryMax", String(q.salaryMax));
    const url = `${pathname}${
      params.toString() ? `?${params.toString()}` : ""
    }`;
    router.replace(url as any);
  };

  return [current, set];
}
