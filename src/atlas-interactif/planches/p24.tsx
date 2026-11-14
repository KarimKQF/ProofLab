/**
 * Planche 24 — Actions de groupes.
 * Rotations du plan de centres différents : g·(h·x) = (gh)·x, alors que (hg)·x est en
 * général ailleurs. Changement de repère : les composantes QᵀAQ d'une forme quadratique
 * changent, l'ellipse {xᵀAx = 1} non ; elle est diagonale dans le repère propre.
 */
import { useState } from 'react';
import { PlateScene } from '../PlateScene';
import { Arrow, C, Caption, Curve, Dot, f2, Plot, Poly, Slider } from '../kit2d';
import { linspace } from '../math';

type M3 = number[][];
const rotAbout = (a: number, cx: number, cy: number): M3 => {
  const c = Math.cos(a);
  const s = Math.sin(a);
  return [
    [c, -s, cx - c * cx + s * cy],
    [s, c, cy - s * cx - c * cy],
    [0, 0, 1],
  ];
};
const mul = (A: M3, B: M3): M3 => A.map((r) => B[0]!.map((_, j) => r.reduce((s, x, k) => s + x * B[k]![j]!, 0)));
const act = (A: M3, [x, y]: [number, number]): [number, number] => [A[0]![0]! * x + A[0]![1]! * y + A[0]![2]!, A[1]![0]! * x + A[1]![1]! * y + A[1]![2]!];
const TRI: [number, number][] = [[-1.6, -1.1], [-0.9, -1.0], [-1.25, -0.4]];
const HC: [number, number] = [0, 0];
const GC: [number, number] = [0.9, 0.6];

const A = [
  [2, 0.6],
  [0.6, 1],
];
const eigAngle = 0.5 * Math.atan2(2 * A[0]![1]!, A[0]![0]! - A[1]![1]!);

