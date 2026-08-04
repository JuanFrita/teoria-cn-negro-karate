<template>
  <div class="mb-8">
    <div class="flex items-baseline justify-between mb-2">
      <span class="font-bebas text-sm tracking-[0.18em] text-gold-dim">
        {{ String(current).padStart(2, '0') }} / {{ String(total).padStart(2, '0') }}
      </span>
      <span class="text-[0.75rem] tracking-[0.15em] uppercase text-muted">{{ modeLabel }}</span>
    </div>

    <div
      class="h-1 w-full rounded-full bg-surface2 overflow-hidden"
      role="progressbar"
      :aria-valuenow="current"
      aria-valuemin="1"
      :aria-valuemax="total"
      :aria-label="`Pregunta ${current} de ${total}`"
    >
      <div
        class="h-full bg-gold origin-left transition-transform duration-300 ease-out"
        :style="{ transform: `scaleX(${current / total})` }"
      />
    </div>
  </div>
</template>

<script setup>
defineProps({
  current: { type: Number, required: true },
  total: { type: Number, required: true },
  modeLabel: { type: String, required: true },
})
</script>
