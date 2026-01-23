import type { ClassValue } from 'clsx';

import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const CURRENT_APP_VERSION = '1.0.0';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isStringValid(value: string | undefined): boolean {
  return value !== undefined && value.trim() !== '';
}

export function stringTruncate(s: string, len: number = 20) {
  if (s.length > len) {
    return s.slice(0, len - 3) + '...';
  }

  return s;
}

export function toSentenceCase(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
