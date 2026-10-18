import { memo } from 'react';
import type { CategoryKey, ElementData } from '../types';
import { categoryColor } from '../data/categories';
import { hasUses } from '../data/uses';
import { STATE_LABELS, STATE_LETTERS, stateAt } from '../data/phase';
import { useTable } from '../store';

interface Props {
  el: ElementData & { cat: CategoryKey };
  dimmed: boolean;
}

function ElementCellBase({ el, dimmed }: Props) {
  const setHovered = useTable((s) => s.setHovered);
  const setSelected = useTable((s) => s.setSelected);
  const isHovered = useTable((s) => s.hovered === el.number);
  // Select the derived state so the cell only re-renders when its state flips.
  const state = useTable((s) => stateAt(el, s.temperature));
  const withUses = hasUses(el.number);

  return (
    <button
      type="button"
      className={`cell is-${state}${dimmed ? ' is-dimmed' : ''}${isHovered ? ' is-active' : ''}`}
      style={{
        gridColumn: el.xpos,
        gridRow: el.ypos,
        ['--c' as string]: categoryColor(el.cat),
      }}
      onMouseEnter={() => setHovered(el.number)}
      onFocus={() => setHovered(el.number)}
      onClick={() => setSelected(el.number)}
      aria-label={`${el.name}, atomic number ${el.number}, ${STATE_LABELS[state].toLowerCase()}${withUses ? ', has real-life uses' : ''}`}
    >
      <span className="cell-num">{el.number}</span>
      <span className="cell-state" title={STATE_LABELS[state]} aria-hidden="true">
        {STATE_LETTERS[state]}
      </span>
      <span className="cell-sym">{el.symbol}</span>
      <span className="cell-name">{el.name}</span>
      {withUses && <span className="cell-uses-dot" title="Has real-life uses" aria-hidden="true" />}
    </button>
  );
}

export const ElementCell = memo(ElementCellBase);
