/**
 * Atlas visuel de géométrie de Lie : les 90 planches, filtrables par partie et par texte,
 * et la vue d'une planche (image, question « À vérifier » à réponse masquée, textes cités,
 * référence au cours, résultats du jeu et scène du laboratoire G associés).
 * Lecture seule : rien n'est écrit dans la progression.
 */
import { Component, lazy, Suspense, useEffect, useMemo, useState, type ReactNode } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Button, Card, cx, LinkButton, PageHeader, SectionTitle } from '@/components/ui';
import {
  ATLAS_PARTS,
  ATLAS_PLATES,
  ATLAS_SOURCE,
  LIE_COURSE_OFFSET,
  LIE_SCENES,
  partOf,
  plateById,
  plateImage,
  sceneForPlate,
  searchPlates,
  theoremsForPlate,
  type AtlasPlate,
} from '@/content/atlas';
import { NotFoundPage } from './NotFoundPage';
import { MathText } from '@/components/Math';
import { TermScope } from '@/components/glossary/context';
import { hasInteractive, interactiveLoader } from '@/atlas-interactif/registry';

const pad = (n: number) => String(n).padStart(2, '0');
const PAGE_RATIO = '841.89 / 595.28';

function courseLabel(p: AtlasPlate): string {
  if (!p.cours) return '';
  const [c1, c2] = p.cours.chapters;
  const [a, b] = p.cours.pages;
  const ch = c1 === c2 ? `chapitre ${c1}` : `chapitres ${c1} à ${c2}`;
  const pages = a === b ? `p. ${a} (PDF ${a + LIE_COURSE_OFFSET})` : `p. ${a} à ${b} (PDF ${a + LIE_COURSE_OFFSET} à ${b + LIE_COURSE_OFFSET})`;
  return `Cours de géométrie de Lie, ${ch}, ${pages}`;
}

function PlateCard({ p }: { p: AtlasPlate }) {
  const linked = theoremsForPlate(p.n);
  const scene = sceneForPlate(p.n);
  return (
    <li>
      <Link to={`/atlas/${p.n}`} className="group block h-full rounded-lg border border-line bg-surface overflow-hidden hover:border-line-strong transition-colors" data-plate={p.n}>
        <img src={plateImage(p.n, 'mini')} alt="" loading="lazy" className="w-full bg-white" style={{ aspectRatio: PAGE_RATIO }} />
        <div className="p-2.5">
          <div className="flex items-baseline justify-between gap-2 font-mono text-[11px] text-text-3">
            <span>Planche {pad(p.n)}</span>
            <span>{p.part}</span>
          </div>
          <div className="text-[13.5px] leading-snug mt-0.5">{p.title}</div>
          {(linked.length > 0 || scene) && (
            <div className="mt-1.5 flex flex-wrap gap-1">
              {linked.map((e) => (
                <span key={e.id} className="rounded border border-line px-1 font-mono text-[10.5px] text-text-2">Résultat {e.n}</span>
              ))}
              {scene && <span className="rounded border border-line px-1 font-mono text-[10.5px]" style={{ color: 'var(--st-proved)' }}>Labo G</span>}
            </div>
          )}
        </div>
      </Link>
    </li>
  );
}

