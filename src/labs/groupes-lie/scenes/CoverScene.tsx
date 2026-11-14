/**
 * Scène « Revêtement SU(2) → SO(3) » : un ou deux tours autour d'un axe ; modèle de la
 * boule de rayon π (antipodes du bord identifiés), relevé sur le cercle de ℍ engendré par
 * 1 et u, repère qui tourne. Lecture : le relevé finit en −1 (un tour) ou en 1 (deux tours).
 */
import { useEffect, useMemo, useRef, useState } from 'react';
import { Button } from '@/components/ui';
import { MathViewStudio, type StudioView } from '@/components/math-visualizations/MathViewStudio';
import { coverScene } from '@/core/visual-reasoning/lie-cover';
import { matVec, rodrigues, type Vec } from '@/core/visual-reasoning/lie-core';
import { fmt, type SceneExplanations } from '@/core/visual-reasoning/types';
import { useGame } from '@/storage/store';
import { Curve, Dot, MathText, Panel, Plot, Segment, Slider } from '../../kit';
import { LIE_COLORS, readoutViews, RelatedPanel } from '../common';

const EXPLANATIONS: SceneExplanations = {
  why: 'SO(3) se représente par la boule de rayon π : la rotation d’angle β autour de u est le point βu, et deux points antipodaux du bord désignent la même rotation. Le relevé dans S³ distingue ce que la boule confond.',
  proofLink: 'L’argument est l’exercice difficile du résultat 42 : relèvement unique des chemins dans un revêtement, point d’arrivée −1 pour un tour, 1 pour deux tours, simple connexité de S³.',
  generalize: 'Un revêtement à deux feuillets de base connexe par arcs, à espace total simplement connexe, donne π₁(base) ≃ ℤ/2 ; c’est le cas de SU(2) → SO(3), et de Spin(n) → SO(n) pour n ≥ 3.',
};

const AXES: { id: string; label: string; u: Vec }[] = [
  { id: 'e3', label: '$e_3$', u: [0, 0, 1] },
  { id: 'e1', label: '$e_1$', u: [1, 0, 0] },
  { id: 'diag', label: String.raw`$\tfrac1{\sqrt3}(1,1,1)$`, u: [1, 1, 1].map((x) => x / Math.sqrt(3)) },
];

/** Projection oblique de l'espace sur le plan de l'écran : x à droite, x₃ en haut, x₂ en profondeur. */
const oblique = (p: Vec): [number, number] => [p[0]! - 0.45 * p[1]!, p[2]! - 0.3 * p[1]!];

