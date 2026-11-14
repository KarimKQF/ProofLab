/**
 * Planche 16 — Théorème de Stokes.
 * Le carré [0, 1]² découpé en n × n cellules : les arêtes intérieures sont parcourues deux
 * fois en sens opposés et s'annulent ; la somme des circulations de bord des cellules est
 * la circulation sur le bord extérieur, égale à ∫ dω.
 */
import { useState } from 'react';
import { PlateScene } from '../PlateScene';
import { Arrow, C, Caption, Choice, f2, Plot, Poly, Slider } from '../kit2d';
import { simpson } from '../math';

type Form = { id: string; label: string; P: (x: number, y: number) => number; Q: (x: number, y: number) => number; dw: (x: number, y: number) => number };
const FORMS: Form[] = [
  { id: 'xdy', label: String.raw`$\omega=x\,dy$`, P: () => 0, Q: (x) => x, dw: () => 1 },
  { id: 'rot', label: String.raw`$\omega=-y\,dx+x\,dy$`, P: (_, y) => -y, Q: (x) => x, dw: () => 2 },
  { id: 'poly', label: String.raw`$\omega=-xy^2dx+x^2y\,dy$`, P: (x, y) => -x * y * y, Q: (x, y) => x * x * y, dw: (x, y) => 4 * x * y },
];

/** Circulation de ω le long du segment [A, B] (Simpson). */
function edge(w: Form, A: [number, number], B: [number, number]) {
  const dx = B[0] - A[0];
  const dy = B[1] - A[1];
  return simpson((t) => {
    const x = A[0] + t * dx;
    const y = A[1] + t * dy;
    return w.P(x, y) * dx + w.Q(x, y) * dy;
  }, 0, 1, 20);
}
const cellCirc = (w: Form, x0: number, y0: number, h: number) =>
  edge(w, [x0, y0], [x0 + h, y0]) + edge(w, [x0 + h, y0], [x0 + h, y0 + h]) + edge(w, [x0 + h, y0 + h], [x0, y0 + h]) + edge(w, [x0, y0 + h], [x0, y0]);

export default function P16() {
  const [n, setN] = useState(2);
  const [formId, setFormId] = useState('rot');
  const w = FORMS.find((x) => x.id === formId)!;
  const h = 1 / n;
  let sum = 0;
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) sum += cellCirc(w, i * h, j * h, h);
  const outer = cellCirc(w, 0, 0, 1);
  const surf = simpson((x) => simpson((y) => w.dw(x, y), 0, 1, 40), 0, 1, 40);
  const interior = 2 * n * (n - 1);
  const m = 0.035 * (2 / n + 0.4);

  const cells = (
    <div>
      <Plot xDomain={[-0.12, 1.12]} yDomain={[-0.12, 1.12]} width={330} height={330} grid={false} ariaLabel="Cellules et arêtes intérieures">
        <Poly points={[[0, 0], [1, 0], [1, 1], [0, 1]]} fill={C.blue} opacity={0.08} />
        {Array.from({ length: n * n }, (_, k) => {
          const i = k % n;
          const j = Math.floor(k / n);
          const x0 = i * h;
          const y0 = j * h;
          const sh = 0.28 * h;
          const inner = (side: 'b' | 'r' | 't' | 'l') => (side === 'b' ? j > 0 : side === 't' ? j < n - 1 : side === 'l' ? i > 0 : i < n - 1);
          const col = (side: 'b' | 'r' | 't' | 'l') => (inner(side) ? (side === 'r' || side === 't' ? C.orange : C.violet) : C.teal);
          return (
            <g key={k}>
              <Arrow a={[x0 + sh, y0 + m]} b={[x0 + h - sh, y0 + m]} color={col('b')} width={1.6} />
              <Arrow a={[x0 + h - m, y0 + sh]} b={[x0 + h - m, y0 + h - sh]} color={col('r')} width={1.6} />
              <Arrow a={[x0 + h - sh, y0 + h - m]} b={[x0 + sh, y0 + h - m]} color={col('t')} width={1.6} />
              <Arrow a={[x0 + m, y0 + h - sh]} b={[x0 + m, y0 + sh]} color={col('l')} width={1.6} />
            </g>
          );
        })}
      </Plot>
      <Caption>Orange et violet : une même arête intérieure parcourue dans les deux sens.</Caption>
    </div>
  );

  const outerFig = (
    <div>
      <Plot xDomain={[-0.12, 1.12]} yDomain={[-0.12, 1.12]} width={330} height={330} grid={false} ariaLabel="Il reste le bord extérieur">
        <Poly points={[[0, 0], [1, 0], [1, 1], [0, 1]]} fill={C.blue} opacity={0.12} stroke={C.faint} />
        <Arrow a={[0.15, 0.03]} b={[0.85, 0.03]} color={C.teal} width={2.2} />
        <Arrow a={[0.97, 0.15]} b={[0.97, 0.85]} color={C.teal} width={2.2} />
        <Arrow a={[0.85, 0.97]} b={[0.15, 0.97]} color={C.teal} width={2.2} />
        <Arrow a={[0.03, 0.85]} b={[0.03, 0.15]} color={C.teal} width={2.2} />
      </Plot>
      <Caption>{String.raw`Seul le bord extérieur subsiste : $\int_Md\omega=\int_{\partial M}\omega$.`}</Caption>
    </div>
  );

  return (
    <PlateScene
      n={16}
      panels={[
        { title: 'Additionner les bords des cellules', render: () => cells },
        { title: 'Il reste le bord extérieur', render: () => outerFig },
      ]}
      identity={String.raw`$\displaystyle\int_Md\omega=\int_{\partial M}\omega$, $\quad d(P\,dx+Q\,dy)=(\partial_xQ-\partial_yP)\,dx\wedge dy$.`}
      controls={
        <>
          <Slider label="Découpage n × n" value={n} min={1} max={6} step={1} onChange={setN} format={(x) => `${x} × ${x}`} />
          <Choice name="Forme ω" value={formId} onChange={setFormId} options={FORMS.map((x) => ({ id: x.id, label: x.label }))} />
        </>
      }
      observations={[
        { id: 'annulation', text: 'Découpe plus finement : chaque arête intérieure apparaît deux fois, en sens opposés.', done: n >= 3 },
        { id: 'somme', text: 'La somme des circulations des cellules ne dépend pas du découpage.', done: n >= 4 },
        { id: 'forme', text: String.raw`Change de forme : les trois nombres restent égaux, quelle que soit $\omega$.`, done: formId !== 'rot' },
      ]}
      readings={[
        { label: 'Arêtes intérieures (comptées deux fois)', value: String(interior), status: 'exact' },
        { label: 'Somme des circulations des cellules', value: f2(sum, 6), status: 'numerique' },
        { label: String.raw`$\int_{\partial M}\omega$`, value: f2(outer, 6), status: 'numerique' },
        { label: String.raw`$\int_Md\omega$`, value: f2(surf, 6), status: 'numerique' },
      ]}
      note="Intégrales par la méthode de Simpson, exactes à l’arrondi près pour ces formes polynomiales."
    />
  );
}
