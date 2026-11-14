/**
 * Laboratoire D : Rellich et Aubin–Lions.
 * Familles, normes et verdicts : `@/core/math/compactness`, réutilisé tel quel.
 * Les images illustrent ; les conclusions se lisent sur des formes fermées.
 */
import { useCallback, useId, useMemo, useState } from 'react';
import { Button, SectionTitle, StatusBadge, cx, pdfRef } from '@/components/ui';
import { MathText, Prose, Tex } from '@/components/Math';
import { COMPACTNESS_FAMILIES, type CompactnessFamily } from '@/core/math/compactness';
import { Claim, Curve, Heatmap, LabShell, Panel, Plot, Slider, fr, sample } from '../kit';
import { N_MAX, displayWindow, ingredientsOf, metaOf, theoremApplies, uniformScale, type IngredientId } from './familles';
import { AubinLionsStudio } from '../visual-scenes/aubin-lions/AubinLionsStudio';

const COLS = 480;
const ROWS = 270;
const BAR = 128;

/** Au moins quatre chiffres significatifs : une petite valeur exacte ne s'affiche jamais « 0 ». */
function formatValue(v: number): string {
  if (v === 0 || !Number.isFinite(v) || Math.abs(v) >= 1) return fr(v, 3);
  return fr(v, 3 - Math.floor(Math.log10(Math.abs(v))));
}

const tLabel = (v: number): string => (Math.abs(v - 2 * Math.PI) < 1e-12 ? '2π' : fr(v, 2));
const clamp = (v: number, a: number, b: number): number => Math.min(b, Math.max(a, v));
const Var = ({ children }: { children: string }) => <span className="font-serif italic">{children}</span>;

// ───────────────────── Textes : énoncés du polycopié ─────────────────────

const INTRO = String.raw`Six familles $(u_n)$, des normes en forme fermée, trois ingrédients. Identifie ceux qui sont vérifiés, puis décide si une sous-suite converge fortement : la réponse se lit sur le calcul, jamais sur l'image.`;

const CADRE = String.raw`avec $V=H^1_0(\Omega)$, $H=L^2(\Omega)$ identifié à son dual et $V'=H^{-1}(\Omega)$, pour $\Omega$ borné lipschitzien : la première injection est compacte (Rellich, restreint au sous-espace fermé $H^1_0(\Omega)$), la seconde continue.`;

const AUBIN_LIONS = String.raw`Soient $X_0\hookrightarrow\hookrightarrow X\hookrightarrow X_1$ des espaces de Banach à injections continue et compacte comme indiquées, et $1<p,q<\infty$. Si $$\sup_n\Big(\|u_n\|_{L^p(0,T;X_0)}+\|u_n'\|_{L^q(0,T;X_1)}\Big)<\infty,$$ alors $(u_n)$ est relativement compacte dans $L^p(0,T;X)$.`;

const INGREDIENTS_GENERAUX = [
  { title: 'Compacité spatiale de l’injection', formula: String.raw`X_0\hookrightarrow\hookrightarrow X`, gloss: 'Propriété des seuls espaces : elle ne dépend pas de la suite.' },
  { title: 'Borne en espace', formula: String.raw`\sup_n\|u_n\|_{L^p(0,T;X_0)}<\infty`, gloss: 'Borne uniforme, en pratique fournie par une estimation a priori.' },
  { title: 'Borne en temps', formula: String.raw`\sup_n\|u_n'\|_{L^q(0,T;X_1)}<\infty`, gloss: String.raw`Borne uniforme de la dérivée en temps, dans l’espace le plus faible $X_1$.` },
];

const SPECIALISATION = String.raw`Cas $V\hookrightarrow\hookrightarrow H\hookrightarrow V'$ : $X_0=H^1_0(\Omega)$, $X=L^2(\Omega)$, $X_1=H^{-1}(\Omega)$, $p=q=2$. Si $u_n$ est borné dans $L^2(0,T;H^1_0(\Omega))$ et $u_n'=\partial_t u_n$ dans $L^2(0,T;H^{-1}(\Omega))$, une sous-suite converge fortement dans $L^2(0,T;L^2(\Omega))$.`;

const RELLICH = String.raw`Si $\Omega$ est borné lipschitzien, l’injection $H^1(\Omega)\hookrightarrow\hookrightarrow L^2(\Omega)$ est compacte : toute suite bornée en $H^1$ possède une sous-suite fortement convergente dans $L^2$.`;

