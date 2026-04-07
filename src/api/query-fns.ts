import type { Resume, ResumeIndex } from '@/types';

import { nanoid } from 'nanoid';

import { NotOkResponseError } from '@/lib/errors';
import {
  existsResumeIndex,
  getAppData,
  loadResume,
  removeResume,
  removeResumeIndex,
  saveResume,
  saveResumeIndex,
} from '@/repositories/local-storage';

// Api functions
export async function getAllResumes(): Promise<ResumeIndex[]> {
  const { resumes } = getAppData();

  return resumes;
}

export async function getResumeById(resumeId: string): Promise<Resume> {
  const resume = loadResume(resumeId);

  if (!resume) {
    removeResumeIndex(resumeId);

    throw new NotOkResponseError({
      title: 'Resume not found',
      detail: `Resume with id ${resumeId} doesn't exist.`,
      code: 'NotFound',
      status: 404,
    });
  }

  return resume;
}

export async function createResume(
  resume: Omit<Resume, 'id' | 'version'>,
): Promise<string> {
  const newResumeId = nanoid(12);

  const newResume: Omit<Resume, 'version'> = {
    ...resume,
    id: newResumeId,
  };

  saveResume(newResume);
  saveResumeIndex(newResume);

  return newResumeId;
}

export async function updateResume(updatedResume: Resume) {
  // Simulate network delay for better UX when updating resume and to make sure the loading state is visible, that make the user understand that the update is in progress and prevent them from clicking the update button multiple times.
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (!existsResumeIndex(updatedResume.id)) {
    removeResume(updatedResume.id);

    throw new NotOkResponseError({
      title: 'Resume not found',
      detail: `Resume with id ${updatedResume.id} doesn't exist.`,
      code: 'NotFound',
      status: 404,
    });
  }

  saveResume(updatedResume);
  saveResumeIndex(updatedResume);
}

export async function deleteResume(resumeId: string): Promise<void> {
  if (!existsResumeIndex(resumeId)) {
    removeResume(resumeId);

    throw new NotOkResponseError({
      title: 'Resume not found',
      detail: `Resume with id ${resumeId} doesn't exist.`,
      code: 'NotFound',
      status: 404,
    });
  }

  removeResume(resumeId);
  removeResumeIndex(resumeId);
}
