import { Controller, Get } from '@nestjs/common';
import {
  DiskHealthIndicator,
  HealthCheck,
  HealthCheckService,
} from '@nestjs/terminus';
import { PrismaService } from 'src/prisma/prisma.service';

interface HealthResponse {
  status: 'ok' | 'error';
  timestamp: string;
  uptime: number;
  database?: {
    status: 'connected' | 'disconnected';
  };
  msg?: string;
}

@Controller('health')
export class HealthController {
  private readonly startTime = Date.now();

  constructor(
    private readonly prisma: PrismaService,
    private readonly health: HealthCheckService,
    private readonly disk: DiskHealthIndicator,
  ) {}

  @Get()
  async getHealth(): Promise<HealthResponse> {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: Date.now() - this.startTime,
    };
  }

  @Get('live')
  getLive(): { status: 'alive' } {
    return { status: 'alive' };
  }

  @Get('ready')
  async getReady(): Promise<HealthResponse> {
    try {
      // Test database connection
      await this.prisma.$queryRaw`SELECT 1`;

      return {
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: Date.now() - this.startTime,
        database: {
          status: 'connected',
        },
      };
    } catch (error) {
      return {
        status: 'error',
        msg: error as string,
        timestamp: new Date().toISOString(),
        uptime: Date.now() - this.startTime,
        database: {
          status: 'disconnected',
        },
      };
    }
  }
  @Get('disk')
  @HealthCheck()
  check() {
    return this.health.check([
      () =>
        this.disk.checkStorage('storage', { path: '/', thresholdPercent: 0.5 }),
    ]);
  }
}
