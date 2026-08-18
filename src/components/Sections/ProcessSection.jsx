import React, { useState, useEffect, useRef } from 'react';
import { Search, Target, Layout, Code2, Rocket, ShieldCheck, RefreshCw, Activity, CheckCircle2 } from 'lucide-react';

export default function ProcessSection() {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const progressLineRef = useRef(null);
  const progressPercentRef = useRef(null);
  const counterActiveRef = useRef(null);

  const stages = [
    {
      id: "01",
      name: "DISCOVER",
      icon: Search,
      purpose: "Understand the problem before deciding what to build.",
      focus: "User needs · Business requirements · Constraints",
      activities: ["User research", "Problem analysis", "Competitor research", "Goal definition"],
      output: "Clear problem statement + project direction"
    },
    {
      id: "02",
      name: "DEFINE",
      icon: Target,
      purpose: "Turn research into a structured product and technical scope.",
      focus: "Requirements · User flows · Features · Architecture",
      activities: ["Requirement mapping", "Feature prioritization", "Information architecture", "Technical planning"],
      output: "Defined scope + technical roadmap"
    },
    {
      id: "03",
      name: "DESIGN",
      icon: Layout,
      purpose: "Design the experience and system before production development.",
      focus: "UI / UX · Interaction · Design system · Responsiveness",
      activities: ["Wireframes", "UI design", "Design system", "Prototyping", "Responsive layouts"],
      output: "Validated interface + design system"
    },
    {
      id: "04",
      name: "BUILD",
      icon: Code2,
      purpose: "Transform the validated design into a functional, scalable application.",
      focus: "Frontend · Backend · Database · APIs · 3D",
      activities: ["Frontend implementation", "Backend development", "API integration", "Database integration", "Interactive / 3D development"],
      output: "Working application"
    },
    {
      id: "05",
      name: "DEPLOY",
      icon: Rocket,
      purpose: "Move the application from development into a reliable production environment.",
      focus: "Infrastructure · Hosting · CI/CD · Production",
      activities: ["Environment configuration", "Build pipeline", "Deployment", "Production configuration", "Monitoring"],
      output: "Live production system"
    },
    {
      id: "06",
      name: "TEST",
      icon: ShieldCheck,
      purpose: "Validate functionality, performance and reliability before final delivery.",
      focus: "Quality · Performance · Responsiveness · Security",
      activities: ["Functional testing", "Responsive testing", "Performance testing", "Bug identification", "User validation"],
      output: "Stable production-ready product"
    },
    {
      id: "07",
      name: "ITERATE",
      icon: RefreshCw,
      purpose: "Continuously improve the product using real-world feedback and data.",
      focus: "Analytics · Feedback · Optimization · Growth",
      activities: ["Analyze usage", "Collect feedback", "Fix issues", "Optimize performance", "Improve features"],
      output: "Continuous product improvement"
    }
  ];

  // Native Scroll Handler with GPU-accelerated Direct DOM Mutations (Zero React re-render stutter)
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

      // 1. Direct GPU Transform Updates for Center 3D Stack Cards
      cardRefs.current.forEach((cardEl, idx) => {
        if (!cardEl) return;
        const offset = idx - floatProgress;
        const absOffset = Math.abs(offset);

        const translateZ = 60 - absOffset * 65;
        const translateY = offset * 45;
        const scale = Math.max(0.78, 1 - absOffset * 0.07);
        const opacity = Math.max(0.15, 1 - absOffset * 0.4);
        const isPrimary = Math.abs(idx - Math.round(floatProgress)) < 0.5;

        cardEl.style.transform = `translate3d(0px, ${translateY}px, ${translateZ}px) scale(${scale})`;
        cardEl.style.opacity = opacity.toFixed(3);
        
        if (isPrimary) {
          cardEl.style.borderColor = '#8B6DFF';
          cardEl.style.boxShadow = '0 0 25px rgba(139,109,255,0.35)';
        } else {
          cardEl.style.borderColor = 'rgba(255,255,255,0.1)';
          cardEl.style.boxShadow = 'none';
        }
      });

      // 2. Direct DOM Update for Progress Rail fill line & Percent text
      if (progressLineRef.current) {
        progressLineRef.current.style.height = `${normalizedRatio * 100}%`;
      }
      if (progressPercentRef.current) {
        progressPercentRef.current.innerText = `${Math.round(normalizedRatio * 100)}%`;
      }

      // 3. Update React active index ONLY when discrete index changes!
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

  const activeStage = stages[activeStageIndex];

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
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-center my-auto py-2 flex-1 relative">
          
          {/* Left Column: Redesigned PROCESS INSPECTOR Technical Panel */}
          <div className="lg:col-span-5 bg-[#141414] border border-white/15 p-5 md:p-6 space-y-4 shadow-2xl rounded-none">
            
            {/* Inspector Top Bar */}
            <div className="flex justify-between items-center border-b border-white/10 pb-3 text-xs">
              <div className="text-slate-400 font-bold uppercase tracking-widest">
                PROCESS INSPECTOR // STAGE {activeStage.id}
              </div>
              <div className="text-[#8B6DFF] font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#8B6DFF] animate-pulse"></span>
                <span>PROCESS STATUS 0{activeStageIndex + 1} / 07 — {activeStage.name}</span>
              </div>
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
              <div className="flex flex-wrap gap-1.5">
                {activeStage.activities.map((act, i) => (
                  <span key={i} className="bg-[#0A0A0A] border border-white/10 text-slate-200 text-[11px] px-2 py-0.5 font-bold flex items-center gap-1">
                    <CheckCircle2 size={10} className="text-[#8B6DFF]" />
                    <span>{act}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* OUTPUT Section */}
            <div className="pt-2 border-t border-white/10 bg-[#0A0A0A] border border-[#8B6DFF]/30 p-2.5">
              <div className="text-[10px] text-[#8B6DFF] font-bold uppercase tracking-widest">OUTPUT</div>
              <div className="text-white font-bold text-xs uppercase">{activeStage.output}</div>
            </div>

          </div>

          {/* Center Column: 3D Physical Process Layer Stack */}
          <div className="lg:col-span-4 relative flex flex-col items-center justify-center min-h-[380px] py-2 [perspective:1000px]">
            <div className="w-full space-y-1.5 relative [transform-style:preserve-3d]">
              {stages.map((stg, idx) => (
                <div
                  key={stg.id}
                  ref={(el) => (cardRefs.current[idx] = el)}
                  style={{ willChange: 'transform, opacity' }}
                  className="p-3.5 border font-mono rounded-none flex items-center justify-between shadow-2xl bg-[#141414] text-white border-white/10"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-[#8B6DFF]">
                      {stg.id}
                    </span>
                    <div className="font-syne font-extrabold text-xs md:text-sm text-white uppercase tracking-wider">
                      {stg.name}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">
                      0{idx + 1}/07
                    </span>
                    <div className="w-2 h-2 rounded-full bg-[#8B6DFF]" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Redesigned Engineering Progress Rail */}
          <div className="lg:col-span-3 hidden lg:flex flex-col justify-between items-start h-[360px] pl-6 border-l border-white/10 relative font-mono text-xs">
            
            {/* Continuous Vertical Purple Fill Line */}
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-white/10">
              <div
                ref={progressLineRef}
                className="w-full bg-[#8B6DFF] transition-all duration-75 shadow-[0_0_8px_#8B6DFF]"
                style={{ height: '0%' }}
              />
            </div>

            {/* Stage Nodes & Labels */}
            <div className="space-y-4 w-full">
              {stages.map((s, i) => {
                const isActive = activeStageIndex === i;

                return (
                  <div key={s.id} className="flex items-center gap-3">
                    {/* Node Marker */}
                    <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center -ml-[23px] bg-[#0A0A0A] border transition-all ${
                      isActive ? 'border-[#8B6DFF] scale-110' : 'border-white/20'
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#8B6DFF]' : 'bg-slate-600'}`} />
                    </div>

                    {/* Stage Label */}
                    <div className={`text-xs uppercase font-bold tracking-wider transition-colors ${
                      isActive ? 'text-white' : 'text-[#555555]'
                    }`}>
                      <span className={isActive ? 'text-[#8B6DFF] mr-2' : 'text-slate-500 mr-2'}>{s.id}</span>
                      <span>{s.name}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Current Stage Counter */}
            <div className="pt-4 border-t border-white/10 w-full flex items-center gap-1 font-bold">
              <span ref={counterActiveRef} className="text-[#8B6DFF] text-base">01</span>
              <span className="text-[#555555] text-xs">/ 07</span>
            </div>

          </div>

        </div>

        {/* Bottom Status Bar */}
        <div className="max-w-7xl mx-auto w-full border-t border-white/10 pt-3 flex justify-between items-center text-xs text-slate-400 font-mono shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#8B6DFF] animate-pulse"></span>
            <span>ENGINEERING PROCESS // STAGE 0{activeStageIndex + 1} OF 07 ACTIVE</span>
          </div>
          <div>PROGRESS: <span ref={progressPercentRef}>0%</span></div>
        </div>

      </div>
    </section>
  );
}
