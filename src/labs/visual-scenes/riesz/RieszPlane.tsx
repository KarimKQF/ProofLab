/**
 * Figures planes du laboratoire B. Elles reçoivent G, c, w, u déjà calculés par la scène
 * (core/visual-reasoning/riesz-scene) et ne font que les placer ; une transformation
 * linéaire optionnelle (changement de coordonnées y = Lᵀx) est appliquée à tous les objets.
 */
import { useMemo } from 'react';
import { levelLine, unitEllipse } from '@/core/visual-reasoning/riesz-scene';
import { matVec, scale, type Mat, type Vec } from '@/core/visual-reasoning/linalg';
import { Dot, DraggablePoint, Plot, Segment, usePlot } from '@/labs/kit';

export const RX: [number, number] = [-5, 5];
/** Repère isotrope : (480 − 68) / 7,2 = (640 − 68) / 10 pixels par unité. */
export const RY: [number, number] = [-3.6, 3.6];
export const RH = 480;

const apply = (m: Mat | null, p: Vec): Vec => (m ? matVec(m, p) : p);

function Polyline({ pts, color, width = 1.5, dash, fill }: { pts: Vec[]; color: string; width?: number; dash?: string; fill?: string }) {
  const { sx, sy } = usePlot();
  return <polyline points={pts.map((p) => `${sx(p[0]!)},${sy(p[1]!)}`).join(' ')} fill={fill ?? 'none'} stroke={color} strokeWidth={width} strokeDasharray={dash} />;
}

export function RieszPlaneFigure({
  g,
  c,
  w,
  u,
  tangency,
  dualNorm,
  showW,
  showU,
  v,
  onV,
  morph = null,
  ariaLabel,
}: {
  g: Mat | null;
  c: Vec;
  w: Vec | null;
  u: Vec | null;
  tangency: Vec | null;
  dualNorm: number;
  showW: boolean;
  showU: boolean;
  v?: Vec;
  onV?: (v: Vec) => void;
  morph?: Mat | null;
  ariaLabel: string;
}) {
  const ellipse = useMemo(() => (g ? unitEllipse(g).map((p) => apply(morph, p)) : null), [g, morph]);
  // Lignes de niveau ℓ = k‖ℓ‖ (k = −2…2) : la ligne k = 1 est tangente à la boule unité de G.
  const unit = Number.isFinite(dualNorm) && dualNorm > 0 ? dualNorm : 1;
  const lines = [-2, -1, 0, 1, 2].map((k) => ({ k, line: levelLine(c, k * unit) }));
  return (
    <Plot xDomain={RX} yDomain={RY} height={RH} ariaLabel={ariaLabel}>
      {ellipse && <Polyline pts={ellipse} color="var(--st-hyp)" width={1.6} fill="var(--st-hyp-bg)" />}
      {lines.map(({ k, line }) => {
        if (!line) return null;
        const a = apply(morph, [line.point[0]! - 30 * line.dir[0]!, line.point[1]! - 30 * line.dir[1]!]);
        const b = apply(morph, [line.point[0]! + 30 * line.dir[0]!, line.point[1]! + 30 * line.dir[1]!]);
        return <Segment key={k} a={[a[0]!, a[1]!]} b={[b[0]!, b[1]!]} color={k === 1 && g ? 'var(--st-access)' : 'var(--text-3)'} width={k === 0 ? 1.4 : 1} dash={k === 0 ? '6 5' : '2 4'} />;
      })}
      {showW && tangency && (() => {
        const t = apply(morph, tangency);
        return <Dot x={t[0]!} y={t[1]!} r={4} color="var(--st-access)" label="w/‖w‖" dx={8} dy={16} />;
      })()}
      {showW && w && (() => {
        const ww = apply(morph, w);
        return (
          <>
            <Segment a={[0, 0]} b={[ww[0]!, ww[1]!]} color="var(--st-proved)" width={2} arrow />
            <Dot x={ww[0]!} y={ww[1]!} r={3.5} color="var(--st-proved)" label="w" />
          </>
        );
      })()}
      {showU && u && (() => {
        const uu = apply(morph, u);
        return (
          <>
            <Segment a={[0, 0]} b={[uu[0]!, uu[1]!]} color="var(--div-pos)" width={2} arrow />
            <Dot x={uu[0]!} y={uu[1]!} r={3.5} color="var(--div-pos)" label="u" dx={8} dy={14} />
          </>
        );
      })()}
      {v && onV && !morph && <DraggablePoint x={v[0]!} y={v[1]!} onChange={(a, b) => onV([a, b])} label="v" name="Vecteur de test v" bounds={[RX[0], RX[1], RY[0], RY[1]]} />}
      {v && morph && (() => {
        const vv = apply(morph, v);
        return <Dot x={vv[0]!} y={vv[1]!} r={4.5} color="var(--text)" label="v" />;
      })()}
    </Plot>
  );
}

export function RieszLegend() {
  return (
    <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-text-3">
      <span style={{ color: 'var(--st-hyp)' }}>— boule unité de ‖·‖_G</span>
      <span>– – noyau de ℓ ; ··· lignes ℓ = k‖ℓ‖</span>
      <span style={{ color: 'var(--st-access)' }}>··· ℓ = ‖ℓ‖, tangente en w/‖w‖_G</span>
      <span style={{ color: 'var(--st-proved)' }}>→ vecteur de Riesz w</span>
      <span style={{ color: 'var(--div-pos)' }}>→ solution de Lax–Milgram u</span>
    </div>
  );
}

/** Mise à l'échelle d'un vecteur pour qu'il reste dans la figure (affichage seulement). */
export const fitVec = (v: Vec, max = 4.5): Vec => {
  const n = Math.hypot(...v);
  return n > max ? scale(max / n, v) : v;
};
