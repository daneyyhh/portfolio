import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Layers, Cpu, Server, Database, Cloud, Bot, Box, ArrowRight, Activity, CheckCircle2 } from 'lucide-react';

export default function Architecture() {
  const [smoothProgress, setSmoothProgress] = useState(0); // 0.00 to 6.00 continuous float
  const sectionRef = useRef(null);
  const targetProgressRef = useRef(0);
  const animFrameRef = useRef(null);

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

  // Smooth lerp animation loop linking scroll target -> smooth floating float 0.00 -> 6.00
  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const totalScrollableHeight = rect.height - window.innerHeight;

      if (totalScrollableHeight <= 0) return;

      const currentScroll = Math.max(0, -rect.top);
      const normalizedRatio = Math.min(1, Math.max(0, currentScroll / totalScrollableHeight));

      // Target index from 0.00 -> 6.00
      targetProgressRef.current = normalizedRatio * 6.0;
    };

    let currentProgress = 0;
    const lerp = (start, end, factor) => start + (end - start) * factor;

    const updateSmoothLoop = () => {
      currentProgress = lerp(currentProgress, targetProgressRef.current, 0.1);
      setSmoothProgress(currentProgress);
      animFrameRef.current = requestAnimationFrame(updateSmoothLoop);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    animFrameRef.current = requestAnimationFrame(updateSmoothLoop);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Compute active layer index for primary focus
  const activeFloatIndex = Math.min(6, Math.max(0, smoothProgress));
  const primaryIndex = Math.min(6, Math.max(0, Math.round(activeFloatIndex)));
  const primaryLayer = layers[primaryIndex];

  return (
    <section
      id="architecture"
      ref={sectionRef}
      className="relative min-h-[500vh] bg-[#0A0A0A] text-white border-t border-white/10 font-mono"
    >
      {/* Sticky Viewport Frame */}
      <div className="sticky top-0 h-screen flex flex-col justify-between p-6 md:p-12 overflow-hidden z-10">
        
        {/* Section Header */}
        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-4 shrink-0">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#8B6DFF] tracking-widest uppercase mb-1">
              <span className="w-2 h-2 rounded-full bg-[#8B6DFF] animate-pulse"></span>
              <span>SYSTEM / 01 — SCROLL STORYTELLING</span>
            </div>
            <h2 className="font-syne text-3xl md:text-5xl font-extrabold text-white uppercase tracking-tight">
              LIVE ARCHITECTURE
            </h2>
          </div>

          <div className="text-xs text-slate-400 font-mono hidden sm:block">
            "How the pieces connect behind the experience."
          </div>
        </div>

        {/* Main 3D Composition Workspace */}
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto py-2 flex-1 relative">
          
          {/* Left Column: Continuous Scroll-Interpolated Text & Flow Specs */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="font-mono text-4xl font-extrabold text-[#8B6DFF]">
                  {primaryLayer.id}
                </span>
                <div>
                  <h3 className="font-syne text-3xl font-extrabold text-white uppercase tracking-tight transition-all duration-200">
                    {primaryLayer.title}
                  </h3>
                  <div className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                    {primaryLayer.subtitle}
                  </div>
                </div>
              </div>

              <p className="font-sans text-slate-300 text-sm md:text-base leading-relaxed">
                "{primaryLayer.description}"
              </p>
            </div>

            {/* System Execution Flow */}
            <div className="space-y-3 pt-3 border-t border-white/10">
              <div className="text-xs font-mono text-[#8B6DFF] font-bold uppercase tracking-widest flex items-center gap-2">
                <Activity size={14} className="animate-spin" />
                <span>SYSTEM EXECUTION FLOW:</span>
              </div>

              <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-mono">
                {primaryLayer.flow.map((step, idx) => (
                  <React.Fragment key={idx}>
                    <span className="bg-[#141414] border border-white/15 text-white px-2.5 py-1 font-bold">
                      {step}
                    </span>
                    {idx < primaryLayer.flow.length - 1 && (
                      <ArrowRight size={12} className="text-[#8B6DFF]" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Tech Stack Logos & Badges */}
            <div className="space-y-2 pt-2">
              <div className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                RECOGNIZED TECH STACK:
              </div>
              <div className="flex flex-wrap gap-2">
                {primaryLayer.logos.map((logo) => (
                  <span
                    key={logo}
                    className="bg-[#141414] border border-[#8B6DFF]/40 text-white font-mono text-xs px-3 py-1 font-bold flex items-center gap-1.5"
                  >
                    <CheckCircle2 size={12} className="text-[#8B6DFF]" />
                    <span>{logo}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Architecture Code Inspector (Continuous Code Interpolation) */}
            <div className="bg-[#141414] border border-[#8B6DFF]/30 p-3.5 text-xs text-[#8B6DFF] shadow-2xl rounded-none">
              <div className="flex justify-between items-center text-[10px] text-slate-400 border-b border-white/10 pb-1.5 mb-2">
                <span>INSPECTOR // LAYER {primaryLayer.id}</span>
                <span className="text-[#8B6DFF] uppercase font-bold">{primaryLayer.title}</span>
              </div>
              <pre className="text-slate-200 text-[11px] leading-relaxed overflow-x-auto">
                <code>{primaryLayer.codeSnippet}</code>
              </pre>
            </div>
          </div>

          {/* Center Column: The HERO 3D Physical Architecture Layer Stack */}
          <div className="lg:col-span-6 relative flex flex-col items-center justify-center min-h-[420px] py-4 [perspective:1000px]">
            
            <div className="w-full space-y-2 relative [transform-style:preserve-3d]">
              {layers.map((layer, idx) => {
                // Continuous distance offset from current smooth float progress index
                const offset = idx - activeFloatIndex;
                const absOffset = Math.abs(offset);

                // Continuous mathematical transformations
                const translateZ = 60 - absOffset * 70; // Active comes forward +60px, inactive recedes
                const translateY = offset * 50; // Continuous vertical spacing
                const scale = Math.max(0.78, 1 - absOffset * 0.07); // Smooth scaling
                const opacity = Math.max(0.15, 1 - absOffset * 0.42); // Smooth opacity falloff
                const blurPx = Math.min(6, absOffset * 1.8); // Subtle depth of field blur
                const isPrimary = primaryIndex === idx;

                return (
                  <div
                    key={layer.id}
                    style={{
                      transform: `translate3d(0px, ${translateY}px, ${translateZ}px) scale(${scale})`,
                      opacity: opacity,
                      filter: `blur(${blurPx}px)`,
                      zIndex: Math.round(100 - absOffset * 10)
                    }}
                    className={`p-4 border font-mono transition-all duration-75 rounded-none flex items-center justify-between shadow-2xl ${
                      isPrimary
                        ? 'bg-[#141414] text-white border-2 border-[#8B6DFF] shadow-[0_0_30px_rgba(139,109,255,0.4)]'
                        : 'bg-[#0A0A0A] text-slate-400 border-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className={`font-mono text-xs font-bold ${isPrimary ? 'text-[#8B6DFF]' : 'text-slate-600'}`}>
                        {layer.id}
                      </span>
                      <div className="font-syne font-extrabold text-sm text-white uppercase tracking-wider">
                        {layer.title}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">
                        {layer.technologies.slice(0, 3).join(' • ')}
                      </span>
                      <div className={`w-2.5 h-2.5 rounded-full ${isPrimary ? 'bg-[#8B6DFF] animate-pulse' : 'bg-white/20'}`} />
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Right Column: Continuous Vertical Progress Line Indicator (01 -> 07) */}
          <div className="lg:col-span-1 hidden lg:flex flex-col items-center justify-center h-full relative py-6">
            
            {/* Track Line */}
            <div className="w-[2px] h-64 bg-white/10 relative flex flex-col justify-between items-center py-2">
              
              {/* Floating Active Node Ball moving continuously */}
              <div
                style={{ top: `${(activeFloatIndex / 6) * 100}%` }}
                className="absolute w-3 h-3 rounded-full bg-[#8B6DFF] -translate-x-[5px] -translate-y-1.5 shadow-[0_0_12px_#8B6DFF] transition-all duration-75"
              />

              {layers.map((l, i) => (
                <div
                  key={l.id}
                  className={`w-1.5 h-1.5 rounded-full z-10 transition-colors ${
                    primaryIndex === i ? 'bg-[#8B6DFF]' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>

            <div className="mt-4 font-mono text-[10px] text-[#8B6DFF] font-bold">
              0{primaryIndex + 1}/07
            </div>
          </div>

        </div>

        {/* Bottom Continuous Status Bar */}
        <div className="max-w-7xl mx-auto w-full border-t border-white/10 pt-3 flex justify-between items-center text-xs text-slate-400 font-mono shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#8B6DFF] animate-pulse"></span>
            <span>CONTINUOUS SCROLL ENGINE // LAYER 0{primaryIndex + 1} OF 07 ACTIVE</span>
          </div>
          <div>SCROLL POSITION: {Math.round((smoothProgress / 6) * 100)}%</div>
        </div>

      </div>
    </section>
  );
}
