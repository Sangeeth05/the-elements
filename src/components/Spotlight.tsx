import { AnimatePresence, motion } from 'framer-motion';
import { ELEMENTS, CATEGORIES, categoryColor } from '../data/categories';
import { STATE_LABELS, stateAt } from '../data/phase';
import { useTable } from '../store';
import { AtomModel } from './AtomModel';

/** Sits in the empty top-middle of the table and shows the hovered element. */
export function Spotlight() {
  const hovered = useTable((s) => s.hovered);
  const temperature = useTable((s) => s.temperature);
  const el = ELEMENTS.find((e) => e.number === hovered) ?? ELEMENTS[0];
  const color = categoryColor(el.cat);

  return (
    <div className="spotlight" style={{ ['--c' as string]: color }} aria-live="polite">
      <AnimatePresence mode="wait">
        <motion.div
          key={el.number}
          className="spotlight-inner"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18 }}
        >
          <AtomModel shells={el.shells} symbol={el.symbol} color={color} size={150} />
          <div className="spotlight-text">
            <div className="spotlight-cat">{CATEGORIES[el.cat].label}</div>
            <div className="spotlight-name">
              {el.name} <span>#{el.number}</span>
            </div>
            <dl className="spotlight-facts">
              <div><dt>Mass</dt><dd>{el.atomic_mass.toFixed(3)} u</dd></div>
              <div><dt>Shells</dt><dd>{el.shells.join(' · ')}</dd></div>
              <div><dt>Config</dt><dd>{el.electron_configuration_semantic}</dd></div>
              <div><dt>Phase</dt><dd>{STATE_LABELS[stateAt(el, temperature)]} at {temperature} K</dd></div>
            </dl>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
