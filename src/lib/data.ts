import type { Resume } from '@/lib/types';

import { IterableSectionKey, StaticSectionKey } from '@/lib/types';

export const defaultResume: Resume = {
  id: '1',
  title: 'New Resume',
  sections: [
    {
      key: StaticSectionKey.ContactInfo,
      visible: true,
      data: {
        fullName: 'John Doe',
      },
    },
    {
      key: StaticSectionKey.Summary,
      visible: true,
      data: '',
    },
    {
      key: IterableSectionKey.Experience,
      visible: true,
      data: [],
    },
    {
      key: IterableSectionKey.Education,
      visible: true,
      data: [],
    },
    {
      key: IterableSectionKey.Projects,
      visible: true,
      data: [],
    },
    {
      key: IterableSectionKey.Certifications,
      visible: true,
      data: [],
    },
    {
      key: IterableSectionKey.Courses,
      visible: true,
      data: [],
    },
    {
      key: StaticSectionKey.Skills,
      visible: true,
      data: '',
    },
  ],
};
