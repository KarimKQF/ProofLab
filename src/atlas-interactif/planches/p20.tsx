/**
 * Planche 20 — Courbure sectionnelle, Ricci et scalaire.
 * Champ de Jacobi en courbure constante K : J″ + KJ = 0, J(0) = 0, J′(0) = 1. Les géodésiques
 * voisines s'écartent comme sinh (K < 0), linéairement (K = 0), ou se rejoignent en π/√K (K > 0).
 */
import { useState } from 'react';
import { PlateScene } from '../PlateScene';
import { C, Caption, ClippedCurve, Dot, f2, Label, Plot, Slider } from '../kit2d';
import { linspace, rk4 } from '../math';

const J = (K: number, s: number) => (K > 1e-9 ? Math.sin(Math.sqrt(K) * s) / Math.sqrt(K) : K < -1e-9 ? Math.sinh(Math.sqrt(-K) * s) / Math.sqrt(-K) : s);
const DOM: [number, number, number, number] = [0, 4, -0.6, 3.2];

export default function P20() {
  const [K, setK] = useState(0.5);
  const [s, setS] = useState(1.6);
  const xs = linspace(0, 4, 200);
  const numeric = rk4(([j, jp]) => [jp!, -K * j!], [0, 1], s, 400)[0]!;
  const conj = K > 0 ? Math.PI / Math.sqrt(K) : null;

  const plot = (
    <div>
      <Plot xDomain={[0, 4]} yDomain={[-0.6, 3.2]} width={700} height={330} ariaLabel="Séparation de deux géodésiques voisines">
        <ClippedCurve points={xs.map((x) => [x, J(-1, x)])} domain={DOM} color={C.violet} width={1.4} dash="5 4" />
        <ClippedCurve points={xs.map((x) => [x, x])} domain={DOM} color={C.blue} width={1.4} dash="5 4" />
        <ClippedCurve points={xs.map((x) => [x, J(1, x)])} domain={DOM} color={C.teal} width={1.4} dash="5 4" />
        <ClippedCurve points={xs.map((x) => [x, J(K, x)])} domain={DOM} color={C.orange} width={2.8} />
        <Dot x={s} y={J(K, s)} color={C.orange} r={5} />
        {conj !== null && conj <= 4 && <Dot x={conj} y={0} color={C.red} label="point conjugué" r={5} dy={-12} />}
        <Label x={3.95} y={3.05} text="K = −1" color={C.violet} anchor="end" size={11} />
        <Label x={3.95} y={2.75} text="K = 0" color={C.blue} anchor="end" size={11} />
        <Label x={3.95} y={2.45} text="K = +1" color={C.teal} anchor="end" size={11} />
      </Plot>
      <Caption>{String.raw`Pointillés : $K=-1,0,+1$. Orange : la courbure choisie. Abscisse : distance $s$ le long de la géodésique.`}</Caption>
    </div>
  );

  return (
    <PlateScene
      n={20}
      panels={[{ title: 'Séparation infinitésimale de deux géodésiques', render: () => plot }]}
      identity={String.raw`$J''+KJ=0$, $\ J(0)=0$, $\ J'(0)=1$ (courbure constante $K$) : $J(s)=\dfrac{\sin(\sqrt K\,s)}{\sqrt K}$, $\ s$, $\ \dfrac{\sinh(\sqrt{-K}\,s)}{\sqrt{-K}}$.`}
      controls={
        <>
          <Slider label="Courbure K" value={K} min={-2} max={2} step={0.01} onChange={setK} format={(x) => f2(x)} />
          <Slider label="Distance s" value={s} min={0} max={4} step={0.01} onChange={setS} format={(x) => f2(x)} />
        </>
      }
      observations={[
        { id: 'negatif', text: 'En courbure négative, les géodésiques voisines s’écartent plus vite qu’en géométrie plate.', done: K < -0.5 },
        { id: 'conjugue', text: String.raw`En courbure positive, $J$ s'annule de nouveau en $s=\pi/\sqrt K$ : les géodésiques se rejoignent.`, done: K > 0.6 },
        { id: 'plat', text: String.raw`Pour $K=0$, l'écart est exactement $s$.`, done: Math.abs(K) < 0.005 },
      ]}
      readings={[
        { label: String.raw`$J(s)$, formule fermée`, value: f2(J(K, s), 5), status: 'exact' },
        { label: String.raw`$J(s)$, Runge–Kutta`, value: f2(numeric, 5), status: 'numerique' },
        { label: 'Premier point conjugué', value: conj === null ? 'aucun' : f2(conj, 4), status: 'exact' },
      ]}
    />
  );
}
