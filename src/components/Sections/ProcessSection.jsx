import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Target, Layout, Code2, Rocket, ShieldCheck, RefreshCw } from 'lucide-react';

const STAGES = [
  {
    id: "01",
    name: "DISCOVER",
    icon: Search,
    headline: "Understand the actual problem before deciding what to build.",
    detail: "Research the user, understand the context, identify the real problem, and uncover the constraints before moving into solutions.",
    focus: "User needs • Research • Constraints",
    activities: [
      "User research & interviews",
      "Problem space analysis",
      "Requirement gathering",
      "Technical constraint discovery",
      "Competitive benchmarking"
    ],
    deliverable: "Clear problem definition"
  },
  {
    id: "02",
    name: "DEFINE",
    icon: Target,
    headline: "Turn research into a clear product and technical direction.",
    detail: "Translate research findings into clear requirements, goals, priorities, and a defined scope for the project.",
    focus: "Requirements • Scope • Objectives",
    activities: [
      "Product requirement docs",
      "Scope definition & boundaries",
      "Feature prioritization",
      "System architecture map",
      "Project milestones roadmap"
    ],
    deliverable: "Defined project scope"
  },
  {
    id: "03",
    name: "DESIGN",
    icon: Layout,
    headline: "Create the structure, experience, and visual direction.",
    detail: "Develop the information architecture, interaction patterns, visual system, and overall experience before implementation.",
    focus: "UX • UI • Interaction • Visual system",
    activities: [
      "Information architecture",
      "Wireframing & user flows",
      "Interactive design systems",
      "Visual art direction",
      "Prototype validation"
    ],
    deliverable: "Validated design direction"
  },
  {
    id: "04",
    name: "BUILD",
    icon: Code2,
    headline: "Turn the approved direction into a functional product.",
    detail: "Implement the interface, features, interactions, systems, and technical architecture while maintaining design quality.",
    focus: "Development • Integration • Engineering",
    activities: [
      "Modern component development",
      "REST / GraphQL API integration",
      "State management & store",
      "Authentication & DB setup",
      "Pixel-perfect motion fidelity"
    ],
    deliverable: "Working application"
  },
  {
    id: "05",
    name: "DEPLOY",
    icon: Rocket,
    headline: "Prepare the finished product for real-world use.",
    detail: "Test production builds, configure deployment, optimize performance, and make the project ready for release.",
    focus: "Release • Performance • Production",
    activities: [
      "CI/CD automated pipeline",
      "Edge CDN hosting & domains",
      "Build asset minification",
      "SEO & metadata config",
      "Uptime & error monitoring"
    ],
    deliverable: "Production-ready application"
  },
  {
    id: "06",
    name: "TEST",
    icon: ShieldCheck,
    headline: "Validate the experience and identify what needs improvement.",
    detail: "Evaluate functionality, usability, performance, and edge cases to find problems before they reach the final user.",
    focus: "QA • Usability • Performance",
    activities: [
      "Cross-browser & responsive QA",
      "Lighthouse & Core Web Vitals",
      "Accessibility (WCAG) checks",
      "Edge case stress testing",
      "Usability feedback loops"
    ],
    deliverable: "Stable product"
  },
  {
    id: "07",
    name: "ITERATE",
    icon: RefreshCw,
    headline: "Use feedback and results to continuously improve.",
    detail: "Analyze feedback, identify opportunities, refine the product, and repeat the process until the experience becomes stronger.",
    focus: "Feedback • Refinement • Optimization",
    activities: [
      "User analytics review",
      "Conversion & flow tuning",
      "Performance optimizations",
      "Feature enhancements",
      "Continuous delivery updates"
    ],
    deliverable: "Continuously improving product"
  }
];

