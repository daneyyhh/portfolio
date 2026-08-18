import React, { useState, useEffect, useRef } from 'react';
import { Search, Target, Layout, Code2, Rocket, ShieldCheck, RefreshCw, CheckCircle2 } from 'lucide-react';

export default function ProcessSection() {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const stageRefs = useRef([]);

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

  // IntersectionObserver / Viewport Center Passive Detection — ZERO Wheel Hijacking, ZERO Per-Frame Stutter!
  useEffect(() => {
    const handleScroll = () => {
      const viewportCenter = window.innerHeight / 2;
      let closestIdx = 0;
      let minDistance = Infinity;

      stageRefs.current.forEach((el, idx) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const elementCenter = rect.top + rect.height / 2;
        const distance = Math.abs(elementCenter - viewportCenter);

        if (distance < minDistance) {
          minDistance = distance;
          closestIdx = idx;
        }
      });

      setActiveStageIndex(closestIdx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeStage = stages[activeStageIndex] || stages[0];

  return (
    <section
      id="process"
      className="py-28 px-6 md:px-12 bg-[#0A0A0A] text-[#F1F0EB] border-t border-white/10 font-mono relative"
    >
      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
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

        {/* 3-Column Workspace: LEFT Process Inspector (Sticky), CENTER Sequential Stages (Spacious), RIGHT Timeline Rail (Sticky) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">
          
          {/* LEFT COLUMN: STICKY PROCESS INSPECTOR SPECIFICATION PANEL */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 bg-[#111111] border border-white/10 p-6 md:p-7 space-y-5 shadow-2xl rounded-none">
            
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

          {/* CENTER COLUMN: 7 SEQUENTIAL RECTANGULAR PROCESS STAGE PANELS WITH GENEROUS VERTICAL SPACING */}
          <div className="lg:col-span-5 space-y-16 py-4">
            {stages.map((stg, idx) => {
              const Icon = stg.icon;
              const isActive = activeStageIndex === idx;

              return (
                <div
                  key={stg.id}
                  ref={(el) => (stageRefs.current[idx] = el)}
                  className={`p-6 border rounded-none flex flex-col gap-4 transition-all duration-300 ${
                    isActive
                      ? 'bg-[#8B6DFF]/10 border-[#8B6DFF] shadow-[0_0_20px_rgba(139,109,255,0.25)] scale-[1.02]'
                      : 'bg-[#111111] border-white/10 opacity-70'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className={`font-mono text-base font-extrabold ${isActive ? 'text-[#8B6DFF]' : 'text-[#555555]'}`}>
                        {stg.id}
                      </span>
                      <Icon size={20} className={isActive ? 'text-[#8B6DFF]' : 'text-[#555555]'} />
                      <h4 className={`font-syne font-extrabold text-lg uppercase tracking-wider ${isActive ? 'text-white' : 'text-[#E4E2DC]'}`}>
                        {stg.name}
                      </h4>
                    </div>
                  </div>

                  <p className="font-sans text-xs md:text-sm text-[#E4E2DC] leading-relaxed">
                    {stg.purpose}
                  </p>

                  <div className="pt-3 border-t border-white/10 flex justify-between items-center text-xs font-mono">
                    <span className="text-[#8B6DFF] font-bold">
                      FOCUS: {stg.focus.split('·')[0]}
                    </span>
                    <span className="text-[#555555]">
                      STAGE 0{idx + 1}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT COLUMN: STICKY VERTICAL ENGINEERING PROGRESS RAIL */}
          <div className="lg:col-span-3 hidden lg:flex lg:sticky lg:top-28 flex-col justify-between items-start h-[420px] pl-8 relative font-mono text-xs border-l border-white/10">
            
            {/* Stage Nodes & Aligned Stage Names */}
            <div className="space-y-6 font-mono w-full">
              {stages.map((s, i) => {
                const isActive = activeStageIndex === i;

                return (
                  <div key={s.id} className="flex items-center gap-3">
                    {/* Precision Node Marker */}
                    <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center -ml-[33px] bg-[#0A0A0A] border transition-all ${
                      isActive ? 'border-[#8B6DFF] scale-110' : 'border-white/20'
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#8B6DFF]' : 'bg-[#555555]'}`} />
                    </div>

                    {/* Stage Label */}
                    <div className="text-xs uppercase font-bold tracking-wider">
                      <span className={isActive ? 'text-[#8B6DFF] mr-2' : 'text-[#555555] mr-2'}>{s.id}</span>
                      <span className={isActive ? 'text-[#F1F0EB]' : 'text-[#555555]'}>{s.name}</span>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
