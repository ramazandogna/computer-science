# Hands-On Build Drills — An AI-Free Engineering Log

A curated backlog of ~100 small builds for full-stack engineers who want to
rebuild hands-on fluency and sharpen the reasoning behind everyday tools. Every
task is written by hand, without AI code generation. The goal is not speed but
understanding: to write confidently from a blank file and explain the _why_
behind each decision.

The list is ordered by difficulty. It starts with language and platform
fundamentals and climbs toward the harder pieces of a modern stack — queues,
real-time sync, cryptography, and system design.

---

## Rules

1. **Write the code yourself.** Reading docs, MDN, and official guides is
   encouraged. Having an AI assistant generate code — or asking it to "write
   this" — is not allowed. Struggle first, then read the docs. That struggle is
   where the "why" is learned.
2. **Checking a box is a commit.** When a task is done, change `[ ]` to `[x]`,
   fill the four fields, and commit. Slow green is real green.
3. **Follow the order loosely, but don't skip foundations.** The numbers reflect
   difficulty. Phases 1–3 hold up everything after them.
4. **Fill the four fields honestly.**
   - **How I did it** — proof the work was actually built, and that the solution
     can be described in words.
   - **What I learned** — the one sentence worth reusing in an interview.
   - **What I couldn't do** — the most valuable field. It defines the next task.
     Never leave it empty; if it reads "nothing," the task was either trivial or
     not finished.

### Daily rhythm and mindset

- **A day counts if code was written by hand — even a little.** The floor is low
  on purpose. Showing up beats volume.
- **Progress over perfection.** Grade the day by whether you wrote something
  yourself, not by how much got done.
- **Anchor the habit to an existing daily routine.** Momentum is more reliable
  than motivation.
- **If a task felt easy and "What I couldn't do" is empty, go deeper.** Ease is
  usually a sign the hard part was skipped.
- **A task is finished when it can be rebuilt from a blank file and every
  decision explained out loud.**

**Progress:** `0 / 103 complete`

---

## Roadmap

```
Phase 1   JavaScript + TypeScript fundamentals ... the "why" muscle
Phase 2   HTML / accessibility ................... the platform basics
Phase 3   React from scratch ..................... hooks, routing, patterns
Phase 4   Vue .................................... a second mental model
Phase 5   Next.js / rendering .................... server model, caching, SEO
Phase 6   Node / Express ......................... layering, cluster, shutdown
Phase 7   NestJS ................................. DI, guards, pipes, filters
Phase 8   Databases .............................. SQL, ORMs, FTS
Phase 9   Redis + BullMQ ......................... caching and background jobs
Phase 10  Real-time + offline-first .............. sockets, sync, conflicts
Phase 11  Auth + cryptography .................... sessions, JWT, signatures
Phase 12  Scraping ............................... automation, backoff, ethics
Phase 13  Media / SEO / i18n ..................... delivery and discoverability
Phase 14  Testing ................................ unit, integration, e2e
Phase 15  Docker / deploy ........................ images, compose, config
Phase 16  System design and synthesis ............ tie it all together
```

---

## Phase 1 — JavaScript + TypeScript fundamentals

- [ X ] **1. Write `debounce` and `throttle` from scratch** - DONE
  - **Description:** Implement both in a blank file, no libraries. State the
    difference in one sentence and test them on a search input.
  - **How I did it:** _I created 3 functions, their names useDebounce, useThrottle, useWindowSize. UseDebounce is giving some delay after the finish something. UseThrottle is giving some delay to do this again. UseWindowSize is taking window sizes (height and width)_
  - **What I learned:** _I was really feel cold hand, its getting better slowly_
  - **What I couldn't do:** _i still feel cold hand, if i wouldnt keep practice, i will be unsuccessfull. I forgot the basics_

- [ ] **2. Write `deepClone` and `deepEqual`**
  - **Description:** Clone and compare nested objects/arrays. Understand what
    `structuredClone` does and why circular references are a problem.
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

