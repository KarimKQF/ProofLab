/**
 * Planche 5 — Fibré tangent et changement de base.
 * Un champ X(θ) = c(θ)·Jp le long du cercle ; sa section dans TS¹ ≃ S¹ × ℝ est une courbe
 * du cylindre, de hauteur le coefficient tangent c(θ).
 */
import { useState } from 'react';
import { PlateScene } from '../PlateScene';
import { Arrow, C, Caption, Circle, DragOnCurve, f2, Plot, Slider } from '../kit2d';
import { ParamSurface, Point3, Polyline3, Scene3D, Segment3 } from '../kit3d';
import { TAU } from '../math';

export default function P05() {
  const [a, setA] = useState(0.5);
  const [b, setB] = useState(0.35);
  const [th0, setTh0] = useState(0.8);
  const c = (t: number) => a + b * Math.cos(t);
  const minC = Math.min(...Array.from({ length: 361 }, (_, k) => c((TAU * k) / 360)));
  const maxC = Math.max(...Array.from({ length: 361 }, (_, k) => c((TAU * k) / 360)));
  const vanishes = minC <= 0 && maxC >= 0;
  const zero = Math.abs(a) < 1e-9 && Math.abs(b) < 1e-9;
  const K = 0.55; // échelle verticale

  const plane = (
    <div>
      <Plot xDomain={[-1.9, 1.9]} yDomain={[-1.9, 1.9]} width={360} height={360} grid={false} ariaLabel="Un vecteur tangent par point du cercle">
        <Circle c={[0, 0]} r={1} color={C.blue} width={1.8} />
        {Array.from({ length: 16 }, (_, k) => {
          const t = (TAU * k) / 16;
          const p: [number, number] = [Math.cos(t), Math.sin(t)];
          const s = c(t) * 0.6;
          return <Arrow key={k} a={p} b={[p[0] - s * p[1], p[1] + s * p[0]]} color={C.teal} width={1.6} />;
        })}
        <Arrow a={[Math.cos(th0), Math.sin(th0)]} b={[Math.cos(th0) - c(th0) * 0.6 * Math.sin(th0), Math.sin(th0) + c(th0) * 0.6 * Math.cos(th0)]} color={C.orange} width={2.8} />
        <DragOnCurve curve={(s) => [Math.cos(s), Math.sin(s)]} s={th0} range={[0, TAU]} onChange={setTh0} name="Point du cercle" label="p" color={C.orange} />
      </Plot>
      <Caption>Le vecteur en p vaut c(θ)·Jp, avec c(θ) = a + b cos θ.</Caption>
    </div>
  );

  const section = Array.from({ length: 121 }, (_, k) => {
    const t = (TAU * k) / 120;
    return [Math.cos(t), Math.sin(t), K * c(t)];
  });
  const cylinder = (
    <div>
      <Scene3D label="Le fibré tangent du cercle comme cylindre" camera={[3.2, -2.6, 2]} height={360}>
        <ParamSurface f={(t, h) => [Math.cos(t), Math.sin(t), h]} u={[0, TAU, 60]} v={[-1.2, 1.2, 8]} color="#4a86d0" opacity={0.22} wire deps={[]} />
        <Polyline3 points={Array.from({ length: 121 }, (_, k) => [Math.cos((TAU * k) / 120), Math.sin((TAU * k) / 120), 0])} color="#9aa5b4" width={1.2} />
        <Polyline3 points={section} color="#1a9e96" width={2.6} />
        <Segment3 a={[Math.cos(th0), Math.sin(th0), -1.2]} b={[Math.cos(th0), Math.sin(th0), 1.2]} color="#d8743a" width={1.4} />
        <Point3 p={[Math.cos(th0), Math.sin(th0), K * c(th0)]} color="#d8743a" size={0.06} />
      </Scene3D>
      <Caption>Hauteur = coefficient tangent. Gris : section nulle ; orange : la fibre au-dessus de p.</Caption>
    </div>
  );

  return (
    <PlateScene
      n={5}
      panels={[
        { title: 'Un vecteur par point choisi', render: () => plane },
        { title: String.raw`$TS^1\simeq S^1\times\mathbb R$`, render: () => cylinder },
      ]}
      identity={String.raw`$TM=\{(p,v):p\in M,\ v\in T_pM\}$, $\ \pi(p,v)=p$ ; $\ TS^1\to S^1\times\mathbb R$, $(p,\,c\,Jp)\mapsto(p,c)$.`}
      controls={
        <>
          <Slider label="Coefficient constant a" value={a} min={-1} max={1} step={0.05} onChange={setA} format={(x) => f2(x)} />
          <Slider label="Coefficient b de cos θ" value={b} min={-1} max={1} step={0.05} onChange={setB} format={(x) => f2(x)} />
        </>
      }
      observations={[
        { id: 'nulle', text: 'Annule a et b : la section est le cercle de hauteur 0, la section nulle.', done: zero },
        { id: 'partout', text: String.raw`Choisis $|b|<|a|$ : la courbe ne croise jamais la hauteur $0$, le champ ne s'annule pas.`, done: !vanishes && Math.abs(a) > 0.1 },
        { id: 'zeros', text: String.raw`Choisis $|b|>|a|$ : la courbe traverse la section nulle, le champ a des zéros.`, done: vanishes && !zero && Math.abs(b) > Math.abs(a) + 0.05 },
      ]}
      readings={[
        { label: String.raw`$c(\theta)$ au point $p$`, value: f2(c(th0), 3), status: 'exact' },
        { label: String.raw`$\min c$, $\max c$`, value: `${f2(minC, 3)} ; ${f2(maxC, 3)}`, status: 'exact' },
        { label: 'Le champ s’annule ?', value: zero ? 'partout' : vanishes ? 'oui' : 'non', status: 'exact' },
      ]}
      note="Un champ partout non nul sur le cercle donne une base de chaque droite tangente : c’est ce qui rend TS¹ difféomorphe au cylindre S¹ × ℝ."
    />
  );
}
