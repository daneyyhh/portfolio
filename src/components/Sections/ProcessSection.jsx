import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Search, Target, Layout, Code2, Rocket, ShieldCheck, RefreshCw, CheckCircle2 } from 'lucide-react';

const STAGES = [
  {
    id: "01",
    name: "DISCOVER",
    icon: Search,
    headline: "Understand the actual problem before deciding what to build.",
    detail: "Research the user, understand the context, identify the real problem, and uncover constraints before formulating technical solutions.",
    focus: "User Needs • Research • Constraints",
    activities: [
      "User research & stakeholder interviews",
      "Problem space analysis & scoping",
      "Functional requirement gathering",
      "Technical constraint discovery",
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
      "Product requirement documentation",
      "Scope definition & boundary mapping",
      "Feature matrix prioritization",
      "System architecture blueprint",
      "Milestone & delivery roadmap"
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
      "Art direction & aesthetic polish",
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
      "Modular React / Next.js component development",
      "REST / GraphQL API integration",
      "State management & cache architecture",
      "Authentication & database schema setup",
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
      "SEO, OpenGraph & metadata optimization",
      "Uptime & error telemetries"
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
      "Edge case & load stress testing",
      "Usability feedback loop refinement"
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
      "Incremental feature additions",
      "Continuous integration updates"
    ],
    deliverable: "Continuously Evolving Platform"
  }
];

