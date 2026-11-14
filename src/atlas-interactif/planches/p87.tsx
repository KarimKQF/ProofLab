/**
 * Planche 87 — Intégrales premières, involution et tores.
 * Sur ℝ⁴ = ℝ²×ℝ², H₁ = ω₁(q₁² + p₁²)/2 et H₂ = ω₂(q₂² + p₂²)/2 sont en involution :
 * {H₁, H₂} = 0. Fixer H₁ = h₁ et H₂ = h₂ donne un cercle dans chaque plan, donc un tore
 * S¹ × S¹. Le flot de H₁ + H₂ y fait tourner les deux angles : θ_i(t) = θ_i(0) − ω_i t.
 * L'orbite se referme si ω₂/ω₁ est rationnel ; sinon elle est dense dans le tore.
 */
import { useMemo, useState } from 'react';
import { PlateScene } from '../PlateScene';
import { Arc, C, Caption, Choice, Circle, Dot, f2, Label, Plot, Slider } from '../kit2d';
import { ParamSurface, Point3, Polyline3, Scene3D } from '../kit3d';
import { PlayButton, usePlayer } from '../hooks';
import { TAU } from '../math';

const RATIOS = [
  { id: '1', label: '1', value: 1, p: 1, q: 1 },
  { id: '3/2', label: '3/2', value: 1.5, p: 3, q: 2 },
  { id: '2', label: '2', value: 2, p: 2, q: 1 },
  { id: 'r2', label: '√2', value: Math.SQRT2, p: 0, q: 0 },
  { id: 'or', label: '(1+√5)/2', value: (1 + Math.sqrt(5)) / 2, p: 0, q: 0 },
] as const;
type RatioId = (typeof RATIOS)[number]['id'];
const T_MAX = 80;

