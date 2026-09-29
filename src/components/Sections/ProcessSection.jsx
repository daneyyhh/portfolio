import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Target, 
  Layout, 
  Code2, 
  Rocket, 
  ShieldCheck, 
  RefreshCw, 
  CheckCircle2, 
  ArrowRight, 
  ArrowDown, 
  Repeat 
} from 'lucide-react';

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
    deliverable: "Validated Problem Definition",
    bgTint: "bg-[#09090C]"
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
    deliverable: "Defined System & Product Scope",
    bgTint: "bg-[#0C0C10]"
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
    deliverable: "Validated Design System",
    bgTint: "bg-[#0A0A0E]"
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
    deliverable: "Production-Grade Application",
    bgTint: "bg-[#0E0E14]"
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
    deliverable: "Live Production Release",
    bgTint: "bg-[#0A0A0D]"
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
    deliverable: "Hardened & Stable Product",
    bgTint: "bg-[#0C0C10]"
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
    deliverable: "Continuously Evolving Platform",
    bgTint: "bg-[#08080B]"
  }
];

export default function ProcessSection() {
  const containerRef = useRef(null);

  // Smooth scroll to a specific sticky slide
  const scrollToStage = (stageIndex) => {
    const section = document.getElementById('process');
    if (!section) return;

    // Calculate exact scroll coordinate for the target slide
    const sectionTop = section.offsetTop;
    const targetY = sectionTop + stageIndex * window.innerHeight;

    if (window.__lenis) {
      window.__lenis.scrollTo(targetY, {
        duration: 0.85,
        easing: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
      });
    } else {
      window.scrollTo({
        top: targetY,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section
      id="process"
      ref={containerRef}
      className="relative w-full bg-[#08080A] text-[#F1F0EB] font-mono selection:bg-[#FF1E27] selection:text-white"
    >
      {/* 7 STICKY FULL PAGE SLIDES */}
      {STAGES.map((stage, idx) => {
        const Icon = stage.icon;
        const isFirst = idx === 0;
        const isLast = idx === STAGES.length - 1;

        return (
          <div
            key={stage.id}
            id={`process-stage-${stage.id}`}
            style={{
              zIndex: idx + 10,
            }}
            className={`sticky top-0 h-screen w-full ${stage.bgTint} border-t border-white/10 shadow-[0_-25px_60px_rgba(0,0,0,0.95)] pt-20 sm:pt-22 md:pt-24 pb-5 sm:pb-7 px-4 sm:px-8 md:px-14 flex flex-col justify-between overflow-y-auto lg:overflow-hidden select-none`}
          >
            {/* Massive Architectural Stage Number Watermark */}
            <span
              className="absolute right-4 sm:right-10 bottom-2 sm:bottom-6 font-syne font-black text-[30vw] sm:text-[22vw] text-white/[0.03] select-none pointer-events-none leading-none z-0"
              aria-hidden="true"
            >
              {stage.id}
            </span>

            {/* Ambient Red Accent Glow */}
            <div className="absolute top-0 left-1/4 w-1/2 h-36 bg-gradient-to-b from-[#FF1E27]/10 to-transparent blur-3xl pointer-events-none" />

            {/* ─────────────────────────────────────────────────────────
                TOP PROTOCOL HEADER & STAGE TRACKER
            ───────────────────────────────────────────────────────── */}
            <header className="relative z-10 max-w-7xl mx-auto w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3 shrink-0">
              {/* Left Protocol Title */}
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF1E27] opacity-80" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF1E27]" />
                </span>
                <span className="text-xs font-mono text-[#FF1E27] tracking-widest uppercase font-bold">
                  03 // PROCESS LIFECYCLE
                </span>
                <span className="text-white/20 hidden md:inline">•</span>
                <span className="text-white/60 text-xs tracking-wider uppercase hidden md:inline">
                  STICKY FULL PAGE STAGES
                </span>
              </div>

              {/* Center / Right: Interactive Stage Stepper */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                {STAGES.map((s, i) => {
                  const isActive = i === idx;
                  const isPassed = i < idx;

                  return (
                    <button
                      key={s.id}
                      onClick={() => scrollToStage(i)}
                      className={`group flex items-center gap-1 px-2 sm:px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider rounded-sm transition-all duration-300 cursor-pointer ${
                        isActive
                          ? 'bg-[#FF1E27] text-white font-bold shadow-[0_0_12px_rgba(255,30,39,0.6)]'
                          : isPassed
                          ? 'bg-white/10 text-white/70 hover:bg-white/20'
                          : 'bg-white/5 text-white/30 hover:bg-white/10'
                      }`}
                      title={`Jump to Stage ${s.id}: ${s.name}`}
                      aria-label={`Jump to Stage ${s.id}: ${s.name}`}
                    >
                      <span>{s.id}</span>
                      <span className="hidden md:inline">{s.name}</span>
                    </button>
                  );
                })}

                <span className="text-xs font-mono font-bold text-[#FF1E27] bg-[#FF1E27]/10 px-2 py-0.5 border border-[#FF1E27]/30 ml-1">
                  {stage.id}/07
                </span>
              </div>
            </header>

            {/* ─────────────────────────────────────────────────────────
                MAIN FULL-SCREEN SLIDE BODY (2-COLUMN ARCHITECTURE)
            ───────────────────────────────────────────────────────── */}
            <main className="relative z-10 max-w-7xl mx-auto w-full flex-1 my-auto py-4 sm:py-6 flex items-center">
              <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                
                {/* LEFT COLUMN: Hero Stage Title & Philosophy */}
                <div className="lg:col-span-7 space-y-5 sm:space-y-6">
                  {/* Stage Tag */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-sm bg-[#FF1E27]/15 border border-[#FF1E27]/40 flex items-center justify-center text-[#FF1E27] shadow-[0_0_14px_rgba(255,30,39,0.3)]">
                      <Icon size={20} />
                    </div>
                    <div>
                      <span className="text-[11px] text-[#FF1E27] font-mono font-bold tracking-widest block uppercase">
                        STAGE {stage.id} // 07
                      </span>
                      <span className="text-xs text-white/60 uppercase font-mono tracking-wider font-semibold">
                        LIFECYCLE SLIDE
                      </span>
                    </div>
                  </div>

                  {/* Stage Name Headline */}
                  <div className="space-y-2">
                    <h2 className="font-syne font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white uppercase leading-[0.9]">
                      {stage.name}
                    </h2>
                    <p className="font-sans text-base sm:text-xl md:text-2xl text-stone-200 font-semibold leading-snug pt-1">
                      "{stage.headline}"
                    </p>
                  </div>

                  {/* Description Detail */}
                  <p className="font-sans text-xs sm:text-sm md:text-base text-stone-400 leading-relaxed max-w-xl">
                    {stage.detail}
                  </p>

                  {/* Core Focus Badges */}
                  <div className="pt-2 space-y-2">
                    <span className="text-[10px] text-white/40 uppercase tracking-widest font-mono font-bold block">
                      CORE FOCUS CRITERIA:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {stage.focus.split('•').map((item, i) => (
                        <span
                          key={i}
                          className="text-xs font-mono font-medium text-[#FF1E27] bg-[#FF1E27]/10 px-3 py-1 border border-[#FF1E27]/30 tracking-wide"
                        >
                          {item.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* RIGHT COLUMN: Technical Spec Card */}
                <div className="lg:col-span-5">
                  <div className="bg-[#121218]/95 border border-white/10 border-t-2 border-t-[#FF1E27] p-6 sm:p-8 space-y-6 shadow-2xl relative">
                    
                    {/* Card Header */}
                    <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono">
                      <span className="text-[10px] text-[#FF1E27] font-bold tracking-widest uppercase flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF1E27]" />
                        STAGE SPECIFICATION
                      </span>
                      <span className="text-[10px] text-white/40">
                        [ {stage.id} / 07 ]
                      </span>
                    </div>

                    {/* Supporting Activities */}
                    <div className="space-y-2.5">
                      <span className="text-[10px] text-white/40 uppercase tracking-widest font-mono font-bold block">
                        SUPPORTING ACTIVITIES & METHODS
                      </span>
                      <ul className="space-y-2 text-xs text-stone-300 font-mono">
                        {stage.activities.map((act, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <CheckCircle2 size={14} className="text-[#FF1E27] shrink-0 mt-0.5" />
                            <span className="leading-snug">{act}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Key Deliverable Box */}
                    <div className="pt-4 border-t border-white/10 space-y-1.5 font-mono">
                      <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold block">
                        KEY DELIVERABLE ARTIFACT:
                      </span>
                      <div className="bg-[#08080C] px-3.5 py-2.5 border border-white/10 flex items-center justify-between">
                        <span className="text-xs text-white font-bold truncate">
                          {stage.deliverable}
                        </span>
                        <span className="text-[#FF1E27] text-[10px] font-bold ml-2 shrink-0">
                          ✓ VERIFIED
                        </span>
                      </div>
                    </div>

                    {/* Iterate Indicator if Stage 07 */}
                    {stage.id === "07" && (
                      <div className="p-2.5 bg-[#FF1E27]/10 border border-[#FF1E27]/30 flex items-center gap-2 text-xs text-[#FF1E27] font-mono font-bold">
                        <Repeat size={14} className="animate-spin text-[#FF1E27]" style={{ animationDuration: '6s' }} />
                        <span>CONTINUOUS FEEDBACK & DEPLOYMENT LOOP</span>
                      </div>
                    )}

                  </div>
                </div>

              </div>
            </main>

            {/* ─────────────────────────────────────────────────────────
                BOTTOM STATUS BAR
            ───────────────────────────────────────────────────────── */}
            <footer className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between border-t border-white/10 pt-3 shrink-0 font-mono text-[10px] sm:text-xs text-white/40">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF1E27]" />
                <span className="tracking-widest uppercase">
                  PROCESS STAGE {stage.id} // {stage.name}
                </span>
              </div>

              {/* Scroll Directional Prompt */}
              <div className="flex items-center gap-2 text-right">
                {isLast ? (
                  <span className="text-[#FF1E27] font-bold flex items-center gap-1.5 uppercase tracking-wider animate-pulse">
                    <span>CONTINUE SCROLLING FOR SELECTED WORK</span>
                    <ArrowRight size={13} />
                  </span>
                ) : (
                  <button
                    onClick={() => scrollToStage(idx + 1)}
                    className="flex items-center gap-1.5 text-stone-300 hover:text-[#FF1E27] uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    <span>SCROLL DOWN FOR NEXT STAGE ({STAGES[idx + 1].name})</span>
                    <ArrowDown size={13} className="text-[#FF1E27] animate-bounce" />
                  </button>
                )}
              </div>
            </footer>

          </div>
        );
      })}
    </section>
  );
}
