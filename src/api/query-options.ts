import type { Resume } from '@/types';

import { mutationOptions, queryOptions } from '@tanstack/react-query';

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

export const resumeCreateMutationOptions = () =>
  mutationOptions({
    mutationKey: ['resumeCreate'],
    mutationFn: (resume: Resume) => createResume(resume),
  });

export const resumeUpdateMutationOptions = () =>
  mutationOptions({
    mutationKey: ['resumeUpdate'],
    mutationFn: (resume: Resume) => updateResume(resume),
  });

export const resumeDeleteMutationOptions = (resumeId: string) =>
  mutationOptions({
    mutationKey: ['resumeDelete', resumeId],
    mutationFn: () => deleteResume(resumeId),
  });
