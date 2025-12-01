import type { Resume } from '@/lib/types';

import { SectionKey } from '@/lib/types';

export const defaultResume: Resume = {
  id: '1',
  title: 'New Resume',
  sections: [
    {
      key: SectionKey.ContactInfo,
      visible: true,
      data: {
        fullName: 'John Doe',
      },
    },
    {
      key: SectionKey.Summary,
      visible: true,
      data: {
        summary: '',
      },
    },
    {
      key: SectionKey.Experience,
      visible: true,
      data: [],
    },
    {
      key: SectionKey.Education,
      visible: true,
      data: [],
    },
    {
      key: SectionKey.Projects,
      visible: true,
      data: [],
    },
    {
      key: SectionKey.Certifications,
      visible: true,
      data: [],
    },
    {
      key: SectionKey.Courses,
      visible: true,
      data: [],
    },
    {
      key: SectionKey.Skills,
      visible: true,
      data: {
        skills: '',
      },
    },
  ],
};
