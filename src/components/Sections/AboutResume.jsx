import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Download, X, ExternalLink, CheckCircle2, UserCheck } from 'lucide-react';
import { personalData, projectsData, certificationsData } from '../../data/portfolioData';

export default function AboutResume({ engineerMode, resumeOpen, setResumeOpen }) {
  return (
    <section id="about" className="py-24 px-6 md:px-12 bg-[#050507] relative overflow-hidden border-t border-white/10 font-mono">
      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* About Story Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs text-[#ccff00] tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-[#ccff00]"></span>
              <span>CREATIVE ENGINEER PROFILE</span>
            </div>

            <h2 className="font-syne text-4xl md:text-6xl font-extrabold text-white uppercase tracking-tight">
              ABOUT REUBEN
            </h2>

            <div className="font-sans text-slate-300 space-y-4 text-base leading-relaxed">
              <p>
                My background began in 3D game engines and gameplay programming during my BCA specialization in Game Development. Coding C# physics loops, particle interactions, and low-level shader math gave me a deep appreciation for execution speed and dynamic user immersion.
              </p>
              <p>
                As I expanded into full-stack web architecture, UI/UX design, and AI machine learning classification models, I realized that true digital craftsmanship happens when engineering rigor meets cinematic design.
              </p>
              <p>
                Whether I am engineering a real-time collaborative web application, optimizing multi-threaded LUA server scripts, or training machine learning classification pipelines in Python, my goal is always to build software that is fast, resilient, and visually memorable.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => setResumeOpen(true)}
                className="btn-lime flex items-center gap-2"
              >
                <FileText size={16} />
                <span>VIEW INTERACTIVE RESUME</span>
              </button>

              <a
                href={`${personalData.domain}`}
                target="_blank"
                rel="noreferrer"
                className="btn-outline flex items-center gap-2"
              >
                <Download size={16} />
                <span>DOWNLOAD RESUME PDF</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#0f0f13] border border-white/15 p-8 rounded-sm space-y-6">
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <span className="font-syne font-bold text-lg text-white uppercase">FACT SHEET</span>
              <span className="text-[#ccff00] font-bold">REUBG.IN</span>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-slate-400">NAME:</span>
                <span className="text-white font-bold">{personalData.name}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-slate-400">ROLE:</span>
                <span className="text-[#ccff00] font-bold">{personalData.subTagline}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-slate-400">LOCATION:</span>
                <span className="text-white font-bold">{personalData.location}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-slate-400">DEGREE:</span>
                <span className="text-purple-400 font-bold">{personalData.education.degree}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-slate-400">STATUS:</span>
                <span className="text-[#ccff00] font-bold">{personalData.status}</span>
              </div>
            </div>
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
            <div className="relative w-full max-w-4xl bg-[#09090b] border border-white/20 p-6 md:p-12 rounded-sm text-slate-200 my-8 shadow-2xl space-y-8">
              
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <div>
                  <h2 className="font-syne text-3xl font-bold text-white uppercase">{personalData.name}</h2>
                  <div className="text-xs text-[#ccff00]">{personalData.subTagline} // RESUME EXPERIENCE</div>
                </div>

                <button
                  onClick={() => setResumeOpen(false)}
                  className="p-2 bg-white/5 hover:bg-[#ccff00] hover:text-black rounded-sm transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Resume Sections */}
              <div className="space-y-6 text-xs max-h-[70vh] overflow-y-auto pr-2">
                <div>
                  <h4 className="font-bold text-white text-sm uppercase mb-2 text-[#ccff00]">EDUCATION</h4>
                  <div className="bg-[#0f0f13] p-4 border border-white/10 rounded-sm">
                    <div className="font-bold text-white text-sm">{personalData.education.degree} — {personalData.education.specialization}</div>
                    <div className="text-slate-400">{personalData.education.institution}</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-white text-sm uppercase mb-2 text-[#ccff00]">TECHNICAL SKILLS</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-[11px]">
                    <div className="bg-[#0f0f13] p-3 border border-white/10">React, Next.js, HTML5, CSS3, JS</div>
                    <div className="bg-[#0f0f13] p-3 border border-white/10">PHP, Node.js, REST APIs</div>
                    <div className="bg-[#0f0f13] p-3 border border-white/10">Python, Scikit-Learn, ML</div>
                    <div className="bg-[#0f0f13] p-3 border border-white/10">Unity 3D, C#, LUA, Figma</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-white text-sm uppercase mb-2 text-[#ccff00]">KEY PROJECTS & CERTIFICATIONS</h4>
                  <div className="space-y-2">
                    {projectsData.map(p => (
                      <div key={p.id} className="bg-[#0f0f13] p-3 border border-white/10 flex justify-between items-center">
                        <span className="font-bold text-white">{p.title} ({p.category})</span>
                        <span className="text-slate-400">{p.technologies.join(', ')}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center border-t border-white/10 pt-4">
                <a
                  href={`${personalData.domain}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-lime text-xs flex items-center gap-2"
                >
                  <Download size={14} />
                  <span>DOWNLOAD OFFICIAL PDF</span>
                </a>

                <button
                  onClick={() => setResumeOpen(false)}
                  className="text-xs text-slate-400 hover:text-white uppercase"
                >
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
