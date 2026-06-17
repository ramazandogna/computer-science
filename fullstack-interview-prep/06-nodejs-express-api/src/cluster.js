/**
 * ============================================================================
 * THE HEART OF THIS MODULE — CLUSTERING.
 * Run with:  npm start   (production entry point)
 * ============================================================================
 *
 * THE PROBLEM: Node runs your JavaScript on a SINGLE thread. One Node process
 * uses ONE CPU core no matter how many your machine has. On an 8-core box,
 * 7 cores sit idle while one is pegged. CPU-bound work also blocks the event
 * loop, so every other request waits.
 *
 * THE FIX (this file): the `cluster` module. A PRIMARY process forks N WORKER
 * processes (one per core). All workers share the SAME listening port — the OS
 * (and Node's round-robin scheduler) distributes incoming connections across
 * them. Now all cores do real work and one slow request only blocks one worker.
 *
 *        ┌─────────────┐        forks
 *        │   PRIMARY   │ ──────────────────┐
 *        │ (this file) │                   │
 *        └─────────────┘                   ▼
 *            shares :3000          ┌──────────────┐  ┌──────────────┐
 *                 ▲                │  WORKER 1    │  │  WORKER 2    │  ... (× CPU cores)
 *                 └────────────────│ server.js    │  │ server.js    │
 *                                  └──────────────┘  └──────────────┘
 *
 * IMPORTANT NUANCE (say this in an interview): workers are SEPARATE PROCESSES
 * with separate memory. They do NOT share JS variables — so any in-memory state
 * (sessions, caches, counters) must live in a shared store like REDIS (which is
 * exactly why this module uses Redis). For CPU-heavy work WITHIN one request you
 * would instead reach for `worker_threads` (shared-memory threads), not cluster.
 *
 * ALTERNATIVE you should mention: in containerized/k8s setups people often run
 * ONE process per container and scale by running more containers behind a load
 * balancer, letting the orchestrator handle restarts. Cluster is the in-process
 * version of the same idea; both are valid — know the trade-off.
 */
import cluster from 'node:cluster';
import os from 'node:os';
import process from 'node:process';

// One worker per logical CPU is the common default. You can cap it (e.g. to
// container CPU limits) so you don't oversubscribe in k8s.
const workerCount = os.availableParallelism(); // Node 19+; was os.cpus().length

if (cluster.isPrimary) {
  console.log(`[primary ${process.pid}] starting ${workerCount} workers`);

  // Fork the workers. Each fork re-runs THIS file, but in a worker the
  // `cluster.isPrimary` branch is false, so it falls through to the else branch
  // and boots an HTTP server.
  for (let i = 0; i < workerCount; i++) {
    cluster.fork();
  }

  // SELF-HEALING: if a worker dies (crash, OOM, uncaught error), replace it so
  // capacity is restored. A real system would add backoff to avoid a crash loop
  // hammering the CPU when every worker dies instantly.
  cluster.on('exit', (worker, code, signal) => {
    console.warn(`[primary] worker ${worker.process.pid} died (${signal || code}); forking a replacement`);
    cluster.fork();
  });

  // Graceful cluster shutdown: forward the signal to workers so each can drain
  // in-flight requests (see server.js) before the primary exits.
  for (const signal of ['SIGTERM', 'SIGINT']) {
    process.on(signal, () => {
      console.log(`[primary] ${signal} received; shutting workers down`);
      for (const worker of Object.values(cluster.workers)) {
        worker.process.kill(signal);
      }
    });
  }
} else {
  // WORKER PROCESS: actually serve traffic. Importing server.js starts listening.
  import('./server.js');
}
