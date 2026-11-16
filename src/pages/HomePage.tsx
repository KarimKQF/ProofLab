import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { EXERCISES, THEOREM_CATALOG } from '@/content';
import { LinkButton, ProgressBar, SectionTitle } from '@/components/ui';
import { useGame } from '@/storage/store';
import { useReviewQueue } from '@/components/useReviewQueue';
import { theoremMastery } from '@/core/progression/mastery';
import { Tex } from '@/components/Math';

/** Scène d'accueil : une vraie projection, calculée à chaque image. */
function HeroScene() {
  const reduce = useGame((s) => s.save.settings.reduceMotion);
  const [t, setT] = useState(1.1);
  useEffect(() => {
    if (reduce || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const start = performance.now();
    const loop = (now: number) => {
      setT(1.1 + (now - start) / 5200);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [reduce]);

  // K : disque fermé de centre c et de rayon r. Projection explicite.
  const c = { x: 210, y: 150 };
  const r = 92;
  const x = { x: 210 + 165 * Math.cos(t), y: 150 + 118 * Math.sin(1.7 * t) };
  const dx = x.x - c.x;
  const dy = x.y - c.y;
  const d = Math.hypot(dx, dy);
  const inside = d <= r;
  const p = inside ? x : { x: c.x + (r * dx) / d, y: c.y + (r * dy) / d };
  const z = { x: c.x + 52 * Math.cos(2.4), y: c.y + 52 * Math.sin(2.4) };
  const inner = (x.x - p.x) * (z.x - p.x) + (x.y - p.y) * (z.y - p.y);

  return (
    <svg viewBox="0 0 420 300" className="w-full" role="img" aria-label="Projection d'un point sur un disque fermé : le segment joignant le point à son projeté fait un angle obtus avec toute direction vers le disque.">
      <circle cx={c.x} cy={c.y} r={r} fill="var(--st-hyp-bg)" stroke="var(--st-hyp)" strokeWidth={1.4} />
      <text x={c.x - 12} y={c.y + 76} fill="var(--st-hyp)" fontFamily="var(--font-mono)" fontSize={13}>K</text>
      {!inside && <line x1={x.x} y1={x.y} x2={p.x} y2={p.y} stroke="var(--st-access)" strokeWidth={1.4} />}
      {!inside && <line x1={p.x} y1={p.y} x2={z.x} y2={z.y} stroke="var(--st-proved)" strokeWidth={1.4} strokeDasharray="4 4" />}
      <circle cx={z.x} cy={z.y} r={3.5} fill="var(--st-proved)" />
      <text x={z.x - 16} y={z.y + 3} fill="var(--st-proved)" fontFamily="var(--font-mono)" fontSize={12}>z</text>
      <circle cx={p.x} cy={p.y} r={4.5} fill="var(--st-miss)" />
      <text x={p.x + 8} y={p.y - 8} fill="var(--st-miss)" fontFamily="var(--font-serif)" fontStyle="italic" fontSize={14}>
        P<tspan baselineShift="sub" fontSize={10}>K</tspan>x
      </text>
      <circle cx={x.x} cy={x.y} r={4.5} fill="var(--text)" />
      <text x={x.x + 8} y={x.y - 8} fill="var(--text)" fontFamily="var(--font-mono)" fontSize={12}>x</text>
      <text x={8} y={292} fill="var(--text-3)" fontFamily="var(--font-mono)" fontSize={11} className="tabular">
        {inside ? 'x ∈ K : le projeté est x lui-même' : `⟨x − P_K x, z − P_K x⟩ = ${(inner / 1000).toFixed(2).replace('.', ',')} ≤ 0`}
      </text>
    </svg>
  );
}

const MODES = [
  { to: '/labos', title: 'Exploration', body: 'Déplace des points, modifie des paramètres, observe des conséquences exactes.' },
  { to: '/carte', title: 'Construction de preuve', body: 'Assemble un graphe de propositions et justifie chaque arête.' },
  { to: '/carte', title: 'Preuve libre', body: 'Rédige ta démonstration en LaTeX ; les limites de l’évaluation sont affichées.' },
  { to: '/contre-exemples', title: 'Contre-exemples', body: 'Trouve l’hypothèse manquante ou construis ce qui fait tomber l’assertion.' },
  { to: '/trouver-erreur', title: 'Trouver l’erreur', body: 'Une démonstration complète contient une étape fautive : désigne-la et dis ce qui ne va pas.' },
  { to: '/examen', title: 'Examen', body: 'Énoncés nouveaux, sans indice, notés sur une grille à cinq critères.' },
];

export function HomePage() {
  const exercises = useGame((s) => s.save.exercises);
  const lastVisited = useGame((s) => s.save.lastVisited);
  const now = useGame((s) => s.now);
  const queue = useReviewQueue();

  const { solved, mastered } = useMemo(() => {
    const n = now();
    return {
      solved: Object.values(exercises).filter((e) => e.solved).length,
      mastered: THEOREM_CATALOG.filter((t) => theoremMastery(t.id, exercises, n).status === 'maitrise').length,
    };
  }, [exercises, now]);

  const total = EXERCISES.length || 102;

  return (
    <div className="lab-grid min-h-screen">
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-10 md:py-14">
        <div className="grid md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] gap-10 items-center">
          <div>
            <p className="font-mono text-xs text-text-3 mb-4">Analyse fonctionnelle · Opérateurs · EDP</p>
            <h1 className="font-serif text-5xl md:text-6xl leading-[1.04] tracking-tight">ProofLab</h1>
            <p className="font-serif text-xl text-text-2 mt-5 max-w-xl leading-snug">
              Tu ne franchis pas un niveau en connaissant la réponse. Tu le franchis en démontrant pourquoi elle est vraie.
            </p>
            <div className="flex flex-wrap gap-3 mt-7">
              <LinkButton to={lastVisited ?? '/carte'} variant="primary" className="px-5 py-2.5">
                {lastVisited ? 'Reprendre' : 'Commencer'}
              </LinkButton>
              <LinkButton to="/carte" className="px-5 py-2.5">
                Ouvrir la carte
              </LinkButton>
              {queue.length > 0 && (
                <LinkButton to="/revision" className="px-5 py-2.5">
                  Révisions du jour ({queue.length})
                </LinkButton>
              )}
            </div>
          </div>
          <div className="rounded-lg border border-line bg-surface p-4">
            <HeroScene />
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mt-12">
          <div className="rounded-lg border border-line bg-surface p-4">
            <SectionTitle className="mb-1.5">Exercices validés</SectionTitle>
            <p className="font-serif text-3xl tabular">
              {solved}
              <span className="text-text-3 text-lg"> / {total}</span>
            </p>
            <div className="mt-3">
              <ProgressBar value={solved / total} label="Exercices validés" />
            </div>
          </div>
          <div className="rounded-lg border border-line bg-surface p-4">
            <SectionTitle className="mb-1.5">Théorèmes maîtrisés</SectionTitle>
            <p className="font-serif text-3xl tabular">
              {mastered}
              <span className="text-text-3 text-lg"> / {THEOREM_CATALOG.length}</span>
            </p>
            <div className="mt-3">
              <ProgressBar value={mastered / THEOREM_CATALOG.length} label="Théorèmes maîtrisés" color="var(--st-proved)" />
            </div>
          </div>
          <div className="rounded-lg border border-line bg-surface p-4">
            <SectionTitle className="mb-1.5">Le fil conducteur</SectionTitle>
            <p className="text-sm text-text-2">
              <Tex>{String.raw`V\hookrightarrow H\simeq H'\hookrightarrow V'`}</Tex> : huit mondes et trente-quatre résultats d’analyse ; puis la géométrie de Lie, <Tex>{String.raw`\mathfrak g=T_eG\xrightarrow{\exp}G`}</Tex>, en trois mondes et onze résultats. Chaque résultat est démontré avant d’être utilisé.
            </p>
          </div>
        </div>

        <SectionTitle className="mt-12 mb-3">Six manières de travailler</SectionTitle>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
          {MODES.map((m) => (
            <li key={m.title}>
              <Link to={m.to} className="block h-full rounded-lg border border-line bg-surface p-3.5 hover:border-line-strong transition-colors">
                <div className="font-serif text-[17px] mb-1">{m.title}</div>
                <p className="text-[13px] leading-snug text-text-2">{m.body}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
