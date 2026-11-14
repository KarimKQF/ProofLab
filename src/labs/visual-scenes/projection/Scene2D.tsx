/**
 * Vue géométrique plane du laboratoire de projection. Elle ne calcule rien : elle reçoit
 * le convexe, x, P_Kx et les points z déjà calculés par la scène (core/visual-reasoning).
 */
import type { ReactNode } from 'react';
import type { ConvexSet, ProjectionVisibility } from '@/core/visual-reasoning/projection-scene';
import type { Vec } from '@/core/visual-reasoning/linalg';
import { Dot, DraggablePoint, Plot, Segment, usePlot } from '@/labs/kit';

export const X2: [number, number] = [-6, 6];
export const Y2: [number, number] = [-4.32, 4.32];
/** Hauteur rendant le repère isotrope : (480 − 68) / 8,64 = (640 − 68) / 12 pixels par unité. */
export const H2 = 480;

const Z_COLORS = ['var(--st-proved)', 'var(--st-access)', 'var(--div-pos)'];
export const zColor = (i: number) => Z_COLORS[i % Z_COLORS.length]!;

/** Région d'un convexe plan, découpée à la fenêtre ; bord pointillé tant que la fermeture n'est pas démontrée. */
export function Region2D({ K, closed, tone = 'hyp' }: { K: ConvexSet; closed: boolean; tone?: 'hyp' | 'miss' }) {
  const { sx, sy } = usePlot();
  const stroke = tone === 'hyp' ? 'var(--st-hyp)' : 'var(--st-miss)';
  const fill = tone === 'hyp' ? 'var(--st-hyp-bg)' : 'var(--st-miss-bg)';
  const dash = closed ? undefined : '6 5';
  const unit = sx(1) - sx(0);
  switch (K.kind) {
    case 'demi-plan': {
      const corners: Vec[] = [
        [X2[0], Y2[0]],
        [X2[1], Y2[0]],
        [X2[1], Y2[1]],
        [X2[0], Y2[1]],
      ];
      const f = (p: Vec) => K.n[0]! * p[0]! + K.n[1]! * p[1]! - K.c;
      const pts: Vec[] = [];
      for (let i = 0; i < 4; i++) {
        const a = corners[i]!;
        const b = corners[(i + 1) % 4]!;
        const fa = f(a);
        const fb = f(b);
        if (fa <= 0) pts.push(a);
        if (fa < 0 !== fb < 0) {
          const s = fa / (fa - fb);
          pts.push([a[0]! + s * (b[0]! - a[0]!), a[1]! + s * (b[1]! - a[1]!)]);
        }
      }
      const edge = pts.filter((p) => Math.abs(f(p)) < 1e-6);
      return (
        <g data-region="demi-plan">
          <polygon points={pts.map((p) => `${sx(p[0]!)},${sy(p[1]!)}`).join(' ')} fill={fill} />
          {edge.length === 2 && <line x1={sx(edge[0]![0]!)} y1={sy(edge[0]![1]!)} x2={sx(edge[1]![0]!)} y2={sy(edge[1]![1]!)} stroke={stroke} strokeWidth={1.6} strokeDasharray={dash} />}
        </g>
      );
    }
    case 'rectangle':
      return <rect data-region="rectangle" x={sx(K.lo[0]!)} y={sy(K.hi[1]!)} width={sx(K.hi[0]!) - sx(K.lo[0]!)} height={sy(K.lo[1]!) - sy(K.hi[1]!)} fill={fill} stroke={stroke} strokeWidth={1.6} strokeDasharray={dash} />;
    case 'disque':
      return <circle data-region="disque" cx={sx(K.center[0]!)} cy={sy(K.center[1]!)} r={K.r * unit} fill={fill} stroke={stroke} strokeWidth={1.6} strokeDasharray={dash} />;
    case 'sous-espace': {
      const t = 20;
      return <line data-region="sous-espace" x1={sx(-t * K.d[0]!)} y1={sy(-t * K.d[1]!)} x2={sx(t * K.d[0]!)} y2={sy(t * K.d[1]!)} stroke={stroke} strokeWidth={2} strokeDasharray={dash} />;
    }
    default:
      return null;
  }
}

