import { z } from 'zod';

import { phoneNumberPattern } from '@/lib/regex';

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
  id: z.uuid(),
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
