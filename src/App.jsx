import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import Preloader from './components/UI/Preloader';
import Navbar from './components/UI/Navbar';
import CustomCursor from './components/UI/CustomCursor';
import CaseStudyModal from './components/UI/CaseStudyModal';
import EasterEggs from './components/UI/EasterEggs';

import Hero from './components/Sections/Hero';
import EngineeringProfile from './components/Sections/EngineeringProfile';
import Projects from './components/Sections/Projects';
import Architecture from './components/Sections/Architecture';
import Journey from './components/Sections/Journey';
import TechStack from './components/Sections/TechStack';
import AiAssistant from './components/Sections/AiAssistant';
import Playground from './components/Sections/Playground';
import Performance from './components/Sections/Performance';
import Experience from './components/Sections/Experience';
import EducationCertifications from './components/Sections/EducationCertifications';
import AboutResume from './components/Sections/AboutResume';
import GithubSection from './components/Sections/GithubSection';
import Contact from './components/Sections/Contact';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [engineerMode, setEngineerMode] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [resumeOpen, setResumeOpen] = useState(false);

  useEffect(() => {
    // Lenis Smooth Scroll Initialization
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
    <div className={`min-h-screen bg-[#09090b] text-slate-100 font-sans ${engineerMode ? 'engineer-mode-active' : ''}`}>
      
      {/* Pre-loader overlay */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {/* Custom Precision Cursor */}
      <CustomCursor />

      {/* Easter Egg Event Listener */}
      <EasterEggs />

      {/* Top Navbar */}
      <Navbar
        engineerMode={engineerMode}
        setEngineerMode={setEngineerMode}
        onOpenResume={() => setResumeOpen(true)}
      />

      {/* Main Page Content */}
      <main className="relative">
        <Hero
          engineerMode={engineerMode}
          onOpenResume={() => setResumeOpen(true)}
        />
        
        <EngineeringProfile engineerMode={engineerMode} />
        
        <Projects onSelectProject={(proj) => setSelectedProject(proj)} />
        
        <Architecture engineerMode={engineerMode} />
        
        <Journey engineerMode={engineerMode} />
        
        <TechStack onSelectProject={(proj) => setSelectedProject(proj)} />
        
        <AiAssistant />
        
        <Playground />
        
        <Performance engineerMode={engineerMode} />
        
        <Experience engineerMode={engineerMode} />
        
        <EducationCertifications engineerMode={engineerMode} />
        
        <AboutResume
          engineerMode={engineerMode}
          resumeOpen={resumeOpen}
          setResumeOpen={setResumeOpen}
        />
        
        <GithubSection engineerMode={engineerMode} />
        
        <Contact engineerMode={engineerMode} />
      </main>

      {/* Interactive Case Study Full-Screen Modal */}
      {selectedProject && (
        <CaseStudyModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

    </div>
  );
}
