<template>
  <div
    class="flex-shrink-0 w-12 h-12 rounded-full bg-surface2 border border-theme flex items-center justify-center relative overflow-hidden"
    role="img"
    :aria-label="dans === 0 ? 'Cinturón Negro' : `${dans}.º DAN`"
  >
    <div class="w-7 h-2 bg-[#0d0d0d] border border-[#2a2a2a] rounded-[2px] relative z-10" />
    <div
      v-if="dans > 0"
      class="absolute right-1.5 top-1/2 -translate-y-1/2 flex gap-0.5 z-20"
    >
      <div v-for="i in dans" :key="i" class="w-1 h-1 rounded-full bg-gold" />
    </div>
  </div>
</template>

<script setup>
defineProps({
  dans: { type: Number, default: 0 },
})
</script>
