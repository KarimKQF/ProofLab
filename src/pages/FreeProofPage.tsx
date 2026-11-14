import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { CATALOG_BY_ID, EXERCISE_BY_ID } from '@/content';
import { LEVEL_LABEL, type Exercise } from '@/content/schema';
import { Button, Card, cx, PageHeader, SectionTitle } from '@/components/ui';
import { MathText, Prose } from '@/components/Math';
import { CheckInput } from '@/components/proof/CheckInput';
import { attentionPoints, findTexIssues, freeProofVerdict } from '@/core/proof-engine/free-proof';
import { flushPersist, useGame } from '@/storage/store';
import { NotFoundPage } from './NotFoundPage';

export function FreeProofPage() {
  const { id = '' } = useParams();
  const [search] = useSearchParams();
  const exercise = EXERCISE_BY_ID.get(id);
  if (!exercise) return <NotFoundPage />;
  const variant = search.get('variante') === '1';
  return <FreeProof key={`${id}:${variant}`} exercise={exercise} variant={variant} />;
}

type AiState = { state: 'inconnu' } | { state: 'desactive' } | { state: 'disponible' };

/** Copie de secours synchrone d'une rédaction libre (survit à une fermeture brutale). */
const mirrorKey = (key: string) => `prooflab:preuve-libre:${key}`;

function readMirror(key: string): { text: string; at: number } | null {
  try {
    const raw = localStorage.getItem(mirrorKey(key));
    if (!raw) return null;
    const v = JSON.parse(raw) as { text?: unknown; at?: unknown };
    return typeof v.text === 'string' && typeof v.at === 'number' ? { text: v.text, at: v.at } : null;
  } catch {
    return null;
  }
}

function writeMirror(key: string, text: string): void {
  try {
    localStorage.setItem(mirrorKey(key), JSON.stringify({ text, at: Date.now() }));
  } catch {
    // Stockage local indisponible : la sauvegarde principale reste active.
  }
}

