/**
 * Planche 52 — Équation des ondes et variables caractéristiques.
 * u_tt = c² u_xx : u(x, t) = ½ (f(x − ct) + f(x + ct)). Les deux familles de droites x ∓ ct
 * = constante portent chacune un demi-profil.
 */
import { useState } from 'react';
import { PlateScene } from '../PlateScene';
import { C, Caption, ClippedCurve, f2, Plot, Slider } from '../kit2d';
import { linspace } from '../math';

const f = (x: number) => 1.7 * Math.exp(-4 * x * x);

export default function P52() {
  const [c, setC] = useState(1);
  const [t, setT] = useState(1.2);
  const D1: [number, number, number, number] = [-2.2, 2.2, 0, 2];
  const lines = (
    <div>
      <Plot xDomain={[-2.2, 2.2]} yDomain={[0, 2]} width={330} height={248} ariaLabel="Deux familles caractéristiques">
        {[-2, -1, 0, 1, 2].map((a) => (
          <g key={a}>
            <ClippedCurve points={[[a, 0], [a + 2 * c, 2]]} domain={D1} color={C.teal} width={1.4} />
            <ClippedCurve points={[[a, 0], [a - 2 * c, 2]]} domain={D1} color={C.orange} width={1.4} />
          </g>
        ))}
        <ClippedCurve points={[[-2.2, t], [2.2, t]]} domain={D1} color={C.violet} width={1.2} dash="4 3" />
      </Plot>
      <Caption>{String.raw`Vert : $x-ct=$ constante. Orange : $x+ct=$ constante. Pointillé : l'instant $t$.`}</Caption>
    </div>
  );
  const xs = linspace(-4, 4, 300);
  const D2: [number, number, number, number] = [-4, 4, -0.05, 1.8];
  const profiles = (
    <div>
      <Plot xDomain={[-4, 4]} yDomain={[-0.05, 1.8]} width={330} height={248} ariaLabel="Deux profils en sens opposés">
        <ClippedCurve points={xs.map((x) => [x, f(x)])} domain={D2} color={C.muted} width={1.2} dash="5 4" />
        <ClippedCurve points={xs.map((x) => [x, 0.5 * f(x - c * t)])} domain={D2} color={C.teal} width={1.6} />
        <ClippedCurve points={xs.map((x) => [x, 0.5 * f(x + c * t)])} domain={D2} color={C.orange} width={1.6} />
        <ClippedCurve points={xs.map((x) => [x, 0.5 * (f(x - c * t) + f(x + c * t))])} domain={D2} color={C.ink} width={2.4} />
      </Plot>
      <Caption>{String.raw`Pointillé : $f$. Noir : $u(\cdot,t)$, somme des deux demi-profils.`}</Caption>
    </div>
  );
  return (
    <PlateScene
      n={52}
      panels={[
        { title: 'Deux familles caractéristiques', render: () => lines },
        { title: 'Deux profils en sens opposés', render: () => profiles },
      ]}
      identity={String.raw`$\xi=x-ct$, $\ \eta=x+ct$, $\quad u_{tt}-c^2u_{xx}=-4c^2u_{\xi\eta}$ ; $\ u=\tfrac12\big(f(x-ct)+f(x+ct)\big)$.`}
      controls={
        <>
          <Slider label="Célérité c" value={c} min={0.2} max={1.6} step={0.01} onChange={setC} format={(v) => f2(v)} />
          <Slider label="Temps t" value={t} min={0} max={2} step={0.01} onChange={setT} format={(v) => f2(v)} />
        </>
      }
      observations={[
        { id: 'separe', text: 'Avance en temps : le profil initial se sépare en deux moitiés qui partent en sens opposés.', done: t > 1 },
        { id: 'debut', text: String.raw`En $t=0$, les deux moitiés se superposent et redonnent $f$.`, done: t < 0.01 },
        { id: 'vite', text: 'Augmente c : les caractéristiques se couchent, les moitiés s’éloignent plus vite.', done: c > 1.4 },
      ]}
      readings={[{ label: 'Écart entre les deux sommets', value: f2(2 * c * t, 3), status: 'exact' }]}
    />
  );
}