- [ X ] **3. Sequential vs parallel `await` — measure it** - INPROGRESS
  - **Description:** Set up three fake async tasks. Run them with sequential
    `await`, then with `Promise.all`. Compare timings and explain the difference.
  - **How I did it:** 2 _function for see the differences, its using console.time, timeEnd and log. Its starting when page is rendered. If we use sequential method total time is all functions time plus but if we use parallel method with promiseAll, its taking only longest function (its about time)_
  - **What I learned:** _I write two function and i learnt how can i write await and promiseAll_
  - **What I couldn't do:** _X_

- [ X ] **4. Build a mini `Promise`**
  - **Description:** A small promise class supporting chained `then`,
    `resolve`/`reject`, and pending/fulfilled state. Understand why it runs on
    the microtask queue.
  - **How I did it:** _I created a comonent for using sync promise method and i printed states on the screen for learning._
  - **What I learned:** _How can i write a promise and how its work._
  - **What I couldn't do:** _I didnt know before reading developer mozilla and writing this component._

- [ ] **5. Predict event-loop output**
  - **Description:** Write a snippet mixing sync code, `Promise`, and
    `setTimeout`. Predict the output order before running, then verify.
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

- [ ] **6. Counter factory with closures + the module pattern**
  - **Description:** A counter factory holding private state unreachable from
    outside. Explain in words what the closure captures.
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

- [ ] **7. `this` binding + write your own `bind`**
  - **Description:** Implement `Function.prototype.myBind`. Show the call-site
    rule (new > bind > method > plain) with examples. Explain why arrows differ.
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

- [ ] **8. Prototype chain — inheritance without `class`**
  - **Description:** Build inheritance with `Object.create`. See what `class`
    hides. Distinguish `__proto__` from `prototype`.
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

- [ ] **9. Write `curry`, `compose`, and `pipe`**
  - **Description:** Implement all three by hand and demonstrate readable
    functional composition with one example.
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

- [ ] **10. TS: a type-safe `Result<T, E>`**
  - **Description:** Functions returning `{ ok: true, value } | { ok: false,
error }` instead of throwing. Use generics.
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

- [ ] **11. TS: discriminated union + exhaustive switch**
  - **Description:** A `Shape` union (circle/square/…), an area calculation, and
    `never` to turn a missing case into a compile error.
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

- [ ] **12. TS: reimplement utility types by hand**
  - **Description:** Rewrite `Partial`, `Pick`, `Omit`, and `Readonly` with
    mapped types to understand the type system.
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

---

## Phase 2 — HTML / accessibility / platform

- [ ] **13. Refactor a `<div onclick>` into accessible markup**
  - **Description:** Convert a clickable div into a `<button>` with keyboard,
    focus, and `aria` support. Explain why semantics matter for screen readers.
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

- [ ] **14. `defer` vs `async` — build and explain**
  - **Description:** Two script tags with different loading behavior. Cover
    parse-blocking and order guarantees. When to use which?
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

- [ ] **15. Accessible modal (vanilla)**
  - **Description:** Focus trap, close on `Esc`, `aria-hidden` on the background,
    focus moved inside on open. No framework.
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

---

## Phase 3 — React from scratch

- [ ] **16. `npm create vite` + render one component**
  - **Description:** Stand up a React project from zero. A simple "Hello"
    component. Make the build pass.
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

- [ ] **17. `useState` counter + the derived-state trap**
  - **Description:** Build a counter, then make the mistake of storing its
    "double" in separate state and fix it — derived values are computed on render.
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

- [ ] **18. react-router: two routes + `Link`**
  - **Description:** `/` and `/about` with navigation between them. Wire the
    router by hand from the docs.
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

- [ ] **19. react-router: nested routes + layout + `Outlet`**
  - **Description:** A shared layout (navbar) with inner pages. Understand how
    `Outlet` works.
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

