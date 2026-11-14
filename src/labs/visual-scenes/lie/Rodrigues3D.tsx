/**
 * Vue 3D de la scène « Rodrigues » (chargée à la demande) : axe u, vecteur v, image Rv,
 * orbite circulaire de v sous les rotations d'axe u, arc parcouru, repère tourné.
 * Tous les objets sont calculés par la scène (lie-exponential.ts).
 */
import { useMemo } from 'react';
import Canvas3D, { type Label3 } from '@/components/math-visualizations/three/Canvas3D';
import { Arrow3, Polyline3, Segment3 } from '@/components/math-visualizations/three/primitives';
import type { Vec } from '@/core/visual-reasoning/lie-core';

export default function Rodrigues3D({ axis, v, image, circle, arc, frame }: { axis: Vec; v: Vec; image: Vec; circle: Vec[]; arc: Vec[]; frame: Vec[] }) {
  const ends = useMemo(() => [axis.map((x) => -2.2 * x), axis.map((x) => 2.2 * x)], [axis]);
  const labels = useMemo<Label3[]>(
    () => [
      { id: 'u', p: ends[1]!, text: 'u', color: '#d55181' },
      { id: 'v', p: v, text: 'v', color: '#199e70' },
      { id: 'Rv', p: image, text: 'Rv', color: '#c98500' },
    ],
    [ends, v, image],
  );
  return (
    <Canvas3D label="Rotation d’axe u et d’angle θ" labels={labels} axes={2.2} camera={[4.2, 3.2, 3]} height={460}>
      <Segment3 a={ends[0]!} b={ends[1]!} color="#d55181" width={1.6} />
      <Polyline3 points={circle} color="#9aa5b4" width={1.2} />
      <Polyline3 points={arc} color="#c98500" width={2.6} />
      <Arrow3 a={[0, 0, 0]} b={v} color="#199e70" />
      <Arrow3 a={[0, 0, 0]} b={image} color="#c98500" />
      {frame.map((f, i) => (
        <Segment3 key={i} a={[0, 0, 0]} b={f.map((x) => 1.3 * x)} color={['#d95926', '#199e70', '#3987e5'][i]!} width={1} dashed />
      ))}
    </Canvas3D>
  );
}
