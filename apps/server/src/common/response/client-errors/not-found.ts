import { BaseClientError } from './base';

export class NotFoundError extends BaseClientError {
  constructor(
    resource: string = 'resource',
    code: string = 'NOT_FOUND',
    statusCode: number = 404,
    details: Record<string, unknown> = {},
  ) {
    super(`${resource}`, statusCode, code, details);
  }
}

export default NotFoundError;
