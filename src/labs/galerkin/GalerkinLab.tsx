/**
 * Laboratoire E : méthode de Galerkin pour le problème parabolique de Dirichlet
 *   ∂ₜu − ∂ₓₓu = f sur ]0,T[ × ]0,1[, u(t,0) = u(t,1) = 0, u(0) = u₀,
 * dans la base spectrale φ_k = √2 sin(kπx), λ_k = (kπ)².
 *
 * Dix étapes de preuve, chacune déverrouillant une visualisation. Toute quantité
 * affichée porte son statut : exacte (formule fermée), numérique (troncature ou
 * quadrature, avec son erreur) ou démontrée (établie dans une étape).
 */
import { Fragment, useMemo, useState, type ReactNode } from 'react';
import { Button, cx, ProgressBar } from '@/components/ui';
import { Tex } from '@/components/Math';
import { t as tex } from '@/content/authoring';
import {
  aPrioriEstimate,
  coefficient,
  differenceSq,
  exactOrder,
  FORCINGS,
  INITIAL_DATA,
  integralNormVSq,
  lambda,
  normSq,
  phi,
  REFERENCE_ORDER,
  simpson,
  type Forcing,
  type InitialData,
} from '@/core/math/galerkin';
import { Claim, Curve, Dot, fr, LabProof, LabShell, MathText, Panel, Plot, sample, Segment, Slider, useLabKeys, usePlot } from '../kit';
import { GALERKIN_STEPS, type GalerkinStep } from './steps';
import { Galerkin2DStudio } from '../visual-scenes/galerkin/Galerkin2DStudio';

const LAB = 'galerkin';
const T = 1;
const N_MAX = 40;

type Pt = [number, number];
interface Tick {
  v: number;
  label: string;
}
interface Ctx {
  init: InitialData;
  f: Forcing;
  n: number;
  t: number;
  /** Rang à partir duquel u_n est la solution exacte (données à modes finis), sinon null. */
  order: number | null;
}

const PALETTE = ['var(--accent)', 'var(--st-hyp)', 'var(--st-access)', 'var(--st-miss)', 'var(--st-proved)'];
const DASHES: (string | undefined)[] = [undefined, '7 4', '2 3', '9 3 2 3', '4 4'];
const X01: Pt = [0, 1];
const X_TICKS: Tick[] = [0, 0.25, 0.5, 0.75, 1].map((v) => ({ v, label: fr(v, 2) }));
const T_TICKS: Tick[] = [0, 0.25, 0.5, 0.75, 1].map((v) => ({ v: v * T, label: fr(v * T, 2) }));
const N_TICKS: Tick[] = [1, 10, 20, 30, 40].map((v) => ({ v, label: String(v) }));
const N_LOG_TICKS: Tick[] = [1, 2, 5, 10, 20, 40].map((v) => ({ v: Math.log10(v), label: String(v) }));

const PLAIN_INIT: Record<string, string> = {
  parabole: 'u₀(x) = x(1 − x)',
  mode1: 'u₀ = φ₁',
  modes: 'u₀ = φ₁ + ½ φ₃',
  constante: 'u₀ = 1 (dans L², hors de H¹₀)',
};
const PLAIN_FORCING: Record<string, string> = {
  nul: 'f = 0',
  stationnaire: 'f = φ₁',
  oscillant: 'f = cos(2πt) φ₂',
};
const PSI_LABEL: Record<string, string> = {
  parabole: tex`$\psi(x)=x(1-x)$`,
  mode1: tex`$\psi=\varphi_1$`,
  modes: tex`$\psi=\varphi_1+\tfrac12\varphi_3$`,
  constante: tex`$\psi=1$`,
};

const INTRO = tex`Problème parabolique de Dirichlet sur $]0,1[$ : $\partial_tu-\partial_{xx}u=f$, $u(t,0)=u(t,1)=0$, $u(0)=u_0$. La solution faible se construit par la méthode de Galerkin, en dix étapes de preuve ; chacune déverrouille une visualisation. Les tracés sont des calculs étiquetés, exacts ou numériques : seules les étapes démontrent.`;

/* ───────────── Calculs ───────────── */

/** c_1(t), …, c_K(t), formule exacte. */
function coefs(K: number, t: number, init: InitialData, f: Forcing): number[] {
  return Array.from({ length: K }, (_, i) => coefficient(i + 1, t, init, f));
}

/** Σ_{k=from+1}^{to} c_k φ_k(x). */
function synth(c: number[], x: number, from: number, to: number): number {
  let s = 0;
  for (let k = from; k < Math.min(to, c.length); k++) if (c[k] !== 0) s += c[k] * phi(k + 1, x);
  return s;
}

/** Σ_{k≤n} b_k² = ‖P_n u₀‖²_H. */
function partialSq(init: InitialData, n: number): number {
  let s = 0;
  for (let k = 1; k <= n; k++) s += init.coefficient(k) ** 2;
  return s;
}

/** Dérivée de c_k par différence finie d'ordre 2 sur la formule exacte (contrôle numérique). */
function dcoef(k: number, t: number, init: InitialData, f: Forcing): number {
  const h = Math.min(1e-6, 1e-3 / lambda(k));
  const c = (s: number) => coefficient(k, s, init, f);
  return t >= h ? (c(t + h) - c(t - h)) / (2 * h) : (-3 * c(t) + 4 * c(t + h) - c(t + 2 * h)) / (2 * h);
}

/**
 * Reste de la référence tronquée à K = REFERENCE_ORDER : Σ_{k>K} b_k² ≤ tailBound(K) ;
 * comme f n'a aucun mode au-delà de K, c_k(t) = e^{−λ_k t} b_k pour k > K, d'où
 * Σ_{k>K} c_k(t)² ≤ e^{−2λ_{K+1}t} tailBound(K).
 */
function referenceTail(init: InitialData, f: Forcing, t: number): { bound: number; refined: number } {
  const K = REFERENCE_ORDER;
  const bound = init.tailBound(K);
  const ok = f.modes !== undefined && f.modes <= K;
  return { bound, refined: ok ? Math.exp(-2 * lambda(K + 1) * t) * bound : Number.POSITIVE_INFINITY };
}

/** Échelle verticale fixe pour un couple de données : on voit la décroissance en t. */
function fixedRange(init: InitialData, f: Forcing): Pt {
  const values: number[] = [];
  for (let i = 0; i <= 100; i++) values.push(init.evaluate(i / 100));
  for (const s of [0, 0.01, 0.03, 0.1, 0.3, 1]) {
    const c = coefs(N_MAX, s, init, f);
    for (const m of [1, 2, 3, 5, 10, 20, 40]) for (let i = 0; i <= 120; i++) values.push(synth(c, i / 120, 0, m));
  }
  return extent(values);
}

function extent(values: number[]): Pt {
  let lo = 0;
  let hi = 0;
  for (const v of values) {
    if (!Number.isFinite(v)) continue;
    lo = Math.min(lo, v);
    hi = Math.max(hi, v);
  }
  if (!(hi > lo)) return [-1, 1];
  const pad = 0.08 * (hi - lo);
  return [lo - pad, hi + pad];
}

const clampPts = (pts: Pt[], [lo, hi]: Pt): Pt[] => pts.map(([x, y]) => [x, Math.min(hi, Math.max(lo, y))]);

/* ───────────── Formats ───────────── */

const SUP: Record<string, string> = { '-': '⁻', '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹' };
const pow10 = (e: number): string => (e === 0 ? '1' : e === 1 ? '10' : `10${[...String(e)].map((c) => SUP[c] ?? c).join('')}`);

/** Écriture à la française, scientifique hors de [10⁻³, 10⁵[ ; `digits` chiffres significatifs. */
function sci(v: number, digits = 3): string {
  if (!Number.isFinite(v)) return '—';
  if (v === 0) return '0';
  const a = Math.abs(v);
  if (a >= 1e-3 && a < 1e5) return fr(v, Math.min(8, Math.max(0, digits - 1 - Math.floor(Math.log10(a)))));
  let e = Math.floor(Math.log10(a));
  let m = v / 10 ** e;
  if (Math.abs(Number(m.toFixed(digits - 1))) >= 10) {
    m /= 10;
    e += 1;
  }
  return `${fr(m, digits - 1)}·${pow10(e)}`;
}

/** Même chose en LaTeX. */
function sciTex(v: number, digits = 2): string {
  if (!Number.isFinite(v)) return '\\infty';
  if (v === 0) return '0';
  let e = Math.floor(Math.log10(Math.abs(v)));
  let m = v / 10 ** e;
  if (Math.abs(Number(m.toFixed(digits))) >= 10) {
    m /= 10;
    e += 1;
  }
  const ms = m.toFixed(digits).replace('.', '{,}');
  return e === 0 ? ms : `${ms}\\cdot10^{${e}}`;
}