const RELLICH_GLOSE = String.raw`Version sans temps : une injection compacte et une borne uniforme dans $H^1(\Omega)$. Sans la bornitude du domaine, l’injection $H^1\hookrightarrow L^2$ n’est que continue.`;

const SUFFISANTES = String.raw`Les ingrédients sont des hypothèses **suffisantes, non nécessaires**. Si l’un manque, le théorème ne peut plus être invoqué ; cela ne dit rien, à soi seul, de la conclusion.`;

const CONTRE_EXEMPLE = String.raw`Ainsi $v_n(t,x)=n^{-1/2}\sin(n\pi x)$, sur $\Omega=]0,1[$ avec $T=2\pi$, n’a pas de borne en espace : $\|v_n\|^2_{L^2(H^1_0)}=n\pi^3$. Pourtant $\|v_n\|^2_{L^2(L^2)}=\pi/n\to 0$ : toute la suite converge fortement vers $0$.`;

const CONVENTIONS = String.raw`Normes au carré. $H^1_0(\Omega)$ est muni de $\|\partial_x\cdot\|_{L^2}$, $H^{-1}(\Omega)$ de la norme duale, $H^1(\mathbb R)$ de $\big(\|u\|^2_{L^2}+\|u'\|^2_{L^2}\big)^{1/2}$ ; avec $\varphi_k=\sqrt2\sin(k\pi x)$, $\|\varphi_k\|^2_{H^1_0}=(k\pi)^2$ et $\|\varphi_k\|^2_{H^{-1}}=(k\pi)^{-2}$. Les valeurs sont des arrondis décimaux : une borne uniforme se lit sur la formule, pour tout $n$, non sur une valeur isolée.`;

const NOTIONS = [
  {
    title: 'Convergence faible',
    symbol: String.raw`u_n\rightharpoonup u`,
    def: String.raw`$\ell(u_n)\to\ell(u)$ pour tout $\ell\in X'$.`,
    body: String.raw`Une borne uniforme dans un Banach réflexif fournit une sous-suite faiblement convergente (§ 5.2). La norme ne suit pas forcément : $\sin(nx)\rightharpoonup 0$ dans $L^2(]0,2\pi[)$, alors que $\|\sin(nx)\|^2_{L^2}=\pi$ pour tout $n$.`,
  },
  {
    title: 'Convergence forte',
    symbol: String.raw`u_n\to u`,
    def: String.raw`$\|u_n-u\|_X\to 0$.`,
    body: String.raw`Elle implique la convergence faible vers la même limite, non l’inverse. La convergence faible seule ne permet pas de passer à la limite dans une expression non linéaire : $\sin^2(nx)\rightharpoonup\tfrac12$ (§ 5.1). Aubin–Lions donne la convergence forte dans $L^p(0,T;X)$, pas dans $L^p(0,T;X_0)$.`,
  },
  {
    title: 'Compacité spatiale',
    symbol: String.raw`X_0\hookrightarrow\hookrightarrow X`,
    def: String.raw`Toute partie bornée de $X_0$ est relativement compacte dans $X$.`,
    body: String.raw`Propriété des espaces, non de la suite. Rellich l’établit pour $H^1(\Omega)\hookrightarrow L^2(\Omega)$, $\Omega$ borné lipschitzien (§ 3.7). Elle ne contrôle rien dans la variable $t$.`,
  },
  {
    title: 'Compacité temporelle',
    symbol: String.raw`\partial_t u_n`,
    def: String.raw`$\|u_n(\cdot+h)-u_n\|_{L^q(0,T-h;X_1)}\le h\,\|u_n'\|_{L^q(0,T;X_1)}$.`,
    body: String.raw`Contrôle uniforme en $n$ des translations en temps, fourni par la borne de $u_n'$. La compacité spatiale ne l’implique pas : pour $\varphi\in X_0$ fixé, $a_n(t)\,\varphi$ reste dans une droite de $X_0$ et peut osciller en $t$.`,
  },
];

// ───────────────────── Cadre ─────────────────────

