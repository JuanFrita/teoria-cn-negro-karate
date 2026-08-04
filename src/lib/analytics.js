/**
 * Umami: cookieless, anonymous analytics (https://umami.is).
 *
 * The script is only injected when a website id is configured, so local
 * development, forks and preview builds send nothing at all. `do-not-track`
 * is on, so browsers asking not to be tracked are not counted either.
 */
const DEFAULT_SRC = 'https://cloud.umami.is/script.js'

export function loadAnalytics() {
  const websiteId = import.meta.env.VITE_UMAMI_WEBSITE_ID

  if (!websiteId) return false

  const script = document.createElement('script')
  script.src = import.meta.env.VITE_UMAMI_SRC || DEFAULT_SRC
  script.defer = true
  script.dataset.websiteId = websiteId
  script.dataset.doNotTrack = 'true'
  document.head.appendChild(script)

  return true
}
