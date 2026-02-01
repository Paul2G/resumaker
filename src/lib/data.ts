import type { Resume } from '@/types';

import { CURRENT_RESUME_VERSION } from '@/constants/resume';
import { SectionKey } from '@/types';

export const defaultResume: Resume = {
  id: '1',
  version: CURRENT_RESUME_VERSION,
  config: {
    title: 'New resume',
    paperSize: 'a4',
    margin: 20,
    fontFamily: 'arial',
    language: '',
    fontSize: 0,
    titleSizeMultiplier: 0,
    sectionTitleSizeMultiplier: 0,
    itemTitleMultiplier: 0,
    sectionsGap: 0,
    itemsGap: 0,
    itemsTitleContentGap: 0,
    dateFormat: 'iso',
  },
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
        skills: [],
      },
    },
  ],
};