function Cadre() {
  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
      <Panel title="Cadre et énoncé">
        <div className="text-[19px]">
          <Tex block>{String.raw`V\hookrightarrow\hookrightarrow H\hookrightarrow V'`}</Tex>
        </div>
        <p className="text-[13.5px] text-text-2"><MathText text={CADRE} /></p>
        <div className="mt-4 flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="font-serif text-[17px]">Aubin–Lions</h3>
          <span className="font-mono text-[11px] text-text-3">Polycopié § 5.3, {pdfRef(21)}</span>
        </div>
        <p className="mt-1 text-[14.5px] leading-relaxed"><MathText text={AUBIN_LIONS} /></p>
        <ol className="mt-3 grid gap-2 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3" aria-label="Les trois ingrédients d’Aubin–Lions">
          {INGREDIENTS_GENERAUX.map((g, k) => (
            <li key={g.title} className="rounded-md border border-line bg-surface-2 p-3">
              <div className="font-mono text-[11px] text-text-3">Ingrédient {k + 1}</div>
              <div className="text-[14px] font-medium">{g.title}</div>
              <div className="mt-1 text-[14px]"><Tex>{g.formula}</Tex></div>
              <p className="mt-1 text-[12.5px] text-text-2"><MathText text={g.gloss} /></p>
            </li>
          ))}
        </ol>
        <p className="mt-2 text-[12.5px] text-text-3">La condition du théorème porte sur une somme de normes : elle équivaut aux deux bornes séparées.</p>
        <p className="mt-2 text-[13.5px]"><MathText text={SPECIALISATION} /></p>
      </Panel>
      <div className="space-y-4 min-w-0">
        <Panel title="Rellich, version sans temps">
          <p className="mb-1 font-mono text-[11px] text-text-3">Polycopié § 3.7, {pdfRef(15)}</p>
          <p className="text-[14.5px] leading-relaxed"><MathText text={RELLICH} /></p>
          <p className="mt-2 text-[13px] text-text-2"><MathText text={RELLICH_GLOSE} /></p>
        </Panel>
        <Panel title="Suffisantes, non nécessaires">
          <p className="text-[13.5px]"><MathText text={SUFFISANTES} /></p>
          <p className="mt-2 text-[13.5px] text-text-2"><MathText text={CONTRE_EXEMPLE} /></p>
          <p className="mt-2 text-[13px] text-text-2">Dans ce laboratoire, chaque échec de la conclusion se lit sur un calcul explicite de normes, jamais sur la seule absence d’une hypothèse.</p>
          <Claim status="exact" className="mt-2"><MathText text="Normes de $v_n$ en forme fermée." /></Claim>
        </Panel>
      </div>
    </div>
  );
}

// ───────────────────── Choix de la famille ─────────────────────

function FamilyPanel({ family, onFamily, n, onN }: { family: CompactnessFamily; onFamily: (f: CompactnessFamily) => void; n: number; onN: (n: number) => void }) {
  const meta = metaOf(family);
  return (
    <Panel title="Famille" className="min-w-0">
      <div role="group" aria-label="Famille de suites" className="grid gap-1.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-1">
        {COMPACTNESS_FAMILIES.map((f) => {
          const m = metaOf(f);
          const on = f.id === family.id;
          return (
            <button
              key={f.id}
              type="button"
              aria-pressed={on}
              aria-label={`${m.name} : ${m.spoken}`}
              onClick={() => onFamily(f)}
              className={cx(
                'flex h-full w-full cursor-pointer flex-col items-start gap-0.5 rounded-md border px-3 py-2 text-left text-sm transition-colors',
                on ? 'border-accent bg-accent text-bg' : 'border-line-strong text-text hover:bg-surface-3',
              )}
            >
              <span className="text-[11.5px] opacity-80">{m.name}</span>
              <Tex>{f.label}</Tex>
            </button>
          );
        })}
      </div>
      <div className="mt-4">
        <Slider label={<>Indice <Var>n</Var></>} value={n} min={1} max={N_MAX} onChange={onN} />
      </div>
      <dl className="mt-3 space-y-1 text-[12.5px] text-text-2">
        <div><dt className="inline text-text-3">Cadre : </dt><dd className="inline"><Tex>{family.setting}</Tex></dd></div>
        {meta.defs && <div><dt className="inline text-text-3">Notation : </dt><dd className="inline"><MathText text={meta.defs} /></dd></div>}
      </dl>
    </Panel>
  );
}

// ───────────────────── Visualisation ─────────────────────

