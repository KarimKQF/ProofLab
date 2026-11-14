/**
 * Surface z = u(x, y) sur le carré (chargée à la demande), avec les traces sur les quatre
 * côtés, les plans de coupe x = x₀ et y = y₀ et leurs courbes, et le point (x₀, y₀).
 * Le carré est centré à l'origine pour la caméra : (x, y) est dessiné en (x − ½, y − ½).
 */
import { useMemo } from 'react';
import type { Grid } from '@/core/visual-reasoning/sections';
import { sliceAtX, sliceAtY } from '@/core/visual-reasoning/sections';
import { SIDES, type Side } from '@/core/visual-reasoning/surfaces';
import Canvas3D, { type Label3 } from '@/components/math-visualizations/three/Canvas3D';
import { C3, Point3, Polyline3, SurfaceMesh, type V3 } from '@/components/math-visualizations/three/primitives';
import { SIDE_COLOR } from './SobolevViews';

export default function Sobolev3D({
  grid,
  u,
  trace,
  x0,
  y0,
  scaleZ,
  cap,
  highlight,
}: {
  grid: Grid;
  u: (x: number, y: number) => number;
  trace: Record<Side, (s: number) => number>;
  x0: number;
  y0: number;
  scaleZ: number;
  cap: number;
  highlight: Side | null;
}) {
  const z = (v: number) => Math.max(-cap, Math.min(cap, v)) * scaleZ;
  const traces = useMemo(
    () =>
      SIDES.map((sd) => ({
        id: sd.id,
        pts: Array.from({ length: 81 }, (_, i) => {
          const s = i / 80;
          const [x, y] = sd.param(s);
          return [x - 0.5, y - 0.5, z(trace[sd.id](s))] as V3;
        }),
      })),
    [trace, scaleZ, cap],
  );
  const cutX = useMemo(() => sliceAtX(u, x0, [0, 1], 80).map(([y, v]) => [x0 - 0.5, y - 0.5, z(v)] as V3), [u, x0, scaleZ, cap]);
  const cutY = useMemo(() => sliceAtY(u, y0, [0, 1], 80).map(([x, v]) => [x - 0.5, y0 - 0.5, z(v)] as V3), [u, y0, scaleZ, cap]);
  const p: V3 = [x0 - 0.5, y0 - 0.5, z(u(x0, y0))];
  const labels = useMemo<Label3[]>(() => [{ id: 'p', p, text: '(x₀, y₀)', color: C3.p }], [p[0], p[1], p[2]]);
  return (
    <Canvas3D label="Surface z = u(x, y) sur le carré, traces sur les côtés et coupes" labels={labels} axes={0.75} camera={[1.5, -1.9, 1.6]} axisLabels={['x', 'y', 'u']} height={420}>
      <SurfaceMesh grid={grid} scaleZ={scaleZ} offset={[-0.5, -0.5, 0]} opacity={0.92} />
      {traces.map((t) => (
        <Polyline3 key={t.id} points={t.pts} color={SIDE_COLOR[t.id]} width={highlight === t.id ? 3 : 1.8} />
      ))}
      <Polyline3 points={cutX} color="#c98500" width={1.6} />
      <Polyline3 points={cutY} color="#c98500" width={1.6} />
      <Point3 p={p} color={C3.p} size={0.025} />
    </Canvas3D>
  );
}
