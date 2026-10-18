import { memo } from 'react';

interface AtomModelProps {
  shells: number[];
  symbol: string;
  color: string;
  size?: number;
}

/**
 * Procedural Bohr model: one component draws every element from its `shells`
 * array (e.g. [2, 8, 1] for sodium). Each shell spins at its own speed,
 * alternating direction, so heavier atoms look visibly busier.
 */
function AtomModelBase({ shells, symbol, color, size = 220 }: AtomModelProps) {
  const c = size / 2;
  const nucleusR = size * 0.11;
  const outer = size / 2 - size * 0.05;
  const gap = shells.length > 1 ? (outer - nucleusR * 1.6) / (shells.length - 1) : 0;
  const electronR = Math.max(1.6, size * (shells.length > 5 ? 0.012 : 0.018));

  return (
    <svg
      className="atom"
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ color }}
      role="img"
      aria-label={`Bohr model of ${symbol}: ${shells.join(', ')} electrons per shell`}
    >
      <defs>
        <radialGradient id={`nucleus-${symbol}`} cx="35%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.9" />
          <stop offset="45%" stopColor={color} />
          <stop offset="100%" stopColor={color} stopOpacity="0.55" />
        </radialGradient>
      </defs>

      {shells.map((count, i) => {
        const r = shells.length > 1 ? nucleusR * 1.6 + gap * i : outer * 0.7;
        const duration = 4 + i * 2.5;
        return (
          <g key={i}>
            <circle cx={c} cy={c} r={r} className="atom-ring" />
            <g
              className="atom-shell"
              style={{
                transformOrigin: `${c}px ${c}px`,
                animationDuration: `${duration}s`,
                animationDirection: i % 2 ? 'reverse' : 'normal',
              }}
            >
              {Array.from({ length: count }, (_, j) => {
                const a = (j / count) * Math.PI * 2;
                return (
                  <circle
                    key={j}
                    cx={c + r * Math.cos(a)}
                    cy={c + r * Math.sin(a)}
                    r={electronR}
                    fill={color}
                    className="atom-electron"
                  />
                );
              })}
            </g>
          </g>
        );
      })}

      <circle cx={c} cy={c} r={nucleusR} fill={`url(#nucleus-${symbol})`} className="atom-nucleus" />
      <text x={c} y={c} className="atom-symbol" fontSize={nucleusR * 0.85}>
        {symbol}
      </text>
    </svg>
  );
}

export const AtomModel = memo(AtomModelBase);