export default function P24() {
  const [eta, setEta] = useState(0.9);
  const [gam, setGam] = useState(1.2);
  const [phi, setPhi] = useState(0.2);
  const H = rotAbout(eta, ...HC);
  const G = rotAbout(gam, ...GC);
  const hx = TRI.map((p) => act(H, p));
  const ghx = hx.map((p) => act(G, p));
  const GH = mul(G, H);
  const HG = mul(H, G);
  const direct = TRI.map((p) => act(GH, p));
  const other = TRI.map((p) => act(HG, p));
  const err = Math.max(...direct.map((p, i) => Math.hypot(p[0] - ghx[i]![0], p[1] - ghx[i]![1])));
  const gapHG = Math.max(...other.map((p, i) => Math.hypot(p[0] - ghx[i]![0], p[1] - ghx[i]![1])));

  const compose = (
    <div>
      <Plot xDomain={[-2.4, 2.6]} yDomain={[-2.2, 2.4]} width={340} height={313} grid={false} ariaLabel="Composer une action à gauche">
        <Poly points={TRI} fill={C.teal} opacity={0.3} stroke={C.teal} />
        <Poly points={hx} fill={C.orange} opacity={0.3} stroke={C.orange} />
        <Poly points={ghx} fill={C.violet} opacity={0.3} stroke={C.violet} width={2} />
        <Poly points={other} stroke={C.muted} dash="4 4" />
        <Dot x={HC[0]} y={HC[1]} color={C.orange} label="centre de h" r={3.5} />
        <Dot x={GC[0]} y={GC[1]} color={C.violet} label="centre de g" r={3.5} />
      </Plot>
      <Caption>{String.raw`Vert : $x$ ; orange : $h\cdot x$ ; violet : $g\cdot(h\cdot x)$ ; pointillé : $(hg)\cdot x$.`}</Caption>
    </div>
  );

  const Q = [
    [Math.cos(phi), -Math.sin(phi)],
    [Math.sin(phi), Math.cos(phi)],
  ];
  const QtAQ = [0, 1].map((i) => [0, 1].map((j) => [0, 1].reduce((s, k) => s + Q[k]![i]! * [0, 1].reduce((t, l) => t + A[k]![l]! * Q[l]![j]!, 0), 0)));
  // Ellipse xᵀAx = 1 : paramétrage par les axes propres.
  const l1 = (A[0]![0]! + A[1]![1]!) / 2 + Math.hypot((A[0]![0]! - A[1]![1]!) / 2, A[0]![1]!);
  const l2 = (A[0]![0]! + A[1]![1]!) / 2 - Math.hypot((A[0]![0]! - A[1]![1]!) / 2, A[0]![1]!);
  const ell = linspace(0, 2 * Math.PI, 120).map((t) => {
    const u = Math.cos(t) / Math.sqrt(l1);
    const v = Math.sin(t) / Math.sqrt(l2);
    return [u * Math.cos(eigAngle) - v * Math.sin(eigAngle), u * Math.sin(eigAngle) + v * Math.cos(eigAngle)] as [number, number];
  });
  const frame = (
    <div>
      <Plot xDomain={[-1.3, 1.3]} yDomain={[-1.3, 1.3]} width={313} height={313} grid={false} ariaLabel="Changer le repère des composantes">
        <Curve points={ell} color={C.blue} width={2.4} />
        <Arrow a={[0, 0]} b={[Q[0]![0]!, Q[1]![0]!]} color={C.teal} width={2.4} />
        <Arrow a={[0, 0]} b={[Q[0]![1]!, Q[1]![1]!]} color={C.orange} width={2.4} />
      </Plot>
      <Caption>{String.raw`Ellipse $x^{\mathsf T}Ax=1$ et repère $Q$ (vert, orange).`}</Caption>
    </div>
  );

  const offDiag = Math.abs(QtAQ[0]![1]!);
  return (
    <PlateScene
      n={24}
      panels={[
        { title: 'Composer une action à gauche', render: () => compose },
        { title: 'Changer le repère des composantes', render: () => frame },
      ]}
      identity={String.raw`$g\cdot(h\cdot x)=(gh)\cdot x$, $\quad e\cdot x=x$ ; $\quad A\mapsto Q^{\mathsf T}AQ$ (action de $O(2)$ sur les formes quadratiques).`}
      controls={
        <>
          <Slider label="Angle de h (centre O)" value={eta} min={-3.14} max={3.14} step={0.01} onChange={setEta} format={(x) => `${Math.round((x * 180) / Math.PI)}°`} />
          <Slider label="Angle de g (centre (0,9 ; 0,6))" value={gam} min={-3.14} max={3.14} step={0.01} onChange={setGam} format={(x) => `${Math.round((x * 180) / Math.PI)}°`} />
          <Slider label="Angle du repère Q" value={phi} min={-1.57} max={1.57} step={0.005} onChange={setPhi} format={(x) => `${Math.round((x * 180) / Math.PI)}°`} />
        </>
      }
      observations={[
        { id: 'compose', text: String.raw`Le triangle violet coïncide avec $(gh)\cdot x$ calculé d'un seul coup : l'action respecte le produit.`, done: Math.abs(eta - 0.9) > 0.3 || Math.abs(gam - 1.2) > 0.3 },
        { id: 'ordre', text: String.raw`L'ordre compte : $(hg)\cdot x$ (pointillé) est ailleurs, sauf si $g$ ou $h$ est l'identité.`, done: gapHG > 0.3 },
        { id: 'diagonal', text: String.raw`Aligne $Q$ sur les axes de l'ellipse : $Q^{\mathsf T}AQ$ devient diagonale.`, done: offDiag < 0.02 },
      ]}
      readings={[
        { label: String.raw`$\max|g(hx)-(gh)x|$`, value: f2(err, 12), status: 'exact' },
        { label: String.raw`$Q^{\mathsf T}AQ$`, value: `[[${f2(QtAQ[0]![0]!, 3)} ; ${f2(QtAQ[0]![1]!, 3)}], [${f2(QtAQ[1]![0]!, 3)} ; ${f2(QtAQ[1]![1]!, 3)}]]`, status: 'exact' },
        { label: String.raw`Trace et déterminant de $Q^{\mathsf T}AQ$`, value: `${f2(QtAQ[0]![0]! + QtAQ[1]![1]!, 4)} ; ${f2(QtAQ[0]![0]! * QtAQ[1]![1]! - QtAQ[0]![1]! * QtAQ[1]![0]!, 4)}`, status: 'exact' },
      ]}
    />
  );
}
