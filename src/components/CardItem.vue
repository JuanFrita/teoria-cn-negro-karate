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
      <div class="text-[0.75rem] tracking-[0.16em] uppercase text-gold mb-1">{{ label }}</div>
      <div class="font-bebas text-2xl tracking-[0.08em] leading-none">{{ title }}</div>
      <div
        v-if="badge"
        class="text-[0.75rem] tracking-[0.12em] uppercase bg-gold/10 text-gold border border-gold/40 rounded-full px-2.5 py-1 mt-1.5 inline-block"
      >
        {{ badge }}
      </div>
    </div>
    <div class="card-arrow text-gold-dim text-xl">→</div>
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
  @apply flex items-center gap-5 bg-surface border border-strong rounded-xl px-6 py-5 no-underline text-app-text transition-[transform,background-color,border-color,color] duration-300 ease-fluid cursor-pointer select-none;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
}

.card-item:hover,
.card-item:focus-visible {
  @apply bg-surface2;
  border-color: var(--border-hover);
  transform: translate3d(0, -3px, 0);
}

.card-item:active {
  transform: translate3d(0, 0, 0);
}

.card-arrow {
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  transition: transform 300ms cubic-bezier(0.16, 1, 0.3, 1), color 300ms cubic-bezier(0.16, 1, 0.3, 1);
}

.card-item:hover .card-arrow,
.card-item:focus-visible .card-arrow {
  transform: translate3d(4px, 0, 0);
  @apply text-gold;
}
</style>