- [ ] **20. react-router: dynamic param + `useParams`**
  - **Description:** `/user/:id`, read the param, render content for that id.
    Add a 404 route.
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

- [ ] **21. Fetch data on route change**
  - **Description:** A detail page that fetches by param and refetches when the
    param changes. Keep the CSS minimal.
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

- [ ] **22. Controlled form + validation**
  - **Description:** Name/email inputs bound to state, validation on submit,
    visible error messages. Correct `<form>` semantics.
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

- [ ] **23. Fetch → loading / error / empty → list**
  - **Description:** A real public API. Handle all four states correctly, and do
    not use the array index as `key`. The backbone of the front-end live round.
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

- [ ] **24. `useEffect` cleanup + race condition**
  - **Description:** While typing in a search box, stop a stale request from
    overwriting a newer one using `AbortController`. Why does cleanup exist?
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

- [ ] **25. Custom hook: `useFetch`**
  - **Description:** Extract the logic from task 23 into a reusable hook
    returning `{ data, loading, error }`.
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

- [ ] **26. Custom hook: `useDebouncedValue` + autocomplete**
  - **Description:** Debounced search as the user types. Wire the debounce from
    task 1 into a hook.
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

- [ ] **27. `useMemo` / `useCallback` / `memo` — a case that needs them**
  - **Description:** Build a slow computation, speed it up with `useMemo`, and
    `memo` a child. Show they are performance hints, not correctness fixes.
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

- [ ] **28. CRUD state with `useReducer`**
  - **Description:** Manage add/remove/update actions in a reducer. When is
    `useReducer` a better fit than `useState`?
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

- [ ] **29. Context for theme/auth — solve prop drilling**
  - **Description:** Pass data through a deep tree via context. Observe when a
    context value change triggers re-renders.
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

- [ ] **30. Infinite scroll (IntersectionObserver)**
  - **Description:** Fetch the next page when the user reaches the bottom, using
    a sentinel element and an observer.
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

- [ ] **31. Star rating component (controlled)**
  - **Description:** Rate on click/hover, keyboard-operable. A classic live-coding
    prompt.
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

- [ ] **32. Tabs (aria + keyboard)**
  - **Description:** Tabbed panels with arrow-key navigation and `role="tab"`.
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

- [ ] **33. React 19: `useActionState` + form action**
  - **Description:** Handle form submit and pending state with the new action API.
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

- [ ] **34. React 19: `useOptimistic`**
  - **Description:** Update the UI optimistically before the server responds and
    roll back on error. Try it on a "like" button.
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

- [ ] **35. React 19: `use()` + Suspense**
  - **Description:** Read a promise with `use()` and show a fallback with
    `<Suspense>`.
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

---

## Phase 4 — Vue

- [ ] **36. Vue 3 setup + `ref` vs `reactive`**
  - **Description:** Set up with the Composition API. Show the difference between
    the two with examples.
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

- [ ] **37. `computed` + `watch`**
  - **Description:** `computed` for derived values, `watch` for side effects. How
    do the React `useMemo`/`useEffect` equivalents map over?
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

- [ ] **38. Fetch → list in Vue (the equivalent of task 23)**
  - **Description:** Build the same loading/error/empty screen in Vue. Be able to
    compare the two mental models.
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

- [ ] **39. Pinia store**
  - **Description:** Global state with Pinia. Why Pinia over Vuex? Be ready to
    argue the trade-off.
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

- [ ] **40. Write a composable (`useFetch`, Vue version)**
  - **Description:** The Vue counterpart of the hook in task 25. A composable is
    Vue's custom hook.
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

---

## Phase 5 — Next.js / rendering models

- [ ] **41. Server vs Client Component**
  - **Description:** One fetches on the server (ships no JS), the other uses
    hooks with `"use client"`. Draw the boundary yourself.
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

- [ ] **42. Form with a Server Action**
  - **Description:** Mutate on the server without writing an API route.
    Understand progressive enhancement.
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

