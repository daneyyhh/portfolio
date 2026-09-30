import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  Gauge,
  ShieldCheck,
  Award,
  Search,
  Timer,
  Activity,
  ArrowRight,
  ExternalLink,
  Info,
  CheckCircle,
  HelpCircle,
  AlertCircle
} from 'lucide-react';
import { projectPerformanceData, metricDefinitions } from '../../data/performanceData';
import { projectsData } from '../../data/portfolioData';
import { MaskHeading, FadeInUp } from '../UI/TextReveal';

const EASE = [0.16, 1, 0.3, 1];

export default function Performance({ onSelectProject }) {
  const [selectedProjectId, setSelectedProjectId] = useState(projectPerformanceData[0].id);
  const [activeTooltip, setActiveTooltip] = useState(null);
  const prefersReduced = useReducedMotion();

  const currentData = projectPerformanceData.find((p) => p.id === selectedProjectId) || projectPerformanceData[0];
  const matchingCaseStudy = currentData.caseStudyId
    ? projectsData.find((p) => p.id === currentData.caseStudyId)
    : null;

  // Status badge renderer (never relies solely on color)
  const renderStatusBadge = (status) => {
    switch (status) {
      case 'MEASURED':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 font-mono text-[10px] font-bold tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse motion-reduce:hidden" />
            <span>MEASURED</span>
          </span>
        );
      case 'OUTDATED':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-amber-500/40 bg-amber-500/10 text-amber-400 font-mono text-[10px] font-bold tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span>OUTDATED</span>
          </span>
        );
      case 'NOT MEASURED':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-white/20 bg-white/5 text-stone-300 font-mono text-[10px] font-bold tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-stone-400" />
            <span>NOT MEASURED</span>
          </span>
        );
    }
  };

  // Metric quality indicator (text label + subtle indicator, never color alone)
  const getScoreQuality = (val) => {
    if (val === null || val === undefined) {
      return { label: "NOT MEASURED", color: "text-stone-400", border: "border-white/10" };
    }
    if (typeof val === 'number') {
      if (val >= 90) return { label: "GOOD", color: "text-emerald-400", border: "border-emerald-500/30" };
      if (val >= 50) return { label: "NEEDS IMPROVEMENT", color: "text-amber-400", border: "border-amber-500/30" };
      return { label: "POOR", color: "text-[#FF1E27]", border: "border-[#FF1E27]/30" };
    }
    return { label: "RECORDED", color: "text-stone-300", border: "border-white/10" };
  };

  // Lighthouse score card items
  const lighthouseCards = [
    {
      key: 'performance',
      label: 'PERFORMANCE',
      abbrev: 'PERF',
      val: currentData.performance,
      icon: Gauge,
      definition: metricDefinitions.performance.description
    },
    {
      key: 'accessibility',
      label: 'ACCESSIBILITY',
      abbrev: 'A11Y',
      val: currentData.accessibility,
      icon: ShieldCheck,
      definition: metricDefinitions.accessibility.description
    },
    {
      key: 'bestPractices',
      label: 'BEST PRACTICES',
      abbrev: 'BP',
      val: currentData.bestPractices,
      icon: Award,
      definition: metricDefinitions.bestPractices.description
    },
    {
      key: 'seo',
      label: 'SEO',
      abbrev: 'SEO',
      val: currentData.seo,
      icon: Search,
      definition: metricDefinitions.seo.description
    }
  ];

  // Core Web Vitals items
  const vitalsCards = [
    { key: 'lcp', label: 'LCP', name: 'Largest Contentful Paint', val: currentData.lcp, def: metricDefinitions.lcp },
    { key: 'inp', label: 'INP', name: 'Interaction to Next Paint', val: currentData.inp, def: metricDefinitions.inp },
    { key: 'cls', label: 'CLS', name: 'Cumulative Layout Shift', val: currentData.cls, def: metricDefinitions.cls },
    { key: 'fcp', label: 'FCP', name: 'First Contentful Paint', val: currentData.fcp, def: metricDefinitions.fcp },
    { key: 'ttfb', label: 'TTFB', name: 'Time to First Byte', val: currentData.ttfb, def: metricDefinitions.ttfb },
    { key: 'loadTime', label: 'LOAD TIME', name: 'Total Window Load', val: currentData.loadTime, def: metricDefinitions.loadTime }
  ];

  return (
    <section
      id="performance"
      className="py-24 sm:py-32 px-4 sm:px-6 md:px-12 bg-[#0A0A0A] text-[#F1F0EB] relative border-t border-white/10 font-mono w-full overflow-x-clip"
      aria-label="Performance and Measurable Technical Quality Dashboard"
    >
      {/* Background Matrix Coordinates */}
      <div className="absolute top-10 right-8 text-[10px] text-white/5 uppercase select-none pointer-events-none hidden xl:block leading-relaxed tracking-widest text-right">
        [METRICS // CORE WEB VITALS]<br />
        MEASURABLE TECHNICAL QUALITY<br />
        AUDIT · AUDITED PERFORMANCE · REUBG.IN
      </div>

      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16 relative z-10 w-full">
        
        {/* Section Header: Left Index + Masked Title + Supporting Text */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-end border-b border-white/10 pb-8 sm:pb-10 w-full">
          
          {/* Left Vertical Tag / Section Index */}
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
              className="vertical-tag font-mono text-xs text-stone-400 uppercase tracking-[0.3em] font-bold mt-6"
            >
              METRICS
            </motion.div>
          </div>

          {/* Center Title and Mission Statement */}
          <div className="lg:col-span-7 space-y-4 w-full max-w-full">
            <motion.div
              initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 0.6, ease: EASE }}
              className="text-xs text-[#FF1E27] font-bold uppercase tracking-widest flex items-center gap-2"
            >
              <Activity size={16} />
              <span>MEASURABLE TECHNICAL QUALITY</span>
            </motion.div>

            <MaskHeading
              lines={["PERFORMANCE"]}
              className="font-syne font-extrabold text-white uppercase tracking-tight w-full max-w-full"
              style={{
                fontSize: 'clamp(2.2rem, 7vw, 4.25rem)',
                letterSpacing: 'clamp(-0.03em, -0.2vw, -0.01em)',
              }}
              delay={0.15}
            />

            <motion.p
              initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 0.6, delay: 0.25, ease: EASE }}
              className="font-syne text-lg sm:text-xl text-white font-bold tracking-tight"
            >
              “Built to look good. Built to perform.”
            </motion.p>

            <motion.p
              initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 0.6, delay: 0.35, ease: EASE }}
              className="font-sans text-stone-300 text-xs sm:text-sm leading-relaxed max-w-2xl"
            >
              Performance, accessibility compliance, search discoverability, and Core Web Vitals are not afterthoughts. Every metric below is bound strictly to real-world measurements. Unmeasured environments are transparently displayed with <code className="text-[#FF1E27] bg-white/5 px-1.5 py-0.5 border border-white/10 font-bold">—</code> without fabricated scores.
            </motion.p>
          </div>

          {/* Right Column: Measurement Integrity Policy Box */}
          <div className="lg:col-span-4 w-full">
            <motion.div
              initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
              className="border border-white/10 bg-[#0E0E12] p-4 space-y-3"
            >
              <div className="flex items-center justify-between text-[11px] border-b border-white/10 pb-2 text-stone-300">
                <span className="text-[#FF1E27] font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck size={14} />
                  <span>AUDIT POLICY</span>
                </span>
                <span className="text-[10px] text-stone-400 uppercase">ZERO-FABRICATION</span>
              </div>

              <p className="font-sans text-[11px] text-stone-400 leading-relaxed">
                Scores and timings reflect verified audit logs from Lighthouse, PageSpeed Insights, or manual instrumentation. No placeholder scores (85/90/95) are ever generated.
              </p>

              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-stone-400">
                <span>SUPPORTED STATUSES:</span>
                <span className="text-stone-300 font-bold">MEASURED · NOT MEASURED · OUTDATED</span>
              </div>
            </motion.div>
          </div>

        </div>

        {/* Project Selector Bar */}
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-2 text-xs text-stone-400 uppercase tracking-wider">
              <span className="w-1.5 h-1.5 bg-[#FF1E27] rounded-full" />
              <span>SELECT AUDITED PROJECT:</span>
            </div>
            <span className="text-[10px] text-stone-500 uppercase tracking-widest hidden sm:inline">
              PROJECT PERFORMANCE PANELS // {projectPerformanceData.length} SYSTEMS
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {projectPerformanceData.map((proj) => {
              const isSelected = proj.id === selectedProjectId;
              return (
                <button
                  key={proj.id}
                  onClick={() => setSelectedProjectId(proj.id)}
                  className={`px-3.5 py-2 text-xs font-mono font-bold tracking-wider uppercase border transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                    isSelected
                      ? 'bg-[#FF1E27] text-white border-[#FF1E27] shadow-md'
                      : 'bg-white/5 text-stone-300 border-white/10 hover:border-white/30 hover:text-white'
                  }`}
                  aria-pressed={isSelected}
                >
                  <span>{proj.project}</span>
                  <span
                    className={`text-[9px] px-1 py-0.2 rounded-sm ${
                      isSelected ? 'bg-black/30 text-white' : 'text-stone-400'
                    }`}
                  >
                    {proj.status === 'MEASURED' ? 'AUDITED' : 'PENDING'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Performance Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentData.id}
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="space-y-8 bg-[#0D0D10] border border-white/10 p-5 sm:p-8 relative"
          >
            {/* Corner Technical Lab Crosshairs */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#FF1E27] pointer-events-none" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-white/20 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-white/20 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#FF1E27] pointer-events-none" />

            {/* Panel Top Meta Bar */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-syne text-xl sm:text-2xl font-extrabold text-white uppercase tracking-tight">
                    {currentData.project}
                  </h3>
                  {renderStatusBadge(currentData.status)}
                </div>
                <p className="font-sans text-xs text-stone-400">
                  {currentData.tagline}
                </p>
              </div>

              {/* Metadata Readout & Case Study Action */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-stone-400 font-mono">
                <div>
                  <span className="text-stone-500 block uppercase text-[10px]">MEASURED:</span>
                  <span className="text-stone-200 font-bold">{currentData.measuredAt || "—"}</span>
                </div>

                <div>
                  <span className="text-stone-500 block uppercase text-[10px]">SOURCE:</span>
                  <span className="text-stone-200 font-bold">{currentData.source || "—"}</span>
                </div>

                {matchingCaseStudy && onSelectProject && (
                  <button
                    onClick={() => onSelectProject(matchingCaseStudy)}
                    className="inline-flex items-center gap-1.5 py-1.5 px-3 bg-white/10 hover:bg-[#FF1E27] text-white border border-white/20 hover:border-[#FF1E27] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    <span>VIEW CASE STUDY</span>
                    <ArrowRight size={13} />
                  </button>
                )}

                {currentData.reportUrl && (
                  <a
                    href={currentData.reportUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-[#FF1E27] hover:underline font-bold uppercase"
                  >
                    <span>VIEW REPORT</span>
                    <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </div>

            {/* 1. Lighthouse 4-Core Categories Grid */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-stone-400 uppercase tracking-wider">
                <span className="flex items-center gap-1.5 text-[#FF1E27] font-bold">
                  <Award size={14} />
                  <span>LIGHTHOUSE CATEGORY SCORES</span>
                </span>
                <span className="text-[10px] text-stone-500">SCALE: 0 — 100 // BASELINE: 90+</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {lighthouseCards.map((card) => {
                  const Icon = card.icon;
                  const quality = getScoreQuality(card.val);

                  return (
                    <div
                      key={card.key}
                      onMouseEnter={() => setActiveTooltip(card.key)}
                      onMouseLeave={() => setActiveTooltip(null)}
                      className={`relative bg-[#09090C] border p-5 flex flex-col justify-between space-y-4 transition-all duration-200 ${
                        activeTooltip === card.key ? 'border-[#FF1E27]/50' : 'border-white/10'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-stone-300 font-bold uppercase tracking-wider">
                          {card.label}
                        </span>
                        <Icon size={18} className="text-stone-400" />
                      </div>

                      {/* Large Value Display */}
                      <div className="py-1">
                        <div
                          className={`font-syne text-4xl sm:text-5xl font-black tracking-tight ${
                            card.val === null ? 'text-stone-500' : quality.color
                          }`}
                        >
                          {card.val !== null ? card.val : "—"}
                        </div>
                      </div>

                      {/* Status Text & Tooltip Info */}
                      <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px]">
                        <span className={`font-bold tracking-wider ${quality.color}`}>
                          {quality.label}
                        </span>
                        <span className="text-stone-500 font-mono">
                          {card.val !== null ? "/ 100" : "UNMEASURED"}
                        </span>
                      </div>

                      {/* Interactive Hover Tooltip Context */}
                      {activeTooltip === card.key && (
                        <div className="absolute inset-x-2 bottom-full mb-2 p-2.5 bg-black/95 border border-[#FF1E27]/40 text-stone-300 text-[10px] leading-relaxed shadow-xl z-20 pointer-events-none">
                          <span className="text-[#FF1E27] font-bold block mb-1 uppercase">
                            {card.label} METRIC
                          </span>
                          {card.definition}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 2. Core Web Vitals & Real-World Timings Grid */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between text-xs text-stone-400 uppercase tracking-wider">
                <span className="flex items-center gap-1.5 text-stone-300 font-bold">
                  <Timer size={14} className="text-[#FF1E27]" />
                  <span>CORE WEB VITALS & RUNTIME TIMINGS</span>
                </span>
                <span className="text-[10px] text-stone-500">CHROME USER EXPERIENCE CRITERIA</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {vitalsCards.map((vital) => (
                  <div
                    key={vital.key}
                    onMouseEnter={() => setActiveTooltip(vital.key)}
                    onMouseLeave={() => setActiveTooltip(null)}
                    className="relative bg-[#09090C] border border-white/10 p-3.5 flex flex-col justify-between space-y-2 hover:border-white/30 transition-colors"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#FF1E27] tracking-wider">
                          {vital.label}
                        </span>
                        <span className="text-[9px] text-stone-500 font-mono">
                          {vital.def.target}
                        </span>
                      </div>
                      <span className="text-[9px] text-stone-400 truncate block mt-0.5">
                        {vital.name}
                      </span>
                    </div>

                    <div className="font-syne text-2xl font-black text-stone-200">
                      {vital.val !== null ? vital.val : "—"}
                    </div>

                    <div className="pt-1.5 border-t border-white/5 text-[9px] text-stone-500 uppercase tracking-wider">
                      {vital.val !== null ? "RECORDED" : "—"}
                    </div>

                    {/* Interactive Context Tooltip */}
                    {activeTooltip === vital.key && (
                      <div className="absolute inset-x-0 bottom-full mb-2 p-2 bg-black/95 border border-white/20 text-stone-300 text-[10px] leading-relaxed shadow-xl z-20 pointer-events-none min-w-[160px]">
                        <span className="text-[#FF1E27] font-bold block uppercase">{vital.label}: {vital.name}</span>
                        <span>{vital.def.description}</span>
                        <span className="block text-stone-400 mt-1 font-mono text-[9px]">Target: {vital.def.target}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Before / After Optimization Comparison (Only when real values exist) */}
            {currentData.beforeAfter && currentData.beforeAfter.before && currentData.beforeAfter.after ? (
              <div className="border border-white/10 bg-black/40 p-5 space-y-3">
                <span className="text-xs text-[#FF1E27] font-bold uppercase tracking-wider block">
                  OPTIMIZATION DELTA COMPARISON
                </span>
                <div className="flex items-center gap-4 text-sm font-mono flex-wrap">
                  <span className="text-stone-400">BEFORE: <strong className="text-stone-200">{currentData.beforeAfter.before}</strong></span>
                  <span className="text-[#FF1E27]">────────────────→</span>
                  <span className="text-emerald-400">AFTER: <strong className="text-white">{currentData.beforeAfter.after}</strong></span>
                </div>
              </div>
            ) : (
              <div className="border border-white/10 bg-black/30 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-stone-400">
                <div className="flex items-center gap-2">
                  <Info size={15} className="text-[#FF1E27] shrink-0" />
                  <span>
                    <strong>AUDIT STATUS:</strong> {currentData.notes}
                  </span>
                </div>
                <span className="text-[10px] text-stone-500 uppercase tracking-widest shrink-0">
                  FACTUAL INTEGRITY VERIFIED
                </span>
              </div>
            )}

          </motion.div>
        </AnimatePresence>

        {/* Bottom Technical Methodology Notes */}
        <div className="pt-6 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-stone-400">
          <div className="space-y-1">
            <span className="text-stone-200 font-bold block uppercase text-[11px]">
              01 // CORE WEB VITALS FOCUS
            </span>
            <p className="font-sans text-stone-400 text-xs leading-relaxed">
              Targeting LCP &lt; 2.5s, CLS &lt; 0.1, and INP &lt; 200ms using Vite code-splitting, tree-shaking, responsive image compression, and efficient GPU compositing.
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-stone-200 font-bold block uppercase text-[11px]">
              02 // ACCESSIBILITY COMPLIANCE
            </span>
            <p className="font-sans text-stone-400 text-xs leading-relaxed">
              Architecting with semantic HTML5 elements, full keyboard tab order, ARIA dialog roles, explicit contrast ratios, and native <code className="text-[#FF1E27]">prefers-reduced-motion</code> compliance.
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-stone-200 font-bold block uppercase text-[11px]">
              03 // REAL MEASUREMENT COMMITMENT
            </span>
            <p className="font-sans text-stone-400 text-xs leading-relaxed">
              No fictitious 100/100 scores. Unverified environments are left unrated with a clear status indicator until formal audits are conducted.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
