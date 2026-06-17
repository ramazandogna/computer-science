/**
 * A CUSTOM HOOK — the primary unit of reuse in React.
 *
 * A custom hook is just a function whose name starts with `use` and that calls
 * other hooks. It lets you extract stateful logic (here: data fetching +
 * loading/error lifecycle) out of components so multiple components can share
 * it WITHOUT sharing rendered markup. This is React's answer to mixins/HOCs.
 */
import { useState, useEffect } from 'react';
import { api } from '../api/jsonplaceholder.js';

export function useUsers() {
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState('loading'); // 'loading' | 'success' | 'error'
  const [error, setError] = useState(null);

  useEffect(() => {
    // AbortController cancels the request if the component unmounts before it
    // resolves. WHY: without it you'd call setState on an unmounted component
    // and, worse, a slow earlier response could overwrite a newer one (a race).
    const controller = new AbortController();

    api
      .getUsers(controller.signal)
      .then((data) => {
        setUsers(data);
        setStatus('success');
      })
      .catch((err) => {
        if (err.name === 'AbortError') return; // deliberate cancel, not a real error
        setError(err.message);
        setStatus('error');
      });

    // The cleanup function runs on unmount AND before the effect re-runs.
    // Returning it is the contract for "undo what this effect started".
    return () => controller.abort();

    // Empty deps array => run once on mount. If this hook took a `userId` arg
    // that the request depended on, it would go in this array so the effect
    // re-runs (and the old request aborts) when the id changes.
  }, []);

  return { users, status, error };
}
