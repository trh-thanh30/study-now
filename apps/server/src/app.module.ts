import * as path from 'path';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { HealthModule } from './module/health/health.module';
import { UserModule } from './module/user/user.module';
import {
  appConfig,
  bullConfig,
  bullConfigFactory,
  cookieConfig,
  databaseConfig,
  emailConfig,
  limitRequestConfig,
  limitRequestConfigFactory,
  tokenConfig,
  validateEnv,
} from './config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ApiResponseInterceptor } from './common/interceptors/api-response.interceptor';
import { AuthModule } from './module/auth/auth.module';
import { BullModule } from '@nestjs/bullmq';
import { EmailModule } from './email/email.module';
import { AuthGuard } from './common/guard/jwt-auth.guard';
import { TokenUseCase as TokenService } from './module/auth/use-case/jwt-token.usecase';
import { FormatLoggerService } from './common/logger/format-logger.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      expandVariables: true,
      envFilePath: path.resolve(process.cwd(), '../../.env.development'),
      validate: validateEnv,
      load: [
        databaseConfig,
        appConfig,
        emailConfig,
        bullConfig,
        cookieConfig,
        limitRequestConfig,
        tokenConfig,
      ],
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: limitRequestConfigFactory,
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: bullConfigFactory,
    }),
    PrismaModule,
    HealthModule,
    UserModule,
    EmailModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    TokenService,
    FormatLoggerService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ApiResponseInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
