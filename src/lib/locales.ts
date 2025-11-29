export type ProjectLocale = {
  /** Unique key for the locale */
  key: string;
  /** Language code for the locale */
  language: string;
  /** Label for the language */
  languageLabel: string;
};

const LANG_LOCAL_STORAGE_KEY = 'vite-ui-lang' as const;

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

export function getUserLocalePreference() {
  const localStorageLocaleKey = localStorage.getItem(LANG_LOCAL_STORAGE_KEY);
  const userLocale = projectLocales.find(
    ({ key }) => key === localStorageLocaleKey,
  );

  if (userLocale) {
    return userLocale;
  }

  const browserLocaleKey = navigator?.language;
  const browserLocale = projectLocales.find(({ key }) =>
    browserLocaleKey.startsWith(key),
  );

  return browserLocale ?? defaultProjectLocale;
}

export function setUserLocalePreference({ key }: ProjectLocale) {
  localStorage.setItem(LANG_LOCAL_STORAGE_KEY, key);
}

export function setLocaleInDocument({ language }: ProjectLocale) {
  document.documentElement.setAttribute('lang', language);
}
