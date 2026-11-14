/** Surface uₙ(x, y) = sin(nπx) sin(nπy) sur le carré (chargée à la demande). */
import type { Grid } from '@/core/visual-reasoning/sections';
import Canvas3D from '@/components/math-visualizations/three/Canvas3D';
import { SurfaceMesh } from '@/components/math-visualizations/three/primitives';

export default function SinSin3D({ grid }: { grid: Grid }) {
  return (
    <Canvas3D label="Surface de u_n(x, y) = sin(nπx) sin(nπy)" axes={0.75} camera={[1.5, -1.9, 1.6]} axisLabels={['x', 'y', 'u']} height={380}>
      <SurfaceMesh grid={grid} scaleZ={0.35} offset={[-0.5, -0.5, 0]} />
    </Canvas3D>
  );
}
