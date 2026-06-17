# 04 — React App (React 19, all the hooks, interview-grade)

This is the module to prepare a **senior React interview**. It's a runnable Vite
app with three pages: a hooks tour, a real data-fetching screen (the same
feature as the Vue module so you can contrast), and a React 19 features page.

## Run it

```bash
cd 04-react-app
pnpm install      # or: npm install
pnpm dev          # http://localhost:5174
pnpm build
```

## Read in this order

1. [`src/main.jsx`](./src/main.jsx) — `createRoot`, concurrent mode, and why
   **StrictMode double-invokes** your effects in dev.
2. [`src/pages/HooksTour.jsx`](./src/pages/HooksTour.jsx) — **the heart.** Every
   core hook with the trap each one hides (stale closures, missing cleanup,
   memoization, concurrent rendering).
3. [`src/hooks/useUsers.js`](./src/hooks/useUsers.js) — a custom hook: extracting
   stateful logic, AbortController cleanup, the deps array.
4. [`src/pages/UsersPage.jsx`](./src/pages/UsersPage.jsx) — fetch → map → list,
   with `useMemo`/`useCallback`/`memo` working together and `key` discipline.
5. [`src/pages/React19Page.jsx`](./src/pages/React19Page.jsx) — Actions,
   `useActionState`, `useFormStatus`, `useOptimistic`, `use()` + Suspense,
   `ref` as a prop, document metadata.
6. [`src/context/ThemeContext.jsx`](./src/context/ThemeContext.jsx) — context,
   the re-render gotcha, and the guarded-consumer hook pattern.

## The rendering model (say this fluently)

1. **Render** = React calls your component function to produce a description of
   the UI (a tree of elements). This must be **pure** — no side effects.
2. **Reconciliation** = React diffs the new element tree against the previous
   one (the "virtual DOM" diff) to compute the minimal set of real DOM changes.
   `key` is how it matches list children across renders.
3. **Commit** = React applies those DOM mutations, then runs `useLayoutEffect`
   (sync, pre-paint) and later `useEffect` (async, post-paint).
4. **Concurrent rendering** (React 18+) = rendering is interruptible. That's what
   makes `useTransition`, `useDeferredValue`, and Suspense possible.

A component re-renders when: its state changes, its parent re-renders, or its
context value changes. It does **not** re-render just because props "look"
different — but a parent re-render re-runs children unless they're `memo`'d.

## Hooks cheat-sheet

| Hook | Use it for | The trap |
|------|-----------|----------|
| `useState` | local reactive state | stale closures → use the updater form |
| `useReducer` | complex/related state transitions | keep the reducer pure |
| `useRef` | DOM node OR mutable non-render value | changing `.current` doesn't re-render |
| `useEffect` | side effects after paint | **always** return cleanup for subscriptions |
| `useLayoutEffect` | measure/mutate DOM before paint | blocks paint — use sparingly |
| `useMemo` | cache an expensive value | it's a hint, not correctness |
| `useCallback` | stable function identity | only helps with `memo` children |
| `useContext` | read shared state | every consumer re-renders on value change |
| `useId` | stable SSR-safe ids | not for list keys |
| `useTransition` | mark updates non-urgent | gives you `isPending` |
| `useDeferredValue` | lag a value during heavy renders | the value-based sibling of transition |
| `useActionState` *(19)* | form action result + pending | action gets `(prevState, formData)` |
| `useFormStatus` *(19)* | read parent form's submit state | must render inside the `<form>` |
| `useOptimistic` *(19)* | optimistic UI, auto-revert | reverts unless you commit real state |
| `use()` *(19)* | read a promise/context in render | promise must be stable; can be conditional |

## What's new in React 19 (the patch-notes answer interviewers want)

- **Actions**: pass an async function to `<form action={fn}>` or a transition;
  React manages pending state, errors, and ordering. Mutations stop being a pile
  of manual `useState` flags.
