import type {
  Resume,
  ResumeSection,
  SectionDataMap,
  SectionKey,
} from '@/lib/types';

import React, { createContext, useState } from 'react';

import { useUpdateEffect } from '@/hooks/use-update-effect';
import { IterableSectionKey } from '@/lib/types';

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

  function getSectionData<K extends SectionKey>(sectionKey: SectionKey) {
    const section = resume.sections.find(
      (section) => section.key === sectionKey,
    )!;

    return section.data as SectionDataMap[K];
  }

  function setSectionData<K extends SectionKey>(
    sectionKey: K,
    data: SectionDataMap[K],
  ) {
    const sections = resume.sections.map((section) => {
      if (section.key === sectionKey) {
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
    sectionKey: K,
    visible: boolean = false,
  ) {
    const sections = resume.sections.map((section) => {
      if (section.key === sectionKey) {
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

  function getSectionDataItem<K extends IterableSectionKey>(
    sectionKey: K,
    itemId?: string,
  ) {
    const section = resume.sections.find(
      (section) => section.key === sectionKey,
    );

    if (!(section?.data instanceof Array)) return null;

    const item = section.data.find((item) => item.id === itemId);

    if (!item) return null;

    return item as SectionDataMap[K][number];
  }

  function addSectionDataItem<K extends IterableSectionKey>(
    sectionKey: K,
    item: Omit<SectionDataMap[K][number], 'id'>,
  ) {
    const newItemId = crypto.randomUUID();

    const sections = resume.sections.map((section) => {
      if (section.key === sectionKey && section.data instanceof Array) {
        return {
          ...section,
          data: [...section.data, { ...item, id: newItemId }],
        };
      }
      return section;
    });

    setSections(sections);

    return newItemId;
  }

  function setSectionDataItemVisibility(
    sectionKey: IterableSectionKey,
    itemId: string,
    visible: boolean,
  ) {
    const sections = resume.sections.map((section) => {
      if (section.key === sectionKey) {
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

    setSections(sections);
  }

  function updateSectionDataItem<K extends IterableSectionKey>(
    sectionKey: K,
    values: SectionDataMap[K][number],
  ) {
    const sections = resume.sections.map((section) => {
      if (section.key === sectionKey && section.data instanceof Array) {
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

    setSections(sections);
  }

  function removeSectionDataItem(
    sectionKey: IterableSectionKey,
    itemId: string,
  ) {
    const sections = resume.sections.map((section) => {
      if (section.key === sectionKey && section.data instanceof Array) {
        return {
          ...section,
          data: section.data.filter((item) => item.id !== itemId),
        };
      }
      return section;
    });

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
        getSectionDataItem,
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
  getSectionData: <K extends SectionKey>(sectionKey: K) => SectionDataMap[K];
  setSectionData: <K extends SectionKey>(
    sectionKey: K,
    data: SectionDataMap[K],
  ) => void;
  setSectionVisibility: (sectionKey: SectionKey, visibility: boolean) => void;
  getSectionDataItem: <K extends IterableSectionKey>(
    sectionKey: K,
    itemId?: string,
  ) => SectionDataMap[K][number] | null;
  addSectionDataItem: <K extends IterableSectionKey>(
    sectionKey: K,
    item: Omit<SectionDataMap[K][number], 'id'>,
  ) => string;
  updateSectionDataItem: <K extends IterableSectionKey>(
    sectionKey: K,
    values: SectionDataMap[K][number],
  ) => void;
  setSectionDataItemVisibility: (
    sectionKey: IterableSectionKey,
    itemId: string,
    visible: boolean,
  ) => void;
  removeSectionDataItem: (
    sectionKey: IterableSectionKey,
    itemId: string,
  ) => void;
};
