# 06 — Node.js + Express API (layered, clustered, cached, dockerized)

This is the backend module. It's a small REST API for a `users` resource, but
built the way a production service is: **layered architecture** (route →
controller → service → repository), **clustered** across CPU cores, **Redis**
caching, centralized **validation** and **error handling**, **graceful
shutdown**, and a **Docker + Compose** setup with Redis.

## Run it

Two ways, on purpose:

```bash
cd 06-nodejs-express-api
cp .env.example .env
npm install

# A) Single process, auto-reload — best for reading/debugging:
npm run dev

# B) Clustered (one worker per CPU) — the production entry point:
npm start

# C) Everything (API + Redis) in containers:
docker compose up --build
```

Then, in another terminal:

```bash
npm run test:smoke      # hits /health and the /api/users routes
curl -i localhost:3000/api/users   # run twice — watch X-Data-Source flip
```

> **No Redis running?** The app still works. Cache ops degrade to a miss
> (`X-Data-Source: origin` every time) instead of crashing — see the design note
> in `src/lib/redis.js`. Start Redis (or `docker compose up`) to see cache hits.

## Read in this order

```
npm start ─► src/cluster.js  (PRIMARY forks workers — THE HEART)
                  │ each worker runs ▼
              src/server.js   (http server + graceful shutdown)
                  │ uses ▼
               src/app.js     (middleware pipeline + route mounting)
                  │ mounts ▼
   src/modules/users/users.routes.js
        │ validate(schema) ─► asyncHandler(controller)
        ▼
   users.controller.js  →  users.service.js  →  users.repository.js
   (HTTP adapter)          (business + cache)    (data access only)
```

1. [`src/cluster.js`](./src/cluster.js) — **start here.** Why Node is
   single-threaded, how the cluster primary forks one worker per core, worker
   self-healing, and the worker_threads vs cluster vs multi-container distinction.
2. [`src/server.js`](./src/server.js) — HTTP server + **graceful shutdown**
   (drain in-flight requests on SIGTERM before exiting).
3. [`src/app.js`](./src/app.js) — the **middleware pipeline**; order matters.
4. [`src/modules/users/`](./src/modules/users/) — the layers. Read
   `users.routes.js` → `users.controller.js` → `users.service.js` →
   `users.repository.js`. Each file's header explains what it may and may NOT do.
5. [`src/lib/redis.js`](./src/lib/redis.js) — **cache-aside** with graceful
   degradation. The cache must never take down the app.
6. [`src/middleware/`](./src/middleware/) — `validate` (edge validation),
   `async-handler` (forward async errors in Express 4), `error-handler` (the one
   place that formats errors).
7. [`Dockerfile`](./Dockerfile) + [`docker-compose.yml`](./docker-compose.yml) —
   multi-stage build, non-root user, healthchecks, service-name networking.

## Why this layering (the architecture answer)

| Layer | Knows about | Must NOT do |
|-------|-------------|-------------|
| **Route** | HTTP verbs/paths, which middleware runs | business logic |
| **Controller** | `req`/`res`, status codes | data access, business rules |
| **Service** | business rules, caching, orchestration | HTTP (`req`/`res`) |
| **Repository** | how data is stored (DB/array/API) | business rules, HTTP |

The payoff: each layer is independently testable and swappable. Move from the
in-memory array to Postgres by rewriting **only** `users.repository.js`. Reuse
the service from a CLI without Express. Interviewers call this "separation of
concerns" / "single responsibility"; being able to point at *which file changes
when requirement X changes* is the senior signal.

## Clustering, in one paragraph

Node executes your JS on one thread → one CPU core per process. `src/cluster.js`
forks N worker processes (one per core); they share the listening port and the
OS round-robins connections. Workers have **separate memory**, so shared state
(the cache) lives in **Redis**, not a JS variable. For CPU-bound work inside a
single request you'd use `worker_threads` instead. In k8s, many teams run one
process per container and scale with replicas — same goal, different layer.

## Caching, in one paragraph

The service uses **cache-aside**: check Redis; on a miss, hit the repository and
populate the cache with a TTL; on a write, **invalidate** the affected keys so
reads don't go stale. The repository simulates 150ms of DB latency, so you can
literally see the second request return instantly from cache. Cache failures are
swallowed and treated as misses — availability over a cache hit.

---

## Interview drills

**Q1. Node is single-threaded — how do you use all CPU cores?**
The `cluster` module: a primary forks one worker process per core; they share
the port. Workers don't share memory, so shared state goes in Redis. For
CPU-heavy work within a request, use `worker_threads`. (Or scale horizontally
with multiple containers.)

**Q2. Walk me through a request to `GET /api/users/3`.**
helmet → json parser → logger → router match → `validate(getUserSchema)` coerces
`"3"`→`3` (or 400s) → `asyncHandler(controller.getById)` → service checks Redis
(`users:3`) → miss → repository → cache set → controller sends `{data}` with
`X-Data-Source`. Any throw lands in the central error handler.

**Q3. What is graceful shutdown and why does it matter?**
On SIGTERM, stop accepting new connections (`server.close`), let in-flight
requests finish, then close Redis/DB and exit — with a timeout as a safety net.
Without it, a deploy drops live requests and can corrupt state.

**Q4. Why centralize error handling and validation?**
Validation at the edge lets inner layers trust their inputs and gives clients
clear 400s. A single error-handling middleware (4-arg signature, mounted last)
formats every error consistently, controls logging, and prevents leaking stack
traces in production.

**Q5. Explain cache-aside and cache invalidation here.**
Read: check cache → miss → load from source → populate with TTL. Write:
mutate source → delete/refresh affected keys. The two hard parts are choosing a
TTL (staleness vs hit rate) and invalidating on writes ("there are only two hard
things… cache invalidation").

**Q6. Why a multi-stage Dockerfile and a non-root user?**
Multi-stage keeps dev dependencies/build cruft out of the runtime image (smaller,
faster, less attack surface). Running as the non-root `node` user limits damage
if the app is compromised. `npm ci --omit=dev` gives reproducible, prod-only deps.

**Q7. In docker-compose, why `redis://redis:6379` and not `localhost`?**
Inside the compose network each service is reachable by its **service name** via
Docker DNS. `localhost` in a container refers to that container itself, so the
API would fail to find Redis.

**Q8. `asyncHandler` — why, and when is it unnecessary?**
Express 4 doesn't catch rejected promises from async handlers (the request
hangs); the wrapper forwards them to `next`. Express 5 forwards async errors
natively, so the wrapper is no longer needed there.

### Coding tasks
1. Add `PATCH /api/users/:id` (validate a partial body, invalidate both the item
   and list cache keys).
2. Add a per-IP rate limiter backed by Redis (`INCR` + `EXPIRE`) as middleware,
   and explain why it must be Redis-backed in a clustered/multi-instance setup.
3. Replace the in-memory repository with a real store (SQLite/Postgres) — note
   that **only** `users.repository.js` should change.
