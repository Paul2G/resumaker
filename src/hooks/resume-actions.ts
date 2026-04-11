import type { Resume } from '@/types/resume';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { NotOkResponseError } from '@/lib/errors';
import {
  createResume,
  deleteResume,
  importResume,
  updateResume,
} from '@/api/query-fns';

export function useCreateResume({
  onSuccess = () => {},
}: { onSuccess?: (resumeId: string) => void } = {}) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ['resumeCreate'],
    mutationFn: (resume: Resume) => createResume(resume),
    onError: (e) => {
      if (e instanceof NotOkResponseError) {
        toast.error(t(`statusCodes:${e.status}.short`), {
          description: e.detail,
        });
      } else {
        toast.error(t('dialogs.createNewResume.wasNotCreated'));
      }
    },
    onSuccess: (resumeId) => {
      onSuccess(resumeId);
      toast.success(t('dialogs.createNewResume.wasCreated'));
      navigate({ to: '/resumes/$resumeId', params: { resumeId } });
    },
  });
}

export function useUpdateResume({ resumeId }: { resumeId: string }) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['resumeUpdate', resumeId],
    mutationFn: (resume: Resume) => updateResume(resume),
    onError: (e) => {
      if (e instanceof NotOkResponseError) {
        toast.error(t(`statusCodes:${e.status}.short`), {
          description: e.detail,
        });
      } else {
        toast.error(t('dialogs.unableToHandleAction'));
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resumes'] });
    },
  });
}

export function useDeleteResume({ resumeId }: { resumeId: string }) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['resumeDelete', resumeId],
    mutationFn: () => deleteResume(resumeId),
    onError: (e) => {
      if (e instanceof NotOkResponseError) {
        toast.error(t(`statusCodes:${e.status}.short`), {
          description: e.detail,
        });
      } else {
        toast.error(t('dialogs.deleteResume.wasNotDeleted'));
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resumes'] });
      toast.success(t('dialogs.deleteResume.wasDeleted'));
    },
  });
}

export function useImportResume({
  onSuccess = () => {},
}: { onSuccess?: (resumeId: string) => void } = {}) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ['resumeImport'],
    mutationFn: (resume: unknown) => importResume(resume),
    onError: (e) => {
      if (e instanceof NotOkResponseError) {
        toast.error(t(`statusCodes:${e.status}.short`), {
          description: e.detail,
        });
      } else {
        toast.error(t('core:dialogs.importResume.wasNotImported'));
      }
    },
    onSuccess: (resumeId) => {
      onSuccess(resumeId);
      toast.success(t('core:dialogs.importResume.wasImported'));
      navigate({ to: '/resumes/$resumeId', params: { resumeId } });
    },
  });
}
