import { useContext } from 'react';

import { SecondarySidebarContext } from '@/context/secondary-sidebar-provider';

export function useSecondarySidebar() {
  const context = useContext(SecondarySidebarContext);

  if (!context) {
    throw new Error(
      'useSecondarySidebar must be used within a SecondarySidebarProvider',
    );
  }

  return context;
}
