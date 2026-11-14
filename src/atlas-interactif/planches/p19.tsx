/**
 * Planche 19 — Courbure et holonomie.
 * Triangle géodésique N, A, B (A et B sur l'équateur, écart α). Le transport le long d'un
 * grand cercle est la rotation d'axe normal au plan du cercle ; après N → A → B → N, le
 * vecteur a tourné de α, l'aire du triangle sur la sphère unité.
 */
import { useState } from 'react';
import { PlateScene } from '../PlateScene';
import { Arc, Arrow, C, Caption, f2, Label, Plot, Slider } from '../kit2d';
import { Arrow3, Globe, Point3, Polyline3, Scene3D } from '../kit3d';
import { PlayButton, usePlayer } from '../hooks';
import { greatArc, rotAxis, sph, vcross, vnorm } from '../math';

const N: [number, number, number] = [0, 0, 1];

function transportArc(a: readonly number[], b: readonly number[], v: readonly number[], t: number) {
  const ax = vcross(a, b);
  const l = vnorm(ax);
  const axis = ax.map((x) => x / l);
  const ang = Math.acos(Math.max(-1, Math.min(1, a[0]! * b[0]! + a[1]! * b[1]! + a[2]! * b[2]!)));
  return { p: rotAxis(axis, ang * t, a), v: rotAxis(axis, ang * t, v) };
}

export default function P19() {
  const [alpha, setAlpha] = useState(Math.PI / 2);
  const [s, setS] = useState(3);
  const player = usePlayer(6000, (k) => setS(3 * k));
  const A = sph(Math.PI / 2, 0);
  const B = sph(Math.PI / 2, alpha);
  const v0: [number, number, number] = [1, 0, 0]; // en N, dirigé vers A
  const legs = [
    [N, A],
    [A, B],
    [B, N],
  ] as const;
  // État transporté au paramètre s ∈ [0, 3].
  let p: readonly number[] = N;
  let v: readonly number[] = v0;
  const marks: { p: readonly number[]; v: readonly number[] }[] = [];
  for (let k = 0; k < 3; k++) {
    const [a, b] = legs[k]!;
    const t = Math.max(0, Math.min(1, s - k));
    for (const m of [0.25, 0.5, 0.75]) if (m <= t) marks.push(transportArc(a, b, v, m));
    const r = transportArc(a, b, v, t);
    p = r.p;
    v = r.v;
    if (s - k < 1) break;
  }
  const done = s >= 3 - 1e-9;
  const ret = done ? v : null;
  const retAngle = ret ? Math.atan2(ret[1]!, ret[0]!) : 0;

  const triangle = (
    <Scene3D label="Triangle géodésique et transport parallèle" camera={[3, 2.4, 2.6]} height={340}>
      <Globe />
      {legs.map(([a, b], i) => (
        <Polyline3 key={i} points={greatArc(a, b, 40)} color="#1a9e96" width={2.2} />
      ))}
      {marks.map((m, i) => (
        <Arrow3 key={i} a={m.p} b={m.p.map((x, j) => x + 0.3 * m.v[j]!)} color="#d8743a" />
      ))}
      <Arrow3 a={N} b={N.map((x, j) => x + 0.35 * v0[j]!)} color="#d8743a" />
      <Arrow3 a={p} b={p.map((x, j) => x + 0.4 * v[j]!)} color="#8a6fd6" />
      <Point3 p={A} color="#e8eaef" size={0.04} />
      <Point3 p={B} color="#e8eaef" size={0.04} />
    </Scene3D>
  );

  const plane = (
    <div>
      <Plot xDomain={[-1.4, 1.4]} yDomain={[-1.4, 1.4]} width={320} height={320} grid={false} ariaLabel="Vecteurs de départ et de retour dans le plan tangent en N">
        <Arrow a={[0, 0]} b={[1, 0]} color={C.orange} width={2.6} />
        {ret && <Arrow a={[0, 0]} b={[ret[0]!, ret[1]!]} color={C.violet} width={2.6} />}
        {ret && <Arc c={[0, 0]} r={0.45} a0={0} a1={retAngle} color={C.teal} width={2} arrow />}
        <Label x={1.02} y={-0.12} text="v départ" color={C.orange} size={12} />
        {ret && <Label x={ret[0]! * 1.05} y={ret[1]! * 1.05 + 0.08} text="v retour" color={C.violet} size={12} />}
      </Plot>
      <Caption>{done ? String.raw`Plan tangent $T_NS^2$ : le vecteur revient tourné.` : 'Transporte le vecteur jusqu’au retour en N.'}</Caption>
    </div>
  );

  return (
    <PlateScene
      n={19}
      panels={[
        { title: 'Triangle formé de trois arcs géodésiques', render: () => triangle },
        { title: 'Comparer au retour dans le même plan', render: () => plane },
      ]}
      identity={String.raw`$R(X,Y)Z=\nabla_X\nabla_YZ-\nabla_Y\nabla_XZ-\nabla_{[X,Y]}Z$ ; holonomie d'un triangle géodésique de $S^2$ : $\displaystyle\iint_TK\,dA=\text{aire}(T)$.`}
      controls={
        <>
          <Slider label="Angle α au pôle N" value={alpha} min={0.3} max={2.8} step={0.01} onChange={setAlpha} format={(x) => `${Math.round((x * 180) / Math.PI)}°`} />
          <Slider
            label="Avancement (N → A → B → N)"
            value={s}
            min={0}
            max={3}
            step={0.01}
            onChange={(x) => {
              player.stop();
              setS(x);
            }}
            format={(x) => f2(x)}
          />
          <PlayButton player={player} label="Transporter autour du triangle" />
        </>
      }
      observations={[
        { id: 'retour', text: 'Fais le tour complet : le vecteur revient en N tourné d’un angle non nul.', done: done },
        { id: 'quart', text: String.raw`Avec trois arcs de $\pi/2$ ($\alpha=90°$), l'angle de retour vaut $\pi/2$.`, done: done && Math.abs(alpha - Math.PI / 2) < 0.02 },
        { id: 'aire', text: String.raw`Change $\alpha$ : l'angle de retour suit l'aire du triangle, égale à $\alpha$.`, done: done && Math.abs(alpha - Math.PI / 2) > 0.4 },
      ]}
      readings={[
        { label: 'Angle de retour', value: done ? `${f2((retAngle * 180) / Math.PI, 2)}°` : '—', status: 'exact' },
        { label: String.raw`Aire du triangle $=\alpha$`, value: `${f2((alpha * 180) / Math.PI, 2)}°`, status: 'exact' },
      ]}
      note="Le long d’un grand cercle, le transport parallèle est la restriction de la rotation de l’espace autour de l’axe de ce cercle : le calcul est exact."
    />
  );
}
