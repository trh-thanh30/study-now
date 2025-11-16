import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { BaseClientError } from '../response/client-errors/base';
import { BaseServerError } from '../response/server-erros/base';

@Catch(BaseClientError, BaseServerError)
export class ALlCustomExceptionFilter implements ExceptionFilter {
  catch(exception: BaseClientError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    return response.status(exception.statusCode).json(exception.toResponse());
  }
}
