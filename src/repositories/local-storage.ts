import type { AppData, Resume } from '@/types';

import { compareVersions } from 'compare-versions';

import { defaultResume } from '@/lib/data';
import { CURRENT_RESUME_VERSION } from '@/constants/resume';

export const LS_APP_DATA_KEY = 'app_data' as const;
export const LS_RESUME_PREFIX_KEY = 'resume_' as const;

/* Get app data and create it if no exist */
export function getAppData(): AppData {
  const rawAppData = localStorage.getItem(LS_APP_DATA_KEY);

  if (!rawAppData) {
    return {
      resumes: [],
      version: CURRENT_RESUME_VERSION,
    };
  }

  // TODO: Check app data schema

  return JSON.parse(rawAppData) as AppData;
}

export function saveResumeIndex(resume: Omit<Resume, 'version'>) {
  const appData = getAppData();
  const oldResumeIndex = appData.resumes.find((r) => r.id === resume.id);

  localStorage.setItem(
    LS_APP_DATA_KEY,
    JSON.stringify({
      ...appData,
      resumes: [
        ...appData.resumes.filter((r) => r.id !== resume.id),
        {
          id: resume.id,
          name: resume.config.name,
          createdAt: oldResumeIndex ? oldResumeIndex.createdAt : new Date(),
          updatedAt: new Date(),
        },
      ],
    }),
  );
}

export function removeResumeIndex(resumeId: string) {
  const appData = getAppData();

  localStorage.setItem(
    LS_APP_DATA_KEY,
    JSON.stringify({
      ...appData,
      resumes: [...appData.resumes.filter((r) => r.id !== resumeId)],
    }),
  );
}

export function loadResume(resumeId: string) {
  const rawResume = localStorage.getItem(`${LS_RESUME_PREFIX_KEY}${resumeId}`);

  if (rawResume) {
    const parsedResume = JSON.parse(rawResume);

    // Migrating versions
    if (
      compareVersions(
        parsedResume.version || '1.0.0',
        CURRENT_RESUME_VERSION,
      ) === -1
    ) {
      parsedResume.config = defaultResume.config;
      parsedResume.config.name = parsedResume.name;
      parsedResume.name = undefined;
      parsedResume.version = CURRENT_RESUME_VERSION;
    }

    // TODO: Check schema

    return parsedResume;
  }

  return undefined;
}

export function saveResume(resume: Omit<Resume, 'version'>) {
  localStorage.setItem(
    `${LS_RESUME_PREFIX_KEY}${resume.id}`,
    JSON.stringify({ ...resume, version: CURRENT_RESUME_VERSION }),
  );
}

export function removeResume(resumeId: string) {
  localStorage.removeItem(`${LS_RESUME_PREFIX_KEY}${resumeId}`);
}

export function existsResumeIndex(resumeId: string): boolean {
  const { resumes } = getAppData();

  return resumes.some((r) => r.id === resumeId);
}
