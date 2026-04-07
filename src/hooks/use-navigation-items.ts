import type { Icon } from '@phosphor-icons/react';
import type { AnyPathParams } from '@tanstack/react-router';

import {
  ArticleIcon,
  CalendarIcon,
  PencilRulerIcon,
  RulerIcon,
  TextAaIcon,
} from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import { SettingsCategory } from '@/constants/settings';

export function useNavigationItems(): UseNavigationItemsReturn {
  const { t } = useTranslation();

  return {
    settings: [
      {
        title: t('resume:settings.general'),
        to: '/resumes/$resumeId/settings/{-$settingsCategory}',
        params: (prev) => ({
          ...prev,
          settingsCategory: SettingsCategory.General,
        }),
        icon: PencilRulerIcon,
      },
      {
        title: t('resume:settings.sheet-format'),
        to: '/resumes/$resumeId/settings/{-$settingsCategory}',
        params: (prev) => ({
          ...prev,
          settingsCategory: SettingsCategory.SheetFormat,
        }),
        icon: ArticleIcon,
      },
      {
        title: t('resume:settings.typography'),
        to: '/resumes/$resumeId/settings/{-$settingsCategory}',
        params: (prev) => ({
          ...prev,
          settingsCategory: SettingsCategory.Typography,
        }),
        icon: TextAaIcon,
      },
      {
        title: t('resume:settings.spacing'),
        to: '/resumes/$resumeId/settings/{-$settingsCategory}',
        params: (prev) => ({
          ...prev,
          settingsCategory: SettingsCategory.Spacing,
        }),
        icon: RulerIcon,
      },
      {
        title: t('resume:settings.dates'),
        to: '/resumes/$resumeId/settings/{-$settingsCategory}',
        params: (prev) => ({
          ...prev,
          settingsCategory: SettingsCategory.Dates,
        }),
        icon: CalendarIcon,
      },
    ],
  };
}

export type UseNavigationItemsReturn = {
  settings: {
    title: string;
    to: string;
    params: (prev: AnyPathParams) => AnyPathParams;
    icon: Icon;
  }[];
};
