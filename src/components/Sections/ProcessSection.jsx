import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Search, Target, Layout, Code2, Rocket, ShieldCheck, RefreshCw, CheckCircle2, ChevronDown, Repeat, ArrowRight } from 'lucide-react';

const STAGES = [
  {
    id: "01",
    name: "DISCOVER",
    icon: Search,
    headline: "Understand the actual problem before deciding what to build.",
    detail: "Research the user, understand the context, identify the core problem, and uncover constraints before formulating technical solutions.",
    focus: "User Needs • Research • Constraints",
    activities: [
      "User research & stakeholder interviews",
      "Problem space analysis & scoping",
      "Requirement gathering & constraints",
      "Competitive benchmarking"
    ],
    deliverable: "Validated Problem Definition"
  },
  {
    id: "02",
    name: "DEFINE",
    icon: Target,
    headline: "Turn research into a clear product and technical direction.",
    detail: "Translate research findings into precise requirements, goals, architecture boundaries, and a prioritized scope.",
    focus: "Requirements • Scope • System Architecture",
    activities: [
      "Product requirement specification",
      "Scope definition & boundary mapping",
      "Feature matrix prioritization",
      "System architecture blueprint"
    ],
    deliverable: "Defined System & Product Scope"
  },
  {
    id: "03",
    name: "DESIGN",
    icon: Layout,
    headline: "Create the structure, experience, and visual system.",
    detail: "Develop the information architecture, interactive prototypes, design system, and motion fidelity prior to implementation.",
    focus: "UX • UI • Interaction • Visual System",
    activities: [
      "Information architecture mapping",
      "Wireframing & user flow design",
      "Design tokens & UI component system",
      "Interactive prototype validation"
    ],
    deliverable: "Validated Design System"
  },
  {
    id: "04",
    name: "BUILD",
    icon: Code2,
    headline: "Turn approved direction into high-performance software.",
    detail: "Implement responsive interfaces, scalable APIs, motion systems, and core logic with production engineering standards.",
    focus: "Development • State • Integration",
    activities: [
      "Modular React & Next.js development",
      "REST & GraphQL API integration",
      "State management & store setup",
      "Pixel-perfect motion & WebGL integration"
    ],
    deliverable: "Production-Grade Application"
  },
  {
    id: "05",
    name: "DEPLOY",
    icon: Rocket,
    headline: "Prepare and release the finished product for production.",
    detail: "Build optimized assets, configure edge CDN infrastructure, setup automated pipelines, and ensure high availability.",
    focus: "CI/CD • Edge CDN • Infrastructure",
    activities: [
      "Automated CI/CD deployment pipelines",
      "Edge CDN hosting & SSL domain setup",
      "Asset bundle minification & code-splitting",
      "SEO, OpenGraph & metadata optimization"
    ],
    deliverable: "Live Production Release"
  },
  {
    id: "06",
    name: "TEST",
    icon: ShieldCheck,
    headline: "Validate performance, reliability, and edge cases.",
    detail: "Rigorously audit accessibility, cross-browser compatibility, web vitals performance, and end-to-end user flows.",
    focus: "QA • Usability • Performance Vitals",
    activities: [
      "Cross-browser & mobile responsive QA",
      "Lighthouse 100 & Core Web Vitals tuning",
      "Accessibility (WCAG 2.1 AA) compliance",
      "Edge case & load stress testing"
    ],
    deliverable: "Hardened & Stable Product"
  },
  {
    id: "07",
    name: "ITERATE",
    icon: RefreshCw,
    headline: "Use telemetry and user feedback to continuously improve.",
    detail: "Analyze live analytics, gather user feedback, optimize performance bottlenecks, and ship continuous enhancements.",
    focus: "Telemetry • Optimization • Continuous Growth",
    activities: [
      "User behavioral analytics review",
      "Conversion & interaction flow tuning",
      "Runtime performance profiling",
      "Continuous integration updates"
    ],
    deliverable: "Continuously Evolving Platform"
  }
];

