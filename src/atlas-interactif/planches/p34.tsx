/**
 * Planche 34 — SO(2) et son algèbre.
 * Le groupe est un cercle, l'algèbre une droite {θJ}. exp(θJ) = R_θ : θ et θ + 2πk donnent la
 * même rotation ; l'exponentielle est surjective et non injective.
 */
import { useState } from 'react';
import { PlateScene } from '../PlateScene';
import { Arc, Arrow, C, Caption, Circle, Dot, f2, Label, Plot, Segment, Slider } from '../kit2d';
import { mod2pi, TAU } from '../math';

export default function P34() {
  const [th, setTh] = useState(1);
  const base = mod2pi(th);
  const pre = [-3, -2, -1, 0, 1, 2].map((k) => base + k * TAU).filter((x) => x >= -9.5 && x <= 9.5);
  const group = (
    <div>
      <Plot xDomain={[-1.4, 1.4]} yDomain={[-1.4, 1.4]} width={280} height={280} grid={false} ariaLabel="Le groupe SO(2)">
        <Circle c={[0, 0]} r={1} color={C.faint} width={1.4} />
        <Arrow a={[0, 0]} b={[Math.cos(th), Math.sin(th)]} color={C.teal} width={2.6} />
        <Arrow a={[0, 0]} b={[-Math.sin(th), Math.cos(th)]} color={C.blue} width={2.6} />
        <Arc c={[0, 0]} r={1.15} a0={0} a1={base} color={C.orange} width={2} arrow />
      </Plot>
      <Caption>{String.raw`Le repère tourné $R_\theta$.`}</Caption>
    </div>
  );
  const line = (
    <div>
      <Plot xDomain={[-10, 10]} yDomain={[-1, 1]} width={360} height={110} grid={false} ariaLabel="L'algèbre so(2) comme droite">
        <Segment a={[-9.8, 0]} b={[9.8, 0]} color={C.blue} width={1.6} />
        {pre.map((x) => (
          <Dot key={x} x={x} y={0} color={C.orange} r={5} />
        ))}
        <Dot x={th} y={0} color={C.teal} r={6.5} />
        {[-2, -1, 0, 1, 2].map((k) => (
          <Label key={k} x={k * TAU} y={-0.6} text={k === 0 ? '0' : `${k > 0 ? '' : '−'}${Math.abs(k) === 1 ? '' : Math.abs(k)}2π`} color={C.muted} anchor="middle" size={11} />
        ))}
      </Plot>
      <Caption>Orange : tous les θ + 2πk, qui donnent la même rotation que le point vert.</Caption>
    </div>
  );
  return (
    <PlateScene
      n={34}
      panels={[
        { title: 'Le groupe SO(2) est un cercle', render: () => group },
        { title: 'L’algèbre est une droite', render: () => line },
      ]}
      identity={String.raw`$J^2=-I$, $\quad\exp(\theta J)=\cos\theta\,I+\sin\theta\,J=R_\theta$, $\quad\ker\exp=2\pi\mathbb Z\,J$.`}
      controls={<Slider label="θ sur la droite so(2)" value={th} min={-9.4} max={9.4} step={0.01} onChange={setTh} format={(x) => f2(x)} />}
      observations={[
        { id: 'tour', text: String.raw`Avance de $2\pi$ sur la droite : le repère revient à sa position.`, done: Math.abs(th - 1) > TAU - 0.05 },
        { id: 'kernel', text: String.raw`Place $\theta$ en $2\pi$ : on obtient l'identité, comme en $0$.`, done: Math.abs(Math.abs(th) - TAU) < 0.03 },
        { id: 'negatif', text: 'Un θ négatif fait tourner en sens horaire : exp est surjective sur le cercle.', done: th < -0.5 },
      ]}
      readings={[
        { label: String.raw`$R_\theta$`, value: `[[${f2(Math.cos(th), 3)} ; ${f2(-Math.sin(th), 3)}], [${f2(Math.sin(th), 3)} ; ${f2(Math.cos(th), 3)}]]`, status: 'exact' },
        { label: String.raw`$\theta$ modulo $2\pi$`, value: f2(base, 4), status: 'exact' },
      ]}
    />
  );
}
