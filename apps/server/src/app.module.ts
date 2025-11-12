import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { validateEnv } from './config/env.config';
import databaseConfig from './config/database.config';
import appConfig from './config/app.config';
import * as path from 'path';
import { PrismaModule } from './prisma/prisma.module';
import { HealthModule } from './module/health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      expandVariables: true,
      envFilePath: path.resolve(process.cwd(), '../../.env.development'),
      validate: validateEnv,
      load: [databaseConfig, appConfig],
    }),
    PrismaModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
