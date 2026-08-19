import React, { useState, useEffect, useCallback } from 'react';
import { Sparkles, Eye, ArrowUpRight, X, ChevronLeft, ChevronRight, Layers, Maximize2, Tag, Calendar, Compass, Shield, Flame, Car, Trophy, Film, Gamepad2, ArrowRight } from 'lucide-react';
import { visualArchiveData } from '../../data/visualArchiveData';

export default function VisualArchive() {
  const [selectedFilter, setSelectedFilter] = useState('ALL');
  const [activeArtworkIndex, setActiveArtworkIndex] = useState(null);

  const totalCount = visualArchiveData.length;

  const filterTabs = [
    { label: 'ALL', count: totalCount },
    { label: 'CINEMATIC', count: visualArchiveData.filter(w => w.category.includes('CINEMATIC') || w.tags.includes('Cinematic')).length, match: ['CINEMATIC', 'Sci-Fi', 'Film Noir', 'Film'] },
    { label: 'SPORTS & F1', count: visualArchiveData.filter(w => w.category.includes('SPORTS') || w.tags.includes('Sports') || w.tags.includes('Formula 1')).length, match: ['SPORTS', 'Sports', 'Formula 1', 'Ferrari', 'Champion'] },
    { label: 'GAME ART', count: visualArchiveData.filter(w => w.category.includes('GAME') || w.category.includes('CHARACTER') || w.tags.includes('Game Art') || w.tags.includes('Character')).length, match: ['GAME', 'CHARACTER', 'Game Art', 'Character', 'Cyberpunk'] },
    { label: 'PRODUCT & BRAND', count: visualArchiveData.filter(w => w.category.includes('PRODUCT') || w.category.includes('HARDWARE') || w.tags.includes('Product') || w.tags.includes('Hardware')).length, match: ['PRODUCT', 'HARDWARE', 'Product', 'Hardware', 'Branding'] },
    { label: 'EDITORIAL & TRAVEL', count: visualArchiveData.filter(w => w.category.includes('EDITORIAL') || w.category.includes('CONCEPTUAL') || w.tags.includes('Travel') || w.tags.includes('Editorial')).length, match: ['EDITORIAL', 'CONCEPTUAL', 'Travel', 'Editorial', 'Surreal'] },
    { label: 'AUTOMOTIVE', count: visualArchiveData.filter(w => w.category.includes('AUTOMOTIVE') || w.tags.includes('Automotive')).length, match: ['AUTOMOTIVE', 'Automotive', 'Porsche', 'Muscle'] }
  ];

  const filteredWorks = visualArchiveData.filter(item => {
    if (selectedFilter === 'ALL') return true;
    const tab = filterTabs.find(t => t.label === selectedFilter);
    if (!tab || !tab.match) return true;
    return tab.match.some(m => 
      item.category.toLowerCase().includes(m.toLowerCase()) || 
      item.tags.some(t => t.toLowerCase().includes(m.toLowerCase()))
    );
  });

  const featuredWork = visualArchiveData.find(w => w.featured) || visualArchiveData[0];

  // Lightbox keyboard navigation
  const handleKeyDown = useCallback((e) => {
    if (activeArtworkIndex === null) return;
    if (e.key === 'Escape') {
      setActiveArtworkIndex(null);
    } else if (e.key === 'ArrowRight') {
      setActiveArtworkIndex((prev) => (prev + 1) % totalCount);
    } else if (e.key === 'ArrowLeft') {
      setActiveArtworkIndex((prev) => (prev - 1 + totalCount) % totalCount);
    }
  }, [activeArtworkIndex, totalCount]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const activeArtwork = activeArtworkIndex !== null ? visualArchiveData[activeArtworkIndex] : null;

  return (
    <section
      id="visual-archive"
      className="py-28 md:py-36 px-4 sm:px-6 md:px-12 bg-[#0A0A0A] text-[#F1F0EB] border-t border-white/10 font-mono relative w-full overflow-hidden"
    >
      {/* Background Subtle Coordinate Watermarks */}
      <div className="absolute top-12 right-12 text-[10px] text-white/5 uppercase select-none pointer-events-none hidden xl:block leading-relaxed tracking-widest text-right">
        [ARCHIVE-ID // 07-VA-{totalCount}]<br />
        LAT 37.7749° N · LON 122.4194° W<br />
        HIGH-RESOLUTION 300DPI MASTER ASSETS
      </div>

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* Section Header & Subtitle */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-white/10 pb-8">
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-xs font-mono text-[#8B6DFF] tracking-widest uppercase">
              <span className="w-2 h-2 bg-[#8B6DFF]" />
              <span>07 // VISUAL ARCHIVE</span>
              <span className="text-white/30">/</span>
              <span className="text-white/70">SELECTED WORKS ({totalCount} VISUAL STUDIES)</span>
            </div>
            
            <h2 className="font-syne text-4xl sm:text-5xl md:text-6xl font-extrabold text-white uppercase tracking-tight">
              VISUAL ARCHIVE
            </h2>

            <div className="text-xs sm:text-sm font-mono text-[#8B6DFF] tracking-[0.2em] uppercase font-bold">
              POSTERS, ART DIRECTION & VISUAL EXPERIMENTS
            </div>
          </div>

          <div className="text-xs sm:text-sm font-sans text-[#A0A0A0] max-w-xl leading-relaxed border-l border-white/10 pl-6 lg:pl-8">
            “An evolving collection of cinematic posters, experimental compositions, editorial graphics, sports artwork, automotive design and visual studies.”
          </div>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 border-b border-white/10 pb-6 text-xs font-mono">
          <span className="text-[#555555] uppercase tracking-wider text-[11px] mr-2 hidden sm:inline-block">
            FILTER ARCHIVE:
          </span>
          {filterTabs.map(tab => (
            <button
              key={tab.label}
              onClick={() => setSelectedFilter(tab.label)}
              className={`px-3.5 py-1.5 sm:px-4 sm:py-2 border uppercase tracking-wider text-xs transition-all duration-200 flex items-center gap-2 ${
                selectedFilter === tab.label
                  ? 'bg-[#8B6DFF] text-white border-[#8B6DFF] font-bold shadow-lg shadow-[#8B6DFF]/20'
                  : 'bg-[#111111] text-[#888888] border-white/10 hover:border-white/30 hover:text-white'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`text-[10px] ${selectedFilter === tab.label ? 'text-white/80' : 'text-[#555555]'}`}>
                ({tab.count})
              </span>
            </button>
          ))}
        </div>

        {/* 1. DOMINANT LEAD FEATURED ARTWORK (MAHAAN) */}
        {selectedFilter === 'ALL' && (
          <div className="border border-white/15 bg-[#111111] p-6 md:p-8 relative group overflow-hidden transition-all duration-300 hover:border-[#8B6DFF]/60">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Featured Visual Canvas with Original Image */}
              <div
                className="lg:col-span-7 relative overflow-hidden bg-[#0A0A0A] border border-white/10 cursor-pointer aspect-[3/4] sm:aspect-[4/3] max-h-[560px] flex items-center justify-center group"
                onClick={() => {
                  const idx = visualArchiveData.findIndex(w => w.id === featuredWork.id);
                  setActiveArtworkIndex(idx !== -1 ? idx : 0);
                }}
              >
                <img
                  src={featuredWork.image}
                  alt={featuredWork.title}
                  className="w-full h-full object-cover object-top filter contrast-125 brightness-95 transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  loading="lazy"
                />
                
                {/* Subtle Cinematic Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-80" />
                
                {/* Featured Badge */}
                <div className="absolute top-4 left-4 bg-[#8B6DFF] text-white text-[10px] font-mono font-bold tracking-widest px-3 py-1 uppercase flex items-center gap-1.5 shadow-md">
                  <Sparkles size={12} />
                  <span>LEAD FEATURED STUDY // 01</span>
                </div>

                <div className="absolute bottom-4 right-4 bg-[#0A0A0A]/90 border border-white/20 text-white text-xs p-2.5 flex items-center gap-2 group-hover:bg-[#8B6DFF] group-hover:border-[#8B6DFF] transition-colors">
                  <Maximize2 size={15} />
                  <span className="text-[10px] uppercase font-bold tracking-widest">INSPECT ARTWORK</span>
                </div>
              </div>

              {/* Right Featured Metadata & Art Direction Specs */}
              <div className="lg:col-span-5 space-y-6 flex flex-col justify-between h-full">
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono text-[#8B6DFF] border-b border-white/10 pb-3">
                    <span className="font-bold tracking-widest">{featuredWork.num} / {featuredWork.title}</span>
                    <span className="text-white/60">{featuredWork.year}</span>
                  </div>

                  <div className="text-[11px] font-mono text-[#8B6DFF] font-bold uppercase tracking-widest">
                    {featuredWork.category}
                  </div>

                  <h3 className="font-syne text-3xl sm:text-4xl md:text-5xl font-extrabold text-white uppercase tracking-tight">
                    {featuredWork.title}
                  </h3>

                  <p className="font-sans text-sm text-[#C9C7C0] leading-relaxed">
                    {featuredWork.description}
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-white/10">
                  <div className="space-y-1.5">
                    <div className="text-[10px] text-[#555555] font-bold uppercase tracking-widest">ART DIRECTION DISCIPLINE</div>
                    <div className="text-xs text-white font-mono font-bold">{featuredWork.discipline}</div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="text-[10px] text-[#555555] font-bold uppercase tracking-widest">COLOR PALETTE EXTRACTION</div>
                    <div className="flex items-center gap-2">
                      {featuredWork.palette.map((color, i) => (
                        <div key={i} className="flex items-center gap-1.5">
                          <div className="w-5 h-5 border border-white/20" style={{ backgroundColor: color }} />
                          <span className="text-[9px] text-[#888888] font-mono hidden sm:inline-block">{color}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-[10px] text-[#888888] font-mono">{featuredWork.specs}</span>
                    <button
                      onClick={() => {
                        const idx = visualArchiveData.findIndex(w => w.id === featuredWork.id);
                        setActiveArtworkIndex(idx !== -1 ? idx : 0);
                      }}
                      className="px-4 py-2 bg-[#8B6DFF] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#7a5ceb] transition-colors flex items-center gap-2"
                    >
                      <span>VIEW DETAILS</span>
                      <ArrowUpRight size={14} />
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* 2. ASYMMETRIC EDITORIAL MASONRY GALLERY (Original Google Drive Images) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {filteredWorks.map((work) => {
            const originalIndex = visualArchiveData.findIndex(w => w.id === work.id);

            return (
              <div
                key={work.id}
                onClick={() => setActiveArtworkIndex(originalIndex)}
                className="group relative bg-[#111111] border border-white/10 cursor-pointer overflow-hidden transition-all duration-300 hover:border-[#8B6DFF] hover:shadow-2xl flex flex-col justify-between"
              >
                {/* Visual Image Container — Preserves Original Portrait Aspect */}
                <div className="relative overflow-hidden bg-[#0A0A0A] aspect-[2/3] w-full flex items-center justify-center">
                  <img
                    src={work.image}
                    alt={work.title}
                    className="w-full h-full object-cover filter contrast-125 brightness-95 transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    loading="lazy"
                  />

                  {/* Dark Vignette Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/30 to-transparent opacity-50 group-hover:opacity-80 transition-opacity" />

                  {/* Top Technical Header Inside Card */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
                    <span className="bg-[#0A0A0A]/90 backdrop-blur-sm border border-white/15 text-white font-mono text-[10px] font-extrabold px-2.5 py-1">
                      {work.num} / {work.title}
                    </span>
                    <span className="bg-[#0A0A0A]/90 backdrop-blur-sm border border-white/15 text-[#8B6DFF] font-mono text-[10px] font-bold px-2 py-1 uppercase">
                      {work.year}
                    </span>
                  </div>

                  {/* Bottom Hover Action Cue */}
                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                    <div className="bg-[#8B6DFF] text-white p-2 flex items-center justify-center shadow-lg">
                      <Eye size={16} />
                    </div>
                  </div>
                </div>

                {/* Card Editorial Metadata Footer */}
                <div className="p-4 sm:p-5 space-y-2.5 bg-[#111111] border-t border-white/10">
                  <div className="text-[10px] text-[#8B6DFF] font-mono font-bold uppercase tracking-widest truncate">
                    {work.category}
                  </div>

                  <div className="text-[9px] text-[#777777] font-mono uppercase tracking-wider truncate">
                    {work.subcategory}
                  </div>

                  <h4 className="font-syne text-lg sm:text-xl font-extrabold text-white uppercase tracking-tight group-hover:text-[#8B6DFF] transition-colors truncate">
                    {work.title}
                  </h4>

                  {/* Animated Thin Purple Accent Line */}
                  <div className="pt-2">
                    <div className="w-0 group-hover:w-full h-[2px] bg-[#8B6DFF] transition-all duration-300 ease-out" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 3. SECTION FOOTER & EXPLORE CALL TO ACTION */}
        <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-xs">
          <div className="flex items-center gap-3 text-[#555555]">
            <span className="w-2 h-2 rounded-full bg-[#8B6DFF]" />
            <span className="uppercase tracking-widest">
              END OF VISUAL ARCHIVE // {totalCount} MASTER POSTER STUDIES
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://drive.google.com/drive/folders/1Fe6jawT0ixn7PNNmN7YSeU_eip62CO7w?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-editorial-purple flex items-center gap-2 font-mono text-xs uppercase font-bold tracking-wider px-6 py-3 group"
            >
              <span>EXPLORE THE FULL VISUAL ARCHIVE</span>
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>

      </div>

      {/* 4. FULL SCREEN IMMERSIVE ARTWORK LIGHTBOX / PROJECT VIEWER WITH PREV/NEXT NAVIGATION */}
      {activeArtwork && (
        <div
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
          onClick={() => setActiveArtworkIndex(null)}
        >
          <div
            className="bg-[#111111] border border-white/20 max-w-5xl w-full max-h-[92vh] overflow-y-auto p-5 sm:p-8 relative space-y-6 shadow-2xl text-[#F1F0EB]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Controls: Counter + Navigation + Close */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-[#8B6DFF] font-bold">
                  {activeArtwork.num} / {totalCount}
                </span>
                <span className="text-xs font-mono text-white/60 uppercase tracking-widest hidden sm:inline-block">
                  {activeArtwork.category}
                </span>
              </div>

              {/* Prev / Next / Close buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveArtworkIndex((prev) => (prev - 1 + totalCount) % totalCount)}
                  className="p-2 bg-[#0A0A0A] border border-white/20 text-white hover:bg-[#8B6DFF] hover:border-[#8B6DFF] transition-colors"
                  title="Previous (Left Arrow)"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={() => setActiveArtworkIndex((prev) => (prev + 1) % totalCount)}
                  className="p-2 bg-[#0A0A0A] border border-white/20 text-white hover:bg-[#8B6DFF] hover:border-[#8B6DFF] transition-colors"
                  title="Next (Right Arrow)"
                >
                  <ChevronRight size={18} />
                </button>
                <button
                  onClick={() => setActiveArtworkIndex(null)}
                  className="p-2 bg-[#0A0A0A] border border-white/20 text-white hover:bg-[#8B6DFF] hover:border-[#8B6DFF] transition-colors ml-2"
                  title="Close (Esc)"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Modal Grid Content */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Artwork Full Canvas — Original Aspect Ratio Maintained */}
              <div className="lg:col-span-7 bg-[#0A0A0A] border border-white/10 overflow-hidden flex items-center justify-center p-2">
                <img
                  src={activeArtwork.image}
                  alt={activeArtwork.title}
                  className="w-full h-auto max-h-[62vh] object-contain filter contrast-125 brightness-95 mx-auto"
                />
              </div>

              {/* Artwork Specifications & Metadata */}
              <div className="lg:col-span-5 space-y-5 font-mono">
                <div>
                  <div className="text-[10px] text-[#8B6DFF] font-bold uppercase tracking-widest mb-1">
                    {activeArtwork.num} / {activeArtwork.category}
                  </div>
                  <h3 className="font-syne text-2xl sm:text-4xl font-extrabold text-white uppercase tracking-tight">
                    {activeArtwork.title}
                  </h3>
                  <div className="text-xs text-[#888888] uppercase mt-1">
                    {activeArtwork.subcategory}
                  </div>
                </div>

                <div className="space-y-1.5 pt-3 border-t border-white/10">
                  <div className="text-[10px] text-[#8B6DFF] font-bold uppercase tracking-widest">ART DIRECTION BRIEF</div>
                  <p className="font-sans text-xs sm:text-sm text-[#C9C7C0] leading-relaxed">
                    {activeArtwork.description}
                  </p>
                </div>

                <div className="space-y-1.5 pt-3 border-t border-white/10">
                  <div className="text-[10px] text-[#555555] font-bold uppercase tracking-widest">DISCIPLINE</div>
                  <div className="text-xs text-white font-bold">{activeArtwork.discipline}</div>
                </div>

                <div className="space-y-2 pt-3 border-t border-white/10">
                  <div className="text-[10px] text-[#555555] font-bold uppercase tracking-widest">COLOR EXTRACTION</div>
                  <div className="flex items-center gap-3">
                    {activeArtwork.palette.map((col, i) => (
                      <div key={i} className="flex flex-col items-center gap-1">
                        <div className="w-7 h-7 border border-white/20" style={{ backgroundColor: col }} />
                        <span className="text-[9px] text-[#888888]">{col}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5 pt-3 border-t border-white/10 bg-[#0A0A0A] p-3 border border-white/10">
                  <div className="text-[10px] text-[#8B6DFF] font-bold uppercase tracking-widest">SPECIFICATIONS</div>
                  <div className="text-xs text-white">{activeArtwork.specs}</div>
                </div>

              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
}
