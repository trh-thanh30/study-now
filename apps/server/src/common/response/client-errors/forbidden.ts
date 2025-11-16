import { BaseClientError } from './base';

export class ForbiddenError extends BaseClientError {
  constructor(
    resource: string = 'resource',
    code: string = 'FORBIDDEN',
    statusCode: number = 403,
    details: Record<string, unknown> = {},
  ) {
    super(`${resource}`, statusCode, code, details);
  }
}

export default ForbiddenError;
