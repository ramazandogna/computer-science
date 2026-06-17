/**
 * THE BOOTSTRAP — the entry point Vite loads from index.html.
 *
 * Three things get wired onto the app instance before it mounts:
 *   1. Pinia  — the state store (createPinia)
 *   2. Router — client-side navigation (the router instance)
 *   3. Mount  — attach the root <App> component to #app in the DOM
 *
 * Order matters only in that plugins must be `.use()`d before `.mount()`.
 */
import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import { router } from './router';

// createApp returns an application instance. Unlike Vue 2's global `Vue`, this
// is scoped — you could mount several independent apps on one page, each with
// its own plugins. That isolation is a deliberate Vue 3 design improvement.
const app = createApp(App);

app.use(createPinia()); // every component can now use defineStore-based stores
app.use(router); // enables <router-link>, <router-view>, and useRoute/useRouter

app.mount('#app');
