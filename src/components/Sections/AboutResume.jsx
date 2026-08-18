import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Download, X } from 'lucide-react';
import { personalData, projectsData } from '../../data/portfolioData';

export default function AboutResume({ engineerMode, resumeOpen, setResumeOpen }) {
  const stats = [
    { num: "2+", label: "YEARS OF LEARNING" },
    { num: "15+", label: "PROJECTS COMPLETED" },
    { num: "5+", label: "TECHNOLOGIES MASTERED" },
    { num: "∞", label: "CUPS OF COFFEE" },
  ];

  return (
    <section id="about" className="py-28 px-6 md:px-12 bg-[#0A0A0A] text-white relative border-t border-white/10 font-mono">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Margin Vertical Tag */}
        <div className="hidden lg:flex lg:col-span-1 flex-col items-center justify-start h-full">
          <div className="font-mono text-4xl font-extrabold text-[#8B6DFF]">02</div>
          <div className="vertical-tag font-mono text-xs text-slate-400 uppercase tracking-[0.3em] font-bold mt-6">
            ABOUT ME
          </div>
        </div>

        {/* Middle Column: Bio & Stats */}
        <div className="lg:col-span-6 space-y-8">
          <div>
            <h2 className="font-syne text-4xl sm:text-6xl font-extrabold text-white uppercase tracking-tight">
              ABOUT ME
            </h2>
            <div className="w-16 h-1 bg-[#8B6DFF] mt-2"></div>
          </div>

          <div className="font-sans text-slate-300 space-y-4 text-base leading-relaxed">
            <p>
              I love turning ideas into functional, beautiful and meaningful digital experiences.
            </p>
            <p>
              From web applications to AI models and immersive 3D, I enjoy exploring endless possibilities of technology.
            </p>
          </div>

          {/* Stats Grid (Matching Reference) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/10">
            {stats.map((s) => (
              <div key={s.label} className="space-y-1">
                <div className="font-syne text-3xl font-extrabold text-[#8B6DFF]">{s.num}</div>
                <div className="font-mono text-[10px] text-slate-400 uppercase tracking-widest leading-tight">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => setResumeOpen(true)}
              className="btn-editorial-purple flex items-center gap-2"
            >
              <FileText size={16} />
              <span>VIEW RESUME</span>
            </button>

            <a
              href={personalData.domain}
              target="_blank"
              rel="noreferrer"
              className="btn-editorial-outline text-white border-white hover:border-[#8B6DFF] flex items-center gap-2"
            >
              <Download size={16} />
              <span>DOWNLOAD PDF</span>
            </a>
          </div>
        </div>

        {/* Right Column: B&W Coding Workspace Image */}
        <div className="lg:col-span-5 relative">
          <div className="border border-white/20 p-2 bg-[#141414]">
            <img
              src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80"
              alt="Reuben Coding Workspace"
              className="w-full h-[380px] object-cover filter grayscale contrast-125 brightness-80"
            />
          </div>
        </div>

      </div>

      {/* Interactive Resume Modal */}
      <AnimatePresence>
        {resumeOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-8 overflow-y-auto"
          >
            <div className="relative w-full max-w-4xl bg-[#141414] border border-white/20 p-6 md:p-12 rounded-none text-slate-200 my-8 shadow-2xl space-y-8 font-mono">
              
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <div>
                  <h2 className="font-syne text-3xl font-bold text-white uppercase">{personalData.name}</h2>
                  <div className="text-xs text-[#8B6DFF]">{personalData.subTagline} // RESUME EXPERIENCE</div>
                </div>

                <button
                  onClick={() => setResumeOpen(false)}
                  className="p-2 bg-white/5 hover:bg-[#8B6DFF] hover:text-white rounded-none transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Resume Details */}
              <div className="space-y-6 text-xs max-h-[70vh] overflow-y-auto pr-2">
                <div>
                  <h4 className="font-bold text-[#8B6DFF] text-sm uppercase mb-2">EDUCATION</h4>
                  <div className="bg-black/50 p-4 border border-white/10">
                    <div className="font-bold text-white text-sm">{personalData.education.degree} — {personalData.education.specialization}</div>
                    <div className="text-slate-400">{personalData.education.institution}</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-[#8B6DFF] text-sm uppercase mb-2">TECHNICAL SKILLS</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-[11px]">
                    <div className="bg-black/50 p-3 border border-white/10">React, Next.js, HTML, CSS, JS</div>
                    <div className="bg-black/50 p-3 border border-white/10">PHP, Node.js, REST APIs</div>
                    <div className="bg-black/50 p-3 border border-white/10">Python, Scikit-Learn, ML</div>
                    <div className="bg-black/50 p-3 border border-white/10">Unity 3D, C#, LUA, Figma</div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center border-t border-white/10 pt-4">
                <a href={personalData.domain} target="_blank" rel="noreferrer" className="btn-editorial-purple text-xs flex items-center gap-2">
                  <Download size={14} />
                  <span>DOWNLOAD PDF</span>
                </a>

                <button onClick={() => setResumeOpen(false)} className="text-xs text-slate-400 hover:text-white uppercase">
                  [ CLOSE ]
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
