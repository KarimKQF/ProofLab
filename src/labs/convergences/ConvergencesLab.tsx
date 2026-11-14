/**
 * Laboratoire C : convergences faible et forte dans L².
 * Toute valeur affichée vient d'une forme fermée de `core/math/sequences` ; les tracés sont
 * étiquetés comme illustrations. Une convergence forte n'est jamais annoncée sans son
 * argument écrit (`strongProof`), révélé après la réponse du joueur.
 *
 * Accessibilité : KaTeX est rendu en HTML seul (`components/Math`), donc masqué aux lecteurs
 * d'écran ; les formules qui nomment une commande ou une valeur sont doublées d'une lecture
 * en clair (`Spoken`).
 */
import { useId, useMemo, useRef, useState } from 'react';
import { Button, Chip, SectionTitle, cx } from '@/components/ui';
import { MathText, Tex } from '@/components/Math';
import { SEQUENCE_EXAMPLES, type SequenceExample } from '@/core/math/sequences';
import { useGame } from '@/storage/store';
import { Claim, Curve, LabShell, Panel, Plot, Segment, Slider, fr, sample, useLabKeys, usePlot } from '../kit';
import { N_MAX, constantLimitValue, evolution, maxIndex, sequenceLetter, valueRange, type Point } from './sequence-view';
import { ModesStudio } from '../visual-scenes/convergences/ModesStudio';

const LAB = 'convergences';
const deductionKey = (id: string): string => `deduction:${id}`;

interface SequenceMeta {
  /** Nom court en texte simple : il nomme le bouton de sélection. */
  name: string;
  /** Lecture en clair de la formule, puis de l'espace. */
  speech: string;
  space: string;
  /** Phrase d'explication révélée avec la réponse. */
  explanation: string;
}

const L2_INTERVAL = 'L deux de l’intervalle ouvert de 0 à 1';

const META: Record<string, SequenceMeta> = {
  sin: {
    name: 'Oscillation',
    speech: 'u n de x égale sinus de n pi x',
    space: L2_INTERVAL,
    explanation: String.raw`Mécanisme d'oscillation : contre un $g$ fixe, les changements de signe de $u_n$ se compensent et $\int u_n g\to 0$. La norme porte sur $u_n^2=\sin^2(n\pi x)$, qui ne change pas de signe : $\|u_n\|^2=\tfrac12$ pour tout $n$.`,
  },
  pic: {
    name: 'Concentration',
    speech: 'u n égale racine de n fois l’indicatrice de l’intervalle ouvert de 0 à 1 sur n',
    space: L2_INTERVAL,
    explanation: String.raw`Mécanisme de concentration : $u_n$ est nulle hors de $]0,1/n[$, dont la longueur tend vers $0$, et sa norme reste égale à $1$. L'intégrale contre un $g$ fixe tend vers $0$ ; la norme ne diminue pas.`,
  },
  puissance: {
    name: 'Puissance',
    speech: 'u n de x égale x puissance n',
    space: L2_INTERVAL,
    explanation: String.raw`Aucune compensation ici : $x^n\to 0$ en tout point de $]0,1[$ avec $0\le x^n\le 1$, donc $\|u_n\|_{L^2}\to 0$ par convergence dominée, bien que la convergence ne soit pas uniforme.`,
  },
  'carre-sin': {
    name: 'Carré du sinus',
    speech: 'v n de x égale sinus carré de n pi x',
    space: L2_INTERVAL,
    explanation: String.raw`Même mécanisme d'oscillation, autour de $\tfrac12$ : $v_n-\tfrac12=-\tfrac12\cos(2n\pi x)$, de fréquence croissante, garde la norme $\|v_n-\tfrac12\|^2=\tfrac18$.`,
  },
  perturbation: {
    name: 'Perturbation',
    speech: 'u n de x égale 1 plus sinus de n pi x divisé par n',
    space: L2_INTERVAL,
    explanation: String.raw`La fréquence croît, mais l'amplitude de l'oscillation tend vers $0$ : $|u_n-1|\le\tfrac1n$ sur $]0,1[$, donc $\|u_n-1\|_{L^2}\le\tfrac1n$.`,
  },
  translation: {
    name: 'Translation',
    speech: 'u n de x égale phi de x moins n, où phi de y égale le maximum de 0 et de 1 moins la valeur absolue de y',
    space: 'L deux de R',
    explanation: String.raw`Le profil $\varphi$ est translaté vers l'infini sans se déformer : contre un $g$ à support compact, l'intégrale finit par être nulle, mais la norme est invariante par translation, $\|u_n\|^2=\|\varphi\|^2=\tfrac23$.`,
  },
};

