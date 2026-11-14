/**
 * Planche 48 — Jets d'EDP, dérivées totales et systèmes.
 * La surface u(x, t) = e^{−t} sin x (solution de u_t = u_xx) : en un point, deux pentes u_x et
 * u_t, le 2-jet (u_xx, u_xt, u_tt) et le test de l'équation. Coupe schématique : deux équations
 * définissent deux plans, le générateur prolongé est tangent à leur intersection.
 */
import { useState } from 'react';
import { PlateScene } from '../PlateScene';
import { Choice, f2, Slider } from '../kit2d';
import { Arrow3, ParamSurface, Patch3, Point3, Scene3D } from '../kit3d';
import { vcross } from '../math';

type S = 'sol' | 'non';
export default function P48() {
  const [x0, setX0] = useState(1.2);
  const [t0, setT0] = useState(0.4);
  const [s, setS] = useState<S>('sol');
  const [tilt, setTilt] = useState(0.6);
  const k = s === 'sol' ? 1 : 2;
  const u = (x: number, t: number) => Math.exp(-k * t) * Math.sin(x);
  const ux = Math.exp(-k * t0) * Math.cos(x0);
  const ut = -k * u(x0, t0);
  const uxx = -u(x0, t0);
  const utt = k * k * u(x0, t0);
  const uxt = -k * Math.exp(-k * t0) * Math.cos(x0);
  const P = [x0, t0, u(x0, t0)];
  const surf = (
    <Scene3D label="Une surface solution et ses deux pentes" camera={[4, -3.4, 2.6]} height={320} showAxes axes={1.5} axisLabels={['x', 't', 'u']}>
      <ParamSurface f={(x, t) => [x, t, u(x, t)]} u={[0, Math.PI, 40]} v={[0, 1.6, 20]} color="#4a86d0" opacity={0.75} deps={[s]} />
      <Point3 p={P} color="#e8eaef" size={0.05} />
      <Arrow3 a={P} b={[P[0]! + 0.6, P[1]!, P[2]! + 0.6 * ux]} color="#1a9e96" />
      <Arrow3 a={P} b={[P[0]!, P[1]! + 0.6, P[2]! + 0.6 * ut]} color="#d8743a" />
    </Scene3D>
  );
  const n1 = [0, 0, 1];
  const n2 = [Math.sin(tilt), 0, Math.cos(tilt)];
  const inter = vcross(n1, n2);
  const l = Math.hypot(...inter);
  const dir = l > 1e-6 ? inter.map((v) => v / l) : [0, 1, 0];
  const schem = (
    <Scene3D label="Coupe schématique : deux équations" camera={[3, -3, 2.2]} height={320}>
      <Patch3 c={[0, 0, 0]} a={[1, 0, 0]} b={[0, 1, 0]} s={1.1} color="#4a86d0" opacity={0.22} />
      <Patch3 c={[0, 0, 0]} a={[Math.cos(tilt), 0, -Math.sin(tilt)]} b={[0, 1, 0]} s={1.1} color="#d8743a" opacity={0.22} />
      <Arrow3 a={dir.map((v) => -1.1 * v)} b={dir.map((v) => 1.1 * v)} color="#8a6fd6" />
    </Scene3D>
  );
  return (
    <PlateScene
      n={48}
      panels={[
        { title: 'Une surface, deux pentes', render: () => surf },
        { title: 'Tangence à plusieurs équations', render: () => schem },
      ]}
      identity={String.raw`$Q^\alpha=\eta^\alpha-\sum_i\xi^iu^\alpha_i$, $\quad\mathrm{pr}^{(k)}X(\Delta_\nu)=0$ sur $\Delta=0$ ; ici $\Delta=u_t-u_{xx}$.`}
      controls={
        <>
          <Choice
            name="Surface"
            value={s}
            onChange={setS}
            options={[
              { id: 'sol', label: String.raw`$u=e^{-t}\sin x$` },
              { id: 'non', label: String.raw`$u=e^{-2t}\sin x$` },
            ]}
          />
          <Slider label="Point x₀" value={x0} min={0.1} max={3} step={0.01} onChange={setX0} format={(v) => f2(v)} />
          <Slider label="Point t₀" value={t0} min={0} max={1.5} step={0.01} onChange={setT0} format={(v) => f2(v)} />
          <Slider label="Angle entre les deux plans (coupe schématique)" value={tilt} min={0.05} max={1.5} step={0.01} onChange={setTilt} format={(v) => `${Math.round((v * 180) / Math.PI)}°`} />
        </>
      }
      observations={[
        { id: 'solution', text: String.raw`Sur la surface solution, $u_t-u_{xx}=0$ en tout point du 2-jet.`, done: s === 'sol' && (Math.abs(x0 - 1.2) > 0.6 || Math.abs(t0 - 0.4) > 0.3) },
        { id: 'non', text: String.raw`Sur l'autre surface, le 2-jet ne vérifie plus l'équation : $u_t-u_{xx}=-u\neq0$.`, done: s === 'non' },
        { id: 'pentes', text: 'Les deux flèches engendrent le plan tangent : u_x et u_t forment le 1-jet.', done: Math.abs(x0 - 1.2) > 0.8 },
      ]}
      readings={[
        { label: String.raw`$(u_x,u_t)$`, value: `(${f2(ux, 4)} ; ${f2(ut, 4)})`, status: 'exact' },
        { label: String.raw`$(u_{xx},u_{xt},u_{tt})$`, value: `(${f2(uxx, 4)} ; ${f2(uxt, 4)} ; ${f2(utt, 4)})`, status: 'exact' },
        { label: String.raw`$u_t-u_{xx}$`, value: f2(ut - uxx, 10), status: 'exact' },
      ]}
      note="Le panneau de droite est schématique : il figure deux équations du système comme deux plans d’un espace de jets."
    />
  );
}
