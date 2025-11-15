import { registerAs } from '@nestjs/config';
interface TokenConfig {
  access_secret: string;
  access_expires_in: string;
  refresh_secret: string;
  refresh_expires_in: string;
}
export default registerAs<TokenConfig>('token', () => {
  return {
    access_secret: process.env.JWT_ACCESS_SECRET || 'your-access-secret-key',
    access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN || '15m',
    refresh_secret: process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key',
    refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  };
});
