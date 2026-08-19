import React, { useState } from 'react';
import Preloader from './components/UI/Preloader';
import Navbar from './components/UI/Navbar';
import CaseStudyModal from './components/UI/CaseStudyModal';
import EasterEggs from './components/UI/EasterEggs';

import PersistentCanvas from './components/Three/PersistentCanvas';
import Hero from './components/Sections/Hero';
import Introduction from './components/Sections/Introduction';
import AboutResume from './components/Sections/AboutResume';
import ProcessSection from './components/Sections/ProcessSection';
import Projects from './components/Sections/Projects';
import Architecture from './components/Sections/Architecture';
import TechStack from './components/Sections/TechStack';
import VisualArchive from './components/Sections/VisualArchive';
import AiLab from './components/Sections/AiLab';
import Experience from './components/Sections/Experience';
import Contact from './components/Sections/Contact';

export default function App() {
  const [loading, setLoading] = useState(() => {
    if (typeof window !== 'undefined') {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return false;
      return !sessionStorage.getItem('introShown');
    }
    return true;
  });
  const [selectedProject, setSelectedProject] = useState(null);
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F1F0EB] text-[#111111] font-sans relative">
      
      {/* 01 -> 100 Visual Sequence Pre-loader Curtain */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {/* Main Portfolio Content — Live Underneath Loader for Physical Upward Reveal */}
      <div className="relative w-full opacity-100">
        
        {/* Persistent Three.js WebGL Canvas Journey */}
        <PersistentCanvas />

        {/* Easter Egg Event Listener */}
        <EasterEggs />

        {/* Fixed Editorial Header — Always Visible with Subtle Separator */}
        <Navbar
          onOpenResume={() => setResumeOpen(true)}
        />

        {/* Main Editorial Flow */}
        <main className="relative z-10">
          <Hero
            onOpenResume={() => setResumeOpen(true)}
          />
          
          <Introduction />
          
          <AboutResume
            resumeOpen={resumeOpen}
            setResumeOpen={setResumeOpen}
          />
          
          <ProcessSection />
          
          <Projects onSelectProject={(proj) => setSelectedProject(proj)} />
          
          <Architecture />
          
          <TechStack />
          
          <VisualArchive />
          
          <AiLab />
          
          <Experience />
          
          <Contact />
        </main>

        {/* Interactive Case Study Modal */}
        {selectedProject && (
          <CaseStudyModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}

      </div>
    </div>
  );
}
