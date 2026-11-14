/**
 * Laboratoire B : Riesz et Lax–Milgram dans ℝ² et ℝ³.
 *
 * Un seul état (G, A, c, v) alimente toutes les vues : géométrie (ellipse ou ellipsoïde
 * unité de G, lignes ou plans de niveau de ℓ, tangence en w/‖w‖_G), changement de base
 * de Cholesky, forme linéaire contre forme quadratique, équations, hypothèses. Les
 * hypothèses sont décidées exactement (Sylvester, arithmétique rationnelle) et doivent
 * être établies par le joueur avant que les conclusions ne soient présentées comme établies.
 */
import { lazy, useEffect, useMemo, useState } from 'react';
import { Button, Chip, cx } from '@/components/ui';
import { MathText, Tex } from '@/components/Math';
import * as Q from '@/core/math/rational';
import { isCoerciveWith, isPositiveSemiDefinite, matMul as qMatMul, matScale, matSub, solve, transpose as qTranspose, type Matrix } from '@/core/math/matrix';
import type { M2, V2 } from '@/core/math/forms';
import {
  choleskyMorph,
  PRESETS_3D,
  rieszReadout,
  rieszSection,
  toQMatrix,
  unitBallMatrix,
  type RieszPreset,
} from '@/core/visual-reasoning/riesz-scene';
import { dot, scale, type Mat, type Vec } from '@/core/visual-reasoning/linalg';
import type { SceneExplanations } from '@/core/visual-reasoning/types';
import { MathViewStudio, type StudioView } from '@/components/math-visualizations/MathViewStudio';
import { EquationsPanel, HypothesesPanel, MeasuresPanel } from '@/components/math-visualizations/panels';
import { Scene3DGate } from '@/components/math-visualizations/Scene3DGate';
import { ChainDiagram } from '@/components/math-visualizations/ChainDiagram';
import { useGame } from '@/storage/store';
import { Claim, fr, LabShell, Panel, Slider } from '../kit';
import { RieszLegend, RieszPlaneFigure } from '../visual-scenes/riesz/RieszPlane';
import { FormsCompare } from '../visual-scenes/riesz/FormsCompare';

const Riesz3D = lazy(() => import('../visual-scenes/riesz/Riesz3D'));

interface Preset {
  id: string;
  label: string;
  g: M2;
  a: M2;
  c: V2;
  /** Constante de coercivité exacte. */
  alpha?: string;
}

export const PRESETS: Preset[] = [
  { id: 'euclidien-sym', label: 'Euclidien, forme symétrique', g: [[1, 0], [0, 1]], a: [[2, 0], [0, 1]], c: [1, 1.5], alpha: '1' },
  { id: 'non-symetrique', label: 'Coercive et non symétrique', g: [[1, 0], [0, 1]], a: [[2, 1], [-1, 2]], c: [1.5, -1], alpha: '2' },
  { id: 'g-oblique', label: 'Produit scalaire oblique', g: [[2, 0.5], [0.5, 1]], a: [[2, 0.5], [0.5, 1]], c: [1, 2], alpha: '1' },
  { id: 'inversible-non-coercive', label: 'Inversible, non coercive', g: [[1, 0], [0, 1]], a: [[1, 0], [0, -1]], c: [1, 1] },
  { id: 'singuliere', label: 'Forme dégénérée', g: [[1, 0], [0, 1]], a: [[1, 1], [1, 1]], c: [1, -1] },
];

interface Config {
  g: Mat;
  a: Mat;
  c: Vec;
}
const cloneConfig = (p: { g: readonly (readonly number[])[]; a: readonly (readonly number[])[]; c: readonly number[] }): Config => ({
  g: p.g.map((r) => [...r]),
  a: p.a.map((r) => [...r]),
  c: [...p.c],
});

/** Les figures reçoivent plus de largeur que les panneaux de texte. */
const STUDIO_WEIGHTS: Record<string, number> = { geometrie: 1.6, transformation: 1.4, formes: 1.6 };

