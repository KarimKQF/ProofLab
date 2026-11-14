/**
 * Registre des planches interactives : `planches/pNN.tsx`, une par planche de l'atlas,
 * chargées à la demande (une planche absente garde l'image de l'atlas seule).
 */
import type { ComponentType } from 'react';

const loaders = import.meta.glob<{ default: ComponentType }>('./planches/p*.tsx');

const key = (n: number) => `./planches/p${String(n).padStart(2, '0')}.tsx`;

export const interactiveLoader = (n: number): (() => Promise<{ default: ComponentType }>) | undefined => loaders[key(n)];

export const hasInteractive = (n: number): boolean => key(n) in loaders;

/** Numéros des planches disposant d'une figure interactive. */
export const INTERACTIVE_PLATES: number[] = Object.keys(loaders)
  .map((k) => Number(/p(\d+)\.tsx$/.exec(k)?.[1]))
  .filter((n) => Number.isInteger(n))
  .sort((a, b) => a - b);
