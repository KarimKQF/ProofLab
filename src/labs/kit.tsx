/**
 * Boîte à outils commune aux laboratoires : graphiques SVG, curseurs, points
 * déplaçables au pointeur ET au clavier, statut épistémique des affirmations.
 */
import { createContext, useCallback, useContext, useMemo, useRef, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader, SectionTitle, cx } from '@/components/ui';
import { MathText } from '@/components/Math';
import { ProofWorkspace } from '@/components/proof/ProofWorkspace';
import type { ProofSpec } from '@/content/schema';
import { useGame } from '@/storage/store';

export function LabShell({
  title,
  eyebrow,
  intro,
  children,
}: {
  title: ReactNode;
  eyebrow?: ReactNode;
  intro?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="max-w-[1500px] mx-auto px-5 md:px-8 py-7">
      <PageHeader
        eyebrow={
          <>
            <Link to="/labos" className="hover:text-text-2">Laboratoires</Link>
            {eyebrow ? <> · {eyebrow}</> : null}
          </>
        }
        title={title}
      >
        {intro}
      </PageHeader>
      {children}
    </div>
  );
}

export function Panel({ title, children, className }: { title?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={cx('rounded-lg border border-line bg-surface p-4', className)}>
      {title && <SectionTitle className="mb-2.5">{title}</SectionTitle>}
      {children}
    </section>
  );
}

export function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  format,
}: {
  label: ReactNode;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
  format?: (v: number) => string;
}) {
  return (
    <label className="block text-[13px]">
      <span className="flex justify-between gap-2 mb-0.5">
        <span>{label}</span>
        <span className="font-mono tabular text-text-2">{format ? format(value) : value}</span>
      </span>
      <input type="range" className="w-full" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} />
    </label>
  );
}

/** Nombre au format français. */
export const fr = (v: number, digits = 3): string => {
  if (!Number.isFinite(v)) return '—';
  return v.toLocaleString('fr-FR', { maximumFractionDigits: digits, minimumFractionDigits: 0 });
};

export type ClaimStatus = 'exact' | 'numerique' | 'illustratif' | 'demontre' | 'manquant';

const CLAIM_META: Record<ClaimStatus, { label: string; color: string }> = {
  exact: { label: 'Formule exacte', color: 'var(--st-hyp)' },
  numerique: { label: 'Valeur numérique', color: 'var(--st-miss)' },
  illustratif: { label: 'Illustratif', color: 'var(--text-3)' },
  demontre: { label: 'Démontré', color: 'var(--st-proved)' },
  manquant: { label: 'Hypothèse manquante', color: 'var(--st-miss)' },
};

/** Étiquette obligatoire : ce qui est affiché est-il exact, numérique, illustratif, démontré ? */
export function Claim({ status, children, className }: { status: ClaimStatus; children?: ReactNode; className?: string }) {
  const m = CLAIM_META[status];
  return (
    <span className={cx('inline-flex items-baseline gap-1.5 text-[12px]', className)}>
      <span className="font-mono text-[10.5px] uppercase tracking-wider rounded px-1 py-px border" style={{ color: m.color, borderColor: m.color }}>
        {m.label}
      </span>
      {children && <span className="text-text-2">{children}</span>}
    </span>
  );
}

// ───────────────────── Graphique SVG ─────────────────────

interface PlotScale {
  sx: (x: number) => number;
  sy: (y: number) => number;
  ix: (px: number) => number;
  iy: (py: number) => number;
  w: number;
  h: number;
  svg: React.RefObject<SVGSVGElement | null>;
}

const PlotContext = createContext<PlotScale | null>(null);

export function usePlot(): PlotScale {
  const ctx = useContext(PlotContext);
  if (!ctx) throw new Error('usePlot doit être utilisé dans <Plot>.');
  return ctx;
}

