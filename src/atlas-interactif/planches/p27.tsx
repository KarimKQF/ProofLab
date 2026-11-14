/**
 * Planche 27 — Invariance et équivariance.
 * La norme est invariante par rotation : ‖Rx‖ = ‖x‖. Une application radiale
 * f(x) = ½(1 + ‖x‖) x est équivariante : f(Rx) = R f(x) ; f(x) = (1,2 x₁, 0,5 x₂) ne l'est pas.
 */
import { useState } from 'react';
import { PlateScene } from '../PlateScene';
import { Arc, Arrow, C, Caption, Choice, Circle, DraggablePoint, f2, Plot, Slider } from '../kit2d';
import { rot } from '../math';

type V = [number, number];
const fEq = ([x, y]: V): V => {
  const k = 0.5 * (1 + Math.hypot(x, y));
  return [k * x, k * y];
};
const fNon = ([x, y]: V): V => [1.2 * x, 0.5 * y];
const DOM: [number, number, number, number] = [-1.9, 1.9, -1.9, 1.9];

export default function P27() {
  const [x, setX] = useState<V>([1, 0]);
  const [th, setTh] = useState(0.9);
  const [which, setWhich] = useState<'eq' | 'non'>('eq');
  const f = which === 'eq' ? fEq : fNon;
  const Rx = rot(th, x);
  const fRx = f(Rx);
  const Rfx = rot(th, f(x));
  const gap = Math.hypot(fRx[0] - Rfx[0], fRx[1] - Rfx[1]);
  const a0 = Math.atan2(x[1], x[0]);

  const inv = (
    <div>
      <Plot xDomain={DOM.slice(0, 2) as [number, number]} yDomain={DOM.slice(2) as [number, number]} width={320} height={320} grid={false} ariaLabel="Invariance de la norme">
        <Circle c={[0, 0]} r={Math.hypot(...x)} color={C.faint} width={1.2} />
        <Arrow a={[0, 0]} b={x} color={C.teal} width={2.4} />
        <Arrow a={[0, 0]} b={Rx} color={C.orange} width={2.4} />
        <Arc c={[0, 0]} r={0.35} a0={a0} a1={a0 + th} color={C.violet} width={1.6} arrow />
        <DraggablePoint x={x[0]} y={x[1]} onChange={(a, b) => setX([a, b])} name="Vecteur x" color={C.teal} label="x" bounds={[-1.6, 1.6, -1.6, 1.6]} step={0.05} r={6} />
      </Plot>
      <Caption>{String.raw`$\|Rx\|=\|x\|$ : la longueur se lit sans savoir quelle rotation a agi.`}</Caption>
    </div>
  );

  const fx = f(x);
  const eq = (
    <div>
      <Plot xDomain={[-2.6, 2.6]} yDomain={[-2.6, 2.6]} width={320} height={320} grid={false} ariaLabel="Équivariance d'une application">
        <Arrow a={[0, 0]} b={fx} color={C.teal} width={1.6} dash="5 3" />
        <Arrow a={[0, 0]} b={fRx} color={C.orange} width={2.6} />
        <Arrow a={[0, 0]} b={Rfx} color={C.violet} width={1.8} dash="6 4" />
      </Plot>
      <Caption>{String.raw`Orange : $f(Rx)$. Violet pointillé : $R\,f(x)$. Vert pointillé : $f(x)$.`}</Caption>
    </div>
  );

  return (
    <PlateScene
      n={27}
      panels={[
        { title: 'Invariance : lire une longueur', render: () => inv },
        { title: 'Équivariance : produire un vecteur', render: () => eq },
      ]}
      identity={String.raw`$I(g\cdot x)=I(x)$ (invariance), $\quad F(g\cdot x)=g\cdot F(x)$ (équivariance).`}
      controls={
        <>
          <Slider label="Angle de la rotation R" value={th} min={-3.14} max={3.14} step={0.01} onChange={setTh} format={(v) => `${Math.round((v * 180) / Math.PI)}°`} />
          <Choice
            name="Application f"
            value={which}
            onChange={setWhich}
            options={[
              { id: 'eq', label: String.raw`$f(x)=\tfrac12(1+\|x\|)\,x$` },
              { id: 'non', label: String.raw`$f(x)=(1{,}2\,x_1,\ 0{,}5\,x_2)$` },
            ]}
          />
        </>
      }
      observations={[
        { id: 'norme', text: 'Fais tourner x : sa norme ne change pas.', done: Math.abs(th - 0.9) > 0.8 },
        { id: 'eq', text: String.raw`Avec l'application radiale, $f(Rx)$ et $R\,f(x)$ coïncident pour toute rotation.`, done: which === 'eq' && Math.abs(th) > 0.5 },
        { id: 'non', text: String.raw`Avec l'autre application, les deux flèches se séparent : elle n'est pas équivariante.`, done: which === 'non' && gap > 0.2 },
      ]}
      readings={[
        { label: String.raw`$\|x\|$ et $\|Rx\|$`, value: `${f2(Math.hypot(...x), 4)} ; ${f2(Math.hypot(...Rx), 4)}`, status: 'exact' },
        { label: String.raw`$|f(Rx)-R\,f(x)|$`, value: f2(gap, 5), status: 'exact' },
      ]}
    />
  );
}
