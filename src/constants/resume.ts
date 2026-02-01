export const CURRENT_RESUME_VERSION = '1.1.0';

export const resumePaperSizes = [
  {
    key: 'a4',
    label: 'A4 (210 x 297 mm)',
  },
  {
    key: 'us-letter',
    label: 'US Letter (8.5 x 11 in)',
  },
] as const;

export const resumeFontFamilies = [
  {
    key: 'arial',
    label: 'Arial',
    value: 'Arial, sans-serif',
  },
  {
    key: 'times-new-roman',
    label: 'Times New Roman',
    value: '"Times New Roman", serif',
  },
  {
    key: 'calibri',
    label: 'Calibri',
    value: 'Calibri, sans-serif',
  },
  {
    key: 'georgia',
    label: 'Georgia',
    value: 'Georgia, serif',
  },
] as const;

export const resumeDateFormats = [
  {
    key: 'iso',
    label: 'YYYY-MM-DD (ISO)',
    value: 'YYYY-MM-DD',
  },
  {
    key: 'us',
    label: 'MM/DD/YYYY (US)',
    value: 'MM/DD/YYYY',
  },
  {
    key: 'eur-latam',
    label: 'DD/MM/YYYY (EU & LATAM)',
    value: 'DD/MM/YYYY',
  },
  {
    key: 'east-asia',
    label: 'YYYY/MM/DD (East Asia)',
    value: 'YYYY/MM/DD',
  },
  {
    key: 'us-long',
    label: 'Month DD, YYYY (US Long)',
    value: 'MMMM DD, YYYY',
  },
  {
    key: 'int-long',
    label: 'DD Month YYYY (International Long)',
    value: 'DD MMMM YYYY',
  },
  {
    key: 'us-abbr',
    label: 'Mon DD, YYYY (US Abbreviated)',
    value: 'MMM DD, YYYY',
  },
  {
    key: 'int-abbr',
    label: 'DD Mon YYYY (International Abbreviated)',
    value: 'DD MMM YYYY',
  },
  {
    key: 'month-year',
    label: 'Month YYYY',
    value: 'MMMM YYYY',
  },
  {
    key: 'month-year-abbr',
    label: 'Mon YYYY',
    value: 'MMM YYYY',
  },
  {
    key: 'year-only',
    label: 'YYYY',
    value: 'YYYY',
  },
] as const;
