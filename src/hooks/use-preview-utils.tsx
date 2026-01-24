import { useTranslation } from 'react-i18next';

import { formatDate } from '@/lib/dates';
import { toSentenceCase } from '@/lib/utils';

export function usePreviewUtils() {
  const { t } = useTranslation('preview');

  function getDuration(from?: Date, to?: Date, currently?: boolean) {
    if (from && (!to || currently)) {
      return `${formatDate(from)} - ${toSentenceCase(t('dates.present'))}`;
    }

    if (from && to) {
      return `${formatDate(from)} - ${formatDate(to)}`;
    }

    if (to) {
      return `${toSentenceCase(t('dates.until'))} ${formatDate(from)}`;
    }

    return '';
  }

  return { t, getDuration };
}
