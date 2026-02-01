import type { Icon } from '@phosphor-icons/react';

import {
  AddressBookIcon,
  ArchiveIcon,
  ArticleMediumIcon,
  BookBookmarkIcon,
  BooksIcon,
  BriefcaseIcon,
  CertificateIcon,
  FolderIcon,
  GraduationCapIcon,
  LightbulbIcon,
  MedalIcon,
  NewspaperClippingIcon,
  ScrollIcon,
} from '@phosphor-icons/react';

/* Treat this sections keys constants as enums to avoid typescript no erasable syntax */

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

export const SectionIconMap: Record<SectionKey, Icon> = {
  [SectionKey.ContactInfo]: AddressBookIcon,
  [SectionKey.Summary]: ArticleMediumIcon,
  [SectionKey.Experience]: BriefcaseIcon,
  [SectionKey.Education]: GraduationCapIcon,
  [SectionKey.Projects]: ArchiveIcon,
  [SectionKey.Certifications]: CertificateIcon,
  [SectionKey.Courses]: BooksIcon,
  [SectionKey.Skills]: LightbulbIcon,
} as const;

export const SectionItemIconMap: Record<IterableSectionKey, Icon> = {
  [IterableSectionKey.Experience]: NewspaperClippingIcon,
  [IterableSectionKey.Education]: ScrollIcon,
  [IterableSectionKey.Projects]: FolderIcon,
  [IterableSectionKey.Certifications]: MedalIcon,
  [IterableSectionKey.Courses]: BookBookmarkIcon,
} as const;