function FreeProof({ exercise, variant }: { exercise: Exercise; variant: boolean }) {
  const key = `${exercise.id}${variant ? ':variante' : ''}`;
  const saved = useGame((s) => s.save.freeProofs[key]);
  const saveFreeProof = useGame((s) => s.saveFreeProof);
  const [text, setText] = useState(() => {
    const mirror = readMirror(key);
    return mirror && mirror.at > (saved?.updatedAt ?? 0) ? mirror.text : (saved?.text ?? '');
  });
  const [submitted, setSubmitted] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [selfEval, setSelfEval] = useState<Record<string, number>>(saved?.selfEval ?? {});
  const [failures, setFailures] = useState<Record<number, boolean>>({});
  const [ai, setAi] = useState<AiState>({ state: 'inconnu' });
  const [aiText, setAiText] = useState<string | null>(null);
  const [aiBusy, setAiBusy] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  const statement = variant ? exercise.variant.statement : exercise.statement;
  const solution = variant ? exercise.variant.solution : exercise.solution;
  const closed = (variant ? exercise.variant.closedChecks : exercise.closedChecks) ?? [];
  const entry = CATALOG_BY_ID.get(exercise.theoremId)!;

  // Sauvegarde automatique du brouillon. Chaque frappe est recopiée aussitôt dans le stockage
  // local du navigateur (synchrone) ; la sauvegarde principale suit après 300 ms, et toute
  // frappe en attente est écrite au démontage de la page ou à sa fermeture.
  const first = useRef(true);
  const textRef = useRef(text);
  const dirty = useRef(false);
  useEffect(() => {
    textRef.current = text;
    if (first.current) {
      first.current = false;
      return;
    }
    dirty.current = true;
    writeMirror(key, text);
    const h = setTimeout(() => {
      saveFreeProof(key, text);
      dirty.current = false;
    }, 300);
    return () => clearTimeout(h);
  }, [text, key, saveFreeProof]);

  useEffect(() => {
    const flushText = () => {
      if (!dirty.current) return;
      saveFreeProof(key, textRef.current);
      dirty.current = false;
      void flushPersist();
    };
    window.addEventListener('pagehide', flushText);
    return () => {
      window.removeEventListener('pagehide', flushText);
      flushText();
    };
  }, [key, saveFreeProof]);

  // Le correcteur IA est optionnel : aucune requête n'est émise sans VITE_PROOFLAB_AI=1 au lancement.
  useEffect(() => {
    if (import.meta.env.VITE_PROOFLAB_AI !== '1') {
      setAi({ state: 'desactive' });
      return;
    }
    const ctrl = new AbortController();
    fetch('/api/ai/status', { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : null))
      .then((d: { enabled?: boolean } | null) => setAi({ state: d?.enabled ? 'disponible' : 'desactive' }))
      .catch(() => setAi({ state: 'desactive' }));
    return () => ctrl.abort();
  }, []);

  const texIssues = useMemo(() => findTexIssues(text), [text]);
  const points = useMemo(() => (submitted ? attentionPoints(text, exercise, statement) : []), [submitted, text, exercise, statement]);
  const verdict = freeProofVerdict(Object.values(failures).filter(Boolean).length);

  const askAi = async () => {
    setAiBusy(true);
    setAiError(null);
    try {
      const r = await fetch('/api/ai/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ statement, solution, proof: text }),
      });
      const d = (await r.json()) as { text?: string; error?: string };
      if (!r.ok || !d.text) throw new Error(d.error ?? 'Réponse invalide du correcteur.');
      setAiText(d.text);
    } catch (e) {
      setAiError((e as Error).message);
    } finally {
      setAiBusy(false);
    }
  };

  const total = exercise.rubric.reduce((s, r) => s + (selfEval[r.criterion] ?? 0), 0);

  return (
    <div className="max-w-[1400px] mx-auto px-5 md:px-8 py-7">
      <PageHeader
        eyebrow={
          <>
            <Link to={`/theoreme/${exercise.theoremId}`} className="hover:text-text-2">
              <MathText text={entry.name} />
            </Link>{' '}
            · {LEVEL_LABEL[exercise.level]} · Preuve libre{variant && ' · Variante'}
          </>
        }
        title={<MathText text={exercise.title} />}
      />

      <Card className="p-4 mb-4">
        <SectionTitle className="mb-1.5">Énoncé</SectionTitle>
        <Prose text={statement} className="font-serif text-[16.5px] leading-relaxed" />
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-3.5 flex flex-col">
          <label htmlFor="proof-editor">
            <SectionTitle className="mb-1.5">Ta démonstration (français + LaTeX entre $…$)</SectionTitle>
          </label>
          <textarea
            id="proof-editor"
            value={text}
            onChange={(e) => setText(e.target.value)}
            spellCheck={false}
            placeholder={'Soit $x\\in H$. Par hypothèse…'}
            className="flex-1 min-h-80 w-full resize-y rounded-md border border-line-strong bg-surface-2 p-3 font-mono text-[13px] leading-relaxed text-text"
          />
          <div className="flex items-center justify-between mt-2.5">
            <span className="text-xs text-text-3">Enregistré automatiquement sur cet appareil.</span>
            <Button variant="primary" onClick={() => setSubmitted(true)} disabled={text.trim().length === 0}>
              Évaluer la rédaction
            </Button>
          </div>
        </Card>

        <Card className="p-3.5 overflow-auto">
          <SectionTitle className="mb-1.5">Aperçu</SectionTitle>
          {text.trim() ? <Prose text={text} className="text-[15px]" /> : <p className="text-sm text-text-3">L’aperçu de ta rédaction apparaîtra ici.</p>}
          {texIssues.length > 0 && (
            <ul className="mt-3 space-y-1 text-[13px] text-miss" role="status">
              {texIssues.map((i, n) => (
                <li key={n}>Formule à reprendre : <code className="font-mono">{i.tex}</code></li>
              ))}
            </ul>
          )}
        </Card>
      </div>

      {submitted && (
        <div className="grid gap-4 lg:grid-cols-2 mt-4">
          <Card className="p-4 anim-rise">
            <SectionTitle className="mb-2">Évaluation provisoire</SectionTitle>
            <p className={cx('font-semibold', verdict.status === 'incorrect' ? 'text-invalid' : 'text-miss')} data-testid="free-verdict">
              {verdict.label}
            </p>
            <p className="text-[13.5px] text-text-2 mt-1">{verdict.note}</p>

            {points.length > 0 ? (
              <>
                <SectionTitle className="mt-4 mb-1.5">Points d’attention</SectionTitle>
                <ul className="space-y-1.5 text-[13.5px]">
                  {points.map((p) => (
                    <li key={p.id}>
                      <span className="text-miss mr-1.5" aria-hidden>△</span>
                      <MathText text={p.text} />
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-text-3 mt-2">Indices de relecture, sans effet sur ta progression. Une preuve correcte peut en déclencher.</p>
              </>
            ) : (
              <p className="text-[13.5px] text-text-2 mt-3">Aucun point d’attention relevé : cela ne signifie pas que la preuve est correcte.</p>
            )}

            {closed.length > 0 && (
              <>
                <SectionTitle className="mt-4 mb-1.5">Calculs vérifiables exactement</SectionTitle>
                <div className="space-y-3">
                  {closed.map((c, i) => (
                    <CheckInput key={i} check={c} onResult={(r) => setFailures((f) => ({ ...f, [i]: r.status === 'incorrect' }))} />
                  ))}
                </div>
              </>
            )}

            <SectionTitle className="mt-4 mb-1.5">Correcteur IA (optionnel)</SectionTitle>
            {ai.state === 'disponible' ? (
              <div>
                <p className="text-[12.5px] text-text-3 mb-2">Une relecture par IA n’est jamais une vérification formelle.</p>
                <Button onClick={askAi} disabled={aiBusy}>{aiBusy ? 'Relecture en cours…' : 'Demander une relecture'}</Button>
                {aiError && <p className="text-sm text-invalid mt-2" role="alert">{aiError}</p>}
                {aiText && (
                  <div className="mt-3 rounded border border-line p-3">
                    <p className="font-mono text-[11px] text-text-3 mb-1">Relecture non formelle</p>
                    <Prose text={aiText} className="text-[14px]" />
                  </div>
                )}
              </div>
            ) : (
              <p className="text-[13px] text-text-2">
                Désactivé. L’application fonctionne entièrement sans IA ; l’activation se fait localement par une variable d’environnement (voir le README).
              </p>
            )}
          </Card>

          <Card className="p-4 anim-rise">
            <SectionTitle className="mb-2">Grille d’auto-évaluation (non formelle)</SectionTitle>
            <ul className="space-y-3">
              {exercise.rubric.map((r) => (
                <li key={r.criterion}>
                  <div className="flex justify-between text-[13.5px]">
                    <span className="font-medium">{r.criterion}</span>
                    <span className="tabular text-text-2">{selfEval[r.criterion] ?? 0} / {r.points}</span>
                  </div>
                  <p className="text-[12.5px] text-text-3 mb-1"><MathText text={r.description} /></p>
                  <input
                    type="range"
                    aria-label={`Points pour ${r.criterion}`}
                    min={0}
                    max={r.points}
                    value={selfEval[r.criterion] ?? 0}
                    onChange={(e) => {
                      const next = { ...selfEval, [r.criterion]: Number(e.target.value) };
                      setSelfEval(next);
                      saveFreeProof(key, text, next);
                    }}
                    className="w-full"
                  />
                </li>
              ))}
            </ul>
            <p className="mt-3 font-serif text-xl tabular">{total} / 100</p>
            <p className="text-xs text-text-3">Note personnelle, sans effet sur la maîtrise : seule une preuve validée structurellement fait progresser le parcours.</p>

            <div className="mt-4">
              <Button variant="ghost" className="px-0" onClick={() => setShowSolution((v) => !v)} aria-expanded={showSolution}>
                {showSolution ? 'Masquer la solution de référence' : 'Comparer à la solution de référence'}
              </Button>
              {showSolution && <Prose text={solution} className="text-[14.5px] mt-2 anim-rise" />}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
