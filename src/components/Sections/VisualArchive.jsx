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
      {/* Background Subtle Coordinate Watermarks */}
      <div className="absolute top-12 right-12 text-[10px] text-white/5 uppercase select-none pointer-events-none hidden xl:block leading-relaxed tracking-widest text-right">
        [ARCHIVE-REF // 07-VA-{totalCount}]<br />
        EXHIBITION PRINT SERIES<br />
        300 DPI MASTER FILES
      </div>

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* Minimalist Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-2">
            <div className="text-xs font-mono text-[#8B6DFF] tracking-widest uppercase font-bold">
              07
            </div>
            <h2 className="font-syne text-4xl sm:text-6xl font-extrabold text-white tracking-tight uppercase leading-[0.92]">
              VISUAL<br />ARCHIVE
            </h2>
          </div>

          <div className="space-y-1 md:text-right">
            <div className="font-mono text-xs sm:text-sm font-bold text-white tracking-widest uppercase">
              SELECTED VISUAL WORKS
            </div>
            <div className="text-[11px] font-mono text-[#777777] tracking-[0.2em] uppercase">
              POSTERS / EXPERIMENTS / VISUAL STUDIES
            </div>
          </div>
        </div>

        {/* Editorial Asymmetric Image Showcase (Exact Original Sequence 01 -> 24) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 items-start">
          {POSTERS.map((poster, idx) => {
            // First poster given prominent double-span on desktop for editorial rhythm
            const isLead = idx === 0;

            return (
              <div
                key={poster.id}
                onClick={() => setActiveImageIndex(idx)}
                className={`group relative bg-[#111111] border border-white/10 cursor-pointer overflow-hidden transition-all duration-300 hover:border-[#8B6DFF] select-none ${
                  isLead ? 'sm:col-span-2 lg:col-span-2' : 'col-span-1'
                }`}
              >
                {/* Poster Canvas — Preserves True Aspect Ratio without cropping */}
                <div className={`relative overflow-hidden bg-[#0D0D0D] w-full flex items-center justify-center ${
                  isLead ? 'aspect-[3/4] sm:aspect-[4/3] max-h-[580px]' : 'aspect-[2/3]'
                }`}>
                  <img
                    src={poster.src}
                    alt={`Visual Archive Study ${poster.index}`}
                    className="w-full h-full object-cover filter contrast-125 brightness-95 transition-all duration-500 ease-out group-hover:scale-[1.02] group-hover:brightness-105"
                    loading="lazy"
                  />

                  {/* Dark Vignette Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-40 group-hover:opacity-70 transition-opacity pointer-events-none" />

                  {/* Minimal Numerical Index in Corner */}
                  <div className="absolute top-3 left-3 pointer-events-none z-10">
                    <span className="bg-[#0A0A0A]/90 backdrop-blur-sm border border-white/15 text-white font-mono text-[10px] font-extrabold px-2.5 py-1">
                      {poster.index}
                    </span>
                  </div>

                  {/* Thin Purple Accent Line on Hover */}
                  <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[2px] bg-[#8B6DFF] transition-all duration-300 ease-out z-10" />
                </div>
              </div>
            );
          })}
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

      {/* Full-Screen Pure Artwork Viewer (Clean: Artwork + Number + Navigation + Close only) */}
      {activeImageIndex !== null && (
        <div
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-xl flex flex-col justify-between items-center p-4 sm:p-6"
          onClick={() => setActiveImageIndex(null)}
        >
          {/* Top Minimal Bar */}
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

          {/* Bottom Minimal Indicator */}
          <div className="text-[10px] font-mono text-[#555555] tracking-widest uppercase z-20">
            USE ARROW KEYS OR CHEVRONS TO NAVIGATE · ESC TO CLOSE
          </div>
        </div>
      )}

    </section>
  );
}
