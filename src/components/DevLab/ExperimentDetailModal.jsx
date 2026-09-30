import React, { useEffect, useState, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, ExternalLink, Terminal, Cpu, Info, Code2 } from 'lucide-react';
import ExperimentPreview from './ExperimentPreview';

export default function ExperimentDetailModal({
  experiment,
  onClose
}) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('SPEC'); // 'SPEC' | 'SOURCE'
  const modalRef = useRef(null);

  // Lock body scroll and pause Lenis smooth scroll while detail modal is open
  useEffect(() => {
    if (!experiment) return;

    document.body.style.overflow = 'hidden';
    if (window.__lenis) window.__lenis.stop();

    return () => {
      document.body.style.overflow = '';
      if (window.__lenis) window.__lenis.start();
    };
  }, [experiment]);

  // Keyboard navigation: Close on Escape key
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!experiment) return null;

  const copyCode = async () => {
    if (!experiment.codeSnippet) return;
    try {
      await navigator.clipboard.writeText(experiment.codeSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Clipboard copy failed:", err);
    }
  };

  return createPortal(
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center p-0 sm:p-4 md:p-6 bg-black/90 backdrop-blur-xl overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="devlab-modal-title"
        onClick={(e) => {
          // Close when clicking directly on backdrop
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <motion.div
          ref={modalRef}
          initial={{ opacity: 0, scale: 0.98, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 15 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-6xl bg-[#0B0B0E] border border-white/15 text-[#F1F0EB] font-mono shadow-2xl flex flex-col my-auto max-h-[100svh] sm:max-h-[92vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Laboratory Title Bar */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-white/10 bg-[#0E0E12] select-none shrink-0">
            <div className="flex items-center gap-3">
              <span className="text-xl sm:text-2xl font-black text-[#FF1E27] tracking-tight">
                [{experiment.number}]
              </span>
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                <h2
                  id="devlab-modal-title"
                  className="font-syne text-sm sm:text-base font-extrabold text-white uppercase tracking-tight"
                >
                  {experiment.title}
                </h2>
                <span className="hidden sm:inline text-stone-500">//</span>
                <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">
                  {experiment.category}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="hidden md:inline-flex items-center gap-1.5 px-2 py-0.5 border border-white/10 bg-white/5 text-[10px] text-stone-400 uppercase tracking-widest">
                <span>ESC</span>
              </span>

              <button
                onClick={onClose}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FF1E27] hover:bg-[#E00208] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer active:scale-95 focus:outline-none focus:ring-2 focus:ring-white"
                aria-label="Close experiment detail view"
              >
                <span>CLOSE</span>
                <X size={15} />
              </button>
            </div>
          </div>

          {/* Modal Content Split: Live Playable Canvas + Technical Inspector */}
          <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-y-auto">
            
            {/* Left Column: Live Interactive Demo Area */}
            <div className="lg:col-span-7 bg-[#050507] border-b lg:border-b-0 lg:border-r border-white/10 relative min-h-[320px] sm:min-h-[420px] lg:min-h-[560px] flex flex-col">
              <div className="relative flex-1 w-full h-full">
                <ExperimentPreview
                  experiment={experiment}
                  interactive={true}
                  isDetail={true}
                  className="w-full h-full"
                />
              </div>
            </div>

            {/* Right Column: Specification & Source Code Tabs */}
            <div className="lg:col-span-5 bg-[#0D0D10] flex flex-col justify-between overflow-y-auto p-4 sm:p-6 space-y-6">
              
              {/* Tab Selector */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveTab('SPEC')}
                    className={`flex items-center gap-1.5 px-3 py-1 text-xs font-bold uppercase tracking-wider transition-colors ${
                      activeTab === 'SPEC'
                        ? 'bg-[#FF1E27] text-white border border-[#FF1E27]'
                        : 'bg-white/5 text-stone-300 border border-white/10 hover:border-white/20'
                    }`}
                  >
                    <Info size={13} />
                    <span>SPECIFICATION</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('SOURCE')}
                    className={`flex items-center gap-1.5 px-3 py-1 text-xs font-bold uppercase tracking-wider transition-colors ${
                      activeTab === 'SOURCE'
                        ? 'bg-[#FF1E27] text-white border border-[#FF1E27]'
                        : 'bg-white/5 text-stone-300 border border-white/10 hover:border-white/20'
                    }`}
                  >
                    <Code2 size={13} />
                    <span>SOURCE / CODE</span>
                  </button>
                </div>

                <span className="text-[10px] text-stone-500 uppercase tracking-widest hidden sm:inline">
                  METRICS // READY
                </span>
              </div>

              {/* Tab 1: Technical Specification & Purpose */}
              {activeTab === 'SPEC' && (
                <div className="space-y-5 text-xs">
                  {/* Purpose Callout */}
                  <div className="p-3.5 bg-[#FF1E27]/10 border-l-2 border-[#FF1E27] space-y-1">
                    <span className="text-[10px] font-bold text-[#FF1E27] uppercase tracking-wider block">
                      EXPERIMENT PURPOSE
                    </span>
                    <p className="font-sans text-xs text-stone-200 leading-relaxed">
                      {experiment.purpose}
                    </p>
                  </div>

                  {/* Detailed Description */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                      ARCHITECTURAL OVERVIEW
                    </span>
                    <p className="font-sans text-stone-300 leading-relaxed">
                      {experiment.description}
                    </p>
                  </div>

                  {/* Technology Breakdown */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                      ENGINEERING STACK
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {experiment.tags ? (
                        experiment.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 bg-white/5 border border-white/10 text-stone-300 text-[10px] uppercase font-mono"
                          >
                            {tag}
                          </span>
                        ))
                      ) : (
                        <span className="text-stone-400 font-mono text-xs">{experiment.technology}</span>
                      )}
                    </div>
                  </div>

                  {/* Technical Performance Telemetry */}
                  {experiment.metrics && (
                    <div className="border border-white/10 p-3.5 bg-black/40 space-y-2">
                      <div className="flex items-center gap-1.5 text-[10px] text-[#FF1E27] font-bold uppercase tracking-wider">
                        <Cpu size={13} />
                        <span>RUNTIME TELEMETRY</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-[10px] text-stone-300 pt-1">
                        {Object.entries(experiment.metrics).map(([k, v]) => (
                          <div key={k} className="border-t border-white/5 pt-1">
                            <span className="text-stone-500 block uppercase text-[9px]">{k}:</span>
                            <span className="text-white font-bold">{v}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 2: Source Code Snippet */}
              {activeTab === 'SOURCE' && (
                <div className="space-y-3 flex-1 flex flex-col">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-stone-400 font-bold uppercase text-[10px]">
                      CORE LOGIC ALGORITHM
                    </span>
                    <button
                      onClick={copyCode}
                      className="flex items-center gap-1 text-[10px] text-[#FF1E27] hover:text-white transition-colors cursor-pointer"
                    >
                      {copied ? <Check size={12} /> : <Copy size={12} />}
                      <span>{copied ? 'COPIED' : 'COPY CODE'}</span>
                    </button>
                  </div>

                  <div className="bg-[#050507] border border-white/15 p-3 rounded-none overflow-x-auto text-[11px] leading-relaxed text-stone-200 font-mono flex-1">
                    <pre className="whitespace-pre">
                      <code>{experiment.codeSnippet || "// Source code available upon request."}</code>
                    </pre>
                  </div>
                </div>
              )}

              {/* Modal Footer Links */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3 shrink-0">
                <span className="text-[10px] text-stone-500 uppercase">
                  STATUS: <strong className="text-white">{experiment.status}</strong>
                </span>

                {experiment.sourceUrl && (
                  <a
                    href={experiment.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[11px] text-[#FF1E27] hover:text-white transition-colors font-bold uppercase"
                  >
                    <span>GITHUB REPO</span>
                    <ExternalLink size={12} />
                  </a>
                )}
              </div>

            </div>

          </div>

        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
}
