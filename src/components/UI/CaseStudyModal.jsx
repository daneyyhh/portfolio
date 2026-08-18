import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Layers, CheckCircle2 } from 'lucide-react';

export default function CaseStudyModal({ project, onClose }) {
  if (!project) return null;
  const cs = project.caseStudy || {};

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-[#0A0A0A]/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-8 overflow-y-auto font-mono selection:bg-[#8B6DFF] selection:text-white"
      >
        <div className="relative w-full max-w-5xl bg-[#141414] border border-white/15 my-8 overflow-hidden shadow-2xl rounded-none text-slate-200">
          
          {/* Top Bar Header */}
          <div className="sticky top-0 z-20 bg-[#0A0A0A] border-b border-white/10 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#8B6DFF] animate-pulse"></span>
              <span className="text-xs font-mono text-[#8B6DFF] tracking-widest uppercase">
                CASE STUDY // {project.id.toUpperCase()}
              </span>
            </div>
            
            <button
              onClick={onClose}
              className="p-2 bg-white/5 hover:bg-[#8B6DFF] hover:text-white border border-white/10 rounded-none transition-all"
              title="Close Case Study"
            >
              <X size={20} />
            </button>
          </div>

          {/* Modal Main Content Container */}
          <div className="p-6 md:p-12 space-y-12 max-h-[80vh] overflow-y-auto">
            
            {/* Title & Metadata */}
            <div className="space-y-6">
              <div className="inline-block bg-[#8B6DFF]/10 border border-[#8B6DFF]/30 text-[#8B6DFF] px-3 py-1 text-xs font-mono tracking-widest uppercase">
                {project.category}
              </div>
              
              <h1 className="font-syne text-4xl md:text-6xl font-extrabold text-white tracking-tight uppercase">
                {project.title}
              </h1>

              <div className="flex flex-wrap gap-2 pt-2">
                {project.technologies.map(tech => (
                  <span key={tech} className="bg-white/5 border border-white/10 text-xs px-3 py-1 text-slate-300 font-mono">
                    {tech}
                  </span>
                ))}
              </div>

              {/* Cover Image Banner */}
              <div className="relative h-64 md:h-96 w-full overflow-hidden border border-white/10 my-6">
                <img
                  src={project.img}
                  alt={project.title}
                  className="w-full h-full object-cover filter contrast-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent"></div>
              </div>
            </div>

            {/* 01 OVERVIEW */}
            <section className="space-y-3 border-l-2 border-[#8B6DFF] pl-6">
              <div className="text-xs text-[#8B6DFF] font-mono tracking-widest">01 — OVERVIEW</div>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed font-sans">
                {cs.overview || project.shortDesc}
              </p>
            </section>

            {/* 02 PROBLEM */}
            <section className="space-y-3 border-l-2 border-slate-500 pl-6">
              <div className="text-xs text-slate-400 font-mono tracking-widest">02 — PROBLEM & CHALLENGE</div>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed font-sans">
                {cs.problem || project.challenge}
              </p>
            </section>

            {/* 03 APPROACH */}
            <section className="space-y-3 border-l-2 border-[#8B6DFF] pl-6">
              <div className="text-xs text-[#8B6DFF] font-mono tracking-widest">03 — TECHNICAL APPROACH</div>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed font-sans">
                {cs.approach || project.built}
              </p>
            </section>

            {/* 04 ARCHITECTURE FLOW */}
            {cs.architecture && (
              <section className="space-y-4">
                <div className="text-xs text-[#8B6DFF] font-mono tracking-widest">04 — SYSTEM ARCHITECTURE</div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {cs.architecture.map((item, idx) => (
                    <div key={idx} className="bg-[#0A0A0A] border border-white/10 p-5 rounded-none space-y-2">
                      <div className="flex justify-between items-center text-xs text-[#8B6DFF]">
                        <span className="font-bold">NODE 0{idx + 1}</span>
                        <Layers size={14} />
                      </div>
                      <h4 className="font-bold text-white text-sm uppercase">{item.node}</h4>
                      <div className="text-xs font-mono text-slate-400">{item.tech}</div>
                      <p className="text-xs text-slate-400 leading-relaxed font-sans">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 05 DEVELOPMENT */}
            <section className="space-y-3 bg-[#0A0A0A] border border-white/10 p-6">
              <div className="text-xs text-[#8B6DFF] font-mono tracking-widest">05 — DEVELOPMENT SPECIFICS</div>
              <p className="text-slate-300 text-sm leading-relaxed font-sans">
                {cs.development || "Executed modular design pattern with clean component interfaces and strict unit testing constraints."}
              </p>
            </section>

            {/* 06 INTERACTION / UI */}
            <section className="space-y-3 border-l-2 border-[#8B6DFF] pl-6">
              <div className="text-xs text-[#8B6DFF] font-mono tracking-widest">06 — INTERACTION & UI/UX</div>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed font-sans">
                {cs.uiDesign || "Engineered responsive component layouts with high visual contrast, accessible font sizing, and smooth state updates."}
              </p>
            </section>

            {/* 07 RESULT / LEARNING */}
            <section className="bg-[#8B6DFF]/10 border border-[#8B6DFF]/30 p-6 space-y-2">
              <div className="flex items-center gap-2 text-xs text-[#8B6DFF] font-mono tracking-widest">
                <CheckCircle2 size={16} />
                <span>07 — RESULT & KEY LEARNING</span>
              </div>
              <p className="text-white text-sm font-semibold leading-relaxed font-sans">
                {cs.result || "Achieved high performance metrics and clean deployment pipeline."}
              </p>
            </section>

            {/* Bottom Action Footer */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap gap-4 justify-between items-center">
              <div className="flex gap-4">
                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/20 text-white font-mono text-xs px-4 py-2.5 transition-all"
                  >
                    <Github size={16} />
                    <span>VIEW ON GITHUB</span>
                  </a>
                )}
                {project.demoLink && (
                  <a
                    href={project.demoLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 bg-[#8B6DFF] text-white font-mono font-bold text-xs px-4 py-2.5 hover:bg-[#7a5ceb] transition-all"
                  >
                    <ExternalLink size={16} />
                    <span>LIVE DOMAIN (REUBG.IN)</span>
                  </a>
                )}
              </div>

              <button
                onClick={onClose}
                className="text-xs text-slate-400 hover:text-white uppercase tracking-widest"
              >
                [ CLOSE CASE STUDY ]
              </button>
            </div>

          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
