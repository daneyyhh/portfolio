import React, { useState, useEffect, useRef } from 'react';
import ReubgLogo from './ReubgLogo';

// 9 curated Work images for the rapid cinematic preview sequence
const SEQUENCE_IMAGES = [
  '/images/posters/poster-01.jpeg',
  '/images/posters/poster-02.jpeg',
  '/images/posters/poster-04.jpeg',
  '/images/posters/poster-06.jpeg',
  '/images/posters/poster-07.jpeg',
  '/images/posters/poster-09.jpeg',
  '/images/posters/poster-11.jpeg',
  '/images/posters/poster-15.jpeg',
  '/images/posters/poster-19.jpeg',
];

export default function Preloader({ onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const totalFrames = SEQUENCE_IMAGES.length;

  useEffect(() => {
    // Check if returning visitor in same session for instant/shorter entry
    const isReturning = typeof window !== 'undefined' && sessionStorage.getItem('reubg_visited');

    // Preload sequence images immediately
    let loadedCount = 0;
    SEQUENCE_IMAGES.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedCount++;
        if (loadedCount >= Math.min(3, totalFrames)) {
          setImagesLoaded(true);
        }
      };
    });

    // Fallback if loading takes longer than 300ms
    const loadTimeout = setTimeout(() => setImagesLoaded(true), 300);

    const frameInterval = isReturning ? 140 : 210; // faster for returning, cinematic for first visit
    let step = 0;

    const timer = setInterval(() => {
      step++;
      if (step < totalFrames) {
        setCurrentIndex(step);
      } else {
        clearInterval(timer);
        // Final frame hold then smooth dissolve into portfolio
        setTimeout(() => {
          setIsExiting(true);
          try {
            sessionStorage.setItem('reubg_visited', 'true');
          } catch (e) {}

          setTimeout(() => {
            if (onComplete) onComplete();
          }, 450);
        }, 180);
      }
    }, frameInterval);

    return () => {
      clearInterval(timer);
      clearTimeout(loadTimeout);
    };
  }, [onComplete, totalFrames]);

  const currentNumber = String(currentIndex + 1).padStart(2, '0');
  const totalNumber = String(totalFrames).padStart(2, '0');
  const progressPercent = Math.round(((currentIndex + 1) / totalFrames) * 100);

  return (
    <div
      className={`fixed inset-0 z-[999999] bg-[#0A0A0A] text-[#F1F0EB] flex flex-col justify-between items-center p-6 md:p-10 select-none overflow-hidden transition-all duration-500 ease-out font-mono ${
        isExiting ? 'opacity-0 scale-[1.02] pointer-events-none' : 'opacity-100 scale-100'
      }`}
      style={{ minHeight: '100dvh', height: '100vh', width: '100vw' }}
      aria-label="Loading creative portfolio"
      role="status"
    >
      {/* Top Bar: Subtle Branding & Studio Disciplines */}
      <div className="w-full max-w-7xl flex items-center justify-between z-20">
        <div className="flex items-center gap-3">
          <ReubgLogo variant="dark" className="w-[85px] sm:w-[105px] h-auto object-contain" />
          <span className="text-[10px] text-[#555555] tracking-widest hidden sm:inline-block">
            // PORTFOLIO PREVIEW
          </span>
        </div>

        <div className="text-[10px] sm:text-[11px] font-mono text-[#777777] tracking-[0.25em] uppercase text-right">
          CREATIVE DEVELOPER <span className="text-[#8B6DFF]">×</span> DIGITAL DESIGNER
        </div>
      </div>

      {/* Center Cinematic Work Showcase Canvas */}
      <div className="my-auto flex flex-col items-center justify-center relative z-10 w-full max-w-lg h-[62vh] sm:h-[68vh]">
        {/* Subtle Background Coordinate Glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
          <div className="w-72 h-96 bg-[#8B6DFF]/15 blur-3xl rounded-full" />
        </div>

        {/* Rapid Visual Work Frame */}
        <div className="relative w-full h-full flex items-center justify-center p-2">
          {SEQUENCE_IMAGES.map((imgSrc, idx) => (
            <div
              key={imgSrc}
              className={`absolute inset-0 flex items-center justify-center transition-all duration-200 ease-out ${
                idx === currentIndex
                  ? 'opacity-100 scale-100'
                  : idx === currentIndex - 1
                  ? 'opacity-0 scale-[1.02] pointer-events-none'
                  : 'opacity-0 scale-95 pointer-events-none'
              }`}
            >
              <div className="relative max-h-full aspect-[2/3] bg-[#0E0E0E] border border-white/15 p-1 shadow-2xl overflow-hidden flex items-center justify-center">
                <img
                  src={imgSrc}
                  alt={`Work Preview ${idx + 1}`}
                  className="w-full h-full object-contain filter contrast-125 brightness-95"
                />

                {/* Subtle Scanline Edge */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#8B6DFF]/5 to-transparent pointer-events-none opacity-60" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar: Technical Counter + Minimal Progress Track + Status */}
      <div className="w-full max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4 z-20 pt-2 border-t border-white/10">
        
        {/* Technical Numerical Counter */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-[#8B6DFF] tracking-widest font-mono">
            {currentNumber} / {totalNumber}
          </span>
          <span className="text-[10px] text-[#555555] tracking-widest uppercase">
            FRAMES PROCESSED
          </span>
        </div>

        {/* Minimal Horizontal Progress Track */}
        <div className="w-48 sm:w-64 h-[2px] bg-[#1A1A1A] overflow-hidden relative">
          <div
            className="h-full bg-[#8B6DFF] transition-all duration-200 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Subtitle / Status */}
        <div className="text-[10px] text-[#777777] tracking-[0.2em] uppercase text-right">
          INITIALIZING VISUAL ARCHIVE <span className="text-white font-bold">{progressPercent}%</span>
        </div>

      </div>
    </div>
  );
}
