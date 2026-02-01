import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { defaultProjectLocale, projectLocales } from '@/constants/locales';
import en from '@/locales/en';
import es from '@/locales/es';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    supportedLngs: Object.values(projectLocales).map(
      ({ language }) => language,
    ),
    fallbackLng: defaultProjectLocale.language,
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
