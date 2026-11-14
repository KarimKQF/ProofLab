/**
 * Vue 3D du laboratoire B (chargée à la demande) : ellipsoïde unité de ‖·‖_G, plans de
 * niveau de ℓ (le plan ℓ = ‖ℓ‖ est tangent à l'ellipsoïde en w/‖w‖_G), vecteur de Riesz w,
 * solution u. Tous les objets sont calculés par la scène.
 */
import { useMemo } from 'react';
import type { Mat, Vec } from '@/core/visual-reasoning/linalg';
import Canvas3D, { type Label3 } from '@/components/math-visualizations/three/Canvas3D';
import { Arrow3, C3, Ellipsoid3, Plane3, Point3 } from '@/components/math-visualizations/three/primitives';

export default function Riesz3D({
  ballMatrix,
  c,
  dualNorm,
  w,
  u,
  tangency,
  showW,
  showU,
  v,
  theme,
}: {
  ballMatrix: Mat | null;
  c: Vec;
  dualNorm: number;
  w: Vec | null;
  u: Vec | null;
  tangency: Vec | null;
  showW: boolean;
  showU: boolean;
  v: Vec;
  theme: 'dark' | 'light';
}) {
  const vColor = theme === 'light' ? C3.xLight : C3.x;
  const unit = Number.isFinite(dualNorm) && dualNorm > 0 ? dualNorm : 1;
  const labels = useMemo<Label3[]>(
    () => [
      { id: 'v', p: v, text: 'v', color: vColor },
      ...(showW && w ? [{ id: 'w', p: w, text: 'w', color: '#199e70' }] : []),
      ...(showW && tangency ? [{ id: 't', p: tangency, text: 'w/‖w‖', color: C3.p }] : []),
      ...(showU && u ? [{ id: 'u', p: u, text: 'u', color: '#d95926' }] : []),
    ],
    [v, w, u, tangency, showW, showU, vColor],
  );
  return (
    <Canvas3D label="Vue 3D : ellipsoïde unité du produit scalaire G et plans de niveau de ℓ" labels={labels} axes={3.5}>
      {ballMatrix && <Ellipsoid3 m={ballMatrix} color={C3.K} opacity={0.22} />}
      {Math.hypot(...c) > 1e-9 &&
        [-1, 0, 1].map((k) => <Plane3 key={k} n={c} c={k * unit} size={6} color={k === 1 && ballMatrix ? C3.p : '#9aa5b4'} opacity={k === 1 ? 0.2 : 0.08} />)}
      <Point3 p={v} color={vColor} size={0.08} />
      {showW && tangency && <Point3 p={tangency} color={C3.p} size={0.09} />}
      {showW && w && <Arrow3 a={[0, 0, 0]} b={w} color="#199e70" />}
      {showU && u && <Arrow3 a={[0, 0, 0]} b={u} color="#d95926" />}
    </Canvas3D>
  );
}
