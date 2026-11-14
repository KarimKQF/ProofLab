/**
 * Rendu du texte mixte : français, LaTeX ($…$, $$…$$) et un Markdown restreint
 * (paragraphes, listes, gras, italique, titres, code).
 */
import { memo, useMemo } from 'react';
import katex from 'katex';

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

/** Découpe un texte en segments, en respectant \$ et les formules. */
function inlineToHtml(src: string): string {
  const parts = src.split(/(\$\$[\s\S]*?\$\$|\$[^$]+\$)/g);
  return parts
    .map((p) => {
      if (p.startsWith('$$') && p.endsWith('$$') && p.length >= 4) return renderTex(p.slice(2, -2), true);
      if (p.startsWith('$') && p.endsWith('$') && p.length >= 2) return renderTex(p.slice(1, -1), false);
      return inlineMarkdown(p);
    })
    .join('');
}

/** Rendu Markdown limité, blocs inclus. */
export function markdownToHtml(src: string): string {
  const out: string[] = [];
  const blocks = src.split(/\n\s*\n/);
  for (const block of blocks) {
    const lines = block.split('\n');
    const bullet = /^\s*[-*]\s+/;
    const num = /^\s*\d+[.)]\s+/;
    if (lines.every((l) => bullet.test(l))) {
      out.push(`<ul>${lines.map((l) => `<li>${inlineToHtml(l.replace(bullet, ''))}</li>`).join('')}</ul>`);
    } else if (lines.every((l) => num.test(l))) {
      out.push(`<ol>${lines.map((l) => `<li>${inlineToHtml(l.replace(num, ''))}</li>`).join('')}</ol>`);
    } else if (lines.length === 1 && /^#{1,6}\s/.test(lines[0]!)) {
      out.push(`<h3>${inlineToHtml(lines[0]!.replace(/^#{1,6}\s/, ''))}</h3>`);
    } else {
      out.push(`<p>${inlineToHtml(lines.join(' '))}</p>`);
    }
  }
  return out.join('');
}

/** Formule ou texte mixte en ligne (sans balisage de bloc). */
export const MathText = memo(function MathText({ text, className }: { text: string; className?: string }) {
  const html = useMemo(() => inlineToHtml(text), [text]);
  return <span className={className} dangerouslySetInnerHTML={{ __html: html }} />;
});

/** Texte long : paragraphes, listes, formules en bloc. */
export const Prose = memo(function Prose({ text, className }: { text: string; className?: string }) {
  const html = useMemo(() => markdownToHtml(text), [text]);
  return <div className={`prose-math ${className ?? ''}`} dangerouslySetInnerHTML={{ __html: html }} />;
});

/** Formule isolée. */
export function Tex({ children, block = false }: { children: string; block?: boolean }) {
  const html = useMemo(() => renderTex(children, block), [children, block]);
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}
