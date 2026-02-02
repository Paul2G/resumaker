export const dateFormats = [
  'iso',
  'us',
  'eurLatam',
  'eastAsia',
  'usLong',
  'intLong',
  'usAbbr',
  'intAbbr',
  'monthYear',
  'monthYearAbbr',
  'yearOnly',
] as const;

export const dateFormatsValuesMap = {
  iso: 'YYYY-MM-DD',
  us: 'MM/DD/YYYY',
  eurLatam: 'DD/MM/YYYY',
  eastAsia: 'YYYY/MM/DD',
  usLong: 'MMMM DD, YYYY',
  intLong: 'DD MMMM YYYY',
  usAbbr: 'MMM DD, YYYY',
  intAbbr: 'DD MMM YYYY',
  monthYear: 'MMMM YYYY',
  monthYearAbbr: 'MMM YYYY',
  yearOnly: 'YYYY',
} as const satisfies Record<DateFormat, string>;

export type DateFormat = (typeof dateFormats)[number];
export type DateFormatValue =
  (typeof dateFormatsValuesMap)[keyof typeof dateFormatsValuesMap];
