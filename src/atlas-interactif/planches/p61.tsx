/**
 * Planche 61 — Symétries brisées, forçage et conditions au bord.
 * q″ = −q − γq′ : dH/dt = −γ q′², avec H = ½(q′² + q²) ; H est constante si γ = 0, décroît sinon.
 * Sur [0, 1] avec u(0) = u(1) = 0, la translation u(x − ε) ne respecte plus le bord.
 */
import { useMemo, useState } from 'react';
import { PlateScene } from '../PlateScene';
import { C, Caption, ClippedCurve, Dot, f2, Plot, Poly, Slider } from '../kit2d';
import { linspace, rk4 } from '../math';

export default function P61() {
  const [gamma, setGamma] = useState(0.4);
  const [eps, setEps] = useState(0.25);
  const T = 12;
  const H = useMemo(() => {
    const pts: number[][] = [[1, 0]];
    const n = 300;
    for (let i = 0; i < n; i++) pts.push(rk4(([q, v]) => [v!, -q! - gamma * v!], pts[i]!, T / n, 6));
    return pts.map(([q, v]) => 0.5 * (q! * q! + v! * v!));
  }, [gamma]);
  const ts = H.map((_, i) => (T * i) / (H.length - 1));
  const D: [number, number, number, number] = [0, T, 0, 0.6];
  const energyPlot = (
    <div>
      <Plot xDomain={[0, T]} yDomain={[0, 0.6]} width={300} height={260} ariaLabel="H au cours du temps">
        <ClippedCurve points={[[0, 0.5], [T, 0.5]]} domain={D} color={C.teal} width={1.6} dash="5 4" />
        <ClippedCurve points={ts.map((t, i) => [t, H[i]!])} domain={D} color={C.orange} width={2.4} />
      </Plot>
      <Caption>{String.raw`$H=\tfrac12(q'^2+q^2)$ le long de la solution ; pointillé : le cas $\gamma=0$.`}</Caption>
    </div>
  );
  const xs = linspace(0, 1, 120);
  const D2: [number, number, number, number] = [-0.5, 1.6, -0.3, 1.2];
  const domain = (
    <div>
      <Plot xDomain={[-0.5, 1.6]} yDomain={[-0.3, 1.2]} width={300} height={214} ariaLabel="Une translation déplace le domaine">
        <Poly points={[[0, -0.05], [1, -0.05], [1, 0.02], [0, 0.02]]} fill={C.teal} opacity={0.5} />
        <Poly points={[[eps, -0.2], [1 + eps, -0.2], [1 + eps, -0.13], [eps, -0.13]]} fill={C.orange} opacity={0.5} />
        <ClippedCurve points={xs.map((x) => [x, Math.sin(Math.PI * x)])} domain={D2} color={C.teal} width={2.2} />
        <ClippedCurve points={xs.map((x) => [x + eps, Math.sin(Math.PI * x)])} domain={D2} color={C.orange} width={2.2} />
        <Dot x={0} y={0} color={C.teal} r={4} />
        <Dot x={1} y={0} color={C.teal} r={4} />
      </Plot>
      <Caption>{String.raw`Vert : $u=\sin\pi x$ sur $[0,1]$, nulle au bord. Orange : sa translatée, définie sur $[\varepsilon,1+\varepsilon]$.`}</Caption>
    </div>
  );
  return (
    <PlateScene
      n={61}
      panels={[
        { title: 'Conservation ou décroissance', render: () => energyPlot },
        { title: 'Une translation déplace le domaine', render: () => domain },
      ]}
      identity={String.raw`$\dfrac{d}{dt}\big(q'\cdot L_{q'}-L\big)=q'\cdot F-\partial_tL$ (avec un second membre $F$) ; ici $F=-\gamma q'$ : $\dfrac{dH}{dt}=-\gamma q'^2$.`}
      controls={
        <>
          <Slider label="Coefficient γ" value={gamma} min={0} max={1} step={0.01} onChange={setGamma} format={(v) => f2(v)} />
          <Slider label="Translation ε du domaine" value={eps} min={0} max={0.6} step={0.01} onChange={setEps} format={(v) => f2(v)} />
        </>
      }
      observations={[
        { id: 'conserve', text: String.raw`Pour $\gamma=0$, l'équation est invariante par translation en temps : $H$ est constante.`, done: gamma === 0 },
        { id: 'decroit', text: String.raw`Pour $\gamma>0$, le terme $-\gamma q'$ brise la conservation : $H$ décroît.`, done: gamma > 0.6 },
        { id: 'bord', text: String.raw`Translate le domaine : la translatée ne s'annule plus en $x=0$, la condition au bord casse la symétrie.`, done: eps > 0.2 },
      ]}
      readings={[
        { label: String.raw`$H(0)$ et $H(12)$`, value: `${f2(H[0]!, 4)} ; ${f2(H[H.length - 1]!, 4)}`, status: 'numerique' },
        { label: String.raw`Translatée en $x=0$ : $\sin(-\pi\varepsilon)$`, value: f2(Math.sin(-Math.PI * eps), 4), status: 'exact' },
      ]}
    />
  );
}
