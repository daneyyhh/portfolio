import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Lock, EyeOff, Compass, Terminal, Shield, Sparkles } from 'lucide-react';
import ReubgLogo from '../UI/ReubgLogo';
import { personalData } from '../../data/portfolioData';

const EASE = [0.16, 1, 0.3, 1];

/**
 * MerchLab — "Under Development" Mystery Creative Atelier
 * 
 * Strict Constraints:
 * - NO merchandise revealed (no t-shirts, hoodies, stickers, mockups, products, prices, shopping UI, or product names).
 * - Atmospheric "under development" laboratory aesthetic.
 * - Abstract development imagery: construction frame, translucent panels, studio light,
 *   architectural structure, technical markings, and blueprint elements.
 * - Exact official REUBG DEV logo utilized without modification.
 * - Warm Ivory, Deep Black, Soft Stone, Near Black, Graphite, Controlled Red accent (#FF1E27). Zero purple.
 * - Real destination for FOLLOW UPDATES (GitHub profile releases / announcements).
 * - Full reduced-motion and responsive mobile/desktop separation with zero horizontal overflow.
 */
export default function MerchLab() {
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="merch-lab"
      className="py-24 sm:py-32 md:py-40 px-4 sm:px-6 md:px-12 bg-[#0A0A0A] text-[#F1F0EB] relative border-t border-white/10 font-mono w-full overflow-hidden selection:bg-[#FF1E27] selection:text-white"
    >
      {/* ─────────────────────────────────────────────────────────────
          ARCHITECTURAL BACKGROUND GRID & VOLUMETRIC STUDIO LIGHTING
      ───────────────────────────────────────────────────────────── */}
      {/* Subtle Studio Overhead Key Light Beam */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[550px] pointer-events-none opacity-40"
        style={{
          background: 'radial-gradient(ellipse 65% 50% at 50% 0%, rgba(255, 30, 39, 0.09) 0%, rgba(255,255,255,0.02) 40%, transparent 80%)'
        }}
        aria-hidden="true"
      />

      {/* Blueprint Coordinate Drafting Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
        aria-hidden="true"
      />

      {/* Architectural Registration Markings */}
      <div className="absolute top-6 left-6 text-[9px] text-white/20 font-mono tracking-widest hidden md:block select-none" aria-hidden="true">
        + LAB-SPEC // RBG-ML-26
      </div>
      <div className="absolute top-6 right-6 text-[9px] text-white/20 font-mono tracking-widest hidden md:block select-none" aria-hidden="true">
        COORD: 09°58&apos;N · 76°17&apos;E // SEC: 08
      </div>

      <div className="max-w-7xl mx-auto relative z-10 w-full space-y-12 sm:space-y-16">
        
        {/* ─────────────────────────────────────────────────────────────
            TOP EDITORIAL SECTION TAG & STATUS BAR
        ───────────────────────────────────────────────────────────── */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs sm:text-sm font-bold text-[#FF1E27] tracking-widest uppercase">
              EXPERIMENT // 08
            </span>
            <span className="h-px w-8 sm:w-12 bg-white/20" />
            <span className="font-mono text-xs text-slate-300 uppercase tracking-widest font-semibold">
              MERCH LAB
            </span>
          </div>

          {/* Dual Technical Status Markers */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap text-[10px] sm:text-[11px] font-mono font-bold tracking-wider uppercase select-none">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#141416] border border-white/15 text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-stone-400" />
              <span>CONCEPT / 2026</span>
            </span>

            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#181212] border border-[#FF1E27]/40 text-white">
              <span className="relative flex h-2 w-2 shrink-0 items-center justify-center">
                <span
                  className="absolute inline-flex h-3 w-3 rounded-full bg-[#FF1E27]/25 animate-pulse motion-reduce:hidden"
                  style={{ animationDuration: '2.5s' }}
                />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#FF1E27]" />
              </span>
              <span className="tracking-widest">IN DEVELOPMENT</span>
            </span>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            RESPONSIVE DUAL-PANE ATELIER (DESKTOP & MOBILE TAILORED)
        ───────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Left Column (6 cols): Brand Identity, Editorial Manifesto & Copy */}
          <motion.div
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-8% 0px' }}
            transition={{ duration: 0.6, ease: EASE }}
            className="lg:col-span-6 space-y-6 sm:space-y-8"
          >
            {/* Official REUBG DEV Logo */}
            <div className="space-y-2">
              <div className="inline-block p-1 bg-white/[0.02] border border-white/10">
                <ReubgLogo
                  variant="dark"
                  className="w-[110px] sm:w-[130px] md:w-[145px] h-auto opacity-95"
                />
              </div>
              <div className="text-[10px] text-slate-300 tracking-widest uppercase font-mono">
                CREATIVE ENGINEERING DIVISION // PHYSICAL TANGIBLE LAB
              </div>
            </div>

            {/* Main Primary Headline */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#FF1E27] tracking-widest uppercase">
                <Terminal size={13} />
                <span>CONFIDENTIAL LAB NOTICE //</span>
              </div>
              <h2 className="font-syne text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase text-white tracking-tight leading-[0.95]">
                MERCH LAB
              </h2>
              <div className="font-syne text-xl sm:text-2xl md:text-3xl font-bold uppercase text-[#FF1E27] tracking-tight">
                UNDER DEVELOPMENT.
              </div>
            </div>

            {/* Editorial Teaser Manifesto */}
            <div className="space-y-4 border-l-2 border-white/20 pl-4 sm:pl-6 py-1">
              <p className="font-sans text-lg sm:text-xl md:text-2xl text-slate-100 font-semibold tracking-tight leading-snug">
                &ldquo;A new chapter is in the works.&rdquo;
              </p>
              <p className="font-sans text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
                &ldquo;Designed for the same mindset.&rdquo;
              </p>
            </div>

            {/* Conceptual Small Phrase */}
            <div className="bg-[#111113] border border-white/10 p-4 sm:p-5 space-y-1.5 max-w-lg">
              <span className="text-[10px] font-mono text-[#FF1E27] font-bold uppercase tracking-widest block">
                MANIFESTO NOTE //
              </span>
              <p className="font-syne text-xs sm:text-sm font-extrabold text-white tracking-wider uppercase">
                &ldquo;SAME MINDSET. DIFFERENT MEDIUM.&rdquo;
              </p>
              <p className="font-sans text-xs text-slate-300 leading-relaxed pt-0.5">
                Translating digital precision, procedural craft, and engineering discipline into tangible reality. Shrouded in secrecy until production tolerances are met.
              </p>
            </div>

            {/* Action Bar & Follow Destination */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-4">
              <a
                href={personalData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-editorial-red inline-flex items-center justify-center gap-3 px-5 py-3 text-xs font-mono font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer shadow-lg hover:shadow-[#FF1E27]/20"
                aria-label="Follow updates on GitHub repository and release dispatches"
              >
                <span>FOLLOW UPDATES</span>
                <ArrowUpRight size={14} />
              </a>

              <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF1E27] animate-pulse" />
                <span className="uppercase tracking-widest text-[11px] font-bold text-white">
                  MORE DETAILS SOON.
                </span>
              </div>
            </div>

            <p className="text-[10px] text-slate-300 font-mono tracking-wider">
              Dispatches and pre-release access milestones will be announced via GitHub releases & developer logs.
            </p>
          </motion.div>

          {/* Right Column (6 cols): The Obscured Technical Laboratory Chamber */}
          <motion.div
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-8% 0px' }}
            transition={{ duration: 0.7, ease: EASE }}
            className="lg:col-span-6 relative w-full"
          >
            {/* Ambient Backlight Halo */}
            <div
              className="absolute -inset-4 bg-gradient-to-tr from-[#FF1E27]/10 via-transparent to-white/[0.03] rounded-none filter blur-2xl pointer-events-none opacity-60"
              aria-hidden="true"
            />

            {/* Main Chamber Frame */}
            <div className="relative bg-[#0E0E10] border border-white/20 p-5 sm:p-7 md:p-8 space-y-6 shadow-2xl overflow-hidden">
              
              {/* Technical Calibration Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 text-xs font-mono">
                <div className="flex items-center gap-2 text-slate-300">
                  <Lock size={13} className="text-[#FF1E27]" />
                  <span className="font-bold tracking-widest uppercase">LAB CHAMBER 08</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-slate-300 uppercase tracking-widest">
                  <EyeOff size={12} className="text-stone-400" />
                  <span>VISUAL OBFUSCATION ACTIVE</span>
                </div>
              </div>

              {/* ─────────────────────────────────────────────────────────────
                  ABSTRACT DEVELOPMENT COMPOSITION (NOT SHOWING ANY PRODUCT)
                  Features: construction frame, translucent panels, studio lighting,
                  blueprint crosshairs, technical markings, and draped silhouette
              ───────────────────────────────────────────────────────────── */}
              <div className="relative h-64 sm:h-72 md:h-84 w-full bg-[#08080A] border border-white/15 overflow-hidden flex items-center justify-center select-none group">
                
                {/* 1. Technical Coordinate Crosshairs & Grid Lines */}
                <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                  {/* Center Datum Lines */}
                  <div className="absolute top-1/2 left-0 right-0 h-px bg-white/10" />
                  <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10" />

                  {/* Corner Construction Bracket Markers */}
                  <span className="absolute top-2 left-2 text-[10px] text-white/30 font-mono">┌</span>
                  <span className="absolute top-2 right-2 text-[10px] text-white/30 font-mono">┐</span>
                  <span className="absolute bottom-2 left-2 text-[10px] text-white/30 font-mono">└</span>
                  <span className="absolute bottom-2 right-2 text-[10px] text-white/30 font-mono">┘</span>

                  {/* Top Center Studio Spotlight Simulation */}
                  <div
                    className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full pointer-events-none"
                    style={{
                      background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, rgba(255,30,39,0.04) 40%, transparent 70%)'
                    }}
                  />
                </div>

                {/* 2. Abstract Geometric Construction Wireframe (Architectural Scaffold) */}
                <div className="relative z-10 w-44 sm:w-56 h-44 sm:h-56 flex items-center justify-center" aria-hidden="true">
                  {/* Outer Rotating Architectural Framework (Calm, Subtle) */}
                  <div
                    className="absolute inset-0 border border-dashed border-white/20 rotate-45 motion-reduce:rotate-0 transition-transform duration-700"
                  />
                  <div
                    className="absolute inset-3 border border-white/10 rotate-12 motion-reduce:rotate-0"
                  />

                  {/* 3. Partially Obscured / Draped Monolith Shrouded in Frost */}
                  <div className="relative w-28 sm:w-36 h-28 sm:h-36 bg-gradient-to-b from-[#1C1C20] to-[#0A0A0C] border border-white/25 shadow-2xl flex flex-col items-center justify-center p-3 text-center backdrop-blur-xl">
                    {/* Architectural Datum Crosshair */}
                    <div className="w-6 h-6 border-t border-l border-[#FF1E27]/80 absolute -top-1 -left-1" />
                    <div className="w-6 h-6 border-b border-r border-[#FF1E27]/80 absolute -bottom-1 -right-1" />

                    <Lock size={20} className="text-[#FF1E27] mb-1.5 opacity-90" />
                    
                    <span className="text-[9px] font-mono font-bold tracking-widest text-white uppercase block">
                      PROTOTYPE
                    </span>
                    <span className="text-[8px] font-mono text-slate-300 uppercase tracking-wider block mt-0.5">
                      CLASSIFIED
                    </span>
                    <span className="text-[7px] font-mono text-[#FF1E27] uppercase tracking-widest block mt-1">
                      [RESTRICTED]
                    </span>
                  </div>
                </div>

                {/* 4. Translucent Frosted Glass Overlay Panel */}
                <div
                  className="absolute inset-0 bg-black/40 backdrop-blur-[2px] pointer-events-none flex flex-col justify-between p-4 z-20"
                  aria-hidden="true"
                >
                  <div className="flex justify-between items-start text-[8px] sm:text-[9px] font-mono text-slate-300 tracking-wider">
                    <span>CAD-SPEC: [REDACTED]</span>
                    <span>TOLERANCE: ±0.04mm</span>
                  </div>

                  {/* Watermark Calibration Label in Center */}
                  <div className="text-center space-y-1">
                    <span className="inline-block px-3 py-1 bg-black/80 border border-white/20 text-[9px] sm:text-[10px] font-mono font-bold text-white uppercase tracking-[0.2em]">
                      PHYSICAL ARCHITECTURE IN PROGRESS
                    </span>
                    <span className="block text-[8px] font-mono text-[#FF1E27] tracking-widest">
                      NON-DISCLOSURE ACTIVE · DO NOT DISTRIBUTE
                    </span>
                  </div>

                  <div className="flex justify-between items-end text-[8px] sm:text-[9px] font-mono text-slate-300 tracking-wider">
                    <span>STAGE: 01 // BLUEPRINTING</span>
                    <span>REUBG DEV // 2026</span>
                  </div>
                </div>
              </div>

              {/* Technical Specifications Grid (Material / Engineering Rigor) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-left font-mono">
                <div className="bg-white/[0.02] border border-white/10 p-3 space-y-0.5">
                  <span className="text-[9px] text-slate-300 uppercase tracking-widest block font-semibold">MEDIUM</span>
                  <span className="text-xs font-bold text-white uppercase">TANGIBLE</span>
                </div>
                <div className="bg-white/[0.02] border border-white/10 p-3 space-y-0.5">
                  <span className="text-[9px] text-slate-300 uppercase tracking-widest block font-semibold">CAD PHASE</span>
                  <span className="text-xs font-bold text-white uppercase">REFINEMENT</span>
                </div>
                <div className="bg-white/[0.02] border border-white/10 p-3 space-y-0.5">
                  <span className="text-[9px] text-slate-300 uppercase tracking-widest block font-semibold">FORM FACTOR</span>
                  <span className="text-xs font-bold text-[#FF1E27] uppercase">CLASSIFIED</span>
                </div>
                <div className="bg-white/[0.02] border border-white/10 p-3 space-y-0.5">
                  <span className="text-[9px] text-slate-300 uppercase tracking-widest block font-semibold">TARGET YEAR</span>
                  <span className="text-xs font-bold text-white uppercase">2026</span>
                </div>
              </div>

              {/* Bottom Chamber Telemetry Footer */}
              <div className="pt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[10px] text-slate-300 font-mono">
                <div className="flex items-center gap-2">
                  <Compass size={11} className="text-[#FF1E27]" />
                  <span>TEST RIG SPEC: RBG-ATELIER-01</span>
                </div>
                <span className="text-[#FF1E27] font-semibold">
                  SURFACE TESTING · DISCLOSURE IMMINENT
                </span>
              </div>

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
