/**
 * USERS LIST — an ASYNC Server Component. Note there is no useEffect, no
 * useState, no loading flag: you `await` the data directly in the component
 * body. Next renders this on the server with the data already in hand and
 * streams HTML to the browser. No client-side fetch waterfall, no flash of
 * empty state.
 */
import Link from 'next/link';
import { getUsers } from '../../lib/api';

// A Server Component can be async. This is impossible in a Client Component.
export default async function UsersPage() {
  const users = await getUsers(); // server-side fetch, cached per lib/api.js

  return (
    <section>
      <h1>Users ({users.length})</h1>
      <ul className="list">
        {users.map((user) => (
          // Navigating to a dynamic route. Next prefetches each linked route.
          <li key={user.id}>
            <Link href={`/users/${user.id}`} className="card">
              <strong>{user.name}</strong>
              <div className="muted">
                {user.username} · {user.company}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
