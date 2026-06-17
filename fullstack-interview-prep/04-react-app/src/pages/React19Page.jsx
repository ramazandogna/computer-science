/**
 * REACT 19 — what changed, and the features interviewers will probe in 2025+.
 *
 * Headline additions (all demonstrated below):
 *   • Actions          — async transitions for data mutations, with pending +
 *                        error handling built in.
 *   • useActionState   — manage an action's return value + pending state (this
 *                        replaces the experimental useFormState).
 *   • useFormStatus    — read the parent <form>'s submit status from a child.
 *   • useOptimistic    — show an optimistic result immediately, auto-revert on
 *                        failure.
 *   • use()            — read a promise (with Suspense) or context DURING render;
 *                        unlike hooks, it CAN be called conditionally.
 *   • ref as a prop    — function components receive `ref` as a normal prop;
 *                        forwardRef is no longer needed.
 *   • Document metadata — render <title>/<meta>/<link> anywhere; React hoists
 *                        them to <head>.
 *
 * Also in 19 (mention if asked): the React Compiler (auto-memoization, makes
 * most useMemo/useCallback unnecessary), Server Components as a stable contract
 * (used by Next.js — see module 05), ref cleanup functions, better hydration
 * error messages, and removals (ReactDOM.render, string refs, legacy context,
 * propTypes/defaultProps on function components).
 */
import {
  useActionState,
  useOptimistic,
  useRef,
  useState,
  use,
  Suspense,
} from 'react';
import { useFormStatus } from 'react-dom';

export default function React19Page() {
  return (
    <div className="stack">
      {/* DOCUMENT METADATA: rendered here, but React hoists it into <head>.
          Pre-19 you needed react-helmet for this. */}
      <title>React 19 Features — Interview Prep</title>
      <meta name="description" content="React 19 Actions, useOptimistic, use(), and more." />

      <h2>React 19 Features</h2>
      <CommentsDemo />
      <UseApiDemo />
      <RefAsPropDemo />
    </div>
  );
}

/* ── Actions + useActionState + useOptimistic + useFormStatus ────────────────
   A comment box that posts to a fake server. The new comment appears INSTANTLY
   (optimistic), the submit button auto-disables while pending (useFormStatus),
   and a failed submit reverts the optimistic entry. */
function fakeServerPost(text) {
  // Simulate latency + a 1-in-4 failure so you can watch the optimistic revert.
  return new Promise((resolve, reject) =>
    setTimeout(() => (Math.random() < 0.25 ? reject(new Error('Server rejected')) : resolve(text)), 800),
  );
}

function CommentsDemo() {
  const [comments, setComments] = useState(['First!']);

  // useOptimistic: render `optimisticComments` (the real list PLUS any in-flight
  // optimistic entries). When the action finishes/throws, React drops the
  // optimistic layer and re-syncs to the real `comments` state.
  const [optimisticComments, addOptimistic] = useOptimistic(comments, (current, newComment) => [
    ...current,
    { text: newComment, pending: true },
  ]);

  // useActionState: pass an async action; get back the form's last result state,
  // a `formAction` to wire to <form action={...}>, and `isPending`. The action
  // receives (previousState, formData).
  const [formState, formAction, isPending] = useActionState(
    async (_prevState, formData) => {
      const text = formData.get('comment')?.toString().trim();
      if (!text) return { error: 'Comment cannot be empty' };

      addOptimistic(text); // 1) show it immediately
      try {
        const saved = await fakeServerPost(text); // 2) await the "server"
        setComments((prev) => [...prev, saved]); // 3) commit real state
        return { error: null };
      } catch (err) {
        // 4) returning here ends the action; the optimistic entry is discarded
        //    automatically because we never committed it to `comments`.
        return { error: err.message };
      }
    },
    { error: null },
  );

  return (
    <section className="card2">
      <h3>Actions + useOptimistic {isPending && '(saving…)'}</h3>
      <ul>
        {optimisticComments.map((c, i) => {
          const item = typeof c === 'string' ? { text: c } : c;
          return (
            <li key={i} style={{ opacity: item.pending ? 0.5 : 1 }}>
              {item.text} {item.pending && '⏳'}
            </li>
          );
        })}
      </ul>

      {/* React 19: a <form action={fn}> calls the action with FormData. No
          onSubmit/preventDefault boilerplate; works as a transition. */}
      <form action={formAction}>
        <input name="comment" placeholder="Add a comment (25% will 'fail')" />
        <SubmitButton />
      </form>
      {formState.error && <p className="error">{formState.error}</p>}
    </section>
  );
}

/* useFormStatus reads the status of the NEAREST parent <form>. It must be in a
   component RENDERED INSIDE the form — that's the whole point: a reusable submit
   button that knows the form is submitting without prop-drilling. */
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Posting…' : 'Post'}
    </button>
  );
}

/* ── use() + Suspense ────────────────────────────────────────────────────────
   `use(promise)` suspends the component until the promise resolves; the nearest
   <Suspense> shows the fallback meanwhile. The promise must be STABLE across
   renders (created outside render or cached), or you'd create a new one each
   render and never resolve. */
const messagePromise = new Promise((resolve) =>
  setTimeout(() => resolve('Resolved by use() + Suspense'), 1200),
);

function UseApiDemo() {
  return (
    <section className="card2">
      <h3>use() + Suspense</h3>
      <Suspense fallback={<p>Loading via Suspense…</p>}>
        <AsyncMessage />
      </Suspense>
    </section>
  );
}
function AsyncMessage() {
  // use() unwraps the promise. Unlike a hook, use() may be called conditionally
  // or in a loop — it's not bound by the rules of hooks.
  const message = use(messagePromise);
  return <p>{message}</p>;
}

/* ── ref as a prop (no forwardRef) ───────────────────────────────────────────
   In React 19, a function component can declare `ref` in its props directly.
   Pre-19 you had to wrap the component in forwardRef. */
function FancyInput({ ref, ...props }) {
  return <input ref={ref} {...props} className="fancy" />;
}
function RefAsPropDemo() {
  const ref = useRef(null);
  return (
    <section className="card2">
      <h3>ref as a prop (forwardRef no longer required)</h3>
      <FancyInput ref={ref} placeholder="parent can focus me" />
      <button onClick={() => ref.current?.focus()}>focus child input</button>
    </section>
  );
}
