import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigType } from '@nestjs/config';
import { RequestMethod, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ALlCustomExceptionFilter } from './common/filter/all-custom-exception-filter';
import { HttpLoggerInterceptor } from './common/interceptors/http-logger.interceptor';
import { FormatLoggerService } from './common/logger/format-logger.service';
import appConfig from './config/app.config';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, {
      bufferLogs: true, // log to stdout
    });

    // Set logger
    const httpLogger = app.get(FormatLoggerService);
    // Set global prefix
    app.setGlobalPrefix('/api/v1', {
      exclude: [
        {
          path: 'health',
          method: RequestMethod.ALL,
        },
      ],
    });

    // Set cookie parser
    app.use(cookieParser());
    app.enableCors({
      origin: [
        'http://localhost:3000',
        'http://localhost:3001',
        'http://localhost:3002',
      ],
      credentials: true,
      allowedHeaders:
        'Origin, X-Requested-With, Content-Type, Accept, Authorization',
      exposedHeaders: 'Set-Cookie',
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    });

    // Set swagger
    const docCfg = new DocumentBuilder()
      .setTitle('Study Now API')
      .setDescription('The Study Now API description')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, docCfg);
    SwaggerModule.setup('api', app, document);

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
    app.useGlobalInterceptors(new HttpLoggerInterceptor(httpLogger));

    // 3. Apply exception filter last
    app.useGlobalFilters(new ALlCustomExceptionFilter());

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