function ViewHeader({ family, n }: { family: CompactnessFamily; n: number }) {
  return (
    <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
      <span className="text-[14px]">
        <Tex>{family.label}</Tex>
        <span className="ml-2 font-mono text-[12px] text-text-3">n = {n}</span>
      </span>
      <Claim status="illustratif">Image échantillonnée : elle ne démontre rien.</Claim>
    </div>
  );
}

type CutAxis = 't' | 'x';

function SpaceTimeView({ family, n }: { family: CompactnessFamily; n: number }) {
  const [t0, t1] = family.tRange;
  const [x0, x1] = family.xRange;
  const M = useMemo(() => uniformScale(family), [family]);
  const [axis, setAxis] = useState<CutAxis>('t');
  const [tCut, setTCut] = useState(1);
  const [xCut, setXCut] = useState(0.37);
  const tc = clamp(tCut, t0, t1);
  const xc = clamp(xCut, x0, x1);

  // Ligne i (x, depuis le bas), colonne j (t), échantillonnées au centre des pixels.
  const value = useCallback(
    (i: number, j: number) => family.u(n, t0 + ((j + 0.5) / COLS) * (t1 - t0), x0 + ((i + 0.5) / ROWS) * (x1 - x0)),
    [family, n, t0, t1, x0, x1],
  );
  const domain = useMemo<[number, number]>(() => [-M, M], [M]);
  const bar = useCallback((_i: number, j: number) => -M + (2 * M * (j + 0.5)) / BAR, [M]);
  const cut = useMemo(
    () => (axis === 't' ? sample((x) => family.u(n, tc, x), x0, x1, 900) : sample((t) => family.u(n, t, xc), t0, t1, 900)),
    [axis, family, n, tc, xc, t0, t1, x0, x1],
  );
  const pos = axis === 't' ? ((tc - t0) / (t1 - t0)) * 100 : ((xc - x0) / (x1 - x0)) * 100;

  return (
    <>
      <ViewHeader family={family} n={n} />
      <div className="grid gap-5 md:grid-cols-2">
        <figure className="min-w-0">
          <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-1.5">
            <div aria-hidden className="flex flex-col justify-between text-right font-mono text-[10.5px] leading-none text-text-3">
              <span>{fr(x1)}</span>
              <span className="font-serif italic">x</span>
              <span>{fr(x0)}</span>
            </div>
            <div className="relative">
              <Heatmap
                rows={ROWS}
                cols={COLS}
                value={value}
                domain={domain}
                ariaLabel={`Carte de uₙ(t, x) pour n = ${n} : t en abscisse de ${tLabel(t0)} à ${tLabel(t1)}, x en ordonnée de ${fr(x0)} à ${fr(x1)}, couleurs de ${fr(-M)} à ${fr(M)}, zéro au centre.`}
              />
              <span
                aria-hidden
                className={cx('pointer-events-none absolute border-dashed opacity-70', axis === 't' ? 'inset-y-0 border-l' : 'inset-x-0 border-t')}
                style={axis === 't' ? { left: `${pos}%`, borderColor: 'var(--text)' } : { bottom: `${pos}%`, borderColor: 'var(--text)' }}
              />
            </div>
            <span aria-hidden />
            <div aria-hidden className="mt-1 flex justify-between font-mono text-[10.5px] text-text-3">
              <span>{tLabel(t0)}</span>
              <span className="font-serif italic">t</span>
              <span>{tLabel(t1)}</span>
            </div>
          </div>
          <div className="mt-2.5 grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 font-mono text-[10.5px] text-text-3">
            <span>{fr(-M)}</span>
            <Heatmap rows={1} cols={BAR} value={bar} domain={domain} ariaLabel={`Échelle des couleurs, de ${fr(-M)} à ${fr(M)}, zéro au centre`} className="h-2" />
            <span>{fr(M)}</span>
          </div>
          <figcaption className="mt-1.5 text-[12px] text-text-3">
            <MathText text={String.raw`Échelle fixe pour toute la famille, symétrique autour de $0$ : $M=\max_{n\le 40}\max|u_n|$ sur la grille. Recalculée à chaque $n$, elle masquerait le facteur $1/n$.`} />
          </figcaption>
        </figure>
        <figure className="min-w-0">
          <Plot
            xDomain={axis === 't' ? family.xRange : family.tRange}
            yDomain={[-1.15 * M, 1.15 * M]}
            width={400}
            height={225}
            padding={30}
            ariaLabel={axis === 't' ? `Coupe de uₙ à t fixé, t₀ = ${fr(tc, 2)}, pour n = ${n}` : `Coupe de uₙ à x fixé, x₀ = ${fr(xc, 3)}, pour n = ${n}`}
          >
            <Curve points={cut} />
          </Plot>
          <figcaption className="mt-1 text-[12px] text-text-3">
            {axis === 't' ? (
              <>Coupe <Tex>{String.raw`x\mapsto u_n(t_0,x)`}</Tex> en <Var>t</Var>₀ = {fr(tc, 2)}</>
            ) : (
              <>Coupe <Tex>{String.raw`t\mapsto u_n(t,x_0)`}</Tex> en <Var>x</Var>₀ = {fr(xc, 3)}</>
            )}
            , même échelle verticale pour tout <Var>n</Var>.
          </figcaption>
        </figure>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-end">
        <div role="group" aria-label="Direction de la coupe" className="flex flex-wrap gap-1.5">
          <Button variant={axis === 't' ? 'primary' : 'outline'} aria-pressed={axis === 't'} onClick={() => setAxis('t')}>
            Coupe à <Var>t</Var> fixé
          </Button>
          <Button variant={axis === 'x' ? 'primary' : 'outline'} aria-pressed={axis === 'x'} onClick={() => setAxis('x')}>
            Coupe à <Var>x</Var> fixé
          </Button>
        </div>
        {axis === 't' ? (
          <Slider label={<>Instant <Var>t</Var>₀ de la coupe</>} value={tc} min={t0} max={t1} step={0.01} onChange={setTCut} format={(v) => fr(v, 2)} />
        ) : (
          <Slider label={<>Abscisse <Var>x</Var>₀ de la coupe</>} value={xc} min={x0} max={x1} step={0.005} onChange={setXCut} format={(v) => fr(v, 3)} />
        )}
      </div>
    </>
  );
}

