/**
 * THE ROUTER — client-side navigation without full-page reloads.
 *
 * createWebHistory() uses the HTML5 History API, giving clean URLs (/users/1)
 * instead of hash URLs (/#/users/1). The trade-off: the server must serve
 * index.html for ALL routes (SPA fallback), otherwise a hard refresh on
 * /users/1 hits the server and 404s. Vite's dev server does this automatically;
 * in production you configure it on your host (e.g. nginx try_files).
 */
import { createRouter, createWebHistory } from 'vue-router';

// Route-level code splitting: `() => import(...)` lazy-loads each view in its
// own chunk, so the initial bundle only contains what the first screen needs.
// This is the single highest-leverage SPA performance pattern.
const routes = [
  {
    path: '/',
    redirect: '/users',
  },
  {
    path: '/users',
    name: 'users',
    component: () => import('../views/UsersView.vue'),
  },
  {
    // `:id` is a dynamic segment. In the component you read it via useRoute().
    path: '/users/:id',
    name: 'user-detail',
    component: () => import('../views/UserDetailView.vue'),
    props: true, // pass route params as component props — cleaner than reading $route
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
