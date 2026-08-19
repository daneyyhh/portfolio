import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { whoamiImageBase64 } from '../../assets/whoamiImageBase64';

export default function Introduction() {
  return (
    <section id="introduction" className="py-24 sm:py-28 px-4 sm:px-6 md:px-12 bg-[#F1F0EB] relative border-t border-[#C9C7C0] text-[#111111] w-full overflow-x-clip">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10 w-full">
        
        {/* Left Margin Vertical Tag */}
        <div className="hidden lg:flex lg:col-span-1 flex-col items-center justify-start h-full">
          <div className="font-mono text-4xl font-extrabold text-[#111111]">01</div>
          <div className="vertical-tag font-mono text-xs text-[#555555] uppercase tracking-[0.3em] font-bold mt-6">
            INTRODUCTION
          </div>
        </div>

        {/* Middle Column: Editorial Introduction Text */}
        <div className="lg:col-span-6 space-y-4 sm:space-y-6 w-full max-w-full">
          <div className="font-mono text-xs text-[#8B6DFF] uppercase tracking-widest font-bold">
            WHO I AM
          </div>

          <h2
            className="font-syne font-extrabold text-[#111111] uppercase tracking-tight leading-none w-full max-w-full"
            style={{
              fontSize: 'clamp(2rem, 8vw, 3.75rem)',
              letterSpacing: 'clamp(-0.03em, -0.2vw, -0.01em)',
            }}
          >
            <span className="block">HI, I'M</span>
            <span className="block">REUBEN</span>
            <span className="block">BINU GEORGE</span>
          </h2>

          {/* Role Badges */}
          <div className="flex flex-wrap gap-2 pt-1 sm:pt-2">
            {['DEVELOPER', 'AI ENTHUSIAST', 'GAMER', 'DESIGNER'].map((role) => (
              <span
                key={role}
                className="bg-[#E4E2DC] border border-[#C9C7C0] text-[#111111] font-mono text-[10px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 uppercase"
              >
                {role} <span className="text-[#8B6DFF]">•</span>
              </span>
            ))}
          </div>

          <p className="font-sans text-slate-700 text-sm sm:text-base md:text-lg leading-relaxed pt-1">
            I'm a Full-Stack Developer passionate about building understanding of the problem and research, scalable web applications, immersive 3D experiences, and intelligent systems that make impact.
          </p>

          <div className="pt-2 sm:pt-4">
            <a href="#about" className="btn-editorial flex items-center gap-3 inline-flex">
              <span>MORE ABOUT ME</span>
              <ArrowRight size={16} />
            </a>
          </div>
        </div>

        {/* Right Column: User Uploaded Portrait */}
        <div className="lg:col-span-5 relative w-full max-w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative border-2 border-[#111111] bg-[#111111] overflow-hidden group shadow-2xl w-full max-w-full"
          >
            <img
              src={whoamiImageBase64}
              alt="Reuben Binu George"
              className="w-full h-auto max-h-[520px] object-cover object-top group-hover:scale-105 transition-transform duration-700 block"
            />
            
            {/* Overlay Script Tag */}
            <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 font-syne italic text-xl sm:text-2xl text-white font-bold tracking-tight drop-shadow-md">
              let's build together
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
