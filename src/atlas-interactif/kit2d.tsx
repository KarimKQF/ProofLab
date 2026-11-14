/**
 * Primitives 2D des planches interactives (SVG, sans Three.js) : celles des laboratoires,
 * plus polygones, étiquettes, arcs, champs de flèches, poignée contrainte à une courbe,
 * choix segmentés et palette proche de celle de l'atlas.
 */
import { useCallback, type ReactNode } from 'react';
import { cx } from '@/components/ui';
import { MathText } from '@/components/Math';
import { Curve, Dot, DraggablePoint, fr, Plot, Segment, Slider, usePlot } from '@/labs/kit';

export { Curve, Dot, DraggablePoint, fr, MathText, Plot, Segment, Slider, usePlot };

export type P2 = [number, number];

/** Palette lisible sur les deux thèmes, proche des couleurs de l'atlas. */
export const C = {
  teal: '#1a9e96',
  orange: '#d8743a',
  violet: '#8a6fd6',
  blue: '#4a86d0',
  red: '#d55181',
  green: '#3bb27a',
  gold: '#c9a227',
  ink: 'var(--text)',
  muted: 'var(--text-3)',
  faint: 'var(--line-strong)',
} as const;

/** Polygone plein (ou contour seul si `fill` est omis). */
export function Poly({ points, fill, stroke, width = 1.5, opacity = 0.25, dash }: { points: P2[]; fill?: string; stroke?: string; width?: number; opacity?: number; dash?: string }) {
  const { sx, sy } = usePlot();
  if (points.length < 2) return null;
  const d = points.map(([x, y], i) => `${i ? 'L' : 'M'} ${sx(x).toFixed(2)} ${sy(y).toFixed(2)}`).join(' ') + ' Z';
  return (
    <g>
      {fill && <path d={d} fill={fill} fillOpacity={opacity} stroke="none" />}
      {stroke && <path d={d} fill="none" stroke={stroke} strokeWidth={width} strokeDasharray={dash} strokeLinejoin="round" />}
    </g>
  );
}

/** Étiquette en texte simple (Unicode), placée en coordonnées mathématiques. */
export function Label({ x, y, text, color = 'var(--text)', size = 13, anchor = 'start', dx = 0, dy = 0, italic = false }: { x: number; y: number; text: string; color?: string; size?: number; anchor?: 'start' | 'middle' | 'end'; dx?: number; dy?: number; italic?: boolean }) {
  const { sx, sy } = usePlot();
  return (
    <text x={sx(x) + dx} y={sy(y) + dy} fontSize={size} fill={color} textAnchor={anchor} fontFamily="var(--font-serif)" fontStyle={italic ? 'italic' : undefined}>
      {text}
    </text>
  );
}

/** Flèche de a vers b. */
export function Arrow({ a, b, color = C.teal, width = 2, dash }: { a: P2; b: P2; color?: string; width?: number; dash?: string }) {
  return <Segment a={a} b={b} color={color} width={width} dash={dash} arrow />;
}

/** Arc de cercle de centre c, de rayon r, de l'angle a0 à a1 (radians), avec flèche facultative. */
export function Arc({ c, r, a0, a1, color = C.teal, width = 2, arrow = false, dash }: { c: P2; r: number; a0: number; a1: number; color?: string; width?: number; arrow?: boolean; dash?: string }) {
  const n = Math.max(8, Math.ceil(Math.abs(a1 - a0) / 0.04));
  const pts: P2[] = Array.from({ length: n + 1 }, (_, k) => {
    const a = a0 + ((a1 - a0) * k) / n;
    return [c[0] + r * Math.cos(a), c[1] + r * Math.sin(a)];
  });
  return (
    <g>
      <Curve points={pts} color={color} width={width} dash={dash} />
      {arrow && pts.length > 3 && <Segment a={pts[pts.length - 3]!} b={pts[pts.length - 1]!} color={color} width={width} arrow />}
    </g>
  );
}

