import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  X,
  ExternalLink,
  Github,
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  Layers,
  CheckCircle2,
  GitBranch,
  Cpu,
  ShieldCheck,
  Code2,
  Scale,
  Gauge,
  Terminal,
  Activity,
  Maximize2
} from 'lucide-react';
import ProjectStatusBadge from './ProjectStatusBadge';
import BuildTimeline from './BuildTimeline';

const EASE = [0.16, 1, 0.3, 1];

function formatMetric(val) {
  if (!val) return { stat: '', unit: null };
  if (val.includes('/ 100') || val.includes('/100')) {
    return { stat: val, unit: null };
  }
  const match = val.match(/^([<>]?\s*[\d\.\+\/]+(?:\s*(?:%|ms|FPS|KB))?)\s+([A-Za-z\/][A-Za-z0-9\/\s]*)$/i);
  if (match) {
    return { stat: match[1].trim(), unit: match[2].trim() };
  }
  return { stat: val, unit: null };
}

export default function CaseStudyModal({ project, onClose, onSelectProject, allProjects = [] }) {
  const prefersReduced = useReducedMotion();
  const modalRef = useRef(null);
  const overlayRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const closeButtonRef = useRef(null);
  const previouslyFocusedElementRef = useRef(null);

  // Optional architecture deep-dive views (for projects with rich pipelines)
  const [architectureSubTab, setArchitectureSubTab] = useState('nodes');
  const [selectedStepIdx, setSelectedStepIdx] = useState(0);
  const [isPlayingFlow, setIsPlayingFlow] = useState(false);

  // Focus trapping and keyboard management
  useEffect(() => {
    previouslyFocusedElementRef.current = document.activeElement;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button:not([disabled]), [href]:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled])'
        );
        const focusable = Array.from(focusableElements).filter(
          (el) => el.offsetParent !== null && !el.hasAttribute('aria-hidden')
        );

        if (focusable.length === 0) return;

        const firstElement = focusable[0];
        const lastElement = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Initial focus placed on close button
    const timer = setTimeout(() => {
      if (closeButtonRef.current) {
        closeButtonRef.current.focus();
      }
    }, 50);

    // Prevent background scrolling while open
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
      clearTimeout(timer);
      if (previouslyFocusedElementRef.current && previouslyFocusedElementRef.current.focus) {
        previouslyFocusedElementRef.current.focus();
      }
    };
  }, [onClose]);

  // Flowchart pipeline playback interval (Nexora / FiveM / Haunted House)
  useEffect(() => {
    let interval;
    if (isPlayingFlow && project?.caseStudy?.flowchart?.length) {
      interval = setInterval(() => {
        setSelectedStepIdx((prev) => (prev + 1) % project.caseStudy.flowchart.length);
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [isPlayingFlow, project]);

  // Click outside backdrop to close
  const handleBackdropClick = (e) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  // Smooth scroll to a case study section within the modal
  const scrollToSection = (sectionId) => {
    const container = scrollContainerRef.current;
    const targetElement = document.getElementById(sectionId);
    if (container && targetElement) {
      const containerRect = container.getBoundingClientRect();
      const targetRect = targetElement.getBoundingClientRect();
      const relativeTop = targetRect.top - containerRect.top + container.scrollTop - 130;
      container.scrollTo({
        top: relativeTop,
        behavior: prefersReduced ? 'auto' : 'smooth',
      });
    }
  };

  if (!project) return null;

  const cs = project.caseStudy || {};
  const projectNumber = project.number || "01";
  const projectStatus = project.status || "PRODUCTION READY";

  // Section 01 — OVERVIEW
  const overviewText = cs.overview || project.desc || project.shortDesc || null;
  const hasOverview = Boolean(overviewText);

  // Section 02 — PROBLEM
  const problemText = cs.problem || project.challenge || null;
  const hasProblem = Boolean(problemText);

  // Section 03 — APPROACH
  const approachText = cs.approach || project.built || null;
  const hasApproach = Boolean(approachText);

  // Section 04 — UI / UX
  const uiUxText = cs.uiUx || cs.uiDesign || null;
  const hasUiUx = Boolean(uiUxText);

  // Section 05 — DEVELOPMENT
  const developmentText = cs.development || null;
  const hasDevelopment = Boolean(developmentText);

  // Section 06 — ARCHITECTURE
  const architectureNodes = Array.isArray(cs.architecture) ? cs.architecture : [];
  const flowchart = Array.isArray(cs.flowchart) ? cs.flowchart : [];
  const patterns = Array.isArray(cs.patterns) ? cs.patterns : [];
  const tradeoffs = Array.isArray(cs.tradeoffs) ? cs.tradeoffs : [];
  const metrics = Array.isArray(cs.metrics) ? cs.metrics : [];
  const hasArchitecture = Boolean(
    architectureNodes.length > 0 ||
    (typeof cs.architecture === 'string' && cs.architecture.trim().length > 0) ||
    flowchart.length > 0
  );

  // Section 07 — TECHNOLOGY
  const techCategories = Array.isArray(cs.technology) ? cs.technology : [];
  const rawTech = Array.isArray(project.technologies) ? project.technologies : [];
  const hasTechnology = Boolean(techCategories.length > 0 || rawTech.length > 0);

  // Section 08 — RESULT
  const resultText = cs.result || null;
  const hasResult = Boolean(resultText || metrics.length > 0);

  // Section 09 — LIVE PROJECT / GITHUB
  const githubUrl = project.github || project.githubLink || cs.githubUrl || null;
  const liveUrl = project.link || project.demoLink || cs.liveUrl || null;
  const hasLiveLinks = Boolean(githubUrl || liveUrl);

  // Section: BUILD TIMELINE (Data-Driven Phases)
  const timelineStages = Array.isArray(cs.timeline) ? cs.timeline : [];
  const hasTimeline = timelineStages.length > 0;

  // Filter only sections for which real information exists
  const availableSections = [
    hasOverview && { id: 'sec-overview', num: '01', title: 'OVERVIEW' },
    hasProblem && { id: 'sec-problem', num: '02', title: 'PROBLEM' },
    hasApproach && { id: 'sec-approach', num: '03', title: 'APPROACH' },
    hasUiUx && { id: 'sec-uiux', num: '04', title: 'UI / UX' },
    hasTimeline && { id: 'sec-timeline', num: 'TIMELINE', title: 'BUILD TIMELINE' },
    hasDevelopment && { id: 'sec-development', num: '05', title: 'DEVELOPMENT' },
    hasArchitecture && { id: 'sec-architecture', num: '06', title: 'ARCHITECTURE' },
    hasTechnology && { id: 'sec-technology', num: '07', title: 'TECHNOLOGY' },
    hasResult && { id: 'sec-result', num: '08', title: 'RESULT' },
    hasLiveLinks && { id: 'sec-live', num: '09', title: 'LIVE / GITHUB' },
  ].filter(Boolean);

  // Next / Previous Project Navigation
  const currentIndex = allProjects.findIndex((p) => p.id === project.id);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : allProjects[allProjects.length - 1];
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : allProjects[0];

  const currentStep = flowchart[selectedStepIdx] || flowchart[0] || null;

  return (
    <AnimatePresence>
      <div
        ref={overlayRef}
        onClick={handleBackdropClick}
        className="fixed inset-0 z-[999999] bg-[#050505]/95 backdrop-blur-xl flex items-center justify-center p-0 md:p-4 lg:p-6 overflow-hidden selection:bg-[#FF1E27] selection:text-white"
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-study-title"
        aria-describedby="case-study-overview"
      >
        <motion.div
          ref={modalRef}
          initial={
            prefersReduced
              ? { opacity: 0 }
              : { opacity: 0, y: 40, scale: 0.98 }
          }
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={
            prefersReduced
              ? { opacity: 0 }
              : { opacity: 0, y: 30, scale: 0.98, transition: { duration: 0.25, ease: EASE } }
          }
          transition={{ duration: 0.45, ease: EASE }}
          className="relative w-full h-full md:h-[94vh] max-w-7xl bg-[#0C0C0D] border-0 md:border md:border-white/15 overflow-hidden shadow-2xl flex flex-col font-mono text-slate-200"
        >
          {/* ─────────────────────────────────────────────────────────────
              STICKY TOP EDITORIAL CONTROL BAR
          ───────────────────────────────────────────────────────────── */}
          <header className="sticky top-0 z-40 bg-[#0C0C0D]/95 backdrop-blur-md border-b border-white/10 px-4 sm:px-6 md:px-8 py-3.5 flex items-center justify-between gap-4 shrink-0">
            {/* Left Project Tag & Status */}
            <div className="flex items-center gap-3 sm:gap-4 min-w-0">
              <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase">
                <span className="w-2 h-2 rounded-full bg-[#FF1E27] animate-pulse shrink-0" />
                <span className="text-[#FF1E27] font-bold shrink-0">PROJECT // {projectNumber}</span>
                <span className="text-white/40 hidden sm:inline">|</span>
                <span className="text-white font-bold truncate hidden sm:inline">{project.title}</span>
              </div>

              {project.status && (
                <div className="hidden lg:block">
                  <ProjectStatusBadge status={project.status} variant="dark" />
                </div>
              )}
            </div>

            {/* Right Action: [ESC] + Close Button */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <span className="hidden sm:inline-block text-[10px] text-slate-400 font-mono tracking-widest border border-white/10 px-2 py-1">
                ESC KEY
              </span>

              <button
                ref={closeButtonRef}
                onClick={onClose}
                aria-label="Close Case Study"
                className="group flex items-center gap-2 bg-white/5 hover:bg-[#FF1E27] text-white border border-white/15 px-3 py-1.5 text-xs font-mono font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF1E27]"
              >
                <span className="hidden xs:inline text-[11px]">CLOSE</span>
                <X size={16} className="group-hover:rotate-90 transition-transform duration-200" />
              </button>
            </div>
          </header>

          {/* ─────────────────────────────────────────────────────────────
              STICKY SECTION JUMP PILLS (Shows only sections with real data)
          ───────────────────────────────────────────────────────────── */}
          {availableSections.length > 1 && (
            <nav
              aria-label="Case Study Section Navigation"
              className="sticky top-[53px] z-30 bg-[#080809]/95 backdrop-blur-md border-b border-white/10 px-4 sm:px-6 md:px-8 py-2 overflow-x-auto scrollbar-none flex items-center gap-1.5 sm:gap-2 shrink-0"
            >
              <span className="text-[10px] text-slate-500 font-mono tracking-widest uppercase hidden md:inline mr-2 shrink-0">
                JUMP TO:
              </span>
              {availableSections.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => scrollToSection(sec.id)}
                  className="px-2.5 sm:px-3 py-1 text-[10px] sm:text-[11px] font-mono border border-white/10 bg-white/[0.02] text-slate-300 hover:text-white hover:border-[#FF1E27] hover:bg-[#FF1E27]/10 transition-all uppercase whitespace-nowrap cursor-pointer shrink-0 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FF1E27]"
                >
                  <span className="text-[#FF1E27] font-bold mr-1">{sec.num}</span>
                  <span>{sec.title}</span>
                </button>
              ))}
            </nav>
          )}

          {/* ─────────────────────────────────────────────────────────────
              SCROLLABLE EDITORIAL CASE STUDY BODY
          ───────────────────────────────────────────────────────────── */}
          <div
            ref={scrollContainerRef}
            className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-8 md:p-12 lg:p-16 space-y-16 sm:space-y-24 scroll-smooth scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent"
          >
            {/* ── HERO BANNER & TITLE ── */}
            <header className="space-y-8 border-b border-white/10 pb-12 sm:pb-16 w-full">
              {/* Meta details bar */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <span className="text-xs font-mono font-bold bg-[#FF1E27] text-white px-3 py-1 uppercase tracking-widest">
                    CASE STUDY // {projectNumber}
                  </span>
                  <span className="text-xs font-mono text-slate-300 bg-white/5 border border-white/10 px-3 py-1 uppercase tracking-widest">
                    {project.category}
                  </span>
                </div>

                <div className="flex items-center gap-3 sm:gap-4 text-xs font-mono text-slate-400 flex-wrap">
                  <span>
                    YEAR: <strong className="text-white font-bold">{project.year || "2026"}</strong>
                  </span>
                  {project.status && (
                    <>
                      <span>•</span>
                      <div className="flex items-center gap-2">
                        <span>STATUS:</span>
                        <ProjectStatusBadge status={project.status} variant="hero" />
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Large Project Title */}
              <div className="space-y-3">
                <h1
                  id="case-study-title"
                  className="font-syne text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase text-white tracking-tight leading-[0.95]"
                >
                  {project.title}
                </h1>

                {project.role && (
                  <p className="text-xs sm:text-sm font-mono text-slate-400 tracking-wider uppercase">
                    ENGINEERING ROLE: <span className="text-white font-bold">{project.role}</span>
                  </p>
                )}
              </div>

              {/* Editorial Hero Image with Framed Metadata */}
              <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] max-h-[520px] overflow-hidden border border-white/15 bg-[#141416] group">
                <img
                  src={project.img}
                  alt={`Hero capture for ${project.title}`}
                  className="w-full h-full object-cover filter contrast-110 select-none group-hover:scale-101 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0D] via-[#0C0C0D]/20 to-transparent pointer-events-none" />

                <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
                  <div className="inline-flex items-center gap-2 bg-[#0C0C0D]/90 backdrop-blur-md border border-white/20 px-3 py-1.5 text-[10px] sm:text-xs text-white font-mono">
                    <Activity size={13} className="text-[#FF1E27]" />
                    <span className="font-bold tracking-wider">PRODUCTION VERIFIED ARTIFACT</span>
                  </div>

                  {project.technologies && project.technologies.length > 0 && (
                    <div className="hidden sm:flex flex-wrap gap-1">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span key={tech} className="bg-[#0C0C0D]/90 backdrop-blur-md border border-white/10 text-[9px] font-mono px-2 py-0.5 text-slate-300">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </header>

            {/* ─────────────────────────────────────────────────────────────
                01 — OVERVIEW
            ───────────────────────────────────────────────────────────── */}
            {hasOverview && (
              <section id="sec-overview" className="space-y-6 pt-4">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs sm:text-sm font-bold text-[#FF1E27] tracking-widest">
                    01 — OVERVIEW
                  </span>
                  <span className="h-px flex-1 bg-white/10" />
                </div>

                <div className="space-y-4 max-w-5xl">
                  <h2 className="font-syne text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase text-white tracking-tight">
                    SYSTEM SYNOPSIS & SCOPE
                  </h2>

                  <p id="case-study-overview" className="font-sans text-slate-200 text-base sm:text-lg md:text-xl leading-relaxed">
                    {overviewText}
                  </p>
                </div>

                {/* Key Spec highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-4">
                  <div className="bg-white/[0.03] border border-white/10 p-4 space-y-1 min-w-0 overflow-hidden">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block truncate">ARCHITECTURAL DOMAIN</span>
                    <span className="font-mono text-xs sm:text-sm font-bold text-white uppercase block truncate">{project.category}</span>
                  </div>
                  <div className="bg-white/[0.03] border border-white/10 p-4 space-y-1 min-w-0 overflow-hidden">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block truncate">ENGINEERING TIMELINE</span>
                    <span className="font-mono text-xs sm:text-sm font-bold text-white uppercase block truncate">{project.year || "2026"}</span>
                  </div>
                  <div className="bg-white/[0.03] border border-white/10 p-4 space-y-1 min-w-0 overflow-hidden">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block truncate">LEAD RESPONSIBILITY</span>
                    <span className="font-mono text-xs sm:text-sm font-bold text-white uppercase block truncate">{project.role || "Systems Architect"}</span>
                  </div>
                  <div className="bg-white/[0.03] border border-white/10 p-4 space-y-1.5 min-w-0 overflow-hidden flex flex-col justify-between">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block truncate">PROJECT STATUS</span>
                    <div>
                      <ProjectStatusBadge status={project.status} variant="dark" />
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* ─────────────────────────────────────────────────────────────
                02 — PROBLEM
            ───────────────────────────────────────────────────────────── */}
            {hasProblem && (
              <section id="sec-problem" className="space-y-6 pt-4">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs sm:text-sm font-bold text-[#FF1E27] tracking-widest">
                    02 — PROBLEM
                  </span>
                  <span className="h-px flex-1 bg-white/10" />
                </div>

                <div className="space-y-4 max-w-5xl">
                  <h2 className="font-syne text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase text-white tracking-tight">
                    CORE ENGINEERING CHALLENGE
                  </h2>

                  <div className="bg-[#140F0F] border-l-4 border-[#FF1E27] p-5 sm:p-7 md:p-8 space-y-3">
                    <div className="text-[10px] font-mono text-[#FF1E27] tracking-widest uppercase font-bold">
                      CRITICAL TECHNICAL BOTTLENECK & CONSTRAINTS //
                    </div>
                    <p className="font-sans text-slate-200 text-sm sm:text-base md:text-lg leading-relaxed">
                      {problemText}
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* ─────────────────────────────────────────────────────────────
                03 — APPROACH
            ───────────────────────────────────────────────────────────── */}
            {hasApproach && (
              <section id="sec-approach" className="space-y-6 pt-4">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs sm:text-sm font-bold text-[#FF1E27] tracking-widest">
                    03 — APPROACH
                  </span>
                  <span className="h-px flex-1 bg-white/10" />
                </div>

                <div className="space-y-4 max-w-5xl">
                  <h2 className="font-syne text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase text-white tracking-tight">
                    ENGINEERING METHODOLOGY & PARADIGM
                  </h2>

                  <div className="bg-white/[0.02] border border-white/15 p-5 sm:p-7 md:p-8 space-y-3">
                    <div className="text-[10px] font-mono text-white/50 tracking-widest uppercase font-bold">
                      ARCHITECTURAL STRATEGY & DECISION MATRIX //
                    </div>
                    <p className="font-sans text-slate-200 text-sm sm:text-base md:text-lg leading-relaxed">
                      {approachText}
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* ─────────────────────────────────────────────────────────────
                04 — UI / UX
            ───────────────────────────────────────────────────────────── */}
            {hasUiUx && (
              <section id="sec-uiux" className="space-y-6 pt-4">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs sm:text-sm font-bold text-[#FF1E27] tracking-widest">
                    04 — UI / UX
                  </span>
                  <span className="h-px flex-1 bg-white/10" />
                </div>

                <div className="space-y-4 max-w-5xl">
                  <h2 className="font-syne text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase text-white tracking-tight">
                    INTERACTION DESIGN & USER INTERFACE DISCIPLINE
                  </h2>

                  <div className="bg-white/[0.02] border-l-4 border-slate-400 p-5 sm:p-7 md:p-8 space-y-3">
                    <div className="text-[10px] font-mono text-slate-400 tracking-widest uppercase font-bold">
                      VISUAL HIERARCHY, ACCESSIBILITY & KINETIC FEEDBACK //
                    </div>
                    <p className="font-sans text-slate-200 text-sm sm:text-base md:text-lg leading-relaxed">
                      {uiUxText}
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* ─────────────────────────────────────────────────────────────
                BUILD TIMELINE (DATA-DRIVEN BUILD PHASES)
            ───────────────────────────────────────────────────────────── */}
            {hasTimeline && (
              <BuildTimeline
                timeline={timelineStages}
                projectTitle={project.title}
                scrollContainerRef={scrollContainerRef}
              />
            )}

            {/* ─────────────────────────────────────────────────────────────
                05 — DEVELOPMENT
            ───────────────────────────────────────────────────────────── */}
            {hasDevelopment && (
              <section id="sec-development" className="space-y-6 pt-4">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs sm:text-sm font-bold text-[#FF1E27] tracking-widest">
                    05 — DEVELOPMENT
                  </span>
                  <span className="h-px flex-1 bg-white/10" />
                </div>

                <div className="space-y-4 max-w-5xl">
                  <h2 className="font-syne text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase text-white tracking-tight">
                    CODE STANDARDS & MODULAR ARCHITECTURE
                  </h2>

                  <div className="bg-white/[0.02] border border-white/15 p-5 sm:p-7 md:p-8 space-y-3">
                    <div className="text-[10px] font-mono text-[#FF1E27] tracking-widest uppercase font-bold">
                      IMPLEMENTATION RIGOR, UNIT TESTS & STATE MANAGEMENT //
                    </div>
                    <p className="font-sans text-slate-200 text-sm sm:text-base md:text-lg leading-relaxed">
                      {developmentText}
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* ─────────────────────────────────────────────────────────────
                06 — ARCHITECTURE
            ───────────────────────────────────────────────────────────── */}
            {hasArchitecture && (
              <section id="sec-architecture" className="space-y-8 pt-4">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs sm:text-sm font-bold text-[#FF1E27] tracking-widest">
                    06 — ARCHITECTURE
                  </span>
                  <span className="h-px flex-1 bg-white/10" />
                </div>

                <div className="space-y-4 max-w-5xl">
                  <h2 className="font-syne text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase text-white tracking-tight">
                    SYSTEM TOPOLOGY & PIPELINES
                  </h2>
                  <p className="font-sans text-slate-300 text-sm sm:text-base leading-relaxed">
                    Production architecture mapping the end-to-end flow from client presentation through security boundaries, concurrency locks, persistence layers, to event streams.
                  </p>
                </div>

                {/* Architecture Sub-tab switchers if flowchart or patterns exist */}
                {(flowchart.length > 0 || patterns.length > 0 || tradeoffs.length > 0) && (
                  <div className="flex flex-wrap gap-2 border-b border-white/10 pb-3">
                    <button
                      onClick={() => setArchitectureSubTab('nodes')}
                      className={`px-3 py-1.5 text-xs font-mono font-bold tracking-wider uppercase border transition-all cursor-pointer ${
                        architectureSubTab === 'nodes'
                          ? 'bg-[#FF1E27] text-white border-[#FF1E27]'
                          : 'bg-white/5 border-white/10 text-slate-300 hover:text-white'
                      }`}
                    >
                      <Layers size={13} className="inline mr-1.5 -mt-0.5" />
                      <span>PRIMARY NODES</span>
                    </button>

                    {flowchart.length > 0 && (
                      <button
                        onClick={() => setArchitectureSubTab('pipeline')}
                        className={`px-3 py-1.5 text-xs font-mono font-bold tracking-wider uppercase border transition-all cursor-pointer ${
                          architectureSubTab === 'pipeline'
                            ? 'bg-[#FF1E27] text-white border-[#FF1E27]'
                            : 'bg-white/5 border-white/10 text-slate-300 hover:text-white'
                        }`}
                      >
                        <GitBranch size={13} className="inline mr-1.5 -mt-0.5" />
                        <span>DATA PIPELINE SIMULATOR</span>
                      </button>
                    )}

                    {patterns.length > 0 && (
                      <button
                        onClick={() => setArchitectureSubTab('patterns')}
                        className={`px-3 py-1.5 text-xs font-mono font-bold tracking-wider uppercase border transition-all cursor-pointer ${
                          architectureSubTab === 'patterns'
                            ? 'bg-[#FF1E27] text-white border-[#FF1E27]'
                            : 'bg-white/5 border-white/10 text-slate-300 hover:text-white'
                        }`}
                      >
                        <Code2 size={13} className="inline mr-1.5 -mt-0.5" />
                        <span>DESIGN PATTERNS ({patterns.length})</span>
                      </button>
                    )}

                    {tradeoffs.length > 0 && (
                      <button
                        onClick={() => setArchitectureSubTab('tradeoffs')}
                        className={`px-3 py-1.5 text-xs font-mono font-bold tracking-wider uppercase border transition-all cursor-pointer ${
                          architectureSubTab === 'tradeoffs'
                            ? 'bg-[#FF1E27] text-white border-[#FF1E27]'
                            : 'bg-white/5 border-white/10 text-slate-300 hover:text-white'
                        }`}
                      >
                        <Scale size={13} className="inline mr-1.5 -mt-0.5" />
                        <span>TRADE-OFF MATRIX</span>
                      </button>
                    )}
                  </div>
                )}

                {/* VIEW A: Primary Architectural Nodes */}
                {architectureSubTab === 'nodes' && architectureNodes.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                    {architectureNodes.map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-white/[0.02] border border-white/15 hover:border-[#FF1E27] transition-all p-6 space-y-3"
                      >
                        <div className="flex items-center justify-between text-xs text-[#FF1E27] font-mono">
                          <span className="font-bold">NODE 0{idx + 1}</span>
                          <Layers size={15} />
                        </div>
                        <h4 className="font-syne text-lg font-bold text-white uppercase">{item.node}</h4>
                        <div className="text-xs font-mono text-[#FF1E27] font-semibold">{item.tech}</div>
                        <p className="text-xs sm:text-sm font-sans text-slate-300 leading-relaxed pt-1">
                          {item.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* VIEW B: Interactive Pipeline Visualizer */}
                {architectureSubTab === 'pipeline' && flowchart.length > 0 && (
                  <div className="space-y-6 bg-black/40 border border-white/15 p-4 sm:p-6 md:p-8">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <div className="text-xs font-mono font-bold text-[#FF1E27] uppercase tracking-wider">
                          INTERACTIVE EXECUTION TELEMETRY
                        </div>
                        <p className="text-xs text-slate-400 font-sans mt-0.5">
                          Select any node to inspect data schema, protocol SLAs, and failover boundaries.
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setIsPlayingFlow(!isPlayingFlow)}
                          className="px-3 py-1.5 bg-[#FF1E27] hover:bg-[#E00208] text-white text-xs font-mono font-bold transition-all cursor-pointer"
                        >
                          {isPlayingFlow ? 'PAUSE PIPELINE' : 'RUN SIMULATION'}
                        </button>
                        <button
                          onClick={() => {
                            setIsPlayingFlow(false);
                            setSelectedStepIdx(0);
                          }}
                          className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/15 text-slate-300 text-xs font-mono transition-all cursor-pointer"
                        >
                          RESET
                        </button>
                      </div>
                    </div>

                    {/* Pipeline Stage Buttons */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                      {flowchart.map((step, idx) => {
                        const isCurrent = selectedStepIdx === idx;
                        return (
                          <button
                            key={step.id || idx}
                            onClick={() => {
                              setIsPlayingFlow(false);
                              setSelectedStepIdx(idx);
                            }}
                            className={`p-3 border text-left transition-all cursor-pointer ${
                              isCurrent
                                ? 'bg-[#181818] border-[#FF1E27] text-white shadow-lg shadow-[#FF1E27]/10'
                                : 'bg-white/[0.02] border-white/10 text-slate-400 hover:border-white/30'
                            }`}
                          >
                            <span className="text-[10px] font-mono block text-[#FF1E27] font-bold">
                              STAGE {step.step}
                            </span>
                            <span className="text-xs font-bold text-white line-clamp-1 mt-0.5">
                              {step.title}
                            </span>
                            <span className="text-[9px] font-mono text-slate-400 block mt-1">
                              {step.latency}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Stage Inspector Detail */}
                    {currentStep && (
                      <div className="bg-[#101012] border-2 border-[#FF1E27] p-5 sm:p-7 space-y-5">
                        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                          <div>
                            <span className="text-[10px] font-mono text-[#FF1E27] font-bold uppercase tracking-widest">
                              ACTIVE STAGE {currentStep.step} // {currentStep.type}
                            </span>
                            <h3 className="font-syne text-xl sm:text-2xl font-bold text-white uppercase mt-0.5">
                              {currentStep.title}
                            </h3>
                          </div>

                          <div className="flex items-center gap-4 text-xs font-mono">
                            <div className="text-right">
                              <span className="text-slate-500 block text-[10px]">SLA LATENCY</span>
                              <span className="text-[#FF1E27] font-bold">{currentStep.latency}</span>
                            </div>
                            <div className="text-right border-l border-white/10 pl-4">
                              <span className="text-slate-500 block text-[10px]">PROTOCOL</span>
                              <span className="text-white font-bold">{currentStep.protocol}</span>
                            </div>
                          </div>
                        </div>

                        <p className="text-sm sm:text-base font-sans text-slate-200 leading-relaxed">
                          {currentStep.action}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-black/50 border border-white/10 p-4 space-y-1.5">
                            <span className="text-[10px] font-mono text-emerald-400 font-bold block uppercase">
                              INPUT INGRESS PAYLOAD
                            </span>
                            <pre className="text-xs font-mono text-slate-300 overflow-x-auto whitespace-pre-wrap">
                              {currentStep.inputs}
                            </pre>
                          </div>

                          <div className="bg-black/50 border border-white/10 p-4 space-y-1.5">
                            <span className="text-[10px] font-mono text-cyan-400 font-bold block uppercase">
                              OUTPUT EGRESS / MUTATION
                            </span>
                            <pre className="text-xs font-mono text-slate-300 overflow-x-auto whitespace-pre-wrap">
                              {currentStep.outputs}
                            </pre>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                          <div className="bg-white/5 p-3.5 border border-white/10 space-y-1">
                            <span className="text-slate-400 font-bold block uppercase">Tech Stack</span>
                            <span className="text-white font-mono">{currentStep.tech}</span>
                          </div>
                          <div className="bg-white/5 p-3.5 border border-white/10 space-y-1">
                            <span className="text-emerald-400 font-bold block uppercase">Failover Guard</span>
                            <span className="text-slate-300 font-sans">{currentStep.failover}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* VIEW C: Software Design Patterns */}
                {architectureSubTab === 'patterns' && patterns.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {patterns.map((pat, idx) => (
                      <div
                        key={idx}
                        className="bg-white/[0.02] border border-white/15 hover:border-[#FF1E27] transition-all p-6 space-y-4"
                      >
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="text-[#FF1E27] font-bold">PATTERN 0{idx + 1}</span>
                          <span className="bg-white/5 border border-white/10 px-2 py-0.5 text-slate-300">
                            {pat.category}
                          </span>
                        </div>

                        <h4 className="font-syne text-xl font-bold text-white uppercase">{pat.title}</h4>

                        <div className="space-y-3 text-xs sm:text-sm font-sans">
                          <div>
                            <span className="text-rose-400 font-mono text-[10px] font-bold uppercase block">
                              Problem:
                            </span>
                            <p className="text-slate-300 mt-0.5 leading-relaxed">{pat.problem}</p>
                          </div>
                          <div>
                            <span className="text-emerald-400 font-mono text-[10px] font-bold uppercase block">
                              Engineering Solution:
                            </span>
                            <p className="text-slate-300 mt-0.5 leading-relaxed">{pat.solution}</p>
                          </div>
                        </div>

                        {pat.code && (
                          <div className="bg-[#111113] border border-white/10 p-3.5">
                            <pre className="font-mono text-xs text-slate-200 overflow-x-auto whitespace-pre leading-relaxed">
                              {pat.code}
                            </pre>
                          </div>
                        )}

                        <div className="bg-[#FF1E27]/10 border border-[#FF1E27]/30 p-3">
                          <span className="text-[10px] font-mono text-[#FF1E27] font-bold uppercase block">
                            PROVEN IMPACT
                          </span>
                          <span className="text-xs sm:text-sm text-white font-semibold block mt-0.5">
                            {pat.impact}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* VIEW D: Architecture Trade-off Matrix */}
                {architectureSubTab === 'tradeoffs' && tradeoffs.length > 0 && (
                  <div className="border border-white/15 bg-black/40 overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs font-mono min-w-[700px]">
                      <thead>
                        <tr className="border-b border-white/15 bg-white/5 text-slate-300">
                          <th className="p-4 uppercase">Decision Domain</th>
                          <th className="p-4 uppercase text-[#FF1E27]">Selected Approach</th>
                          <th className="p-4 uppercase text-slate-400">Alternative Evaluated</th>
                          <th className="p-4 uppercase">Trade-off Rationale</th>
                          <th className="p-4 uppercase text-emerald-400">Verdict</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/10">
                        {tradeoffs.map((item, idx) => (
                          <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                            <td className="p-4 font-bold text-white whitespace-nowrap">{item.area}</td>
                            <td className="p-4 text-[#FF1E27] font-bold">{item.chosen}</td>
                            <td className="p-4 text-slate-400">{item.alternative}</td>
                            <td className="p-4 font-sans text-slate-300 min-w-[240px] leading-relaxed">{item.tradeoff}</td>
                            <td className="p-4 text-emerald-400 font-sans font-semibold min-w-[180px] leading-relaxed">{item.verdict}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>
            )}

            {/* ─────────────────────────────────────────────────────────────
                07 — TECHNOLOGY
            ───────────────────────────────────────────────────────────── */}
            {hasTechnology && (
              <section id="sec-technology" className="space-y-6 pt-4">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs sm:text-sm font-bold text-[#FF1E27] tracking-widest">
                    07 — TECHNOLOGY
                  </span>
                  <span className="h-px flex-1 bg-white/10" />
                </div>

                <div className="space-y-4 max-w-5xl">
                  <h2 className="font-syne text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase text-white tracking-tight">
                    VERIFIED TECHNICAL STACK
                  </h2>
                  <p className="font-sans text-slate-300 text-sm sm:text-base leading-relaxed">
                    Production dependencies, frameworks, languages, and protocol libraries implemented in this system.
                  </p>
                </div>

                {techCategories.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {techCategories.map((group, idx) => (
                      <div key={idx} className="bg-white/[0.02] border border-white/15 p-6 space-y-4">
                        <div className="flex items-center gap-2 text-xs font-mono text-[#FF1E27] font-bold uppercase tracking-widest">
                          <Cpu size={14} />
                          <span>{group.category}</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {group.stack.map((item) => (
                            <span
                              key={item}
                              className="bg-white/5 border border-white/10 text-white font-mono text-xs px-3 py-1.5 flex items-center gap-1.5"
                            >
                              <span className="w-1.5 h-1.5 bg-[#FF1E27]" />
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2.5 max-w-4xl">
                    {rawTech.map((tech) => (
                      <span
                        key={tech}
                        className="bg-white/[0.04] border border-white/15 text-white font-mono text-sm px-4 py-2 flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 bg-[#FF1E27]" />
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </section>
            )}

            {/* ─────────────────────────────────────────────────────────────
                08 — RESULT
            ───────────────────────────────────────────────────────────── */}
            {hasResult && (
              <section id="sec-result" className="space-y-8 pt-4">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs sm:text-sm font-bold text-[#FF1E27] tracking-widest">
                    08 — RESULT
                  </span>
                  <span className="h-px flex-1 bg-white/10" />
                </div>

                <div className="space-y-4 max-w-5xl">
                  <h2 className="font-syne text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase text-white tracking-tight">
                    VERIFIED ENGINEERING OUTCOMES
                  </h2>

                  {resultText && (
                    <div className="bg-[#FF1E27]/10 border border-[#FF1E27]/30 p-6 sm:p-8 space-y-2">
                      <div className="flex items-center gap-2 text-xs font-mono text-[#FF1E27] tracking-widest uppercase font-bold">
                        <CheckCircle2 size={16} />
                        <span>OUTCOME SUMMARY //</span>
                      </div>
                      <p className="font-sans text-white text-base sm:text-lg md:text-xl font-semibold leading-relaxed">
                        {resultText}
                      </p>
                    </div>
                  )}
                </div>

                {/* Telemetry Metrics Grid if exists */}
                {metrics.length > 0 && (
                  <div className="space-y-3">
                    <div className="text-xs font-mono text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <Gauge size={14} className="text-[#FF1E27]" />
                      <span>BENCHMARKS & MEASURED TELEMETRY</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {metrics.map((m, idx) => {
                        const { stat, unit } = formatMetric(m.value);
                        return (
                          <div
                            key={idx}
                            className="bg-white/[0.02] border border-white/15 hover:border-[#FF1E27] transition-all p-5 space-y-3 min-w-0 overflow-hidden flex flex-col justify-between"
                          >
                            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block truncate" title={m.label}>
                              {m.label}
                            </span>

                            <div className="space-y-1">
                              <span className="font-syne text-2xl sm:text-3xl font-black text-white block tracking-tight leading-none truncate">
                                {stat}
                              </span>
                              {unit && (
                                <span className="font-mono text-xs font-bold text-[#FF1E27] uppercase tracking-wider block truncate">
                                  {unit}
                                </span>
                              )}
                            </div>

                            <span className="text-xs font-sans text-slate-400 block leading-relaxed pt-2 border-t border-white/5">
                              {m.desc}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </section>
            )}

            {/* ─────────────────────────────────────────────────────────────
                09 — LIVE PROJECT / GITHUB
            ───────────────────────────────────────────────────────────── */}
            {hasLiveLinks && (
              <section id="sec-live" className="space-y-6 pt-4">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs sm:text-sm font-bold text-[#FF1E27] tracking-widest">
                    09 — LIVE PROJECT / GITHUB
                  </span>
                  <span className="h-px flex-1 bg-white/10" />
                </div>

                <div className="space-y-4 max-w-5xl">
                  <h2 className="font-syne text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase text-white tracking-tight">
                    DEPLOYED ARTIFACTS & SOURCE CODE
                  </h2>
                  <p className="font-sans text-slate-300 text-sm sm:text-base leading-relaxed">
                    External verification endpoints for this build. Clicking will open the repository or deployment in a new browser window without disturbing your portfolio session.
                  </p>
                </div>

                {/* Dual CTA Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-2">
                  {liveUrl && (
                    <a
                      href={liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group bg-[#FF1E27] hover:bg-[#E00208] text-white p-6 sm:p-8 flex flex-col justify-between space-y-6 transition-all duration-300 shadow-xl shadow-[#FF1E27]/15 focus:outline-none focus-visible:ring-4 focus-visible:ring-white"
                    >
                      <div className="flex items-start justify-between">
                        <span className="text-xs font-mono font-bold tracking-widest uppercase bg-black/30 px-3 py-1">
                          PRODUCTION DEPLOYMENT
                        </span>
                        <ExternalLink size={22} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </div>

                      <div className="space-y-1">
                        <h3 className="font-syne text-2xl sm:text-3xl font-black uppercase tracking-tight">
                          LAUNCH LIVE PROJECT
                        </h3>
                        <p className="text-xs font-mono text-white/80 truncate">
                          {liveUrl}
                        </p>
                      </div>
                    </a>
                  )}

                  {githubUrl && (
                    <a
                      href={githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group bg-white/[0.04] hover:bg-white/[0.08] border border-white/20 hover:border-white/50 text-white p-6 sm:p-8 flex flex-col justify-between space-y-6 transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#FF1E27]"
                    >
                      <div className="flex items-start justify-between">
                        <span className="text-xs font-mono font-bold tracking-widest uppercase bg-white/10 px-3 py-1 text-slate-300">
                          PUBLIC REPOSITORY
                        </span>
                        <Github size={22} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </div>

                      <div className="space-y-1">
                        <h3 className="font-syne text-2xl sm:text-3xl font-black uppercase tracking-tight">
                          VIEW GITHUB REPOSITORY
                        </h3>
                        <p className="text-xs font-mono text-slate-400 truncate">
                          {githubUrl}
                        </p>
                      </div>
                    </a>
                  )}
                </div>
              </section>
            )}

            {/* ─────────────────────────────────────────────────────────────
                PREV / NEXT PROJECT SWITCHER & RETURN FOOTER
            ───────────────────────────────────────────────────────────── */}
            <footer className="pt-12 sm:pt-16 border-t border-white/15 space-y-8">
              {allProjects.length > 1 && onSelectProject && (
                <div className="space-y-4">
                  <div className="text-xs font-mono text-slate-500 uppercase tracking-widest text-center">
                    EXPLORE OTHER REUBEN BINU GEORGE BUILDS
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {prevProject && (
                      <button
                        onClick={() => onSelectProject(prevProject)}
                        className="group text-left p-5 bg-white/[0.02] hover:bg-white/[0.06] border border-white/10 hover:border-[#FF1E27] transition-all cursor-pointer space-y-1"
                      >
                        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 group-hover:text-[#FF1E27]">
                          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                          <span>PREVIOUS BUILD // {prevProject.number || "01"}</span>
                        </div>
                        <div className="font-syne text-lg font-bold text-white uppercase group-hover:text-[#FF1E27] transition-colors truncate">
                          {prevProject.title}
                        </div>
                      </button>
                    )}

                    {nextProject && (
                      <button
                        onClick={() => onSelectProject(nextProject)}
                        className="group text-right p-5 bg-white/[0.02] hover:bg-white/[0.06] border border-white/10 hover:border-[#FF1E27] transition-all cursor-pointer space-y-1"
                      >
                        <div className="flex items-center justify-end gap-2 text-xs font-mono text-slate-400 group-hover:text-[#FF1E27]">
                          <span>NEXT BUILD // {nextProject.number || "03"}</span>
                          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                        <div className="font-syne text-lg font-bold text-white uppercase group-hover:text-[#FF1E27] transition-colors truncate">
                          {nextProject.title}
                        </div>
                      </button>
                    )}
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/5 text-xs font-mono text-slate-400">
                <span>PRESS ESC KEY OR CLICK OUTSIDE TO RETURN</span>

                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-white/5 hover:bg-white/15 border border-white/20 text-white font-mono font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
                >
                  [ RETURN TO PORTFOLIO ]
                </button>
              </div>
            </footer>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
