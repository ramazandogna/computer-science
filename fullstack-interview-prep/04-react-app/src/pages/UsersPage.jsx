/**
 * THE DATA-FETCHING SCREEN — deliberately the SAME feature as the Vue module's
 * UsersView, so you can compare the two mental models side by side.
 *
 * Pattern: a custom hook (useUsers) owns the fetch + loading/error lifecycle;
 * this component just renders the three states and a client-side filter.
 */
import { useState, useCallback, useMemo } from 'react';
import { useUsers } from '../hooks/useUsers.js';
import UserCard from '../components/UserCard.jsx';

export default function UsersPage() {
  const { users, status, error } = useUsers();
  const [query, setQuery] = useState('');

  // Derived data: memoized so we don't re-filter on unrelated re-renders.
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return users;
    return users.filter(
      (u) => u.name.toLowerCase().includes(q) || u.username.toLowerCase().includes(q),
    );
  }, [users, query]);

  // Stable callback identity so the memoized <UserCard> children keep their
  // re-render bail-out when the parent re-renders (e.g. on each keystroke).
  const handleSelect = useCallback((id) => {
    alert(`Selected user #${id} (wire this to a route in a real app)`);
  }, []);

  // The three states. Render the right branch — never assume data is present.
  if (status === 'loading') return <p>Loading users…</p>;
  if (status === 'error') return <p className="error">Failed to load: {error}</p>;

  return (
    <div className="stack">
      <h2>Users ({filtered.length})</h2>
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Filter by name or @username…"
        aria-label="Filter users"
      />

      {filtered.length === 0 ? (
        <p>No users match "{query}".</p>
      ) : (
        <ul className="list">
          {filtered.map((user) => (
            // key MUST be a stable unique id (not the array index). React uses it
            // to match elements across renders; a wrong key corrupts state and
            // hurts performance. Identical rule to Vue's :key.
            <li key={user.id}>
              <UserCard user={user} onSelect={handleSelect} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
