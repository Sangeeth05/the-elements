import { memo } from 'react';
import type { CategoryKey, ElementData } from '../types';
import { categoryColor } from '../data/categories';
import { useTable } from '../store';

interface Props {
  el: ElementData & { cat: CategoryKey };
  dimmed: boolean;
}

function ElementCellBase({ el, dimmed }: Props) {
  const setHovered = useTable((s) => s.setHovered);
  const setSelected = useTable((s) => s.setSelected);
  const isHovered = useTable((s) => s.hovered === el.number);

  return (
    <button
      type="button"
      className={`cell${dimmed ? ' is-dimmed' : ''}${isHovered ? ' is-active' : ''}`}
      style={{
        gridColumn: el.xpos,
        gridRow: el.ypos,
        ['--c' as string]: categoryColor(el.cat),
      }}
      onMouseEnter={() => setHovered(el.number)}
      onFocus={() => setHovered(el.number)}
      onClick={() => setSelected(el.number)}
      aria-label={`${el.name}, atomic number ${el.number}`}
    >
      <span className="cell-num">{el.number}</span>
      <span className="cell-sym">{el.symbol}</span>
      <span className="cell-name">{el.name}</span>
    </button>
  );
}

export const ElementCell = memo(ElementCellBase);
