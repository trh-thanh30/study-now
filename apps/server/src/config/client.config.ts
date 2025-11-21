import { registerAs } from '@nestjs/config';

export default registerAs('clientConfig', () => ({
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3001',
}));
