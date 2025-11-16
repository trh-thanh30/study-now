import { BaseServerError } from './base';
export class InternalServerError extends BaseServerError {
  constructor(message: string, details?: Record<string, unknown>) {
    super(message, 500, 'INTERNAL_SERVER_ERROR', details);
  }
}
export default InternalServerError;