/** Cercle complet. */
export function Circle({ c, r, color = C.muted, width = 1.4, dash, fill }: { c: P2; r: number; color?: string; width?: number; dash?: string; fill?: string }) {
  const { sx, sy } = usePlot();
  const rx = Math.abs(sx(c[0] + r) - sx(c[0]));
  const ry = Math.abs(sy(c[1] + r) - sy(c[1]));
  return <ellipse cx={sx(c[0])} cy={sy(c[1])} rx={rx} ry={ry} fill={fill ?? 'none'} fillOpacity={fill ? 0.18 : undefined} stroke={color} strokeWidth={width} strokeDasharray={dash} />;
}

/** Champ de vecteurs : flèches de longueur bornée, croissante avec |F|. */
export function Field({ F, domain, color = C.teal, n = 9, shift = 0.5, opacity = 0.5 }: { F: (p: P2) => P2; domain: [number, number, number, number]; color?: string; n?: number; shift?: number; opacity?: number }) {
  const [x0, x1, y0, y1] = domain;
  const dx = (x1 - x0) / n;
  const dy = (y1 - y0) / n;
  const raw: { p: P2; v: P2 }[] = [];
  let maxLen = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const p: P2 = [x0 + (i + shift) * dx, y0 + (j + shift) * dy];
      const v = F(p);
      if (!Number.isFinite(v[0]) || !Number.isFinite(v[1])) continue;
      raw.push({ p, v });
      maxLen = Math.max(maxLen, Math.hypot(v[0], v[1]));
    }
  }
  const unit = 0.42 * Math.min(dx, dy);
  return (
    <g opacity={opacity} aria-hidden>
      {raw.map(({ p, v }, i) => {
        const len = Math.hypot(v[0], v[1]);
        if (len < 1e-9 || maxLen === 0) return null;
        const k = (unit * (0.35 + 0.65 * Math.min(1, len / maxLen))) / len;
        return <Segment key={i} a={p} b={[p[0] + k * v[0], p[1] + k * v[1]]} color={color} width={1.1} arrow />;
      })}
    </g>
  );
}

/** Morceaux d'une suite de points contenus dans le domaine (une courbe qui sort est interrompue). */
export function clip(points: readonly (readonly number[])[], [x0, x1, y0, y1]: [number, number, number, number]): P2[][] {
  const runs: P2[][] = [];
  let cur: P2[] = [];
  for (const p of points) {
    const x = p[0]!;
    const y = p[1]!;
    if (Number.isFinite(x) && Number.isFinite(y) && x >= x0 && x <= x1 && y >= y0 && y <= y1) cur.push([x, y]);
    else {
      if (cur.length > 1) runs.push(cur);
      cur = [];
    }
  }
  if (cur.length > 1) runs.push(cur);
  return runs;
}

/** Courbe coupée au domaine du graphique. */
export function ClippedCurve({ points, domain, color = C.teal, width = 2, dash }: { points: readonly (readonly number[])[]; domain: [number, number, number, number]; color?: string; width?: number; dash?: string }) {
  return (
    <g>
      {clip(points, domain).map((run, i) => (
        <Curve key={i} points={run} color={color} width={width} dash={dash} />
      ))}
    </g>
  );
}

