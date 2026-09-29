import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowUpRight,
  Lock,
  EyeOff,
  Compass,
  Terminal,
  Layers,
  Sparkles,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import ReubgLogo from '../components/UI/ReubgLogo';
import { personalData } from '../data/portfolioData';

const EASE = [0.16, 1, 0.3, 1];

/**
 * MerchLabPage — Dedicated Full-Page "Under Development" Atelier Experience
 * 
 * Strict Guidelines:
 * - NO merchandise revealed (no t-shirts, hoodies, stickers, mockups, products, prices, shopping UI, or product names).
 * - Creates a mysterious "under development" atmosphere.
 * - Abstract development imagery: construction frame, translucent panels, studio lighting,
 *   architectural structure, technical markings, blueprint elements, and partially obscured forms.
 * - Exact official REUBG DEV logo utilized without modification.
 * - Palette: Warm Ivory, Deep Black, Soft Stone, Near Black, Graphite, Controlled Red accent (#FF1E27). Zero purple.
 * - Small FOLLOW UPDATES button directing to real destination (GitHub releases / developer announcements).
 * - Dedicated desktop and mobile layouts with zero horizontal overflow and reduced motion support.
 */
export default function MerchLabPage({ onOpenResume }) {
  const prefersReduced = useReducedMotion();

  // Set document title and scroll to top on mount
  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'MERCH LAB // UNDER DEVELOPMENT — REUBG DEV';
    window.scrollTo(0, 0);

    return () => {
      document.title = previousTitle;
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#070709] text-[#F1F0EB] font-mono selection:bg-[#FF1E27] selection:text-white relative overflow-x-hidden flex flex-col justify-between">
      
      {/* ─────────────────────────────────────────────────────────────
          ATMOSPHERIC VOLUMETRIC LIGHTING & BLUEPRINT BACKGROUND
      ───────────────────────────────────────────────────────────── */}
      {/* Top Overhead Studio Spotlight Cone */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[650px] pointer-events-none opacity-45"
        style={{
          background: 'radial-gradient(ellipse 70% 55% at 50% 0%, rgba(255, 30, 39, 0.11) 0%, rgba(255,255,255,0.02) 45%, transparent 80%)'
        }}
        aria-hidden="true"
      />

      {/* Blueprint Coordinate Drafting Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
        aria-hidden="true"
      />

      {/* Atmospheric Vignette Gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#070709]/50 to-[#070709] pointer-events-none" aria-hidden="true" />

      {/* ─────────────────────────────────────────────────────────────
          MAIN ATELIER CHAMBER CONTENT
      ───────────────────────────────────────────────────────────── */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-10 sm:py-14 md:py-16 relative z-10 w-full flex flex-col justify-center">
        
        {/* Top Registration Breadcrumb */}
        <div className="flex items-center justify-between text-[10px] sm:text-xs text-slate-300 border-b border-white/10 pb-4 mb-8 sm:mb-12">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-[#FF1E27] font-semibold transition-colors"
            >
              <ArrowLeft size={13} />
              <span>RETURN TO PORTFOLIO</span>
            </Link>
            <span className="text-white/20 hidden sm:inline">|</span>
            <span className="text-[#FF1E27] font-bold hidden sm:inline">REUBG ATELIER //</span>
            <span className="hidden sm:inline">SPEC: ML-2026-CONFIDENTIAL</span>
          </div>

          <div className="flex items-center gap-3 text-slate-300">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#181212] border border-[#FF1E27]/40 text-white text-[10px]">
              <span className="relative flex h-1.5 w-1.5 shrink-0 items-center justify-center">
                <span className="absolute inline-flex h-2.5 w-2.5 rounded-full bg-[#FF1E27]/25 animate-pulse" />
                <span className="relative inline-flex rounded-full h-1 w-1 bg-[#FF1E27]" />
              </span>
              <span>UNDER DEV</span>
            </span>
            <span className="hidden sm:inline">COORD: 09°58&apos;N · 76°17&apos;E</span>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:inline">RESTRICTION: LEVEL 01</span>
          </div>
        </div>

        {/* Responsive Dual-Pane Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column (6 cols): Primary Editorial Content & Manifesto */}
          <motion.div
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="lg:col-span-6 space-y-6 sm:space-y-8"
          >
            {/* Identity & Status */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#FF1E27] tracking-widest uppercase">
                <Terminal size={14} />
                <span>EXPERIMENT // 08</span>
              </div>

              <h1 className="font-syne text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold uppercase text-white tracking-tight leading-[0.92]">
                MERCH LAB
              </h1>

              <div className="font-syne text-2xl sm:text-3xl md:text-4xl font-bold uppercase text-[#FF1E27] tracking-tight">
                UNDER DEVELOPMENT.
              </div>
            </div>

            {/* Editorial Manifesto Quotes */}
            <div className="space-y-3 border-l-2 border-white/20 pl-4 sm:pl-6 py-1">
              <p className="font-sans text-xl sm:text-2xl md:text-3xl text-white font-semibold tracking-tight leading-snug">
                &ldquo;A new chapter is in the works.&rdquo;
              </p>
              <p className="font-sans text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
                &ldquo;Designed for the same mindset.&rdquo;
              </p>
            </div>

            {/* Small Concept Phrase */}
            <div className="bg-[#101012] border border-white/10 p-5 sm:p-6 space-y-2 max-w-xl">
              <div className="flex items-center justify-between text-[10px] text-slate-300 uppercase tracking-widest">
                <span className="text-[#FF1E27] font-bold">ATELIER STATEMENT //</span>
                <span>STATUS: CLASSIFIED</span>
              </div>
              
              <p className="font-syne text-sm sm:text-base font-extrabold text-white tracking-wider uppercase">
                &ldquo;SAME MINDSET. DIFFERENT MEDIUM.&rdquo;
              </p>
              
              <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
                Translating digital precision, procedural game aesthetics, and engineering discipline into tangible reality. Shrouded in secrecy until production tolerances are met.
              </p>
            </div>

            {/* Action Bar: Follow Updates */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-4">
              <a
                href={personalData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-editorial-red inline-flex items-center justify-center gap-3 px-6 py-3.5 text-xs font-mono font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer shadow-xl hover:shadow-[#FF1E27]/25"
                aria-label="Follow project updates and releases on GitHub"
              >
                <span>FOLLOW UPDATES</span>
                <ArrowUpRight size={15} />
              </a>

              <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF1E27] animate-pulse" />
                <span className="uppercase tracking-widest text-xs font-bold text-white">
                  MORE DETAILS SOON.
                </span>
              </div>
            </div>

            <p className="text-[10px] text-slate-300 font-mono tracking-wider">
              No newsletter spam. Development dispatches and pre-release access milestones are announced directly via developer release logs.
            </p>
          </motion.div>

          {/* Right Column (6 cols): The Obscured Technical Laboratory Chamber */}
          <motion.div
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
            className="lg:col-span-6 relative w-full"
          >
            {/* Ambient Red Atmospheric Glow */}
            <div
              className="absolute -inset-4 bg-gradient-to-tr from-[#FF1E27]/12 via-transparent to-white/[0.04] rounded-none filter blur-2xl pointer-events-none opacity-70"
              aria-hidden="true"
            />

            {/* Main Chamber Frame */}
            <div className="relative bg-[#0C0C0E] border border-white/20 p-5 sm:p-7 md:p-8 space-y-6 shadow-2xl overflow-hidden">
              
              {/* Technical Calibration Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 text-xs font-mono">
                <div className="flex items-center gap-2 text-slate-200">
                  <Lock size={13} className="text-[#FF1E27]" />
                  <span className="font-bold tracking-widest uppercase">LAB CHAMBER // 08</span>
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
              <div className="relative h-72 sm:h-80 md:h-96 w-full bg-[#070709] border border-white/15 overflow-hidden flex items-center justify-center select-none group">
                
                {/* 1. Coordinate Crosshairs & Grid Lines */}
                <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                  <div className="absolute top-1/2 left-0 right-0 h-px bg-white/10" />
                  <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10" />

                  {/* Corner Construction Bracket Markers */}
                  <span className="absolute top-3 left-3 text-[10px] text-white/30 font-mono">┌</span>
                  <span className="absolute top-3 right-3 text-[10px] text-white/30 font-mono">┐</span>
                  <span className="absolute bottom-3 left-3 text-[10px] text-white/30 font-mono">└</span>
                  <span className="absolute bottom-3 right-3 text-[10px] text-white/30 font-mono">┘</span>

                  {/* Overhead Studio Lighting Simulation */}
                  <div
                    className="absolute -top-16 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full pointer-events-none"
                    style={{
                      background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, rgba(255,30,39,0.05) 45%, transparent 70%)'
                    }}
                  />
                </div>

                {/* 2. Abstract Construction Framework (Scaffold) */}
                <div className="relative z-10 w-48 sm:w-60 h-48 sm:h-60 flex items-center justify-center" aria-hidden="true">
                  <div className="absolute inset-0 border border-dashed border-white/20 rotate-45 motion-reduce:rotate-0 transition-transform duration-700" />
                  <div className="absolute inset-4 border border-white/10 rotate-12 motion-reduce:rotate-0" />

                  {/* 3. Partially Obscured / Draped Monolithic Silhouette */}
                  <div className="relative w-32 sm:w-40 h-32 sm:h-40 bg-gradient-to-b from-[#1E1E24] to-[#0A0A0E] border border-white/25 shadow-2xl flex flex-col items-center justify-center p-3 text-center backdrop-blur-2xl">
                    <div className="w-6 h-6 border-t border-l border-[#FF1E27]/80 absolute -top-1 -left-1" />
                    <div className="w-6 h-6 border-b border-r border-[#FF1E27]/80 absolute -bottom-1 -right-1" />

                    <Lock size={22} className="text-[#FF1E27] mb-2 opacity-90" />
                    
                    <span className="text-[10px] font-mono font-bold tracking-widest text-white uppercase block">
                      PROTOTYPE
                    </span>
                    <span className="text-[9px] font-mono text-slate-300 uppercase tracking-wider block mt-0.5">
                      CLASSIFIED
                    </span>
                    <span className="text-[8px] font-mono text-[#FF1E27] uppercase tracking-widest block mt-1">
                      [RESTRICTED]
                    </span>
                  </div>
                </div>

                {/* 4. Translucent Frosted Glass Overlay Panel */}
                <div
                  className="absolute inset-0 bg-black/45 backdrop-blur-[2.5px] pointer-events-none flex flex-col justify-between p-4 sm:p-5 z-20"
                  aria-hidden="true"
                >
                  <div className="flex justify-between items-start text-[9px] font-mono text-slate-300 tracking-wider">
                    <span>CAD-SPEC: [REDACTED]</span>
                    <span>TOLERANCE: ±0.04mm</span>
                  </div>

                  {/* Watermark Calibration Label in Center */}
                  <div className="text-center space-y-1">
                    <span className="inline-block px-3.5 py-1 bg-black/85 border border-white/20 text-[10px] sm:text-[11px] font-mono font-bold text-white uppercase tracking-[0.25em]">
                      PHYSICAL ARCHITECTURE IN PROGRESS
                    </span>
                    <span className="block text-[9px] font-mono text-[#FF1E27] tracking-widest">
                      NON-DISCLOSURE ACTIVE · DO NOT DISTRIBUTE
                    </span>
                  </div>

                  <div className="flex justify-between items-end text-[9px] font-mono text-slate-300 tracking-wider">
                    <span>STAGE: 01 // BLUEPRINTING</span>
                    <span>REUBG DEV // 2026</span>
                  </div>
                </div>
              </div>

              {/* Technical Specifications Grid (Material / Engineering Rigor) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1 text-left font-mono">
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
                  <Compass size={12} className="text-[#FF1E27]" />
                  <span>TEST RIG SPEC: RBG-ATELIER-01</span>
                </div>
                <span className="text-[#FF1E27] font-semibold">
                  SURFACE TESTING · DISCLOSURE IMMINENT
                </span>
              </div>

            </div>
          </motion.div>

        </div>

      </main>

      {/* ─────────────────────────────────────────────────────────────
          EDITORIAL PAGE FOOTER
      ───────────────────────────────────────────────────────────── */}
      <footer className="border-t border-white/10 px-4 sm:px-6 md:px-12 py-6 bg-[#050507] text-[10px] sm:text-xs text-slate-300 font-mono">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            © {new Date().getFullYear()} REUBEN BINU GEORGE · REUBG DEV MERCH LAB
          </div>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-white hover:text-[#FF1E27] transition-colors font-bold">
              ← RETURN TO MAIN SITE
            </Link>
            <span>•</span>
            <span>CONFIDENTIAL ATELIER</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
