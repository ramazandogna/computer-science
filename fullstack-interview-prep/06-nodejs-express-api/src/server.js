/**
 * SERVER — wraps the Express app in a Node HTTP server, starts listening, and
 * implements GRACEFUL SHUTDOWN. This is what each cluster worker runs (and also
 * the single-process `npm run dev` entry).
 *
 * Graceful shutdown matters: when a deploy/orchestrator sends SIGTERM, you want
 * to (1) stop accepting NEW connections, (2) let in-flight requests FINISH, then
 * (3) close DB/Redis connections and exit. Killing mid-request drops user
 * requests and can corrupt state. This is a frequent senior interview question.
 */
import http from 'node:http';
import process from 'node:process';

import { app } from './app.js';
import { config } from './config/index.js';
import { redis } from './lib/redis.js';

const server = http.createServer(app);

server.listen(config.port, () => {
  console.log(`[worker ${process.pid}] listening on :${config.port} (${config.env})`);
});

// --- Graceful shutdown -------------------------------------------------------
let shuttingDown = false;

async function shutdown(signal) {
  if (shuttingDown) return; // ignore repeated signals
  shuttingDown = true;
  console.log(`[worker ${process.pid}] ${signal} received; draining…`);

  // 1) Stop accepting new connections; the callback fires once all in-flight
  //    requests have completed and existing keep-alive sockets are idle.
  server.close(async () => {
    try {
      // 2) Release external resources so the process can exit cleanly.
      await redis.quit();
    } finally {
      console.log(`[worker ${process.pid}] clean exit`);
      process.exit(0);
    }
  });

  // 3) Safety net: if draining hangs (a stuck long request), force-exit so we
  //    don't block the deploy forever.
  setTimeout(() => {
    console.error(`[worker ${process.pid}] drain timed out; forcing exit`);
    process.exit(1);
  }, 10_000).unref(); // unref so this timer itself doesn't keep the process alive
}

for (const signal of ['SIGTERM', 'SIGINT']) {
  process.on(signal, () => shutdown(signal));
}

// Last-resort safety nets. A truly unexpected error leaves the process in an
// unknown state — log it and exit so the cluster primary forks a fresh worker.
process.on('unhandledRejection', (reason) => {
  console.error('[worker] unhandledRejection:', reason);
});
process.on('uncaughtException', (err) => {
  console.error('[worker] uncaughtException:', err);
  process.exit(1);
});
