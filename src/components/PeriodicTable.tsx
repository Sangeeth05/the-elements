import { useMemo } from 'react';
import { ELEMENTS } from '../data/categories';
import { useTable } from '../store';
import { ElementCell } from './ElementCell';
import { Spotlight } from './Spotlight';

function matches(query: string, el: (typeof ELEMENTS)[number]) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return (
    el.name.toLowerCase().includes(q) ||
    el.symbol.toLowerCase() === q ||
    String(el.number) === q
  );
}

export function PeriodicTable() {
  const category = useTable((s) => s.category);
  const query = useTable((s) => s.query);

  const dimmed = useMemo(() => {
    const set = new Set<number>();
    for (const el of ELEMENTS) {
      if ((category && el.cat !== category) || !matches(query, el)) set.add(el.number);
    }
    return set;
  }, [category, query]);

  return (
    <div className="table-scroll">
      <div className="table-grid" role="grid" aria-label="Periodic table">
        <Spotlight />
        {/* Placeholders that point down to the f-block rows */}
        <div className="cell-ref" style={{ gridColumn: 3, gridRow: 6 }}>57–71</div>
        <div className="cell-ref" style={{ gridColumn: 3, gridRow: 7 }}>89–103</div>
        {ELEMENTS.map((el) => (
          <ElementCell key={el.number} el={el} dimmed={dimmed.has(el.number)} />
        ))}
      </div>
    </div>
  );
}
