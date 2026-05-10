<template>
  <component
    :is="href ? 'a' : to ? RouterLink : 'div'"
    v-bind="href ? { href } : to ? { to } : {}"
    class="card-item group"
    :class="{ 'opacity-40 cursor-not-allowed pointer-events-none': !href && !to }"
    :aria-disabled="!href && !to ? 'true' : undefined"
  >
    <BeltIcon :dans="dans" />
    <div class="flex-1">
      <div class="text-[0.7rem] tracking-[0.2em] uppercase text-gold mb-1">{{ label }}</div>
      <div class="font-bebas text-2xl tracking-[0.08em] leading-none">{{ title }}</div>
      <div
        v-if="badge"
        class="text-[0.6rem] tracking-[0.15em] uppercase bg-gold/10 text-gold border border-gold/25 rounded-full px-2.5 py-0.5 mt-1.5 inline-block"
      >
        {{ badge }}
      </div>
    </div>
    <div class="text-gold-dim text-xl transition-all duration-200 group-hover:translate-x-1 group-hover:text-gold">→</div>
  </component>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import BeltIcon from './BeltIcon.vue'

defineProps({
  label: { type: String, required: true },
  title: { type: String, required: true },
  dans: { type: Number, default: 0 },
  badge: { type: String, default: null },
  href: { type: String, default: null },
  to: { type: [String, Object], default: null },
})
</script>

<style scoped>
.card-item {
  @apply flex items-center gap-5 bg-surface border border-theme rounded-xl px-6 py-5 no-underline text-app-text transition-all duration-200 cursor-pointer select-none outline-none;
}

.card-item:hover,
.card-item:focus-visible {
  @apply bg-surface2 -translate-y-0.5;
  border-color: var(--border-hover);
}

.card-item:active {
  @apply translate-y-0;
}
</style>
