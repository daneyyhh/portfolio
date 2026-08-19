import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { personalData } from '../../data/portfolioData';

export default function Hero({ onOpenResume }) {
  return (
    <section id="hero" className="relative min-h-screen pt-36 pb-20 flex flex-col justify-between overflow-hidden bg-[#F1F0EB] text-[#111111]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 my-auto">
        
        {/* Left Column: Editorial Hero Typography with Masked Upward Rising Animation */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Sub-Header in Masked Container */}
          <div className="overflow-hidden py-1">
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 2.6, ease: [0.16, 1, 0.3, 1] }}
              className="font-mono text-xs text-[#555555] uppercase tracking-[0.25em] font-bold"
            >
              FULL-STACK DEVELOPER / CREATIVE ENGINEER
            </motion.div>
          </div>

          {/* Main Hero Headline in Masked Container */}
          <div className="overflow-hidden py-1">
            <motion.div
              initial={{ opacity: 0, y: 110 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 2.7, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-2"
            >
              <h1 className="font-syne text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-extrabold tracking-tighter uppercase leading-[0.9] text-[#111111]">
                I BUILD<br />
                DIGITAL<br />
                WORLDS<span className="text-[#8B6DFF]">.</span>
              </h1>
            </motion.div>
          </div>

          {/* Subtitle Description in Masked Container */}
          <div className="overflow-hidden py-1">
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 2.85, ease: [0.16, 1, 0.3, 1] }}
              className="font-sans text-slate-700 text-base sm:text-lg max-w-xl leading-relaxed pt-2"
            >
              I create immersive digital experiences that blend code, design and creativity to solve real-world problems.
            </motion.p>
          </div>

          {/* Hero Actions in Masked Container */}
          <div className="overflow-hidden py-1">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 2.95, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-4 pt-4"
            >
              <a
                href="#projects"
                className="btn-editorial flex items-center gap-3"
              >
                <span>VIEW MY WORK</span>
                <ArrowRight size={16} />
              </a>

              <button
                onClick={onOpenResume}
                className="btn-editorial-outline flex items-center gap-2"
              >
                <span>RESUME PDF</span>
              </button>
            </motion.div>
          </div>
        </div>

        {/* Right Column: Space for 3D persistent centerpiece */}
        <div className="lg:col-span-4 min-h-[300px] pointer-events-none" />

      </div>

      {/* Bottom Info Row */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col sm:flex-row justify-between items-center text-xs font-mono text-[#555555] uppercase tracking-widest border-t border-[#C9C7C0] pt-6 relative z-10 gap-4">
        <div className="flex items-center gap-2">
          <ArrowDown size={14} className="animate-bounce text-[#8B6DFF]" />
          <span>SCROLL TO EXPLORE</span>
        </div>

        <div className="bg-[#E4E2DC] px-4 py-2 border border-[#C9C7C0] text-[#111111] font-bold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#8B6DFF] animate-pulse"></span>
          <span>AVAILABLE FOR NEW OPPORTUNITIES</span>
        </div>
      </div>
    </section>
  );
}
