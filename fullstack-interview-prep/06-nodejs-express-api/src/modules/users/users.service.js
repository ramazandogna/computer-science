/**
 * THE SERVICE — business logic + orchestration. It coordinates the repository
 * and the cache, enforces rules, and throws domain errors. It knows NOTHING
 * about HTTP (no req/res) — that's the controller's job. This separation means
 * you could call the service from a CLI, a cron job, or a GraphQL resolver
 * without dragging Express along.
 */
import { usersRepository } from './users.repository.js';
import { cached, invalidate } from '../../lib/redis.js';
import { config } from '../../config/index.js';
import { notFound, badRequest } from '../../utils/http-error.js';

const LIST_KEY = 'users:all';
const itemKey = (id) => `users:${id}`;

export const usersService = {
  /**
   * Cache-aside read: serve from Redis if present, else hit the repo and
   * populate the cache. The response tells you the source so you can SEE the
   * cache working (first call: "origin" ~150ms, next: "cache" ~1ms).
   */
  async list() {
    const { value, source } = await cached(LIST_KEY, config.cacheTtlSeconds, () =>
      usersRepository.findAll(),
    );
    return { users: value, source };
  },

  async getById(id) {
    const { value, source } = await cached(itemKey(id), config.cacheTtlSeconds, () =>
      usersRepository.findById(id),
    );
    // A cached `null` still means "not found" — translate to a 404 either way.
    if (!value) throw notFound(`User ${id} not found`);
    return { user: value, source };
  },

  /**
   * Write path. Business rules live HERE (e.g. unique email). After a
   * successful write we INVALIDATE the affected cache keys so the next read
   * doesn't serve stale data — the other half of cache-aside that people forget.
   */
  async create(input) {
    const all = await usersRepository.findAll();
    if (all.some((u) => u.email === input.email)) {
      throw badRequest(`Email already in use: ${input.email}`);
    }

    const user = await usersRepository.create(input);

    // Bust the list cache so the new user shows up immediately. (We don't need
    // to set the item key; it'll populate lazily on first read.)
    await invalidate(LIST_KEY);

    return user;
  },
};
