import React, { useState, useEffect, useRef } from 'react';
import { Search, Target, Layout, Code2, Rocket, ShieldCheck, RefreshCw, CheckCircle2 } from 'lucide-react';

export default function ProcessSection() {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const fillRailRef = useRef(null);
  const counterActiveRef = useRef(null);

  const stages = [
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

  // Direct GPU & Style updates on native scroll — ZERO React re-renders on scroll frames!
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

      // 1. Direct Style Updates for Rectangular Process Stack Cards
      if (cardRefs.current && Array.isArray(cardRefs.current)) {
        cardRefs.current.forEach((cardEl, idx) => {
          if (!cardEl) return;
          const isPrimary = Math.abs(idx - Math.round(floatProgress)) < 0.5;

          if (isPrimary) {
            cardEl.style.borderColor = '#8B6DFF';
            cardEl.style.backgroundColor = 'rgba(139, 109, 255, 0.1)';
            cardEl.style.boxShadow = '0 0 15px rgba(139, 109, 255, 0.25)';
          } else {
            cardEl.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            cardEl.style.backgroundColor = '#111111';
            cardEl.style.boxShadow = 'none';
          }
        });
      }

      // 2. Direct DOM update for Vertical Progress Rail fill line
      if (fillRailRef.current) {
        fillRailRef.current.style.height = `${normalizedRatio * 100}%`;
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
      className="relative min-h-[450vh] bg-[#0A0A0A] text-[#F1F0EB] border-t border-white/10 font-mono"
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

          <div className="text-xs text-[#E4E2DC] font-mono hidden sm:block">
            "A structured engineering approach from concept to continuous optimization."
          </div>
        </div>

        {/* 3-Column Workspace: LEFT Process Inspector (col-span-4), CENTER Spacious Rectangular Stack (col-span-5), RIGHT Timeline (col-span-3) */}
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto py-4 flex-1 relative">
          
          {/* LEFT COLUMN: PROCESS INSPECTOR SPECIFICATION PANEL */}
          <div className="lg:col-span-4 bg-[#111111] border border-white/10 p-6 md:p-7 space-y-5 shadow-2xl rounded-none">
            
            {/* Inspector Header */}
            <div className="flex justify-between items-center border-b border-white/10 pb-3 text-xs font-bold">
              <span className="text-[#555555] uppercase tracking-widest">PROCESS INSPECTOR</span>
              <span className="text-[#8B6DFF] uppercase tracking-widest">STAGE 0{activeStageIndex + 1} / 07</span>
            </div>

            {/* Stage Title */}
            <div className="space-y-1">
              <div className="text-[10px] text-[#555555] font-bold uppercase tracking-widest">CURRENT STAGE</div>
              <h3 className="font-syne text-2xl md:text-3xl font-extrabold text-white uppercase tracking-tight">
                {activeStage.name}
              </h3>
            </div>

            {/* PURPOSE Section */}
            <div className="space-y-1 pt-2 border-t border-white/10">
              <div className="text-[10px] text-[#8B6DFF] font-bold uppercase tracking-widest">PURPOSE</div>
              <p className="font-sans text-xs md:text-sm text-[#E4E2DC] leading-relaxed">
                {activeStage.purpose}
              </p>
            </div>

            {/* FOCUS Section */}
            <div className="space-y-1 pt-2 border-t border-white/10">
              <div className="text-[10px] text-[#555555] font-bold uppercase tracking-widest">FOCUS</div>
              <div className="text-xs text-white font-mono font-bold">
                {activeStage.focus}
              </div>
            </div>

            {/* ACTIVITIES Section */}
            <div className="space-y-1.5 pt-2 border-t border-white/10">
              <div className="text-[10px] text-[#555555] font-bold uppercase tracking-widest">ACTIVITIES</div>
              <div className="space-y-1">
                {activeStage.activities && activeStage.activities.map((act, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-[#E4E2DC] font-mono">
                    <span className="text-[#8B6DFF]">•</span>
                    <span>{act}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* OUTPUT Section */}
            <div className="pt-2 border-t border-white/10 bg-[#0A0A0A] border border-[#8B6DFF]/30 p-3">
              <div className="text-[10px] text-[#8B6DFF] font-bold uppercase tracking-widest">OUTPUT</div>
              <div className="text-white font-bold text-xs uppercase">{activeStage.output}</div>
            </div>

          </div>

          {/* CENTER COLUMN: SPACIOUS RECTANGULAR PROCESS STACK (7 FLAT RECTANGULAR PANELS WITH INCREASED VERTICAL SPACING) */}
          <div className="lg:col-span-5 space-y-3 relative flex flex-col justify-center py-2">
            {stages.map((stg, idx) => {
              const Icon = stg.icon;
              const isActive = activeStageIndex === idx;

              return (
                <div
                  key={stg.id}
                  ref={(el) => (cardRefs.current[idx] = el)}
                  className={`p-4 border rounded-none flex items-center justify-between transition-all duration-300 ${
                    isActive
                      ? 'bg-[#8B6DFF]/10 border-[#8B6DFF] shadow-[0_0_15px_rgba(139,109,255,0.25)]'
                      : 'bg-[#111111] border-white/10'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className={`font-mono text-sm font-extrabold ${isActive ? 'text-[#8B6DFF]' : 'text-[#555555]'}`}>
                      {stg.id}
                    </span>
                    <Icon size={18} className={isActive ? 'text-[#8B6DFF]' : 'text-[#555555]'} />
                    <div>
                      <div className={`font-syne font-extrabold text-sm uppercase tracking-wider ${isActive ? 'text-white' : 'text-[#E4E2DC]'}`}>
                        {stg.name}
                      </div>
                      <div className="font-sans text-[11px] text-[#555555] line-clamp-1">
                        {stg.shortDesc}
                      </div>
                    </div>
                  </div>

                  <div className={`font-mono text-xs font-bold ${isActive ? 'text-[#8B6DFF]' : 'text-[#555555]'}`}>
                    0{idx + 1}/07
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT COLUMN: SPACIOUS PROCESS TIMELINE (ENGINEERING PROGRESS RAIL WITH INCREASED VERTICAL SPACING) */}
          <div className="lg:col-span-3 hidden lg:flex flex-col justify-between items-start h-[400px] pl-8 relative font-mono text-xs border-l border-white/10">
            
            {/* Base Continuous Track */}
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#555555]/30">
              {/* Continuous Purple Active Progress Fill Line */}
              <div
                ref={fillRailRef}
                className="w-full bg-[#8B6DFF] transition-all duration-75 shadow-[0_0_8px_#8B6DFF]"
                style={{ height: '0%' }}
              />
            </div>

            {/* Stage Nodes & Aligned Stage Names */}
            <div className="space-y-4 font-mono w-full">
              {stages.map((s, i) => {
                const isActive = activeStageIndex === i;

                return (
                  <div key={s.id} className="flex items-center gap-3">
                    {/* Node Marker (Small Ring + Solid Center) */}
                    <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center -ml-[31px] bg-[#0A0A0A] border transition-all ${
                      isActive ? 'border-[#8B6DFF] scale-110' : 'border-white/20'
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#8B6DFF]' : 'bg-[#555555]'}`} />
                    </div>

                    {/* Stage Label (Number + Name) */}
                    <div className="text-xs uppercase font-bold tracking-wider">
                      <span className={isActive ? 'text-[#8B6DFF] mr-2' : 'text-[#555555] mr-2'}>{s.id}</span>
                      <span className={isActive ? 'text-[#F1F0EB]' : 'text-[#555555]'}>{s.name}</span>
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

      </div>
    </section>
  );
}
