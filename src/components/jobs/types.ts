export type JobsQuery = {
  search?: string;
  location?: string;
  jobType?: string | null;
  salaryMin?: number;
  salaryMax?: number;
};
