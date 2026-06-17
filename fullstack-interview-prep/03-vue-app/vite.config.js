import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// Vite is the dev server + bundler. In dev it serves your source over native
// ESM with hot module replacement (HMR) — near-instant updates, no full rebuild.
// For production `vite build` uses Rollup to produce optimized, code-split bundles.
//
// The `vue` plugin compiles `.vue` Single-File Components (SFCs): it splits the
// <template>, <script setup>, and <style> blocks and turns the template into a
// fast render function at BUILD time (Vue's compiler is ahead-of-time).
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5173,
  },
});
