import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ApiResponseInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const msg = this.reflector.get('api:success', context.getHandler())?.msg;

    return next.handle().pipe(
      map((data) => ({
        status: 'success',
        statusCode: context.switchToHttp().getResponse().statusCode,
        timestamp: new Date().toISOString(),
        path: context.switchToHttp().getRequest().url,
        message: msg || undefined, //
        data,
      })),
    );
  }
}
