import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Terminal, Layers } from 'lucide-react';
import ExperimentPreview from './ExperimentPreview';

const EASE = [0.16, 1, 0.3, 1];

export default function ExperimentCard({
  experiment,
  index,
  onOpen
}) {
  const prefersReduced = useReducedMotion();

  // Status badge styling helper
  const renderStatusBadge = (status) => {
    switch (status) {
      case 'EXPERIMENT':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 border border-[#FF1E27]/40 bg-[#FF1E27]/10 text-[#FF1E27] font-mono text-[10px] font-bold tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF1E27] animate-pulse motion-reduce:hidden" />
            <span>EXPERIMENT</span>
          </span>
        );
      case 'IN DEVELOPMENT':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 border border-amber-500/40 bg-amber-500/10 text-amber-400 font-mono text-[10px] font-bold tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span>IN DEVELOPMENT</span>
          </span>
        );
      case 'ARCHIVED':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 border border-stone-600 bg-stone-800 text-stone-400 font-mono text-[10px] font-bold tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-stone-500" />
            <span>ARCHIVED</span>
          </span>
        );
    }
  };

  return (
    <motion.article
      initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-6% 0px" }}
      transition={{ duration: 0.6, delay: Math.min(index * 0.08, 0.3), ease: EASE }}
      className="group relative bg-[#0D0D10] border border-white/10 hover:border-[#FF1E27]/60 transition-colors duration-300 flex flex-col justify-between overflow-hidden shadow-2xl focus-within:ring-2 focus-within:ring-[#FF1E27]"
    >
      {/* Corner Technical Lab Crosshairs */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#FF1E27] pointer-events-none z-20" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-white/20 pointer-events-none z-20" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-white/20 pointer-events-none z-20" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#FF1E27] pointer-events-none z-20" />

      {/* Top Metadata Header */}
      <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between gap-4 font-mono z-10 bg-[#0E0E12]">
        <div className="flex items-center gap-3">
          <span className="text-2xl sm:text-3xl font-black text-[#FF1E27] tracking-tighter">
            {experiment.number}
          </span>
          <div className="flex flex-col">
            <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">
              {experiment.category}
            </span>
            <span className="text-[9px] text-stone-500">
              ID: {experiment.id}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {renderStatusBadge(experiment.status)}
        </div>
      </div>

      {/* Large Interactive Experimental Preview Stage */}
      <div className="relative w-full h-[250px] sm:h-[290px] bg-black/60 overflow-hidden border-b border-white/10">
        <ExperimentPreview
          experiment={experiment}
          interactive={true}
          isDetail={false}
          className="w-full h-full"
        />

        {/* Subtle Hover Overlay Hint */}
        <div className="absolute inset-0 bg-[#FF1E27]/0 group-hover:bg-[#FF1E27]/5 transition-colors duration-300 pointer-events-none" />
      </div>

      {/* Experiment Specification Body */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4 font-mono">
        <div className="space-y-2">
          {/* Technology Label */}
          <div className="flex items-center gap-2 text-[10px] text-[#FF1E27] font-bold tracking-widest uppercase">
            <Terminal size={12} className="shrink-0" />
            <span className="truncate">{experiment.technology}</span>
          </div>

          {/* Experiment Title */}
          <h3 className="font-syne text-xl sm:text-2xl font-extrabold text-[#F1F0EB] uppercase tracking-tight group-hover:text-white transition-colors">
            {experiment.title}
          </h3>

          {/* Short Description */}
          <p className="font-sans text-xs sm:text-sm text-stone-300 leading-relaxed line-clamp-3">
            {experiment.shortDescription}
          </p>
        </div>

        {/* Card Footer: Metadata Tag + Semantic Open Button */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 text-[10px] text-stone-400 uppercase tracking-wider">
            <Layers size={12} className="text-[#FF1E27]" />
            <span className="hidden sm:inline">PURPOSE:</span>
            <span className="truncate max-w-[120px] sm:max-w-[180px] text-stone-300">
              PROTOTYPE
            </span>
          </div>

          <button
            onClick={() => onOpen(experiment)}
            className="inline-flex items-center gap-2 py-2 px-3.5 bg-[#FF1E27] hover:bg-[#E00208] text-white font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 active:scale-95 cursor-pointer shadow-sm focus:outline-none focus:ring-2 focus:ring-white"
            aria-label={`Open experiment ${experiment.number}: ${experiment.title}`}
          >
            <span>OPEN</span>
            <ArrowUpRight size={15} />
          </button>
        </div>
      </div>
    </motion.article>
  );
}
