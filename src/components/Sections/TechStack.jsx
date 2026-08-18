import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { skillMatrix, projectsData } from '../../data/portfolioData';

export default function TechStack({ onSelectProject }) {
  const [selectedSkill, setSelectedSkill] = useState(null);

  return (
    <section id="skills" className="py-28 px-6 md:px-12 bg-[#F1F0EB] text-[#111111] relative border-t border-[#C9C7C0] font-mono">
      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end border-b border-[#C9C7C0] pb-8">
          <div className="hidden lg:flex lg:col-span-1">
            <span className="font-mono text-4xl font-extrabold text-[#111111]">06</span>
          </div>

          <div className="lg:col-span-7">
            <div className="text-xs text-[#8B6DFF] font-bold uppercase tracking-widest mb-1">
              TOOLING & STACK
            </div>
            <h2 className="font-syne text-4xl md:text-6xl font-extrabold text-[#111111] uppercase tracking-tight">
              TECHNOLOGIES
            </h2>
            <p className="font-sans text-slate-700 text-sm mt-2 max-w-lg">
              Tools and technologies I work with across web, AI, design, and 3D engine development.
            </p>
          </div>
        </div>

        {/* Orbiting Ecosystem Representation Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {skillMatrix.map((item) => {
            const isSelected = selectedSkill?.name === item.name;

            return (
              <button
                key={item.name}
                onClick={() => setSelectedSkill(isSelected ? null : item)}
                className={`p-4 border text-left transition-all duration-300 ${
                  isSelected
                    ? 'bg-[#111111] text-white border-[#111111] shadow-lg'
                    : 'bg-[#FAF9F5] border-[#C9C7C0] text-[#111111] hover:border-[#8B6DFF]'
                }`}
              >
                <div className="text-[10px] text-[#8B6DFF] uppercase font-bold">{item.domain}</div>
                <div className="font-syne font-bold text-sm uppercase mt-1">{item.name}</div>
                <div className="text-[10px] text-[#555555] mt-2">{item.projects.length} PROJECTS</div>
              </button>
            );
          })}
        </div>

        {/* Selected Skill Associated Projects Box */}
        {selectedSkill && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#FAF9F5] border-2 border-[#111111] p-6 rounded-none space-y-4"
          >
            <div className="text-xs font-bold text-[#8B6DFF] uppercase">
              PROJECTS UTILIZING {selectedSkill.name.toUpperCase()}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {projectsData.filter(p => selectedSkill.projects.includes(p.id)).map(proj => (
                <div
                  key={proj.id}
                  onClick={() => onSelectProject(proj)}
                  className="bg-[#E4E2DC] border border-[#C9C7C0] p-4 cursor-pointer hover:border-[#8B6DFF]"
                >
                  <div className="text-[10px] text-[#555555] uppercase">{proj.category}</div>
                  <div className="font-syne font-bold text-[#111111] uppercase text-sm">{proj.title}</div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

      </div>
    </section>
  );
}
