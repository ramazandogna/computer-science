'use client';

/**
 * The interactive form — a Client Component because it uses hooks. It imports a
 * SERVER action and wires it with useActionState. Note how the boundary works:
 * a client component calling a server function, with Next handling the RPC.
 */
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { submitFeedback } from './actions';

export default function FeedbackForm() {
  // Same useActionState as the React module — but here the action runs on the
  // SERVER. `state` is whatever the action returned; `formAction` is wired to
  // the form; React tracks pending automatically.
  const [state, formAction] = useActionState(submitFeedback, { ok: true, error: null });

  return (
    <form action={formAction}>
      <input name="message" placeholder="Leave feedback…" aria-label="feedback" />
      <SubmitButton />
      {state.error && <p className="error">{state.error}</p>}
    </form>
  );
}

// Reusable submit button that reads the parent form's pending state. Lives in a
// client component because useFormStatus is a client hook.
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Sending…' : 'Send'}
    </button>
  );
}
