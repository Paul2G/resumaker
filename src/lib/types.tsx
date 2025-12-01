import { z } from 'zod';

import {
  certificationSchema,
  contactInfoSchema,
  courseSchema,
  educationItemSchema,
  experienceItemSchema,
  projectSchema,
  skillsSchema,
  summarySchema,
} from '@/lib/schemas';

export enum IterableSectionKey {
  Experience = 'experience',
  Education = 'education',
  Projects = 'projects',
  Certifications = 'certifications',
  Courses = 'courses',
}

export enum StaticSectionKey {
  ContactInfo = 'contact',
  Summary = 'summary',
  Skills = 'skills',
}

export type SectionKey = IterableSectionKey | StaticSectionKey;
export const SectionKey = {
  ...StaticSectionKey,
  ...IterableSectionKey,
} as const;

export type ContactInfo = z.infer<typeof contactInfoSchema>;
export type Summary = z.infer<typeof summarySchema>;
export type Skills = z.infer<typeof skillsSchema>;
export type ExperienceItem = z.infer<typeof experienceItemSchema>;
export type EducationItem = z.infer<typeof educationItemSchema>;
export type Project = z.infer<typeof projectSchema>;
export type Certification = z.infer<typeof certificationSchema>;
export type Course = z.infer<typeof courseSchema>;

export type SectionDataMap = {
  [StaticSectionKey.ContactInfo]: ContactInfo;
  [StaticSectionKey.Summary]: Summary;
  [IterableSectionKey.Experience]: ExperienceItem[];
  [IterableSectionKey.Education]: EducationItem[];
  [IterableSectionKey.Projects]: Project[];
  [IterableSectionKey.Certifications]: Certification[];
  [IterableSectionKey.Courses]: Course[];
  [StaticSectionKey.Skills]: Skills;
};

interface ContactInfoSection {
  key: StaticSectionKey.ContactInfo;
  data: SectionDataMap[StaticSectionKey.ContactInfo];
}

interface SummarySection {
  key: StaticSectionKey.Summary;
  data: SectionDataMap[StaticSectionKey.Summary];
}

interface ExperienceSection {
  key: IterableSectionKey.Experience;
  data: SectionDataMap[IterableSectionKey.Experience];
}

interface EducationSection {
  key: IterableSectionKey.Education;
  data: SectionDataMap[IterableSectionKey.Education];
}

interface ProjectsSection {
  key: IterableSectionKey.Projects;
  data: SectionDataMap[IterableSectionKey.Projects];
}

interface CertificationsSection {
  key: IterableSectionKey.Certifications;
  data: SectionDataMap[IterableSectionKey.Certifications];
}

interface CoursesSection {
  key: IterableSectionKey.Courses;
  data: SectionDataMap[IterableSectionKey.Courses];
}

interface SkillsSection {
  key: StaticSectionKey.Skills;
  data: SectionDataMap[StaticSectionKey.Skills];
}

export type ResumeSection<K = SectionKey> = {
  key: K;
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

export type SectionDataItem =
  | EducationItem
  | ExperienceItem
  | Project
  | Course
  | Certification;

export type AppData = {
  resumes: Resume[];
  version: string;
};

export type Resume = {
  id: string;
  title: string;
  sections: ResumeSection[];
};
