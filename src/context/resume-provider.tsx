import type {
  Resume,
  ResumeSection,
  SectionDataItem,
  SectionDataMap,
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

  function getSectionData<K extends SectionKey>(key: K) {
    const section = resume.sections.find((section) => section.key === key)!;

    return section.data as SectionDataMap[K];
  }

  function setSectionData<K extends SectionKey>(
    key: K,
    data: SectionDataMap[K],
  ) {
    const sections = resume.sections.map((section) => {
      if (section.key === key) {
        return {
          ...section,
          data,
        };
      }
      return section;
    });

    // @ts-ignore Typescript to infer types
    setSections(sections);
  }

  function setSectionVisibility<K extends SectionKey>(
    key: K,
    visible: boolean = false,
  ) {
    const sections = resume.sections.map((section) => {
      if (section.key === key) {
        return {
          ...section,
          visible,
        };
      }
      return section;
    });

    setSections(sections);
  }

  /* Items functions */
  function addSectionDataItem<K extends SectionKey>(
    key: K,
    item: SectionDataItem,
  ) {
    const sections = resume.sections.map((section) => {
      if (section.key === key && section.data instanceof Array) {
        return {
          ...section,
          data: [...section.data, item],
        };
      }
      return section;
    });

    // @ts-ignore Typescript to infer types
    setSections(sections);
  }

  function setSectionDataItemVisibility<K extends SectionKey>(
    key: K,
    itemId: string,
    visible: boolean,
  ) {
    const sections = resume.sections.map((section) => {
      if (section.key === key && section.data instanceof Array) {
        return {
          ...section,
          data: section.data.map((item) =>
            item.id === itemId
              ? {
                  ...item,
                  visible,
                }
              : item,
          ),
        };
      }
      return section;
    });

    // @ts-ignore Typescript to infer types
    setSections(sections);
  }

  function updateSectionDataItem(key: SectionKey, values: SectionDataItem) {
    const sections = resume.sections.map((section) => {
      if (section.key === key && section.data instanceof Array) {
        return {
          ...section,
          data: section.data.map((item) =>
            item.id === values.id
              ? {
                  ...item,
                  ...values,
                }
              : item,
          ),
        };
      }
      return section;
    });

    // @ts-ignore Typescript to infer types
    setSections(sections);
  }

  function removeSectionDataItem(key: SectionKey, itemId: string) {
    const sections = resume.sections.map((section) => {
      if (section.key === key && section.data instanceof Array) {
        return {
          ...section,
          data: section.data.filter((item) => item.id !== itemId),
        };
      }
      return section;
    });

    // @ts-ignore Typescript to infer types
    setSections(sections);
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
        setSections,
        getSectionData,
        setSectionData,
        setSectionVisibility,
        addSectionDataItem,
        updateSectionDataItem,
        setSectionDataItemVisibility,
        removeSectionDataItem,
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
  setSections: (sections: ResumeSection[]) => void;
  getSectionData: <K extends SectionKey>(key: K) => SectionDataMap[K];
  setSectionData: <K extends SectionKey>(
    key: K,
    data: SectionDataMap[K],
  ) => void;
  setSectionVisibility: (key: SectionKey, visibility: boolean) => void;
  addSectionDataItem: (key: SectionKey, item: SectionDataItem) => void;
  updateSectionDataItem: (key: SectionKey, values: SectionDataItem) => void;
  setSectionDataItemVisibility: (
    key: SectionKey,
    itemId: string,
    visible: boolean,
  ) => void;
  removeSectionDataItem: (key: SectionKey, itemId: string) => void;
};
