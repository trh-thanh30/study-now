/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { FormatLoggerService } from '../logger/format-logger.service';

@Injectable()
export class HttpLoggerInterceptor implements NestInterceptor {
  constructor(private readonly logger: FormatLoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const { method, url, body } = req;

    const start = Date.now();

    const safeBody = { ...body };
    delete safeBody.password;

    this.logger.log(`➡️  Request: ${method} ${url}`, {
      body: safeBody,
      ip: req.ip,
      userAgent: req.headers['user-agent'],
    });

    return next.handle().pipe(
      tap((data) => {
        const duration = Date.now() - start;
        this.logger.log(`⬅️  Response: ${method} ${url} - ${duration}ms`, {
          response: data,
        });
      }),
      catchError((err) => {
        const duration = Date.now() - start;

        this.logger.error(`❌ Error: ${method} ${url} - ${duration}ms`, {
          message: err.message,
          stack: err.stack,
        });

        throw err;
      }),
    );
  }
}
