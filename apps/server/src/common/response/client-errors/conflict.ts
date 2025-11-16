import { BaseClientError } from './base';

export class ConflictError extends BaseClientError {
  constructor(
    resource: string = 'resource',
    code: string = 'CONFLICT',
    statusCode: number = 409,
    details: Record<string, unknown> = {},
  ) {
    super(`${resource}`, statusCode, code, details);
  }
}

export default ConflictError;
