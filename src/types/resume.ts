import { z } from 'zod';

import {
  appDataSchema,
  certificationSchema,
  certificationsSectionSchema,
  contactInfoSchema,
  contactSectionSchema,
  courseSchema,
  coursesSectionSchema,
  educationItemSchema,
  educationSectionSchema,
  experienceItemSchema,
  experienceSectionSchema,
  projectSchema,
  projectsSectionSchema,
  resumeConfigSchema,
  resumeIndexSchema,
  resumeSchema,
  resumeSectionSchema,
  skillsSchema,
  skillsSectionSchema,
  summarySchema,
  summarySectionSchema,
} from '@/types/schemas';

export type ContactInfo = z.infer<typeof contactInfoSchema>;
export type Summary = z.infer<typeof summarySchema>;
export type Skills = z.infer<typeof skillsSchema>;
export type ExperienceItem = z.infer<typeof experienceItemSchema>;
export type EducationItem = z.infer<typeof educationItemSchema>;
export type Project = z.infer<typeof projectSchema>;
export type Certification = z.infer<typeof certificationSchema>;
export type Course = z.infer<typeof courseSchema>;

export type ContactSection = z.infer<typeof contactSectionSchema>;
export type SummarySection = z.infer<typeof summarySectionSchema>;
export type SkillsSection = z.infer<typeof skillsSectionSchema>;
export type ExperienceSection = z.infer<typeof experienceSectionSchema>;
export type EducationSection = z.infer<typeof educationSectionSchema>;
export type ProjectsSection = z.infer<typeof projectsSectionSchema>;
export type CertificationsSection = z.infer<typeof certificationsSectionSchema>;
export type CoursesSection = z.infer<typeof coursesSectionSchema>;

export type ResumeSection = z.infer<typeof resumeSectionSchema>;

export type ResumeConfig = z.infer<typeof resumeConfigSchema>;
export type ResumeIndex = z.infer<typeof resumeIndexSchema>;
export type AppData = z.infer<typeof appDataSchema>;

export type Resume = z.infer<typeof resumeSchema>;