const metaOf = (ex: SequenceExample): SequenceMeta => META[ex.id] ?? { name: ex.id, speech: ex.id, space: 'L deux', explanation: '' };

const PAIRING_SPEECH: Record<string, string> = {
  un: 'g égale 1',
  x: 'g égale x',
  sin1: 'g égale sinus de pi x',
  bloc: 'g égale l’indicatrice de l’intervalle fermé de 0 à 1',
};
const pairingSpeech = (id: string): string => PAIRING_SPEECH[id] ?? id;

function byId(id: string): SequenceExample {
  const ex = SEQUENCE_EXAMPLES.find((e) => e.id === id);
  if (!ex) throw new Error(`Suite inconnue : ${id}`);
  return ex;
}
const SINUS = byId('sin');
const CARRE = byId('carre-sin');

// ───────────────────── Marques graphiques ─────────────────────

type Shape = 'cercle' | 'carre' | 'triangle';
/** Séries d'appariements : la forme distingue autant que la couleur. */
const SERIES: { shape: Shape; color: string }[] = [
  { shape: 'cercle', color: 'var(--accent)' },
  { shape: 'carre', color: 'var(--st-access)' },
  { shape: 'triangle', color: 'var(--st-hyp)' },
];
const DISTANCE_COLOR = 'var(--st-miss)';
const LIMIT_COLOR = 'var(--st-hyp)';
const LIMIT_DASH = '5 4';

function Mark({ shape, x, y, color }: { shape: Shape; x: number; y: number; color: string }) {
  switch (shape) {
    case 'cercle':
      return <circle cx={x} cy={y} r={2.5} fill={color} />;
    case 'carre':
      return <rect x={x - 2.3} y={y - 2.3} width={4.6} height={4.6} fill={color} />;
    case 'triangle':
      return <path d={`M ${x} ${y - 3.2} L ${x + 3} ${y + 2.2} L ${x - 3} ${y + 2.2} Z`} fill={color} />;
  }
}

function SeriesMarks({ points, shape, color }: { points: Point[]; shape: Shape; color: string }) {
  const { sx, sy } = usePlot();
  return (
    <g>
      {points.map(([x, y]) => (
        <Mark key={x} shape={shape} x={sx(x)} y={sy(y)} color={color} />
      ))}
    </g>
  );
}

function Ring({ at, color }: { at: Point | undefined; color: string }) {
  const { sx, sy } = usePlot();
  if (!at) return null;
  return <circle cx={sx(at[0])} cy={sy(at[1])} r={5.5} fill="none" stroke={color} strokeWidth={1.3} />;
}

/** Nom de l'axe horizontal, dans la marge droite, à hauteur de zéro. */
function AxisName({ at, children }: { at: number; children: string }) {
  const { sx, sy } = usePlot();
  return (
    <text x={sx(at) + 7} y={sy(0) + 4} fontSize={13} fontStyle="italic" fontFamily="var(--font-serif)" fill="var(--text-3)">
      {children}
    </text>
  );
}

function Swatch({ color, line, dash, shape }: { color: string; line?: boolean; dash?: string; shape?: Shape }) {
  return (
    <svg viewBox="0 0 24 10" className="h-2.5 w-6 shrink-0" aria-hidden>
      {line && <line x1={1} y1={5} x2={23} y2={5} stroke={color} strokeWidth={2} strokeDasharray={dash} />}
      {shape && <Mark shape={shape} x={12} y={5} color={color} />}
    </svg>
  );
}

/** Texte mixte doublé d'une lecture en clair pour les technologies d'assistance. */
function Spoken({ text, speech }: { text: string; speech: string }) {
  return (
    <>
      <span className="sr-only">{speech}</span>
      <span aria-hidden="true">
        <MathText text={text} />
      </span>
    </>
  );
}

