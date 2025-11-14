import { BaseClientError } from './base';

export class NotFoundError extends BaseClientError {
  constructor(
    resource: string = 'resource',
    code: string = 'NOT_FOUND',
    details: Record<string, unknown> = {},
  ) {
    super(`${resource}`, 404, code, details);
  }
}

export default NotFoundError;
