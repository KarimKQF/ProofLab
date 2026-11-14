import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// Mode hors ligne : uniquement sur une version de production, pour ne pas gêner le développement.
if (import.meta.env.PROD && 'serviceWorker' in navigator && location.protocol.startsWith('http')) {
  void navigator.serviceWorker.register('./sw.js').catch(() => undefined);
}
