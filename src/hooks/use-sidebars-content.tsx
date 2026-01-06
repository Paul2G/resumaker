import { useContext } from 'react';

import { SidebarsContentContext } from '@/context/sidebars-content-provider';

export function useSidebarsContent() {
  const context = useContext(SidebarsContentContext);

  if (!context) {
    throw new Error(
      'useSidebarsContent must be used within a SidebarsContentProvider',
    );
  }

  return context;
}
