/**
 * Planche 63 — Champ hamiltonien, crochet de Poisson et volume.
 * X_H = (∂_pH, −∂_qH) longe les niveaux de H, ∇H leur est orthogonal. Le flot transporte un
 * carré D : l'aire de Φ_t(D) est conservée (Liouville), mesurée sur un contour de 160 points.
 */
import { useMemo, useState } from 'react';
import { PlateScene } from '../PlateScene';
import { Arrow, C, Caption, Choice, ClippedCurve, DraggablePoint, f2, Plot, Poly, Slider } from '../kit2d';
import { linspace, rk4, shoelace } from '../math';

const HS = {
  osc: { label: String.raw`$H=\tfrac12(q^2+p^2)$`, H: (q: number, p: number) => 0.5 * (q * q + p * p), hq: (q: number) => q, hp: (_: number, p: number) => p },
  pend: { label: String.raw`$H=\tfrac12p^2-\cos q$`, H: (q: number, p: number) => 0.5 * p * p - Math.cos(q), hq: (q: number) => Math.sin(q), hp: (_: number, p: number) => p },
  cub: { label: String.raw`$H=\tfrac12p^2+\tfrac13q^3-q$`, H: (q: number, p: number) => 0.5 * p * p + (q * q * q) / 3 - q, hq: (q: number) => q * q - 1, hp: (_: number, p: number) => p },
};
type K = keyof typeof HS;
const DOM: [number, number, number, number] = [-2.6, 2.6, -2.2, 2.2];

export default function P63() {
  const [k, setK] = useState<K>('pend');
  const [pt, setPt] = useState<[number, number]>([0.8, 0.6]);
  const [t, setT] = useState(1.2);
  const h = HS[k];
  const XH: [number, number] = [h.hp(pt[0], pt[1]), -h.hq(pt[0])];
  const G: [number, number] = [h.hq(pt[0]), h.hp(pt[0], pt[1])];
  const sc = (v: [number, number]) => {
    const l = Math.hypot(...v) || 1;
    return [(0.5 * v[0]) / l, (0.5 * v[1]) / l] as [number, number];
  };
  const square = useMemo(() => {
    const c: [number, number] = [-0.4, 0.3];
    const s = 0.35;
    const edge = (a: [number, number], b: [number, number]) => linspace(0, 1, 40).slice(0, 40).map((u) => [a[0] + u * (b[0] - a[0]), a[1] + u * (b[1] - a[1])]);
    return [
      ...edge([c[0] - s, c[1] - s], [c[0] + s, c[1] - s]),
      ...edge([c[0] + s, c[1] - s], [c[0] + s, c[1] + s]),
      ...edge([c[0] + s, c[1] + s], [c[0] - s, c[1] + s]),
      ...edge([c[0] - s, c[1] + s], [c[0] - s, c[1] - s]),
    ];
  }, []);
  const moved = useMemo(() => square.map((z) => rk4(([q, p]) => [h.hp(q!, p!), -h.hq(q!)], z, t, 60)), [square, h, t]);
  const ratio = shoelace(moved) / shoelace(square);
  const levels = (
    <div>
      <Plot xDomain={[-2.6, 2.6]} yDomain={[-2.2, 2.2]} width={300} height={254} ariaLabel="Le champ longe les niveaux de H">
        {[-0.8, -0.3, 0.3, 0.9, 1.6].map((E) =>
          [1, -1].map((sg) => (
            <ClippedCurve
              key={`${E}${sg}`}
              points={linspace(-2.6, 2.6, 300)
                .map((q) => {
                  const r = 2 * (E - (h.H(q, 0) - 0)) ;
                  return r >= 0 ? [q, sg * Math.sqrt(r)] : [NaN, NaN];
                })}
              domain={DOM}
              color={C.faint}
              width={1}
            />
          )),
        )}
        <Arrow a={pt} b={[pt[0] + sc(XH)[0], pt[1] + sc(XH)[1]]} color={C.teal} width={2.6} />
        <Arrow a={pt} b={[pt[0] + sc(G)[0], pt[1] + sc(G)[1]]} color={C.orange} width={2} />
        <DraggablePoint x={pt[0]} y={pt[1]} onChange={(a, b) => setPt([a, b])} name="Point (q, p)" color={C.ink} bounds={[-2.5, 2.5, -2.1, 2.1]} step={0.05} r={6} />
      </Plot>
      <Caption>{String.raw`Vert : $X_H$, tangent au niveau. Orange : $\nabla H$, orthogonal.`}</Caption>
    </div>
  );
  const flow = (
    <div>
      <Plot xDomain={[-2.6, 2.6]} yDomain={[-2.2, 2.2]} width={300} height={254} ariaLabel="Même aire après évolution">
        <Poly points={square as [number, number][]} fill={C.teal} opacity={0.3} stroke={C.teal} />
        <Poly points={moved.map((z) => [z[0]!, z[1]!] as [number, number])} fill={C.orange} opacity={0.3} stroke={C.orange} width={1.8} />
      </Plot>
      <Caption>{String.raw`Vert : $D$. Orange : $\Phi_t(D)$, déformé mais de même aire.`}</Caption>
    </div>
  );
  return (
    <PlateScene
      n={63}
      panels={[
        { title: 'Le champ longe les niveaux de H', render: () => levels },
        { title: 'Même aire après évolution', render: () => flow },
      ]}
      identity={String.raw`$\iota_{X_H}\omega=dH$, $\quad(q',p')=(\partial_pH,\,-\partial_qH)$, $\quad\dfrac{df}{dt}=\{f,H\}$, $\quad\Phi_t^*\omega=\omega$.`}
      controls={
        <>
          <Choice name="Hamiltonien" value={k} onChange={setK} options={(Object.keys(HS) as K[]).map((x) => ({ id: x, label: HS[x].label }))} />
          <Slider label="Temps t du flot" value={t} min={0} max={4} step={0.01} onChange={setT} format={(v) => f2(v)} />
        </>
      }
      observations={[
        { id: 'tangent', text: String.raw`Déplace le point : $X_H$ reste tangent au niveau de $H$, donc $dH(X_H)=0$.`, done: Math.abs(pt[0] - 0.8) > 0.6 },
        { id: 'aire', text: 'Fais évoluer le carré : il se déforme, son aire ne change pas.', done: t > 3 },
        { id: 'autre', text: 'Change de hamiltonien : la conservation de l’aire tient encore.', done: k !== 'pend' && t > 1 },
      ]}
      readings={[
        { label: String.raw`$dH(X_H)$ au point`, value: f2(h.hq(pt[0]) * XH[0] + h.hp(pt[0], pt[1]) * XH[1], 10), status: 'exact' },
        { label: String.raw`Aire de $\Phi_t(D)$ / aire de $D$`, value: f2(ratio, 5), status: 'numerique' },
      ]}
      note="Flot par Runge–Kutta d’ordre 4 ; l’aire est mesurée sur un contour de 160 points, d’où un écart à 1 de l’ordre de 10⁻³ au plus."
    />
  );
}
