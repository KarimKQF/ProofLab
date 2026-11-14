/**
 * Planche 28 — Groupes de Lie.
 * ℤ/nℤ : un groupe discret (des points isolés). S¹ : un groupe de dimension 1, avec une carte
 * θ ↦ e^{iθ} près de e. Sur le cercle, e^{ia}e^{ib} = e^{i(a+b)} : la loi est lisse.
 */
import { useState } from 'react';
import { PlateScene } from '../PlateScene';
import { Arc, Arrow, C, Caption, Circle, Dot, DragOnCurve, f2, Plot, Slider } from '../kit2d';
import { mod2pi, TAU } from '../math';

export default function P28() {
  const [n, setN] = useState(6);
  const [k, setK] = useState(1);
  const [eps, setEps] = useState(0.5);
  const [a, setA] = useState(0.5);
  const [b, setB] = useState(0.9);
  const kk = Math.min(k, n - 1);

  const discrete = (
    <div>
      <Plot xDomain={[-1.4, 1.4]} yDomain={[-1.4, 1.4]} width={260} height={260} grid={false} ariaLabel="Le groupe discret Z/nZ">
        {Array.from({ length: n }, (_, j) => {
          const t = (TAU * j) / n;
          return <Dot key={j} x={Math.cos(t)} y={Math.sin(t)} color={j === 0 ? C.orange : j === kk ? C.violet : C.teal} r={j === 0 || j === kk ? 6 : 4.5} />;
        })}
        {kk > 0 && <Arc c={[0, 0]} r={0.75} a0={0} a1={(TAU * kk) / n} color={C.violet} width={1.6} arrow />}
      </Plot>
      <Caption>{String.raw`$\mathbb Z/${n}\mathbb Z$ : des points isolés ; orange : le neutre.`}</Caption>
    </div>
  );

  const chart = (
    <div>
      <Plot xDomain={[-1.4, 1.4]} yDomain={[-1.4, 1.4]} width={260} height={260} grid={false} ariaLabel="Le groupe S¹ et une carte près de e">
        <Circle c={[0, 0]} r={1} color={C.blue} width={2} />
        <Arc c={[0, 0]} r={1} a0={-eps} a1={eps} color={C.teal} width={4} />
        <Dot x={1} y={0} color={C.orange} label="e" r={5} />
      </Plot>
      <Caption>{String.raw`Vert : l'image de $]-\varepsilon,\varepsilon[$ par $\theta\mapsto e^{i\theta}$, une carte près de $e$.`}</Caption>
    </div>
  );

  const c = mod2pi(a + b);
  const calc = (
    <div>
      <Plot xDomain={[-1.4, 1.4]} yDomain={[-1.4, 1.4]} width={260} height={260} grid={false} ariaLabel="Produit sur le cercle">
        <Circle c={[0, 0]} r={1} color={C.faint} width={1.2} />
        <Arc c={[0, 0]} r={0.4} a0={0} a1={a} color={C.teal} width={1.6} arrow />
        <Arc c={[0, 0]} r={0.55} a0={a} a1={a + b} color={C.orange} width={1.6} arrow />
        <Arrow a={[0, 0]} b={[Math.cos(c), Math.sin(c)]} color={C.orange} width={2.4} />
        <DragOnCurve curve={(s) => [Math.cos(s), Math.sin(s)]} s={a} range={[0, TAU]} onChange={setA} name="Élément e^{ia}" label="a" color={C.teal} r={5} />
        <DragOnCurve curve={(s) => [0.8 * Math.cos(s), 0.8 * Math.sin(s)]} s={b} range={[0, TAU]} onChange={setB} name="Élément e^{ib}" label="b" color={C.violet} r={5} />
      </Plot>
      <Caption>{String.raw`Les angles s'ajoutent : $e^{ia}e^{ib}=e^{i(a+b)}$.`}</Caption>
    </div>
  );

  return (
    <PlateScene
      n={28}
      panels={[
        { title: 'Groupe discret', render: () => discrete },
        { title: 'Groupe de Lie de dimension 1', render: () => chart },
        { title: 'Calcul sur le cercle', render: () => calc },
      ]}
      identity={String.raw`$m(g,h)=gh$ et $i(g)=g^{-1}$ lisses ; $\ S^1$ : $e^{ia}e^{ib}=e^{i(a+b)}$, $\ (e^{ia})^{-1}=e^{-ia}$.`}
      controls={
        <>
          <Slider label="n (ordre du groupe discret)" value={n} min={2} max={12} step={1} onChange={setN} format={(x) => String(x)} />
          <Slider label="Élément k de ℤ/nℤ" value={k} min={0} max={11} step={1} onChange={setK} format={(x) => String(Math.min(x, n - 1))} />
          <Slider label="Taille ε de la carte près de e" value={eps} min={0.05} max={1.5} step={0.01} onChange={setEps} format={(x) => f2(x)} />
        </>
      }
      observations={[
        { id: 'discret', text: String.raw`Dans $\mathbb Z/n\mathbb Z$, aucun élément n'est arbitrairement proche du neutre : le groupe est discret.`, done: n >= 8 },
        { id: 'somme', text: 'Déplace a et b : le produit suit continûment, il suffit d’ajouter les angles.', done: Math.abs(a - 0.5) > 0.4 && Math.abs(b - 0.9) > 0.4 },
        { id: 'tour', text: String.raw`Si $a+b$ dépasse $2\pi$, le produit refait le tour : les angles s'ajoutent modulo $2\pi$.`, done: a + b > TAU },
      ]}
      readings={[
        { label: String.raw`$a+b$ modulo $2\pi$`, value: f2(c, 4), status: 'exact' },
        { label: String.raw`Inverse de $e^{ia}$`, value: String.raw`$e^{-ia}$, angle ${f2(mod2pi(-a), 3)}`, status: 'exact' },
      ]}
    />
  );
}
