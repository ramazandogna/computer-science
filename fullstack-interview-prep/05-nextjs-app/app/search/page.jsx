'use client';

/**
 * A CLIENT COMPONENT — note the "use client" directive on line 1. This opts the
 * file (and its imports) into the client bundle so it can use hooks, event
 * handlers, and browser APIs.
 *
 * WHEN to reach for "use client": interactivity (onClick/onChange), hooks
 * (useState/useEffect), browser-only APIs (localStorage, window). Everything
 * else should stay a Server Component. Keep client components small and at the
 * LEAVES of the tree — a "use client" component can still RECEIVE Server
 * Components as children/props, so you don't have to make a whole subtree client.
 */
import { useState } from 'react';

export default function SearchPage() {
  const [query, setQuery] = useState('');

  return (
    <section>
      <h1>Client-side interactivity</h1>
      <p className="muted">
        This page is a Client Component — it ships JS and runs in the browser.
        Type below; the filter is pure client state.
      </p>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="type something…"
        aria-label="search"
      />
      <p>
        You typed: <strong>{query || '—'}</strong>
      </p>
    </section>
  );
}
