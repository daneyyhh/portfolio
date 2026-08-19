import React, { useState, useEffect, useRef } from 'react';
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
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef(null);
  const activeStageIndexRef = useRef(0);

  useEffect(() => {
    let rafId = null;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      if (totalScrollable <= 0) return;

      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / totalScrollable));
      setScrollProgress(progress);

      const rawStage = progress * (STAGES.length - 1);
      const activeIdx = Math.min(STAGES.length - 1, Math.max(0, Math.round(rawStage)));

      if (activeIdx !== activeStageIndexRef.current) {
        activeStageIndexRef.current = activeIdx;
        setActiveStageIndex(activeIdx);
      }
    };

    const onScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        handleScroll();
        rafId = null;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const handleStageClick = (idx) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const containerTop = rect.top + scrollTop;
    const totalScrollable = rect.height - window.innerHeight;
    const targetScroll = containerTop + (idx / (STAGES.length - 1)) * totalScrollable;

    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    });
  };

  const activeStage = STAGES[activeStageIndex];
  const IconComponent = activeStage.icon;
  const progressPercent = Math.round(scrollProgress * 100);

  return (
    <section
      id="process"
      ref={containerRef}
      className="relative bg-[#0A0A0A] text-[#F1F0EB] font-mono border-t border-white/10 w-full"
      style={{ height: '320vh' }}
    >
      {/* Sticky Compact 100vh Viewport */}
      <div
        className="sticky top-0 h-screen w-full flex flex-col justify-between p-4 sm:p-6 md:p-10 max-w-7xl mx-auto overflow-hidden select-none z-20"
        style={{ position: 'sticky', top: 0, height: '100vh' }}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3 pt-2 w-full">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-[#8B6DFF] animate-pulse" />
            <span className="text-xs font-mono text-[#8B6DFF] tracking-widest uppercase font-bold">
              03 // PROCESS
            </span>
            <span className="text-white/30 hidden sm:inline-block">/</span>
            <span className="text-white/70 text-xs tracking-wider uppercase hidden sm:inline-block">
              ENGINEERING & DESIGN LIFECYCLE
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="text-[#8B6DFF] font-bold tracking-widest font-mono">
              STAGE {activeStage.id} / 07
            </span>
          </div>
        </div>

        {/* Mobile Horizontal Stepper Indicator */}
        <div className="flex lg:hidden items-center justify-between gap-1.5 py-2 border-b border-white/10 overflow-x-auto w-full">
          {STAGES.map((s, idx) => {
            const isActive = idx === activeStageIndex;
            const isCompleted = idx < activeStageIndex;
            return (
              <button
                key={s.id}
                onClick={() => handleStageClick(idx)}
                className={`flex items-center gap-1 px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#8B6DFF] text-white font-bold'
                    : isCompleted
                    ? 'bg-[#181818] text-[#8B6DFF] border border-[#8B6DFF]/30'
                    : 'bg-[#111111] text-[#666666] border border-white/10'
                }`}
              >
                <span>{s.id}</span>
                <span className="hidden min-[400px]:inline">{s.name}</span>
              </button>
            );
          })}
        </div>

        {/* Main 3-Column Interactive Process Viewport */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-center my-auto w-full py-2">
          
          {/* 1. LEFT: Process Inspector */}
          <div className="hidden lg:flex lg:col-span-4 flex-col justify-between bg-[#111111] border border-white/15 p-5 xl:p-6 shadow-2xl h-[460px] w-full">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-[10px] text-[#8B6DFF] font-bold tracking-widest uppercase">
                  PROCESS INSPECTOR
                </span>
                <span className="text-[10px] text-[#555555] font-mono">
                  [ {activeStage.id} / 07 ]
                </span>
              </div>

              {/* Dynamic Content with Smooth Subtle Fade/Translate Transition */}
              <div key={activeStage.id} className="space-y-3 animate-fadeIn">
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
              </div>
            </div>

            <div className="pt-3 border-t border-white/10">
              <div className="text-[9px] text-[#555555] uppercase tracking-widest font-bold mb-1">KEY DELIVERABLE</div>
              <div className="text-xs text-white font-mono font-bold bg-[#0A0A0A] p-2 border border-white/10 truncate">
                {activeStage.deliverable}
              </div>
            </div>
          </div>

          {/* 2. CENTER: Active Stage Card */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-[#141414] border-2 border-[#8B6DFF] p-5 sm:p-8 shadow-[0_0_35px_rgba(139,109,255,0.15)] relative overflow-hidden transition-all duration-300 min-h-[360px] lg:h-[460px] w-full">
            
            {/* Top Label & Icon */}
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-2.5 sm:pb-3">
                <span className="text-[10px] text-[#8B6DFF] font-mono font-bold tracking-widest uppercase">
                  ACTIVE STAGE // {activeStage.id}
                </span>
                <IconComponent size={20} className="text-[#8B6DFF]" />
              </div>

              {/* Title & Concise Topic Details */}
              <div key={activeStage.id} className="space-y-2.5 sm:space-y-3 animate-fadeIn">
                <h3 className="font-syne text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight uppercase leading-none">
                  {activeStage.name}
                </h3>
                
                <p className="font-sans text-xs sm:text-base text-white font-medium leading-snug">
                  {activeStage.headline}
                </p>

                <p className="font-sans text-[11px] sm:text-sm text-[#A0A0A0] leading-relaxed">
                  {activeStage.detail}
                </p>
              </div>
            </div>

            {/* Bottom Focus & Deliverable Blocks */}
            <div className="space-y-3 pt-3 sm:pt-4 border-t border-white/10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-xs font-mono">
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

              {/* Continuous Scroll-Progress Indicator */}
              <div className="w-full bg-[#222222] h-[2px] overflow-hidden mt-2">
                <div
                  className="bg-[#8B6DFF] h-full transition-all duration-75 ease-out"
                  style={{ width: `${Math.max(4, scrollProgress * 100)}%` }}
                />
              </div>
            </div>

          </div>

          {/* 3. RIGHT: Compact Vertical Stage Navigator */}
          <div className="hidden lg:flex lg:col-span-3 flex-col justify-center space-y-1.5 pl-4 border-l border-white/10 h-[460px] w-full">
            <div className="text-[10px] text-[#555555] font-mono uppercase tracking-widest mb-2 font-bold">
              STAGE NAVIGATOR
            </div>
            {STAGES.map((s, idx) => {
              const isActive = idx === activeStageIndex;
              return (
                <button
                  key={s.id}
                  onClick={() => handleStageClick(idx)}
                  className={`flex items-center gap-3 text-left transition-all duration-200 py-1.5 px-3 border-l-2 cursor-pointer ${
                    isActive
                      ? 'border-[#8B6DFF] bg-[#8B6DFF]/15 text-white font-bold'
                      : 'border-transparent text-[#666666] hover:text-[#B0B0B0] hover:border-white/20'
                  }`}
                >
                  <span className={`text-[10px] font-mono ${isActive ? 'text-[#8B6DFF]' : 'text-[#444444]'}`}>
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
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-white/10 pt-3 text-[10px] sm:text-xs text-[#555555] w-full">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8B6DFF]" />
            <span className="tracking-widest uppercase">
              SCROLL PROGRESSION // {progressPercent}% COMPLETED
            </span>
          </div>

          <div className="text-right text-[#888888] tracking-wider uppercase font-mono">
            {activeStageIndex === STAGES.length - 1 ? 'READY TO PROCEED →' : 'SCROLL TO ADVANCE STAGE ↓'}
          </div>
        </div>

      </div>
    </section>
  );
}