- [ ] **43. Caching: `force-cache` vs `no-store` vs `revalidate`**
  - **Description:** Three fetches, three behaviors. Understand the Next 15
    default — a favorite interview trap.
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

- [ ] **44. Streaming + Suspense boundary**
  - **Description:** Isolate a slow section with `<Suspense>` so the page streams
    in parts. TTFB vs LCP.
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

- [ ] **45. SSG: dynamic route + `generateStaticParams`**
  - **Description:** Generate static pages at build time.
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

- [ ] **46. ISR: a `revalidate` scenario**
  - **Description:** A static page that refreshes on an interval. Explain the
    difference from plain SSG.
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

- [ ] **47. i18n routing**
  - **Description:** A `/tr` `/en` `/ja` routing strategy with localized content.
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

- [ ] **48. Technical SEO: metadata API + sitemap**
  - **Description:** Dynamic `<title>`/OG tags, `sitemap.xml`, `robots`. Connect
    it to front-end performance.
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

---

## Phase 6 — Node / Express API

- [ ] **49. Zero-dependency HTTP server**
  - **Description:** A routed server using only the `http` module. See what
    Express sits on top of.
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

- [ ] **50. Express: controller / service / repository layers**
  - **Description:** Split one resource across three layers. Keep business logic
    out of the controller. Be able to trace the request path.
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

- [ ] **51. Edge validation (zod) + an error contract**
  - **Description:** Validate the incoming body at the edge and return a
    consistent error shape. Bad input never reaches the core.
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

- [ ] **52. Async error-handling wrapper**
  - **Description:** Route errors to a central middleware without try/catch in
    every handler.
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

- [ ] **53. Graceful shutdown (SIGTERM)**
  - **Description:** Stop new connections, drain in-flight ones, close resources,
    exit with a timeout. Why isn't `process.exit()` enough?
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

- [ ] **54. Cluster across cores**
  - **Description:** Split Node's single thread into one process per core. Why
    does shared state have to move to Redis?
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

- [ ] **55. Rate limiter middleware (by hand, token bucket)**
  - **Description:** Per-IP limiting with no library. Later, compare it to the
    Redis version (task 72).
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

- [ ] **56. The same API in Fastify**
  - **Description:** Understand what Fastify changes versus Express, and the basis
    for its speed claims.
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

---

## Phase 7 — NestJS

- [ ] **57. Module + provider + DI**
  - **Description:** Inject a service into a controller. See dependency injection
    firsthand — what you wired by hand in Express, Nest gives for free.
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

- [ ] **58. DTO + `ValidationPipe`**
  - **Description:** Validate incoming data with class-validator. The Nest
    equivalent of the manual validation in task 51.
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

- [ ] **59. Guard (auth)**
  - **Description:** A guard that protects a route. Where does it sit in the
    request lifecycle?
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

- [ ] **60. Interceptor**
  - **Description:** An interceptor that wraps the response and logs duration.
    Explain the guard/pipe/interceptor/filter order.
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

- [ ] **61. Exception filter**
  - **Description:** Central error handling with a consistent format.
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

---

## Phase 8 — Databases

- [ ] **62. Raw SQL: join + index, read `EXPLAIN`**
  - **Description:** Join two tables and compare the plan with and without an
    index using `EXPLAIN`.
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

- [ ] **63. Create and fix an N+1 problem**
  - **Description:** Produce N+1 by querying in a loop, then fix it with a
    join/eager load. A classic ORM interview question.
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

- [ ] **64. Prisma: schema + migration + relations**
  - **Description:** Two related models, run a migration, write a relational query.
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

- [ ] **65. Drizzle: the same model on SQLite**
  - **Description:** Rebuild it with Drizzle + SQLite. How does it differ from
    Prisma, and why is SQLite a good fit for offline?
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

- [ ] **66. Transaction + rollback**
  - **Description:** Make two writes atomic; roll back on a mid-way failure.
    Explain why it's needed with an example.
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

