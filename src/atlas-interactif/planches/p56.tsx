/**
 * Planche 56 — Gradient, divergence et Laplace–Beltrami.
 * Champ linéaire X(v) = Av : le flot e^{tA} multiplie les aires par det e^{tA} = e^{t tr A}
 * = e^{t div X}. Sur le cercle, Δ cos kθ = −k² cos kθ.
 */
import { useState } from 'react';
import { PlateScene } from '../PlateScene';
import { C, Caption, Choice, ClippedCurve, f2, Field, Plot, Poly, Slider } from '../kit2d';
import { expm, linspace, matVec } from '../math';

const FIELDS = [
  { id: 'dil', label: String.raw`$X=(x,y)$`, A: [[1, 0], [0, 1]] },
  { id: 'rot', label: String.raw`$X=(-y,x)$`, A: [[0, -1], [1, 0]] },
  { id: 'cis', label: String.raw`$X=(y,0)$`, A: [[0, 1], [0, 0]] },
  { id: 'mix', label: String.raw`$X=(x,\,-\tfrac12y)$`, A: [[1, 0], [0, -0.5]] },
];

export default function P56() {
  const [fid, setFid] = useState('dil');
  const [t, setT] = useState(0.4);
  const [k, setK] = useState(1);
  const A = FIELDS.find((f) => f.id === fid)!.A;
  const E = expm(A.map((r) => r.map((x) => x * t)));
  const cell: [number, number][] = [[0.3, 0.3], [0.9, 0.3], [0.9, 0.9], [0.3, 0.9]];
  const img = cell.map((p) => matVec(E, p) as [number, number]);
  const area = (P: [number, number][]) => Math.abs(P.reduce((s, a, i) => s + a[0] * P[(i + 1) % P.length]![1] - P[(i + 1) % P.length]![0] * a[1], 0) / 2);
  const ratio = area(img) / area(cell);
  const div = A[0]![0]! + A[1]![1]!;
  const flow = (
    <div>
      <Plot xDomain={[-0.6, 2.6]} yDomain={[-0.6, 2.6]} width={300} height={300} ariaLabel="Le flot transporte une cellule">
        <Field F={([x, y]) => [A[0]![0]! * x + A[0]![1]! * y, A[1]![0]! * x + A[1]![1]! * y]} domain={[-0.6, 2.6, -0.6, 2.6]} color={C.teal} n={8} opacity={0.35} />
        <Poly points={cell} fill={C.teal} opacity={0.3} stroke={C.teal} />
        <Poly points={img} fill={C.orange} opacity={0.3} stroke={C.orange} width={2} />
      </Plot>
      <Caption>{String.raw`Vert : la cellule. Orange : son image par le flot au temps $t$.`}</Caption>
    </div>
  );
  const th = linspace(-Math.PI, Math.PI, 240);
  const amp = Math.max(1, k * k);
  const D: [number, number, number, number] = [-Math.PI, Math.PI, -amp * 1.1, amp * 1.1];
  const lap = (
    <div>
      <Plot xDomain={[-Math.PI, Math.PI]} yDomain={[-amp * 1.1, amp * 1.1]} width={300} height={300} ariaLabel="Laplacien sur le cercle">
        <ClippedCurve points={th.map((x) => [x, Math.cos(k * x)])} domain={D} color={C.teal} width={2.4} />
        <ClippedCurve points={th.map((x) => [x, -k * k * Math.cos(k * x)])} domain={D} color={C.orange} width={2} dash="6 4" />
      </Plot>
      <Caption>{String.raw`Vert : $f=\cos k\theta$. Orange : $\Delta f=f''=-k^2f$.`}</Caption>
    </div>
  );
  return (
    <PlateScene
      n={56}
      panels={[
        { title: 'Le flot dilate une cellule', render: () => flow },
        { title: 'Laplacien sur le cercle', render: () => lap },
      ]}
      identity={String.raw`$\mathcal L_X\mathrm{vol}_g=(\operatorname{div}_gX)\,\mathrm{vol}_g$, $\quad\Delta_gf=\operatorname{div}_g(\operatorname{grad}_gf)$ ; champ linéaire : $\det e^{tA}=e^{t\operatorname{tr}A}$.`}
      controls={
        <>
          <Choice name="Champ X" value={fid} onChange={setFid} options={FIELDS.map((f) => ({ id: f.id, label: f.label }))} />
          <Slider label="Temps t" value={t} min={0} max={1} step={0.01} onChange={setT} format={(v) => f2(v)} />
          <Slider label="Mode k" value={k} min={0} max={4} step={1} onChange={setK} format={(v) => String(v)} />
        </>
      }
      observations={[
        { id: 'dilate', text: String.raw`Pour $X=(x,y)$, $\operatorname{div}X=2$ : l'aire est multipliée par $e^{2t}$.`, done: fid === 'dil' && t > 0.5 },
        { id: 'conserve', text: 'Rotation ou cisaillement : divergence nulle, l’aire est conservée.', done: (fid === 'rot' || fid === 'cis') && t > 0.5 },
        { id: 'mode', text: String.raw`Mode $k$ : le laplacien multiplie $\cos k\theta$ par $-k^2$.`, done: k >= 3 },
      ]}
      readings={[
        { label: 'Aire de l’image / aire de la cellule', value: f2(ratio, 6), status: 'exact' },
        { label: String.raw`$e^{t\operatorname{div}X}$`, value: f2(Math.exp(t * div), 6), status: 'exact' },
      ]}
    />
  );
}
