/**
 * THE ROUTES — the module's public HTTP surface. A router is a mini-app you
 * mount under a prefix (/api/users in app.js). Each route declares its pipeline:
 *   validate(schema)  ->  asyncHandler(controller method)
 *
 * Reading a route top-to-bottom tells you exactly what happens to a request:
 * what's validated, then what handles it. This is the "table of contents" for
 * the users feature.
 */
import { Router } from 'express';

import { usersController } from './users.controller.js';
import { validate } from '../../middleware/validate.js';
import { asyncHandler } from '../../middleware/async-handler.js';
import { getUserSchema, createUserSchema } from './users.schema.js';

export const usersRouter = Router();

// GET /api/users — list (cached)
usersRouter.get('/', asyncHandler(usersController.list));

// POST /api/users — create (validated, busts the list cache)
usersRouter.post('/', validate(createUserSchema), asyncHandler(usersController.create));

// GET /api/users/:id — fetch one (validated + coerced id, cached)
usersRouter.get('/:id', validate(getUserSchema), asyncHandler(usersController.getById));
