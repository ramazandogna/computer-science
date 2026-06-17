/**
 * THE DATA LAYER for the App Router.
 *
 * KEY DIFFERENCE from the Vue/React modules: these functions run on the SERVER
 * (inside Server Components), so the fetch happens server-to-server. The browser
 * never sees this code or the API URL. Next.js also EXTENDS the native `fetch`
 * with caching + revalidation controls via the `next` option.
 *
 * Next.js 15 caching default CHANGED: `fetch` is NO LONGER cached by default
 * (it was in 14). You now opt IN explicitly. This module shows both knobs.
 */
const BASE_URL = 'https://jsonplaceholder.typicode.com';

function mapUser(raw) {
  return {
    id: raw.id,
    name: raw.name,
    username: `@${raw.username}`,
    email: raw.email.toLowerCase(),
    company: raw.company?.name ?? 'Independent',
  };
}

export async function getUsers() {
  // `next: { revalidate: 3600 }` => Incremental Static Regeneration (ISR): cache
  // the response and re-fetch at most once an hour. Great for data that's the
  // same for everyone and changes slowly. The first request renders + caches;
  // subsequent requests are served from cache until it goes stale.
  const res = await fetch(`${BASE_URL}/users`, {
    next: { revalidate: 3600, tags: ['users'] },
  });
  if (!res.ok) throw new Error('Failed to load users');
  const raw = await res.json();
  return raw.map(mapUser);
}

export async function getUser(id) {
  const res = await fetch(`${BASE_URL}/users/${id}`, { next: { revalidate: 3600 } });
  if (!res.ok) return null; // let the page render a not-found state
  return mapUser(await res.json());
}

export async function getPostsByUser(id) {
  // `cache: 'no-store'` => always fetch fresh (Server-Side Rendering per
  // request). Use for personalized or fast-changing data. This is the explicit
  // opposite of revalidate.
  const res = await fetch(`${BASE_URL}/posts?userId=${id}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to load posts');
  const raw = await res.json();
  return raw.map((p) => ({ id: p.id, title: p.title, body: p.body }));
}
