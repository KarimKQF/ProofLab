/**
 * Planche 38 — Représentation adjointe Ad.
 * La rotation e^{tω̂} tourne autour de ω ; conjuguée par R, elle tourne autour de Rω :
 * R e^{tω̂} R⁻¹ = e^{t(Rω)^}. Ad_R ω̂ = (Rω)^.
 */
import { useState } from 'react';
import { PlateScene } from '../PlateScene';
import { f2, Slider } from '../kit2d';
import { Arrow3, Point3, Polyline3, Scene3D } from '../kit3d';
import { rotAxis, TAU } from '../math';

export default function P38() {
  const [rho, setRho] = useState(1.2);
  const [t, setT] = useState(1.4);
  const w: [number, number, number] = [1, 0, 0];
  const Rw = rotAxis([0, 0, 1], rho, w);
  const p0: [number, number, number] = [0.6, 0.7, 0.2];
  const orbit0 = Array.from({ length: 97 }, (_, k) => rotAxis(w, (TAU * k) / 96, p0));
  const Rp0 = rotAxis([0, 0, 1], rho, p0);
  // R e^{tω̂} R⁻¹ appliquée à R p0 = R e^{tω̂} p0.
  const conjOrbit = orbit0.map((q) => rotAxis([0, 0, 1], rho, q));
  const pt = rotAxis([0, 0, 1], rho, rotAxis(w, t, p0));
  const direct = rotAxis(Rw, t, Rp0);
  const err = Math.hypot(...pt.map((x, i) => x - direct[i]!));
  const left = (
    <Scene3D label="Rotation autour de l'axe initial" camera={[2.6, -2.8, 1.8]} height={320} showAxes axes={1.3}>
      <Arrow3 a={[0, 0, 0]} b={w.map((x) => 1.3 * x)} color="#1a9e96" />
      <Polyline3 points={orbit0} color="#4a86d0" width={2} />
      <Point3 p={rotAxis(w, t, p0)} color="#8a6fd6" size={0.06} />
    </Scene3D>
  );
  const right = (
    <Scene3D label="Axe tourné par conjugaison" camera={[2.6, -2.8, 1.8]} height={320} showAxes axes={1.3}>
      <Arrow3 a={[0, 0, 0]} b={w.map((x) => 1.1 * x)} color="#9aa5b4" />
      <Arrow3 a={[0, 0, 0]} b={Rw.map((x) => 1.3 * x)} color="#d8743a" />
      <Polyline3 points={conjOrbit} color="#4a86d0" width={2} />
      <Point3 p={pt} color="#8a6fd6" size={0.06} />
    </Scene3D>
  );
  return (
    <PlateScene
      n={38}
      panels={[
        { title: 'Rotation autour de l’axe initial', render: () => left },
        { title: 'Axe tourné par conjugaison', render: () => right },
      ]}
      identity={String.raw`$\mathrm{Ad}_gX=(d\,\mathrm{Conj}_g)_eX=gXg^{-1}$, $\quad\mathrm{Ad}_R\widehat\omega=\widehat{R\omega}$, $\quad Re^{t\widehat\omega}R^{-1}=e^{t\widehat{R\omega}}$.`}
      controls={
        <>
          <Slider label="R : rotation d’angle ρ autour de z" value={rho} min={0} max={6.28} step={0.01} onChange={setRho} format={(x) => `${Math.round((x * 180) / Math.PI)}°`} />
          <Slider label="Temps t" value={t} min={0} max={6.28} step={0.01} onChange={setT} format={(x) => f2(x)} />
        </>
      }
      observations={[
        { id: 'axe', text: String.raw`Fais varier $\rho$ : l'axe de la rotation conjuguée suit $R\omega$ (orange).`, done: Math.abs(rho - 1.2) > 0.8 },
        { id: 'meme', text: String.raw`Le point violet tourne autour de $R\omega$ du même angle $t$ que l'original autour de $\omega$.`, done: Math.abs(t - 1.4) > 1 },
        { id: 'identite', text: String.raw`Pour $\rho=0$, $R=I$ et l'adjointe ne change rien.`, done: rho < 0.02 },
      ]}
      readings={[
        { label: String.raw`$R\omega$`, value: `(${Rw.map((x) => f2(x, 3)).join(' ; ')})`, status: 'exact' },
        { label: String.raw`$|Re^{t\widehat\omega}R^{-1}(Rp)-e^{t\widehat{R\omega}}(Rp)|$`, value: f2(err, 12), status: 'exact' },
      ]}
    />
  );
}
