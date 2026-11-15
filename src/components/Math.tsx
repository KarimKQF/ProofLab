/**
 * Rendu du texte mixte : français, LaTeX ($…$, $$…$$) et un Markdown restreint
 * (paragraphes, listes, gras, italique, titres, code). Avec `terms`, les notions du
 * dictionnaire deviennent cliquables (première occurrence de chaque notion seulement).
 */
import { memo, useMemo } from 'react';
import katex from 'katex';
import { useTermLinker, useTermTrack, type TermLinker, type TermsOption } from './glossary/context';
import type { DicoTrack } from '@/content/dictionnaire/types';

const cache = new Map<string, string>();
const KATEX_OUTPUT: 'html' | 'htmlAndMathml' = import.meta.env.MODE === 'test' ? 'html' : 'htmlAndMathml';

export function renderTex(tex: string, display: boolean): string {
  const key = `${display ? 'D' : 'I'}:${tex}`;
  let html = cache.get(key);
  if (html === undefined) {
    // htmlAndMathml : le MathML, masqué visuellement par KaTeX, est lu par les lecteurs d'écran.
    // Sous jsdom (tests), le MathML n'a pas de style et fait échouer le calcul des noms accessibles.
    html = katex.renderToString(tex, { throwOnError: false, displayMode: display, strict: 'ignore', output: KATEX_OUTPUT });
    cache.set(key, html);
  }
  return html;
}

const escapeHtml = (s: string): string =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function inlineMarkdown(text: string): string {
  return escapeHtml(text)
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*])\*([^*\n]+)\*/g, '$1<em>$2</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>');
}

/** Liaison des notions pour un rendu donné (parcours, exclusions, occurrences déjà liées). */
interface InlineLink {
  text: (html: string) => string;
  math: (tex: string) => string | undefined;
  track?: DicoTrack;
  seen: Set<string>;
  exclude?: ReadonlySet<string>;
}

function makeLink(linker: TermLinker | null, terms: TermsOption | undefined, track: DicoTrack | undefined): InlineLink | undefined {
  if (!linker || !terms) return undefined;
  const exclude = typeof terms === 'object' && terms.exclude ? new Set(terms.exclude) : undefined;
  const seen = new Set<string>();
  return {
    text: (html) => linker.text(html, { track, exclude, seen }),
    math: (tex) => {
      const id = linker.math(tex, track);
      if (!id || exclude?.has(id) || seen.has(id)) return undefined;
      seen.add(id);
      return id;
    },
    track,
    seen,
    exclude,
  };
}

/** Découpe un texte en segments, en respectant \$ et les formules. */
function inlineToHtml(src: string, link?: InlineLink): string {
  const parts = src.split(/(\$\$[\s\S]*?\$\$|\$[^$]+\$)/g);
  return parts
    .map((p) => {
      if (p.startsWith('$$') && p.endsWith('$$') && p.length >= 4) return renderTex(p.slice(2, -2), true);
      if (p.startsWith('$') && p.endsWith('$') && p.length >= 2) {
        const tex = p.slice(1, -1);
        const html = renderTex(tex, false);
        const id = link?.math(tex);
        return id
          ? `<span role="button" tabindex="0" class="term-link term-math" data-term="${id}"${link?.track ? ` data-track="${link.track}"` : ''}>${html}</span>`
          : html;
      }
      const md = inlineMarkdown(p);
      return link ? link.text(md) : md;
    })
    .join('');
}

/** Rendu Markdown limité, blocs inclus. */
export function markdownToHtml(src: string, link?: InlineLink): string {
  const out: string[] = [];
  const blocks = src.split(/\n\s*\n/);
  for (const block of blocks) {
    const lines = block.split('\n');
    const bullet = /^\s*[-*]\s+/;
    const num = /^\s*\d+[.)]\s+/;
    if (lines.every((l) => bullet.test(l))) {
      out.push(`<ul>${lines.map((l) => `<li>${inlineToHtml(l.replace(bullet, ''), link)}</li>`).join('')}</ul>`);
    } else if (lines.every((l) => num.test(l))) {
      out.push(`<ol>${lines.map((l) => `<li>${inlineToHtml(l.replace(num, ''), link)}</li>`).join('')}</ol>`);
    } else if (lines.length === 1 && /^#{1,6}\s/.test(lines[0]!)) {
      out.push(`<h3>${inlineToHtml(lines[0]!.replace(/^#{1,6}\s/, ''), link)}</h3>`);
    } else {
      out.push(`<p>${inlineToHtml(lines.join(' '), link)}</p>`);
    }
  }
  return out.join('');
}

function useLinkKey(terms: TermsOption | undefined): string {
  if (!terms) return '';
  return typeof terms === 'object' ? `x:${(terms.exclude ?? []).join(',')}` : 'oui';
}

/**
 * Formule ou texte mixte en ligne (sans balisage de bloc). `terms` rend les notions du
 * dictionnaire cliquables : à ne pas activer dans un bouton ou un lien.
 */
export const MathText = memo(function MathText({ text, className, terms }: { text: string; className?: string; terms?: TermsOption }) {
  const linker = useTermLinker();
  const track = useTermTrack();
  const key = useLinkKey(terms);
  const html = useMemo(() => inlineToHtml(text, makeLink(linker, terms, track)), [text, linker, track, key]);
  return <span className={className} dangerouslySetInnerHTML={{ __html: html }} />;
});

/** Texte long : paragraphes, listes, formules en bloc. */
export const Prose = memo(function Prose({ text, className, terms }: { text: string; className?: string; terms?: TermsOption }) {
  const linker = useTermLinker();
  const track = useTermTrack();
  const key = useLinkKey(terms);
  const html = useMemo(() => markdownToHtml(text, makeLink(linker, terms, track)), [text, linker, track, key]);
  return <div className={`prose-math ${className ?? ''}`} dangerouslySetInnerHTML={{ __html: html }} />;
});

/** Formule isolée. */
export function Tex({ children, block = false }: { children: string; block?: boolean }) {
  const html = useMemo(() => renderTex(children, block), [children, block]);
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}
