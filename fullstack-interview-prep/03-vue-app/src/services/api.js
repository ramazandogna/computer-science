/**
 * THE API LAYER — the ONLY place that knows how to talk to the network.
 *
 * WHY a dedicated service module instead of fetch() scattered in components:
 *   - One place to set the base URL, headers, timeouts, auth tokens.
 *   - One place to normalize errors so the UI deals with a consistent shape.
 *   - Components stay declarative; they ask for "users", not "GET /users".
 * This separation (UI ↔ data access) is the same instinct as a repository
 * layer on the backend (see module 06). Interviewers look for this boundary.
 */

// JSONPlaceholder: a free, public, read-mostly fake REST API. Perfect for demos.
const BASE_URL = 'https://jsonplaceholder.typicode.com';

/**
 * A thin wrapper over fetch that:
 *  - prefixes the base URL,
 *  - throws on non-2xx (fetch does NOT reject on 404/500 — a classic gotcha),
 *  - supports cancellation via an AbortSignal,
 *  - parses JSON once.
 */
async function request(path, { signal } = {}) {
  const response = await fetch(`${BASE_URL}${path}`, { signal });

  // GOTCHA: fetch only rejects on NETWORK failure. A 500 is a "successful"
  // fetch with ok=false. You MUST check response.ok yourself.
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

// Each function maps to one endpoint. The component never sees a URL.
export const api = {
  getUsers: (signal) => request('/users', { signal }),
  getUser: (id, signal) => request(`/users/${id}`, { signal }),
  getPostsByUser: (userId, signal) => request(`/posts?userId=${userId}`, { signal }),
};
