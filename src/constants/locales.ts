import type { ProjectLocale } from '@/types';

export const LANG_LOCAL_STORAGE_KEY = 'vite-ui-lang' as const;

export const projectLocales = [
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
] as const satisfies ProjectLocale[];

export const defaultProjectLocale = projectLocales[1];

export type Language = (typeof projectLocales)[number]['language'];
