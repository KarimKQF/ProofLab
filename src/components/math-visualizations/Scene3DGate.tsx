/**
 * Porte d'entrée légère des scènes 3D : détection de WebGL, chargement différé,
 * barrière d'erreur et alternative 2D. Three.js n'est téléchargé que si une scène 3D
 * est effectivement affichée.
 */
import { Component, Suspense, type ReactNode } from 'react';

let webglCache: boolean | null = null;

/** WebGL est-il disponible ? (vrai navigateur seulement ; jamais sous jsdom). */
export function hasWebGL(): boolean {
  if (webglCache !== null) return webglCache;
  try {
    const canvas = document.createElement('canvas');
    webglCache = Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    webglCache = false;
  }
  return webglCache;
}

class RenderBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error: unknown) {
    console.warn('Rendu 3D indisponible, alternative 2D affichée.', error);
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

export function Scene3DGate({ children, fallback }: { children: ReactNode; fallback: ReactNode }) {
  if (!hasWebGL()) {
    return (
      <div data-testid="webgl-fallback">
        <p className="mb-2 text-[12.5px] text-miss" role="note">
          WebGL n’est pas disponible sur ce navigateur : la vue 2D équivalente est affichée.
        </p>
        {fallback}
      </div>
    );
  }
  return (
    <RenderBoundary
      fallback={
        <div data-testid="webgl-fallback">
          <p className="mb-2 text-[12.5px] text-miss" role="note">Le rendu 3D a échoué : la vue 2D équivalente est affichée.</p>
          {fallback}
        </div>
      }
    >
      <Suspense fallback={<div className="flex h-[420px] items-center justify-center text-sm text-text-2" role="status">Chargement de la scène 3D…</div>}>
        {children}
      </Suspense>
    </RenderBoundary>
  );
}
