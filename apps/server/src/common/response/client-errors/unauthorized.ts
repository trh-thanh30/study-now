import { BaseClientError } from './base';

export class UnauthorizedError extends BaseClientError {
  constructor(
    resource: string = 'resource',
    code: string = 'UNAUTHORIZED',
    details: Record<string, unknown> = {},
  ) {
    super(`${resource}`, 401, code, details);
  }
}

export default UnauthorizedError;
