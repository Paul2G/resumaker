export const CURRENT_RESUME_VERSION = '1.1.0';

export const resumePaperSizeValue = {
  usLetter: 'letter',
  a4: 'a4',
} as const;

export const resumeFontFamilyValue = {
  arial: 'Arial, sans-serif',
  timesNewRoman: '"Times New Roman", serif',
  calibri: 'Calibri, sans-serif',
  georgia: 'Georgia, serif',
} as const;

export const resumePaperSizesKeys = Object.keys(
  resumePaperSizeValue,
) as ResumePaperSizeKey[];
export const resumeFontFamiliesKeys = Object.keys(
  resumeFontFamilyValue,
) as ResumeFontFamilyKey[];

export type ResumePaperSizeKey = keyof typeof resumePaperSizeValue;
export type ResumeFontFamilyKey = keyof typeof resumeFontFamilyValue;

export type ResumePaperSize =
  (typeof resumePaperSizeValue)[keyof typeof resumePaperSizeValue];
export type ResumeFontFamily =
  (typeof resumeFontFamilyValue)[keyof typeof resumeFontFamilyValue];
