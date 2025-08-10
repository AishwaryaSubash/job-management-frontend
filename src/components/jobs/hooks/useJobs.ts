import { useEffect, useState } from "react";
import type { JobsQuery } from "../types";
import { JobInterface } from "@/lib/types";

export function useJobs(filters: JobsQuery) {
    const [jobs, setJobs] = useState<JobInterface[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchJobs = async () => {
            setLoading(true);
            setError(null);
            try {
                const params = new URLSearchParams();
                if (filters.search) params.set("search", filters.search);
                if (filters.location) params.set("location", filters.location);
                if (filters.jobType) params.set("jobType", filters.jobType);
                if (typeof filters.salaryMin === "number")
                    params.set("salaryMin", String(filters.salaryMin));
                if (typeof filters.salaryMax === "number")
                    params.set("salaryMax", String(filters.salaryMax));

                const res = await fetch(`/api/jobs?${params.toString()}`);
                if (!res.ok) throw new Error("Failed to fetch jobs");
                const data = await res.json();
                setJobs(data);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("Unknown error");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, [filters]);

    return { jobs, loading, error };
}
