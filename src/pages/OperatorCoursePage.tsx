import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { OPERATOR_LESSONS, OPERATOR_LESSON_BY_ID } from '@/content/operateurs';
import { CATALOG_BY_ID, DEMONSTRATION_BY_THEOREM, exercisesOf } from '@/content';
import { MathText, Prose } from '@/components/Math';
import { TermScope } from '@/components/glossary/context';
import { Button, Card, LinkButton, PageHeader, SectionTitle, cx } from '@/components/ui';
import { NotFoundPage } from './NotFoundPage';
import { OPERATOR_PLATES } from '@/components/operator-atlas/data';

type Lesson = (typeof OPERATOR_LESSONS)[number];
type Question = Lesson['questions'][number];

function QuestionCard({ question, n }: { question: Question; n: number }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const correct = selected === question.correctIndex;
  return (
    <fieldset className="rounded-lg border border-line p-4">
      <legend className="px-1 text-sm font-medium">Question {n}</legend>
      <Prose text={question.prompt} className="text-sm mb-3" />
      <div className="space-y-2">
        {question.options.map((option, i) => (
          <label key={i} className={cx('flex gap-3 items-start rounded-md border p-3 text-sm cursor-pointer', selected === i ? 'border-accent bg-surface-2' : 'border-line')}>
            <input type="radio" name={question.id} checked={selected === i} onChange={() => { setSelected(i); setChecked(false); }} className="mt-1 shrink-0" />
            <MathText text={option.text} />
          </label>
        ))}
      </div>
      <Button className="mt-3" disabled={selected === null} onClick={() => setChecked(true)}>Vérifier ma réponse</Button>
      {checked && selected !== null && (
        <div role="status" className="mt-3 rounded-md border border-line bg-surface-2 p-3 text-sm">
          <p className={cx('font-medium mb-1', correct ? 'text-proved' : 'text-miss')}>{correct ? 'Réponse correcte.' : 'Cette réponse ne convient pas.'}</p>
          <Prose text={question.options[selected]!.feedback} />
        </div>
      )}
    </fieldset>
  );
}

