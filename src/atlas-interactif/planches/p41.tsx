/**
 * Planche 41 — Représentations de groupes de Lie.
 * Les représentations de U(1) : ρ_k(e^{iθ}) = e^{ikθ}. Quand θ fait un tour, ρ_k(e^{iθ}) en
 * fait k. Chaque ρ_k respecte le produit : ρ_k(gh) = ρ_k(g)ρ_k(h).
 */
import { useState } from 'react';
import { PlateScene } from '../PlateScene';
import { Arc, Arrow, C, Caption, Circle, DragOnCurve, f2, Plot, Slider } from '../kit2d';
import { mod2pi, TAU } from '../math';

export default function P41() {
  const [th, setTh] = useState(0.8);
  const [k, setK] = useState(2);
  const [h, setH] = useState(1.1);
  const one = (
    <div>
      <Plot xDomain={[-1.4, 1.4]} yDomain={[-1.4, 1.4]} width={280} height={280} grid={false} ariaLabel="Poids 1">
        <Circle c={[0, 0]} r={1} color={C.faint} width={1.2} />
        <Arc c={[0, 0]} r={1} a0={0} a1={th} color={C.teal} width={3} arrow />
        <Arrow a={[0, 0]} b={[Math.cos(th), Math.sin(th)]} color={C.orange} width={2.2} />
        <DragOnCurve curve={(s) => [Math.cos(s), Math.sin(s)]} s={th} range={[0, TAU]} onChange={setTh} name="Élément e^{iθ}" color={C.orange} r={5} />
      </Plot>
      <Caption>{String.raw`$\rho_1(e^{i\theta})=e^{i\theta}$.`}</Caption>
    </div>
  );
  const kk = k * th;
  const turns = Math.floor(Math.abs(kk) / TAU + 1e-9);
  const many = (
    <div>
      <Plot xDomain={[-1.4, 1.4]} yDomain={[-1.4, 1.4]} width={280} height={280} grid={false} ariaLabel="Poids k">
        <Circle c={[0, 0]} r={1} color={C.faint} width={1.2} />
        <Arc c={[0, 0]} r={1} a0={0} a1={kk} color={C.teal} width={3} arrow />
        <Arrow a={[0, 0]} b={[Math.cos(kk), Math.sin(kk)]} color={C.orange} width={2.2} />
      </Plot>
      <Caption>{String.raw`$\rho_k(e^{i\theta})=e^{ik\theta}$ : ${turns} tour(s) complet(s) parcouru(s).`}</Caption>
    </div>
  );
  const lhs = mod2pi(k * (th + h));
  const rhs = mod2pi(k * th + k * h);
  return (
    <PlateScene
      n={41}
      panels={[
        { title: 'Poids 1 : un tour', render: () => one },
        { title: 'Poids k : k tours', render: () => many },
      ]}
      identity={String.raw`$\rho(gh)=\rho(g)\rho(h)$, $\quad\rho(e^{tX})=e^{t\,d\rho_e(X)}$ ; $\ U(1)$ : $\rho_k(e^{i\theta})=e^{ik\theta}$, $d\rho_k=ik$.`}
      controls={
        <>
          <Slider label="Poids k" value={k} min={-3} max={4} step={1} onChange={setK} format={(x) => String(x)} />
          <Slider label="Second élément h = e^{iη} : η" value={h} min={0} max={6.28} step={0.01} onChange={setH} format={(x) => f2(x)} />
        </>
      }
      observations={[
        { id: 'tour', text: 'Fais faire un tour à θ : le poids 2 fait deux tours, le poids k en fait k.', done: th > TAU - 0.15 && Math.abs(k) >= 2 },
        { id: 'trivial', text: 'Poids 0 : tout élément est envoyé sur 1, la représentation triviale.', done: k === 0 },
        { id: 'negatif', text: 'Un poids négatif parcourt le cercle en sens inverse.', done: k < 0 },
      ]}
      readings={[
        { label: String.raw`$\rho_k(gh)$ et $\rho_k(g)\rho_k(h)$ (angles)`, value: `${f2(lhs, 4)} ; ${f2(rhs, 4)}`, status: 'exact' },
        { label: String.raw`$d\rho_k$ en $e$`, value: `i·${k}`, status: 'exact' },
      ]}
    />
  );
}
