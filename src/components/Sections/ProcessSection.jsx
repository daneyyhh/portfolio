import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Target, Layout, Code2, Rocket, ShieldCheck, RefreshCw, ArrowRight, Activity, CheckCircle2 } from 'lucide-react';

export default function ProcessSection() {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const ballRef = useRef(null);
  const progressPercentRef = useRef(null);
  const stageNumRef = useRef(null);

  const stages = [
    {
      id: "01",
      name: "DISCOVER",
      icon: Search,
      desc: "Understand the problem, users and business context before deciding what to build.",
      deliverables: ["USER RESEARCH", "PROBLEM ANALYSIS", "COMPETITOR RESEARCH", "GOAL ALIGNMENT"],
      output: "Clear problem statement + project direction.",
      codeSnippet: "// 01. DISCOVER PHASE\nconst discovery = {\n  research: 'user interviews',\n  problem: 'defined',\n  roadmap: 'aligned'\n};"
    },
    {
      id: "02",
      name: "DEFINE",
      icon: Target,
      desc: "Turn research into a clear product scope and technical plan.",
      deliverables: ["REQUIREMENTS", "USER FLOWS", "INFORMATION ARCHITECTURE", "FEATURE PRIORITIZATION", "TECHNICAL PLANNING"],
      output: "Defined scope + technical roadmap.",
      codeSnippet: "// 02. DEFINE PHASE\nconst scope = {\n  architecture: 'modular',\n  userFlows: 'mapped',\n  stack: 'React / Node / Postgres'\n};"
    },
    {
      id: "03",
      name: "DESIGN",
      icon: Layout,
      desc: "Create an intuitive visual system and experience before development begins.",
      deliverables: ["WIREFRAMES", "UI / UX", "DESIGN SYSTEM", "RESPONSIVE DESIGN", "PROTOTYPING"],
      output: "Validated interface + design system.",
      codeSnippet: "// 03. DESIGN PHASE\nconst designSystem = {\n  palette: ['#F1F0EB', '#0A0A0A', '#8B6DFF'],\n  typography: 'Syne & JetBrains Mono'\n};"
    },
    {
      id: "04",
      name: "BUILD",
      icon: Code2,
      desc: "Transform the validated design into scalable production-ready software.",
      deliverables: ["FRONTEND", "BACKEND", "DATABASE", "API INTEGRATION", "3D / INTERACTION"],
      output: "Working application.",
      codeSnippet: "// 04. BUILD PHASE\nconst app = createFullStackApp({\n  frontend: 'React / Next.js',\n  backend: 'Node.js / Express',\n  db: 'PostgreSQL'\n});"
    },
    {
      id: "05",
      name: "DEPLOY",
      icon: Rocket,
      desc: "Move the application from development into a reliable production environment.",
      deliverables: ["PRODUCTION SETUP", "CI/CD", "HOSTING", "ENVIRONMENT CONFIGURATION", "MONITORING"],
      output: "Live production application.",
      codeSnippet: "# 05. DEPLOY PHASE\n$ git push origin main\n-> GitHub Actions -> Vercel Production Build\n-> [200 OK Live on reubg.in]"
    },
    {
      id: "06",
      name: "TEST",
      icon: ShieldCheck,
      desc: "Validate functionality, performance, responsiveness and security.",
      deliverables: ["FUNCTIONAL TESTING", "RESPONSIVE TESTING", "PERFORMANCE", "SECURITY", "USER FEEDBACK"],
      output: "Stable and validated product.",
      codeSnippet: "// 06. TEST PHASE\nrunTestSuite({\n  functional: 'passed',\n  lighthouse: 98,\n  security: 'passed'\n});"
    },
    {
      id: "07",
      name: "ITERATE",
      icon: RefreshCw,
      desc: "Continuously improve the product using real-world data and feedback.",
      deliverables: ["ANALYTICS", "FEEDBACK", "BUG FIXES", "FEATURE IMPROVEMENTS", "OPTIMIZATION"],
      output: "Continuous product improvement.",
      codeSnippet: "// 07. ITERATE PHASE\nconst cycle = {\n  analytics: 'monitored',\n  optimization: 'ongoing',\n  feedback: 'integrated'\n};"
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

      // 1. Direct GPU Transform Updates for 3D Stack Cards
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

      // 2. Direct DOM update for vertical progress indicator ball & text
      if (ballRef.current) {
        ballRef.current.style.top = `${(floatProgress / 6) * 100}%`;
      }
      if (progressPercentRef.current) {
        progressPercentRef.current.innerText = `${Math.round(normalizedRatio * 100)}%`;
      }

      // 3. Update React active stage index ONLY when discrete index changes!
      const discreteIdx = Math.min(6, Math.max(0, Math.round(floatProgress)));
      if (discreteIdx !== lastActiveIdx) {
        lastActiveIdx = discreteIdx;
        setActiveStageIndex(discreteIdx);
        if (stageNumRef.current) {
          stageNumRef.current.innerText = `0${discreteIdx + 1}/07`;
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
    updateScrollAnimation(); // Initial setup

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
      <div className="sticky top-0 h-screen flex flex-col justify-between p-6 md:p-12 overflow-hidden z-10">
        
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
            "A structured approach that turns ideas into powerful, scalable solutions."
          </div>
        </div>

        {/* Main Viewport Content Workspace */}
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto py-2 flex-1 relative">
          
          {/* Left Column: Topic Info & Process Inspector */}
          <div className="lg:col-span-5 space-y-5">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="font-mono text-4xl font-extrabold text-[#8B6DFF]">
                  {activeStage.id}
                </span>
                <div>
                  <h3 className="font-syne text-2xl md:text-3xl font-extrabold text-white uppercase tracking-tight">
                    {activeStage.name}
                  </h3>
                  <div className="text-xs font-mono text-[#8B6DFF] uppercase tracking-widest">
                    STAGE 0{activeStageIndex + 1} OF 07
                  </div>
                </div>
              </div>

              <p className="font-sans text-slate-300 text-xs md:text-sm leading-relaxed">
                "{activeStage.desc}"
              </p>
            </div>

            {/* Key Deliverables & Scope */}
            <div className="space-y-2 pt-2 border-t border-white/10">
              <div className="text-[11px] font-mono text-[#8B6DFF] font-bold uppercase tracking-widest flex items-center gap-2">
                <Activity size={13} className="animate-spin" />
                <span>KEY DELIVERABLES & SCOPE:</span>
              </div>

              <div className="flex flex-wrap gap-1.5 text-[11px] font-mono">
                {activeStage.deliverables.map((deliv, idx) => (
                  <span key={idx} className="bg-[#141414] border border-white/15 text-white px-2.5 py-1 font-bold flex items-center gap-1.5">
                    <CheckCircle2 size={12} className="text-[#8B6DFF]" />
                    <span>{deliv}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Expected Stage Output */}
            <div className="bg-[#141414] border border-[#8B6DFF]/30 p-3 text-xs text-[#8B6DFF]">
              <div className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">STAGE OUTPUT:</div>
              <div className="text-white font-bold text-xs">{activeStage.output}</div>
            </div>

            {/* Process Inspector Panel */}
            <div className="bg-[#141414] border border-white/10 p-3 text-xs text-[#8B6DFF] rounded-none">
              <div className="flex justify-between items-center text-[10px] text-slate-400 border-b border-white/10 pb-1 mb-1.5">
                <span>PROCESS INSPECTOR // STAGE {activeStage.id}</span>
                <span className="text-[#8B6DFF] uppercase font-bold">{activeStage.name}</span>
              </div>
              <pre className="text-slate-200 text-[11px] leading-relaxed overflow-x-auto">
                <code>{activeStage.codeSnippet}</code>
              </pre>
            </div>
          </div>

          {/* Center Column: HERO 3D Physical Process Layer Stack */}
          <div className="lg:col-span-6 relative flex flex-col items-center justify-center min-h-[400px] py-2 [perspective:1000px]">
            
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
                      {stg.deliverables.slice(0, 2).join(' • ')}
                    </span>
                    <div className="w-2 h-2 rounded-full bg-[#8B6DFF]" />
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Vertical Scroll Progress Line Indicator (01 -> 07) */}
          <div className="lg:col-span-1 hidden lg:flex flex-col items-center justify-center h-full relative py-6">
            <div className="w-[2px] h-60 bg-white/10 relative flex flex-col justify-between items-center py-2">
              
              {/* Floating Active Ball moving directly via DOM ref */}
              <div
                ref={ballRef}
                className="absolute w-3 h-3 rounded-full bg-[#8B6DFF] -translate-x-[5px] -translate-y-1.5 shadow-[0_0_12px_#8B6DFF]"
              />

              {stages.map((s, i) => (
                <div
                  key={s.id}
                  className={`w-1.5 h-1.5 rounded-full z-10 transition-colors ${
                    activeStageIndex === i ? 'bg-[#8B6DFF]' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>

            <div ref={stageNumRef} className="mt-3 font-mono text-[10px] text-[#8B6DFF] font-bold">
              01/07
            </div>
          </div>

        </div>

        {/* Bottom Status Bar */}
        <div className="max-w-7xl mx-auto w-full border-t border-white/10 pt-3 flex justify-between items-center text-xs text-slate-400 font-mono shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#8B6DFF] animate-pulse"></span>
            <span>CINEMATIC PROCESS ENGINE // STAGE 0{activeStageIndex + 1} OF 07 ACTIVE</span>
          </div>
          <div>SCROLL PROGRESS: <span ref={progressPercentRef}>0%</span></div>
        </div>

      </div>
    </section>
  );
}