function CourseOverview() {
  return (
    <div className="max-w-6xl mx-auto px-6 md:px-10 py-9">
      <PageHeader eyebrow="Analyse fonctionnelle · parcours accompagné" title="Opérateurs et théorie spectrale">
        Des transformations du plan aux opérateurs sur les espaces de fonctions : comprendre les définitions, suivre les démonstrations et manipuler leurs représentations géométriques.
      </PageHeader>
      <Card className="p-5 mb-6">
        <SectionTitle className="mb-2">Comment suivre ce parcours</SectionTitle>
        <p className="text-sm leading-relaxed">Commencez par la norme et les domaines, puis étudiez le spectre et ses décompositions. Chaque leçon associe un cours, un exemple détaillé, une démonstration et des questions avec correction. Les liens conduisent aux preuves jouables déjà présentes dans le laboratoire et à l’atlas interactif.</p>
        <p className="text-sm text-text-2 mt-3">Le théorème spectral général est présenté par une mesure à valeurs projections. Les preuves d’exemples sont détaillées ; les étapes admises de la construction générale sont signalées. Le problème matriciel généralisé est un complément distinct.</p>
        <div className="mt-4"><LinkButton to={`/operateurs/${OPERATOR_LESSONS[0]!.id}`} variant="primary">Commencer le parcours</LinkButton></div>
      </Card>
      <ol className="grid md:grid-cols-2 gap-4">
        {OPERATOR_LESSONS.map((lesson, i) => (
          <li key={lesson.id}>
            <Link to={`/operateurs/${lesson.id}`} className="block h-full rounded-lg border border-line bg-surface p-5 hover:border-line-strong">
              <span className="font-mono text-xs text-text-3">Leçon {String(i + 1).padStart(2, '0')}</span>
              <h2 className="font-serif text-xl mt-1 mb-2"><MathText text={lesson.title} /></h2>
              <p className="text-sm text-text-2"><MathText text={lesson.lead} /></p>
              <p className="mt-3 text-xs text-text-3">Cours · démonstration · {lesson.questions.length} questions · atlas</p>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}

function LessonView({ lesson }: { lesson: Lesson }) {
  const index = OPERATOR_LESSONS.findIndex((item) => item.id === lesson.id);
  const previous = OPERATOR_LESSONS[index - 1];
  const next = OPERATOR_LESSONS[index + 1];
  const plates = OPERATOR_PLATES.filter((plate) => plate.id === lesson.atlasId || plate.lessonId === lesson.id);
  return (
    <div className="max-w-6xl mx-auto px-6 md:px-10 py-9">
      <PageHeader eyebrow={<Link to="/operateurs" className="hover:underline">Opérateurs et théorie spectrale · Leçon {index + 1} / {OPERATOR_LESSONS.length}</Link>} title={<MathText text={lesson.title} />}>
        <MathText text={lesson.lead} />
      </PageHeader>
      <div className="grid lg:grid-cols-[minmax(0,1fr)_260px] gap-6 items-start">
        <article className="space-y-5 min-w-0">
          {lesson.sections.map((section, i) => (
            <Card key={i} className="p-5 overflow-x-auto">
              <h2 className="font-serif text-xl mb-3"><MathText text={section.title} /></h2>
              <Prose text={section.body} className="text-[14.5px] leading-relaxed" terms />
            </Card>
          ))}
          <Card className="p-5 overflow-x-auto">
            <SectionTitle className="mb-2">Exemple travaillé</SectionTitle>
            <h2 className="font-serif text-xl mb-3"><MathText text={lesson.example.title} /></h2>
            <Prose text={lesson.example.body} className="text-[14.5px] leading-relaxed" terms />
          </Card>
          <Card className="p-5 overflow-x-auto">
            <SectionTitle className="mb-2">Démonstration</SectionTitle>
            <h2 className="font-serif text-xl mb-2"><MathText text={lesson.proof.title} /></h2>
            <p className="font-mono text-xs text-text-3 mb-2">{lesson.proof.scope === 'theorem-roadmap' ? 'Plan du théorème · étapes admises précisées' : 'Démonstration du résultat indiqué'}</p>
            <Prose text={lesson.proof.scopeNote} className="text-sm text-text-2 mb-4" />
            <ol className="space-y-3 list-decimal pl-5 marker:text-text-3">
              {lesson.proof.steps.map((step, i) => <li key={i} className="pl-1"><Prose text={step} className="text-[14.5px] leading-relaxed" terms /></li>)}
            </ol>
          </Card>
          <Card className="p-5">
            <SectionTitle className="mb-3">Points à distinguer</SectionTitle>
            <ul className="space-y-3 list-disc pl-4 text-sm">
              {lesson.pitfalls.map((pitfall, i) => <li key={i}><MathText text={pitfall} terms /></li>)}
            </ul>
          </Card>
          <section aria-labelledby="operator-questions">
            <h2 id="operator-questions" className="font-serif text-2xl mb-3">À vous de raisonner</h2>
            <div className="space-y-4">{lesson.questions.map((question, i) => <QuestionCard key={`${lesson.id}:${question.id}`} question={question} n={i + 1} />)}</div>
          </section>
        </article>
        <aside className="space-y-4">
          <Card className="p-4">
            <SectionTitle className="mb-2">Voir et manipuler</SectionTitle>
            <p className="text-sm text-text-2 mb-3">Faire varier les paramètres, formuler une prédiction et lire ce que la figure permet de conclure.</p>
            <ul className="space-y-3 text-sm">{plates.map((plate) => <li key={plate.id}><Link to={`/atlas/operateurs/${plate.id}`} className="underline"><MathText text={plate.title} /></Link></li>)}</ul>
          </Card>
          {lesson.prerequisites.length > 0 && (
            <Card className="p-4">
              <SectionTitle className="mb-2">Avant cette leçon</SectionTitle>
              <ul className="space-y-2 text-sm">{lesson.prerequisites.map((id) => <li key={id}><Link to={`/operateurs/${id}`} className="underline"><MathText text={OPERATOR_LESSON_BY_ID.get(id)?.title ?? id} /></Link></li>)}</ul>
            </Card>
          )}
          <Card className="p-4">
            <SectionTitle className="mb-3">Résultats et preuves jouables</SectionTitle>
            <ul className="space-y-4 text-sm">
              {lesson.theoremIds.map((id) => {
                const demo = DEMONSTRATION_BY_THEOREM.get(id);
                const exercise = exercisesOf(id).find((item) => item.proof.purpose === 'demonstration');
                const demoLink = demo ? `/labo/demonstration?resultat=${id}` : exercise ? `/labo/demonstration?exercice=${exercise.id}` : null;
                return <li key={id}>
                  <Link to={`/theoreme/${id}`} className="underline"><MathText text={CATALOG_BY_ID.get(id)?.name ?? id} /></Link>
                  {demoLink && <Link to={demoLink} className="block text-xs text-text-2 underline mt-1">Travailler la démonstration{demo?.scope === 'partie' ? ' (une partie)' : ''}</Link>}
                </li>;
              })}
            </ul>
          </Card>
          <Card className="p-4">
            <SectionTitle className="mb-2">Sources du cours</SectionTitle>
            <ul className="space-y-2 text-xs text-text-2">{lesson.sources.map((source, i) => <li key={i}>{source.label}{source.pdfPages.length > 0 ? ` · pages PDF ${source.pdfPages.join(', ')}` : ''}{source.kind === 'complement' ? ' · complément pédagogique' : ''}</li>)}</ul>
          </Card>
          <nav aria-label="Leçons sur les opérateurs" className="rounded-lg border border-line p-3">
            <ol className="space-y-1 text-xs">{OPERATOR_LESSONS.map((item, i) => <li key={item.id}><Link to={`/operateurs/${item.id}`} aria-current={item.id === lesson.id ? 'page' : undefined} className={cx('block rounded px-2 py-1.5', item.id === lesson.id ? 'bg-surface-3 font-medium' : 'text-text-2 hover:bg-surface-2')}><span className="font-mono">{i + 1}.</span> <MathText text={item.title} /></Link></li>)}</ol>
          </nav>
        </aside>
      </div>
      <nav aria-label="Suite du parcours" className="mt-8 flex flex-wrap justify-between gap-3">
        {previous ? <LinkButton to={`/operateurs/${previous.id}`}>← Leçon précédente</LinkButton> : <LinkButton to="/operateurs">Sommaire</LinkButton>}
        {next ? <LinkButton to={`/operateurs/${next.id}`} variant="primary">Leçon suivante →</LinkButton> : <LinkButton to="/operateurs">Revenir au sommaire</LinkButton>}
      </nav>
    </div>
  );
}

export function OperatorCoursePage() {
  const { lessonId } = useParams();
  const lesson = lessonId ? OPERATOR_LESSON_BY_ID.get(lessonId) : undefined;
  if (lessonId && !lesson) return <NotFoundPage />;
  return <TermScope track="analyse">{lesson ? <LessonView key={lesson.id} lesson={lesson} /> : <CourseOverview />}</TermScope>;
}
