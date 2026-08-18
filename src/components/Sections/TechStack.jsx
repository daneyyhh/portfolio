import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Layers, CheckCircle2, Sparkles, Filter } from 'lucide-react';
import { skillMatrix, projectsData } from '../../data/portfolioData';

export default function TechStack({ onSelectProject }) {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [activeDomainFilter, setActiveDomainFilter] = useState('ALL');

  const domains = ['ALL', 'Frontend', 'Backend', 'Database', 'AI / ML', 'Game Dev', 'Design', 'Tools'];

  const filteredSkills = activeDomainFilter === 'ALL'
    ? skillMatrix
    : skillMatrix.filter(s => s.domain === activeDomainFilter);

  const highlightedProjects = selectedSkill
    ? projectsData.filter(p => selectedSkill.projects.includes(p.id))
    : [];

  return (
    <section id="skills" className="py-24 px-6 md:px-12 bg-[#050507] relative overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#ccff00] tracking-widest uppercase mb-2">
              <span className="w-2 h-2 rounded-full bg-[#ccff00]"></span>
              <span>VERIFIED TECH ECOSYSTEM</span>
            </div>
            <h2 className="font-syne text-4xl md:text-6xl font-extrabold text-white uppercase tracking-tight">
              INTERACTIVE SKILL MATRIX
            </h2>
          </div>

          <p className="font-mono text-xs text-slate-400 max-w-md">
            Click any technology skill to highlight the exact projects where that skill was practically implemented.
          </p>
        </div>

        {/* Domain Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {domains.map((dom) => (
            <button
              key={dom}
              onClick={() => {
                setActiveDomainFilter(dom);
                setSelectedSkill(null);
              }}
              className={`font-mono text-xs px-3.5 py-1.5 rounded-sm border transition-all ${
                activeDomainFilter === dom
                  ? 'bg-[#ccff00] text-black border-[#ccff00] font-bold'
                  : 'bg-white/5 border-white/10 text-slate-300 hover:border-white/30'
              }`}
            >
              {dom}
            </button>
          ))}
        </div>

        {/* Interactive Skill Matrix Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSkills.map((item, idx) => {
            const isSelected = selectedSkill?.name === item.name;

            return (
              <motion.div
                key={item.name}
                onClick={() => setSelectedSkill(isSelected ? null : item)}
                className={`p-5 rounded-sm border font-mono transition-all duration-200 cursor-pointer flex justify-between items-center ${
                  isSelected
                    ? 'bg-[#ccff00] text-black border-[#ccff00] font-bold shadow-[0_0_20px_rgba(204,255,0,0.4)]'
                    : 'bg-[#0f0f13] border-white/10 hover:border-[#ccff00]/40 text-slate-200'
                }`}
                data-cursor="HIGHLIGHT"
              >
                <div>
                  <span className="text-[10px] text-purple-400 uppercase tracking-widest block font-normal">
                    [{item.domain}]
                  </span>
                  <span className="text-sm font-bold uppercase">{item.name}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono opacity-80">
                    {item.projects.length} {item.projects.length === 1 ? 'PROJ' : 'PROJS'}
                  </span>
                  <CheckCircle2 size={16} className={isSelected ? 'text-black' : 'text-[#ccff00]'} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Highlighted Associated Projects Box */}
        {selectedSkill && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#0f0f13] border-2 border-[#ccff00] p-6 rounded-sm space-y-4"
          >
            <div className="flex items-center gap-2 text-xs font-mono text-[#ccff00] tracking-widest uppercase">
              <Sparkles size={16} />
              <span>PROJECTS UTILIZING {selectedSkill.name.toUpperCase()}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {highlightedProjects.map(proj => (
                <div
                  key={proj.id}
                  onClick={() => onSelectProject(proj)}
                  className="bg-[#050507] border border-white/10 p-4 rounded-sm hover:border-[#ccff00] transition-colors cursor-pointer"
                >
                  <div className="text-[10px] font-mono text-purple-400 uppercase">{proj.category}</div>
                  <div className="font-syne font-bold text-white uppercase text-base">{proj.title}</div>
                  <p className="font-sans text-xs text-slate-400 line-clamp-2 mt-1">{proj.shortDesc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

      </div>
    </section>
  );
}
