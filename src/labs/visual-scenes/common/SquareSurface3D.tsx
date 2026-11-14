/**
 * Surface z = f(s, ξ) sur le carré [0,1]² (chargée à la demande), avec les coupes s = s₀ et
 * ξ = ξ₀. Sert au studio Aubin–Lions (s = t/T, ξ = x normalisé) et à Galerkin 2D (s = x, ξ = y).
 */
import { useMemo } from 'react';
import type { Grid } from '@/core/visual-reasoning/sections';
import Canvas3D from '@/components/math-visualizations/three/Canvas3D';
import { Polyline3, SurfaceMesh, type V3 } from '@/components/math-visualizations/three/primitives';

export default function SquareSurface3D({
  grid,
  f,
  s0,
  xi0,
  amp,
  label,
  axisLabels,
}: {
  grid: Grid;
  f: (s: number, xi: number) => number;
  s0: number | null;
  xi0: number | null;
  amp: number;
  label: string;
  axisLabels: [string, string, string];
}) {
  const scaleZ = 0.45 / amp;
  const cutS = useMemo(() => (s0 === null ? null : Array.from({ length: 81 }, (_, i) => [s0 - 0.5, i / 80 - 0.5, f(s0, i / 80) * scaleZ] as V3)), [f, s0, scaleZ]);
  const cutXi = useMemo(() => (xi0 === null ? null : Array.from({ length: 121 }, (_, i) => [i / 120 - 0.5, xi0 - 0.5, f(i / 120, xi0) * scaleZ] as V3)), [f, xi0, scaleZ]);
  return (
    <Canvas3D label={label} axes={0.75} camera={[1.4, -1.9, 1.5]} axisLabels={axisLabels} height={400}>
      <SurfaceMesh grid={grid} scaleZ={scaleZ} offset={[-0.5, -0.5, 0]} opacity={0.92} />
      {cutS && <Polyline3 points={cutS} color="#c98500" width={1.6} />}
      {cutXi && <Polyline3 points={cutXi} color="#c98500" width={1.6} />}
    </Canvas3D>
  );
}
