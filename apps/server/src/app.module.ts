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
  databaseConfig,
  emailConfig,
  validateEnv,
} from './config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ApiResponseInterceptor } from './common/interceptors/api-response.interceptor';
import { AuthModule } from './module/auth/auth.module';
import { BullModule } from '@nestjs/bullmq';
import { EmailModule } from './email/email.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      expandVariables: true,
      envFilePath: path.resolve(process.cwd(), '../../.env.development'),
      validate: validateEnv,
      load: [databaseConfig, appConfig, emailConfig, bullConfig],
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
    {
      provide: APP_INTERCEPTOR,
      useClass: ApiResponseInterceptor,
    },
  ],
})
export class AppModule {}
