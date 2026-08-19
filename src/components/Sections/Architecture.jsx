import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Database, Server, Shield, Cpu, Zap, Code, ArrowRight } from 'lucide-react';

export default function Architecture({ engineerMode }) {
  const layers = [
    {
      id: "01",
      title: "PRESENTATION LAYER",
      subtitle: "UI & INTERACTION ARCHITECTURE",
      icon: Layers,
      description: "Editorial UI built with React, Vite, and Tailwind CSS. Responsive grid system with fluid typography and GPU-accelerated motion fidelity.",
      technologies: ["UI / UX", "Responsive Design", "Accessibility", "Motion"],
      flow: ["DOM Tree", "Framer Motion", "Tailwind Engine", "60 FPS Viewport"]
    },
    {
      id: "02",
      title: "CLIENT ENGINE LAYER",
      subtitle: "STATE & COMPONENT PIPELINE",
      icon: Code,
      description: "Modular component architecture with strict unidirectional data flow, custom React hooks, and persistent session state handling.",
      technologies: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS"],
      flow: ["React State", "Custom Hooks", "Virtual DOM", "Render Tree"]
    },
    {
      id: "03",
      title: "SERVICES & API LAYER",
      subtitle: "BACKEND LOGIC & DATA PROTOCOLS",
      icon: Server,
      description: "RESTful endpoints and real-time WebSocket communication pipelines. Structured JSON payloads with strict request validation.",
      technologies: ["Node.js", "Express", "Python", "REST API", "JWT Auth"],
      flow: ["HTTP / REST", "Auth Middleware", "Business Logic", "Response Handler"]
    },
    {
      id: "04",
      title: "DATA PERSISTENCE LAYER",
      subtitle: "STORAGE & QUERY EFFICIENCY",
      icon: Database,
      description: "Polyglot persistence architecture combining document stores (MongoDB) and relational databases (PostgreSQL/MySQL) with optimized indexing.",
      technologies: ["PostgreSQL", "MongoDB", "Firebase", "Redis"],
      flow: ["Connection Pool", "Query Optimizer", "Indexing", "ACID Transactions"]
    },
    {
      id: "05",
      title: "INFRASTRUCTURE & DEPLOYMENT",
      subtitle: "EDGE HOSTING & CI/CD PIPELINE",
      icon: Zap,
      description: "Automated Git-based build pipelines deployed to global Edge CDN networks with zero-downtime rollouts and static asset minification.",
      technologies: ["AWS", "Vercel", "Docker", "GitHub", "CI/CD"],
      flow: ["Git Push", "Build Validation", "Edge Network", "Global CDN"]
    },
    {
      id: "06",
      title: "INTELLIGENCE & AI MODELS",
      subtitle: "MACHINE LEARNING INFERENCE",
      icon: Cpu,
      description: "Pre-trained transformer integrations and custom Scikit-Learn classification pipelines with cross-validated data processing.",
      technologies: ["Python", "OpenAI APIs", "Machine Learning", "Vector Database"],
      flow: ["Raw Inputs", "Feature Vector", "Model Inference", "Structured Output"]
    },
    {
      id: "07",
      title: "GRAPHICS & 3D HARDWARE LAYER",
      subtitle: "WEBGL & GPU ACCELERATION",
      icon: Shield,
      description: "Three.js WebGL rendering pipeline with custom shaders, dynamic lighting calculations, and optimized geometry draw calls.",
      technologies: ["Three.js", "WebGL", "GSAP", "React Three Fiber"],
      flow: ["Scene Graph", "Shaders (GLSL)", "Buffer Geometry", "GPU Rasterizer"]
    }
  ];

  return (
    <section id="architecture" className="py-24 sm:py-28 px-4 sm:px-6 md:px-12 bg-[#0A0A0A] text-white relative border-t border-white/10 font-mono w-full overflow-x-clip">
      <div className="max-w-7xl mx-auto space-y-12 relative z-10 w-full">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6 sm:pb-8 w-full">
          <div className="w-full max-w-full">
            <div className="flex items-center gap-2 text-xs font-mono text-[#8B6DFF] tracking-widest uppercase mb-2">
              <span className="w-2 h-2 rounded-full bg-[#8B6DFF]"></span>
              <span>SYSTEM ARCHITECTURE</span>
            </div>
            <h2
              className="font-syne font-extrabold text-white uppercase tracking-tight w-full max-w-full overflow-visible"
              style={{
                fontSize: 'clamp(1.75rem, 6.8vw, 3.5rem)',
                letterSpacing: 'clamp(-0.03em, -0.2vw, 0em)',
              }}
            >
              ARCHITECTURE
            </h2>
          </div>
          <p className="font-mono text-xs text-slate-400 max-w-md">
            "How the pieces connect behind the experience." Static technical architecture breakdown across 7 system layers.
          </p>
        </div>

        {/* Static Layer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 w-full">
          {layers.map((layer, idx) => {
            const Icon = layer.icon;

            return (
              <motion.div
                key={layer.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="bg-[#141414] border border-white/10 p-5 sm:p-6 space-y-4 hover:border-[#8B6DFF] transition-colors group flex flex-col justify-between w-full max-w-full overflow-hidden"
              >
                <div className="space-y-3 w-full">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[#8B6DFF] font-bold">LAYER {layer.id}</span>
                    <Icon size={18} className="text-slate-400 group-hover:text-[#8B6DFF] transition-colors" />
                  </div>

                  <div>
                    <h3 className="font-syne text-lg sm:text-xl font-bold text-white uppercase group-hover:text-[#8B6DFF] transition-colors">
                      {layer.title}
                    </h3>
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">
                      {layer.subtitle}
                    </div>
                  </div>

                  <p className="font-sans text-xs text-slate-300 leading-relaxed">
                    "{layer.description}"
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-white/10 w-full">
                  <div className="flex flex-wrap gap-1 text-[10px] font-mono w-full">
                    {layer.technologies.map(t => (
                      <span key={t} className="bg-[#0A0A0A] text-slate-300 px-2 py-0.5 border border-white/10 truncate">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-1 text-[10px] text-[#8B6DFF] w-full overflow-hidden">
                    {layer.flow.map((f, i) => (
                      <React.Fragment key={i}>
                        <span className="truncate">{f}</span>
                        {i < layer.flow.length - 1 && <ArrowRight size={10} className="shrink-0" />}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
