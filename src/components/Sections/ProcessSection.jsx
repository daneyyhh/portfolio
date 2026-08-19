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
  const sectionRef = useRef(null);

  // Cache bounds — recalculate on resize, read on every scroll tick (fast)
  const boundsRef = useRef({ top: 0, track: 0 });

  const recalcBounds = () => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const absoluteTop = rect.top + window.pageYOffset;
    const sectionHeight = sectionRef.current.offsetHeight;
    const vh = window.innerHeight;
    boundsRef.current = {
      top: absoluteTop,
      track: sectionHeight - vh, // pixels of scroll available while sticky is active
    };
  };

  useEffect(() => {
    let rafId = null;

    const handleScroll = () => {
      const { top, track } = boundsRef.current;
      if (track <= 0) return;

      const scrollY = window.pageYOffset;
      const progress = Math.max(0, Math.min(1, (scrollY - top) / track));

      setScrollProgress(progress);

      // Each of 7 stages owns an equal 1/7 slice of [0, 1)
      // Clamp so last stage (idx=6) is reached at progress=1
      const idx = Math.min(STAGES.length - 1, Math.floor(progress * STAGES.length));
      setActiveStageIndex(idx);
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => { handleScroll(); rafId = null; });
    };

    // Recalc bounds on mount + every resize
    recalcBounds();
    handleScroll(); // set initial state immediately

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', () => { recalcBounds(); handleScroll(); }, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', recalcBounds);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const handleStageClick = (idx) => {
    const { top, track } = boundsRef.current;
    // Place scroll so the center of that stage's range is active
    const targetScroll = top + ((idx + 0.5) / STAGES.length) * track;
    window.scrollTo({ top: Math.max(top, targetScroll), behavior: 'smooth' });
  };

  const activeStage = STAGES[activeStageIndex];
  const IconComponent = activeStage.icon;
  const progressPercent = Math.round(scrollProgress * 100);

  return (
    /*
     * ARCHITECTURE:
     *
     * <section>          ← sectionRef, height:200vh, background
     *   <div>            ← position:sticky, top:0, height:100vh, width:100%
     *     <div>          ← max-w-7xl mx-auto, flex layout (centered content)
     *       ...UI...
     *     </div>
     *   </div>
     * </section>
     *
     * Section height 200vh → sticky viewport pins for 100vh of scroll.
     * 100vh ÷ 7 stages ≈ 14.3vh per stage (~130px at 900px screen height).
     * After 100% progress, sticky releases. Selected Work begins immediately.
     */
    <section
      id="process"
      ref={sectionRef}
      className="relative bg-[#0A0A0A] text-[#F1F0EB] font-mono border-t border-white/10 w-full"
      style={{ height: '200vh' }}
    >
      {/* STICKY WRAPPER: must be w-full with no centering constraints here */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100%',
          zIndex: 10,
          background: '#0A0A0A',
        }}
      >
        {/* CENTERED LAYOUT: max-width centering lives inside the sticky wrapper */}
        <div
          className="h-full w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col justify-between select-none overflow-hidden"
        >

          {/* ── Header ── */}
          <div className="flex items-center justify-between border-b border-white/10 pb-2 sm:pb-3 pt-3 sm:pt-4 shrink-0">
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
            <span className="text-[#8B6DFF] font-bold tracking-widest font-mono text-xs">
              STAGE {activeStage.id} / 07
            </span>
          </div>

          {/* ── Mobile stage stepper ── */}
          <div className="flex lg:hidden items-center gap-1 py-1.5 border-b border-white/10 overflow-x-auto w-full shrink-0">
            {STAGES.map((s, idx) => {
              const isActive = idx === activeStageIndex;
              const isDone = idx < activeStageIndex;
              return (
                <button
                  key={s.id}
                  onClick={() => handleStageClick(idx)}
                  className={`flex items-center gap-1 px-2 py-1 text-[9px] sm:text-[10px] font-mono uppercase tracking-wider shrink-0 cursor-pointer transition-colors duration-200 ${
                    isActive
                      ? 'bg-[#8B6DFF] text-white font-bold'
                      : isDone
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

          {/* ── 3-column layout ── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-stretch flex-1 min-h-0 py-3 sm:py-4">

            {/* LEFT: Inspector */}
            <div className="hidden lg:flex lg:col-span-4 flex-col justify-between bg-[#111111] border border-white/10 p-5 xl:p-6 min-h-0 overflow-hidden">
              <div className="space-y-3 min-h-0 overflow-hidden">
                <div className="flex items-center justify-between border-b border-white/10 pb-2 shrink-0">
                  <span className="text-[10px] text-[#8B6DFF] font-bold tracking-widest uppercase">
                    PROCESS INSPECTOR
                  </span>
                  <span className="text-[10px] text-white/30 font-mono">[ {activeStage.id} / 07 ]</span>
                </div>

                <div key={activeStage.id} className="space-y-3">
                  <div>
                    <div className="text-[9px] text-[#555] uppercase tracking-widest font-bold mb-1">PURPOSE</div>
                    <p className="text-xs text-[#E0E0E0] font-sans leading-relaxed">{activeStage.headline}</p>
                  </div>
                  <div>
                    <div className="text-[9px] text-[#555] uppercase tracking-widest font-bold mb-1">FOCUS</div>
                    <p className="text-xs text-[#8B6DFF] font-mono">{activeStage.focus}</p>
                  </div>
                  <div>
                    <div className="text-[9px] text-[#555] uppercase tracking-widest font-bold mb-1">CORE ACTIVITIES</div>
                    <ul className="space-y-1">
                      {activeStage.activities.map((act, i) => (
                        <li key={i} className="flex items-start gap-2 text-[11px] text-[#A0A0A0] font-mono">
                          <span className="w-1 h-1 rounded-full bg-[#8B6DFF] mt-1.5 shrink-0" />
                          <span>{act}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10 pt-3 shrink-0">
                <div className="text-[9px] text-[#555] uppercase tracking-widest font-bold mb-1">KEY DELIVERABLE</div>
                <div className="text-xs text-white font-mono font-bold bg-[#0A0A0A] border border-white/10 p-2 truncate">
                  {activeStage.deliverable}
                </div>
              </div>
            </div>

            {/* CENTER: Stage card */}
            <div className="lg:col-span-5 flex flex-col justify-between bg-[#141414] border-2 border-[#8B6DFF] p-4 sm:p-6 md:p-8 shadow-[0_0_40px_rgba(139,109,255,0.12)] min-h-0 overflow-hidden">
              <div className="min-h-0 overflow-hidden">
                <div className="flex items-center justify-between border-b border-white/10 pb-2 sm:pb-3 mb-3 shrink-0">
                  <span className="text-[10px] text-[#8B6DFF] font-mono font-bold tracking-widest uppercase">
                    ACTIVE STAGE // {activeStage.id}
                  </span>
                  <IconComponent size={18} className="text-[#8B6DFF] shrink-0" />
                </div>

                <div key={activeStage.id} className="space-y-2 sm:space-y-3">
                  <h3 className="font-syne text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight uppercase leading-none">
                    {activeStage.name}
                  </h3>
                  <p className="font-sans text-sm sm:text-base text-white font-medium leading-snug">
                    {activeStage.headline}
                  </p>
                  <p className="font-sans text-xs sm:text-sm text-[#A0A0A0] leading-relaxed">
                    {activeStage.detail}
                  </p>
                </div>
              </div>

              <div className="border-t border-white/10 pt-3 sm:pt-4 space-y-2 shrink-0">
                <div className="grid grid-cols-2 gap-3 text-[10px] sm:text-xs font-mono">
                  <div>
                    <span className="text-[#555] uppercase tracking-wider font-bold block mb-0.5">FOCUS</span>
                    <span className="text-[#8B6DFF] font-medium">{activeStage.focus}</span>
                  </div>
                  <div>
                    <span className="text-[#555] uppercase tracking-wider font-bold block mb-0.5">DELIVERABLE</span>
                    <span className="text-white font-bold">{activeStage.deliverable}</span>
                  </div>
                </div>
                {/* Progress bar */}
                <div className="w-full h-[2px] bg-[#222]">
                  <div
                    className="h-full bg-[#8B6DFF]"
                    style={{ width: `${Math.max(2, progressPercent)}%`, transition: 'width 0.15s ease-out' }}
                  />
                </div>
              </div>
            </div>

            {/* RIGHT: Navigator */}
            <div className="hidden lg:flex lg:col-span-3 flex-col justify-center pl-4 border-l border-white/10 space-y-1">
              <p className="text-[10px] text-[#555] font-mono uppercase tracking-widest mb-2 font-bold">
                STAGE NAVIGATOR
              </p>
              {STAGES.map((s, idx) => {
                const isActive = idx === activeStageIndex;
                return (
                  <button
                    key={s.id}
                    onClick={() => handleStageClick(idx)}
                    className={`flex items-center gap-3 text-left py-1.5 px-3 border-l-2 cursor-pointer transition-all duration-200 ${
                      isActive
                        ? 'border-[#8B6DFF] bg-[#8B6DFF]/15 text-white font-bold'
                        : 'border-transparent text-[#666] hover:text-[#B0B0B0] hover:border-white/20'
                    }`}
                  >
                    <span className={`text-[10px] font-mono ${isActive ? 'text-[#8B6DFF]' : 'text-[#444]'}`}>
                      {s.id}
                    </span>
                    <span className="text-xs uppercase tracking-wider font-mono">{s.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Footer ── */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-white/10 pt-2 sm:pt-3 pb-3 sm:pb-4 shrink-0">
            <div className="flex items-center gap-2 text-[10px] sm:text-xs text-[#555] font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8B6DFF]" />
              <span className="tracking-widest uppercase">
                SCROLL PROGRESSION // {progressPercent}% COMPLETED
              </span>
            </div>
            <span className="text-[10px] sm:text-xs text-[#888] tracking-wider uppercase font-mono">
              {activeStageIndex === STAGES.length - 1 ? 'READY TO PROCEED →' : 'SCROLL TO ADVANCE STAGE ↓'}
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}
