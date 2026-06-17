<!--
  A PRESENTATIONAL ("dumb") COMPONENT.
  It takes data via props and emits events; it owns no business logic and does
  no fetching. This split — smart containers (views/store) vs dumb presenters —
  keeps components reusable and testable. Interviewers call this the
  "container/presentational" pattern.
-->
<script setup>
// defineProps is a compiler macro (no import needed in <script setup>). Typing
// props with validators documents the contract and warns in dev on misuse.
const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});

// defineEmits declares the events this component can emit. The PARENT decides
// what happens; the child just announces "the user clicked select". This
// one-way data flow (props down, events up) is core to Vue's reactivity model.
const emit = defineEmits(['select']);
</script>

<template>
  <article class="card" @click="emit('select', props.user.id)">
    <!-- A computed-on-the-fly avatar from the initials we mapped in the store. -->
    <span class="card__avatar">{{ user.initials }}</span>
    <div class="card__body">
      <!-- Mustache interpolation. Vue tracks `user.*` as reactive dependencies. -->
      <h3 class="card__name">{{ user.name }}</h3>
      <p class="card__meta">{{ user.username }} · {{ user.company }}</p>
      <p class="card__meta">{{ user.city }}</p>
    </div>
  </article>
</template>

<style scoped>
.card {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  padding: 0.75rem;
  border: 1px solid #e2e2e2;
  border-radius: 8px;
  cursor: pointer;
}
.card:hover {
  border-color: #888;
}
.card__avatar {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #2c3e50;
  color: #fff;
  font-weight: 600;
}
.card__name {
  margin: 0;
  font-size: 1rem;
}
.card__meta {
  margin: 0;
  color: #666;
  font-size: 0.85rem;
}
</style>
