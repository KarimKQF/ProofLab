/**
 * Vues 2D du laboratoire « Sobolev et traces ». Toutes reçoivent la même grille et le
 * même état (exemple, t, x₀, y₀) : niveaux, coupes, traces et formules décrivent un seul objet.
 */
import { useMemo } from 'react';
import { contour, levels, sliceAtX, sliceAtY, type Grid } from '@/core/visual-reasoning/sections';
import { SIDES, SOBOLEV_EXAMPLES, type Side } from '@/core/visual-reasoning/surfaces';
import { boundaryValues, derivativeError, traceProfile, type SobolevState } from '@/core/visual-reasoning/sobolev-scene';
import { fmt } from '@/core/visual-reasoning/types';
import { Claim, Curve, Dot, MathText, Plot, Segment, usePlot } from '@/labs/kit';
import { useGame } from '@/storage/store';

export const SIDE_COLOR: Record<Side, string> = { bas: '#d95926', droite: '#199e70', haut: '#3987e5', gauche: '#9085e9' };

/** Image de la grille (échelle divergente, zéro au centre), pour le fond de la carte des niveaux. */
function useGridImage(grid: Grid): string | null {
  const theme = useGame((s) => s.save.settings.theme);
  return useMemo(() => {
    if (typeof document === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = grid.nx;
    canvas.height = grid.ny;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    const css = getComputedStyle(document.documentElement);
    const rgb = (name: string, fallback: number[]) => {
      const hex = css.getPropertyValue(name).trim().replace('#', '');
      return /^[0-9a-f]{6}$/i.test(hex) ? [0, 2, 4].map((k) => parseInt(hex.slice(k, k + 2), 16)) : fallback;
    };
    const neutral = rgb('--surface', theme === 'light' ? [255, 255, 255] : [17, 21, 29]);
    const neg = rgb('--div-neg', [57, 135, 229]);
    const pos = rgb('--div-pos', [217, 89, 38]);
    const span = Math.max(Math.abs(grid.min), Math.abs(grid.max)) || 1;
    const img = ctx.createImageData(grid.nx, grid.ny);
    for (let j = 0; j < grid.ny; j++) {
      for (let i = 0; i < grid.nx; i++) {
        const t = Math.max(-1, Math.min(1, grid.values[j]![i]! / span));
        const c = t >= 0 ? neutral.map((v, k) => Math.round(v + (pos[k]! - v) * t)) : neutral.map((v, k) => Math.round(v + (neg[k]! - v) * -t));
        const o = ((grid.ny - 1 - j) * grid.nx + i) * 4;
        img.data[o] = c[0]!;
        img.data[o + 1] = c[1]!;
        img.data[o + 2] = c[2]!;
        img.data[o + 3] = 255;
      }
    }
    ctx.putImageData(img, 0, 0);
    return canvas.toDataURL();
  }, [grid, theme]);
}

function GridImage({ grid }: { grid: Grid }) {
  const { sx, sy } = usePlot();
  const href = useGridImage(grid);
  if (!href) return null;
  return <image href={href} x={sx(0)} y={sy(1)} width={sx(1) - sx(0)} height={sy(0) - sy(1)} preserveAspectRatio="none" style={{ imageRendering: 'pixelated' }} />;
}

function Contours({ grid, count = 9 }: { grid: Grid; count?: number }) {
  const { sx, sy } = usePlot();
  const segs = useMemo(() => levels(grid, count).flatMap((c) => contour(grid, c)), [grid, count]);
  return (
    <g data-contours={segs.length}>
      {segs.map(([a, b], i) => (
        <line key={i} x1={sx(a[0])} y1={sy(a[1])} x2={sx(b[0])} y2={sy(b[1])} stroke="var(--text)" strokeOpacity={0.55} strokeWidth={0.9} />
      ))}
    </g>
  );
}

/** Carte des niveaux : fond coloré, courbes de niveau, bord coloré par côté, coupes, gradient au point. */
export function LevelMap({ grid, state, grad, highlight }: { grid: Grid; state: { x0: number; y0: number } | null; grad: [number, number] | null; highlight: Side | null }) {
  const unit = 0.18;
  const gn = grad ? Math.hypot(grad[0], grad[1]) : 0;
  const arrow = state && grad && gn > 1e-9 ? ([state.x0 + (unit * grad[0]) / gn, state.y0 + (unit * grad[1]) / gn] as [number, number]) : null;
  return (
    <div data-testid="level-map">
      <Plot xDomain={[-0.06, 1.06]} yDomain={[-0.06, 1.06]} width={520} height={520} ariaLabel="Carte des niveaux de u sur le carré, bord coloré par côté, coupes et gradient">
        <GridImage grid={grid} />
        <Contours grid={grid} />
        {SIDES.map((sd) => {
          const a = sd.param(0);
          const b = sd.param(1);
          return <Segment key={sd.id} a={a} b={b} color={SIDE_COLOR[sd.id]} width={highlight === sd.id ? 5 : 3} />;
        })}
        {state && (
          <>
            <Segment a={[state.x0, 0]} b={[state.x0, 1]} color="var(--st-miss)" width={1} dash="4 4" />
            <Segment a={[0, state.y0]} b={[1, state.y0]} color="var(--st-miss)" width={1} dash="4 4" />
            {arrow && <Segment a={[state.x0, state.y0]} b={arrow} color="var(--text)" width={2} arrow />}
            <Dot x={state.x0} y={state.y0} r={4} color="var(--st-miss)" label="(x₀, y₀)" />
          </>
        )}
      </Plot>
      <p className="mt-1 text-[12.5px] text-text-3">
        Courbes de niveau tracées par « marching squares » (écart O(h²) à la vraie courbe) ; la flèche indique la direction du gradient exact, orthogonale à la courbe de niveau passant par le point.
      </p>
    </div>
  );
}

/** Coupes y = y₀ et x = x₀, et comparaison dérivée exacte / différences centrées. */
export function CutsView({ u, state, cap }: { u: (x: number, y: number) => number; state: SobolevState; cap: number }) {
  const clip = (pts: [number, number][]) => pts.map(([a, b]) => [a, Math.max(-cap, Math.min(cap, b))] as [number, number]);
  const cutY = clip(sliceAtY(u, state.y0, [0, 1]));
  const cutX = clip(sliceAtX(u, state.x0, [0, 1]));
  const der = derivativeError(state);
  const all = [...cutY, ...cutX].map((p) => p[1]);
  const lo = Math.min(0, ...all);
  const hi = Math.max(0.05, ...all);
  const pad = (hi - lo) * 0.1;
  const dVals = [...der.exact, ...der.approx].filter(Number.isFinite).map((v) => Math.max(-8, Math.min(8, v)));
  const dlo = Math.min(-0.1, ...dVals);
  const dhi = Math.max(0.1, ...dVals);
  return (
    <div className="space-y-3" data-testid="cuts">
      <div className="grid gap-3 @lg:grid-cols-2">
        <figure>
          <figcaption className="mb-1 text-[13px]">
            <MathText text={String.raw`Coupe $y=y_0$ : $x\mapsto u(x,y_0)$`} />
          </figcaption>
          <Plot xDomain={[0, 1]} yDomain={[lo - pad, hi + pad]} height={300} ariaLabel="Coupe à y fixé">
            <Curve points={cutY} color="var(--st-access)" />
            <Dot x={state.x0} y={Math.max(-cap, Math.min(cap, u(state.x0, state.y0)))} r={4} color="var(--st-miss)" />
          </Plot>
        </figure>
        <figure>
          <figcaption className="mb-1 text-[13px]">
            <MathText text={String.raw`Coupe $x=x_0$ : $y\mapsto u(x_0,y)$`} />
          </figcaption>
          <Plot xDomain={[0, 1]} yDomain={[lo - pad, hi + pad]} height={300} ariaLabel="Coupe à x fixé">
            <Curve points={cutX} color="var(--st-proved)" />
            <Dot x={state.y0} y={Math.max(-cap, Math.min(cap, u(state.x0, state.y0)))} r={4} color="var(--st-miss)" />
          </Plot>
        </figure>
      </div>
      <figure>
        <figcaption className="mb-1 text-[13px]">
          <MathText text={String.raw`Dérivée $\partial_xu(\cdot,y_0)$ : formule exacte (trait) et différences centrées de pas $h$ (points)`} />
        </figcaption>
        <Plot xDomain={[0, 1]} yDomain={[dlo, dhi]} height={260} ariaLabel="Dérivée exacte et quotients différentiels">
          <Curve points={der.xs.map((x, i) => [x, Math.max(-8, Math.min(8, der.exact[i]!))] as [number, number])} color="var(--text-2)" />
          {der.xs.map((x, i) => (Number.isFinite(der.approx[i]!) ? <Dot key={i} x={x} y={Math.max(-8, Math.min(8, der.approx[i]!))} r={2.2} color="var(--div-pos)" /> : null))}
        </Plot>
        <p className="mt-1 text-[12.5px] text-text-2" data-testid="fd-error">
          Écart maximal sur la coupe : {fmt(der.maxError, 6)} (h = {fmt(state.h, 6)}).
        </p>
        <Claim status="numerique">Différences centrées : erreur O(h²) là où u est régulière ; aucune garantie près d’une singularité.</Claim>
      </figure>
    </div>
  );
}

/** Trace le long du bord (σ ∈ [0, 4], sens direct) : formule exacte, et valeurs de u + t u₀ au bord. */
export function TraceView({ state, highlight, onHighlight }: { state: SobolevState; highlight: Side | null; onHighlight: (s: Side | null) => void }) {
  const profile = traceProfile(state);
  const values = boundaryValues(state, 80);
  const vs = profile.map((p) => p.value);
  const lo = Math.min(-0.1, ...vs);
  const hi = Math.max(0.1, ...vs);
  const pad = (hi - lo) * 0.12;
  const maxGap = values.reduce((m, v, i) => Math.max(m, Math.abs(v - traceProfile(state, 80)[i]!.value)), 0);
  return (
    <div className="space-y-2" data-testid="trace-view">
      <div className="flex flex-wrap gap-1.5" role="group" aria-label="Côté mis en évidence">
        {SIDES.map((sd) => (
          <button
            key={sd.id}
            type="button"
            aria-pressed={highlight === sd.id}
            onClick={() => onHighlight(highlight === sd.id ? null : sd.id)}
            className="rounded border px-2 py-0.5 font-mono text-[12px] cursor-pointer"
            style={{ borderColor: SIDE_COLOR[sd.id], color: SIDE_COLOR[sd.id], background: highlight === sd.id ? 'var(--surface-3)' : undefined }}
          >
            {sd.label}
          </button>
        ))}
      </div>
      <Plot xDomain={[0, 4]} yDomain={[lo - pad, hi + pad]} height={300} ariaLabel="Trace de u le long du bord, parcouru dans le sens direct">
        {SIDES.map((sd) => (
          <Curve key={sd.id} points={profile.filter((p) => p.side === sd.id).map((p) => [p.sigma, p.value] as [number, number])} color={SIDE_COLOR[sd.id]} width={highlight === sd.id ? 3.5 : 2} />
        ))}
        {values.map((v, i) => (
          <Dot key={i} x={(4 * i) / 80} y={v} r={1.8} color="var(--text)" />
        ))}
      </Plot>
      <p className="text-[12.5px] text-text-2">
        Bord parcouru dans le sens direct : bas (σ ∈ [0, 1]), droite, haut, gauche. Traits : formule exacte de γu. Points : valeurs de u + t·u₀ sur le bord — écart maximal {fmt(maxGap, 12)}.
      </p>
      <p className="text-[12.5px] text-text-2">
        <MathText text={String.raw`Ajouter $t\,u_0$ avec $u_0\in H^1_0(\Omega)$ ne change pas la trace : $\gamma(u+tu_0)=\gamma u$. Réciproquement, deux fonctions de $H^1$ de même trace diffèrent d'un élément de $\ker\gamma=H^1_0(\Omega)$ : c'est le principe du relèvement d'une donnée de Dirichlet.`} />
      </p>
      <Claim status="exact">Trace en formule fermée (fonctions continues jusqu’au bord : γu est la restriction).</Claim>
    </div>
  );
}

/** Comparaison des exemples : régularité, trace, bornitude, avec justification. */
export function CompareTable({ current }: { current: string }) {
  const yes = (b: boolean) => (b ? 'oui' : 'non');
  return (
    <div className="overflow-x-auto" data-testid="sobolev-compare">
      <table className="w-full text-[13px]">
        <thead>
          <tr className="text-left text-text-3">
            <th className="font-normal pr-2">Fonction</th>
            <th className="font-normal pr-2">H¹</th>
            <th className="font-normal pr-2">H²</th>
            <th className="font-normal pr-2">H¹₀</th>
            <th className="font-normal pr-2">bornée</th>
            <th className="font-normal">‖∇u‖²</th>
          </tr>
        </thead>
        <tbody>
          {SOBOLEV_EXAMPLES.map((e) => (
            <tr key={e.id} className={e.id === current ? 'bg-surface-3' : undefined} data-example={e.id}>
              <td className="pr-2 py-1"><MathText text={`$${e.label}$`} /></td>
              <td className="pr-2">{yes(e.inH1)}</td>
              <td className="pr-2">{yes(e.inH2)}</td>
              <td className="pr-2">{yes(e.inH10)}</td>
              <td className="pr-2">{yes(e.bounded)}</td>
              <td><MathText text={`$${e.gradNormSq.tex.split('=').pop()}$`} /></td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-2 text-[12.5px] text-text-2">
        <MathText text={String.raw`En dimension $2$, $H^1(\Omega)\not\hookrightarrow L^\infty(\Omega)$ : l'exemple singulier est dans $H^1$ sans être borné. En revanche $H^2(\Omega)\hookrightarrow C(\overline\Omega)$ : il n'est donc pas dans $H^2$. Chaque appartenance est justifiée analytiquement dans la vue Équations.`} />
      </p>
    </div>
  );
}
