import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import {
  defaultProjectLocale,
  languages,
  localeData,
} from '@/constants/locales';
import en from '@/locales/en';
import es from '@/locales/es';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    supportedLngs: languages,
    fallbackLng: localeData[defaultProjectLocale].langKey,
    defaultNS: 'core',
    fallbackNS: 'core',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: { ...en },
      es: { ...es },
    },
  });

export default i18n;
