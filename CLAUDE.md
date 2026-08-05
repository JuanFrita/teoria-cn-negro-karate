# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Single-page Vue 3 app (Spanish UI) covering the official RFEK 2026 karate syllabus for Black Belt and DAN grade exams: a theory reference plus self-correcting practice tests. Static site, no backend, no test framework.

## Commands

```bash
npm run dev      # Vite dev server
npm run build    # production build to dist/
npm run preview  # serve the built dist/
npm run check    # validate src/data/tests.json — run after editing questions
```

`npm run check` is the important one: the quiz is entirely data-driven, so a wrong `answer` index would silently mark the correct option as a mistake. The script validates ids, ranges and duplicates, and asserts that exam-mode shuffling preserves the correct answer.

## Architecture

Two parallel data-driven sections, each with one config file as its single source of truth.

### Theory — `src/data/teoria.js`

A `teoriaData` object keyed by grade slug (`cn`, `1dan`, `2dan`, `3dan`), each `{ gradeTag, title, meta, note, topics[] }`. A topic renders in one of four mutually exclusive modes, dispatched by `src/views/TeoriaPage.vue`:

- `develop: true` → `DevelopBadge` ("desarrollar por el aspirante") plus `answer`
- `styles: [{ id, name, founder, meaning, stances[] }]` → `answer` plus `StyleList` cards. Both CN Negro topic 1 (own style) and 3.er DAN topic 1 (the second style the candidate must pick) import the same list from `src/data/styles.js`, so adding a style shows up in both — and in the quiz's style filter.
- `terms: [{ jp, es }]` → `TermList` two-column glossary, with optional `matices` inline below
- otherwise → plain `answer` text

`TeoriaListPage.vue` derives card badges from `topics.length`, so counts stay in sync. The `meta` string hardcodes the count — update it when adding topics.

### Tests — `src/data/tests.json`

Pure JSON so questions can be edited without touching code. Keyed by the same grade slugs:

```jsonc
{ "1dan": { "gradeTag": "…", "title": "…", "source": "…",
  "blocks": [                       // every grade declares them; keep it that way
    { "id": "saludos", "label": "Saludos y MOKUSO" }
  ],
  "questions": [{
    "id": "1dan-za-rei",            // unique across the whole file
    "block": "saludos",             // required once the grade declares blocks
    "style": "shito-ryu",           // optional; without it the question is common to every style
    "question": "¿Qué es ZA REI?",
    "options": ["…", "…", "…"],     // 2+, no duplicates
    "answer": 1,                    // 0-based index into options
    "explanation": "…"              // shown on reveal, right or wrong
  }] } }
```

Question style: **one term per question**. Paired questions ("X and Y are, respectively…") were removed — when the distractor is the inverted pair, knowing one of the two terms is enough to answer, so they look like they test two terms but test one.

Grades with `blocks` show a selector on the intro screen, always led by a synthetic "Todo el temario" option whose id is `all` — that id is reserved and `npm run check` rejects it as a real block id.

### Style-dependent questions

The syllabus asks about *your own* style, so a question may carry `style` (an id from `src/data/styles.js`) and is then only dealt to candidates who practise it; a question without `style` is common to everyone. The picker only appears on grades that actually have styled questions. There is deliberately **no "all" option** — a style is always selected, defaulting to `DEFAULT_STYLE` (the first entry).

The choice is a property of the person, not of the run, so it persists in `localStorage` under `karate-style` and carries across grades and visits. It is re-validated on read: an id that no longer exists falls back to the default instead of silently emptying the deck.

Two invariants keep an empty deck impossible, and `npm run check` enforces the first:

1. No style may leave the grade — or any of its blocks — without questions.
2. `QuizIntro` disables both mode buttons when the current block/style combination yields zero.

Best scores append the style to the scope key **only on grades that have styled questions**, since the key must identify the deck; the other grades keep their existing `grade:block` records.

The runtime splits into pure logic and state:

- `src/lib/quiz.js` — `prepareDeck()` turns config entries into *cards*. It shuffles **option indexes**, not strings, and recomputes `answerIndex`; each card keeps `source` so "repetir fallos" can re-deal the original entry. `computeResult()` scores a deck (unanswered counts as wrong).
- `src/composables/useQuiz.js` — the state machine. Phases `intro → running → result`; modes `study` (reveals and locks the answer on click) and `exam` (stays silent, allows going back, corrects at the end).

**Options are shuffled in both modes**; only exam mode also shuffles question order, so study mode still follows the syllabus. This is not cosmetic: when study mode kept the declared order, 62 % of correct answers sat in position 1 (92 % in 3.er DAN), so the test was passable by always tapping the first option. Never reintroduce an unshuffled mode.

Best scores are namespaced by `grade:block` via `src/lib/storage.js` (which never throws when storage is blocked), so a 7-question block and the full test keep separate records. The scope is captured at `start()`, not read at `finish()`, so changing the block mid-run cannot file a result under the wrong key.
- `src/views/TestPage.vue` — wires it together and owns keyboard control (digits pick an option, Enter/→ advance, ← goes back in exam mode).

### Routes and shell

`src/router/index.js`: `/` (test list), `/teoria`, `/teoria/:grade`, `/test/:grade`, `/sobre`. List pages share `HomeLayout.vue` (header + Tests/Teoría tabs); every other page — theory, tests and about — shares `TheoryPage.vue`. `App.vue` keys `RouterView` by path so quiz state resets between grades. Unknown `:grade` renders a fallback rather than erroring.

