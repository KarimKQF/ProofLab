/**
 * Cascade 3D (chargée à la demande) : les courbes u₁, …, u_N disposées en profondeur
 * (k le long de l'axe y), et la coupe à x = x₀ qui relie les valeurs u_k(x₀).
 */
import { useMemo } from 'react';
import type { ModeExample } from '@/core/visual-reasoning/convergence-modes';
import Canvas3D, { type Label3 } from '@/components/math-visualizations/three/Canvas3D';
import { Polyline3, type V3 } from '@/components/math-visualizations/three/primitives';

export default function Cascade3D({ ex, n, x0, theme }: { ex: ModeExample; n: number; x0: number; theme: 'dark' | 'light' }) {
  const H = 2.5;
  const hScale = Math.min(1, H / Math.max(1, ...Array.from({ length: n }, (_, i) => Math.min(ex.sup(i + 1), 12))));
  const curves = useMemo(
    () =>
      Array.from({ length: n }, (_, i) => {
        const k = i + 1;
        return Array.from({ length: 161 }, (_, s) => {
          const x = s / 160;
          return [3 * x - 1.5, (k - 1) * (3 / n) - 1.5, Math.max(-H, Math.min(H, ex.evaluate(k, x) * hScale))] as V3;
        });
      }),
    [ex, n, hScale],
  );
  const cut = useMemo(() => Array.from({ length: n }, (_, i) => [3 * x0 - 1.5, i * (3 / n) - 1.5, Math.max(-H, Math.min(H, ex.evaluate(i + 1, x0) * hScale))] as V3), [ex, n, x0, hScale]);
  const labels = useMemo<Label3[]>(() => [{ id: 'k1', p: [-1.7, -1.5, 0], text: 'k = 1', color: theme === 'light' ? '#1a2029' : '#e8eaef' }, { id: 'kn', p: [-1.7, 1.5 - 3 / n, 0], text: `k = ${n}`, color: theme === 'light' ? '#1a2029' : '#e8eaef' }], [n, theme]);
  return (
    <Canvas3D label={`Cascade des courbes u_1 à u_${n}`} labels={labels} axes={1.8} camera={[3.6, -4.2, 3.2]} axisLabels={['x', 'k', 'u']} height={400}>
      {curves.map((pts, i) => (
        <Polyline3 key={i} points={pts} color={i === n - 1 ? '#9085e9' : '#3987e5'} width={i === n - 1 ? 2 : 1} />
      ))}
      <Polyline3 points={cut} color="#c98500" width={2.4} />
    </Canvas3D>
  );
}
