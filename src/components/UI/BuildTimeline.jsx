import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Check, ArrowRight, Layers, FileCode, CheckCircle2, ChevronRight, Compass } from 'lucide-react';

const EASE = [0.16, 1, 0.3, 1];

/**
 * BuildTimeline — Reusable Minimal Editorial Build Timeline Component
 * 
 * Canonical Stages supported (customizable per project):
 * 01 IDEA
 * 02 RESEARCH
 * 03 DESIGN
 * 04 DEVELOPMENT
 * 05 TESTING
 * 06 DEPLOYMENT
 * 
 * Scroll Interaction:
 * - Current stage becomes active with subtle red indicator
 * - Previous stages remain completed
 * - Next stages remain inactive
 * - Project imagery and technical deliverables update as the active stage shifts
 * 
 * Aesthetics:
 * - Minimal editorial design with thin lines
 * - Large stage numbers (font-syne)
 * - Subtle red accent (#FF1E27)
 * - Mobile vertical timeline, Desktop responsive split layout
 * - Respects prefers-reduced-motion
 */
export default function BuildTimeline({
  timeline = [],
  projectTitle = 'PROJECT',
  scrollContainerRef = null,
  className = ''
}) {
  const prefersReduced = useReducedMotion();
  const [activeIdx, setActiveIdx] = useState(0);
  const stageRefs = useRef([]);

  // Ensure stageRefs array length matches timeline length
  stageRefs.current = timeline.map((_, i) => stageRefs.current[i] || React.createRef());

  // Set up scroll-driven stage activation relative to modal scroll container
  useEffect(() => {
    if (!timeline.length) return;

    const container = scrollContainerRef?.current;
    if (!container) return;

    // IntersectionObserver with scroll container as root
    const observerOptions = {
      root: container,
      rootMargin: '-15% 0px -45% 0px',
      threshold: 0.15
    };

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const idx = Number(entry.target.getAttribute('data-stage-idx'));
          if (!isNaN(idx) && idx >= 0 && idx < timeline.length) {
            setActiveIdx(idx);
          }
        }
      });
    };

    let observer = null;
    try {
      observer = new IntersectionObserver(handleIntersect, observerOptions);
      stageRefs.current.forEach((ref) => {
        if (ref.current) observer.observe(ref.current);
      });
    } catch (e) {
      // Fallback for older browsers
    }

    // Scroll listener fallback for smooth calculation
    const handleScroll = () => {
      const containerRect = container.getBoundingClientRect();
      const focalLine = containerRect.top + containerRect.height * 0.35;

      let closestIdx = 0;
      let minDistance = Infinity;

      stageRefs.current.forEach((ref, idx) => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          const itemCenter = rect.top + rect.height * 0.3;
          const distance = Math.abs(itemCenter - focalLine);
          if (distance < minDistance) {
            minDistance = distance;
            closestIdx = idx;
          }
        }
      });

      if (closestIdx !== activeIdx) {
        setActiveIdx(closestIdx);
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      if (observer) observer.disconnect();
      container.removeEventListener('scroll', handleScroll);
    };
  }, [timeline.length, scrollContainerRef, activeIdx]);

  // Click on stage pill or tracker to scroll directly to it
  const scrollToStage = (idx) => {
    setActiveIdx(idx);
    const targetEl = stageRefs.current[idx]?.current;
    const container = scrollContainerRef?.current;
    if (targetEl && container) {
      const containerRect = container.getBoundingClientRect();
      const targetRect = targetEl.getBoundingClientRect();
      const relativeTop = targetRect.top - containerRect.top + container.scrollTop - 130;
      container.scrollTo({
        top: relativeTop,
        behavior: prefersReduced ? 'auto' : 'smooth'
      });
    }
  };

  if (!timeline || timeline.length === 0) return null;

  const currentStage = timeline[activeIdx] || timeline[0];

  return (
    <section id="sec-timeline" className={`space-y-8 pt-6 ${className}`}>
      {/* Editorial Section Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs sm:text-sm font-bold text-[#FF1E27] tracking-widest uppercase">
            BUILD TIMELINE //
          </span>
          <span className="h-px flex-1 bg-white/10" />
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest hidden sm:inline">
            {timeline.length} STAGES VERIFIED
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 max-w-5xl">
          <div>
            <h2 className="font-syne text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase text-white tracking-tight">
              CHRONOLOGICAL PRODUCTION PHASES
            </h2>
            <p className="font-sans text-slate-300 text-sm sm:text-base leading-relaxed mt-1">
              End-to-end development progression from architectural hypothesis to verified production deployment.
            </p>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          MINIMAL EDITORIAL STAGE TRACKER (HORIZONTAL NAV ON DESKTOP)
      ───────────────────────────────────────────────────────────── */}
      <div className="bg-[#111113] border border-white/15 p-2 sm:p-3 overflow-x-auto select-none">
        <div className="flex items-center min-w-max gap-1 sm:gap-2">
          {timeline.map((stage, idx) => {
            const isCompleted = idx < activeIdx;
            const isActive = idx === activeIdx;
            const isPending = idx > activeIdx;

            return (
              <button
                key={stage.step || idx}
                onClick={() => scrollToStage(idx)}
                className={`group flex items-center gap-2 sm:gap-3 px-3 py-2 text-left border transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#18181A] border-[#FF1E27] text-white shadow-[0_0_15px_rgba(255,30,39,0.15)]'
                    : isCompleted
                    ? 'bg-white/[0.02] border-white/15 text-slate-300 hover:border-white/30 hover:bg-white/[0.04]'
                    : 'bg-transparent border-dashed border-white/10 text-slate-400 hover:text-slate-300'
                }`}
                title={`Jump to stage ${stage.step} — ${stage.phase || stage.title}`}
              >
                {/* Stage Indicator Beacon */}
                <div className="flex items-center justify-center shrink-0">
                  {isActive ? (
                    <span className="relative flex h-2.5 w-2.5 items-center justify-center">
                      <span
                        className="absolute inline-flex h-3.5 w-3.5 rounded-full bg-[#FF1E27]/30 animate-pulse motion-reduce:hidden"
                        style={{ animationDuration: '2.5s' }}
                      />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#FF1E27]" />
                    </span>
                  ) : isCompleted ? (
                    <span className="flex items-center justify-center w-3 h-3 rounded-full bg-emerald-500/20 text-emerald-400">
                      <Check size={9} strokeWidth={3} />
                    </span>
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                  )}
                </div>

                {/* Stage Number & Phase Name */}
                <div className="flex items-baseline gap-1.5">
                  <span
                    className={`font-mono text-xs font-bold ${
                      isActive ? 'text-[#FF1E27]' : isCompleted ? 'text-white' : 'text-slate-400'
                    }`}
                  >
                    {stage.step || `0${idx + 1}`}
                  </span>
                  <span
                    className={`font-mono text-[10px] tracking-wider uppercase font-semibold truncate ${
                      isActive ? 'text-white' : isCompleted ? 'text-slate-300' : 'text-slate-400'
                    }`}
                  >
                    {stage.phase || stage.title}
                  </span>
                </div>

                {idx < timeline.length - 1 && (
                  <span className="text-white/20 text-xs pl-1">→</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          RESPONSIVE TIMELINE LAYOUT:
          - Desktop (lg): Split layout with sticky visual/spec monitor on right
          - Mobile / Tablet: Vertical editorial timeline
      ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Vertical Timeline Track (7 cols on desktop) */}
        <div className="lg:col-span-7 relative">
          {/* Continuous Editorial Track Line */}
          <div className="absolute left-[19px] sm:left-[23px] top-6 bottom-12 w-px bg-gradient-to-b from-white/20 via-white/10 to-transparent" />

          <div className="space-y-10 sm:space-y-12">
            {timeline.map((stage, idx) => {
              const isCompleted = idx < activeIdx;
              const isActive = idx === activeIdx;
              const isPending = idx > activeIdx;

              return (
                <div
                  key={stage.step || idx}
                  ref={stageRefs.current[idx]}
                  data-stage-idx={idx}
                  className={`relative pl-12 sm:pl-16 transition-all duration-300 ${
                    isActive ? 'opacity-100' : isCompleted ? 'opacity-90' : 'opacity-55 hover:opacity-85'
                  }`}
                >
                  {/* Step Anchor Node Marker on the Line */}
                  <div
                    onClick={() => scrollToStage(idx)}
                    className={`absolute left-0 top-1 w-10 sm:w-12 h-10 sm:h-12 flex items-center justify-center border transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'bg-[#18181A] border-[#FF1E27] shadow-[0_0_20px_rgba(255,30,39,0.3)] z-10'
                        : isCompleted
                        ? 'bg-[#0E0E10] border-white/25 text-emerald-400 hover:border-white/40'
                        : 'bg-[#0A0A0A] border-dashed border-white/15 text-slate-400'
                    }`}
                  >
                    {isCompleted ? (
                      <Check size={16} className="text-emerald-400" strokeWidth={2.5} />
                    ) : (
                      <span
                        className={`font-syne font-extrabold text-sm sm:text-base ${
                          isActive ? 'text-[#FF1E27]' : 'text-slate-400'
                        }`}
                      >
                        {stage.step || `0${idx + 1}`}
                      </span>
                    )}

                    {/* Subtle Red Active Beacon on the active stage */}
                    {isActive && (
                      <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                        <span
                          className="absolute inline-flex h-full w-full rounded-full bg-[#FF1E27] opacity-75 animate-ping motion-reduce:hidden duration-1000"
                        />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FF1E27]" />
                      </span>
                    )}
                  </div>

                  {/* Stage Card Body */}
                  <div
                    className={`border transition-all duration-300 p-5 sm:p-7 space-y-4 ${
                      isActive
                        ? 'bg-[#131316] border-[#FF1E27]/70 shadow-lg shadow-black/40'
                        : isCompleted
                        ? 'bg-white/[0.02] border-white/15 hover:border-white/30'
                        : 'bg-black/30 border-dashed border-white/10'
                    }`}
                  >
                    {/* Phase Tag & Status Label */}
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs font-mono font-bold tracking-widest uppercase ${
                            isActive
                              ? 'text-[#FF1E27]'
                              : isCompleted
                              ? 'text-emerald-400'
                              : 'text-slate-400'
                          }`}
                        >
                          PHASE // {stage.phase || `STAGE ${stage.step}`}
                        </span>
                        {stage.duration && (
                          <>
                            <span className="text-white/20">•</span>
                            <span className="text-[10px] font-mono text-slate-400 uppercase">
                              {stage.duration}
                            </span>
                          </>
                        )}
                      </div>

                      <div className="text-[10px] font-mono tracking-wider uppercase font-bold">
                        {isActive ? (
                          <span className="inline-flex items-center gap-1.5 text-[#FF1E27] bg-[#FF1E27]/10 px-2 py-0.5 border border-[#FF1E27]/30">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#FF1E27] animate-pulse" />
                            ACTIVE STAGE
                          </span>
                        ) : isCompleted ? (
                          <span className="inline-flex items-center gap-1 text-emerald-400 bg-emerald-500/10 px-2 py-0.5 border border-emerald-500/20">
                            <Check size={10} strokeWidth={3} />
                            COMPLETED
                          </span>
                        ) : (
                          <span className="text-slate-400">QUEUED</span>
                        )}
                      </div>
                    </div>

                    {/* Stage Title */}
                    <div className="space-y-1">
                      <h3 className="font-syne text-lg sm:text-xl md:text-2xl font-bold text-white uppercase tracking-tight">
                        {stage.title}
                      </h3>
                      {stage.tech && (
                        <div className="text-xs font-mono text-[#FF1E27] font-semibold">
                          FOCUS // {stage.tech}
                        </div>
                      )}
                    </div>

                    {/* Summary Description */}
                    <p className="font-sans text-slate-200 text-xs sm:text-sm md:text-base leading-relaxed">
                      {stage.summary}
                    </p>

                    {/* In-depth details if present */}
                    {stage.details && (
                      <div className="bg-black/40 border-l-2 border-white/20 p-3.5 text-xs font-sans text-slate-300 leading-relaxed">
                        {stage.details}
                      </div>
                    )}

                    {/* Deliverables / Artifacts Checklist */}
                    {stage.deliverables && stage.deliverables.length > 0 && (
                      <div className="space-y-2 pt-2">
                        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold block">
                          VERIFIED DELIVERABLES //
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {stage.deliverables.map((item, dIdx) => (
                            <div
                              key={dIdx}
                              className="flex items-center gap-2 bg-white/[0.03] border border-white/10 px-3 py-1.5 text-xs font-mono text-slate-200"
                            >
                              <span
                                className={`w-1.5 h-1.5 shrink-0 ${
                                  isActive
                                    ? 'bg-[#FF1E27]'
                                    : isCompleted
                                    ? 'bg-emerald-400'
                                    : 'bg-white/30'
                                }`}
                              />
                              <span className="truncate">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Mobile Imagery Preview (shown inline on small screens) */}
                    {stage.image && (
                      <div className="lg:hidden mt-3 border border-white/10 overflow-hidden relative group">
                        <img
                          src={stage.image}
                          alt={`${stage.phase || 'Stage'} — ${stage.title}`}
                          className="w-full h-44 object-cover filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500"
                        />
                        <div className="absolute bottom-2 left-2 bg-[#0C0C0D]/90 border border-white/20 px-2 py-0.5 text-[9px] font-mono text-white">
                          PHASE {stage.step} ASSET
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Sticky Active Stage Visualizer Monitor (Desktop 5 cols) */}
        <div className="hidden lg:block lg:col-span-5 sticky top-20 space-y-4">
          <div className="bg-[#101012] border border-white/20 overflow-hidden shadow-2xl">
            {/* Monitor Header */}
            <div className="bg-white/5 border-b border-white/10 px-4 py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-white uppercase tracking-wider">
                <Compass size={13} className="text-[#FF1E27]" />
                <span>PHASE TELEMETRY MONITOR</span>
              </div>
              <span className="text-[10px] font-mono text-[#FF1E27] font-bold">
                STAGE {currentStage.step || `0${activeIdx + 1}`} OF 0{timeline.length}
              </span>
            </div>

            {/* Dynamic Stage Imagery with Crossfade */}
            <div className="relative h-64 bg-black overflow-hidden border-b border-white/10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStage.image || activeIdx}
                  initial={prefersReduced ? { opacity: 1 } : { opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={prefersReduced ? { opacity: 1 } : { opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="w-full h-full"
                >
                  <img
                    src={currentStage.image || '/images/nexora-cover-v2.jpg'}
                    alt={currentStage.title}
                    className="w-full h-full object-cover filter contrast-125 select-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                </motion.div>
              </AnimatePresence>

              {/* Watermark overlay on the image */}
              <div className="absolute top-3 left-3 bg-[#0A0A0A]/90 backdrop-blur-md border border-white/20 px-2.5 py-1 text-[10px] font-mono font-bold text-white uppercase flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF1E27] animate-pulse" />
                <span>{currentStage.phase || 'STAGE'} // {currentStage.step}</span>
              </div>

              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-[9px] font-mono text-[#FF1E27] uppercase tracking-widest font-bold block">
                  ACTIVE FOCUS
                </span>
                <span className="font-syne text-sm font-bold uppercase truncate block text-slate-100">
                  {currentStage.title}
                </span>
              </div>
            </div>

            {/* Monitor Stage Details & Deliverables */}
            <div className="p-5 space-y-4 text-xs font-mono">
              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-bold">
                  STAGE SPECIFICATION
                </span>
                <p className="font-sans text-xs text-slate-300 leading-relaxed">
                  {currentStage.summary}
                </p>
              </div>

              {currentStage.tech && (
                <div className="bg-white/[0.02] border border-white/10 p-3 space-y-1">
                  <span className="text-[10px] text-[#FF1E27] font-bold uppercase tracking-wider block">
                    ENGINEERING DOMAIN
                  </span>
                  <div className="text-white text-xs font-bold font-mono">{currentStage.tech}</div>
                </div>
              )}

              {currentStage.deliverables && currentStage.deliverables.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-bold">
                    MILESTONES COMPLETED ({currentStage.deliverables.length})
                  </span>
                  <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                    {currentStage.deliverables.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 bg-black/50 border border-white/10 px-2.5 py-1.5 text-[11px] text-slate-200"
                      >
                        <CheckCircle2 size={12} className="text-emerald-400 shrink-0" />
                        <span className="truncate">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Sequential Next / Previous Controls */}
              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                <button
                  disabled={activeIdx === 0}
                  onClick={() => scrollToStage(Math.max(0, activeIdx - 1))}
                  className="px-3 py-1.5 text-[10px] font-mono font-bold uppercase border border-white/15 text-slate-300 hover:text-white hover:border-white/30 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
                >
                  ← PREV STAGE
                </button>

                <span className="text-[10px] text-slate-500 font-mono">
                  {activeIdx + 1} / {timeline.length}
                </span>

                <button
                  disabled={activeIdx === timeline.length - 1}
                  onClick={() => scrollToStage(Math.min(timeline.length - 1, activeIdx + 1))}
                  className="px-3 py-1.5 text-[10px] font-mono font-bold uppercase bg-[#FF1E27] hover:bg-[#E00208] text-white disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
                >
                  NEXT STAGE →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
