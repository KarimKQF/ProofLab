/**
 * Planche 18 — Connexion, transport parallèle et géodésique.
 * Transport le long de la latitude de colatitude θ₀ : dans le repère orthonormé (e_θ, e_φ),
 * le vecteur tourne d'un angle −s cos θ₀ ; il garde son angle sur l'équateur (géodésique).
 * Entre deux points d'une même latitude, l'arc de grand cercle est plus court que l'arc de latitude.
 */
import { useState } from 'react';
import { PlateScene } from '../PlateScene';
import { f2, Slider } from '../kit2d';
import { Arrow3, Globe, Point3, Polyline3, Scene3D } from '../kit3d';
import { PlayButton, usePlayer } from '../hooks';
import { greatArc, sph, TAU } from '../math';

function frame(theta: number, phi: number) {
  const eT = [Math.cos(theta) * Math.cos(phi), Math.cos(theta) * Math.sin(phi), -Math.sin(theta)];
  const eP = [-Math.sin(phi), Math.cos(phi), 0];
  return { eT, eP };
}

export default function P18() {
  const [th0, setTh0] = useState(Math.PI / 2);
  const [s, setS] = useState(1.6);
  const [psi0, setPsi0] = useState(0.7);
  const [th1, setTh1] = useState(0.9);
  const [dphi, setDphi] = useState(2);
  const player = usePlayer(6000, (k) => setS(k * TAU));
  const vec = (sv: number) => {
    const { eT, eP } = frame(th0, sv);
    const ang = psi0 - sv * Math.cos(th0);
    return eT.map((x, i) => Math.cos(ang) * x + Math.sin(ang) * eP[i]!);
  };
  const lat = Array.from({ length: 121 }, (_, k) => sph(th0, (TAU * k) / 120));
  const marks = Array.from({ length: 12 }, (_, k) => (TAU * k) / 12).filter((x) => x <= s + 1e-9);
  const holo = (((-s * Math.cos(th0)) % TAU) + TAU) % TAU;
  const capArea = TAU * (1 - Math.cos(th0));

  const transport = (
    <Scene3D label="Transport parallèle le long d'une latitude" camera={[2.6, -2.6, 1.8]} height={340}>
      <Globe />
      <Polyline3 points={lat} color="#1a9e96" width={1.8} />
      {marks.map((m) => {
        const p = sph(th0, m);
        const v = vec(m);
        return <Arrow3 key={m} a={p} b={p.map((x, i) => x + 0.32 * v[i]!)} color="#d8743a" />;
      })}
      <Point3 p={sph(th0, s)} color="#e8eaef" size={0.04} />
      <Arrow3 a={sph(th0, s)} b={sph(th0, s).map((x, i) => x + 0.4 * vec(s)[i]!)} color="#8a6fd6" />
    </Scene3D>
  );

  const A = sph(th1, 0);
  const B = sph(th1, dphi);
  const great = greatArc(A, B, 60);
  const latArc = Array.from({ length: 61 }, (_, k) => sph(th1, (dphi * k) / 60));
  const lg = Math.acos(Math.min(1, A[0] * B[0] + A[1] * B[1] + A[2] * B[2]));
  const ll = dphi * Math.sin(th1);
  const paths = (
    <Scene3D label="Deux chemins entre deux points d’une même latitude" camera={[1.6, 2, 2.4]} height={340}>
      <Globe />
      <Polyline3 points={great} color="#1a9e96" width={2.4} />
      <Polyline3 points={latArc} color="#d8743a" width={2.4} />
      <Point3 p={A} color="#e8eaef" size={0.05} />
      <Point3 p={B} color="#e8eaef" size={0.05} />
    </Scene3D>
  );

  return (
    <PlateScene
      n={18}
      panels={[
        { title: 'Transport parallèle le long d’une latitude', render: () => transport },
        { title: 'Comparer deux chemins sur la sphère', render: () => paths },
      ]}
      identity={String.raw`$\nabla_{\gamma'}V=0$ (transport), $\ \nabla_{\gamma'}\gamma'=0$ (géodésique) ; sur la latitude $\theta_0$, angle du transporté dans $(e_\theta,e_\varphi)$ : $\psi_0-s\cos\theta_0$.`}
      controls={
        <>
          <Slider label="Colatitude θ₀ du chemin (90° = équateur)" value={th0} min={0.3} max={2.84} step={0.01} onChange={setTh0} format={(x) => `${Math.round((x * 180) / Math.PI)}°`} />
          <Slider
            label="Avancement s le long du chemin"
            value={s}
            min={0}
            max={TAU}
            step={0.01}
            onChange={(x) => {
              player.stop();
              setS(x);
            }}
            format={(x) => `${Math.round((x * 180) / Math.PI)}°`}
          />
          <PlayButton player={player} label="Transporter" />
          <Slider label="Angle initial du vecteur" value={psi0} min={0} max={TAU} step={0.01} onChange={setPsi0} format={(x) => `${Math.round((x * 180) / Math.PI)}°`} />
          <Slider label="Colatitude des deux points (panneau de droite)" value={th1} min={0.25} max={1.57} step={0.01} onChange={setTh1} format={(x) => `${Math.round((x * 180) / Math.PI)}°`} />
          <Slider label="Écart en longitude" value={dphi} min={0.2} max={3.1} step={0.01} onChange={setDphi} format={(x) => `${Math.round((x * 180) / Math.PI)}°`} />
        </>
      }
      observations={[
        { id: 'equateur', text: 'Sur l’équateur, le vecteur transporté garde le même angle avec le chemin.', done: Math.abs(th0 - Math.PI / 2) < 0.02 && s > 3 },
        { id: 'latitude', text: 'Sur une autre latitude, il tourne : après un tour, il ne revient pas à lui-même.', done: Math.abs(th0 - Math.PI / 2) > 0.3 && s > TAU - 0.05 },
        { id: 'court', text: 'Le grand cercle est plus court que l’arc de latitude, sauf sur l’équateur.', done: th1 < 1.2 && dphi > 1.5 },
      ]}
      readings={[
        { label: 'Rotation du vecteur après le tour (mod 360°)', value: `${f2((holo * 180) / Math.PI, 1)}°`, status: 'exact' },
        { label: String.raw`Aire de la calotte $2\pi(1-\cos\theta_0)$, en degrés`, value: `${f2((((capArea % TAU) + TAU) % TAU) * 180 / Math.PI, 1)}°`, status: 'exact' },
        { label: 'Grand cercle et arc de latitude', value: `${f2(lg, 3)} ; ${f2(ll, 3)}`, status: 'exact' },
      ]}
      note="Après un tour complet, la rotation du vecteur transporté égale l’aire de la calotte, modulo 2π : c’est l’holonomie de la sphère unité."
    />
  );
}
