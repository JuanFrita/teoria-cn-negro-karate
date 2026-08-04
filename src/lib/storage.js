/**
 * localStorage helpers that never throw. Storage can be unavailable in private
 * browsing or blocked by the user, and losing a best score must never break the app.
 */

export function readJson(key, fallback = null) {
  try {
    const raw = localStorage.getItem(key)
    return raw === null ? fallback : JSON.parse(raw)
  } catch {
    return fallback
  }
}

export function writeJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}
