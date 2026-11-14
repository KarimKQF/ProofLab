/**
 * Planche 11 — Tenseurs et contraction.
 * dx ⊗ dy mesure la première entrée avec dx, la seconde avec dy : (dx⊗dy)(v,w) = v_x w_y,
 * non symétrique. La trace contracte un indice haut et un indice bas : tr(PAP⁻¹) = tr A.
 */
import { useState } from 'react';
import { PlateScene } from '../PlateScene';
import { Arrow, C, Caption, Curve, DraggablePoint, f2, Plot, Segment, Slider } from '../kit2d';
import { linspace } from '../math';

const DOM: [number, number, number, number] = [-1.6, 1.6, -1.6, 1.6];

export default function P11() {
  const [v, setV] = useState<[number, number]>([1.2, 0.4]);
  const [w, setW] = useState<[number, number]>([-0.3, 1.1]);
  const [A, setA] = useState([1.5, 0.6, -0.4, 0.8]);
  const [beta, setBeta] = useState(0);
  const [lam, setLam] = useState(1);
  const vw = v[0] * w[1];
  const wv = w[0] * v[1];

  // P = rotation(β) · diag(λ, 1) ; B = P A P⁻¹.
  const c = Math.cos(beta);
  const s = Math.sin(beta);
  const P = [c * lam, -s, s * lam, c];
  const detP = P[0]! * P[3]! - P[1]! * P[2]!;
  const Pi = [P[3]! / detP, -P[1]! / detP, -P[2]! / detP, P[0]! / detP];
  const mul = (X: number[], Y: number[]) => [X[0]! * Y[0]! + X[1]! * Y[2]!, X[0]! * Y[1]! + X[1]! * Y[3]!, X[2]! * Y[0]! + X[3]! * Y[2]!, X[2]! * Y[1]! + X[3]! * Y[3]!];
  const B = mul(mul(P, A), Pi);
  const trA = A[0]! + A[3]!;
  const trB = B[0]! + B[3]!;

  const vectors = (
    <div>
      <Plot xDomain={DOM.slice(0, 2) as [number, number]} yDomain={DOM.slice(2) as [number, number]} width={330} height={330} grid={false} ariaLabel="Deux vecteurs et leurs mesures">
        {linspace(-1.5, 1.5, 6).map((g) => (
          <g key={g}>
            <Curve points={[[g, -1.5], [g, 1.5]]} color={C.teal} width={0.6} />
            <Curve points={[[-1.5, g], [1.5, g]]} color={C.orange} width={0.6} />
          </g>
        ))}
        <Segment a={[0, -1.52]} b={[v[0], -1.52]} color={C.teal} width={4} />
        <Segment a={[-1.52, 0]} b={[-1.52, w[1]]} color={C.orange} width={4} />
        <Arrow a={[0, 0]} b={v} color={C.teal} width={2.4} />
        <Arrow a={[0, 0]} b={w} color={C.orange} width={2.4} />
        <DraggablePoint x={v[0]} y={v[1]} onChange={(x, y) => setV([x, y])} name="Vecteur v" color={C.teal} label="v" bounds={DOM} step={0.05} r={6} />
        <DraggablePoint x={w[0]} y={w[1]} onChange={(x, y) => setW([x, y])} name="Vecteur w" color={C.orange} label="w" bounds={DOM} step={0.05} r={6} />
      </Plot>
      <Caption>{String.raw`Barres : $dx(v)$ en bas (vert), $dy(w)$ à gauche (orange).`}</Caption>
    </div>
  );

  const cell = (val: number, x: number, y: number, diag: boolean) => (
    <g key={`${x}${y}`}>
      <rect x={x} y={y} width={78} height={58} rx={4} fill={diag ? '#1a9e96' : '#8a8fa0'} fillOpacity={diag ? 0.28 : 0.12} stroke="var(--line-strong)" />
      <text x={x + 39} y={y + 35} textAnchor="middle" fontSize={16} fill="var(--text)" fontFamily="var(--font-mono)">
        {f2(val, 2)}
      </text>
    </g>
  );
  const matrices = (
    <div>
      <svg viewBox="0 0 360 170" className="w-full" role="img" aria-label="Matrices A et PAP⁻¹ et leurs traces">
        <text x={86} y={16} textAnchor="middle" fontSize={13} fill="var(--text-2)">A</text>
        {[0, 1, 2, 3].map((i) => cell(A[i]!, 6 + (i % 2) * 82, 24 + Math.floor(i / 2) * 62, i === 0 || i === 3))}
        <text x={274} y={16} textAnchor="middle" fontSize={13} fill="var(--text-2)">P A P⁻¹</text>
        {[0, 1, 2, 3].map((i) => cell(B[i]!, 194 + (i % 2) * 82, 24 + Math.floor(i / 2) * 62, i === 0 || i === 3))}
      </svg>
      <Caption>{String.raw`Diagonales en vert : $\operatorname{tr}A=${f2(trA, 3).replace(',', '{,}')}$ et $\operatorname{tr}PAP^{-1}=${f2(trB, 3).replace(',', '{,}')}$.`}</Caption>
    </div>
  );

  const setEntry = (i: number, x: number) => setA((M) => M.map((m, j) => (j === i ? x : m)));
  return (
    <PlateScene
      n={11}
      panels={[
        { title: 'Deux entrées, deux mesures', render: () => vectors },
        { title: 'Contracter deux indices', render: () => matrices },
      ]}
      identity={String.raw`$(\alpha\otimes\beta)(v,w)=\alpha(v)\,\beta(w)$, $\quad\operatorname{tr}(A)=\sum_iA^i_{\ i}$, $\quad\operatorname{tr}(PAP^{-1})=\operatorname{tr}A$.`}
      controls={
        <>
          <div className="grid grid-cols-2 gap-x-3">
            {['A¹₁', 'A¹₂', 'A²₁', 'A²₂'].map((name, i) => (
              <Slider key={name} label={name} value={A[i]!} min={-2} max={2} step={0.05} onChange={(x) => setEntry(i, x)} format={(x) => f2(x)} />
            ))}
          </div>
          <Slider label="Changement de base : angle β" value={beta} min={-3.14} max={3.14} step={0.01} onChange={setBeta} format={(x) => f2(x)} />
          <Slider label="Changement de base : dilatation λ" value={lam} min={0.4} max={2.5} step={0.05} onChange={setLam} format={(x) => f2(x)} />
        </>
      }
      observations={[
        { id: 'non-sym', text: String.raw`Les deux ordres diffèrent : $(dx\otimes dy)(v,w)\neq(dx\otimes dy)(w,v)$ en général.`, done: Math.abs(vw - wv) > 0.3 },
        { id: 'base', text: 'Change de base : tous les coefficients bougent, la trace reste la même.', done: Math.abs(beta) > 0.5 || Math.abs(lam - 1) > 0.4 },
        { id: 'trace-nulle', text: String.raw`Annule la diagonale de $A$ : sa trace est nulle dans toute base.`, done: Math.abs(A[0]!) < 0.03 && Math.abs(A[3]!) < 0.03 },
      ]}
      readings={[
        { label: String.raw`$(dx\otimes dy)(v,w)=v_xw_y$`, value: f2(vw, 3), status: 'exact' },
        { label: String.raw`$(dx\otimes dy)(w,v)=w_xv_y$`, value: f2(wv, 3), status: 'exact' },
        { label: String.raw`$\operatorname{tr}A$ et $\operatorname{tr}PAP^{-1}$`, value: `${f2(trA, 4)} ; ${f2(trB, 4)}`, status: 'exact' },
      ]}
    />
  );
}
