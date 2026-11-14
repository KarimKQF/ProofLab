/**
 * Planche 47 — Invariants, coordonnées adaptées et réduction d'ordre.
 * Dilatation (x, u) ↦ (λ²x, λu) : r = u/√x est invariant, ses niveaux sont les orbites.
 * u″ = (u′)²/u est autonome : avec p(u) = u′, p dp/du = p²/u, d'où p = Cu et u = A e^{Cx}.
 */
import { useState } from 'react';
import { PlateScene } from '../PlateScene';
import { C, Caption, ClippedCurve, Dot, DraggablePoint, f2, Plot, Slider } from '../kit2d';
import { linspace } from '../math';

const DOM1: [number, number, number, number] = [0, 3.2, 0, 2.4];

export default function P47() {
  const [pt, setPt] = useState<[number, number]>([0.8, 0.8]);
  const [lam, setLam] = useState(1.3);
  const [Cc, setCc] = useState(0.6);
  const [A, setA] = useState(0.5);
  const [x, setX] = useState(1);
  const r = pt[1] / Math.sqrt(pt[0]);
  const moved: [number, number] = [lam * lam * pt[0], lam * pt[1]];
  const xs = linspace(0.01, 3.2, 160);
  const orbits = (
    <div>
      <Plot xDomain={[0, 3.2]} yDomain={[0, 2.4]} width={330} height={248} ariaLabel="Orbites de la dilatation">
        {[0.4, 0.7, 1.0, 1.3].map((c) => (
          <ClippedCurve key={c} points={xs.map((t) => [t, c * Math.sqrt(t)])} domain={DOM1} color={C.faint} width={1.2} />
        ))}
        <ClippedCurve points={xs.map((t) => [t, r * Math.sqrt(t)])} domain={DOM1} color={C.orange} width={2.4} />
        <Dot x={moved[0]} y={moved[1]} color={C.violet} label="λ·p" r={5} />
        <DraggablePoint x={pt[0]} y={pt[1]} onChange={(a, b) => setPt([Math.max(0.05, a), Math.max(0.02, b)])} name="Point p" color={C.ink} label="p" bounds={[0.05, 3, 0.02, 2.3]} step={0.05} r={6} />
      </Plot>
      <Caption>{String.raw`Les orbites sont les courbes $u=r\sqrt x$, niveaux de l'invariant $r=u/\sqrt x$.`}</Caption>
    </div>
  );
  const u = A * Math.exp(Cc * x);
  const p = Cc * u;
  const us = linspace(0, 3, 100);
  const DOM2: [number, number, number, number] = [0, 3, -2, 3];
  const reduction = (
    <div>
      <Plot xDomain={[0, 3]} yDomain={[-2, 3]} width={330} height={248} ariaLabel="Réduction dans le plan (u, p)">
        {[-0.6, 0.3, 0.9].map((c) => (
          <ClippedCurve key={c} points={us.map((v) => [v, c * v])} domain={DOM2} color={C.faint} width={1.2} />
        ))}
        <ClippedCurve points={us.map((v) => [v, Cc * v])} domain={DOM2} color={C.teal} width={2.4} />
        {u <= 3 && <Dot x={u} y={p} color={C.orange} label="(u(x), u′(x))" r={5} />}
      </Plot>
      <Caption>{String.raw`Plan $(u,p)$ : l'équation réduite $p\,\frac{dp}{du}=\frac{p^2}{u}$ a pour solutions les droites $p=Cu$.`}</Caption>
    </div>
  );
  return (
    <PlateScene
      n={47}
      panels={[
        { title: 'Les orbites de la dilatation', render: () => orbits },
        { title: 'Réduction par translation', render: () => reduction },
      ]}
      identity={String.raw`$Xr=0$, $\ Xs=1$ (coordonnées adaptées) ; $\ u'=p(u)\Rightarrow u''=p\,\dfrac{dp}{du}$.`}
      controls={
        <>
          <Slider label="Facteur λ de la dilatation" value={lam} min={0.4} max={1.8} step={0.01} onChange={setLam} format={(v) => f2(v)} />
          <Slider label="Constante C (p = Cu)" value={Cc} min={-0.8} max={1} step={0.01} onChange={setCc} format={(v) => f2(v)} />
          <Slider label="Constante A (u = A e^{Cx})" value={A} min={0.1} max={1.5} step={0.01} onChange={setA} format={(v) => f2(v)} />
          <Slider label="Abscisse x" value={x} min={0} max={3} step={0.01} onChange={setX} format={(v) => f2(v)} />
        </>
      }
      observations={[
        { id: 'invariant', text: String.raw`Fais varier $\lambda$ : le point reste sur sa courbe, $r$ ne change pas.`, done: Math.abs(lam - 1) > 0.5 },
        { id: 'droite', text: String.raw`Quand $x$ varie, $(u,u')$ glisse le long de la droite $p=Cu$ : l'ordre a baissé d'une unité.`, done: Math.abs(x - 1) > 1 },
        { id: 'constante', text: String.raw`Pour $C=0$, la solution est constante : $p=0$.`, done: Math.abs(Cc) < 0.01 },
      ]}
      readings={[
        { label: String.raw`$r=u/\sqrt x$ en $p$ et en $\lambda\cdot p$`, value: `${f2(r, 4)} ; ${f2(moved[1] / Math.sqrt(moved[0]), 4)}`, status: 'exact' },
        { label: String.raw`$u''-(u')^2/u$ pour $u=Ae^{Cx}$`, value: f2(Cc * Cc * u - (p * p) / u, 10), status: 'exact' },
      ]}
    />
  );
}
