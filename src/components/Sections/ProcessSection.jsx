import React, { useState, useEffect, useRef } from 'react';
import { Search, Target, Layout, Code2, Rocket, ShieldCheck, RefreshCw, ArrowRight } from 'lucide-react';

const STAGES = [
  {
    id: "01",
    name: "DISCOVER",
    icon: Search,
    shortDesc: "Understand the problem before deciding what to build.",
    purpose: "Understand the actual problem before deciding what to build.",
    focus: "User needs · Business requirements · Constraints",
    activities: ["Research", "User interviews", "Problem analysis", "Requirement gathering", "Constraint identification"],
    output: "CLEAR PROBLEM DEFINITION"
  },
  {
    id: "02",
    name: "DEFINE",
    icon: Target,
    shortDesc: "Define scope and technical requirements.",
    purpose: "Turn research into a clear product and technical direction.",
    focus: "Requirements · Scope · Architecture · Priorities",
    activities: ["Define requirements", "Establish project scope", "Prioritize features", "Define technical constraints", "Create project roadmap"],
    output: "DEFINED PROJECT SCOPE"
  },
  {
    id: "03",
    name: "DESIGN",
    icon: Layout,
    shortDesc: "Design experience and system architecture.",
    purpose: "Transform requirements into a usable and scalable experience.",
    focus: "UX · UI · System architecture · Interaction",
    activities: ["Wireframing", "Interface design", "User flows", "Design system", "Architecture planning"],
    output: "VALIDATED DESIGN DIRECTION"
  },
  {
    id: "04",
    name: "BUILD",
    icon: Code2,
    shortDesc: "Build scalable application.",
    purpose: "Transform the approved design into a functional product.",
    focus: "Frontend · Backend · APIs · Integration",
    activities: ["Component development", "API implementation", "Database integration", "Authentication", "System integration"],
    output: "WORKING APPLICATION"
  },
  {
    id: "05",
    name: "DEPLOY",
    icon: Rocket,
    shortDesc: "Deploy to production environment.",
    purpose: "Move the application from development into a production environment.",
    focus: "Infrastructure · Hosting · CI/CD · Configuration",
    activities: ["Production configuration", "Deployment", "Environment setup", "Domain configuration", "Monitoring"],
    output: "PRODUCTION-READY APPLICATION"
  },
  {
    id: "06",
    name: "TEST",
    icon: ShieldCheck,
    shortDesc: "Test, validate & ensure quality.",
    purpose: "Validate functionality, performance and reliability before final delivery.",
    focus: "Quality · Performance · Responsiveness · Security",
    activities: ["Functional testing", "Responsive testing", "Performance testing", "Bug identification", "User validation"],
    output: "STABLE PRODUCT"
  },
  {
    id: "07",
    name: "ITERATE",
    icon: RefreshCw,
    shortDesc: "Improve based on feedback.",
    purpose: "Continuously improve the product using real feedback and performance data.",
    focus: "Feedback · Optimization · Analytics · Improvements",
    activities: ["Collect feedback", "Analyze performance", "Identify improvements", "Optimize experience", "Release iterations"],
    output: "CONTINUOUSLY IMPROVING PRODUCT"
  }
];

