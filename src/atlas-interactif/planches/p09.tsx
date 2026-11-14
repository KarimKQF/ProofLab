/**
 * Planche 9 — Immersion, plongement et submersion.
 * Huit γ(t) = (sin t, sin t cos t) : γ′ ne s'annule jamais mais γ(0) = γ(π) (immersion non
 * injective). Cercle : plongement ; huit ouvert ]−π, π[ : immersion injective non plongement.
 * (x, y) ↦ x : submersion, ses fibres sont les droites verticales.
 */
import { useState } from 'react';
import { PlateScene } from '../PlateScene';
import { Arrow, C, Caption, Choice, Circle, Curve, Dot, DragOnCurve, DraggablePoint, f2, Plot, Segment } from '../kit2d';
import { linspace, sampleCurve, TAU } from '../math';

const eight = (t: number): [number, number] => [Math.sin(t), Math.sin(t) * Math.cos(t)];
const eightD = (t: number): [number, number] => [Math.cos(t), Math.cos(2 * t)];
const minSpeed = Math.min(...linspace(0, TAU, 2000).map((t) => Math.hypot(...eightD(t))));

export default function P09() {
  const [t, setT] = useState(0.6);
  const [mode, setMode] = useState<'cercle' | 'huit'>('cercle');
  const [s, setS] = useState(1.2);
  const [q, setQ] = useState<[number, number]>([0.4, 0.6]);
  const near0 = Math.min(Math.abs(t), Math.abs(TAU - t)) < 0.08;
  const nearPi = Math.abs(t - Math.PI) < 0.08;
  const g = eight(t);
  const d = eightD(t);

  const immersion = (
    <div>
      <Plot xDomain={[-1.4, 1.4]} yDomain={[-1, 1]} width={300} height={214} grid={false} ariaLabel="Courbe en huit">
        <Curve points={sampleCurve(eight, 0, TAU, 300)} color={C.teal} width={2.2} />
        {(near0 || nearPi) && (
          <>
            <Arrow a={[0, 0]} b={[0.5 * eightD(0)[0], 0.5 * eightD(0)[1]]} color={C.orange} width={2.2} />
            <Arrow a={[0, 0]} b={[0.5 * eightD(Math.PI)[0], 0.5 * eightD(Math.PI)[1]]} color={C.violet} width={2.2} />
          </>
        )}
        {!(near0 || nearPi) && <Arrow a={g} b={[g[0] + 0.45 * d[0], g[1] + 0.45 * d[1]]} color={C.orange} width={2.2} />}
        <DragOnCurve curve={eight} s={t} range={[0, TAU]} onChange={setT} name="Paramètre t de la courbe en huit" label="γ(t)" color={C.orange} r={5} />
      </Plot>
      <Caption>Deux paramètres, un point : t = 0 et t = π donnent l’origine.</Caption>
    </div>
  );

  const open = mode === 'huit';
  const curve = (u: number): [number, number] => (open ? eight(u) : [Math.cos(u), Math.sin(u)]);
  const range: [number, number] = open ? [-Math.PI + 0.02, Math.PI - 0.02] : [0, TAU];
  const sClamped = Math.min(range[1], Math.max(range[0], s));
  const embedding = (
    <div>
      <Plot xDomain={[-1.4, 1.4]} yDomain={[-1.15, 1.15]} width={300} height={246} grid={false} ariaLabel="Plongement ou immersion injective">
        {open ? <Curve points={sampleCurve(eight, -Math.PI + 0.02, Math.PI - 0.02, 300)} color={C.teal} width={2.2} /> : <Circle c={[0, 0]} r={1} color={C.teal} width={2.2} />}
        {open && <Dot x={0} y={0} color={C.red} r={4} />}
        <DragOnCurve curve={curve} s={sClamped} range={range} onChange={setS} name="Paramètre de la deuxième courbe" color={C.orange} r={5} />
      </Plot>
      <Caption>{open ? 'Huit ouvert : injectif, mais des points proches pour la courbe ne le sont pas pour le paramètre (près de ±π).' : 'Cercle sans croisement : un plongement.'}</Caption>
    </div>
  );

  const submersion = (
    <div>
      <Plot xDomain={[-1.2, 1.2]} yDomain={[-1.1, 1.1]} width={300} height={276} grid={false} ariaLabel="Projection sur l'axe des x">
        {linspace(-1, 1, 8).map((x) => (
          <Segment key={x} a={[x, -1]} b={[x, 1]} color={C.faint} width={1} />
        ))}
        <Segment a={[q[0], -1]} b={[q[0], 1]} color={C.blue} width={2.4} />
        <Segment a={[-1.1, -1]} b={[1.1, -1]} color={C.teal} width={2.2} />
        <Arrow a={q} b={[q[0], -0.97]} color={C.blue} width={1.4} dash="4 3" />
        <Dot x={q[0]} y={-1} color={C.orange} r={4.5} />
        <DraggablePoint x={q[0]} y={q[1]} onChange={(x, y) => setQ([x, y])} name="Point du plan" color={C.ink} bounds={[-1, 1, -0.9, 1]} step={0.05} r={6} />
      </Plot>
      <Caption>{String.raw`$(x,y)\mapsto x$ : la fibre au-dessus de $x$ est une droite verticale.`}</Caption>
    </div>
  );

  return (
    <PlateScene
      n={9}
      panels={[
        { title: 'Immersion', render: () => immersion },
        { title: 'Plongement', render: () => embedding },
        { title: 'Submersion', render: () => submersion },
      ]}
      identity={String.raw`Rang constant $r$ : $F(x_1,\dots,x_m)=(x_1,\dots,x_r,0,\dots,0)$ dans des cartes adaptées ; immersion $r=m$, submersion $r=n$.`}
      controls={
        <>
          <Choice
            name="Deuxième courbe"
            value={mode}
            onChange={setMode}
            options={[
              { id: 'cercle', label: 'Cercle' },
              { id: 'huit', label: String.raw`Huit ouvert $]-\pi,\pi[$` },
            ]}
          />
          <p className="text-[12.5px] text-text-3">Fais glisser γ(t) le long du huit et le point du plan dans le panneau de droite.</p>
        </>
      }
      observations={[
        { id: 'croisement', text: String.raw`Passe au croisement : deux valeurs du paramètre donnent le même point, avec deux tangentes distinctes.`, done: near0 || nearPi },
        { id: 'derivee-non-nulle', text: String.raw`Le long du huit, $\gamma'(t)$ ne s'annule jamais : c'est une immersion.`, done: Math.abs(t - 0.6) > 1 },
        { id: 'huit-ouvert', text: 'Choisis le huit ouvert : injectif, il n’est pourtant pas un plongement.', done: open },
        { id: 'fibre', text: 'Déplace le point du plan : sa fibre est la droite verticale qui le contient.', done: Math.abs(q[0] - 0.4) > 0.3 },
      ]}
      readings={[
        { label: String.raw`$\gamma'(t)$`, value: `(${f2(d[0], 3)} ; ${f2(d[1], 3)})`, status: 'exact' },
        { label: String.raw`$\min_t|\gamma'(t)|$`, value: f2(minSpeed, 4), status: 'numerique' },
        { label: String.raw`Rang de $d(x,y)\mapsto x$`, value: '1 en tout point', status: 'exact' },
      ]}
    />
  );
}