const frTex = (v: number, d = 3): string => fr(v, d).replace(',', '{,}');

function linearTicks(lo: number, hi: number, count = 5): Tick[] {
  const raw = (hi - lo) / count;
  if (!(raw > 0) || !Number.isFinite(raw)) return [];
  const mag = 10 ** Math.floor(Math.log10(raw));
  const r = raw / mag;
  const step = (r < 1.5 ? 1 : r < 3.5 ? 2 : r < 7.5 ? 5 : 10) * mag;
  const digits = Math.max(0, -Math.floor(Math.log10(step) + 1e-9));
  const out: Tick[] = [];
  for (let i = Math.ceil(lo / step - 1e-9); i * step <= hi + step * 1e-9; i++) {
    const v = Math.abs(i * step) < step * 1e-9 ? 0 : i * step;
    out.push({ v, label: fr(v, digits) });
  }
  return out;
}

function logTicks(lo: number, hi: number): Tick[] {
  const stride = Math.max(1, Math.ceil((hi - lo) / 6));
  const out: Tick[] = [];
  for (let e = Math.ceil(lo); e <= Math.floor(hi); e++) if (e % stride === 0) out.push({ v: e, label: pow10(e) });
  return out;
}

/* ───────────── Graphiques ───────────── */

function Axes({ xd, yd, x, y, xTitle, yTitle }: { xd: Pt; yd: Pt; x: Tick[]; y: Tick[]; xTitle?: string; yTitle?: string }) {
  const { sx, sy } = usePlot();
  return (
    <g fontFamily="var(--font-mono)" fontSize={11} fill="var(--text-3)">
      {x.map((k) => (
        <g key={`x${k.v}`}>
          <line x1={sx(k.v)} x2={sx(k.v)} y1={sy(yd[0])} y2={sy(yd[1])} stroke="var(--line)" strokeWidth={0.6} />
          <text x={sx(k.v)} y={sy(yd[0]) + 15} textAnchor="middle">{k.label}</text>
        </g>
      ))}
      {y.map((k) => (
        <g key={`y${k.v}`}>
          <line x1={sx(xd[0])} x2={sx(xd[1])} y1={sy(k.v)} y2={sy(k.v)} stroke="var(--line)" strokeWidth={k.v === 0 ? 1.2 : 0.6} />
          <text x={sx(xd[0]) - 6} y={sy(k.v) + 3.5} textAnchor="end">{k.label}</text>
        </g>
      ))}
      <rect x={sx(xd[0])} y={sy(yd[1])} width={sx(xd[1]) - sx(xd[0])} height={sy(yd[0]) - sy(yd[1])} fill="none" stroke="var(--line-strong)" strokeWidth={0.8} />
      {xTitle && <text x={sx(xd[1])} y={sy(yd[0]) + 31} textAnchor="end" fill="var(--text-2)">{xTitle}</text>}
      {yTitle && <text x={sx(xd[0])} y={sy(yd[1]) - 9} fill="var(--text-2)">{yTitle}</text>}
    </g>
  );
}

interface Series {
  id: string;
  points: Pt[];
  color: string;
  label: string;
  dash?: string;
  width?: number;
  dots?: boolean;
}

function Legend({ items }: { items: Series[] }) {
  return (
    <ul className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-text-2">
      {items.map((s) => (
        <li key={s.id} className="inline-flex items-center gap-1.5">
          <svg width="22" height="8" aria-hidden className="shrink-0">
            <line x1="1" y1="4" x2="21" y2="4" stroke={s.color} strokeWidth={2} strokeDasharray={s.dash} />
          </svg>
          <MathText text={s.label} />
        </li>
      ))}
    </ul>
  );
}

/**
 * Graphique à axes explicites. Sans graduations fournies, l'axe vertical est
 * linéaire et mis à l'échelle (× 10ᵉ) quand les valeurs sont très petites ou grandes.
 */
function Chart({
  label,
  xd,
  yd,
  x,
  y,
  xTitle,
  yTitle,
  series,
  height = 250,
  marks,
}: {
  label: string;
  xd: Pt;
  yd: Pt;
  x: Tick[];
  y?: Tick[];
  xTitle?: string;
  yTitle?: string;
  series: Series[];
  height?: number;
  marks?: (k: number) => ReactNode;
}) {
  const m = Math.max(Math.abs(yd[0]), Math.abs(yd[1]));
  const e = !y && m > 0 ? Math.floor(Math.log10(m)) : 0;
  const k = e < -2 || e > 3 ? 10 ** -e : 1;
  const ydS: Pt = [yd[0] * k, yd[1] * k];
  const title = k === 1 ? yTitle : `${yTitle ? `${yTitle} ` : ''}× ${pow10(e)}`;
  return (
    <figure className="min-w-0">
      <Plot xDomain={xd} yDomain={ydS} height={height} padding={46} grid={false} ariaLabel={label}>
        <Axes xd={xd} yd={ydS} x={x} y={y ?? linearTicks(ydS[0], ydS[1])} xTitle={xTitle} yTitle={title} />
        {series.map((s) => (
          <g key={s.id}>
            {s.points.length > 1 && <Curve points={s.points.map(([a, b]) => [a, b * k] as Pt)} color={s.color} dash={s.dash} width={s.width ?? 1.8} />}
            {s.dots && s.points.map(([a, b]) => <Dot key={a} x={a} y={b * k} r={2.4} color={s.color} />)}
          </g>
        ))}
        {marks?.(k)}
      </Plot>
      <Legend items={series} />
    </figure>
  );
}

function Ring({ x, y, color, r = 4 }: { x: number; y: number; color: string; r?: number }) {
  const { sx, sy } = usePlot();
  return <circle cx={sx(x)} cy={sy(y)} r={r} fill="var(--surface)" stroke={color} strokeWidth={1.5} />;
}

/** Graphique log-log de n ↦ e(n) ; les valeurs nulles (ou sous le bas de l'échelle) sont des cercles vides. */
function LogPlot({ label, points, current, color, yTitle }: { label: string; points: { n: number; e: number }[]; current: number; color: string; yTitle: string }) {
  const logs = points.filter((p) => p.e > 1e-300).map((p) => Math.log10(p.e));
  const hi = logs.length ? Math.ceil(Math.max(...logs) + 0.05) : 0;
  let lo = logs.length ? Math.max(-40, Math.floor(Math.min(...logs))) : -2;
  if (hi - lo < 2) lo = hi - 2;
  const xd: Pt = [-0.04, Math.log10(N_MAX) + 0.04];
  const pts = points.map((p) => {
    const below = !(p.e > 1e-300) || Math.log10(p.e) < lo;
    return { n: p.n, x: Math.log10(p.n), y: below ? lo : Math.log10(p.e), below };
  });
  const cur = pts.find((p) => p.n === current);
  return (
    <Plot xDomain={xd} yDomain={[lo, hi]} height={250} padding={46} grid={false} ariaLabel={label}>
      <Axes xd={xd} yd={[lo, hi]} x={N_LOG_TICKS} y={logTicks(lo, hi)} xTitle="n" yTitle={yTitle} />
      <Curve points={pts.filter((p) => !p.below).map((p) => [p.x, p.y] as Pt)} color={color} width={1.3} />
      {pts.map((p) => (p.below ? <Ring key={p.n} x={p.x} y={p.y} color={color} r={2.6} /> : <Dot key={p.n} x={p.x} y={p.y} r={2.4} color={color} />))}
      {cur && <Ring x={cur.x} y={cur.y} color="var(--text)" r={6} />}
    </Plot>
  );
}

function Row({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex min-w-0 items-baseline justify-between gap-3">
      <dt className="text-text-2">
        <MathText text={label} />
      </dt>
      <dd className="font-mono text-[13px] tabular">{value}</dd>
    </div>
  );
}

/* ───────────── Frise de progression ───────────── */

const STATE_META = {
  proved: { label: 'Démontrée', glyph: '✓', color: 'var(--st-proved)' },
  open: { label: 'Ouverte', glyph: '→', color: 'var(--st-access)' },
  locked: { label: 'Verrouillée', glyph: '·', color: 'var(--text-3)' },
} as const;

