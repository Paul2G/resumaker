import type { ProjectLocale } from '@/types';

export const LANG_LOCAL_STORAGE_KEY = 'vite-ui-lang' as const;

export const projectLocales: Array<ProjectLocale> = [
  {
    key: 'es-MX',
    language: 'es',
    languageLabel: 'Español',
  },
  {
    key: 'en-US',
    language: 'en',
    languageLabel: 'English',
  },
];

export const defaultProjectLocale = projectLocales[1];