`HeaderActions.vue` holds the icon row (home, about, theme) and is used by both layouts; `HomeLayout` omits the home icon since it is already there.

Back navigation is contextual. `BackLink` renders a `RouterLink` when given `to`, and a plain button emitting `back` when `to` is null — `TheoryPage` forwards both. `TestPage` uses this so that leaving mid-quiz returns to the mode selector instead of dropping the user out of the test; only from the selector does back go out to the list.

`CardItem` picks its root element dynamically: `<a>` for `href`, `RouterLink` for `to`, disabled `<div>` when neither. Nothing links to Google Forms any more; the tests are internal.

## Analytics

Umami. `src/lib/analytics.js` injects the script only when `VITE_UMAMI_WEBSITE_ID` is set, with
`data-do-not-track="true"`. With the variable unset, Vite's static replacement makes the whole
function dead code and nothing ships — verify either way with `grep umami dist/assets/*.js`.

Configuration comes from repository **secrets** (`UMAMI_WEBSITE_ID`, `UMAMI_SRC`), passed into the
build step's `env:`. No `.env` is committed — `.gitignore` blocks every `.env*` except `.env.example`
— so an unset secret arriving as an empty string is harmless and simply means "no analytics". Never
add a committed `.env` with a default id: the empty string from an unset secret would silently
override it and kill analytics in production without failing the build.

`src/views/AboutPage.vue` states in plain Spanish what is and is not collected: **if you change what
is tracked, change that page in the same commit.**

## Accessibility

The palette is built to WCAG AA and the ratios are load-bearing — check before changing a colour:

- **Gold is theme-dependent.** Brand gold `#C9A84C` scores 2.05:1 on white, so light mode swaps in a dark gold for *text* (`--gold-rgb`) while `--gold-fill-rgb` keeps brand gold for *fills*, which always carry near-black text. `bg-gold` and `bg-gold-fill` are not interchangeable: use `fill` wherever `text-[#0A0A0A]` sits on top.
- Gold tokens are declared as `R G B` channels so Tailwind opacity modifiers (`bg-gold/10`) still work on theme-dependent colours.
- `border-theme` is for decorative separators; **`border-strong` is for anything interactive** and meets 3:1 against every surface.
- Focus is a single global `:focus-visible` ring using `--focus`. Never add `outline-none` to a control — colour alone is not a focus indicator. `<main>` is the one exception, as it is only a programmatic target for the skip link.
- Smallest type is 12px. Anything below that was unreadable in uppercase with wide tracking.

Structure: one `<h1>` and one `<main id="contenido">` per page, headings never skip a level, and `App.vue` provides the skip link (which moves focus directly instead of navigating, so the router's `scrollBehavior` cannot undo it). The router sets `document.title` per route.

Quiz options are `<ul>/<li>/<button>`, deliberately **not** `role="radio"` — that pattern requires arrow-key navigation between options, and the arrows are already bound to moving between questions. State that is shown with colour or a ✓/✕ glyph always has an `sr-only` text equivalent; the glyphs are `aria-hidden`.

## Styling

Tailwind. The palette lives in `src/assets/main.css` as CSS custom properties and is exposed through `tailwind.config.js` — never hardcode colors. Tokens: `bg`, `surface`, `surface2`, `app-text`, `muted`, semantic `ok`/`ok-soft`/`err`/`err-soft` for quiz feedback, plus the static `gold` scale. Borders use `border-theme`.

`border-theme` is declared as a `borderColor` in `tailwind.config.js`, deliberately **not** as a `@layer utilities` class: a custom class in a layer only resolves inside a component's `@apply` when `main.css` happens to be processed first in the same PostCSS process, which is not guaranteed.

### Theme switching

Dark is the default. `index.html` sets `data-theme` on `<html>` from `localStorage` (key `karate-theme`, falling back to `prefers-color-scheme`) **before first paint** to avoid a flash. `src/composables/useTheme.js` reads that same attribute on init so it never disagrees with what is painted, and `ThemeToggle.vue` flips it. `main.css` keeps a `prefers-color-scheme` block scoped to `:root:not([data-theme])` purely as a no-JS fallback — if you add a light-mode token, add it in **both** places.

Motion uses `.animate-rise` / `.animate-shake` (transform and opacity only) and the whole app honours `prefers-reduced-motion`.

Fonts: `font-bebas` (display headings, wide tracking) and `font-noto` (body, also the Japanese 空手道 glyphs), loaded from Google Fonts in `index.html`.

Most styling is inline utility classes. `<style scoped>` with `@apply` is used only where a component needs hover/focus/active variants that read better grouped (`CardItem`, `BackLink`).

## GitHub Pages deployment

Pushing to `master` triggers `.github/workflows/deploy.yml`, which builds and publishes `dist/` to the `gh-pages` branch. Three pieces must stay consistent — breaking any one produces blank pages or 404s on refresh:

1. `vite.config.js` sets `base: '/teoria-cn-negro-karate/'` (the repo name).
2. `public/404.html` encodes the requested path into a query string with `pathSegmentsToKeep = 1` (keeps the repo sub-path).
3. The inline script in `index.html` decodes that query string back into a real path before Vue Router boots.

The router uses `createWebHistory(import.meta.env.BASE_URL)`, so it inherits the base automatically. This SPA-on-Pages routing has been broken and reverted before (see commits `657506c`/`f51ebfc`) — verify with `npm run build && npm run preview` and a hard refresh on a deep route like `/teoria/1dan` before pushing changes to any of the three.
