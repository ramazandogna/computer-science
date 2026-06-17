/**
 * THE VALIDATION SCHEMAS (Zod). One schema per route, describing the exact
 * shape of params/body/query that route accepts. The `validate` middleware runs
 * these at the edge so the controller/service receive clean, typed data.
 */
import { z } from 'zod';

// GET /api/users/:id — the id arrives as a STRING in the URL; coerce + validate
// it's a positive integer. z.coerce turns "3" into 3 so the controller gets a
// real number (and an early 400 for "/api/users/abc").
export const getUserSchema = z.object({
  params: z.object({
    id: z.coerce.number().int().positive(),
  }),
  body: z.object({}).optional(),
  query: z.object({}).passthrough().optional(),
});

// POST /api/users — validate the JSON body. Unknown fields are stripped by
// default, trimming guards against accidental whitespace, and role is an enum
// with a default so the client can omit it.
export const createUserSchema = z.object({
  body: z.object({
    name: z.string().trim().min(2, 'name must be at least 2 chars'),
    email: z.string().trim().toLowerCase().email('must be a valid email'),
    role: z.enum(['admin', 'user']).default('user'),
  }),
  params: z.object({}).optional(),
  query: z.object({}).passthrough().optional(),
});