function Frise({ solved, selected, onSelect }: { solved: boolean[]; selected: number; onSelect: (i: number) => void }) {
  const count = solved.filter(Boolean).length;
  return (
    <nav aria-label="Progression des dix étapes" className="mb-7">
      <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.14em] text-text-3">Dix étapes de preuve</h2>
        <span className="font-mono text-[12px] tabular text-text-2">{count} / 10 démontrées</span>
      </div>
      <ProgressBar value={count / 10} label="Étapes démontrées" color="var(--st-proved)" />
      <ol className="mt-3 grid grid-cols-2 gap-1.5 sm:grid-cols-5 2xl:grid-cols-10">
        {GALERKIN_STEPS.map((s, i) => {
          const meta = STATE_META[solved[i] ? 'proved' : i === 0 || solved[i - 1] ? 'open' : 'locked'];
          return (
            <li key={s.key}>
              <button
                type="button"
                onClick={() => onSelect(i)}
                aria-current={selected === i ? 'step' : undefined}
                data-testid={`frise-${s.n}`}
                className={cx(
                  'h-full w-full cursor-pointer rounded-md border px-2.5 py-2 text-left transition-colors',
                  selected === i ? 'border-accent bg-surface-2' : 'border-line bg-surface hover:border-line-strong',
                )}
                style={{ borderTop: `3px solid ${meta.color}` }}
              >
                <span className="flex items-center justify-between font-mono text-[11px]" style={{ color: meta.color }}>
                  <span>Étape {s.n}</span>
                  <span aria-hidden>{meta.glyph}</span>
                </span>
                <span className="mt-0.5 block text-[13px] leading-snug text-text">{s.title}</span>
                <span className="mt-0.5 block font-mono text-[10.5px] uppercase tracking-wider" style={{ color: meta.color }}>
                  {meta.label}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
      <div className="mt-2.5 flex flex-wrap gap-x-5 gap-y-1">
        <Claim status="demontre">établi par toi dans une étape</Claim>
        <Claim status="exact">formule fermée, évaluée en virgule flottante</Claim>
        <Claim status="numerique">troncature ou quadrature, avec son erreur</Claim>
      </div>
    </nav>
  );
}

/* ───────────── Étape sélectionnée ───────────── */

function StepSection({ index, solved, onSelect, onShowViz }: { index: number; solved: boolean[]; onSelect: (i: number) => void; onShowViz: (i: number) => void }) {
  const step = GALERKIN_STEPS[index];
  const open = index === 0 || solved[index - 1];
  const firstOpen = Math.max(0, solved.findIndex((s) => !s));
  return (
    <section className="mb-8" aria-labelledby="galerkin-etape-titre">
      <h2 id="galerkin-etape-titre" tabIndex={-1} className="scroll-mt-6 font-serif text-xl outline-none">
        Étape {step.n} · {step.title}
      </h2>
      <p className="mb-3 mt-0.5 text-sm text-text-2">
        <span className="text-text-3">À démontrer : </span>
        <MathText text={step.claim} />
      </p>
      {solved[index] && (
        <div role="status" className="anim-rise mb-3 flex flex-wrap items-center justify-between gap-2 rounded-md border border-line bg-surface px-3 py-2 text-[13.5px]" style={{ borderLeft: '3px solid var(--st-proved)' }}>
          <span>
            <span style={{ color: 'var(--st-proved)' }}>✓ Étape démontrée.</span> Débloqué : <MathText text={step.vizTitle} />.
          </span>
          <span className="flex flex-wrap gap-1.5">
            <Button variant="outline" onClick={() => onShowViz(index)}>
              Voir la visualisation
            </Button>
            {index < GALERKIN_STEPS.length - 1 && (
              <Button variant="primary" onClick={() => onSelect(index + 1)}>
                Étape {step.n + 1} →
              </Button>
            )}
          </span>
        </div>
      )}
      {open ? (
        <LabProof key={step.key} labId={LAB} specKey={step.key} spec={step.spec} />
      ) : (
        <div className="lab-grid rounded-lg border border-dashed border-line p-6 text-center" data-testid="etape-verrouillee">
          <p className="text-text-2">Cette étape s’ouvrira lorsque l’étape {step.n - 1} sera démontrée.</p>
          <Button className="mt-3" variant="outline" onClick={() => onSelect(firstOpen)}>
            Aller à l’étape {firstOpen + 1}
          </Button>
        </div>
      )}
    </section>
  );
}

/* ───────────── Exploration ───────────── */

const selectCls = 'w-full rounded-md border border-line-strong bg-surface-2 px-2 py-1.5 text-[13px] text-text';

function ControlBar(props: { initId: string; onInit: (id: string) => void; forceId: string; onForce: (id: string) => void; n: number; onN: (n: number) => void; t: number; onT: (t: number) => void }) {
  return (
    <div className="sticky top-0 z-20 -mx-5 border-b border-line bg-bg/95 px-5 py-2.5 backdrop-blur-sm md:-mx-8 md:px-8" role="group" aria-label="Données et paramètres">
      <div className="grid items-end gap-x-5 gap-y-2 sm:grid-cols-2 xl:grid-cols-4">
        <label className="block text-[13px]">
          <span className="mb-0.5 block text-text-2">Donnée initiale</span>
          <select className={selectCls} value={props.initId} onChange={(e) => props.onInit(e.target.value)}>
            {INITIAL_DATA.map((d) => (
              <option key={d.id} value={d.id}>
                {PLAIN_INIT[d.id] ?? d.id}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-[13px]">
          <span className="mb-0.5 block text-text-2">Second membre</span>
          <select className={selectCls} value={props.forceId} onChange={(e) => props.onForce(e.target.value)}>
            {FORCINGS.map((d) => (
              <option key={d.id} value={d.id}>
                {PLAIN_FORCING[d.id] ?? d.id}
              </option>
            ))}
          </select>
        </label>
        <Slider label="Dimension n de Vₙ" value={props.n} min={1} max={N_MAX} onChange={props.onN} />
        <Slider label="Instant t" value={props.t} min={0} max={T} step={0.005} onChange={props.onT} format={(v) => fr(v, 3)} />
      </div>
    </div>
  );
}

function Exploration({ ctx, solvedTitles }: { ctx: Ctx; solvedTitles: string[] }) {
  const { init, f, n, t, order } = ctx;
  const [fit, setFit] = useState(false);
  const K = order ?? REFERENCE_ORDER;
  const span = useMemo(() => fixedRange(init, f), [init, f]);
  const curves = useMemo(() => {
    const c = coefs(Math.max(K, n), t, init, f);
    const xs = Array.from({ length: 241 }, (_, i) => i / 240);
    const un: Pt[] = xs.map((x) => [x, synth(c, x, 0, n)]);
    const ref: Pt[] = xs.map((x) => [x, t === 0 ? init.evaluate(x) : synth(c, x, 0, K)]);
    const diff: Pt[] = xs.map((x, i) => [x, t === 0 ? un[i][1] - ref[i][1] : -synth(c, x, n, K)]);
    return { un, ref, diff };
  }, [init, f, n, t, K]);

  const yd = fit ? extent([...curves.un, ...curves.ref].map((p) => p[1])) : span;
  const exactRef = order !== null || t === 0;
  const errSq = t === 0 ? Math.max(0, init.normSq - partialSq(init, n)) : differenceSq(n, t, init, f);
  const tail = referenceTail(init, f, t);
  const dMax = Math.max(0, ...curves.diff.map((p) => Math.abs(p[1])));
  const dZero = !(dMax > 1e-250);
  const modesText = order === 1 ? tex`$\varphi_1$` : tex`$\varphi_1,\dots,\varphi_{${order ?? 0}}$`;

  const series: Series[] = [
    {
      id: 'ref',
      points: clampPts(curves.ref, yd),
      color: exactRef ? 'var(--st-hyp)' : 'var(--st-miss)',
      dash: '7 4',
      width: 2.2,
      label: exactRef ? tex`référence $u(t,\cdot)$, exacte` : tex`référence $u(t,\cdot)$, tronquée à $K=${REFERENCE_ORDER}$`,
    },
    { id: 'un', points: clampPts(curves.un, yd), color: 'var(--accent)', label: tex`$u_n(t,\cdot)$, $n=${n}$` },
  ];

  return (
    <Panel className="min-w-0">
      <p className="mb-1 text-[13px] text-text-2">
        <MathText text={tex`$${init.label}$, $${f.label}$, $n=${n}$, $t=${frTex(t)}$`} />
      </p>
      <Chart label={`Approximation de Galerkin u_n et solution de référence à l’instant t = ${fr(t, 3)}`} xd={X01} yd={yd} x={X_TICKS} xTitle="x" series={series} height={290} />
      <label className="mt-1.5 flex cursor-pointer items-center gap-2 text-[12.5px] text-text-3">
        <input type="checkbox" checked={fit} onChange={(e) => setFit(e.target.checked)} />
        Ajuster l’échelle verticale à l’instant t
      </label>
      <div className="mt-3">
        <Chart
          label="Différence entre l’approximation et la référence"
          xd={X01}
          yd={dZero ? [-1, 1] : [-1.15 * dMax, 1.15 * dMax]}
          x={X_TICKS}
          xTitle="x"
          series={[{ id: 'diff', points: dZero ? [[0, 0], [1, 0]] : curves.diff, color: 'var(--st-access)', label: tex`différence $u_n(t,\cdot)-u(t,\cdot)$` }]}
          height={170}
        />
      </div>
      <dl className="mt-3 grid gap-x-6 gap-y-1 text-[13.5px] sm:grid-cols-2">
        <Row label={tex`$\|u_n(t)\|_H$`} value={sci(Math.sqrt(normSq(n, t, init, f)), 4)} />
        <Row label={tex`$\|u_n(t)-u(t)\|_H$`} value={sci(Math.sqrt(errSq), 3)} />
      </dl>
      <div className="mt-3 space-y-1.5">
        {order !== null && n >= order ? (
          <Claim status="exact">
            <MathText text={tex`$u_0$ et $f$ n'ont de composantes que sur ${modesText}, et $n\ge${order}$ : $u_n$ est la solution exacte, la différence est nulle.`} />
          </Claim>
        ) : order !== null ? (
          <Claim status="exact">
            <MathText text={tex`Référence exacte : $u=u_{${order}}$, en formule fermée ; $u_n$ en diffère par les modes $${n + 1}$ à $${order}$.`} />
          </Claim>
        ) : t === 0 ? (
          <Claim status="exact">
            <MathText text={tex`À $t=0$, la référence est $u_0$ lui-même ; $\|P_nu_0-u_0\|_H^2=\|u_0\|_H^2-\sum_{k\le n}b_k^2$ par Parseval, avec $\|u_0\|_H^2$ exact.`} />
          </Claim>
        ) : (
          <Claim status="numerique">
            <MathText
              text={tex`Référence tronquée à $K=${REFERENCE_ORDER}$ modes. Majorant : $\sum_{k>K}b_k^2\le${sciTex(tail.bound)}$, donc $\|u(t)-u_K(t)\|_H^2\le e^{-2\lambda_{K+1}t}\sum_{k>K}b_k^2${tail.refined < 1e-300 ? '<10^{-300}' : `\\le${sciTex(tail.refined)}`}$.`}
            />
          </Claim>
        )}
        <Claim status="demontre">{solvedTitles.length ? `Établi : ${solvedTitles.join(', ')}.` : 'Rien n’est encore démontré : ces tracés sont des calculs, pas des preuves.'}</Claim>
      </div>
    </Panel>
  );
}

function Enonce() {
  return (
    <Panel title="Énoncé visé" className="min-w-0">
      <div className="space-y-2.5 text-[13.5px]">
        <p>
          <MathText text={tex`Données : $u_0\in H=L^2(]0,1[)$ et $f\in L^2(0,T;V')$, avec $V=H^1_0(]0,1[)$ ; ici $T=1$.`} />
        </p>
        <p>
          <MathText text={tex`Trouver $u\in L^2(0,T;V)$, avec $u'\in L^2(0,T;V')$, tel que $\langle u'(t),v\rangle_{V',V}+(u(t),v)_V=\langle f(t),v\rangle_{V',V}$ pour tout $v\in V$ et presque tout $t$, et $u(0)=u_0$.`} />
        </p>
        <p>
          <MathText text={tex`Approximation : $V_n=\mathrm{Vect}(\varphi_1,\dots,\varphi_n)$, $\varphi_k=\sqrt2\sin(k\pi x)$, $\lambda_k=(k\pi)^2$, $u_n=\sum_{k\le n}c_k(t)\varphi_k$, $u_n(0)=P_nu_0$.`} />
        </p>
        <div>
          <p className="text-text-2">
            <MathText text={tex`Estimation a priori, pour tout $t\in[0,T]$ :`} />
          </p>
          <Tex block>{String.raw`\|u_n(t)\|_H^2+\int_0^t\|u_n\|_V^2\le\|P_nu_0\|_H^2+\int_0^t\|f\|_{V'}^2`}</Tex>
          <p className="text-text-2">
            <MathText text={tex`d'où $\sup_t\|u_n(t)\|_H^2+\int_0^T\|u_n\|_V^2\le2\big(\|u_0\|_H^2+\|f\|_{L^2(0,T;V')}^2\big)$.`} />
          </p>
        </div>
        <aside className="rounded-md border border-line px-3 py-2 text-[12.5px] text-text-2" style={{ borderLeft: '3px solid var(--st-miss)' }} aria-label="Écart avec le polycopié">
          <p className="mb-0.5 font-mono text-[10.5px] uppercase tracking-wider" style={{ color: 'var(--st-miss)' }}>
            Écart avec le polycopié
          </p>
          <MathText
            text={tex`Le polycopié (§ 8.1 et 8.3, p. 27–28, PDF 31–32) écrit $\sup_t\|u\|_H^2+\int_0^T\|u\|_V^2\le\|u_0\|_H^2+\|f\|_{L^2(0,T;V')}^2$ : c'est faux tel quel. Pour $f=0$ et $u_0=\varphi_1$, le membre de gauche vaut $1+\frac12(1-e^{-2\pi^2T})>1$. Le calcul ne donne l'inégalité que pour chaque $t$ ; passer au supremum coûte un facteur $2$.`}
          />
        </aside>
      </div>
    </Panel>
  );
}

/* ───────────── Visualisations ───────────── */

function VizCard({ step, index, solved, current, onOpen, children }: { step: GalerkinStep; index: number; solved: boolean[]; current: boolean; onOpen: (i: number) => void; children: ReactNode }) {
  const unlocked = solved[index];
  const open = index === 0 || solved[index - 1];
  return (
    <section
      id={`galerkin-viz-${step.n}`}
      tabIndex={-1}
      aria-labelledby={`galerkin-viz-${step.n}-titre`}
      data-testid={`viz-${step.n}`}
      data-state={unlocked ? 'debloquee' : 'verrouillee'}
      className={cx('min-w-0 scroll-mt-28 rounded-lg border bg-surface p-4 outline-none', current ? 'border-accent' : 'border-line', !unlocked && 'border-dashed')}
    >
      <header className="mb-2.5 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <h3 id={`galerkin-viz-${step.n}-titre`} className="font-serif text-[17px] leading-snug">
          <span className="mr-2 font-mono text-[11px] text-text-3">Étape {step.n}</span>
          <MathText text={step.vizTitle} />
        </h3>
        <span className="font-mono text-[11px]" style={{ color: unlocked ? 'var(--st-proved)' : 'var(--text-3)' }}>
          {unlocked ? '✓ Débloquée' : '· Verrouillée'}
        </span>
      </header>
      {unlocked ? (
        children
      ) : (
        <div className="space-y-2 text-[13.5px]">
          <p>
            <span className="text-text-3">À démontrer : </span>
            <MathText text={step.claim} />
          </p>
          {open ? (
            <Button variant="outline" onClick={() => onOpen(index)}>
              Démontrer l’étape {step.n}
            </Button>
          ) : (
            <p className="text-[12.5px] text-text-3">Accessible après l’étape {step.n - 1}.</p>
          )}
        </div>
      )}
    </section>
  );
}

const TEST_V = [
  { id: 'phi1', label: tex`$v=\varphi_1$`, inV: true, v: (x: number) => phi(1, x), dv: (x: number) => Math.SQRT2 * Math.PI * Math.cos(Math.PI * x) },
  { id: 'poly', label: tex`$v=x(1-x)$`, inV: true, v: (x: number) => x * (1 - x), dv: (x: number) => 1 - 2 * x },
  { id: 'un', label: tex`$v=1\notin V$`, inV: false, v: () => 1, dv: () => 0 },
];

/** 1. Formulation faible et terme de bord. */
function VizWeak({ ctx }: { ctx: Ctx }) {
  const [vid, setVid] = useState('poly');
  const test = TEST_V.find((o) => o.id === vid) ?? TEST_V[0];
  const r = useMemo(() => {
    const c = coefs(ctx.n, ctx.t, ctx.init, ctx.f);
    const dx = (x: number) => c.reduce((s, ck, i) => s + ck * Math.SQRT2 * (i + 1) * Math.PI * Math.cos((i + 1) * Math.PI * x), 0);
    const minusDxx = (x: number) => c.reduce((s, ck, i) => s + ck * lambda(i + 1) * phi(i + 1, x), 0);
    const A = simpson((x) => minusDxx(x) * test.v(x), 1, 1000);
    const B = simpson((x) => dx(x) * test.dv(x), 1, 1000);
    return { A, B, bord: dx(1) * test.v(1) - dx(0) * test.v(0) };
  }, [ctx, test]);
  const scale = Math.max(Math.abs(r.A), Math.abs(r.B), Math.abs(r.bord));
  const zero = Math.abs(r.bord) <= 1e-9 * scale;
  return (
    <div className="space-y-3 text-[13.5px]">
      <Tex block>{String.raw`\langle\partial_tu(t),v\rangle_{V',V}+\int_0^1\partial_xu(t,x)\,v'(x)\,dx=\langle f(t),v\rangle_{V',V}\qquad\forall v\in V`}</Tex>
      <p className="text-text-2">
        <MathText text={tex`pour presque tout $t\in]0,T[$, ici avec $${ctx.f.label}$. Le passage à cette forme est une intégration par parties ; son terme de bord, pour $u_n(t,\cdot)$ :`} />
      </p>
      <div className="flex flex-wrap gap-1.5" role="group" aria-label="Fonction test v">
        {TEST_V.map((o) => (
          <Button key={o.id} variant={vid === o.id ? 'primary' : 'outline'} aria-pressed={vid === o.id} onClick={() => setVid(o.id)}>
            <MathText text={o.label} />
          </Button>
        ))}
      </div>
      <dl className="grid gap-x-6 gap-y-1 sm:grid-cols-3">
        <Row label={tex`$-\int_0^1\partial_{xx}u_n\,v$`} value={sci(r.A, 4)} />
        <Row label={tex`$\int_0^1\partial_xu_n\,v'$`} value={sci(r.B, 4)} />
        <Row label={tex`$\big[\partial_xu_n\,v\big]_0^1$`} value={zero ? '0' : sci(r.bord, 4)} />
      </dl>
      <p className={zero ? 'text-text-2' : 'text-miss'}>
        {test.inV ? (
          <MathText text={tex`$v\in V$ s'annule au bord : le terme de bord est nul et les deux intégrales coïncident. C'est $v$, et non $u_n$, qui l'annule.`} />
        ) : (
          <MathText text={tex`$v\notin V$ : le terme de bord ne s'annule pas, alors que $u_n$ s'annule au bord ; les deux intégrales diffèrent exactement de ce terme.`} />
        )}
      </p>
      <div className="space-y-1">
        <Claim status="numerique">Intégrales par la méthode de Simpson, 1000 sous-intervalles.</Claim>
        <Claim status="demontre">Formulation faible : étape 1.</Claim>
      </div>
    </div>
  );
}

/** 2. Triplet V ↪ H ↪ V′ et les trois normes de u_n(t). */
function VizTriplet({ ctx }: { ctx: Ctx }) {
  const nm = useMemo(() => {
    let v = 0;
    let h = 0;
    let d = 0;
    coefs(ctx.n, ctx.t, ctx.init, ctx.f).forEach((c, i) => {
      const l = lambda(i + 1);
      v += l * c * c;
      h += c * c;
      d += (c * c) / l;
    });
    return { V: Math.sqrt(v), H: Math.sqrt(h), D: Math.sqrt(d) };
  }, [ctx]);
  const boxes = [
    { space: String.raw`V=H^1_0(]0,1[)`, note: String.raw`(u,v)_V=\textstyle\int_0^1u'v'`, norm: String.raw`\|u_n(t)\|_V`, value: nm.V },
    { space: String.raw`H=L^2(]0,1[)`, note: String.raw`H'\equiv H\ \text{(Riesz)}`, norm: String.raw`\|u_n(t)\|_H`, value: nm.H },
    { space: String.raw`V'=H^{-1}(]0,1[)`, note: String.raw`\langle h,v\rangle=(h,v)_H,\ h\in H`, norm: String.raw`\|u_n(t)\|_{V'}`, value: nm.D },
  ];
  const ok = Math.PI * nm.D <= nm.H * (1 + 1e-12) && nm.H <= (nm.V / Math.PI) * (1 + 1e-12);
  return (
    <div className="space-y-3 text-[13.5px]">
      <div className="flex flex-col items-stretch gap-2 sm:flex-row">
        {boxes.map((b, i) => (
          <Fragment key={b.space}>
            {i > 0 && (
              <span className="rotate-90 self-center text-text-3 sm:rotate-0" aria-hidden>
                <Tex>{String.raw`\hookrightarrow`}</Tex>
              </span>
            )}
            <div className="min-w-0 flex-1 rounded-md border border-line bg-surface-2 p-2.5 text-center">
              <div className="text-[14px]">
                <Tex>{b.space}</Tex>
              </div>
              <div className="mt-1 text-[12px] text-text-3">
                <Tex>{b.note}</Tex>
              </div>
              <div className="mt-1.5">
                <Tex>{b.norm}</Tex> <span className="font-mono tabular">= {sci(b.value, 4)}</span>
              </div>
            </div>
          </Fragment>
        ))}
      </div>
      <p>
        <MathText text={tex`Injections : $\pi\|h\|_{V'}\le\|h\|_H\le\pi^{-1}\|h\|_V$ (Poincaré, puis dualité). Pour $h=u_n(t)$ : $${sciTex(Math.PI * nm.D, 3)}\le${sciTex(nm.H, 3)}\le${sciTex(nm.V / Math.PI, 3)}$`} />{' '}
        <span className={ok ? 'text-hyp' : 'text-invalid'}>{ok ? '(vérifié)' : '(contredit)'}</span>.
      </p>
      {ctx.init.id === 'constante' && ctx.t === 0 && (
        <p className="text-miss">
          <MathText text={tex`$u_0=1\notin V$ : $\|P_nu_0\|_V^2=8\lceil n/2\rceil$ tend vers l'infini ; $P_nu_0\to u_0$ dans $H$ seulement.`} />
        </p>
      )}
      <div className="space-y-1">
        <Claim status="exact">
          <MathText text={tex`Normes spectrales : $\|v\|_V^2=\sum\lambda_kc_k^2$, $\|v\|_H^2=\sum c_k^2$, $\|v\|_{V'}^2=\sum c_k^2/\lambda_k$, sommes finies.`} />
        </Claim>
        <Claim status="demontre">Triplet et identification de H à son dual : étape 2.</Claim>
      </div>
    </div>
  );
}

/** 3. Les fonctions φ_k et le système diagonal. */
function VizBasis({ ctx }: { ctx: Ctx }) {
  const m = Math.min(ctx.n, 4);
  const series = useMemo<Series[]>(
    () => Array.from({ length: m }, (_, i) => ({ id: `phi${i + 1}`, points: sample((x) => phi(i + 1, x), 0, 1, 200), color: PALETTE[i], dash: DASHES[i], label: tex`$\varphi_{${i + 1}}$` })),
    [m],
  );
  const rows = Array.from({ length: Math.min(ctx.n, 6) }, (_, i) => i + 1);
  return (
    <div className="space-y-3 text-[13.5px]">
      <Chart label="Premières fonctions propres φ_k" xd={X01} yd={[-1.6, 1.6]} x={X_TICKS} xTitle="x" series={series} height={220} />
      <Tex block>{String.raw`c_k'(t)+\lambda_k\,c_k(t)=f_k(t),\qquad c_k(0)=b_k=(u_0,\varphi_k)_H,\qquad 1\le k\le ` + String(ctx.n)}</Tex>
      <div className="overflow-x-auto">
        <table className="w-full text-[12.5px] tabular">
          <thead>
            <tr className="text-left text-text-3">
              <th className="py-1 pr-3 font-normal">
                <Tex>k</Tex>
              </th>
              <th className="py-1 pr-3 font-normal">
                <Tex>{String.raw`\lambda_k=k^2\pi^2`}</Tex>
              </th>
              <th className="py-1 pr-3 font-normal">
                <Tex>b_k</Tex>
              </th>
              <th className="py-1 font-normal">
                <Tex>{String.raw`f_k(t)`}</Tex>
              </th>
            </tr>
          </thead>
          <tbody className="font-mono">
            {rows.map((k) => (
              <tr key={k} className="border-t border-line">
                <td className="py-1 pr-3">{k}</td>
                <td className="py-1 pr-3">
                  {k * k}π² ≈ {fr(lambda(k), 2)}
                </td>
                <td className="py-1 pr-3">{sci(ctx.init.coefficient(k), 4)}</td>
                <td className="py-1">{sci(ctx.f.coefficient(k, ctx.t), 4)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="space-y-1">
        <Claim status="exact">Coefficients en formule fermée.</Claim>
        <Claim status="demontre">Le problème approché équivaut à ce système diagonal : étape 3.</Claim>
      </div>
    </div>
  );
}

/** 4. Les courbes t ↦ c_k(t). */
function VizCoefs({ ctx }: { ctx: Ctx }) {
  const m = Math.min(ctx.n, 4);
  const { init, f } = ctx;
  const series = useMemo<Series[]>(
    () => Array.from({ length: m }, (_, i) => ({ id: `c${i + 1}`, points: sample((s) => coefficient(i + 1, s, init, f), 0, T, 200), color: PALETTE[i], dash: DASHES[i], label: tex`$c_{${i + 1}}(t)$` })),
    [m, init, f],
  );
  const yd = extent(series.flatMap((s) => s.points.map((p) => p[1])));
  return (
    <div className="space-y-3 text-[13.5px]">
      <Tex block>{String.raw`c_k(t)=e^{-\lambda_kt}\,b_k+\int_0^te^{-\lambda_k(t-s)}f_k(s)\,ds`}</Tex>
      <Chart
        label="Coefficients c_k en fonction du temps"
        xd={[0, T]}
        yd={yd}
        x={T_TICKS}
        xTitle="t"
        series={series}
        height={240}
        marks={(k) => (
          <>
            <Segment a={[ctx.t, yd[0] * k]} b={[ctx.t, yd[1] * k]} color="var(--text-3)" width={1} dash="3 4" />
            {series.map((s, i) => (
              <Dot key={s.id} x={ctx.t} y={coefficient(i + 1, ctx.t, init, f) * k} r={3.5} color={s.color} />
            ))}
          </>
        )}
      />
      <div className="space-y-1">
        <Claim status="exact">Formule fermée ; seule son évaluation est numérique.</Claim>
        <Claim status="demontre">Existence et unicité des coefficients sur [0, T] : étape 4.</Claim>
      </div>
    </div>
  );
}

/** 5. Vérification numérique de l'estimation a priori. */
function VizEstimate({ ctx, onCounterexample }: { ctx: Ctx; onCounterexample: () => void }) {
  const { n, init, f } = ctx;
  const grid = useMemo(
    () =>
      Array.from({ length: 31 }, (_, i) => {
        const s = (i / 30) * T;
        return { s, ...aPrioriEstimate(n, s, init, f) };
      }),
    [n, init, f],
  );
  const now = useMemo(() => aPrioriEstimate(n, ctx.t, init, f), [n, ctx.t, init, f]);
  const poly = useMemo(() => {
    let sup = 0;
    for (const g of grid) sup = Math.max(sup, normSq(n, g.s, init, f));
    return { left: sup + integralNormVSq(n, T, init, f), right: init.normSq + simpson(f.dualNormSq, T) };
  }, [grid, n, init, f]);
  const allHold = now.holds && grid.every((g) => g.holds);
  const series: Series[] = [
    { id: 'gauche', points: grid.map((g): Pt => [g.s, g.left]), color: 'var(--accent)', label: tex`$\|u_n(s)\|_H^2+\int_0^s\|u_n\|_V^2$` },
    { id: 'droite', points: grid.map((g): Pt => [g.s, g.right]), color: 'var(--st-hyp)', dash: '7 4', label: tex`$\|P_nu_0\|_H^2+\int_0^s\|f\|_{V'}^2$` },
  ];
  const yd = extent(series.flatMap((s) => s.points.map((p) => p[1])));
  const isCounterexample = init.id === 'mode1' && f.id === 'nul';
  return (
    <div className="space-y-3 text-[13.5px]">
      <Chart
        label="Les deux membres de l’estimation a priori en fonction du temps"
        xd={[0, T]}
        yd={yd}
        x={T_TICKS}
        xTitle="s"
        series={series}
        height={230}
        marks={(k) => <Segment a={[ctx.t, yd[0] * k]} b={[ctx.t, yd[1] * k]} color="var(--text-3)" width={1} dash="3 4" />}
      />
      <dl className="grid gap-x-6 gap-y-1 sm:grid-cols-2">
        <Row label={tex`gauche en $s=t$`} value={sci(now.left, 5)} />
        <Row label={tex`droite en $s=t$`} value={sci(now.right, 5)} />
      </dl>
      <p className={allHold ? 'text-text-2' : 'text-miss'}>
        {allHold
          ? 'Inégalité vérifiée aux 31 instants de la grille et en t.'
          : 'Écart en au moins un instant : l’inégalité étant démontrée, il provient de la quadrature.'}
      </p>
      <aside className="rounded-md border border-line px-3 py-2 text-[12.5px] text-text-2" style={{ borderLeft: '3px solid var(--st-miss)' }} aria-label="Forme du polycopié">
        <p className="mb-0.5 font-mono text-[10.5px] uppercase tracking-wider" style={{ color: 'var(--st-miss)' }}>
          Forme du polycopié, sur ces données
        </p>
        <p>
          <MathText text={tex`$\sup_t\|u_n\|_H^2+\int_0^T\|u_n\|_V^2\approx${sciTex(poly.left)}$ et $\|u_0\|_H^2+\|f\|_{L^2(0,T;V')}^2\approx${sciTex(poly.right)}$ : `} />
          {poly.left > poly.right ? 'l’inégalité du polycopié est violée.' : 'pas de contradiction sur ces données.'}
        </p>
        <p className="text-text-3">Supremum estimé sur la grille, donc minoré : une violation constatée est réelle.</p>
        {!isCounterexample && (
          <Button variant="ghost" className="mt-1 px-0" onClick={onCounterexample}>
            Charger le contre-exemple u₀ = φ₁, f = 0
          </Button>
        )}
      </aside>
      <div className="space-y-1">
        <Claim status="numerique">Quadrature de Simpson et grille de 31 instants : une vérification, pas une preuve.</Claim>
        <Claim status="demontre">L’estimation, pour tout t et tout n : étape 5.</Claim>
      </div>
    </div>
  );
}

/** 6. Coefficients en n et test contre une fonction fixée. */
function VizNested({ ctx }: { ctx: Ctx }) {
  const [psiId, setPsiId] = useState('parabole');
  const psi = INITIAL_DATA.find((d) => d.id === psiId) ?? INITIAL_DATA[0];
  const d = useMemo(() => {
    const finite = psi.modes ?? ctx.order;
    const K = finite ?? REFERENCE_ORDER;
    const c = coefs(Math.max(K, N_MAX), ctx.t, ctx.init, ctx.f);
    const partial: Pt[] = [];
    let s = 0;
    for (let k = 1; k <= N_MAX; k++) {
      s += c[k - 1] * psi.coefficient(k);
      partial.push([k, s]);
    }
    let limit = 0;
    for (let k = 1; k <= K; k++) limit += c[k - 1] * psi.coefficient(k);
    const tailU = ctx.t === 0 ? ctx.init.tailBound(REFERENCE_ORDER) : referenceTail(ctx.init, ctx.f, ctx.t).refined;
    const coefSeries: Series[] = [1, 2, 3].map((k, i) => ({
      id: `k${k}`,
      points: Array.from({ length: N_MAX }, (_, j): Pt => [j + 1, j + 1 >= k ? c[k - 1] : 0]),
      color: PALETTE[i],
      dash: DASHES[i],
      label: tex`$c^{(n)}_{${k}}(t)$`,
    }));
    return { partial, limit, exact: finite != null, err: Math.sqrt(tailU * psi.tailBound(REFERENCE_ORDER)), coefSeries };
  }, [ctx, psi]);
  const xd: Pt = [0.5, N_MAX + 0.5];
  const cyd = extent(d.coefSeries.flatMap((s) => s.points.map((p) => p[1])));
  const pyd = extent([...d.partial.map((p) => p[1]), d.limit]);
  return (
    <div className="space-y-3 text-[13.5px]">
      <Chart label="Coefficient de φ_k dans u_n en fonction de n" xd={xd} yd={cyd} x={N_TICKS} xTitle="n" series={d.coefSeries} height={200} />
      <p className="text-text-2">
        <MathText text={tex`Base spectrale : $c^{(n)}_k(t)=c_k(t)$ dès que $n\ge k$, car le système est diagonal. Les approximations sont emboîtées ; dans une base quelconque, ces courbes bougeraient avec $n$.`} />
      </p>
      <div className="flex flex-wrap gap-1.5" role="group" aria-label="Fonction test fixée">
        {INITIAL_DATA.map((o) => (
          <Button key={o.id} variant={psiId === o.id ? 'primary' : 'outline'} aria-pressed={psiId === o.id} onClick={() => setPsiId(o.id)}>
            <MathText text={PSI_LABEL[o.id] ?? o.id} />
          </Button>
        ))}
      </div>
      <Chart
        label="Test contre une fonction fixée en fonction de n"
        xd={xd}
        yd={pyd}
        x={N_TICKS}
        xTitle="n"
        series={[
          { id: 'test', points: d.partial, color: 'var(--accent)', label: tex`$(u_n(t),\psi)_H$`, dots: true, width: 1.2 },
          { id: 'lim', points: [[xd[0], d.limit], [xd[1], d.limit]], color: d.exact ? 'var(--st-hyp)' : 'var(--st-miss)', dash: '7 4', label: tex`$(u(t),\psi)_H$` },
        ]}
        height={220}
      />
      <div className="space-y-1">
        {d.exact ? (
          <Claim status="exact">Limite en somme finie : la donnée ou la fonction test n’a qu’un nombre fini de modes.</Claim>
        ) : (
          <Claim status="numerique">
            <MathText text={tex`Limite tronquée à $K=${REFERENCE_ORDER}$ ; erreur $\le${sciTex(d.err)}$ (Cauchy–Schwarz sur les restes).`} />
          </Claim>
        )}
        <Claim status="demontre">Convergence faible d’une sous-suite : étape 6.</Claim>
      </div>
    </div>
  );
}

/** 7. ‖u_n(t) − u(t)‖_H en fonction de n. */
function VizError({ ctx }: { ctx: Ctx }) {
  const { t, init, f, order } = ctx;
  const pts = useMemo(
    () =>
      Array.from({ length: N_MAX }, (_, i) => {
        const m = i + 1;
        const sq = t === 0 ? Math.max(0, init.normSq - partialSq(init, m)) : differenceSq(m, t, init, f);
        return { n: m, e: Math.sqrt(sq) };
      }),
    [t, init, f],
  );
  const tail = referenceTail(init, f, t);
  return (
    <div className="space-y-3 text-[13.5px]">
      <LogPlot label="Écart entre u_n et u à l’instant t, en fonction de n, échelles logarithmiques" points={pts} current={ctx.n} color="var(--st-access)" yTitle="‖uₙ(t) − u(t)‖_H" />
      <p>
        <MathText text={tex`Pour $n=${ctx.n}$ : $\|u_n(t)-u(t)\|_H=${sciTex(pts[ctx.n - 1].e, 3)}$. Cercles vides : valeur nulle ou sous le bas de l'échelle.`} />
      </p>
      <p className="text-text-2">
        <MathText text={tex`Ici $\|u_n(t)-u(t)\|_H^2=\sum_{k>n}c_k(t)^2$ : convergence forte à chaque instant, propre au cas linéaire à base spectrale. La preuve générale n'en a pas besoin : la convergence faible suffit à identifier la limite (étape 7).`} />
      </p>
      <div className="space-y-1">
        {order !== null ? (
          <Claim status="exact">
            <MathText text={tex`Données à modes finis : écart nul dès $n\ge${order}$.`} />
          </Claim>
        ) : t === 0 ? (
          <Claim status="exact">Parseval, avec la norme exacte de u₀.</Claim>
        ) : (
          <Claim status="numerique">
            <MathText text={tex`Somme tronquée à $K=${REFERENCE_ORDER}$ ; reste au carré $\le${tail.refined < 1e-300 ? '10^{-300}' : sciTex(tail.refined)}$.`} />
          </Claim>
        )}
        <Claim status="demontre">Aubin–Lions s’applique, sans être indispensable ici : étape 7.</Claim>
      </div>
    </div>
  );
}

/** 8. Résidu de la formulation faible sur V_n. */
function VizResidual({ ctx }: { ctx: Ctx }) {
  const d = useMemo(() => {
    const rows: { j: number; d: number; s: number; fj: number; r: number }[] = [];
    let maxR = 0;
    let scale = 0;
    for (let j = 1; j <= ctx.n; j++) {
      const s = lambda(j) * coefficient(j, ctx.t, ctx.init, ctx.f);
      const dj = dcoef(j, ctx.t, ctx.init, ctx.f);
      const fj = ctx.f.coefficient(j, ctx.t);
      const r = dj + s - fj;
      maxR = Math.max(maxR, Math.abs(r));
      scale = Math.max(scale, Math.abs(dj), Math.abs(s), Math.abs(fj));
      if (j <= 5) rows.push({ j, d: dj, s, fj, r });
    }
    const top = Math.max(ctx.n, ctx.f.modes ?? REFERENCE_ORDER);
    let dual = 0;
    for (let j = ctx.n + 1; j <= top; j++) dual += ctx.f.coefficient(j, ctx.t) ** 2 / lambda(j);
    return { rows, maxR, scale, dual: Math.sqrt(dual), next: ctx.f.coefficient(ctx.n + 1, ctx.t) };
  }, [ctx]);
  const th = 'py-1 pr-3 font-normal';
  return (
    <div className="space-y-3 text-[13.5px]">
      <p className="text-text-2">
        <MathText text={tex`Résidu $R_n(t)=u_n'-\partial_{xx}u_n-f\in V'$, testé sur la base : $r_j(t)=\langle u_n',\varphi_j\rangle+(u_n,\varphi_j)_V-\langle f,\varphi_j\rangle$.`} />
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-[12.5px] tabular">
          <thead>
            <tr className="text-left text-text-3">
              <th className={th}>
                <Tex>j</Tex>
              </th>
              <th className={th}>
                <Tex>{String.raw`\langle u_n',\varphi_j\rangle`}</Tex>
              </th>
              <th className={th}>
                <Tex>{String.raw`\lambda_jc_j`}</Tex>
              </th>
              <th className={th}>
                <Tex>{String.raw`f_j(t)`}</Tex>
              </th>
              <th className="py-1 font-normal">
                <Tex>{String.raw`r_j(t)`}</Tex>
              </th>
            </tr>
          </thead>
          <tbody className="font-mono">
            {d.rows.map((row) => (
              <tr key={row.j} className="border-t border-line">
                <td className="py-1 pr-3">{row.j}</td>
                <td className="py-1 pr-3">{sci(row.d, 4)}</td>
                <td className="py-1 pr-3">{sci(row.s, 4)}</td>
                <td className="py-1 pr-3">{sci(row.fj, 4)}</td>
                <td className="py-1">{sci(row.r, 2)}</td>
              </tr>
            ))}
            <tr className="border-t border-line text-text-3">
              <td className="py-1 pr-3">{ctx.n + 1}</td>
              <td className="py-1 pr-3">0</td>
              <td className="py-1 pr-3">0</td>
              <td className="py-1 pr-3">{sci(d.next, 4)}</td>
              <td className="py-1">{sci(-d.next, 4)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        <MathText text={tex`Sur $V_n$ : $r_j(t)=0$ pour $j\le n$ par construction. Contrôle : $\max_{j\le n}|r_j(t)|\approx${sciTex(d.maxR)}$, pour des termes d'ordre $${sciTex(d.scale)}$. Hors de $V_n$ : $r_j(t)=-f_j(t)$, et $\|R_n(t)\|_{V'}=${sciTex(d.dual, 3)}$.`} />
      </p>
      <p className="text-text-2">
        <MathText text={tex`Pour $v\in V_m$ fixé, le résidu testé par $v$ est nul dès que $n\ge m$ : c'est ce qui fait passer l'équation à la limite.`} />
      </p>
      <div className="space-y-1">
        <Claim status="numerique">Dérivées par différence finie sur la formule exacte : contrôle, pas preuve.</Claim>
        <Claim status="exact">
          <MathText text={tex`$\|R_n(t)\|_{V'}^2=\sum_{j>n}f_j(t)^2/\lambda_j$.`} />
        </Claim>
        <Claim status="demontre">Passage à la limite dans la formulation faible : étape 8.</Claim>
      </div>
    </div>
  );
}

/** 9. ‖P_n u₀ − u₀‖_H en fonction de n. */
function VizInitial({ ctx }: { ctx: Ctx }) {
  const { init } = ctx;
  const pts = useMemo(() => Array.from({ length: N_MAX }, (_, i) => ({ n: i + 1, e: Math.sqrt(Math.max(0, init.normSq - partialSq(init, i + 1))) })), [init]);
  const e20 = pts[19].e;
  const e40 = pts[39].e;
  const slope = e20 > 0 && e40 > 0 ? Math.log10(e40 / e20) / Math.log10(2) : null;
  return (
    <div className="space-y-3 text-[13.5px]">
      <LogPlot label="Écart entre la donnée initiale projetée et la donnée initiale, en fonction de n, échelles logarithmiques" points={pts} current={ctx.n} color="var(--st-miss)" yTitle="‖Pₙu₀ − u₀‖_H" />
      <p>
        <MathText text={tex`Pour $n=${ctx.n}$ : $\|P_nu_0-u_0\|_H=${sciTex(pts[ctx.n - 1].e, 3)}$.`} />{' '}
        {slope !== null ? `Pente observée entre n = 20 et n = 40 : ${fr(slope, 2)}.` : 'Écart nul dès que n atteint le dernier mode de u₀.'}
      </p>
      <p className="text-text-2">
        {init.id === 'constante' ? (
          <MathText text={tex`$u_0=1\notin V$ : convergence dans $H$ seulement, en $n^{-1/2}$ ; aucune convergence dans $V$.`} />
        ) : (
          <MathText text={tex`$u_n(0)=P_nu_0\to u_0$ dans $H$, et $(P_nu_0,\varphi_k)_H=(u_0,\varphi_k)_H$ dès que $n\ge k$ : c'est ce qui identifie $u(0)$.`} />
        )}
      </p>
      <div className="space-y-1">
        <Claim status="exact">
          <MathText text={tex`Parseval : $\|P_nu_0-u_0\|_H^2=\|u_0\|_H^2-\sum_{k\le n}b_k^2$, avec $\|u_0\|_H^2$ exact.`} />
        </Claim>
        {slope !== null && <Claim status="numerique">Pente estimée sur deux points.</Claim>}
        <Claim status="demontre">u(0) = u₀ dans H : étape 9.</Claim>
      </div>
    </div>
  );
}

/** 10. Bilan final. */
function VizBilan() {
  const items: { label: string; text: string; steps: string }[] = [
    { label: 'Existence', text: tex`limite faible $u$ des $u_n$, solution de la formulation faible`, steps: 'étapes 1 à 6 et 8' },
    { label: 'Condition initiale', text: tex`$u\in C([0,T];H)$ et $u(0)=u_0$, par Lions–Magenes`, steps: 'étape 9' },
    { label: 'Unicité', text: tex`test par $w(t)$ ; par suite, toute la suite $(u_n)$ converge faiblement, et non seulement une sous-suite`, steps: 'étape 10' },
    { label: 'Estimation', text: tex`démontrée pour $u_n$ ; pour $u$, même calcul grâce à Lions–Magenes, non rejoué ici`, steps: 'étape 5' },
    { label: 'Compacité', text: tex`Aubin–Lions s'applique, mais le cas linéaire n'en a pas besoin`, steps: 'étape 7' },
  ];
  return (
    <div className="space-y-3 text-[13.5px]">
      <div className="rounded-md border border-line bg-surface-2 p-3" style={{ borderLeft: '3px solid var(--st-proved)' }}>
        <p className="mb-1 font-mono text-[10.5px] uppercase tracking-wider" style={{ color: 'var(--st-proved)' }}>
          Théorème démontré
        </p>
        <MathText text={tex`Pour $u_0\in H$ et $f\in L^2(0,T;V')$, le problème parabolique de Dirichlet admet une unique solution faible $u\in L^2(0,T;V)\cap C([0,T];H)$, avec $u'\in L^2(0,T;V')$ et $u(0)=u_0$.`} />
      </div>
      <ul className="space-y-1.5">
        {items.map((it) => (
          <li key={it.label} className="flex gap-2">
            <span aria-hidden style={{ color: 'var(--st-proved)' }}>
              ✓
            </span>
            <span>
              <span className="font-medium">{it.label}</span> : <MathText text={it.text} /> <span className="text-text-3">({it.steps})</span>
            </span>
          </li>
        ))}
      </ul>
      <p className="text-text-2">Admis, sans démonstration ici : Rellich–Kondrachov, Lions–Magenes, l’extraction faible en espace réflexif, Aubin–Lions. La base spectrale est explicite.</p>
      <div className="space-y-1">
        <Claim status="demontre">Les dix étapes.</Claim>
        <Claim status="numerique">Les visualisations illustrent et contrôlent ; elles ne démontrent rien.</Claim>
      </div>
    </div>
  );
}

/* ───────────── Page ───────────── */

export function GalerkinLab() {
  const keys = useLabKeys(LAB);
  const solved = GALERKIN_STEPS.map((s) => keys.has(s.key));
  const [selected, setSelected] = useState(() => {
    const i = solved.findIndex((x) => !x);
    return i === -1 ? GALERKIN_STEPS.length - 1 : i;
  });
  const [initId, setInitId] = useState('parabole');
  const [forceId, setForceId] = useState('nul');
  const [n, setN] = useState(6);
  const [t, setT] = useState(0.02);

  const init = INITIAL_DATA.find((d) => d.id === initId) ?? INITIAL_DATA[0];
  const f = FORCINGS.find((x) => x.id === forceId) ?? FORCINGS[0];
  const ctx = useMemo<Ctx>(() => ({ init, f, n, t, order: exactOrder(init, f) }), [init, f, n, t]);
  const solvedTitles = GALERKIN_STEPS.filter((_, i) => solved[i]).map((s) => s.title);

  const goToStep = (i: number) => {
    setSelected(i);
    requestAnimationFrame(() => {
      const h = document.getElementById('galerkin-etape-titre');
      h?.scrollIntoView?.({ behavior: 'smooth', block: 'start' });
      h?.focus({ preventScroll: true });
    });
  };
  const showViz = (i: number) => {
    const el = document.getElementById(`galerkin-viz-${i + 1}`);
    el?.scrollIntoView?.({ behavior: 'smooth', block: 'start' });
    el?.focus({ preventScroll: true });
  };

  const viz = (i: number): ReactNode => {
    switch (i) {
      case 0:
        return <VizWeak ctx={ctx} />;
      case 1:
        return <VizTriplet ctx={ctx} />;
      case 2:
        return <VizBasis ctx={ctx} />;
      case 3:
        return <VizCoefs ctx={ctx} />;
      case 4:
        return (
          <VizEstimate
            ctx={ctx}
            onCounterexample={() => {
              setInitId('mode1');
              setForceId('nul');
            }}
          />
        );
      case 5:
        return <VizNested ctx={ctx} />;
      case 6:
        return <VizError ctx={ctx} />;
      case 7:
        return <VizResidual ctx={ctx} />;
      case 8:
        return <VizInitial ctx={ctx} />;
      default:
        return <VizBilan />;
    }
  };

  return (
    <LabShell eyebrow="E" title="Méthode de Galerkin" intro={<MathText text={INTRO} />}>
      <Frise solved={solved} selected={selected} onSelect={setSelected} />
      <StepSection index={selected} solved={solved} onSelect={goToStep} onShowViz={showViz} />

      <div>
        <ControlBar initId={initId} onInit={setInitId} forceId={forceId} onForce={setForceId} n={n} onN={setN} t={t} onT={setT} />

        <section aria-labelledby="galerkin-exploration" className="mt-5">
          <h2 id="galerkin-exploration" className="mb-3 font-serif text-xl">
            Exploration
          </h2>
          <div className="grid gap-4 xl:grid-cols-[minmax(0,1.6fr)_minmax(300px,1fr)]">
            <Exploration ctx={ctx} solvedTitles={solvedTitles} />
            <Enonce />
          </div>
        </section>

        <section aria-labelledby="galerkin-visualisations" className="mt-8">
          <h2 id="galerkin-visualisations" className="font-serif text-xl">
            Visualisations
          </h2>
          <p className="mb-3 mt-0.5 text-sm text-text-2">Chaque étape démontrée en déverrouille une ; toutes suivent les paramètres de la barre ci-dessus.</p>
          <div className="grid gap-4 xl:grid-cols-2">
            {GALERKIN_STEPS.map((s, i) => (
              <VizCard key={s.key} step={s} index={i} solved={solved} current={i === selected} onOpen={goToStep}>
                {viz(i)}
              </VizCard>
            ))}
          </div>
        </section>
        <section className="mt-6" aria-labelledby="g2-titre">
          <h2 id="g2-titre" className="font-serif text-xl mb-1">Galerkin en dimension spatiale 2</h2>
          <p className="mb-3 mt-0.5 text-sm text-text-2">Le même schéma sur le carré : surface, coupes, termes individuels, comparaison de deux rangs, écarts exacts par Parseval.</p>
          <Galerkin2DStudio proofComplete={solved.every(Boolean)} />
        </section>
      </div>
    </LabShell>
  );
}
