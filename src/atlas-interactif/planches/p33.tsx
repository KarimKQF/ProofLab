/**
 * Planche 33 — Application exponentielle.
 * Dans SO(2), θJ ∈ T_eG s'envoie sur e^{θJ} ; près de 0, e^{θJ} = I + θJ + O(θ²) : la
 * différentielle de exp en 0 est l'identité. L'écart est tracé en fonction de θ.
 */
import { useState } from 'react';
import { PlateScene } from '../PlateScene';
import { Arc, C, Caption, Circle, ClippedCurve, Dot, f2, Plot, Segment, Slider } from '../kit2d';
import { linspace } from '../math';

const gap = (th: number) => Math.hypot(Math.cos(th) - 1, Math.sin(th) - th);

export default function P33() {
  const [th, setTh] = useState(0.8);
  const fig = (
    <div>
      <Plot xDomain={[-1.4, 1.6]} yDomain={[-1.5, 1.5]} width={290} height={290} grid={false} ariaLabel="Vecteur tangent et son image par l'exponentielle">
        <Circle c={[0, 0]} r={1} color={C.faint} width={1.4} />
        <Segment a={[1, -1.5]} b={[1, 1.5]} color={C.blue} width={1.4} />
        <Arc c={[0, 0]} r={1} a0={0} a1={th} color={C.teal} width={3} arrow />
        <Segment a={[1, 0]} b={[1, th]} color={C.orange} width={3} />
        <Segment a={[1, th]} b={[Math.cos(th), Math.sin(th)]} color={C.violet} width={1.4} dash="4 3" />
        <Dot x={1} y={th} color={C.orange} label="θJ" r={4} />
        <Dot x={Math.cos(th)} y={Math.sin(th)} color={C.teal} label="exp(θJ)" r={4} dx={-56} />
        <Dot x={1} y={0} color={C.ink} label="e" r={3.5} dx={8} dy={14} />
      </Plot>
      <Caption>{String.raw`Droite bleue : $T_eG$. Pointillé violet : l'écart entre $I+\theta J$ et $e^{\theta J}$.`}</Caption>
    </div>
  );
  const xs = linspace(0, 1.5, 120);
  const plot = (
    <div>
      <Plot xDomain={[0, 1.5]} yDomain={[0, 1.2]} width={330} height={260} ariaLabel="Écart entre l'exponentielle et sa linéarisation">
        <ClippedCurve points={xs.map((x) => [x, gap(x)])} domain={[0, 1.5, 0, 1.2]} color={C.violet} width={2.4} />
        <ClippedCurve points={xs.map((x) => [x, (x * x) / 2])} domain={[0, 1.5, 0, 1.2]} color={C.muted} width={1.4} dash="5 4" />
        <Dot x={th} y={gap(th)} color={C.violet} r={4.5} />
      </Plot>
      <Caption>{String.raw`Violet : $|e^{\theta J}-I-\theta J|$. Pointillé : $\theta^2/2$.`}</Caption>
    </div>
  );
  return (
    <PlateScene
      n={33}
      panels={[
        { title: 'Vecteurs tangents et images', render: () => fig },
        { title: 'Linéarisation à l’identité', render: () => plot },
      ]}
      identity={String.raw`$\exp(X)=g_1$ si $g_t'=(dL_{g_t})_eX$, $g_0=e$ ; $\quad d\exp_0=\mathrm{Id}$ : $e^{\theta J}=I+\theta J+O(\theta^2)$.`}
      controls={<Slider label="θ" value={th} min={0} max={1.5} step={0.005} onChange={setTh} format={(x) => f2(x, 3)} />}
      observations={[
        { id: 'petit', text: String.raw`Réduis $\theta$ : $e^{\theta J}$ et $I+\theta J$ deviennent indiscernables.`, done: th < 0.1 },
        { id: 'quadratique', text: String.raw`L'écart suit $\theta^2/2$ : il est du second ordre, donc $d\exp_0=\mathrm{Id}$.`, done: th < 0.4 && th > 0.05 },
        { id: 'grand', text: 'Pour θ grand, l’arc s’éloigne nettement de la tangente.', done: th > 1.2 },
      ]}
      readings={[
        { label: String.raw`$|e^{\theta J}-I-\theta J|$`, value: f2(gap(th), 6), status: 'exact' },
        { label: String.raw`Rapport à $\theta^2/2$`, value: th > 1e-3 ? f2(gap(th) / ((th * th) / 2), 4) : '—', status: 'exact' },
      ]}
    />
  );
}
