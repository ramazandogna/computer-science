<!--
  THE ROOT COMPONENT — the app shell.
  It renders persistent chrome (header/nav) plus a <router-view> placeholder
  where the matched route's component is injected. Everything that changes per
  screen renders inside <router-view>; everything around it stays mounted.
-->
<script setup>
// `<script setup>` is the modern Vue authoring style: top-level bindings are
// auto-exposed to the template, no `return` block, less boilerplate than the
// old Options API. Imports here are available directly in the template below.
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <div class="app">
    <header class="app__header">
      <h1>Vue Users</h1>
      <nav>
        <!--
          <router-link> renders an <a> but intercepts the click to navigate
          via the History API (no full reload). `active-class` styling and
          accessibility come for free.
        -->
        <RouterLink to="/users">All users</RouterLink>
      </nav>
    </header>

    <main class="app__main">
      <!-- The matched route component renders here. -->
      <RouterView />
    </main>
  </div>
</template>

<!--
  `scoped` rewrites these selectors with a unique data-attribute so they ONLY
  apply to this component's elements — no global CSS leakage. This is Vue's
  built-in answer to CSS Modules / styled-components.
-->
<style scoped>
.app {
  max-width: 720px;
  margin: 0 auto;
  font-family: system-ui, sans-serif;
}
.app__header {
  display: flex;
  align-items: baseline;
  gap: 1rem;
  border-bottom: 1px solid #e2e2e2;
  padding: 1rem 0;
}
.app__main {
  padding: 1rem 0;
}
</style>