/** Valeur d'une forme fermée, arrondie à l'affichage ; « ≈ » signale que l'arrondi l'a modifiée. */
function closedFormValue(v: number): string {
  if (!Number.isFinite(v)) return '—';
  const rounded = Math.round(v * 1e4) / 1e4;
  return Math.abs(rounded - v) > 1e-12 ? `≈ ${fr(v, 4)}` : fr(v, 4);
}

// ───────────────────── Sections ─────────────────────

function Definitions() {
  return (
    <Panel title="Définitions" className="mb-4">
      <div className="grid gap-x-8 gap-y-4 md:grid-cols-2 xl:grid-cols-3">
        <div>
          <h3 className="mb-1 text-[13px] font-medium text-text-2">Convergence faible</h3>
          <p className="font-serif text-[16px] leading-relaxed">
            <Spoken
              text={String.raw`$u_n\rightharpoonup u$ dans $L^2$ signifie : $\int u_n\,g\to\int u\,g$ pour tout $g\in L^2$.`}
              speech="u n converge faiblement vers u dans L deux signifie : l’intégrale de u n fois g tend vers l’intégrale de u fois g, pour toute fonction g de L deux."
            />
          </p>
        </div>
        <div>
          <h3 className="mb-1 text-[13px] font-medium text-text-2">Convergence forte</h3>
          <p className="font-serif text-[16px] leading-relaxed">
            <Spoken
              text={String.raw`$u_n\to u$ dans $L^2$ signifie : $\|u_n-u\|_{L^2}\to 0$.`}
              speech="u n converge fortement vers u dans L deux signifie : la norme L deux de u n moins u tend vers 0."
            />
          </p>
          <p className="mt-1.5 text-[13px] leading-relaxed text-text-2">
            <Spoken
              text={String.raw`La convergence forte entraîne la convergence faible : $\bigl|\int (u_n-u)\,g\bigr|\le\|u_n-u\|_{L^2}\,\|g\|_{L^2}$ (Cauchy–Schwarz). La réciproque est fausse.`}
              speech="La convergence forte entraîne la convergence faible, par l’inégalité de Cauchy–Schwarz. La réciproque est fausse."
            />
          </p>
        </div>
        <div className="md:col-span-2 xl:col-span-1">
          <h3 className="mb-1 text-[13px] font-medium text-text-2">Ce qu’un nombre fini de tests ne prouve pas</h3>
          <p className="text-[13.5px] leading-relaxed text-text-2">
            <Spoken
              text={String.raw`Si $h\neq 0$ est orthogonale à $g_1,\dots,g_k$, la suite constante $u_n=h$ vérifie $\int u_n\,g_i=0$ pour tout $i$, et pourtant $u_n\rightharpoonup h\neq 0$. Établir $u_n\rightharpoonup u$ demande un argument valable pour tout $g\in L^2$, par exemple : suite bornée et convergence contre une famille totale (dont les combinaisons linéaires sont denses).`}
              speech="Si h, non nulle, est orthogonale à g 1, …, g k, la suite constante égale à h a une intégrale nulle contre chaque g i, et pourtant elle converge faiblement vers h, non nulle. Établir la convergence faible demande un argument valable pour toute fonction g de L deux, par exemple : suite bornée et convergence contre une famille totale, dont les combinaisons linéaires sont denses."
            />
          </p>
        </div>
      </div>
    </Panel>
  );
}

