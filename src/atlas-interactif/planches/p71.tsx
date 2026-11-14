/**
 * Planche 71 — Saint-Venant, topographie et symétries (profils schématiques).
 * ∂_t h + ∂_x q = 0, ∂_t q + ∂_x(q²/h + g h²/2) = −g h ∂_x z_b. Fond plat : rien ne dépend de x,
 * la translation est une symétrie. Fond fixe : le terme −g h ∂_x z_b dépend de la position,
 * il change quand on translate la masse d'eau.
 */
import { useState } from 'react';
import { PlateScene } from '../PlateScene';
import { C, Caption, ClippedCurve, f2, Plot, Poly, Slider } from '../kit2d';
import { linspace, simpson } from '../math';

const G = 9.81;
const bump = (x: number, c: number) => 0.45 * Math.exp(-((x - c) ** 2) / 0.18);
const zb = (x: number) => 0.5 * Math.exp(-((x - 2.75) ** 2) / 0.2);
const zbp = (x: number) => (-2 * (x - 2.75) / 0.2) * zb(x);

export default function P71() {
  const [s, setS] = useState(0);
  const xs = linspace(0, 4, 300);
  const h = (x: number) => 0.6 + bump(x, 1.2 + s);
  const D: [number, number, number, number] = [0, 4, -0.05, 1.3];
  const flat = (
    <div>
      <Plot xDomain={[0, 4]} yDomain={[-0.05, 1.3]} width={300} height={220} ariaLabel="Fond plat">
        <Poly points={[[0, 0], ...xs.map((x) => [x, h(x)] as [number, number]), [4, 0]]} fill={C.blue} opacity={0.18} />
        <ClippedCurve points={xs.map((x) => [x, 0.6 + bump(x, 1.2)])} domain={D} color={C.teal} width={1.4} dash="5 4" />
        <ClippedCurve points={xs.map((x) => [x, h(x)])} domain={D} color={C.orange} width={2.2} />
      </Plot>
      <Caption>Fond plat : le profil translaté reste dans la même situation.</Caption>
    </div>
  );
  const surf = (x: number) => zb(x) + h(x);
  const fixed = (
    <div>
      <Plot xDomain={[0, 4]} yDomain={[-0.05, 1.3]} width={300} height={220} ariaLabel="Fond fixe">
        <Poly points={[[0, 0], ...xs.map((x) => [x, surf(x)] as [number, number]), [4, 0]]} fill={C.blue} opacity={0.18} />
        <Poly points={[[0, 0], ...xs.map((x) => [x, zb(x)] as [number, number]), [4, 0]]} fill={C.orange} opacity={0.35} stroke={C.orange} />
        <ClippedCurve points={xs.map((x) => [x, surf(x)])} domain={D} color={C.teal} width={2.2} />
      </Plot>
      <Caption>Fond fixe : en translatant l’eau, on la déplace par rapport à l’obstacle.</Caption>
    </div>
  );
  const source = simpson((x) => G * h(x) * zbp(x), 0, 4, 400);
  return (
    <PlateScene
      n={71}
      panels={[
        { title: 'Fond plat : translation possible', render: () => flat },
        { title: 'Fond fixe : obstacle à la translation', render: () => fixed },
      ]}
      identity={String.raw`$\partial_th+\partial_xq=0$, $\quad\partial_tq+\partial_x\big(q^2/h+gh^2/2\big)=-g\,h\,\partial_xz_b$.`}
      controls={<Slider label="Translation s de la bosse d’eau" value={s} min={-1} max={2} step={0.01} onChange={setS} format={(v) => f2(v)} />}
      observations={[
        { id: 'plat', text: 'Fond plat : la translation ne change pas les équations, elles ne dépendent pas de x.', done: Math.abs(s) > 0.5 },
        { id: 'obstacle', text: String.raw`Fond fixe : en amenant l'eau sur l'obstacle, le terme $\int g h\,\partial_xz_b$ change.`, done: s > 1 },
        { id: 'retour', text: 'Ramène s à 0 : on retrouve la configuration initiale.', done: Math.abs(s) < 0.01 },
      ]}
      readings={[{ label: String.raw`$\int_0^4g\,h\,\partial_xz_b\,dx$ (fond fixe)`, value: f2(source, 4), status: 'numerique' }]}
      note="Profils schématiques, comme dans l’atlas : ils ne sont pas des solutions des équations ; seul le terme de fond est calculé (Simpson)."
    />
  );
}
