import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { COUNTEREXAMPLES, COUNTEREXAMPLE_BY_ID, CATALOG_BY_ID } from '@/content';
import { Button, Card, cx, LinkButton, PageHeader, SectionTitle, sourceRef } from '@/components/ui';
import { MathText, Prose } from '@/components/Math';
import { CheckInput } from '@/components/proof/CheckInput';
import { useGame } from '@/storage/store';
import type { CounterexampleTask } from '@/content/schema';

export function CounterexamplesPage() {
  const { id } = useParams();
  if (id) {
    const task = COUNTEREXAMPLE_BY_ID.get(id);
    if (task) return <Task key={id} task={task} />;
  }
  return <TaskList />;
}

function TaskList() {
  const progress = useGame((s) => s.save.counterexamples);
  const [filter, setFilter] = useState<'tous' | 'afaire'>('tous');
  const tasks = useMemo(
    () => COUNTEREXAMPLES.filter((c) => filter === 'tous' || !progress[c.id]?.solved),
    [filter, progress],
  );
  return (
    <div className="max-w-5xl mx-auto px-6 md:px-10 py-9">
      <PageHeader eyebrow="Mode 4" title="Contre-exemples">
        Une assertion trop générale ou fausse t’est présentée. Trouve l’hypothèse manquante ou construis ce qui la fait tomber. Chaque réponse est décidée exactement.
      </PageHeader>
      <div className="flex gap-2 mb-4" role="group" aria-label="Filtre">
        <Button variant={filter === 'tous' ? 'primary' : 'ghost'} onClick={() => setFilter('tous')} aria-pressed={filter === 'tous'}>Toutes</Button>
        <Button variant={filter === 'afaire' ? 'primary' : 'ghost'} onClick={() => setFilter('afaire')} aria-pressed={filter === 'afaire'}>À faire</Button>
      </div>
      <ul className="grid gap-3 md:grid-cols-2">
        {tasks.map((c) => (
          <li key={c.id}>
            <Link to={`/contre-exemples/${c.id}`} className="block h-full rounded-lg border border-line bg-surface p-4 hover:border-line-strong transition-colors">
              <div className="flex justify-between font-mono text-[11px] text-text-3 mb-1">
                <span>{c.theoremId ? <MathText text={CATALOG_BY_ID.get(c.theoremId)?.name ?? ''} /> : 'Transversal'}</span>
                <span style={{ color: progress[c.id]?.solved ? 'var(--st-hyp)' : undefined }}>{progress[c.id]?.solved ? '◆ Résolu' : 'À faire'}</span>
              </div>
              <div className="font-serif text-[17px] mb-1"><MathText text={c.title} /></div>
              <p className="text-[13.5px] text-text-2"><MathText text={c.claim} /></p>
            </Link>
          </li>
        ))}
      </ul>
      {tasks.length === 0 && <p className="text-text-2">Rien à afficher pour ce filtre.</p>}
    </div>
  );
}

function Task({ task }: { task: CounterexampleTask }) {
  const record = useGame((s) => s.recordCounterexample);
  const recordConceptError = useGame((s) => s.recordConceptError);
  const solvedBefore = useGame((s) => Boolean(s.save.counterexamples[task.id]?.solved));
  const [solved, setSolved] = useState(false);
  const [reveal, setReveal] = useState(false);

  return (
    <div className="max-w-3xl mx-auto px-6 md:px-10 py-9">
      <PageHeader
        eyebrow={<Link to="/contre-exemples" className="hover:text-text-2">Contre-exemples</Link>}
        title={<MathText text={task.title} />}
      />
      <Card className="p-5 mb-4" >
        <SectionTitle className="mb-1.5">Assertion</SectionTitle>
        <p className="font-serif text-[17px] leading-relaxed text-invalid"><MathText text={task.claim} terms /></p>
        <SectionTitle className="mt-4 mb-1.5">À produire</SectionTitle>
        <Prose text={task.task} terms />
      </Card>
      <Card className="p-5 mb-4">
        <CheckInput
          check={task.check}
          done={solved}
          buttonLabel="Vérifier"
          onResult={(r) => {
            const ok = r.status === 'valide';
            if (r.status !== 'illisible') record(task.id, ok);
            if (ok) setSolved(true);
            else if (r.status === 'incorrect') recordConceptError(task.concept, `contre-exemple:${task.id}`);
          }}
        />
      </Card>
      {(solved || reveal) && (
        <Card className="p-5 anim-rise">
          <SectionTitle className="mb-1.5">Justification</SectionTitle>
          <Prose text={task.explanation} className="text-[15px]" terms />
          <SectionTitle className="mt-4 mb-1.5">Énoncé exact</SectionTitle>
          <Prose text={task.correctStatement} className={cx('text-[15px]')} terms />
          <p className="text-xs text-text-3 mt-3">
            {sourceRef(task.source)}. 
            <MathText text={task.source.label} />
          </p>
        </Card>
      )}
      <div className="flex gap-2 mt-4">
        {!solved && !reveal && <Button variant="ghost" onClick={() => setReveal(true)}>Afficher l’explication</Button>}
        <LinkButton to="/contre-exemples">Autre assertion</LinkButton>
        {task.theoremId && <LinkButton to={`/theoreme/${task.theoremId}`} variant="ghost">Fiche du résultat</LinkButton>}
      </div>
      {solvedBefore && !solved && <p className="text-xs text-text-3 mt-3">Déjà résolue par le passé.</p>}
    </div>
  );
}
