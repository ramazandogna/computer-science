/**
 * THE API LAYER — same idea as the Vue module's service: the only place that
 * knows the network. Keeping fetch out of components makes them testable and
 * the data contract centralized.
 */
const BASE_URL = 'https://jsonplaceholder.typicode.com';

async function request(path, { signal } = {}) {
  const res = await fetch(`${BASE_URL}${path}`, { signal });
  // fetch resolves on 4xx/5xx — you must check ok yourself (recurring gotcha).
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}

// Map raw API users into a UI model. Pure function, unit-testable, keeps backend
// field names out of the components.
export function mapUser(raw) {
  return {
    id: raw.id,
    name: raw.name,
    username: `@${raw.username}`,
    email: raw.email.toLowerCase(),
    company: raw.company?.name ?? 'Independent',
    initials: raw.name
      .split(' ')
      .map((p) => p[0])
      .join('')
      .slice(0, 2)
      .toUpperCase(),
  };
}

export const api = {
  async getUsers(signal) {
    const raw = await request('/users', { signal });
    return raw.map(mapUser);
  },
  getPostsByUser: (userId, signal) => request(`/posts?userId=${userId}`, { signal }),
};
