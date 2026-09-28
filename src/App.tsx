import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router';
import { SiteLayout } from './components/layout/SiteLayout';
import Home from './pages/Home';

// Home ships in the main bundle; every other page loads its own chunk on first visit.
const Work = lazy(() => import('./pages/Work'));
const CaseStudy = lazy(() => import('./pages/CaseStudy'));
const Projects = lazy(() => import('./pages/Projects'));
const Product = lazy(() => import('./pages/Product'));
const About = lazy(() => import('./pages/About'));
const Lab = lazy(() => import('./pages/Lab'));
const NotFound = lazy(() => import('./pages/NotFound'));

export default function App() {
  return (
    <Suspense fallback={<div className="min-h-dvh" />}>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<Home />} />
          <Route path="work" element={<Work />} />
          <Route path="work/:slug" element={<CaseStudy />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:slug" element={<Product />} />
          <Route path="lab" element={<Lab />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
