/**
 * Export lisible du contenu, pour la relecture mathématique : un fichier Markdown par
 * résultat, contenant fiche, graphes (nœuds, règles, pièges, retraits), solutions et variantes.
 * Usage : npx vite-node scripts/dump-content.ts <dossier-de-sortie>
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { THEOREM_MODULES } from '../src/content';
import { CATALOG_BY_ID } from '../src/content/catalog';
import type { ProofSpec } from '../src/content/schema';

const out = process.argv[2] ?? 'relecture';
mkdirSync(out, { recursive: true });

function proof(spec: ProofSpec): string {
  const lines: string[] = [];
  const just = new Map(spec.justifications.map((j) => [j.id, j]));
  lines.push(`But : \`${spec.goal}\` — usage : ${spec.purpose}`);
  lines.push('', 'Nœuds :');
  for (const n of spec.nodes) {
    const flags = [n.distractor ? 'DISTRACTEUR' : '', n.local ? 'locale' : '', n.check ? `calcul ${n.check.kind}` : ''].filter(Boolean).join(', ');
    lines.push(`- \`${n.id}\` (${n.kind}${flags ? `, ${flags}` : ''}) : ${n.text}`);
    if (n.check && 'expected' in n.check) lines.push(`  - valeur attendue : ${JSON.stringify(n.check.expected)}`);
  }
  lines.push('', 'Règles :');
  for (const r of spec.rules) {
    const j = just.get(r.by);
    lines.push(`- ${r.from.length ? r.from.map((f) => `\`${f}\``).join(' + ') : '∅'} ⟹ \`${r.to}\` par « ${j?.label}${j?.theorem ? ` [${j.theorem}]` : ''} »${r.path ? ` (chemin ${r.path})` : ''}`);
  }
  const unused = spec.justifications.filter((j) => !spec.rules.some((r) => r.by === j.id));
  if (unused.length) lines.push('', `Justifications sans règle (séduisantes ou fausses) : ${unused.map((j) => `« ${j.label} »`).join(' ; ')}`);
  if (spec.traps.length) {
    lines.push('', 'Pièges :');
    for (const t of spec.traps) {
      lines.push(`- \`${t.conclusion}\`${t.by ? ` par « ${just.get(t.by)?.label} »` : ''}${t.premises ? ` depuis ${t.premises.join(', ')}` : ''} → ${t.verdict} [${t.concept}] : ${t.message}${t.counterexample ? ` — Contre-exemple : ${t.counterexample}` : ''}`);
    }
  }
  if (spec.removable.length) {
    lines.push('', 'Retraits :');
    for (const r of spec.removable) lines.push(`- \`${r.hypothesis}\` (${r.necessary ? 'nécessaire' : 'non nécessaire'}) : ${r.explanation} — Contre-exemple : ${r.counterexample}`);
  }
  return lines.join('\n');
}

for (const m of THEOREM_MODULES) {
  const entry = CATALOG_BY_ID.get(m.theorem.id)!;
  const t = m.theorem;
  const parts: string[] = [];
  parts.push(`# ${entry.n}. ${entry.name} (\`${t.id}\`) — polycopié p. PDF ${entry.pdfPage}, section ${entry.section}`);
  parts.push('', '## Fiche', '', `Espaces : ${t.spaces.join(' | ')}`, '', 'Hypothèses :');
  for (const h of t.hypotheses) parts.push(`- ${h.text}${h.whenRemoved ? ` — Sans elle : ${h.whenRemoved}` : ''}`);
  parts.push('', `Énoncé : ${t.statement}`, '', `Bilan : ${JSON.stringify(t.conclusions)}`, '', `Preuve dans le polycopié : ${t.sourceProof}`);
  parts.push('', 'Plan :', ...t.proofOutline.map((s, i) => `${i + 1}. ${s}`), '', 'Vigilance :', ...t.warnings.map((w) => `- ${w}`));
  parts.push('', `Vérification : ${JSON.stringify(t.verification)}`);
  for (const d of m.definitions) parts.push('', `Définition « ${d.term} » : ${d.statement}`);
  for (const ce of m.counterexamples) {
    parts.push('', `## Contre-exemple \`${ce.id}\` : ${ce.title}`, `Assertion : ${ce.claim}`, `Tâche : ${ce.task}`, `Vérification : ${JSON.stringify(ce.check)}`, `Explication : ${ce.explanation}`);
  }
  for (const e of m.exercises) {
    parts.push('', `## Exercice ${e.level} \`${e.id}\` : ${e.title}`, '', `Énoncé : ${e.statement}`, `Source : ${JSON.stringify(e.source)} — prérequis : ${e.prerequisites.join(', ') || '—'}`);
    parts.push('', proof(e.proof));
    if (e.closedChecks?.length) parts.push('', `Calculs fermés : ${JSON.stringify(e.closedChecks)}`);
    parts.push('', 'Solution :', e.solution, '', 'Indices :', ...e.hints.map((h, i) => `${i + 1}. ${h}`));
    parts.push('', 'Erreurs fréquentes :', ...e.commonErrors.map((c) => `- ${c.description}`));
    parts.push('', `Variante : ${e.variant.statement}`, '', `Solution de la variante : ${e.variant.solution}`);
    if (e.variant.proof) parts.push('', 'Graphe de la variante :', proof(e.variant.proof));
    parts.push('', `Vérification : ${JSON.stringify(e.verification)}`);
  }
  const file = join(out, `${String(entry.n).padStart(2, '0')}-${t.id}.md`);
  writeFileSync(file, parts.join('\n'), 'utf8');
  console.log(file);
}
