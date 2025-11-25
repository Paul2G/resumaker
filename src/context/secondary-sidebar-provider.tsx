import type { SectionKey } from '@/lib/types';

import React, { createContext, useState } from 'react';

export const SecondarySidebarContext =
  createContext<SecondarySidebarProviderValue>({
    setSidebarContent: () => {},
    clearSidebarContent: () => {},
  });

export function SecondarySidebarProvider({
  children,
}: SecondarySidebarProviderProps) {
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
    <SecondarySidebarContext.Provider
      value={{
        selectedSectionKey,
        selectedItemId,
        setSidebarContent,
        clearSidebarContent,
      }}
    >
      {children}
    </SecondarySidebarContext.Provider>
  );
}

export type SecondarySidebarProviderProps = {
  children: React.ReactNode;
};

export type SecondarySidebarProviderValue = {
  selectedSectionKey?: SectionKey;
  selectedItemId?: string;
  setSidebarContent: (sectionKey: SectionKey, itemId?: string) => void;
  clearSidebarContent: () => void;
};
