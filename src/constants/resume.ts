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
  garmond: 'Garamond, serif',
  curierNew: '"Courier New", monospace',
  verdana: 'Verdana, sans-serif',
  brushScriptMT: '"Brush Script MT", cursive',
} as const;

export const resumePaperSizesKeys = Object.keys(
  resumePaperSizeValue,
) as ResumePaperSizeKey[];
export const resumeFontFamiliesKeys = Object.keys(
  resumeFontFamilyValue,
) as ResumeFontFamilyKey[];

export const DEFAULT_RESUME_PAPER_SIZE_KEY: ResumePaperSizeKey =
  resumePaperSizesKeys[0];
export const DEFAULT_RESUME_FONT_FAMILY_KEY: ResumeFontFamilyKey =
  resumeFontFamiliesKeys[2];

export type ResumePaperSizeKey = keyof typeof resumePaperSizeValue;
export type ResumeFontFamilyKey = keyof typeof resumeFontFamilyValue;

export type ResumePaperSize =
  (typeof resumePaperSizeValue)[keyof typeof resumePaperSizeValue];
export type ResumeFontFamily =
  (typeof resumeFontFamilyValue)[keyof typeof resumeFontFamilyValue];
