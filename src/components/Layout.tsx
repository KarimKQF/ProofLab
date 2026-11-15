import type { ReactNode } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { cx } from './ui';
import { useReviewQueue } from './useReviewQueue';

type IconName = 'home' | 'map' | 'lab' | 'atlas' | 'dico' | 'review' | 'cross' | 'exam' | 'book' | 'chart' | 'sand' | 'cog';

function Icon({ name }: { name: IconName }) {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  const paths: Record<IconName, ReactNode> = {
    home: <path d="M3 11.5 12 4l9 7.5M5.5 10v9.5h13V10" {...common} />,
    map: (
      <>
        <circle cx="6" cy="6" r="2.2" {...common} />
        <circle cx="18" cy="9" r="2.2" {...common} />
        <circle cx="9" cy="18" r="2.2" {...common} />
        <path d="M7.8 7.2 16 8.6M7 8l1.6 7.8M16.4 10.6l-6 6" {...common} />
      </>
    ),
    lab: <path d="M9 3h6M10 3v6.5L4.8 18.6A1.6 1.6 0 0 0 6.2 21h11.6a1.6 1.6 0 0 0 1.4-2.4L14 9.5V3M7.5 15h9" {...common} />,
    atlas: <path d="M4 5h7v6H4zM13 5h7v6h-7zM4 13h7v6H4zM13 13h7v6h-7z" {...common} />,
    review: <path d="M4 12a8 8 0 1 0 2.5-5.8M4 4v4.5h4.5M12 8v4.5l3 1.8" {...common} />,
    cross: <path d="M6 6l12 12M18 6 6 18M12 2v3M12 19v3M2 12h3M19 12h3" {...common} />,
    exam: <path d="M7 3h10v18H7zM10 8h4M10 12h4M10 16h2" {...common} />,
    book: <path d="M5 4.5h11a3 3 0 0 1 3 3V20H8a3 3 0 0 1-3-3zM5 17a3 3 0 0 1 3-3h11" {...common} />,
    dico: <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H19v16H5.5A1.5 1.5 0 0 1 4 18.5zM8 15l2.5-7 2.5 7M8.9 12.5h3.2M15 8.5h2M15 11.5h2" {...common} />,
    chart: <path d="M4 20V4M4 20h16M8.5 16v-5M13 16V8M17.5 16v-3" {...common} />,
    sand: <path d="M4 18c3-5 5 1 8-4s5-1 8-7M4 18l2.5 2M20 7l-2.8-.8M12 14l2.2 1.2" {...common} />,
    cog: (
      <>
        <circle cx="12" cy="12" r="3" {...common} />
        <path d="M12 3v2.4M12 18.6V21M3 12h2.4M18.6 12H21M5.6 5.6l1.7 1.7M16.7 16.7l1.7 1.7M18.4 5.6l-1.7 1.7M7.3 16.7l-1.7 1.7" {...common} />
      </>
    ),
  };
  return (
    <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] shrink-0" aria-hidden>
      {paths[name]}
    </svg>
  );
}

const NAV: { to: string; label: string; icon: IconName; end?: boolean }[] = [
  { to: '/', label: 'Accueil', icon: 'home', end: true },
  { to: '/carte', label: 'Carte', icon: 'map' },
  { to: '/labos', label: 'Laboratoires', icon: 'lab' },
  { to: '/atlas', label: 'Atlas visuel', icon: 'atlas' },
  { to: '/dictionnaire', label: 'Dictionnaire', icon: 'dico' },
  { to: '/revision', label: 'Révisions', icon: 'review' },
  { to: '/contre-exemples', label: 'Contre-exemples', icon: 'cross' },
  { to: '/examen', label: 'Examen', icon: 'exam' },
  { to: '/carnet', label: 'Carnet', icon: 'book' },
  { to: '/tableau', label: 'Tableau de bord', icon: 'chart' },
  { to: '/libre', label: 'Mode libre', icon: 'sand' },
  { to: '/reglages', label: 'Réglages', icon: 'cog' },
];

export function Layout({ children }: { children: ReactNode }) {
  const due = useReviewQueue().length;
  return (
    <div className="min-h-full md:grid md:grid-cols-[208px_minmax(0,1fr)]">
      <a href="#contenu" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-2 focus:p-2 focus:bg-surface">
        Aller au contenu
      </a>
      <aside className="md:sticky md:top-0 md:h-screen border-b md:border-b-0 md:border-r border-line bg-surface flex md:flex-col">
        <Link to="/" className="flex items-center gap-2 px-4 py-3.5 md:py-5">
          <Logo />
          <span className="leading-none">
            <span className="block font-serif text-[17px]">ProofLab</span>
            <span className="hidden md:block font-mono text-[10px] text-text-3 mt-0.5">Theorem Engine</span>
          </span>
        </Link>
        <nav className="flex-1 overflow-x-auto md:overflow-visible" aria-label="Navigation principale">
          <ul className="flex md:flex-col gap-0.5 px-2 py-2 md:py-0">
            {NAV.map((n) => (
              <li key={n.to}>
                <NavLink
                  to={n.to}
                  end={n.end}
                  className={({ isActive }) =>
                    cx(
                      'flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-sm whitespace-nowrap transition-colors',
                      isActive ? 'bg-surface-3 text-text' : 'text-text-2 hover:text-text hover:bg-surface-2',
                    )
                  }
                >
                  <Icon name={n.icon} />
                  <span>{n.label}</span>
                  {n.to === '/revision' && due > 0 && (
                    <span className="ml-auto font-mono text-[11px] text-access tabular" aria-label={`${due} à réviser`}>
                      {due}
                    </span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <p className="hidden md:block px-4 py-3 text-[11px] leading-snug text-text-3">
          Fonctionne hors ligne. La progression reste sur cet appareil.
        </p>
      </aside>
      <main id="contenu" className="min-w-0">
        {children}
      </main>
    </div>
  );
}

function Logo() {
  return (
    <svg viewBox="0 0 32 32" className="w-7 h-7" aria-hidden>
      <path d="M6 27 L6 6 L27 6" fill="none" stroke="var(--st-proved)" strokeWidth="2" />
      <circle cx="23" cy="23" r="3" fill="var(--st-hyp)" />
      <path d="M23 23 L6 23" stroke="var(--st-access)" strokeWidth="1.6" strokeDasharray="2.5 2.5" />
      <circle cx="6" cy="23" r="2.4" fill="var(--st-miss)" />
    </svg>
  );
}
