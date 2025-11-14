import { z } from 'zod';

const envSchema = z.object({
  // Environment
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),

  // Application
  APP_NAME: z.string().default('study-now-server'),
  PORT: z.coerce.number().default(3000),

  // Cookie Configuration
  COOKIE_DOMAIN: z.string().default('localhost'),
  COOKIE_SAME_SITE: z.enum(['strict', 'lax', 'none']).default('lax'),
  COOKIE_SECURE: z
    .string()
    .transform((val) => val === 'true')
    .default(false)
    .pipe(z.boolean())
    .pipe(z.boolean()),
  COOKIE_HTTP_ONLY: z
    .string()
    .transform((val) => val === 'true')
    .default(true),
  COOKIE_MAX_AGE: z.coerce
    .number()
    .int()
    .min(1)
    .default(7 * 24 * 60 * 60 * 1000), // 7 days

  // Database
  DB_HOST: z.string().default('localhost'),
  DB_PORT: z.coerce.number().default(5432),
  DB_USER: z.string().default('postgres'),
  DB_PASSWORD: z.string().default('postgres'),
  DB_NAME: z.string().default('study_now'),
  DB_SCHEMA: z.string().default('public'),
  // DATABASE_URL: z.string().url(),

  // Docker Database Config
  POSTGRES_USER: z.string().default('postgres'),
  POSTGRES_PASSWORD: z.string().default('postgres'),
  POSTGRES_DB: z.string().default('study_now'),

  // Docker Port Config
  DEV_DB_PORT: z.coerce.number().default(5432),
  PROD_DB_PORT: z.coerce.number().default(5554),

  // Jobs
  TZ: z.string().default('Asia/Ho_Chi_Minh'),

  // Redis
  REDIS_HOST: z.string().default('localhost'),
  REDIS_PORT: z.coerce.number().default(6379),

  // Security
  JWT_SECRET: z.string().default('your-super-secret-jwt-key-here'),
  JWT_EXPIRES_IN: z.string().default('24h'),

  // Email Configuration (Optional)
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.coerce.number().optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  SMTP_FROM: z.string().email().optional(),

  // Logging Configuration
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug']).default('info'),
  LOG_FILE_MAX_SIZE: z.string().default('10m'),
  LOG_FILE_MAX_FILES: z.coerce.number().default(5),

  // Rate Limiting
  RATE_LIMIT_TTL: z.coerce.number().default(60),
  RATE_LIMIT_MAX: z.coerce.number().default(100),
});

export type Environment = z.infer<typeof envSchema>;

// Parse and validate environment variables
export function validateEnv(input: Record<string, unknown>): Environment {
  // Construct DATABASE_URL if not provided but individual components are
  if (
    !input.DATABASE_URL &&
    input.DB_USER &&
    input.DB_PASSWORD &&
    input.DB_HOST &&
    input.DB_PORT &&
    input.DB_NAME &&
    input.DB_SCHEMA
  ) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions, @typescript-eslint/no-base-to-string
    input.DATABASE_URL = `postgresql://${input.DB_USER}:${input.DB_PASSWORD}@${input.DB_HOST}:${input.DB_PORT}/${input.DB_NAME}?schema=${input.DB_SCHEMA}`;
  }

  // Parse CORS_ORIGINS into array if provided
  if (input.CORS_ORIGINS && typeof input.CORS_ORIGINS === 'string') {
    // Keep as string for now, can be split in the app configuration
    // input.CORS_ORIGINS = input.CORS_ORIGINS.split(',').map(origin => origin.trim());
  }

  // Parse and validate
  const parsed = envSchema.safeParse(input);
  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((i) => `${i.path.join('.')}: ${i.message}`)
      .join('; ');
    // throw error to nestjs
    console.error('❌ Invalid environment variables:', issues);
    console.error('🔍 Failed validation details:', parsed.error.format());
    process.exit(1);
  }

  // Log successful validation in development
  if (parsed.data.NODE_ENV === 'development') {
    // const envFilePath = path.resolve(process.cwd(), '../../.env.development');
    // const rawEnv = fs.readFileSync(envFilePath, 'utf-8');
    console.log('✅ Environment variables validated successfully');
    console.log('🔍 Parsed environment variables:', parsed.data);
    // console.log('🔍 Raw environment file:', rawEnv);
  }

  return parsed.data;
}
