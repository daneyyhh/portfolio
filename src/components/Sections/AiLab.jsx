import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Bot, ArrowRight } from 'lucide-react';
import { MaskHeading, MaskParagraph, FadeInUp } from '../UI/TextReveal';
import { ParallaxElement } from '../UI/ParallaxImage';

const EASE = [0.16, 1, 0.3, 1];

export default function AiLab() {
  const prefersReduced = useReducedMotion();

  return (
    <section id="ailab" className="py-24 sm:py-28 px-4 sm:px-6 md:px-12 bg-[#0A0A0A] text-white relative border-t border-white/10 font-mono w-full overflow-x-clip">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10 w-full">
        
        {/* Left Vertical Tag */}
        <div className="hidden lg:flex lg:col-span-1 flex-col items-center justify-start h-full">
          <motion.div
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="font-mono text-4xl font-extrabold text-[#FF1E27]"
          >
            08
          </motion.div>
          <motion.div
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="vertical-tag font-mono text-xs text-slate-400 uppercase tracking-[0.3em] font-bold mt-6"
          >
            AI LAB
          </motion.div>
        </div>

        {/* Text Details with Staggered Entrance */}
        <div className="lg:col-span-6 space-y-4 sm:space-y-6 w-full max-w-full">
          <motion.div
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="text-xs text-[#FF1E27] font-bold uppercase tracking-widest flex items-center gap-2"
          >
            <Bot size={16} />
            <span>INTELLIGENT SYSTEMS</span>
          </motion.div>

          <MaskHeading
            lines={["AI / ML PROJECTS"]}
            className="font-syne font-extrabold text-white uppercase tracking-tight w-full max-w-full"
            style={{
              fontSize: 'clamp(2rem, 8vw, 3.75rem)',
              letterSpacing: 'clamp(-0.03em, -0.2vw, -0.01em)',
            }}
            delay={0.15}
          />

          <MaskParagraph delay={0.3} className="font-sans text-slate-300 text-sm sm:text-base leading-relaxed">
            <p>Exploring machine learning and AI to build intelligent algorithms and impactful data classification models using Python, Scikit-Learn, and cross-validated ensemble models.</p>
          </MaskParagraph>

          <FadeInUp delay={0.45} className="pt-2">
            <a href="#projects" className="btn-editorial-red flex items-center gap-3 inline-flex text-xs sm:text-sm cursor-pointer">
              <span>EXPLORE AI PROJECTS</span>
              <ArrowRight size={16} />
            </a>
          </FadeInUp>
        </div>

        {/* Visual Box with Parallax */}
        <div className="lg:col-span-5 relative w-full max-w-full">
          <ParallaxElement speed={0.14} yOffset={25}>
            <FadeInUp delay={0.3} yOffset={25}>
              <div className="border border-white/20 p-2 bg-[#141414] w-full shadow-2xl">
                <img
                  src="https://cdn.pixabay.com/photo/2018/05/08/08/44/artificial-intelligence-3382507_1280.jpg"
                  alt="AI ML Lab Network"
                  className="w-full h-[260px] sm:h-[360px] object-cover filter contrast-125 brightness-90 select-none"
                />
              </div>
            </FadeInUp>
          </ParallaxElement>
        </div>

      </div>
    </section>
  );
}
