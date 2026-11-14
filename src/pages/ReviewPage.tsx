import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { CATALOG_BY_ID, CONCEPT_BY_ID, EXERCISE_BY_ID } from '@/content';
import { LEVEL_LABEL } from '@/content/schema';
import { Button, Card, LinkButton, PageHeader, SectionTitle } from '@/components/ui';
import { MathText } from '@/components/Math';
import { useGame } from '@/storage/store';
import { useReviewQueue } from '@/components/useReviewQueue';
import { toRedoWithoutHints } from '@/core/progression/mastery';

const KIND_LABEL = { revision: 'Reprise', variante: 'Variante', reutilisation: 'Réutilisation' } as const;

export function ReviewPage() {
  const queue = useReviewQueue();
  const exercises = useGame((s) => s.save.exercises);
  const conceptErrors = useGame((s) => s.save.conceptErrors);
  const pausedSince = useGame((s) => s.save.settings.pausedSince);
  const setPaused = useGame((s) => s.setPaused);

  const redo = useMemo(() => toRedoWithoutHints(exercises).filter((id) => EXERCISE_BY_ID.has(id)), [exercises]);
  const fragile = useMemo(
    () => Object.entries(conceptErrors).sort(([, a], [, b]) => b.count - a.count).slice(0, 8),
    [conceptErrors],
  );

  return (
    <div className="max-w-5xl mx-auto px-6 md:px-10 py-9">
      <PageHeader eyebrow="Répétition espacée" title="Révisions du jour">
        Les échéances suivent l’algorithme SM-2 : l’intervalle grandit quand la preuve est obtenue sans aide. Aucune série à entretenir ; une pause ne coûte rien.
      </PageHeader>

      {pausedSince !== null ? (
        <Card className="p-5 mb-5">
          <p className="text-sm mb-3">Révisions en pause. Toutes les échéances seront décalées de la durée de la pause, sans pénalité.</p>
          <Button variant="primary" onClick={() => setPaused(false)}>Reprendre les révisions</Button>
        </Card>
      ) : (
        <div className="flex justify-end mb-3">
          <Button variant="ghost" onClick={() => setPaused(true)}>Mettre en pause</Button>
        </div>
      )}

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
        <Card className="p-5">
          <SectionTitle className="mb-3">À réviser maintenant ({queue.length})</SectionTitle>
          {queue.length === 0 ? (
            <p className="text-text-2 text-sm">
              Rien n’est dû aujourd’hui. Les prochaines échéances apparaissent dans le tableau de bord.
            </p>
          ) : (
            <ul className="space-y-2.5">
              {queue.map((q) => {
                const ex = EXERCISE_BY_ID.get(q.exerciseId)!;
                const params = q.kind === 'variante' ? '?variante=1' : '';
                return (
                  <li key={q.exerciseId + q.kind} className="rounded-md border border-line p-3 flex flex-wrap items-center justify-between gap-2">
                    <div className="min-w-0">
                      <div className="font-mono text-[11px] text-text-3">
                        {KIND_LABEL[q.kind]} · <MathText text={CATALOG_BY_ID.get(q.theoremId)!.name} /> · {LEVEL_LABEL[ex.level]}
                      </div>
                      <div className="text-[14.5px]"><MathText text={ex.title} /></div>
                      <p className="text-[12.5px] text-text-2">{q.reason}</p>
                    </div>
                    <LinkButton to={`/preuve/${q.exerciseId}${params}`} variant="primary">Commencer</LinkButton>
                  </li>
                );
              })}
            </ul>
          )}
        </Card>

        <div className="space-y-5">
          <Card className="p-5">
            <SectionTitle className="mb-2">Concepts fragiles</SectionTitle>
            {fragile.length === 0 ? (
              <p className="text-sm text-text-2">Aucune erreur conceptuelle enregistrée.</p>
            ) : (
              <ul className="space-y-2.5 text-[13.5px]">
                {fragile.map(([id, c]) => {
                  const concept = CONCEPT_BY_ID.get(id);
                  return (
                    <li key={id}>
                      <div className="flex justify-between gap-2">
                        <span className="font-medium"><MathText text={concept?.label ?? id} /></span>
                        <span className="tabular text-miss">{c.count}</span>
                      </div>
                      {concept && <p className="text-[12.5px] text-text-2"><MathText text={concept.reminder} /></p>}
                    </li>
                  );
                })}
              </ul>
            )}
          </Card>
          <Card className="p-5">
            <SectionTitle className="mb-2">À refaire sans indice</SectionTitle>
            {redo.length === 0 ? (
              <p className="text-sm text-text-2">Rien pour l’instant.</p>
            ) : (
              <ul className="space-y-1 text-[13.5px]">
                {redo.slice(0, 12).map((id) => (
                  <li key={id}>
                    <Link className="hover:underline" to={`/preuve/${id}`}>
                      <MathText text={EXERCISE_BY_ID.get(id)!.title} />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
