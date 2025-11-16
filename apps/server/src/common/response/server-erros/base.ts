export abstract class BaseServerError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public details?: Record<string, unknown>;
  constructor(
    message: string,
    statusCode: number,
    code: string,
    details?: Record<string, unknown>,
  ) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
  }

  toResponse() {
    return {
      success: false,
      error: {
        code: this.code,
        message: this.message,
        details: this.details,
      },
      meta: {
        timestamp: new Date().toISOString(),
        version: 'v1',
      },
    };
  }
  getSummary() {
    return {
      name: this.name,
      statusCode: this.statusCode,
      code: this.code,
      message: this.message,
      details: this.details,
    };
  }
}
