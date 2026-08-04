<template>
  <div class="animate-rise">
    <ScoreRing :percent="result.percent" :correct="result.correct" :total="result.total" />

    <h2 class="text-center font-bebas text-2xl tracking-[0.08em] mt-5 mb-1">{{ verdict }}</h2>
    <p class="text-center text-xs text-muted tracking-[0.12em] uppercase mb-8">
      Modo {{ mode === 'exam' ? 'Examen' : 'Estudio' }} · {{ formatDuration(elapsedMs) }}
    </p>

    <section v-if="failed.length" aria-labelledby="fallos-heading">
      <h2 id="fallos-heading" class="text-[0.75rem] tracking-[0.16em] uppercase text-muted mb-3">
        Repasa estos {{ failed.length }} fallos
      </h2>

      <ul class="flex flex-col gap-3 list-none p-0 m-0">
        <li
          v-for="detail in failed"
          :key="detail.card.id"
          class="bg-surface border border-theme border-l-[3px] border-l-err rounded-lg px-4 py-3"
        >
          <p class="text-[0.9375rem] font-bold leading-snug mb-2">{{ detail.card.prompt }}</p>

          <p v-if="detail.selected !== null" class="text-[0.8rem] text-muted mb-1">
            <span class="text-err">Tu respuesta:</span> {{ detail.card.options[detail.selected] }}
          </p>
          <p v-else class="text-[0.8rem] text-muted mb-1">
            <span class="text-err">Sin responder</span>
          </p>

          <p class="text-[0.8rem] mb-1">
            <span class="text-ok">Correcta:</span> {{ detail.card.options[detail.card.answerIndex] }}
          </p>
          <p class="text-[0.8rem] text-muted leading-relaxed">{{ detail.card.explanation }}</p>
        </li>
      </ul>
    </section>

    <p v-else class="text-center text-sm text-muted leading-relaxed">
      Pleno. No has fallado ni una. OSU.
    </p>

    <div class="flex flex-col gap-2.5 mt-8">
      <button v-if="failed.length" type="button" class="result-action is-primary" @click="$emit('retry-failed')">
        Repetir solo los {{ failed.length }} fallos
      </button>
      <button type="button" class="result-action" @click="$emit('retry-all')">Repetir el test completo</button>
      <button type="button" class="result-action" @click="$emit('back-to-intro')">Cambiar de modo</button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import ScoreRing from './ScoreRing.vue'
import { formatDuration } from '../../lib/quiz.js'

const props = defineProps({
  result: { type: Object, required: true },
  mode: { type: String, required: true },
  elapsedMs: { type: Number, required: true },
})

defineEmits(['retry-failed', 'retry-all', 'back-to-intro'])

const failed = computed(() => props.result.details.filter(detail => !detail.isCorrect))

const verdict = computed(() => {
  if (props.result.percent === 100) return 'Perfecto'
  if (props.result.percent >= 85) return 'Muy bien'
  if (props.result.percent >= 70) return 'Aprobado'
  if (props.result.percent >= 50) return 'Casi'
  return 'A seguir entrenando'
})
</script>

<style scoped>
.result-action {
  @apply w-full bg-surface border border-strong rounded-xl px-5 py-3.5 font-bebas text-lg tracking-[0.12em] text-app-text transition-[transform,background-color,border-color,color] duration-300 ease-fluid;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
}

.result-action:hover,
.result-action:focus-visible {
  @apply bg-surface2;
  border-color: var(--border-hover);
  transform: translate3d(0, -3px, 0);
}

.result-action.is-primary {
  @apply bg-gold-fill text-[#0A0A0A] border-gold-fill;
}

.result-action.is-primary:hover,
.result-action.is-primary:focus-visible {
  @apply bg-gold-light border-gold-light;
}
</style>
