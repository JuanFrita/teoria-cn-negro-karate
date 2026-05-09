<template>
  <div class="flex flex-col gap-2.5 mt-2">
    <div
      v-for="item in terms"
      :key="item.jp"
      class="grid grid-cols-2 gap-3 items-baseline"
    >
      <span class="font-bebas text-[1.125rem] tracking-[0.08em] text-gold">{{ item.jp }}</span>
      <span class="text-[0.9375rem] text-muted">{{ item.es }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  terms: { type: Array, required: true },
})
</script>
