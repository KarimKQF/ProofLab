/**
 * Fournisseur du dictionnaire : rend les notions cliquables dans les textes et ouvre leur
 * fiche dans une bulle ancrée au mot (une feuille en bas d'écran sur téléphone).
 * Un clic sur une notion à l'intérieur de la bulle ouvre sa fiche à la place, avec retour.
 * Sur la page Dictionnaire, un clic mène à la fiche de la page.
 */
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { DICO_BY_ID, linkHtml, matcherFor, symbolsFor, texKey, type DicoTrack } from '@/content/dictionnaire';
import { MathText } from '@/components/Math';
import { useGame } from '@/storage/store';
import { TermLinkerContext, type TermLinker } from './context';
import { EntryView } from './EntryView';
import { NotionStatus } from './NotionStatus';

interface OpenState {
  stack: string[];
  trigger: HTMLElement | null;
  track?: DicoTrack;
}

const TRACKS = new Set(['analyse', 'lie']);

function termTarget(e: Event): HTMLElement | null {
  const t = e.target as HTMLElement | null;
  return (t?.closest?.('[data-term]') as HTMLElement | null) ?? null;
}

export function GlossaryProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState<OpenState | null>(null);

  const linker = useMemo<TermLinker>(
    () => ({
      text: (html, req) => linkHtml(html, matcherFor(req.track), { exclude: req.exclude, seen: req.seen, track: req.track }),
      math: (tex, track) => symbolsFor(track).get(texKey(tex)),
    }),
    [],
  );

  const activate = useCallback(
    (el: HTMLElement) => {
      const id = el.dataset.term;
      if (!id || !DICO_BY_ID.has(id)) return;
      const t = el.dataset.track;
      const track = t && TRACKS.has(t) ? (t as DicoTrack) : undefined;
      if (el.closest('[data-glossary-page]')) {
        navigate(`/dictionnaire/${id}`);
        return;
      }
      // Une notion consultée en lisant entre dans les révisions (première révision le lendemain).
      useGame.getState().addNotion(id, 'consultee');
      if (el.closest('[data-glossary-popover]')) {
        setOpen((s) => (s ? { ...s, stack: [...s.stack, id] } : s));
        return;
      }
      setOpen({ stack: [id], trigger: el, track });
    },
    [navigate],
  );

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = termTarget(e);
      if (!el) return;
      // Empêche aussi l'activation d'une étiquette (case à cocher) qui contiendrait le mot.
      e.preventDefault();
      e.stopPropagation();
      activate(el);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      const el = termTarget(e);
      if (!el || el.tagName === 'A' || el.tagName === 'BUTTON') return;
      e.preventDefault();
      activate(el);
    };
    document.addEventListener('click', onClick, true);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('click', onClick, true);
      document.removeEventListener('keydown', onKey);
    };
  }, [activate]);

  // Changer de page ferme la bulle.
  useEffect(() => setOpen(null), [location.pathname, location.search]);

  const openRef = useRef(open);
  openRef.current = open;
  const close = useCallback(() => {
    const trigger = openRef.current?.trigger;
    setOpen(null);
    if (trigger?.isConnected) trigger.focus();
  }, []);

  return (
    <TermLinkerContext.Provider value={linker}>
      {children}
      {open &&
        createPortal(
          <TermPopover
            state={open}
            onClose={close}
            onBack={() => setOpen((s) => (s && s.stack.length > 1 ? { ...s, stack: s.stack.slice(0, -1) } : s))}
          />,
          document.body,
        )}
    </TermLinkerContext.Provider>
  );
}

