/**
 * A tiny smoke test — NOT a substitute for unit/integration tests, just a quick
 * "is the running server behaving?" check you can run after `npm run dev`.
 * Uses Node's built-in global fetch (Node 18+), so no dependencies.
 *
 *   1) start the server in one terminal:  npm run dev
 *   2) run this in another:               npm run test:smoke
 */
const BASE = `http://localhost:${process.env.PORT ?? 3000}`;

async function expectOk(label, promise) {
  const res = await promise;
  const body = await res.json().catch(() => ({}));
  const ok = res.ok;
  console.log(`${ok ? '✓' : '✗'} ${label} -> ${res.status}`, body.error ?? '');
  if (!ok) process.exitCode = 1;
  return { res, body };
}

async function run() {
  await expectOk('GET /health', fetch(`${BASE}/health`));

  // First read: cache miss (origin). Watch the X-Data-Source header.
  const first = await fetch(`${BASE}/api/users`);
  console.log('  GET /api/users (1) X-Data-Source:', first.headers.get('x-data-source'));

  // Second read: should be served from cache if Redis is up.
  const second = await fetch(`${BASE}/api/users`);
  console.log('  GET /api/users (2) X-Data-Source:', second.headers.get('x-data-source'));

  await expectOk('GET /api/users/1', fetch(`${BASE}/api/users/1`));

  // Validation: a non-numeric id must be rejected at the edge with 400.
  const bad = await fetch(`${BASE}/api/users/not-a-number`);
  console.log(`${bad.status === 400 ? '✓' : '✗'} GET /api/users/not-a-number -> ${bad.status} (expected 400)`);
  if (bad.status !== 400) process.exitCode = 1;

  // Create a user (busts the list cache).
  await expectOk(
    'POST /api/users',
    fetch(`${BASE}/api/users`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ name: 'Margaret Hamilton', email: 'margaret@example.com' }),
    }),
  );

  console.log('\nSmoke test done.');
}

run().catch((err) => {
  console.error('Smoke test could not reach the server. Is it running?', err.message);
  process.exit(1);
});
