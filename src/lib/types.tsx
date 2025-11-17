import { z } from 'zod';

import {
  certificationSchema,
  contactInfoSchema,
  courseSchema,
  educationItemSchema,
  experienceItemSchema,
  projectSchema,
} from '@/lib/schemas';

export type AppData = {
  resumes: Resume[];
  version: string;
};

export type Resume = {
  id: string;
  title: string;
  summary?: string;
  sectionsOrder: Array<SectionType>;
  contactInfo: ContactInfo;
  experience: ExperienceItem[];
  education: EducationItem[];
  projects: Project[];
  certifications: Certification[];
  courses: Course[];
  skills?: string;
};

export type ContactInfo = z.infer<typeof contactInfoSchema>;
export type ExperienceItem = z.infer<typeof experienceItemSchema>;
export type EducationItem = z.infer<typeof educationItemSchema>;
export type Project = z.infer<typeof projectSchema>;
export type Certification = z.infer<typeof certificationSchema>;
export type Course = z.infer<typeof courseSchema>;

export type SectionType =
  | 'contactInfo'
  | 'experience'
  | 'education'
  | 'projects'
  | 'certifications'
  | 'courses';
