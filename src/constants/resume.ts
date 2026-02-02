export const CURRENT_RESUME_VERSION = '1.1.0';

export const resumePaperSizes = ['a4', 'usLetter'] as const;
export const resumeFontFamilies = [
  'arial',
  'timesNewRoman',
  'calibri',
  'georgia',
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

export type ResumePaperSize = (typeof resumePaperSizes)[number];
export type ResumeFontFamily = (typeof resumeFontFamilies)[number];
