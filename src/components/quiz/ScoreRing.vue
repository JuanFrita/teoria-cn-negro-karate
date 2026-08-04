<template>
  <div class="relative w-[136px] h-[136px] mx-auto">
    <svg class="w-full h-full -rotate-90" viewBox="0 0 120 120" aria-hidden="true">
      <circle cx="60" cy="60" :r="RADIUS" fill="none" stroke="var(--surface2)" stroke-width="8" />
      <circle
        cx="60"
        cy="60"
        :r="RADIUS"
        fill="none"
        :stroke="strokeColor"
        stroke-width="8"
        stroke-linecap="round"
        :stroke-dasharray="CIRCUMFERENCE"
        :stroke-dashoffset="dashOffset"
        class="transition-[stroke-dashoffset] duration-700 ease-out"
      />
    </svg>

    <div class="absolute inset-0 flex flex-col items-center justify-center">
      <span class="font-bebas text-4xl leading-none tracking-[0.04em]">{{ percent }}%</span>
      <span class="text-[0.75rem] tracking-[0.15em] uppercase text-muted mt-1">{{ correct }} / {{ total }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const RADIUS = 52
const CIRCUMFERENCE = 2 * Math.PI * RADIUS
const PASS_THRESHOLD = 70

const props = defineProps({
  percent: { type: Number, required: true },
  correct: { type: Number, required: true },
  total: { type: Number, required: true },
})

const dashOffset = computed(() => CIRCUMFERENCE * (1 - props.percent / 100))
const strokeColor = computed(() => (props.percent >= PASS_THRESHOLD ? 'var(--ok)' : 'var(--err)'))
</script>
