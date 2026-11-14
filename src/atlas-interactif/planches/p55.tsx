/**
 * Planche 55 — La méthode de Lie en un dessin.
 * Les six étapes, déroulées sur u_t = u_xx et la dilatation X = x∂x + 2t∂t : prolongement,
 * test sur le niveau, invariant ζ = x/√t, solution réduite u = Φ(ζ), Φ″ + (ζ/2)Φ′ = 0,
 * Φ = erf(ζ/2). Les profils u(·, t) se superposent en fonction de ζ.
 */
import { useState } from 'react';
import { PlateScene } from '../PlateScene';
import { C, Caption, ClippedCurve, f2, Plot, Slider } from '../kit2d';
import { MathText } from '@/components/Math';
import { cx } from '@/components/ui';
import { linspace } from '../math';

/** Fonction d'erreur (approximation d'Abramowitz–Stegun 7.1.26, erreur < 1,5·10⁻⁷). */
function erf(x: number) {
  const s = Math.sign(x);
  const a = Math.abs(x);
  const t = 1 / (1 + 0.3275911 * a);
  const y = 1 - ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-a * a);
  return s * y;
}

const STEPS = [
  { id: 'equation', title: 'Équation', tex: String.raw`$\Delta=u_t-u_{xx}=0$.` },
  { id: 'generateur', title: 'Générateur', tex: String.raw`$X=x\,\partial_x+2t\,\partial_t$ (dilatation, $u$ inchangé).` },
  { id: 'jet', title: 'Jet prolongé', tex: String.raw`$\mathrm{pr}^{(2)}X=X-2u_t\,\partial_{u_t}-u_x\,\partial_{u_x}-2u_{xx}\,\partial_{u_{xx}}+\cdots$` },
  { id: 'test', title: 'Test sur le niveau', tex: String.raw`$\mathrm{pr}^{(2)}X(\Delta)=-2u_t+2u_{xx}=-2\Delta=0$ sur $\Delta=0$ : c'est une symétrie.` },
  { id: 'invariants', title: 'Invariants', tex: String.raw`$Q=-x\,u_x-2t\,u_t=0$ ; invariants $\zeta=x/\sqrt t$ et $u$.` },
  { id: 'reduite', title: 'Solution réduite', tex: String.raw`$u=\Phi(\zeta)$ : $\Phi''+\tfrac\zeta2\Phi'=0$, d'où $\Phi=\operatorname{erf}(\zeta/2)$.` },
];

export default function P55() {
  const [sel, setSel] = useState(0);
  const [seen, setSeen] = useState<ReadonlySet<number>>(() => new Set([0]));
  const [t, setT] = useState(1);
  const choose = (i: number) => {
    setSel(i);
    setSeen((s) => new Set([...s, i]));
  };
  const flow = (
    <div>
      <ol className="grid grid-cols-2 gap-2 sm:grid-cols-3" aria-label="Étapes de la méthode">
        {STEPS.map((s, i) => (
          <li key={s.id}>
            <button
              type="button"
              onClick={() => choose(i)}
              aria-pressed={sel === i}
              data-etape={s.id}
              className={cx('w-full rounded-md border px-2 py-2 text-left text-[12.5px] transition-colors', sel === i ? 'border-accent bg-accent/15' : seen.has(i) ? 'border-line-strong' : 'border-line')}
            >
              <span className="font-mono text-[10.5px] text-text-3">{i + 1}. </span>
              {s.title}
            </button>
          </li>
        ))}
      </ol>
      <div className="mt-2 rounded-md border border-line p-3 text-[13.5px]" data-testid="etape-detail">
        <MathText text={STEPS[sel]!.tex} />
      </div>
    </div>
  );
  const xs = linspace(-4, 4, 240);
  const D: [number, number, number, number] = [-4, 4, -1.1, 1.1];
  const u = (x: number, tt: number) => erf(x / (2 * Math.sqrt(tt)));
  const reduced = (
    <div>
      <Plot xDomain={[-4, 4]} yDomain={[-1.1, 1.1]} width={330} height={230} ariaLabel="Solutions invariantes">
        {[0.3, 1, 3].map((tt, i) => (
          <ClippedCurve key={tt} points={xs.map((x) => [x, u(x, tt)])} domain={D} color={[C.teal, C.orange, C.violet][i]} width={1.6} />
        ))}
        <ClippedCurve points={xs.map((x) => [x, u(x, t)])} domain={D} color={C.ink} width={2.4} dash="6 4" />
      </Plot>
      <Caption>{String.raw`Profils $u(x,t)=\operatorname{erf}\big(\frac{x}{2\sqrt t}\big)$ : la même courbe $\Phi$, lue en $\zeta=x/\sqrt t$.`}</Caption>
    </div>
  );
  // Vérification de Φ″ + (ζ/2)Φ′ = 0 en ζ = 0,8 (différences centrées).
  const h = 1e-3;
  const z = 0.8;
  const Phi = (q: number) => erf(q / 2);
  const res = (Phi(z + h) - 2 * Phi(z) + Phi(z - h)) / (h * h) + (z / 2) * ((Phi(z + h) - Phi(z - h)) / (2 * h));
  return (
    <PlateScene
      n={55}
      panels={[
        { title: 'Les étapes sur un exemple', render: () => flow },
        { title: 'La solution réduite', render: () => reduced },
      ]}
      identity={String.raw`$X\ \longrightarrow\ \mathrm{pr}^{(k)}X\ \longrightarrow\ \mathrm{pr}^{(k)}X(\Delta)\big|_{\Delta=0}$ $\longrightarrow$ invariants $\longrightarrow$ équation réduite.`}
      controls={
        <>
          <Slider label="Temps t du profil pointillé" value={t} min={0.1} max={5} step={0.01} onChange={setT} format={(v) => f2(v)} />
          <p className="text-[12.5px] text-text-3">Clique les étapes dans l’ordre.</p>
        </>
      }
      observations={[
        { id: 'test', text: 'Arrive au test sur le niveau : le prolongement annule Δ sur Δ = 0.', done: seen.has(3) },
        { id: 'toutes', text: 'Parcours les six étapes jusqu’à la solution réduite.', done: seen.size === STEPS.length },
        { id: 'profil', text: 'Change t : le profil pointillé change d’échelle mais garde la même forme.', done: Math.abs(t - 1) > 1.5 },
      ]}
      readings={[{ label: String.raw`$\Phi''+\tfrac\zeta2\Phi'$ en $\zeta=0{,}8$`, value: f2(res, 5), status: 'numerique' }]}
      note="erf est évaluée par l’approximation d’Abramowitz–Stegun (erreur inférieure à 1,5·10⁻⁷) ; le résidu affiché mêle cette erreur et celle des différences centrées."
    />
  );
}