export default function ProcessSection() {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const sectionRef = useRef(null);
  const progressBarRef = useRef(null);
  const debugPercentRef = useRef(null);
  const footerPercentRef = useRef(null);

  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const activeStageIndexRef = useRef(0);
  const inViewRef = useRef(true);

  useEffect(() => {
    let rafId = null;

    // IntersectionObserver to keep RAF loop active when near section
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          inViewRef.current = entry.isIntersecting;
        });
      },
      { rootMargin: '300px 0px 300px 0px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    const calculateTarget = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const vh = window.innerHeight;

      // Calculate progress while section travels through viewport
      const totalTravel = vh + rect.height;
      const currentTravel = vh - rect.top;
      const progress = Math.max(0, Math.min(1, currentTravel / totalTravel));
      targetProgressRef.current = progress;
    };

    // Smooth inertia loop (k = 0.10)
    const loop = () => {
      if (inViewRef.current) {
        const diff = targetProgressRef.current - currentProgressRef.current;
        if (Math.abs(diff) > 0.0001) {
          currentProgressRef.current += diff * 0.10;
          const p = Math.max(0, Math.min(1, currentProgressRef.current));

          // Direct GPU-accelerated transform update on progress bar
          if (progressBarRef.current) {
            progressBarRef.current.style.transform = `scaleX(${Math.max(0.04, p)})`;
          }

          // Direct DOM text updates for instant 60-120fps counter
          const pct = `${Math.round(p * 100)}%`;
          if (debugPercentRef.current) {
            debugPercentRef.current.textContent = pct;
          }
          if (footerPercentRef.current) {
            footerPercentRef.current.textContent = pct;
          }

          // Stage index calculated from smoothly interpolated progress
          const stageIdx = Math.min(
            STAGES.length - 1,
            Math.max(0, Math.floor(p * STAGES.length))
          );

          if (stageIdx !== activeStageIndexRef.current) {
            activeStageIndexRef.current = stageIdx;
            setActiveStageIndex(stageIdx);
          }
        }
      }
      rafId = requestAnimationFrame(loop);
    };

    const onScroll = () => {
      calculateTarget();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    calculateTarget();
    rafId = requestAnimationFrame(loop);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const handleStageClick = (idx) => {
    setActiveStageIndex(idx);
    activeStageIndexRef.current = idx;
    const target = (idx + 0.5) / STAGES.length;
    targetProgressRef.current = target;
    currentProgressRef.current = target;

    if (progressBarRef.current) {
      progressBarRef.current.style.transform = `scaleX(${Math.max(0.04, target)})`;
    }
    const pct = `${Math.round(target * 100)}%`;
    if (debugPercentRef.current) debugPercentRef.current.textContent = pct;
    if (footerPercentRef.current) footerPercentRef.current.textContent = pct;
  };

  const activeStage = STAGES[activeStageIndex];
  const IconComponent = activeStage.icon;

  return (
    <section
      id="process"
      ref={sectionRef}
      className="py-20 sm:py-24 px-4 sm:px-6 md:px-12 bg-[#0A0A0A] text-[#F1F0EB] font-mono border-t border-white/10 w-full relative"
    >
      <div className="max-w-7xl mx-auto space-y-8 relative z-10 w-full">

        {/* Top Header Bar with Live Animation Debug Badge */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 w-full">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#8B6DFF] animate-pulse" />
            <span className="text-xs font-mono text-[#8B6DFF] tracking-widest uppercase font-bold">
              03 // PROCESS
            </span>
            <span className="text-white/30 hidden sm:inline-block">/</span>
            <span className="text-white/70 text-xs tracking-wider uppercase hidden sm:inline-block">
              ENGINEERING & DESIGN LIFECYCLE
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            {/* Real-time Smooth Progress Badge */}
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#8B6DFF]/15 border border-[#8B6DFF]/30 text-[#8B6DFF] text-[10px] font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8B6DFF] animate-ping" />
              PROCESS ANIMATION: NEW // PROGRESS: <span ref={debugPercentRef} className="font-bold text-white">0%</span>
            </span>

            <span className="text-[#8B6DFF] font-bold tracking-widest font-mono">
              STAGE {activeStage.id} / 07
            </span>
          </div>
        </div>

        {/* Mobile Stage Stepper Pills */}
        <div className="flex lg:hidden items-center gap-1.5 py-1 overflow-x-auto w-full">
          {STAGES.map((s, idx) => {
            const isActive = idx === activeStageIndex;
            const isCompleted = idx < activeStageIndex;
            return (
              <button
                key={s.id}
                onClick={() => handleStageClick(idx)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#8B6DFF] text-white font-bold shadow-md scale-105 opacity-100'
                    : isCompleted
                    ? 'bg-[#181818] text-[#8B6DFF] border border-[#8B6DFF]/30 opacity-70 scale-95'
                    : 'bg-[#111111] text-white/50 border border-white/10 opacity-40 scale-95 hover:opacity-80'
                }`}
              >
                <span>{s.id}</span>
                <span>{s.name}</span>
              </button>
            );
          })}
        </div>

        {/* Main 3-Column Interactive Process Viewport */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch w-full">

          {/* LEFT: Process Inspector */}
          <div className="hidden lg:flex lg:col-span-4 flex-col justify-between bg-[#111111] border border-white/15 p-6 shadow-2xl h-[440px]">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-[10px] text-[#8B6DFF] font-bold tracking-widest uppercase">
                  PROCESS INSPECTOR
                </span>
                <span className="text-[10px] text-[#555555] font-mono">
                  [ {activeStage.id} / 07 ]
                </span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStage.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-3"
                >
                  <div className="space-y-1">
                    <div className="text-[9px] text-[#555555] uppercase tracking-widest font-bold">PURPOSE</div>
                    <p className="text-xs text-[#E0E0E0] font-sans leading-relaxed">
                      {activeStage.headline}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <div className="text-[9px] text-[#555555] uppercase tracking-widest font-bold">FOCUS</div>
                    <div className="text-xs text-[#8B6DFF] font-mono font-medium">
                      {activeStage.focus}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="text-[9px] text-[#555555] uppercase tracking-widest font-bold">CORE ACTIVITIES</div>
                    <ul className="space-y-1 text-[11px] text-[#A0A0A0] font-mono">
                      {activeStage.activities.map((act, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="w-1 h-1 bg-[#8B6DFF] rounded-full shrink-0" />
                          <span className="truncate">{act}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="pt-3 border-t border-white/10">
              <div className="text-[9px] text-[#555555] uppercase tracking-widest font-bold mb-1">KEY DELIVERABLE</div>
              <div className="text-xs text-white font-mono font-bold bg-[#0A0A0A] p-2 border border-white/10 truncate transition-colors duration-300">
                {activeStage.deliverable}
              </div>
            </div>
          </div>

          {/* CENTER: Active Stage Card with Fluid Framer-Motion Transitions */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-[#141414] border-2 border-[#8B6DFF] p-6 sm:p-8 shadow-[0_0_35px_rgba(139,109,255,0.15)] relative h-[380px] sm:h-[420px] lg:h-[440px]">
            
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-[10px] text-[#8B6DFF] font-mono font-bold tracking-widest uppercase">
                  ACTIVE STAGE // {activeStage.id}
                </span>
                <IconComponent size={20} className="text-[#8B6DFF] transition-transform duration-300" />
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStage.id}
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.98 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-2.5"
                >
                  <h3 className="font-syne text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight uppercase leading-none">
                    {activeStage.name}
                  </h3>
                  
                  <p className="font-sans text-xs sm:text-sm md:text-base text-white font-medium leading-snug">
                    {activeStage.headline}
                  </p>

                  <p className="font-sans text-[11px] sm:text-xs md:text-sm text-[#A0A0A0] leading-relaxed">
                    {activeStage.detail}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="space-y-3 pt-3 border-t border-white/10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                <div className="space-y-0.5">
                  <span className="text-[9px] text-[#555555] uppercase tracking-wider font-bold block">
                    FOCUS
                  </span>
                  <span className="text-[#8B6DFF] text-[10px] sm:text-[11px] block font-medium">
                    {activeStage.focus}
                  </span>
                </div>

                <div className="space-y-0.5">
                  <span className="text-[9px] text-[#555555] uppercase tracking-wider font-bold block">
                    KEY DELIVERABLE
                  </span>
                  <span className="text-white text-[10px] sm:text-[11px] font-bold block">
                    {activeStage.deliverable}
                  </span>
                </div>
              </div>

              {/* Continuous GPU-interpolated Liquid Progress Bar */}
              <div className="w-full bg-[#222222] h-[2px] overflow-hidden mt-1">
                <div
                  ref={progressBarRef}
                  className="bg-[#8B6DFF] h-full origin-left will-change-transform"
                  style={{
                    transform: 'scaleX(0.04)',
                    transition: 'transform 0.04s linear'
                  }}
                />
              </div>
            </div>

          </div>

          {/* RIGHT: Compact Vertical Stage Navigator */}
          <div className="hidden lg:flex lg:col-span-3 flex-col justify-center space-y-1.5 pl-4 border-l border-white/10 h-[440px]">
            <div className="text-[10px] text-[#555555] font-mono uppercase tracking-widest mb-2 font-bold">
              STAGE NAVIGATOR
            </div>
            {STAGES.map((s, idx) => {
              const isActive = idx === activeStageIndex;
              return (
                <button
                  key={s.id}
                  onClick={() => handleStageClick(idx)}
                  className={`flex items-center gap-3 text-left transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] py-2 px-3 border-l-2 cursor-pointer ${
                    isActive
                      ? 'border-[#8B6DFF] bg-[#8B6DFF]/20 text-white font-bold translate-x-2 opacity-100 scale-100 shadow-md'
                      : 'border-transparent text-white/50 opacity-40 scale-95 hover:opacity-80 hover:text-white hover:border-white/20'
                  }`}
                >
                  <span className={`text-[10px] font-mono transition-colors duration-500 ${isActive ? 'text-[#8B6DFF] font-bold' : 'text-white/40'}`}>
                    {s.id}
                  </span>
                  <span className="text-xs uppercase tracking-wider font-mono">
                    {s.name}
                  </span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Bottom Footer Info Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-white/10 pt-4 text-[10px] sm:text-xs text-[#555555]">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8B6DFF]" />
            <span className="tracking-widest uppercase">
              SCROLL PROGRESSION // <span ref={footerPercentRef} className="text-[#8B6DFF] font-bold">0%</span> COMPLETED
            </span>
          </div>

          <div className="text-right text-[#888888] tracking-wider uppercase font-mono">
            {activeStageIndex === STAGES.length - 1 ? 'READY TO PROCEED →' : 'SCROLL OR CLICK TO ADVANCE STAGE'}
          </div>
        </div>

      </div>
    </section>
  );
}
