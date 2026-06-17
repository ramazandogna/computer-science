/**
 * THE ROOT LAYOUT — required in the App Router. It wraps EVERY page and is the
 * one place that renders <html> and <body>. Layouts are Server Components by
 * default and PERSIST across navigations (they don't re-render or lose state
 * when you move between child pages) — that's the core App Router idea.
 */
import Link from 'next/link';
import './globals.css';

// The Metadata API: export a `metadata` object (or generateMetadata for dynamic
// values) and Next injects the right <title>/<meta> tags server-side — better
// for SEO than client-side tag juggling.
export const metadata = {
  title: 'Next.js App — Interview Prep',
  description: 'App Router, Server Components, Server Actions, caching, streaming.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="header">
          <strong>Next.js Interview Prep</strong>
          <nav>
            {/* <Link> does client-side navigation AND prefetches the target
                route's code/data when the link enters the viewport — instant
                navigations. This is why App Router apps feel fast. */}
            <Link href="/">Home</Link>
            <Link href="/users">Users (RSC)</Link>
            <Link href="/search">Search (client)</Link>
            <Link href="/actions">Actions</Link>
          </nav>
        </header>
        <main className="main">{children}</main>
      </body>
    </html>
  );
}
