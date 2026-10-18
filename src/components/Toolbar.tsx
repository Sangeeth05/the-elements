import { CATEGORIES } from '../data/categories';
import { useTable } from '../store';
import type { CategoryKey } from '../types';

export function Toolbar() {
  const category = useTable((s) => s.category);
  const toggleCategory = useTable((s) => s.toggleCategory);
  const query = useTable((s) => s.query);
  const setQuery = useTable((s) => s.setQuery);

  return (
    <div className="toolbar">
      <input
        className="search"
        type="search"
        placeholder="Search name, symbol or number…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Search elements"
      />
      <div className="legend" role="group" aria-label="Filter by category">
        {(Object.keys(CATEGORIES) as CategoryKey[]).map((key) => (
          <button
            key={key}
            type="button"
            className={`chip${category === key ? ' is-on' : ''}${category && category !== key ? ' is-off' : ''}`}
            style={{ ['--c' as string]: CATEGORIES[key].color }}
            aria-pressed={category === key}
            onClick={() => toggleCategory(key)}
          >
            <span className="chip-dot" />
            {CATEGORIES[key].label}
          </button>
        ))}
      </div>
    </div>
  );
}
