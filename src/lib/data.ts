import type { Resume, ResumeSection } from '@/lib/types';

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
      data: '',
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
      data: '',
    },
  ],
};

export const ns: ResumeSection = {
  key: SectionKey.Experience,
  visible: true,
  data: [
    {
      id: 'a',
      organization: '',
      credentialId: '',
      gpa: '1',
    },
  ],
};

defaultResume.sections.map((section) => {
  if (section.key === SectionKey.ContactInfo) {
    console.log(section.data);
  }
});