const EXPLANATIONS = (dim: 2 | 3): SceneExplanations => ({
  why:
    dim === 2
      ? 'Un produit scalaire est entièrement décrit par sa boule unité : changer G déforme le disque en ellipse. Une forme linéaire est décrite par ses lignes de niveau, droites parallèles équidistantes. Le vecteur de Riesz relie les deux : c’est la direction G-orthogonale au noyau de ℓ, et la ligne ℓ = ‖ℓ‖ touche la boule unité exactement en w/‖w‖_G.'
      : 'En dimension 3, la boule unité de G est un ellipsoïde et les niveaux de ℓ sont des plans parallèles. Le plan ℓ = ‖ℓ‖ est tangent à l’ellipsoïde en w/‖w‖_G. Sans WebGL, la coupe par un plan contenant w montre fidèlement cette tangence.',
  proofLink:
    'Riesz se démontre en projetant sur le noyau de ℓ (fermé, car ℓ est continue) : w est orthogonal au noyau. Lax–Milgram se ramène à Riesz puis à un point fixe contractant, où la coercivité donne l’injectivité et la fermeture de l’image. Les hypothèses du panneau sont exactement celles de ces deux preuves ; les conclusions ne sont dites établies qu’une fois ces hypothèses vérifiées par toi.',
  generalize:
    'Dans un espace de Hilbert quelconque, le même énoncé vaut : toute forme linéaire continue est ⟨·, w⟩ pour un unique w, et ‖ℓ‖ = ‖w‖. En dimension infinie, la continuité de ℓ n’est plus automatique, et la boule unité n’est plus compacte : aucune figure n’en est une représentation fidèle.',
});

function Hypothesis({ state, title, children }: { state: 'ok' | 'missing' | 'todo'; title: string; children: React.ReactNode }) {
  const color = state === 'ok' ? 'var(--st-hyp)' : state === 'missing' ? 'var(--st-miss)' : 'var(--text-3)';
  const label = state === 'ok' ? 'Établie' : state === 'missing' ? 'Hypothèse manquante' : 'À établir';
  return (
    <div className="rounded-md border border-line p-3" style={{ borderLeft: `3px solid ${color}` }}>
      <div className="flex justify-between gap-2 mb-1.5">
        <span className="text-[14px] font-medium"><MathText text={title} /></span>
        <span className="font-mono text-[11px]" style={{ color }}>{label}</span>
      </div>
      {children}
    </div>
  );
}

const inputCls = 'w-24 rounded-md border border-line-strong bg-surface-2 px-2 py-1 font-mono text-[13px] tabular';