- **`useActionState` / `useFormStatus` / `useOptimistic`**: the supporting hooks
  for Actions (pending, form status, optimistic UI).
- **`use()`**: read promises (with Suspense) and context during render; the only
  "hook-like" API allowed in conditions/loops.
- **`ref` as a prop**: `forwardRef` is no longer required for function components.
- **Document metadata**: render `<title>`/`<meta>`/`<link>` from any component;
  React hoists them to `<head>` (react-helmet largely obsolete).
- **Stylesheet & resource preloading**: `preload`/`preinit`/`preconnect` from
  `react-dom`, plus stylesheet precedence.
- **React Compiler** (ships alongside, opt-in): auto-memoizes components, so most
  `useMemo`/`useCallback`/`memo` become unnecessary. Big interview talking point:
  *"manual memoization is increasingly a compiler concern."*
- **Server Components stable**: a server/client component split standardized for
  frameworks — see module 05 (Next.js).
- **Removals**: `ReactDOM.render` (use `createRoot`), string refs, legacy
  context, `propTypes`/`defaultProps` on function components.

---

## Interview drills

**Q1. Why does calling `setCount(count + 1)` three times only add 1?**
Each call closes over the same `count` from the current render (stale). React
batches them and they all compute the same value. Fix: the updater form
`setCount(c => c + 1)`, which receives the latest pending state.

**Q2. Why does my `useEffect` run twice on mount?**
StrictMode (dev only) intentionally mounts → unmounts → remounts to surface
effects that don't clean up. The fix is never "remove StrictMode" — it's to
return a proper cleanup so the effect is idempotent.

**Q3. `useMemo` vs `useCallback` vs `React.memo`?**
`useMemo` caches a value, `useCallback` caches a function identity, `React.memo`
skips a component's re-render when props are shallow-equal. They work together:
`memo` only helps if the props (including callbacks) are referentially stable.
All are performance tools — profile before adding them; the React Compiler aims
to remove the need.

**Q4. Why must list `key`s be stable and unique (not the index)?**
React matches old/new children by key during reconciliation. With indexes,
inserting/reordering shifts every key, so React reuses the wrong DOM/state
(wrong input values, lost focus) and does extra work.

**Q5. When does a component re-render?**
On its own state change, a parent re-render, or a consumed context value change.
A parent re-render re-runs all children unless memoized. Props "changing" doesn't
independently trigger a render — the parent rendering is what does.

**Q6. `useEffect` vs `useLayoutEffect`?**
`useEffect` runs asynchronously after paint (default). `useLayoutEffect` runs
synchronously after DOM mutations but before paint — use only to measure/mutate
layout and avoid a visible flicker, since it blocks painting.

**Q7. What problem do Actions + `useOptimistic` solve in React 19?**
They replace the manual `isSubmitting/error/optimistic` `useState` choreography
for mutations: the action owns pending/error, `useOptimistic` shows the result
instantly and auto-reverts on failure. Less boilerplate, fewer race conditions.

**Q8. Controlled vs uncontrolled inputs?**
Controlled = value lives in React state (`value` + `onChange`); single source of
truth, easy validation, re-renders per keystroke. Uncontrolled = the DOM holds
the value, read via a ref on submit; less code, used for simple/perf-sensitive
forms and file inputs.

**Q9. How would you fetch data without a library?**
`useEffect` + `fetch` + an `AbortController` cleanup (see `useUsers.js`), tracking
a `loading/success/error` status. Then explain why you'd reach for TanStack Query
/ RTK Query in production (caching, dedup, refetch, stale-while-revalidate) —
showing you know the hand-rolled version has gaps.

### Coding tasks
1. Build a `useDebouncedValue(value, delay)` hook and use it to debounce the
   Users filter so it doesn't re-filter on every keystroke.
2. Add an Error Boundary around `React19Page` and make the `use()` promise able
   to reject, so you can demonstrate Suspense + error fallback together.
3. Convert `UsersPage` to route to a real `/users/:id` detail page (mirror the
   Vue module) with its own data fetch.
