# The Elements

Interactive periodic table built with Vite + React 19 + TypeScript, Framer Motion (animation) and Zustand (state).

## Commands

- `npm run dev`: start the dev server
- `npm run build`: type-check (`tsc -b`) and build. **Run this to verify before finishing any task.**
- `npm run lint`: lint with oxlint

## Structure

- `src/data/elements.json`: data for all 118 elements (shape is `ElementData` in `src/types.ts`)
- `src/data/categories.ts`: `CATEGORIES` (label + color per `CategoryKey`), `normalizeCategory`, `categoryColor`, and `ELEMENTS` (the JSON data with a normalized `cat` added to each element). Import element data from here, not from the JSON directly.
- `src/data/phase.ts`: `stateAt(el, kelvin)` returns `'solid' | 'liquid' | 'gas' | 'unknown'` from the element's `melt`/`boil` (Kelvin; `unknown` if either is null). Also exports the temperature constants (`ROOM_TEMP_K` = 298, 0–6000 K slider range) and `STATE_LABELS`/`STATE_LETTERS`. Use this rather than the static `phase` field whenever the state should follow the slider.
- `src/data/uses.json`: real-life uses for a subset of elements (currently 15), keyed by atomic number as a string. Each entry has `uses` (title + description), `images` (Wikimedia Commons photos with `url`, `alt`, `author`, `license`, `pageUrl`) and an optional `video` (`url`, `poster?`, `credit`, `aiGenerated`). The types (`UsesData` and friends) are in `src/types.ts`.
  - Only add image URLs that have been fetched and verified, and copy the license exactly as shown on the Commons file page ("A or B" means a choice of licenses).
  - No videos exist yet; don't invent video URLs.
- `src/data/uses.ts`: `USES`, `usesFor(n)` and `hasUses(n)`. Import uses data from here, not from the JSON directly.
- `src/store.ts`: Zustand store `useTable`. It holds `hovered` (atomic number shown in the spotlight), `selected` (atomic number open in the detail panel), `category` (legend filter), `query` (search) and `temperature` (Kelvin, default 298, set by the Toolbar slider).
- `src/components/`:
  - `AtomModel`: procedural SVG Bohr model generated from an element's `shells`
  - `PeriodicTable`: the grid layout (uses `xpos`/`ypos`)
  - `ElementCell`: a single element tile. It shows the state at the current temperature (S/L/G/? letter, plus a gas shimmer or liquid tint) and a dot when the element has uses data. It selects the derived state from the store, so a cell only re-renders when its state flips.
  - `Spotlight`: a hover preview of the hovered element (its Phase line follows the temperature)
  - `DetailPanel`: a modal for the selected element (its Phase line follows the temperature)
  - `UsesSection`: use cards and a lazy-loaded photo gallery with a credit line per photo, or "Uses coming soon" when there's no entry
  - `VideoSection`: the "Watch" section, rendered only when an entry has a `video`. It loads nothing until the user clicks play. YouTube URLs play through a `youtube-nocookie.com` embed and anything else plays as a `<video>` file. It shows an "AI-generated" label when `aiGenerated` is true.
  - `Toolbar`: search, category filter, temperature slider (K and °C) and "Reset to room temp"
- `video-scripts/`: one markdown file per element in `uses.json` (named by atomic number, e.g. `080-mercury.md`). Each has a 30–45 s narration, timed scene prompts for an AI video generator and accuracy notes. These aren't part of the app build.

## Styling

- Plain CSS in `src/App.css` (globals in `src/index.css`), using CSS variables.
- Each element's category color is passed to its component as the `--c` CSS variable (inline style). The CSS uses `var(--c)`, often through `color-mix()`. Follow this pattern; don't hardcode category colors in the CSS.

## Conventions

- Keep components small and focused.
- Don't add new UI or component libraries without asking first.
- Respect `prefers-reduced-motion`. The CSS has a `@media (prefers-reduced-motion: reduce)` block, and Framer Motion animations should honor the setting too (e.g. `useReducedMotion` or `MotionConfig reducedMotion="user"`).
- Before finishing, run `npm run build` and make sure it passes.