export function Plot({
  xDomain,
  yDomain,
  width = 640,
  height = 420,
  padding = 34,
  grid = true,
  ariaLabel,
  children,
}: {
  xDomain: [number, number];
  yDomain: [number, number];
  width?: number;
  height?: number;
  padding?: number;
  grid?: boolean;
  ariaLabel: string;
  children: ReactNode;
}) {
  const svg = useRef<SVGSVGElement>(null);
  const scale = useMemo<PlotScale>(() => {
    const [x0, x1] = xDomain;
    const [y0, y1] = yDomain;
    const iw = width - 2 * padding;
    const ih = height - 2 * padding;
    return {
      sx: (x) => padding + ((x - x0) / (x1 - x0)) * iw,
      sy: (y) => height - padding - ((y - y0) / (y1 - y0)) * ih,
      ix: (px) => x0 + ((px - padding) / iw) * (x1 - x0),
      iy: (py) => y0 + ((height - padding - py) / ih) * (y1 - y0),
      w: width,
      h: height,
      svg,
    };
  }, [xDomain, yDomain, width, height, padding]);

  // Graduations « rondes » ; le nombre de décimales affichées suit le pas, quelle que soit l'échelle.
  const ticks = (a: number, b: number): { values: number[]; digits: number } => {
    const raw = (b - a) / 8;
    const mag = 10 ** Math.floor(Math.log10(raw));
    const norm = raw / mag;
    const step = (norm < 1.5 ? 1 : norm < 3.5 ? 2 : norm < 7.5 ? 5 : 10) * mag;
    const digits = Math.max(0, -Math.floor(Math.log10(step) + 1e-9));
    const values: number[] = [];
    for (let k = Math.ceil(a / step - 1e-9); k * step <= b + 1e-9 * Math.abs(step); k++) {
      const v = k * step;
      values.push(Math.abs(v) < step * 1e-9 ? 0 : v);
    }
    return { values, digits };
  };
  const xt = ticks(xDomain[0], xDomain[1]);
  const yt = ticks(yDomain[0], yDomain[1]);

  const { sx, sy } = scale;
  return (
    <PlotContext.Provider value={scale}>
      <svg ref={svg} viewBox={`0 0 ${width} ${height}`} className="w-full touch-none select-none" role="img" aria-label={ariaLabel}>
        {grid &&
          xt.values.map((t) => (
            <g key={`x${t}`}>
              <line x1={sx(t)} x2={sx(t)} y1={sy(yDomain[0])} y2={sy(yDomain[1])} stroke="var(--line)" strokeWidth={t === 0 ? 1.2 : 0.6} />
              <text x={sx(t)} y={height - padding + 15} textAnchor="middle" fontSize={11} fill="var(--text-3)" fontFamily="var(--font-mono)">{fr(t, xt.digits)}</text>
            </g>
          ))}
        {grid &&
          yt.values.map((t) => (
            <g key={`y${t}`}>
              <line x1={sx(xDomain[0])} x2={sx(xDomain[1])} y1={sy(t)} y2={sy(t)} stroke="var(--line)" strokeWidth={t === 0 ? 1.2 : 0.6} />
              <text x={padding - 6} y={sy(t) + 3.5} textAnchor="end" fontSize={11} fill="var(--text-3)" fontFamily="var(--font-mono)">{fr(t, yt.digits)}</text>
            </g>
          ))}
        {children}
      </svg>
    </PlotContext.Provider>
  );
}

