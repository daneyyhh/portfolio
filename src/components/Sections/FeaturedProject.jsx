import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import { featuredProjectData } from '../../data/featuredProjectData';
import { MaskHeading } from '../UI/TextReveal';

const EASE = [0.16, 1, 0.3, 1];

export default function FeaturedProject({ project = featuredProjectData }) {
  const prefersReduced = useReducedMotion();
  const [imgError, setImgError] = useState(false);

  // Fallback to configurable URL or safe hash
  const liveUrl = project?.liveUrl || "https://pinnaclemovers.com";

  return (
    <section
      id="featured-project"
      className="py-20 sm:py-24 md:py-28 px-4 sm:px-6 md:px-12 bg-[#F1F0EB] text-[#000000] relative border-t border-[#C9C7C0] font-mono w-full overflow-x-clip"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative z-10 w-full">
        
        {/* Left Column: Editorial Section Index Indicator */}
        <div className="hidden lg:flex lg:col-span-1 flex-col items-center justify-start h-full">
          <motion.div
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="font-mono text-4xl font-extrabold text-[#000000]"
          >
            001
          </motion.div>
          <motion.div
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="vertical-tag font-mono text-xs text-[#555555] uppercase tracking-[0.3em] font-bold mt-6"
          >
            FEATURED
          </motion.div>
        </div>

        {/* Right Main Column: Editorial Content & Large Showcase Viewport */}
        <div className="lg:col-span-11 space-y-8 sm:space-y-10 w-full max-w-full">
          
          {/* Section Header: Label, Heading, Description & Metadata */}
          <div className="space-y-6 border-b border-[#C9C7C0] pb-8 w-full">
            
            {/* 1. Small Uppercase Label */}
            <motion.div
              initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 0.6, ease: EASE }}
              className="text-xs text-[#FF0000] font-mono font-bold uppercase tracking-[0.2em] flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF0000]" />
              <span>{project.label || "FEATURED PROJECT / 001"}</span>
            </motion.div>

            {/* 2. Prominent Heading */}
            <div className="w-full max-w-full">
              <MaskHeading
                lines={[project.title || "PINNACLE MOVERS"]}
                className="font-syne font-extrabold text-[#000000] uppercase tracking-tight leading-[0.92] w-full max-w-full"
                style={{
                  fontSize: 'clamp(2.4rem, 7vw, 4.75rem)',
                  letterSpacing: 'clamp(-0.03em, -0.2vw, -0.01em)',
                }}
                delay={0.15}
              />
            </div>

            {/* 3. Short Project Description */}
            <motion.p
              initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 0.6, delay: 0.25, ease: EASE }}
              className="font-sans text-slate-700 text-base sm:text-lg md:text-xl max-w-3xl leading-relaxed"
            >
              {project.description || "A business website developed for Pinnacle Movers."}
            </motion.p>

            {/* 4. Project Metadata: CLIENT WORK, WEB DEVELOPMENT, 2026 */}
            <motion.div
              initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 0.6, delay: 0.35, ease: EASE }}
              className="flex flex-wrap items-center gap-2 sm:gap-3 pt-2 font-mono text-xs uppercase tracking-wider"
              aria-label="Project Metadata"
            >
              <span className="bg-[#FAF9F5] border border-[#C9C7C0] text-[#000000] font-bold px-3 py-1.5 shadow-xs">
                {project.projectType || "CLIENT WORK"}
              </span>
              <span className="text-[#FF0000] font-bold">/</span>
              <span className="bg-[#FAF9F5] border border-[#C9C7C0] text-[#000000] font-bold px-3 py-1.5 shadow-xs">
                {project.category || "WEB DEVELOPMENT"}
              </span>
              <span className="text-[#FF0000] font-bold">/</span>
              <span className="bg-[#FAF9F5] border border-[#C9C7C0] text-[#555555] font-bold px-3 py-1.5 shadow-xs">
                {project.year || "2026"}
              </span>
            </motion.div>
          </div>

          {/* 5. Large Cover Image Showing the Actual Website */}
          <motion.div
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-6% 0px" }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
            className="w-full"
          >
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View live website for ${project.title || "Pinnacle Movers"} (opens in a new tab)`}
              className="block group relative border-2 border-[#000000] bg-[#000000] overflow-hidden transition-all duration-300 hover:border-[#FF0000] shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#FF0000] focus-visible:ring-offset-2"
            >
              {/* Minimalist Browser Frame Bar */}
              <div className="bg-[#111111] px-4 py-2.5 border-b border-zinc-800 flex items-center justify-between text-zinc-400 font-mono text-[11px] select-none">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-700 block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-700 block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-700 block" />
                </div>
                <div className="text-[10px] sm:text-xs text-zinc-400 tracking-wider truncate max-w-[220px] sm:max-w-md">
                  {liveUrl.replace(/^https?:\/\//, '')}
                </div>
                <div className="text-[10px] font-bold text-[#FF0000] tracking-widest hidden sm:block">
                  LIVE ↗
                </div>
              </div>

              {/* Cover Image or Elegant Placeholder */}
              <div className="relative w-full bg-[#111111] overflow-hidden flex items-center justify-center">
                {!imgError && project.coverImage ? (
                  <img
                    src={project.coverImage}
                    alt={project.alt || `${project.title || "Pinnacle Movers"} - Client Website Screenshot`}
                    onError={() => setImgError(true)}
                    loading="lazy"
                    className="w-full h-auto object-cover object-center select-none transition-transform duration-700 ease-out group-hover:scale-[1.015] block"
                  />
                ) : (
                  <div className="p-8 sm:p-12 text-center text-white space-y-3 font-mono">
                    <div className="text-xs uppercase tracking-widest text-[#FF0000] font-bold">
                      [ SCREENSHOT PLACEHOLDER ]
                    </div>
                    <div className="font-syne text-xl sm:text-2xl font-bold">
                      {project.title || "PINNACLE MOVERS"}
                    </div>
                    <p className="font-sans text-xs sm:text-sm text-zinc-400 max-w-md mx-auto">
                      Screenshot will display here. Configure coverImage in src/data/featuredProjectData.js
                    </p>
                  </div>
                )}

                {/* Subtle Interactive Hover Cue Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300 pointer-events-none flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#000000] text-white font-mono text-xs uppercase font-bold tracking-widest px-4 py-2 border border-white/20 shadow-xl flex items-center gap-2">
                    <span>VIEW LIVE WEBSITE</span>
                    <ArrowUpRight size={14} className="text-[#FF0000]" />
                  </span>
                </div>
              </div>
            </a>
          </motion.div>

          {/* 6. Clear Text Link & Secondary Navigation */}
          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-[#C9C7C0]">
            
            {/* Primary Text Link: VIEW LIVE WEBSITE ↗ */}
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open live website for ${project.title || "Pinnacle Movers"} in a new tab`}
              className="inline-flex items-center gap-2 font-mono text-sm sm:text-base font-bold text-[#000000] hover:text-[#FF0000] transition-colors py-1 group/link focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF0000] w-fit"
            >
              <span className="tracking-wider">VIEW LIVE WEBSITE</span>
              <ArrowUpRight
                size={18}
                className="text-[#FF0000] transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
              />
            </a>

            {/* Direct Link to Browse More Selected Repositories */}
            <a
              href="#projects"
              className="inline-flex items-center gap-2 font-mono text-xs text-[#555555] hover:text-[#000000] transition-colors py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF0000] w-fit"
            >
              <span>EXPLORE ALL REPOSITORIES</span>
              <ArrowDown size={14} className="text-[#555555]" />
            </a>

          </div>

        </div>

      </div>
    </section>
  );
}
