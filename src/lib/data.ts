import type { Resume } from '@/types';

import { dateFormats } from '@/constants/dates';
import { defaultProjectLocale } from '@/constants/locales';
import {
  CURRENT_RESUME_VERSION,
  resumeFontFamilies,
  resumePaperSizes,
} from '@/constants/resume';
import { SectionKey } from '@/constants/sections';

export const defaultResume: Resume = {
  id: '1',
  version: CURRENT_RESUME_VERSION,
  config: {
    name: 'My resume',
    language: defaultProjectLocale.key,
    // paper Sheet format
    paperSize: resumePaperSizes[0],
    margin: 15, //mm
    // Font related
    fontFamily: resumeFontFamilies[0],
    fontSize: 8, //pt
    titleSizeMultiplier: 2, // x
    sectionTitleSizeMultiplier: 1.5, // x
    itemTitleMultiplier: 1.1, // x
    // Margins
    sectionsGap: 5, //mm
    itemsGap: 3, //mm
    itemsTitleContentGap: 2, //mm
    // Dates and durations
    dateFormat: dateFormats[0],
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
