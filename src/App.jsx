import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
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
import GameLab from './components/Sections/GameLab';
import AiLab from './components/Sections/AiLab';
import Experience from './components/Sections/Experience';
import Contact from './components/Sections/Contact';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [engineerMode, setEngineerMode] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [resumeOpen, setResumeOpen] = useState(false);

  useEffect(() => {
    // Lenis Smooth Scroll Setup
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothTouch: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <div className={`min-h-screen bg-[#F1F0EB] text-[#111111] font-sans ${engineerMode ? 'engineer-mode-active' : ''}`}>
      
      {/* Mandatory Pre-loader */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {/* Main Portfolio Content — Flat #F1F0EB background */}
      <div className={loading ? 'opacity-0 pointer-events-none' : 'opacity-100 transition-opacity duration-700'}>
        
        {/* Persistent Three.js WebGL Canvas Journey */}
        <PersistentCanvas />

        {/* Easter Egg Event Listener */}
        <EasterEggs />

        {/* Fixed Editorial Header — Always Visible */}
        <Navbar
          engineerMode={engineerMode}
          setEngineerMode={setEngineerMode}
          onOpenResume={() => setResumeOpen(true)}
        />

        {/* Main Editorial Flow */}
        <main className="relative z-10">
          <Hero
            engineerMode={engineerMode}
            onOpenResume={() => setResumeOpen(true)}
          />
          
          <Introduction />
          
          <AboutResume
            engineerMode={engineerMode}
            resumeOpen={resumeOpen}
            setResumeOpen={setResumeOpen}
          />
          
          <ProcessSection />
          
          <Projects onSelectProject={(proj) => setSelectedProject(proj)} />
          
          <Architecture engineerMode={engineerMode} />
          
          <TechStack onSelectProject={(proj) => setSelectedProject(proj)} />
          
          <GameLab />
          
          <AiLab />
          
          <Experience engineerMode={engineerMode} />
          
          <Contact engineerMode={engineerMode} />
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
