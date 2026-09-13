import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { MaskHeading, FadeInUp } from '../UI/TextReveal';

const EASE = [0.16, 1, 0.3, 1];

const POSTERS = Array.from({ length: 24 }, (_, i) => {
  const num = String(i + 1).padStart(2, '0');
  return {
    id: num,
    index: num,
    src: `/images/posters/poster-${num}.jpeg`
  };
});

export default function VisualArchive() {
  const [activeImageIndex, setActiveImageIndex] = useState(null);
  const prefersReduced = useReducedMotion();
  const totalCount = POSTERS.length;

  // Lock body scroll and pause Lenis when lightbox is open
  useEffect(() => {
    if (activeImageIndex !== null) {
      document.body.style.overflow = 'hidden';
      if (window.__lenis) window.__lenis.stop();
    } else {
      document.body.style.overflow = '';
      if (window.__lenis) window.__lenis.start();
    }
    return () => {
      document.body.style.overflow = '';
      if (window.__lenis) window.__lenis.start();
    };
  }, [activeImageIndex]);

  // Keyboard navigation for lightbox
  const handleKeyDown = useCallback((e) => {
    if (activeImageIndex === null) return;
    if (e.key === 'Escape') {
      setActiveImageIndex(null);
    } else if (e.key === 'ArrowRight') {
      setActiveImageIndex((prev) => (prev + 1) % totalCount);
    } else if (e.key === 'ArrowLeft') {
      setActiveImageIndex((prev) => (prev - 1 + totalCount) % totalCount);
    }
  }, [activeImageIndex, totalCount]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <section
      id="visual-archive"
      className="py-28 md:py-36 px-4 sm:px-6 md:px-12 bg-[#0A0A0A] text-[#F1F0EB] border-t border-white/10 font-mono relative w-full overflow-hidden"
    >
      {/* Background Coordinate Watermarks */}
      <div className="absolute top-12 right-12 text-[10px] text-white/5 uppercase select-none pointer-events-none hidden xl:block leading-relaxed tracking-widest text-right">
        [MATRIX // 6×4 ARCHIVE]<br />
        EXHIBITION SERIES · 24 STUDIES<br />
        HIGH-PRECISION 300 DPI
      </div>

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* Minimalist Editorial Header with Masked Reveal */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-2">
            <motion.div
              initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 0.6, ease: EASE }}
              className="text-xs font-mono text-[#FF1E27] tracking-widest uppercase font-bold flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF1E27]" />
              <span>07</span>
            </motion.div>

            <MaskHeading
              lines={["VISUAL ARCHIVE"]}
              className="font-syne text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight uppercase leading-[0.92]"
              delay={0.15}
            />
          </div>

          <motion.div
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ duration: 0.6, delay: 0.25, ease: EASE }}
            className="space-y-1 md:text-right"
          >
            <div className="font-mono text-xs sm:text-sm font-bold text-white tracking-widest uppercase">
              SELECTED VISUAL WORKS
            </div>
            <div className="text-[11px] font-mono text-[#777777] tracking-[0.2em] uppercase">
              POSTERS / VISUAL STUDIES / EXPERIMENTS
            </div>
          </motion.div>
        </div>

        {/* Strict 6 × 4 Editorial Gallery Grid with Staggered Viewport Entrance */}
        <div className="grid grid-cols-1 min-[440px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-5 md:gap-6">
          {POSTERS.map((poster, idx) => (
            <motion.div
              key={poster.id}
              initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5% 0px" }}
              transition={{
                duration: prefersReduced ? 0.2 : 0.55,
                delay: prefersReduced ? 0 : (idx % 6) * 0.05,
                ease: EASE,
              }}
              onClick={() => setActiveImageIndex(idx)}
              className="group flex flex-col cursor-pointer select-none"
            >
              {/* Image Frame with Subtle Charcoal Background & Contain Fit */}
              <div className="relative w-full aspect-[2/3] bg-[#0E0E0E] border border-white/10 overflow-hidden flex items-center justify-center transition-all duration-300 group-hover:border-[#FF1E27]/80 group-hover:shadow-[0_0_15px_rgba(255, 30, 39,0.15)]">
                <img
                  src={poster.src}
                  alt={`Artwork ${poster.index}`}
                  className="w-full h-full object-contain p-1 filter contrast-125 brightness-95 transition-all duration-300 ease-out group-hover:scale-[1.03] group-hover:brightness-105 select-none"
                  loading="lazy"
                />

                {/* Ultra-subtle bottom border line accent */}
                <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[1.5px] bg-[#FF1E27] transition-all duration-300 ease-out" />
              </div>

              {/* Tiny Technical Numerical Index Outside Artwork */}
              <div className="pt-2 flex justify-between items-center text-[10px] font-mono text-[#555555] group-hover:text-[#FF1E27] transition-colors">
                <span className="font-bold tracking-wider">{poster.index}</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[9px] tracking-widest uppercase">
                  VIEW
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Section Footer */}
        <FadeInUp delay={0.3} className="border-t border-white/10 pt-12 flex flex-col sm:flex-row items-center justify-between gap-6 font-mono text-xs">
          <div className="space-y-0.5 text-center sm:text-left">
            <div className="font-bold text-base sm:text-lg text-white font-syne tracking-wider">
              {String(totalCount).padStart(2, '0')}
            </div>
            <div className="text-[11px] text-[#777777] uppercase tracking-widest">
              VISUAL STUDIES
            </div>
          </div>

          <a
            href="https://drive.google.com/drive/folders/1Fe6jawT0ixn7PNNmN7YSeU_eip62CO7w?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-editorial flex items-center gap-2 font-mono text-xs uppercase font-bold tracking-widest group cursor-pointer"
          >
            <span>VIEW ARCHIVE</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
        </FadeInUp>

      </div>

      {/* True Full-Screen Lightbox Portal */}
      {activeImageIndex !== null && typeof document !== 'undefined' && createPortal(
        <div
          className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-6 md:p-10 select-none animate-in fade-in duration-200"
          onClick={() => setActiveImageIndex(null)}
        >
          {/* Top Bar */}
          <div
            className="flex items-center justify-between text-xs font-mono text-white/60 tracking-widest uppercase z-20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#FF1E27] animate-pulse" />
              <span className="text-[#FF1E27] font-bold">POSTER STUDY {POSTERS[activeImageIndex].index} / {totalCount}</span>
            </div>

            <button
              onClick={() => setActiveImageIndex(null)}
              className="flex items-center gap-2 bg-white/10 hover:bg-[#FF1E27] text-white px-3 py-1.5 rounded-sm transition-colors cursor-pointer"
            >
              <span>ESC / CLOSE</span>
              <X size={16} />
            </button>
          </div>

          {/* Main Focused Artwork Frame */}
          <div
            className="relative flex-1 flex items-center justify-center my-auto max-h-[82vh] py-2 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={POSTERS[activeImageIndex].src}
              alt={`Focused Artwork ${POSTERS[activeImageIndex].index}`}
              className="max-h-full max-w-full object-contain shadow-[0_0_50px_rgba(0,0,0,0.9)] border border-white/10"
            />
          </div>

          {/* Bottom Controls Bar */}
          <div
            className="flex items-center justify-between text-xs font-mono text-white/60 z-20 max-w-xl mx-auto w-full pt-2"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveImageIndex((prev) => (prev - 1 + totalCount) % totalCount)}
              className="flex items-center gap-2 hover:text-white px-4 py-2 bg-white/5 hover:bg-white/10 transition-colors border border-white/10 cursor-pointer"
            >
              <ChevronLeft size={16} />
              <span>PREV</span>
            </button>

            <span className="text-[11px] text-white/40 tracking-wider">USE ARROW KEYS</span>

            <button
              onClick={() => setActiveImageIndex((prev) => (prev + 1) % totalCount)}
              className="flex items-center gap-2 hover:text-white px-4 py-2 bg-white/5 hover:bg-white/10 transition-colors border border-white/10 cursor-pointer"
            >
              <span>NEXT</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
