import { memo } from 'react';

/**
 * A PRESENTATIONAL component wrapped in React.memo.
 *
 * React.memo skips re-rendering when props are SHALLOW-equal to the previous
 * render. WHY it matters here: in a list of 100 cards, if the parent re-renders
 * (e.g. its search input changes), memo prevents re-rendering the 99 cards
 * whose props didn't change.
 *
 * GOTCHA: memo only helps if props are stable. If the parent passes a NEW
 * inline function (onSelect={() => ...}) every render, the prop identity
 * changes and memo is defeated. That's why the parent wraps callbacks in
 * useCallback. (Note: the React Compiler, when enabled, does this memoization
 * for you — see React19Page.)
 */
function UserCard({ user, onSelect }) {
  return (
    <button type="button" className="card" onClick={() => onSelect(user.id)}>
      <span className="card__avatar">{user.initials}</span>
      <span className="card__body">
        <strong>{user.name}</strong>
        <small>
          {user.username} · {user.company}
        </small>
      </span>
    </button>
  );
}

export default memo(UserCard);
