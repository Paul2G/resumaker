import type { AppData, Resume } from '@/types';

import { compareVersions } from 'compare-versions';

import { CURRENT_RESUME_VERSION } from '@/constants/resume';

export function saveAppData(appData: AppData) {
  localStorage.setItem(
    'app_data',
    JSON.stringify({
      resumes: appData.resumes.map(({ id, name }) => ({ id, name })),
      selectedResumeId: appData.selectedResumeId,
    }),
  );
}

export function loadAppData() {
  const storedAppData = localStorage.getItem('app_data');

  return storedAppData
    ? JSON.parse(storedAppData)
    : {
        resumes: [],
      };
}

export function saveResume(resume: Resume) {
  localStorage.setItem(`resume_${resume.id}`, JSON.stringify(resume));
}

export function loadResume(resumeId: string): Resume | null {
  const storedResume = localStorage.getItem(`resume_${resumeId}`);

  if (!storedResume) return null;

  const parsedResume = JSON.parse(storedResume);

  if (
    compareVersions(parsedResume.version || '1.0.0', CURRENT_RESUME_VERSION) ===
    -1
  ) {
    parsedResume.config.name = parsedResume.name;
    parsedResume.name = undefined;
    parsedResume.version = CURRENT_RESUME_VERSION;
  }

  return parsedResume;
}

export function deleteResume(resumeId: string) {
  localStorage.removeItem(`resume_${resumeId}`);
}
