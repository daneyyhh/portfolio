import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { personalData } from '../../data/portfolioData';

export default function Introduction() {
  return (
    <section id="introduction" className="py-28 px-6 md:px-12 bg-[#F1F0EB] relative border-t border-[#C9C7C0] text-[#111111]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Margin Vertical Tag (Matching Reference) */}
        <div className="hidden lg:flex lg:col-span-1 flex-col items-center justify-start h-full">
          <div className="font-mono text-4xl font-extrabold text-[#111111]">01</div>
          <div className="vertical-tag font-mono text-xs text-[#555555] uppercase tracking-[0.3em] font-bold mt-6">
            INTRODUCTION
          </div>
        </div>

        {/* Middle Column: Editorial Introduction Text */}
        <div className="lg:col-span-6 space-y-6">
          <div className="font-mono text-xs text-[#8B6DFF] uppercase tracking-widest font-bold">
            WHO I AM
          </div>

          <h2 className="font-syne text-4xl sm:text-6xl font-extrabold text-[#111111] uppercase tracking-tight leading-none">
            HI, I'M<br />
            REUBEN<br />
            BINU GEORGE
          </h2>

          {/* Role Badges */}
          <div className="flex flex-wrap gap-2 pt-2">
            {['DEVELOPER', 'AI ENTHUSIAST', 'GAMER', 'DESIGNER'].map((role) => (
              <span
                key={role}
                className="bg-[#E4E2DC] border border-[#C9C7C0] text-[#111111] font-mono text-xs font-bold px-3 py-1 uppercase"
              >
                {role} <span className="text-[#8B6DFF]">•</span>
              </span>
            ))}
          </div>

          <p className="font-sans text-slate-700 text-base md:text-lg leading-relaxed pt-2">
            I'm a Full-Stack Developer passionate about building understanding of the problem and research, scalable web applications, immersive 3D experiences, and intelligent systems that make impact.
          </p>

          <div className="pt-4">
            <a href="#about" className="btn-editorial flex items-center gap-3 inline-flex">
              <span>MORE ABOUT ME</span>
              <ArrowRight size={16} />
            </a>
          </div>
        </div>

        {/* Right Column: B&W High-Contrast Editorial Portrait */}
        <div className="lg:col-span-5 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative border-2 border-[#111111] bg-[#111111] overflow-hidden group shadow-2xl"
          >
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80"
              alt="Reuben Binu George"
              className="w-full h-[450px] object-cover filter grayscale contrast-125 brightness-90 group-hover:scale-105 transition-transform duration-700"
            />
            
            {/* Overlay Script Tag matching reference */}
            <div className="absolute bottom-4 right-4 font-syne italic text-2xl text-white font-bold tracking-tight">
              let's build together
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
