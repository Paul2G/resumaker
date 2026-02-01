export const CURRENT_RESUME_VERSION = '1.1.0';

export const resumePaperSizes = ['a4', 'usLetter'] as const;
export const resumeFontFamilies = [
  'arial',
  'timesNewRoman',
  'calibri',
  'georgia',
] as const;
export const resumeDateFormats = [
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

export const resumePaperSizesValuesMap: Record<ResumePaperSize, string> = {
  a4: 'a4',
  usLetter: 'letter',
};

export const resumeFontFamiliesValuesMap: Record<ResumeFontFamily, string> = {
  arial: 'Arial, sans-serif',
  timesNewRoman: '"Times New Roman", serif',
  calibri: 'Calibri, sans-serif',
  georgia: 'Georgia, serif',
};

export const resumeDateFormatsValuesMap: Record<ResumeDateFormat, string> = {
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
};

export type ResumePaperSize = (typeof resumePaperSizes)[number];
export type ResumeFontFamily = (typeof resumeFontFamilies)[number];
export type ResumeDateFormat = (typeof resumeDateFormats)[number];
