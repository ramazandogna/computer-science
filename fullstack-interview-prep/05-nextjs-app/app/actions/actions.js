'use server';

/**
 * SERVER ACTIONS — functions that run ONLY on the server but can be called
 * directly from client components / form `action` props. The "use server"
 * directive marks them. Next creates a secure RPC endpoint under the hood; the
 * client just calls the function and Next handles the network round-trip,
 * serialization, and CSRF protection.
 *
 * This is the App Router's answer to "where does the form POST go?" — you don't
 * write an API route for mutations; you write a server action and pass it to
 * <form action={...}>.
 *
 * GOTCHA: EVERY export in a "use server" file must be an ASYNC function. The
 * synchronous store reads live in ./store.js instead (see that file's comment).
 */
import { revalidatePath } from 'next/cache';
import { addFeedback } from './store';

/**
 * The action. Signature `(prevState, formData)` is what useActionState expects.
 * It validates, mutates server state, then revalidates the page so the
 * server-rendered list re-fetches and shows the new entry.
 */
export async function submitFeedback(_prevState, formData) {
  const message = formData.get('message')?.toString().trim();

  // Validate on the SERVER — never trust client validation alone. Returning a
  // serializable state object is how the action communicates back to the form.
  if (!message) return { ok: false, error: 'Message is required' };
  if (message.length > 140) return { ok: false, error: 'Keep it under 140 chars' };

  // Simulate latency so you can watch useFormStatus's pending state.
  await new Promise((r) => setTimeout(r, 600));
  addFeedback(message);

  // revalidatePath busts the cache for this route so the next render (which
  // happens automatically after the action) reflects the new data. Pair with
  // revalidateTag('users') to invalidate a specific tagged fetch.
  revalidatePath('/actions');

  return { ok: true, error: null };
}
