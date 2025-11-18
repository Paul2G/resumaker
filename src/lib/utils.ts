import type { Resume } from '@/lib/types';
import type { ClassValue } from 'clsx';

import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { defaultResume } from '@/lib/data';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isStringValid(value: string | undefined): boolean {
  return value !== undefined && value.trim() !== '';
}

export function saveResumeOnLocalStorage(resume: Resume) {
  localStorage.setItem('resume', JSON.stringify(resume));
}

export function loadResumeFromLocalStorage(): Resume {
  const storedResume = localStorage.getItem('resume');

  return storedResume ? JSON.parse(storedResume) : defaultResume;
}
