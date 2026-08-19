import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ExternalLink, Github } from 'lucide-react';
import { projectsData } from '../../data/portfolioData';

export default function Projects({ onSelectProject }) {
  const [activeTab, setActiveTab] = useState('ALL');

  const tabs = ['ALL', 'FULL-STACK', 'AI / ML', 'GAME DEV', 'UI / UX'];

  const filteredProjects = activeTab === 'ALL'
    ? projectsData
    : projectsData.filter(p => {
        if (activeTab === 'FULL-STACK') return p.category.includes('Full-Stack');
        if (activeTab === 'AI / ML') return p.category.includes('AI') || p.category.includes('ML');
        if (activeTab === 'GAME DEV') return p.category.includes('Game');
        if (activeTab === 'UI / UX') return p.category.includes('UI/UX');
        return true;
      });

  return (
    <section id="projects" className="py-24 sm:py-28 px-4 sm:px-6 md:px-12 bg-[#F1F0EB] text-[#111111] relative border-t border-[#C9C7C0] font-mono w-full overflow-x-clip">
      <div className="max-w-7xl mx-auto space-y-10 sm:space-y-12 relative z-10 w-full">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-end border-b border-[#C9C7C0] pb-6 sm:pb-8 w-full">
          <div className="hidden lg:flex lg:col-span-1">
            <span className="font-mono text-4xl font-extrabold text-[#111111]">04</span>
          </div>

          <div className="lg:col-span-7 w-full max-w-full">
            <div className="text-xs text-[#8B6DFF] font-bold uppercase tracking-widest mb-1">
              FEATURED ENGINEERING
            </div>
            <h2
              className="font-syne font-extrabold text-[#111111] uppercase tracking-tight w-full max-w-full"
              style={{
                fontSize: 'clamp(1.85rem, 7.5vw, 3.75rem)',
                letterSpacing: 'clamp(-0.03em, -0.2vw, -0.01em)',
              }}
            >
              SELECTED WORK
            </h2>
          </div>

          <div className="lg:col-span-4 flex justify-start lg:justify-end">
            <span className="text-[10px] sm:text-xs text-[#555555]">SHOWING {filteredProjects.length} REPOSITORIES</span>
          </div>
        </div>

        {/* Animated Tabs */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 w-full">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs font-mono font-bold border transition-all uppercase ${
                activeTab === tab
                  ? 'bg-[#111111] text-white border-[#111111]'
                  : 'bg-[#FAF9F5] border-[#C9C7C0] text-[#111111] hover:border-[#8B6DFF]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="bg-[#FAF9F5] border border-[#C9C7C0] rounded-none overflow-hidden group hover:border-[#8B6DFF] transition-all duration-300 flex flex-col justify-between w-full max-w-full"
                data-cursor="VIEW"
              >
                <div className="w-full">
                  {/* Card Image Banner */}
                  <div
                    onClick={() => onSelectProject(project)}
                    className="relative h-48 sm:h-60 overflow-hidden cursor-pointer bg-[#111111] w-full"
                  >
                    <img
                      src={project.img}
                      alt={project.title}
                      className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-[#111111] text-[#8B6DFF] text-[9px] sm:text-[10px] font-bold px-2 sm:px-2.5 py-1 uppercase">
                      {project.category}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                    <div className="flex justify-between items-start">
                      <h3
                        onClick={() => onSelectProject(project)}
                        className="font-syne text-lg sm:text-xl font-bold text-[#111111] group-hover:text-[#8B6DFF] transition-colors cursor-pointer"
                      >
                        {project.title}
                      </h3>
                      <span className="text-[10px] font-mono text-[#555555]">{project.year}</span>
                    </div>

                    <p className="font-sans text-slate-700 text-xs sm:text-sm leading-relaxed">
                      {project.desc}
                    </p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1 pt-1">
                      {project.technologies.map(t => (
                        <span key={t} className="bg-[#E4E2DC] text-[#111111] text-[9px] sm:text-[10px] px-2 py-0.5 border border-[#C9C7C0]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="p-4 sm:p-6 pt-0 border-t border-[#E4E2DC] mt-4 flex items-center justify-between">
                  <button
                    onClick={() => onSelectProject(project)}
                    className="text-xs font-mono font-bold text-[#111111] group-hover:text-[#8B6DFF] flex items-center gap-1.5 transition-colors"
                  >
                    <span>CASE STUDY</span>
                    <ArrowUpRight size={14} />
                  </button>

                  <div className="flex items-center gap-3">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-600 hover:text-[#8B6DFF] transition-colors"
                        title="GitHub Source"
                      >
                        <Github size={16} />
                      </a>
                    )}
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-600 hover:text-[#8B6DFF] transition-colors"
                        title="Live Preview"
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
