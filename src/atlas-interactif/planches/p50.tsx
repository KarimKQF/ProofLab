/**
 * Planche 50 — Autosimilarité pour u_t = u_xx.
 * u(x, t) = t^{−1/2} e^{−x²/(4t)} : trois profils à trois instants ; après le changement
 * d'échelle ζ = x/√t, √t·u = Φ(ζ) = e^{−ζ²/4} : une seule courbe.
 */
import { useState } from 'react';
import { PlateScene } from '../PlateScene';
import { C, Caption, ClippedCurve, f2, Plot, Slider } from '../kit2d';
import { linspace } from '../math';

const u = (x: number, t: number) => Math.exp(-(x * x) / (4 * t)) / Math.sqrt(t);
const REF = [
  { t: 0.85, color: C.teal },
  { t: 1.6, color: C.orange },
  { t: 3.2, color: C.violet },
];

export default function P50() {
  const [t, setT] = useState(2.2);
  const xs = linspace(-5, 5, 260);
  const D1: [number, number, number, number] = [-5, 5, 0, 1.25];
  const profiles = (
    <div>
      <Plot xDomain={[-5, 5]} yDomain={[0, 1.25]} width={330} height={248} ariaLabel="Profils à trois instants">
        {REF.map((r) => (
          <ClippedCurve key={r.t} points={xs.map((x) => [x, u(x, r.t)])} domain={D1} color={r.color} width={1.8} />
        ))}
        <ClippedCurve points={xs.map((x) => [x, u(x, t)])} domain={D1} color={C.ink} width={2.4} dash="6 4" />
      </Plot>
      <Caption>{String.raw`Profils $u(\cdot,t)$ pour $t=0{,}85$ ; $1{,}6$ ; $3{,}2$ ; pointillé : le temps choisi.`}</Caption>
    </div>
  );
  const zs = linspace(-5, 5, 260);
  const D2: [number, number, number, number] = [-5, 5, 0, 1.2];
  const collapse = (
    <div>
      <Plot xDomain={[-5, 5]} yDomain={[0, 1.2]} width={330} height={248} ariaLabel="Superposition après changement d'échelle">
        {REF.map((r) => (
          <ClippedCurve key={r.t} points={zs.map((z) => [z, Math.sqrt(r.t) * u(z * Math.sqrt(r.t), r.t)])} domain={D2} color={r.color} width={4 - REF.indexOf(r)} />
        ))}
        <ClippedCurve points={zs.map((z) => [z, Math.sqrt(t) * u(z * Math.sqrt(t), t)])} domain={D2} color={C.ink} width={1.4} dash="6 4" />
      </Plot>
      <Caption>{String.raw`$\sqrt t\,u$ en fonction de $\zeta=x/\sqrt t$ : toutes les courbes se superposent.`}</Caption>
    </div>
  );
  const dev = Math.max(...zs.map((z) => Math.abs(Math.sqrt(t) * u(z * Math.sqrt(t), t) - Math.exp(-(z * z) / 4))));
  return (
    <PlateScene
      n={50}
      panels={[
        { title: 'Profils à trois instants', render: () => profiles },
        { title: 'Superposition après changement d’échelle', render: () => collapse },
      ]}
      identity={String.raw`$\zeta=x/\sqrt t$, $\quad u=t^{-1/2}\Phi(\zeta)$, $\quad\Phi''+\tfrac12\zeta\Phi'+\tfrac12\Phi=0$ ; $\ \Phi(\zeta)=e^{-\zeta^2/4}$.`}
      controls={<Slider label="Temps t" value={t} min={0.3} max={6} step={0.01} onChange={setT} format={(v) => f2(v)} />}
      observations={[
        { id: 'aplatit', text: 'Avance en temps : le profil s’aplatit et s’élargit, son maximum vaut 1/√t.', done: t > 4 },
        { id: 'superpose', text: 'Après le changement d’échelle, le profil choisi tombe exactement sur les trois autres.', done: Math.abs(t - 2.2) > 1 },
        { id: 'tot', text: 'Aux temps courts, le profil se concentre près de x = 0.', done: t < 0.5 },
      ]}
      readings={[
        { label: String.raw`$u(0,t)=t^{-1/2}$`, value: f2(u(0, t), 4), status: 'exact' },
        { label: String.raw`$\max_\zeta|\sqrt t\,u-\Phi(\zeta)|$`, value: f2(dev, 12), status: 'exact' },
      ]}
    />
  );
}
