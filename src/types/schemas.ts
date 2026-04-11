import { nanoid } from 'nanoid';
import { z } from 'zod';

import { phoneNumberPattern } from '@/lib/regex';
import { dateFormatsKeys } from '@/constants/dates';
import { locales } from '@/constants/locales';
import {
  CURRENT_RESUME_VERSION,
  resumeFontFamiliesKeys,
  resumePaperSizesKeys,
} from '@/constants/resume';
import { IterableSectionKey, StaticSectionKey } from '@/constants/sections';

/* Schemas related directly to forms */

export const contactInfoSchema = z.object({
  fullName: z.string().min(1),
  emailAddress: z.email().optional(),
  phoneNumber: z
    .string()
    .regex(phoneNumberPattern, { message: 'Invalid phone number' })
    .optional()
    .or(z.literal('')),
  address: z.string().optional(),
  linkedin: z.string().optional(),
  website: z.url().optional().or(z.literal('')),
});

export const summarySchema = z.object({
  summary: z.string().optional(),
});

export const skillsSchema = z.object({
  skills: z.array(z.string()),
});

export const experienceItemSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  organization: z.string().min(1),
  location: z.string().optional(),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
  isCurrentlyWorkingHere: z.boolean().optional(),
  description: z.array(z.string()).optional(),
  visible: z.boolean(),
});

export const educationItemSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  organization: z.string().min(1),
  location: z.string().optional(),
  completionDate: z.coerce.date().optional(),
  minor: z.string().optional(),
  gpa: z.string().optional(),
  description: z.array(z.string()).optional(),
  visible: z.boolean(),
});

export const projectSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  organization: z.string(),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
  description: z.array(z.string()).optional(),
  link: z.url().optional().or(z.literal('')),
  visible: z.boolean(),
});

export const certificationSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  organization: z.string(),
  issueDate: z.coerce.date().optional(),
  expirationDate: z.coerce.date().optional(),
  credentialId: z.string().optional(),
  credentialUrl: z.url().optional().or(z.literal('')),
  description: z.array(z.string()).optional(),
  visible: z.boolean(),
});

export const courseSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  organization: z.string(),
  completionDate: z.coerce.date().optional(),
  description: z.array(z.string()).optional(),
  visible: z.boolean(),
});

export const resumeConfigSchema = z.object({
  // General
  name: z.string().min(1),
  language: z.literal(locales),
  // paper Sheet format
  paperSize: z.literal(resumePaperSizesKeys),
  margin: z.int().min(0).max(30),
  // Font related
  fontFamily: z.literal(resumeFontFamiliesKeys),
  fontSize: z.number().min(6).max(18),
  titleSize: z.number().min(6).max(72),
  sectionTitleSize: z.number().min(6).max(48),
  itemTitleSize: z.number().min(6).max(36),
  // Margins
  sectionsGap: z.int().min(0).max(18),
  itemsGap: z.number().min(0).max(12),
  itemsTitleContentGap: z.number().min(0).max(8),
  // Dates and durations
  dateFormat: z.literal(dateFormatsKeys),
});

/* Schemas to validate the Resume as a whole */

export const contactSectionSchema = z.object({
  key: z.literal(StaticSectionKey.ContactInfo),
  visible: z.boolean(),
  data: contactInfoSchema,
});

export const summarySectionSchema = z.object({
  key: z.literal(StaticSectionKey.Summary),
  visible: z.boolean(),
  data: summarySchema,
});

export const skillsSectionSchema = z.object({
  key: z.literal(StaticSectionKey.Skills),
  visible: z.boolean(),
  data: skillsSchema,
});

// The iterable sections (arrays)
export const experienceSectionSchema = z.object({
  key: z.literal(IterableSectionKey.Experience),
  visible: z.boolean(),
  data: z.array(experienceItemSchema),
});

export const educationSectionSchema = z.object({
  key: z.literal(IterableSectionKey.Education),
  visible: z.boolean(),
  data: z.array(educationItemSchema),
});

export const projectsSectionSchema = z.object({
  key: z.literal(IterableSectionKey.Projects),
  visible: z.boolean(),
  data: z.array(projectSchema),
});

export const certificationsSectionSchema = z.object({
  key: z.literal(IterableSectionKey.Certifications),
  visible: z.boolean(),
  data: z.array(certificationSchema),
});

export const coursesSectionSchema = z.object({
  key: z.literal(IterableSectionKey.Courses),
  visible: z.boolean(),
  data: z.array(courseSchema),
});

export const resumeSectionSchema = z.discriminatedUnion('key', [
  contactSectionSchema,
  summarySectionSchema,
  skillsSectionSchema,
  experienceSectionSchema,
  educationSectionSchema,
  projectsSectionSchema,
  certificationsSectionSchema,
  coursesSectionSchema,
]);

// 3. The Final Resume Schema
export const resumeSchema = z.object({
  id: z.string(),
  // Use z.union for versions if you want to support both or just a string
  version: z.string().or(z.literal(CURRENT_RESUME_VERSION)),
  config: resumeConfigSchema,
  sections: z.array(resumeSectionSchema),
});

/* Schemas related to the app data and resume index, that are used to show the list of resumes and their metadata without loading the whole resume data */

export const resumeIndexSchema = z.object({
  id: z.string().length(12).catch(nanoid(12)),
  name: z.string().min(1).catch('New Resume'),
  createdAt: z.coerce.date().catch(new Date()),
  updatedAt: z.coerce.date().catch(new Date()),
});

export const appDataSchema = z.object({
  resumes: z.array(resumeIndexSchema),
  version: z.literal(['1.0.0', CURRENT_RESUME_VERSION]),
});

export const importResumeFileSchema = z.object({
  file: z.any(),
});

export const importResumeJsonSchema = z.object({
  json: z.string().trim().min(1, 'Please paste the JSON content.'),
});
