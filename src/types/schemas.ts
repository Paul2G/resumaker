import { z } from 'zod';

import { phoneNumberPattern } from '@/lib/regex';
import { defaultProjectLocale, projectLocales } from '@/constants/locales';
import {
  resumeDateFormats,
  resumeFontFamilies,
  resumePaperSizes,
} from '@/constants/resume';

export const contactInfoSchema = z.object({
  fullName: z.string().min(1),
  emailAddress: z.email().optional(),
  phoneNumber: z
    .string()
    .regex(phoneNumberPattern, { message: 'Invalid phone number' })
    .optional(),
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
  name: z.string().min(1),
  language: z
    .literal(projectLocales.map((locale) => locale.key))
    .default(defaultProjectLocale.key),
  // paper Sheet format
  paperSize: z.literal(resumePaperSizes).default(resumePaperSizes[0]),
  margin: z.int().min(0).max(30),
  // Font related
  fontFamily: z.literal(resumeFontFamilies).default(resumeFontFamilies[0]),
  fontSize: z.int().min(6).max(18),
  titleSizeMultiplier: z.number().min(1).max(4),
  sectionTitleSizeMultiplier: z.number().min(1).max(3),
  itemTitleMultiplier: z.number().min(1).max(3),
  // Margins
  sectionsGap: z.int().min(0).max(18),
  itemsGap: z.number().min(0).max(12),
  itemsTitleContentGap: z.number().min(0).max(8),
  // Dates and durations
  dateFormat: z.literal(resumeDateFormats).default(resumeDateFormats[0]),
});
