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
} from '@/types';

export const IterableSectionKey = {
  Experience: 'experience',
  Education: 'education',
  Projects: 'projects',
  Certifications: 'certifications',
  Courses: 'courses',
} as const;
export type IterableSectionKey =
  (typeof IterableSectionKey)[keyof typeof IterableSectionKey];

export const StaticSectionKey = {
  ContactInfo: 'contact',
  Summary: 'summary',
  Skills: 'skills',
} as const;
export type StaticSectionKey =
  (typeof StaticSectionKey)[keyof typeof StaticSectionKey];

export const SectionKey = {
  ...StaticSectionKey,
  ...IterableSectionKey,
} as const;
export type SectionKey = (typeof SectionKey)[keyof typeof SectionKey];

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
  key: typeof StaticSectionKey.ContactInfo;
  data: SectionDataMap[typeof StaticSectionKey.ContactInfo];
}

interface SummarySection {
  key: typeof StaticSectionKey.Summary;
  data: SectionDataMap[typeof StaticSectionKey.Summary];
}

interface ExperienceSection {
  key: typeof IterableSectionKey.Experience;
  data: SectionDataMap[typeof IterableSectionKey.Experience];
}

interface EducationSection {
  key: typeof IterableSectionKey.Education;
  data: SectionDataMap[typeof IterableSectionKey.Education];
}

interface ProjectsSection {
  key: typeof IterableSectionKey.Projects;
  data: SectionDataMap[typeof IterableSectionKey.Projects];
}

interface CertificationsSection {
  key: typeof IterableSectionKey.Certifications;
  data: SectionDataMap[typeof IterableSectionKey.Certifications];
}

interface CoursesSection {
  key: typeof IterableSectionKey.Courses;
  data: SectionDataMap[typeof IterableSectionKey.Courses];
}

interface SkillsSection {
  key: typeof StaticSectionKey.Skills;
  data: SectionDataMap[typeof StaticSectionKey.Skills];
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
