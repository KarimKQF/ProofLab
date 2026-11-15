import { useMemo, useRef, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { CATALOG_BY_ID, EXERCISE_BY_ID, exercisesOf } from '@/content';
import { LEVEL_LABEL, type Exercise, type ProofSpec } from '@/content/schema';
import { allowedTheorems, theoremLabel } from '@/content/catalog';
import { Button, Card, Chip, LinkButton, PageHeader, SectionTitle, sourceRef, REVIEW_LABEL, VERIFICATION_LABEL } from '@/components/ui';
import { MathText, Prose } from '@/components/Math';
import { TermScope } from '@/components/glossary/context';
import { trackOfTheorem } from '@/content/dictionnaire';
import { ProofWorkspace } from '@/components/proof/ProofWorkspace';
import { CheckInput } from '@/components/proof/CheckInput';
import type { AttemptStats, ProofSession } from '@/components/proof/useProofSession';
import { analyzeGraph } from '@/core/proof-engine/engine';
import { useGame } from '@/storage/store';
import { NotFoundPage } from './NotFoundPage';

export function ExercisePage() {
  const { id = '' } = useParams();
  const [search] = useSearchParams();
  const exercise = EXERCISE_BY_ID.get(id);
  if (!exercise) return <NotFoundPage />;
  const variant = search.get('variante') === '1';
  return <ExerciseRun key={`${id}:${variant}`} exercise={exercise} variant={variant} />;
}

function ExerciseRun({ exercise, variant }: { exercise: Exercise; variant: boolean }) {
  const spec: ProofSpec | undefined = variant ? exercise.variant.proof : exercise.proof;
  const statement = variant ? exercise.variant.statement : exercise.statement;
  const solution = variant ? exercise.variant.solution : exercise.solution;
  const entry = CATALOG_BY_ID.get(exercise.theoremId)!;

  const expertBank = useGame((s) => s.save.settings.expertBank);
  const setSettings = useGame((s) => s.setSettings);
  const recordAttempt = useGame((s) => s.recordAttempt);
  const markSolutionViewed = useGame((s) => s.markSolutionViewed);
  const draftKey = `${exercise.id}${variant ? ':variante' : ''}`;
  const draft = useGame((s) => s.save.drafts[draftKey]);

  const setDraft = useGame((s) => s.setDraft);
  const now = useGame((s) => s.now);

  const allowed = useMemo(
    () => (spec ? allowedTheorems(exercise.theoremId, spec.purpose, exercise.prerequisites) : null),
    [spec, exercise],
  );

  // Une preuve rouverte déjà complète : la tentative est close, rien ne doit plus être enregistré.
  const [initiallySolved] = useState(() =>
    Boolean(
      spec &&
        draft &&
        analyzeGraph(spec, draft.graph, { allowedTheorems: allowed, passedChecks: new Set(draft.passedChecks) }).goalReached,
    ),
  );

  const [maxHint, setMaxHint] = useState(draft?.hints ?? 0);
  const maxHintRef = useRef(maxHint);
  const [showSolution, setShowSolution] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [solvedNow, setSolvedNow] = useState(initiallySolved);
  const [closedOk, setClosedOk] = useState<Set<number>>(new Set());
  const [attempt, setAttempt] = useState(0);
  const sessionRef = useRef<ProofSession | null>(null);
  const viewedRef = useRef(Boolean(draft?.viewed));

  const onHint = (level: number) => {
    maxHintRef.current = Math.max(maxHintRef.current, level);
    setMaxHint(maxHintRef.current);
  };

  const onSolved = (stats: AttemptStats) => {
    setSolvedNow(true);
    recordAttempt(
      exercise.id,
      {
        solved: true,
        maxHintLevel: maxHintRef.current,
        refusedSteps: stats.refused,
        validSteps: stats.validSteps,
        solutionViewed: viewedRef.current,
      },
      { variant },
    );
  };

  /** Consulter la solution clôt la tentative comme non autonome, une seule fois. */
  const viewSolution = () => {
    if (!solvedNow && !viewedRef.current) {
      viewedRef.current = true;
      markSolutionViewed(exercise.id);
      recordAttempt(exercise.id, {
        solved: false,
        maxHintLevel: maxHintRef.current,
        refusedSteps: sessionRef.current?.refused ?? 0,
        validSteps: sessionRef.current?.validSteps ?? 0,
        solutionViewed: true,
      });
      const current = useGame.getState().save.drafts[draftKey];
      setDraft(draftKey, {
        graph: current?.graph ?? { placed: [], steps: {} },
        passedChecks: current?.passedChecks ?? [],
        hints: current?.hints ?? maxHintRef.current,
        refused: current?.refused ?? 0,
        updatedAt: now(),
        viewed: true,
      });
    }
    setConfirming(false);
    setShowSolution(true);
  };

  /** Nouvelle tentative explicite : graphe, indices et solution consultée repartent de zéro. */
  const restartAttempt = () => {
    sessionRef.current?.restart();
    maxHintRef.current = 0;
    setMaxHint(0);
    viewedRef.current = false;
    setSolvedNow(false);
    setShowSolution(false);
    setAttempt((a) => a + 1);
  };

  const closed = variant ? exercise.variant.closedChecks : exercise.closedChecks;
  const siblings = exercisesOf(exercise.theoremId);
  const next = siblings[siblings.findIndex((e) => e.id === exercise.id) + 1];

  return (
    <TermScope track={trackOfTheorem(exercise.theoremId)}>
    <div className="max-w-[1500px] mx-auto px-5 md:px-8 py-7">
      <PageHeader
        eyebrow={
          <>
            <Link to={`/theoreme/${exercise.theoremId}`} className="hover:text-text-2">
              <MathText text={entry.name} />
            </Link>{' '}
            · {LEVEL_LABEL[exercise.level]}
            {variant && ' · Variante'}
          </>
        }
        title={<MathText text={exercise.title} />}
      />

      <Card className="p-4 mb-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0 max-w-4xl">
            <SectionTitle className="mb-1.5">Énoncé</SectionTitle>
            <Prose text={statement} className="font-serif text-[16.5px] leading-relaxed" terms />
          </div>
          {spec && (
            <label className="flex items-center gap-2 text-[13px] text-text-2 cursor-pointer shrink-0">
              <input type="checkbox" checked={!expertBank} onChange={(e) => setSettings({ expertBank: !e.target.checked })} />
              Banque progressive
            </label>
          )}
        </div>
        <div className="flex flex-wrap gap-1.5 mt-2.5">
          {exercise.prerequisites.map((p) => (
            <Chip key={p}>
              <MathText text={theoremLabel(p)} />
            </Chip>
          ))}
          <Chip>
            {sourceRef(exercise.source)}
          </Chip>
        </div>
      </Card>

      {spec ? (
        <ProofWorkspace
          key={attempt}
          spec={spec}
          allowed={allowed}
          draftKey={draftKey}
          errorKey={exercise.id}
          track={trackOfTheorem(exercise.theoremId)}
          mode="guide"
          guided={!expertBank}
          hints={exercise.hints}
          onHintUsed={onHint}
          onSolved={onSolved}
          onSession={(s) => {
            sessionRef.current = s;
          }}
          solvedSlot={
            <Card className="p-4 anim-rise" >
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="text-proved font-semibold">Preuve validée.</span>
                <span className="text-[13px] text-text-2">
                  {maxHint === 0 ? 'Sans indice : réussite autonome.' : `Avec ${maxHint} indice${maxHint > 1 ? 's' : ''} : la révision proposera de refaire sans aide.`}
                </span>
              </div>
              <p className="text-[12.5px] text-text-3 mb-3">
                Chaque étape suit une règle explicitement justifiée dans ce contenu. Il s’agit d’une vérification structurelle, non d’une preuve formelle au sens d’un assistant de preuve.
              </p>
              <div className="flex flex-wrap gap-2">
                <LinkButton to={`/preuve-libre/${exercise.id}${variant ? '?variante=1' : ''}`} variant="primary">
                  Rédiger ma propre preuve
                </LinkButton>
                <Button onClick={restartAttempt} data-testid="restart-attempt">Refaire sans aide</Button>
                {!variant && exercise.variant.proof && <LinkButton to={`/preuve/${exercise.id}?variante=1`}>Essayer la variante</LinkButton>}
                {!variant && !exercise.variant.proof && <LinkButton to={`/preuve-libre/${exercise.id}?variante=1`}>Traiter la variante</LinkButton>}
                {next && <LinkButton to={`/preuve/${next.id}`}>Exercice suivant</LinkButton>}
                <LinkButton to={`/theoreme/${exercise.theoremId}`} variant="ghost">Retour à la fiche</LinkButton>
              </div>
            </Card>
          }
        />
      ) : (
        <Card className="p-5">
          <p className="text-sm mb-3">
            Cette variante se traite en preuve libre : elle n’a pas de graphe vérifiable automatiquement.
          </p>
          <LinkButton to={`/preuve-libre/${exercise.id}?variante=1`} variant="primary">Rédiger la démonstration</LinkButton>
        </Card>
      )}

      {closed && closed.length > 0 && (
        <Card className="p-4 mt-4 max-w-3xl">
          <SectionTitle className="mb-2">Calculs exacts</SectionTitle>
          <div className="space-y-4">
            {closed.map((c, i) => (
              <CheckInput key={i} check={c} done={closedOk.has(i)} onResult={(r) => r.status === 'valide' && setClosedOk((s) => new Set(s).add(i))} />
            ))}
          </div>
        </Card>
      )}

      <div className="mt-4 grid gap-4 lg:grid-cols-2 max-w-5xl">
        <Card className="p-4">
          <SectionTitle className="mb-2">Solution de référence</SectionTitle>
          {!showSolution ? (
            confirming ? (
              <div>
                <p className="text-sm mb-2.5">Consulter la solution avant d’avoir conclu ne compte pas comme une réussite autonome. Aucune pénalité n’est appliquée par ailleurs.</p>
                <div className="flex gap-2">
                  <Button variant="danger" onClick={viewSolution}>Afficher quand même</Button>
                  <Button variant="ghost" onClick={() => setConfirming(false)}>Continuer à chercher</Button>
                </div>
              </div>
            ) : (
              <Button onClick={() => (solvedNow ? setShowSolution(true) : setConfirming(true))} variant="ghost">Afficher la solution</Button>
            )
          ) : (
            <Prose text={solution} className="text-[14.5px] anim-rise" terms />
          )}
        </Card>
        <Card className="p-4">
          <SectionTitle className="mb-2">Erreurs fréquentes</SectionTitle>
          <ul className="space-y-1.5 text-[13.5px]">
            {exercise.commonErrors.map((e) => (
              <li key={e.id}>
                <MathText text={e.description} terms />
              </li>
            ))}
          </ul>
          <SectionTitle className="mt-4 mb-1.5">Vérification du contenu</SectionTitle>
          <p className="text-[13px]">{VERIFICATION_LABEL[exercise.verification.origin]}.</p>
          <p className="text-[13px] text-text-2">{REVIEW_LABEL[exercise.verification.review]}.</p>
        </Card>
      </div>
    </div>
    </TermScope>
  );
}
