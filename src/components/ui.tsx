/** Composants d'interface de base, sans dépendance externe. */
import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import type { NodeStatus } from '@/core/proof-engine/engine';

export function cx(...parts: (string | false | null | undefined)[]): string {
  return parts.filter(Boolean).join(' ');
}

type Variant = 'primary' | 'ghost' | 'outline' | 'danger';

const VARIANT: Record<Variant, string> = {
  primary: 'bg-accent text-bg hover:brightness-110 font-medium',
  outline: 'border border-line-strong text-text hover:bg-surface-3',
  ghost: 'text-text-2 hover:text-text hover:bg-surface-3',
  danger: 'border border-invalid/60 text-invalid hover:bg-invalid/10',
};

export function Button({
  variant = 'outline',
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button
      type="button"
      {...props}
      className={cx(
        'inline-flex items-center justify-center gap-2 rounded-md px-3.5 py-2 text-sm transition-colors disabled:opacity-45 disabled:cursor-not-allowed cursor-pointer',
        VARIANT[variant],
        className,
      )}
    />
  );
}

export function LinkButton({
  to,
  variant = 'outline',
  className,
  children,
}: {
  to: string;
  variant?: Variant;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link
      to={to}
      className={cx(
        'inline-flex items-center justify-center gap-2 rounded-md px-3.5 py-2 text-sm transition-colors',
        VARIANT[variant],
        className,
      )}
    >
      {children}
    </Link>
  );
}

export function Card({ className, children, ...rest }: { className?: string; children: ReactNode } & Omit<HTMLAttributes<HTMLElement>, 'className' | 'children'>) {
  return (
    <section {...rest} className={cx('rounded-lg border border-line bg-surface', className)}>
      {children}
    </section>
  );
}

export function SectionTitle({ children, className }: { children: ReactNode; className?: string }) {
  return <h2 className={cx('font-mono text-[11px] uppercase tracking-[0.14em] text-text-3', className)}>{children}</h2>;
}

export function PageHeader({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="mb-7">
      {eyebrow && <div className="font-mono text-xs text-text-3 mb-1.5">{eyebrow}</div>}
      <h1 className="font-serif text-3xl md:text-[34px] leading-tight text-text">{title}</h1>
      {children && <div className="mt-2 text-text-2 max-w-3xl">{children}</div>}
    </header>
  );
}

export const STATUS_META: Record<NodeStatus, { label: string; color: string; bg: string; glyph: string }> = {
  hypothese: { label: 'Hypothèse vérifiée', color: 'var(--st-hyp)', bg: 'var(--st-hyp-bg)', glyph: '◆' },
  manquant: { label: 'Hypothèse manquante', color: 'var(--st-miss)', bg: 'var(--st-miss-bg)', glyph: '◇' },
  demontre: { label: 'Démontré', color: 'var(--st-proved)', bg: 'var(--st-proved-bg)', glyph: '✓' },
  accessible: { label: 'Conclusion accessible', color: 'var(--st-access)', bg: 'var(--st-access-bg)', glyph: '→' },
  'a-justifier': { label: 'À justifier', color: 'var(--text-3)', bg: 'transparent', glyph: '?' },
  incorrect: { label: 'Implication invalide', color: 'var(--st-invalid)', bg: 'var(--st-invalid-bg)', glyph: '✕' },
  circulaire: { label: 'Raisonnement circulaire', color: 'var(--st-invalid)', bg: 'var(--st-invalid-bg)', glyph: '↻' },
  absent: { label: 'Non posé', color: 'var(--text-3)', bg: 'transparent', glyph: '·' },
};

export function StatusBadge({ status, className }: { status: NodeStatus; className?: string }) {
  const m = STATUS_META[status];
  return (
    <span className={cx('inline-flex items-center gap-1 text-[11px] font-mono whitespace-nowrap', className)} style={{ color: m.color }}>
      <span aria-hidden>{m.glyph}</span>
      {m.label}
    </span>
  );
}

/** Légende des couleurs : la signification n'est jamais portée par la seule couleur. */
export function StatusLegend({ className }: { className?: string }) {
  const items: NodeStatus[] = ['hypothese', 'manquant', 'demontre', 'accessible', 'incorrect'];
  return (
    <ul className={cx('flex flex-wrap gap-x-4 gap-y-1', className)} aria-label="Légende des états">
      {items.map((s) => (
        <li key={s}>
          <StatusBadge status={s} />
        </li>
      ))}
    </ul>
  );
}

export function ProgressBar({ value, label, color = 'var(--accent)' }: { value: number; label: string; color?: string }) {
  const pct = Math.round(Math.min(1, Math.max(0, value)) * 100);
  return (
    <div role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label={label} className="h-1.5 rounded-full bg-surface-3 overflow-hidden">
      <div className="h-full rounded-full transition-[width] duration-500" style={{ width: `${pct}%`, background: color }} />
    </div>
  );
}

export function Chip({ children, className, style }: { children: ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <span className={cx('inline-flex items-center gap-1 rounded border border-line px-1.5 py-0.5 font-mono text-[11px] text-text-2', className)} style={style}>
      {children}
    </span>
  );
}

export const VERIFICATION_LABEL = {
  polycopie: 'Démonstration du polycopié',
  'polycopie-corrige': 'Polycopié corrigé (erreur signalée)',
  'cours-lie': 'Démonstration du cours de géométrie de Lie',
  complement: 'Complément, absent du document source',
} as const;

export const REVIEW_LABEL = {
  machine: 'Structure et calculs testés automatiquement',
  'relecture-ia': 'Testé automatiquement et relu par un agent IA indépendant',
} as const;

export function formatDate(ts: number | null | undefined): string {
  if (!ts) return '—';
  return new Date(ts).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function pdfRef(pdfPage?: number, doc: 'polycopie' | 'cours-lie' = 'polycopie'): string {
  if (!pdfPage) return '';
  const printed = pdfPage - (doc === 'cours-lie' ? 20 : 4);
  return printed >= 1 ? `p. ${printed} (PDF ${pdfPage})` : `PDF ${pdfPage}`;
}

/** Référence lisible d'une source : polycopié, cours de géométrie de Lie, ou complément. */
export function sourceRef(source: { doc: 'polycopie' | 'cours-lie' | 'complement'; pdfPage?: number }): string {
  if (source.doc === 'polycopie') return `Polycopié ${pdfRef(source.pdfPage)}`;
  if (source.doc === 'cours-lie') return `Cours de géométrie de Lie ${pdfRef(source.pdfPage, 'cours-lie')}`;
  return 'Complément';
}
