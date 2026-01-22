import React, { createContext, useState } from 'react';

import { SectionKey } from '@/lib/types';

export enum AuxSidebarOption {
  Sections = 'sections',
  //DocumentSettings = 'documentSettings',
}

export const SidebarsContentContext =
  createContext<SidebarsContentProviderValue>({
    selectedAuxSidebarOption: AuxSidebarOption.Sections,
    setAuxSidebarOption: () => {},
    setSidebarContent: () => {},
    clearSidebarContent: () => {},
  });

export function SidebarsContentProvider({
  children,
}: SidebarsContentProviderProps) {
  const [selectedAuxSidebarOption, setAuxSidebarOption] =
    useState<AuxSidebarOption>(AuxSidebarOption.Sections);
  const [selectedSectionKey, setSelectedSectionKey] = useState<SectionKey>();
  const [selectedItemId, setSelectedItemId] = useState<string>();

  function setSidebarContent(sectionKey: SectionKey, itemId?: string) {
    setSelectedSectionKey(sectionKey);
    setSelectedItemId(itemId);
  }

  function clearSidebarContent() {
    setSelectedSectionKey(undefined);
    setSelectedItemId(undefined);
  }

  return (
    <SidebarsContentContext.Provider
      value={{
        selectedAuxSidebarOption,
        selectedSectionKey,
        selectedItemId,
        setAuxSidebarOption,
        setSidebarContent,
        clearSidebarContent,
      }}
    >
      {children}
    </SidebarsContentContext.Provider>
  );
}

export type SidebarsContentProviderProps = {
  children: React.ReactNode;
};

export type SidebarsContentProviderValue = {
  selectedAuxSidebarOption: AuxSidebarOption;
  selectedSectionKey?: SectionKey;
  selectedItemId?: string;
  setAuxSidebarOption: (option: AuxSidebarOption) => void;
  setSidebarContent: (sectionKey: SectionKey, itemId?: string) => void;
  clearSidebarContent: () => void;
};
