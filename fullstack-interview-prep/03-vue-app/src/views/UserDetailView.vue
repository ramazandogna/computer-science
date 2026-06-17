<!--
  THE DETAIL SCREEN — demonstrates: reading a route param, reusing store data,
  a SECOND API call (this user's posts), and cancelling it on navigation.
-->
<script setup>
import { ref, computed, watch, onUnmounted } from 'vue';
import { useUsersStore } from '../stores/users';
import { api } from '../services/api';

// Because the route is declared with `props: true`, the `:id` URL segment is
// delivered as a prop. This keeps the component decoupled from the router — you
// could render it directly in a test by passing `id`.
const props = defineProps({
  id: {
    type: [String, Number],
    required: true,
  },
});

const store = useUsersStore();

// Reuse data we already fetched for the list instead of hitting the network
// again. `findById` is a getter returning a function (parametrized getter).
const user = computed(() => store.findById(props.id));

// Local state for the second resource: this user's posts.
const posts = ref([]);
const postsLoading = ref(false);
const postsError = ref(null);

// We keep a reference to the in-flight AbortController so we can cancel the
// previous request if the user navigates to a different detail page quickly.
let controller = null;

async function loadPosts(userId) {
  // Cancel any previous in-flight request (prevents a race where an older,
  // slower response overwrites a newer one — a real production bug).
  controller?.abort();
  controller = new AbortController();

  postsLoading.value = true;
  postsError.value = null;
  try {
    const raw = await api.getPostsByUser(userId, controller.signal);
    posts.value = raw.map((p) => ({ id: p.id, title: p.title, body: p.body }));
  } catch (err) {
    if (err.name !== 'AbortError') postsError.value = err.message; // ignore deliberate cancels
  } finally {
    postsLoading.value = false;
  }
}

// Ensure the list is loaded so `user` resolves on a hard refresh / deep link.
store.fetchUsers();

// WATCH the id. `immediate: true` runs it once on mount too. When the user
// navigates /users/1 -> /users/2, the SAME component instance is reused (Vue
// Router doesn't remount it), so onMounted would NOT fire again — `watch` is
// the correct tool to react to a changing param. This is a classic SPA gotcha.
watch(
  () => props.id,
  (newId) => loadPosts(newId),
  { immediate: true },
);

// Clean up: abort any pending request when leaving the screen to avoid setting
// state on an unmounted component / wasting bandwidth.
onUnmounted(() => controller?.abort());
</script>

<template>
  <section v-if="user">
    <RouterLink to="/users">&larr; Back</RouterLink>

    <header class="profile">
      <span class="profile__avatar">{{ user.initials }}</span>
      <div>
        <h2>{{ user.name }}</h2>
        <p class="muted">{{ user.username }} · {{ user.email }}</p>
        <p class="muted">{{ user.company }} — {{ user.city }}</p>
      </div>
    </header>

    <h3>Posts</h3>
    <p v-if="postsLoading" class="muted">Loading posts…</p>
    <p v-else-if="postsError" class="error">Failed: {{ postsError }}</p>
    <ul v-else class="posts">
      <li v-for="post in posts" :key="post.id" class="post">
        <strong>{{ post.title }}</strong>
        <p class="muted">{{ post.body }}</p>
      </li>
    </ul>
  </section>

  <!-- Defensive UI: deep-linking to a non-existent id shouldn't crash. -->
  <p v-else class="muted">User #{{ id }} not found.</p>
</template>

<style scoped>
.profile {
  display: flex;
  gap: 1rem;
  align-items: center;
  margin: 1rem 0;
}
.profile__avatar {
  display: grid;
  place-items: center;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #2c3e50;
  color: #fff;
  font-weight: 700;
  font-size: 1.25rem;
}
.posts {
  list-style: none;
  padding: 0;
  display: grid;
  gap: 0.75rem;
}
.post {
  padding: 0.75rem;
  border: 1px solid #eee;
  border-radius: 8px;
}
.muted {
  color: #666;
  margin: 0.25rem 0;
}
.error {
  color: #c0392b;
}
</style>
