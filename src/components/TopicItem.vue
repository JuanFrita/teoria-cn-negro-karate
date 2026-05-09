<template>
  <div class="border-b border-theme py-6 last:border-b-0">
    <div class="font-bebas text-sm tracking-[0.15em] text-gold-dim mb-2">{{ String(num).padStart(2, '0') }}</div>
    <div class="text-[1.0625rem] font-bold text-app-text mb-3 leading-snug">{{ question }}</div>
    <div class="text-base text-muted leading-relaxed">
      <slot />
    </div>
  </div>
</template>

<script setup>
defineProps({
  num: { type: Number, required: true },
  question: { type: String, required: true },
})
</script>
