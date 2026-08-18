import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Monitor, Cpu, Server, Database, ArrowRight, Activity } from 'lucide-react';

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
    <section id="architecture" className="py-24 px-6 md:px-12 bg-[#0A0A0A] text-white relative overflow-hidden border-t border-white/10 font-mono">
      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#8B6DFF] tracking-widest uppercase mb-2">
              <span className="w-2 h-2 rounded-full bg-[#8B6DFF] animate-pulse"></span>
              <span>LIVE SYSTEM DIAGRAM</span>
            </div>
            <h2 className="font-syne text-4xl md:text-6xl font-extrabold text-white uppercase tracking-tight">
              LIVE ARCHITECTURE
            </h2>
          </div>
          <p className="text-xs text-slate-400 max-w-md">
            System architecture pipeline showcasing data packet flow across client, API gateway, server backend, and database nodes.
          </p>
        </div>

        {/* System Node Flowchart Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {nodes.map((node, index) => {
            const Icon = node.icon;
            const isActive = activeNode === index;

            return (
              <div key={node.id} className="relative group">
                <motion.div
                  onMouseEnter={() => setActiveNode(index)}
                  className={`p-6 border transition-all duration-300 cursor-pointer h-full flex flex-col justify-between ${
                    isActive
                      ? 'bg-[#141414] border-[#8B6DFF] shadow-lg'
                      : 'bg-[#0A0A0A] border-white/10 hover:border-white/30'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className={`p-3 border ${isActive ? 'bg-[#8B6DFF] text-white border-[#8B6DFF]' : 'bg-white/5 text-slate-300 border-white/10'}`}>
                        <Icon size={22} />
                      </div>
                      <span className="font-mono text-xs text-[#8B6DFF]">0{index + 1}</span>
                    </div>

                    <div>
                      <h3 className="font-syne font-bold text-lg text-white uppercase tracking-tight">
                        {node.title}
                      </h3>
                      <div className="font-mono text-xs text-[#8B6DFF] mt-0.5">
                        {node.tech}
                      </div>
                    </div>
                  </div>

                  {index < nodes.length - 1 && (
                    <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 text-[#8B6DFF]">
                      <ArrowRight size={18} />
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
          className="bg-[#141414] border border-white/15 p-8 space-y-4"
        >
          <div className="flex flex-wrap justify-between items-center border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <Activity className="text-[#8B6DFF] animate-spin" size={18} />
              <span className="text-white font-bold text-sm uppercase">
                NODE INSPECTION // {nodes[activeNode].title}
              </span>
            </div>

            <div className="flex gap-4 text-xs text-slate-400">
              <span>LATENCY: <strong className="text-[#8B6DFF]">{nodes[activeNode].latency}</strong></span>
              <span>THROUGHPUT: <strong className="text-white">{nodes[activeNode].throughput}</strong></span>
            </div>
          </div>

          <p className="text-slate-300 text-sm leading-relaxed font-sans">
            {nodes[activeNode].desc}
          </p>

          {engineerMode && (
            <div className="bg-[#0A0A0A] border border-[#8B6DFF]/30 p-3 text-xs text-[#8B6DFF] overflow-x-auto">
              <code>
                {`[PIPELINE OK] Packet received at Node_0${activeNode + 1} (${nodes[activeNode].title}) | Status: 200 OK`}
              </code>
            </div>
          )}
        </motion.div>

      </div>
    </section>
  );
}
