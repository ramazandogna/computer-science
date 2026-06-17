<!--
  THE LIST SCREEN — fetch the users, map them in the store, render the list.
  This is the "smart"/container component: it talks to the store and the router,
  then hands plain data down to <UserCard>.
-->
<script setup>
import { onMounted, computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';

import { useUsersStore } from '../stores/users';
import UserCard from '../components/UserCard.vue';

const router = useRouter();
const store = useUsersStore();

// GOTCHA: destructuring a Pinia store breaks reactivity, because you'd pull the
// CURRENT values out and lose the reactive link. `storeToRefs` keeps state and
// getters reactive when destructured. ACTIONS are plain functions, so you
// destructure those directly off the store (not through storeToRefs).
const { users, isLoading, error } = storeToRefs(store);

// Local-only UI state belongs in the component, not the store. A search box
// filter is ephemeral and not shared, so a ref is the right tool.
const query = ref('');

// A computed that filters the mapped list reactively as the user types.
const filteredUsers = computed(() => {
  const q = query.value.trim().toLowerCase();
  if (!q) return users.value;
  return users.value.filter(
    (u) => u.name.toLowerCase().includes(q) || u.username.toLowerCase().includes(q),
  );
});

// LIFECYCLE: onMounted runs after the component is inserted into the DOM. This
// is the right place to kick off data fetching for a screen. (The store guards
// against refetching if data is already cached.)
onMounted(() => {
  store.fetchUsers();
});

function goToDetail(id) {
  // Programmatic navigation. Named routes + params are refactor-safe (you can
  // change the path without touching every link).
  router.push({ name: 'user-detail', params: { id } });
}
</script>

<template>
  <section>
    <!-- v-model two-way binds the input value to `query`. Typing updates the ref,
         which re-runs the `filteredUsers` computed, which re-renders the list. -->
    <input
      v-model="query"
      type="search"
      placeholder="Filter by name or @username…"
      class="search"
      aria-label="Filter users"
    />

    <!--
      THE THREE UI STATES every data screen must handle. Forgetting error/empty
      states is the #1 thing interviewers notice in a "fetch and list" task.
    -->
    <p v-if="isLoading" class="status">Loading users…</p>
    <p v-else-if="error" class="status status--error">Failed to load: {{ error }}</p>
    <p v-else-if="filteredUsers.length === 0" class="status">No users match "{{ query }}".</p>

    <!--
      v-for renders the list. `:key` MUST be a stable, unique id (not the array
      index) so Vue can patch the DOM efficiently and preserve element state on
      reorder/insert. Same rule as React's key — a guaranteed interview question.
    -->
    <ul v-else class="list">
      <li v-for="user in filteredUsers" :key="user.id">
        <!-- props down: pass the user object. events up: handle @select. -->
        <UserCard :user="user" @select="goToDetail" />
      </li>
    </ul>
  </section>
</template>

<style scoped>
.search {
  width: 100%;
  padding: 0.6rem 0.75rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 1rem;
  font-size: 1rem;
}
.list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.5rem;
}
.status {
  color: #666;
}
.status--error {
  color: #c0392b;
}
</style>
