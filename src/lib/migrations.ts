import { compareVersions } from 'compare-versions';

import { defaultResume } from '@/lib/data';
import { UnsupportedVersionError } from '@/lib/errors';
import { CURRENT_RESUME_VERSION } from '@/constants/resume';

const MIGRATIONS: Record<string, (data: any) => any> = {
  '1.0.0': (data) => {
    return {
      ...data,
      config: { ...defaultResume.config, name: data.name },
      name: undefined,
      version: '1.1.0',
    };
  },
  '1.1.0': (data) => {
    const { config } = data;
    const baseSize = config.fontSize || 10; // Fallback to a sensible default

    return {
      ...data,
      version: '1.2.0',
      config: {
        ...config,
        titleSize: config.titleSizeMultiplier * baseSize,
        sectionTitleSize: config.sectionTitleSizeMultiplier * baseSize,
        itemTitleSize: config.itemTitleMultiplier * baseSize,
        titleSizeMultiplier: undefined,
        sectionTitleSizeMultiplier: undefined,
        itemTitleMultiplier: undefined,
      },
    };
  },
};

const VERSION_ORDER = ['1.0.0', '1.1.0', CURRENT_RESUME_VERSION];

/**
 * Takes any raw parsed object and runs it through the full migration
 * sequence up to CURRENT_RESUME_VERSION.
 *
 * Returns the migrated plain object — not yet validated against the schema.
 *
 * @throws {UnsupportedVersionError} if the version is not in VERSION_ORDER.
 */
export function migrateResume(raw: Record<string, any>): Record<string, any> {
  let data = { ...raw };
  const version = data.version || '1.0.0';
  const startIndex = VERSION_ORDER.indexOf(version);

  if (startIndex === -1) {
    throw new UnsupportedVersionError(version);
  }

  for (let i = startIndex; i < VERSION_ORDER.length; i++) {
    const ver = VERSION_ORDER[i];
    const migration = MIGRATIONS[ver];

    if (migration && compareVersions(ver, CURRENT_RESUME_VERSION) === -1) {
      data = migration(data);
    }
  }

  return data;
}
