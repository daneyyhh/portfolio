import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, ArrowDown, Code2, Sparkles, ArrowRight } from 'lucide-react';
import HeroCanvas from '../Three/HeroCanvas';
import { personalData } from '../../data/portfolioData';

export default function Hero({ engineerMode, onOpenResume }) {
  return (
    <section id="hero" className="relative min-h-screen pt-24 pb-16 flex flex-col justify-center overflow-hidden bg-[#09090b]">
      {/* Radial ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-radial-glow pointer-events-none opacity-60"></div>
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Column: Headline & Hero Copy */}
        <div className="lg:col-span-7 space-y-6 text-left">
          
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#ccff00]/10 border border-[#ccff00]/30 text-[#ccff00] font-mono text-xs tracking-widest uppercase"
          >
            <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-pulse"></span>
            <span>{personalData.status}</span>
          </motion.div>

          {/* Main Statement Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-syne text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.05] uppercase"
          >
            BUILDING DIGITAL <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ccff00] via-white to-purple-400">
              EXPERIENCES THAT MATTER.
            </span>
          </motion.h1>

          {/* Subtitle / Intro */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-sans text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed"
          >
            Hi, I'm <strong className="text-white font-semibold">{personalData.name}</strong> ({personalData.brand}). A <span className="text-[#ccff00] font-mono font-bold">Full-Stack Developer × Creative Engineer</span> combining web applications, AI/ML models, UI/UX systems, and 3D interactive graphics.
          </motion.p>

          {/* Interactive Code Panel (Code -> 3D transition element) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-[#0f0f13] border border-white/15 p-4 rounded-sm font-mono text-xs text-slate-300 shadow-xl max-w-lg relative overflow-hidden"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3 text-[10px] text-slate-400">
              <div className="flex items-center gap-2">
                <Terminal size={12} className="text-[#ccff00]" />
                <span>developer.config.js</span>
              </div>
              <span className="text-[#ccff00]">LIVE ARCHITECTURE</span>
            </div>

            <pre className="text-slate-200 overflow-x-auto">
              <code>
                <span className="text-purple-400">const</span> <span className="text-[#ccff00]">developer</span> = &#123;<br />
                &nbsp;&nbsp;focus: <span className="text-emerald-300">"Full-Stack Web"</span>,<br />
                &nbsp;&nbsp;aiML: <span className="text-amber-300">true</span>,<br />
                &nbsp;&nbsp;uiux: <span className="text-amber-300">true</span>,<br />
                &nbsp;&nbsp;gameDev: <span className="text-amber-300">true</span>,<br />
                &nbsp;&nbsp;threeD: <span className="text-amber-300">true</span><br />
                &#125;;
              </code>
            </pre>
          </motion.div>

          {/* Hero CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <a
              href="#projects"
              data-cursor="EXPLORE"
              className="btn-lime flex items-center gap-2 shadow-lg"
            >
              <span>EXPLORE WORKS</span>
              <ArrowRight size={16} />
            </a>

            <button
              onClick={onOpenResume}
              className="btn-outline flex items-center gap-2"
            >
              <span>VIEW RESUME</span>
            </button>
          </motion.div>
        </div>

        {/* Right Column: Three.js Interactive 3D Canvas Centerpiece */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-5 h-[400px] lg:h-[520px] relative flex items-center justify-center border border-white/10 bg-[#0f0f13]/40 rounded-sm overflow-hidden"
          data-cursor="DRAG 3D"
        >
          <HeroCanvas engineerMode={engineerMode} />
          
          <div className="absolute top-4 right-4 text-[10px] font-mono text-slate-400 bg-black/60 px-2 py-1 border border-white/10">
            RBG 3D CENTERPIECE
          </div>
        </motion.div>

      </div>

      {/* Bottom Scroll Down Prompt */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 font-mono text-[10px] text-slate-400 uppercase tracking-widest pointer-events-none">
        <span>SCROLL TO EXPLORE ARCHITECTURE</span>
        <ArrowDown size={14} className="animate-bounce text-[#ccff00]" />
      </div>
    </section>
  );
}
