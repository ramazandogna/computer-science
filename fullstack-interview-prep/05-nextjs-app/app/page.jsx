/**
 * THE HOME PAGE — a Server Component (the App Router default: no "use client").
 *
 * This component runs ONLY on the server. Its JavaScript is never shipped to the
 * browser. That's the whole pitch of React Server Components (RSC): move data
 * fetching and heavy/secret logic to the server, ship HTML, and send zero JS for
 * the non-interactive parts of your page. You only "pay" JS for the islands you
 * explicitly mark "use client".
 */
export default function HomePage() {
  // This console.log appears in your TERMINAL (server), not the browser console.
  // Proof the component executed server-side.
  console.log('[server] rendering HomePage');

  return (
    <section>
      <h1>App Router mental model</h1>
      <p>
        Everything here is a <strong>Server Component</strong> unless a file
        starts with <code>&quot;use client&quot;</code>. Read the README, then
        each route below in order.
      </p>

      <h2>Server vs Client Components</h2>
      <table>
        <tbody>
          <tr>
            <td>
              <strong>Server (default)</strong>
            </td>
            <td>
              Runs on the server only. Can be <code>async</code> and fetch data
              directly. Ships no JS. Cannot use state, effects, or browser APIs.
            </td>
          </tr>
          <tr>
            <td>
              <strong>Client (&quot;use client&quot;)</strong>
            </td>
            <td>
              Hydrated in the browser. Can use hooks, events, and browser APIs.
              Ships JS. Keep these as small leaf &quot;islands&quot;.
            </td>
          </tr>
        </tbody>
      </table>

      <p className="muted">
        Rule of thumb: keep components on the server by default; push
        <code>&quot;use client&quot;</code> down to the smallest interactive leaf.
      </p>
    </section>
  );
}
