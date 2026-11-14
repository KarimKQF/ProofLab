import '@testing-library/jest-dom/vitest';
import 'fake-indexeddb/auto';

// Node 26 expose un localStorage global incomplet qui masque celui de jsdom : on le remplace
// par un stockage en mémoire conforme à l'interface Storage.
if (typeof globalThis.localStorage?.clear !== 'function') {
  const data = new Map<string, string>();
  const storage: Storage = {
    getItem: (k) => (data.has(k) ? data.get(k)! : null),
    setItem: (k, v) => void data.set(k, String(v)),
    removeItem: (k) => void data.delete(k),
    clear: () => data.clear(),
    key: (i) => [...data.keys()][i] ?? null,
    get length() {
      return data.size;
    },
  };
  Object.defineProperty(globalThis, 'localStorage', { value: storage, configurable: true });
  if (typeof window !== 'undefined') Object.defineProperty(window, 'localStorage', { value: storage, configurable: true });
}

// jsdom n'implémente pas les contextes de dessin : on renvoie null, comme un navigateur sans
// WebGL, au lieu de laisser jsdom journaliser une erreur à chaque appel.
if (typeof HTMLCanvasElement !== 'undefined') {
  Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', { value: () => null, configurable: true });
}
