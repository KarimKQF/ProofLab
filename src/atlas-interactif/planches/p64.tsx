/**
 * Planche 64 — Actions hamiltoniennes et application moment.
 * Translations q ↦ q + s : J(q, p) = p, constante le long de l'action. Rotations d'axe ξ
 * agissant sur q et p : J = q × p tourne, sa composante ξ·(q × p) est conservée.
 */
import { useState } from 'react';
import { PlateScene } from '../PlateScene';
import { Arrow, C, Caption, Dot, f2, Plot, Segment, Slider } from '../kit2d';
import { Arrow3, Scene3D } from '../kit3d';
import { rotAxis, sph, vcross } from '../math';

export default function P64() {
  const [s, setS] = useState(0.8);
  const [ang, setAng] = useState(1);
  const [xt, setXt] = useState(0.4);
  const ps = [1.3, 0.4, -0.6];
  const trans = (
    <div>
      <Plot xDomain={[-2, 3]} yDomain={[-1.2, 1.8]} width={300} height={180} grid={false} ariaLabel="Translation sur le plan des phases">
        {ps.map((p) => (
          <g key={p}>
            <Segment a={[-1.9, p]} b={[2.9, p]} color={C.faint} width={1} />
            <Arrow a={[-1.2, p]} b={[-1.2 + s, p]} color={p > 1 ? C.orange : p > 0 ? C.teal : C.blue} width={2.4} />
            <Dot x={-1.2 + s} y={p} color={C.ink} r={3.5} />
          </g>
        ))}
      </Plot>
      <Caption>{String.raw`Chaque point avance en $q$, $p$ reste fixé : $J(q,p)=p$ est conservé.`}</Caption>
    </div>
  );
  const q: [number, number, number] = [1, 0.2, 0];
  const p = [0.1, 0.8, 0.4];
  const xi = sph(xt, 0.6);
  const qr = rotAxis(xi, ang, q);
  const pr = rotAxis(xi, ang, p);
  const J0 = vcross(q, p);
  const J = vcross(qr, pr);
  const comp0 = xi.reduce((acc, x, i) => acc + x * J0[i]!, 0);
  const comp = xi.reduce((acc, x, i) => acc + x * J[i]!, 0);
  const rot = (
    <Scene3D label="Rotation : moment angulaire" camera={[2.6, -2.6, 2]} height={300} showAxes axes={1.3}>
      <Arrow3 a={[0, 0, 0]} b={xi.map((x) => 1.4 * x)} color="#e8eaef" />
      <Arrow3 a={[0, 0, 0]} b={qr} color="#1a9e96" />
      <Arrow3 a={[0, 0, 0]} b={pr} color="#d8743a" />
      <Arrow3 a={[0, 0, 0]} b={J} color="#8a6fd6" />
    </Scene3D>
  );
  return (
    <PlateScene
      n={64}
      panels={[
        { title: 'Translation sur le plan des phases', render: () => trans },
        { title: 'Rotation : moment angulaire', render: () => rot },
      ]}
      identity={String.raw`$J:P\to\mathfrak g^*$, $\quad d\langle J,\xi\rangle=\iota_{\xi_P}\omega$ ; translations : $J=p$ ; rotations : $J=q\times p$.`}
      controls={
        <>
          <Slider label="Translation s" value={s} min={0} max={3} step={0.01} onChange={setS} format={(v) => f2(v)} />
          <Slider label="Axe ξ : inclinaison" value={xt} min={0} max={3.14} step={0.01} onChange={setXt} format={(v) => `${Math.round((v * 180) / Math.PI)}°`} />
          <Slider label="Angle de rotation" value={ang} min={0} max={6.28} step={0.01} onChange={setAng} format={(v) => `${Math.round((v * 180) / Math.PI)}°`} />
        </>
      }
      observations={[
        { id: 'translation', text: 'Translate : chaque point avance horizontalement, sa coordonnée p ne change pas.', done: s > 2 },
        { id: 'composante', text: String.raw`Fais tourner $q$ et $p$ autour de $\xi$ : $J$ tourne, mais $\xi\cdot J$ reste constant.`, done: Math.abs(ang - 1) > 1.5 },
        { id: 'axe', text: 'Change l’axe : la composante conservée change, c’est celle de J le long du nouvel axe.', done: Math.abs(xt - 0.4) > 0.8 },
      ]}
      readings={[
        { label: String.raw`$\xi\cdot J$ avant et après la rotation`, value: `${f2(comp0, 5)} ; ${f2(comp, 5)}`, status: 'exact' },
        { label: String.raw`$J=q\times p$`, value: `(${J.map((x) => f2(x, 3)).join(' ; ')})`, status: 'exact' },
      ]}
    />
  );
}
