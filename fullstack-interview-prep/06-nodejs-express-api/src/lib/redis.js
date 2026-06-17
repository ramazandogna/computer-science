/**
 * REDIS CLIENT + a tiny cache helper.
 *
 * WHY Redis here: cluster workers are separate processes with separate memory,
 * so an in-process cache can't be shared between them (and is lost on restart).
 * Redis is a fast, shared, out-of-process store every worker can read/write —
 * the standard place for caches, sessions, rate-limit counters, and queues.
 *
 * DESIGN PRINCIPLE: the cache must NEVER take down the app. If Redis is
 * unreachable, reads should fall through to the source of truth (a cache MISS),
 * not throw. So every cache operation here is wrapped to degrade gracefully.
 */
import Redis from 'ioredis';
import { config } from '../config/index.js';

// ioredis auto-reconnects. `maxRetriesPerRequest: null` + a retry strategy keeps
// it trying in the background instead of throwing on every command while Redis
// is briefly down. lazyConnect lets the app boot even if Redis isn't up yet.
export const redis = new Redis(config.redisUrl, {
  lazyConnect: false,
  maxRetriesPerRequest: 2,
  retryStrategy: (times) => Math.min(times * 200, 2000), // backoff, capped at 2s
});

redis.on('error', (err) => {
  // Log once-ish; do NOT crash. A noisy connection error shouldn't kill workers.
  console.warn(`[redis] connection issue: ${err.code || err.message}`);
});
redis.on('connect', () => console.log('[redis] connected'));

/**
 * cache-aside helper: try the cache; on miss (or any Redis error) run the
 * `producer` to get fresh data, then best-effort write it back with a TTL.
 *
 * This "read-through / cache-aside" pattern is the most common caching strategy
 * and a guaranteed interview topic. The TTL bounds staleness; on a write you'd
 * also explicitly invalidate the key (see users.service.js).
 */
export async function cached(key, ttlSeconds, producer) {
  try {
    const hit = await redis.get(key);
    if (hit !== null) {
      return { value: JSON.parse(hit), source: 'cache' };
    }
  } catch {
    // Redis down/slow -> treat as a miss and continue. The app stays up.
  }

  const value = await producer(); // the source of truth (DB/repository)

  try {
    // SET with EX (expiry). Fire-and-forget enough that a failure here is fine.
    await redis.set(key, JSON.stringify(value), 'EX', ttlSeconds);
  } catch {
    /* ignore cache write failures */
  }

  return { value, source: 'origin' };
}

export async function invalidate(key) {
  try {
    await redis.del(key);
  } catch {
    /* ignore */
  }
}
