<template>
  <TheoryPage
    v-if="test"
    :grade-tag="test.gradeTag"
    :title="test.title"
    :meta="`${questions.length} preguntas · ${test.source}`"
    :back-to="backTo"
    :back-label="backLabel"
    @back="quiz.backToIntro"
  >
    <QuizIntro
      v-if="quiz.phase.value === QUIZ_PHASES.INTRO"
      :grade="gradeKey"
      :best-score="quiz.bestScore.value"
      :blocks="blockOptions"
      :selected="selectedBlock"
      :styles="styleOptions"
      :selected-style="selectedStyle"
      :question-count="questions.length"
      @select-block="selectedBlock = $event"
      @select-style="selectStyle"
      @start="quiz.start"
    />

    <template v-else-if="quiz.phase.value === QUIZ_PHASES.RUNNING">
      <QuizProgress
        :current="quiz.index.value + 1"
        :total="quiz.total.value"
        :mode-label="quiz.isStudy.value ? 'Estudio' : 'Examen'"
      />

      <QuizQuestion
        :key="quiz.current.value.id"
        :card="quiz.current.value"
        :selected="quiz.selected.value"
        :revealed="quiz.isRevealed.value"
        @select="quiz.select"
      />

      <div class="flex gap-2.5 mt-8">
        <button
          v-if="!quiz.isStudy.value"
          type="button"
          class="quiz-nav"
          :disabled="quiz.isFirst.value"
          @click="quiz.previous"
        >
          ← Anterior
        </button>

        <button
          type="button"
          class="quiz-nav is-primary"
          :disabled="quiz.isStudy.value && !quiz.isAnswered.value"
          @click="quiz.next"
        >
          {{ quiz.isLast.value ? 'Ver resultado' : 'Siguiente →' }}
        </button>
      </div>

      <p v-if="quiz.isStudy.value && !quiz.isAnswered.value" class="text-center text-xs text-muted mt-3">
        Elige una respuesta para continuar
      </p>
      <p v-else-if="!quiz.isStudy.value" class="text-center text-xs text-muted mt-3">
        {{ quiz.answeredCount.value }} de {{ quiz.total.value }} respondidas
      </p>
    </template>

    <QuizResult
      v-else
      :result="quiz.result.value"
      :mode="quiz.mode.value"
      :elapsed-ms="quiz.elapsedMs.value"
      @retry-failed="quiz.retryFailed"
      @retry-all="quiz.retryAll"
      @back-to-intro="quiz.backToIntro"
    />
  </TheoryPage>

  <div v-else class="relative z-10 max-w-[560px] mx-auto px-4 py-16 text-center">
    <p class="text-muted mb-6">Todavía no hay test para este grado.</p>
    <RouterLink to="/" class="text-gold no-underline tracking-[0.15em] uppercase text-sm">← Volver</RouterLink>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import testsData from '../data/tests.json'
import { ALL_STYLES, styles as allStyles } from '../data/styles.js'
import { QUIZ_PHASES, useQuiz } from '../composables/useQuiz.js'
import { readJson, writeJson } from '../lib/storage.js'
import TheoryPage from '../components/TheoryPage.vue'
import QuizIntro from '../components/quiz/QuizIntro.vue'
import QuizProgress from '../components/quiz/QuizProgress.vue'
import QuizQuestion from '../components/quiz/QuizQuestion.vue'
import QuizResult from '../components/quiz/QuizResult.vue'

const ALL_BLOCKS = 'all'
const STYLE_KEY = 'karate-style'

const route = useRoute()
const gradeKey = computed(() => String(route.params.grade))
const test = computed(() => testsData[gradeKey.value] ?? null)

const selectedBlock = ref(ALL_BLOCKS)

// El estilo es un dato del aspirante, no de la partida: se recuerda entre grados
// y entre visitas. Se valida al leerlo por si el id guardado ya no existe.
const storedStyle = readJson(STYLE_KEY, ALL_STYLES)
const selectedStyle = ref(
  allStyles.some(style => style.id === storedStyle) ? storedStyle : ALL_STYLES,
)