function Reveal({ ex }: { ex: SequenceExample }) {
  const L = sequenceLetter(ex);
  const { explanation } = metaOf(ex);
  const weak = {
    key: 'faible',
    title: 'Convergence faible',
    statement: String.raw`$${L}_n\rightharpoonup ${ex.weakLimit}$ dans $${ex.space}$`,
    proof: ex.weakProof,
  };
  const strong = {
    key: 'forte',
    title: ex.strong ? 'Convergence forte' : 'Pas de convergence forte',
    statement: ex.strong ? String.raw`$${L}_n\to ${ex.weakLimit}$ dans $${ex.space}$` : String.raw`$${L}_n\not\to ${ex.weakLimit}$ dans $${ex.space}$`,
    proof: ex.strongProof,
  };
  // Ordre logique : quand la convergence est forte, la preuve faible s'en déduit.
  const blocks = ex.strong ? [strong, weak] : [weak, strong];
  return (
    <div className="mt-3 space-y-2.5 anim-rise">
      {explanation && (
        <p className="text-[13.5px] leading-relaxed text-text-2">
          <MathText text={explanation} />
        </p>
      )}
      {blocks.map((blk) => (
        <div key={blk.key} className="rounded-md border border-line p-3" style={{ borderLeft: '3px solid var(--st-proved)' }}>
          <div className="mb-1 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
            <h3 className="text-[14px] font-medium">
              {blk.title} : <MathText text={blk.statement} />
            </h3>
            <Claim status="demontre" />
          </div>
          <p className="text-[13.5px] leading-relaxed text-text-2">
            <MathText text={blk.proof} />
          </p>
        </div>
      ))}
    </div>
  );
}