export default function P87() {
  const [h1, setH1] = useState(0.6);
  const [h2, setH2] = useState(0.4);
  const [rid, setRid] = useState<RatioId>('3/2');
  const [T, setT] = useState(4);
  const player = usePlayer(9000, (k) => setT(T_MAX * k));
  const ratio = RATIOS.find((x) => x.id === rid)!;
  const w2 = ratio.value;
  const rho1 = Math.sqrt(2 * h1);
  const rho2 = Math.sqrt(2 * h2 / w2);
  const th1 = (t: number) => 0.3 - t;
  const th2 = (t: number) => 1.1 - w2 * t;
  // Tore de révolution schématique : grand rayon lié au cercle de H₁, petit rayon à celui de H₂.
  const Rm = 0.8 + 0.45 * rho1;
  const rm = 0.18 + 0.3 * rho2;
  const torus = (a: number, b: number, s = 1): [number, number, number] => [(Rm + s * rm * Math.cos(b)) * Math.cos(a), (Rm + s * rm * Math.cos(b)) * Math.sin(a), s * rm * Math.sin(b)];
  const path = useMemo(() => {
    const n = Math.max(2, Math.ceil(T / 0.04));
    return Array.from({ length: n + 1 }, (_, i) => {
      const t = (T * i) / n;
      return torus(th1(t), th2(t), 1.04);
    });
  }, [T, Rm, rm, w2]);
  const circles = (
    <div>
      <Plot xDomain={[-3.2, 3.2]} yDomain={[-1.9, 1.9]} width={340} height={220} grid={false} ariaLabel="Deux niveaux indépendants">
        <Circle c={[-1.6, 0]} r={rho1} color={C.teal} width={2.4} />
        <Circle c={[1.6, 0]} r={rho2} color={C.orange} width={2.4} />
        <Arc c={[-1.6, 0]} r={rho1} a0={-0.6} a1={-1.2} color={C.teal} width={2.4} arrow />
        <Arc c={[1.6, 0]} r={rho2} a0={-0.6} a1={-1.2} color={C.orange} width={2.4} arrow />
        <Dot x={-1.6 + rho1 * Math.cos(th1(T))} y={rho1 * Math.sin(th1(T))} color={C.teal} r={5} />
        <Dot x={1.6 + rho2 * Math.cos(th2(T))} y={rho2 * Math.sin(th2(T))} color={C.orange} r={5} />
        <Label x={-1.6} y={-0.08} text="H₁" color={C.teal} size={14} anchor="middle" italic />
        <Label x={1.6} y={-0.08} text="H₂" color={C.orange} size={14} anchor="middle" italic />
      </Plot>
      <Caption>{String.raw`Plans $(q_1,p_1)$ et $(q_2,p_2)$ : chaque niveau fixe un cercle ; un point du niveau commun, c'est deux angles.`}</Caption>
    </div>
  );
  const tor = (
    <Scene3D label="Le produit est un tore invariant" camera={[2.6, -3.1, 2.6]} height={300}>
      <ParamSurface f={(a, b) => torus(a, b)} u={[0, TAU, 72]} v={[0, TAU, 36]} color="#4a86d0" opacity={0.45} deps={[Rm, rm]} />
      <Polyline3 points={path} color="#1a9e96" width={1.6} />
      <Point3 p={torus(th1(T), th2(T), 1.04)} color="#d8743a" size={0.07} />
    </Scene3D>
  );
  const closed = ratio.q > 0;
  const period = closed ? (TAU * ratio.q) / 1 : Infinity;
  return (
    <PlateScene
      n={87}
      panels={[
        { title: 'Deux niveaux indépendants', render: () => circles },
        { title: 'Le produit est un tore invariant', render: () => tor },
      ]}
      identity={String.raw`$\{F_i,F_j\}=0$, $\qquad F^{-1}(c)\simeq\mathbb T^n$ (niveau régulier, compact, connexe)`}
      controls={
        <>
          <Slider label="Niveau h₁ de H₁" value={h1} min={0.15} max={1.2} step={0.01} onChange={setH1} format={(x) => f2(x)} />
          <Slider label="Niveau h₂ de H₂" value={h2} min={0.15} max={1.2} step={0.01} onChange={setH2} format={(x) => f2(x)} />
          <div>
            <p className="mb-1.5 text-[13px] text-text-2">Rapport des fréquences ω₂/ω₁</p>
            <Choice options={RATIOS.map((x) => ({ id: x.id, label: x.label }))} value={rid} onChange={(x) => setRid(x as RatioId)} name="Rapport des fréquences" />
          </div>
          <Slider
            label="Temps t parcouru"
            value={T}
            min={0}
            max={T_MAX}
            step={0.1}
            onChange={(x) => {
              player.stop();
              setT(x);
            }}
            format={(x) => f2(x, 1)}
          />
          <PlayButton player={player} label="Faire tourner le flot" />
        </>
      }
      observations={[
        { id: 'niveaux', text: 'Change h₁ ou h₂ : chaque niveau fixe un cercle ; le niveau commun est leur produit, un tore.', done: Math.abs(h1 - 0.6) > 0.25 || Math.abs(h2 - 0.4) > 0.25 },
        { id: 'ferme', text: 'Rapport 3/2 : l’orbite se referme quand θ₁ a fait 2 tours et θ₂ en a fait 3.', done: rid === '3/2' && T >= 4 * Math.PI },
        { id: 'dense', text: 'Rapport irrationnel : l’orbite ne se referme jamais et couvre peu à peu tout le tore.', done: !closed && T > 60 },
      ]}
      readings={[
        { label: String.raw`$\{H_1,H_2\}$`, value: '0', status: 'exact' },
        { label: String.raw`Tours de $(\theta_1,\theta_2)$ au temps $t$`, value: `(${f2(T / TAU, 2)} ; ${f2((w2 * T) / TAU, 2)})`, status: 'exact' },
        { label: 'Retour au point de départ', value: closed ? `t = ${f2(period, 3)} (${ratio.q} et ${ratio.p} tours)` : 'jamais (orbite dense)', status: 'exact' },
      ]}
      note="Le niveau commun vit dans ℝ⁴ ; le tore de révolution dessiné en est une image schématique (grand rayon lié à h₁, petit rayon à h₂)."
    />
  );
}
