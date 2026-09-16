/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';

// Themed Suspense Fallback (Muted pulsing gold diamond and "Summoning the Realm...")
const ThemedLoadingFallback: React.FC = () => (
  <div
    className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center animate-fade-in"
    role="status"
    aria-live="polite"
  >
    <div className="relative w-12 h-12 mb-4 flex items-center justify-center">
      <div className="absolute inset-0 rotate-45 border border-[var(--gold)]/50 animate-spin duration-3000" />
      <div className="w-3.5 h-3.5 rotate-45 bg-[var(--gold)] shadow-[0_0_15px_var(--gold)] animate-pulse" />
    </div>
    <p className="font-cinzel text-xs tracking-[0.3em] uppercase text-[var(--gold-light)] font-medium">
      Summoning the Realm...
    </p>
  </div>
);

// Route-based code splitting with React.lazy
const Home = lazy(() => import('./pages/Home').then((m) => ({ default: m.Home })));
const About = lazy(() => import('./pages/About').then((m) => ({ default: m.About })));
const Experience = lazy(() => import('./pages/Experience').then((m) => ({ default: m.Experience })));
const Projects = lazy(() => import('./pages/Projects').then((m) => ({ default: m.Projects })));
const ProjectCaseStudy = lazy(() =>
  import('./pages/ProjectCaseStudy').then((m) => ({ default: m.ProjectCaseStudy }))
);
const Notes = lazy(() => import('./pages/Notes').then((m) => ({ default: m.Notes })));
const NotePost = lazy(() => import('./pages/NotePost').then((m) => ({ default: m.NotePost })));
const CharacterSheet = lazy(() =>
  import('./pages/CharacterSheet').then((m) => ({ default: m.CharacterSheet }))
);
const Skills = lazy(() => import('./pages/Skills').then((m) => ({ default: m.Skills })));
const Education = lazy(() => import('./pages/Education').then((m) => ({ default: m.Education })));
const Certifications = lazy(() =>
  import('./pages/Certifications').then((m) => ({ default: m.Certifications }))
);
const Achievements = lazy(() =>
  import('./pages/Achievements').then((m) => ({ default: m.Achievements }))
);
const Contact = lazy(() => import('./pages/Contact').then((m) => ({ default: m.Contact })));
const NotFound = lazy(() => import('./pages/NotFound').then((m) => ({ default: m.NotFound })));

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<ThemedLoadingFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:slug" element={<ProjectCaseStudy />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/notes/:slug" element={<NotePost />} />
            <Route path="/character-sheet" element={<CharacterSheet />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/education" element={<Education />} />
            <Route path="/certifications" element={<Certifications />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
}
