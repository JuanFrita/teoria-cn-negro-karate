<template>
  <div class="flex items-center gap-2">
    <RouterLink v-if="showHome" to="/" class="header-action" aria-label="Ir al inicio" title="Inicio">
      <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M3 10.5 12 3l9 7.5" />
        <path d="M5 9.5V20h14V9.5" />
      </svg>
    </RouterLink>

    <RouterLink to="/sobre" class="header-action" aria-label="Sobre este proyecto" title="Sobre esto">
      <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 11v5" />
        <path d="M12 7.75v.5" />
      </svg>
    </RouterLink>

    <ThemeToggle />
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import ThemeToggle from './ThemeToggle.vue'

defineProps({
  showHome: { type: Boolean, default: false },
})
</script>

<style scoped>
.header-action {
  @apply inline-flex items-center justify-center w-9 h-9 rounded-full bg-surface border border-strong text-muted no-underline transition-colors duration-200;
}

.header-action:hover,
.header-action:focus-visible {
  @apply text-gold bg-surface2;
  border-color: var(--border-hover);
}
</style>
