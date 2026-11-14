/**
 * Planche 36 — SO(3), SU(2) et revêtement double.
 * Boule axe-angle de rayon π : la rotation d'angle θ autour de u est le point θu, ramené dans
 * [−π, π] (bord : πu ∼ −πu). Le relevé q(θ) = cos(θ/2) + u sin(θ/2) fait un demi-tour du
 * cercle de ℍ quand θ fait un tour : −1 en θ = 2π, 1 en θ = 4π.
 */
import { useState } from 'react';
import { PlateScene } from '../PlateScene';
import { Arc, C, Caption, Circle, Dot, f2, Label, Plot, Segment, Slider } from '../kit2d';
import { PlayButton, usePlayer } from '../hooks';
import { TAU } from '../math';

const wrap = (t: number) => ((((t + Math.PI) % TAU) + TAU) % TAU) - Math.PI;

export default function P36() {
  const [th, setTh] = useState(2.4);
  const player = usePlayer(8000, (k) => setTh(4 * Math.PI * k));
  const beta = wrap(th);
  const crossings = th < Math.PI ? 0 : Math.floor((th - Math.PI) / TAU + 1e-9) + 1;
  const ball = (
    <div>
      <Plot xDomain={[-3.8, 3.8]} yDomain={[-3.8, 3.8]} width={300} height={300} grid={false} ariaLabel="Coupe de la boule axe-angle">
        <Circle c={[0, 0]} r={Math.PI} color={C.blue} width={2} />
        {[0.5, 1.4, 2.2, 3].map((a) => (
          <Segment key={a} a={[-Math.PI * Math.cos(a), -Math.PI * Math.sin(a)]} b={[Math.PI * Math.cos(a), Math.PI * Math.sin(a)]} color={C.faint} width={0.8} dash="3 4" />
        ))}
        <Segment a={[0, 0]} b={[beta, 0]} color={C.teal} width={3} />
        <Dot x={Math.PI} y={0} color={C.orange} label="πu" r={4} />
        <Dot x={-Math.PI} y={0} color={C.orange} label="−πu" r={4} dx={-30} />
        <Dot x={beta} y={0} color={C.teal} r={6} />
      </Plot>
      <Caption>{String.raw`Le point $\beta u$, $\beta=\theta$ ramené dans $[-\pi,\pi]$ ; au bord, $\pi u\sim-\pi u$.`}</Caption>
    </div>
  );
  const half = th / 2;
  const lift = (
    <div>
      <Plot xDomain={[-1.5, 1.5]} yDomain={[-1.5, 1.5]} width={300} height={300} grid={false} ariaLabel="Relèvement dans SU(2)">
        <Circle c={[0, 0]} r={1} color={C.faint} width={1.2} />
        <Arc c={[0, 0]} r={1} a0={0} a1={Math.min(half, Math.PI)} color={C.teal} width={3.2} />
        {half > Math.PI && <Arc c={[0, 0]} r={1} a0={Math.PI} a1={half} color={C.orange} width={3.2} />}
        <Dot x={1} y={0} color={C.ink} label="1" r={4} dx={8} />
        <Dot x={-1} y={0} color={C.ink} label="−1" r={4} dx={-24} />
        <Dot x={Math.cos(half)} y={Math.sin(half)} color={half > Math.PI ? C.orange : C.teal} r={6} />
        <Label x={0} y={0.4} text="0 ≤ θ ≤ 2π" color={C.teal} anchor="middle" size={12} />
        <Label x={0} y={-0.45} text="2π ≤ θ ≤ 4π" color={C.orange} anchor="middle" size={12} />
      </Plot>
      <Caption>{String.raw`$q(\theta)=\cos\frac\theta2+u\sin\frac\theta2$ sur le cercle de $\mathbb H$ engendré par $1$ et $u$.`}</Caption>
    </div>
  );
  return (
    <PlateScene
      n={36}
      panels={[
        { title: 'SO(3) : coupe de la boule axe-angle', render: () => ball },
        { title: 'Relèvement dans SU(2)', render: () => lift },
      ]}
      identity={String.raw`$q(\theta)=\cos(\theta/2)+u\sin(\theta/2)$, $\quad qvq^{-1}=(-q)v(-q)^{-1}$, $\quad\pi_1(SO(3))\simeq\mathbb Z/2$.`}
      controls={
        <>
          <Slider
            label="Angle θ de la rotation autour de u"
            value={th}
            min={0}
            max={4 * Math.PI}
            step={0.01}
            onChange={(x) => {
              player.stop();
              setTh(x);
            }}
            format={(x) => `${f2(x / Math.PI, 2)}π`}
          />
          <PlayButton player={player} label="Faire deux tours" />
        </>
      }
      observations={[
        { id: 'bord', text: 'Passe θ = π : le point traverse le bord et réapparaît au point antipodal.', done: th > Math.PI + 0.1 },
        { id: 'moins-un', text: String.raw`Un tour complet ($\theta=2\pi$) : la rotation est l'identité, mais le relevé vaut $-1$.`, done: Math.abs(th - TAU) < 0.05 },
        { id: 'un', text: String.raw`Deux tours ($\theta=4\pi$) : le relevé revient à $1$.`, done: th > 4 * Math.PI - 0.05 },
      ]}
      readings={[
        { label: 'Passages par le bord de la boule', value: String(crossings), status: 'exact' },
        { label: String.raw`$q(\theta)$ : partie réelle`, value: f2(Math.cos(half), 4), status: 'exact' },
      ]}
    />
  );
}
