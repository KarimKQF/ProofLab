/**
 * Planche 73 — Formes fermées, exactes et cohomologie de de Rham.
 * Sur le cercle, α = x dy − y dx = dθ localement. En suivant un point qui fait le tour, la
 * primitive relevée θ̃ gagne 2π : ∮α = 2π ≠ 0, donc α est fermée mais pas exacte.
 */
import { useRef, useState } from 'react';
import { PlateScene } from '../PlateScene';
import { Arrow, C, Caption, Circle, Curve, Dot, DragOnCurve, f2, Label, Plot, Segment } from '../kit2d';
import { Button } from '@/components/ui';
import { usePlayer } from '../hooks';
import { mod2pi, TAU } from '../math';

const START = 0.4;
const piLabel = (k: number) => (k === 0 ? '0' : k === 1 ? 'π' : k === -1 ? '−π' : `${k < 0 ? '−' : ''}${Math.abs(k)}π`);

export default function P73() {
  const [lift, setLift] = useState(START);
  const [path, setPath] = useState<number[]>([START]);
  const liftRef = useRef(START);
  const begin = useRef(START);
  const push = (L: number) => {
    liftRef.current = L;
    setLift(L);
    setPath((p) => (p.length > 1500 ? [...p.filter((_, i) => i % 2 === 0), L] : [...p, L]));
  };
  const player = usePlayer(3500, (k) => push(begin.current + TAU * k));
  const move = (s: number) => {
    player.stop();
    const cur = liftRef.current;
    let d = s - mod2pi(cur);
    if (d > Math.PI) d -= TAU;
    if (d < -Math.PI) d += TAU;
    push(cur + d);
  };
  const gained = lift - START;

  // Spirale intérieure : l'angle parcouru, déroulé (le rayon croît avec le chemin fait).
  const n = Math.min(1200, Math.ceil(Math.abs(gained) / 0.03) + 2);
  const spiral = Array.from({ length: n + 1 }, (_, i) => {
    const u = START + (gained * i) / n;
    const rr = Math.min(0.9, 0.45 + (0.1 * Math.abs(u - START)) / TAU);
    return [rr * Math.cos(u), rr * Math.sin(u)] as [number, number];
  });
  const circle = (
    <div>
      <Plot xDomain={[-1.5, 1.5]} yDomain={[-1.5, 1.5]} width={280} height={280} grid={false} ariaLabel="Un tour complet sur le cercle">
        <Circle c={[0, 0]} r={1} color={C.teal} width={2.2} />
        {[0.9, 2.5, 4.1, 5.7].map((t) => (
          <Arrow key={t} a={[1.0 * Math.cos(t), 1.0 * Math.sin(t)]} b={[Math.cos(t) - 0.28 * Math.sin(t), Math.sin(t) + 0.28 * Math.cos(t)]} color={C.teal} width={1.6} />
        ))}
        <Curve points={spiral} color={C.violet} width={1.8} />
        <Segment a={[0, 0]} b={[Math.cos(START), Math.sin(START)]} color={C.muted} width={1} dash="3 3" />
        <DragOnCurve curve={(s) => [Math.cos(s), Math.sin(s)]} s={mod2pi(lift)} range={[0, TAU]} onChange={move} name="Point du cercle" color={C.orange} r={6} wrap step={TAU / 72} />
      </Plot>
      <Caption>{String.raw`$\alpha=x\,dy-y\,dx$ (flèches vertes). En violet, l'angle parcouru, déroulé : chaque tour ajoute une spire.`}</Caption>
    </div>
  );

  const lo = Math.min(-1, Math.min(...path) - 0.6);
  const hi = Math.max(TAU + 1, Math.max(...path) + 0.6);
  const N = path.length;
  const trail = path.map((v, i) => [v, N > 1 ? i / (N - 1) : 0] as [number, number]);
  const ticks: number[] = [];
  for (let k = Math.ceil(lo / Math.PI); k * Math.PI <= hi; k++) ticks.push(k);
  const lifts: number[] = [];
  for (let k = Math.ceil((lo - START) / TAU); START + k * TAU <= hi; k++) lifts.push(k);
  const line = (
    <div>
      <Plot xDomain={[lo, hi]} yDomain={[-0.4, 1.15]} width={320} height={260} grid={false} ariaLabel="Primitive relevée sur la droite des angles">
        <Segment a={[lo, 0]} b={[hi, 0]} color={C.muted} width={1.2} />
        {ticks.map((k) => (
          <g key={k}>
            <Segment a={[k * Math.PI, -0.04]} b={[k * Math.PI, 0.04]} color={C.muted} width={1.2} />
            <Label x={k * Math.PI} y={-0.17} text={piLabel(k)} color={C.muted} size={12} anchor="middle" />
          </g>
        ))}
        {lifts.map((k) => (
          <g key={k}>
            <Segment a={[START + k * TAU, 0]} b={[START + k * TAU, 1.08]} color={k === 0 ? C.muted : C.faint} width={1} dash="4 4" />
            <Label x={START + k * TAU} y={-0.32} text={k === 0 ? 'départ' : `départ ${k > 0 ? '+' : '−'} ${Math.abs(k) === 1 ? '' : Math.abs(k)}2π`} color={C.muted} size={10.5} anchor="middle" />
          </g>
        ))}
        {N > 1 && <Curve points={trail} color={C.teal} width={2} />}
        <Dot x={lift} y={trail[N - 1]![1]} color={C.orange} r={5} />
      </Plot>
      <Caption>{String.raw`Horizontalement : la valeur de la primitive $\tilde\theta\in\mathbb R$. Pointillés : les relevés du point de départ, espacés de $2\pi$. Le tracé monte au fil du geste.`}</Caption>
    </div>
  );
  return (
    <PlateScene
      n={73}
      panels={[
        { title: 'Un tour complet sur le cercle', render: () => circle },
        { title: 'Sur la droite des angles', render: () => line },
      ]}
      identity={String.raw`$H^k_{\mathrm{dR}}(M)=\ker(d:\Omega^k\to\Omega^{k+1})/\operatorname{im}(d:\Omega^{k-1}\to\Omega^k)$ ; $\ \oint_{S^1}\alpha=2\pi\neq0$.`}
      controls={
        <>
          <p className="text-[13px] text-text-2">Fais glisser le point orange autour du cercle (souris ou flèches du clavier), dans un sens ou dans l’autre.</p>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="primary"
              className="text-[13px]"
              data-testid="animer"
              onClick={() => {
                if (player.playing) player.stop();
                else {
                  begin.current = liftRef.current;
                  player.play();
                }
              }}
            >
              {player.playing ? 'Pause' : 'Faire un tour'}
            </Button>
            <Button
              variant="outline"
              className="text-[13px]"
              onClick={() => {
                player.stop();
                liftRef.current = START;
                setLift(START);
                setPath([START]);
              }}
            >
              Recommencer
            </Button>
          </div>
        </>
      }
      observations={[
        { id: 'tour', text: String.raw`Fais un tour complet : le point revient au départ, mais la primitive a gagné $2\pi$.`, done: Math.abs(gained) > TAU - 0.2 },
        { id: 'deux', text: String.raw`Un second tour ajoute encore $2\pi$ : aucune fonction $f$ sur le cercle ne vérifie $df=\alpha$.`, done: Math.abs(gained) > 2 * TAU - 0.2 },
        { id: 'retour', text: 'Va et viens sans faire le tour : la primitive retrouve sa valeur de départ.', done: N > 30 && Math.abs(gained) < 0.05 },
      ]}
      readings={[
        { label: String.raw`$\tilde\theta(\text{fin})-\tilde\theta(\text{départ})$`, value: `${f2(gained, 3)} = ${f2(gained / TAU, 2)} × 2π`, status: 'exact' },
        { label: String.raw`$\oint_{S^1}\alpha$`, value: '2π ≈ 6,283', status: 'exact' },
      ]}
    />
  );
}
