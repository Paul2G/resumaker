import type { AppData, Resume } from '@/types';

import { compareVersions } from 'compare-versions';

import { defaultResume } from '@/lib/data';
import { CURRENT_RESUME_VERSION } from '@/constants/resume';

export const LS_APP_DATA_KEY = 'app_data' as const;
export const LS_RESUME_PREFIX_KEY = 'resume_' as const;

const MIGRATIONS: Record<string, (data: any) => any> = {
  '1.0.0': (data) => {
    // Migration logic from 1.0.0 to 1.1.0
    return {
      ...data,
      config: { ...defaultResume.config, name: data.name },
      name: undefined,
      version: '1.1.0',
    };
  },
};

// Get versions in order
const VERSION_ORDER = ['1.0.0', CURRENT_RESUME_VERSION];

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
          createdAt: oldResumeIndex?.createdAt
            ? oldResumeIndex.createdAt
            : new Date(),
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

export function loadResume(resumeId: string): Resume | undefined {
  const rawResume = localStorage.getItem(`${LS_RESUME_PREFIX_KEY}${resumeId}`);
  if (!rawResume) return undefined;

  let parsedResume = JSON.parse(rawResume);
  let currentVer = parsedResume.version || '1.0.0';

  // Start migration sequence
  const startIndex = VERSION_ORDER.indexOf(currentVer);

  if (startIndex === -1) {
    console.error('Unknown version found in storage');
    return undefined;
  }

  for (let i = startIndex; i < VERSION_ORDER.length; i++) {
    const ver = VERSION_ORDER[i];
    const migration = MIGRATIONS[ver];

    if (migration && compareVersions(ver, CURRENT_RESUME_VERSION) === -1) {
      parsedResume = migration(parsedResume);
      // Update local storage so we don't migrate every time
      localStorage.setItem(
        `${LS_RESUME_PREFIX_KEY}${resumeId}`,
        JSON.stringify(parsedResume),
      );
    }
  }
  // End migration sequence

  // TODO: Check schema

  return parsedResume;
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
