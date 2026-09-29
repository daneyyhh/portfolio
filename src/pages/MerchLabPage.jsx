import React, { useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Globe } from 'lucide-react';

const EASE = [0.16, 1, 0.3, 1];

export default function MerchLabPage() {
  const prefersReduced = useReducedMotion();

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
            {/* MERCH: Solid Black Ultra-Heavy Industrial Display */}
            <h1 className="font-archivo text-6xl sm:text-7xl md:text-8xl lg:text-[7.25rem] xl:text-[8.5rem] tracking-tight text-[#111111] leading-[0.84] uppercase block">
              MERCH
            </h1>

            {/* LAB: Hollow Outline Sans-Serif */}
            <div
              className="font-archivo text-6xl sm:text-7xl md:text-8xl lg:text-[7.25rem] xl:text-[8.5rem] tracking-tight leading-[0.84] uppercase block text-transparent"
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

          {/* ─────────────────────────────────────────────────────────────
              HIGHLIGHTED LIVE STATUS 30% LOADING BAR WITH RUNNING ANIMATION
          ───────────────────────────────────────────────────────────── */}
          <div className="pt-2 max-w-lg space-y-2.5">
            {/* Telemetry Header */}
            <div className="flex items-center justify-between font-mono text-xs sm:text-sm font-bold tracking-wider">
              <div className="flex items-center gap-2.5 text-[#111111]">
                <span className="relative flex h-2.5 w-2.5 shrink-0 items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF1E27] opacity-80" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF1E27]" />
                </span>
                <span className="tracking-[0.2em] uppercase">LIVE STATUS</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-[#555552] uppercase font-normal tracking-widest hidden sm:inline">PROGRESS:</span>
                <span className="text-[#FF1E27] text-sm sm:text-base font-extrabold tracking-widest font-mono">30%</span>
              </div>
            </div>

            {/* Industrial High-Tech Loading Bar */}
            <div className="relative w-full h-4 sm:h-5 bg-[#111111]/10 border-2 border-[#111111] p-[2px] shadow-sm overflow-hidden select-none">
              {/* 30% Progress Fill with Running Animation */}
              <div
                className="h-full bg-[#FF1E27] relative overflow-hidden"
                style={{ width: '30%' }}
              >
                {/* Running Diagonal Barber-Pole Stripes */}
                <div
                  className="absolute inset-0 opacity-40 animate-running-stripes"
                  style={{
                    backgroundImage: 'linear-gradient(45deg, rgba(255, 255, 255, 0.45) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.45) 50%, rgba(255, 255, 255, 0.45) 75%, transparent 75%, transparent)',
                    backgroundSize: '20px 20px',
                  }}
                />

                {/* Continuous Shimmer Light Beam */}
                <motion.div
                  className="absolute top-0 bottom-0 w-10 bg-gradient-to-r from-transparent via-white/70 to-transparent"
                  animate={{ x: ['-100%', '300%'] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
                />
              </div>

              {/* Glowing Leading Marker at the 30% Boundary */}
              <div
                className="absolute top-0 bottom-0 w-[2px] bg-white shadow-[0_0_8px_#FF1E27] z-10"
                style={{ left: 'calc(30% - 1px)' }}
              />

              {/* Remaining Empty Track Grid Markings */}
              <div
                className="absolute top-0 bottom-0 right-0 opacity-15 pointer-events-none"
                style={{
                  left: '30%',
                  backgroundImage: 'repeating-linear-gradient(90deg, #111111, #111111 1px, transparent 1px, transparent 12px)',
                }}
              />
            </div>

            {/* Bottom Telemetry Meta */}
            <div className="flex items-center justify-between font-mono text-[10px] sm:text-[11px] text-[#555552] uppercase tracking-wider">
              <span>ACTIVE STAGE: PROTOTYPING & MATERIAL SAMPLING</span>
              <span className="text-[#111111] font-semibold">STAGE 01 // 03</span>
            </div>
          </div>

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
