import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Bot, Layout, Gamepad2, Code2, ArrowUpRight } from 'lucide-react';
import { engineeringDomains } from '../../data/portfolioData';

export default function EngineeringProfile({ engineerMode }) {
  const getIcon = (id) => {
    switch (id) {
      case '01': return <Globe className="text-[#ccff00]" size={28} />;
      case '02': return <Bot className="text-purple-400" size={28} />;
      case '03': return <Layout className="text-cyan-400" size={28} />;
      case '04': return <Gamepad2 className="text-emerald-400" size={28} />;
      default: return <Code2 size={28} />;
    }
  };

  return (
    <section id="domains" className="py-24 px-6 md:px-12 bg-[#050507] relative overflow-hidden border-t border-white/10">
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#ccff00] tracking-widest uppercase mb-2">
              <span className="w-2 h-2 rounded-full bg-[#ccff00]"></span>
              <span>SPECIALIZED DOMAINS</span>
            </div>
            <h2 className="font-syne text-4xl md:text-6xl font-extrabold text-white uppercase tracking-tight">
              ENGINEERING PROFILE
            </h2>
          </div>
          <p className="font-mono text-xs text-slate-400 max-w-md">
            Combining robust software architecture, machine learning models, pixel-perfect UI/UX design, and 3D graphics engines.
          </p>
        </div>

        {/* 4 Major Domains Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {engineeringDomains.map((domain, index) => (
            <motion.div
              key={domain.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#0f0f13] border border-white/15 p-8 rounded-sm hover:border-[#ccff00]/50 transition-all duration-300 group relative flex flex-col justify-between"
              data-cursor="EXPLORE"
            >
              <div className="space-y-6">
                
                {/* Domain Header */}
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-white/5 border border-white/10 rounded-sm">
                    {getIcon(domain.id)}
                  </div>
                  <span className="font-mono text-3xl font-extrabold text-white/20 group-hover:text-[#ccff00] transition-colors">
                    {domain.id}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <div>
                  <h3 className="font-syne text-2xl font-bold text-white uppercase tracking-tight group-hover:text-[#ccff00] transition-colors">
                    {domain.title}
                  </h3>
                  <div className="font-mono text-xs text-purple-400 mt-1 uppercase tracking-widest">
                    {domain.subtitle}
                  </div>
                </div>

                {/* Description */}
                <p className="font-sans text-sm text-slate-300 leading-relaxed">
                  {domain.description}
                </p>

                {/* Code Snippet in Engineer Mode */}
                {engineerMode && domain.codeSnippet && (
                  <div className="bg-[#050507] border border-[#ccff00]/30 p-3 rounded-sm font-mono text-[11px] text-[#ccff00] overflow-x-auto">
                    <pre><code>{domain.codeSnippet}</code></pre>
                  </div>
                )}

                {/* Skill Pills */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {domain.skills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-white/5 border border-white/10 text-slate-300 font-mono text-xs px-2.5 py-1 rounded-sm group-hover:border-[#ccff00]/30 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between font-mono text-xs text-slate-400">
                <span>DOMAIN ARCHITECTURE 0{index + 1}</span>
                <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[#ccff00] transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
