/**
 * Planche 31 — Champs invariants à gauche et à droite.
 * Dans SE(2), g = (R_α, b). Pour X ∈ se(2) : g exp(tX) applique X dans le repère du corps
 * (repère tourné), exp(tX) g dans le repère fixe. Pour une translation X = ∂x : le corps
 * avance suivant son axe, ou suivant l'axe fixe ; les deux coïncident si α = 0.
 */
import { useState } from 'react';
import { PlateScene } from '../PlateScene';
import { Arrow, C, Caption, Choice, Curve, f2, Plot, Poly, Slider } from '../kit2d';

type Pose = { a: number; x: number; y: number };
const compose = (g: Pose, h: Pose): Pose => ({ a: g.a + h.a, x: g.x + Math.cos(g.a) * h.x - Math.sin(g.a) * h.y, y: g.y + Math.sin(g.a) * h.x + Math.cos(g.a) * h.y });
/** exp(tX) pour X = (ω, v) dans se(2). */
function expSE2(w: number, vx: number, vy: number, t: number): Pose {
  const th = w * t;
  if (Math.abs(th) < 1e-9) return { a: 0, x: vx * t, y: vy * t };
  const s = Math.sin(th) / w;
  const c = (1 - Math.cos(th)) / w;
  return { a: th, x: s * vx - c * vy, y: c * vx + s * vy };
}
const BODY: [number, number][] = [[-0.25, -0.3], [0.45, 0], [-0.25, 0.3]];
const place = (g: Pose): [number, number][] => BODY.map(([x, y]) => [g.x + Math.cos(g.a) * x - Math.sin(g.a) * y, g.y + Math.sin(g.a) * x + Math.cos(g.a) * y]);

export default function P31() {
  const [alpha, setAlpha] = useState(1.57);
  const [gx, setGx] = useState(0.4);
  const [t, setT] = useState(1);
  const [gen, setGen] = useState<'translation' | 'rotation'>('translation');
  const g: Pose = { a: alpha, x: gx, y: 0.3 };
  const X = gen === 'translation' ? [0, 1, 0] : [1, 0, 0];
  const path = (side: 'L' | 'R') =>
    Array.from({ length: 41 }, (_, k) => {
      const e = expSE2(X[0]!, X[1]!, X[2]!, (t * k) / 40);
      const p = side === 'L' ? compose(g, e) : compose(e, g);
      return [p.x, p.y] as [number, number];
    });
  const gL = compose(g, expSE2(X[0]!, X[1]!, X[2]!, t));
  const gR = compose(expSE2(X[0]!, X[1]!, X[2]!, t), g);
  const gap = Math.hypot(gL.x - gR.x, gL.y - gR.y) + Math.abs(gL.a - gR.a);

  const panel = (side: 'L' | 'R') => {
    const end = side === 'L' ? gL : gR;
    return (
      <div>
        <Plot xDomain={[-1.8, 2.2]} yDomain={[-1.6, 2.4]} width={300} height={300} grid ariaLabel={side === 'L' ? 'Translation à gauche' : 'Translation à droite'}>
          <Poly points={place(g)} fill={C.blue} opacity={0.3} stroke={C.blue} />
          <Arrow a={[g.x, g.y]} b={[g.x + 0.5 * Math.cos(g.a), g.y + 0.5 * Math.sin(g.a)]} color={C.blue} width={1.6} />
          <Curve points={path(side)} color={side === 'L' ? C.teal : C.orange} width={2.2} />
          <Poly points={place(end)} fill={side === 'L' ? C.teal : C.orange} opacity={0.3} stroke={side === 'L' ? C.teal : C.orange} width={1.8} />
        </Plot>
        <Caption>{side === 'L' ? String.raw`$g\exp(tX)$ : $X$ lu dans le repère tourné du corps.` : String.raw`$\exp(tX)\,g$ : $X$ lu dans le repère fixe.`}</Caption>
      </div>
    );
  };

  return (
    <PlateScene
      n={31}
      panels={[
        { title: 'Translation à gauche', render: () => panel('L') },
        { title: 'Translation à droite', render: () => panel('R') },
      ]}
      identity={String.raw`$X^L_g=(dL_g)_eX=gX$, $\quad X^R_g=(dR_g)_eX=Xg$ ; courbes intégrales : $t\mapsto g\exp(tX)$ et $t\mapsto\exp(tX)\,g$.`}
      controls={
        <>
          <Choice
            name="Générateur X"
            value={gen}
            onChange={setGen}
            options={[
              { id: 'translation', label: String.raw`Translation $\partial_x$` },
              { id: 'rotation', label: 'Rotation autour de O' },
            ]}
          />
          <Slider label="Angle α de g" value={alpha} min={-3.14} max={3.14} step={0.01} onChange={setAlpha} format={(v) => `${Math.round((v * 180) / Math.PI)}°`} />
          <Slider label="Position x de g" value={gx} min={-1} max={1.5} step={0.01} onChange={setGx} format={(v) => f2(v)} />
          <Slider label="Temps t" value={t} min={0} max={2} step={0.01} onChange={setT} format={(v) => f2(v)} />
        </>
      }
      observations={[
        { id: 'differe', text: 'Avec g tourné, les deux translations partent dans des directions différentes.', done: gen === 'translation' && Math.abs(Math.sin(alpha)) > 0.5 },
        { id: 'abelien', text: String.raw`Pour $\alpha=0$, $g$ et $\exp(tX)$ commutent (deux translations) : les deux champs coïncident.`, done: gen === 'translation' && Math.abs(alpha) < 0.01 },
        { id: 'rotation', text: 'Avec une rotation : à gauche le corps tourne sur lui-même, à droite autour de l’origine.', done: gen === 'rotation' && t > 0.8 },
      ]}
      readings={[
        { label: String.raw`Écart entre $g\exp(tX)$ et $\exp(tX)g$`, value: f2(gap, 4), status: 'exact' },
        { label: String.raw`$g\exp(tX)$ : angle, position`, value: `${f2(gL.a, 3)} ; (${f2(gL.x, 3)} ; ${f2(gL.y, 3)})`, status: 'exact' },
        { label: String.raw`$\exp(tX)g$ : angle, position`, value: `${f2(gR.a, 3)} ; (${f2(gR.x, 3)} ; ${f2(gR.y, 3)})`, status: 'exact' },
      ]}
    />
  );
}
