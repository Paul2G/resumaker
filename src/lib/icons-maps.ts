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
} from '@phosphor-icons/react';

import { IterableSectionKey, SectionKey } from '@/lib/types';

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
  [IterableSectionKey.Experience]: BriefcaseIcon,
  [IterableSectionKey.Education]: GraduationCapIcon,
  [IterableSectionKey.Projects]: FolderIcon,
  [IterableSectionKey.Certifications]: CertificateIcon,
  [IterableSectionKey.Courses]: BookBookmarkIcon,
} as const;
