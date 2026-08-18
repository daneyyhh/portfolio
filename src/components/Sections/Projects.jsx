import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowUpRight, Layers } from 'lucide-react';
import { projectsData } from '../../data/portfolioData';

export default function Projects({ onSelectProject }) {
  const [filter, setFilter] = useState('ALL');

  const categories = ['ALL', 'Full-Stack Web App', 'Game Systems & LUA', 'Full-Stack Web System', 'Game Development', 'AI / Machine Learning', 'UI/UX & Web Frontend'];

  const filteredProjects = filter === 'ALL'
    ? projectsData
    : projectsData.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-24 px-6 md:px-12 bg-[#09090b] relative overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#ccff00] tracking-widest uppercase mb-2">
              <span className="w-2 h-2 rounded-full bg-[#ccff00]"></span>
              <span>AUTHENTIC PORTFOLIO WORKS</span>
            </div>
            <h2 className="font-syne text-4xl md:text-6xl font-extrabold text-white uppercase tracking-tight">
              SELECTED WORK
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`font-mono text-xs px-3 py-1.5 rounded-sm border transition-all ${
                  filter === cat
                    ? 'bg-[#ccff00] text-black border-[#ccff00] font-bold'
                    : 'bg-white/5 border-white/10 text-slate-300 hover:border-white/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="bg-[#0f0f13] border border-white/15 rounded-sm overflow-hidden group hover:border-[#ccff00]/50 transition-all duration-300 flex flex-col justify-between"
              data-cursor="VIEW CASE"
            >
              <div>
                {/* Project Image Banner */}
                <div
                  onClick={() => onSelectProject(project)}
                  className="relative h-56 overflow-hidden cursor-pointer bg-black/40"
                >
                  <img
                    src={project.img}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter contrast-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f13] via-transparent to-transparent opacity-80" />
                  
                  {/* Category Pill */}
                  <div className="absolute top-4 left-4 z-10 bg-black/80 backdrop-blur-md border border-white/20 text-[#ccff00] text-[10px] font-mono font-bold px-2.5 py-1 rounded-sm uppercase tracking-wider">
                    {project.category}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <h3
                      onClick={() => onSelectProject(project)}
                      className="font-syne text-2xl font-bold text-white uppercase tracking-tight group-hover:text-[#ccff00] transition-colors cursor-pointer"
                    >
                      {project.title}
                    </h3>
                    <button
                      onClick={() => onSelectProject(project)}
                      className="text-slate-400 group-hover:text-[#ccff00] transition-colors"
                      title="Open Interactive Case Study"
                    >
                      <ArrowUpRight size={22} />
                    </button>
                  </div>

                  <p className="font-sans text-sm text-slate-300 leading-relaxed line-clamp-3">
                    {project.shortDesc}
                  </p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.technologies.map(tech => (
                      <span
                        key={tech}
                        className="bg-white/5 border border-white/10 text-slate-400 font-mono text-[11px] px-2 py-0.5 rounded-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="p-6 pt-0 border-t border-white/10 flex items-center justify-between font-mono text-xs text-slate-400 mt-4">
                <button
                  onClick={() => onSelectProject(project)}
                  className="flex items-center gap-1.5 text-[#ccff00] font-bold hover:underline"
                >
                  <Layers size={14} />
                  <span>CASE STUDY & ARCHITECTURE</span>
                </button>

                <div className="flex items-center gap-3">
                  {project.githubLink && (
                    <a href={project.githubLink} target="_blank" rel="noreferrer" className="hover:text-white" title="GitHub Repo">
                      <Github size={16} />
                    </a>
                  )}
                  {project.demoLink && (
                    <a href={project.demoLink} target="_blank" rel="noreferrer" className="hover:text-[#ccff00]" title="Live Website">
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
