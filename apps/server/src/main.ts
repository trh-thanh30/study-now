import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigType } from '@nestjs/config';
import appConfig from './config/app.config';
import { RequestMethod, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, {
      bufferLogs: true, // log to stdout
    });

    // Set global prefix
    app.setGlobalPrefix('/api/v1', {
      exclude: [
        {
          path: 'health',
          method: RequestMethod.ALL,
        },
      ],
    });

    // Get app config
    const appCfg = app.get<ConfigType<typeof appConfig>>(appConfig.KEY);

    // Apply global pipes, interceptors, filters

    // 1. Apply validation pipes
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true, // remove all fields that are not in the DTO
        transform: true, // transform the data
        forbidNonWhitelisted: true, // throw error if field is not in the DTO
        transformOptions: {
          enableImplicitConversion: true, // convert the request body to the DTO
        },
      }),
    );

    // 2. Apply global interceptors
    app.useGlobalInterceptors();

    // 3. Apply exception filter last
    app.useGlobalFilters();

    // Start the application
    const port = appCfg.port;
    const env = appCfg.env;
    await app.listen(port, '0.0.0.0');
    console.log(
      `-> Application ${appCfg.name} running on port ${port} in environment ${env} <-`,
    );
  } catch (error) {
    console.log('Failed to start application server: ', error);
    process.exit(1);
  }
}
bootstrap().catch((err) => {
  console.log('Failed to start application server: ', err);
  process.exit(1);
});
