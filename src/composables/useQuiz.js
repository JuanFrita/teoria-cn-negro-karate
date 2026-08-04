import { computed, ref, shallowRef } from 'vue'
import { computeResult, prepareDeck } from '../lib/quiz.js'
import { readJson, writeJson } from '../lib/storage.js'

export const QUIZ_MODES = Object.freeze({ STUDY: 'study', EXAM: 'exam' })
export const QUIZ_PHASES = Object.freeze({ INTRO: 'intro', RUNNING: 'running', RESULT: 'result' })

const BEST_SCORE_KEY = 'karate-best-scores'

/**
 * Quiz state machine. Study mode reveals the correct answer as soon as an option
 * is picked and locks it; exam mode stays silent until the run is finished.
 *
 * Both modes shuffle the options — keeping the declared order taught the
 * position of the answer rather than the answer — but only exam mode shuffles
 * the questions, so study mode still follows the order of the syllabus.
 *
 * @param {import('vue').Ref<string>} scopeKey namespaces the stored best score,
 *   so each grade *and* each block keeps its own record
 * @param {import('vue').Ref<readonly object[]>} questions
 */
export function useQuiz(scopeKey, questions) {
  const phase = ref(QUIZ_PHASES.INTRO)
  const mode = ref(QUIZ_MODES.STUDY)
  const deck = shallowRef([])
  const answers = ref([])
  const index = ref(0)
  const startedAt = ref(0)
  const elapsedMs = ref(0)
  const bestScores = ref(readJson(BEST_SCORE_KEY, {}))
  // Captured when the run starts, so changing the block selection afterwards
  // cannot file the result under the wrong scope.
  const runScope = ref(scopeKey.value)
  const bestScore = computed(() => bestScores.value[scopeKey.value] ?? null)

  const total = computed(() => deck.value.length)
  const current = computed(() => deck.value[index.value] ?? null)
  const isStudy = computed(() => mode.value === QUIZ_MODES.STUDY)
  const selected = computed(() => answers.value[index.value] ?? null)
  const isAnswered = computed(() => selected.value !== null)
  const isRevealed = computed(() => isStudy.value && isAnswered.value)
  const isFirst = computed(() => index.value === 0)
  const isLast = computed(() => index.value === total.value - 1)
  const answeredCount = computed(() => answers.value.filter(answer => answer !== null).length)
  const result = computed(() => computeResult(deck.value, answers.value))

  function start(nextMode, pool = questions.value) {
    mode.value = nextMode
    runScope.value = scopeKey.value
    deck.value = prepareDeck(pool, {
      shuffleQuestions: nextMode === QUIZ_MODES.EXAM,
      shuffleOptions: true,
    })
    answers.value = deck.value.map(() => null)
    index.value = 0
    startedAt.value = Date.now()
    elapsedMs.value = 0
    phase.value = QUIZ_PHASES.RUNNING
  }

  function select(optionIndex) {
    // Once study mode has revealed the answer the choice is final.
    if (isRevealed.value) return
    answers.value = answers.value.map((value, i) => (i === index.value ? optionIndex : value))
  }

  function finish() {
    elapsedMs.value = Date.now() - startedAt.value
    phase.value = QUIZ_PHASES.RESULT

    const { percent, correct, total: count } = result.value
    const previous = bestScores.value[runScope.value]
    if (!previous || percent > previous.percent) {
      const entry = { percent, correct, total: count, mode: mode.value, at: new Date().toISOString() }
      bestScores.value = { ...bestScores.value, [runScope.value]: entry }
      writeJson(BEST_SCORE_KEY, bestScores.value)
    }
  }

  function next() {
    if (isLast.value) {
      finish()
      return
    }
    index.value += 1
  }

  function previous() {
    if (isFirst.value) return
    index.value -= 1
  }

  function retryAll() {
    start(mode.value)
  }

  function retryFailed() {
    const failed = result.value.details.filter(detail => !detail.isCorrect).map(detail => detail.card.source)
    if (failed.length === 0) return
    start(mode.value, failed)
  }

  function backToIntro() {
    phase.value = QUIZ_PHASES.INTRO
  }

  return {
    phase,
    mode,
    deck,
    answers,
    index,
    elapsedMs,
    bestScore,
    total,
    current,
    isStudy,
    selected,
    isAnswered,
    isRevealed,
    isFirst,
    isLast,
    answeredCount,
    result,
    start,
    select,
    next,
    previous,
    finish,
    retryAll,
    retryFailed,
    backToIntro,
  }
}
