/** Étape ℝ³ de l'échelle des dimensions (chargée à la demande). */
import { useMemo } from 'react';
import Canvas3D, { type Label3 } from '@/components/math-visualizations/three/Canvas3D';
import { Ball3, C3, Point3, Segment3 } from '@/components/math-visualizations/three/primitives';
import { LADDER_RADIUS } from '@/core/visual-reasoning/projection-scene';

export default function LadderBall3D({ x, p, theme }: { x: number[]; p: number[]; theme: 'dark' | 'light' }) {
  const xColor = theme === 'light' ? C3.xLight : C3.x;
  const labels = useMemo<Label3[]>(
    () => [
      { id: 'x', p: x, text: 'x', color: xColor },
      { id: 'p', p, text: 'PₖX', color: C3.p },
    ],
    [x, p, xColor],
  );
  return (
    <Canvas3D label="Boule fermée de rayon 2 dans ℝ³, le point x et son projeté" height={380} labels={labels}>
      <Ball3 center={[0, 0, 0]} r={LADDER_RADIUS} color={C3.K} />
      <Segment3 a={x} b={p} color={C3.p} dashed />
      <Point3 p={p} color={C3.p} />
      <Point3 p={x} color={xColor} />
    </Canvas3D>
  );
}
