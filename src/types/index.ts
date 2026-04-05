export type EnumValues<T extends Record<string, string>> = T[keyof T];

export * from './sections';
export * from './resume';
