<template>
  <button
    type="button"
    class="theme-toggle"
    role="switch"
    :aria-checked="theme === 'dark'"
    :aria-label="theme === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'"
    :title="theme === 'dark' ? 'Tema claro' : 'Tema oscuro'"
    @click="toggleTheme"
  >
    <svg
      v-if="theme === 'dark'"
      class="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.8"
      stroke-linecap="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
    <svg
      v-else
      class="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.8"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
  </button>
</template>

<script setup>
import { useTheme } from '../composables/useTheme.js'

const { theme, toggleTheme } = useTheme()
</script>

<style scoped>
.theme-toggle {
  @apply inline-flex items-center justify-center w-9 h-9 rounded-full bg-surface border border-strong text-muted transition-colors duration-200;
}

.theme-toggle:hover,
.theme-toggle:focus-visible {
  @apply text-gold bg-surface2;
  border-color: var(--border-hover);
}
</style>
