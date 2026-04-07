import { useTranslation } from 'react-i18next';

import { useResume } from '@/hooks/use-resume';
import { formatDate } from '@/lib/dates';
import { toSentenceCase } from '@/lib/utils';
import { dateFormatValue } from '@/constants/dates';
import { localeData } from '@/constants/locales';

export function usePreviewUtils() {
  const {
    resume: { config },
  } = useResume();
  const { t } = useTranslation('preview', { lng: config.language });

  function formatDateWrapper(date?: Date) {
    return toSentenceCase(
      formatDate(
        date,
        dateFormatValue[config.dateFormat],
        localeData[config.language]?.langKey,
      ),
    );
  }

  function getDuration(from?: Date, to?: Date, currently?: boolean) {
    if (from && (!to || currently)) {
      return `${formatDateWrapper(from)} - ${toSentenceCase(t('dates.present'))}`;
    }

    if (from && to) {
      return `${formatDateWrapper(from)} - ${formatDateWrapper(to)}`;
    }

    if (to) {
      return `${toSentenceCase(t('dates.until'))} ${formatDateWrapper(from)}`;
    }

    return '';
  }

  return { t, getDuration, formatDate: formatDateWrapper };
}