export function AtlasPage() {
  const [params, setParams] = useSearchParams();
  const part = params.get('partie') ?? '';
  const group = params.get('groupe') ?? '';
  const q = params.get('q') ?? '';
  const onlyLinked = params.get('relies') === '1';

  const update = (patch: Record<string, string>) => {
    const next = new URLSearchParams(params);
    for (const [k, v] of Object.entries(patch)) {
      if (v) next.set(k, v);
      else next.delete(k);
    }
    setParams(next, { replace: true });
  };

  const plates = useMemo(() => {
    let list = ATLAS_PLATES;
    if (part) list = list.filter((p) => p.part === part);
    else if (group) list = list.filter((p) => partOf(p)?.group === group);
    if (onlyLinked) list = list.filter((p) => theoremsForPlate(p.n).length > 0 || sceneForPlate(p.n));
    return searchPlates(q, list);
  }, [part, group, q, onlyLinked]);

  const grouped = !q && !onlyLinked;
  const parts = ATLAS_PARTS.filter((pt) => plates.some((p) => p.part === pt.roman));

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-10 py-9">
      <PageHeader eyebrow="Compagnon du cours de géométrie de Lie" title="Atlas visuel">
        {ATLAS_SOURCE.plates} planches de l’Atlas visuel ({ATLAS_SOURCE.author}), reproduites telles quelles. Les textes des planches sont cités sans retouche ; les formules se lisent dans les images. Chaque planche renvoie au chapitre du cours, aux résultats du jeu qui la travaillent et, le cas échéant, à une scène du laboratoire G.
      </PageHeader>

      <div className="mb-5 space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <input
            type="search"
            value={q}
            onChange={(e) => update({ q: e.target.value })}
            placeholder="Chercher : crochet, exponentielle, Noether…"
            aria-label="Chercher dans les planches"
            className="min-w-[16rem] flex-1 rounded-md border border-line-strong bg-surface-2 px-3 py-1.5 text-[14px]"
          />
          <label className="flex items-center gap-2 text-[13px]">
            <input type="checkbox" checked={onlyLinked} onChange={(e) => update({ relies: e.target.checked ? '1' : '' })} />
            Reliées à un résultat ou au laboratoire
          </label>
        </div>
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filtrer par groupe de parties">
          {[
            ['', 'Toutes les parties'],
            ['tronc', 'Tronc principal (I–VIII)'],
            ['avance', 'Notions avancées (IX–XVII)'],
          ].map(([id, label]) => (
            <Button key={id} variant={!part && group === id ? 'primary' : 'outline'} aria-pressed={!part && group === id} onClick={() => update({ groupe: id!, partie: '' })} className="text-[12.5px]">
              {label}
            </Button>
          ))}
        </div>
        <div className="flex flex-wrap gap-1" role="group" aria-label="Filtrer par partie">
          {ATLAS_PARTS.map((pt) => (
            <button
              key={pt.roman}
              onClick={() => update({ partie: part === pt.roman ? '' : pt.roman, groupe: '' })}
              aria-pressed={part === pt.roman}
              title={pt.title}
              data-part={pt.roman}
              className={cx('rounded border px-2 py-0.5 font-mono text-[12px]', part === pt.roman ? 'border-accent text-accent' : 'border-line text-text-2 hover:border-line-strong')}
            >
              {pt.roman}
            </button>
          ))}
        </div>
        <p className="text-[13px] text-text-3" role="status">
          {plates.length} planche{plates.length > 1 ? 's' : ''}
        </p>
      </div>

      {plates.length === 0 && <p className="text-text-2">Aucune planche ne correspond.</p>}

      {grouped ? (
        <div className="space-y-8">
          {parts.map((pt) => (
            <section key={pt.roman} aria-labelledby={`partie-${pt.roman}`}>
              <h2 id={`partie-${pt.roman}`} className="font-serif text-xl mb-1">
                {pt.roman} · {pt.title}
              </h2>
              <p className="text-[12.5px] text-text-3 mb-3">
                Chapitres {pt.chapters[0]}{pt.chapters[1] !== pt.chapters[0] ? ` à ${pt.chapters[1]}` : ''} · {pt.group === 'tronc' ? 'tronc principal' : 'notions avancées, couvertes par l’atlas seulement'}
              </p>
              <ul className="grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {plates
                  .filter((p) => p.part === pt.roman)
                  .map((p) => (
                    <PlateCard key={p.n} p={p} />
                  ))}
              </ul>
            </section>
          ))}
        </div>
      ) : (
        <ul className="grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {plates.map((p) => (
            <PlateCard key={p.n} p={p} />
          ))}
        </ul>
      )}
    </div>
  );
}

function Quoted({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <SectionTitle className="mb-1.5">{title}</SectionTitle>
      <blockquote className="border-l-2 border-line-strong pl-3 text-[13.5px] text-text-2 leading-relaxed">{children}</blockquote>
    </section>
  );
}

const VIEW_KEY = 'prooflab:atlas:vue';
type PlateView = 'interactive' | 'original';
const readView = (): PlateView => {
  try {
    return localStorage.getItem(VIEW_KEY) === 'original' ? 'original' : 'interactive';
  } catch {
    return 'interactive';
  }
};

class PlateBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error: unknown) {
    console.warn('Figure interactive indisponible : planche originale affichée.', error);
  }
  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <div data-testid="figure-en-echec">
        <p className="mb-2 text-[13px] text-miss" role="note">La figure interactive n’a pas pu s’afficher : voici la planche originale.</p>
        {this.props.fallback}
      </div>
    );
  }
}

/** Figure interactive d'une planche, chargée à la demande. */
function InteractivePlate({ n, fallback }: { n: number; fallback: ReactNode }) {
  const Lazy = useMemo(() => {
    const load = interactiveLoader(n);
    return load ? lazy(load) : null;
  }, [n]);
  if (!Lazy) return <>{fallback}</>;
  return (
    <PlateBoundary fallback={fallback}>
      <Suspense fallback={<div className="flex h-64 items-center justify-center text-sm text-text-2" role="status">Chargement de la figure interactive…</div>}>
        <Lazy />
      </Suspense>
    </PlateBoundary>
  );
}

export function PlatePage() {
  const { n: raw = '' } = useParams();
  const n = Number(raw);
  const plate = Number.isInteger(n) ? plateById(n) : undefined;
  const navigate = useNavigate();
  const [revealed, setRevealed] = useState(false);
  const [view, setView] = useState<PlateView>(readView);
  const chooseView = (v: PlateView) => {
    setView(v);
    try {
      localStorage.setItem(VIEW_KEY, v);
    } catch {
      /* préférence non conservée */
    }
  };

  useEffect(() => setRevealed(false), [n]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return;
      // Dans une figure interactive, les flèches déplacent points et curseurs : pas de changement de planche.
      if (e.defaultPrevented || target?.closest?.('[data-plate-scene], [role="slider"], [role="application"], [role="radiogroup"]')) return;
      if (e.key === 'ArrowLeft' && plateById(n - 1)) navigate(`/atlas/${n - 1}`);
      if (e.key === 'ArrowRight' && plateById(n + 1)) navigate(`/atlas/${n + 1}`);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [n, navigate]);

  if (!plate) return <NotFoundPage />;
  const part = partOf(plate);
  const linked = theoremsForPlate(plate.n);
  const scene = sceneForPlate(plate.n);
  const box = plate.verifier.box;
  const interactive = hasInteractive(plate.n);
  const showInteractive = interactive && view === 'interactive';

  const original = (
    <figure className="relative rounded-lg border border-line overflow-hidden bg-white">
      <img
        src={plateImage(plate.n)}
        alt={`Planche ${plate.n} : ${plate.title}. ${plate.lecture}`}
        className="block w-full h-auto"
        style={{ aspectRatio: PAGE_RATIO }}
        data-testid="planche-image"
      />
      {box && !revealed && (
        <button
          type="button"
          onClick={() => setRevealed(true)}
          className="absolute flex items-center justify-center rounded-sm border border-dashed border-[#9aa5b4] bg-white text-[11px] text-[#526579] hover:bg-[#f3f6f8]"
          style={{ left: `${box[0] * 100}%`, top: `${box[1] * 100}%`, width: `${(box[2] - box[0]) * 100}%`, height: `${(box[3] - box[1]) * 100}%` }}
          aria-label="Réponse masquée : la révéler"
          data-testid="cache-reponse"
        >
          <span className="hidden md:inline">Réponse masquée</span>
        </button>
      )}
    </figure>
  );

  return (
    <div className="max-w-[1400px] mx-auto px-5 md:px-8 py-7">
      <PageHeader
        eyebrow={
          <>
            <Link to="/atlas" className="hover:text-text-2">Atlas visuel</Link>
            {' · '}
            <Link to={`/atlas?partie=${plate.part}`} className="hover:text-text-2">
              {plate.part} · {plate.partTitle}
            </Link>
            {' · '}Planche {pad(plate.n)} / {ATLAS_SOURCE.plates}
          </>
        }
        title={plate.title}
      >
        <span className="font-serif"><TermScope track="lie"><MathText text={plate.question} terms /></TermScope></span>
      </PageHeader>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="min-w-0">
          {interactive && (
            <div className="mb-3 flex flex-wrap gap-1.5" role="tablist" aria-label="Vue de la planche">
              {(
                [
                  ['interactive', 'Figure interactive'],
                  ['original', 'Planche originale'],
                ] as const
              ).map(([id, label]) => (
                <button
                  key={id}
                  role="tab"
                  aria-selected={view === id}
                  data-vue={id}
                  onClick={() => chooseView(id)}
                  className={cx('rounded-md border px-3 py-1.5 text-[13px] transition-colors', view === id ? 'border-accent bg-accent text-[var(--bg)]' : 'border-line hover:border-line-strong')}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
          {showInteractive ? <InteractivePlate key={plate.n} n={plate.n} fallback={original} /> : original}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {plateById(plate.n - 1) ? (
              <LinkButton to={`/atlas/${plate.n - 1}`} className="text-[13px]">← Planche {pad(plate.n - 1)}</LinkButton>
            ) : (
              <Button disabled className="text-[13px]">← Début de l’atlas</Button>
            )}
            {plateById(plate.n + 1) ? (
              <LinkButton to={`/atlas/${plate.n + 1}`} className="text-[13px]">Planche {pad(plate.n + 1)} →</LinkButton>
            ) : (
              <Button disabled className="text-[13px]">Fin de l’atlas →</Button>
            )}
            <span className="text-[12px] text-text-3">Flèches du clavier : planche précédente ou suivante.</span>
            <a href={plateImage(plate.n)} target="_blank" rel="noreferrer" className="ml-auto text-[12.5px] text-text-2 hover:underline">
              Image en grand (réponse visible)
            </a>
          </div>
        </div>

        <aside className="space-y-4">
          <Card className="p-4" data-testid="a-verifier">
            <SectionTitle className="mb-1.5">À vérifier</SectionTitle>
            <p className="text-[14px]"><TermScope track="lie"><MathText text={plate.verifier.question} terms /></TermScope></p>
            {revealed ? (
              <p className="mt-2 text-[14px]" style={{ color: 'var(--st-proved)' }} data-testid="reponse">
                {plate.verifier.reponse}
              </p>
            ) : (
              <Button variant="primary" className="mt-2 text-[13px]" onClick={() => setRevealed(true)} data-testid="reveler">
                Révéler la réponse
              </Button>
            )}
          </Card>
          <Card className="p-4 space-y-4">
            <p className="font-mono text-[11px] uppercase tracking-wider text-text-3">Texte de la planche, cité tel quel</p>
            <Quoted title="Lire le dessin"><TermScope track="lie"><MathText text={plate.lecture} terms /></TermScope></Quoted>
            <Quoted title="D’où vient la formule ?"><TermScope track="lie"><MathText text={plate.origine} terms /></TermScope></Quoted>
          </Card>
          <Card className="p-4">
            <SectionTitle className="mb-1.5">Dans le cours</SectionTitle>
            <p className="text-[13px] text-text-2">{courseLabel(plate)}.</p>
            {part && (
              <p className="mt-1 text-[12.5px] text-text-3">
                Partie {part.roman}, {part.group === 'tronc' ? 'tronc principal' : 'notions avancées : traitées par l’atlas, sans exercice dans le jeu'}.
              </p>
            )}
          </Card>
          {(linked.length > 0 || scene) && (
            <Card className="p-4" data-testid="liens-jeu">
              <SectionTitle className="mb-2">Dans le jeu</SectionTitle>
              <div className="flex flex-col gap-1.5">
                {linked.map((e) => (
                  <LinkButton key={e.id} to={`/theoreme/${e.id}`} className="w-full justify-start text-left text-[13px]">
                    Résultat {e.n} · {e.name}
                  </LinkButton>
                ))}
                {scene && (
                  <LinkButton to={`/labo/groupes-lie?scene=${scene}`} variant="primary" className="w-full justify-start text-left text-[13px]">
                    Laboratoire G · {LIE_SCENES.find((s) => s.id === scene)!.label}
                  </LinkButton>
                )}
              </div>
            </Card>
          )}
        </aside>
      </div>
    </div>
  );
}
