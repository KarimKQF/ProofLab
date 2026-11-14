/**
 * Planche 62 — Fibré cotangent et forme symplectique.
 * Au point (q, p) de T*ℝ, la forme de Liouville lit θ(V) = p · dπ(V) = p V_q. La 2-forme
 * ω = −dθ = dq ∧ dp lit l'aire orientée : ω(V, W) = V_q W_p − V_p W_q.
 */
import { useState } from 'react';
import { PlateScene } from '../PlateScene';
import { Arrow, C, Caption, DraggablePoint, f2, Plot, Poly, Segment } from '../kit2d';

const DOM: [number, number, number, number] = [-1.8, 1.8, -1.8, 1.8];

export default function P62() {
  const [pt, setPt] = useState<[number, number]>([-0.6, 0.7]);
  const [tip, setTip] = useState<[number, number]>([0.6, 1.3]);
  const [V, setV] = useState<[number, number]>([1, 0.3]);
  const [W, setW] = useState<[number, number]>([0.3, 1]);
  const Vq = tip[0] - pt[0];
  const theta = pt[1] * Vq;
  const omega = V[0] * W[1] - V[1] * W[0];
  const liouville = (
    <div>
      <Plot xDomain={DOM.slice(0, 2) as [number, number]} yDomain={DOM.slice(2) as [number, number]} width={300} height={300} ariaLabel="La forme de Liouville">
        <Segment a={[pt[0], -1.8]} b={[pt[0], 1.8]} color={C.teal} width={1.4} />
        <Arrow a={pt} b={tip} color={C.orange} width={2.4} />
        <Arrow a={[pt[0], -1.5]} b={[tip[0], -1.5]} color={C.teal} width={2.4} />
        <Segment a={tip} b={[tip[0], -1.5]} color={C.faint} width={1} dash="4 3" />
        <DraggablePoint x={pt[0]} y={pt[1]} onChange={(a, b) => setPt([a, b])} name="Point (q, p)" color={C.ink} label="(q, p)" bounds={[-1.6, 1.6, -1.2, 1.6]} step={0.05} r={6} />
        <DraggablePoint x={tip[0]} y={tip[1]} onChange={(a, b) => setTip([a, b])} name="Extrémité du vecteur V" color={C.orange} label="V" bounds={DOM} step={0.05} r={6} />
      </Plot>
      <Caption>{String.raw`Verticale verte : la fibre. En bas : $d\pi(V)$, la composante en $q$ ; $\theta(V)=p\,d\pi(V)$.`}</Caption>
    </div>
  );
  const area = (
    <div>
      <Plot xDomain={[-1.6, 1.6]} yDomain={[-1.6, 1.6]} width={300} height={300} ariaLabel="La 2-forme lit l'aire orientée">
        <Poly points={[[0, 0], V, [V[0] + W[0], V[1] + W[1]], W]} fill={omega >= 0 ? C.teal : C.orange} opacity={0.3} stroke={omega >= 0 ? C.teal : C.orange} />
        <Arrow a={[0, 0]} b={V} color={C.blue} width={2.4} />
        <Arrow a={[0, 0]} b={W} color={C.red} width={2.4} />
        <DraggablePoint x={V[0]} y={V[1]} onChange={(a, b) => setV([a, b])} name="Vecteur V" color={C.blue} label="V" bounds={[-1.5, 1.5, -1.5, 1.5]} step={0.05} r={6} />
        <DraggablePoint x={W[0]} y={W[1]} onChange={(a, b) => setW([a, b])} name="Vecteur W" color={C.red} label="W" bounds={[-1.5, 1.5, -1.5, 1.5]} step={0.05} r={6} />
      </Plot>
      <Caption>{String.raw`$\omega(V,W)=dq\wedge dp(V,W)$ : l'aire orientée dans le plan $(q,p)$.`}</Caption>
    </div>
  );
  return (
    <PlateScene
      n={62}
      panels={[
        { title: 'Le covecteur du point agit sur dq', render: () => liouville },
        { title: 'La 2-forme lit l’aire orientée', render: () => area },
      ]}
      identity={String.raw`$\theta_{(q,p)}(V)=p\big(d\pi(V)\big)$, $\quad\omega=-d\theta=\sum_idq^i\wedge dp_i$.`}
      controls={<p className="text-[13px] text-text-2">Déplace le point (q, p), l’extrémité de V, puis les vecteurs V et W du second panneau.</p>}
      observations={[
        { id: 'vertical', text: String.raw`Rends $V$ vertical (dans la fibre) : $d\pi(V)=0$ et $\theta(V)=0$.`, done: Math.abs(Vq) < 0.03 },
        { id: 'p-nul', text: String.raw`Place le point sur $p=0$ : $\theta$ s'annule sur tout vecteur.`, done: Math.abs(pt[1]) < 0.03 },
        { id: 'aire', text: String.raw`Échange l'orientation de $(V,W)$ : $\omega(V,W)$ change de signe.`, done: omega < -0.1 },
      ]}
      readings={[
        { label: String.raw`$d\pi(V)=V_q$ et $\theta(V)=pV_q$`, value: `${f2(Vq, 3)} ; ${f2(theta, 4)}`, status: 'exact' },
        { label: String.raw`$\omega(V,W)=V_qW_p-V_pW_q$`, value: f2(omega, 4), status: 'exact' },
      ]}
    />
  );
}