function TimelessView({ family, n }: { family: CompactnessFamily; n: number }) {
  const M = useMemo(() => uniformScale(family), [family]);
  const { a, b, shift } = displayWindow(family, n);
  const t = family.tRange[0];
  const pts = useMemo(() => sample((x) => family.u(n, t, x), a, b, 1400), [family, n, t, a, b]);
  return (
    <>
      <ViewHeader family={family} n={n} />
      <figure className="min-w-0">
        <Plot xDomain={[a, b]} yDomain={[-0.15 * M, 1.15 * M]} width={800} height={250} padding={30} ariaLabel={`Graphe de uₙ pour n = ${n}, abscisses de ${fr(a)} à ${fr(b)}`}>
          <Curve points={pts} />
        </Plot>
        <figcaption className="mt-1.5 text-[12px] text-text-3">
          <MathText text={`Support de $u_n$ : $[n-1,n+1]=[${n - 1},${n + 1}]$. Fenêtre affichée : $[${a},${b}]$.`} />
          {shift > 0 && ' La fenêtre suit le support : seules les graduations changent, la forme de uₙ reste la même.'}
        </figcaption>
      </figure>
      <p className="mt-2 text-[12.5px] text-text-2">
        <MathText text={String.raw`Famille sans variable de temps : une courbe suffit. $u_n\to 0$ uniformément sur tout compact, et pourtant $\|u_n\|_{L^2(\mathbb R)}$ ne varie pas.`} />
      </p>
    </>
  );
}

// ───────────────────── Normes ─────────────────────

