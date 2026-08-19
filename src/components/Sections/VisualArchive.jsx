import React, { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

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
  const totalCount = POSTERS.length;

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
        
        {/* Minimalist Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-2">
            <div className="text-xs font-mono text-[#8B6DFF] tracking-widest uppercase font-bold">
              07
            </div>
            <h2 className="font-syne text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight uppercase leading-[0.92]">
              VISUAL ARCHIVE
            </h2>
          </div>

          <div className="space-y-1 md:text-right">
            <div className="font-mono text-xs sm:text-sm font-bold text-white tracking-widest uppercase">
              SELECTED VISUAL WORKS
            </div>
            <div className="text-[11px] font-mono text-[#777777] tracking-[0.2em] uppercase">
              POSTERS / VISUAL STUDIES / EXPERIMENTS
            </div>
          </div>
        </div>

        {/* Strict 6 × 4 Editorial Gallery Grid (6 Columns Desktop, 3 Tablet, 2 Mobile, 1 XS) */}
        <div className="grid grid-cols-1 min-[440px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-5 md:gap-6">
          {POSTERS.map((poster, idx) => (
            <div
              key={poster.id}
              onClick={() => setActiveImageIndex(idx)}
              className="group flex flex-col cursor-pointer select-none"
            >
              {/* Image Frame with Subtle Charcoal Background & Contain Fit */}
              <div className="relative w-full aspect-[2/3] bg-[#0E0E0E] border border-white/10 overflow-hidden flex items-center justify-center transition-all duration-300 group-hover:border-[#8B6DFF]/80 group-hover:shadow-[0_0_15px_rgba(139,109,255,0.15)]">
                <img
                  src={poster.src}
                  alt={`Artwork ${poster.index}`}
                  className="w-full h-full object-contain p-1 filter contrast-125 brightness-95 transition-all duration-300 ease-out group-hover:scale-[1.02] group-hover:brightness-105"
                  loading="lazy"
                />

                {/* Ultra-subtle bottom border line accent */}
                <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[1.5px] bg-[#8B6DFF] transition-all duration-300 ease-out" />
              </div>

              {/* Tiny Technical Numerical Index Outside Artwork */}
              <div className="pt-2 flex justify-between items-center text-[10px] font-mono text-[#555555] group-hover:text-[#8B6DFF] transition-colors">
                <span className="font-bold tracking-wider">{poster.index}</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[9px] tracking-widest uppercase">
                  VIEW
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Section Footer */}
        <div className="border-t border-white/10 pt-12 flex flex-col sm:flex-row items-center justify-between gap-6 font-mono text-xs">
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
            className="btn-editorial flex items-center gap-2 font-mono text-xs uppercase font-bold tracking-widest group"
          >
            <span>VIEW ARCHIVE</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
        </div>

      </div>

      {/* Clean Full-Screen Artwork Lightbox Viewer */}
      {activeImageIndex !== null && (
        <div
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-xl flex flex-col justify-between items-center p-4 sm:p-6"
          onClick={() => setActiveImageIndex(null)}
        >
          {/* Top Minimal Bar (Index + Controls) */}
          <div
            className="w-full max-w-6xl flex items-center justify-between py-2 border-b border-white/10 z-20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-xs font-mono text-[#8B6DFF] font-bold tracking-widest">
              {POSTERS[activeImageIndex].index} / {String(totalCount).padStart(2, '0')}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveImageIndex((prev) => (prev - 1 + totalCount) % totalCount)}
                className="p-2 bg-[#111111] border border-white/20 text-white hover:bg-[#8B6DFF] hover:border-[#8B6DFF] transition-colors"
                title="Previous (Left Arrow)"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => setActiveImageIndex((prev) => (prev + 1) % totalCount)}
                className="p-2 bg-[#111111] border border-white/20 text-white hover:bg-[#8B6DFF] hover:border-[#8B6DFF] transition-colors"
                title="Next (Right Arrow)"
              >
                <ChevronRight size={18} />
              </button>
              <button
                onClick={() => setActiveImageIndex(null)}
                className="p-2 bg-[#111111] border border-white/20 text-white hover:bg-[#8B6DFF] hover:border-[#8B6DFF] transition-colors ml-2"
                title="Close (Esc)"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Centered Large Artwork Canvas */}
          <div
            className="my-auto flex items-center justify-center w-full h-[82vh] overflow-hidden p-2 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={POSTERS[activeImageIndex].src}
              alt={`Visual Archive ${POSTERS[activeImageIndex].index}`}
              className="max-h-[80vh] max-w-[90vw] object-contain filter contrast-125 brightness-95 shadow-2xl select-none"
            />
          </div>

          {/* Bottom Minimal Navigation Cue */}
          <div className="text-[10px] font-mono text-[#555555] tracking-widest uppercase z-20">
            USE ARROW KEYS OR CHEVRONS TO NAVIGATE · ESC TO CLOSE
          </div>
        </div>
      )}

    </section>
  );
}
