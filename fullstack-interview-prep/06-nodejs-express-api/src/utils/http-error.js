/**
 * A typed HTTP error. Throwing `new HttpError(404, 'User not found')` anywhere
 * in the stack lets the CENTRAL error handler (middleware/error-handler.js)
 * translate it into the right status + JSON body. This keeps controllers free
 * of try/catch-and-res.status noise: they just throw, one place formats.
 */
export class HttpError extends Error {
  constructor(statusCode, message, details = undefined) {
    super(message);
    this.name = 'HttpError';
    this.statusCode = statusCode;
    this.details = details; // optional structured info (e.g. validation issues)
    // Marks this as an error we EXPECTED (vs an unexpected bug). The error
    // handler uses this to decide how loudly to log and how much to expose.
    this.isOperational = true;
  }
}

// Convenience factories for the common cases — reads nicely at call sites.
export const notFound = (msg = 'Not found') => new HttpError(404, msg);
export const badRequest = (msg, details) => new HttpError(400, msg, details);
