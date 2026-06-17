# 03 — Vue App (Composition API + Pinia + Router)

A small but production-shaped Vue 3 SPA: it fetches users from a real test API
([JSONPlaceholder](https://jsonplaceholder.typicode.com)), **maps** the raw
payload into a clean domain model, lists them with search/filter, and drills
into a detail screen that loads a second resource (the user's posts).

## Run it

```bash
cd 03-vue-app
pnpm install      # or: npm install
pnpm dev          # Vite dev server on http://localhost:5173
pnpm build        # production build (Rollup) into dist/
```

> Needs network access at runtime to reach jsonplaceholder.typicode.com.

## Read in this order (the data flow, end to end)

```
index.html ─► src/main.js ─► App.vue ─► <RouterView>
                                 │
        ┌────────────────────────┴───────────────────────────┐
   UsersView.vue                                      UserDetailView.vue
        │  calls store.fetchUsers()                          │ watch(id) -> api.getPostsByUser
        ▼                                                    ▼
   stores/users.js  ──── api ────►  services/api.js  ────►  JSONPlaceholder
   (state + mapUser)                (the only fetch())
```

1. [`src/main.js`](./src/main.js) — bootstrap: wire Pinia + Router, mount.
2. [`src/services/api.js`](./src/services/api.js) — **the only place that calls
   `fetch`.** Note the `response.ok` check (fetch doesn't reject on 4xx/5xx).
3. [`src/stores/users.js`](./src/stores/users.js) — **the heart.** State,
   getters, actions, and the crucial `mapUser` adapter that keeps raw API shapes
   out of the UI.
4. [`src/views/UsersView.vue`](./src/views/UsersView.vue) — the list screen:
   lifecycle fetch, `storeToRefs`, computed filter, the loading/error/empty
   states, `v-for` + `:key`.
5. [`src/views/UserDetailView.vue`](./src/views/UserDetailView.vue) — the detail
   screen: route params as props, `watch` (not `onMounted`) for param changes,
   AbortController to cancel races.
6. [`src/components/UserCard.vue`](./src/components/UserCard.vue) — a
   presentational component: props down, events up.

## The Vue mental model (vs React, since you know React)

| Concept | Vue 3 | React |
|---------|-------|-------|
| Reactive value | `ref()` / `reactive()` — auto-tracked | `useState` — explicit setter |
| Derived value | `computed()` — cached, lazy | `useMemo` |
| Side effect | `watch` / `watchEffect` / `onMounted` | `useEffect` |
| Re-render trigger | dependency tracking (proxies) — **automatic** | setState + reconciliation |
| Template | HTML-ish template, compiled | JSX |
| Two-way binding | `v-model` (sugar over value+event) | controlled inputs by hand |

The headline difference: **Vue's reactivity is automatic** (it tracks which refs
a render reads, via Proxies, and re-runs only what depends on a changed value).
React re-renders the component and relies on you to memoize. Be able to say this.

## Decisions an interviewer might challenge

- **Pinia over Vuex** — Pinia is the official store now; no mutation boilerplate,
  TS-first, modular by default. Vuex is maintenance-mode.
- **Store for users, ref for the search query** — server state that's shared
  across screens belongs in the store; ephemeral local UI state does not. Putting
  everything in a global store is a real anti-pattern.
- **`mapUser` adapter** — decouples UI from backend; a field rename is a one-line
  fix, and `mapUser` is a pure function you can unit test without mounting Vue.
- **Route param via `props: true`** — the component doesn't depend on the router,
  so it's easier to test and reuse.

---

## Interview drills

**Q1. `ref` vs `reactive`?**
`ref` wraps any value (primitive or object) and you access it via `.value` (in
`<script>`; templates auto-unwrap). `reactive` only works on objects/arrays and
returns a deep proxy you use without `.value`, but you lose reactivity if you
destructure it. Rule of thumb: default to `ref`; reach for `reactive` for a
grouped object you won't destructure.

**Q2. Why does destructuring a Pinia store lose reactivity, and what's the fix?**
Destructuring pulls the current value out of the reactive proxy, severing the
tracked link. Wrap state/getters in `storeToRefs(store)`; call actions directly
off the store.

**Q3. Why `watch` instead of `onMounted` in the detail view?**
Vue Router reuses the same component instance when only the param changes
(`/users/1` → `/users/2`), so `onMounted` fires once. `watch(() => props.id, …,
{ immediate: true })` runs on mount AND on every param change.

**Q4. Why must `:key` in `v-for` be a stable id, not the index?**
Vue uses the key to match old vnodes to new ones during patching. With the array
index as key, inserting/reordering items makes Vue reuse the wrong DOM nodes,
corrupting component state (focus, inputs, transitions) and hurting performance.

**Q5. `computed` vs `methods` vs `watch`?**
`computed` = cached derived value, recomputed only when a dependency changes —
use for "value derived from state". A method runs every render. `watch` = run a
side effect (fetch, log, imperative DOM) in response to a change — not for
deriving values.

**Q6. How does Vue 3 reactivity actually work?**
ES `Proxy` traps get/set. On render, Vue records which reactive properties were
read (dependency collection); on write, it notifies exactly those subscribers to
re-run. Vue 2 used `Object.defineProperty`, which couldn't detect new
properties/array index sets — Vue 3's Proxy fixed that whole class of gotcha.

### Coding task
Add a "Create user" screen with a `v-model`-bound form, optimistic insert into
the store, and a POST to `/users`. Handle validation and the error state. Discuss
where optimistic UI can lie to the user and how you'd reconcile on failure.
