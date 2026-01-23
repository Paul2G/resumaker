import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const CUSTOM_DATE_FORMAT = 'DD/MM/YYYY' as const;

export function parseDate(s?: string): Date | undefined {
  if (!isStringCustomDate(s)) return;

  return dayjs(s, CUSTOM_DATE_FORMAT).toDate();
}

export function formatDate(d?: Date | string): string {
  if (typeof d === 'string')
    return dayjs(new Date(d)).format(CUSTOM_DATE_FORMAT);

  if (d instanceof Date && isDateValid(d))
    return dayjs(d).format(CUSTOM_DATE_FORMAT);

  return '';
}

export function isStringCustomDate(s?: string): boolean {
  if (!s) return false;

  return dayjs(s, CUSTOM_DATE_FORMAT).isValid();
}

export function isDateValid(d?: Date | string) {
  const date = d instanceof Date ? d : new Date(d || '');

  return !isNaN(date.getTime());
}

export function getYear(d?: Date | string): string | undefined {
  return isDateValid(d) ? new Date(d!).getFullYear().toString() : undefined;
}
