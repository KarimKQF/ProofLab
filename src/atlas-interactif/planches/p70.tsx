/**
 * Planche 70 — PINNs, résidus et opérateurs équivariants.
 * Famille d'essai u_θ(x, t) = sin(πx) e^{−θt} pour u_t = u_xx sur [0, 1] × [0, ½] : elle vérifie
 * exactement le bord et la donnée initiale ; son résidu vaut (π² − θ) u_θ. La perte moyenne sur
 * les points de collocation s'annule en θ = π².
 */
import { useState } from 'react';
import { PlateScene } from '../PlateScene';
import { C, Caption, ClippedCurve, Dot, f2, Plot, Poly, Slider } from '../kit2d';
import { linspace } from '../math';

const res = (th: number, x: number, t: number) => (Math.PI ** 2 - th) * Math.sin(Math.PI * x) * Math.exp(-th * t);

export default function P70() {
  const [th, setTh] = useState(6);
  const [n, setN] = useState(5);
  const pts = linspace(0.1, 0.9, n - 1).flatMap((x) => linspace(0.05, 0.45, n - 1).map((t) => [x, t] as [number, number]));
  const loss = (q: number) => pts.reduce((s, [x, t]) => s + res(q, x, t) ** 2, 0) / pts.length;
  const maxR = Math.max(1e-9, ...pts.map(([x, t]) => Math.abs(res(th, x, t))));
  const square = (
    <div>
      <Plot xDomain={[-0.05, 1.05]} yDomain={[-0.03, 0.53]} width={300} height={260} ariaLabel="Points de collocation et résidu">
        <Poly points={[[0, 0], [1, 0], [1, 0.5], [0, 0.5]]} stroke={C.blue} width={1.4} />
        {pts.map(([x, t], i) => {
          const r = Math.abs(res(th, x, t)) / Math.max(maxR, 1);
          return <Dot key={i} x={x} y={t} color={C.teal} r={2.5 + 6 * Math.min(1, r)} />;
        })}
        {linspace(0, 1, 6).map((x) => (
          <Dot key={`b${x}`} x={x} y={0} color={C.orange} r={3.5} />
        ))}
        {linspace(0, 0.5, 4).flatMap((t) => [<Dot key={`l${t}`} x={0} y={t} color={C.orange} r={3.5} />, <Dot key={`r${t}`} x={1} y={t} color={C.orange} r={3.5} />])}
      </Plot>
      <Caption>Vert : points de l’équation, d’autant plus gros que le résidu est grand. Orange : données au bord et à t = 0.</Caption>
    </div>
  );
  const qs = linspace(0, 20, 200);
  const Ls = qs.map(loss);
  const top = Math.max(...Ls);
  const D: [number, number, number, number] = [0, 20, 0, top * 1.05];
  const curve = (
    <div>
      <Plot xDomain={[0, 20]} yDomain={[0, top * 1.05]} width={300} height={260} ariaLabel="Perte en fonction de θ">
        <ClippedCurve points={qs.map((q, i) => [q, Ls[i]!])} domain={D} color={C.violet} width={2.4} />
        <Dot x={th} y={loss(th)} color={C.orange} r={5} />
        <Dot x={Math.PI ** 2} y={0} color={C.teal} label="π²" r={4} dy={-10} />
      </Plot>
      <Caption>{String.raw`$\mathcal L(\theta)=\frac1N\sum_j|\Delta(j^2u_\theta)(x_j,t_j)|^2$, nulle en $\theta=\pi^2$.`}</Caption>
    </div>
  );
  return (
    <PlateScene
      n={70}
      panels={[
        { title: 'Évaluer un résidu sur des points', render: () => square },
        { title: 'Résidu différentiel', render: () => curve },
      ]}
      identity={String.raw`$\mathcal L_{\mathrm{EDP}}=N^{-1}\sum_j\big|\Delta(j^ku_\theta(x_j))\big|^2$ ; ici $\Delta=u_t-u_{xx}$ et $\Delta(u_\theta)=(\pi^2-\theta)\,u_\theta$.`}
      controls={
        <>
          <Slider label="Paramètre θ" value={th} min={0} max={20} step={0.01} onChange={setTh} format={(v) => f2(v)} />
          <Slider label="Grille de collocation" value={n} min={3} max={10} step={1} onChange={setN} format={(v) => `${v - 1} × ${v - 1}`} />
        </>
      }
      observations={[
        { id: 'minimum', text: String.raw`Amène $\theta$ en $\pi^2$ : tous les résidus s'annulent, la perte est nulle.`, done: Math.abs(th - Math.PI ** 2) < 0.05 },
        { id: 'loin', text: 'Loin de π², les points proches de t = 0 et du milieu portent les plus gros résidus.', done: Math.abs(th - Math.PI ** 2) > 6 },
        { id: 'grille', text: 'Change la grille : le minimum reste en π², la perte en dépend ailleurs.', done: n !== 5 },
      ]}
      readings={[
        { label: String.raw`$\mathcal L(\theta)$`, value: f2(loss(th), 6), status: 'exact' },
        { label: String.raw`$\pi^2$`, value: f2(Math.PI ** 2, 5), status: 'exact' },
      ]}
    />
  );
}
