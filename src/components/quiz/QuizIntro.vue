<template>
  <div class="animate-rise">
    <div v-if="bestScore" class="flex items-center gap-3 bg-surface border border-theme rounded-xl px-5 py-4 mb-6">
      <div class="font-bebas text-3xl leading-none" :class="bestScore.percent >= 70 ? 'text-ok' : 'text-err'">
        {{ bestScore.percent }}%
      </div>
      <div>
        <div class="text-[0.75rem] tracking-[0.16em] uppercase text-gold">Tu mejor marca</div>
        <div class="text-[0.8rem] text-muted">
          {{ bestScore.correct }} de {{ bestScore.total }} · modo {{ bestScore.mode === 'exam' ? 'Examen' : 'Estudio' }}
        </div>
      </div>
    </div>

    <template v-if="styles.length > 1">
      <p class="text-[0.75rem] tracking-[0.16em] uppercase text-muted mb-3">Tu estilo</p>

      <div class="flex flex-wrap gap-2 mb-2" role="group" aria-label="Estilo que practicas">
        <button
          v-for="style in styles"
          :key="style.id"
          type="button"
          :aria-pressed="style.id === selectedStyle"
          class="block-chip"
          :class="{ 'is-active': style.id === selectedStyle }"
          @click="$emit('select-style', style.id)"
        >
          {{ style.name }}
        </button>
      </div>

      <p class="text-[0.8rem] text-muted mb-8">
        Las preguntas sobre el estilo (fundador y significado) son las del que practicas.
      </p>
    </template>

    <template v-if="blocks.length > 1">
      <p class="text-[0.75rem] tracking-[0.16em] uppercase text-muted mb-3">Elige el temario</p>

      <div class="flex flex-wrap gap-2 mb-8" role="group" aria-label="Bloque del temario">
        <button
          v-for="block in blocks"
          :key="block.id"
          type="button"
          :aria-pressed="block.id === selected"
          class="block-chip"
          :class="{ 'is-active': block.id === selected }"
          @click="$emit('select-block', block.id)"
        >
          {{ block.label }}
          <span class="opacity-60">· {{ block.count }}</span>
        </button>
      </div>
    </template>

    <p class="text-[0.75rem] tracking-[0.16em] uppercase text-muted mb-3">Elige cómo practicar</p>

    <p v-if="questionCount === 0" class="text-[0.875rem] text-muted mb-3" role="status">
      Esta combinación se queda sin preguntas. Prueba con otro bloque.
    </p>

    <div class="flex flex-col gap-3">
      <button
        type="button"
        class="mode-card group"
        :disabled="questionCount === 0"
        @click="$emit('start', QUIZ_MODES.STUDY)"
      >
        <div class="flex items-center justify-between gap-3">
          <span class="font-bebas text-2xl tracking-[0.08em] leading-none">Modo Estudio</span>
          <span class="mode-arrow text-gold-dim text-xl">→</span>
        </div>
        <p class="text-[0.8rem] text-muted leading-relaxed mt-2">
          Corrección al instante. Si fallas te muestra la respuesta buena y por qué, en el mismo momento.
        </p>
      </button>

      <button
        type="button"
        class="mode-card group"
        :disabled="questionCount === 0"
        @click="$emit('start', QUIZ_MODES.EXAM)"
      >
        <div class="flex items-center justify-between gap-3">
          <span class="font-bebas text-2xl tracking-[0.08em] leading-none">Modo Examen</span>
          <span class="mode-arrow text-gold-dim text-xl">→</span>
        </div>
        <p class="text-[0.8rem] text-muted leading-relaxed mt-2">
          Preguntas y respuestas en orden aleatorio, sin pistas. La nota y los fallos, al terminar.
        </p>
      </button>
    </div>

    <RouterLink
      :to="{ name: 'teoria-grade', params: { grade } }"
      class="flex items-center justify-center gap-2 mt-6 text-sm text-muted no-underline tracking-[0.1em] py-3 transition-colors duration-200 hover:text-gold"
    >
      Repasar la teoría antes de empezar →
    </RouterLink>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { QUIZ_MODES } from '../../composables/useQuiz.js'

defineProps({
  grade: { type: String, required: true },
  bestScore: { type: Object, default: null },
  blocks: { type: Array, default: () => [] },
  selected: { type: String, default: 'all' },
  styles: { type: Array, default: () => [] },
  selectedStyle: { type: String, default: 'all' },
  questionCount: { type: Number, default: 0 },
})

defineEmits(['start', 'select-block', 'select-style'])
</script>

<style scoped>
.mode-card {
  @apply block w-full text-left bg-surface border border-strong rounded-xl px-5 py-4 text-app-text transition-[transform,background-color,border-color,color] duration-300 ease-fluid;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
}

.mode-card:not(:disabled):hover,
.mode-card:focus-visible {
  @apply bg-surface2;
  border-color: var(--border-hover);
  transform: translate3d(0, -3px, 0);
}

.mode-card:disabled {
  @apply opacity-40 cursor-not-allowed;
}

.block-chip {
  @apply bg-surface border border-strong rounded-full px-3.5 py-2 text-[0.8rem] text-muted transition-colors duration-200;
}

.block-chip:hover,
.block-chip:focus-visible {
  @apply text-app-text bg-surface2;
  border-color: var(--border-hover);
}

.block-chip.is-active {
  @apply bg-gold-fill text-[#0A0A0A] border-gold-fill;
}

.mode-arrow {
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  transition: transform 300ms cubic-bezier(0.16, 1, 0.3, 1);
}

.mode-card:hover .mode-arrow,
.mode-card:focus-visible .mode-arrow {
  transform: translate3d(4px, 0, 0);
}
</style>
