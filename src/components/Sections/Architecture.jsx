import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Monitor, Cpu, ShieldCheck, Database, ArrowRight, Activity, Server } from 'lucide-react';

export default function Architecture({ engineerMode }) {
  const [activeNode, setActiveNode] = useState(0);

  const nodes = [
    {
      id: 0,
      title: "CLIENT LAYER",
      tech: "React / Next.js / Tailwind",
      icon: Monitor,
      desc: "Responsive SPA frontend handling user interactions, WebGL 3D canvas state, optimistic UI renders, and state persistence.",
      latency: "12ms",
      throughput: "60 FPS Render Loop"
    },
    {
      id: 1,
      title: "API GATEWAY",
      tech: "Node.js / REST Middleware",
      icon: Cpu,
      desc: "Asynchronous API gateway performing request validation, rate limiting, token parsing, and service routing.",
      latency: "28ms",
      throughput: "2.4k req/sec"
    },
    {
      id: 2,
      title: "BACKEND & AUTH",
      tech: "PHP / LUA Kernel / JWT",
      icon: Server,
      desc: "Business logic engine managing session authentication, async data queues, game tick rate optimizations, and system transactions.",
      latency: "35ms",
      throughput: "High Concurrency"
    },
    {
      id: 3,
      title: "DATABASE & CACHE",
      tech: "MySQL / MongoDB / Redis",
      icon: Database,
      desc: "Indexed database layer ensuring data persistence, ACID transactions, batch query execution, and cache lookups.",
      latency: "8ms",
      throughput: "Indexed Queries"
    }
  ];

  return (
    <section id="architecture" className="py-24 px-6 md:px-12 bg-[#050507] relative overflow-hidden border-t border-white/10">
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#ccff00] tracking-widest uppercase mb-2">
              <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-pulse"></span>
              <span>LIVE SYSTEM DIAGRAM</span>
            </div>
            <h2 className="font-syne text-4xl md:text-6xl font-extrabold text-white uppercase tracking-tight">
              LIVE ARCHITECTURE
            </h2>
          </div>
          <p className="font-mono text-xs text-slate-400 max-w-md">
            Interactive system architecture pipeline showcasing data packet flow across client, API gateway, server backend, and database nodes.
          </p>
        </div>

        {/* System Node Flowchart Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {nodes.map((node, index) => {
            const Icon = node.icon;
            const isActive = activeNode === index;

            return (
              <div key={node.id} className="relative group">
                {/* Node Box */}
                <motion.div
                  onMouseEnter={() => setActiveNode(index)}
                  className={`p-6 rounded-sm border transition-all duration-300 cursor-pointer h-full flex flex-col justify-between ${
                    isActive
                      ? 'bg-[#0f0f13] border-[#ccff00] shadow-[0_0_20px_rgba(204,255,0,0.2)]'
                      : 'bg-[#09090b] border-white/10 hover:border-white/30'
                  }`}
                  data-cursor="INSPECT"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className={`p-3 rounded-sm border ${isActive ? 'bg-[#ccff00] text-black border-[#ccff00]' : 'bg-white/5 text-slate-300 border-white/10'}`}>
                        <Icon size={22} />
                      </div>
                      <span className="font-mono text-xs text-[#ccff00]">0{index + 1}</span>
                    </div>

                    <div>
                      <h3 className="font-syne font-bold text-lg text-white uppercase tracking-tight">
                        {node.title}
                      </h3>
                      <div className="font-mono text-xs text-purple-400 mt-0.5">
                        {node.tech}
                      </div>
                    </div>
                  </div>

                  {/* Flow Arrow for Desktop */}
                  {index < nodes.length - 1 && (
                    <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 text-[#ccff00]">
                      <ArrowRight size={18} className="animate-pulse" />
                    </div>
                  )}
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* Selected Node Details Display */}
        <motion.div
          key={activeNode}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-[#0f0f13] border border-white/15 p-8 rounded-sm font-mono space-y-4"
        >
          <div className="flex flex-wrap justify-between items-center border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <Activity className="text-[#ccff00] animate-spin" size={18} />
              <span className="text-white font-bold text-sm uppercase">
                NODE INSPECTION // {nodes[activeNode].title}
              </span>
            </div>

            <div className="flex gap-4 text-xs text-slate-400">
              <span>LATENCY: <strong className="text-[#ccff00]">{nodes[activeNode].latency}</strong></span>
              <span>THROUGHPUT: <strong className="text-purple-400">{nodes[activeNode].throughput}</strong></span>
            </div>
          </div>

          <p className="text-slate-300 text-sm leading-relaxed font-sans">
            {nodes[activeNode].desc}
          </p>

          {engineerMode && (
            <div className="bg-[#050507] border border-[#ccff00]/30 p-3 rounded-sm text-xs text-[#ccff00] overflow-x-auto">
              <code>
                {`[PIPELINE OK] Packet received at Node_0${activeNode + 1} (${nodes[activeNode].title}) | Status: 200 OK | Heap: 42MB`}
              </code>
            </div>
          )}
        </motion.div>

      </div>
    </section>
  );
}
