import type { ClassValue } from 'clsx';

import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

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

export function isValueOf<T extends Record<string, unknown>>(obj: T) {
  return function (value: unknown): value is T[keyof T] {
    return Object.values(obj).includes(value as T[keyof T]);
  };
}

export function getDecimalPlaces(n: number) {
  const match = n.toString().match(/\.(\d+)$/);
  return match ? match[1].length : 0;
}

export function round(value: number, step: number) {
  const decimals = getDecimalPlaces(step);
  return Number(value.toFixed(decimals));
}
