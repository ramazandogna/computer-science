/**
 * loading.jsx — a special App Router file. Next AUTOMATICALLY wraps the sibling
 * page in a <Suspense> boundary whose fallback is this component. While the
 * server fetches data for page.jsx, the user immediately sees this instead of a
 * blank screen, and the real content streams in when ready. Zero wiring — just
 * the file name. This is "streaming SSR" made declarative.
 */
export default function Loading() {
  return <p className="muted">Loading users…</p>;
}
