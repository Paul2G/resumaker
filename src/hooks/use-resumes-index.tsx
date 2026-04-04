import { useContext } from 'react';

import { ResumesIndexContext } from '@/contexts/resumes-indexes-provider';

export function useResumesIndex() {
  const context = useContext(ResumesIndexContext);

  if (!context) {
    throw new Error(
      'useResumesIndex must be used within a ResumesIndexContext',
    );
  }

  return context;
}
