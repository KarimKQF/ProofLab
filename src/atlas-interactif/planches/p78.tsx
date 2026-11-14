/**
 * Planche 78 — Connexion principale, courbure et holonomie.
 * Fibré trivial ℝ² × ℝ (phase φ relevée), connexion A = dφ + x dy. Le relèvement horizontal
 * d'une boucle carrée de côté a vérifie dφ = −x dy, d'où un écart de phase
 * Δφ = −∮x dy = −∫_D dx∧dy = −a² : la courbure F = dx∧dy, intégrée, donne l'holonomie.
 */
import { useState } from 'react';
import { PlateScene } from '../PlateScene';
import { Arrow, C, Caption, f2, Plot, Poly, Slider } from '../kit2d';
import { Point3, Polyline3, Scene3D, Segment3 } from '../kit3d';

const FLOOR = -1.7;

export default function P78() {
  const [a, setA] = useState(1);
  const [x0, setX0] = useState(-0.5);
  const h = a / 2;
  const corners: [number, number][] = [[x0, -h], [x0 + a, -h], [x0 + a, h], [x0, h], [x0, -h]];
  // Relèvement : dφ = −x dy, sommes au point milieu (exactes ici : x est constant sur les arêtes verticales).
  const raw: number[][] = [[x0, -h, 0]];
  const atCorner: number[] = [0];
  let phi = 0;
  for (let e = 0; e < 4; e++) {
    const [xa, ya] = corners[e]!;
    const [xb, yb] = corners[e + 1]!;
    for (let k = 1; k <= 40; k++) {
      const xm = xa + ((xb - xa) * (k - 0.5)) / 40;
      phi -= xm * ((yb - ya) / 40);
      raw.push([xa + ((xb - xa) * k) / 40, ya + ((yb - ya) * k) / 40, phi]);
    }
    atCorner.push(phi);
  }
  // Phase de départ φ₀ choisie pour centrer la figure (l'écart Δφ n'en dépend pas).
  const zs = raw.map((p) => p[2]!);
  const phi0 = 0.3 - (Math.min(...zs) + Math.max(...zs)) / 2;
  const pts = raw.map(([x, y, z]) => [x!, y!, z! + phi0]);
  const start = [x0, -h, phi0];
  const end = [x0, -h, phi + phi0];
  const base = (
    <div>
      <Plot xDomain={[-1.2, 2]} yDomain={[-1.6, 1.6]} width={300} height={300} ariaLabel="Lacet dans la base">
        <Poly points={corners.slice(0, 4)} fill={C.teal} opacity={0.2} stroke={C.teal} width={2} />
        {corners.slice(0, 4).map((c, i) => (
          <Arrow key={i} a={c} b={[(c[0] + corners[i + 1]![0]) / 2, (c[1] + corners[i + 1]![1]) / 2]} color={C.teal} width={2} />
        ))}
      </Plot>
      <Caption>{String.raw`Boucle de la base, parcourue dans le sens direct ; aire $\int_Ddx\wedge dy=a^2$.`}</Caption>
    </div>
  );
  const lift = (
    <Scene3D
      label="Relèvement horizontal"
      camera={[3.4, -3.6, 1.6]}
      height={300}
      labels={[
        { id: 'fibre', p: [x0, -h, 1.25], text: 'fibre du départ', color: '#9aa5b4' },
        { id: 'base', p: [x0 + a + 0.2, h, FLOOR], text: 'base', color: '#9aa5b4' },
      ]}
    >
      <Polyline3 points={corners.map(([x, y]) => [x, y, FLOOR])} color="#1a9e96" width={1.6} />
      {corners.slice(0, 4).map(([x, y], i) => (
        <Segment3 key={i} a={[x, y, FLOOR]} b={[x, y, atCorner[i]! + phi0]} color="#5b6575" dashed width={1} />
      ))}
      <Segment3 a={[x0, -h, FLOOR]} b={[x0, -h, 1.8]} color="#9aa5b4" width={1.2} />
      <Polyline3 points={pts} color="#1a9e96" width={2.6} />
      <Segment3 a={start} b={end} color="#8a6fd6" width={3} />
      <Point3 p={start} color="#e8eaef" size={0.06} />
      <Point3 p={end} color="#8a6fd6" size={0.07} />
    </Scene3D>
  );
  return (
    <PlateScene
      n={78}
      panels={[
        { title: 'Lacet dans la base', render: () => base },
        { title: 'Relèvement horizontal', render: () => lift },
      ]}
      identity={String.raw`$A=d\varphi+a$, $\ a=x\,dy$, $\quad\Delta\varphi=-\oint a=-\displaystyle\int_Ddx\wedge dy$ ; courbure $F=da=dx\wedge dy$.`}
      controls={
        <>
          <Slider label="Côté a de la boucle" value={a} min={0.2} max={1.4} step={0.01} onChange={setA} format={(v) => f2(v)} />
          <Slider label="Position x du bord gauche" value={x0} min={-1} max={0.4} step={0.01} onChange={setX0} format={(v) => f2(v)} />
        </>
      }
      observations={[
        { id: 'retour', text: 'Le relevé revient sur la fibre du point de départ, plus bas : même point de la base, phase différente (segment violet).', done: Math.abs(a - 1) > 0.15 },
        { id: 'aire', text: String.raw`Prends $a=0{,}7$ puis $a=1{,}4$ : l'écart est multiplié par quatre, il suit l'aire $a^2$ et non le périmètre.`, done: a >= 1.38 },
        { id: 'position', text: 'Déplace la boucle sans changer sa taille : le chemin relevé se déforme, mais l’écart final reste le même — la courbure est la même partout.', done: Math.abs(x0 + 0.5) > 0.6 },
      ]}
      readings={[
        { label: String.raw`Écart de phase $\Delta\varphi$ (relevé pas à pas)`, value: f2(phi, 5), status: 'numerique' },
        { label: String.raw`$-a^2$`, value: f2(-a * a, 5), status: 'exact' },
      ]}
      note="Fibre dessinée comme une droite : on suit la phase relevée dans ℝ. La phase de départ est choisie pour centrer la figure ; l’écart Δφ n’en dépend pas."
    />
  );
}
