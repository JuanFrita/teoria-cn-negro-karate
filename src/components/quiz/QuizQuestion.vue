<template>
  <div class="animate-rise">
    <h2 class="text-[1.125rem] font-bold leading-snug mb-6">{{ card.prompt }}</h2>

    <p class="sr-only">Puedes responder también con las teclas 1 a {{ card.options.length }}.</p>

    <!-- Botones, no radios: activar una opción responde la pregunta, no cambia
         un valor. El patrón radio exigiría navegación con flechas, que aquí
         están ocupadas moviéndose entre preguntas. -->
    <ul class="flex flex-col gap-2.5 list-none p-0 m-0">
      <li v-for="(option, i) in card.options" :key="option">
        <button
          type="button"
          :disabled="revealed"
          class="quiz-option"
          :class="[optionClass(i), { 'animate-shake': revealed && selected === i && !isCorrect(i) }]"
          @click="$emit('select', i)"
        >
          <span class="quiz-key" aria-hidden="true">{{ i + 1 }}</span>
          <span class="flex-1">{{ option }}</span>

          <span v-if="revealed && isCorrect(i)" class="text-ok text-lg leading-none" aria-hidden="true">✓</span>
          <span
            v-else-if="revealed && selected === i"
            class="text-err text-lg leading-none"
            aria-hidden="true"
          >✕</span>

          <!-- El color y los símbolos no pueden ser la única señal del estado -->
          <span v-if="revealed && isCorrect(i)" class="sr-only">— respuesta correcta</span>
          <span v-else-if="revealed && selected === i" class="sr-only">— tu respuesta, incorrecta</span>
          <span v-else-if="!revealed && selected === i" class="sr-only">— seleccionada</span>
        </button>
      </li>
    </ul>

    <div
      v-if="revealed"
      class="mt-5 rounded-lg border-l-[3px] px-4 py-3 text-[0.875rem] leading-relaxed animate-rise"
      :class="isAnswerCorrect
        ? 'bg-ok-soft border-l-ok text-app-text'
        : 'bg-err-soft border-l-err text-app-text'"
      role="status"
    >
      <p class="font-bebas text-sm tracking-[0.15em] mb-1" :class="isAnswerCorrect ? 'text-ok' : 'text-err'">
        {{ isAnswerCorrect ? '¡Correcto!' : 'Respuesta correcta' }}
      </p>
      <p v-if="!isAnswerCorrect" class="mb-1.5 text-app-text">{{ card.options[card.answerIndex] }}</p>
      <p class="text-muted">{{ card.explanation }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  card: { type: Object, required: true },
  selected: { type: Number, default: null },
  revealed: { type: Boolean, default: false },
})

defineEmits(['select'])

const isCorrect = i => i === props.card.answerIndex
const isAnswerCorrect = computed(() => props.selected === props.card.answerIndex)

function optionClass(i) {
  if (props.revealed) {
    if (isCorrect(i)) return 'is-correct'
    if (props.selected === i) return 'is-wrong'
    return 'is-muted'
  }
  return props.selected === i ? 'is-selected' : ''
}
</script>

<style scoped>
.quiz-option {
  @apply flex items-center gap-3 w-full text-left bg-surface border border-strong rounded-xl px-4 py-3.5 text-[0.9375rem] leading-snug text-app-text transition-[background-color,border-color,color] duration-200 ease-fluid;
}

.quiz-option:not(:disabled):hover,
.quiz-option:focus-visible {
  @apply bg-surface2;
  border-color: var(--border-hover);
}

.quiz-option:disabled {
  @apply cursor-default;
}

.quiz-key {
  @apply flex-shrink-0 w-6 h-6 rounded-md bg-surface2 border border-strong font-bebas text-sm flex items-center justify-center text-gold-dim transition-colors duration-200;
}

.is-selected {
  border-color: var(--border-hover);
  @apply bg-surface2;
}

.is-selected .quiz-key {
  @apply bg-gold-fill text-[#0A0A0A] border-gold-fill;
}

.is-correct {
  border-color: var(--ok);
  background-color: var(--ok-soft);
}

.is-correct .quiz-key {
  border-color: var(--ok);
  color: var(--ok);
}

.is-wrong {
  border-color: var(--err);
  background-color: var(--err-soft);
}

.is-wrong .quiz-key {
  border-color: var(--err);
  color: var(--err);
}

.is-muted {
  @apply opacity-45;
}
</style>
