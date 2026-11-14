/**
 * Planche 80 — Chern–Weil et classes caractéristiques.
 * Deux cartes de S² (hémisphères) se recouvrent le long de l'équateur ; la fonction de
 * transition g(e^{iθ}) = e^{ikθ} fait k tours. Son degré (1/2π)∮ d arg g = k est la classe de
 * Chern c₁ = (1/2π)∫F du fibré en droites obtenu (au signe près selon l'orientation choisie).
 */
import { useState } from 'react';
import { PlateScene } from '../PlateScene';
import { Arrow, C, Caption, Circle, Curve, Dot, f2, Label, Plot, Slider } from '../kit2d';
import { Arrow3, Globe, Polyline3, Scene3D } from '../kit3d';
import { PlayButton, usePlayer } from '../hooks';
import { linspace, TAU } from '../math';

/** Flèche tangente en e^{it} sur l'équateur, tournée de l'angle kt dans le plan (tangente, verticale). */
function clutch(t: number, k: number, len: number) {
  const p = [Math.cos(t), Math.sin(t), 0];
  const tan = [-Math.sin(t), Math.cos(t), 0];
  const up = [0, 0, 1];
  const v = tan.map((x, j) => len * (Math.cos(k * t) * x + Math.sin(k * t) * up[j]!));
  return { p, b: p.map((x, j) => x + v[j]!) };
}

export default function P80() {
  const [k, setK] = useState(1);
  const [th, setTh] = useState(1.5);
  const player = usePlayer(5000, (u) => setTh(TAU * u));
  const eq = linspace(0, TAU, 96).map((t) => [Math.cos(t), Math.sin(t), 0]);
  const arrows = Array.from({ length: 12 }, (_, i) => clutch((TAU * i) / 12, k, 0.35));
  const now = clutch(th, k, 0.5);
  const sphere = (
    <Scene3D label="Deux cartes et leur équateur" camera={[2.4, -2.6, 1.6]} height={300}>
      <Globe />
      <Polyline3 points={eq} color="#d8743a" width={2.2} />
      {arrows.map((a, i) => (
        <Arrow3 key={i} a={a.p} b={a.b} color="#1a9e96" />
      ))}
      <Arrow3 a={now.p} b={now.b} color="#e3b341" />
    </Scene3D>
  );
  // Degré numérique : somme des sauts d'argument de g le long du cercle.
  let deg = 0;
  let prev = 0;
  for (let i = 1; i <= 720; i++) {
    const ang = Math.atan2(Math.sin(k * ((TAU * i) / 720)), Math.cos(k * ((TAU * i) / 720)));
    let d = ang - prev;
    if (d > Math.PI) d -= TAU;
    if (d < -Math.PI) d += TAU;
    deg += d;
    prev = ang;
  }
  deg /= TAU;
  // Spirale : l'argument de g déroulé ; le rayon croît avec θ, chaque tour de g ajoute une spire.
  const rad = (u: number) => 0.4 + (0.5 * u) / TAU;
  const spiral = linspace(0, th, Math.max(8, Math.ceil(th / 0.02))).map((u) => [rad(u) * Math.cos(k * u), rad(u) * Math.sin(k * u)] as [number, number]);
  const tip: [number, number] = [rad(th) * Math.cos(k * th), rad(th) * Math.sin(k * th)];
  const circle = (
    <div>
      <Plot xDomain={[-1.45, 1.45]} yDomain={[-1.45, 1.45]} width={280} height={280} grid={false} ariaLabel="La fonction de transition fait k tours">
        <Circle c={[0, 0]} r={1.22} color={C.orange} width={1.4} />
        <Dot x={1.22 * Math.cos(th)} y={1.22 * Math.sin(th)} color={C.orange} r={5} />
        <Label x={1.22 * Math.cos(th)} y={1.22 * Math.sin(th)} text="θ" color={C.orange} size={13} dx={8} dy={-6} italic />
        <Curve points={spiral} color={C.teal} width={2.4} />
        <Arrow a={[0, 0]} b={tip} color={C.gold} width={2.2} />
      </Plot>
      <Caption>{String.raw`Cercle orange : la position $\theta$ sur l'équateur. Spirale verte : l'argument de $g(e^{i\theta})=e^{ik\theta}$, déroulé — compte ses tours quand $\theta$ en fait un.`}</Caption>
    </div>
  );
  return (
    <PlateScene
      n={80}
      panels={[
        { title: 'Deux cartes et leur équateur', render: () => sphere },
        { title: 'La fonction de transition fait k tours', render: () => circle },
      ]}
      identity={String.raw`$dP(F_A,\dots,F_A)=0$, $[P(F_A)]$ indépendante de $A$ ; $\ c_1=\dfrac1{2\pi}\displaystyle\int_{S^2}F=\deg g=k$.`}
      controls={
        <>
          <Slider
            label="Degré k de la transition"
            value={k}
            min={-3}
            max={3}
            step={1}
            onChange={(v) => {
              player.stop();
              setK(v);
            }}
            format={(v) => String(v)}
          />
          <Slider
            label="Angle θ sur l’équateur"
            value={th}
            min={0}
            max={6.28}
            step={0.01}
            onChange={(v) => {
              player.stop();
              setTh(v);
            }}
            format={(v) => `${Math.round((v * 180) / Math.PI)}°`}
          />
          <PlayButton player={player} label="Faire parcourir l’équateur" />
        </>
      }
      observations={[
        { id: 'trivial', text: 'Avec k = 0, la flèche ne tourne pas le long de l’équateur : le fibré est trivial, c₁ = 0.', done: k === 0 },
        { id: 'deux', text: 'Avec k = 2, fais parcourir tout l’équateur : la flèche dorée fait deux tours pendant que θ en fait un.', done: k === 2 && th > 6.2 },
        { id: 'signe', text: 'Un k négatif change le sens de rotation, donc le signe de la classe.', done: k < 0 },
      ]}
      readings={[{ label: String.raw`$\deg g=\frac1{2\pi}\oint d\arg g$`, value: f2(deg, 6), status: 'numerique' }]}
      note="Le fibré de Hopf correspond à k = ±1, le signe dépendant de l’orientation et de la convention choisies."
    />
  );
}
