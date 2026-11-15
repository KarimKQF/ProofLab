import { useEffect, useMemo, useRef, useState } from 'react';
import { CATALOG_BY_ID, EXERCISES } from '@/content';
import { LEVEL_LABEL, RUBRIC_CRITERIA, type Exercise } from '@/content/schema';
import { allowedTheorems } from '@/content/catalog';
import { Button, Card, cx, PageHeader, SectionTitle } from '@/components/ui';
import { MathText, Prose } from '@/components/Math';
import { ProofWorkspace } from '@/components/proof/ProofWorkspace';
import type { ProofSession } from '@/components/proof/useProofSession';
import { scoreGraph, type ProofScore } from '@/core/proof-engine/engine';
import { useGame } from '@/storage/store';
import { isUnlocked } from '@/core/progression/mastery';

/**
 * « variante » : graphe de preuve noté par le vérifieur structurel (déterministe).
 * « enonce » : rédaction libre, évaluée par auto-évaluation sur la grille (pédagogique, non formelle).
 */
interface ExamItem {
  exercise: Exercise;
  kind: 'variante' | 'enonce';
}

function shuffle<T>(items: T[], seed: number): T[] {
  const arr = [...items];
  let s = seed;
  for (let i = arr.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    [arr[i], arr[j]] = [arr[j]!, arr[i]!];
  }
  return arr;
}

/** Tirage : uniquement des énoncés nouveaux (variantes), sur les résultats accessibles. */
function drawExam(count: number, seed: number, unlocked: (id: string) => boolean, withRedaction: boolean): ExamItem[] {
  const graphs = shuffle(EXERCISES.filter((e) => e.variant.proof && unlocked(e.theoremId)), seed)
    .slice(0, count)
    .map((exercise) => ({ exercise, kind: 'variante' as const }));
  if (!withRedaction) return graphs;
  const used = new Set(graphs.map((g) => g.exercise.id));
  const redaction = shuffle(EXERCISES.filter((e) => unlocked(e.theoremId) && !used.has(e.id)), seed + 7)[0];
  return redaction ? [...graphs, { exercise: redaction, kind: 'enonce' as const }] : graphs;
}

const TIME_OPTIONS: (number | null)[] = [null, 20, 40, 60];

