# The Elements — Interactive Periodic Table

Step 1–3 of the project plan: a color-coded periodic table with a hover atom demo and a detail panel.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## What's here

- **Grid** — CSS Grid placed by each element's `xpos`/`ypos`, color-coded by category.
- **Hover demo** — `AtomModel` draws a Bohr model for any element from its `shells` array; shells spin at different speeds. Shown in the spotlight area at the top of the table.
- **Detail panel** — click or tap an element (Esc closes). Larger atom, summary, physical properties, link to Wikipedia, and a placeholder for real-life uses (step 5).
- **Filters** — category chips and search by name, symbol or atomic number.
- Respects `prefers-reduced-motion`; cells are keyboard-focusable buttons.

## Structure

```
src/
  data/elements.json      trimmed dataset (118 elements)
  data/categories.ts      category colors + ELEMENTS export
  store.ts                Zustand: hovered, selected, filter, search
  components/
    AtomModel.tsx         procedural animated atom (SVG)
    PeriodicTable.tsx     grid layout + dimming logic
    ElementCell.tsx       one element tile
    Spotlight.tsx         hover demo area
    DetailPanel.tsx       modal with full details
    Toolbar.tsx           search + category legend
```

## Data

From [Periodic-Table-JSON](https://github.com/Bowserinator/Periodic-Table-JSON), which is sourced from Wikipedia. Check the repo's license terms before publishing. Melting/boiling points are stored in Kelvin and shown in °C; gas densities are in g/L.

## Next (step 4 onward)

- Temperature slider: compare `melt`/`boil` with the slider value to show solid/liquid/gas per cell.
- `src/data/uses.json` keyed by atomic number for real-life examples, credited images and video URLs.
