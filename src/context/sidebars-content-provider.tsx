import React, { createContext, useState } from 'react';

import { SectionKey } from '@/lib/types';

export enum AuxSidebarOption {
  Sections = 'sections',
  //DocumentSettings = 'documentSettings',
}

export const SidebarsContentContext =
  createContext<SidebarsContentProviderValue>({
    setSidebarContent: () => {},
    clearSidebarContent: () => {},
  });

export function SidebarsContentProvider({
  children,
}: SidebarsContentProviderProps) {
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
        selectedSectionKey,
        selectedItemId,
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
  selectedSectionKey?: SectionKey;
  selectedItemId?: string;
  setSidebarContent: (sectionKey: SectionKey, itemId?: string) => void;
  clearSidebarContent: () => void;
};
