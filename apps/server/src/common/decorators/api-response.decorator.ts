import { SetMetadata } from '@nestjs/common';
import { ApiResponseOptions } from '../types/response.type';

export function ApiSuccess(msg?: string, options?: ApiResponseOptions) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    SetMetadata('api:success', { msg, options })(
      target,
      propertyKey,
      descriptor,
    );
    return descriptor;
  };
}

export function ApiError(statusCode: number, msg?: string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    SetMetadata('api:error', { statusCode, msg })(
      target,
      propertyKey,
      descriptor,
    );
    return descriptor;
  };
}

export function RawResponse() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    // Set metadata to bypass ApiResponse wrapping
    SetMetadata('api:raw', true)(target, propertyKey, descriptor);

    return descriptor;
  };
}
export function ApiResponse(
  statusCode: number,
  message?: string,
  options?: ApiResponseOptions,
) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    SetMetadata('api:custom', { statusCode, message, options })(
      target,
      propertyKey,
      descriptor,
    );

    return descriptor;
  };
}
