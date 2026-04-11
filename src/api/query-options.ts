import { queryOptions } from '@tanstack/react-query';

import { getAllResumes, getResumeById } from '@/api/query-fns';

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