function NormsTable({ family, n }: { family: CompactnessFamily; n: number }) {
  const meta = metaOf(family);
  const rows = [
    { label: 'Borne en espace', formula: family.spatial.formula, value: family.spatial.value(n) },
    { label: 'Borne en temps', formula: family.temporal.formula, value: family.temporal.value(n) },
    { label: 'Norme de la conclusion', formula: meta.normFormula, value: family.normL2L2(n) },
  ];
  return (
    <Panel title="Normes en forme fermée" className="min-w-0">
      <div className="overflow-x-auto" role="region" aria-label="Tableau des normes" tabIndex={0}>
        <table className="w-full border-collapse text-[13.5px]">
          <caption className="sr-only">Normes au carré de la famille choisie, pour n = {n}</caption>
          <thead>
            <tr className="text-left font-mono text-[11px] uppercase tracking-wider text-text-3">
              <th scope="col" className="pb-1.5 pr-3 font-normal">Quantité</th>
              <th scope="col" className="pb-1.5 pr-3 font-normal">Forme fermée</th>
              <th scope="col" className="whitespace-nowrap pb-1.5 text-right font-normal">
                Valeur, <span className="font-serif normal-case italic">n</span> = {n}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.label} className="border-t border-line align-top">
                <th scope="row" className="py-2.5 pr-3 text-left font-normal">
                  <span className="block whitespace-nowrap">{r.label}</span>
                  <Claim status="exact" className="mt-1" />
                </th>
                <td className="py-2.5 pr-3"><Tex>{r.formula}</Tex></td>
                <td className="whitespace-nowrap py-2.5 text-right font-mono tabular">{formatValue(r.value)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-[12px] text-text-3"><MathText text={CONVENTIONS} /></p>
    </Panel>
  );
}

// ───────────────────── Jeu d'identification ─────────────────────

const NONE: Record<IngredientId, boolean> = { compacite: false, espace: false, temps: false };

