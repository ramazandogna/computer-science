/**
 * CONFIG — load environment once, validate it, and export a typed-ish object.
 *
 * WHY centralize config: env vars are stringly-typed and easy to typo. Reading
 * `process.env.PORT` in 15 files means 15 places to get a default wrong. We
 * parse + validate ONCE here and fail fast on startup if something required is
 * missing — far better than a confusing crash three requests later.
 */
import 'dotenv/config'; // loads .env into process.env (no-op if the file is absent)

function required(name, fallback) {
  const value = process.env[name] ?? fallback;
  if (value === undefined) {
    // Fail fast: a misconfigured process should never start and pretend it's healthy.
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
}

export const config = {
  env: process.env.NODE_ENV ?? 'development',
  port: Number(required('PORT', '3000')),
  redisUrl: required('REDIS_URL', 'redis://localhost:6379'),
  cacheTtlSeconds: Number(required('CACHE_TTL_SECONDS', '60')),
  isProduction: process.env.NODE_ENV === 'production',
};
