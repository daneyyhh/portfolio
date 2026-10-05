import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, FlaskConical } from 'lucide-react';
import { MaskHeading, MaskParagraph, FadeInUp } from '../UI/TextReveal';

const EASE = [0.16, 1, 0.3, 1];

export default function ResearchPreview() {
  const prefersReduced = useReducedMotion();

  const progressionSteps = [
    { num: '01', name: 'ORIGIN' },
    { num: '02', name: 'FUNDAMENTALS' },
    { num: '03', name: 'ARCHITECTURE' },
    { num: '04', name: 'EXPERIMENTS' },
    { num: '05', name: 'CURRENT FRONTIER' },
  ];

  return (
    <section
      id="research-preview"
      className="py-20 sm:py-24 px-4 sm:px-6 md:px-12 bg-[#EDECE6] text-[#111111] relative border-t border-[#C9C7C0] font-mono w-full overflow-x-clip"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start relative z-10 w-full">
        
        {/* Left Margin Vertical Tag */}
        <div className="hidden lg:flex lg:col-span-1 flex-col items-center justify-start h-full">
          <motion.div
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="font-mono text-4xl font-extrabold text-[#FF1E27]"
          >
            06
          </motion.div>
          <motion.div
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="vertical-tag font-mono text-xs text-[#555555] uppercase tracking-[0.3em] font-bold mt-6"
          >
            RESEARCH
          </motion.div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-11 space-y-6 sm:space-y-8 w-full max-w-full">
          
          {/* Header Row: Technical Badge & Notice */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#C9C7C0] pb-4">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#FF1E27] animate-pulse" />
              <span className="text-xs uppercase tracking-widest font-bold text-[#FF1E27]">
                AI RESEARCH / 001
              </span>
              <span className="text-[#888884] text-xs">•</span>
              <span className="text-xs text-[#555555] uppercase tracking-wider hidden sm:inline">
                TECHNICAL EXCERPT
              </span>
            </div>

            <div className="flex items-center gap-2 text-[10px] sm:text-xs text-[#666660] bg-[#FAF9F5] px-3 py-1 border border-[#C9C7C0]">
              <FlaskConical size={12} className="text-[#FF1E27]" />
              <span>DEDICATED RESEARCH ENVIRONMENT</span>
            </div>
          </div>

          {/* Title & Core Thesis */}
          <div className="space-y-3">
            <MaskHeading
              lines={["HOW LARGE LANGUAGE", "MODELS WORK"]}
              className="font-syne font-extrabold text-[#111111] uppercase tracking-tight leading-[0.92] w-full max-w-full"
              style={{
                fontSize: 'clamp(2rem, 6vw, 3.75rem)',
                letterSpacing: 'clamp(-0.03em, -0.2vw, -0.01em)',
              }}
              delay={0.15}
            />

            <MaskParagraph delay={0.25}>
              <p className="font-mono text-xs sm:text-sm md:text-base text-[#444444] leading-relaxed max-w-3xl pt-1">
                From statistical language modelling to modern foundation models — an investigation into how LLMs evolved, how they process language, how they are trained, where they fail, and where the technology is heading.
              </p>
            </MaskParagraph>
          </div>

          {/* Compact Technical Progression Pipeline */}
          <FadeInUp delay={0.35} className="space-y-2 pt-1">
            <div className="text-[10px] text-[#777770] uppercase tracking-widest font-bold">
              INVESTIGATION PROGRESSION
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 bg-[#FAF9F5] p-3 sm:p-4 border border-[#C9C7C0] w-full">
              {progressionSteps.map((step, idx) => (
                <React.Fragment key={step.name}>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#111111]">
                    <span className="text-[10px] text-[#FF1E27] font-mono">{step.num}.</span>
                    <span>{step.name}</span>
                  </div>
                  {idx < progressionSteps.length - 1 && (
                    <span className="text-[#999990] text-xs font-mono font-normal">→</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </FadeInUp>

          {/* Small Technical Metadata Row */}
          <FadeInUp delay={0.45} className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
            <div className="bg-[#FAF9F5] p-3 border border-[#C9C7C0] space-y-1">
              <div className="text-[9px] uppercase tracking-widest text-[#777770] font-bold">CATEGORY</div>
              <div className="text-xs sm:text-sm font-bold text-[#111111]">GENERATIVE AI</div>
            </div>

            <div className="bg-[#FAF9F5] p-3 border border-[#C9C7C0] space-y-1">
              <div className="text-[9px] uppercase tracking-widest text-[#777770] font-bold">STATUS</div>
              <div className="text-xs sm:text-sm font-bold text-[#FF1E27] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF1E27] animate-pulse" />
                <span>RESEARCHING</span>
              </div>
            </div>

            <div className="bg-[#FAF9F5] p-3 border border-[#C9C7C0] space-y-1">
              <div className="text-[9px] uppercase tracking-widest text-[#777770] font-bold">DIFFICULTY</div>
              <div className="text-xs sm:text-sm font-bold text-[#111111]">INTERMEDIATE</div>
            </div>

            <div className="bg-[#FAF9F5] p-3 border border-[#C9C7C0] space-y-1">
              <div className="text-[9px] uppercase tracking-widest text-[#777770] font-bold">LAST UPDATED</div>
              <div className="text-xs sm:text-sm font-bold text-[#111111]">SEP 2026</div>
            </div>
          </FadeInUp>

          {/* Action Call to Action */}
          <FadeInUp delay={0.55} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
            <Link
              to="/research/how-large-language-models-work"
              className="btn-editorial-red flex items-center justify-center gap-3 text-xs sm:text-sm font-bold tracking-wider py-3 px-6 cursor-pointer group"
            >
              <span>READ THE WHOLE RESEARCH</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/research"
              className="btn-editorial-outline text-[#111111] border-[#111111] hover:border-[#FF1E27] hover:text-[#FF1E27] flex items-center justify-center gap-2 text-xs sm:text-sm font-bold tracking-wider py-3 px-6 transition-colors group cursor-pointer"
            >
              <span>VIEW ALL RESEARCH</span>
              <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </FadeInUp>

          {/* Editorial Excerpt Notice */}
          <div className="text-[10px] text-[#777770] leading-relaxed pt-1">
            * This section is a homepage excerpt. The full interactive digital paper contains linear algebra formulations, PyTorch execution code, loss curve benchmarks, and failure cascades inside the Research Lab.
          </div>

        </div>

      </div>
    </section>
  );
}