function selectStyle(id) {
  selectedStyle.value = id
  writeJson(STYLE_KEY, id)
}

// Una pregunta sin "style" es común a todos los estilos.
const matchesStyle = question =>
  !question.style || selectedStyle.value === ALL_STYLES || question.style === selectedStyle.value

const gradeQuestions = computed(() => (test.value?.questions ?? []).filter(matchesStyle))

const questions = computed(() =>
  selectedBlock.value === ALL_BLOCKS
    ? gradeQuestions.value
    : gradeQuestions.value.filter(q => q.block === selectedBlock.value),
)

const blockOptions = computed(() => {
  const declared = test.value?.blocks ?? []
  if (declared.length === 0) return []

  return [
    { id: ALL_BLOCKS, label: 'Todo el temario', count: gradeQuestions.value.length },
    ...declared.map(block => ({
      ...block,
      count: gradeQuestions.value.filter(q => q.block === block.id).length,
    })),
  ]
})

// El selector de estilo solo aparece donde cambia algo.
const hasStyleQuestions = computed(() => (test.value?.questions ?? []).some(q => q.style))

const styleOptions = computed(() => {
  if (!hasStyleQuestions.value) return []
  return [{ id: ALL_STYLES, name: 'Todos' }, ...allStyles.map(({ id, name }) => ({ id, name }))]
})

// Each block keeps its own best score: a 7-question block and the full test are
// not comparable, so they must not overwrite each other. The style only joins the
// key where it actually changes the deck, so the other grades keep their records.
const scopeKey = computed(() =>
  hasStyleQuestions.value
    ? `${gradeKey.value}:${selectedBlock.value}:${selectedStyle.value}`
    : `${gradeKey.value}:${selectedBlock.value}`,
)

const quiz = useQuiz(scopeKey, questions)

// Going back from inside a run returns to the mode selector rather than leaving
// the test; only from the selector itself does it go out to the list.
const isAtIntro = computed(() => quiz.phase.value === QUIZ_PHASES.INTRO)
const backTo = computed(() => (isAtIntro.value ? '/' : null))
const backLabel = computed(() => {
  if (isAtIntro.value) return '← Todos los tests'
  return quiz.phase.value === QUIZ_PHASES.RESULT ? '← Elegir modo' : '← Dejar el test'
})

function onKeydown(event) {
  if (quiz.phase.value !== QUIZ_PHASES.RUNNING || event.metaKey || event.ctrlKey || event.altKey) return

  const optionCount = quiz.current.value?.options.length ?? 0
  const digit = Number(event.key)

  if (Number.isInteger(digit) && digit >= 1 && digit <= optionCount) {
    event.preventDefault()
    quiz.select(digit - 1)
    return
  }

  if (event.key === 'Enter' || event.key === 'ArrowRight') {
    if (quiz.isStudy.value && !quiz.isAnswered.value) return
    event.preventDefault()
    quiz.next()
    return
  }

  if (event.key === 'ArrowLeft' && !quiz.isStudy.value) {
    event.preventDefault()
    quiz.previous()
  }
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>

<style scoped>
.quiz-nav {
  @apply flex-1 bg-surface border border-strong rounded-xl px-5 py-3.5 font-bebas text-lg tracking-[0.12em] text-app-text transition-[transform,background-color,border-color,color] duration-300 ease-fluid;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
}

.quiz-nav:not(:disabled):hover,
.quiz-nav:focus-visible {
  @apply bg-surface2;
  border-color: var(--border-hover);
  transform: translate3d(0, -3px, 0);
}

.quiz-nav:disabled {
  @apply opacity-40 cursor-not-allowed;
}

.quiz-nav.is-primary {
  @apply bg-gold-fill text-[#0A0A0A] border-gold-fill;
}

.quiz-nav.is-primary:not(:disabled):hover,
.quiz-nav.is-primary:focus-visible {
  @apply bg-gold-light border-gold-light;
}
</style>
