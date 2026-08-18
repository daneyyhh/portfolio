import React, { useState, useEffect, useRef } from 'react';
import { Search, Target, Layout, Code2, Rocket, ShieldCheck, RefreshCw, CheckCircle2 } from 'lucide-react';

export default function ProcessSection() {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const fillRailRef = useRef(null);
  const progressPercentRef = useRef(null);
  const counterActiveRef = useRef(null);

  const stages = [
    {
      id: "01",
      name: "DISCOVER",
      icon: Search,
      purpose: "Understand the actual problem before deciding what to build.",
      focus: "User needs · Business requirements · Constraints",
      activities: ["Research", "Problem analysis", "Competitor analysis", "Goal definition"],
      output: "CLEAR PROBLEM STATEMENT"
    },
    {
      id: "02",
      name: "DEFINE",
      icon: Target,
      purpose: "Convert research into a clear product and technical scope.",
      focus: "Requirements · Features · User flows · Architecture",
      activities: ["Requirement mapping", "Feature prioritization", "Information architecture", "Technical planning"],
      output: "DEFINED PROJECT SCOPE"
    },
    {
      id: "03",
      name: "DESIGN",
      icon: Layout,
      purpose: "Design the experience and interface before production development.",
      focus: "UI / UX · Interaction · Design system · Responsiveness",
      activities: ["Wireframes", "Interface design", "Design system", "Prototyping", "Responsive layouts"],
      output: "VALIDATED DESIGN SYSTEM"
    },
    {
      id: "04",
      name: "BUILD",
      icon: Code2,
      purpose: "Transform the design into a functional scalable application.",
      focus: "Frontend · Backend · APIs · Database · 3D",
      activities: ["Frontend development", "Backend development", "API integration", "Database integration", "Interactive development"],
      output: "WORKING APPLICATION"
    },
    {
      id: "05",
      name: "DEPLOY",
      icon: Rocket,
      purpose: "Move the application from development into production.",
      focus: "Infrastructure · Hosting · CI/CD · Monitoring",
      activities: ["Environment setup", "Production build", "Deployment", "Configuration", "Monitoring"],
      output: "LIVE PRODUCTION SYSTEM"
    },
    {
      id: "06",
      name: "TEST",
      icon: ShieldCheck,
      purpose: "Validate functionality, performance and reliability.",
      focus: "Quality · Performance · Responsiveness · Security",
      activities: ["Functional testing", "Responsive testing", "Performance testing", "Bug identification", "User validation"],
      output: "STABLE PRODUCT"
    },
    {
      id: "07",
      name: "ITERATE",
      icon: RefreshCw,
      purpose: "Continuously improve the product using real-world feedback.",
      focus: "Analytics · Feedback · Optimization · Growth",
      activities: ["Analyze usage", "Collect feedback", "Fix issues", "Optimize performance", "Improve features"],
      output: "CONTINUOUS IMPROVEMENT"
    }
  ];

  // Direct GPU Transform updates on native scroll — ZERO React re-renders on scroll frames!
  useEffect(() => {
    let lastActiveIdx = -1;
    let ticking = false;

    const updateScrollAnimation = () => {
      const el = sectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const totalScrollableHeight = rect.height - window.innerHeight;

      if (totalScrollableHeight <= 0) return;

      const currentScroll = Math.max(0, -rect.top);
      const normalizedRatio = Math.min(1, Math.max(0, currentScroll / totalScrollableHeight));
      const floatProgress = normalizedRatio * 6.0;

      // 1. Direct GPU Transform Updates for 3D Layered Process Stack Cards
      if (cardRefs.current && Array.isArray(cardRefs.current)) {
        cardRefs.current.forEach((cardEl, idx) => {
          if (!cardEl) return;
          const offset = idx - floatProgress;
          const absOffset = Math.abs(offset);

          const translateZ = 0 - absOffset * 40;
          const translateY = offset * 32;
          const scale = Math.max(0.82, 1 - absOffset * 0.06);
          const opacity = Math.max(0.18, 1 - absOffset * 0.38);
          const isPrimary = Math.abs(idx - Math.round(floatProgress)) < 0.5;

          cardEl.style.transform = `translate3d(${offset * 12}px, ${translateY}px, ${translateZ}px) scale(${scale})`;
          cardEl.style.opacity = opacity.toFixed(3);
          
          if (isPrimary) {
            cardEl.style.borderColor = '#8B6DFF';
            cardEl.style.boxShadow = '0 0 25px rgba(139,109,255,0.35)';
          } else {
            cardEl.style.borderColor = 'rgba(255,255,255,0.1)';
            cardEl.style.boxShadow = 'none';
          }
        });
      }

      // 2. Direct DOM update for Engineering Progress Rail fill line
      if (fillRailRef.current) {
        fillRailRef.current.style.height = `${normalizedRatio * 100}%`;
      }
      if (progressPercentRef.current) {
        progressPercentRef.current.innerText = `${Math.round(normalizedRatio * 100)}%`;
      }

      // 3. Update React active stage index ONLY when discrete index changes!
      const discreteIdx = Math.min(6, Math.max(0, Math.round(floatProgress)));
      if (discreteIdx !== lastActiveIdx) {
        lastActiveIdx = discreteIdx;
        setActiveStageIndex(discreteIdx);
        if (counterActiveRef.current) {
          counterActiveRef.current.innerText = `0${discreteIdx + 1}`;
        }
      }

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollAnimation);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateScrollAnimation(); // Initial render setup

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const activeStage = stages[activeStageIndex] || stages[0];

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative min-h-[350vh] bg-[#0A0A0A] text-white border-t border-white/10 font-mono"
    >
      {/* Sticky Pinned Viewport Container */}
      <div className="sticky top-0 h-screen flex flex-col justify-between p-6 md:p-10 overflow-hidden z-10">
        
        {/* Section Header */}
        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-4 shrink-0">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#8B6DFF] tracking-widest uppercase mb-1">
              <span className="w-2 h-2 rounded-full bg-[#8B6DFF] animate-pulse"></span>
              <span>ENGINEERING METHODOLOGY // 03</span>
            </div>
            <h2 className="font-syne text-3xl md:text-5xl font-extrabold text-white uppercase tracking-tight">
              MY PROCESS
            </h2>
          </div>

          <div className="text-xs text-slate-400 font-mono hidden sm:block">
            "A structured engineering approach from concept to continuous optimization."
          </div>
        </div>

        {/* Main Viewport Workspace: Left Process Inspector, Center 3D Stack, Right Progress Rail */}
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto py-2 flex-1 relative">
          
          {/* PART 3 PROCESS INSPECTOR SPECIFICATION PANEL */}
          <div className="lg:col-span-5 bg-[#141414] border border-white/15 p-5 md:p-6 space-y-4 shadow-2xl rounded-none">
            
            {/* Inspector Header */}
            <div className="flex justify-between items-center border-b border-white/10 pb-3 text-xs font-bold">
              <span className="text-slate-400 uppercase tracking-widest">PROCESS INSPECTOR</span>
              <span className="text-[#8B6DFF] uppercase tracking-widest">STAGE 0{activeStageIndex + 1} / 07</span>
            </div>

            {/* Stage Title */}
            <div className="space-y-1">
              <h3 className="font-syne text-2xl md:text-3xl font-extrabold text-white uppercase tracking-tight">
                {activeStage.name}
              </h3>
            </div>

            {/* PURPOSE Section */}
            <div className="space-y-1 pt-2 border-t border-white/10">
              <div className="text-[10px] text-[#8B6DFF] font-bold uppercase tracking-widest">PURPOSE</div>
              <p className="font-sans text-xs md:text-sm text-slate-200 leading-relaxed">
                {activeStage.purpose}
              </p>
            </div>

            {/* FOCUS Section */}
            <div className="space-y-1 pt-2 border-t border-white/10">
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">FOCUS</div>
              <div className="text-xs text-white font-mono font-bold">
                {activeStage.focus}
              </div>
            </div>

            {/* ACTIVITIES Section */}
            <div className="space-y-1.5 pt-2 border-t border-white/10">
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">ACTIVITIES</div>
              <div className="space-y-1">
                {activeStage.activities && activeStage.activities.map((act, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-300 font-mono">
                    <span className="text-[#8B6DFF]">○</span>
                    <span>{act}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* OUTPUT Section */}
            <div className="pt-2 border-t border-white/10 bg-[#0A0A0A] border border-[#8B6DFF]/30 p-2.5">
              <div className="text-[10px] text-[#8B6DFF] font-bold uppercase tracking-widest">OUTPUT</div>
              <div className="text-white font-bold text-xs uppercase">{activeStage.output}</div>
            </div>

          </div>

          {/* PART 2 PROCESS STACK (CENTER HERO 3D LAYERED PANELS) */}
          <div className="lg:col-span-4 relative flex flex-col items-center justify-center min-h-[400px] py-2 [perspective:1000px]">
            <div className="w-full space-y-2 relative [transform-style:preserve-3d]">
              {stages.map((stg, idx) => (
                <div
                  key={stg.id}
                  ref={(el) => (cardRefs.current[idx] = el)}
                  style={{ willChange: 'transform, opacity' }}
                  className="p-4 border font-mono rounded-none flex flex-col gap-2 shadow-2xl bg-[#141414] text-white border-white/10"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm font-bold text-[#8B6DFF]">
                        {stg.id}
                      </span>
                      <div className="font-syne font-extrabold text-sm md:text-base text-white uppercase tracking-wider">
                        {stg.name}
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-400">0{idx + 1}/07</span>
                  </div>

                  <p className="font-sans text-xs text-slate-300 leading-snug line-clamp-2">
                    {stg.purpose}
                  </p>

                  <div className="text-[10px] text-[#8B6DFF] font-mono border-t border-white/10 pt-1.5 uppercase font-bold">
                    FOCUS: {stg.focus.split('·')[0]}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* PART 1 REBUILT ENGINEERING PROGRESS RAIL (RIGHT SIDE) */}
          <div className="lg:col-span-3 hidden lg:flex flex-col justify-between items-start h-[360px] pl-6 relative font-mono text-xs">
            
            {/* Base Gray Track */}
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#E4E2DC]/20">
              {/* Continuous Purple Active Progress Fill Line */}
              <div
                ref={fillRailRef}
                className="w-full bg-[#8B6DFF] transition-all duration-75 shadow-[0_0_8px_#8B6DFF]"
                style={{ height: '0%' }}
              />
            </div>

            {/* Stage Nodes & Aligned Stage Names */}
            <div className="space-y-3.5 w-full">
              {stages.map((s, i) => {
                const isActive = activeStageIndex === i;

                return (
                  <div key={s.id} className="flex items-center gap-3">
                    {/* Precision Marker (Outer Ring + Small Solid Center 8-12px) */}
                    <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center -ml-[23px] bg-[#0A0A0A] border transition-all ${
                      isActive ? 'border-[#8B6DFF] scale-110 shadow-[0_0_8px_#8B6DFF]' : 'border-white/20'
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#8B6DFF]' : 'bg-[#555555]'}`} />
                    </div>

                    {/* Stage Label (Number + Name) */}
                    <div className={`text-xs uppercase font-bold tracking-wider transition-colors ${
                      isActive ? 'text-white' : 'text-[#555555]'
                    }`}>
                      <span className={isActive ? 'text-[#8B6DFF] mr-2' : 'text-[#555555] mr-2'}>{s.id}</span>
                      <span>{s.name}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Premium Technical Counter at Bottom of Rail */}
            <div className="pt-4 border-t border-white/10 w-full flex items-center gap-1 font-mono font-bold text-sm">
              <span ref={counterActiveRef} className="text-[#8B6DFF]">01</span>
              <span className="text-[#555555]">/ 07</span>
            </div>

          </div>

        </div>

        {/* Bottom Status Bar */}
        <div className="max-w-7xl mx-auto w-full border-t border-white/10 pt-3 flex justify-between items-center text-xs text-slate-400 font-mono shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#8B6DFF] animate-pulse"></span>
            <span>ENGINEERING PROCESS // STAGE 0{activeStageIndex + 1} OF 07 ACTIVE</span>
          </div>
          <div>SCROLL PROGRESS: <span ref={progressPercentRef}>0%</span></div>
        </div>

      </div>
    </section>
  );
}
