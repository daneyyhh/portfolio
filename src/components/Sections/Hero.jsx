import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { personalData } from '../../data/portfolioData';

const EASE = [0.16, 1, 0.3, 1];

export default function Hero({ onOpenResume }) {
  const prefersReduced = useReducedMotion();

  const headlineLines = [
    { text: "I BUILD", hasDot: false },
    { text: "DIGITAL", hasDot: false },
    { text: "WORLDS", hasDot: true }
  ];

  return (
    <section id="hero" className="relative min-h-[100svh] pt-24 sm:pt-28 pb-12 flex flex-col justify-between overflow-x-clip bg-[#F1F0EB] text-[#111111] w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10 my-auto">
        
        {/* Left Column: Responsive Editorial Hero Typography with Full Container Width */}
        <div className="lg:col-span-12 xl:col-span-10 space-y-6 w-full max-w-full">
          
          {/* Step 1: Sub-Header in Masked Container */}
          <div className="overflow-hidden py-1 w-full max-w-full">
            <motion.div
              initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
              className="font-mono text-xs text-[#555555] uppercase tracking-[0.2em] sm:tracking-[0.25em] font-bold flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF1E27]" />
              <span>FULL-STACK DEVELOPER / CREATIVE ENGINEER</span>
            </motion.div>
          </div>

          {/* Step 2: Main Hero Headline with Physical Line-by-Line Masked Reveal */}
          <div className="py-1 w-full max-w-full">
            <h1
              className="font-syne font-extrabold tracking-tight uppercase leading-[0.92] text-[#111111] w-full max-w-full"
              style={{
                fontSize: 'clamp(2.4rem, 6.8vw, 6.5rem)',
                letterSpacing: 'clamp(-0.03em, -0.2vw, -0.01em)',
              }}
            >
              {headlineLines.map((line, idx) => (
                <span key={line.text} className="block overflow-hidden py-[0.04em] -my-[0.04em]">
                  <motion.span
                    className="block w-full whitespace-nowrap will-change-transform"
                    initial={prefersReduced ? { opacity: 0 } : { y: "110%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    transition={{
                      duration: prefersReduced ? 0.3 : 1.0,
                      delay: prefersReduced ? 0 : 0.3 + idx * 0.1,
                      ease: EASE,
                    }}
                  >
                    {line.text}
                    {line.hasDot && <span className="text-[#FF1E27]">.</span>}
                  </motion.span>
                </span>
              ))}
            </h1>
          </div>

          {/* Step 3: Subtitle Description */}
          <div className="overflow-hidden py-1 w-full max-w-full">
            <motion.p
              initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReduced ? 0.3 : 0.85, delay: prefersReduced ? 0 : 0.65, ease: EASE }}
              className="font-sans text-slate-700 text-sm sm:text-base md:text-lg max-w-xl leading-relaxed pt-1"
            >
              I create immersive digital experiences that blend code, design and creativity to solve real-world problems.
            </motion.p>
          </div>

          {/* Step 4: Hero Actions CTA */}
          <div className="overflow-hidden py-1 w-full max-w-full">
            <motion.div
              initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReduced ? 0.3 : 0.8, delay: prefersReduced ? 0 : 0.8, ease: EASE }}
              className="flex flex-wrap items-center gap-3 sm:gap-4 pt-3"
            >
              <a
                href="#projects"
                className="btn-editorial flex items-center gap-3 text-xs sm:text-sm"
              >
                <span>VIEW MY WORK</span>
                <ArrowRight size={16} />
              </a>

              <button
                onClick={onOpenResume}
                className="btn-editorial-outline flex items-center gap-2 text-xs sm:text-sm"
              >
                <span>RESUME PDF</span>
              </button>
            </motion.div>
          </div>
        </div>

      </div>

      {/* Step 5: Bottom Info Row */}
      <motion.div
        initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: prefersReduced ? 0.3 : 0.7, delay: prefersReduced ? 0 : 0.95, ease: EASE }}
        className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 w-full flex flex-col sm:flex-row justify-between items-center text-[10px] sm:text-xs font-mono text-[#555555] uppercase tracking-widest border-t border-[#C9C7C0] pt-6 relative z-10 gap-4"
      >
        <div className="flex items-center gap-2">
          <ArrowDown size={14} className="animate-bounce text-[#FF1E27]" />
          <span>SCROLL TO EXPLORE</span>
        </div>

        <div className="bg-[#E4E2DC] px-3 sm:px-4 py-2 border border-[#C9C7C0] text-[#111111] font-bold flex items-center gap-2 text-[10px] sm:text-xs">
          <span className="w-2 h-2 rounded-full bg-[#FF1E27] animate-pulse"></span>
          <span>AVAILABLE FOR NEW OPPORTUNITIES</span>
        </div>
      </motion.div>
    </section>
  );
}
