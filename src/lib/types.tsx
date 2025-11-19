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

export type SectionDataMap = {
  [SectionKey.ContactInfo]: ContactInfo;
  [SectionKey.Summary]: string;
  [SectionKey.Experience]: ExperienceItem[];
  [SectionKey.Education]: EducationItem[];
  [SectionKey.Projects]: Project[];
  [SectionKey.Certifications]: Certification[];
  [SectionKey.Courses]: Course[];
  [SectionKey.Skills]: string;
};

export type SectionDataItem =
  | ExperienceItem
  | EducationItem
  | Project
  | Certification
  | Course;

interface ContactInfoSection {
  key: SectionKey.ContactInfo;
  data: SectionDataMap[SectionKey.ContactInfo];
}

interface SummarySection {
  key: SectionKey.Summary;
  data: SectionDataMap[SectionKey.Summary];
}

interface ExperienceSection {
  key: SectionKey.Experience;
  data: SectionDataMap[SectionKey.Experience];
}

interface EducationSection {
  key: SectionKey.Education;
  data: SectionDataMap[SectionKey.Education];
}

interface ProjectsSection {
  key: SectionKey.Projects;
  data: SectionDataMap[SectionKey.Projects];
}

interface CertificationsSection {
  key: SectionKey.Certifications;
  data: SectionDataMap[SectionKey.Certifications];
}

interface CoursesSection {
  key: SectionKey.Courses;
  data: SectionDataMap[SectionKey.Courses];
}

interface SkillsSection {
  key: SectionKey.Skills;
  data: SectionDataMap[SectionKey.Skills];
}

export type ResumeSection = {
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

export type AppData = {
  resumes: Resume[];
  version: string;
};

export type Resume = {
  id: string;
  title: string;
  sections: ResumeSection[];
};
