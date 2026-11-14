/**
 * Planche 53 — Burgers, onde progressive et choc.
 * u_t + u u_x = ν u_xx : profils U(z), z = x − st, s = (U_L + U_R)/2,
 * U(z) = s − (U_L − U_R)/2 · tanh((U_L − U_R) z /(4ν)). Quand ν → 0, la transition se raidit en choc.
 */
import { useState } from 'react';
import { PlateScene } from '../PlateScene';
import { C, Caption, ClippedCurve, f2, Plot, Slider } from '../kit2d';
import { linspace } from '../math';

const UL = 1;
const UR = 0;
const s = (UL + UR) / 2;
const U = (z: number, nu: number) => s - ((UL - UR) / 2) * Math.tanh(((UL - UR) * z) / (4 * nu));

export default function P53() {
  const [nu, setNu] = useState(0.15);
  const [t, setT] = useState(0);
  const zs = linspace(-2, 2, 400);
  const D: [number, number, number, number] = [-2, 2, -0.05, 1.1];
  const visc = (
    <div>
      <Plot xDomain={[-2, 2]} yDomain={[-0.05, 1.1]} width={330} height={248} ariaLabel="La transition s'étale">
        <ClippedCurve points={zs.map((z) => [z, U(z, 0.23)])} domain={D} color={C.teal} width={1.4} dash="5 4" />
        <ClippedCurve points={zs.map((z) => [z, U(z, 0.085)])} domain={D} color={C.orange} width={1.4} dash="5 4" />
        <ClippedCurve points={zs.map((z) => [z, U(z, nu)])} domain={D} color={C.ink} width={2.6} />
      </Plot>
      <Caption>{String.raw`Pointillés : $\nu=0{,}23$ et $\nu=0{,}085$. Noir : le $\nu$ choisi, en $z=x-st$.`}</Caption>
    </div>
  );
  const xs = linspace(-2, 3, 400);
  const D2: [number, number, number, number] = [-2, 3, -0.05, 1.1];
  const shock = (
    <div>
      <Plot xDomain={[-2, 3]} yDomain={[-0.05, 1.1]} width={330} height={248} ariaLabel="Limite : un choc qui avance">
        <ClippedCurve points={[[-2, UL], [s * t, UL], [s * t, UR], [3, UR]]} domain={D2} color={C.violet} width={2} />
        <ClippedCurve points={xs.map((x) => [x, U(x - s * t, nu)])} domain={D2} color={C.ink} width={2.2} />
      </Plot>
      <Caption>{String.raw`Violet : le choc limite, sur la droite $x=st$ avec $s=\frac{U_L+U_R}2$. Noir : le profil visqueux à l'instant $t$.`}</Caption>
    </div>
  );
  // Résidu de l'équation du profil −sU′ + UU′ − νU″ en z = 0,3 (différences centrées).
  const h = 1e-4;
  const z0 = 0.3;
  const Up = (U(z0 + h, nu) - U(z0 - h, nu)) / (2 * h);
  const Upp = (U(z0 + h, nu) - 2 * U(z0, nu) + U(z0 - h, nu)) / (h * h);
  const res = -s * Up + U(z0, nu) * Up - nu * Upp;
  return (
    <PlateScene
      n={53}
      panels={[
        { title: 'Viscosité : la transition s’étale', render: () => visc },
        { title: 'Limite : un choc', render: () => shock },
      ]}
      identity={String.raw`$s=\dfrac{U_L+U_R}2$, $\quad U(z)=s-\dfrac{U_L-U_R}2\tanh\!\Big(\dfrac{(U_L-U_R)\,z}{4\nu}\Big)$, $\ z=x-st$.`}
      controls={
        <>
          <Slider label="Coefficient ν" value={nu} min={0.01} max={0.4} step={0.005} onChange={setNu} format={(v) => f2(v, 3)} />
          <Slider label="Temps t" value={t} min={0} max={4} step={0.01} onChange={setT} format={(v) => f2(v)} />
        </>
      }
      observations={[
        { id: 'raidit', text: String.raw`Fais tendre $\nu$ vers $0$ : la transition se raidit, sa largeur est d'ordre $4\nu$.`, done: nu < 0.03 },
        { id: 'avance', text: String.raw`Avance en temps : le profil se translate de $s=\tfrac12$ par unité de temps.`, done: t > 2 },
        { id: 'large', text: 'Un ν plus grand étale la transition.', done: nu > 0.3 },
      ]}
      readings={[
        { label: 'Largeur de transition 4ν/(U_L − U_R)', value: f2((4 * nu) / (UL - UR), 3), status: 'exact' },
        { label: String.raw`Résidu $-sU'+UU'-\nu U''$ en $z=0{,}3$`, value: f2(res, 6), status: 'numerique' },
      ]}
    />
  );
}
