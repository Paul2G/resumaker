import type { Resume, ResumeIndex } from '@/types/resume';

import { nanoid } from 'nanoid';

import { NotOkResponseError, translateRepositoryError } from '@/lib/errors';
import {
  existsResumeIndex,
  getAppData,
  loadResume,
  removeResume,
  removeResumeIndex,
  safeSaveResume,
  saveResume,
  saveResumeIndex,
} from '@/repositories/local-storage';

// ── Query functions ────────────────────────────────────────────────────────

export async function getAllResumes(): Promise<ResumeIndex[]> {
  const { resumes } = getAppData();

  return resumes.sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );
}

export async function getResumeById(resumeId: string): Promise<Resume> {
  let resume: Resume | undefined;

  try {
    resume = loadResume(resumeId);
  } catch (error) {
    translateRepositoryError(error);
  }

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

  const newResume: Omit<Resume, 'version'> = { ...resume, id: newResumeId };

  saveResume(newResume);
  saveResumeIndex(newResume);

  return newResumeId;
}

export async function updateResume(updatedResume: Resume): Promise<void> {
  // Simulate network delay so the loading state is visible and prevents
  // the user from triggering multiple concurrent updates.
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

export async function importResume(raw: unknown): Promise<string> {
  const newResumeId = nanoid(12);

  let resume: Resume;

  try {
    // safeSaveResume handles migration + validation + persistence atomically
    resume = safeSaveResume({ ...(raw as any), id: newResumeId });
    saveResumeIndex(resume);
  } catch (error) {
    translateRepositoryError(error);
  }

  return resume!.id;
}
