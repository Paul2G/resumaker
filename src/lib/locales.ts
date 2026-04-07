import type { Locale } from '@/constants/locales';

import {
  DEFAULT_LOCALE_KEY,
  LOCALE_LOCAL_STORAGE_KEY,
  localeData,
  locales,
} from '@/constants/locales';

export function getUserLocalePreference(): Locale {
  const localStorageLocale = localStorage.getItem(LOCALE_LOCAL_STORAGE_KEY);

  if (locales.some((l) => l === localStorageLocale)) {
    return localStorageLocale as Locale;
  }

  const browserLocaleKey = navigator?.language;
  const browserLocale = locales.find((l) =>
    browserLocaleKey.startsWith(localeData[l].langKey),
  );

  return browserLocale ?? DEFAULT_LOCALE_KEY;
}

export function setUserLocalePreference(locale: Locale) {
  localStorage.setItem(LOCALE_LOCAL_STORAGE_KEY, locale);
}

export function setLocaleInDocument(locale: Locale) {
  document.documentElement.setAttribute('lang', localeData[locale].langKey);
}
