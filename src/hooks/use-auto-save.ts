import type { Resume } from '@/types/resume';

import { useRef } from 'react';

import { useUpdateResume } from '@/hooks/resume-actions';
import { useUpdateEffect } from '@/hooks/use-update-effect';

export function useAutoSave(resume: Resume) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const mutation = useUpdateResume({ resumeId: resume.id });

  useUpdateEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      mutation.mutate(resume);
    }, 500);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [resume]);

  return mutation;
}
