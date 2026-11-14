/**
 * Planche 60 — Noether, symétries variationnelles et conservation.
 * q″ = −∇V avec V(q) = ½|q|² + 0,15|q|⁴ + ε q₁². Pour ε = 0 (potentiel radial), le lagrangien est
 * invariant par rotation et J = q₁p₂ − q₂p₁ est constant ; un ε ≠ 0 casse la symétrie.
 */
import { useMemo, useState } from 'react';
import { PlateScene } from '../PlateScene';
import { Arrow, C, Caption, ClippedCurve, Dot, f2, Plot, Slider } from '../kit2d';
import { rk4 } from '../math';

export default function P60() {
  const [eps, setEps] = useState(0);
  const [T, setT] = useState(12);
  const [s, setS] = useState(0.4);
  const traj = useMemo(() => {
    const F = ([q1, q2, p1, p2]: number[]) => {
      const r2 = q1! * q1! + q2! * q2!;
      const k = 1 + 0.6 * r2;
      return [p1!, p2!, -k * q1! - 2 * eps * q1!, -k * q2!];
    };
    const pts: number[][] = [[1, 0, 0, 0.9]];
    const n = 600;
    for (let i = 0; i < n; i++) pts.push(rk4(F, pts[i]!, T / n, 8));
    return pts;
  }, [eps, T]);
  const J = traj.map(([q1, q2, p1, p2]) => q1! * p2! - q2! * p1!);
  const idx = Math.min(traj.length - 1, Math.round(s * (traj.length - 1)));
  const [q1, q2] = traj[idx]!;
  const r2 = q1! * q1! + q2! * q2!;
  const force: [number, number] = [-(1 + 0.6 * r2) * q1! - 2 * eps * q1!, -(1 + 0.6 * r2) * q2!];
  const fl = Math.hypot(...force) || 1;
  const D: [number, number, number, number] = [-1.6, 1.6, -1.6, 1.6];
  const orbit = (
    <div>
      <Plot xDomain={[-1.6, 1.6]} yDomain={[-1.6, 1.6]} width={300} height={300} grid={false} ariaLabel="Trajectoire dans un potentiel">
        <ClippedCurve points={traj.map(([a, b]) => [a!, b!])} domain={D} color={C.teal} width={1.6} />
        <Arrow a={[q1!, q2!]} b={[q1! + (0.45 * force[0]) / fl, q2! + (0.45 * force[1]) / fl]} color={C.orange} width={2.2} />
        <Arrow a={[q1!, q2!]} b={[q1! - 0.4 * q2!, q2! + 0.4 * q1!]} color={C.violet} width={2} />
        <Dot x={q1!} y={q2!} color={C.ink} r={4.5} />
      </Plot>
      <Caption>{String.raw`Orange : $-\nabla V$. Violet : $\delta q=Jq$, la direction de la rotation infinitésimale.`}</Caption>
    </div>
  );
  const ts = J.map((_, i) => (T * i) / (J.length - 1));
  const lo = Math.min(...J) - 0.1;
  const hi = Math.max(...J) + 0.1;
  const D2: [number, number, number, number] = [0, T, lo, hi];
  const cons = (
    <div>
      <Plot xDomain={[0, T]} yDomain={[lo, hi]} width={300} height={300} ariaLabel="La quantité J au cours du temps">
        <ClippedCurve points={ts.map((t, i) => [t, J[i]!])} domain={D2} color={C.orange} width={2.4} />
        <Dot x={ts[idx]!} y={J[idx]!} color={C.orange} r={4.5} />
      </Plot>
      <Caption>{String.raw`$J=q_1p_2-q_2p_1$ le long de la trajectoire (Runge–Kutta).`}</Caption>
    </div>
  );
  const spread = Math.max(...J) - Math.min(...J);
  return (
    <PlateScene
      n={60}
      panels={[
        { title: 'Potentiel invariant par rotation', render: () => orbit },
        { title: 'La quantité conservée', render: () => cons },
      ]}
      identity={String.raw`$\mathrm{pr}^{(1)}X(L)=D_tB\ \Rightarrow\ \dfrac{d}{dt}\big(L_{q'}\eta-B\big)=0$ ; rotations : $J=q\times p$ constant.`}
      controls={
        <>
          <Slider label="Brisure ε (terme ε q₁²)" value={eps} min={0} max={0.6} step={0.01} onChange={setEps} format={(v) => f2(v)} />
          <Slider label="Durée T" value={T} min={2} max={30} step={0.5} onChange={setT} format={(v) => f2(v)} />
          <Slider label="Instant affiché" value={s} min={0} max={1} step={0.005} onChange={setS} format={(v) => f2(v * T)} />
        </>
      }
      observations={[
        { id: 'radial', text: String.raw`Potentiel radial ($\varepsilon=0$) : la force est radiale et $J$ reste constant.`, done: eps === 0 && T > 10 },
        { id: 'brise', text: String.raw`Avec $\varepsilon>0$, le potentiel n'est plus invariant par rotation : $J$ varie.`, done: eps > 0.2 },
        { id: 'orthogonal', text: 'Pour ε = 0, la force est orthogonale à la rotation infinitésimale δq.', done: eps === 0 && Math.abs(s - 0.4) > 0.3 },
      ]}
      readings={[
        { label: String.raw`Variation de $J$ sur la trajectoire`, value: f2(spread, 6), status: 'numerique' },
        { label: String.raw`$-\nabla V\cdot\delta q$ à l'instant affiché`, value: f2(force[0] * -q2! + force[1] * q1!, 6), status: 'exact' },
      ]}
      note="Trajectoire intégrée par Runge–Kutta d’ordre 4 ; pour ε = 0, la variation de J n’est due qu’à l’erreur d’intégration."
    />
  );
}
