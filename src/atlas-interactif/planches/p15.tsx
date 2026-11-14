/**
 * Planche 15 — Partition de l'unité et intégration locale.
 * Deux cartes [0, b[ et ]a, 1] ; χ₂ = ψ((x − a)/(b − a)) avec ψ lisse (fonctions e^{−1/s}),
 * χ₁ = 1 − χ₂. Leur somme vaut 1 et ∫f = ∫χ₁f + ∫χ₂f.
 */
import { useState } from 'react';
import { PlateScene } from '../PlateScene';
import { C, Caption, ClippedCurve, f2, Label, Plot, Poly, Slider } from '../kit2d';
import { linspace, simpson } from '../math';

const g = (s: number) => (s > 0 ? Math.exp(-1 / s) : 0);
const psi = (s: number) => (s <= 0 ? 0 : s >= 1 ? 1 : g(s) / (g(s) + g(1 - s)));
const f = (x: number) => 1 + 0.6 * Math.sin(5 * x);

export default function P15() {
  const [a, setA] = useState(0.32);
  const [b, setB] = useState(0.7);
  const lo = Math.min(a, b - 0.05);
  const hi = Math.max(b, lo + 0.05);
  const chi2 = (x: number) => psi((x - lo) / (hi - lo));
  const chi1 = (x: number) => 1 - chi2(x);
  const xs = linspace(0, 1, 300);
  const I = simpson(f, 0, 1);
  const I1 = simpson((x) => chi1(x) * f(x), 0, 1, 800);
  const I2 = simpson((x) => chi2(x) * f(x), 0, 1, 800);
  const maxDev = Math.max(...xs.map((x) => Math.abs(chi1(x) + chi2(x) - 1)));
  const DOM: [number, number, number, number] = [0, 1, -0.05, 1.7];

  const plot = (
    <div>
      <Plot xDomain={[0, 1]} yDomain={[-0.05, 1.7]} width={700} height={300} ariaLabel="Partition de l'unité sur deux cartes">
        <Poly points={[[lo, -0.05], [hi, -0.05], [hi, 1.7], [lo, 1.7]]} fill={C.violet} opacity={0.07} />
        <Poly points={[...xs.map((x) => [x, chi1(x) * f(x)] as [number, number]), [1, 0], [0, 0]]} fill={C.teal} opacity={0.12} />
        <Poly points={[...xs.map((x) => [x, chi2(x) * f(x)] as [number, number]), [1, 0], [0, 0]]} fill={C.orange} opacity={0.12} />
        <ClippedCurve points={xs.map((x) => [x, f(x)])} domain={DOM} color={C.muted} width={1.4} dash="5 4" />
        <ClippedCurve points={xs.map((x) => [x, chi1(x)])} domain={DOM} color={C.teal} width={2.6} />
        <ClippedCurve points={xs.map((x) => [x, chi2(x)])} domain={DOM} color={C.orange} width={2.6} />
        <ClippedCurve points={xs.map((x) => [x, chi1(x) + chi2(x)])} domain={DOM} color={C.violet} width={1.4} dash="6 4" />
        <Label x={0.05} y={1.06} text="χ₁" color={C.teal} italic />
        <Label x={0.95} y={1.06} text="χ₂" color={C.orange} anchor="end" italic />
        <Label x={(lo + hi) / 2} y={1.62} text="recouvrement ]a, b[" color={C.violet} anchor="middle" size={12} />
      </Plot>
      <Caption>{String.raw`Pointillé gris : $f$. Aires colorées : $\chi_1f$ et $\chi_2f$. Pointillé violet : $\chi_1+\chi_2$.`}</Caption>
    </div>
  );

  return (
    <PlateScene
      n={15}
      panels={[{ title: 'Partition de l’unité sur deux cartes', render: () => plot }]}
      identity={String.raw`$\sum_i\chi_i=1$, $\ \operatorname{supp}\chi_i\subset U_i$, $\quad\displaystyle\int_M\omega=\sum_i\int_M\chi_i\,\omega$.`}
      controls={
        <>
          <Slider label="Début a du recouvrement" value={a} min={0.05} max={0.85} step={0.01} onChange={setA} format={(x) => f2(x)} />
          <Slider label="Fin b du recouvrement" value={b} min={0.15} max={0.95} step={0.01} onChange={setB} format={(x) => f2(x)} />
        </>
      }
      observations={[
        { id: 'somme', text: String.raw`Quel que soit le recouvrement, $\chi_1+\chi_2=1$ partout.`, done: Math.abs(a - 0.32) > 0.1 || Math.abs(b - 0.7) > 0.1 },
        { id: 'raide', text: 'Rétrécis le recouvrement : la transition se raidit mais reste lisse.', done: hi - lo < 0.12 },
        { id: 'integrale', text: 'L’intégrale se découpe : chaque morceau ne voit qu’une carte.', done: hi - lo > 0.5 },
      ]}
      readings={[
        { label: String.raw`$\max|\chi_1+\chi_2-1|$`, value: f2(maxDev, 12), status: 'numerique' },
        { label: String.raw`$\int_0^1f$`, value: f2(I, 6), status: 'numerique' },
        { label: String.raw`$\int\chi_1f+\int\chi_2f$`, value: `${f2(I1, 4)} + ${f2(I2, 4)} = ${f2(I1 + I2, 6)}`, status: 'numerique' },
      ]}
      note="Intégrales par la méthode de Simpson (400 à 800 sous-intervalles)."
    />
  );
}
