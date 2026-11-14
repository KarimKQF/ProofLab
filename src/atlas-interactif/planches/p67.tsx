/**
 * Planche 67 — Pénalité, projection et paramétrisation intrinsèque.
 * Contrainte : rester sur le cercle unité A = S¹. Pénaliser : minimiser |y − y₀|² + λ(|y| − 1)²,
 * minimiseur radial r* = (r₀ + λ)/(1 + λ) → 1 quand λ → ∞. Projeter : y₀/|y₀|. Paramétrer :
 * (cos θ, sin θ), toujours sur le cercle.
 */
import { useState } from 'react';
import { PlateScene } from '../PlateScene';
import { Arc, C, Caption, Circle, Dot, DraggablePoint, f2, Plot, Segment, Slider } from '../kit2d';

export default function P67() {
  const [y, setY] = useState<[number, number]>([1.25, 0.75]);
  const [lam, setLam] = useState(2);
  const [th, setTh] = useState(1);
  const r0 = Math.hypot(...y);
  const rs = (r0 + lam) / (1 + lam);
  const u: [number, number] = r0 > 1e-9 ? [y[0] / r0, y[1] / r0] : [1, 0];
  const pen: [number, number] = [rs * u[0], rs * u[1]];
  const frame = (content: React.ReactNode, label: string) => (
    <Plot xDomain={[-1.7, 1.7]} yDomain={[-1.7, 1.7]} width={240} height={240} grid={false} ariaLabel={label}>
      <Circle c={[0, 0]} r={1} color={C.teal} width={2.2} />
      {content}
    </Plot>
  );
  const drag = <DraggablePoint x={y[0]} y={y[1]} onChange={(a, b) => setY([a, b])} name="Sortie y du modèle" color={C.orange} label="y" bounds={[-1.6, 1.6, -1.6, 1.6]} step={0.05} r={5} />;
  return (
    <PlateScene
      n={67}
      panels={[
        {
          title: 'Pénaliser l’écart',
          render: () => (
            <div>
              {frame(
                <>
                  <Segment a={y} b={pen} color={C.orange} width={1.4} dash="4 3" />
                  <Dot x={pen[0]} y={pen[1]} color={C.violet} r={5} />
                  {drag}
                </>,
                'Pénaliser l’écart',
              )}
              <Caption>{String.raw`Violet : le minimiseur de $|y-y_0|^2+\lambda(|y|-1)^2$.`}</Caption>
            </div>
          ),
        },
        {
          title: 'Projeter une sortie',
          render: () => (
            <div>
              {frame(
                <>
                  <Segment a={y} b={u} color={C.violet} width={2} />
                  <Dot x={u[0]} y={u[1]} color={C.violet} r={5} />
                  {drag}
                </>,
                'Projeter une sortie',
              )}
              <Caption>{String.raw`$\Pi_{\mathcal A}(y)=y/|y|$, exact mais non défini en $0$.`}</Caption>
            </div>
          ),
        },
        {
          title: 'Paramétrer dans la contrainte',
          render: () => (
            <div>
              {frame(
                <>
                  <Arc c={[0, 0]} r={1} a0={0} a1={th} color={C.orange} width={3.2} arrow />
                  <Dot x={Math.cos(th)} y={Math.sin(th)} color={C.orange} r={5} />
                </>,
                'Paramétrer dans la contrainte',
              )}
              <Caption>{String.raw`$f(\theta)=(\cos\theta,\sin\theta)$ : la contrainte est satisfaite par construction.`}</Caption>
            </div>
          ),
        },
      ]}
      identity={String.raw`$\mathcal A=S^1$, $\ \Pi_{\mathcal A}(y)=y/|y|\ (y\neq0)$, $\ f(\theta)=(\cos\theta,\sin\theta)$ ; pénalité : $r^*=\dfrac{r_0+\lambda}{1+\lambda}$.`}
      controls={
        <>
          <Slider label="Poids λ de la pénalité" value={lam} min={0} max={50} step={0.1} onChange={setLam} format={(v) => f2(v, 1)} />
          <Slider label="Paramètre θ" value={th} min={0} max={6.28} step={0.01} onChange={setTh} format={(v) => f2(v)} />
        </>
      }
      observations={[
        { id: 'lambda', text: String.raw`Augmente $\lambda$ : le minimiseur pénalisé s'approche du cercle sans l'atteindre exactement.`, done: lam > 30 },
        { id: 'zero', text: String.raw`Avec $\lambda=0$, la pénalité ne fait rien : le minimiseur est $y$ lui-même.`, done: lam === 0 },
        { id: 'origine', text: 'Approche y de l’origine : la projection devient instable, la direction y/|y| bascule.', done: r0 < 0.08 },
      ]}
      readings={[
        { label: String.raw`$|y|$ et rayon pénalisé $r^*$`, value: `${f2(r0, 3)} ; ${f2(rs, 4)}`, status: 'exact' },
        { label: 'Écart à la contrainte : pénalité ; projection ; paramétrage', value: `${f2(Math.abs(rs - 1), 4)} ; 0 ; 0`, status: 'exact' },
      ]}
    />
  );
}
