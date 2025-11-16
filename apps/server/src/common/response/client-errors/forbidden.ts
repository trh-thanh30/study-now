import { BaseClientError } from './base';

export class ForbiddenError extends BaseClientError {
  constructor(
    resource: string = 'resource',
    code: string = 'FORBIDDEN',
    details: Record<string, unknown> = {},
  ) {
    super(`${resource}`, 403, code, details);
  }
}

export default ForbiddenError;
