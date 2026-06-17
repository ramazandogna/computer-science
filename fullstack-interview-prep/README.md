# Full-Stack Web Engineering — Interview Prep Playground

> A hands-on, read-every-line playground for a mid-level full-stack engineer
> (≈2 years React / Vue / Node) preparing for **senior** front-end and
> full-stack interviews.

This is **not** a tutorial you skim. It is a set of seven small but *real*
projects. Every non-obvious line carries a comment that explains **why** it is
written that way — the trade-off, the failure mode it prevents, or the question
an interviewer will ask about it. Read the code top to bottom, run it, break it,
and rebuild the parts you don't understand.

The voice throughout is deliberately that of a senior engineer reviewing code
with you, not a marketing page. If something is a footgun, it says so.

---

## How to use this repo

1. Go module by module, in order. Each builds intuition the next one assumes.
2. In each module, **start with its `README.md`** — it tells you which file is
   "the heart" and the order to read files in.
3. Comments marked `// INTERVIEW:` flag a point an interviewer is likely to
   probe. Comments marked `// GOTCHA:` flag something that bites people in
   production. `// WHY:` explains a design decision.
4. Every module ends with an **Interview drills** section: questions + the
   answer an interviewer wants to hear, plus at least one coding task.

---

## The seven modules

| #  | Module | What it teaches | Stack |
|----|--------|-----------------|-------|
| 01 | [HTML essentials](./01-html-essentials/) | The HTML/a11y/SEO points seniors are still expected to know cold | HTML5 |
| 02 | [JavaScript core](./02-javascript-core/) | Event loop, closures, prototypes, `this`, async, modules — runnable | Node.js (ESM) |
| 03 | [Vue app](./03-vue-app/) | Composition API, fetching a real API, mapping & rendering lists | Vue 3.5 + Vite + Pinia |
| 04 | [React app](./04-react-app/) | Every hook, React 19 features, rendering model, perf, patterns | React 19 + Vite |
| 05 | [Next.js app](./05-nextjs-app/) | App Router, Server Components, Server Actions, caching, streaming | Next.js 15 |
| 06 | [Node + Express API](./06-nodejs-express-api/) | MVC layering, clustering, Redis cache, Docker, graceful shutdown | Node 20 + Express 4 |
| 07 | [NestJS API](./07-nestjs-api/) | DI, modules, providers, DTO validation, guards/interceptors | NestJS 10 |

---

## Recommended reading order & rationale

```
01 HTML  ──►  02 JS core  ──►  03 Vue ─┐
                               04 React ─┼─►  05 Next.js
                                         │
              06 Node/Express  ──────────┴─►  07 NestJS
```

- **01 → 02**: You can't reason about frameworks until the language and the
  platform (the DOM, the event loop) are second nature.
- **03/04 in parallel**: Vue and React solve the same problems with different
  mental models. Seeing both makes you articulate trade-offs in interviews.
- **04 → 05**: Next.js is React plus a server model. Learn React's client
  rendering first, then layer the server on.
- **06 → 07**: Express is "unopinionated, wire-it-yourself". NestJS is "the
  opinions, formalized with DI". Understanding what Nest gives you for free only
  lands after you've wired the same things by hand in Express.

---

## Prerequisites

- **Node.js ≥ 20** (LTS). Check: `node -v`.
- A package manager. The repo uses **pnpm** to match the existing projects, but
  every command has an npm equivalent. Install: `npm i -g pnpm`.
- **Docker** + **Docker Compose** for module 06 (Redis, multi-process).
  Check: `docker --version && docker compose version`.

You do not need all of these to start. Modules 01–05 are pure JS/TS and need
only Node. Docker and Redis only appear in module 06.

---

## A note on "best practices"

