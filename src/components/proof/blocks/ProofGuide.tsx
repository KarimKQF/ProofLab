/**
 * Guide de preuve : forme du but et méthode, notions du but avec « comment le montrer »,
 * puis, dans le laboratoire, des coups de pouce calculés par le moteur (vers l'avant :
 * ce qu'on peut établir maintenant ; à rebours : ce qu'il suffit de montrer) et le plan.
 */
import { useMemo, useState } from 'react';
import type { ProofSpec } from '@/content/schema';
import type { NodeId } from '@/core/proof-engine/engine';
import { DICO_BY_ID, findTerms, matcherFor, type DicoTrack } from '@/content/dictionnaire';
import { Button, Card, SectionTitle } from '@/components/ui';
import { MathText, Prose } from '@/components/Math';
import { TermChip } from '@/components/glossary/EntryView';
import type { ProofSession } from '../useProofSession';
import { nodeText } from '../text';
import { backwardStep, isAbsurdIntro, nextSteps, nodeOf } from './model';

const HINT_NAMES = ['Orientation', 'Structure', 'Déblocage'];

interface Method {
  id: string;
  why: string;
}

/** Méthodes suggérées par la structure de la preuve et la forme du but. */
export function goalMethods(spec: ProofSpec): Method[] {
  const out: Method[] = [];
  const goal = nodeOf(spec, spec.goal)!;
  const locals = spec.nodes.filter((n) => n.local);
  if (locals.some((n) => isAbsurdIntro(n)) || spec.nodes.some((n) => n.kind === 'contradiction'))
    out.push({ id: 'absurde', why: 'La démonstration procède par l’absurde : on suppose le contraire du but, puis on aboutit à une contradiction.' });
  if (locals.some((n) => /deux solutions|soient\s+\$?u_1/i.test(n.text)) || /unicit|unique/i.test(goal.text))
    out.push({ id: 'unicite', why: 'Une unicité se montre en prenant deux objets qui conviennent et en prouvant qu’ils sont égaux.' });
  if (/il existe|existence/i.test(goal.text)) out.push({ id: 'existence', why: 'Le but affirme une existence : il faut produire l’objet, ou l’obtenir par un théorème.' });
  if (locals.some((n) => /^Soit\s.*(suite|\(u_n\)|\(x_n\)|\(a_n)/i.test(n.text)) && /ferm/i.test(goal.text))
    out.push({ id: 'ferme', why: 'Pour une fermeture, on prend une suite de la partie qui converge, et l’on montre que sa limite y reste.' });
  if (locals.some((n) => /t\\in\[0,1\]/.test(n.text)))
    out.push({ id: 'convexe', why: 'Pour une convexité, on prend deux points et un paramètre $t\\in[0,1]$, et l’on vérifie la combinaison.' });
  if (spec.nodes.some((n) => n.kind === 'application-theoreme'))
    out.push({ id: 'appliquer-theoreme', why: 'Au moins une étape applique un théorème : chacune de ses hypothèses doit figurer parmi les prémisses.' });
  if (!out.length) out.push({ id: 'implication', why: 'Enchaîne des implications depuis les hypothèses jusqu’au but : chaque bloc dit « si … alors … car … ».' });
  return out.filter((m) => DICO_BY_ID.has(m.id));
}

/** Notions citées dans le but qui ont une fiche « comment le montrer ». */
function goalNotions(text: string, track?: DicoTrack): { id: string; how: string }[] {
  const plain = text.split(/(\$\$[\s\S]*?\$\$|\$[^$]+\$)/g).filter((p) => !p.startsWith('$')).join(' ');
  const out: { id: string; how: string }[] = [];
  for (const h of findTerms(plain, matcherFor(track))) {
    if (out.some((o) => o.id === h.id)) continue;
    const how = DICO_BY_ID.get(h.id)?.complements.find((c) => c.kind === 'montrer');
    if (how) out.push({ id: h.id, how: how.text });
  }
  return out.slice(0, 3);
}

export function ProofGuide({
  spec,
  session,
  introduced,
  coaching,
  hints,
  hintLevel,
  onHint,
  plan,
  track,
  displayText,
}: {
  spec: ProofSpec;
  session: ProofSession;
  introduced: ReadonlySet<NodeId>;
  /** Coups de pouce calculés et plan : laboratoire de démonstration seulement. */
  coaching: boolean;
  hints?: readonly [string, string, string];
  hintLevel: number;
  onHint?: (level: number) => void;
  plan?: readonly string[];
  track?: DicoTrack;
  /** Texte affiché dans l'analyse à rebours (effacement progressif : étapes effacées masquées). */
  displayText?: (id: NodeId) => string;
}) {
  const { analysis, passedChecks } = session;
  const goal = nodeOf(spec, spec.goal)!;
  const methods = useMemo(() => goalMethods(spec), [spec]);
  const notions = useMemo(() => goalNotions(goal.text, track), [goal.text, track]);
  const txt = (id: NodeId) => {
    const n = nodeOf(spec, id);
    return n ? nodeText(n, passedChecks) : id;
  };

  return (
    <div className="space-y-4" data-testid="guide-preuve">
      <Card className="p-3.5">
        <SectionTitle className="mb-2">Guide de preuve</SectionTitle>
        <ul className="space-y-2 text-[13.5px]">
          {methods.map((m) => (
            <li key={m.id} className="rounded-md border border-line px-2.5 py-2" data-methode={m.id}>
              <div className="mb-1">
                <TermChip id={m.id} track={track} />
              </div>
              <MathText text={m.why} />
            </li>
          ))}
        </ul>
        {notions.length > 0 && (
          <div className="mt-3">
            <div className="mb-1 font-mono text-[10.5px] uppercase tracking-wider text-text-3">Notions du but</div>
            <ul className="space-y-1.5 text-[13px]">
              {notions.map((n) => (
                <li key={n.id}>
                  <TermChip id={n.id} track={track} /> <Prose text={n.how} className="mt-1 text-[13px] text-text-2" terms={{ exclude: [n.id] }} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </Card>

      {coaching && <Coaching spec={spec} session={session} introduced={introduced} txt={txt} chainTxt={displayText ?? txt} plan={plan} />}

      {!coaching && hints && (
        <Card className="p-3.5">
          <SectionTitle className="mb-2">Indices</SectionTitle>
          <div className="space-y-2.5">
            {[1, 2, 3].map((level) => (
              <div key={level}>
                {hintLevel >= level ? (
                  <div className="anim-rise">
                    <div className="font-mono text-[11px] text-text-3 mb-0.5">
                      {level}. {HINT_NAMES[level - 1]}
                    </div>
                    <p className="text-sm">
                      <MathText text={hints[level - 1]!} terms />
                    </p>
                  </div>
                ) : (
                  level === hintLevel + 1 && (
                    <Button onClick={() => onHint?.(level)} variant="ghost" className="w-full justify-start">
                      Indice {level} : {HINT_NAMES[level - 1]}
                    </Button>
                  )
                )}
              </div>
            ))}
          </div>
          {hintLevel > 0 && <p className="mt-2 text-xs text-text-3">Les indices restent disponibles : ils déterminent seulement si la réussite compte comme autonome.</p>}
        </Card>
      )}

      {analysis.goalReached && (
        <p className="text-[13px] text-proved" role="status">
          Le but est établi : chaque bloc de la chaîne repose sur une règle explicite.
        </p>
      )}
    </div>
  );
}

function Coaching({
  spec,
  session,
  introduced,
  txt,
  chainTxt,
  plan,
}: {
  spec: ProofSpec;
  session: ProofSession;
  introduced: ReadonlySet<NodeId>;
  txt: (id: NodeId) => string;
  /** Texte de l'analyse à rebours, affichée sans demande : peut masquer les étapes effacées. */
  chainTxt: (id: NodeId) => string;
  plan?: readonly string[];
}) {
  const { analysis } = session;
  const [forward, setForward] = useState(false);
  const [reveal, setReveal] = useState<Record<string, number>>({});
  const [path, setPath] = useState<NodeId[]>([]);
  const [planShown, setPlanShown] = useState(0);
  const steps = forward ? nextSteps(spec, analysis, introduced).slice(0, 3) : [];
  const justLabel = (id: string) => spec.justifications.find((j) => j.id === id)?.label ?? id;

  // Chaîne à rebours : le but, puis les prémisses manquantes choisies une à une.
  const chain = [spec.goal, ...path];

  return (
    <Card className="p-3.5" data-testid="coups-de-pouce">
      <SectionTitle className="mb-2">Coups de pouce</SectionTitle>

      <div className="space-y-2">
        <Button variant="ghost" className="w-full justify-start" onClick={() => setForward((v) => !v)} aria-expanded={forward} data-testid="que-etablir">
          Que puis-je établir maintenant ?
        </Button>
        {forward && (
          <ul className="space-y-2 text-[13px] anim-rise" data-testid="etapes-possibles">
            {steps.length === 0 && <li className="text-text-3">{analysis.goalReached ? 'Le but est déjà établi.' : 'Rien de neuf pour l’instant : vérifie les blocs en attente, ou remonte depuis le but.'}</li>}
            {steps.map((s) => {
              const lvl = reveal[s.node] ?? 0;
              return (
                <li key={s.node} className="rounded-md border border-line p-2" data-etape-possible={s.node}>
                  {s.needsIntro.length > 0 && (
                    <p className="mb-1 text-miss">
                      Introduis d’abord : <MathText text={txt(s.needsIntro[0]!)} />
                    </p>
                  )}
                  <p>
                    <span className="font-mono text-[10.5px] uppercase tracking-wider text-text-3">On peut établir </span>
                    <MathText text={txt(s.node)} terms />
                  </p>
                  {lvl >= 1 && (
                    <p className="mt-1 text-text-2">
                      <span className="font-mono text-[10.5px] uppercase tracking-wider text-text-3">À partir de </span>
                      {s.rule.from.length ? s.rule.from.map((p, i) => (
                        <span key={p}>
                          {i > 0 && ' et '}
                          <MathText text={txt(p)} />
                        </span>
                      )) : 'rien d’autre'}
                    </p>
                  )}
                  {lvl >= 2 && (
                    <p className="mt-1 text-text-2">
                      <span className="font-mono text-[10.5px] uppercase tracking-wider text-text-3">Car </span>
                      <MathText text={justLabel(s.rule.by)} terms />
                    </p>
                  )}
                  {lvl < 2 && (
                    <button type="button" className="mt-1 text-[12px] text-accent hover:underline cursor-pointer" onClick={() => setReveal((r) => ({ ...r, [s.node]: lvl + 1 }))}>
                      {lvl === 0 ? 'Quelles prémisses ?' : 'Quelle justification ?'}
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        )}

        <div className="pt-1">
          <div className="mb-1 font-mono text-[10.5px] uppercase tracking-wider text-text-3">Remonter depuis le but</div>
          <ol className="space-y-1.5 text-[13px]" data-testid="analyse-rebours">
            {chain.map((id, depth) => {
              const st = backwardStep(spec, analysis, id);
              const done = analysis.grounded.has(id);
              return (
                <li key={`${id}-${depth}`} style={{ marginLeft: depth * 10 }} className="rounded-md border border-line p-2">
                  <p>
                    <span className="font-mono text-[10.5px] uppercase tracking-wider text-text-3">{depth === 0 ? 'But ' : 'Il suffit d’établir '}</span>
                    <MathText text={chainTxt(id)} />
                    {done && <span className="ml-1 text-proved">✓</span>}
                  </p>
                  {!done && st && depth === chain.length - 1 && (
                    <div className="mt-1">
                      {st.missing.length === 0 ? (
                        <p className="text-text-2">Toutes ses prémisses sont établies : il ne reste qu’à poser le bloc.</p>
                      ) : (
                        <>
                          <p className="text-text-2">Pour cela, il manque :</p>
                          <ul className="mt-0.5 space-y-0.5">
                            {st.missing.map((m) => (
                              <li key={m}>
                                <button type="button" className="text-left text-[12.5px] text-accent hover:underline cursor-pointer" onClick={() => setPath((p) => [...p.slice(0, depth), m])}>
                                  → <MathText text={chainTxt(m)} />
                                </button>
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                    </div>
                  )}
                </li>
              );
            })}
          </ol>
          {path.length > 0 && (
            <button type="button" className="mt-1 text-[12px] text-text-3 hover:underline cursor-pointer" onClick={() => setPath([])}>
              Revenir au but
            </button>
          )}
        </div>

        {plan && plan.length > 0 && (
          <div className="pt-1">
            <div className="mb-1 font-mono text-[10.5px] uppercase tracking-wider text-text-3">Plan de la démonstration</div>
            <ol className="list-decimal space-y-1 pl-5 text-[13px]" data-testid="plan">
              {plan.slice(0, planShown).map((s, i) => (
                <li key={i} className="anim-rise">
                  <MathText text={s} terms />
                </li>
              ))}
            </ol>
            {planShown < plan.length && (
              <Button variant="ghost" className="mt-1 w-full justify-start" onClick={() => setPlanShown((n) => n + 1)} data-testid="plan-suivant">
                {planShown === 0 ? 'Afficher la première étape du plan' : 'Étape suivante du plan'}
              </Button>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
