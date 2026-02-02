import type { DateFormat } from '@/constants/dates';
import type { Language } from '@/constants/locales';

import dayjs from 'dayjs';

import 'dayjs/locale/es';

import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const DEFAULT_DATE_FORMAT: DateFormat = 'DD/MM/YYYY' as const;
const DEFAULT_DATE_LANGUAGE: Language = 'en' as const;

export function formatDate(
  d?: Date | string,
  dateFormat: DateFormat = DEFAULT_DATE_FORMAT,
  language: Language = DEFAULT_DATE_LANGUAGE,
): string {
  if (typeof d === 'string')
    return dayjs(new Date(d)).locale(language).format(dateFormat);

  if (d instanceof Date && isDateValid(d))
    return dayjs(d).locale(language).format(dateFormat);

  return '';
}

export function isDateValid(d?: Date | string) {
  const date = d instanceof Date ? d : new Date(d || '');

  return !isNaN(date.getTime());
}

export function getYear(d?: Date | string): string | undefined {
  return isDateValid(d) ? new Date(d!).getFullYear().toString() : undefined;
}