export default function ProcessSection() {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const activeStageIndexRef = useRef(0);
  const containerRef = useRef(null);

  // Pure passive native scroll tracking to update active stage 0..6
  useEffect(() => {
    let rafId = null;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      if (totalScrollable <= 0) return;

      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / totalScrollable));
      const stageIdx = Math.min(STAGES.length - 1, Math.floor(progress * STAGES.length));

      if (stageIdx !== activeStageIndexRef.current) {
        activeStageIndexRef.current = stageIdx;
        setActiveStageIndex(stageIdx);
      }
    };

    const onScrollThrottled = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        handleScroll();
        rafId = null;
      });
    };

    window.addEventListener('scroll', onScrollThrottled, { passive: true });
    window.addEventListener('resize', onScrollThrottled, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', onScrollThrottled);
      window.removeEventListener('resize', onScrollThrottled);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Jump to stage on navigation click
  const handleStageClick = (idx) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const containerTop = rect.top + scrollTop;
    const totalScrollable = rect.height - window.innerHeight;
    const targetScroll = containerTop + (idx / (STAGES.length - 0.95)) * totalScrollable;

    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    });
  };

  const activeStage = STAGES[activeStageIndex];
  const IconComponent = activeStage.icon;

  return (
    <section
      id="process"
      ref={containerRef}
      className="relative bg-[#0A0A0A] text-[#F1F0EB] font-mono border-t border-white/10 w-full"
      style={{ height: '320vh' }}
    >
      {/* Sticky Compact Viewport (Fits cleanly within 100vh) */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between p-4 sm:p-6 md:p-10 max-w-7xl mx-auto overflow-hidden select-none">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 pt-2">
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
            <span className="text-[#8B6DFF] font-bold tracking-widest">
              STAGE {activeStage.id} / 07
            </span>
          </div>
        </div>

        {/* Mobile Horizontal Progress Tabs (Visible on small screens) */}
        <div className="flex lg:hidden items-center justify-between gap-1 py-2 border-b border-white/10 overflow-x-auto">
          {STAGES.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => handleStageClick(idx)}
              className={`px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider transition-all shrink-0 ${
                idx === activeStageIndex
                  ? 'bg-[#8B6DFF] text-white font-bold'
                  : 'bg-[#141414] text-[#777777] border border-white/10'
              }`}
            >
              {s.id} {s.name}
            </button>
          ))}
        </div>

        {/* Main 3-Column Interactive Process Viewport (Desktop & Tablet) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-center my-auto w-full py-4">
          
          {/* 1. LEFT: Process Inspector (State-reactive technical details) */}
          <div className="hidden lg:flex lg:col-span-4 flex-col justify-between bg-[#111111] border border-white/15 p-5 xl:p-6 shadow-2xl h-[480px]">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-[10px] text-[#8B6DFF] font-bold tracking-widest uppercase">
                  PROCESS INSPECTOR
                </span>
                <span className="text-[10px] text-[#555555] font-mono">
                  [ {activeStage.id} / 07 ]
                </span>
              </div>

              <div className="space-y-1">
                <div className="text-[9px] text-[#555555] uppercase tracking-widest font-bold">PURPOSE</div>
                <p className="text-xs text-[#E0E0E0] font-sans leading-relaxed">
                  {activeStage.purpose}
                </p>
              </div>

              <div className="space-y-1 pt-1">
                <div className="text-[9px] text-[#555555] uppercase tracking-widest font-bold">FOCUS</div>
                <div className="text-xs text-[#8B6DFF] font-mono font-medium">
                  {activeStage.focus}
                </div>
              </div>

              <div className="space-y-1.5 pt-1">
                <div className="text-[9px] text-[#555555] uppercase tracking-widest font-bold">CORE ACTIVITIES</div>
                <ul className="space-y-1 text-[11px] text-[#A0A0A0] font-mono">
                  {activeStage.activities.map((act, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-[#8B6DFF] rounded-full" />
                      <span>{act}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10">
              <div className="text-[9px] text-[#555555] uppercase tracking-widest font-bold mb-1">KEY DELIVERABLE</div>
              <div className="text-xs text-white font-mono font-bold bg-[#0A0A0A] p-2 border border-white/10">
                {activeStage.output}
              </div>
            </div>
          </div>

          {/* 2. CENTER: Active Process Stage Card (Large & Prominent) */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-[#141414] border-2 border-[#8B6DFF] p-6 sm:p-8 shadow-[0_0_35px_rgba(139,109,255,0.15)] relative overflow-hidden transition-all duration-300 min-h-[360px] lg:h-[480px]">
            {/* Top Tag & Number */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-[10px] text-[#8B6DFF] font-mono font-bold tracking-widest uppercase">
                  ACTIVE STAGE // 0{activeStageIndex + 1}
                </span>
                <IconComponent size={24} className="text-[#8B6DFF]" />
              </div>

              {/* Huge Stage Title */}
              <div className="space-y-2">
                <div className="font-syne text-4xl sm:text-5xl font-extrabold text-white tracking-tight uppercase">
                  {activeStage.id} {activeStage.name}
                </div>
                <p className="font-sans text-sm sm:text-base text-[#D0D0D0] leading-relaxed">
                  {activeStage.shortDesc}
                </p>
              </div>

              {/* Mobile-only Inspector Snippets */}
              <div className="lg:hidden space-y-3 pt-3 border-t border-white/10 text-xs">
                <div>
                  <span className="text-[#555555] text-[10px] uppercase block font-bold">FOCUS</span>
                  <span className="text-[#8B6DFF] font-mono">{activeStage.focus}</span>
                </div>
                <div>
                  <span className="text-[#555555] text-[10px] uppercase block font-bold">DELIVERABLE</span>
                  <span className="text-white font-bold font-mono">{activeStage.output}</span>
                </div>
              </div>
            </div>

            {/* Bottom Meta & Animated Line */}
            <div className="space-y-3 pt-4 border-t border-white/10 hidden sm:block">
              <div className="flex items-center justify-between text-xs font-mono text-[#888888]">
                <span>{activeStage.focus}</span>
                <span className="text-[#8B6DFF] font-bold">{activeStage.output}</span>
              </div>
              <div className="w-full bg-[#222222] h-[2px] overflow-hidden">
                <div
                  className="bg-[#8B6DFF] h-full transition-all duration-300 ease-out"
                  style={{ width: `${((activeStageIndex + 1) / STAGES.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* 3. RIGHT: Compact Vertical Stage Navigation */}
          <div className="hidden lg:flex lg:col-span-3 flex-col justify-center space-y-2.5 pl-4 border-l border-white/10 h-[480px]">
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
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-white/10 pt-3 text-[10px] sm:text-xs text-[#555555]">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8B6DFF]" />
            <span className="tracking-widest uppercase">
              SCROLL-DRIVEN ARCHITECTURE // CONTINUOUS NATIVE PROGRESSION
            </span>
          </div>

          <div className="text-right text-[#888888] tracking-wider uppercase font-mono">
            {activeStageIndex === STAGES.length - 1 ? 'READY TO PROCEED →' : 'SCROLL TO EXPLORE NEXT STAGE ↓'}
          </div>
        </div>

      </div>
    </section>
  );
}
