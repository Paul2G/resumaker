import type { ResumeSection } from '@/types';

import { z } from 'zod';

import { resumeConfigSchema } from '@/types/schemas';

export type ResumeConfig = z.infer<typeof resumeConfigSchema>;

export type Resume = {
  id: string;
  version: string;
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
