import { CATEGORIES } from '../data/categories';
import { MAX_TEMP_K, MIN_TEMP_K, ROOM_TEMP_K } from '../data/phase';
import { useTable } from '../store';
import type { CategoryKey } from '../types';

export function Toolbar() {
  const category = useTable((s) => s.category);
  const toggleCategory = useTable((s) => s.toggleCategory);
  const query = useTable((s) => s.query);
  const setQuery = useTable((s) => s.setQuery);
  const temperature = useTable((s) => s.temperature);
  const setTemperature = useTable((s) => s.setTemperature);
  const celsius = Math.round(temperature - 273.15);

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
      <div className="temp">
        <label htmlFor="temp-slider" className="temp-label">Temperature</label>
        <input
          id="temp-slider"
          className="temp-slider"
          type="range"
          min={MIN_TEMP_K}
          max={MAX_TEMP_K}
          step={1}
          value={temperature}
          onChange={(e) => setTemperature(Number(e.target.value))}
          aria-valuetext={`${temperature} kelvin, ${celsius} degrees Celsius`}
        />
        <output htmlFor="temp-slider" className="temp-value">
          {temperature} K <span>{celsius} °C</span>
        </output>
        <button
          type="button"
          className="temp-reset"
          onClick={() => setTemperature(ROOM_TEMP_K)}
          disabled={temperature === ROOM_TEMP_K}
        >
          Reset to room temp
        </button>
      </div>
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
