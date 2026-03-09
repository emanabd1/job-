export type JobType = 'Full-time' | 'Part-time' | 'Contract' | 'Freelance' | 'Internship';
export type ExperienceLevel = 'Entry Level' | 'Mid Level' | 'Senior Level' | 'Lead' | 'Executive';

export interface Job {
  id: string;
  title: string;
  type: JobType;
  salary: number;
  description: string;
  company: string;
  logo: string;
  isBookMarked: boolean;
  location: string;
  experienceLevel: ExperienceLevel;
  currency: string;
  postedAt: string;
  category: string;
  requirements?: string[];
  benefits?: string[];
}

export interface FilterState {
  search: string;
  type: JobType[];
  experience: ExperienceLevel[];
  category: string[];
  location: string;
  salaryRange: [number, number];
  currency: string;
  timeRange: string;
}
