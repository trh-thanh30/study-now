import { registerAs } from '@nestjs/config';
export default registerAs('app', () => ({
  name: process.env.APP_NAME || 'study-now-server',
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV || 'development',
  origins: process.env.CORS_ORIGINS
    ? process.env.CORS_ORIGINS.split(',').map((origin) => origin.trim())
    : ['http://localhost:3000'],
}));
