import React, { useState } from 'react';
import { Sparkles, Eye, ArrowUpRight, X, Layers, Maximize2, Tag, Calendar, Compass, Shield, Flame, Car, Trophy, Film, Gamepad2, Plane } from 'lucide-react';

export const visualWorks = [
  {
    id: "01",
    title: "MAHAAN",
    category: "CINEMATIC POSTER / TYPOGRAPHY",
    discipline: "Film Art Direction & Poster Design",
    type: "cinematic",
    year: "2024",
    aspect: "portrait",
    featured: true,
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1200&q=85",
    description: "Chiaroscuro Tamil cinema editorial study with bold custom serif typography, dual-tone gold and ember lighting, and gritty character framing.",
    palette: ["#1A1108", "#D49B42", "#8B6DFF", "#F1F0EB"],
    specs: "300 DPI · 24 × 36 IN · CMYK PRINT READY"
  },
  {
    id: "02",
    title: "PLAYSTATION",
    category: "PRODUCT / ART DIRECTION",
    discipline: "Product Advertising & Brand Design",
    type: "product",
    year: "2024",
    aspect: "landscape",
    featured: false,
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=1000&q=85",
    description: "Precision product advertising poster with Swiss grid layout, dark carbon minimalism, and restrained cyan-violet edge glow.",
    palette: ["#0A0A10", "#00439C", "#8B6DFF", "#F1F0EB"],
    specs: "300 DPI · 16:9 4K DISPLAY · RGB DIGITAL"
  },
  {
    id: "03",
    title: "PS5",
    category: "MINIMALIST / EDITORIAL DESIGN",
    discipline: "Hardware Editorial & Architecture",
    type: "product",
    year: "2024",
    aspect: "portrait",
    featured: false,
    image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1000&q=85",
    description: "Monochromatic architectural hardware poster exploring brutalist typography and futuristic curved industrial forms.",
    palette: ["#050505", "#F5F5F5", "#8B6DFF", "#333333"],
    specs: "300 DPI · A2 POSTER · MONOCHROME"
  },
  {
    id: "04",
    title: "GHOST",
    category: "CHARACTER / EDITORIAL",
    discipline: "Tactical Game Poster & Character Study",
    type: "game",
    year: "2024",
    aspect: "portrait",
    featured: false,
    image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1000&q=85",
    description: "Call of Duty Simon 'Ghost' Riley character concept featuring tactical screen overlays, combat typography, and high-contrast smoke.",
    palette: ["#0B0E0D", "#3A443B", "#8B6DFF", "#C4C4C4"],
    specs: "300 DPI · 18 × 24 IN · TACTICAL CAMO"
  },
  {
    id: "05",
    title: "A GENSINY",
    category: "SURREAL / CONCEPT ART",
    discipline: "Conceptual Worldbuilding & Digital Art",
    type: "editorial",
    year: "2024",
    aspect: "landscape",
    featured: false,
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=85",
    description: "Surreal dreamscape study investigating floating geometric monuments, dimensional lighting, and ambient color grading.",
    palette: ["#080410", "#6B2D94", "#8B6DFF", "#F1F0EB"],
    specs: "300 DPI · 21:9 ULTRA-WIDE CINEMATIC"
  },
  {
    id: "06",
    title: "RED DEAD REDEMPTION II",
    category: "GAME ART / CINEMATIC COMPOSITION",
    discipline: "Western Cinematic Landscape & Poster",
    type: "game",
    year: "2024",
    aspect: "landscape",
    featured: false,
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=85",
    description: "Epic frontier cinematic poster balancing vintage woodcut typography with silhouetted rider compositions and sunset color palettes.",
    palette: ["#1A0704", "#D4381C", "#E28C2C", "#F1F0EB"],
    specs: "300 DPI · 24 × 36 IN · VINTAGE TEXTURE"
  },
  {
    id: "07",
    title: "KYOTO",
    category: "TRAVEL / EDITORIAL DESIGN",
    discipline: "Japanese Editorial & Typography",
    type: "editorial",
    year: "2024",
    aspect: "portrait",
    featured: false,
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1000&q=85",
    description: "Modern Japanese travel editorial incorporating vertical Kanji glyphs, minimalist asymmetric margins, and atmospheric dusk lighting.",
    palette: ["#0C0E14", "#BA2F39", "#8B6DFF", "#E4E2DC"],
    specs: "300 DPI · B2 POSTER · SWISS GRID"
  },
  {
    id: "08",
    title: "LONDON",
    category: "TRAVEL / EDITORIAL DESIGN",
    discipline: "Metropolitan Editorial Study",
    type: "editorial",
    year: "2024",
    aspect: "portrait",
    featured: false,
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1000&q=85",
    description: "Brutalist typographic layout reflecting London's architectural geometry, fog-filtered street illumination, and structured coordinate stamps.",
    palette: ["#111315", "#A52A2A", "#8B6DFF", "#D8D6D0"],
    specs: "300 DPI · A1 POSTER · METRIC GRID"
  },
  {
    id: "09",
    title: "CHARLES LECLERC",
    category: "SPORTS / PORTRAIT ART DIRECTION",
    discipline: "Formula 1 Scuderia Ferrari Tribute",
    type: "sports",
    year: "2024",
    aspect: "portrait",
    featured: false,
    image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1000&q=85",
    description: "High-octane Ferrari F1 poster series with italicized technical speed numerals, telemetry charts, and visceral Rosso Corsa accents.",
    palette: ["#120404", "#D40000", "#FFD700", "#F1F0EB"],
    specs: "300 DPI · 18 × 24 IN · VELOCITY BLUR"
  },
  {
    id: "10",
    title: "MAX VERSTAPPEN",
    category: "SPORTS / EDITORIAL POSTER",
    discipline: "Formula 1 World Championship Art",
    type: "sports",
    year: "2024",
    aspect: "portrait",
    featured: false,
    image: "https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?auto=format&fit=crop&w=1000&q=85",
    description: "Dynamic racing editorial commemorating championship performance with apex curvature lines and heavy industrial display type.",
    palette: ["#070B14", "#001A30", "#D62737", "#FFC800"],
    specs: "300 DPI · 18 × 24 IN · RACETRACK APEX"
  },
  {
    id: "11",
    title: "LEWIS HAMILTON",
    category: "SPORTS / EDITORIAL POSTER",
    discipline: "Formula 1 & Haute Couture Fusion",
    type: "sports",
    year: "2024",
    aspect: "portrait",
    featured: false,
    image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1000&q=85",
    description: "Haute-couture meets Formula 1 motorsport aesthetics, featuring fluoro-yellow accents, matte black textures, and 7x champion iconography.",
    palette: ["#0A0A0A", "#DFFF00", "#8B6DFF", "#F1F0EB"],
    specs: "300 DPI · A2 POSTER · HIGH CONTRAST"
  },
  {
    id: "12",
    title: "DODGE CHARGER",
    category: "AUTOMOTIVE / ADVERTISING",
    discipline: "Automotive Poster & Editorial",
    type: "automotive",
    year: "2024",
    aspect: "landscape",
    featured: false,
    image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=85",
    description: "Raw American muscle car advertising poster highlighting muscular chassis proportions, LED racetrack taillights, and asphalt grit.",
    palette: ["#080808", "#C4151C", "#8B6DFF", "#E4E2DC"],
    specs: "300 DPI · 16:9 DISPLAY · MUSCLE RAW"
  },
  {
    id: "13",
    title: "SCORPION",
    category: "CHARACTER / GAME ART",
    discipline: "Mortal Kombat Character Poster",
    type: "game",
    year: "2024",
    aspect: "portrait",
    featured: false,
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1000&q=85",
    description: "Mortal Kombat Scorpion character tribute with molten ember particles, iconic kunai spear typography, and sinister martial arts framing.",
    palette: ["#140B02", "#FFA200", "#8B6DFF", "#F1F0EB"],
    specs: "300 DPI · 20 × 30 IN · EMBER GLOW"
  }
];

