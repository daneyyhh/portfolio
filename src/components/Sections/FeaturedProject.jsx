import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { featuredProjectData } from '../../data/featuredProjectData';

const EASE = [0.16, 1, 0.3, 1];

export default function FeaturedProject({ project = featuredProjectData }) {
  const prefersReduced = useReducedMotion();
  const [imgError, setImgError] = useState(false);

  const liveUrl = project?.liveUrl || "https://pinnaclemoveww.com";
  const displayUrl = project?.displayUrl || "pinnaclemoveww.com";

  return (
    <section
      id="featured-project"
      className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-12 bg-[#F1F0EB] text-[#000000] relative border-t border-[#C9C7C0] font-mono w-full overflow-x-clip"
    >
      <div className="max-w-7xl mx-auto space-y-10 sm:space-y-12 relative z-10 w-full">
        
        {/* Balanced Two-Column Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT COLUMN: Identity, Heading, Description, Metadata, Responsibility & CTA */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6">
            
            {/* 1. Compact Project Index and Featured Label */}
            <motion.div
              initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 0.5, ease: EASE }}
              className="text-xs text-[#FF0000] font-mono font-bold uppercase tracking-[0.2em] flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF0000]" />
              <span>{project.label || "FEATURED PROJECT / 001"}</span>
            </motion.div>

            {/* 2. Project Title and Short Description */}
            <div className="space-y-3">
              <motion.h2
                initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8% 0px" }}
                transition={{ duration: 0.6, delay: 0.05, ease: EASE }}
                className="font-syne font-extrabold text-[#000000] uppercase tracking-tight text-2xl sm:text-3xl lg:text-4xl xl:text-[2.65rem] leading-[1.05] whitespace-normal xl:whitespace-nowrap"
              >
                {project.title || "PINNACLE MOVERS"}
              </motion.h2>

              <motion.p
                initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8% 0px" }}
                transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
                className="font-sans text-slate-700 text-sm sm:text-base leading-relaxed max-w-xl"
              >
                {project.description || "A business website developed for Pinnacle Movers to establish its online presence and present its moving services."}
              </motion.p>
            </div>

            {/* 3. Compact Metadata Information Block */}
            <motion.div
              initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
              className="grid grid-cols-2 gap-x-6 gap-y-3 py-3.5 border-y border-[#C9C7C0] text-xs font-mono"
            >
              <div>
                <span className="text-[10px] text-[#777777] uppercase tracking-wider block">CLIENT</span>
                <span className="font-bold text-[#000000] tracking-wide block mt-0.5">
                  {project.client || "Pinnacle Movers"}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-[#777777] uppercase tracking-wider block">CATEGORY</span>
                <span className="font-bold text-[#000000] tracking-wide block mt-0.5">
                  {project.category || "Website Development"}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-[#777777] uppercase tracking-wider block">PROJECT TYPE</span>
                <span className="font-bold text-[#000000] tracking-wide block mt-0.5">
                  {project.projectType || "Client Project"}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-[#777777] uppercase tracking-wider block">YEAR</span>
                <span className="font-bold text-[#000000] tracking-wide block mt-0.5">
                  {project.year || "2026"}
                </span>
              </div>
            </motion.div>

            {/* Development Responsibility */}
            <motion.div
              initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
              className="space-y-1 text-xs font-mono"
            >
              <span className="text-[10px] text-[#777777] uppercase tracking-wider block">
                DEVELOPMENT RESPONSIBILITY
              </span>
              <div className="flex items-center gap-2 text-[#000000] font-bold">
                <span className="w-1.5 h-1.5 bg-[#FF0000]" />
                <span>{project.responsibility || "Website Development"}</span>
              </div>
            </motion.div>

            {/* Clear "VIEW LIVE WEBSITE ↗" Link */}
            <motion.div
              initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 0.6, delay: 0.25, ease: EASE }}
              className="pt-1"
            >
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open live website for ${project.title || "Pinnacle Movers"} in a new tab`}
                className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm font-bold text-[#000000] hover:text-[#FF0000] transition-colors py-1 group/link focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF0000] focus-visible:ring-offset-2 w-fit"
              >
                <span className="tracking-wider underline underline-offset-4 decoration-[#C9C7C0] group-hover/link:decoration-[#FF0000]">
                  VIEW LIVE WEBSITE
                </span>
                <ArrowUpRight
                  size={16}
                  className="text-[#FF0000] transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                />
              </a>
            </motion.div>

          </div>

          {/* RIGHT COLUMN: Smaller, Well-Proportioned Website Preview */}
          <motion.div
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-6% 0px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
            className="lg:col-span-6 w-full"
          >
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View live website for ${project.title || "Pinnacle Movers"} (opens in a new tab)`}
              className="block group relative border border-[#111111] bg-[#111111] overflow-hidden transition-all duration-300 hover:border-[#FF0000] shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF0000] focus-visible:ring-offset-2"
            >
              {/* Subtle Browser-Style Header */}
              <div className="bg-[#181818] px-3.5 py-2 border-b border-zinc-800 flex items-center justify-between text-zinc-400 font-mono text-[11px] select-none">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-zinc-600 block" />
                  <span className="w-2 h-2 rounded-full bg-zinc-600 block" />
                  <span className="w-2 h-2 rounded-full bg-zinc-600 block" />
                </div>
                <div className="text-[10px] text-zinc-300 tracking-wider font-mono truncate px-2">
                  {displayUrl}
                </div>
                <div className="flex items-center gap-1 text-[9px] font-bold text-[#FF0000] tracking-widest">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF0000] animate-pulse" />
                  <span>LIVE</span>
                </div>
              </div>

              {/* Preview Image with Controlled Height & Subtle Hover Zoom */}
              <div className="relative w-full aspect-[16/10] max-h-[360px] sm:max-h-[400px] bg-[#111111] overflow-hidden">
                {!imgError && project.coverImage ? (
                  <img
                    src={project.coverImage}
                    alt={project.alt || `${project.title || "Pinnacle Movers"} - Client Website Homepage`}
                    onError={() => setImgError(true)}
                    loading="lazy"
                    className="w-full h-full object-cover object-top select-none transition-transform duration-500 ease-out group-hover:scale-[1.015]"
                  />
                ) : (
                  <div className="h-full flex flex-col items-center justify-center p-6 text-center text-white font-mono space-y-2">
                    <div className="text-xs uppercase tracking-widest text-[#FF0000] font-bold">
                      [ SCREENSHOT PLACEHOLDER ]
                    </div>
                    <div className="font-syne text-lg font-bold">{project.title}</div>
                  </div>
                )}

                {/* Restrained Hover Cue */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200 pointer-events-none" />
              </div>
            </a>
          </motion.div>

        </div>

        {/* 6. PROJECT OVERVIEW: Restrained Details and Information Grid */}
        <div className="pt-8 sm:pt-10 border-t border-[#C9C7C0] space-y-5">
          <motion.div
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ duration: 0.5, ease: EASE }}
            className="flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF0000]" />
            <h3 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#000000]">
              PROJECT OVERVIEW
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            <motion.div
              initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
              className="lg:col-span-6 xl:col-span-7"
            >
              <p className="font-sans text-slate-700 text-sm sm:text-base leading-relaxed">
                A business website developed for Pinnacle Movers to establish its online presence and present its moving services.
              </p>
            </motion.div>

            {/* Small Project Information Grid */}
            <motion.div
              initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
              className="lg:col-span-6 xl:col-span-5 grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#FAF9F5] border border-[#C9C7C0] p-4 text-xs font-mono"
            >
              <div>
                <span className="text-[10px] text-[#777777] uppercase tracking-wider block">CLIENT</span>
                <span className="font-bold text-[#000000] block mt-0.5">
                  {project.client || "Pinnacle Movers"}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-[#777777] uppercase tracking-wider block">SERVICE</span>
                <span className="font-bold text-[#000000] block mt-0.5">
                  {project.service || "Website Development"}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-[#777777] uppercase tracking-wider block">YEAR</span>
                <span className="font-bold text-[#000000] block mt-0.5">
                  {project.year || "2026"}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-[#777777] uppercase tracking-wider block">STATUS</span>
                <span className="font-bold text-[#000000] flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>{project.status || "Live"}</span>
                </span>
              </div>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}
