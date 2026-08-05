/**
 * Validates src/data/tests.json. Run with `npm run check` after editing questions.
 *
 * The whole quiz is driven by that file, so a wrong `answer` index would silently
 * mark the right option as a mistake. This catches it before it ships.
 */
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { computeResult, prepareDeck } from '../src/lib/quiz.js'
import { ALL_STYLES, styleIds } from '../src/data/styles.js'

const testsPath = fileURLToPath(new URL('../src/data/tests.json', import.meta.url))
const tests = JSON.parse(readFileSync(testsPath, 'utf8'))

const problems = []
const seenIds = new Set()

for (const [grade, config] of Object.entries(tests)) {
  for (const field of ['gradeTag', 'title', 'source']) {
    if (!config[field]) problems.push(`${grade}: falta "${field}"`)
  }

  if (!Array.isArray(config.questions) || config.questions.length === 0) {
    problems.push(`${grade}: sin preguntas`)
    continue
  }

  config.questions.forEach((question, i) => {
    const where = `${grade}[${i}] ${question.id ?? '(sin id)'}`

    if (!question.id) problems.push(`${where}: falta "id"`)
    else if (seenIds.has(question.id)) problems.push(`${where}: "id" duplicado`)
    seenIds.add(question.id)

    if (!question.question) problems.push(`${where}: falta el enunciado`)
    if (!question.explanation) problems.push(`${where}: falta la explicación que se muestra al fallar`)

    if (!Array.isArray(question.options) || question.options.length < 2) {
      problems.push(`${where}: necesita al menos 2 opciones`)
      return
    }
    if (new Set(question.options).size !== question.options.length) {
      problems.push(`${where}: opciones repetidas`)
    }
    if (!Number.isInteger(question.answer) || question.answer < 0 || question.answer >= question.options.length) {
      problems.push(`${where}: "answer" (${question.answer}) fuera de rango`)
    }
  })

  // Blocks are optional, but when declared every question must belong to one.
  const blockIds = new Set((config.blocks ?? []).map(block => block.id))
  if (blockIds.size > 0) {
    if (blockIds.has('all')) problems.push(`${grade}: "all" está reservado para «Todo el temario»`)

    for (const question of config.questions) {
      if (!question.block) problems.push(`${grade}/${question.id}: sin "block"`)
      else if (!blockIds.has(question.block)) problems.push(`${grade}/${question.id}: bloque desconocido "${question.block}"`)
    }
    for (const block of config.blocks) {
      const count = config.questions.filter(q => q.block === block.id).length
      if (count === 0) problems.push(`${grade}: el bloque "${block.id}" está vacío`)
      if (!block.label) problems.push(`${grade}: el bloque "${block.id}" no tiene "label"`)
    }
  }

  // Las preguntas con "style" solo se ven si el aspirante practica ese estilo.
  const styled = config.questions.filter(question => question.style)
  for (const question of styled) {
    if (question.style === ALL_STYLES) {
      problems.push(`${grade}/${question.id}: "${ALL_STYLES}" está reservado para «Todos»`)
    } else if (!styleIds.includes(question.style)) {
      problems.push(`${grade}/${question.id}: estilo desconocido "${question.style}"`)
    }
  }

  // Elegir un estilo no puede dejar sin preguntas ni al test ni a ninguno de sus
  // bloques: el mazo se quedaría vacío y no habría nada que responder.
  if (styled.length > 0) {
    for (const styleId of styleIds) {
      const visible = config.questions.filter(q => !q.style || q.style === styleId)
      if (visible.length === 0) {
        problems.push(`${grade}: sin preguntas para el estilo "${styleId}"`)
      }
      for (const block of config.blocks ?? []) {
        if (visible.filter(q => q.block === block.id).length === 0) {
          problems.push(`${grade}: el bloque "${block.id}" se queda vacío para el estilo "${styleId}"`)
        }
      }
    }
  }

  // Options are shuffled on every run, so the correct answer must survive it.
  for (let run = 0; run < 200; run += 1) {
    for (const card of prepareDeck(config.questions, { shuffleQuestions: true, shuffleOptions: true })) {
      if (card.options[card.answerIndex] !== card.source.options[card.source.answer]) {
        problems.push(`${grade}/${card.id}: el barajado pierde la respuesta correcta`)
      }
    }
  }

  const deck = prepareDeck(config.questions, { shuffleOptions: false })
  if (computeResult(deck, deck.map(card => card.answerIndex)).percent !== 100) {
    problems.push(`${grade}: acertarlo todo no da 100%`)
  }
  if (computeResult(deck, deck.map(() => null)).correct !== 0) {
    problems.push(`${grade}: las preguntas sin responder cuentan como acierto`)
  }

  console.log(
    `${grade.padEnd(6)} ${String(config.questions.length).padStart(3)} preguntas` +
      `${blockIds.size ? ` · ${blockIds.size} bloques` : ''}` +
      `${styled.length ? ` · ${styled.length} por estilo` : ''} · OK`,
  )
}

if (problems.length > 0) {
  console.error(`\n${problems.length} problema(s):\n- ${problems.join('\n- ')}`)
  process.exit(1)
}

console.log('\nTodo correcto.')
