# 05 — Next.js App (App Router, RSC, Server Actions)

Next.js is "React plus a server model". This module assumes you've done the
React module (04) and layers on the things Next adds: **Server Components**,
**Server Actions**, **file-based routing**, **caching/revalidation**, and
**streaming**. Same demo data as the React/Vue modules, so you can feel the
difference in approach.

## Run it

```bash
cd 05-nextjs-app
pnpm install      # or: npm install
pnpm dev          # http://localhost:3000  (add --turbo for Turbopack)
pnpm build && pnpm start
```

## Read in this order

1. [`app/layout.jsx`](./app/layout.jsx) — the root layout (persists across
   navigations), the Metadata API, and `<Link>` prefetching.
2. [`app/page.jsx`](./app/page.jsx) — a Server Component; `console.log` lands in
   your **terminal**, proving it runs server-side.
3. [`lib/api.js`](./lib/api.js) — **the heart of caching.** Server-side fetch
   with `revalidate` (ISR) vs `cache: 'no-store'` (per-request SSR), and the
   Next 15 default change.
4. [`app/users/page.jsx`](./app/users/page.jsx) + [`loading.jsx`](./app/users/loading.jsx)
   — `async` Server Component with `await`ed data and automatic streaming via
   the `loading.jsx` convention.
5. [`app/users/[id]/page.jsx`](./app/users/%5Bid%5D/page.jsx) — dynamic route,
   **async `params` (Next 15)**, `notFound()`, and per-section `<Suspense>`
   streaming.
6. [`app/search/page.jsx`](./app/search/page.jsx) — a `"use client"` island.
7. [`app/actions/`](./app/actions/) — Server Actions: `actions.js` (`"use
   server"`, async-only exports), `store.js` (the sync helpers that *can't* live
   in a `"use server"` file), the client `FeedbackForm`, and the page that
   re-renders after `revalidatePath`.

## The rendering spectrum (the core interview topic)

```
CSR          SSR              SSG / ISR            RSC (App Router)
│            │                │                    │
browser      server renders   build-time HTML,     server renders, ships
fetches +    HTML per req,    optionally           HTML + minimal JS only
renders      then hydrates    revalidated          for "use client" islands
```

- **CSR** (module 03/04): blank shell → JS fetches → renders. Bad TTFB/SEO.
- **SSR**: server renders HTML per request → fast first paint → hydrate.
- **SSG**: render at build time, serve static HTML. **ISR**: SSG + periodic
  `revalidate`.
- **RSC**: components run on the server, fetch directly, ship **zero JS** except
  for explicit client islands. Next's App Router is built on RSC.

In Next's App Router you don't pick one globally — you choose **per fetch** via
the `cache`/`next.revalidate` options, and **per component** via `"use client"`.

## Server vs Client Components

| | Server Component (default) | Client Component (`"use client"`) |
|--|--|--|
| Runs | server only | server (initial) + browser (hydration) |
| Can be `async` / fetch directly | ✅ | ❌ |
| `useState`/`useEffect`/events | ❌ | ✅ |
| Browser APIs (window, localStorage) | ❌ | ✅ |
| Ships JS to client | ❌ | ✅ |

**Rule:** default to Server Components; push `"use client"` down to the smallest
interactive leaf. A client component can still *render server components passed
as children*, so a little interactivity doesn't force a whole subtree onto the
client.

## Caching in Next 15 (know the default change)

Next 14 cached `fetch` aggressively by default. **Next 15 flipped it**: `fetch`,
GET Route Handlers, and client-side navigation are **not cached by default** —
you opt in. The knobs:

- `fetch(url, { cache: 'force-cache' })` or `{ next: { revalidate: N } }` → cache.
- `fetch(url, { cache: 'no-store' })` → always fresh (per-request SSR).
- `revalidatePath('/x')` / `revalidateTag('users')` → bust caches after a mutation.

Other Next 15 notes worth dropping in an interview: `params`/`searchParams`/
`cookies`/`headers` are now **async** (you `await` them); React 19 support;
Turbopack stable for `next dev`.

---

## Interview drills

**Q1. What's a React Server Component and what problem does it solve?**
A component that renders only on the server and ships no JS to the client. It
lets you fetch data and keep secrets/heavy deps server-side, sending HTML plus
JS only for interactive islands — cutting bundle size and removing client fetch
waterfalls.

**Q2. When do you add `"use client"`?**
Only when you need state/effects, event handlers, or browser APIs. Keep these
components small and at the leaves; everything else stays a Server Component.

**Q3. CSR vs SSR vs SSG vs ISR vs RSC — when each?**
CSR for app-like dashboards behind auth where SEO/first-paint don't matter; SSR
for per-request dynamic + SEO; SSG for content that's the same for everyone and
rarely changes; ISR for SSG that needs periodic freshness; RSC to minimize
client JS and fetch on the server by default.

**Q4. How does data caching work in the App Router (Next 15)?**
`fetch` isn't cached by default; opt in with `cache: 'force-cache'` or
`next.revalidate`. Use `no-store` for dynamic data. Invalidate after mutations
with `revalidatePath`/`revalidateTag`.

**Q5. What is a Server Action and why use it over an API route?**
A `"use server"` function callable from the client as if local; Next handles the
RPC, serialization, and CSRF. For form mutations it removes the need to
hand-write an API route and a client fetch — you pass it to `<form action>`.

**Q6. How does streaming/Suspense improve UX here?**
Next sends the shell + already-ready content immediately and streams slower
sections in as they resolve (`loading.jsx` or a `<Suspense>` boundary). The page
becomes interactive before every data dependency is ready, improving perceived
performance (TTFB/LCP).

**Q7. What is hydration and what can go wrong?**
Hydration is React attaching event listeners to the server-rendered HTML on the
client. A "hydration mismatch" happens when server and client render different
markup (e.g. using `Date.now()`/`window` during render, or invalid HTML
nesting); fix by making render deterministic or deferring browser-only bits to
an effect.

### Coding task
Add a `not-found.jsx` and an `error.jsx` to the `users/[id]` segment, then make
`getUser` occasionally throw to demonstrate the error boundary. Explain the
difference between `not-found` (expected missing data) and `error` (unexpected
failure) boundaries.
