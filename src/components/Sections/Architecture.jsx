import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Cpu, Server, Database, Cloud, Bot, Box, ArrowRight, Activity, CheckCircle2 } from 'lucide-react';

export default function Architecture() {
  const [activeLayerIndex, setActiveLayerIndex] = useState(0);
  const containerRef = useRef(null);

  const layers = [
    {
      id: "01",
      title: "EXPERIENCE",
      subtitle: "UI/UX & INTERACTION",
      icon: Layers,
      description: "The interface users interact with — designed to feel fast, intuitive and intentional.",
      technologies: ["UI / UX", "Responsive Design", "Accessibility", "Motion", "Tailwind CSS"],
      flow: ["USER INTERACTION", "RESPONSIVE CANVAS", "MOTION STATE", "VISUAL FEEDBACK"],
      logos: ["Figma", "Tailwind", "Framer", "CSS3"]
    },
    {
      id: "02",
      title: "FRONTEND",
      subtitle: "CLIENT-SIDE ARCHITECTURE",
      icon: Cpu,
      description: "The client-side layer transforms design systems into responsive, interactive digital experiences.",
      technologies: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS"],
      flow: ["USER", "UI", "COMPONENTS", "STATE", "API"],
      logos: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind"]
    },
    {
      id: "03",
      title: "BACKEND",
      subtitle: "APPLICATION LOGIC & APIs",
      icon: Server,
      description: "The application layer handles business logic, authentication, APIs and communication between services.",
      technologies: ["Node.js", "Express", "Python", "REST API", "JWT Auth"],
      flow: ["CLIENT", "API", "BUSINESS LOGIC", "SERVICES", "DATABASE"],
      logos: ["Node.js", "Express", "Python", "REST", "JWT"]
    },
    {
      id: "04",
      title: "DATABASE",
      subtitle: "DATA PERSISTENCE & CACHE",
      icon: Database,
      description: "Reliable data architecture designed for consistency, scalability and efficient access.",
      technologies: ["PostgreSQL", "MongoDB", "Firebase", "Redis"],
      flow: ["APPLICATION", "API", "DATABASE", "CACHE", "DATA"],
      logos: ["PostgreSQL", "MongoDB", "Firebase", "Redis"]
    },
    {
      id: "05",
      title: "INFRASTRUCTURE",
      subtitle: "CLOUD & CI/CD PIPELINE",
      icon: Cloud,
      description: "Production infrastructure that keeps applications available, secure and scalable.",
      technologies: ["AWS", "Vercel", "Docker", "GitHub", "CI/CD"],
      flow: ["CODE", "BUILD", "CONTAINER", "DEPLOY", "MONITOR"],
      logos: ["AWS", "Vercel", "Docker", "GitHub"]
    },
    {
      id: "06",
      title: "AI / DATA",
      subtitle: "INTELLIGENT SYSTEMS",
      icon: Bot,
      description: "Intelligent systems that transform application data into useful predictions, automation and experiences.",
      technologies: ["Python", "OpenAI APIs", "Machine Learning", "Data Processing", "Vector Database"],
      flow: ["DATA", "PROCESSING", "MODEL", "API", "APPLICATION"],
      logos: ["Python", "OpenAI", "Scikit-Learn", "PyTorch"]
    },
    {
      id: "07",
      title: "3D / INTERACTION",
      subtitle: "WEBGL GRAPHICS ENGINE",
      icon: Box,
      description: "Immersive experiences powered by real-time rendering, animation and interactive systems.",
      technologies: ["Three.js", "WebGL", "GSAP", "React Three Fiber"],
      flow: ["INPUT", "INTERACTION", "ANIMATION", "3D SCENE", "RENDER"],
      logos: ["Three.js", "WebGL", "GSAP", "R3F"]
    }
  ];

  const activeLayer = layers[activeLayerIndex];

  return (
    <section id="architecture" ref={containerRef} className="py-28 px-6 md:px-12 bg-[#0A0A0A] text-white relative overflow-hidden border-t border-white/10 font-mono">
      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#8B6DFF] tracking-widest uppercase mb-2">
              <span className="w-2 h-2 rounded-full bg-[#8B6DFF] animate-pulse"></span>
              <span>SYSTEM / 01</span>
            </div>
            <h2 className="font-syne text-4xl md:text-6xl font-extrabold text-white uppercase tracking-tight">
              LIVE ARCHITECTURE
            </h2>
          </div>
          <p className="font-mono text-xs text-slate-400 max-w-md">
            "How the pieces connect behind the experience." Scroll or select layers to inspect the stacked production architecture.
          </p>
        </div>

        {/* 7 Layer Horizontal Selection Stepper */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {layers.map((layer, idx) => {
            const Icon = layer.icon;
            const isActive = activeLayerIndex === idx;

            return (
              <button
                key={layer.id}
                onClick={() => setActiveLayerIndex(idx)}
                className={`p-3.5 border text-left transition-all duration-300 rounded-none flex flex-col justify-between h-24 ${
                  isActive
                    ? 'bg-[#141414] border-[#8B6DFF] text-white shadow-xl'
                    : 'bg-[#0A0A0A] border-white/10 text-slate-400 hover:border-white/30 hover:text-white'
                }`}
              >
                <div className="flex justify-between items-center text-xs">
                  <span className={`font-bold ${isActive ? 'text-[#8B6DFF]' : 'text-slate-500'}`}>{layer.id}</span>
                  <Icon size={16} className={isActive ? 'text-[#8B6DFF]' : 'text-slate-400'} />
                </div>
                <div className="font-syne font-bold text-xs uppercase tracking-tight">
                  {layer.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Main Layered 3D Presentation Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#141414] border border-white/15 p-6 md:p-10 shadow-2xl">
          
          {/* Left Column: Topic Details & Architecture Flow */}
          <div className="lg:col-span-5 space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeLayer.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
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
                <div className="space-y-3 pt-4 border-t border-white/10">
                  <div className="text-xs font-mono text-[#8B6DFF] font-bold uppercase tracking-widest flex items-center gap-2">
                    <Activity size={14} className="animate-spin" />
                    <span>SYSTEM EXECUTION FLOW:</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                    {activeLayer.flow.map((step, idx) => (
                      <React.Fragment key={idx}>
                        <span className="bg-[#0A0A0A] border border-white/10 text-white px-2.5 py-1 font-bold">
                          {step}
                        </span>
                        {idx < activeLayer.flow.length - 1 && (
                          <ArrowRight size={12} className="text-[#8B6DFF]" />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* Technology Badges */}
                <div className="space-y-2 pt-2">
                  <div className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                    RECOGNIZED TECH STACK:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activeLayer.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="bg-[#0A0A0A] border border-[#8B6DFF]/30 text-white font-mono text-xs px-3 py-1 font-bold flex items-center gap-1.5"
                      >
                        <CheckCircle2 size={12} className="text-[#8B6DFF]" />
                        <span>{tech}</span>
                      </span>
                    ))}
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: Physical 3D Layered Card Stack Representation */}
          <div className="lg:col-span-7 relative min-h-[380px] flex items-center justify-center py-6">
            <div className="w-full max-w-md space-y-2 relative">
              {layers.map((layer, idx) => {
                const isActive = activeLayerIndex === idx;
                const offset = idx - activeLayerIndex;

                return (
                  <motion.div
                    key={layer.id}
                    onClick={() => setActiveLayerIndex(idx)}
                    animate={{
                      scale: isActive ? 1.02 : 0.96 - Math.abs(offset) * 0.02,
                      y: offset * 4,
                      opacity: isActive ? 1 : Math.max(0.35, 1 - Math.abs(offset) * 0.25),
                      borderColor: isActive ? '#8B6DFF' : 'rgba(255,255,255,0.1)'
                    }}
                    transition={{ duration: 0.4 }}
                    className={`p-4 border font-mono cursor-pointer transition-all duration-300 rounded-none flex items-center justify-between ${
                      isActive
                        ? 'bg-[#0A0A0A] text-white border-2 shadow-[0_0_25px_rgba(139,109,255,0.3)] z-30'
                        : 'bg-[#0A0A0A]/70 text-slate-400 z-10 hover:border-white/30'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className={`font-mono text-sm font-bold ${isActive ? 'text-[#8B6DFF]' : 'text-slate-500'}`}>
                        LAYER {layer.id}
                      </span>
                      <div>
                        <div className="font-syne font-extrabold text-sm text-white uppercase tracking-wider">
                          {layer.title}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {layer.technologies.slice(0, 3).join(' • ')}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        {layer.logos.slice(0, 3).map((logo) => (
                          <span key={logo} className="bg-white/5 border border-white/10 text-[9px] text-slate-300 px-1.5 py-0.5 font-bold">
                            {logo}
                          </span>
                        ))}
                      </div>
                      <ArrowRight size={14} className={isActive ? 'text-[#8B6DFF]' : 'text-slate-600'} />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Bottom System Architecture Status Footer */}
        <div className="pt-4 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-slate-400 gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#8B6DFF] animate-pulse"></span>
            <span>SYSTEM ARCHITECTURE READY // 7 LAYERS CONSTRUCTED</span>
          </div>
          <div>DOMAIN: REUBG.IN // STACKED SYSTEM PRESENTATION</div>
        </div>

      </div>
    </section>
  );
}
