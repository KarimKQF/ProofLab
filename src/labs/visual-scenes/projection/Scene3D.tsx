/**
 * Vue 3D du laboratoire de projection (chargée à la demande avec Three.js).
 * Elle reçoit les objets déjà calculés par la scène ; aucune quantité n'est calculée ici.
 */
import { useMemo } from 'react';
import type { ConvexSet, ProjectionVisibility } from '@/core/visual-reasoning/projection-scene';
import type { Vec } from '@/core/visual-reasoning/linalg';
import { add, scale } from '@/core/visual-reasoning/linalg';
import Canvas3D, { type Label3 } from '@/components/math-visualizations/three/Canvas3D';
import { Arrow3, Ball3, C3, Plane3, Point3, Segment3 } from '@/components/math-visualizations/three/primitives';

const Z3 = ['#199e70', '#9085e9', '#d95926'];

function Convex3({ K, closed }: { K: ConvexSet; closed: boolean }) {
  switch (K.kind) {
    case 'boule':
      return <Ball3 center={K.center} r={K.r} color={C3.K} opacity={closed ? 0.26 : 0.12} wire={!closed} />;
    case 'plan':
      return <Plane3 n={K.n} c={K.c} color={C3.K} opacity={closed ? 0.24 : 0.12} />;
    case 'droite-affine':
      return <Segment3 a={add(K.a, scale(-9, K.d))} b={add(K.a, scale(9, K.d))} color={C3.K} width={3} dashed={!closed} />;
    default:
      return null;
  }
}

export default function Scene3D({ K, vis, x, p, zs, theme }: { K: ConvexSet; vis: ProjectionVisibility; x: Vec; p: Vec; zs: Vec[]; theme: 'dark' | 'light' }) {
  const xColor = theme === 'light' ? C3.xLight : C3.x;
  const labels = useMemo<Label3[]>(
    () => [
      { id: 'x', p: x, text: 'x', color: xColor },
      ...zs.map((z, i) => ({ id: `z${i}`, p: z, text: zs.length > 1 ? `z${i + 1}` : 'z', color: Z3[i % Z3.length]! })),
      ...(vis.point ? [{ id: 'p', p, text: 'PₖX', color: C3.p }] : []),
    ],
    [x, zs, p, vis.point, xColor],
  );
  return (
    <Canvas3D label="Vue 3D : l’ensemble K, le point x, son projeté et les points z de K" labels={labels}>
      <Convex3 K={K} closed={vis.closed} />
      <Point3 p={x} color={xColor} />
      {zs.map((z, i) => (
        <Point3 key={i} p={z} color={Z3[i % Z3.length]!} size={0.09} />
      ))}
      {vis.point && <Point3 p={p} color={C3.p} />}
      {vis.point && !vis.vectors && <Segment3 a={x} b={p} color={C3.p} dashed />}
      {vis.point && vis.vectors && (
        <>
          <Arrow3 a={p} b={x} color={C3.p} />
          {zs.map((z, i) => (
            <Arrow3 key={i} a={p} b={z} color={Z3[i % Z3.length]!} />
          ))}
        </>
      )}
    </Canvas3D>
  );
}