function TermPopover({ state, onClose, onBack }: { state: OpenState; onClose: () => void; onBack: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const id = state.stack[state.stack.length - 1]!;
  const entry = DICO_BY_ID.get(id)!;
  const [pos, setPos] = useState<{ top?: number; bottom?: number; left: number; width: number; sheet: boolean; maxHeight?: number }>({
    left: 12,
    width: 420,
    sheet: false,
    top: 80,
  });

  const place = useCallback(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const sheet = () => setPos({ left: 0, width: vw, sheet: true, bottom: 0 });
    if (vw < 640 || !state.trigger || !state.trigger.isConnected) return sheet();
    const r = state.trigger.getBoundingClientRect();
    const width = Math.min(440, vw - 24);
    const left = Math.min(Math.max(12, r.left), vw - width - 12);
    // La bulle tient toujours dans l'écran : sa hauteur est bornée par la place du côté choisi.
    const spaceBelow = vh - r.bottom - 20;
    const spaceAbove = r.top - 20;
    if (Math.max(spaceBelow, spaceAbove) < 200) return sheet();
    const next =
      spaceBelow >= 320 || spaceBelow >= spaceAbove
        ? { top: r.bottom + 8, left, width, sheet: false, maxHeight: Math.min(560, spaceBelow) }
        : { bottom: vh - r.top + 8, left, width, sheet: false, maxHeight: Math.min(560, spaceAbove) };
    setPos((p) =>
      p.top === next.top && p.bottom === next.bottom && p.left === next.left && p.width === next.width && p.maxHeight === next.maxHeight && !p.sheet ? p : next,
    );
  }, [state.trigger]);

  useLayoutEffect(() => {
    place();
    const onMove = () => place();
    window.addEventListener('resize', onMove);
    window.addEventListener('scroll', onMove, true);
    return () => {
      window.removeEventListener('resize', onMove);
      window.removeEventListener('scroll', onMove, true);
    };
  }, [place]);

  // Focus dans la bulle à l'ouverture et à chaque changement de fiche.
  useEffect(() => {
    ref.current?.focus();
    ref.current?.scrollTo?.({ top: 0 });
  }, [id]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    const onDown = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t || ref.current?.contains(t) || t.closest('[data-term]')) return;
      onClose();
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onDown);
    };
  }, [onClose]);

  const style: React.CSSProperties = pos.sheet
    ? { left: 0, right: 0, bottom: 0, maxHeight: '72vh' }
    : { left: pos.left, width: pos.width, top: pos.top, bottom: pos.bottom, maxHeight: pos.maxHeight ?? Math.min(560, window.innerHeight - 24) };

  return (
    <div
      ref={ref}
      role="dialog"
      aria-modal="false"
      aria-labelledby={`entree-${entry.id}`}
      tabIndex={-1}
      data-glossary-popover
      data-testid="bulle-definition"
      className={`fixed z-50 overflow-auto border border-line-strong bg-surface p-4 shadow-2xl outline-none anim-rise ${pos.sheet ? 'rounded-t-xl' : 'rounded-xl'}`}
      style={style}
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        {state.stack.length > 1 ? (
          <button type="button" onClick={onBack} className="text-[12.5px] text-text-2 hover:text-text cursor-pointer" data-testid="bulle-retour">
            ← <MathText text={DICO_BY_ID.get(state.stack[state.stack.length - 2]!)?.term ?? 'Retour'} />
          </button>
        ) : (
          <span className="font-mono text-[10.5px] uppercase tracking-wider text-text-3">Dictionnaire</span>
        )}
        <button type="button" onClick={onClose} aria-label="Fermer la définition" className="rounded px-1.5 text-[18px] leading-none text-text-3 hover:text-text cursor-pointer">
          ×
        </button>
      </div>
      <EntryView entry={entry} compact track={state.track} />
      <div className="mt-4 space-y-1 border-t border-line pt-2.5">
        <Link to={`/dictionnaire/${entry.id}`} className="text-[13px] text-accent hover:underline" data-testid="ouvrir-dictionnaire">
          Ouvrir dans le dictionnaire →
        </Link>
        <div>
          <NotionStatus id={entry.id} />
        </div>
      </div>
    </div>
  );
}
