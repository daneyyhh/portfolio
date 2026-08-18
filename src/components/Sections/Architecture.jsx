import React, { useState, useEffect, useRef } from 'react';
import { Layers, Cpu, Server, Database, Cloud, Bot, Box, ArrowRight, Activity, CheckCircle2 } from 'lucide-react';

export default function Architecture() {
  const [activeLayerIndex, setActiveLayerIndex] = useState(0);
  
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const ballRef = useRef(null);
  const progressPercentRef = useRef(null);
  const layerNumRef = useRef(null);

  const layers = [
    {
      id: "01",
      title: "EXPERIENCE",
      subtitle: "UI/UX & INTERACTION",
      icon: Layers,
      description: "The visible layer — where interaction, usability and visual design come together.",
      technologies: ["UI / UX", "Responsive Design", "Accessibility", "Motion"],
      flow: ["USER INTERACTION", "RESPONSIVE CANVAS", "MOTION STATE", "VISUAL FEEDBACK"],
      logos: ["Figma", "Tailwind CSS", "Framer Motion", "Inter Font"],
      codeSnippet: "// 01. EXPERIENCE LAYER\nconst interfaceConfig = {\n  design: 'editorial',\n  responsiveness: 'adaptive',\n  accessibility: 'AAA'\n};"
    },
    {
      id: "02",
      title: "FRONTEND",
      subtitle: "CLIENT-SIDE ARCHITECTURE",
      icon: Cpu,
      description: "The frontend transforms design systems into responsive, interactive interfaces.",
      technologies: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS"],
      flow: ["UI", "COMPONENTS", "STATE", "API"],
      logos: ["React.js", "Next.js", "TypeScript", "JavaScript", "Tailwind"],
      codeSnippet: "// 02. FRONTEND LAYER\nimport React, { useState } from 'react';\nexport function ClientApp({ state }) {\n  return <RenderComponent data={state} />;\n}"
    },
    {
      id: "03",
      title: "BACKEND",
      subtitle: "APPLICATION LOGIC & APIs",
      icon: Server,
      description: "The backend handles business logic, authentication, APIs and communication between services.",
      technologies: ["Node.js", "Express", "Python", "REST API", "JWT Auth"],
      flow: ["CLIENT", "API", "SERVICES", "DATABASE"],
      logos: ["Node.js", "Express", "Python", "REST API", "JWT"],
      codeSnippet: "// 03. BACKEND LAYER\napp.post('/api/v1/session', async (req, res) => {\n  const token = await authService.verify(req.headers.auth);\n  res.json({ status: 200, token });\n});"
    },
    {
      id: "04",
      title: "DATABASE",
      subtitle: "DATA PERSISTENCE & CACHE",
      icon: Database,
      description: "Reliable data architecture designed for consistency, performance and scalability.",
      technologies: ["PostgreSQL", "MongoDB", "Firebase", "Redis"],
      flow: ["APPLICATION", "DATABASE", "CACHE", "DATA"],
      logos: ["PostgreSQL", "MongoDB", "Firebase", "Redis"],
      codeSnippet: "-- 04. DATABASE LAYER\nCREATE TABLE app_sessions (\n  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n  user_id UUID REFERENCES users(id),\n  created_at TIMESTAMPTZ DEFAULT NOW()\n);"
    },
    {
      id: "05",
      title: "INFRASTRUCTURE",
      subtitle: "CLOUD & CI/CD PIPELINE",
      icon: Cloud,
      description: "Production infrastructure that takes the application from code to a reliable live environment.",
      technologies: ["AWS", "Docker", "Vercel", "GitHub", "CI/CD"],
      flow: ["CODE", "BUILD", "DOCKER", "DEPLOY", "MONITOR"],
      logos: ["AWS", "Vercel", "Docker", "GitHub CI"],
      codeSnippet: "# 05. INFRASTRUCTURE LAYER\nFROM node:20-alpine AS builder\nWORKDIR /app\nRUN npm run build\nCMD [\"node\", \"dist/index.js\"]"
    },
    {
      id: "06",
      title: "AI / DATA",
      subtitle: "INTELLIGENT SYSTEMS",
      icon: Bot,
      description: "Intelligent systems that turn application data into useful automation, predictions and experiences.",
      technologies: ["Python", "OpenAI API", "Machine Learning", "Vector Database"],
      flow: ["DATA", "PROCESS", "MODEL", "API", "APPLICATION"],
      logos: ["Python", "OpenAI", "Scikit-Learn", "VectorDB"],
      codeSnippet: "# 06. AI / DATA LAYER\nimport sklearn.ensemble as ensemble\nmodel = ensemble.RandomForestClassifier(n_estimators=100)\nmodel.fit(X_train, y_train)\npreds = model.predict(X_test)"
    },
    {
      id: "07",
      title: "3D / INTERACTION",
      subtitle: "WEBGL GRAPHICS ENGINE",
      icon: Box,
      description: "Immersive experiences powered by real-time rendering, animation and interactive systems.",
      technologies: ["Three.js", "React Three Fiber", "WebGL", "GSAP"],
      flow: ["INPUT", "INTERACTION", "ANIMATION", "3D SCENE", "RENDER"],
      logos: ["Three.js", "WebGL", "GSAP", "R3F"],
      codeSnippet: "// 07. 3D / INTERACTION LAYER\nconst scene = new THREE.Scene();\nconst camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);\nrenderer.render(scene, camera);"
    }
  ];

  // Direct DOM Manipulation on native scroll — NO React re-renders on scroll frames!
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

      // 1. Direct GPU Transform Updates for 3D Stack Cards (Zero React re-render)
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

      // 3. Update React active layer index ONLY when discrete index changes!
      const discreteIdx = Math.min(6, Math.max(0, Math.round(floatProgress)));
      if (discreteIdx !== lastActiveIdx) {
        lastActiveIdx = discreteIdx;
        setActiveLayerIndex(discreteIdx);
        if (layerNumRef.current) {
          layerNumRef.current.innerText = `0${discreteIdx + 1}/07`;
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

  const activeLayer = layers[activeLayerIndex];

  return (
    <section
      id="architecture"
      ref={sectionRef}
      className="relative min-h-[350vh] bg-[#0A0A0A] text-white border-t border-white/10 font-mono"
    >
      {/* Sticky Pinned Viewport Frame */}
      <div className="sticky top-0 h-screen flex flex-col justify-between p-6 md:p-12 overflow-hidden z-10">
        
        {/* Section Header */}
        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-4 shrink-0">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#8B6DFF] tracking-widest uppercase mb-1">
              <span className="w-2 h-2 rounded-full bg-[#8B6DFF] animate-pulse"></span>
              <span>SYSTEM / 01 — NATIVE RESPONSIVE SCROLL</span>
            </div>
            <h2 className="font-syne text-3xl md:text-5xl font-extrabold text-white uppercase tracking-tight">
              LIVE ARCHITECTURE
            </h2>
          </div>

          <div className="text-xs text-slate-400 font-mono hidden sm:block">
            "How the pieces connect behind the experience."
          </div>
        </div>

        {/* Main Viewport Content Workspace */}
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto py-2 flex-1 relative">
          
          {/* Left Column: Topic Info & Code Inspector */}
          <div className="lg:col-span-5 space-y-5">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="font-mono text-4xl font-extrabold text-[#8B6DFF]">
                  {activeLayer.id}
                </span>
                <div>
                  <h3 className="font-syne text-2xl md:text-3xl font-extrabold text-white uppercase tracking-tight">
                    {activeLayer.title}
                  </h3>
                  <div className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                    {activeLayer.subtitle}
                  </div>
                </div>
              </div>

              <p className="font-sans text-slate-300 text-xs md:text-sm leading-relaxed">
                "{activeLayer.description}"
              </p>
            </div>

            {/* System Execution Flow */}
            <div className="space-y-2 pt-2 border-t border-white/10">
              <div className="text-[11px] font-mono text-[#8B6DFF] font-bold uppercase tracking-widest flex items-center gap-2">
                <Activity size={13} className="animate-spin" />
                <span>SYSTEM EXECUTION FLOW:</span>
              </div>

              <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-mono">
                {activeLayer.flow.map((step, idx) => (
                  <React.Fragment key={idx}>
                    <span className="bg-[#141414] border border-white/15 text-white px-2 py-0.5 font-bold">
                      {step}
                    </span>
                    {idx < activeLayer.flow.length - 1 && (
                      <ArrowRight size={12} className="text-[#8B6DFF]" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Recognized Technology Logos & Badges */}
            <div className="space-y-1.5 pt-1">
              <div className="text-[11px] font-mono text-slate-400 uppercase tracking-widest">
                RECOGNIZED TECH STACK:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {activeLayer.logos.map((logo) => (
                  <span
                    key={logo}
                    className="bg-[#141414] border border-[#8B6DFF]/40 text-white font-mono text-xs px-2.5 py-0.5 font-bold flex items-center gap-1.5"
                  >
                    <CheckCircle2 size={12} className="text-[#8B6DFF]" />
                    <span>{logo}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Code Inspector Panel */}
            <div className="bg-[#141414] border border-[#8B6DFF]/30 p-3 text-xs text-[#8B6DFF] rounded-none">
              <div className="flex justify-between items-center text-[10px] text-slate-400 border-b border-white/10 pb-1 mb-1.5">
                <span>INSPECTOR // LAYER {activeLayer.id}</span>
                <span className="text-[#8B6DFF] uppercase font-bold">{activeLayer.title}</span>
              </div>
              <pre className="text-slate-200 text-[11px] leading-relaxed overflow-x-auto">
                <code>{activeLayer.codeSnippet}</code>
              </pre>
            </div>
          </div>

          {/* Center Column: The HERO 3D Physical Architecture Layer Stack */}
          <div className="lg:col-span-6 relative flex flex-col items-center justify-center min-h-[400px] py-2 [perspective:1000px]">
            
            <div className="w-full space-y-1.5 relative [transform-style:preserve-3d]">
              {layers.map((layer, idx) => (
                <div
                  key={layer.id}
                  ref={(el) => (cardRefs.current[idx] = el)}
                  style={{ willChange: 'transform, opacity' }}
                  className="p-3.5 border font-mono rounded-none flex items-center justify-between shadow-2xl bg-[#141414] text-white border-white/10"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-[#8B6DFF]">
                      {layer.id}
                    </span>
                    <div className="font-syne font-extrabold text-xs md:text-sm text-white uppercase tracking-wider">
                      {layer.title}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">
                      {layer.technologies.slice(0, 3).join(' • ')}
                    </span>
                    <div className="w-2 h-2 rounded-full bg-[#8B6DFF]" />
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Continuous Vertical Progress Line Indicator (01 -> 07) */}
          <div className="lg:col-span-1 hidden lg:flex flex-col items-center justify-center h-full relative py-6">
            <div className="w-[2px] h-60 bg-white/10 relative flex flex-col justify-between items-center py-2">
              
              {/* Floating Active Ball moving directly via DOM ref */}
              <div
                ref={ballRef}
                className="absolute w-3 h-3 rounded-full bg-[#8B6DFF] -translate-x-[5px] -translate-y-1.5 shadow-[0_0_12px_#8B6DFF]"
              />

              {layers.map((l, i) => (
                <div
                  key={l.id}
                  className={`w-1.5 h-1.5 rounded-full z-10 transition-colors ${
                    activeLayerIndex === i ? 'bg-[#8B6DFF]' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>

            <div ref={layerNumRef} className="mt-3 font-mono text-[10px] text-[#8B6DFF] font-bold">
              01/07
            </div>
          </div>

        </div>

        {/* Bottom Status Bar */}
        <div className="max-w-7xl mx-auto w-full border-t border-white/10 pt-3 flex justify-between items-center text-xs text-slate-400 font-mono shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#8B6DFF] animate-pulse"></span>
            <span>NATIVE SCROLL ARCHITECTURE // LAYER 0{activeLayerIndex + 1} OF 07 ACTIVE</span>
          </div>
          <div>SCROLL POSITION: <span ref={progressPercentRef}>0%</span></div>
        </div>

      </div>
    </section>
  );
}
