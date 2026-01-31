import type { ResumeSection } from '@/types';

export type ResumeConfig = {
  pageSize: 'A4' | 'Letter';
  margin: number;
  font: 'Arial' | 'Times New Roman' | 'Calibri' | 'Georgia';
};
export type Resume = {
  id: string;
  name: string;
  config: ResumeConfig;
  sections: ResumeSection[];
};

export type ResumeIndex = {
  id: string;
  name: string;
};

export type AppData = {
  resumes: ResumeIndex[];
  selectedResumeId?: string;
  version?: string;
};
