/**
 * Planche 3 — Application lisse et différentielle.
 * F(x, y) = (x + 0,15 y², y + 0,25 x²) déforme la grille ; en p, la sécante
 * (F(p + tv) − F(p))/t tend vers dF_p(v) quand t → 0.
 */
import { useState } from 'react';
import { PlateScene } from '../PlateScene';
import { Arrow, C, Caption, Curve, Dot, DraggablePoint, f2, Plot, Slider } from '../kit2d';
import { linspace } from '../math';

type V = [number, number];
const F = ([x, y]: V): V => [x + 0.15 * y * y, y + 0.25 * x * x];
const dF = ([x, y]: V, [a, b]: V): V => [a + 0.3 * y * b, 0.5 * x * a + b];
const DOM: [number, number, number, number] = [-1.6, 1.6, -1.6, 1.6];

export default function P03() {
  const [p, setP] = useState<V>([0.2, -0.2]);
  const [tip, setTip] = useState<V>([0.9, 0.7]);
  const [t, setT] = useState(1);
  const v: V = [tip[0] - p[0], tip[1] - p[1]];
  const Fp = F(p);
  const d = dF(p, v);
  const Ft = F([p[0] + t * v[0], p[1] + t * v[1]]);
  const sec: V = [(Ft[0] - Fp[0]) / t, (Ft[1] - Fp[1]) / t];
  const gap = Math.hypot(sec[0] - d[0], sec[1] - d[1]);
  const lines = linspace(-1.5, 1.5, 10);

  const before = (
    <div>
      <Plot xDomain={[-1.7, 1.7]} yDomain={[-1.7, 1.7]} width={380} height={380} grid={false} ariaLabel="Grille dans la carte de départ">
        {lines.map((c) => (
          <g key={c}>
            <Curve points={[[c, -1.5], [c, 1.5]]} color={C.faint} width={0.9} />
            <Curve points={[[-1.5, c], [1.5, c]]} color={C.faint} width={0.9} />
          </g>
        ))}
        <Curve points={[[p[0] - 2 * v[0], p[1] - 2 * v[1]], [p[0] + 2 * v[0], p[1] + 2 * v[1]]]} color={C.violet} width={1} dash="4 4" />
        <Arrow a={p} b={[p[0] + t * v[0], p[1] + t * v[1]]} color={C.orange} width={1.6} dash="5 3" />
        <Arrow a={p} b={tip} color={C.teal} width={2.4} />
        <DraggablePoint x={tip[0]} y={tip[1]} onChange={(x, y) => setTip([x, y])} name="Extrémité du vecteur v" color={C.teal} label="v" bounds={DOM} step={0.05} r={6} />
        <DraggablePoint x={p[0]} y={p[1]} onChange={(x, y) => setP([x, y])} name="Point p" color={C.ink} label="p" bounds={DOM} step={0.05} r={6} />
      </Plot>
      <Caption>{String.raw`La droite $t\mapsto p+tv$ (pointillé violet) et le point $p+tv$ (orange).`}</Caption>
    </div>
  );

  const img = (q: V[]) => q.map(F);
  const after = (
    <div>
      <Plot xDomain={[-1.9, 2.3]} yDomain={[-1.8, 2.4]} width={380} height={380} grid={false} ariaLabel="Image de la grille dans la carte d’arrivée">
        {lines.map((c) => (
          <g key={c}>
            <Curve points={img(linspace(-1.5, 1.5, 40).map((s) => [c, s] as V))} color={C.faint} width={0.9} />
            <Curve points={img(linspace(-1.5, 1.5, 40).map((s) => [s, c] as V))} color={C.faint} width={0.9} />
          </g>
        ))}
        <Curve points={img(linspace(-2, 2, 80).map((s) => [p[0] + s * v[0], p[1] + s * v[1]] as V))} color={C.violet} width={1.2} dash="4 4" />
        <Arrow a={Fp} b={[Fp[0] + d[0], Fp[1] + d[1]]} color={C.orange} width={2.6} />
        <Arrow a={Fp} b={[Fp[0] + sec[0], Fp[1] + sec[1]]} color={C.teal} width={1.8} dash="5 3" />
        <Dot x={Fp[0]} y={Fp[1]} color={C.ink} label="F(p)" r={4} dx={-38} dy={14} />
        <Dot x={Ft[0]} y={Ft[1]} color={C.teal} r={3.5} />
      </Plot>
      <Caption>{String.raw`Orange : $dF_p(v)$. Vert pointillé : la sécante $(F(p+tv)-F(p))/t$.`}</Caption>
    </div>
  );

  return (
    <PlateScene
      n={3}
      panels={[
        { title: 'Dans la carte de départ', render: () => before },
        { title: 'Dans la carte d’arrivée', render: () => after },
      ]}
      identity={String.raw`$dF_p(\gamma'(0))=(F\circ\gamma)'(0)$, $\quad dF_{(x,y)}=\begin{pmatrix}1&0{,}3\,y\\0{,}5\,x&1\end{pmatrix}$ pour $F(x,y)=(x+0{,}15y^2,\ y+0{,}25x^2)$.`}
      controls={
        <>
          <Slider label="Pas t de la sécante" value={t} min={0.02} max={1.5} step={0.01} onChange={setT} format={(x) => f2(x)} />
          <p className="text-[12.5px] text-text-3">Déplace p et l’extrémité de v dans la carte de départ.</p>
        </>
      }
      observations={[
        { id: 'limite', text: String.raw`Fais tendre $t$ vers $0$ : la sécante se confond avec $dF_p(v)$.`, done: t <= 0.05 },
        { id: 'courbe', text: String.raw`L'image de la droite $p+tv$ est une courbe ; $dF_p(v)$ est sa tangente en $F(p)$.`, done: t <= 0.3 && Math.hypot(v[0], v[1]) > 0.5 },
        { id: 'lineaire', text: String.raw`Double $v$ : $dF_p(v)$ double aussi (linéarité de la différentielle).`, done: Math.hypot(v[0], v[1]) > 1.6 },
      ]}
      readings={[
        { label: String.raw`$dF_p(v)$`, value: `(${f2(d[0], 3)} ; ${f2(d[1], 3)})`, status: 'exact' },
        { label: String.raw`Sécante en $t$`, value: `(${f2(sec[0], 3)} ; ${f2(sec[1], 3)})`, status: 'exact' },
        { label: 'Écart sécante − dérivée', value: f2(gap, 4), status: 'exact' },
      ]}
      note="L’écart est exactement d’ordre 1 en t : F est polynomiale de degré 2, donc F(p + tv) − F(p) − t dF_p(v) = t² (0,15 v_y², 0,25 v_x²)."
    />
  );
}
