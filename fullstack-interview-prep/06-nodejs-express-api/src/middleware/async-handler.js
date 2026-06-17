/**
 * asyncHandler — wrap an async route handler so a rejected promise is forwarded
 * to Express's error middleware via next(err).
 *
 * WHY this exists: in Express 4, if an `async` handler throws/rejects, Express
 * does NOT catch it — the request hangs forever and you get an unhandled
 * rejection. You'd otherwise need try/catch + next(err) in EVERY handler. This
 * one-line wrapper does it once.
 *
 * NOTE: Express 5 fixes this natively (it forwards rejected promises for you),
 * so in a v5 codebase this wrapper becomes unnecessary. Worth saying in an
 * interview — it shows you know why the pattern exists and when it's obsolete.
 */
export const asyncHandler = (handler) => (req, res, next) =>
  Promise.resolve(handler(req, res, next)).catch(next);
