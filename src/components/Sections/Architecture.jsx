import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Cpu, Server, Database, Cloud, Bot, Box, ArrowRight, Activity, CheckCircle2 } from 'lucide-react';

export default function Architecture() {
  const [activeLayerIndex, setActiveLayerIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef(null);

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
      visualType: "UI_SCREENSHOT",
      codeSnippet: "// Responsive UI Layout & Interaction Systems\nconst interfaceConfig = { mode: 'editorial', responsive: true, accessibility: 'AAA' };"
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
      visualType: "FRONTEND_CODE",
      codeSnippet: "import React, { useState } from 'react';\nexport function Component({ state }) {\n  return <div className=\"client-render\">{state}</div>;\n}"
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
      visualType: "API_PIPELINE",
      codeSnippet: "app.post('/api/v1/session', async (req, res) => {\n  const token = await authService.verifyToken(req.headers.authorization);\n  return res.json({ status: 200, token });\n});"
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
      visualType: "DATABASE_SCHEMA",
      codeSnippet: "CREATE TABLE users (\n  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n  email VARCHAR(255) UNIQUE NOT NULL,\n  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()\n);"
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
      visualType: "DEPLOYMENT_STACK",
      codeSnippet: "# Dockerfile Production Build\nFROM node:20-alpine AS builder\nWORKDIR /app\nRUN npm run build\nCMD [\"node\", \"dist/index.js\"]"
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
      visualType: "AI_MODEL_NODE",
      codeSnippet: "import sklearn.ensemble as ensemble\nmodel = ensemble.RandomForestClassifier(n_estimators=100)\nmodel.fit(X_train, y_train)\npredictions = model.predict(X_test)"
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
      visualType: "THREE_RENDER",
      codeSnippet: "const scene = new THREE.Scene();\nconst camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);\nrenderer.render(scene, camera);"
    }
  ];

  // Scroll-driven calculation linking scroll progress to current architecture layer
  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const totalScrollHeight = rect.height - window.innerHeight;
      
      if (totalScrollHeight <= 0) return;

      // Current scroll position within section bounds
      const currentScroll = Math.max(0, -rect.top);
      const progress = Math.min(1, Math.max(0, currentScroll / totalScrollHeight));

      setScrollProgress(progress);

      // Map 0 -> 100% progress into 7 chapters (approx 14.28% each)
      const chapterIndex = Math.min(6, Math.floor(progress * 7));
      setActiveLayerIndex(chapterIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeLayer = layers[activeLayerIndex];

  return (
    <section
      id="architecture"
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
              <span>SYSTEM / 01</span>
            </div>
            <h2 className="font-syne text-3xl md:text-5xl font-extrabold text-white uppercase tracking-tight">
              LIVE ARCHITECTURE
            </h2>
          </div>

          <div className="text-xs text-slate-400 font-mono hidden sm:block">
            "How the pieces connect behind the experience."
          </div>
        </div>

        {/* Main Pinned Viewport Content: Left Details, Center 3D Stack, Right Tech Specs */}
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto py-4 flex-1">
          
          {/* Left Column: Scroll-Driven Active Topic Details */}
          <div className="lg:col-span-5 space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeLayer.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-4xl font-extrabold text-[#8B6DFF]">
                      {activeLayer.id}
                    </span>
                    <div>
                      <h3 className="font-syne text-3xl font-extrabold text-white uppercase tracking-tight">
                        {activeLayer.title}
                      </h3>
                      <div className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                        {activeLayer.subtitle}
                      </div>
                    </div>
                  </div>

                  <p className="font-sans text-slate-300 text-sm md:text-base leading-relaxed pt-2">
                    "{activeLayer.description}"
                  </p>
                </div>

                {/* Architecture Flow Execution Stack */}
                <div className="space-y-3 pt-3 border-t border-white/10">
                  <div className="text-xs font-mono text-[#8B6DFF] font-bold uppercase tracking-widest flex items-center gap-2">
                    <Activity size={14} className="animate-spin" />
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
                <div className="space-y-2 pt-2">
                  <div className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                    RECOGNIZED TECH STACK:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activeLayer.logos.map((logo) => (
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

              </motion.div>
            </AnimatePresence>
          </div>

          {/* Center Column: 3D Stack Visualization (Physical Depth & Scale) */}
          <div className="lg:col-span-6 relative flex flex-col justify-center items-center py-4">
            
            {/* Visual Code/Architecture Preview Window */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeLayer.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="w-full bg-[#141414] border-2 border-[#8B6DFF] p-4 mb-4 font-mono text-xs text-[#8B6DFF] shadow-2xl overflow-x-auto"
              >
                <div className="flex justify-between items-center text-[10px] text-slate-400 border-b border-white/10 pb-2 mb-2">
                  <span>ARCHITECTURE INSPECTOR // LAYER {activeLayer.id}</span>
                  <span className="text-[#8B6DFF] uppercase font-bold">{activeLayer.title}</span>
                </div>
                <pre className="text-slate-200 text-[11px] leading-relaxed">
                  <code>{activeLayer.codeSnippet}</code>
                </pre>
              </motion.div>
            </AnimatePresence>

            {/* Physical Layered Stack Cards */}
            <div className="w-full space-y-1.5 relative">
              {layers.map((layer, idx) => {
                const isActive = activeLayerIndex === idx;
                const offset = idx - activeLayerIndex;

                return (
                  <motion.div
                    key={layer.id}
                    animate={{
                      scale: isActive ? 1.02 : 0.96 - Math.abs(offset) * 0.02,
                      y: offset * 2,
                      opacity: isActive ? 1 : Math.max(0.3, 1 - Math.abs(offset) * 0.2),
                      borderColor: isActive ? '#8B6DFF' : 'rgba(255,255,255,0.1)'
                    }}
                    transition={{ duration: 0.3 }}
                    className={`p-3 border font-mono transition-all duration-300 rounded-none flex items-center justify-between ${
                      isActive
                        ? 'bg-[#141414] text-white border-2 shadow-[0_0_20px_rgba(139,109,255,0.3)] z-30'
                        : 'bg-[#0A0A0A] text-slate-400 z-10'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`font-mono text-xs font-bold ${isActive ? 'text-[#8B6DFF]' : 'text-slate-600'}`}>
                        {layer.id}
                      </span>
                      <div className="font-syne font-bold text-xs text-white uppercase tracking-wider">
                        {layer.title}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">
                        {layer.technologies.slice(0, 2).join(' • ')}
                      </span>
                      <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-[#8B6DFF] animate-ping' : 'bg-white/20'}`}></div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Minimal Vertical Scroll Progress Indicator (01 -> 07) */}
          <div className="lg:col-span-1 hidden lg:flex flex-col items-center justify-center space-y-3 font-mono text-xs shrink-0">
            {layers.map((layer, idx) => {
              const isActive = activeLayerIndex === idx;

              return (
                <div key={layer.id} className="flex flex-col items-center gap-1">
                  <span className={`font-bold transition-colors ${isActive ? 'text-[#8B6DFF] text-sm' : 'text-slate-600 text-[10px]'}`}>
                    {layer.id}
                  </span>
                  <div className={`w-2 h-2 rounded-full transition-all ${isActive ? 'bg-[#8B6DFF] scale-125' : 'bg-white/20'}`} />
                  {idx < layers.length - 1 && (
                    <div className={`w-[1px] h-4 ${isActive ? 'bg-[#8B6DFF]' : 'bg-white/10'}`} />
                  )}
                </div>
              );
            })}
          </div>

        </div>

        {/* Bottom Status Bar */}
        <div className="max-w-7xl mx-auto w-full border-t border-white/10 pt-3 flex justify-between items-center text-xs text-slate-400 font-mono shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#8B6DFF] animate-pulse"></span>
            <span>SCROLL CONTROLLED ARCHITECTURE // CHAPTER {activeLayerIndex + 1} OF 7</span>
          </div>
          <div>PROGRESS: {Math.round(scrollProgress * 100)}%</div>
        </div>

      </div>
    </section>
  );
}
