/**
 * USER DETAIL — dynamic route `[id]`, demonstrating three App Router essentials:
 *   1. ASYNC params (Next 15): `params` is now a Promise — you `await` it.
 *   2. notFound(): bail to the nearest not-found UI for a missing record.
 *   3. STREAMING with <Suspense>: render the profile instantly, stream the
 *      (slower, no-store) posts in separately so one slow query doesn't block
 *      the whole page.
 */
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getUser, getPostsByUser } from '../../../lib/api';

export default async function UserDetailPage({ params }) {
  // Next.js 15: params (and searchParams, cookies, headers) are async. Awaiting
  // them lets Next defer resolving the route until it actually needs the value.
  const { id } = await params;

  const user = await getUser(id);
  if (!user) notFound(); // throws; Next renders not-found.jsx / a 404

  return (
    <section>
      <Link href="/users">&larr; Back</Link>
      <h1>{user.name}</h1>
      <p className="muted">
        {user.username} · {user.email} · {user.company}
      </p>

      <h2>Posts</h2>
      {/* The profile above is already rendered and visible. The posts fetch is
          slower (no-store), so we wrap it in its own Suspense boundary: Next
          streams the fallback first, then swaps in the posts when they resolve.
          This is per-section streaming — the page is interactive before all
          data arrives. */}
      <Suspense fallback={<p className="muted">Loading posts…</p>}>
        <UserPosts id={id} />
      </Suspense>
    </section>
  );
}

// A nested async Server Component. Because it's awaited inside a Suspense
// boundary, React can stream it independently of its parent.
async function UserPosts({ id }) {
  const posts = await getPostsByUser(id);
  return (
    <ul className="list">
      {posts.map((post) => (
        <li key={post.id} className="card">
          <strong>{post.title}</strong>
          <p className="muted">{post.body}</p>
        </li>
      ))}
    </ul>
  );
}