- [ ] **67. Postgres full-text search**
  - **Description:** Search with `tsvector`/`tsquery`. Explain how it differs from
    `LIKE`.
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

- [ ] **68. MongoDB: model + aggregation**
  - **Description:** A schema-less collection with a `$group`/`$match` aggregation.
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

- [ ] **69. Connection pool — why it matters**
  - **Description:** Keep the pool small, send many requests, watch it exhaust.
    Why is a new connection per request bad?
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

---

## Phase 9 — Redis + BullMQ

- [ ] **70. Redis basics**
  - **Description:** Run Redis locally. `GET/SET/TTL/INCR/EXPIRE`. What is Redis,
    why in-memory, and when is it the right tool?
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

- [ ] **71. Cache-aside by hand**
  - **Description:** Read: miss → load from DB → write to Redis with a TTL.
    Write: mutate → invalidate the key. Implement the pattern.
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

- [ ] **72. Rate limiting with Redis**
  - **Description:** Distributed limiting with `INCR` + `EXPIRE`. Why is Redis
    required once you run behind a cluster (vs. task 55)?
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

- [ ] **73. BullMQ: producer + worker**
  - **Description:** Push a job to a queue and have a worker consume it. The
    simplest possible setup. See what a queue is for.
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

- [ ] **74. BullMQ: retry + backoff + failed handling**
  - **Description:** A job that fails on purpose, automatic retries, increasing
    backoff, and a `failed` event.
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

- [ ] **75. BullMQ: concurrency + rate limit + idempotency**
  - **Description:** N jobs at once, a limit toward an external API, and
    protection against double processing via an idempotency key.
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

- [ ] **76. Write the "why a queue, not inside the HTTP request?" argument**
  - **Description:** One paragraph: a long task blocks the request, times out,
    and is lost on crash → a queue returns fast, a worker processes in the
    background, and retries kick in. Write it in your own words, no memorizing.
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

---

## Phase 10 — Real-time + offline-first

- [ ] **77. Socket.IO echo server + client**
  - **Description:** Send a message and have the server echo it back. Understand
    WebSocket vs HTTP.
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

- [ ] **78. Rooms + broadcast**
  - **Description:** Join a room and broadcast to it. The basis for multi-client
    sync.
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

- [ ] **79. Offline queue: buffer on disconnect, flush on reconnect**
  - **Description:** Queue operations while disconnected and flush them to the
    server on reconnect. The essence of offline-first.
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

- [ ] **80. Conflict resolution: LWW vs versioning**
  - **Description:** Have two clients edit the same record while offline.
    Implement last-write-wins, then a better version/timestamp scheme. This gets
    asked in interviews.
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

- [ ] **81. Electron: minimal main + renderer + IPC**
  - **Description:** Open a desktop window and have main and renderer talk over
    IPC.
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

- [ ] **82. Diagram and explain an offline-first sync architecture**
  - **Description:** Draw the full sync flow (local DB → queue → socket → server
    → broadcast) and explain it in two minutes.
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

---

## Phase 11 — Auth + cryptography

- [ ] **83. JWT: sign + verify by hand**
  - **Description:** Produce and verify header.payload.signature with a library.
    Understand what a signature protects (integrity, not secrecy).
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

- [ ] **84. Session vs JWT — build both**
  - **Description:** Cookie-session and JWT auth side by side. Write the
    trade-offs: revocation, scale, XSS/CSRF. Which fits when?
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

- [ ] **85. Ed25519: keypair + sign + verify**
  - **Description:** Generate a keypair with Node crypto, sign a sample "license,"
    and verify it. Understand asymmetric signing hands-on.
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

- [ ] **86. Write the "why asymmetric? RSA vs Ed25519" argument**
  - **Description:** One paragraph: sign with the private key, verify with the
    public key → a client can't forge or reproduce it. Why choose Ed25519 over
    RSA (size, speed)? In your own words.
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

