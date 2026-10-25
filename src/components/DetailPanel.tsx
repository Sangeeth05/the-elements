import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ELEMENTS, CATEGORIES, categoryColor } from '../data/categories';
import { STATE_LABELS, stateAt } from '../data/phase';
import { usesFor } from '../data/uses';
import { useTable } from '../store';
import { AtomModel } from './AtomModel';
import { UsesSection } from './UsesSection';
import { VideoSection } from './VideoSection';

const kToC = (k: number | null) => (k == null ? '—' : `${(k - 273.15).toFixed(1)} °C`);

export function DetailPanel() {
  const selected = useTable((s) => s.selected);
  const setSelected = useTable((s) => s.setSelected);
  const temperature = useTable((s) => s.temperature);
  const el = ELEMENTS.find((e) => e.number === selected);
  const video = el && usesFor(el.number)?.video;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [setSelected]);

  return (
    <AnimatePresence>
      {el && (
        <motion.div
          className="overlay"
          onClick={() => setSelected(null)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.aside
            className="panel"
            role="dialog"
            aria-modal="true"
            aria-label={el.name}
            style={{ ['--c' as string]: categoryColor(el.cat) }}
            onClick={(e) => e.stopPropagation()}
            initial={{ y: 40, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 30, opacity: 0, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
          >
            <button className="panel-close" onClick={() => setSelected(null)} aria-label="Close">
              ×
            </button>

            <header className="panel-head">
              <div className="panel-badge">
                <span>{el.number}</span>
                <strong>{el.symbol}</strong>
              </div>
              <div>
                <div className="spotlight-cat">{CATEGORIES[el.cat].label}</div>
                <h2>{el.name}</h2>
              </div>
            </header>

            <div className="panel-body">
              <div className="panel-atom">
                <AtomModel shells={el.shells} symbol={el.symbol} color={categoryColor(el.cat)} size={240} />
              </div>

              <div className="panel-info">
                <p className="panel-summary">{el.summary}</p>
                <dl className="facts">
                  <div><dt>Atomic mass</dt><dd>{el.atomic_mass.toFixed(4)} u</dd></div>
                  <div><dt>Electron config</dt><dd>{el.electron_configuration_semantic}</dd></div>
                  <div><dt>Phase</dt><dd>{STATE_LABELS[stateAt(el, temperature)]} at {temperature} K</dd></div>
                  <div><dt>Melting point</dt><dd>{kToC(el.melt)}</dd></div>
                  <div><dt>Boiling point</dt><dd>{kToC(el.boil)}</dd></div>
                  <div><dt>Density</dt><dd>{el.density == null ? '—' : `${el.density} ${el.phase === 'Gas' ? 'g/L' : 'g/cm³'}`}</dd></div>
                  <div><dt>Electronegativity</dt><dd>{el.electronegativity_pauling ?? '—'}</dd></div>
                  <div><dt>Period · Group · Block</dt><dd>{el.period} · {el.group} · {el.block}</dd></div>
                  <div><dt>Discovered by</dt><dd>{el.discovered_by ?? '—'}</dd></div>
                </dl>

                <UsesSection number={el.number} name={el.name} />
                {/* keyed so switching elements resets the player to its unloaded state */}
                {video && <VideoSection key={video.url} video={video} name={el.name} />}

                <a className="source-link" href={el.source} target="_blank" rel="noreferrer">
                  Read more on Wikipedia ↗
                </a>
              </div>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
