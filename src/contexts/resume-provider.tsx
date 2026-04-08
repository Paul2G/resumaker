import type { IterableSectionKey, SectionKey } from '@/constants/sections';
import type { Resume, ResumeConfig, ResumeSection } from '@/types/resume';

import { createContext, useState } from 'react';
import { nanoid } from 'nanoid';

import { useUpdateEffect } from '@/hooks/use-update-effect';

// Helper to extract the 'data' type for a specific key from the ResumeSection union
type DataByKey<K extends SectionKey> = Extract<
  ResumeSection,
  { key: K }
>['data'];

export const ResumeContext = createContext<ResumeProviderValue>(undefined!);

export function ResumeProvider({
  currentResume,
  children,
}: ResumeProviderProps) {
  const [resume, setResume] = useState<Resume>(currentResume);

  const setConfig = async (config: Partial<ResumeConfig>) => {
    setResume((prev) => ({
      ...prev,
      config: { ...prev.config, ...config },
    }));
  };

  /* Sections functions */

  const setSections = async (sections: ResumeSection[]) => {
    setResume((prev) => ({ ...prev, sections }));
  };

  function getSectionData<K extends SectionKey>(sectionKey: K): DataByKey<K> {
    const section = resume.sections.find((s) => s.key === sectionKey);
    if (!section) throw new Error(`Section ${sectionKey} not found`);

    return section.data as DataByKey<K>;
  }

  const setSectionData = async <K extends SectionKey>(
    sectionKey: K,
    data: DataByKey<K>,
  ) => {
    setResume((prev) => ({
      ...prev,
      sections: prev.sections.map((s) =>
        s.key === sectionKey ? ({ ...s, data } as ResumeSection) : s,
      ),
    }));
  };

  const setSectionVisibility = async (
    sectionKey: SectionKey,
    visible: boolean = false,
  ) => {
    setResume((prev) => ({
      ...prev,
      sections: prev.sections.map((s) =>
        s.key === sectionKey ? ({ ...s, visible } as ResumeSection) : s,
      ),
    }));
  };

  /* Items (Iterable) functions */

  function getSectionDataItem<K extends IterableSectionKey>(
    sectionKey: K,
    itemId?: string,
  ): DataByKey<K> extends Array<infer I> ? I | null : null {
    const section = resume.sections.find((s) => s.key === sectionKey);

    // 1. Logic: If no section or data isn't an array, return null
    if (!section || !Array.isArray(section.data)) {
      return null as any;
    }

    // 2. Logic: Find the item
    const item = section.data.find((i: any) => i.id === itemId);

    // 3. Cast the final result to the expected conditional return type
    return (item || null) as DataByKey<K> extends Array<infer I>
      ? I | null
      : null;
  }

  const addSectionDataItem = async <K extends IterableSectionKey>(
    sectionKey: K,
    item: DataByKey<K> extends Array<infer I> ? Omit<I, 'id'> : never,
  ) => {
    const newItemId = nanoid(12);

    setResume((prev) => ({
      ...prev,
      sections: prev.sections.map((s) => {
        if (s.key === sectionKey && Array.isArray(s.data)) {
          return {
            ...s,
            data: [...s.data, { ...item, id: newItemId }],
          } as ResumeSection;
        }
        return s;
      }),
    }));

    return newItemId;
  };

  const setSectionDataItemVisibility = async (
    sectionKey: IterableSectionKey,
    itemId: string,
    visible: boolean,
  ) => {
    setResume((prev) => ({
      ...prev,
      sections: prev.sections.map((s) => {
        if (s.key === sectionKey && Array.isArray(s.data)) {
          return {
            ...s,
            data: s.data.map((item: any) =>
              item.id === itemId ? { ...item, visible } : item,
            ),
          } as ResumeSection;
        }
        return s;
      }),
    }));
  };

  const updateSectionDataItem = async <K extends IterableSectionKey>(
    sectionKey: K,
    values: DataByKey<K> extends Array<infer I extends { id: string }>
      ? I
      : never,
  ) => {
    setResume((prev) => ({
      ...prev,
      sections: prev.sections.map((s) => {
        if (s.key === sectionKey && Array.isArray(s.data)) {
          return {
            ...s,
            data: s.data.map((item: any) =>
              item.id === values.id ? { ...item, ...values } : item,
            ),
          } as ResumeSection;
        }
        return s;
      }),
    }));
  };

  const removeSectionDataItem = async (
    sectionKey: IterableSectionKey,
    itemId: string,
  ) => {
    setResume((prev) => ({
      ...prev,
      sections: prev.sections.map((s) => {
        if (s.key === sectionKey && Array.isArray(s.data)) {
          return {
            ...s,
            data: s.data.filter((item: any) => item.id !== itemId),
          } as ResumeSection;
        }
        return s;
      }),
    }));
  };

  useUpdateEffect(() => {
    setResume(currentResume);
  }, [currentResume]);

  return (
    <ResumeContext.Provider
      value={{
        resume,
        setConfig,
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

// Updated Value type to reflect the removal of SectionDataMap
export type ResumeProviderValue = {
  resume: Resume;
  setConfig: (config: Partial<ResumeConfig>) => Promise<void>;
  setSections: (sections: ResumeSection[]) => Promise<void>;
  getSectionData: <K extends SectionKey>(sectionKey: K) => DataByKey<K>;
  setSectionData: <K extends SectionKey>(
    sectionKey: K,
    data: DataByKey<K>,
  ) => Promise<void>;
  setSectionVisibility: (
    sectionKey: SectionKey,
    visibility: boolean,
  ) => Promise<void>;
  getSectionDataItem: <K extends IterableSectionKey>(
    sectionKey: K,
    itemId?: string,
  ) => DataByKey<K> extends Array<infer I> ? I | null : null;
  addSectionDataItem: <K extends IterableSectionKey>(
    sectionKey: K,
    item: any,
  ) => Promise<string>;
  updateSectionDataItem: <K extends IterableSectionKey>(
    sectionKey: K,
    values: any,
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

export type ResumeProviderProps = {
  currentResume: Resume;
  children: React.ReactNode;
};
