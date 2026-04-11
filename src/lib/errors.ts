import { ZodError } from 'zod';

/** RFC9457 Problem Details for HTTP APIs */
export type ProblemDetails = {
  type?: string;
  status?: number;
  title: string;
  detail: string;
  instance?: string;

  // Optional fields for additional error information
  code?: string;
  errors?:
    | Array<Record<string, string>>
    // Just for .NET compatibility
    | Record<string, Array<string>>;
};

export class NotOkResponseError extends Error {
  public type?: string;
  public title: string;
  public detail: string;
  public instance?: string;
  public status?: number;
  public code?: string;
  public errors?: Array<Record<string, string>> | Record<string, Array<string>>;

  constructor(problemDetails: ProblemDetails) {
    super(problemDetails.title);
    this.name = 'NotOkResponseError';

    this.type = problemDetails.type;
    this.title = problemDetails.title;
    this.detail = problemDetails.detail;
    this.instance = problemDetails.instance;
    this.status = problemDetails.status;
    this.code = problemDetails.code;
    this.errors = problemDetails.errors;
  }
}

export class UnsupportedVersionError extends Error {
  readonly version: string;

  constructor(version: string) {
    super(`Unsupported resume version: "${version}"`);
    this.name = 'UnsupportedVersionError';
    this.version = version;
  }
}

export class ResumeValidationError extends Error {
  readonly cause: ZodError;

  constructor(context: string, zodError: ZodError) {
    super(`Resume validation failed: ${context}`);
    this.name = 'ResumeValidationError';
    this.cause = zodError;
  }
}

export function translateRepositoryError(error: unknown): never {
  if (error instanceof UnsupportedVersionError) {
    throw new NotOkResponseError({
      title: 'Unsupported Resume Version',
      detail: error.message,
      code: 'UnsupportedVersion',
      status: 422,
    });
  }

  if (error instanceof ResumeValidationError) {
    throw new NotOkResponseError({
      title: 'Invalid Resume',
      detail: error.message,
      code: 'InvalidResume',
      status: 400,
      errors: error.cause.issues.map((issue) => ({
        path: issue.path.join('.'),
        message: issue.message,
      })),
    });
  }

  // Unknown error — rethrow as-is so it surfaces naturally
  throw error;
}
