import type { ResumeSection } from '@/types';

import { z } from 'zod';

import {
  appDataSchema,
  resumeConfigSchema,
  resumeIndexSchema,
} from '@/types/schemas';

export type ResumeConfig = z.infer<typeof resumeConfigSchema>;
export type ResumeIndex = z.infer<typeof resumeIndexSchema>;
export type AppData = z.infer<typeof appDataSchema>;

export type Resume = {
  id: string;
  version: string;
  config: ResumeConfig;
  sections: ResumeSection[];
};