---

## Phase 12 — Scraping

- [ ] **87. Playwright: open a page, extract data**
  - **Description:** Automate a page and collect data. Work against your own test
    page; do not target real sites.
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

- [ ] **88. Pagination + adaptive backoff**
  - **Description:** Walk across pages and increase the wait on errors/limits.
    Resilient collection.
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

- [ ] **89. Write an ethics / ToS note**
  - **Description:** Frame automation responsibly: respect robots.txt and terms of
    service, rate-limit, and focus on resilience (async orchestration, backoff)
    rather than evasion. Know the boundaries.
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

---

## Phase 13 — Media / SEO / i18n

- [ ] **90. Image optimization pipeline (CDN pattern, local mock)**
  - **Description:** Upload → resize → serve by a CDN key. Mock an object-storage
    - CDN flow locally.
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

- [ ] **91. ThumbHash / blur placeholder**
  - **Description:** Show a blurred preview until the image loads. Understand its
    effect on LCP.
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

- [ ] **92. Turn SEO knowledge into a technical checklist**
  - **Description:** Map on-page/off-page SEO to the technical side: semantic
    HTML, meta tags, speed, sitemap, canonical. Combine with front-end
    performance.
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

---

## Phase 14 — Testing

- [ ] **93. Vitest: unit-test `debounce`/`throttle`**
  - **Description:** Test timing with fake timers. Bring task 1 back and cover it.
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

- [ ] **94. React Testing Library: test a form**
  - **Description:** Test the form from task 22: type, submit, assert the error
    message. The "test like a user" philosophy.
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

- [ ] **95. Jest: service mock + integration**
  - **Description:** Test an Express/Nest service with mocks. Explain unit vs
    integration.
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

- [ ] **96. e2e happy path (Playwright)**
  - **Description:** Test a CRUD flow end to end. Where does e2e sit in the test
    pyramid?
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

---

## Phase 15 — Docker / deploy

- [ ] **97. Dockerfile + multi-stage build**
  - **Description:** Containerize a Node app and shrink the image with a
    multi-stage build. How does layer caching work?
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

- [ ] **98. docker-compose: app + Postgres + Redis**
  - **Description:** Bring a full stack up with one `compose up`. How do the
    services communicate?
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

- [ ] **99. env + secret management**
  - **Description:** Separate config from code and keep secrets out of the repo.
    Apply this part of the twelve-factor approach.
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

---

## Phase 16 — System design and synthesis

- [ ] **100. System design: URL shortener**
  - **Description:** Hashing, DB schema, a read-heavy cache (connect to Phase 9),
    and scaling. Sketch it and explain out loud.
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

- [ ] **101. System design: rate limiter**
  - **Description:** Turn tasks 55 and 72 into a design: token bucket, distributed
    Redis, trade-offs.
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

- [ ] **102. System design: notification / job system**
  - **Description:** Queue, workers, retries, dead-letter. Turn the BullMQ work
    from Phase 9 into an architecture.
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

- [ ] **103. Capstone: pick one project and interrogate every layer**
  - **Description:** Choose a project you've built and ask "why" of each layer,
    end to end. Every part you can't defend becomes a new task on this list.
  - **How I did it:** _(fill in)_
  - **What I learned:** _(fill in)_
  - **What I couldn't do:** _(fill in)_

---

## Finish line

Congratulations on reaching the end of this log.

If the boxes above are checked and the four fields are filled honestly, the
result isn't a longer résumé — it's a different way of working. You can now start
from a blank file without freezing, reason from first principles instead of
pattern-matching, and explain the trade-off behind every tool you reach for.
That is the real deliverable: not that the code runs, but that you understand
exactly why it runs the way it does.

The checkmarks were only ever a side effect. Keep the "What I couldn't do"
fields — they are the most honest record of where to go next, and the habit of
filling them in is worth more than any single task on this list.
