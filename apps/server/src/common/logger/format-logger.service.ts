/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Injectable, LoggerService, LogLevel } from '@nestjs/common';
import { createLogger, format, transports } from 'winston';
@Injectable()
export class FormatLoggerService implements LoggerService {
  private logger = createLogger({
    level: 'info',
    format: format.combine(
      format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
      }),
      format.errors({ stack: true }),
      format.splat(),
      format.json(),
    ),
    transports: [
      // Log ra console
      new transports.Console(),
      // Log ra file
      new transports.File({
        filename: 'logs/error.log',
        level: 'error',
      }),
      new transports.File({ filename: 'logs/combined.log' }),
    ],
  });

  log(message: any, meta?: Record<string, any>) {
    this.logger.log({ level: 'info', message, ...meta });
  }

  error(message: any, ...optionalParams: any[]) {
    this.logger.error(message, ...optionalParams);
  }

  warn(message: any, ...optionalParams: any[]) {
    this.logger.warn(message, ...optionalParams);
  }

  fatal(message: any, ...optionalParams: any[]) {
    this.logger.error(message, ...optionalParams);
  }
  debug(message: any, ...optionalParams: any[]) {
    this.logger.debug(message, ...optionalParams);
  }
  verbose(message: any, ...optionalParams: any[]) {
    this.logger.verbose(message, ...optionalParams);
  }

  setLogLevels(levels: LogLevel[]) {
    this.logger.level = levels[0];
  }
}
