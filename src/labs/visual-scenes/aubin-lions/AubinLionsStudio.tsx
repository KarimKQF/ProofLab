/**
 * Studio Aubin–Lions (laboratoire D) : diagramme V ↪↪ H ↪ V′, surface uₙ(t, x) avec coupes
 * à t et à x fixés, norme spatiale au cours du temps, bornes en fonction de n, translations
 * en temps, et comparaison « avec / sans hypothèse » qui sépare toujours :
 * théorème non applicable, conclusion fausse, conclusion vraie mais non garantie.
 */
import { lazy, useMemo, useState } from 'react';
import { Button, cx } from '@/components/ui';
import type { CompactnessFamily } from '@/core/math/compactness';
import { AL_FAMILIES, CASE_LABEL, classify, HYP_LABEL, hypothesesOf, pairFor, spatialNormSq, timeTranslationSq, type HypothesisId } from '@/core/visual-reasoning/aubin-lions-scene';
import { sampleGrid } from '@/core/visual-reasoning/sections';
import { fmt } from '@/core/visual-reasoning/types';
import { MathViewStudio, type StudioView } from '@/components/math-visualizations/MathViewStudio';
import { Scene3DGate } from '@/components/math-visualizations/Scene3DGate';
import { Claim, Curve, Dot, fr, MathText, Plot, Slider, sample } from '@/labs/kit';
import { LevelMap } from '../sobolev/SobolevViews';

const SquareSurface3D = lazy(() => import('../common/SquareSurface3D'));

const CASE_COLOR = { garantie: 'var(--st-proved)', fausse: 'var(--st-invalid)', 'non-garantie': 'var(--st-miss)' } as const;

/** Diagramme abstrait : la chaîne d'injections et les trois hypothèses, avec leur état pour la famille. */
function Diagram({ f }: { f: CompactnessFamily }) {
  const h = hypothesesOf(f);
  const c = classify(f);
  const onR = f.xRange[0] < 0;
  const V = onR ? String.raw`H^1(\mathbb R)` : String.raw`H^1_0(\Omega)`;
  const H = onR ? String.raw`L^2(\mathbb R)` : String.raw`L^2(\Omega)`;
  const Vp = onR ? String.raw`H^{-1}(\mathbb R)` : String.raw`H^{-1}(\Omega)`;
  const box = (ok: boolean) => ({ borderColor: ok ? 'var(--st-hyp)' : 'var(--st-invalid)', borderLeftWidth: 3 });
  return (
    <div className="space-y-3 text-[13.5px]" data-testid="al-diagram" data-case={c.verdict}>
      <div className="flex flex-wrap items-center justify-center gap-2 font-serif text-[15px]">
        <span className="rounded border border-line px-2 py-1"><MathText text={`$V=${V}$`} /></span>
        <span style={{ color: h.compacite ? 'var(--st-hyp)' : 'var(--st-invalid)' }} aria-label={h.compacite ? 'injection compacte' : 'injection non compacte'}>
          <MathText text={h.compacite ? String.raw`$\overset{\text{compacte}}{\hookrightarrow}$` : String.raw`$\overset{\text{non compacte}}{\hookrightarrow}$`} />
        </span>
        <span className="rounded border border-line px-2 py-1"><MathText text={`$H=${H}$`} /></span>
        <MathText text={String.raw`$\hookrightarrow$`} />
        <span className="rounded border border-line px-2 py-1"><MathText text={`$V'=${Vp}$`} /></span>
      </div>
      <ul className="grid gap-2 @md:grid-cols-3">
        {(['spatial', 'temporal', 'compacite'] as HypothesisId[]).map((k) => (
          <li key={k} className="rounded-md border p-2" style={box(h[k])} data-al-hyp={k} data-holds={h[k]}>
            <MathText text={HYP_LABEL[k]} />
            <p className="mt-0.5 font-mono text-[11px]" style={{ color: h[k] ? 'var(--st-hyp)' : 'var(--st-invalid)' }}>
              {h[k] ? 'satisfaite (calcul exact)' : 'absente (calcul exact)'}
            </p>
            {k !== 'compacite' && (
              <p className="mt-0.5 text-[12px] text-text-2">
                <MathText text={`$${k === 'spatial' ? f.spatial.formula : f.temporal.formula}$`} />
              </p>
            )}
          </li>
        ))}
      </ul>
      <div className="text-center text-text-3">⇓ {c.applies ? 'le théorème s’applique' : 'le théorème ne s’applique pas'}</div>
      <div className="rounded-md border p-2.5" style={{ borderColor: CASE_COLOR[c.verdict], borderLeftWidth: 3 }}>
        <MathText text={String.raw`Conclusion : $(u_n)$ relativement compacte dans $L^2(0,T;H)$.`} />
        <p className="mt-0.5 font-mono text-[11.5px]" style={{ color: CASE_COLOR[c.verdict] }}>
          {CASE_LABEL[c.verdict]}
        </p>
        <p className="mt-1 text-[12.5px] text-text-2">
          <MathText text={f.proof} />
        </p>
      </div>
    </div>
  );
}

