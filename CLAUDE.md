# The Elements

Interactive periodic table built with Vite + React 19 + TypeScript, Framer Motion (animation) and Zustand (state).

## Commands

- `npm run dev`: start the dev server
- `npm run build`: type-check (`tsc -b`) and build. **Run this to verify before finishing any task.**
- `npm run lint`: lint with oxlint

## Structure

- `src/data/elements.json`: data for all 118 elements (shape is `ElementData` in `src/types.ts`)
- `src/data/categories.ts`: `CATEGORIES` (label + color per `CategoryKey`), `normalizeCategory`, `categoryColor`, and `ELEMENTS` (the JSON data with a normalized `cat` added to each element). Import element data from here, not from the JSON directly.
- `src/store.ts`: Zustand store `useTable`. It holds `hovered` (atomic number shown in the spotlight), `selected` (atomic number open in the detail panel), `category` (legend filter) and `query` (search).
- `src/components/`:
  - `AtomModel`: procedural SVG Bohr model generated from an element's `shells`
  - `PeriodicTable`: the grid layout (uses `xpos`/`ypos`)
  - `ElementCell`: a single element tile
  - `Spotlight`: a hover preview of the hovered element
  - `DetailPanel`: a modal for the selected element
  - `Toolbar`: search and category filter

## Styling

- Plain CSS in `src/App.css` (globals in `src/index.css`), using CSS variables.
- Each element's category color is passed to its component as the `--c` CSS variable (inline style). The CSS uses `var(--c)`, often through `color-mix()`. Follow this pattern; don't hardcode category colors in the CSS.

## Conventions

- Keep components small and focused.
- Don't add new UI or component libraries without asking first.
- Respect `prefers-reduced-motion`. The CSS has a `@media (prefers-reduced-motion: reduce)` block, and Framer Motion animations should honor the setting too (e.g. `useReducedMotion` or `MotionConfig reducedMotion="user"`).
- Before finishing, run `npm run build` and make sure it passes.
