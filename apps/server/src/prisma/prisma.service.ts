/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  Inject,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import databaseConfig from 'src/config/database.config';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(
    @Inject(databaseConfig.KEY)
    private readonly dbCfg: ConfigType<typeof databaseConfig>,
  ) {
    super({
      datasources: {
        db: {
          url: dbCfg.url,
        },
      },
    });
  }

  async onModuleInit(): Promise<void> {
    await this.$connect();
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }
}