/** Poignée qui glisse le long d'une courbe paramétrée s ↦ curve(s), s ∈ [s0, s1]. */
export function DragOnCurve({ curve, s, range, onChange, name, color = C.orange, label, r = 7, step, wrap = false }: { curve: (s: number) => P2; s: number; range: [number, number]; onChange: (s: number) => void; name: string; color?: string; label?: string; r?: number; step?: number; /** Courbe fermée : le clavier fait le tour au lieu de s'arrêter aux bornes. */ wrap?: boolean }) {
  const { sx, sy, ix, iy, svg } = usePlot();
  const [s0, s1] = range;
  const nearest = useCallback(
    (x: number, y: number) => {
      let best = s;
      let bestD = Infinity;
      const N = 600;
      for (let k = 0; k <= N; k++) {
        const t = s0 + ((s1 - s0) * k) / N;
        const [cx, cy] = curve(t);
        const d = (cx - x) ** 2 + (cy - y) ** 2;
        if (d < bestD) {
          bestD = d;
          best = t;
        }
      }
      return best;
    },
    [curve, s, s0, s1],
  );
  const toUser = (e: React.PointerEvent): P2 | null => {
    const el = svg.current;
    if (!el) return null;
    const pt = el.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const m = el.getScreenCTM();
    if (!m) return null;
    const q = pt.matrixTransform(m.inverse());
    return [ix(q.x), iy(q.y)];
  };
  const [x, y] = curve(s);
  const delta = step ?? (s1 - s0) / 100;
  return (
    <g
      tabIndex={0}
      role="slider"
      aria-label={name}
      aria-valuemin={s0}
      aria-valuemax={s1}
      aria-valuenow={Number(s.toFixed(3))}
      style={{ cursor: 'grab', outline: 'none' }}
      onKeyDown={(e) => {
        const d = e.shiftKey ? delta * 5 : delta;
        const span = s1 - s0;
        const put = (v: number) => (wrap ? s0 + ((((v - s0) % span) + span) % span) : Math.min(s1, Math.max(s0, v)));
        if (e.key === 'ArrowRight' || e.key === 'ArrowUp') onChange(put(s + d));
        else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') onChange(put(s - d));
        else return;
        e.preventDefault();
      }}
      onPointerDown={(e) => {
        (e.currentTarget as SVGGElement).setPointerCapture(e.pointerId);
        const p = toUser(e);
        if (p) onChange(nearest(p[0], p[1]));
      }}
      onPointerMove={(e) => {
        if (!(e.currentTarget as SVGGElement).hasPointerCapture(e.pointerId)) return;
        const p = toUser(e);
        if (p) onChange(nearest(p[0], p[1]));
      }}
      onPointerUp={(e) => (e.currentTarget as SVGGElement).releasePointerCapture(e.pointerId)}
    >
      <circle cx={sx(x)} cy={sy(y)} r={r + 6} fill="transparent" />
      <circle cx={sx(x)} cy={sy(y)} r={r} fill={color} stroke="var(--bg)" strokeWidth={2} />
      {label && (
        <text x={sx(x) + 11} y={sy(y) - 9} fontSize={14} fill={color} fontFamily="var(--font-serif)" fontStyle="italic">
          {label}
        </text>
      )}
    </g>
  );
}

/** Choix segmenté (boutons radio). */
export function Choice<T extends string | number>({ options, value, onChange, name }: { options: { id: T; label: string }[]; value: T; onChange: (v: T) => void; name: string }) {
  return (
    <div className="flex flex-wrap gap-1.5" role="radiogroup" aria-label={name}>
      {options.map((o) => (
        <button
          key={String(o.id)}
          type="button"
          role="radio"
          aria-checked={value === o.id}
          onClick={() => onChange(o.id)}
          data-choice={String(o.id)}
          className={cx('rounded-md border px-2.5 py-1 text-[12.5px] transition-colors', value === o.id ? 'border-accent bg-accent text-[var(--bg)]' : 'border-line hover:border-line-strong')}
        >
          <MathText text={o.label} />
        </button>
      ))}
    </div>
  );
}

/** Case à cocher simple. */
export function Check({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center gap-2 text-[13px]">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <MathText text={label} />
    </label>
  );
}

/** Légende courte sous une figure ; une chaîne est rendue comme texte mixte (LaTeX entre $). */
export function Caption({ children }: { children: ReactNode }) {
  return <p className="mt-1 text-center text-[12px] text-text-3">{typeof children === 'string' ? <MathText text={children} /> : children}</p>;
}

/** Format décimal français court. */
export const f2 = (v: number, d = 2): string => fr(Math.abs(v) < 0.5 * 10 ** -d ? 0 : v, d);
