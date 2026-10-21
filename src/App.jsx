import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Preloader from './components/UI/Preloader';
import Navbar from './components/UI/Navbar';
import EasterEggs from './components/UI/EasterEggs';
import SmoothScrollProvider from './components/UI/SmoothScrollProvider';
import { projectsData } from './data/portfolioData';

import PersistentCanvas from './components/Three/PersistentCanvas';
import Hero from './components/Sections/Hero';
import Introduction from './components/Sections/Introduction';
import AboutSection from './components/Sections/AboutSection';
import Projects from './components/Sections/Projects';
import Architecture from './components/Sections/Architecture';
import TechStack from './components/Sections/TechStack';
import VisualArchive from './components/Sections/VisualArchive';
import Experience from './components/Sections/Experience';
import ResearchPreview from './components/Sections/ResearchPreview';
import Contact from './components/Sections/Contact';

// Code-Split Dynamic Imports for Secondary Routes & Modal
const ResearchIndexPage = lazy(() => import('./pages/ResearchIndexPage'));
const ResearchDetailPage = lazy(() => import('./pages/ResearchDetailPage'));
const LinkBioPage = lazy(() => import('./pages/LinkBioPage'));
const CaseStudyModal = lazy(() => import('./components/UI/CaseStudyModal'));

function RouteFallback() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-[#09090b] text-slate-100">
      <div className="w-10 h-10 border-2 border-white/10 border-t-[#ccff00] rounded-full animate-spin mb-4" />
      <span className="font-mono text-xs tracking-widest uppercase text-slate-400">Loading Module...</span>
    </div>
  );
}

/**
 * ScrollToTop helper: scrolls to top on route change unless a hash anchor is specified
 */
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { immediate: true });
      }
    }
  }, [pathname, hash]);

  return null;
}

/**
 * HomePage: Main editorial portfolio flow
 */
function HomePage({ setSelectedProject }) {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        const timer = setTimeout(() => {
          const headerOffset = 74;
          const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
          if (window.__lenis) {
            window.__lenis.scrollTo(el, {
              offset: -headerOffset,
              duration: 0.85,
              easing: easeInOutCubic,
            });
          } else {
            const top = el.getBoundingClientRect().top + window.pageYOffset - headerOffset;
            window.scrollTo({ top, behavior: 'smooth' });
          }
        }, 150);
        return () => clearTimeout(timer);
      }
    }
  }, [location.hash]);

  return (
    <>
      {/* Persistent Three.js WebGL Canvas Journey */}
      <PersistentCanvas />

      {/* Main Editorial Flow */}
      <main className="relative z-10">
        <Hero />
        
        <Introduction />
        
        <AboutSection />
        
        <Projects onSelectProject={(proj) => setSelectedProject(proj)} />
        
        <Architecture />
        
        <TechStack />
        
        <VisualArchive />
        
        <Experience />
        
        <ResearchPreview />
        
        <Contact />
      </main>
    </>
  );
}

export default function App() {
  const location = useLocation();
  const isLinkBio = location.pathname.startsWith('/link');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <SmoothScrollProvider disabled={isLoading || !!selectedProject}>
      <ScrollToTop />
      
      <div className="min-h-screen bg-[#F1F0EB] text-[#111111] font-sans relative">
        
        {/* Fixed Fullscreen Studio Intro Loader (z-999999) */}
        {!isLinkBio && isLoading && <Preloader onComplete={() => setIsLoading(false)} />}

        {/* Easter Egg Event Listener */}
        {!isLinkBio && <EasterEggs />}

        {/* Site-wide Adaptive Header */}
        {!isLinkBio && <Navbar />}

        {/* Page Routes with Code-Split Suspense Boundary */}
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  setSelectedProject={setSelectedProject}
                />
              }
            />

            {/* Dedicated AI Research Laboratory Routes */}
            <Route
              path="/research"
              element={<ResearchIndexPage />}
            />
            <Route path="/research/:slug" element={<ResearchDetailPage />} />

            {/* Dedicated Link In Bio Page */}
            <Route path="/link" element={<LinkBioPage />} />

            {/* Fallback to Home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>

        {/* Interactive Case Study Modal */}
        {selectedProject && (
          <Suspense fallback={null}>
            <CaseStudyModal
              project={selectedProject}
              onClose={() => setSelectedProject(null)}
              onSelectProject={(proj) => setSelectedProject(proj)}
              allProjects={projectsData}
            />
          </Suspense>
        )}

      </div>
    </SmoothScrollProvider>
  );
}
