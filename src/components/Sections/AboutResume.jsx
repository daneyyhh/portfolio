import React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { FileText, Download, X } from 'lucide-react';
import { personalData } from '../../data/portfolioData';
import { MaskHeading, MaskParagraph, FadeInUp } from '../UI/TextReveal';
import { ParallaxElement } from '../UI/ParallaxImage';

const EASE = [0.16, 1, 0.3, 1];

export default function AboutResume({ resumeOpen, setResumeOpen }) {
  const prefersReduced = useReducedMotion();

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
          <motion.div
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="font-mono text-4xl font-extrabold text-[#FF1E27]"
          >
            02
          </motion.div>
          <motion.div
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="vertical-tag font-mono text-xs text-slate-400 uppercase tracking-[0.3em] font-bold mt-6"
          >
            ABOUT ME
          </motion.div>
        </div>

        {/* Middle Column: Bio & Stats */}
        <div className="lg:col-span-6 space-y-6 sm:space-y-8 w-full max-w-full">
          <div>
            <MaskHeading
              lines={["ABOUT ME"]}
              className="font-syne font-extrabold text-white uppercase tracking-tight w-full max-w-full"
              style={{
                fontSize: 'clamp(2rem, 8vw, 3.75rem)',
                letterSpacing: 'clamp(-0.03em, -0.2vw, -0.01em)',
              }}
              delay={0.15}
            />
            <motion.div
              initial={prefersReduced ? { scaleX: 1 } : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
              className="w-16 h-1 bg-[#FF1E27] mt-2 origin-left"
            />
          </div>

          <div className="font-sans text-slate-300 space-y-3 sm:space-y-4 text-sm sm:text-base leading-relaxed">
            <MaskParagraph delay={0.35}>
              <p>
                I love turning ideas into functional, beautiful and meaningful digital experiences.
              </p>
            </MaskParagraph>
            <MaskParagraph delay={0.45}>
              <p>
                From web applications to AI models and immersive 3D, I enjoy exploring endless possibilities of technology.
              </p>
            </MaskParagraph>
          </div>

          {/* Stats Grid with Staggered Count-Up Fade */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/10 w-full">
            {stats.map((s, idx) => (
              <FadeInUp
                key={s.label}
                delay={0.5 + idx * 0.08}
                yOffset={20}
                className="space-y-1"
              >
                <div className="font-syne text-2xl sm:text-3xl font-extrabold text-[#FF1E27]">{s.num}</div>
                <div className="font-mono text-[9px] sm:text-[10px] text-slate-400 uppercase tracking-widest leading-tight">
                  {s.label}
                </div>
              </FadeInUp>
            ))}
          </div>

          {/* Action CTAs */}
          <FadeInUp delay={0.8} className="flex flex-wrap gap-3 sm:gap-4 pt-2">
            <button
              onClick={() => setResumeOpen(true)}
              className="btn-editorial-red flex items-center gap-2 text-xs sm:text-sm cursor-pointer"
            >
              <FileText size={16} />
              <span>VIEW RESUME</span>
            </button>

            <a
              href={personalData.domain}
              target="_blank"
              rel="noreferrer"
              className="btn-editorial-outline text-white border-white hover:border-[#FF1E27] flex items-center gap-2 text-xs sm:text-sm"
            >
              <Download size={16} />
              <span>DOWNLOAD PDF</span>
            </a>
          </FadeInUp>
        </div>

        {/* Right Column: B&W Coding Workspace Image with Subtle Parallax */}
        <div className="lg:col-span-5 relative w-full max-w-full">
          <ParallaxElement speed={0.12} yOffset={20}>
            <FadeInUp delay={0.4} yOffset={30}>
              <div className="border border-white/20 p-2 bg-[#141414] w-full shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80"
                  alt="Reuben Coding Workspace"
                  className="w-full h-[280px] sm:h-[380px] object-cover filter grayscale contrast-125 brightness-80 select-none"
                />
              </div>
            </FadeInUp>
          </ParallaxElement>
        </div>

      </div>

      {/* Interactive Resume Modal */}
      <AnimatePresence>
        {resumeOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="relative w-full max-w-3xl bg-[#141414] border border-white/20 p-6 md:p-8 max-h-[90vh] overflow-y-auto space-y-6 text-slate-200 shadow-2xl"
            >
              <button
                onClick={() => setResumeOpen(false)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white cursor-pointer"
              >
                <X size={20} />
              </button>

              <div className="border-b border-white/10 pb-4">
                <div className="text-xs text-[#FF1E27] uppercase tracking-widest font-bold">CURRICULUM VITAE</div>
                <h2 className="font-syne text-2xl sm:text-3xl font-bold text-white uppercase">{personalData.name}</h2>
                <div className="text-xs text-slate-400 mt-1">{personalData.title} · {personalData.location}</div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm font-sans">
                <div className="font-mono text-xs text-[#FF1E27] font-bold uppercase tracking-wider">CAREER OBJECTIVE</div>
                <p className="leading-relaxed text-slate-300">{personalData.bio}</p>
              </div>

              <div className="space-y-3">
                <div className="font-mono text-xs text-[#FF1E27] font-bold uppercase tracking-wider">CORE COMPETENCIES</div>
                <div className="flex flex-wrap gap-1.5 text-xs font-mono">
                  {['React', 'Next.js', 'Node.js', 'Python', 'Three.js', 'Tailwind CSS', 'MongoDB', 'PostgreSQL', 'LUA', 'Figma', 'UI/UX'].map((skill) => (
                    <span key={skill} className="bg-[#0A0A0A] border border-white/10 px-2.5 py-1 text-slate-300">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div className="font-mono text-xs text-[#FF1E27] font-bold uppercase tracking-wider">EDUCATION</div>
                <div className="bg-[#0A0A0A] p-4 border border-white/10 space-y-1">
                  <div className="font-bold text-white text-xs sm:text-sm">Bachelor of Computer Applications (BCA)</div>
                  <div className="text-xs text-slate-400">Yenepoya Deemed-to-be University · 2022 — 2025</div>
                  <div className="text-[11px] text-[#FF1E27]">CGPA: 8.5 / 10 · Cloud Computing & Cyber Security</div>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setResumeOpen(false)}
                  className="btn-editorial-red text-xs cursor-pointer"
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
