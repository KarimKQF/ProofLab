/**
 * Planche 35 — SO(3), produit vectoriel et formule de Rodrigues.
 * ω̂v = ω × v est tangent à l'orbite circulaire de v ; e^{θω̂}v la parcourt. Le crochet de
 * deux générateurs crée le troisième axe : [â, b̂] = (a × b)^.
 */
import { useState } from 'react';
import { PlateScene } from '../PlateScene';
import { f2, Slider } from '../kit2d';
import { Arrow3, Point3, Polyline3, Scene3D } from '../kit3d';
import { hat, matMul, rotAxis, sph, TAU, vcross } from '../math';

export default function P35() {
  const [wt, setWt] = useState(0.3);
  const [wp, setWp] = useState(0.2);
  const [th, setTh] = useState(1.6);
  const [bt, setBt] = useState(1.3);
  const [bp, setBp] = useState(1.6);
  const w = sph(wt, wp);
  const v: [number, number, number] = [1, 0, 0.3];
  const wxv = vcross(w, v);
  const orbit = Array.from({ length: 97 }, (_, k) => rotAxis(w, (TAU * k) / 96, v));
  const arc = Array.from({ length: 41 }, (_, k) => rotAxis(w, (th * k) / 40, v));
  const img = rotAxis(w, th, v);

  const a: [number, number, number] = [1, 0, 0];
  const b = sph(bt, bp);
  const axb = vcross(a, b);
  const A = hat(a);
  const B = hat(b);
  const AB = matMul(A, B);
  const BA = matMul(B, A);
  const com = AB.map((r, i) => r.map((x, j) => x - BA[i]![j]!));
  const comVee = [com[2]![1]!, com[0]![2]!, com[1]![0]!];
  const err = Math.hypot(...comVee.map((x, i) => x - axb[i]!));

  const rod = (
    <Scene3D label="Axe, vecteur tangent et angle fini" camera={[2.6, -2.6, 1.8]} height={330} showAxes axes={1.4}>
      <Arrow3 a={[0, 0, 0]} b={w.map((x) => 1.4 * x)} color="#d8743a" />
      <Polyline3 points={orbit} color="#9aa5b4" width={1} />
      <Polyline3 points={arc} color="#1a9e96" width={2.6} />
      <Arrow3 a={[0, 0, 0]} b={v} color="#4a86d0" />
      <Arrow3 a={v} b={v.map((x, i) => x + 0.6 * wxv[i]!)} color="#8a6fd6" />
      <Arrow3 a={[0, 0, 0]} b={img} color="#1a9e96" />
      <Point3 p={img} color="#1a9e96" size={0.05} />
    </Scene3D>
  );
  const bracket = (
    <Scene3D label="Le crochet crée un troisième axe" camera={[2.6, -2.6, 1.8]} height={330} showAxes axes={1.4}>
      <Arrow3 a={[0, 0, 0]} b={a} color="#1a9e96" />
      <Arrow3 a={[0, 0, 0]} b={b} color="#d8743a" />
      <Arrow3 a={[0, 0, 0]} b={axb} color="#8a6fd6" />
    </Scene3D>
  );
  return (
    <PlateScene
      n={35}
      panels={[
        { title: 'Axe, vecteur tangent et angle fini', render: () => rod },
        { title: 'Le crochet crée un troisième axe', render: () => bracket },
      ]}
      identity={String.raw`$\widehat\omega v=\omega\times v$, $\quad e^{\theta\widehat u}=I+\sin\theta\,\widehat u+(1-\cos\theta)\,\widehat u^{\,2}$, $\quad[\widehat a,\widehat b]=\widehat{a\times b}$.`}
      controls={
        <>
          <Slider label="Axe ω : colatitude" value={wt} min={0} max={3.14} step={0.01} onChange={setWt} format={(x) => `${Math.round((x * 180) / Math.PI)}°`} />
          <Slider label="Axe ω : longitude" value={wp} min={0} max={6.28} step={0.01} onChange={setWp} format={(x) => `${Math.round((x * 180) / Math.PI)}°`} />
          <Slider label="Angle θ" value={th} min={0} max={6.28} step={0.01} onChange={setTh} format={(x) => `${Math.round((x * 180) / Math.PI)}°`} />
          <Slider label="Vecteur b : colatitude" value={bt} min={0} max={3.14} step={0.01} onChange={setBt} format={(x) => `${Math.round((x * 180) / Math.PI)}°`} />
          <Slider label="Vecteur b : longitude" value={bp} min={0} max={6.28} step={0.01} onChange={setBp} format={(x) => `${Math.round((x * 180) / Math.PI)}°`} />
        </>
      }
      observations={[
        { id: 'tangent', text: String.raw`Le vecteur violet $\omega\times v$ est tangent au cercle parcouru par $v$.`, done: Math.abs(wt - 0.3) > 0.5 },
        { id: 'tour', text: String.raw`Pour $\theta=2\pi$, $e^{\theta\widehat\omega}v=v$ : un tour complet.`, done: th > TAU - 0.03 },
        { id: 'crochet', text: String.raw`Rends $b$ parallèle à $a$ : $a\times b=0$, les deux générateurs commutent.`, done: Math.hypot(...axb) < 0.05 },
      ]}
      readings={[
        { label: String.raw`$|e^{\theta\widehat\omega}v|-|v|$`, value: f2(Math.hypot(...img) - Math.hypot(...v), 10), status: 'exact' },
        { label: String.raw`$a\times b$`, value: `(${axb.map((x) => f2(x, 3)).join(' ; ')})`, status: 'exact' },
        { label: String.raw`$|[\widehat a,\widehat b]^\vee-a\times b|$`, value: f2(err, 12), status: 'exact' },
      ]}
    />
  );
}