"Best practice" is not a law; it's a default that's right until your constraints
say otherwise. Where this repo makes a choice an interviewer might challenge
(e.g. "why Pinia over Vuex", "why not Redux", "why cluster over a load
balancer"), the README states the trade-off explicitly so you can defend *or
reject* the choice in your own words. Memorizing answers fails interviews;
being able to reason about trade-offs passes them.

---

## Consolidated interview index

Each module has its own drills. The master cheat-sheet that ties the recurring
cross-cutting themes together (rendering models, caching layers, async, network)
lives at the bottom of this file once you've been through the modules — see
[Cross-cutting interview themes](#cross-cutting-interview-themes).

---

## Cross-cutting interview themes

These show up regardless of framework. Each links to where it's demonstrated.

- **The event loop & async** — micro vs macro tasks, starvation, `await` in
  loops. → [02-javascript-core](./02-javascript-core/)
- **Rendering models** — CSR vs SSR vs SSG vs RSC, hydration, TTFB vs LCP.
  → [04-react-app](./04-react-app/), [05-nextjs-app](./05-nextjs-app/)
- **State management** — local vs global, when a store earns its complexity.
  → [03-vue-app](./03-vue-app/), [04-react-app](./04-react-app/)
- **Caching layers** — HTTP cache, CDN, in-memory, Redis, request memoization.
  → [05-nextjs-app](./05-nextjs-app/), [06-nodejs-express-api](./06-nodejs-express-api/)
- **Scaling a Node process** — single-thread reality, cluster, worker_threads.
  → [06-nodejs-express-api](./06-nodejs-express-api/)
- **API design & layering** — controller/service/repository, validation at the
  edge, error contracts. → [06](./06-nodejs-express-api/), [07](./07-nestjs-api/)

---

## Rapid-fire (30-second answers)

Drill these out loud. If you can't give the short version, re-read the module.

- **Event loop order?** Sync → drain ALL microtasks (promises) → ONE macrotask
  (setTimeout) → repeat.
- **`var` vs `let`?** Function vs block scope; `var` hoists to `undefined`,
  `let` has a TDZ.
- **`==` vs `===`?** Always `===` except the deliberate `x == null` check.
- **`||` vs `??`?** `??` only falls through for null/undefined (keeps a valid 0).
- **How is `this` set?** By call-site (new > bind > method > plain); arrows
  capture lexically.
- **Sequential vs parallel awaits?** Start promises first, then `Promise.all`.
- **React re-render triggers?** Own state, parent render, or context value
  change.
- **`key` must be?** Stable + unique (never the array index).
- **`useMemo`/`useCallback`/`memo`?** Cache value / cache fn identity / skip
  re-render — perf hints, not correctness.
- **React 19 headline?** Actions + `useActionState`/`useFormStatus`/
  `useOptimistic`, `use()`, `ref` as a prop, the React Compiler.
- **Server vs Client Component?** Server: async, fetches, ships no JS. Client:
  `"use client"`, hooks/events/browser APIs.
- **CSR/SSR/SSG/ISR/RSC?** Browser-renders / per-request HTML / build-time HTML /
  build-time + revalidate / server components shipping minimal JS.
- **Node single-thread → all cores?** `cluster` (process per core, shared state
  in Redis); `worker_threads` for in-request CPU work.
- **Graceful shutdown?** On SIGTERM: stop new connections, drain in-flight, close
  resources, exit (with a timeout).
- **Cache-aside?** Read: miss → load → populate w/ TTL. Write: mutate → invalidate
  keys.
- **Express vs Nest?** Wire-it-yourself vs DI + modules + decorators + built-in
  guards/pipes/interceptors/filters.

## Final readiness checklist

You're interview-ready for a module when you can, **without looking**:

- [ ] **02** Predict the output of a mixed sync/promise/setTimeout snippet, and
  implement `debounce`.
- [ ] **01** Explain `defer` vs `async` and refactor a `<div onclick>` into
  accessible markup.
- [ ] **03/04** Build a fetch → map → list screen with loading/error/empty
  states and correct keys, in both Vue and React.
- [ ] **04** Name every hook, its trap, and what React 19 added.
- [ ] **05** Decide Server vs Client component per case and explain the Next 15
  caching defaults.
- [ ] **06** Draw the request path through the layers and explain clustering +
  graceful shutdown + cache-aside.
- [ ] **07** Explain DI and the guard/pipe/interceptor/filter lifecycle.

Every module's code is runnable and was verified to build/run (the JS files print
the documented output; the Vue/React/Next apps build; the Express and Nest APIs
boot and pass their endpoint checks). If something doesn't run for you, that's a
bug to fix — which is itself good practice.

---

## License

ISC — same as the rest of this `computer-science` repo. Built as a personal
learning playground; fork it, gut it, rewrite it.
