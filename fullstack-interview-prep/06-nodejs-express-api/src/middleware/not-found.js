/**
 * 404 handler — mounted AFTER all routes. If a request reaches here, no route
 * matched, so we forward a 404 HttpError to the central error handler. (We
 * forward rather than respond directly so all error responses share one format.)
 */
import { notFound } from '../utils/http-error.js';

export function notFoundHandler(req, _res, next) {
  next(notFound(`Route not found: ${req.method} ${req.originalUrl}`));
}
