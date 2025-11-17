import type { ExperienceItem, Resume } from '@/lib/types';

import React, { createContext, useState } from 'react';

import { useUpdateEffect } from '@/hooks/use-update-effect';

export const ResumeContext = createContext<ResumeProviderValue>(undefined!);

export function ResumeProvider({
  currentResume,
  onSave,
  children,
}: ResumeProviderProps) {
  const [resume, setResume] = useState<Resume>(currentResume);

  function setContactInfo(contactInfo: Resume['contactInfo']) {
    setResume((prev) => ({
      ...prev,
      contactInfo,
    }));
  }

  function setSummary(summary: Resume['summary']) {
    setResume((prev) => ({
      ...prev,
      summary,
    }));
  }

  function setExperience(experience: Resume['experience']) {
    setResume((prev) => ({
      ...prev,
      experience,
    }));
  }

  function addExperienceItem() {
    const id = crypto.randomUUID();

    setResume((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          id,
          jobTitle: 'New job',
          companyName: 'Generic company name',
        },
      ],
    }));
  }

  function updateExperienceItem(experienceItem: ExperienceItem) {
    setResume((prev) => ({
      ...prev,
      experience: prev.experience.map((item) =>
        item.id === experienceItem.id ? { ...item, ...experienceItem } : item,
      ),
    }));
  }

  function removeExperienceItem(id: string) {
    setResume((prev) => ({
      ...prev,
      experience: prev.experience.filter((item) => item.id !== id),
    }));
  }

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
        setContactInfo,
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
  setContactInfo: (contactInfo: Resume['contactInfo']) => void;
  setSummary: (summary: Resume['summary']) => void;
  setExperience: (experience: Resume['experience']) => void;
  addExperienceItem: () => void;
  updateExperienceItem: (resume: Resume['experience'][number]) => void;
  removeExperienceItem: (id: string) => void;
};
