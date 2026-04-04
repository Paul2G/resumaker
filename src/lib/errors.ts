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

  constructor(problemDetails: ProblemDetails) {
    super(problemDetails.title);
    this.name = 'NotOkResponseError';

    this.type = problemDetails.type;
    this.title = problemDetails.title;
    this.detail = problemDetails.detail;
    this.instance = problemDetails.instance;
    this.status = problemDetails.status;
  }
}
