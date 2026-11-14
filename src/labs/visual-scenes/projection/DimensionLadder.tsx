/**
 * « Généraliser » : la même boule fermée B(0, 2) dans ℝ, ℝ², ℝ³, puis l'énoncé dans un
 * espace de Hilbert quelconque. Les trois premières étapes sont exactes (même formule) ;
 * la dernière est un énoncé, accompagné d'un schéma qui n'est pas une représentation fidèle.
 */
import { lazy, useEffect, useState } from 'react';
import { Button } from '@/components/ui';
import { ballLadder, LADDER_RADIUS, radialFrame, toPlane } from '@/core/visual-reasoning/projection-scene';
import { fmt, vecTex } from '@/core/visual-reasoning/types';
import { Claim, Dot, MathText, Plot, Segment } from '@/labs/kit';
import { useGame } from '@/storage/store';
import { Scene3DGate } from '@/components/math-visualizations/Scene3DGate';
import { H2, Region2D, X2, Y2 } from './Scene2D';

const LadderBall3D = lazy(() => import('./LadderBall3D'));

const TITLES = ['Dans ℝ : un segment', 'Dans ℝ² : un disque', 'Dans ℝ³ : une boule', 'Dans un espace de Hilbert H'];

export function DimensionLadder() {
  const steps = ballLadder();
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(false);
  const reduce = useGame((s) => s.save.settings.reduceMotion);
  const theme = useGame((s) => s.save.settings.theme);

  useEffect(() => {
    if (!playing) return;
    if (i >= 3) {
      setPlaying(false);
      return;
    }
    const h = setTimeout(() => setI(i + 1), reduce ? 600 : 2200);
    return () => clearTimeout(h);
  }, [playing, i, reduce]);

  const s = steps[Math.min(i, 2)]!;
  return (
    <div className="space-y-3" data-testid="ladder" data-ladder-step={i}>
      <div className="flex flex-wrap items-center gap-1.5">
        <Button className="px-2 py-1" disabled={i <= 0} onClick={() => setI(i - 1)} aria-label="Dimension précédente">◀</Button>
        <Button className="px-2 py-1" variant={playing ? 'primary' : 'outline'} onClick={() => (i >= 3 ? (setI(0), setPlaying(true)) : setPlaying((p) => !p))} aria-label={playing ? 'Pause' : 'Lecture de l’échelle des dimensions'}>
          {playing ? '❚❚' : '▶'}
        </Button>
        <Button className="px-2 py-1" disabled={i >= 3} onClick={() => setI(i + 1)} aria-label="Dimension suivante">▶▶</Button>
        <ol className="ml-2 flex flex-wrap gap-1 text-[12px] font-mono">
          {TITLES.map((t, k) => (
            <li key={k}>
              <button type="button" onClick={() => setI(k)} aria-current={k === i ? 'step' : undefined} className={k === i ? 'rounded border border-accent px-1.5 py-0.5' : 'rounded border border-line px-1.5 py-0.5 text-text-3'}>
                {k + 1}. {t}
              </button>
            </li>
          ))}
        </ol>
      </div>

      <div key={i} className="anim-rise">
        {i === 0 && (
          <Plot xDomain={[-4.5, 4.5]} yDomain={[-1, 1]} height={170} ariaLabel="Droite réelle : le segment [−2, 2], le point x et son projeté">
            <Segment a={[-LADDER_RADIUS, 0]} b={[LADDER_RADIUS, 0]} color="var(--st-hyp)" width={6} />
            <Segment a={[s.x[0]!, 0]} b={[s.p[0]!, 0]} color="var(--st-access)" dash="4 4" />
            <Dot x={s.p[0]!} y={0} r={5.5} color="var(--st-miss)" label="PₖX" dy={-12} />
            <Dot x={s.x[0]!} y={0} r={6} color="var(--text)" label="x" dy={-12} />
          </Plot>
        )}
        {i === 1 && (
          <Plot xDomain={X2} yDomain={Y2} height={H2} ariaLabel="Plan : le disque fermé de rayon 2, le point x et son projeté">
            <Region2D K={{ kind: 'disque', center: [0, 0], r: LADDER_RADIUS }} closed />
            <Segment a={[s.x[0]!, s.x[1]!]} b={[s.p[0]!, s.p[1]!]} color="var(--st-access)" dash="4 4" />
            <Dot x={s.p[0]!} y={s.p[1]!} r={5.5} color="var(--st-miss)" label="PₖX" />
            <Dot x={s.x[0]!} y={s.x[1]!} r={6} color="var(--text)" label="x" />
          </Plot>
        )}
        {i === 2 && (
          <Scene3DGate fallback={<LadderSection x={s.x} p={s.p} />}>
            <LadderBall3D x={s.x} p={s.p} theme={theme} />
          </Scene3DGate>
        )}
        {i === 3 && (
          <div className="rounded-md border border-line p-4 text-[14px] space-y-2" data-testid="ladder-hilbert">
            <p>
              <MathText text={String.raw`Dans un espace de Hilbert réel $H$ quelconque, pour $K=\overline B(a,r)$ : $P_Kx=a+r\,\dfrac{x-a}{\|x-a\|}$ si $\|x-a\|>r$. C'est la même formule, toujours exacte.`} />
            </p>
            <p>
              <MathText text={String.raw`Pour un convexe fermé non vide quelconque, il n'y a plus de formule : l'existence vient de la complétude (une suite minimisante est de Cauchy, par l'identité du parallélogramme et la convexité), l'unicité de la convexité.`} />
            </p>
            <p>
              <MathText text={String.raw`Ce qui ne se généralise pas : « fermé et borné entraîne compact » est faux en dimension infinie (dans $\ell^2$, $\|e_n-e_m\|=\sqrt2$). La démonstration n'utilise jamais la compacité.`} />
            </p>
            <Claim status="illustratif">Généralisation par l’énoncé : aucune figure de dimension finie n’est une représentation fidèle de H.</Claim>
          </div>
        )}
      </div>

      {i < 3 && (
        <div className="text-[13px] space-y-1">
          <p>
            <MathText text={String.raw`$x=${vecTex(s.x)}$, $\|x\|=${fmt(Math.hypot(...s.x), 4)}>2$, donc $P_Kx=\dfrac{2x}{\|x\|}=${vecTex(s.p)}$ et $\|x-P_Kx\|=${fmt(s.distance, 4)}$.`} />
          </p>
          <Claim status="exact">Même formule fermée en dimension 1, 2 et 3.</Claim>
        </div>
      )}
    </div>
  );
}

/** Alternative sans WebGL : coupe par le plan contenant le centre et x (fidèle pour une boule). */
function LadderSection({ x, p }: { x: number[]; p: number[] }) {
  const f = radialFrame([0, 0, 0], x);
  const X = toPlane(f, x);
  const P = toPlane(f, p);
  return (
    <Plot xDomain={X2} yDomain={Y2} height={H2} ariaLabel="Coupe de la boule par le plan contenant son centre et x">
      <Region2D K={{ kind: 'disque', center: [0, 0], r: LADDER_RADIUS }} closed />
      <Segment a={X} b={P} color="var(--st-access)" dash="4 4" />
      <Dot x={P[0]} y={P[1]} r={5.5} color="var(--st-miss)" label="PₖX" />
      <Dot x={X[0]} y={X[1]} r={6} color="var(--text)" label="x" />
    </Plot>
  );
}
