import type { Resume } from '@/types/resume';

import { useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import { useUpdateEffect } from '@/hooks/use-update-effect';
import { resumeUpdateMutationOptions } from '@/api/query-options';

export function useAutoSave(resume: Resume) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const mutation = useMutation({
    ...resumeUpdateMutationOptions({ t, resumeId: resume.id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resumes'] });
    },
  });

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
