import type { ProjectLocale } from '@/types';

import {
  defaultProjectLocale,
  LANG_LOCAL_STORAGE_KEY,
  projectLocales,
} from '@/constants/locales';

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
