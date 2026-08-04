import { shuffle } from './shuffle.js'

/**
 * A card is a question prepared for a single run: options may be reordered, so
 * the correct index is recomputed. `source` keeps the original config entry so a
 * failed question can be re-dealt without re-deriving indexes from stale data.
 */
function prepareCard(question, shuffleOptions) {
  const positions = question.options.map((_, i) => i)
  const order = shuffleOptions ? shuffle(positions) : positions

  return {
    source: question,
    id: question.id,
    prompt: question.question,
    explanation: question.explanation,
    options: order.map(i => question.options[i]),
    answerIndex: order.indexOf(question.answer),
  }
}

/**
 * Option order and question order are shuffled independently. Options should
 * always be shuffled — leaving them in declared order teaches the position of
 * the answer rather than the answer — while question order is only shuffled in
 * exam mode, so study mode still follows the syllabus.
 *
 * @param {readonly object[]} questions raw entries from tests.json
 * @param {{ shuffleQuestions?: boolean, shuffleOptions?: boolean }} options
 */
export function prepareDeck(questions, { shuffleQuestions = false, shuffleOptions = true } = {}) {
  const ordered = shuffleQuestions ? shuffle(questions) : questions
  return ordered.map(question => prepareCard(question, shuffleOptions))
}

/**
 * @param {readonly object[]} deck
 * @param {readonly (number|null)[]} answers selected option index per card
 */
export function computeResult(deck, answers) {
  const details = deck.map((card, i) => ({
    card,
    selected: answers[i] ?? null,
    isCorrect: answers[i] === card.answerIndex,
  }))

  const correct = details.filter(detail => detail.isCorrect).length

  return {
    details,
    correct,
    total: deck.length,
    percent: deck.length === 0 ? 0 : Math.round((correct / deck.length) * 100),
  }
}

export function formatDuration(ms) {
  const totalSeconds = Math.max(0, Math.round(ms / 1000))
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}:${String(seconds).padStart(2, '0')}`
}
