export type JobType = 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'INTERNSHIP';

export interface CompanyInterface {
  id: string;
  name: string;
  logo: string;
}

export interface JobInterface {
  id: string;
  title: string;
  location: string;
  type: JobType;
  minSalary: number;
  maxSalary: number;
  description: string;
  requirements: string;
  responsibilities: string;
  deadline: string;
  companyId: string;
  updatedAt: string;
  company: CompanyInterface;
}
