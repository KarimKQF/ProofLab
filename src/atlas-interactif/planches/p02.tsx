/**
 * Planche 2 — Cartes et atlas.
 * Deux ouverts U = S¹∖{(−1,0)} et V = S¹∖{(1,0)} et leurs angles ; projection
 * stéréographique depuis le pôle N, dans une coupe méridienne et dans l'espace.
 */
import { useState } from 'react';
import { PlateScene } from '../PlateScene';
import { Arc, C, Caption, Choice, Circle, ClippedCurve, Dot, DragOnCurve, f2, Label, Plot, Segment, Slider } from '../kit2d';
import { Globe, Plane3, Point3, Polyline3, Scene3D } from '../kit3d';
import { sph, TAU } from '../math';

const GAP = 0.13;

export default function P02() {
  const [a, setA] = useState(2.2); // angle de p sur le cercle (panneau 1)
  const [alpha, setAlpha] = useState(1.1); // colatitude de p (coupe méridienne)
  const [beta, setBeta] = useState(0.6); // longitude de p (vue dans l'espace)
  const [pole, setPole] = useState<'N' | 'S'>('N');

  // Panneau 1 : angles des deux cartes.
  const inU = Math.abs(((a % TAU) + TAU) % TAU - Math.PI) > 1e-3;
  const inV = Math.min(a % TAU, TAU - (a % TAU)) > 1e-3;
  const thetaU = Math.atan2(Math.sin(a), Math.cos(a)); // dans ]−π, π[
  const thetaV = ((a % TAU) + TAU) % TAU; // dans ]0, 2π[

  // Panneau 2 : coupe méridienne, p = (sin α, cos α).
  const px = Math.sin(alpha);
  const pz = Math.cos(alpha);
  const sign = pole === 'N' ? 1 : -1;
  const proj = px / (1 - sign * pz);
  const far = !Number.isFinite(proj) || Math.abs(proj) > 3.1;

  const circle = (
    <div>
      <Plot xDomain={[-1.55, 1.55]} yDomain={[-1.55, 1.55]} width={380} height={380} grid={false} ariaLabel="Deux domaines de cartes sur le cercle">
        <Arc c={[0, 0]} r={1.13} a0={-Math.PI + GAP} a1={Math.PI - GAP} color={C.orange} width={3} />
        <Arc c={[0, 0]} r={1.26} a0={GAP} a1={TAU - GAP} color={C.teal} width={3} />
        <Circle c={[0, 0]} r={1} color={C.blue} width={1.6} />
        <Circle c={[-1.13, 0]} r={0.045} color={C.orange} width={2} />
        <Circle c={[1.26, 0]} r={0.045} color={C.teal} width={2} />
        <Label x={0} y={0.32} text="U = S¹ ∖ {(−1, 0)}" color={C.orange} anchor="middle" size={12} italic />
        <Label x={0} y={-0.38} text="V = S¹ ∖ {(1, 0)}" color={C.teal} anchor="middle" size={12} italic />
        <DragOnCurve curve={(s) => [Math.cos(s), Math.sin(s)]} s={a} range={[0, TAU]} onChange={setA} name="Point p sur le cercle" label="p" color={C.violet} />
      </Plot>
      <Caption>Les arcs sont décalés pour la lecture.</Caption>
    </div>
  );

  const section = (
    <div>
      <Plot xDomain={[-3.2, 3.2]} yDomain={[-1.45, 1.45]} width={420} height={190} grid={false} ariaLabel="Projection stéréographique dans une coupe méridienne">
        <Segment a={[-3.2, 0]} b={[3.2, 0]} color={C.muted} width={1} />
        <Circle c={[0, 0]} r={1} color={C.blue} width={1.6} />
        <ClippedCurve points={[[0, sign], [px, pz], ...(far ? [] : [[proj, 0]])]} domain={[-3.2, 3.2, -1.45, 1.45]} color={C.orange} width={2} />
        <Dot x={0} y={sign} color={C.blue} label={pole} r={4} />
        {!far && <Dot x={proj} y={0} color={C.orange} label={`φ${pole === 'N' ? 'N' : 'S'}(p)`} r={4.5} dy={16} />}
        <DragOnCurve curve={(s) => [Math.sin(s), Math.cos(s)]} s={alpha} range={[0.02, TAU - 0.02]} onChange={setAlpha} name="Point p de la coupe méridienne" label="p" color={C.violet} />
        <Label x={3.15} y={0.12} text="z = 0" color={C.muted} anchor="end" size={11} />
      </Plot>
      <Caption>{far ? 'p est trop près du pôle : son image part à l’infini.' : `φ(p) = ${f2(proj)} sur la droite z = 0.`}</Caption>
    </div>
  );

  const P = sph(alpha, beta);
  const denom = 1 - sign * P[2];
  const img: [number, number, number] = [P[0] / denom, P[1] / denom, 0];
  const imgOk = Math.hypot(img[0], img[1]) < 5;
  const space = (
    <div>
      <Scene3D label="Projection stéréographique de la sphère sur le plan z = 0" camera={[3.4, -3.8, 2.6]} height={300} showAxes>
        <Globe />
        <Plane3 n={[0, 0, 1]} c={0} size={5} color="#9aa5b4" opacity={0.12} />
        <Point3 p={[0, 0, sign]} color="#4a86d0" size={0.06} />
        <Point3 p={P} color="#8a6fd6" size={0.07} />
        {imgOk && <Point3 p={img} color="#d8743a" size={0.07} />}
        <Polyline3 points={imgOk ? [[0, 0, sign], P, img] : [[0, 0, sign], P]} color="#d8743a" width={1.6} />
      </Scene3D>
      <Caption>La droite issue du pôle traverse p puis rencontre le plan z = 0.</Caption>
    </div>
  );

  return (
    <PlateScene
      n={2}
      panels={[
        { title: 'Deux domaines sur le cercle', render: () => circle },
        { title: 'Sphère, coupe méridienne', render: () => section },
        { title: 'Dans l’espace', render: () => space, wide: true },
      ]}
      identity={String.raw`$p=(x,y,z)\neq N\ \Rightarrow\ \phi_N(p)=\Big(\dfrac{x}{1-z},\dfrac{y}{1-z}\Big)$, $\quad\phi_S\circ\phi_N^{-1}(u)=\dfrac{u}{|u|^2}$ sur $\mathbb R^2\setminus\{0\}$.`}
      controls={
        <>
          <Choice
            name="Pôle de projection"
            value={pole}
            onChange={setPole}
            options={[
              { id: 'N', label: 'Depuis N' },
              { id: 'S', label: 'Depuis S' },
            ]}
          />
          <Slider label="Colatitude de p (coupe et espace)" value={alpha} min={0.02} max={TAU - 0.02} step={0.01} onChange={setAlpha} format={(v) => `${Math.round((v * 180) / Math.PI)}°`} />
          <Slider label="Longitude de p (espace)" value={beta} min={0} max={TAU} step={0.01} onChange={setBeta} format={(v) => `${Math.round((v * 180) / Math.PI)}°`} />
          <p className="text-[12.5px] text-text-3">Sur le cercle de gauche, fais glisser p ; ses deux angles de carte s’affichent à droite.</p>
        </>
      }
      observations={[
        { id: 'hors-U', text: String.raw`Place $p$ en $(-1,0)$ : seule la carte $V$ le voit.`, done: !inU || Math.abs(thetaU) > Math.PI - 0.06 },
        { id: 'transition', text: String.raw`Sur la moitié inférieure du cercle, les deux angles diffèrent de $2\pi$ : c'est la fonction de transition.`, done: thetaU < -0.2 && thetaU > -Math.PI + 0.2 },
        { id: 'pole', text: 'Approche p du pôle de projection : son image part à l’infini, le pôle n’a pas d’image.', done: far },
        { id: 'autre-pole', text: 'Change de pôle : le point qui n’avait pas d’image en a une, l’autre carte le couvre.', done: pole === 'S' },
      ]}
      readings={[
        { label: String.raw`$p\in U$ ? $\ p\in V$ ?`, value: `${inU ? 'oui' : 'non'} ; ${inV ? 'oui' : 'non'}`, status: 'exact' },
        { label: String.raw`Angle dans la carte $U$, dans $]-\pi,\pi[$`, value: inU ? f2(thetaU, 3) : '—', status: 'exact' },
        { label: String.raw`Angle dans la carte $V$, dans $]0,2\pi[$`, value: inV ? f2(thetaV, 3) : '—', status: 'exact' },
        { label: 'Image stéréographique (coupe)', value: far ? 'hors champ' : f2(proj, 3), status: 'exact' },
      ]}
    />
  );
}