export default function VisualArchive() {
  const [selectedFilter, setSelectedFilter] = useState('ALL');
  const [activeArtwork, setActiveArtwork] = useState(null);

  const filterTabs = [
    { label: 'ALL', count: 13 },
    { label: 'CINEMATIC & ART', count: 4, type: ['cinematic', 'editorial'] },
    { label: 'SPORTS & F1', count: 3, type: ['sports'] },
    { label: 'PRODUCT & BRAND', count: 2, type: ['product'] },
    { label: 'GAME & CHARACTER', count: 4, type: ['game', 'automotive'] }
  ];

  const filteredWorks = visualWorks.filter(item => {
    if (selectedFilter === 'ALL') return true;
    const tab = filterTabs.find(t => t.label === selectedFilter);
    return tab && tab.type ? tab.type.includes(item.type) : true;
  });

  const featuredWork = visualWorks.find(w => w.featured) || visualWorks[0];

  return (
    <section
      id="visual-archive"
      className="py-28 md:py-36 px-6 md:px-12 bg-[#0A0A0A] text-[#F1F0EB] border-t border-white/10 font-mono relative w-full overflow-hidden"
    >
      {/* Background Subtle Coordinate Watermarks */}
      <div className="absolute top-12 right-12 text-[10px] text-white/5 uppercase select-none pointer-events-none hidden xl:block leading-relaxed tracking-widest text-right">
        [GRID // 07-VA-2024]<br />
        LAT 37.7749° N · LON 122.4194° W<br />
        RENDER: RAW COLOR CMYK/RGB
      </div>

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* Section Header & Subtitle */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-white/10 pb-8">
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-xs font-mono text-[#8B6DFF] tracking-widest uppercase">
              <span className="w-2 h-2 bg-[#8B6DFF]" />
              <span>SECTION 07 // VISUAL ARCHIVE</span>
              <span className="text-white/30">/</span>
              <span className="text-white/60">SELECTED WORKS (13 STUDIES)</span>
            </div>
            
            <h2 className="font-syne text-4xl sm:text-5xl md:text-6xl font-extrabold text-white uppercase tracking-tight">
              VISUAL ARCHIVE
            </h2>

            <div className="text-xs sm:text-sm font-mono text-[#8B6DFF] tracking-[0.2em] uppercase font-bold">
              POSTERS, ART DIRECTION & VISUAL EXPERIMENTS
            </div>
          </div>

          <div className="text-xs sm:text-sm font-sans text-[#A0A0A0] max-w-xl leading-relaxed border-l border-white/10 pl-6 lg:pl-8">
            A curated collection of experimental posters, cinematic compositions, sports graphics, gaming artwork, automotive visuals, and editorial design studies. Focused on composition, typography, visual storytelling, image treatment, and art direction.
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
              className={`px-4 py-2 border uppercase tracking-wider text-xs transition-all duration-200 flex items-center gap-2 ${
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

        {/* 1. DOMINANT HERO FEATURED WORK (MAHAAN / LEAD STUDY) */}
        {selectedFilter === 'ALL' && (
          <div className="border border-white/15 bg-[#111111] p-6 md:p-8 relative group overflow-hidden transition-all duration-300 hover:border-[#8B6DFF]/60">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Featured Visual Canvas */}
              <div
                className="lg:col-span-7 relative overflow-hidden bg-[#0A0A0A] border border-white/10 cursor-pointer aspect-[16/10] sm:aspect-[16/9] group"
                onClick={() => setActiveArtwork(featuredWork)}
              >
                <img
                  src={featuredWork.image}
                  alt={featuredWork.title}
                  className="w-full h-full object-cover filter contrast-125 brightness-95 transition-transform duration-700 ease-out group-hover:scale-105"
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
                    <span className="font-bold tracking-widest">[{featuredWork.id}] {featuredWork.category}</span>
                    <span className="text-white/60">{featuredWork.year}</span>
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
                      onClick={() => setActiveArtwork(featuredWork)}
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

        {/* 2. SOPHISTICATED EDITORIAL ASYMMETRIC GALLERY */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredWorks.map((work) => {
            const isWide = work.aspect === 'landscape' && work.id !== '01';

            return (
              <div
                key={work.id}
                onClick={() => setActiveArtwork(work)}
                className={`group relative bg-[#111111] border border-white/10 cursor-pointer overflow-hidden transition-all duration-300 hover:border-[#8B6DFF] hover:shadow-2xl flex flex-col justify-between ${
                  isWide ? 'md:col-span-2 lg:col-span-2' : 'col-span-1'
                }`}
              >
                {/* Visual Image Container */}
                <div className={`relative overflow-hidden bg-[#0A0A0A] ${isWide ? 'aspect-[16/9]' : 'aspect-[3/4]'}`}>
                  <img
                    src={work.image}
                    alt={work.title}
                    className="w-full h-full object-cover filter contrast-125 brightness-95 transition-transform duration-500 ease-out group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Dark Vignette Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                  {/* Top Technical Header Inside Card */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <span className="bg-[#0A0A0A]/85 backdrop-blur-sm border border-white/10 text-white font-mono text-[10px] font-extrabold px-2.5 py-1">
                      [{work.id}]
                    </span>
                    <span className="bg-[#0A0A0A]/85 backdrop-blur-sm border border-white/10 text-[#8B6DFF] font-mono text-[10px] font-bold px-2.5 py-1 uppercase">
                      {work.year}
                    </span>
                  </div>

                  {/* Bottom Hover Action Cue */}
                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="bg-[#8B6DFF] text-white p-2 flex items-center justify-center shadow-lg">
                      <Eye size={16} />
                    </div>
                  </div>
                </div>

                {/* Card Editorial Metadata Footer */}
                <div className="p-5 md:p-6 space-y-3 bg-[#111111] border-t border-white/10">
                  <div className="text-[10px] text-[#8B6DFF] font-mono font-bold uppercase tracking-widest truncate">
                    {work.category}
                  </div>

                  <h4 className="font-syne text-xl sm:text-2xl font-extrabold text-white uppercase tracking-tight group-hover:text-[#8B6DFF] transition-colors">
                    {work.title}
                  </h4>

                  <p className="font-sans text-xs text-[#888888] leading-relaxed line-clamp-2">
                    {work.description}
                  </p>

                  {/* Animated Accent Line */}
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
              END OF VISUAL ARCHIVE // 13 MASTER STUDIES COMPILED
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/daneyyhh"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-editorial-purple flex items-center gap-2 font-mono text-xs uppercase font-bold tracking-wider px-6 py-3"
            >
              <span>EXPLORE VISUAL ARCHIVE</span>
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>

      </div>

      {/* 4. HIGH RESOLUTION ARTWORK INSPECTION LIGHTBOX MODAL */}
      {activeArtwork && (
        <div
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
          onClick={() => setActiveArtwork(null)}
        >
          <div
            className="bg-[#111111] border border-white/20 max-w-5xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 relative space-y-6 shadow-2xl text-[#F1F0EB]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveArtwork(null)}
              className="absolute top-4 right-4 p-2 bg-[#0A0A0A] border border-white/20 text-white hover:bg-[#8B6DFF] hover:border-[#8B6DFF] transition-colors"
            >
              <X size={20} />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <span className="text-xs font-mono text-[#8B6DFF] font-bold">[{activeArtwork.id}]</span>
              <span className="text-xs font-mono text-white/60 uppercase tracking-widest">{activeArtwork.category}</span>
              <span className="text-xs font-mono text-[#8B6DFF]">/</span>
              <span className="text-xs font-mono text-white/60">{activeArtwork.year}</span>
            </div>

            {/* Modal Grid Content */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Artwork Full View Canvas */}
              <div className="lg:col-span-7 bg-[#0A0A0A] border border-white/10 overflow-hidden">
                <img
                  src={activeArtwork.image}
                  alt={activeArtwork.title}
                  className="w-full h-auto max-h-[60vh] object-contain filter contrast-125 brightness-95 mx-auto"
                />
              </div>

              {/* Artwork Specifications & Editorial Notes */}
              <div className="lg:col-span-5 space-y-6 font-mono">
                <div>
                  <div className="text-[10px] text-[#555555] font-bold uppercase tracking-widest mb-1">PROJECT TITLE</div>
                  <h3 className="font-syne text-3xl font-extrabold text-white uppercase tracking-tight">
                    {activeArtwork.title}
                  </h3>
                </div>

                <div className="space-y-1.5 pt-3 border-t border-white/10">
                  <div className="text-[10px] text-[#8B6DFF] font-bold uppercase tracking-widest">ART DIRECTION BRIEF</div>
                  <p className="font-sans text-xs sm:text-sm text-[#C9C7C0] leading-relaxed">
                    {activeArtwork.description}
                  </p>
                </div>

                <div className="space-y-1.5 pt-3 border-t border-white/10">
                  <div className="text-[10px] text-[#555555] font-bold uppercase tracking-widest">DISCIPLINE & SPECIALIZATION</div>
                  <div className="text-xs text-white font-bold">{activeArtwork.discipline}</div>
                </div>

                <div className="space-y-2 pt-3 border-t border-white/10">
                  <div className="text-[10px] text-[#555555] font-bold uppercase tracking-widest">COLOR EXTRACTION</div>
                  <div className="flex items-center gap-3">
                    {activeArtwork.palette.map((col, i) => (
                      <div key={i} className="flex flex-col items-center gap-1">
                        <div className="w-8 h-8 border border-white/20" style={{ backgroundColor: col }} />
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
