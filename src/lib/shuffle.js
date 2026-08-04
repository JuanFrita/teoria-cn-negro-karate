/**
 * Fisher–Yates shuffle. Returns a new array; the input is never mutated.
 * @template T
 * @param {readonly T[]} items
 * @returns {T[]}
 */
export function shuffle(items) {
  const result = [...items]

  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    const swap = result[i]
    result[i] = result[j]
    result[j] = swap
  }

  return result
}
