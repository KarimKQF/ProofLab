/**
 * Planche 25 — Orbites, stabilisateurs et types d'actions.
 * Rotations autour de z : l'orbite d'un point est son parallèle, les pôles sont fixes.
 * SO(3) agit sur S² ; le stabilisateur d'un point p est le cercle des rotations d'axe p.
 */
import { useState } from 'react';
import { PlateScene } from '../PlateScene';
import { f2, Slider } from '../kit2d';
import { Globe, Point3, Polyline3, Scene3D, Segment3 } from '../kit3d';
import { PlayButton, usePlayer } from '../hooks';
import { rotAxis, sph, TAU } from '../math';

export default function P25() {
  const [th, setTh] = useState(0.7);
  const [t, setT] = useState(0.8);
  const [a, setA] = useState(0.5);
  const [b, setB] = useState(0.3);
  const player = usePlayer(6000, (k) => setT(k * TAU));
  const p = sph(th, 0);
  const pt = sph(th, t);
  const orbit = Array.from({ length: 97 }, (_, k) => sph(th, (TAU * k) / 96));
  const pole = th < 0.02 || th > Math.PI - 0.02;

  const orbits = (
    <Scene3D label="Orbites sous les rotations autour de z" camera={[2.6, -2.4, 1.6]} height={330} showAxes axes={1.5} axisLabels={['x', 'y', 'z']}>
      <Globe />
      {[0.5, 1.2, 1.9, 2.6].map((c) => (
        <Polyline3 key={c} points={Array.from({ length: 97 }, (_, k) => sph(c, (TAU * k) / 96))} color="#9aa5b4" width={0.8} />
      ))}
      {!pole && <Polyline3 points={orbit} color="#d8743a" width={2.4} />}
      <Point3 p={p} color="#e8eaef" size={0.05} />
      <Point3 p={pt} color="#d8743a" size={0.07} />
      <Point3 p={[0, 0, 1]} color="#d55181" size={0.06} />
      <Point3 p={[0, 0, -1]} color="#d55181" size={0.06} />
    </Scene3D>
  );

  // Stabilisateur d'un point quelconque q (colatitude a, longitude b) : rotations d'axe q.
  const q = sph(a, b);
  const y0 = sph(a + 0.55, b);
  const fiber = Array.from({ length: 97 }, (_, k) => rotAxis(q, (TAU * k) / 96, y0));
  const stab = (
    <Scene3D label="Rotations qui fixent un point" camera={[2.6, -2.4, 1.6]} height={330}>
      <Globe />
      <Segment3 a={q.map((x) => -1.5 * x)} b={q.map((x) => 1.5 * x)} color="#d55181" width={1.2} dashed />
      <Polyline3 points={fiber} color="#1a9e96" width={2.2} />
      <Point3 p={q} color="#d55181" size={0.07} />
      <Point3 p={rotAxis(q, t, y0)} color="#1a9e96" size={0.06} />
    </Scene3D>
  );

  return (
    <PlateScene
      n={25}
      panels={[
        { title: 'Orbites sous les rotations autour de z', render: () => orbits },
        { title: 'Rotations qui fixent un point', render: () => stab },
      ]}
      identity={String.raw`$G\cdot p=\{g\cdot p:g\in G\}$, $\quad G_p=\{g:g\cdot p=p\}$, $\quad G/G_p\simeq G\cdot p$ ; $\ SO(3)_p\simeq SO(2)$.`}
      controls={
        <>
          <Slider label="Colatitude du point (panneau de gauche)" value={th} min={0} max={Math.PI} step={0.01} onChange={setTh} format={(x) => `${Math.round((x * 180) / Math.PI)}°`} />
          <Slider
            label="Angle de rotation t"
            value={t}
            min={0}
            max={TAU}
            step={0.01}
            onChange={(x) => {
              player.stop();
              setT(x);
            }}
            format={(x) => `${Math.round((x * 180) / Math.PI)}°`}
          />
          <PlayButton player={player} label="Faire tourner" />
          <Slider label="Point fixé : colatitude" value={a} min={0} max={Math.PI} step={0.01} onChange={setA} format={(x) => `${Math.round((x * 180) / Math.PI)}°`} />
          <Slider label="Point fixé : longitude" value={b} min={0} max={TAU} step={0.01} onChange={setB} format={(x) => `${Math.round((x * 180) / Math.PI)}°`} />
        </>
      }
      observations={[
        { id: 'parallele', text: 'Fais tourner : le point décrit son parallèle, son orbite sous les rotations autour de z.', done: t > 3 && !pole },
        { id: 'pole', text: 'Place le point au pôle : il ne bouge plus, son orbite est réduite à un point.', done: pole },
        { id: 'stab', text: 'À droite, les rotations d’axe q fixent q et font tourner les autres points sur des cercles.', done: Math.abs(a - 0.5) > 0.4 || Math.abs(b - 0.3) > 0.8 },
      ]}
      readings={[
        { label: 'Dimension de l’orbite sous SO(2)_z', value: pole ? '0 (point fixe)' : '1 (un parallèle)', status: 'exact' },
        { label: 'Rayon du parallèle', value: f2(Math.sin(th), 3), status: 'exact' },
        { label: String.raw`$\dim SO(3)-\dim SO(3)_q=\dim S^2$`, value: '3 − 1 = 2', status: 'exact' },
      ]}
    />
  );
}
