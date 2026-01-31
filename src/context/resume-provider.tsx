import type {
  Resume,
  ResumeSection,
  SectionDataMap,
  SectionKey,
} from '@/lib/types';

import React, { createContext, useState } from 'react';
import { nanoid } from 'nanoid';

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

  async function setSections(sections: ResumeSection[]) {
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

  async function setSectionData<K extends SectionKey>(
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
    await setSections(sections);
  }

  async function setSectionVisibility<K extends SectionKey>(
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

    await setSections(sections);
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

  async function addSectionDataItem<K extends IterableSectionKey>(
    sectionKey: K,
    item: Omit<SectionDataMap[K][number], 'id'>,
  ) {
    const newItemId = nanoid(16);

    const sections = resume.sections.map((section) => {
      if (section.key === sectionKey && section.data instanceof Array) {
        return {
          ...section,
          data: [...section.data, { ...item, id: newItemId }],
        };
      }
      return section;
    });

    await setSections(sections);

    return newItemId;
  }

  async function setSectionDataItemVisibility(
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

    await setSections(sections);
  }

  async function updateSectionDataItem<K extends IterableSectionKey>(
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

    await setSections(sections);
  }

  async function removeSectionDataItem(
    sectionKey: IterableSectionKey,
    itemId: string,
  ) {
    const sections = resume.sections.map((section) => {
      if (section.key === sectionKey) {
        return {
          ...section,
          data: section.data.filter((item) => item.id !== itemId),
        };
      }
      return section;
    });

    await setSections(sections);
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
  setSections: (sections: ResumeSection[]) => Promise<void>;
  getSectionData: <K extends SectionKey>(sectionKey: K) => SectionDataMap[K];
  setSectionData: <K extends SectionKey>(
    sectionKey: K,
    data: SectionDataMap[K],
  ) => Promise<void>;
  setSectionVisibility: (
    sectionKey: SectionKey,
    visibility: boolean,
  ) => Promise<void>;
  getSectionDataItem: <K extends IterableSectionKey>(
    sectionKey: K,
    itemId?: string,
  ) => SectionDataMap[K][number] | null;
  addSectionDataItem: <K extends IterableSectionKey>(
    sectionKey: K,
    item: Omit<SectionDataMap[K][number], 'id'>,
  ) => Promise<string>;
  updateSectionDataItem: <K extends IterableSectionKey>(
    sectionKey: K,
    values: SectionDataMap[K][number],
  ) => Promise<void>;
  setSectionDataItemVisibility: (
    sectionKey: IterableSectionKey,
    itemId: string,
    visible: boolean,
  ) => Promise<void>;
  removeSectionDataItem: (
    sectionKey: IterableSectionKey,
    itemId: string,
  ) => Promise<void>;
};
