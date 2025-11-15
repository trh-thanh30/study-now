import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { BaseClientError } from './base';

@Catch(BaseClientError)
export class ClientErrorFilter implements ExceptionFilter {
  catch(exception: BaseClientError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    return response.status(exception.statusCode).json(exception.toResponse());
  }
}
