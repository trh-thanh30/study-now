import { BaseClientError } from './base';

export class ValidationError extends BaseClientError {
  constructor(
    resource: string = 'resource',
    code: string = 'VALIDATION_ERROR',
    statusCode: number = 422,
    details: Record<string, unknown> = {},
  ) {
    super(`${resource}`, statusCode, code, details);
  }
}

export default ValidationError;