function FamilyCard({ f, n, role }: { f: CompactnessFamily; n: number; role: 'fausse' | 'non-garantie' }) {
  const c = classify(f);
  return (
    <figure className="rounded-md border p-3 text-[13px]" style={{ borderColor: CASE_COLOR[c.verdict], borderLeftWidth: 3 }} data-al-card={role} data-case={c.verdict}>
      <figcaption className="mb-1 font-medium">
        <MathText text={`$${f.label}$`} />
      </figcaption>
      <p className="text-text-2">
        <MathText text={`$${f.spatial.formula}$`} />
      </p>
      <p className="text-text-2">
        <MathText text={`$${f.temporal.formula}$`} />
      </p>
      <p className="mt-1">
        <MathText text={String.raw`$\|u_n\|^2_{L^2(0,T;H)}=${fmt(f.normL2L2(n), 4)}$ pour $n=${n}$`} />
      </p>
      <p className="mt-1.5 font-mono text-[11.5px]" style={{ color: CASE_COLOR[c.verdict] }}>
        (1) Théorème non applicable. {c.verdict === 'fausse' ? '(2) Conclusion fausse pour cette suite.' : '(3) Conclusion vraie ici, mais non garantie.'}
      </p>
      <p className="mt-1 text-[12.5px] text-text-2">
        <MathText text={f.proof} />
      </p>
    </figure>
  );
}