export default function ProcessSection() {
  const containerRef = useRef(null);
  const percentRef = useRef(null);
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [mobileExpanded, setMobileExpanded] = useState(false);

  // Framer Motion Scroll Progress for Pinned Track
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Responsive, silky-smooth spring without sluggish lag
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 28,
    mass: 0.2,
    restDelta: 0.0005
  });

  // Direct DOM update for percentage display to eliminate unneeded full-tree re-renders
  useEffect(() => {
    let lastComputedIndex = 0;
    
    const unsubscribe = smoothProgress.on("change", (latest) => {
      const clamped = Math.max(0, Math.min(1, latest));
      
      // Update percentage in DOM directly
      if (percentRef.current) {
        percentRef.current.textContent = `${Math.round(clamped * 100)}%`;
      }

      // Calculate active stage with hysteresis for buttery transitions
      const totalStages = STAGES.length;
      const rawIndex = clamped * (totalStages - 1);
      const computedIndex = Math.min(
        totalStages - 1,
        Math.max(0, Math.round(rawIndex))
      );

      if (computedIndex !== lastComputedIndex) {
        lastComputedIndex = computedIndex;
        setActiveStageIndex(computedIndex);
      }
    });

    return () => unsubscribe();
  }, [smoothProgress]);

  // Smooth programmatic scroll to clicked stage
  const handleStageClick = (index) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const containerStart = rect.top + scrollTop;
    const scrollableDistance = rect.height - window.innerHeight;

    const targetRatio = index / (STAGES.length - 1);
    const targetScrollY = containerStart + targetRatio * scrollableDistance;

    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth'
    });
  };

  const activeStage = STAGES[activeStageIndex];
  const ActiveIcon = activeStage.icon;

  return (
    <section
      id="process"
      ref={containerRef}
      className="relative w-full bg-[#0A0A0A] border-t border-white/10 text-[#F1F0EB] font-mono h-[380vh] sm:h-[420vh]"
    >
      {/* STICKY PINNED VIEWPORT CONTAINER */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between py-5 sm:py-7 px-4 sm:px-6 md:px-12 bg-[#0A0A0A] overflow-hidden select-none">
        
        {/* SECTION HEADER */}
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between border-b border-white/10 pb-3.5 shrink-0 z-20">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#FF1E27] animate-pulse shadow-[0_0_8px_#FF1E27]" />
            <span className="text-xs font-mono text-[#FF1E27] tracking-widest uppercase font-bold">
              03 // PROCESS
            </span>
            <span className="text-white/20 hidden sm:inline-block">•</span>
            <span className="text-white/60 text-xs tracking-wider uppercase hidden sm:inline-block">
              ENGINEERING & DESIGN LIFECYCLE
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="text-[#FF1E27] font-bold tracking-widest font-mono bg-[#FF1E27]/10 px-3 py-1 border border-[#FF1E27]/30 rounded-sm">
              STAGE {activeStage.id} / 07
            </span>
          </div>
        </div>

        {/* MOBILE STAGE STEPPER (Horizontal Scrollable Pills) */}
        <div className="max-w-7xl mx-auto w-full lg:hidden flex items-center gap-2 py-2 overflow-x-auto shrink-0 z-20 no-scrollbar">
          {STAGES.map((s, idx) => {
            const isActive = idx === activeStageIndex;
            return (
              <button
                key={s.id}
                onClick={() => handleStageClick(idx)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider shrink-0 rounded-sm cursor-pointer transition-all duration-200 ${
                  isActive
                    ? 'bg-[#FF1E27] text-white font-bold shadow-[0_0_12px_rgba(255, 30, 39,0.5)] scale-105'
                    : 'bg-[#111111] text-white/50 border border-white/10 hover:text-white'
                }`}
              >
                <span>{s.id}</span>
                <span>{s.name}</span>
              </button>
            );
          })}
        </div>

        {/* MAIN 3-COLUMN LAYOUT / MOBILE SINGLE CARD */}
        <div className="max-w-7xl mx-auto w-full flex-1 my-auto py-2 flex items-center justify-center z-10 overflow-hidden">
          
          {/* DESKTOP 3-COLUMN GRID */}
          <div className="w-full hidden lg:grid lg:grid-cols-12 gap-8 items-center">
            
            {/* LEFT COLUMN: Context Panel */}
            <div className="lg:col-span-4 flex flex-col justify-center bg-[#111111]/90 backdrop-blur-md border border-white/10 p-6 rounded-none space-y-5 shadow-2xl relative min-h-[390px]">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-[10px] text-[#FF1E27] font-bold tracking-widest uppercase flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF1E27]" />
                  STAGE METADATA
                </span>
                <span className="text-[10px] text-white/40 font-mono">
                  [ {activeStage.id} / 07 ]
                </span>
              </div>

              <AnimatePresence mode="popLayout">
                <motion.div
                  key={activeStage.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-4"
                >
                  <div className="space-y-1">
                    <span className="text-[9px] text-white/40 uppercase tracking-widest font-bold">OBJECTIVE</span>
                    <p className="text-xs text-slate-200 font-sans leading-relaxed">
                      {activeStage.headline}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[9px] text-white/40 uppercase tracking-widest font-bold">CORE FOCUS</span>
                    <div className="flex flex-wrap gap-1.5 pt-0.5">
                      {activeStage.focus.split('•').map((item, i) => (
                        <span key={i} className="text-[10px] text-[#FF1E27] bg-[#FF1E27]/10 px-2 py-0.5 border border-[#FF1E27]/20 font-medium">
                          {item.trim()}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[9px] text-white/40 uppercase tracking-widest font-bold">SUPPORTING ACTIVITIES</span>
                    <ul className="space-y-1.5 text-[11px] text-[#A0A0A0] font-mono">
                      {activeStage.activities.map((act, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle2 size={13} className="text-[#FF1E27] shrink-0" />
                          <span className="leading-snug">{act}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-3 border-t border-white/10">
                    <span className="text-[9px] text-white/40 uppercase tracking-widest font-bold block mb-1">KEY DELIVERABLE</span>
                    <div className="text-xs text-white font-mono font-bold bg-[#0A0A0A] px-3 py-2 border border-white/10 flex items-center justify-between">
                      <span className="truncate">{activeStage.deliverable}</span>
                      <span className="text-[#FF1E27] text-[10px] ml-2 shrink-0">✓ VERIFIED</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* CENTER COLUMN: Main Stage Card (Primary Visual Focus) */}
            <div className="lg:col-span-5 flex flex-col justify-center relative min-h-[430px]">
              
              {/* Subtle Ambient Graphic Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#FF1E27]/12 to-transparent blur-3xl pointer-events-none rounded-full transform -translate-y-4" />

              <div className="relative bg-[#141414] border border-[#FF1E27]/40 p-8 shadow-[0_0_35px_rgba(255, 30, 39,0.15)] space-y-6">
                
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={activeStage.id}
                    initial={{ opacity: 0, y: 16, scale: 0.99 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -16, scale: 0.99 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="space-y-6"
                  >
                    {/* Stage Header Badge */}
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-sm bg-[#FF1E27]/15 border border-[#FF1E27]/40 flex items-center justify-center text-[#FF1E27] shadow-[0_0_12px_rgba(255, 30, 39,0.25)]">
                          <ActiveIcon size={22} />
                        </div>
                        <div>
                          <span className="text-[10px] text-[#FF1E27] font-mono font-bold tracking-widest block uppercase">
                            STAGE {activeStage.id}
                          </span>
                          <span className="text-xs text-white/70 uppercase font-mono font-bold">
                            {activeStage.name}
                          </span>
                        </div>
                      </div>

                      {activeStage.id === "07" ? (
                        <div className="flex items-center gap-1.5 text-[10px] text-[#FF1E27] bg-[#FF1E27]/10 px-2.5 py-1 border border-[#FF1E27]/30 animate-pulse font-mono">
                          <Repeat size={12} />
                          <span className="font-bold">CONTINUOUS LOOP</span>
                        </div>
                      ) : (
                        <span className="text-xs font-mono text-white/40">STEP {activeStage.id} / 07</span>
                      )}
                    </div>

                    {/* Main Stage Title & Description */}
                    <div className="space-y-3">
                      <h3 className="font-syne text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight uppercase leading-none">
                        {activeStage.name}
                      </h3>

                      <p className="font-sans text-sm sm:text-base text-slate-200 font-semibold leading-relaxed">
                        "{activeStage.headline}"
                      </p>

                      <p className="font-sans text-xs sm:text-sm text-[#A0A0A0] leading-relaxed pt-1">
                        {activeStage.detail}
                      </p>
                    </div>

                    {/* Focus Pills without Text Truncation */}
                    <div className="pt-2 border-t border-white/10 space-y-2">
                      <span className="text-[9px] text-white/40 uppercase tracking-widest font-bold block">
                        CORE FOCUS AREAS
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {activeStage.focus.split('•').map((tag, idx) => (
                          <span
                            key={idx}
                            className="bg-[#0A0A0A] border border-white/15 px-3 py-1 text-xs text-white font-mono font-semibold"
                          >
                            {tag.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* RIGHT COLUMN: Interactive Vertical Timeline Axis */}
            <div className="lg:col-span-3 flex flex-col justify-center pl-8 relative min-h-[390px]">
              
              <div className="text-[10px] text-white/40 font-mono uppercase tracking-widest mb-4 font-bold flex items-center justify-between">
                <span>STAGE TIMELINE</span>
                <span className="text-[#FF1E27]">{activeStage.id} / 07</span>
              </div>

              {/* TIMELINE CONTAINER */}
              <div className="relative flex flex-col justify-between h-[310px]">
                
                {/* BASE LINE */}
                <div className="absolute left-[11px] top-[12px] bottom-[12px] w-[2px] bg-white/15 pointer-events-none z-0" />

                {/* PROGRESS LINE */}
                <motion.div
                  className="absolute left-[11px] top-[12px] w-[2px] bg-[#FF1E27] shadow-[0_0_10px_rgba(255, 30, 39,0.9)] origin-top pointer-events-none z-0"
                  style={{
                    scaleY: smoothProgress,
                    height: 'calc(100% - 24px)'
                  }}
                />

                {/* 7 EQUALLY SPACED STAGE ROWS ON FIXED AXIS */}
                {STAGES.map((s, idx) => {
                  const isActive = idx === activeStageIndex;
                  const isPassed = idx < activeStageIndex;

                  return (
                    <button
                      key={s.id}
                      onClick={() => handleStageClick(idx)}
                      className="flex items-center gap-3.5 text-left cursor-pointer w-full group relative z-10 py-1 focus:outline-none"
                    >
                      {/* FIXED NODE CONTAINER */}
                      <div className="w-6 h-6 flex items-center justify-center shrink-0 relative z-10">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-mono transition-all duration-300 transform-gpu origin-center ${
                            isActive
                              ? 'bg-[#FF1E27] text-white border border-[#FF1E27] shadow-[0_0_14px_rgba(255, 30, 39,0.7)] font-bold scale-125 z-20'
                              : isPassed
                              ? 'bg-[#FF1E27]/20 text-[#FF1E27] border border-[#FF1E27]/50 z-10'
                              : 'bg-[#141414] text-white/50 border border-white/20 group-hover:border-white/40 group-hover:text-white z-10'
                          }`}
                        >
                          {s.id}
                        </div>
                      </div>

                      {/* STAGE LABEL AND ITERATE LOOP ICON */}
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs uppercase tracking-wider font-mono transition-colors duration-200 ${
                            isActive
                              ? 'text-white font-bold'
                              : isPassed
                              ? 'text-white/70 font-medium'
                              : 'text-white/50 group-hover:text-white/80'
                          }`}
                        >
                          {s.name}
                        </span>

                        {s.id === "07" && (
                          <Repeat
                            size={12}
                            className={`shrink-0 transition-colors duration-200 ${
                              isActive ? 'text-[#FF1E27]' : 'text-white/30'
                            }`}
                          />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* MOBILE SINGLE COHESIVE STAGE CARD VIEW */}
          <div className="w-full lg:hidden flex flex-col justify-center my-auto py-2">
            <div className="bg-[#141414] border border-[#FF1E27]/30 p-5 sm:p-6 shadow-xl space-y-4">
              
              {/* Mobile Card Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-sm bg-[#FF1E27]/15 border border-[#FF1E27]/30 flex items-center justify-center text-[#FF1E27]">
                    <ActiveIcon size={18} />
                  </div>
                  <div>
                    <span className="text-[9px] text-[#FF1E27] font-bold block uppercase">STAGE {activeStage.id}</span>
                    <span className="text-xs text-white font-bold uppercase">{activeStage.name}</span>
                  </div>
                </div>

                <span className="text-[10px] font-mono text-white/40">STAGE {activeStage.id} / 07</span>
              </div>

              {/* Mobile Content */}
              <div className="space-y-2">
                <h3 className="font-syne text-2xl font-extrabold text-white tracking-tight uppercase leading-tight">
                  {activeStage.name}
                </h3>
                <p className="font-sans text-xs text-slate-200 font-semibold leading-relaxed">
                  "{activeStage.headline}"
                </p>
                <p className="font-sans text-[11px] text-[#A0A0A0] leading-relaxed">
                  {activeStage.detail}
                </p>
              </div>

              {/* Focus Areas */}
              <div className="pt-2 border-t border-white/10">
                <span className="text-[9px] text-white/40 uppercase tracking-widest font-bold block mb-1.5">FOCUS</span>
                <div className="flex flex-wrap gap-1.5">
                  {activeStage.focus.split('•').map((tag, idx) => (
                    <span key={idx} className="bg-[#0A0A0A] border border-white/10 px-2 py-0.5 text-[10px] text-[#FF1E27] font-mono">
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              </div>

              {/* Expandable Activities Toggle for Mobile */}
              <div className="pt-2 border-t border-white/10">
                <button
                  onClick={() => setMobileExpanded(!mobileExpanded)}
                  className="flex items-center justify-between w-full text-left text-xs font-mono text-white/70 hover:text-[#FF1E27] py-1 cursor-pointer"
                >
                  <span>ACTIVITIES & DELIVERABLE</span>
                  <ChevronDown size={14} className={`transition-transform duration-300 ${mobileExpanded ? 'rotate-180 text-[#FF1E27]' : ''}`} />
                </button>

                {mobileExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="pt-2 space-y-3"
                  >
                    <ul className="space-y-1 text-[11px] text-[#A0A0A0] font-mono">
                      {activeStage.activities.map((act, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle2 size={12} className="text-[#FF1E27] shrink-0" />
                          <span>{act}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="bg-[#0A0A0A] p-2 border border-white/10 text-xs text-white font-mono flex items-center justify-between">
                      <span className="text-[10px] text-white/40">DELIVERABLE:</span>
                      <span className="font-bold text-[#FF1E27]">{activeStage.deliverable}</span>
                    </div>
                  </motion.div>
                )}
              </div>

            </div>
          </div>

        </div>

        {/* BOTTOM FOOTER INFO */}
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between border-t border-white/10 pt-3.5 shrink-0 z-20 text-[10px] sm:text-xs text-white/40 font-mono">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF1E27]" />
            <span className="tracking-widest uppercase">
              SCROLL PROGRESSION // <span ref={percentRef} className="text-[#FF1E27] font-bold">0%</span> COMPLETED
            </span>
          </div>

          <div className="text-right text-white/60 tracking-wider uppercase font-mono">
            {activeStageIndex === STAGES.length - 1 ? (
              <span className="text-[#FF1E27] font-bold animate-pulse flex items-center gap-1.5 justify-end">
                <span>CONTINUE SCROLLING FOR SELECTED WORK</span>
                <ArrowRight size={13} />
              </span>
            ) : (
              <span>SCROLL DOWN TO ADVANCE STAGE</span>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
