<template>
  <div class="relative z-10 max-w-[560px] mx-auto px-4 py-8 pb-20">
    <BackLink />

    <header class="mb-10 pb-6 border-b border-theme">
      <div class="text-[0.7rem] tracking-[0.25em] uppercase text-gold mb-2">{{ gradeTag }}</div>
      <h1 class="font-bebas text-[clamp(2.4rem,7vw,3.5rem)] tracking-[0.1em] leading-none mb-2">{{ title }}</h1>
      <p class="text-xs text-muted tracking-[0.1em]">{{ meta }}</p>
    </header>

    <slot name="note" />

    <div class="flex flex-col">
      <slot />
    </div>
  </div>
</template>

<script setup>
import BackLink from './BackLink.vue'

defineProps({
  gradeTag: { type: String, required: true },
  title: { type: String, required: true },
  meta: { type: String, required: true },
})
</script>
