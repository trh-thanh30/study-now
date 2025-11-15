import { BaseClientError } from './base';

export class ConflictError extends BaseClientError {
  constructor(
    resource: string = 'resource',
    code: string = 'CONFLICT',
    details: Record<string, unknown> = {},
  ) {
    super(`${resource}`, 409, code, details);
  }
}

export default ConflictError;
