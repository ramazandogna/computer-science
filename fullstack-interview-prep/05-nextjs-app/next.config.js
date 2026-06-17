/** @type {import('next').NextConfig} */

// Next.js config. Kept intentionally minimal — the defaults are good. In a real
// app this is where you'd add image domains, redirects, headers, env exposure,
// and experimental flags. `next dev --turbo` uses Turbopack (the Rust bundler,
// stable for dev in Next 15) for much faster cold starts and HMR.
const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;