export function CoverScene() {
  const [turns, setTurns] = useState<1 | 2>(1);
  const [s, setS] = useState(0.35);
  const [axisId, setAxisId] = useState('e3');
  const [playing, setPlaying] = useState(false);
  const reduce = useGame((st) => st.save.settings.reduceMotion);
  const u = AXES.find((a) => a.id === axisId)!.u;
  const data = useMemo(() => coverScene({ turns, s, u }), [turns, s, u]);
  const raf = useRef<number | null>(null);
  /** Toute action manuelle interrompt l'animation, qui sinon écraserait la valeur choisie. */
  const manual = (v: number) => {
    setPlaying(false);
    setS(v);
  };

  useEffect(() => {
    if (!playing) return;
    if (reduce) {
      setS(1);
      setPlaying(false);
      return;
    }
    const start = performance.now();
    const from = s >= 1 ? 0 : s;
    const duration = 6000 * turns * (1 - from);
    const tick = (now: number) => {
      const k = Math.min(1, (now - start) / Math.max(1, duration));
      setS(from + (1 - from) * k);
      if (k < 1) raf.current = requestAnimationFrame(tick);
      else setPlaying(false);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current !== null) cancelAnimationFrame(raf.current);
    };
    // Lu au démarrage seulement : s évolue pendant l'animation et n'est pas une dépendance.
  }, [playing, reduce, turns]);

  // Passages successifs dans la boule : un segment horizontal par passage, décalés pour rester lisibles.
  const passes = useMemo(() => {
    const out: [number, number][][] = [];
    let cur: [number, number][] = [];
    let k = 0;
    let prev: number | null = null;
    for (const [, b] of data.ballPath) {
      if (prev !== null && Math.abs(b - prev) > Math.PI) {
        out.push(cur);
        cur = [];
        k++;
      }
      cur.push([b, -0.38 * k]);
      prev = b;
    }
    if (cur.length > 1) out.push(cur);
    return out;
  }, [data.ballPath]);
  const lastPass = passes[passes.length - 1];
  const here = lastPass?.[lastPass.length - 1] ?? [0, 0];

  const ball = (
    <div>
      <Plot xDomain={[-3.9, 3.9]} yDomain={[-3.9, 3.9]} width={460} height={460} ariaLabel="Modèle de la boule de rayon π">
        <Curve points={Array.from({ length: 121 }, (_, i) => [Math.PI * Math.cos((2 * Math.PI * i) / 120), Math.PI * Math.sin((2 * Math.PI * i) / 120)] as [number, number])} color="var(--text-3)" width={1.4} />
        <Segment a={[-Math.PI, 0.9]} b={[Math.PI, 0.9]} color="var(--text-3)" width={0.8} dash="3 4" />
        <Dot x={Math.PI} y={0} r={4} color={LIE_COLORS.bracket} label="+πu" dx={6} dy={-10} />
        <Dot x={-Math.PI} y={0} r={4} color={LIE_COLORS.bracket} label="−πu" dx={-38} dy={-10} />
        {passes.map((pts, i) => (
          <g key={i}>
            <Curve points={pts} color={i % 2 ? LIE_COLORS.blue : LIE_COLORS.orange} width={2.6} />
            {pts.length > 8 && <Segment a={pts[pts.length - 8]!} b={pts[pts.length - 1]!} color={i % 2 ? LIE_COLORS.blue : LIE_COLORS.orange} width={2.6} arrow />}
          </g>
        ))}
        <Dot x={here[0]} y={here[1]} r={6} color={LIE_COLORS.X} label="γ(τ)" />
      </Plot>
      <p className="mt-1 text-[12px] text-text-3">
        <MathText text={String.raw`Rotation d'angle $\beta\in[-\pi,\pi]$ autour de $u$ $\mapsto$ point $\beta u$. Les points $\pm\pi u$ sont identifiés (pointillé). Chaque passage par le bord est dessiné un cran plus bas : ${data.crossings} passage(s).`} />
      </p>
    </div>
  );

  const phi = data.liftAngle;
  const liftArc = Array.from({ length: 121 }, (_, i) => {
    const a = (phi * i) / 120;
    return [Math.cos(a), Math.sin(a)] as [number, number];
  });
  const circle = (
    <div>
      <Plot xDomain={[-1.45, 1.45]} yDomain={[-1.45, 1.45]} width={420} height={420} ariaLabel="Relevé dans le cercle de ℍ engendré par 1 et u">
        <Curve points={Array.from({ length: 121 }, (_, i) => [Math.cos((2 * Math.PI * i) / 120), Math.sin((2 * Math.PI * i) / 120)] as [number, number])} color="var(--text-3)" width={1.2} />
        <Curve points={liftArc} color={LIE_COLORS.X} width={3} />
        <Dot x={1} y={0} r={4} color="var(--text)" label="1" dx={8} dy={4} />
        <Dot x={-1} y={0} r={4} color="var(--text)" label="−1" dx={-26} dy={4} />
        <Dot x={0} y={1} r={3} color="var(--text-3)" label="u" dx={6} dy={-6} />
        <Dot x={Math.cos(phi)} y={Math.sin(phi)} r={6} color={LIE_COLORS.X} label="q(τ)" />
        <Dot x={-Math.cos(phi)} y={-Math.sin(phi)} r={5} color={LIE_COLORS.bracket} label="−q(τ)" dx={8} dy={14} />
      </Plot>
      <p className="mt-1 text-[12px] text-text-3">
        <MathText text={String.raw`Le relevé $q(\tau)=\cos\frac\tau2+u\sin\frac\tau2$ avance deux fois moins vite que la rotation. Rose : l'autre point $-q(\tau)$ de la fibre, qui code la même rotation.`} />
      </p>
    </div>
  );

  const R = rodrigues(u, data.tau);
  const frame = [0, 1, 2].map((i) => matVec(R, [i === 0 ? 1 : 0, i === 1 ? 1 : 0, i === 2 ? 1 : 0]));
  const object = (
    <div>
      <Plot xDomain={[-1.7, 1.7]} yDomain={[-1.5, 1.5]} width={420} height={370} grid={false} ariaLabel="Repère tourné par γ(τ)">
        <Segment a={oblique(u.map((x) => -1.4 * x))} b={oblique(u.map((x) => 1.4 * x))} color={LIE_COLORS.bracket} width={1.4} dash="5 4" />
        {frame.map((f, i) => (
          <Segment key={i} a={[0, 0]} b={oblique(f)} color={[LIE_COLORS.orange, LIE_COLORS.X, LIE_COLORS.blue][i]!} width={2.6} arrow />
        ))}
        {frame.map((f, i) => (
          <Dot key={`l${i}`} x={oblique(f)[0]} y={oblique(f)[1]} r={0} color={[LIE_COLORS.orange, LIE_COLORS.X, LIE_COLORS.blue][i]!} label={['γ(τ)e₁', 'γ(τ)e₂', 'γ(τ)e₃'][i]} />
        ))}
      </Plot>
      <p className="mt-1 text-[12px] text-text-3">Projection oblique. Après un tour comme après deux, le repère revient à sa position initiale : seul le relevé les distingue.</p>
    </div>
  );

  const views: StudioView[] = [
    { id: 'boule', title: 'Modèle de la boule', render: () => ball },
    { id: 'releve', title: 'Relevé dans S³', render: () => circle },
    { id: 'repere', title: 'Repère tourné', render: () => object },
    ...readoutViews(data.readout),
  ];

  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_340px]">
      <div className="min-w-0">
        <MathViewStudio id="lie-revetement" views={views} initial={['boule', 'releve', 'equations']} explanations={EXPLANATIONS} />
      </div>
      <div className="space-y-4">
        <Panel title="Lacet de rotations">
          <div className="flex gap-1.5" role="group" aria-label="Nombre de tours">
            {[1, 2].map((n) => (
              <Button key={n} variant={turns === n ? 'primary' : 'outline'} aria-pressed={turns === n} onClick={() => {
                  setPlaying(false);
                  setTurns(n as 1 | 2);
                }} data-turns={n} className="text-[13px]">
                {n === 1 ? 'Un tour (2π)' : 'Deux tours (4π)'}
              </Button>
            ))}
          </div>
          <div className="mt-3">
            <Slider label="Avancement" value={s} min={0} max={1} step={0.005} onChange={manual} format={(v) => `${fmt(v * 100, 0)} %`} />
          </div>
          <div className="mt-2 flex gap-1.5">
            <Button variant="primary" className="text-[13px]" onClick={() => setPlaying((p) => !p)} data-testid="lire-lacet">
              {playing ? 'Pause' : 'Parcourir le lacet'}
            </Button>
            <Button variant="outline" className="text-[13px]" onClick={() => manual(1)}>Aller au bout</Button>
            <Button variant="outline" className="text-[13px]" onClick={() => manual(0)}>Début</Button>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5" role="group" aria-label="Axe de rotation">
            {AXES.map((a) => (
              <Button key={a.id} variant={axisId === a.id ? 'primary' : 'outline'} aria-pressed={axisId === a.id} onClick={() => {
                  setPlaying(false);
                  setAxisId(a.id);
                }} className="text-[12.5px]">
                <MathText text={`Axe ${a.label}`} />
              </Button>
            ))}
          </div>
        </Panel>
        <Panel title="Verdict">
          <p className="text-[13.5px]" data-testid="verdict-revetement">
            {data.done ? data.readout.conclusions[0]!.label : 'Le lacet n’est pas encore parcouru en entier.'}
          </p>
          <p className="mt-1 text-[12.5px] text-text-3">Partie réelle du relevé : {fmt(data.qLift[0], 4)}.</p>
        </Panel>
        <RelatedPanel theorems={['revetement-su2', 'rodrigues']} plates={[36]} />
      </div>
    </div>
  );
}
