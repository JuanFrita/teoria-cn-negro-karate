import { ref, readonly } from 'vue'

export const THEME_STORAGE_KEY = 'karate-theme'

const LIGHT = 'light'
const DARK = 'dark'

function systemTheme() {
  return window.matchMedia('(prefers-color-scheme: light)').matches ? LIGHT : DARK
}

function storedTheme() {
  try {
    const value = localStorage.getItem(THEME_STORAGE_KEY)
    return value === LIGHT || value === DARK ? value : null
  } catch {
    // Private browsing or blocked storage — fall back to the system preference.
    return null
  }
}

// Read the value the inline script in index.html already applied, so the
// composable never disagrees with what is painted on screen.
const theme = ref(document.documentElement.dataset.theme ?? storedTheme() ?? systemTheme())

function applyTheme(next) {
  theme.value = next
  document.documentElement.dataset.theme = next
  try {
    localStorage.setItem(THEME_STORAGE_KEY, next)
  } catch {
    // Persisting is a nice-to-have; the toggle still works for this session.
  }
}

export function useTheme() {
  return {
    theme: readonly(theme),
    isDark: () => theme.value === DARK,
    toggleTheme: () => applyTheme(theme.value === DARK ? LIGHT : DARK),
    setTheme: applyTheme,
  }
}
