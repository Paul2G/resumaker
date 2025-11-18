import { z } from 'zod';

import {
  certificationSchema,
  contactInfoSchema,
  courseSchema,
  educationItemSchema,
  experienceItemSchema,
  projectSchema,
} from '@/lib/schemas';

export enum SectionKey {
  ContactInfo = 'contactInfo',
  Summary = 'summary',
  Experience = 'experience',
  Education = 'education',
  Projects = 'projects',
  Certifications = 'certifications',
  Courses = 'courses',
  Skills = 'skills',
}

export type ContactInfo = z.infer<typeof contactInfoSchema>;
export type ExperienceItem = z.infer<typeof experienceItemSchema>;
export type EducationItem = z.infer<typeof educationItemSchema>;
export type Project = z.infer<typeof projectSchema>;
export type Certification = z.infer<typeof certificationSchema>;
export type Course = z.infer<typeof courseSchema>;

export type AppData = {
  resumes: Resume[];
  version: string;
};

export type Resume = {
  id: string;
  title: string;
  sections: ResumeSection[];
};

interface ContactInfoSection {
  key: SectionKey.ContactInfo;
  data: ContactInfo;
}

interface SummarySection {
  key: SectionKey.Summary;
  data: string;
}

interface ExperienceSection {
  key: SectionKey.Experience;
  data: ExperienceItem[];
}

interface EducationSection {
  key: SectionKey.Education;
  data: EducationItem[];
}

interface ProjectsSection {
  key: SectionKey.Projects;
  data: Project[];
}

interface CertificationsSection {
  key: SectionKey.Certifications;
  data: Certification[];
}

interface CoursesSection {
  key: SectionKey.Courses;
  data: Course[];
}

interface SkillsSection {
  key: SectionKey.Skills;
  data: string;
}

export type ResumeSection = {
  key: SectionKey;
  visible: boolean;
} & (
  | ContactInfoSection
  | SummarySection
  | ExperienceSection
  | EducationSection
  | ProjectsSection
  | CertificationsSection
  | CoursesSection
  | SkillsSection
);
