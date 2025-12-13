import type { Resume, ResumeIndex } from '@/lib/types';

import { CURRENT_APP_VERSION } from '@/lib/utils';

export function saveResumesIndex(resumes: ResumeIndex[]) {
  localStorage.setItem(
    'app_data',
    JSON.stringify({
      resumes: resumes.map(({ id, name }) => ({ id, name })),
      version: CURRENT_APP_VERSION,
    }),
  );
}

export function loadResumesIndex(): ResumeIndex[] {
  const storedAppData = localStorage.getItem('app_data');

  return storedAppData ? JSON.parse(storedAppData).resumes : [];
}

export function saveResume(resume: Resume) {
  localStorage.setItem(`resume_${resume.id}`, JSON.stringify(resume));
}

export function loadResume(resumeId: string): Resume | null {
  const storedResume = localStorage.getItem(`resume_${resumeId}`);

  if (!storedResume) return null;

  return JSON.parse(storedResume);
}

export function deleteResume(resumeId: string) {
  localStorage.removeItem(`resume_${resumeId}`);
}