export function Curve({ points, color = 'var(--accent)', width = 1.8, dash }: { points: [number, number][]; color?: string; width?: number; dash?: string }) {
  const { sx, sy } = usePlot();
  const d = points.map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${sx(x).toFixed(2)} ${sy(y).toFixed(2)}`).join(' ');
  return <path d={d} fill="none" stroke={color} strokeWidth={width} strokeDasharray={dash} strokeLinejoin="round" />;
}

export function sample(f: (x: number) => number, a: number, b: number, n = 600): [number, number][] {
  return Array.from({ length: n + 1 }, (_, i) => {
    const x = a + ((b - a) * i) / n;
    return [x, f(x)] as [number, number];
  });
}

export function Dot({ x, y, r = 4.5, color = 'var(--text)', label, dx = 8, dy = -8 }: { x: number; y: number; r?: number; color?: string; label?: string; dx?: number; dy?: number }) {
  const { sx, sy } = usePlot();
  return (
    <g>
      <circle cx={sx(x)} cy={sy(y)} r={r} fill={color} />
      {label && <text x={sx(x) + dx} y={sy(y) + dy} fontSize={13} fill={color} fontFamily="var(--font-mono)">{label}</text>}
    </g>
  );
}

export function Segment({ a, b, color = 'var(--accent)', width = 1.5, dash, arrow }: { a: [number, number]; b: [number, number]; color?: string; width?: number; dash?: string; arrow?: boolean }) {
  const { sx, sy } = usePlot();
  const x1 = sx(a[0]);
  const y1 = sy(a[1]);
  const x2 = sx(b[0]);
  const y2 = sy(b[1]);
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const head = 7;
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={width} strokeDasharray={dash} />
      {arrow && (
        <path d={`M ${x2} ${y2} L ${x2 - head * Math.cos(angle - 0.45)} ${y2 - head * Math.sin(angle - 0.45)} L ${x2 - head * Math.cos(angle + 0.45)} ${y2 - head * Math.sin(angle + 0.45)} Z`} fill={color} />
      )}
    </g>
  );
}

/** Point déplaçable au pointeur et aux flèches du clavier. */
export function DraggablePoint({
  x,
  y,
  onChange,
  label,
  color = 'var(--text)',
  name,
  step = 0.1,
  bounds,
  r = 7,
}: {
  x: number;
  y: number;
  onChange: (x: number, y: number) => void;
  label?: string;
  color?: string;
  /** Nom annoncé par les lecteurs d'écran. */
  name: string;
  step?: number;
  bounds?: [number, number, number, number];
  r?: number;
}) {
  const { sx, sy, ix, iy, svg } = usePlot();

  const clamp = useCallback(
    (px: number, py: number): [number, number] => {
      if (!bounds) return [px, py];
      return [Math.min(bounds[1], Math.max(bounds[0], px)), Math.min(bounds[3], Math.max(bounds[2], py))];
    },
    [bounds],
  );

  const toUser = (e: React.PointerEvent): [number, number] => {
    const el = svg.current!;
    const pt = el.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const m = el.getScreenCTM();
    if (!m) return [x, y];
    const p = pt.matrixTransform(m.inverse());
    return clamp(ix(p.x), iy(p.y));
  };

  const onKey = (e: React.KeyboardEvent) => {
    const d = e.shiftKey ? step * 5 : step;
    const map: Record<string, [number, number]> = {
      ArrowLeft: [-d, 0],
      ArrowRight: [d, 0],
      ArrowUp: [0, d],
      ArrowDown: [0, -d],
    };
    const delta = map[e.key];
    if (!delta) return;
    e.preventDefault();
    const [nx, ny] = clamp(x + delta[0], y + delta[1]);
    onChange(nx, ny);
  };

  return (
    <g
      tabIndex={0}
      role="slider"
      aria-label={name}
      aria-valuetext={`x = ${fr(x, 2)}, y = ${fr(y, 2)}`}
      aria-valuenow={0}
      onKeyDown={onKey}
      style={{ cursor: 'grab', outline: 'none' }}
      className="focus-visible:[&>circle:first-child]:stroke-[var(--accent)]"
      onPointerDown={(e) => {
        (e.currentTarget as SVGGElement).setPointerCapture(e.pointerId);
        const [nx, ny] = toUser(e);
        onChange(nx, ny);
      }}
      onPointerMove={(e) => {
        if (!(e.currentTarget as SVGGElement).hasPointerCapture(e.pointerId)) return;
        const [nx, ny] = toUser(e);
        onChange(nx, ny);
      }}
      onPointerUp={(e) => (e.currentTarget as SVGGElement).releasePointerCapture(e.pointerId)}
    >
      <circle cx={sx(x)} cy={sy(y)} r={r + 6} fill="transparent" stroke="transparent" strokeWidth={2} />
      <circle cx={sx(x)} cy={sy(y)} r={r} fill={color} stroke="var(--bg)" strokeWidth={2} />
      {label && <text x={sx(x) + 11} y={sy(y) - 9} fontSize={14} fill={color} fontFamily="var(--font-mono)">{label}</text>}
    </g>
  );
}

/** Grille de valeurs, rendue sur un canvas pour rester fluide. */
export function Heatmap({
  rows,
  cols,
  value,
  domain,
  ariaLabel,
  className,
}: {
  rows: number;
  cols: number;
  value: (i: number, j: number) => number;
  domain: [number, number];
  ariaLabel: string;
  className?: string;
}) {
  // Les couleurs suivent le thème : le zéro prend la couleur de surface, les extrêmes celles de --div-neg et --div-pos.
  const theme = useGame((s) => s.save.settings.theme);
  const ref = useCallback(
    (canvas: HTMLCanvasElement | null) => {
      if (!canvas) return;
      canvas.width = cols;
      canvas.height = rows;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      const img = ctx.createImageData(cols, rows);
      const [lo, hi] = domain;
      const css = getComputedStyle(document.documentElement);
      const rgb = (name: string, fallback: number[]): number[] => {
        const hex = css.getPropertyValue(name).trim().replace('#', '');
        return /^[0-9a-f]{6}$/i.test(hex) ? [0, 2, 4].map((k) => parseInt(hex.slice(k, k + 2), 16)) : fallback;
      };
      // Échelle divergente : zéro au centre lorsque lo = −hi.
      const mix = (a: number[], b: number[], t: number) => a.map((v, i) => Math.round(v + (b[i]! - v) * t));
      const neutral = rgb('--surface', theme === 'light' ? [255, 255, 255] : [17, 21, 29]);
      const negative = rgb('--div-neg', [57, 135, 229]);
      const positive = rgb('--div-pos', [217, 89, 38]);
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const v = value(i, j);
          const t = hi === lo ? 0 : Math.max(-1, Math.min(1, (2 * (v - lo)) / (hi - lo) - 1));
          const c = t >= 0 ? mix(neutral, positive, t) : mix(neutral, negative, -t);
          const o = (rows - 1 - i) * cols * 4 + j * 4;
          img.data[o] = c[0]!;
          img.data[o + 1] = c[1]!;
          img.data[o + 2] = c[2]!;
          img.data[o + 3] = 255;
        }
      }
      ctx.putImageData(img, 0, 0);
    },
    [rows, cols, value, domain, theme],
  );
  return <canvas ref={ref} role="img" aria-label={ariaLabel} className={cx('w-full rounded [image-rendering:pixelated]', className)} style={{ aspectRatio: '16 / 9' }} />;
}

/** Preuve intégrée à un laboratoire : chaque nœud établi déverrouille une visualisation. */
export function LabProof({ labId, specKey, spec }: { labId: string; specKey: string; spec: ProofSpec }) {
  const unlock = useGame((s) => s.unlockLabKeys);
  const onUnlocks = useCallback((keys: string[]) => unlock(labId, keys), [unlock, labId]);
  return <ProofWorkspace spec={spec} allowed={null} draftKey={`labo:${labId}:${specKey}`} errorKey={null} mode="labo" guided onUnlocks={onUnlocks} />;
}

export function useLabKeys(labId: string): ReadonlySet<string> {
  const keys = useGame((s) => s.save.labs[labId]);
  return useMemo(() => new Set(keys ?? []), [keys]);
}

/** Texte mixte en ligne, ré-exporté pour les laboratoires. */
export { MathText };
