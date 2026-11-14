import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { CATALOG_BY_ID, CONCEPT_BY_ID, EXERCISES, THEOREM_CATALOG, WORLDS } from '@/content';
import { Card, PageHeader, ProgressBar, SectionTitle, formatDate } from '@/components/ui';
import { MathText } from '@/components/Math';
import { useGame } from '@/storage/store';
import { theoremMastery, worldStats } from '@/core/progression/mastery';
import { toRoman } from './MapPage';

export function DashboardPage() {
  const exercises = useGame((s) => s.save.exercises);
  const conceptErrors = useGame((s) => s.save.conceptErrors);
  const exams = useGame((s) => s.save.exams);
  const now = useGame((s) => s.now);

  const n = now();
  const mastery = useMemo(() => THEOREM_CATALOG.map((t) => ({ t, m: theoremMastery(t.id, exercises, n) })), [exercises, n]);
  const stats = useMemo(() => WORLDS.map((w) => ({ w, s: worldStats(w.n, exercises, n) })), [exercises, n]);
  const solved = Object.values(exercises).filter((e) => e.solved);
  const autonomous = solved.filter((e) => e.bestHintLevel === 0).length;
  const attempts = Object.values(exercises).reduce((s, e) => s + e.attempts, 0);
  const totalErrors = Object.values(conceptErrors).reduce((s, c) => s + c.count, 0);
  const upcoming = useMemo(
    () =>
      Object.entries(exercises)
        .filter(([, p]) => p.srs && p.srs.due > n)
        .sort(([, a], [, b]) => a.srs!.due - b.srs!.due)
        .slice(0, 6),
    [exercises, n],
  );

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-10 py-9">
      <PageHeader eyebrow="Progression" title="Tableau de bord" />

      <dl className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        <Stat k="Exercices validés" v={`${solved.length} / ${EXERCISES.length}`} />
        <Stat k="Réussites autonomes" v={String(autonomous)} sub="Sans aucun indice" />
        <Stat k="Tentatives" v={String(attempts)} />
        <Stat k="Erreurs conceptuelles" v={String(totalErrors)} sub="Alimentent la révision" />
      </dl>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-5 min-w-0">
          <Card className="p-5">
            <SectionTitle className="mb-3">Par monde</SectionTitle>
            <ul className="space-y-3">
              {stats.map(({ w, s }) => (
                <li key={w.id}>
                  <div className="flex justify-between gap-3 text-[13.5px] mb-1">
                    <span><span className="font-mono text-text-3 mr-2">{toRoman(w.n)}</span>{w.title}</span>
                    <span className="tabular text-text-2">{s.solved} / {s.total} · {s.mastered} maîtrisé{s.mastered > 1 ? 's' : ''}</span>
                  </div>
                  <ProgressBar value={s.meanMastery} label={`Maîtrise moyenne du monde ${w.n}`} />
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-5">
            <SectionTitle className="mb-3">Par théorème</SectionTitle>
            <div className="overflow-x-auto">
              <table className="w-full text-[13px]">
                <caption className="sr-only">Maîtrise par théorème</caption>
                <thead>
                  <tr className="text-left text-text-3">
                    <th className="font-normal py-1 pr-3">Résultat</th>
                    <th className="font-normal py-1 pr-3">Validés</th>
                    <th className="font-normal py-1 pr-3">Aide max.</th>
                    <th className="font-normal py-1 pr-3">Tentatives</th>
                    <th className="font-normal py-1 pr-3">Erreurs</th>
                    <th className="font-normal py-1 pr-3">Prochaine</th>
                    <th className="font-normal py-1">Maîtrise</th>
                  </tr>
                </thead>
                <tbody>
                  {mastery.filter(({ m }) => m.attempts > 0).map(({ t, m }) => (
                    <tr key={t.id} className="border-t border-line">
                      <td className="py-1.5 pr-3">
                        <Link className="hover:underline" to={`/theoreme/${t.id}`}><MathText text={t.name} /></Link>
                      </td>
                      <td className="py-1.5 pr-3 tabular">{m.solved} / 3</td>
                      <td className="py-1.5 pr-3 tabular">{m.helpLevel ?? '—'}</td>
                      <td className="py-1.5 pr-3 tabular">{m.attempts}</td>
                      <td className="py-1.5 pr-3 tabular">{m.errors}</td>
                      <td className="py-1.5 pr-3 tabular whitespace-nowrap">{formatDate(m.nextReview)}</td>
                      <td className="py-1.5 tabular">{Math.round(m.value * 100)} %</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {mastery.every(({ m }) => m.attempts === 0) && <p className="text-sm text-text-2 mt-2">Aucune tentative pour l’instant.</p>}
            </div>
          </Card>
        </div>

        <div className="space-y-5">
          <Card className="p-5">
            <SectionTitle className="mb-2">Théorèmes maîtrisés</SectionTitle>
            {mastery.filter(({ m }) => m.status === 'maitrise').length === 0 ? (
              <p className="text-sm text-text-2">Aucun pour l’instant : un résultat est maîtrisé lorsque son exercice difficile a été obtenu de façon autonome.</p>
            ) : (
              <ul className="text-[13.5px] space-y-1">
                {mastery.filter(({ m }) => m.status === 'maitrise').map(({ t }) => (
                  <li key={t.id}><span className="text-hyp mr-1" aria-hidden>●</span><MathText text={t.name} /></li>
                ))}
              </ul>
            )}
          </Card>
          <Card className="p-5">
            <SectionTitle className="mb-2">Concepts à consolider</SectionTitle>
            {Object.keys(conceptErrors).length === 0 ? (
              <p className="text-sm text-text-2">Aucune erreur conceptuelle enregistrée.</p>
            ) : (
              <ul className="text-[13.5px] space-y-1.5">
                {Object.entries(conceptErrors).sort(([, a], [, b]) => b.count - a.count).slice(0, 10).map(([id, c]) => (
                  <li key={id} className="flex justify-between gap-2">
                    <span><MathText text={CONCEPT_BY_ID.get(id)?.label ?? id} /></span>
                    <span className="tabular text-miss">{c.count}</span>
                  </li>
                ))}
              </ul>
            )}
          </Card>
          <Card className="p-5">
            <SectionTitle className="mb-2">Prochaines échéances</SectionTitle>
            {upcoming.length === 0 ? (
              <p className="text-sm text-text-2">Aucune échéance planifiée.</p>
            ) : (
              <ul className="text-[13px] space-y-1">
                {upcoming.map(([id, p]) => {
                  const theorem = CATALOG_BY_ID.get(id.split('.')[0]!);
                  return (
                    <li key={id} className="flex justify-between gap-2">
                      <span className="truncate"><MathText text={theorem?.name ?? id} /></span>
                      <span className="tabular text-text-2 whitespace-nowrap">{formatDate(p.srs!.due)}</span>
                    </li>
                  );
                })}
              </ul>
            )}
          </Card>
          {exams.length > 0 && (
            <Card className="p-5">
              <SectionTitle className="mb-2">Examens</SectionTitle>
              <p className="text-sm text-text-2">{exams.length} examen{exams.length > 1 ? 's' : ''} passé{exams.length > 1 ? 's' : ''}.</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

function Stat({ k, v, sub }: { k: string; v: string; sub?: string }) {
  return (
    <div className="rounded-lg border border-line bg-surface p-4">
      <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-text-3">{k}</dt>
      <dd className="font-serif text-3xl tabular mt-1">{v}</dd>
      {sub && <dd className="text-[12px] text-text-3">{sub}</dd>}
    </div>
  );
}