function IdentificationGame({ family }: { family: CompactnessFamily }) {
  const meta = metaOf(family);
  const s = meta.spaces;
  const ingredients = ingredientsOf(family);
  const applies = theoremApplies(family);
  const theorem = meta.timeless ? 'Rellich' : 'Aubin–Lions';
  const [checked, setChecked] = useState<Record<IngredientId, boolean>>(NONE);
  const [validated, setValidated] = useState(false);
  const [answer, setAnswer] = useState<boolean | null>(null);
  const questionId = useId();

  const errors = ingredients.filter((g) => checked[g.id] !== g.holds).length;
  const missing = ingredients.filter((g) => !g.holds);
  const correct = answer === family.strong;
  const reset = () => {
    setChecked(NONE);
    setValidated(false);
    setAnswer(null);
  };

  const verdict = applies
    ? String.raw`Les trois ingrédients sont vérifiés : ${theorem} fournit une sous-suite fortement convergente dans $${s.strong}$.`
    : `${missing.length > 1 ? 'Ingrédients manquants' : 'Ingrédient manquant'} : ${missing.map((g) => g.title.toLowerCase()).join(', ')}. Cela seul ne dit rien de la conclusion, les hypothèses étant suffisantes, non nécessaires : ici, c’est le calcul explicite qui tranche.`;

  // Limite faible nulle pour les six familles ; toute limite forte d'une sous-suite lui est égale.
  const bilan = [
    { label: 'Convergence faible', text: String.raw`$u_n\rightharpoonup 0$ dans $${s.strong}$.` },
    {
      label: 'Convergence forte',
      text: family.strong
        ? String.raw`Oui : $\|u_n\|_{${s.strong}}\to 0$, toute la suite converge fortement vers $0$.`
        : String.raw`Non : $\|u_n\|_{${s.strong}}$ ne tend pas vers $0$, seule limite forte possible puisque $u_n\rightharpoonup 0$.`,
    },
    {
      label: 'Compacité spatiale',
      text: family.compactEmbedding
        ? String.raw`L’injection $${s.X0}\hookrightarrow ${s.X}$ est compacte.`
        : String.raw`L’injection $${s.X0}\hookrightarrow ${s.X}$ n’est pas compacte.`,
    },
    {
      label: 'Compacité temporelle',
      text: family.temporal.holds
        ? String.raw`$\partial_t u_n$ est uniformément borné dans $${s.boundDt}$ : les translations en temps sont contrôlées uniformément en $n$.`
        : String.raw`$\partial_t u_n$ n’est pas uniformément borné dans $${s.boundDt}$ : l’ingrédient 3 manque.`,
    },
  ];

  return (
    <Panel title="Identifier les ingrédients" className="min-w-0">
      <p className="mb-3 text-[13px] text-text-2">
        Famille : <Tex>{family.label}</Tex>
      </p>
      <fieldset disabled={validated} className="space-y-2">
        <legend className="mb-2 text-[14px]">
          <span className="font-mono text-text-3">1.</span> Coche les ingrédients vérifiés par cette famille.
        </legend>
        {ingredients.map((g) => {
          const color = validated ? (g.holds ? 'var(--st-hyp)' : 'var(--st-miss)') : 'var(--text-3)';
          const wrong = validated && checked[g.id] !== g.holds;
          return (
            <label
              key={g.id}
              data-ingredient={g.id}
              data-statut={validated ? (g.holds ? 'verifie' : 'manquant') : 'a-decider'}
              className={cx('flex items-start gap-3 rounded-md border border-line p-3', !validated && 'cursor-pointer hover:bg-surface-2')}
              style={{ borderLeftWidth: 3, borderLeftColor: color, backgroundColor: validated ? (g.holds ? 'var(--st-hyp-bg)' : 'var(--st-miss-bg)') : undefined }}
            >
              <input
                type="checkbox"
                className="mt-1 accent-accent"
                aria-labelledby={`${questionId}-${g.id}-titre`}
                aria-describedby={`${questionId}-${g.id}-enonce${validated ? ` ${questionId}-${g.id}-statut` : ''}`}
                checked={checked[g.id]}
                onChange={(e) => {
                  const v = e.target.checked;
                  setChecked((c) => ({ ...c, [g.id]: v }));
                }}
              />
              <span className="min-w-0 flex-1">
                <span id={`${questionId}-${g.id}-titre`} className="block text-[14px] font-medium">{g.title}</span>
                <span id={`${questionId}-${g.id}-enonce`} className="mt-0.5 block text-[13.5px] text-text-2"><MathText text={g.statement} /></span>
                {validated && (
                  <span id={`${questionId}-${g.id}-statut`} className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1">
                    <StatusBadge status={g.holds ? 'hypothese' : 'manquant'} />
                    {wrong && <span className="text-[12px] text-invalid">✕ {checked[g.id] ? 'Coché à tort.' : 'Non coché, alors qu’il est vérifié.'}</span>}
                  </span>
                )}
              </span>
            </label>
          );
        })}
      </fieldset>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
        {!validated && (
          <Button variant="primary" onClick={() => setValidated(true)}>
            Valider l’identification
          </Button>
        )}
        <div role="status" className="text-[13.5px]">
          {validated &&
            (errors === 0 ? (
              <span className="text-hyp">
                <span className="font-semibold">Identification exacte.</span> Les trois ingrédients sont bien classés.
              </span>
            ) : (
              <span className="text-invalid">
                <span className="font-semibold">Identification inexacte.</span> {errors} ingrédient{errors > 1 ? 's' : ''} mal classé{errors > 1 ? 's' : ''} ; les couleurs donnent la réponse exacte.
              </span>
            ))}
        </div>
      </div>

      {validated && (
        <div className="mt-4 border-t border-line pt-4">
          <p id={questionId} className="text-[14px]">
            <span className="font-mono text-text-3">2.</span>{' '}
            <MathText text={String.raw`Une sous-suite de $(u_n)$ converge-t-elle fortement dans $${s.strong}$ ?`} />
          </p>
          <div role="group" aria-label={`Une sous-suite de (uₙ) converge-t-elle fortement dans ${s.strongPlain} ?`} className="mt-2 flex flex-wrap gap-2">
            <Button variant={answer === true ? 'primary' : 'outline'} aria-pressed={answer === true} disabled={answer !== null} onClick={() => setAnswer(true)}>
              Oui
            </Button>
            <Button variant={answer === false ? 'primary' : 'outline'} aria-pressed={answer === false} disabled={answer !== null} onClick={() => setAnswer(false)}>
              Non
            </Button>
          </div>
          <div role="status" className="mt-3 text-[14px]">
            {answer !== null && (
              <span className={correct ? 'text-hyp' : 'text-invalid'}>
                <span className="font-semibold">{correct ? 'Réponse exacte.' : 'Réponse inexacte.'}</span>{' '}
                {family.strong ? 'Une sous-suite converge fortement.' : 'Aucune sous-suite ne converge fortement.'}
              </span>
            )}
          </div>

          {answer !== null && (
            <div className="anim-rise mt-3 space-y-3">
              <div data-verdict={applies ? 'applicable' : 'non-invocable'} className="rounded-md border border-line p-3" style={{ borderLeftWidth: 3, borderLeftColor: applies ? 'var(--st-access)' : 'var(--st-miss)' }}>
                <div className="font-mono text-[11px] uppercase tracking-wider" style={{ color: applies ? 'var(--st-access)' : 'var(--st-miss)' }}>
                  {applies ? `${theorem} s’applique` : `${theorem} ne peut plus être invoqué`}
                </div>
                <p className="mt-1 text-[13.5px]"><MathText text={verdict} /></p>
              </div>

              <div>
                <SectionTitle className="mb-1">Démonstration</SectionTitle>
                <Prose text={family.proof} className="text-[14px]" />
                <Claim status="exact">Conclusion lue sur des normes en forme fermée.</Claim>
              </div>

              {meta.h1 && (
                <div className="rounded-md border border-line p-3" style={{ borderLeftWidth: 3, borderLeftColor: 'var(--accent)' }}>
                  <div className="font-mono text-[11px] uppercase tracking-wider" style={{ color: 'var(--accent)' }}>
                    {meta.h1.weakOnly ? 'Seulement faible dans L²(0,T ; H¹₀)' : 'Forte aussi dans L²(0,T ; H¹₀)'}
                  </div>
                  <p className="mt-1 text-[13.5px]"><MathText text={meta.h1.text} /></p>
                </div>
              )}

              <div>
                <SectionTitle className="mb-1.5">Les quatre notions, pour cette famille</SectionTitle>
                <dl className="grid gap-2 sm:grid-cols-2">
                  {bilan.map((b) => (
                    <div key={b.label} className="rounded-md border border-line bg-surface-2 p-2.5">
                      <dt className="font-mono text-[11px] uppercase tracking-wider text-text-3">{b.label}</dt>
                      <dd className="mt-0.5 text-[13px]"><MathText text={b.text} /></dd>
                    </div>
                  ))}
                </dl>
              </div>

              <p className="text-[12.5px] text-text-3">En bref : {family.note}</p>
            </div>
          )}
        </div>
      )}

      {validated && (
        <Button variant="ghost" className="mt-3 px-0" onClick={reset}>
          Recommencer
        </Button>
      )}
    </Panel>
  );
}

