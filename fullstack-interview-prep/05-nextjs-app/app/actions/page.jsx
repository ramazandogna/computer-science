/**
 * ACTIONS PAGE — a Server Component that renders the current feedback list
 * (read directly from server state, no fetch) plus the client form. After the
 * server action runs and calls revalidatePath('/actions'), Next re-renders this
 * Server Component and the new item appears — no manual client refetch.
 */
import { getFeedback } from './store';
import FeedbackForm from './FeedbackForm';

export default function ActionsPage() {
  // Reading server state directly inside a Server Component. In a real app this
  // would be a DB query. No API layer, no client fetch.
  const items = getFeedback();

  return (
    <section>
      <h1>Server Actions</h1>
      <p className="muted">
        The form below posts to a server action (no API route). On success the
        action revalidates this route and the list re-renders server-side.
      </p>

      <FeedbackForm />

      <h2>Feedback ({items.length})</h2>
      <ul className="list">
        {items.map((msg, i) => (
          <li key={i} className="card">
            {msg}
          </li>
        ))}
      </ul>
    </section>
  );
}
