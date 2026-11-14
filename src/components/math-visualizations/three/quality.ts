/** Qualité du rendu 3D (préférence d'affichage locale, distincte de la progression). */
import { createContext, useContext } from 'react';

export type Quality = 'faible' | 'normale';
export const QualityContext = createContext<Quality>('normale');
export const useQuality = () => useContext(QualityContext);
/** Nombre de segments d'une géométrie courbe : divisé par trois en qualité faible. */
export const segmentsFor = (q: Quality, normal: number) => (q === 'faible' ? Math.max(8, Math.round(normal / 3)) : normal);

export function readQuality(): Quality {
  try {
    return localStorage.getItem('prooflab:qualite3d') === 'faible' ? 'faible' : 'normale';
  } catch {
    return 'normale';
  }
}
