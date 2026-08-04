<template>
  <div class="relative z-10 max-w-[560px] mx-auto px-4 py-8 pb-20">
    <div class="flex items-start justify-between gap-4">
      <BackLink :to="backTo" :label="backLabel" @back="$emit('back')" />
      <HeaderActions show-home />
    </div>

    <header class="mb-10 pb-6 border-b border-theme">
      <div class="text-[0.75rem] tracking-[0.18em] uppercase text-gold mb-2">{{ gradeTag }}</div>
      <h1 class="font-bebas text-[clamp(2.4rem,7vw,3.5rem)] tracking-[0.1em] leading-none mb-2">{{ title }}</h1>
      <p class="text-xs text-muted tracking-[0.1em]">{{ meta }}</p>
    </header>

    <main id="contenido" tabindex="-1">
      <slot name="note" />

      <div class="flex flex-col">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup>
import BackLink from './BackLink.vue'
import HeaderActions from './HeaderActions.vue'

// `backTo` null turns the back link into a button and forwards `back`, letting
// the page decide what "going back" means at that moment.
defineProps({
  gradeTag: { type: String, required: true },
  title: { type: String, required: true },
  meta: { type: String, required: true },
  backTo: { type: [String, Object], default: '/teoria' },
  backLabel: { type: String, default: '← Volver' },
})

defineEmits(['back'])
</script>
