import { JobType } from "@/lib/types";

export type Option = { label: string; value: string };

export interface JobFormValues {
  jobTitle: string;
  companyName: string;
  location: string;
  jobType: string | null; 
  salaryMin: number;
  salaryMax: number;
  applicationDeadline: Date | null;
  description: string;
}

export const JOB_TYPE_OPTIONS: Option[] = [
  { label: "Full-time", value: "FULL_TIME" satisfies JobType },
  { label: "Part-time", value: "PART_TIME" satisfies JobType },
  { label: "Contract", value: "CONTRACT" satisfies JobType },
  { label: "Internship", value: "INTERNSHIP" satisfies JobType },
];
