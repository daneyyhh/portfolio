import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Preloader from './components/UI/Preloader';
import Navbar from './components/UI/Navbar';
import CaseStudyModal from './components/UI/CaseStudyModal';
import EasterEggs from './components/UI/EasterEggs';
import SmoothScrollProvider from './components/UI/SmoothScrollProvider';
import { projectsData } from './data/portfolioData';

import PersistentCanvas from './components/Three/PersistentCanvas';
import Hero from './components/Sections/Hero';
import Introduction from './components/Sections/Introduction';
import AboutResume from './components/Sections/AboutResume';
import Projects from './components/Sections/Projects';
import Architecture from './components/Sections/Architecture';
import TechStack from './components/Sections/TechStack';
import VisualArchive from './components/Sections/VisualArchive';
import Experience from './components/Sections/Experience';
import Contact from './components/Sections/Contact';

// Dedicated AI Research Laboratory Pages
import ResearchIndexPage from './pages/ResearchIndexPage';
import ResearchDetailPage from './pages/ResearchDetailPage';

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
function HomePage({ onOpenResume, setSelectedProject, resumeOpen, setResumeOpen }) {
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
        <Hero onOpenResume={onOpenResume} />
        
        <Introduction />
        
        <AboutResume
          resumeOpen={resumeOpen}
          setResumeOpen={setResumeOpen}
        />
        
        <Projects onSelectProject={(proj) => setSelectedProject(proj)} />
        
        <Architecture />
        
        <TechStack />
        
        <VisualArchive />
        
        <Experience />
        
        <Contact />
      </main>
    </>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <SmoothScrollProvider disabled={isLoading || !!selectedProject}>
      <ScrollToTop />
      
      <div className="min-h-screen bg-[#F1F0EB] text-[#111111] font-sans relative">
        
        {/* Fixed Fullscreen Studio Intro Loader (z-999999) */}
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}

        {/* Easter Egg Event Listener */}
        <EasterEggs />

        {/* Site-wide Adaptive Header */}
        <Navbar
          onOpenResume={() => setResumeOpen(true)}
        />

        {/* Page Routes */}
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                onOpenResume={() => setResumeOpen(true)}
                setSelectedProject={setSelectedProject}
                resumeOpen={resumeOpen}
                setResumeOpen={setResumeOpen}
              />
            }
          />

          {/* Dedicated AI Research Laboratory Routes */}
          <Route
            path="/research"
            element={<ResearchIndexPage onOpenResume={() => setResumeOpen(true)} />}
          />
          <Route
            path="/research/:slug"
            element={<ResearchDetailPage onOpenResume={() => setResumeOpen(true)} />}
          />

          {/* Fallback to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {/* Interactive Case Study Modal */}
        {selectedProject && (
          <CaseStudyModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            onSelectProject={(proj) => setSelectedProject(proj)}
            allProjects={projectsData}
          />
        )}

      </div>
    </SmoothScrollProvider>
  );
}
