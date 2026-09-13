import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import whoamiPortrait from '../../assets/whoami-portrait-v2.jpg';
import { MaskHeading, MaskParagraph, FadeInUp } from '../UI/TextReveal';
import { ParallaxElement } from '../UI/ParallaxImage';

const EASE = [0.16, 1, 0.3, 1];

export default function Introduction() {
  const prefersReduced = useReducedMotion();
  const roles = ['DEVELOPER', 'AI ENTHUSIAST', 'GAMER', 'DESIGNER'];

  return (
    <section id="introduction" className="min-h-[100svh] py-20 sm:py-24 px-4 sm:px-6 md:px-12 bg-[#F1F0EB] relative border-t border-[#C9C7C0] text-[#111111] w-full overflow-x-clip flex flex-col justify-center">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10 w-full">
        
        {/* Left Margin Vertical Tag */}
        <div className="hidden lg:flex lg:col-span-1 flex-col items-center justify-start h-full">
          <motion.div
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="font-mono text-4xl font-extrabold text-[#111111]"
          >
            01
          </motion.div>
          <motion.div
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="vertical-tag font-mono text-xs text-[#555555] uppercase tracking-[0.3em] font-bold mt-6"
          >
            INTRODUCTION
          </motion.div>
        </div>

        {/* Middle Column: Editorial Introduction Text */}
        <div className="lg:col-span-6 space-y-4 sm:space-y-6 w-full max-w-full">
          
          {/* Step 1: Badge */}
          <motion.div
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ duration: 0.6, delay: 0.05, ease: EASE }}
            className="font-mono text-xs text-[#FF1E27] uppercase tracking-widest font-bold flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF1E27]" />
            <span>WHO I AM</span>
          </motion.div>

          {/* Step 2: Masked Major Heading */}
          <MaskHeading
            lines={["HI, I'M", "REUBEN", "BINU GEORGE"]}
            className="font-syne font-extrabold text-[#111111] uppercase tracking-tight leading-[0.95] w-full max-w-full"
            style={{
              fontSize: 'clamp(2rem, 8vw, 3.75rem)',
              letterSpacing: 'clamp(-0.03em, -0.2vw, -0.01em)',
            }}
            delay={0.15}
            stagger={0.08}
          />

          {/* Step 3: Role Badges (Staggered) */}
          <motion.div
            className="flex flex-wrap gap-2 pt-1 sm:pt-2"
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ duration: 0.6, delay: 0.35, ease: EASE }}
          >
            {roles.map((role, idx) => (
              <span
                key={role}
                className="bg-[#E4E2DC] border border-[#C9C7C0] text-[#111111] font-mono text-[10px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 uppercase transition-colors hover:border-[#FF1E27]"
              >
                {role} <span className="text-[#FF1E27]">•</span>
              </span>
            ))}
          </motion.div>

          {/* Step 4: Paragraph */}
          <MaskParagraph
            delay={0.45}
            className="font-sans text-slate-700 text-sm sm:text-base md:text-lg leading-relaxed pt-1"
          >
            I'm a Full-Stack Developer passionate about building understanding of the problem and research, scalable web applications, immersive 3D experiences, and intelligent systems that make impact.
          </MaskParagraph>

          {/* Step 5: CTA */}
          <FadeInUp delay={0.55} className="pt-2 sm:pt-4">
            <a href="#about" className="btn-editorial flex items-center gap-3 inline-flex">
              <span>MORE ABOUT ME</span>
              <ArrowRight size={16} />
            </a>
          </FadeInUp>
        </div>

        {/* Right Column: User Uploaded Portrait with Subtle Parallax & Clean Frame */}
        <div className="lg:col-span-5 relative w-full max-w-full">
          <ParallaxElement speed={0.12} yOffset={20}>
            <motion.div
              initial={prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 25 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
              className="relative border-2 border-[#111111] bg-[#111111] overflow-hidden group shadow-2xl w-full max-w-full"
            >
              <img
                src={whoamiPortrait}
                alt="Reuben Binu George"
                className="w-full h-auto max-h-[520px] object-cover object-top group-hover:scale-105 transition-transform duration-700 block select-none"
              />
              
              {/* Overlay Script Tag */}
              <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 font-syne italic text-xl sm:text-2xl text-white font-bold tracking-tight drop-shadow-md">
                let's build together
              </div>
            </motion.div>
          </ParallaxElement>
        </div>

      </div>
    </section>
  );
}
