/**
 * Contexte du dictionnaire : le rendu des textes mixtes (`MathText`, `Prose`) y trouve la
 * fonction qui rend les notions cliquables, et le parcours courant qui départage les
 * homonymes. Sans fournisseur (tests isolés), aucun lien n'est posé.
 */
import { createContext, createElement, useContext, type ReactNode } from 'react';
import type { DicoTrack } from '@/content/dictionnaire/types';

export interface LinkRequest {
  track?: DicoTrack;
  exclude?: ReadonlySet<string>;
  /** Notions déjà liées dans ce texte (seule la première occurrence l'est). */
  seen: Set<string>;
}

export interface TermLinker {
  /** Lie les notions d'un fragment HTML de texte (hors formules). */
  text: (html: string, req: LinkRequest) => string;
  /** Entrée désignée par une formule isolée (« $H^1_0(\Omega)$ »), s'il y en a une. */
  math: (tex: string, track?: DicoTrack) => string | undefined;
}

export const TermLinkerContext = createContext<TermLinker | null>(null);
export const TermTrackContext = createContext<DicoTrack | undefined>(undefined);

export function useTermLinker(): TermLinker | null {
  return useContext(TermLinkerContext);
}

export function useTermTrack(): DicoTrack | undefined {
  return useContext(TermTrackContext);
}

/** Parcours des textes affichés en dessous : « analyse » ou « lie ». */
export function TermScope({ track, children }: { track: DicoTrack | undefined; children: ReactNode }) {
  return createElement(TermTrackContext.Provider, { value: track }, children);
}

/** Option `terms` des composants de texte : vrai, ou liste d'entrées à ne pas lier. */
export type TermsOption = boolean | { exclude?: readonly string[] };
