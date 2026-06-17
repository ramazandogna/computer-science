/**
 * validate — a middleware factory that validates request parts against a Zod
 * schema BEFORE the controller runs.
 *
 * WHY validate at the edge: the controller/service should be able to TRUST its
 * inputs. Pushing validation to the boundary means business logic never has to
 * defensively re-check types, and clients get a clear 400 with details instead
 * of a confusing 500 deep in the stack. "Validate at the boundary, trust
 * within" is the principle to articulate.
 */
import { badRequest } from '../utils/http-error.js';

export const validate = (schema) => (req, _res, next) => {
  const result = schema.safeParse({
    body: req.body,
    params: req.params,
    query: req.query,
  });

  if (!result.success) {
    // Flatten Zod's issues into a compact, client-friendly shape.
    const details = result.error.issues.map((i) => ({
      path: i.path.join('.'),
      message: i.message,
    }));
    return next(badRequest('Validation failed', details));
  }

  // Attach the PARSED (coerced/defaulted) data to a dedicated property and read
  // it from the controller. GOTCHA we deliberately avoid: `req.query` is a
  // getter-only accessor in Express, so reassigning `req.query = ...` throws in
  // strict mode (and ESM is always strict). Using `req.validated` sidesteps that
  // and makes "this data has been validated" explicit at the call site.
  req.validated = result.data;
  next();
};
