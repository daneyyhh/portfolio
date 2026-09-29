import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Plus, Globe } from 'lucide-react';
import { personalData } from '../data/portfolioData';

const EASE = [0.16, 1, 0.3, 1];

/**
 * MerchLabPage — Pixel-perfect match to official design reference:
 * - Architectural studio atelier with concrete floor, scaffold with ribbed 'UNDER DEVELOPMENT ///' panel,
 *   warm natural sunlight and shadows, concrete pillar, and glowing studio floor lamp.
 * - Solid black "MERCH" + hollow outlined "LAB" typography.
 * - "UNDER DEVELOPMENT ." with red square period.
 * - Exact body copy: "A new chapter is in the works.", "Designed for the same mindset.", "Stay tuned."
 * - Action row: "FOLLOW UPDATES →" pill button, circular (+) button, and stacked "SAME MINDSET. DIFFERENT MEDIUM."
 * - Left metadata: "CONCEPT / 2026", "MORE DETAILS SOON."
 * - Architectural pillar text: "CODE CREATE EXPLORE REPEAT" with red accent dash.
 * - Full-width bottom editorial ticker:
 *     Left: REUBG DEV / MERCH LAB —
 *     Center: CODE / CREATE / EXPLORE / REPEAT. (REPEAT in red)
 *     Right: CONCEPT / 2026 / IN DEVELOPMENT — 🌐
 */
