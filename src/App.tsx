import { lazy, Suspense, useEffect } from 'react';
import { HashRouter, Route, Routes, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout';
import { GlossaryProvider } from './components/glossary/GlossaryProvider';
import { flushPersist, useGame } from './storage/store';
import { HomePage } from './pages/HomePage';

const MapPage = lazy(() => import('./pages/MapPage').then((m) => ({ default: m.MapPage })));
const TheoremPage = lazy(() => import('./pages/TheoremPage').then((m) => ({ default: m.TheoremPage })));
const ExercisePage = lazy(() => import('./pages/ExercisePage').then((m) => ({ default: m.ExercisePage })));
const FreeProofPage = lazy(() => import('./pages/FreeProofPage').then((m) => ({ default: m.FreeProofPage })));
const CounterexamplesPage = lazy(() => import('./pages/CounterexamplesPage').then((m) => ({ default: m.CounterexamplesPage })));
const ExamPage = lazy(() => import('./pages/ExamPage').then((m) => ({ default: m.ExamPage })));
const ReviewPage = lazy(() => import('./pages/ReviewPage').then((m) => ({ default: m.ReviewPage })));
const DashboardPage = lazy(() => import('./pages/DashboardPage').then((m) => ({ default: m.DashboardPage })));
const NotebookPage = lazy(() => import('./pages/NotebookPage').then((m) => ({ default: m.NotebookPage })));
const SettingsPage = lazy(() => import('./pages/SettingsPage').then((m) => ({ default: m.SettingsPage })));
const FreeModePage = lazy(() => import('./pages/FreeModePage').then((m) => ({ default: m.FreeModePage })));
const LabsPage = lazy(() => import('./pages/LabsPage').then((m) => ({ default: m.LabsPage })));
const LabPage = lazy(() => import('./pages/LabPage').then((m) => ({ default: m.LabPage })));
const AtlasPage = lazy(() => import('./pages/AtlasPage').then((m) => ({ default: m.AtlasPage })));
const PlatePage = lazy(() => import('./pages/AtlasPage').then((m) => ({ default: m.PlatePage })));
const ErrorHuntPage = lazy(() => import('./pages/ErrorHuntPage').then((m) => ({ default: m.ErrorHuntPage })));
const TrapsPage = lazy(() => import('./pages/TrapsPage').then((m) => ({ default: m.TrapsPage })));
const DictionaryPage = lazy(() => import('./pages/DictionaryPage').then((m) => ({ default: m.DictionaryPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })));

function RouteTracker() {
  const { pathname, search } = useLocation();
  const setLastVisited = useGame((s) => s.setLastVisited);
  useEffect(() => {
    if (pathname.startsWith('/preuve') || pathname.startsWith('/theoreme')) setLastVisited(pathname + search);
    window.scrollTo(0, 0);
  }, [pathname, search, setLastVisited]);
  return null;
}

export function App() {
  const ready = useGame((s) => s.ready);
  const hydrate = useGame((s) => s.hydrate);
  const theme = useGame((s) => s.save.settings.theme);
  const reduceMotion = useGame((s) => s.save.settings.reduceMotion);

  useEffect(() => {
    void hydrate();
  }, [hydrate]);

  // Écriture immédiate dès que la page est masquée ou quittée : rien ne reste en attente.
  useEffect(() => {
    const flush = () => void flushPersist();
    const onVisibility = () => document.visibilityState === 'hidden' && flush();
    window.addEventListener('pagehide', flush);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      window.removeEventListener('pagehide', flush);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = theme;
    root.dataset.motion = reduceMotion ? 'reduced' : 'normal';
  }, [theme, reduceMotion]);

  if (!ready) {
    return (
      <div className="h-full flex items-center justify-center text-text-2" role="status">
        Chargement du laboratoire…
      </div>
    );
  }

  return (
    <HashRouter>
      <RouteTracker />
      <GlossaryProvider>
      <Layout>
        <Suspense fallback={<div className="p-8 text-text-2" role="status">Chargement…</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/carte" element={<MapPage />} />
            <Route path="/theoreme/:id" element={<TheoremPage />} />
            <Route path="/preuve/:id" element={<ExercisePage />} />
            <Route path="/preuve-libre/:id" element={<FreeProofPage />} />
            <Route path="/contre-exemples" element={<CounterexamplesPage />} />
            <Route path="/contre-exemples/:id" element={<CounterexamplesPage />} />
            <Route path="/examen" element={<ExamPage />} />
            <Route path="/trouver-erreur" element={<ErrorHuntPage />} />
            <Route path="/trouver-erreur/:id" element={<ErrorHuntPage />} />
            <Route path="/pieges" element={<TrapsPage />} />
            <Route path="/revision" element={<ReviewPage />} />
            <Route path="/tableau" element={<DashboardPage />} />
            <Route path="/carnet" element={<NotebookPage />} />
            <Route path="/reglages" element={<SettingsPage />} />
            <Route path="/libre" element={<FreeModePage />} />
            <Route path="/labos" element={<LabsPage />} />
            <Route path="/labo/:id" element={<LabPage />} />
            <Route path="/atlas" element={<AtlasPage />} />
            <Route path="/atlas/:n" element={<PlatePage />} />
            <Route path="/dictionnaire" element={<DictionaryPage />} />
            <Route path="/dictionnaire/:id" element={<DictionaryPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </Layout>
      </GlossaryProvider>
    </HashRouter>
  );
}
