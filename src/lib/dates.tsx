import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const CUSTOM_DATE_FORMAT = 'DD/MM/YYYY' as const;

export function parseDate(s?: string): Date | undefined {
  if (!isValidStringDate(s)) return;

  return dayjs(s, CUSTOM_DATE_FORMAT).toDate();
}

export function formatDate(d?: Date | string): string {
  if (typeof d === 'string' && isValidStringDate(d)) return d;

  if (d instanceof Date && isValidDate(d))
    return dayjs(d).format(CUSTOM_DATE_FORMAT);

  return '';
}

export function isValidStringDate(s: string | undefined): boolean {
  if (!s) return false;

  return dayjs(s, CUSTOM_DATE_FORMAT).isValid();
}

export function isValidDate(date: Date | undefined) {
  if (!(date instanceof Date)) return false;

  return !isNaN(date.getTime());
}
