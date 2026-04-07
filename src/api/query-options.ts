import type { Resume } from '@/types';
import type { TFunction } from 'i18next';

import { mutationOptions, queryOptions } from '@tanstack/react-query';

import { onMutationError } from '@/lib/mutation-toast';
import {
  createResume,
  deleteResume,
  getAllResumes,
  getResumeById,
  updateResume,
} from '@/api/query-fns';

export const resumesIndexQueryOptions = () =>
  queryOptions({
    queryKey: ['resumes'],
    queryFn: () => getAllResumes(),
  });

export const resumeQueryOptions = (resumeId: string) =>
  queryOptions({
    queryKey: ['resume', resumeId],
    queryFn: () => getResumeById(resumeId),
  });

export const resumeCreateMutationOptions = ({ t }: { t: TFunction }) =>
  mutationOptions({
    mutationKey: ['resumeCreate'],
    mutationFn: (resume: Resume) => createResume(resume),
    onError: onMutationError(t, 'dialogs.createNewResume.wasNotCreated'),
  });

export const resumeUpdateMutationOptions = ({
  t,
  resumeId,
}: {
  t: TFunction;
  resumeId: string;
}) =>
  mutationOptions({
    mutationKey: ['resumeUpdate', resumeId],
    mutationFn: (resume: Resume) => updateResume(resume),
    onError: onMutationError(t, 'dialogs.saveFailed'),
  });

export const resumeDeleteMutationOptions = ({
  t,
  resumeId,
}: {
  t: TFunction;
  resumeId: string;
}) =>
  mutationOptions({
    mutationKey: ['resumeDelete', resumeId],
    mutationFn: () => deleteResume(resumeId),
    onError: onMutationError(t, 'dialogs.deleteResume.wasNotDeleted'),
  });
