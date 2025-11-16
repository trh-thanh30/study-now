import { BaseClientError } from './base';

export class UnauthorizedError extends BaseClientError {
  constructor(
    resource: string = 'resource',
    code: string = 'UNAUTHORIZED',
    statusCode: number = 401,
    details: Record<string, unknown> = {},
  ) {
    super(`${resource}`, statusCode, code, details);
  }
}

export default UnauthorizedError;