export function AubinLionsStudio() {
  const [id, setId] = useState('amortie-temps');
  const [removed, setRemoved] = useState<HypothesisId | null>(null);
  const [n, setN] = useState(6);
  const [t0, setT0] = useState(0.35);
  const [x0, setX0] = useState(0.4);
  const f = AL_FAMILIES.find((x) => x.id === id)!;
  const T0 = f.tRange[0] + t0 * (f.tRange[1] - f.tRange[0]);
  const X0 = f.xRange[0] + x0 * (f.xRange[1] - f.xRange[0]);

  // Grille normalisée (s, ξ) ∈ [0,1]² ↔ (t, x) : une seule grille pour la surface, les niveaux et les coupes.
  const norm = useMemo(
    () => (s: number, xi: number) => f.u(n, f.tRange[0] + s * (f.tRange[1] - f.tRange[0]), f.xRange[0] + xi * (f.xRange[1] - f.xRange[0])),
    [f, n],
  );
  const grid = useMemo(() => sampleGrid(norm, 61, [0, 1], [0, 1], `al:${id}:${n}`), [norm, id, n]);
  const normsInTime = useMemo(() => Array.from({ length: 41 }, (_, i) => f.tRange[0] + (i / 40) * (f.tRange[1] - f.tRange[0])).map((t) => [t, spatialNormSq(f, n, t)] as [number, number]), [f, n]);
  const taus = useMemo(() => Array.from({ length: 13 }, (_, i) => (i / 12) * 0.5 * (f.tRange[1] - f.tRange[0])), [f]);
  const translations = useMemo(() => [n, 2 * n, 4 * n].map((m) => ({ m, values: taus.map((tau) => [tau, timeTranslationSq(f, m, tau, 60, 40)] as [number, number]) })), [f, n, taus]);

  const levelMap = <LevelMap grid={grid} state={{ x0: t0, y0: x0 }} grad={null} highlight={null} />;
  const cutT = sample((x) => f.u(n, T0, x), f.xRange[0], f.xRange[1], 300);
  const cutX = sample((t) => f.u(n, t, X0), f.tRange[0], f.tRange[1], 300);
  const amp = Math.max(1e-3, ...grid.values.flat().map(Math.abs)) * 1.15;

  const views: StudioView[] = [
    { id: 'diagramme', title: 'Diagramme', render: () => <Diagram f={f} /> },
    {
      id: 'surface',
      title: 'Surface uₙ(t, x)',
      render: () => (
        <div>
          <Scene3DGate fallback={levelMap}>
            <SquareSurface3D grid={grid} f={norm} s0={t0} xi0={x0} amp={amp} label="Surface de u_n en fonction du temps et de l’espace, avec deux coupes" axisLabels={['t', 'x', 'u']} />
          </Scene3DGate>
          <p className="mt-1 text-[12px] text-text-3">t en abscisse (normalisé par T), x en profondeur (normalisé sur le domaine) ; courbes orange : coupes à t = t₀ et x = x₀.</p>
        </div>
      ),
    },
    {
      id: 'coupes',
      title: 'Coupes t₀ et x₀',
      render: () => (
        <div className="grid gap-3 @lg:grid-cols-2" data-testid="al-cuts">
          <figure>
            <figcaption className="mb-1 text-[13px]"><MathText text={String.raw`À $t=t_0$ fixé : $x\mapsto u_n(t_0,x)$`} /></figcaption>
            <Plot xDomain={f.xRange} yDomain={[-amp, amp]} height={260} ariaLabel="Coupe à t fixé">
              <Curve points={cutT} color="var(--st-access)" />
            </Plot>
          </figure>
          <figure>
            <figcaption className="mb-1 text-[13px]"><MathText text={String.raw`À $x=x_0$ fixé : $t\mapsto u_n(t,x_0)$`} /></figcaption>
            <Plot xDomain={f.tRange} yDomain={[-amp, amp]} height={260} ariaLabel="Coupe à x fixé">
              <Curve points={cutX} color="var(--st-proved)" />
            </Plot>
          </figure>
        </div>
      ),
    },
    {
      id: 'normes',
      title: 'Normes',
      render: () => (
        <div className="space-y-3" data-testid="al-norms">
          <figure>
            <figcaption className="mb-1 text-[13px]"><MathText text={String.raw`Norme spatiale au cours du temps : $t\mapsto\|u_n(t)\|^2_{H}$`} /></figcaption>
            <Plot xDomain={f.tRange} yDomain={[0, Math.max(1e-3, ...normsInTime.map((p) => p[1])) * 1.15]} height={220} ariaLabel="Norme L2 en espace en fonction du temps">
              <Curve points={normsInTime} color="var(--st-access)" />
            </Plot>
            <Claim status="numerique">Quadrature de Simpson en x (400 intervalles).</Claim>
          </figure>
          <table className="w-full text-[13px] tabular">
            <thead>
              <tr className="text-left text-text-3">
                <th className="font-normal">n</th>
                <th className="font-normal"><MathText text={String.raw`$\|u_n\|^2_{L^2(V)}$`} /></th>
                <th className="font-normal"><MathText text={String.raw`$\|u_n'\|^2_{L^2(V')}$`} /></th>
                <th className="font-normal"><MathText text={String.raw`$\|u_n\|^2_{L^2(H)}$`} /></th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 4, 8, 16, 32].map((m) => (
                <tr key={m} className={cx(m === n && 'bg-surface-3')}>
                  <td>{m}</td>
                  <td className={f.spatial.holds ? '' : 'text-invalid'}>{fmt(f.spatial.value(m), 4)}</td>
                  <td className={f.temporal.holds ? '' : 'text-invalid'}>{fmt(f.temporal.value(m), 4)}</td>
                  <td>{fmt(f.normL2L2(m), 4)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-[12.5px] text-text-2">
            <MathText text={String.raw`Sous-suites : si $\|u_n\|_{L^2(H)}$ reste $\ge c>0$ alors que $u_n\rightharpoonup0$, aucune sous-suite ne converge fortement (sa limite forte serait la limite faible $0$). Quand le théorème s'applique, il fournit une sous-suite fortement convergente ; ici la suite entière converge.`} />
          </p>
          <Claim status="exact">Bornes et normes en formule fermée (lignes du tableau).</Claim>
        </div>
      ),
    },
    {
      id: 'translations',
      title: 'Translations en temps',
      render: () => (
        <div className="space-y-2" data-testid="al-translations">
          <Plot xDomain={[0, taus[taus.length - 1]!]} yDomain={[0, Math.max(1e-3, ...translations.flatMap((s) => s.values.map((p) => p[1]))) * 1.15]} height={260} ariaLabel="Translations en temps">
            {translations.map((s, k) => (
              <g key={s.m}>
                <Curve points={s.values} color={['var(--st-access)', 'var(--st-proved)', 'var(--div-pos)'][k]} />
                {s.values.map(([tau, v], i) => (i % 3 === 0 ? <Dot key={i} x={tau} y={v} r={2.4} color={['var(--st-access)', 'var(--st-proved)', 'var(--div-pos)'][k]} /> : null))}
              </g>
            ))}
          </Plot>
          <p className="text-[12.5px] text-text-2">
            <MathText text={String.raw`$\tau\mapsto\|u_m(\cdot+\tau)-u_m\|^2_{L^2(0,T-\tau;H)}$ pour $m=n,2n,4n$ (bleu, vert, orange). La compacité en temps demande que ces quantités tendent vers $0$ avec $\tau$ uniformément en $m$ : c'est ce que donne la borne sur $u_n'$.`} />
          </p>
          <Claim status="numerique">Quadrature de Simpson en t et x.</Claim>
        </div>
      ),
    },
    {
      id: 'avec-sans',
      title: 'Avec / sans hypothèse',
      render: () =>
        removed ? (
          (() => {
            const pair = pairFor(removed);
            return (
              <div className="space-y-2" data-testid="al-compare">
                <p className="text-[13px]">
                  Hypothèse retirée : <MathText text={HYP_LABEL[removed]} />. Le théorème ne s’applique plus ; deux suites où elle manque :
                </p>
                <div className="grid gap-3 @lg:grid-cols-2">
                  <FamilyCard f={pair.fausse} n={n} role="fausse" />
                  <FamilyCard f={pair.nonGarantie} n={n} role="non-garantie" />
                </div>
              </div>
            );
          })()
        ) : (
          <p className="text-[13px] text-text-2" data-testid="al-compare">Retire une hypothèse (panneau ci-dessus) pour comparer un contre-exemple et un exemple où la conclusion reste vraie sans être garantie.</p>
        ),
    },
  ];

  return (
    <div className="space-y-3" data-testid="al-studio">
      <div className="flex flex-wrap gap-1.5" role="group" aria-label="Hypothèse retirée (Aubin–Lions)">
        <span className="self-center text-[13px] text-text-2">Retirer :</span>
        <Button className="px-2 py-1 text-[12.5px]" variant={removed === null ? 'primary' : 'outline'} aria-pressed={removed === null} onClick={() => setRemoved(null)}>
          Rien
        </Button>
        {(['spatial', 'temporal', 'compacite'] as HypothesisId[]).map((h) => (
          <Button
            key={h}
            className="px-2 py-1 text-[12.5px]"
            variant={removed === h ? 'primary' : 'outline'}
            aria-pressed={removed === h}
            data-remove={h}
            onClick={() => {
              setRemoved(h);
              setId(pairFor(h).fausse.id);
            }}
          >
            {h === 'spatial' ? 'la borne spatiale' : h === 'temporal' ? 'la borne temporelle' : 'la compacité de V ↪ H'}
          </Button>
        ))}
      </div>
      <div className="flex flex-wrap gap-1.5" role="group" aria-label="Suite étudiée (Aubin–Lions)">
        {AL_FAMILIES.filter((g) => (removed ? classify(g).missing.includes(removed) && classify(g).missing.length === 1 : true)).map((g) => (
          <Button key={g.id} className="px-2 py-1 text-[12.5px]" variant={id === g.id ? 'primary' : 'outline'} aria-pressed={id === g.id} onClick={() => setId(g.id)} data-al-family={g.id}>
            <MathText text={`$${g.label}$`} />
          </Button>
        ))}
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        <Slider label="Rang n" value={n} min={1} max={32} step={1} onChange={(v) => setN(Math.round(v))} />
        <Slider label="Instant t₀ (fraction de T)" value={t0} min={0} max={1} step={0.01} onChange={setT0} format={(v) => fr(v, 2)} />
        <Slider label="Point x₀ (fraction du domaine)" value={x0} min={0} max={1} step={0.01} onChange={setX0} format={(v) => fr(v, 2)} />
      </div>
      <MathViewStudio id="aubin-lions" views={views} initial={['diagramme', 'surface']} weights={{ diagramme: 1.1, surface: 1.4, coupes: 1.3, normes: 1.2, translations: 1.2, 'avec-sans': 1.5 }} />
    </div>
  );
}