export function ExamPage() {
  const exercises = useGame((s) => s.save.exercises);
  const unlockAll = useGame((s) => s.save.settings.unlockAll);
  const examMinutes = useGame((s) => s.save.settings.examMinutes);
  const setSettings = useGame((s) => s.setSettings);
  const history = useGame((s) => s.save.exams);
  const [count, setCount] = useState(3);
  const [withRedaction, setWithRedaction] = useState(false);
  const [items, setItems] = useState<ExamItem[] | null>(null);
  const [startedAt, setStartedAt] = useState(0);

  const unlocked = (id: string) => isUnlocked(id, exercises, unlockAll);
  const available = EXERCISES.filter((e) => e.variant.proof && unlocked(e.theoremId)).length;

  if (items) {
    return <ExamRun items={items} minutes={examMinutes} startedAt={startedAt} onExit={() => setItems(null)} />;
  }

  return (
    <div className="max-w-3xl mx-auto px-6 md:px-10 py-9">
      <PageHeader eyebrow="Mode 5" title="Examen">
        Énoncés nouveaux, aucun indice automatique, grille à cinq critères : Hypothèses, Méthode, Validité des étapes, Justifications, Conclusion.
      </PageHeader>
      <Card className="p-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm">
            <span className="block mb-1 text-text-2">Nombre de preuves à construire</span>
            <select value={count} onChange={(e) => setCount(Number(e.target.value))} className="w-full rounded-md border border-line-strong bg-surface-2 px-2.5 py-2">
              {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          </label>
          <label className="text-sm">
            <span className="block mb-1 text-text-2">Durée</span>
            <select
              value={examMinutes ?? ''}
              onChange={(e) => setSettings({ examMinutes: e.target.value ? Number(e.target.value) : null })}
              className="w-full rounded-md border border-line-strong bg-surface-2 px-2.5 py-2"
            >
              {TIME_OPTIONS.map((m) => <option key={m ?? 'none'} value={m ?? ''}>{m ? `${m} minutes` : 'Sans limite'}</option>)}
            </select>
          </label>
        </div>
        <label className="flex items-start gap-2 mt-4 text-sm cursor-pointer">
          <input type="checkbox" className="mt-1" checked={withRedaction} onChange={(e) => setWithRedaction(e.target.checked)} />
          <span>
            Ajouter une question de rédaction libre
            <span className="block text-[12.5px] text-text-3">Évaluée par toi sur la grille après l’épreuve : correction pédagogique, non formelle, comptée à part.</span>
          </span>
        </label>
        <p className="text-[13px] text-text-2 mt-3">
          {available === 0
            ? 'Aucun énoncé disponible pour le moment : valide d’abord un exercice pour ouvrir les résultats correspondants, ou ouvre tout le parcours dans les réglages.'
            : `${available} énoncé${available > 1 ? 's' : ''} disponible${available > 1 ? 's' : ''} sur les résultats ouverts.`}
        </p>
        <Button
          variant="primary"
          className="mt-4"
          disabled={available === 0}
          onClick={() => {
            const started = Date.now();
            setStartedAt(started);
            setItems(drawExam(Math.min(count, available), started % 233280, unlocked, withRedaction));
          }}
        >
          Commencer l’examen
        </Button>
      </Card>

      {history.length > 0 && (
        <Card className="p-5 mt-5">
          <SectionTitle className="mb-2">Examens passés</SectionTitle>
          <ul className="space-y-1.5 text-sm">
            {[...history].reverse().slice(0, 10).map((h) => {
              const det = h.items.filter((i) => i.mode === 'deterministe');
              const mean = Math.round(det.reduce((s, i) => s + i.score, 0) / Math.max(det.length, 1));
              const ok = det.filter((i) => i.validated).length;
              return (
                <li key={h.id} className="flex justify-between gap-3">
                  <span>{new Date(h.at).toLocaleDateString('fr-FR')} · {det.length} preuve{det.length > 1 ? 's' : ''}</span>
                  <span className="tabular">{mean} / 100 · {ok} validée{ok > 1 ? 's' : ''}</span>
                </li>
              );
            })}
          </ul>
        </Card>
      )}
    </div>
  );
}

function ExamRun({ items, minutes, startedAt, onExit }: { items: ExamItem[]; minutes: number | null; startedAt: number; onExit: () => void }) {
  const recordExam = useGame((s) => s.recordExam);
  const now = useGame((s) => s.now);
  const [index, setIndex] = useState(0);
  const [results, setResults] = useState<ProofScore[] | null>(null);
  const [texts, setTexts] = useState<Record<number, string>>({});
  const [selfEval, setSelfEval] = useState<Record<number, Record<string, number>>>({});
  const sessions = useRef(new Map<number, ProofSession>());
  const [remaining, setRemaining] = useState(minutes ? minutes * 60 : null);

  const emptyScore = (): ProofScore => ({ total: 0, byCriterion: Object.fromEntries(RUBRIC_CRITERIA.map((c) => [c, 0])), validated: false });

  const persist = (scores: ProofScore[], evals: Record<number, Record<string, number>>) => {
    recordExam({
      id: `exam-${startedAt}`,
      at: now(),
      minutes,
      durationMs: now() - startedAt,
      items: items.map((item, i) => {
        if (item.kind === 'enonce') {
          const e = evals[i] ?? {};
          return {
            exerciseId: item.exercise.id,
            kind: item.kind,
            validated: false,
            score: Object.values(e).reduce((s, v) => s + v, 0),
            byCriterion: e,
            mode: 'pedagogique' as const,
          };
        }
        return {
          exerciseId: item.exercise.id,
          kind: item.kind,
          validated: scores[i]!.validated,
          score: scores[i]!.total,
          byCriterion: scores[i]!.byCriterion,
          mode: 'deterministe' as const,
        };
      }),
    });
  };

  const finish = () => {
    if (results) return;
    const scores = items.map((item, i) => {
      if (item.kind === 'enonce') return emptyScore();
      const s = sessions.current.get(i);
      return s ? scoreGraph(item.exercise.variant.proof!, s.graph, s.analysis, item.exercise.rubric) : emptyScore();
    });
    setResults(scores);
    persist(scores, selfEval);
  };

  useEffect(() => {
    if (remaining === null || results) return;
    if (remaining <= 0) {
      finish();
      return;
    }
    const h = setTimeout(() => setRemaining((r) => (r === null ? r : r - 1)), 1000);
    return () => clearTimeout(h);
  }); // eslint-disable-line react-hooks/exhaustive-deps

  if (results) {
    const graphIdx = items.map((it, i) => (it.kind === 'variante' ? i : -1)).filter((i) => i >= 0);
    const mean = Math.round(graphIdx.reduce((s, i) => s + results[i]!.total, 0) / Math.max(graphIdx.length, 1));
    return (
      <div className="max-w-4xl mx-auto px-6 md:px-10 py-9">
        <PageHeader eyebrow="Examen terminé" title={`${mean} / 100`}>
          Note des preuves construites, calculée à partir de leur structure. Une preuve « validée » suit des règles explicites ; ce n’est pas une preuve formelle. La rédaction libre est évaluée à part.
        </PageHeader>
        <div className="space-y-4">
          {items.map((item, i) => {
            const r = results[i]!;
            const head = (
              <span className="font-mono text-[11px] text-text-3">
                <MathText text={CATALOG_BY_ID.get(item.exercise.theoremId)!.name} /> · {LEVEL_LABEL[item.exercise.level]}
              </span>
            );
            if (item.kind === 'enonce') {
              const e = selfEval[i] ?? {};
              const total = Object.values(e).reduce((s, v) => s + v, 0);
              return (
                <Card className="p-5" key={item.exercise.id}>
                  <div className="flex flex-wrap justify-between gap-2 mb-1">
                    {head}
                    <span className="text-[13px] font-medium text-miss">Rédaction : évaluation pédagogique, non formelle</span>
                  </div>
                  <Prose text={item.exercise.variant.statement} className="text-[15px] mb-3" />
                  <SectionTitle className="mb-1">Ta rédaction</SectionTitle>
                  {texts[i]?.trim() ? <Prose text={texts[i]!} className="text-[14.5px] mb-3" /> : <p className="text-sm text-text-3 mb-3">Aucune rédaction.</p>}
                  <SectionTitle className="mb-1">Solution de référence</SectionTitle>
                  <Prose text={item.exercise.variant.solution} className="text-[14.5px] mb-3" terms />
                  <SectionTitle className="mb-1.5">Auto-évaluation</SectionTitle>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {item.exercise.rubric.map((c) => (
                      <li key={c.criterion} className="text-[13px]">
                        <div className="flex justify-between"><span>{c.criterion}</span><span className="tabular">{e[c.criterion] ?? 0} / {c.points}</span></div>
                        <input
                          type="range"
                          className="w-full"
                          min={0}
                          max={c.points}
                          aria-label={`Points pour ${c.criterion}`}
                          value={e[c.criterion] ?? 0}
                          onChange={(ev) => {
                            const next = { ...selfEval, [i]: { ...e, [c.criterion]: Number(ev.target.value) } };
                            setSelfEval(next);
                            persist(results, next);
                          }}
                        />
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 font-serif text-xl tabular">{total} / 100 <span className="text-sm text-text-3 font-sans">(auto-évaluation)</span></p>
                </Card>
              );
            }
            return (
              <Card className="p-5" key={item.exercise.id}>
                <div className="flex flex-wrap justify-between gap-2 mb-1">
                  {head}
                  <span className={cx('text-[13px] font-medium', r.validated ? 'text-proved' : 'text-miss')}>
                    {r.validated ? 'Preuve validée (vérifieur structurel)' : 'Preuve incomplète'}
                  </span>
                </div>
                <div className="text-[15px] mb-3">
                  <Prose text={item.exercise.variant.statement} />
                </div>
                <dl className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-[13px]">
                  {item.exercise.rubric.map((c) => (
                    <div key={c.criterion}>
                      <dt className="text-text-3 text-[12px]">{c.criterion}</dt>
                      <dd className="tabular">{r.byCriterion[c.criterion] ?? 0} / {c.points}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-3 font-serif text-xl tabular">{r.total} / 100</p>
              </Card>
            );
          })}
        </div>
        <Button variant="primary" className="mt-5" onClick={onExit}>Terminer</Button>
      </div>
    );
  }

  const item = items[index]!;

  return (
    <div className="max-w-[1500px] mx-auto px-5 md:px-8 py-7">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <div className="font-mono text-xs text-text-3">Examen · Énoncé {index + 1} / {items.length}{item.kind === 'enonce' ? ' · Rédaction libre' : ''}</div>
        <div className="flex items-center gap-2">
          {remaining !== null && (
            <span className="font-mono text-sm tabular" role="timer" aria-label="Temps restant">
              {String(Math.floor(remaining / 60)).padStart(2, '0')}:{String(remaining % 60).padStart(2, '0')}
            </span>
          )}
          <Button disabled={index === 0} onClick={() => setIndex((i) => i - 1)}>Précédent</Button>
          <Button disabled={index === items.length - 1} onClick={() => setIndex((i) => i + 1)}>Suivant</Button>
          <Button variant="primary" onClick={finish}>Rendre la copie</Button>
        </div>
      </div>
      <Card className="p-4 mb-4">
        <SectionTitle className="mb-1.5">Énoncé</SectionTitle>
        <Prose text={item.exercise.variant.statement} className="font-serif text-[16.5px] leading-relaxed" terms />
      </Card>
      {items.map((it, i) => (
        <div key={it.exercise.id} hidden={i !== index}>
          {it.kind === 'enonce' ? (
            <div className="grid gap-4 lg:grid-cols-2">
              <Card className="p-3.5">
                <label htmlFor={`redaction-${i}`}><SectionTitle className="mb-1.5">Ta démonstration</SectionTitle></label>
                <textarea
                  id={`redaction-${i}`}
                  value={texts[i] ?? ''}
                  onChange={(e) => setTexts((t) => ({ ...t, [i]: e.target.value }))}
                  className="min-h-80 w-full resize-y rounded-md border border-line-strong bg-surface-2 p-3 font-mono text-[13px]"
                />
              </Card>
              <Card className="p-3.5 overflow-auto">
                <SectionTitle className="mb-1.5">Aperçu</SectionTitle>
                {texts[i]?.trim() ? <Prose text={texts[i]!} /> : <p className="text-sm text-text-3">L’aperçu apparaîtra ici.</p>}
              </Card>
            </div>
          ) : (
            <ExamWorkspace item={it} index={i} sessions={sessions.current} />
          )}
        </div>
      ))}
    </div>
  );
}

function ExamWorkspace({ item, index, sessions }: { item: ExamItem; index: number; sessions: Map<number, ProofSession> }) {
  const spec = item.exercise.variant.proof!;
  const allowed = useMemo(() => allowedTheorems(item.exercise.theoremId, spec.purpose, item.exercise.prerequisites), [item, spec]);
  return (
    <ProofWorkspace
      spec={spec}
      allowed={allowed}
      draftKey={null}
      errorKey={item.exercise.id}
      mode="examen"
      guided={false}
      onSession={(s) => {
        sessions.set(index, s);
      }}
    />
  );
}
