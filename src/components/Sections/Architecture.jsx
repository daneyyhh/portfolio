import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Cpu, Server, Database, Cloud, Bot, Box, CheckCircle2, ArrowRight } from 'lucide-react';

export default function Architecture() {
  const layers = [
    {
      id: "01",
      title: "EXPERIENCE",
      subtitle: "UI/UX & INTERACTION",
      icon: Layers,
      description: "The visible layer — where interaction, usability and visual design come together.",
      technologies: ["UI / UX", "Responsive Design", "Accessibility", "Motion"],
      flow: ["USER INTERACTION", "RESPONSIVE CANVAS", "MOTION STATE", "VISUAL FEEDBACK"]
    },
    {
      id: "02",
      title: "FRONTEND",
      subtitle: "CLIENT-SIDE ARCHITECTURE",
      icon: Cpu,
      description: "The client-side layer transforms design systems into responsive, interactive digital experiences.",
      technologies: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS"],
      flow: ["USER", "UI", "COMPONENTS", "STATE", "API"]
    },
    {
      id: "03",
      title: "BACKEND",
      subtitle: "APPLICATION LOGIC & APIs",
      icon: Server,
      description: "The application layer handles business logic, authentication, APIs and communication between services.",
      technologies: ["Node.js", "Express", "Python", "REST API", "JWT Auth"],
      flow: ["CLIENT", "API", "BUSINESS LOGIC", "SERVICES", "DATABASE"]
    },
    {
      id: "04",
      title: "DATABASE",
      subtitle: "DATA PERSISTENCE & CACHE",
      icon: Database,
      description: "Reliable data architecture designed for consistency, performance and scalability.",
      technologies: ["PostgreSQL", "MongoDB", "Firebase", "Redis"],
      flow: ["APPLICATION", "DATABASE", "CACHE", "DATA"]
    },
    {
      id: "05",
      title: "INFRASTRUCTURE",
      subtitle: "CLOUD & CI/CD PIPELINE",
      icon: Cloud,
      description: "Production infrastructure that takes the application from code to a reliable live environment.",
      technologies: ["AWS", "Vercel", "Docker", "GitHub", "CI/CD"],
      flow: ["CODE", "BUILD", "CONTAINER", "DEPLOY", "MONITOR"]
    },
    {
      id: "06",
      title: "AI / DATA",
      subtitle: "INTELLIGENT SYSTEMS",
      icon: Bot,
      description: "Intelligent systems that turn application data into useful automation, predictions and experiences.",
      technologies: ["Python", "OpenAI APIs", "Machine Learning", "Vector Database"],
      flow: ["DATA", "PROCESSING", "MODEL", "API", "APPLICATION"]
    },
    {
      id: "07",
      title: "3D / INTERACTION",
      subtitle: "WEBGL GRAPHICS ENGINE",
      icon: Box,
      description: "Immersive experiences powered by real-time rendering, animation and interactive systems.",
      technologies: ["Three.js", "WebGL", "GSAP", "React Three Fiber"],
      flow: ["INPUT", "INTERACTION", "ANIMATION", "3D SCENE", "RENDER"]
    }
  ];

  return (
    <section id="architecture" className="py-28 px-6 md:px-12 bg-[#0A0A0A] text-white relative border-t border-white/10 font-mono">
      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#8B6DFF] tracking-widest uppercase mb-2">
              <span className="w-2 h-2 rounded-full bg-[#8B6DFF]"></span>
              <span>SYSTEM ARCHITECTURE</span>
            </div>
            <h2 className="font-syne text-4xl md:text-6xl font-extrabold text-white uppercase tracking-tight">
              LIVE ARCHITECTURE
            </h2>
          </div>
          <p className="font-mono text-xs text-slate-400 max-w-md">
            "How the pieces connect behind the experience." Static technical architecture breakdown across 7 system layers.
          </p>
        </div>

        {/* Static Layer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {layers.map((layer, idx) => {
            const Icon = layer.icon;

            return (
              <motion.div
                key={layer.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="bg-[#141414] border border-white/10 p-6 space-y-4 hover:border-[#8B6DFF] transition-colors group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[#8B6DFF] font-bold">LAYER {layer.id}</span>
                    <Icon size={18} className="text-slate-400 group-hover:text-[#8B6DFF] transition-colors" />
                  </div>

                  <div>
                    <h3 className="font-syne text-xl font-bold text-white uppercase group-hover:text-[#8B6DFF] transition-colors">
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

                <div className="space-y-3 pt-3 border-t border-white/10">
                  <div className="flex flex-wrap gap-1 text-[10px] font-mono">
                    {layer.technologies.map(t => (
                      <span key={t} className="bg-[#0A0A0A] text-slate-300 px-2 py-0.5 border border-white/10">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-1 text-[10px] text-[#8B6DFF] overflow-x-auto">
                    {layer.flow.map((f, i) => (
                      <React.Fragment key={i}>
                        <span>{f}</span>
                        {i < layer.flow.length - 1 && <ArrowRight size={10} />}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-slate-400 gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#8B6DFF]"></span>
            <span>SYSTEM ARCHITECTURE // 7 LAYERS DEFINED</span>
          </div>
          <div>REUBG.IN // FULL-STACK ARCHITECTURE</div>
        </div>

      </div>
    </section>
  );
}