// ───────────────────── Quatre notions ─────────────────────

function Notions() {
  return (
    <section className="mt-6" aria-labelledby="labo-d-notions">
      <h2 id="labo-d-notions" className="mb-1 font-serif text-xl">Quatre notions à ne pas confondre</h2>
      <p className="mb-3 text-sm text-text-2">Deux modes de convergence, deux sources de compacité. Aubin–Lions combine une compacité spatiale et une compacité temporelle pour tirer de bornes uniformes une convergence forte, après extraction.</p>
      <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {NOTIONS.map((c) => (
          <li key={c.title} className="rounded-lg border border-line bg-surface p-4">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-serif text-[17px]">{c.title}</h3>
              <span style={{ color: 'var(--accent)' }}><Tex>{c.symbol}</Tex></span>
            </div>
            <p className="mt-1.5 text-[13.5px]"><MathText text={c.def} /></p>
            <p className="mt-1.5 text-[12.5px] text-text-2"><MathText text={c.body} /></p>
          </li>
        ))}
      </ul>
    </section>
  );
}

// ───────────────────── Laboratoire ─────────────────────

export function CompaciteLab() {
  const [family, setFamily] = useState<CompactnessFamily>(COMPACTNESS_FAMILIES[0]!);
  const [n, setN] = useState(1);
  const meta = metaOf(family);

  return (
    <LabShell eyebrow="D" title="Rellich et Aubin–Lions" intro={<MathText text={INTRO} />}>
      <Cadre />
      <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(300px,4fr)_minmax(0,8fr)]">
        <FamilyPanel family={family} onFamily={setFamily} n={n} onN={setN} />
        <Panel title="Visualisation" className="min-w-0">
          {meta.timeless ? <TimelessView family={family} n={n} /> : <SpaceTimeView family={family} n={n} />}
        </Panel>
      </div>
      <div className="mt-4 grid gap-4 xl:grid-cols-2">
        <NormsTable family={family} n={n} />
        <IdentificationGame key={family.id} family={family} />
      </div>
      <Notions />

      <section className="mt-6" aria-labelledby="al-titre">
        <h2 id="al-titre" className="font-serif text-xl mb-1">Aubin–Lions : studio visuel</h2>
        <p className="text-sm text-text-2 mb-3">Les trois hypothèses, la surface en temps et en espace, ses coupes, les translations en temps. Retirer une hypothèse sépare toujours trois situations : théorème non applicable, conclusion fausse, conclusion vraie mais non garantie.</p>
        <AubinLionsStudio />
      </section>
    </LabShell>
  );
}
