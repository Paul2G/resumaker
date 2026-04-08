import type { EnumValues } from '@/types/utils';

export const SettingsCategory = {
  General: 'general',
  SheetFormat: 'sheet-format',
  Typography: 'typography',
  Spacing: 'spacing',
  Dates: 'dates',
} as const;

export const settingsCategories = Object.values(SettingsCategory);

export type SettingsCategory = EnumValues<typeof SettingsCategory>;
