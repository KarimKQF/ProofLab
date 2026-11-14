/**
 * Coupe plane d'une scène de ℝ³ : le plan affine passant par P_Kx et contenant x et z₁.
 * C'est une vue 2D exacte (l'intersection K ∩ plan est calculée en formule fermée), qui
 * sert aussi d'alternative quand WebGL est indisponible.
 */
import type { ReactNode } from 'react';
import type { SectionShape } from '@/core/visual-reasoning/projection-scene';
import { Dot, Plot, Segment, usePlot } from '@/labs/kit';

export const SECTION_H = 480;
const RATIO = (640 - 68) / (SECTION_H - 68);

/** Fenêtre isotrope contenant les points donnés, avec une marge. */
export function sectionWindow(points: readonly (readonly number[])[], minHalf = 2.5): { x: [number, number]; y: [number, number] } {
  const xs = points.map((p) => p[0]!);
  const ys = points.map((p) => p[1]!);
  const cx = (Math.min(...xs) + Math.max(...xs)) / 2;
  const cy = (Math.min(...ys) + Math.max(...ys)) / 2;
  const hw = Math.max(minHalf, 1.3 * Math.max((Math.max(...xs) - Math.min(...xs)) / 2, ((Math.max(...ys) - Math.min(...ys)) / 2) * RATIO));
  const hh = hw / RATIO;
  return { x: [cx - hw, cx + hw], y: [cy - hh, cy + hh] };
}

function Shape({ shape, closed, win }: { shape: SectionShape; closed: boolean; win: { x: [number, number]; y: [number, number] } }) {
  const { sx, sy } = usePlot();
  const unit = sx(1) - sx(0);
  const dash = closed ? undefined : '6 5';
  switch (shape.kind) {
    case 'disque':
      return <circle data-section="disque" cx={sx(shape.center[0])} cy={sy(shape.center[1])} r={shape.r * unit} fill="var(--st-hyp-bg)" stroke="var(--st-hyp)" strokeWidth={1.6} strokeDasharray={dash} />;
    case 'droite': {
      const L = 4 * (win.x[1] - win.x[0]);
      const [px, py] = shape.point;
      const [dx, dy] = shape.dir;
      return <line data-section="droite" x1={sx(px - L * dx)} y1={sy(py - L * dy)} x2={sx(px + L * dx)} y2={sy(py + L * dy)} stroke="var(--st-hyp)" strokeWidth={2.2} strokeDasharray={dash} />;
    }
    case 'point':
      return <circle data-section="point" cx={sx(shape.at[0])} cy={sy(shape.at[1])} r={6} fill="none" stroke="var(--st-hyp)" strokeWidth={2} />;
    case 'tout':
      return <rect data-section="tout" x={sx(win.x[0])} y={sy(win.y[1])} width={sx(win.x[1]) - sx(win.x[0])} height={sy(win.y[0]) - sy(win.y[1])} fill="var(--st-hyp-bg)" />;
    case 'vide':
      return null;
  }
}

export function SectionPlot({
  shape,
  closed,
  win,
  ariaLabel,
  children,
}: {
  shape: SectionShape;
  closed: boolean;
  win: { x: [number, number]; y: [number, number] };
  ariaLabel: string;
  children?: ReactNode;
}) {
  return (
    <Plot xDomain={win.x} yDomain={win.y} height={SECTION_H} ariaLabel={ariaLabel}>
      <Shape shape={shape} closed={closed} win={win} />
      {children}
    </Plot>
  );
}

const SHAPE_TEXT: Record<SectionShape['kind'], string> = {
  disque: 'K ∩ plan de coupe est un disque fermé (coupe d’une boule).',
  droite: 'K ∩ plan de coupe est une droite.',
  point: 'K ∩ plan de coupe est réduit à un point.',
  tout: 'Le plan de coupe est contenu dans K.',
  vide: 'Le plan de coupe ne rencontre pas K.',
};

/** Vue « Coupe plane » : x, P_Kx et z₁ dans leur plan commun. */
export function ProjectionSection({
  shape,
  closed,
  x2,
  p2,
  z2,
  showPoint,
  showVectors,
}: {
  shape: SectionShape;
  closed: boolean;
  x2: [number, number];
  p2: [number, number];
  z2: [number, number] | null;
  showPoint: boolean;
  showVectors: boolean;
}) {
  const win = sectionWindow([x2, p2, ...(z2 ? [z2] : [])]);
  return (
    <div data-testid="section-view">
      <SectionPlot shape={shape} closed={closed} win={win} ariaLabel="Coupe par le plan contenant x, son projeté et z₁">
        {showPoint && showVectors && (
          <>
            <HalfPlaneBoundary win={win} p2={p2} />
            <Segment a={p2} b={x2} color="var(--st-access)" arrow />
            {z2 && <Segment a={p2} b={z2} color="var(--st-proved)" arrow />}
          </>
        )}
        {showPoint && !showVectors && <Segment a={x2} b={p2} color="var(--st-access)" dash="4 4" />}
        {showPoint && <Dot x={p2[0]} y={p2[1]} r={5.5} color="var(--st-miss)" label="PₖX" />}
        {z2 && <Dot x={z2[0]} y={z2[1]} r={5} color="var(--st-proved)" label="z₁" />}
        <Dot x={x2[0]} y={x2[1]} r={6} color="var(--text)" label="x" />
      </SectionPlot>
      <p className="mt-1.5 text-[12.5px] text-text-3">{SHAPE_TEXT[shape.kind]} Repère orthonormé du plan : e₂ dirigé selon x − PₖX, e₁ selon la composante de z₁ − PₖX orthogonale à e₂.</p>
    </div>
  );
}

/** Droite {⟨x − P_Kx, · − P_Kx⟩ = 0} : dans ce repère, l'horizontale passant par P_Kx. */
function HalfPlaneBoundary({ win, p2 }: { win: { x: [number, number]; y: [number, number] }; p2: [number, number] }) {
  const { sx, sy } = usePlot();
  return (
    <g>
      <line x1={sx(win.x[0])} x2={sx(win.x[1])} y1={sy(p2[1])} y2={sy(p2[1])} stroke="var(--st-access)" strokeWidth={1} strokeDasharray="3 4" />
      <text x={sx(win.x[1]) - 6} y={sy(p2[1]) - 6} textAnchor="end" fontSize={11.5} fill="var(--st-access)" fontFamily="var(--font-mono)">
        ⟨x−PₖX, z−PₖX⟩ = 0
      </text>
    </g>
  );
}
