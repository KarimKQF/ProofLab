/**
 * Studio « Galerkin en dimension spatiale 2 » (laboratoire E) : surface uₙ(t, x, y),
 * coupes x = x₀ et y = y₀, terme individuel c_m(t)φ_m, comparaison de deux rangs,
 * coefficients et écarts exacts (Parseval). La preuve jouée dans le laboratoire est celle
 * de la dimension 1 : ici, la convergence en dimension 2 est une généralisation affichée,
 * jamais présentée comme démontrée par le joueur.
 */
import { lazy, useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui';
import { activeModes, coefficient2D, gapSq2D, gapSqAt0, MODES_2D, normSq2D, partialSum2D, term2D } from '@/core/visual-reasoning/galerkin2d-scene';
import { BUBBLE_NORM_SQ } from '@/core/visual-reasoning/surfaces';
import { sampleGrid, sliceAtX, sliceAtY } from '@/core/visual-reasoning/sections';
import { fmt } from '@/core/visual-reasoning/types';
import { MathViewStudio, type StudioView } from '@/components/math-visualizations/MathViewStudio';
import { Scene3DGate } from '@/components/math-visualizations/Scene3DGate';
import { ChainDiagram } from '@/components/math-visualizations/ChainDiagram';
import { useGame } from '@/storage/store';
import { Claim, Curve, fr, MathText, Plot, Segment, Slider } from '@/labs/kit';
import { LevelMap } from '../sobolev/SobolevViews';

const SquareSurface3D = lazy(() => import('../common/SquareSurface3D'));
const N_MAX = 60;
const T_MAX = 0.06;

export function Galerkin2DStudio({ proofComplete }: { proofComplete: boolean }) {
  const reduce = useGame((s) => s.save.settings.reduceMotion);
  const [n, setN] = useState(4);
  const [n2, setN2] = useState(20);
  const [t, setT] = useState(0);
  const [term, setTerm] = useState(0);
  const [x0, setX0] = useState(0.3);
  const [y0, setY0] = useState(0.5);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing) return;
    if (t >= T_MAX) {
      setPlaying(false);
      return;
    }
    const h = setTimeout(() => setT((v) => Math.min(T_MAX, Math.round((v + 0.002) * 1000) / 1000)), reduce ? 40 : 120);
    return () => clearTimeout(h);
  }, [playing, t, reduce]);

  const u = useMemo(() => partialSum2D(n, t), [n, t]);
  const uRef = useMemo(() => partialSum2D(n2, t), [n2, t]);
  const diff = useMemo(() => (x: number, y: number) => uRef(x, y) - u(x, y), [u, uRef]);
  const termF = useMemo(() => term2D(term, t), [term, t]);
  const grid = useMemo(() => sampleGrid(u, 49, [0, 1], [0, 1], `g2:${n}:${t}`), [u, n, t]);
  const diffGrid = useMemo(() => sampleGrid(diff, 49, [0, 1], [0, 1], `g2d:${n}:${n2}:${t}`), [diff, n, n2, t]);
  const termGrid = useMemo(() => sampleGrid(termF, 49, [0, 1], [0, 1], `g2t:${term}:${t}`), [termF, term, t]);
  const amp = Math.max(1e-6, Math.abs(grid.max), Math.abs(grid.min), 1 / 16) * 1.1;
  const gap = gapSq2D(n, t);
  const m = MODES_2D[term]!;

  const surface = (g: typeof grid, f: (x: number, y: number) => number, label: string, a = amp) => (
    <Scene3DGate fallback={<LevelMap grid={g} state={{ x0, y0 }} grad={null} highlight={null} />}>
      <SquareSurface3D grid={g} f={f} s0={x0} xi0={y0} amp={a} label={label} axisLabels={['x', 'y', 'u']} />
    </Scene3DGate>
  );

  const views: StudioView[] = [
    {
      id: 'surface',
      title: 'Surface uₙ(t)',
      render: () => (
        <div data-testid="g2-surface">
          {surface(grid, u, `Surface de u_n(t, x, y) pour n = ${n}`)}
          <p className="mt-1 text-[12px] text-text-3">
            uₙ(t) avec n = {n} modes ({activeModes(n)} de coefficient non nul), t = {fr(t, 3)}. Courbes orange : coupes x = x₀ et y = y₀. Hauteur fixe : la décroissance en t se voit.
          </p>
        </div>
      ),
    },
    {
      id: 'coupes',
      title: 'Coupes x₀ et y₀',
      render: () => {
        const cx = sliceAtX(u, x0, [0, 1], 160);
        const cxr = sliceAtX(uRef, x0, [0, 1], 160);
        const cy = sliceAtY(u, y0, [0, 1], 160);
        const cyr = sliceAtY(uRef, y0, [0, 1], 160);
        return (
          <div className="grid gap-3 @lg:grid-cols-2" data-testid="g2-cuts">
            <figure>
              <figcaption className="mb-1 text-[13px]"><MathText text={String.raw`$y\mapsto u_n(t,x_0,y)$ et $u_{n'}(t,x_0,y)$`} /></figcaption>
              <Plot xDomain={[0, 1]} yDomain={[-amp * 0.2, amp]} height={240} ariaLabel="Coupe x = x0">
                <Curve points={cxr} color="var(--text-3)" dash="5 4" />
                <Curve points={cx} color="var(--st-access)" />
              </Plot>
            </figure>
            <figure>
              <figcaption className="mb-1 text-[13px]"><MathText text={String.raw`$x\mapsto u_n(t,x,y_0)$ et $u_{n'}(t,x,y_0)$`} /></figcaption>
              <Plot xDomain={[0, 1]} yDomain={[-amp * 0.2, amp]} height={240} ariaLabel="Coupe y = y0">
                <Curve points={cyr} color="var(--text-3)" dash="5 4" />
                <Curve points={cy} color="var(--st-proved)" />
              </Plot>
            </figure>
            <p className="text-[12px] text-text-3 @lg:col-span-2">Trait plein : n = {n} ; tirets : n′ = {n2} (rang de comparaison).</p>
          </div>
        );
      },
    },
    {
      id: 'terme',
      title: 'Terme individuel',
      render: () => (
        <div className="space-y-2" data-testid="g2-term">
          <Slider label="Rang m du terme (modes rangés par valeur propre)" value={term} min={0} max={24} step={1} onChange={(v) => setTerm(Math.round(v))} format={(v) => String(v + 1)} />
          <p className="text-[13px]">
            <MathText
              text={String.raw`$c_m(t)\varphi_m$ avec $(k,l)=(${m.k},${m.l})$, $\lambda_m=\pi^2(k^2+l^2)=${fmt(m.lambda, 2)}$, $c_m(t)=e^{-\lambda_mt}b_m=${fmt(coefficient2D(m, t), 6)}$${coefficient2D(m, 0) === 0 ? String.raw` — nul : $k$ ou $l$ est pair, et $u_0$ est symétrique par rapport aux médianes` : ''}.`}
            />
          </p>
          {surface(termGrid, termF, `Terme individuel numéro ${term + 1}`, Math.max(1e-6, Math.abs(termGrid.max), Math.abs(termGrid.min)) * 1.1)}
        </div>
      ),
    },
    {
      id: 'comparaison',
      title: 'Comparer n et n′',
      render: () => (
        <div className="space-y-2" data-testid="g2-compare">
          <p className="text-[13px]">
            <MathText text={String.raw`$u_{n'}(t)-u_n(t)$ pour $n=${n}$, $n'=${n2}$ : $\|u_{n'}-u_n\|^2=\sum_{n<m\le n'}c_m(t)^2=${fmt(Math.max(0, normSq2D(n2, t) - normSq2D(n, t)), 10)}$.`} />
          </p>
          {surface(diffGrid, diff, `Différence entre u_${n2} et u_${n}`, Math.max(1e-9, Math.abs(diffGrid.max), Math.abs(diffGrid.min)) * 1.1)}
          <Claim status="exact">Parseval : la norme de la différence est la somme des carrés des coefficients omis.</Claim>
        </div>
      ),
    },
    {
      id: 'coefficients',
      title: 'Coefficients et écarts',
      render: () => {
        const cs = MODES_2D.slice(0, Math.max(n2, n)).map((mm, i) => [i + 1, coefficient2D(mm, t)] as [number, number]);
        const cmax = Math.max(1e-12, ...cs.map((c) => Math.abs(c[1])));
        return (
          <div className="space-y-3" data-testid="g2-coefficients">
            <Plot xDomain={[0, cs.length + 1]} yDomain={[-cmax * 0.1, cmax * 1.1]} height={200} ariaLabel="Coefficients c_m(t)">
              {cs.map(([i, c]) => (
                <Segment key={i} a={[i, 0]} b={[i, c]} color={i <= n ? 'var(--st-access)' : 'var(--text-3)'} width={3} />
              ))}
            </Plot>
            <dl className="space-y-1 text-[13px]">
              <div className="flex justify-between gap-3">
                <dt><MathText text={String.raw`$\|u_0-P_nu_0\|^2=\tfrac1{900}-\sum_{m\le n}b_m^2$`} /></dt>
                <dd className="tabular">{fmt(gapSqAt0(n), 12)}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt><MathText text={String.raw`$\|u(t)-u_n(t)\|^2$ (somme jusqu'à $N=225$)`} /></dt>
                <dd className="tabular">{fmt(gap.value, 12)}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt>Majorant rigoureux du reste au-delà de N</dt>
                <dd className="tabular">{gap.remainderBound.toExponential(2)}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt><MathText text={String.raw`$\|u_n(t)\|^2\le\|u_n(0)\|^2\le\|u_0\|^2=\tfrac1{900}$`} /></dt>
                <dd className="tabular">{fmt(normSq2D(n, t), 8)} ≤ {fmt(normSq2D(n, 0), 8)} ≤ {fmt(BUBBLE_NORM_SQ, 8)}</dd>
              </div>
            </dl>
            <Claim status="exact">Coefficients b(k, l) = 32/(π⁶k³l³) pour k, l impairs (calcul exact) ; écarts par Parseval.</Claim>
          </div>
        );
      },
    },
    {
      id: 'statut',
      title: 'Statut',
      render: () => (
        <div className="space-y-2 text-[13.5px]" data-testid="g2-status" data-proof={proofComplete ? 'dimension-1-demontree' : 'non-demontree'}>
          <ChainDiagram
            testId="g2-chain"
            nodes={[{ tex: 'V_n' }, { tex: String.raw`V=H^1_0(\Omega)` }, { tex: String.raw`H=L^2(\Omega)` }, { tex: String.raw`V'=H^{-1}(\Omega)` }]}
            arrows={[
              { tex: String.raw`\subset`, note: 'dimension finie n' },
              { tex: String.raw`\hookrightarrow`, note: 'continue, dense, compacte' },
              { tex: String.raw`\hookrightarrow`, note: 'continue, dense' },
            ]}
            caption="Espaces du problème : Vₙ = vect(φ₁, …, φₙ), et Pₙ : H → Vₙ la projection orthogonale. Ici uₙ(t) = Pₙu(t)."
          />
          <p>
            <MathText text={String.raw`Dans la base propre, le système de Galerkin est diagonal : $c_m'+\lambda_mc_m=0$, $c_m(0)=b_m$, donc $u_n(t)=P_nu(t)$ exactement.`} />
          </p>
          <p className={proofComplete ? 'text-text-2' : 'text-miss'}>
            {proofComplete
              ? 'Tu as démontré les dix étapes en dimension 1. Le même argument vaut sur le carré avec la base φ_{k,l} : c’est une généralisation, affichée ici, que ce laboratoire ne te fait pas redémontrer.'
              : 'Affichage d’exploration : la convergence uₙ → u n’est pas démontrée par cette figure. La démonstration se joue dans les dix étapes ci-dessus (en dimension 1).'}
          </p>
          <Claim status="illustratif">Convergence en dimension 2 : illustrée et calculée, non démontrée ici.</Claim>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-3" data-testid="g2-studio">
      <div className="grid gap-3 sm:grid-cols-[auto_1fr_1fr_1fr] sm:items-end">
        <Button className="px-2 py-1" onClick={() => (t >= T_MAX ? (setT(0), setPlaying(true)) : setPlaying((p) => !p))} aria-label={playing ? 'Pause' : 'Animer en t'}>
          {playing ? '❚❚' : '▶'}
        </Button>
        <Slider label="Nombre de modes n" value={n} min={1} max={N_MAX} step={1} onChange={(v) => setN(Math.round(v))} />
        <Slider label="Rang de comparaison n′" value={n2} min={1} max={N_MAX} step={1} onChange={(v) => setN2(Math.round(v))} />
        <Slider label="Temps t" value={t} min={0} max={T_MAX} step={0.001} onChange={setT} format={(v) => fr(v, 3)} />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <Slider label="Coupe x₀" value={x0} min={0.02} max={0.98} step={0.01} onChange={setX0} format={(v) => fr(v, 2)} />
        <Slider label="Coupe y₀" value={y0} min={0.02} max={0.98} step={0.01} onChange={setY0} format={(v) => fr(v, 2)} />
      </div>
      <MathViewStudio id="galerkin-2d" views={views} initial={['surface', 'coefficients']} weights={{ surface: 1.4, terme: 1.3, comparaison: 1.3, coupes: 1.3, coefficients: 1.1 }} />
      <p className="text-[12px] text-text-3">Modes (k, l), 1 ≤ k, l ≤ 15, rangés par valeur propre croissante ; u₀ = x(1−x)y(1−y), ‖u₀‖² = 1/900.</p>
    </div>
  );
}
