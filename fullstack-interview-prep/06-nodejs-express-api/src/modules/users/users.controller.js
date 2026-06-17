/**
 * THE CONTROLLER — the HTTP adapter. Its only jobs: read validated input off
 * the request, call the service, and shape the HTTP response (status + body).
 * NO business logic, NO data access. Thin on purpose.
 *
 * Notice there's no try/catch: handlers are wrapped with asyncHandler in the
 * router, so any thrown/rejected error flows to the central error handler.
 */
import { usersService } from './users.service.js';

export const usersController = {
  async list(_req, res) {
    const { users, source } = await usersService.list();
    // Surfacing the cache source in a header is a nice debugging touch — try
    // `curl -i` twice and watch X-Data-Source flip from origin to cache.
    res.set('X-Data-Source', source);
    res.json({ data: users });
  },

  async getById(req, res) {
    // req.validated.params.id is already coerced to a number by the Zod schema.
    const { id } = req.validated.params;
    const { user, source } = await usersService.getById(id);
    res.set('X-Data-Source', source);
    res.json({ data: user });
  },

  async create(req, res) {
    const user = await usersService.create(req.validated.body);
    // 201 Created + the new resource. Returning it saves the client a round-trip.
    res.status(201).json({ data: user });
  },
};
