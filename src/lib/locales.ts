import type { Locale } from '@/constants/locales';

import {
  defaultProjectLocale,
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

  return browserLocale ?? defaultProjectLocale;
}

export function setUserLocalePreference(locale: Locale) {
  localStorage.setItem(LOCALE_LOCAL_STORAGE_KEY, locale);
}

export function setLocaleInDocument(locale: Locale) {
  document.documentElement.setAttribute('lang', localeData[locale].langKey);
}
