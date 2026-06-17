/**
 * THE USERS STORE (Pinia) — the heart of this app's state.
 *
 * WHY Pinia (not Vuex): Pinia is the official Vue store now. It's smaller, fully
 * typed, has no mutations boilerplate (you mutate state directly in actions),
 * and works the same in the Composition API. In an interview: "Vuex required
 * mutations + actions; Pinia collapses that — actions mutate state directly,
 * and it's TS-first."
 *
 * WHY a store at all (vs fetching inside the component): the user list is shared
 * across screens (list view + detail view) and we don't want to refetch it on
 * every navigation. A store is the right home for SERVER STATE that outlives a
 * single component. (For purely local UI state, a ref in the component is fine —
 * don't put everything in a store; that's a common over-engineering smell.)
 */
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

// "Setup store" syntax: looks exactly like a component's <script setup>.
// refs => state, computed => getters, functions => actions. Very little to learn.
export const useUsersStore = defineStore('users', () => {
  // --- state ---------------------------------------------------------------
  const users = ref([]); // the mapped, UI-ready list
  const isLoading = ref(false);
  const error = ref(null);

  // --- getters (computed) --------------------------------------------------
  // Derived state. Recomputed lazily and cached until a dependency changes.
  const userCount = computed(() => users.value.length);
  const findById = computed(() => (id) => users.value.find((u) => u.id === Number(id)));

  // --- actions -------------------------------------------------------------
  // The component calls fetchUsers(); the store owns loading/error lifecycle.
  async function fetchUsers() {
    // Guard: don't refetch if we already have the data (simple cache).
    if (users.value.length > 0) return;

    isLoading.value = true;
    error.value = null;
    try {
      const raw = await fetchUsersFromApi();
      // THE MAPPING STEP: never let raw API shapes leak into your UI. Map the
      // server payload into the shape your components actually need. This
      // decouples the UI from the backend — if the API renames a field, you fix
      // it HERE, in one place, not in ten templates.
      users.value = raw.map(mapUser);
    } catch (err) {
      error.value = err.message;
    } finally {
      isLoading.value = false; // runs whether we succeeded or threw
    }
  }

  return { users, isLoading, error, userCount, findById, fetchUsers };
});

// Imported lazily-ish to keep the store readable; lives in the service layer.
import { api } from '../services/api';
const fetchUsersFromApi = () => api.getUsers();

/**
 * The adapter that turns a raw JSONPlaceholder user into our domain model.
 * Pure function => trivially unit-testable, no Vue/Pinia dependency.
 */
function mapUser(raw) {
  return {
    id: raw.id,
    name: raw.name,
    username: `@${raw.username}`,
    email: raw.email.toLowerCase(),
    company: raw.company?.name ?? 'Independent',
    city: raw.address?.city ?? 'Unknown',
    // Flatten/compute fields the UI wants but the API doesn't provide directly:
    initials: raw.name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase(),
  };
}
