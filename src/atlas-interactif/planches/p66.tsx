/**
 * Planche 66 — Intégration symplectique, Euler et Verlet.
 * Oscillateur q′ = p, p′ = −q. Euler explicite : matrice de déterminant 1 + h², la trajectoire
 * spirale vers l'extérieur ; Euler symplectique : déterminant 1, la trajectoire reste fermée.
 */
import { useState } from 'react';
import { PlateScene } from '../PlateScene';
import { C, Caption, Circle, ClippedCurve, Dot, f2, Plot, Slider } from '../kit2d';

function run(kind: 'exp' | 'sym', h: number, N: number) {
  const pts: [number, number][] = [[1, 0]];
  let [q, p] = [1, 0];
  for (let i = 0; i < N; i++) {
    if (kind === 'exp') [q, p] = [q + h * p, p - h * q];
    else {
      p = p - h * q;
      q = q + h * p;
    }
    pts.push([q, p]);
  }
  return pts;
}
const DOM: [number, number, number, number] = [-2.2, 2.2, -2.2, 2.2];

export default function P66() {
  const [h, setH] = useState(0.16);
  const [N, setN] = useState(60);
  const e = run('exp', h, N);
  const s = run('sym', h, N);
  const panel = (pts: [number, number][], col: string) => (
    <Plot xDomain={[-2.2, 2.2]} yDomain={[-2.2, 2.2]} width={300} height={300} ariaLabel="Plan des phases">
      <Circle c={[0, 0]} r={1} color={C.blue} width={1.4} dash="5 4" />
      <ClippedCurve points={pts} domain={DOM} color={col} width={2} />
      <Dot x={1} y={0} color={C.blue} r={4} />
      {Math.hypot(...pts[pts.length - 1]!) < 2.2 && <Dot x={pts[pts.length - 1]![0]} y={pts[pts.length - 1]![1]} color={col} r={4} />}
    </Plot>
  );
  const rE = Math.hypot(...e[e.length - 1]!);
  const rS = Math.hypot(...s[s.length - 1]!);
  return (
    <PlateScene
      n={66}
      panels={[
        { title: 'Euler explicite', render: () => <div>{panel(e, C.orange)}<Caption>{String.raw`$(q,p)\mapsto(q+hp,\ p-hq)$ ; pointillé : le cercle exact.`}</Caption></div> },
        { title: 'Euler symplectique', render: () => <div>{panel(s, C.teal)}<Caption>{String.raw`$p_1=p-hq$, $q_1=q+hp_1$.`}</Caption></div> },
      ]}
      identity={String.raw`$\det A_{\exp}=1+h^2$, $\quad\det A_{\mathrm{symp}}=1$ pour $q'=p,\ p'=-q$ ; après $N$ pas, Euler explicite multiplie $q^2+p^2$ par $(1+h^2)^N$.`}
      controls={
        <>
          <Slider label="Pas h" value={h} min={0.02} max={0.6} step={0.01} onChange={setH} format={(v) => f2(v)} />
          <Slider label="Nombre de pas N" value={N} min={1} max={300} step={1} onChange={setN} format={(v) => String(v)} />
        </>
      }
      observations={[
        { id: 'spirale', text: 'Euler explicite spirale vers l’extérieur : il dilate l’aire à chaque pas.', done: rE > 1.5 },
        { id: 'ferme', text: 'Euler symplectique reste sur une courbe fermée voisine du cercle.', done: N > 150 },
        { id: 'petit', text: 'Avec un pas plus petit, les deux schémas restent plus longtemps près du cercle.', done: h < 0.05 },
      ]}
      readings={[
        { label: String.raw`$\det A_{\exp}=1+h^2$`, value: f2(1 + h * h, 5), status: 'exact' },
        { label: 'Rayon final : explicite ; symplectique', value: `${f2(rE, 4)} ; ${f2(rS, 4)}`, status: 'exact' },
        { label: String.raw`$(1+h^2)^{N/2}$`, value: f2((1 + h * h) ** (N / 2), 4), status: 'exact' },
      ]}
    />
  );
}
