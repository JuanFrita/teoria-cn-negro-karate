<template>
  <RouterLink v-if="to" :to="to" class="back-link">{{ label }}</RouterLink>
  <button v-else type="button" class="back-link" @click="$emit('back')">{{ label }}</button>
</template>

<script setup>
import { RouterLink } from 'vue-router'

// Without `to` the link becomes a button that only emits `back`, so a page can
// step back through its own state instead of leaving the route entirely.
defineProps({
  to: { type: [String, Object], default: null },
  label: { type: String, default: '← Volver' },
})

defineEmits(['back'])
</script>

<style scoped>
.back-link {
  @apply inline-flex items-center gap-2 text-muted no-underline text-sm tracking-[0.15em] uppercase mb-8 transition-colors duration-200 hover:text-gold py-2 bg-transparent border-0 p-0 pt-2 pb-2 cursor-pointer text-left font-noto;
}

.back-link:focus-visible {
  @apply text-gold;
}
</style>
