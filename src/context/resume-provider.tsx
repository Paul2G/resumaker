import type {
  ContactInfo,
  ExperienceItem,
  Resume,
  ResumeSection,
} from '@/lib/types';

import React, { createContext, useState } from 'react';

import { useUpdateEffect } from '@/hooks/use-update-effect';
import { SectionKey } from '@/lib/types';

export const ResumeContext = createContext<ResumeProviderValue>(undefined!);

export function ResumeProvider({
  currentResume,
  onSave,
  children,
}: ResumeProviderProps) {
  const [resume, setResume] = useState<Resume>(currentResume);

  /* Sections functions */

  function setSections(sections: ResumeSection[]) {
    setResume((prev) => ({
      ...prev,
      sections,
    }));
  }

  function getSectionData<T>(key: SectionKey): T {
    const section = resume.sections.find((section) => section.key === key)!;
    return section.data as T;
  }

  function setSectionData<T>(key: SectionKey, data: T) {
    const sections = resume.sections.map((section) => {
      if (section.key === key) {
        return {
          ...section,
          data,
        };
      }
      return section;
    });

    // @ts-ignore TS can't infer that sections is of type Resume['sections'], but you have to trust me on this one
    setResume((prev) => ({
      ...prev,
      sections,
    }));
  }

  /* Contact Info functions */

  function getContactInfo(): ContactInfo {
    return getSectionData<ContactInfo>(SectionKey.ContactInfo);
  }

  function setContactInfo(contactInfo: ContactInfo) {
    setSectionData(SectionKey.ContactInfo, contactInfo);
  }

  /* Summary functions */

  function getSummary(): string {
    return getSectionData<string>(SectionKey.Summary);
  }

  function setSummary(summary: string) {
    setSectionData(SectionKey.Summary, summary);
  }

  /* Experience functions */

  function setExperience(experience: ExperienceItem[]) {
    setSectionData(SectionKey.Experience, experience);
  }

  function addExperienceItem() {
    const experience = getSectionData<ExperienceItem[]>(SectionKey.Experience);
    experience.push({
      id: crypto.randomUUID(),
      jobTitle: 'New job',
      companyName: 'Generic company name',
    });

    setExperience(experience);
  }

  function updateExperienceItem(experienceItem: ExperienceItem) {
    const experience = getSectionData<ExperienceItem[]>(SectionKey.Experience);

    setExperience(
      experience.map((item) =>
        item.id === experienceItem.id ? { ...item, ...experienceItem } : item,
      ),
    );
  }

  function removeExperienceItem(id: string) {
    const experience = getSectionData<ExperienceItem[]>(SectionKey.Experience);

    setExperience(experience.filter((item) => item.id !== id));
  }

  /* Effects */

  useUpdateEffect(() => {
    setResume(currentResume);
  }, [currentResume]);

  useUpdateEffect(() => {
    onSave(resume);
  }, [resume]);

  return (
    <ResumeContext.Provider
      value={{
        ...resume,
        setSections,
        getContactInfo,
        setContactInfo,
        getSummary,
        setSummary,
        setExperience,
        addExperienceItem,
        updateExperienceItem,
        removeExperienceItem,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export type ResumeProviderProps = {
  currentResume: Resume;
  onSave: (resume: Resume) => void;
  children: React.ReactNode;
};

export type ResumeProviderValue = Resume & {
  /* Sections functions */
  setSections: (sections: ResumeSection[]) => void;
  /* Contact Info functions */
  getContactInfo: () => ContactInfo;
  setContactInfo: (contactInfo: ContactInfo) => void;
  /* Summary functions */
  getSummary: () => string;
  setSummary: (summary: string) => void;
  /* Experience functions */
  setExperience: (experience: ExperienceItem[]) => void;
  addExperienceItem: () => void;
  updateExperienceItem: (experienceItem: ExperienceItem) => void;
  removeExperienceItem: (id: string) => void;
};
