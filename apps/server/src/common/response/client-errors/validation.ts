import { BaseClientError } from './base';

export class ValidationError extends BaseClientError {
  constructor(
    resource: string = 'resource',
    code: string = 'VALIDATION_ERROR',
    details: Record<string, unknown> = {},
  ) {
    super(`${resource}`, 422, code, details);
  }
}

export default ValidationError;
