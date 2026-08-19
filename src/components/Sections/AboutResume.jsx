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
    <section id="about" className="py-24 sm:py-28 px-4 sm:px-6 md:px-12 bg-[#0A0A0A] text-white relative border-t border-white/10 font-mono w-full overflow-x-clip">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10 w-full">
        
        {/* Left Margin Vertical Tag */}
        <div className="hidden lg:flex lg:col-span-1 flex-col items-center justify-start h-full">
          <div className="font-mono text-4xl font-extrabold text-[#8B6DFF]">02</div>
          <div className="vertical-tag font-mono text-xs text-slate-400 uppercase tracking-[0.3em] font-bold mt-6">
            ABOUT ME
          </div>
        </div>

        {/* Middle Column: Bio & Stats */}
        <div className="lg:col-span-6 space-y-6 sm:space-y-8 w-full max-w-full">
          <div>
            <h2
              className="font-syne font-extrabold text-white uppercase tracking-tight w-full max-w-full"
              style={{
                fontSize: 'clamp(2rem, 8vw, 3.75rem)',
                letterSpacing: 'clamp(-0.03em, -0.2vw, -0.01em)',
              }}
            >
              ABOUT ME
            </h2>
            <div className="w-16 h-1 bg-[#8B6DFF] mt-2"></div>
          </div>

          <div className="font-sans text-slate-300 space-y-3 sm:space-y-4 text-sm sm:text-base leading-relaxed">
            <p>
              I love turning ideas into functional, beautiful and meaningful digital experiences.
            </p>
            <p>
              From web applications to AI models and immersive 3D, I enjoy exploring endless possibilities of technology.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/10 w-full">
            {stats.map((s) => (
              <div key={s.label} className="space-y-1">
                <div className="font-syne text-2xl sm:text-3xl font-extrabold text-[#8B6DFF]">{s.num}</div>
                <div className="font-mono text-[9px] sm:text-[10px] text-slate-400 uppercase tracking-widest leading-tight">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 sm:gap-4 pt-2">
            <button
              onClick={() => setResumeOpen(true)}
              className="btn-editorial-purple flex items-center gap-2 text-xs sm:text-sm"
            >
              <FileText size={16} />
              <span>VIEW RESUME</span>
            </button>

            <a
              href={personalData.domain}
              target="_blank"
              rel="noreferrer"
              className="btn-editorial-outline text-white border-white hover:border-[#8B6DFF] flex items-center gap-2 text-xs sm:text-sm"
            >
              <Download size={16} />
              <span>DOWNLOAD PDF</span>
            </a>
          </div>
        </div>

        {/* Right Column: B&W Coding Workspace Image */}
        <div className="lg:col-span-5 relative w-full max-w-full">
          <div className="border border-white/20 p-2 bg-[#141414] w-full">
            <img
              src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80"
              alt="Reuben Coding Workspace"
              className="w-full h-[280px] sm:h-[380px] object-cover filter grayscale contrast-125 brightness-80"
            />
          </div>
        </div>

      </div>

      {/* Interactive Resume Modal */}
      <AnimatePresence>
        {resumeOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-3xl bg-[#141414] border border-white/20 p-6 md:p-8 max-h-[90vh] overflow-y-auto space-y-6 text-slate-200"
            >
              <button
                onClick={() => setResumeOpen(false)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
              >
                <X size={20} />
              </button>

              <div className="border-b border-white/10 pb-4">
                <div className="text-xs text-[#8B6DFF] uppercase tracking-widest font-bold">CURRICULUM VITAE</div>
                <h2 className="font-syne text-2xl sm:text-3xl font-bold text-white uppercase">{personalData.name}</h2>
                <div className="text-xs text-slate-400 mt-1">{personalData.title} · {personalData.location}</div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm font-sans">
                <div className="font-mono text-xs text-[#8B6DFF] font-bold uppercase tracking-wider">CAREER OBJECTIVE</div>
                <p className="leading-relaxed text-slate-300">{personalData.bio}</p>
              </div>

              <div className="space-y-3">
                <div className="font-mono text-xs text-[#8B6DFF] font-bold uppercase tracking-wider">CORE COMPETENCIES</div>
                <div className="flex flex-wrap gap-1.5 text-xs font-mono">
                  {['React', 'Next.js', 'Node.js', 'Python', 'Three.js', 'Tailwind CSS', 'MongoDB', 'PostgreSQL', 'LUA', 'Figma', 'UI/UX'].map((skill) => (
                    <span key={skill} className="bg-[#0A0A0A] border border-white/10 px-2.5 py-1 text-slate-300">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div className="font-mono text-xs text-[#8B6DFF] font-bold uppercase tracking-wider">EDUCATION</div>
                <div className="bg-[#0A0A0A] p-4 border border-white/10 space-y-1">
                  <div className="font-bold text-white text-xs sm:text-sm">Bachelor of Computer Applications (BCA)</div>
                  <div className="text-xs text-slate-400">Yenepoya Deemed-to-be University · 2022 — 2025</div>
                  <div className="text-[11px] text-[#8B6DFF]">CGPA: 8.5 / 10 · Cloud Computing & Cyber Security</div>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setResumeOpen(false)}
                  className="btn-editorial-purple text-xs"
                >
                  CLOSE PREVIEW
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
