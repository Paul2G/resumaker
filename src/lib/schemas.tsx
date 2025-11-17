import { z } from 'zod';

import { phoneNumberPattern } from '@/lib/regex.ts';

export const contactInfoSchema = z.object({
  fullName: z.string().min(1),
  emailAddress: z.email().optional(),
  phoneNumber: z
    .string()
    .regex(phoneNumberPattern, { message: 'Invalid phone number' })
    .optional(),
  address: z.string().optional(),
  linkedin: z.string().optional(),
  website: z.url().optional(),
});

export const experienceItemSchema = z.object({
  id: z.uuid(),
  jobTitle: z.string().min(1),
  companyName: z.string().min(1),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  isCurrentlyWorkingHere: z.boolean().optional(),
  jobDescription: z.string().optional(),
});

export const educationItemSchema = z.object({
  id: z.string(),
  qualification: z.string().min(1),
  institutionName: z.string().min(1).optional(),
  location: z.string().optional(),
  completionDate: z.date().optional(),
  minor: z.string().optional(),
  gpa: z.string().optional(),
  additional: z.string().optional(),
});

export const projectSchema = z.object({
  id: z.string(),
  projectName: z.string().min(1),
  organization: z.string().optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  description: z.string().optional(),
  link: z.url().optional(),
});

export const certificationSchema = z.object({
  id: z.string(),
  certificationName: z.string().min(1),
  organization: z.string().optional(),
  issueDate: z.date().optional(),
  expirationDate: z.date().optional(),
  credentialId: z.string().optional(),
  credentialUrl: z.url().optional(),
  description: z.string().optional(),
});

export const courseSchema = z.object({
  id: z.string(),
  courseName: z.string().min(1),
  organization: z.string().optional(),
  completionDate: z.date().optional(),
  description: z.string().optional(),
});
