import type { Resume } from '@/types';

import { useEffect, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';

import { updateResume } from '@/api/query-fns';

export function useAutoSave(resume: Resume) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const mutation = useMutation({
    mutationFn: (data: Resume) => updateResume(data),
  });

  useEffect(() => {
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
