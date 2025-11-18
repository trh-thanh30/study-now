import { registerAs } from '@nestjs/config';

export default registerAs('cookie', () => ({
  domain: process.env.COOKIE_DOMAIN || 'localhost',
  sameSite: process.env.COOKIE_SAME_SITE || 'lax',
  secure: process.env.COOKIE_SECURE || false,
  httpOnly: process.env.COOKIE_HTTP_ONLY || true,
  maxAge: process.env.COOKIE_MAX_AGE || 7 * 24 * 60 * 60 * 1000,
  path: process.env.COOKIE_PATH || '/',
}));