function Deduced({ deduced }: { deduced: ReadonlySet<string> }) {
  const id = useId();
  const done = SEQUENCE_EXAMPLES.filter((e) => deduced.has(deductionKey(e.id)));
  return (
    <div className="mt-4 border-t border-line pt-3">
      <p id={id} className="text-[13px] text-text-2">
        Suites déjà déduites correctement : <span className="font-mono tabular">{done.length} sur {SEQUENCE_EXAMPLES.length}</span>
      </p>
      {done.length > 0 ? (
        <ul aria-labelledby={id} className="mt-1.5 flex flex-wrap gap-1.5">
          {done.map((e) => (
            <li key={e.id}>
              <Chip style={{ color: 'var(--st-proved)', borderColor: 'var(--st-proved)' }}>
                <span aria-hidden>✓</span>
                {metaOf(e).name}
              </Chip>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-1 text-[12.5px] text-text-3">Aucune pour l’instant.</p>
      )}
      <p className="mt-1.5 text-[12px] text-text-3">Mémorisé dans la sauvegarde locale de ce navigateur.</p>
    </div>
  );
}

function NonLinearity({ onShow }: { onShow: (ex: SequenceExample) => void }) {
  const cards = [
    {
      ex: SINUS,
      statement: String.raw`$u_n\rightharpoonup ${SINUS.weakLimit}$ dans $${SINUS.space}$`,
      speech: `u n converge faiblement vers ${SINUS.weakLimit} dans ${metaOf(SINUS).space}`,
    },
    {
      ex: CARRE,
      statement: String.raw`$v_n=u_n^2\rightharpoonup ${CARRE.weakLimit}$ dans $${CARRE.space}$`,
      speech: `v n, égale à u n au carré, converge faiblement vers un demi dans ${metaOf(CARRE).space}`,
    },
  ];
  return (
    <section aria-label="Non-linéarité" className="mt-4 rounded-lg border bg-surface p-4" style={{ borderColor: 'var(--st-access)' }}>
      <SectionTitle className="mb-2.5">Non-linéarité</SectionTitle>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)_minmax(0,1fr)]">
        <div className="md:col-span-2 xl:col-span-1">
          <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1 font-serif text-[19px]">
            <span className="sr-only">u n égale sinus de n pi x converge faiblement vers 0, mais u n au carré converge faiblement vers un demi, différent de 0 au carré.</span>
            <span aria-hidden="true">
              <Tex>{String.raw`u_n=\sin(n\pi x)\rightharpoonup ${SINUS.weakLimit}`}</Tex>
            </span>
            <span aria-hidden="true" className="text-[15px] text-text-2">
              mais
            </span>
            <span aria-hidden="true">
              <Tex>{String.raw`u_n^2\rightharpoonup ${CARRE.weakLimit}\neq ${SINUS.weakLimit}^2`}</Tex>
            </span>
          </p>
          <p className="mt-2 text-[13.5px] leading-relaxed text-text-2">
            <MathText text={String.raw`La convergence faible ne se conserve pas par une opération non linéaire : de $u_n\rightharpoonup u$, on ne peut pas déduire $u_n^2\rightharpoonup u^2$.`} />
          </p>
          <p className="mt-2 text-[13.5px] leading-relaxed text-text-2">
            <MathText
              text={String.raw`La convergence forte, elle, permet ce passage à la limite : si $u_n\to u$ dans $L^2$, alors $\|u_n^2-u^2\|_{L^1}\le\|u_n-u\|_{L^2}\,\|u_n+u\|_{L^2}\to 0$, la suite $(u_n)$ étant bornée. Sous leurs hypothèses, les théorèmes de compacité (laboratoire D) fournissent une sous-suite fortement convergente.`}
            />
          </p>
          <Claim status="demontre" className="mt-2">
            Inégalité de Cauchy–Schwarz.
          </Claim>
        </div>
        {cards.map((c) => (
          <div key={c.ex.id} className="flex flex-col rounded-md border border-line bg-surface-2 p-3">
            <div className="mb-1.5 flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-[14px] font-medium">
                <Spoken text={c.statement} speech={c.speech} />
              </h3>
              <Claim status="demontre" />
            </div>
            <p className="text-[13px] leading-relaxed text-text-2">
              <MathText text={c.ex.weakProof} />
            </p>
            <div className="mt-auto pt-3">
              <Button onClick={() => onShow(c.ex)}>
                Afficher « {metaOf(c.ex).name} »<span aria-hidden>→</span>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ───────────────────── Laboratoire ─────────────────────

export function ConvergencesLab() {
  const [ex, setEx] = useState<SequenceExample>(SINUS);
  const [nWanted, setN] = useState(6);
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const deduced = useLabKeys(LAB);
  const unlock = useGame((s) => s.unlockLabKeys);
  const selectionRef = useRef<HTMLDivElement>(null);
  const questionId = useId();

  const meta = metaOf(ex);
  const L = sequenceLetter(ex);
  const [a, b] = ex.domain;
  const nMax = maxIndex(ex);
  const n = Math.min(nWanted, nMax);
  const limit = useMemo(() => constantLimitValue(ex.weakLimit), [ex]);
  const yRange = useMemo(() => valueRange(ex, nMax, limit), [ex, nMax, limit]);
  const evo = useMemo(() => evolution(ex), [ex]);
  const curve = useMemo(() => sample((x) => ex.evaluate(n, x), a, b, 1200), [ex, n, a, b]);

  const answer = answers[ex.id];
  const answered = answer !== undefined;
  const correct = answered && answer === ex.strong;

  const respond = (belief: boolean) => {
    if (answered) return;
    setAnswers((prev) => ({ ...prev, [ex.id]: belief }));
    if (belief === ex.strong) unlock(LAB, [deductionKey(ex.id)]);
  };

  /** Lien depuis l'encart : sélectionne la suite et y amène la vue et le focus clavier. */
  const show = (target: SequenceExample) => {
    setEx(target);
    selectionRef.current?.focus();
  };

  const rows = [
    { key: 'norme', text: String.raw`$\|${L}_n\|^2$`, speech: `norme de ${L} n, au carré`, value: ex.normSq(n) },
    { key: 'distance', text: String.raw`$\|${L}_n-${L}\|^2$`, speech: `norme de ${L} n moins ${L}, au carré`, value: ex.distanceToLimitSq(n) },
    ...ex.pairings.map((p) => ({
      key: `g-${p.id}`,
      text: String.raw`$\int ${L}_n\,g$ pour $${p.label}$`,
      speech: `intégrale de ${L} n fois g, pour ${pairingSpeech(p.id)}`,
      value: p.value(n),
    })),
  ];

  const verdict = ex.strong
    ? 'La suite converge fortement vers sa limite faible ; l’argument suit.'
    : 'La suite converge faiblement, mais pas fortement : sa distance à la limite faible ne tend pas vers 0.';

  return (
    <LabShell
      eyebrow="C"
      title="Convergences faible et forte"
      intro="Des suites de fonctions dont les limites sont établies par le calcul, jamais par le graphique. Choisis une suite, lis les quantités exactes, puis déduis : converge-t-elle fortement ?"
    >
      <Definitions />

      <div ref={selectionRef} tabIndex={-1} role="region" aria-label="Suite étudiée" className="mb-4 rounded-lg">
        <Panel title="Suite étudiée">
          <div className="flex flex-wrap gap-1.5" role="group" aria-label="Choix de la suite">
            {SEQUENCE_EXAMPLES.map((e) => (
              <Button key={e.id} variant={e.id === ex.id ? 'primary' : 'outline'} aria-pressed={e.id === ex.id} onClick={() => setEx(e)}>
                {metaOf(e).name}
              </Button>
            ))}
          </div>
          <p className="mt-3 font-serif text-[18px] leading-relaxed">
            <Spoken text={String.raw`$${ex.label}$ dans $${ex.space}$`} speech={`${meta.speech}, dans ${meta.space}`} />
          </p>
        </Panel>
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.25fr)_minmax(360px,1fr)]">
        <div className="min-w-0 space-y-4">
          <Panel>
            <Plot
              xDomain={ex.domain}
              yDomain={yRange}
              width={640}
              height={360}
              ariaLabel={`Graphe de la suite « ${meta.name} » pour n = ${n}, sur l’intervalle de ${fr(a)} à ${fr(b)} ; limite faible en pointillés.`}
            >
              <Curve points={curve} />
              {limit !== null && <Curve points={[[a, limit], [b, limit]]} color={LIMIT_COLOR} dash={LIMIT_DASH} width={1.6} />}
              <AxisName at={b}>x</AxisName>
            </Plot>
            <div className="mt-2 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
              <ul className="flex flex-wrap gap-x-4 gap-y-1 text-[12.5px] text-text-2" aria-label="Légende du graphe">
                <li className="inline-flex items-center gap-1.5">
                  <Swatch color="var(--accent)" line />
                  <Spoken text={`$${L}_n$ pour $n=${n}$`} speech={`${L} n pour n égale ${n}`} />
                </li>
                {limit !== null && (
                  <li className="inline-flex items-center gap-1.5">
                    <Swatch color={LIMIT_COLOR} line dash={LIMIT_DASH} />
                    <Spoken text={`limite faible $${L}$, en pointillés`} speech={`limite faible ${L}, en pointillés`} />
                  </li>
                )}
              </ul>
              <Claim status="illustratif">Tracé échantillonné : il illustre, il ne prouve pas.</Claim>
            </div>
            <div className="mt-3">
              <Slider label="Indice de la suite" value={n} min={1} max={nMax} onChange={setN} format={(v) => `n = ${v}`} />
              {nMax < N_MAX && (
                <p className="mt-1 text-[12px] text-text-3">
                  <MathText text={`La fenêtre de tracé $[${a},${b}]$ limite le curseur à $n\\le ${nMax}$ ; les formules du tableau valent pour tout $n\\ge 1$.`} />
                </p>
              )}
            </div>
          </Panel>

          <Panel title="Évolution des quantités">
            <div className="mx-auto max-w-[720px]">
              <Plot
                xDomain={[0, N_MAX + 1]}
                yDomain={evo.range}
                width={640}
                height={300}
                ariaLabel={`Valeurs exactes pour n de 1 à ${N_MAX} : carré de la distance à la limite faible (ligne) et intégrales contre ${evo.pairings.length} fonctions tests (points).`}
              >
                <Segment a={[n, evo.range[0]]} b={[n, evo.range[1]]} color="var(--line-strong)" dash="2 3" width={1} />
                <Curve points={evo.distance} color={DISTANCE_COLOR} width={2} />
                {evo.pairings.map((p, i) => (
                  <SeriesMarks key={p.id} points={p.points} {...SERIES[i % SERIES.length]} />
                ))}
                <Ring at={evo.distance.find(([k]) => k === n)} color={DISTANCE_COLOR} />
                {evo.pairings.map((p, i) => (
                  <Ring key={p.id} at={p.points.find(([k]) => k === n)} color={SERIES[i % SERIES.length].color} />
                ))}
                <AxisName at={N_MAX + 1}>n</AxisName>
              </Plot>
            </div>
            <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[12.5px] text-text-2" aria-label="Légende de l’évolution">
              <li className="inline-flex items-center gap-1.5">
                <Swatch color={DISTANCE_COLOR} line />
                <Spoken text={String.raw`$\|${L}_n-${L}\|^2$`} speech={`carré de la norme de ${L} n moins ${L}`} />
              </li>
              {evo.pairings.map((p, i) => (
                <li key={p.id} className="inline-flex items-center gap-1.5">
                  <Swatch {...SERIES[i % SERIES.length]} />
                  <Spoken text={String.raw`$\int ${L}_n\,g$, $${p.label}$`} speech={`intégrale de ${L} n fois g, pour ${pairingSpeech(p.id)}`} />
                </li>
              ))}
            </ul>
            <div className="mt-2.5 space-y-1">
              <Claim status="illustratif">Une courbe n’est jamais une preuve : soixante valeurs ne déterminent pas une limite.</Claim>
              {limit !== null && limit !== 0 && (
                <p className="text-[12px] text-text-3">
                  <MathText text={String.raw`Ici la limite faible n'est pas nulle : on compare $\int ${L}_n g$ à $\int ${L}\,g$, et non à $0$.`} />
                </p>
              )}
            </div>
          </Panel>
        </div>

        <div className="min-w-0 space-y-4">
          <Panel title="Quantités exactes">
            <div className="overflow-x-auto">
              <table className="w-full text-[13.5px]">
                <caption className="sr-only">Valeurs des quantités exactes pour n = {n}</caption>
                <thead>
                  <tr className="font-mono text-[11px] text-text-3">
                    <th scope="col" className="pb-1.5 pr-3 text-left font-normal">Quantité</th>
                    <th scope="col" className="pb-1.5 pr-3 text-right font-normal">En n = {n}</th>
                    <th scope="col" className="pb-1.5 text-right font-normal">Nature</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.key} className="border-t border-line">
                      <th scope="row" className="py-2 pr-3 text-left font-normal">
                        <Spoken text={r.text} speech={r.speech} />
                      </th>
                      <td className="whitespace-nowrap py-2 pr-3 text-right font-mono tabular">{closedFormValue(r.value)}</td>
                      <td className="py-2 text-right">
                        <Claim status="exact" className="whitespace-nowrap" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-2.5 text-[12px] leading-relaxed text-text-3">
              <MathText
                text={String.raw`$${L}$ désigne la limite faible, tracée en pointillés. Chaque valeur provient de la forme fermée de la quantité ; « ≈ » signale un arrondi d'affichage. Ces quelques fonctions tests $g$ illustrent la convergence faible, elles ne la prouvent pas.`}
              />
            </p>
          </Panel>

          <Panel title="Mode déduction">
            <div role="group" aria-labelledby={questionId}>
              <p id={questionId} className="text-[14.5px] leading-relaxed">
                Crois-tu que la suite « {meta.name} » converge fortement dans <Spoken text={`$${ex.space}$`} speech={meta.space} /> ?
              </p>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {[true, false].map((belief) => (
                  <Button
                    key={String(belief)}
                    variant={answer === belief ? 'primary' : 'outline'}
                    aria-pressed={answered ? answer === belief : undefined}
                    aria-disabled={answered || undefined}
                    className={cx(answered && 'cursor-default', answered && answer !== belief && 'opacity-50')}
                    onClick={() => respond(belief)}
                  >
                    {belief ? 'Oui, convergence forte' : 'Non, pas de convergence forte'}
                  </Button>
                ))}
              </div>
            </div>
            <div role="status" className="mt-3 text-[14px] leading-relaxed">
              {answered && (
                <p>
                  <strong className={correct ? 'text-hyp' : 'text-invalid'}>
                    <span aria-hidden>{correct ? '✓ ' : '✕ '}</span>
                    {correct ? 'Correct.' : 'Incorrect.'}
                  </strong>{' '}
                  Ta réponse : {answer ? 'oui' : 'non'}. {verdict}
                </p>
              )}
            </div>
            {answered && <Reveal ex={ex} />}
            <Deduced deduced={deduced} />
          </Panel>
        </div>
      </div>

      <NonLinearity onShow={show} />

      <section className="mt-6" aria-labelledby="modes-titre">
        <h2 id="modes-titre" className="font-serif text-xl mb-1">Modes de convergence : presque partout, en mesure, forte, faible</h2>
        <p className="text-sm text-text-2 mb-3">Six suites, quatre modes, un verdict justifié pour chaque case. La cascade place les courbes en profondeur ; la coupe à x fixé montre la convergence ponctuelle, les quantités exactes montrent les autres modes.</p>
        <ModesStudio />
      </section>
    </LabShell>
  );
}
