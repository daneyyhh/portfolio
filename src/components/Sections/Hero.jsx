import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { personalData } from '../../data/portfolioData';

export default function Hero({ onOpenResume }) {
  return (
    <section id="hero" className="relative min-h-screen pt-32 sm:pt-36 pb-20 flex flex-col justify-between overflow-x-clip bg-[#F1F0EB] text-[#111111] w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10 my-auto">
        
        {/* Left Column: Responsive Editorial Hero Typography with Full Container Width */}
        <div className="lg:col-span-12 xl:col-span-10 space-y-6 w-full max-w-full">
          
          {/* Sub-Header in Masked Container */}
          <div className="overflow-hidden py-1 w-full max-w-full">
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 2.6, ease: [0.16, 1, 0.3, 1] }}
              className="font-mono text-xs text-[#555555] uppercase tracking-[0.2em] sm:tracking-[0.25em] font-bold"
            >
              FULL-STACK DEVELOPER / CREATIVE ENGINEER
            </motion.div>
          </div>

          {/* Main Hero Headline: 100% Fully Visible WORLDS on Desktop and Mobile */}
          <div className="overflow-visible py-1 w-full max-w-full">
            <motion.div
              initial={{ opacity: 0, y: 110 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 2.7, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-full overflow-visible"
            >
              <h1
                className="font-syne font-extrabold tracking-tight uppercase leading-[0.9] text-[#111111] w-full max-w-full overflow-visible"
                style={{
                  fontSize: 'clamp(2.4rem, 6.8vw, 6.5rem)',
                  letterSpacing: 'clamp(-0.03em, -0.2vw, -0.01em)',
                }}
              >
                <span className="block w-full overflow-visible whitespace-nowrap">I BUILD</span>
                <span className="block w-full overflow-visible whitespace-nowrap">DIGITAL</span>
                <span className="block w-full overflow-visible whitespace-nowrap">
                  WORLDS<span className="text-[#8B6DFF]">.</span>
                </span>
              </h1>
            </motion.div>
          </div>

          {/* Subtitle Description in Masked Container */}
          <div className="overflow-hidden py-1 w-full max-w-full">
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 2.85, ease: [0.16, 1, 0.3, 1] }}
              className="font-sans text-slate-700 text-sm sm:text-base md:text-lg max-w-xl leading-relaxed pt-1"
            >
              I create immersive digital experiences that blend code, design and creativity to solve real-world problems.
            </motion.p>
          </div>

          {/* Hero Actions in Masked Container */}
          <div className="overflow-hidden py-1 w-full max-w-full">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 2.95, ease: [0.16, 1, 0.3, 1] }}
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

      {/* Bottom Info Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 w-full flex flex-col sm:flex-row justify-between items-center text-[10px] sm:text-xs font-mono text-[#555555] uppercase tracking-widest border-t border-[#C9C7C0] pt-6 relative z-10 gap-4">
        <div className="flex items-center gap-2">
          <ArrowDown size={14} className="animate-bounce text-[#8B6DFF]" />
          <span>SCROLL TO EXPLORE</span>
        </div>

        <div className="bg-[#E4E2DC] px-3 sm:px-4 py-2 border border-[#C9C7C0] text-[#111111] font-bold flex items-center gap-2 text-[10px] sm:text-xs">
          <span className="w-2 h-2 rounded-full bg-[#8B6DFF] animate-pulse"></span>
          <span>AVAILABLE FOR NEW OPPORTUNITIES</span>
        </div>
      </div>
    </section>
  );
}
