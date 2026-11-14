/**
 * Planche 39 — Représentation infinitésimale ad.
 * b(t) = R_a(t) b(0) décrit un cône autour de a ; sa dérivée en t = 0 vaut a × b(0) :
 * ad_a(b) = [a, b]. L'écart (b(t) − b(0))/t − a × b(0) est d'ordre 1 en t.
 */
import { useState } from 'react';
import { PlateScene } from '../PlateScene';
import { C, Caption, ClippedCurve, Dot, f2, Plot, Slider } from '../kit2d';
import { Arrow3, Polyline3, Scene3D } from '../kit3d';
import { linspace, rotAxis, sph, TAU, vcross } from '../math';

export default function P39() {
  const [t, setT] = useState(0.8);
  const [bt, setBt] = useState(1.1);
  const a: [number, number, number] = [0, 0, 1];
  const b0 = sph(bt, 0.3);
  const axb = vcross(a, b0);
  const bt_ = rotAxis(a, t, b0);
  const quotient = (s: number) => {
    const b = rotAxis(a, s, b0);
    return Math.hypot(...b.map((x, i) => (x - b0[i]!) / s - axb[i]!));
  };
  const fam = [0.5, 1, 1.5, 2, 2.5].map((s) => rotAxis(a, s, b0));
  const cone = Array.from({ length: 97 }, (_, k) => rotAxis(a, (TAU * k) / 96, b0));
  const fig = (
    <Scene3D label="La famille de flèches Ad" camera={[2.4, -2.6, 1.8]} height={320} showAxes axes={1.3}>
      <Arrow3 a={[0, 0, 0]} b={a.map((x) => 1.3 * x)} color="#e8eaef" />
      <Polyline3 points={cone} color="#9aa5b4" width={1} />
      {fam.map((b, i) => (
        <Arrow3 key={i} a={[0, 0, 0]} b={b} color="#4a86d0" />
      ))}
      <Arrow3 a={[0, 0, 0]} b={b0} color="#1a9e96" />
      <Arrow3 a={[0, 0, 0]} b={bt_} color="#8a6fd6" />
      <Arrow3 a={b0} b={b0.map((x, i) => x + axb[i]!)} color="#d8743a" />
    </Scene3D>
  );
  const xs = linspace(0.01, 2, 120);
  const plot = (
    <div>
      <Plot xDomain={[0, 2]} yDomain={[0, 1]} width={320} height={260} ariaLabel="Écart du quotient différentiel">
        <ClippedCurve points={xs.map((x) => [x, quotient(x)])} domain={[0, 2, 0, 1]} color={C.violet} width={2.4} />
        <Dot x={t} y={quotient(t)} color={C.violet} r={4.5} />
      </Plot>
      <Caption>{String.raw`$\big|\frac{b(t)-b(0)}t-a\times b(0)\big|$ en fonction de $t$ : il tend vers $0$.`}</Caption>
    </div>
  );
  return (
    <PlateScene
      n={39}
      panels={[
        { title: 'La famille de flèches Ad', render: () => fig },
        { title: 'Sa dérivée en t = 0', render: () => plot },
      ]}
      identity={String.raw`$\mathrm{ad}_X(Y)=\dfrac{d}{dt}\mathrm{Ad}_{\exp(tX)}Y\Big|_{t=0}=[X,Y]$ ; dans $\mathfrak{so}(3)\simeq(\mathbb R^3,\times)$ : $\mathrm{ad}_a(b)=a\times b$.`}
      controls={
        <>
          <Slider label="Temps t" value={t} min={0.01} max={2} step={0.01} onChange={setT} format={(x) => f2(x)} />
          <Slider label="Inclinaison de b(0) sur a" value={bt} min={0} max={3.14} step={0.01} onChange={setBt} format={(x) => `${Math.round((x * 180) / Math.PI)}°`} />
        </>
      }
      observations={[
        { id: 'cone', text: String.raw`$b(t)$ (violet) décrit le cône autour de $a$ ; orange : $a\times b(0)$, tangent au cône.`, done: Math.abs(t - 0.8) > 0.5 },
        { id: 'limite', text: String.raw`Réduis $t$ : le quotient $\frac{b(t)-b(0)}t$ tend vers $a\times b(0)$.`, done: t < 0.05 },
        { id: 'axe', text: String.raw`Aligne $b(0)$ sur $a$ : $\mathrm{ad}_a(b)=0$, la famille est constante.`, done: bt < 0.02 || bt > 3.12 },
      ]}
      readings={[
        { label: String.raw`$a\times b(0)$`, value: `(${axb.map((x) => f2(x, 3)).join(' ; ')})`, status: 'exact' },
        { label: 'Écart du quotient en t', value: f2(quotient(t), 5), status: 'exact' },
      ]}
    />
  );
}
