/**
 * Planche 58 — Variation et équation d'Euler–Lagrange.
 * L = ½ q′² sur [0, 1], q(0) = 0,2, q(1) = 0,8. Pour la droite q* (solution de q″ = 0),
 * S[q* + εη] − S[q*] = ε²/2 ∫η′² : parabole de pente nulle en ε = 0. Pour une courbe non
 * critique, la pente en 0 vaut δS[q](η) = −∫q″η ≠ 0.
 */
import { useState } from 'react';
import { PlateScene } from '../PlateScene';
import { C, Caption, Choice, ClippedCurve, Dot, f2, Plot, Slider } from '../kit2d';
import { linspace, simpson } from '../math';

const ETAS = [
  { id: 'sin', label: String.raw`$\eta=\sin\pi t$`, f: (t: number) => Math.sin(Math.PI * t), d: (t: number) => Math.PI * Math.cos(Math.PI * t) },
  { id: 'sin2', label: String.raw`$\eta=\sin2\pi t$`, f: (t: number) => Math.sin(2 * Math.PI * t), d: (t: number) => 2 * Math.PI * Math.cos(2 * Math.PI * t) },
  { id: 'bosse', label: String.raw`$\eta=16t^2(1-t)^2$`, f: (t: number) => 16 * t * t * (1 - t) ** 2, d: (t: number) => 32 * t * (1 - t) ** 2 - 32 * t * t * (1 - t) },
];

export default function P58() {
  const [eps, setEps] = useState(0.15);
  const [eid, setEid] = useState('sin');
  const [crit, setCrit] = useState<'droite' | 'courbe'>('droite');
  const eta = ETAS.find((e) => e.id === eid)!;
  const q = (t: number) => 0.2 + 0.6 * t + (crit === 'courbe' ? 0.3 * Math.sin(Math.PI * t) : 0);
  const qd = (t: number) => 0.6 + (crit === 'courbe' ? 0.3 * Math.PI * Math.cos(Math.PI * t) : 0);
  const S = (e: number) => simpson((t) => 0.5 * (qd(t) + e * eta.d(t)) ** 2, 0, 1, 200);
  const S0 = S(0);
  const slope = simpson((t) => qd(t) * eta.d(t), 0, 1, 200);
  const ts = linspace(0, 1, 160);
  const D1: [number, number, number, number] = [0, 1, -0.4, 1.4];
  const curves = (
    <div>
      <Plot xDomain={[0, 1]} yDomain={[-0.4, 1.4]} width={320} height={260} ariaLabel="Varier la courbe, garder les extrémités">
        <ClippedCurve points={ts.map((t) => [t, q(t)])} domain={D1} color={C.teal} width={2.4} />
        <ClippedCurve points={ts.map((t) => [t, q(t) + eps * eta.f(t)])} domain={D1} color={C.orange} width={2.2} />
        <Dot x={0} y={q(0)} color={C.ink} r={4} />
        <Dot x={1} y={q(1)} color={C.ink} r={4} />
      </Plot>
      <Caption>{String.raw`Vert : $q$. Orange : $q+\varepsilon\eta$, mêmes extrémités.`}</Caption>
    </div>
  );
  const es = linspace(-1, 1, 120);
  const vals = es.map((e) => S(e) - S0);
  const top = Math.max(0.5, ...vals);
  const bot = Math.min(-0.1, ...vals);
  const D2: [number, number, number, number] = [-1, 1, bot, top];
  const action = (
    <div>
      <Plot xDomain={[-1, 1]} yDomain={[bot, top]} width={320} height={260} ariaLabel="Action de la famille de courbes">
        <ClippedCurve points={es.map((e, i) => [e, vals[i]!])} domain={D2} color={C.teal} width={2.4} />
        <ClippedCurve points={[[-1, -slope], [1, slope]]} domain={D2} color={C.orange} width={1.4} dash="5 4" />
        <Dot x={eps} y={S(eps) - S0} color={C.orange} r={5} />
      </Plot>
      <Caption>{String.raw`$S[q+\varepsilon\eta]-S[q]$ ; pointillé : sa tangente en $\varepsilon=0$, de pente $\delta S[q](\eta)$.`}</Caption>
    </div>
  );
  return (
    <PlateScene
      n={58}
      panels={[
        { title: 'Varier la courbe, garder les extrémités', render: () => curves },
        { title: 'Action de la famille de courbes', render: () => action },
      ]}
      identity={String.raw`$\delta S[q](\eta)=\displaystyle\int\Big(L_q-\frac{d}{dt}L_{q'}\Big)\eta\,dt$ si $\eta(a)=\eta(b)=0$ ; ici $L=\tfrac12q'^2$ : $\delta S[q](\eta)=-\int q''\eta$.`}
      controls={
        <>
          <Choice
            name="Courbe de référence"
            value={crit}
            onChange={setCrit}
            options={[
              { id: 'droite', label: 'Droite (critique)' },
              { id: 'courbe', label: 'Courbe non critique' },
            ]}
          />
          <Choice name="Variation η" value={eid} onChange={setEid} options={ETAS.map((e) => ({ id: e.id, label: e.label }))} />
          <Slider label="ε" value={eps} min={-1} max={1} step={0.01} onChange={setEps} format={(v) => f2(v)} />
        </>
      }
      observations={[
        { id: 'pente-nulle', text: 'Pour la droite, la courbe de l’action a une pente nulle en 0, pour toute variation.', done: crit === 'droite' && eid !== 'sin' },
        { id: 'pente', text: 'Pour la courbe non critique, la pente en 0 n’est pas nulle : on peut diminuer l’action.', done: crit === 'courbe' && Math.abs(slope) > 0.05 },
        { id: 'extremites', text: 'Quelle que soit ε, les extrémités ne bougent pas.', done: Math.abs(eps) > 0.6 },
      ]}
      readings={[
        { label: String.raw`$\delta S[q](\eta)$ (pente en $0$)`, value: f2(slope, 6), status: 'numerique' },
        { label: String.raw`$S[q+\varepsilon\eta]-S[q]$`, value: f2(S(eps) - S0, 6), status: 'numerique' },
      ]}
      note="Intégrales par la méthode de Simpson (200 sous-intervalles)."
    />
  );
}
