/**
 * Planche 51 — Autres symétries ponctuelles de u_t = u_xx (κ = 1).
 * Galiléenne : x̃ = x + 2εt, et ũ(x, t) = e^{−εx + ε²t} u(x − 2εt, t) reste solution.
 * Projective : (x, t) ↦ (x/(1 − εt), t/(1 − εt)).
 */
import { useState } from 'react';
import { PlateScene } from '../PlateScene';
import { C, Caption, ClippedCurve, f2, Plot, Slider } from '../kit2d';
import { linspace } from '../math';

const heat = (x: number, t: number) => Math.exp(-(x * x) / (4 * t)) / Math.sqrt(t);

export default function P51() {
  const [eps, setEps] = useState(0.35);
  const ts = linspace(0, 1.6, 60);
  const D: [number, number, number, number] = [-1.4, 1.6, 0, 1.6];
  const gal = (
    <div>
      <Plot xDomain={[-1.4, 1.6]} yDomain={[0, 1.6]} width={330} height={248} ariaLabel="Transformation galiléenne">
        {linspace(-1.2, 1.4, 6).map((x) => (
          <ClippedCurve key={`v${x}`} points={ts.map((t) => [x, t])} domain={D} color={C.faint} width={1} />
        ))}
        {linspace(-1.2, 1.4, 6).map((x) => (
          <ClippedCurve key={x} points={ts.map((t) => [x + 2 * eps * t, t])} domain={D} color={C.teal} width={1.8} />
        ))}
      </Plot>
      <Caption>{String.raw`Les droites $x=$ constante deviennent $\tilde x=x+2\varepsilon t$.`}</Caption>
    </div>
  );
  const proj = (
    <div>
      <Plot xDomain={[-1.4, 1.6]} yDomain={[0, 1.6]} width={330} height={248} ariaLabel="Transformation projective du temps">
        {linspace(-1.2, 1.4, 6).map((x) => (
          <ClippedCurve key={x} points={ts.filter((t) => 1 - eps * t > 0.05).map((t) => [x / (1 - eps * t), t / (1 - eps * t)])} domain={D} color={C.orange} width={1.8} />
        ))}
        {[0.4, 0.8, 1.2].map((t) => (
          <ClippedCurve key={`h${t}`} points={linspace(-1.4, 1.6, 20).filter(() => 1 - eps * t > 0.05).map((x) => [x / (1 - eps * t), t / (1 - eps * t)])} domain={D} color={C.violet} width={1.2} />
        ))}
      </Plot>
      <Caption>{String.raw`$(x,t)\mapsto\big(\frac{x}{1-\varepsilon t},\frac{t}{1-\varepsilon t}\big)$ : verticales et horizontales transformées.`}</Caption>
    </div>
  );
  // Résidu de ũ_t − ũ_xx en un point, par différences centrées (pas 1e−3).
  const ut = (x: number, t: number) => Math.exp(-eps * x + eps * eps * t) * heat(x - 2 * eps * t, t);
  const h = 1e-3;
  const x0 = 0.4;
  const t0 = 0.7;
  const res = (ut(x0, t0 + h) - ut(x0, t0 - h)) / (2 * h) - (ut(x0 + h, t0) - 2 * ut(x0, t0) + ut(x0 - h, t0)) / (h * h);
  return (
    <PlateScene
      n={51}
      panels={[
        { title: 'Transformation galiléenne', render: () => gal },
        { title: 'Transformation projective du temps', render: () => proj },
      ]}
      identity={String.raw`$G=2\kappa t\,\partial_x-xu\,\partial_u$, $\quad K=t^2\partial_t+tx\,\partial_x-\Big(\dfrac{x^2}{4\kappa}+\dfrac t2\Big)u\,\partial_u$.`}
      controls={<Slider label="Paramètre ε" value={eps} min={-0.6} max={0.6} step={0.01} onChange={setEps} format={(v) => f2(v)} />}
      observations={[
        { id: 'incline', text: 'Fais varier ε : les droites verticales s’inclinent d’autant plus que t est grand.', done: Math.abs(eps) > 0.5 },
        { id: 'solution', text: String.raw`La transformée galiléenne $\tilde u$ de la solution fondamentale reste solution : le résidu est nul.`, done: Math.abs(eps - 0.35) > 0.2 },
        { id: 'identite', text: 'Pour ε = 0, les deux transformations sont l’identité.', done: Math.abs(eps) < 0.005 },
      ]}
      readings={[{ label: String.raw`$\tilde u_t-\tilde u_{xx}$ en $(0{,}4\ ;\ 0{,}7)$`, value: f2(res, 5), status: 'numerique' }]}
      note="Résidu par différences centrées de pas 10⁻³ : nul à l’erreur de discrétisation près."
    />
  );
}
