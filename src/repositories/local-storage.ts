import type { AppData, Resume } from '@/types/resume';

import { compareVersions } from 'compare-versions';

import { defaultResume } from '@/lib/data';
import { ResumeValidationError, UnsupportedVersionError } from '@/lib/errors';
import { CURRENT_RESUME_VERSION } from '@/constants/resume';
import { resumeSchema } from '@/types/schemas';

export const LS_APP_DATA_KEY = 'app_data' as const;
export const LS_RESUME_PREFIX_KEY = 'resume_' as const;

// ── Migration ──────────────────────────────────────────────────────────────

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

// ── App data ───────────────────────────────────────────────────────────────

export function getAppData(): AppData {
  const raw = localStorage.getItem(LS_APP_DATA_KEY);

  if (!raw) {
    return { resumes: [], version: CURRENT_RESUME_VERSION };
  }

  // TODO: validate app data schema
  return JSON.parse(raw) as AppData;
}

// ── Resume index ───────────────────────────────────────────────────────────

export function saveResumeIndex(resume: Omit<Resume, 'version'>) {
  const appData = getAppData();
  const existing = appData.resumes.find((r) => r.id === resume.id);

  localStorage.setItem(
    LS_APP_DATA_KEY,
    JSON.stringify({
      ...appData,
      resumes: [
        ...appData.resumes.filter((r) => r.id !== resume.id),
        {
          id: resume.id,
          name: resume.config.name,
          createdAt: existing?.createdAt ?? new Date(),
          updatedAt: new Date(),
        },
      ],
    }),
  );
}

export function removeResumeIndex(resumeId: string) {
  const appData = getAppData();

  localStorage.setItem(
    LS_APP_DATA_KEY,
    JSON.stringify({
      ...appData,
      resumes: appData.resumes.filter((r) => r.id !== resumeId),
    }),
  );
}

export function existsResumeIndex(resumeId: string): boolean {
  return getAppData().resumes.some((r) => r.id === resumeId);
}

// ── Resume ─────────────────────────────────────────────────────────────────

/**
 * Loads, migrates and validates a resume from localStorage.
 *
 * @throws {UnsupportedVersionError} if the stored version is unknown.
 * @throws {ResumeValidationError} if the migrated data fails schema validation.
 */
export function loadResume(resumeId: string): Resume | undefined {
  const raw = localStorage.getItem(`${LS_RESUME_PREFIX_KEY}${resumeId}`);
  if (!raw) return undefined;

  const migrated = migrateResume(JSON.parse(raw));

  // Persist the migrated result so we don't re-migrate on every load
  localStorage.setItem(
    `${LS_RESUME_PREFIX_KEY}${resumeId}`,
    JSON.stringify(migrated),
  );

  const result = resumeSchema.safeParse(migrated);

  if (!result.success) {
    throw new ResumeValidationError(
      `id "${resumeId}" is invalid after migration`,
      result.error,
    );
  }

  return result.data;
}

/**
 * Saves a resume to localStorage without any validation.
 * Prefer safeSaveResume when the input comes from an external source.
 */
export function saveResume(resume: Omit<Resume, 'version'>) {
  localStorage.setItem(
    `${LS_RESUME_PREFIX_KEY}${resume.id}`,
    JSON.stringify({ ...resume, version: CURRENT_RESUME_VERSION }),
  );
}

/**
 * Migrates, validates and saves a resume.
 * Use this instead of saveResume for external input (imports, clipboard, API).
 *
 * @throws {UnsupportedVersionError} if the input version is unknown.
 * @throws {ResumeValidationError} if the data fails schema validation.
 */
export function safeSaveResume(raw: Resume): Resume {
  const migrated = migrateResume(raw);
  const result = resumeSchema.safeParse(migrated);

  if (!result.success) {
    throw new ResumeValidationError(
      `"${raw.config?.name ?? raw.id}" failed validation and was not saved`,
      result.error,
    );
  }

  const validated = result.data;

  saveResume(validated);

  return validated;
}

export function removeResume(resumeId: string) {
  localStorage.removeItem(`${LS_RESUME_PREFIX_KEY}${resumeId}`);
}
