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
  const [selectedSection, setSelectedSection] = useState<SectionKey>();

  const [selectedItem, setSelectedItem] = useState<string>();

  function setSidebarContent(sectionKey: SectionKey, itemId?: string) {
    setSelectedSection(sectionKey);
    setSelectedItem(itemId);
  }

  function clearSidebarContent() {
    setSelectedItem(undefined);
    setSelectedItem(undefined);
  }

  return (
    <SecondarySidebarContext.Provider
      value={{
        selectedSection,
        selectedItem,
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
  selectedSection?: SectionKey;
  selectedItem?: string;
  setSidebarContent: (sectionKey: SectionKey, itemId?: string) => void;
  clearSidebarContent: () => void;
};
