/**
 * THE EXPRESS APP — the MIDDLEWARE PIPELINE.
 *
 * Express is a chain of middleware: each request flows top-to-bottom through the
 * functions registered with app.use()/app.METHOD() until one sends a response.
 * ORDER MATTERS — security and parsing go first, routes in the middle, and the
 * 404 + error handlers LAST. This file is the request's table of contents.
 *
 *   request ─► helmet ─► json parser ─► logger ─► /health ─► /api routes
 *                                                              │
 *                                              (no match) ─► 404 handler
 *                                              (thrown err) ─► error handler ─► response
 */
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import { config } from './config/index.js';
import { usersRouter } from './modules/users/users.routes.js';
import { notFoundHandler } from './middleware/not-found.js';
import { errorHandler } from './middleware/error-handler.js';

export const app = express();

// 1) Security headers (CSP, HSTS, X-Content-Type-Options, etc.) — set sane
//    defaults before anything else. Cheap, high-value, and interviewers ask
//    "how do you harden an Express app?" — helmet is the first answer.
app.use(helmet());

// 2) Body parsing: turn an incoming JSON body into req.body. The size limit is
//    a DoS guard — without it a client could stream a giant payload into memory.
app.use(express.json({ limit: '10kb' }));

// 3) Request logging. 'dev' is concise/colored for local; you'd use 'combined'
//    (Apache format) behind a real log pipeline in production.
app.use(morgan(config.isProduction ? 'combined' : 'dev'));

// 4) Liveness/readiness probe. Orchestrators (k8s, ECS) poll this to decide if
//    the worker is healthy and should receive traffic. Keep it dependency-light.
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', pid: process.pid, uptime: process.uptime() });
});

// 5) Feature routes, namespaced under /api. Each module mounts its own router —
//    this keeps app.js stable as the app grows (open/closed principle).
app.use('/api/users', usersRouter);

// 6) Fallbacks, in this order: unmatched route -> 404; any thrown/forwarded
//    error -> central handler. These MUST be last.
app.use(notFoundHandler);
app.use(errorHandler);
