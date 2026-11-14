import type { ProofNodeSpec } from '@/content/schema';

/** Énoncé affiché : la valeur reste masquée tant que le calcul n'est pas validé. */
export function nodeText(node: ProofNodeSpec, passedChecks: ReadonlySet<string>): string {
  if (node.check && node.masked && !passedChecks.has(node.id)) return node.masked;
  return node.text;
}