export function RieszLab() {
  const theme = useGame((s) => s.save.settings.theme);
  const reduce = useGame((s) => s.save.settings.reduceMotion);
  const [dim, setDim] = useState<2 | 3>(2);
  const [preset2, setPreset2] = useState(PRESETS[1]!.id);
  const [preset3, setPreset3] = useState(PRESETS_3D[1]!.id);
  const [cfg2, setCfg2] = useState<Config>(() => cloneConfig(PRESETS[1]!));
  const [cfg3, setCfg3] = useState<Config>(() => cloneConfig(PRESETS_3D[1]!));
  const [v2, setV2] = useState<Vec>([2, 1]);
  const [v3, setV3] = useState<Vec>([1, 0.5, 1]);
  const [free, setFree] = useState(false);
  const [morphT, setMorphT] = useState(0);
  const [morphPlaying, setMorphPlaying] = useState(false);

  const [minorInputs, setMinorInputs] = useState<string[]>(['', '']);
  const [gOk, setGOk] = useState<boolean | null>(null);
  const [mInput, setMInput] = useState('');
  const [mOk, setMOk] = useState<boolean | null>(null);
  const [alphaInput, setAlphaInput] = useState('');
  const [alphaOk, setAlphaOk] = useState<boolean | null>(null);
  const [lOk, setLOk] = useState(false);

  const cfg = dim === 2 ? cfg2 : cfg3;
  const v = dim === 2 ? v2 : v3;
  const n = dim;

  function resetChecks() {
    setGOk(null);
    setMOk(null);
    setAlphaOk(null);
    setLOk(false);
    setMinorInputs(['', '']);
    setMInput('');
    setAlphaInput('');
  }
  const setCfg = (next: Config) => {
    (dim === 2 ? setCfg2 : setCfg3)(next);
    resetChecks();
  };
  const switchDim = (d: 2 | 3) => {
    setDim(d);
    resetChecks();
  };

  const readout = useMemo(() => rieszReadout({ ...cfg, v }, { g: gOk === true, l: lOk, m: mOk === true, alpha: alphaOk === true }), [cfg, v, gOk, lOk, mOk, alphaOk]);
  const ex = readout.exact;
  const d = readout.derived;
  const rieszReady = ex.spd && gOk === true && lOk;
  const lmReady = rieszReady && mOk === true && alphaOk === true && ex.coercive;
  const showW = free || rieszReady;
  const showU = free ? Boolean(d.u) : lmReady;

  // Animation du changement de base x ↦ Lᵀx (préférence d'affichage, sans effet sur la progression).
  useEffect(() => {
    if (!morphPlaying) return;
    if (morphT >= 1) {
      setMorphPlaying(false);
      return;
    }
    const h = setTimeout(() => setMorphT((t) => Math.min(1, Math.round((t + 0.05) * 100) / 100)), reduce ? 20 : 60);
    return () => clearTimeout(h);
  }, [morphPlaying, morphT, reduce]);

  const qG = toQMatrix(cfg.g);
  const qA = toQMatrix(cfg.a);

  const verifyG = () => {
    const ok = ex.minors.slice(1).every((m, k) => {
      const entered = Q.parseRational(minorInputs[k] ?? '');
      return Boolean(entered && Q.eq(entered, m));
    });
    setGOk(ok && ex.spd);
  };

  const verifyM = () => {
    const m2 = Q.parseRational(mInput);
    if (!m2 || !Q.isPos(m2)) return setMOk(false);
    // M²G − AᵀG⁻¹A semi-définie positive, pour la norme ‖·‖_G.
    const cols = Array.from({ length: n }, (_, j) => solve(qG, Array.from({ length: n }, (_, i) => (i === j ? Q.ONE : Q.ZERO))));
    if (cols.some((col) => !col)) return setMOk(false);
    const gInv: Matrix = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => cols[j]![i]!));
    const lhs = matSub(matScale(m2, qG), qMatMul(qMatMul(qTranspose(qA), gInv), qA));
    const sym = lhs.every((r, i) => r.every((x, j) => Q.eq(x, lhs[j]![i]!)));
    setMOk(sym && isPositiveSemiDefinite(lhs));
  };

  const verifyAlpha = () => {
    const al = Q.parseRational(alphaInput);
    setAlphaOk(Boolean(al && Q.isPos(al) && isCoerciveWith(qA, al, qG)));
  };

  const slider = (label: string, value: number, onChange: (x: number) => void, min = -3, max = 3, step = 0.25) => (
    <Slider key={label} label={<Tex>{label}</Tex>} value={value} min={min} max={max} step={step} format={(x) => fr(x, 2)} onChange={onChange} />
  );
  const setG = (i: number, j: number, x: number) => setCfg({ ...cfg, g: cfg.g.map((r, k) => r.map((y, l) => ((k === i && l === j) || (k === j && l === i) ? x : y))) });
  const setA = (i: number, j: number, x: number) => setCfg({ ...cfg, a: cfg.a.map((r, k) => r.map((y, l) => (k === i && l === j ? x : y))) });
  const setC = (i: number, x: number) => setCfg({ ...cfg, c: cfg.c.map((y, k) => (k === i ? x : y)) });

  const section = useMemo(() => (dim === 3 && d.w ? rieszSection(cfg.g, cfg.c, d.w) : null), [dim, d.w, cfg]);
  const ballMatrix = useMemo(() => (dim === 3 && ex.spd ? unitBallMatrix(cfg.g) : null), [dim, ex.spd, cfg.g]);
  const morph = useMemo(() => (dim === 2 && ex.spd ? choleskyMorph(cfg.g, morphT) : null), [dim, ex.spd, cfg.g, morphT]);

  const sectionFigure = section ? (
    <div data-testid="riesz-section">
      <RieszPlaneFigure
        g={section.g2}
        c={section.c2}
        w={section.w2}
        u={null}
        tangency={scale(1 / d.dualNorm, section.w2)}
        dualNorm={d.dualNorm}
        showW={showW}
        showU={false}
        ariaLabel="Coupe par un plan contenant w : ellipse de coupe et droites de niveau de ℓ"
      />
      <p className="mt-1 text-[12.5px] text-text-3">Coupe par le plan vectoriel contenant w : l’ellipse de coupe et la droite ℓ = ‖ℓ‖ y sont tangentes en w/‖w‖_G (fidèle, car w appartient au plan). La solution u n’est pas dans ce plan en général.</p>
    </div>
  ) : (
    <p className="text-[13px] text-miss">G n’est pas définie positive : il n’y a pas de boule unité bornée à représenter.</p>
  );

  const geometry =
    dim === 2 ? (
      <div>
        <RieszPlaneFigure
          g={ex.spd ? cfg.g : null}
          c={cfg.c}
          w={d.w}
          u={d.u}
          tangency={d.tangency}
          dualNorm={d.dualNorm}
          showW={showW}
          showU={showU}
          v={v2}
          onV={setV2}
          ariaLabel="Plan muni du produit scalaire G : boule unité, lignes de niveau de ℓ, vecteur de Riesz et solution"
        />
        <RieszLegend />
      </div>
    ) : (
      <Scene3DGate fallback={sectionFigure}>
        <Riesz3D ballMatrix={ballMatrix} c={cfg.c} dualNorm={d.dualNorm} w={d.w} u={d.u} tangency={d.tangency} showW={showW} showU={showU} v={v3} theme={theme} />
      </Scene3DGate>
    );

  const views: StudioView[] = [
    { id: 'geometrie', title: dim === 2 ? 'Géométrie (plan)' : 'Géométrie (espace)', render: () => geometry },
    ...(dim === 3 ? [{ id: 'coupe', title: 'Coupe par w', render: () => sectionFigure }] : []),
    ...(dim === 2
      ? [
          {
            id: 'transformation',
            title: 'Changement de base',
            render: () =>
              morph ? (
                <div className="space-y-2" data-testid="morph">
                  <div className="flex flex-wrap items-center gap-2">
                    <Button className="px-2 py-1" onClick={() => (morphT >= 1 ? (setMorphT(0), setMorphPlaying(true)) : setMorphPlaying((p) => !p))} aria-label={morphPlaying ? 'Pause' : 'Lecture du changement de base'}>
                      {morphPlaying ? '❚❚' : '▶'}
                    </Button>
                    <div className="min-w-[180px] flex-1">
                      <Slider label="t (de x à y = Lᵀx)" value={morphT} min={0} max={1} step={0.05} onChange={setMorphT} format={(x) => fr(x, 2)} />
                    </div>
                  </div>
                  <RieszPlaneFigure g={cfg.g} c={cfg.c} w={d.w} u={null} tangency={d.tangency} dualNorm={d.dualNorm} showW={showW} showU={false} v={v2} morph={morph} ariaLabel="Image des objets par x ↦ ((1 − t)I + tLᵀ)x" />
                  <p className="text-[12.5px] text-text-2">
                    <MathText text={String.raw`Avec $G=LL^{\mathsf T}$ (Cholesky) et $y=L^{\mathsf T}x$ : $\langle x,x'\rangle_G=y^{\mathsf T}y'$. À $t=1$, la boule unité de $G$ devient le disque euclidien et les droites de niveau de $\ell$ restent des droites : les angles « G-droits » deviennent des angles droits ordinaires.`} />
                  </p>
                  <Claim status="exact">Image exacte des objets par une application linéaire (interpolation affichée pour t entre 0 et 1).</Claim>
                </div>
              ) : (
                <p className="text-[13px] text-miss">G n’est pas définie positive : pas de factorisation de Cholesky.</p>
              ),
          },
          { id: 'formes', title: 'Linéaire / quadratique', render: () => <FormsCompare a={cfg.a} c={cfg.c} v={v2} /> },
        ]
      : []),
    {
      id: 'equations',
      title: 'Équations et mesures',
      render: () => (
        <div className="space-y-4">
          <EquationsPanel equations={readout.equations} />
          <div className="border-t border-line pt-3">
            <MeasuresPanel measures={readout.measures} />
            <p className="mt-1.5 text-[12px] text-text-3">L’égalité ℓ(v) = ⟨v, w⟩_G observée pour un v donné illustre une identité démontrée pour tout v.</p>
          </div>
        </div>
      ),
    },
    { id: 'hypotheses', title: 'Hypothèses', render: () => <HypothesesPanel hypotheses={readout.hypotheses} conclusions={readout.conclusions} /> },
    {
      id: 'abstrait',
      title: 'Schéma abstrait',
      render: () => (
        <div className="space-y-4">
          <ChainDiagram
            testId="riesz-chain"
            nodes={[{ tex: String.raw`H=(\mathbb R^${dim},\langle\cdot,\cdot\rangle_G)` }, { tex: "H'", note: 'formes linéaires continues' }]}
            arrows={[
              {
                tex: String.raw`J:\,w\mapsto\langle\cdot,w\rangle_G`,
                state: !ex.spd ? 'absent' : rieszReady ? 'etabli' : 'suppose',
                note: !ex.spd ? 'G n’est pas un produit scalaire' : rieszReady ? 'isométrie bijective (hypothèses établies)' : 'isométrie bijective, une fois les hypothèses établies',
              },
            ]}
            caption="Théorème de Riesz : J est une isométrie bijective, et ‖ℓ‖ = ‖J⁻¹ℓ‖ = ‖w‖_G."
          />
          <ChainDiagram
            testId="lm-chain"
            nodes={[{ tex: 'V=H' }, { tex: "V'" }]}
            arrows={[
              {
                tex: String.raw`\mathcal A:\,u\mapsto a(u,\cdot)`,
                state: !ex.coercive ? 'absent' : lmReady ? 'etabli' : 'suppose',
                note: !ex.coercive ? 'non coercive : Lax–Milgram ne dit rien' : lmReady ? 'isomorphisme, ‖𝒜⁻¹‖ ≤ 1/α' : 'isomorphisme si a est continue et coercive',
              },
            ]}
            caption="Lax–Milgram : 𝒜 est un isomorphisme de V sur V′ ; la solution est u = 𝒜⁻¹ℓ. Schéma valable en toute dimension, sans figure."
          />
        </div>
      ),
    },
  ];

  const presets = dim === 2 ? PRESETS : PRESETS_3D;
  const presetId = dim === 2 ? preset2 : preset3;
  const loadPreset = (p: Preset | RieszPreset) => {
    if (dim === 2) setPreset2(p.id);
    else setPreset3(p.id);
    setCfg(cloneConfig(p));
  };
  const idx = (i: number) => '₁₂₃'[i];

  return (
    <LabShell
      eyebrow="B"
      title="Riesz et Lax–Milgram"
      intro={<MathText text={String.raw`Sur $\mathbb R^${dim}$ muni de $\langle x,y\rangle_G=x^{\mathsf T}Gy$, la forme $a(x,y)=x^{\mathsf T}Ay$ et $\ell(x)=c^{\mathsf T}x$. Les conclusions ne sont établies qu'une fois les hypothèses vérifiées : coercivité et symétrie sont indépendantes.`} />}
    >
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="min-w-0 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[13px] text-text-2">Dimension</span>
            <div className="flex gap-1" role="group" aria-label="Dimension de l’espace">
              <Button className="px-2.5 py-1" variant={dim === 2 ? 'primary' : 'outline'} aria-pressed={dim === 2} onClick={() => switchDim(2)}>ℝ²</Button>
              <Button className="px-2.5 py-1" variant={dim === 3 ? 'primary' : 'outline'} aria-pressed={dim === 3} onClick={() => switchDim(3)}>ℝ³</Button>
            </div>
            <label className="ml-auto flex items-center gap-2 text-[12.5px] text-text-3 cursor-pointer">
              <input type="checkbox" checked={free} onChange={(e) => setFree(e.target.checked)} />
              Exploration libre : afficher w et u sans établir les hypothèses (rien n’est alors établi par toi)
            </label>
          </div>
          <MathViewStudio id="riesz" views={views} initial={['geometrie', 'equations']} explanations={EXPLANATIONS(dim)} weights={STUDIO_WEIGHTS} />
          {!ex.coercive && (
            <Panel title="Hypothèse manquante" className="anim-rise">
              <p className="text-[13.5px]">
                <MathText text={String.raw`La partie symétrique de $A$ n'est pas définie positive : $a$ n'est pas coercive, Lax–Milgram ne peut pas être invoqué.`} />
              </p>
              {d.u ? (
                <p className="text-[13.5px] mt-1.5 text-text-2" data-case="inversible">
                  <MathText text={String.raw`Ici $A$ est inversible : le système $A^{\mathsf T}u=c$ a une unique solution, mais ce n'est pas une conséquence de Lax–Milgram. La coercivité est suffisante, non nécessaire.`} />
                </p>
              ) : (
                <p className="text-[13.5px] mt-1.5 text-text-2" data-case="singuliere">
                  <MathText text={String.raw`Ici $A$ est singulière : selon $c$, le système $A^{\mathsf T}u=c$ n'a aucune solution, ou en a une infinité. La conclusion de Lax–Milgram est fausse pour cette forme.`} />
                </p>
              )}
              <Chip className="mt-2">a(x, x) ne dépend que de la partie symétrique de A</Chip>
            </Panel>
          )}
        </div>

        <div className="space-y-4">
          <Panel title="Configuration">
            <div className="flex flex-wrap gap-1.5 mb-3" role="group" aria-label="Configurations">
              {presets.map((p) => (
                <Button key={p.id} variant={presetId === p.id ? 'primary' : 'outline'} aria-pressed={presetId === p.id} onClick={() => loadPreset(p)}>
                  {p.label}
                </Button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
              {Array.from({ length: n }, (_, i) => slider(`G_{${i + 1}${i + 1}}`, cfg.g[i]![i]!, (x) => setG(i, i, x), 0.25, 4))}
              {Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => (j > i ? slider(`G_{${i + 1}${j + 1}}=G_{${j + 1}${i + 1}}`, cfg.g[i]![j]!, (x) => setG(i, j, x), -2, 2) : null))).flat()}
              {Array.from({ length: n }, (_, i) => slider(`c_${i + 1}`, cfg.c[i]!, (x) => setC(i, x)))}
            </div>
            <details className="mt-2" open={dim === 2}>
              <summary className="cursor-pointer text-[12.5px] text-text-2">Coefficients de A ({n * n})</summary>
              <div className="mt-1.5 grid grid-cols-2 gap-x-4 gap-y-1.5">
                {Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => slider(`A_{${i + 1}${j + 1}}`, cfg.a[i]![j]!, (x) => setA(i, j, x)))).flat()}
              </div>
            </details>
            {dim === 3 && (
              <fieldset className="mt-2 space-y-1.5" aria-label="Vecteur de test v">
                <legend className="text-[12.5px] text-text-2">Vecteur de test v</legend>
                {[0, 1, 2].map((i) => (
                  <Slider key={i} label={`v${idx(i)}`} value={v3[i]!} min={-3} max={3} step={0.05} onChange={(x) => setV3((old) => old.map((y, k) => (k === i ? x : y)))} format={(x) => fr(x, 2)} />
                ))}
              </fieldset>
            )}
          </Panel>

          <Panel title="Établir les hypothèses">
            <div className="space-y-3">
              <Hypothesis state={gOk === true ? 'ok' : !ex.spd ? 'missing' : 'todo'} title="$G$ définit un produit scalaire">
                <p className="text-[12.5px] text-text-2 mb-1.5">
                  <MathText
                    text={
                      dim === 2
                        ? String.raw`Symétrique par construction. Critère de Sylvester : $G_{11}>0$ et $\det G>0$. Saisis $\det G$.`
                        : String.raw`Symétrique par construction. Critère de Sylvester : $\Delta_1=G_{11}>0$, $\Delta_2>0$, $\Delta_3=\det G>0$. Saisis $\Delta_2$ et $\Delta_3$.`
                    }
                  />
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  {Array.from({ length: n - 1 }, (_, k) => (
                    <input
                      key={k}
                      aria-label={dim === 2 ? 'Déterminant de G' : `Mineur dominant Δ${k + 2}`}
                      className={inputCls}
                      value={minorInputs[k] ?? ''}
                      onChange={(e) => setMinorInputs((old) => old.map((x, i) => (i === k ? e.target.value : x)))}
                      placeholder={dim === 2 ? 'det G' : `Δ${k + 2}`}
                    />
                  ))}
                  <Button onClick={verifyG}>Vérifier</Button>
                </div>
                {gOk === false && <p className="text-[12.5px] text-invalid mt-1" role="status">{ex.spd ? 'Une valeur saisie n’est pas exacte.' : 'G n’est pas définie positive : ceci n’est pas un produit scalaire.'}</p>}
              </Hypothesis>

              <Hypothesis state={lOk ? 'ok' : 'todo'} title="$\ell$ est une forme linéaire continue">
                <p className="text-[12.5px] text-text-2 mb-1.5"><MathText text={String.raw`En dimension finie, toute forme linéaire est continue. C'est un argument à part entière, pas une évidence : en dimension infinie il faut l'établir.`} /></p>
                <Button onClick={() => setLOk(true)} disabled={lOk}>Dimension finie : continue</Button>
              </Hypothesis>

              <Hypothesis state={mOk === true ? 'ok' : 'todo'} title="$a$ est continue">
                <p className="text-[12.5px] text-text-2 mb-1.5"><MathText text={String.raw`Propose $M^2$ tel que $|a(x,y)|\le M\|x\|_G\|y\|_G$. Vérification exacte : $M^2G-A^{\mathsf T}G^{-1}A$ est semi-définie positive.`} /></p>
                <div className="flex items-center gap-2">
                  <input aria-label="Valeur de M au carré" className={inputCls} value={mInput} onChange={(e) => setMInput(e.target.value)} placeholder="M²" />
                  <Button onClick={verifyM}>Vérifier</Button>
                </div>
                {mOk === false && <p className="text-[12.5px] text-invalid mt-1" role="status">Cette valeur ne majore pas la forme (test exact).</p>}
                {mOk === true && <p className="text-[12.5px] text-text-3 mt-1">Plus petite constante : <span className="tabular">M ≈ {fr(d.M)}</span> (valeur numérique).</p>}
              </Hypothesis>

              <Hypothesis state={alphaOk === true ? 'ok' : !ex.coercive ? 'missing' : 'todo'} title="$a$ est coercive">
                <p className="text-[12.5px] text-text-2 mb-1.5"><MathText text={String.raw`Propose $\alpha>0$ tel que $a(x,x)\ge\alpha\|x\|_G^2$. Seule la partie symétrique $(A+A^{\mathsf T})/2$ intervient.`} /></p>
                <div className="flex items-center gap-2">
                  <input aria-label="Constante alpha" className={inputCls} value={alphaInput} onChange={(e) => setAlphaInput(e.target.value)} placeholder="α" />
                  <Button onClick={verifyAlpha}>Vérifier</Button>
                </div>
                {alphaOk === false && <p className="text-[12.5px] text-invalid mt-1" role="status">Cette constante ne convient pas (test exact).</p>}
                {alphaOk === true && <p className="text-[12.5px] text-text-3 mt-1">Meilleure constante : <span className="tabular">α ≈ {fr(d.alpha)}</span> (valeur numérique).</p>}
              </Hypothesis>
            </div>
          </Panel>

          <p className={cx('text-xs', lmReady ? 'text-hyp' : 'text-text-3')} data-testid="lm-status">
            {lmReady ? 'Hypothèses établies : la solution est présentée comme établie.' : 'La solution n’est présentée comme établie qu’une fois toutes les hypothèses vérifiées.'}
          </p>
          {lmReady && d.u && (
            <Panel title="Conclusion établie" className="anim-rise">
              <p className="text-[14px]">
                <MathText text={String.raw`Il existe un unique $u$ tel que $a(u,v)=\ell(v)$ pour tout $v$, et $\|u\|_G\le\alpha^{-1}\|\ell\|_{G'}$.`} />
              </p>
              <p className="mt-1 text-[13px] tabular">
                ‖u‖_G = {fr(Math.sqrt(dot(d.u, cfg.g.map((r) => dot(r, d.u!)))))} ≤ {fr(d.dualNorm / d.alpha)}
              </p>
            </Panel>
          )}
        </div>
      </div>
    </LabShell>
  );
}
