/**
 * Planche 76 — Décomposition de Hodge et nombres de Betti.
 * Sur le tore plat [0, 2π]² : A sin x dx est exacte (= d(−A cos x)), B sin x dy est coexacte
 * (champ de divergence nulle, mais pas fermée), C dx + D dy est harmonique. Les trois parts
 * sont orthogonales dans L² : le théorème de Pythagore se lit sur les normes.
 */
import { useState } from 'react';
import { PlateScene } from '../PlateScene';
import { C, Caption, f2, Field, Plot, Poly, Segment, Slider } from '../kit2d';
import { simpson, TAU } from '../math';

const DOM: [number, number, number, number] = [0, TAU, 0, TAU];
const SQUARE: [number, number][] = [[0, 0], [TAU, 0], [TAU, TAU], [0, TAU]];

export default function P76() {
  const [A, setA] = useState(1);
  const [B, setB] = useState(1);
  const [Cc, setCc] = useState(1);
  const [D, setD] = useState(0.35);
  const [x0, setX0] = useState(1.2);
  const fig = (F: (p: [number, number]) => [number, number], col: string, label: string) => (
    <Plot xDomain={[-0.3, TAU + 0.3]} yDomain={[-0.3, TAU + 0.3]} width={220} height={220} grid={false} ariaLabel={label}>
      <Poly points={SQUARE} stroke={C.faint} width={1.2} dash="5 4" />
      <Field F={F} domain={DOM} color={col} n={7} opacity={0.95} />
      <Segment a={[x0, 0]} b={[x0, TAU]} color={C.gold} width={2} dash="6 4" />
    </Plot>
  );
  // ‖ω‖² = ∫∫ (A sin x + C)² + (B sin x + D)² dx dy ; l'intégrande ne dépend pas de y.
  const total = TAU * simpson((x) => (A * Math.sin(x) + Cc) ** 2 + (B * Math.sin(x) + D) ** 2, 0, TAU, 400);
  const pyth = 2 * Math.PI ** 2 * (A * A + B * B) + 4 * Math.PI ** 2 * (Cc * Cc + D * D);
  const coex = TAU * B * Math.sin(x0);
  return (
    <PlateScene
      n={76}
      panels={[
        { title: 'Exacte', render: () => <div>{fig(([x]) => [A * Math.sin(x), 0], C.teal, 'Partie exacte')}<Caption>{String.raw`$A\sin x\,dx=d(-A\cos x)$ : rotationnel nul.`}</Caption></div> },
        { title: 'Coexacte', render: () => <div>{fig(([x]) => [0, B * Math.sin(x)], C.orange, 'Partie coexacte')}<Caption>{String.raw`$B\sin x\,dy$ : divergence nulle.`}</Caption></div> },
        { title: 'Harmonique', render: () => <div>{fig(() => [Cc, D], C.violet, 'Partie harmonique')}<Caption>{String.raw`$C\,dx+D\,dy$ : les deux nuls, constante.`}</Caption></div> },
      ]}
      identity={String.raw`$\Omega^k(M)=\operatorname{im}d\ \oplus^\perp\ \operatorname{im}\delta\ \oplus^\perp\ \mathcal H^k(M)$, $\quad\dim\mathcal H^1(\mathbb T^2)=b_1=2$.`}
      controls={
        <>
          <Slider label="A (partie exacte)" value={A} min={-1.5} max={1.5} step={0.01} onChange={setA} format={(v) => f2(v)} />
          <Slider label="B (partie coexacte)" value={B} min={-1.5} max={1.5} step={0.01} onChange={setB} format={(v) => f2(v)} />
          <Slider label="C (harmonique, dx)" value={Cc} min={-1.5} max={1.5} step={0.01} onChange={setCc} format={(v) => f2(v)} />
          <Slider label="D (harmonique, dy)" value={D} min={-1.5} max={1.5} step={0.01} onChange={setD} format={(v) => f2(v)} />
          <Slider label="Position x₀ du cycle vertical (pointillés)" value={x0} min={0} max={6.28} step={0.01} onChange={setX0} format={(v) => f2(v)} />
        </>
      }
      observations={[
        { id: 'exacte', text: 'Fais varier A : sa circulation sur le cycle reste nulle. Une forme exacte a une circulation nulle sur toute boucle fermée.', done: Math.abs(A - 1) > 0.5 },
        { id: 'coexacte', text: String.raw`Déplace le cycle : la circulation de la partie coexacte, $2\pi B\sin x_0$, change. Elle n'est pas fermée, donc pas de période.`, done: Math.abs(x0 - 1.2) > 1.5 && Math.abs(B) > 0.3 },
        { id: 'harm', text: String.raw`La partie harmonique donne les périodes $(2\pi C,2\pi D)$, les mêmes pour tous les cycles homologues : $b_1(\mathbb T^2)=2$.`, done: Math.abs(Cc - 1) > 0.5 || Math.abs(D - 0.35) > 0.5 },
        { id: 'ortho', text: String.raw`Quels que soient les réglages, $\|\omega\|^2$ est la somme des trois carrés de normes : les trois parts sont orthogonales dans $L^2$.`, done: Math.abs(B - 1) > 0.5 },
      ]}
      readings={[
        { label: 'Circulations sur le cycle vertical : exacte ; coexacte ; harmonique', value: `0 ; ${f2(coex, 3)} ; ${f2(TAU * D, 3)}`, status: 'exact' },
        { label: String.raw`$\|\omega\|^2_{L^2}$ (intégrale)`, value: f2(total, 4), status: 'numerique' },
        { label: String.raw`$2\pi^2(A^2+B^2)+4\pi^2(C^2+D^2)$`, value: f2(pyth, 4), status: 'exact' },
      ]}
      note="Pointillés gris : le carré [0, 2π]² dont on recolle les côtés opposés. Pointillés dorés : le cycle vertical x = x₀."
    />
  );
}
