import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Search, Target, Layout, Code2, Rocket, ShieldCheck, RefreshCw, CheckCircle2, ChevronDown, Repeat } from 'lucide-react';

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
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [mobileExpanded, setMobileExpanded] = useState(false);

  // Framer Motion Scroll Progress for Pinned Container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Inertia Smooth Progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.0005
  });

  // Track live stage index & percentage for UI updates
  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (latest) => {
      const clamped = Math.max(0, Math.min(1, latest));
      setScrollPercentage(Math.round(clamped * 100));

      const step = 1 / (STAGES.length - 1);
      const computedIndex = Math.min(
        STAGES.length - 1,
        Math.max(0, Math.round(clamped / step))
      );
      if (computedIndex !== activeStageIndex) {
        setActiveStageIndex(computedIndex);
      }
    });

    return () => unsubscribe();
  }, [smoothProgress, activeStageIndex]);

  // Click-to-scroll to specific stage
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
      className="relative w-full bg-[#0A0A0A] border-t border-white/10 text-[#F1F0EB] font-mono h-[350vh] sm:h-[400vh]"
    >
      {/* STICKY PINNED VIEWPORT CONTAINER */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between py-6 sm:py-8 px-4 sm:px-6 md:px-12 bg-[#0A0A0A] overflow-hidden">
        
        {/* SECTION HEADER */}
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between border-b border-white/10 pb-4 shrink-0 z-20">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#8B6DFF] animate-pulse shadow-[0_0_8px_#8B6DFF]" />
            <span className="text-xs font-mono text-[#8B6DFF] tracking-widest uppercase font-bold">
              03 // PROCESS
            </span>
            <span className="text-white/20 hidden sm:inline-block">•</span>
            <span className="text-white/60 text-xs tracking-wider uppercase hidden sm:inline-block">
              ENGINEERING & DESIGN LIFECYCLE
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="text-[#8B6DFF] font-bold tracking-widest font-mono bg-[#8B6DFF]/10 px-3 py-1 border border-[#8B6DFF]/25 rounded-sm">
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
                className={`flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider shrink-0 rounded-sm cursor-pointer transition-all duration-300 ${
                  isActive
                    ? 'bg-[#8B6DFF] text-white font-bold shadow-[0_0_10px_rgba(139,109,255,0.4)]'
                    : 'bg-[#111111] text-white/50 border border-white/10 hover:text-white'
                }`}
              >
                <span>{s.id}</span>
                <span>{s.name}</span>
              </button>
            );
          })}
        </div>

        {/* MAIN DESKTOP 3-COLUMN LAYOUT / MOBILE SINGLE CARD */}
        <div className="max-w-7xl mx-auto w-full flex-1 my-auto py-2 flex items-center justify-center z-10 overflow-hidden">
          
          {/* DESKTOP 3-COLUMN GRID */}
          <div className="w-full hidden lg:grid lg:grid-cols-12 gap-8 items-center">
            
            {/* LEFT COLUMN: Context Panel */}
            <div className="lg:col-span-4 flex flex-col justify-center bg-[#111111]/80 backdrop-blur-sm border border-white/10 p-6 rounded-none space-y-5 shadow-xl relative min-h-[380px]">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-[10px] text-[#8B6DFF] font-bold tracking-widest uppercase">
                  STAGE METADATA
                </span>
                <span className="text-[10px] text-white/40 font-mono">
                  [ {activeStage.id} / 07 ]
                </span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStage.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
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
                        <span key={i} className="text-[10px] text-[#8B6DFF] bg-[#8B6DFF]/10 px-2 py-0.5 border border-[#8B6DFF]/20 font-medium">
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
                          <CheckCircle2 size={13} className="text-[#8B6DFF] shrink-0" />
                          <span className="leading-snug">{act}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-3 border-t border-white/10">
                    <span className="text-[9px] text-white/40 uppercase tracking-widest font-bold block mb-1">KEY OUTPUT</span>
                    <div className="text-xs text-white font-mono font-bold bg-[#0A0A0A] px-3 py-2 border border-white/10 flex items-center justify-between">
                      <span className="truncate">{activeStage.deliverable}</span>
                      <span className="text-[#8B6DFF] text-[10px] ml-2 shrink-0">✓ READY</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* CENTER COLUMN: Main Stage Card (Primary Visual Focus) */}
            <div className="lg:col-span-5 flex flex-col justify-center relative min-h-[420px]">
              
              {/* Subtle Ambient Graphic Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#8B6DFF]/10 to-transparent blur-3xl pointer-events-none rounded-full transform -translate-y-4" />

              <div className="relative bg-[#141414] border border-[#8B6DFF]/40 p-8 shadow-[0_0_30px_rgba(139,109,255,0.12)] space-y-6">
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStage.id}
                    initial={{ opacity: 0, y: 25, scale: 0.98, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -25, scale: 0.98, filter: 'blur(4px)' }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-6"
                  >
                    {/* Stage Header Badge */}
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-sm bg-[#8B6DFF]/15 border border-[#8B6DFF]/40 flex items-center justify-center text-[#8B6DFF]">
                          <ActiveIcon size={22} />
                        </div>
                        <div>
                          <span className="text-[10px] text-[#8B6DFF] font-mono font-bold tracking-widest block uppercase">
                            STAGE {activeStage.id}
                          </span>
                          <span className="text-xs text-white/60 uppercase font-mono font-bold">
                            {activeStage.name}
                          </span>
                        </div>
                      </div>

                      {activeStage.id === "07" ? (
                        <div className="flex items-center gap-1.5 text-[10px] text-[#8B6DFF] bg-[#8B6DFF]/10 px-2.5 py-1 border border-[#8B6DFF]/30 animate-pulse">
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
                        FOCUS AREAS
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

            {/* RIGHT COLUMN: Precise Stage Timeline */}
            <div className="lg:col-span-3 flex flex-col justify-center pl-8 relative min-h-[380px]">
              
              <div className="text-[10px] text-white/40 font-mono uppercase tracking-widest mb-4 font-bold">
                STAGE TIMELINE
              </div>

              {/* TIMELINE CONTAINER WITH EXACT GEOMETRIC BOUNDS */}
              <div className="relative flex flex-col justify-between h-[300px]">
                
                {/* CONNECTED VERTICAL BACKGROUND LINE (starts at Node 01 center Y=12px, ends at Node 07 center Y=12px from bottom) */}
                <div className="absolute left-[11px] top-[12px] bottom-[12px] w-[2px] bg-white/15 pointer-events-none" />

                {/* ACTIVE SMOOTH FILL LINE (starts at top-[12px], ends at bottom-[12px]) */}
                <motion.div
                  className="absolute left-[11px] top-[12px] w-[2px] bg-[#8B6DFF] shadow-[0_0_8px_rgba(139,109,255,0.7)] origin-top pointer-events-none"
                  style={{
                    scaleY: smoothProgress,
                    height: 'calc(100% - 24px)'
                  }}
                />

                {/* 7 EQUALLY SPACED TIMELINE STAGE NODES */}
                {STAGES.map((s, idx) => {
                  const isActive = idx === activeStageIndex;
                  const isPassed = idx < activeStageIndex;

                  return (
                    <button
                      key={s.id}
                      onClick={() => handleStageClick(idx)}
                      className={`flex items-center gap-3.5 text-left cursor-pointer w-full group transition-all duration-300 relative z-10 ${
                        isActive ? 'translate-x-1' : 'hover:translate-x-0.5'
                      }`}
                    >
                      {/* NODE CIRCLE (24px x 24px, centered over left-[11px] 2px line at X=12px) */}
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center border text-[10px] font-mono transition-all duration-300 shrink-0 ${
                          isActive
                            ? 'bg-[#8B6DFF] text-white border-[#8B6DFF] shadow-[0_0_10px_rgba(139,109,255,0.4)] font-bold scale-105'
                            : isPassed
                            ? 'bg-[#8B6DFF]/15 text-[#8B6DFF] border-[#8B6DFF]/40'
                            : 'bg-[#141414] text-white/60 border-white/20 group-hover:border-white/40 group-hover:text-white'
                        }`}
                      >
                        {s.id}
                      </div>

                      {/* STAGE LABEL AND ITERATE LOOP ICON */}
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs uppercase tracking-wider font-mono transition-all duration-300 ${
                            isActive
                              ? 'text-white font-bold tracking-widest'
                              : isPassed
                              ? 'text-white/70'
                              : 'text-white/50 group-hover:text-white/80'
                          }`}
                        >
                          {s.name}
                        </span>

                        {/* SUBTLE LOOP ICON FOR 07 ITERATE */}
                        {s.id === "07" && (
                          <Repeat
                            size={12}
                            className={`shrink-0 transition-colors duration-300 ${
                              isActive ? 'text-[#8B6DFF]' : 'text-white/30'
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
            <div className="bg-[#141414] border border-[#8B6DFF]/30 p-5 sm:p-6 shadow-xl space-y-4">
              
              {/* Mobile Card Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-sm bg-[#8B6DFF]/15 border border-[#8B6DFF]/30 flex items-center justify-center text-[#8B6DFF]">
                    <ActiveIcon size={18} />
                  </div>
                  <div>
                    <span className="text-[9px] text-[#8B6DFF] font-bold block uppercase">STAGE {activeStage.id}</span>
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
                    <span key={idx} className="bg-[#0A0A0A] border border-white/10 px-2 py-0.5 text-[10px] text-[#8B6DFF] font-mono">
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              </div>

              {/* Expandable Activities Toggle for Mobile */}
              <div className="pt-2 border-t border-white/10">
                <button
                  onClick={() => setMobileExpanded(!mobileExpanded)}
                  className="flex items-center justify-between w-full text-left text-xs font-mono text-white/70 hover:text-white py-1"
                >
                  <span>ACTIVITIES & DELIVERABLE</span>
                  <ChevronDown size={14} className={`transition-transform duration-300 ${mobileExpanded ? 'rotate-180 text-[#8B6DFF]' : ''}`} />
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
                          <CheckCircle2 size={12} className="text-[#8B6DFF] shrink-0" />
                          <span>{act}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="bg-[#0A0A0A] p-2 border border-white/10 text-xs text-white font-mono flex items-center justify-between">
                      <span className="text-[10px] text-white/40">DELIVERABLE:</span>
                      <span className="font-bold text-[#8B6DFF]">{activeStage.deliverable}</span>
                    </div>
                  </motion.div>
                )}
              </div>

            </div>
          </div>

        </div>

        {/* BOTTOM FOOTER INFO */}
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between border-t border-white/10 pt-4 shrink-0 z-20 text-[10px] sm:text-xs text-white/40 font-mono">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8B6DFF]" />
            <span className="tracking-widest uppercase">
              SCROLL PROGRESSION // <span className="text-[#8B6DFF] font-bold">{scrollPercentage}%</span> COMPLETED
            </span>
          </div>

          <div className="text-right text-white/60 tracking-wider uppercase font-mono">
            {activeStageIndex === STAGES.length - 1 ? (
              <span className="text-[#8B6DFF] font-bold animate-pulse">CONTINUE SCROLLING FOR SELECTED WORK ↓</span>
            ) : (
              <span>SCROLL DOWN TO ADVANCE STAGE</span>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