// Helper Component for Individual Stage Motion Cards
function StageCardItem({ stage, index, totalStages, progress }) {
  const IconComponent = stage.icon;

  // Calculate normalized index centers: 0, 1/6, 2/6, 3/6, 4/6, 5/6, 1
  const step = 1 / (totalStages - 1);
  const center = index * step;

  // Window bounds for active transition
  const startIn = Math.max(0, center - step * 0.85);
  const peakStart = Math.max(0, center - step * 0.25);
  const peakEnd = Math.min(1, center + step * 0.25);
  const endOut = Math.min(1, center + step * 0.85);

  // Opacity transform
  const opacity = useTransform(
    progress,
    [startIn, peakStart, peakEnd, endOut],
    index === 0 ? [1, 1, 1, 0] : index === totalStages - 1 ? [0, 1, 1, 1] : [0, 1, 1, 0]
  );

  // Y Translation transform
  const y = useTransform(
    progress,
    [startIn, peakStart, peakEnd, endOut],
    index === 0 ? [0, 0, 0, -35] : index === totalStages - 1 ? [35, 0, 0, 0] : [35, 0, 0, -35]
  );

  // Scale transform
  const scale = useTransform(
    progress,
    [startIn, peakStart, peakEnd, endOut],
    index === 0 ? [1, 1, 1, 0.95] : index === totalStages - 1 ? [0.95, 1, 1, 1] : [0.95, 1, 1, 0.95]
  );

  // Blur transform
  const blurValue = useTransform(
    progress,
    [startIn, peakStart, peakEnd, endOut],
    index === 0 ? [0, 0, 0, 6] : index === totalStages - 1 ? [6, 0, 0, 0] : [6, 0, 0, 6]
  );

  const filter = useTransform(blurValue, (v) => `blur(${v}px)`);

  return (
    <motion.div
      style={{
        opacity,
        y,
        scale,
        filter,
        pointerEvents: opacity.get() > 0.5 ? 'auto' : 'none'
      }}
      className="absolute inset-0 flex flex-col justify-between p-5 sm:p-7 md:p-8 bg-[#141414] border-2 border-[#8B6DFF] rounded-none shadow-[0_0_40px_rgba(139,109,255,0.18)] will-change-transform"
    >
      {/* Stage Header */}
      <div>
        <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-[#8B6DFF] font-bold tracking-widest uppercase">
              STAGE {stage.id} // {totalStages.toString().padStart(2, '0')}
            </span>
          </div>
          <div className="flex items-center gap-2 bg-[#8B6DFF]/15 border border-[#8B6DFF]/30 px-2.5 py-1">
            <IconComponent size={16} className="text-[#8B6DFF]" />
            <span className="text-xs font-mono text-white font-bold tracking-wider">{stage.name}</span>
          </div>
        </div>

        {/* Headline & Description */}
        <div className="space-y-3">
          <h3 className="font-syne text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight uppercase leading-none">
            {stage.name}
          </h3>

          <p className="font-sans text-xs sm:text-sm md:text-base text-slate-200 font-semibold leading-snug">
            {stage.headline}
          </p>

          <p className="font-sans text-[11px] sm:text-xs md:text-sm text-[#A0A0A0] leading-relaxed">
            {stage.detail}
          </p>
        </div>
      </div>

      {/* Stage Footer Info */}
      <div className="space-y-3 pt-4 border-t border-white/10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
          <div className="space-y-1 bg-[#0A0A0A] p-2.5 border border-white/10">
            <span className="text-[9px] text-[#777777] uppercase tracking-wider font-bold block">
              PRIMARY FOCUS
            </span>
            <span className="text-[#8B6DFF] text-[10px] sm:text-[11px] block font-semibold truncate">
              {stage.focus}
            </span>
          </div>

          <div className="space-y-1 bg-[#0A0A0A] p-2.5 border border-white/10">
            <span className="text-[9px] text-[#777777] uppercase tracking-wider font-bold block">
              KEY DELIVERABLE
            </span>
            <span className="text-white text-[10px] sm:text-[11px] font-bold block truncate">
              {stage.deliverable}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Helper Component for Process Inspector Stage Layer
function InspectorStageItem({ stage, index, totalStages, progress }) {
  const step = 1 / (totalStages - 1);
  const center = index * step;

  const startIn = Math.max(0, center - step * 0.85);
  const peakStart = Math.max(0, center - step * 0.25);
  const peakEnd = Math.min(1, center + step * 0.25);
  const endOut = Math.min(1, center + step * 0.85);

  const opacity = useTransform(
    progress,
    [startIn, peakStart, peakEnd, endOut],
    index === 0 ? [1, 1, 1, 0] : index === totalStages - 1 ? [0, 1, 1, 1] : [0, 1, 1, 0]
  );

  const y = useTransform(
    progress,
    [startIn, peakStart, peakEnd, endOut],
    index === 0 ? [0, 0, 0, -20] : index === totalStages - 1 ? [20, 0, 0, 0] : [20, 0, 0, -20]
  );

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col justify-between will-change-transform pointer-events-none"
    >
      <div className="space-y-4">
        <div className="space-y-1">
          <div className="text-[9px] text-[#666666] uppercase tracking-widest font-bold font-mono">OBJECTIVE</div>
          <p className="text-xs text-[#E0E0E0] font-sans leading-relaxed font-medium">
            {stage.headline}
          </p>
        </div>

        <div className="space-y-1">
          <div className="text-[9px] text-[#666666] uppercase tracking-widest font-bold font-mono">CORE FOCUS</div>
          <div className="text-xs text-[#8B6DFF] font-mono font-bold">
            {stage.focus}
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-[9px] text-[#666666] uppercase tracking-widest font-bold font-mono">EXECUTION ACTIVITIES</div>
          <ul className="space-y-1.5 text-[11px] text-[#A0A0A0] font-mono">
            {stage.activities.map((act, i) => (
              <li key={i} className="flex items-center gap-2">
                <CheckCircle2 size={12} className="text-[#8B6DFF] shrink-0" />
                <span className="truncate">{act}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="pt-3 border-t border-white/10">
        <div className="text-[9px] text-[#666666] uppercase tracking-widest font-bold mb-1 font-mono">OUTPUT ARTIFACT</div>
        <div className="text-xs text-white font-mono font-bold bg-[#0A0A0A] px-3 py-2 border border-white/10 truncate">
          {stage.deliverable}
        </div>
      </div>
    </motion.div>
  );
}

export default function ProcessSection() {
  const containerRef = useRef(null);
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [scrollPercentage, setScrollPercentage] = useState(0);

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

  // Track live stage index & percentage for UI badges
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

  return (
    <section
      id="process"
      ref={containerRef}
      className="relative w-full bg-[#0A0A0A] border-t border-white/10 text-[#F1F0EB] font-mono h-[350vh] sm:h-[400vh]"
    >
      {/* STICKY PINNED VIEWPORT CONTAINER */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between py-6 sm:py-8 px-4 sm:px-6 md:px-12 bg-[#0A0A0A] overflow-hidden">
        
        {/* TOP HEADER BAR */}
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between border-b border-white/10 pb-4 shrink-0 z-20">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#8B6DFF] animate-pulse shadow-[0_0_10px_#8B6DFF]" />
            <span className="text-xs font-mono text-[#8B6DFF] tracking-widest uppercase font-bold">
              03 // PROCESS
            </span>
            <span className="text-white/30 hidden sm:inline-block">/</span>
            <span className="text-white/70 text-xs tracking-wider uppercase hidden sm:inline-block">
              ENGINEERING & DESIGN STORYTELLING
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="text-white/50 hidden md:inline-block">PROGRESSION:</span>
            <span className="text-[#8B6DFF] font-bold tracking-widest font-mono bg-[#8B6DFF]/10 px-3 py-1 border border-[#8B6DFF]/30">
              STAGE {activeStage.id} / {STAGES.length.toString().padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* MOBILE STAGE STEPPER PILLS */}
        <div className="max-w-7xl mx-auto w-full lg:hidden flex items-center gap-2 py-2 overflow-x-auto shrink-0 z-20 no-scrollbar">
          {STAGES.map((s, idx) => {
            const isActive = idx === activeStageIndex;
            return (
              <button
                key={s.id}
                onClick={() => handleStageClick(idx)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider shrink-0 cursor-pointer transition-all duration-300 ${
                  isActive
                    ? 'bg-[#8B6DFF] text-white font-bold shadow-[0_0_12px_rgba(139,109,255,0.4)]'
                    : 'bg-[#111111] text-white/50 border border-white/10 hover:text-white'
                }`}
              >
                <span>{s.id}</span>
                <span>{s.name}</span>
              </button>
            );
          })}
        </div>

        {/* MAIN 3-COLUMN SCROLL STORYTELLING VIEWPORT */}
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch flex-1 my-4 overflow-hidden relative z-10">

          {/* LEFT: PROCESS INSPECTOR PANEL (Desktop Details Cross-fade) */}
          <div className="hidden lg:flex lg:col-span-4 flex-col justify-between bg-[#111111] border border-white/15 p-6 shadow-2xl relative overflow-hidden h-full">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 shrink-0 z-20">
              <span className="text-[10px] text-[#8B6DFF] font-bold tracking-widest uppercase">
                PROCESS INSPECTOR
              </span>
              <span className="text-[10px] text-white/40 font-mono">
                [ STAGE {activeStage.id} ]
              </span>
            </div>

            {/* Stacked Inspector Layers */}
            <div className="relative flex-1 my-4 overflow-hidden">
              {STAGES.map((stage, idx) => (
                <InspectorStageItem
                  key={stage.id}
                  stage={stage}
                  index={idx}
                  totalStages={STAGES.length}
                  progress={smoothProgress}
                />
              ))}
            </div>

            <div className="pt-3 border-t border-white/10 shrink-0 z-20 flex items-center justify-between text-[10px] text-white/40 font-mono">
              <span>CURRENT STAGE</span>
              <span className="text-[#8B6DFF] font-bold">{activeStage.name} ({activeStage.id})</span>
            </div>
          </div>

          {/* CENTER: DOMINANT ACTIVE STAGE CARD (Framer Motion Stack) */}
          <div className="lg:col-span-5 relative h-full min-h-[380px] sm:min-h-[420px] lg:min-h-[440px] flex flex-col justify-between">
            <div className="relative w-full h-full">
              {STAGES.map((stage, idx) => (
                <StageCardItem
                  key={stage.id}
                  stage={stage}
                  index={idx}
                  totalStages={STAGES.length}
                  progress={smoothProgress}
                />
              ))}
            </div>
          </div>

          {/* RIGHT: CONNECTED TIMELINE & STAGE NAVIGATOR */}
          <div className="hidden lg:flex lg:col-span-3 flex-col justify-center pl-6 border-l border-white/10 relative h-full">
            <div className="text-[10px] text-white/40 font-mono uppercase tracking-widest mb-4 font-bold">
              TIMELINE PROGRESSION
            </div>

            <div className="relative space-y-3">
              {/* CONNECTED TIMELINE BACKGROUND LINE */}
              <div className="absolute left-[15px] top-[14px] bottom-[14px] w-[2px] bg-white/10 pointer-events-none" />

              {/* CONNECTED GLOWING PROGRESS LINE FILL */}
              <motion.div
                className="absolute left-[15px] top-[14px] w-[2px] bg-[#8B6DFF] shadow-[0_0_10px_#8B6DFF] origin-top pointer-events-none"
                style={{
                  bottom: '[14px]',
                  scaleY: smoothProgress,
                  height: 'calc(100% - 28px)'
                }}
              />

              {/* TIMELINE STAGE NODES */}
              {STAGES.map((s, idx) => {
                const isActive = idx === activeStageIndex;
                const isPassed = idx < activeStageIndex;

                return (
                  <button
                    key={s.id}
                    onClick={() => handleStageClick(idx)}
                    className={`flex items-center gap-3.5 text-left py-1.5 px-2 cursor-pointer w-full group transition-all duration-300 relative z-10 ${
                      isActive ? 'translate-x-1.5' : 'hover:translate-x-1'
                    }`}
                  >
                    {/* TIMELINE NODE HALO / CIRCLE */}
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center border text-[10px] font-mono transition-all duration-300 shrink-0 ${
                        isActive
                          ? 'bg-[#8B6DFF] text-white border-[#8B6DFF] shadow-[0_0_14px_#8B6DFF] font-bold scale-110'
                          : isPassed
                          ? 'bg-[#8B6DFF]/20 text-[#8B6DFF] border-[#8B6DFF]/50'
                          : 'bg-[#111111] text-white/40 border-white/20 group-hover:border-white/50 group-hover:text-white'
                      }`}
                    >
                      {s.id}
                    </div>

                    {/* STAGE LABEL */}
                    <div className="flex flex-col">
                      <span
                        className={`text-xs uppercase tracking-wider font-mono transition-colors duration-300 ${
                          isActive
                            ? 'text-white font-bold'
                            : isPassed
                            ? 'text-white/70'
                            : 'text-white/40 group-hover:text-white/80'
                        }`}
                      >
                        {s.name}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* BOTTOM FOOTER PROGRESS BAR & NAVIGATION INDICATOR */}
        <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10 pt-4 shrink-0 z-20 text-[10px] sm:text-xs text-white/50 font-mono">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <span className="w-2 h-2 rounded-full bg-[#8B6DFF]" />
            <span className="tracking-widest uppercase">
              SCROLL PROGRESSION // <span className="text-[#8B6DFF] font-bold">{scrollPercentage}%</span> COMPLETED
            </span>
          </div>

          {/* CONTINUOUS GPU PROGRESS LINE ACROSS BOTTOM */}
          <div className="w-full sm:w-64 bg-white/10 h-1 rounded-full overflow-hidden my-1 sm:my-0">
            <motion.div
              className="bg-[#8B6DFF] h-full origin-left shadow-[0_0_8px_#8B6DFF]"
              style={{ scaleX: smoothProgress }}
            />
          </div>

          <div className="text-right text-white/70 tracking-wider uppercase font-mono w-full sm:w-auto">
            {activeStageIndex === STAGES.length - 1 ? (
              <span className="text-[#8B6DFF] font-bold animate-pulse">CONTINUE SCROLLING FOR SELECTED WORK ↓</span>
            ) : (
              <span>SCROLL DOWN OR CLICK TIMELINE TO ADVANCE</span>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
