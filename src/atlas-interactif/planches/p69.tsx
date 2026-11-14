/**
 * Planche 69 — Modèles hamiltoniens et lagrangiens.
 * Champ libre F = J∇H + εz : divergence 2ε, les trajectoires spiralent et l'aire change.
 * Modèle hamiltonien X = J∇H_θ avec H_θ = ½|z|² + δ q⁴/4 (un H appris imparfait) : les
 * trajectoires restent sur les niveaux de H_θ, fermées, l'aire est conservée.
 */
import { useMemo, useState } from 'react';
import { PlateScene } from '../PlateScene';
import { C, Caption, Circle, ClippedCurve, f2, Field, Plot, Slider } from '../kit2d';
import { rk4 } from '../math';

const DOM: [number, number, number, number] = [-1.8, 1.8, -1.8, 1.8];

export default function P69() {
  const [eps, setEps] = useState(0.08);
  const [delta, setDelta] = useState(0.4);
  const T = 25;
  const free = ([q, p]: number[]) => [p! + eps * q!, -q! + eps * p!];
  const ham = ([q, p]: number[]) => [p!, -(q! + delta * q! ** 3)];
  const run = (F: (z: number[]) => number[]) => {
    const pts: number[][] = [[1, 0]];
    for (let i = 0; i < 500; i++) pts.push(rk4(F, pts[i]!, T / 500, 4));
    return pts;
  };
  const trFree = useMemo(() => run(free), [eps]); // eslint-disable-line
  const trHam = useMemo(() => run(ham), [delta]); // eslint-disable-line
  const Hth = (z: number[]) => 0.5 * (z[0]! ** 2 + z[1]! ** 2) + (delta * z[0]! ** 4) / 4;
  const drift = Math.max(...trHam.map((z) => Math.abs(Hth(z) - Hth(trHam[0]!))));
  const panel = (F: (z: [number, number]) => [number, number], tr: number[][], col: string, label: string) => (
    <Plot xDomain={[-1.8, 1.8]} yDomain={[-1.8, 1.8]} width={290} height={290} grid={false} ariaLabel={label}>
      <Circle c={[0, 0]} r={1} color={C.faint} width={1} />
      <Field F={F} domain={DOM} color={col} n={8} opacity={0.45} />
      <ClippedCurve points={tr.map((z) => [z[0]!, z[1]!])} domain={DOM} color={col} width={1.8} />
    </Plot>
  );
  return (
    <PlateScene
      n={69}
      panels={[
        { title: 'Apprendre un champ libre', render: () => <div>{panel(([q, p]) => [p + eps * q, -q + eps * p], trFree, C.orange, 'Champ libre')}<Caption>{String.raw`$F=J\nabla H+\varepsilon z$ : la moindre erreur non hamiltonienne fait spiraler.`}</Caption></div> },
        { title: 'Apprendre H puis dériver', render: () => <div>{panel(([q, p]) => [p, -(q + delta * q ** 3)], trHam, C.teal, 'Champ hamiltonien appris')}<Caption>{String.raw`$X=J\nabla H_\theta$ : même avec un $H_\theta$ imparfait, les orbites restent fermées.`}</Caption></div> },
      ]}
      identity={String.raw`$F_\theta$ libre, $\quad X_{H_\theta}=J\nabla H_\theta$, $\quad L_\theta$ puis Euler–Lagrange ; $\ \operatorname{div}(J\nabla H)=0$.`}
      controls={
        <>
          <Slider label="Erreur non hamiltonienne ε (champ libre)" value={eps} min={-0.15} max={0.15} step={0.005} onChange={setEps} format={(v) => f2(v, 3)} />
          <Slider label="Écart δ du H appris" value={delta} min={0} max={1} step={0.01} onChange={setDelta} format={(v) => f2(v)} />
        </>
      }
      observations={[
        { id: 'spirale', text: String.raw`Une petite erreur $\varepsilon$ suffit : la trajectoire du champ libre s'écarte en spirale.`, done: Math.abs(eps) > 0.05 },
        { id: 'ferme', text: String.raw`Le modèle hamiltonien garde des orbites fermées pour tout $\delta$ : la structure est imposée.`, done: Math.abs(delta - 0.4) > 0.3 },
        { id: 'nul', text: String.raw`Avec $\varepsilon=0$, le champ libre redevient hamiltonien.`, done: Math.abs(eps) < 0.002 },
      ]}
      readings={[
        { label: String.raw`$\operatorname{div}F$ (champ libre)`, value: f2(2 * eps, 3), status: 'exact' },
        { label: 'Rayon final du champ libre', value: f2(Math.hypot(trFree[trFree.length - 1]![0]!, trFree[trFree.length - 1]![1]!), 4), status: 'numerique' },
        { label: String.raw`Dérive de $H_\theta$ le long du modèle hamiltonien`, value: f2(drift, 6), status: 'numerique' },
      ]}
      note="Trajectoires par Runge–Kutta d’ordre 4 sur [0, 25] ; la dérive de H_θ n’est due qu’à l’intégration numérique."
    />
  );
}
