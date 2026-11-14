/** Saisie d'une réponse fermée, décidée exactement par le moteur symbolique. */
import { useId, useState } from 'react';
import { evaluateCheck, type CheckResult, type ClosedCheck } from '@/core/math/closed-checks';
import type { ClosedCheckData } from '@/content/schema';
import { Button, cx } from '@/components/ui';
import { MathText } from '@/components/Math';

const fieldClass = 'rounded-md border border-line-strong bg-surface-2 px-2.5 py-1.5 text-sm font-mono text-text w-full tabular';

export function CheckInput({
  check,
  onResult,
  done = false,
  buttonLabel = 'Vérifier le calcul',
}: {
  check: ClosedCheckData;
  onResult?: (r: CheckResult) => void;
  done?: boolean;
  buttonLabel?: string;
}) {
  const id = useId();
  const [value, setValue] = useState('');
  const [values, setValues] = useState<string[]>(() =>
    check.kind === 'rational-vector' ? check.expected.map(() => '') : [],
  );
  const [matrix, setMatrix] = useState<string[][]>(() =>
    check.kind === 'matrix-spd' ? Array.from({ length: check.size }, () => Array(check.size).fill('')) : [],
  );
  const [selected, setSelected] = useState<number[]>([]);
  const [result, setResult] = useState<CheckResult | null>(null);

  const submit = () => {
    const c = check as ClosedCheck;
    const r =
      c.kind === 'rational'
        ? evaluateCheck(c, { kind: 'rational', value })
        : c.kind === 'rational-vector'
          ? evaluateCheck(c, { kind: 'rational-vector', values })
          : c.kind === 'expr-equiv'
            ? evaluateCheck(c, { kind: 'expr-equiv', value })
            : c.kind === 'matrix-spd'
              ? evaluateCheck(c, { kind: 'matrix-spd', values: matrix })
              : evaluateCheck(c, { kind: 'choice', selected });
    setResult(r);
    onResult?.(r);
  };

  return (
    <div className="space-y-2.5">
      <div className="text-sm">
        <MathText text={check.prompt} />
      </div>

      {check.kind === 'rational' && (
        <input aria-label="Valeur exacte" className={fieldClass} value={value} placeholder={check.placeholder ?? 'ex. 3/4'} onChange={(e) => setValue(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && submit()} />
      )}

      {check.kind === 'expr-equiv' && (
        <input aria-label={`Expression en ${check.vars.join(', ')}`} className={fieldClass} value={value} placeholder={check.placeholder ?? `Expression en ${check.vars.join(', ')}`} onChange={(e) => setValue(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && submit()} />
      )}

      {check.kind === 'rational-vector' && (
        <div className="flex gap-2">
          {check.expected.map((_, i) => (
            <label key={i} className="flex-1">
              <span className="font-mono text-[11px] text-text-3">{check.labels?.[i] ?? `x${i + 1}`}</span>
              <input
                className={fieldClass}
                value={values[i] ?? ''}
                aria-label={`Composante ${i + 1}`}
                onChange={(e) => setValues((v) => v.map((x, j) => (j === i ? e.target.value : x)))}
                onKeyDown={(e) => e.key === 'Enter' && submit()}
              />
            </label>
          ))}
        </div>
      )}

      {check.kind === 'matrix-spd' && (
        <div className="inline-grid gap-1.5" style={{ gridTemplateColumns: `repeat(${check.size}, 5.5rem)` }} role="group" aria-label="Coefficients de la matrice">
          {matrix.flatMap((row, i) =>
            row.map((cell, j) => (
              <input
                key={`${i}-${j}`}
                aria-label={`Ligne ${i + 1}, colonne ${j + 1}`}
                className={fieldClass}
                value={cell}
                onChange={(e) => setMatrix((m) => m.map((r, a) => r.map((c, b) => (a === i && b === j ? e.target.value : c))))}
              />
            )),
          )}
        </div>
      )}

      {check.kind === 'choice' && (
        <fieldset className="space-y-1.5">
          <legend className="sr-only">Options</legend>
          {check.options.map((o, i) => (
            <label key={i} className="flex items-start gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                className="mt-1"
                checked={selected.includes(i)}
                name={`${id}-choice`}
                onChange={(e) => setSelected((s) => (e.target.checked ? [...s, i] : s.filter((x) => x !== i)))}
              />
              <MathText text={o} />
            </label>
          ))}
        </fieldset>
      )}

      {!done && (
        <Button onClick={submit} variant="outline">
          {buttonLabel}
        </Button>
      )}

      {result && (
        <p
          role="status"
          className={cx('text-sm', result.status === 'valide' ? 'text-hyp' : result.status === 'incorrect' ? 'text-invalid' : 'text-miss')}
        >
          <span className="font-semibold">{result.status === 'valide' ? 'Validé. ' : result.status === 'incorrect' ? 'Incorrect. ' : 'Illisible. '}</span>
          <MathText text={result.message} />
        </p>
      )}
    </div>
  );
}
