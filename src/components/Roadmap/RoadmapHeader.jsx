import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Layers, Terminal, Server, ArrowDown, BookOpen } from 'lucide-react';

const EASE = [0.16, 1, 0.3, 1];

export default function RoadmapHeader({ activePhase, onSelectPhase, phases = [] }) {
  const prefersReduced = useReducedMotion();

  return (
    <div className="space-y-8 sm:space-y-10 w-full font-mono">
      {/* ── 01. SECTION METADATA BAR ── */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#C9C7C0] pb-4">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-[#FF1E27] animate-pulse" />
          <span className="text-xs uppercase tracking-widest font-bold text-[#FF1E27]">
            ENGINEERING / LEARNING PATH
          </span>
          <span className="text-[#888884] text-xs">•</span>
          <span className="text-xs text-[#555555] uppercase tracking-wider hidden sm:inline">
            FULL-STACK CURRICULUM & TECHNICAL SPECIFICATION
          </span>
        </div>

        <div className="flex items-center gap-2 text-[10px] sm:text-xs text-[#555550] bg-[#FAF9F5] px-3 py-1 border border-[#C9C7C0]">
          <BookOpen size={12} className="text-[#FF1E27]" />
          <span>8 PHASES // FRONTEND TO BACKEND</span>
        </div>
      </div>

      {/* ── 02. MAIN EDITORIAL HEADING & SUPPORTING TEXT ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        <div className="lg:col-span-7 space-y-4">
          <motion.h2
            initial={prefersReduced ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#000000] uppercase leading-[0.95]"
          >
            THE FULL-STACK<br />
            <span className="text-[#111111]">ROADMAP</span>
            <span className="text-[#FF1E27]">.</span>
          </motion.h2>

          <motion.p
            initial={prefersReduced ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="text-xs sm:text-sm text-[#444440] leading-relaxed max-w-2xl font-mono"
          >
            From the fundamentals of the web to the architecture of production-ready applications. Explore the technologies, tools, patterns, and engineering practices behind modern full-stack development.
          </motion.p>
        </div>

        {/* ── 03. SECONDARY DETAILS FOUR-POINT MATRIX ── */}
        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          <div className="p-3 bg-[#FAF9F5] border border-[#C9C7C0] flex flex-col justify-between h-20">
            <span className="text-[10px] font-bold text-[#FF1E27] uppercase tracking-wider">STRUCTURE</span>
            <span className="text-xs font-bold text-[#111111] uppercase">08 LEARNING PHASES</span>
          </div>

          <div className="p-3 bg-[#FAF9F5] border border-[#C9C7C0] flex flex-col justify-between h-20">
            <span className="text-[10px] font-bold text-[#555550] uppercase tracking-wider">DISCIPLINE</span>
            <span className="text-xs font-bold text-[#111111] uppercase">FRONTEND TO BACKEND</span>
          </div>

          <div className="p-3 bg-[#FAF9F5] border border-[#C9C7C0] flex flex-col justify-between h-20">
            <span className="text-[10px] font-bold text-[#555550] uppercase tracking-wider">LIFECYCLE</span>
            <span className="text-xs font-bold text-[#111111] uppercase">DEVELOPMENT TO DEPLOYMENT</span>
          </div>

          <div className="p-3 bg-[#FAF9F5] border border-[#C9C7C0] flex flex-col justify-between h-20">
            <span className="text-[10px] font-bold text-[#FF1E27] uppercase tracking-wider">DEPTH</span>
            <span className="text-[11px] font-bold text-[#111111] uppercase leading-tight">FUNDAMENTALS TO ADVANCED ENGINEERING</span>
          </div>
        </div>
      </div>

      {/* ── 04. INTERACTIVE PHASE PROGRESSION TRACK SELECTOR ── */}
      <div className="border border-[#C9C7C0] bg-[#FAF9F5] p-2 sm:p-3">
        <div className="text-[10px] text-[#666660] uppercase font-bold tracking-wider mb-2 flex items-center justify-between">
          <span>PROGRESSION TIMELINE // JUMP TO PHASE</span>
          <span className="hidden sm:inline">CHRONOLOGICAL 52-WEEK SYLLABUS</span>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5">
          {phases.map((p) => {
            const isSelected = activePhase === p.phase;
            return (
              <button
                key={p.phase}
                type="button"
                onClick={() => onSelectPhase(p.phase)}
                className={`py-2 px-1 text-center border text-[11px] font-mono transition-all duration-150 flex flex-col items-center justify-center ${
                  isSelected
                    ? 'bg-[#111111] text-[#FFFFFF] border-[#111111] shadow-sm font-bold'
                    : 'bg-[#FFFFFF] text-[#222222] border-[#C9C7C0] hover:border-[#111111]'
                }`}
                title={`Phase ${p.phase}: ${p.title}`}
              >
                <span className={`text-[9px] uppercase tracking-wider ${isSelected ? 'text-[#FF1E27]' : 'text-[#888880]'}`}>
                  PH {p.phase}
                </span>
                <span className="truncate w-full font-bold text-[10px]">
                  {p.category}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