/** Ensembles sans l'hypothèse (disque ouvert, cercle, deux disques), décrits analytiquement. */
export type WithoutSet2D =
  | { kind: 'disque-ouvert'; center: Vec; r: number }
  | { kind: 'cercle'; center: Vec; r: number }
  | { kind: 'deux-disques'; c1: Vec; c2: Vec; r: number };

export function WithoutRegion2D({ S }: { S: WithoutSet2D }) {
  const { sx, sy } = usePlot();
  const unit = sx(1) - sx(0);
  if (S.kind === 'disque-ouvert') {
    return <circle cx={sx(S.center[0]!)} cy={sy(S.center[1]!)} r={S.r * unit} fill="var(--st-miss-bg)" stroke="var(--st-miss)" strokeWidth={1.6} strokeDasharray="6 5" />;
  }
  if (S.kind === 'cercle') {
    return <circle cx={sx(S.center[0]!)} cy={sy(S.center[1]!)} r={S.r * unit} fill="none" stroke="var(--st-miss)" strokeWidth={2} />;
  }
  return (
    <g>
      <circle cx={sx(S.c1[0]!)} cy={sy(S.c1[1]!)} r={S.r * unit} fill="var(--st-miss-bg)" stroke="var(--st-miss)" strokeWidth={1.6} />
      <circle cx={sx(S.c2[0]!)} cy={sy(S.c2[1]!)} r={S.r * unit} fill="var(--st-miss-bg)" stroke="var(--st-miss)" strokeWidth={1.6} />
    </g>
  );
}

/** Cercle de centre c et de rayon ρ (ensemble des points à distance ρ de c). */
export function CircleAround({ c, rho, color, dash }: { c: readonly number[]; rho: number; color: string; dash?: string }) {
  const { sx, sy } = usePlot();
  const unit = sx(1) - sx(0);
  return <circle cx={sx(c[0]!)} cy={sy(c[1]!)} r={Math.max(0, rho) * unit} fill="none" stroke={color} strokeWidth={1.3} strokeDasharray={dash} />;
}

export function Scene2D({
  K,
  vis,
  x,
  p,
  zs,
  onX,
  onZ,
  without,
  minimizers,
  children,
}: {
  K: ConvexSet;
  vis: ProjectionVisibility;
  x: Vec;
  p: Vec;
  zs: Vec[];
  onX: (v: Vec) => void;
  onZ: (i: number, v: Vec) => void;
  /** Mode « hypothèse retirée » : l'ensemble sans l'hypothèse remplace K. */
  without?: WithoutSet2D | null;
  minimizers?: Vec[];
  children?: ReactNode;
}) {
  const bounds: [number, number, number, number] = [X2[0], X2[1], Y2[0], Y2[1]];
  return (
    <Plot xDomain={X2} yDomain={Y2} height={H2} ariaLabel="Plan euclidien : le point x, l’ensemble K et son projeté">
      {without ? <WithoutRegion2D S={without} /> : <Region2D K={K} closed={vis.closed} />}
      {!without && vis.point && vis.vectors && (
        <>
          <Segment a={[p[0]!, p[1]!]} b={[x[0]!, x[1]!]} color="var(--st-access)" arrow />
          {zs.map((z, i) => (
            <Segment key={i} a={[p[0]!, p[1]!]} b={[z[0]!, z[1]!]} color={zColor(i)} arrow />
          ))}
        </>
      )}
      {!without && vis.point && !vis.vectors && <Segment a={[x[0]!, x[1]!]} b={[p[0]!, p[1]!]} color="var(--st-access)" dash="4 4" />}
      {!without && vis.point && <Dot x={p[0]!} y={p[1]!} r={5.5} color="var(--st-miss)" label="PₖX" />}
      {!without &&
        zs.map((z, i) => (
          <DraggablePoint key={i} x={z[0]!} y={z[1]!} onChange={(a, b) => onZ(i, [a, b])} label={`z${zs.length > 1 ? i + 1 : ''}`} color={zColor(i)} name={`Point z${i + 1} de K`} bounds={bounds} />
        ))}
      {without && (minimizers ?? []).map((m, i) => <Dot key={i} x={m[0]!} y={m[1]!} r={5.5} color="var(--st-miss)" label={(minimizers ?? []).length > 1 ? `p${i + 1}` : 'p'} />)}
      {children}
      <DraggablePoint x={x[0]!} y={x[1]!} onChange={(a, b) => onX([a, b])} label="x" name="Point x à projeter" bounds={bounds} />
    </Plot>
  );
}