export default function MerchLabPage() {
  const prefersReduced = useReducedMotion();
  const [manifestoOpen, setManifestoOpen] = useState(false);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'MERCH LAB // REUBG DEV';
    window.scrollTo(0, 0);

    return () => {
      document.title = previousTitle;
    };
  }, []);

  return (
    <div className="min-h-[calc(100vh-72px)] flex flex-col justify-between relative bg-[#EDECE6] text-[#111111] overflow-hidden selection:bg-[#FF1E27] selection:text-white font-sans">
      
      {/* ─────────────────────────────────────────────────────────────
          CINEMATIC STUDIO BACKDROP (RAW ARCHITECTURAL SCENE)
      ───────────────────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 bg-cover bg-right lg:bg-center pointer-events-none"
        style={{
          backgroundImage: `url('/images/merch-lab-backdrop.jpg')`,
        }}
        aria-hidden="true"
      />

      {/* Subtle responsive gradient overlay to ensure 100% typography contrast on smaller screens */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#EDECE6] via-[#EDECE6]/90 to-transparent lg:via-[#EDECE6]/40 pointer-events-none"
        aria-hidden="true"
      />

      {/* ─────────────────────────────────────────────────────────────
          ARCHITECTURAL CONCRETE PILLAR TYPOGRAPHY (CENTER/RIGHT)
      ───────────────────────────────────────────────────────────── */}
      <div
        className="hidden xl:block absolute right-[10%] top-[45%] -translate-y-1/2 font-mono text-[11px] text-[#555552]/70 uppercase tracking-[0.25em] space-y-1.5 select-none pointer-events-none z-10"
        aria-hidden="true"
      >
        <div>CODE</div>
        <div>CREATE</div>
        <div>EXPLORE</div>
        <div>REPEAT</div>
        <div className="w-5 h-0.5 bg-[#FF1E27] mt-1.5" />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          PRIMARY EDITORIAL CONTENT (LEFT COLUMN)
      ───────────────────────────────────────────────────────────── */}
      <main className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-12 pt-8 sm:pt-12 md:pt-14 pb-8 flex-1 flex flex-col justify-center">
        <motion.div
          initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="max-w-xl lg:max-w-2xl space-y-6 sm:space-y-7"
        >
          {/* Top Label: 08 — MERCH LAB */}
          <div className="flex items-center gap-3 text-xs sm:text-sm font-mono tracking-widest uppercase">
            <span className="text-[#FF1E27] font-bold">08</span>
            <span className="w-10 sm:w-14 h-px bg-[#111111]/30" />
            <span className="text-[#111111] font-bold">MERCH LAB</span>
          </div>

          {/* Massive Editorial Headline: Solid MERCH + Outlined LAB */}
          <div className="space-y-0 select-none">
            {/* MERCH: Solid Black Ultra-Heavy */}
            <h1 className="font-syne font-black text-6xl sm:text-7xl md:text-8xl lg:text-[7.25rem] xl:text-[8.5rem] tracking-tight text-[#111111] leading-[0.88] uppercase block">
              MERCH
            </h1>

            {/* LAB: Hollow Outline Sans-Serif */}
            <div
              className="font-syne font-black text-6xl sm:text-7xl md:text-8xl lg:text-[7.25rem] xl:text-[8.5rem] tracking-tight leading-[0.88] uppercase block text-transparent"
              style={{
                WebkitTextStroke: '2.5px #111111',
                paintOrder: 'stroke fill',
              }}
            >
              LAB
            </div>
          </div>

          {/* Subheading: UNDER DEVELOPMENT . */}
          <div className="font-mono text-xs sm:text-sm md:text-base font-bold uppercase tracking-[0.25em] text-[#111111] flex items-center gap-1.5 pt-0.5">
            <span>UNDER DEVELOPMENT</span>
            <span className="inline-block w-1.5 h-1.5 bg-[#FF1E27] shrink-0" />
          </div>

          {/* Narrative Body Copy */}
          <div className="space-y-1 font-sans text-sm sm:text-base text-[#383733] font-normal leading-relaxed pt-1 max-w-lg">
            <p>A new chapter is in the works.</p>
            <p>Designed for the same mindset.</p>
            <p>Stay tuned.</p>
          </div>

          {/* Action Row: Pill Button + Circle (+) + Stacked Text */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2">
            {/* FOLLOW UPDATES Rounded Pill Button */}
            <a
              href={personalData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3.5 px-6 py-3 bg-[#111111] hover:bg-[#FF1E27] text-white text-xs font-mono font-bold tracking-wider uppercase rounded-full transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
              aria-label="Follow project updates on GitHub"
            >
              <span>FOLLOW UPDATES</span>
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>

            {/* Circular (+) Button */}
            <button
              type="button"
              onClick={() => setManifestoOpen(!manifestoOpen)}
              className="w-10 h-10 rounded-full border border-[#111111]/30 hover:border-[#111111] hover:bg-[#111111] hover:text-white flex items-center justify-center text-[#111111] transition-all duration-200 cursor-pointer"
              title="Atelier statement"
              aria-label="Toggle atelier statement"
            >
              <Plus size={16} className={`transition-transform duration-300 ${manifestoOpen ? 'rotate-45' : ''}`} />
            </button>

            {/* Stacked Small Monospace Statement */}
            <div className="font-mono text-[9px] sm:text-[10px] uppercase font-bold tracking-wider text-[#111111] leading-tight select-none">
              <div>SAME</div>
              <div>MINDSET.</div>
              <div>DIFFERENT</div>
              <div>MEDIUM.</div>
            </div>
          </div>

          {/* Expandable Atelier Philosophy Drawer */}
          <AnimatePresence>
            {manifestoOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="overflow-hidden"
              >
                <div className="p-4 bg-[#EDECE6]/95 border border-[#111111]/20 font-mono text-xs text-[#2A2925] space-y-2 max-w-lg shadow-sm">
                  <div className="flex items-center justify-between text-[10px] text-[#FF1E27] font-bold tracking-widest uppercase">
                    <span>ATELIER SPEC // 2026</span>
                    <span>RESTRICTED ACCESS</span>
                  </div>
                  <p className="font-sans leading-relaxed">
                    Translating procedural craft, computational precision, and engineering discipline into tangible reality. Undergoing rigorous material tests until release criteria are met.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Left Metadata Bar Below Separator Line */}
          <div className="pt-6 sm:pt-7 border-t border-[#111111]/20 space-y-1 font-mono text-[10px] sm:text-xs uppercase tracking-widest select-none">
            <div className="font-bold text-[#111111]">
              CONCEPT &nbsp;/&nbsp; 2026
            </div>
            <div className="text-[#555552]">
              MORE DETAILS SOON.
            </div>
          </div>
        </motion.div>
      </main>

      {/* ─────────────────────────────────────────────────────────────
          FULL-WIDTH BOTTOM EDITORIAL STRIP / TICKER
      ───────────────────────────────────────────────────────────── */}
      <footer className="relative z-20 border-t border-[#111111]/15 bg-[#EDECE6]/90 backdrop-blur-sm px-4 sm:px-6 md:px-12 py-4 font-mono text-[10px] sm:text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4 w-full">
          
          {/* Left Block: REUBG DEV / MERCH LAB with horizontal line */}
          <div className="flex items-center gap-4 sm:gap-6 shrink-0">
            <div className="font-bold uppercase tracking-wider text-[#111111] leading-tight">
              <div>REUBG DEV</div>
              <div>MERCH LAB</div>
            </div>
            <span className="hidden sm:inline-block w-16 md:w-24 h-px bg-[#111111]/30" />
          </div>

          {/* Center Block: CODE / CREATE / EXPLORE / REPEAT. */}
          <div className="tracking-[0.2em] uppercase font-bold text-[#111111] text-xs sm:text-sm text-center">
            <span>CODE &nbsp;/&nbsp; CREATE &nbsp;/&nbsp; EXPLORE &nbsp;/&nbsp; </span>
            <span className="text-[#FF1E27]">REPEAT.</span>
          </div>

          {/* Right Block: CONCEPT / 2026 / IN DEVELOPMENT with Globe */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0 self-end md:self-auto">
            <div className="text-right uppercase font-semibold text-[#111111] leading-tight text-[10px] sm:text-xs">
              <div>CONCEPT / 2026</div>
              <div className="text-[#555552]">IN DEVELOPMENT</div>
            </div>
            <span className="w-8 sm:w-12 h-px bg-[#111111]/30 hidden sm:inline-block" />
            <Globe size={18} className="text-[#111111] stroke-[1.5]" />
          </div>

        </div>
      </footer>

    </div>
  );
}
