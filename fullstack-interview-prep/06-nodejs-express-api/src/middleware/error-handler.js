/**
 * THE CENTRAL ERROR HANDLER — the single place that turns thrown errors into
 * HTTP responses. Express identifies an error-handling middleware by its FOUR
 * arguments (err, req, res, next); it's mounted LAST in app.js so any next(err)
 * from anywhere lands here.
 *
 * WHY centralize: controllers stay clean (they just throw); error formatting,
 * status mapping, logging, and "don't leak internals in prod" all live in one
 * auditable place.
 */
import { HttpError } from '../utils/http-error.js';
import { config } from '../config/index.js';

// eslint-disable-next-line no-unused-vars  (Express needs the 4-arg signature)
export function errorHandler(err, req, res, _next) {
  // Operational errors (HttpError we threw on purpose) carry their own status.
  // Anything else is an unexpected bug -> 500, and we DON'T leak its message
  // to the client in production.
  const isHttpError = err instanceof HttpError;
  const statusCode = isHttpError ? err.statusCode : 500;

  // Log the full error server-side regardless. For 5xx, log loudly.
  if (statusCode >= 500) {
    console.error(`[error] ${req.method} ${req.originalUrl}`, err);
  }

  const body = {
    error: {
      message:
        isHttpError || !config.isProduction ? err.message : 'Internal Server Error',
      ...(isHttpError && err.details ? { details: err.details } : {}),
      // Stack traces are a debugging aid in dev, an information leak in prod.
      ...(config.isProduction ? {} : { stack: err.stack }),
    },
  };

  res.status(statusCode).json(body);
}
