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
    <section id="projects" className="py-28 px-6 md:px-12 bg-[#F1F0EB] text-[#111111] relative border-t border-[#C9C7C0] font-mono">
      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end border-b border-[#C9C7C0] pb-8">
          <div className="hidden lg:flex lg:col-span-1">
            <span className="font-mono text-4xl font-extrabold text-[#111111]">04</span>
          </div>

          <div className="lg:col-span-7">
            <div className="text-xs text-[#8B6DFF] font-bold uppercase tracking-widest mb-1">
              FEATURED ENGINEERING
            </div>
            <h2 className="font-syne text-4xl md:text-6xl font-extrabold text-[#111111] uppercase tracking-tight">
              SELECTED WORK
            </h2>
          </div>

          <div className="lg:col-span-4 flex justify-end">
            <span className="text-xs text-[#555555]">SHOWING {filteredProjects.length} REPOSITORIES</span>
          </div>
        </div>

        {/* Animated Tabs (Matching Reference) */}
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-xs font-mono font-bold border transition-all uppercase ${
                activeTab === tab
                  ? 'bg-[#111111] text-white border-[#111111]'
                  : 'bg-[#FAF9F5] border-[#C9C7C0] text-[#111111] hover:border-[#8B6DFF]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Project Cards Grid (Matching Reference) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="bg-[#FAF9F5] border border-[#C9C7C0] rounded-none overflow-hidden group hover:border-[#8B6DFF] transition-all duration-300 flex flex-col justify-between"
                data-cursor="VIEW"
              >
                <div>
                  {/* Card Image Banner */}
                  <div
                    onClick={() => onSelectProject(project)}
                    className="relative h-60 overflow-hidden cursor-pointer bg-[#111111]"
                  >
                    <img
                      src={project.img}
                      alt={project.title}
                      className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-[#111111] text-[#8B6DFF] text-[10px] font-bold px-2.5 py-1 uppercase">
                      {project.category}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 space-y-3">
                    <div className="flex justify-between items-start">
                      <h3
                        onClick={() => onSelectProject(project)}
                        className="font-syne text-2xl font-bold text-[#111111] uppercase group-hover:text-[#8B6DFF] transition-colors cursor-pointer"
                      >
                        {project.title}
                      </h3>
                      <button onClick={() => onSelectProject(project)} className="text-[#555555] group-hover:text-[#8B6DFF]">
                        <ArrowUpRight size={20} />
                      </button>
                    </div>

                    <p className="font-sans text-xs text-slate-700 leading-relaxed line-clamp-3">
                      {project.shortDesc}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.technologies.map(t => (
                        <span key={t} className="bg-[#E4E2DC] text-[#111111] text-[10px] font-bold px-2 py-0.5 border border-[#C9C7C0]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="p-6 pt-0 border-t border-[#C9C7C0] flex items-center justify-between text-xs mt-4 pt-4">
                  <button
                    onClick={() => onSelectProject(project)}
                    className="text-[#111111] font-bold group-hover:text-[#8B6DFF] flex items-center gap-1 uppercase"
                  >
                    <span>CASE STUDY</span>
                    <ArrowUpRight size={14} />
                  </button>

                  <div className="flex gap-3 text-[#555555]">
                    {project.githubLink && (
                      <a href={project.githubLink} target="_blank" rel="noreferrer" className="hover:text-[#111111]">
                        <Github size={14} />
                      </a>
                    )}
                    {project.demoLink && (
                      <a href={project.demoLink} target="_blank" rel="noreferrer" className="hover:text-[#8B6DFF]">
                        <ExternalLink size={14} />
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
