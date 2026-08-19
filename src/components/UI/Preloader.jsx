import React, { useState, useEffect } from 'react';
import ReubgLogo from './ReubgLogo';

const INTRO_IMAGES = [
  '/images/posters/poster-01.jpeg',
  '/images/posters/poster-06.jpeg',
  '/images/posters/poster-09.jpeg',
  '/images/posters/poster-15.jpeg',
  '/images/posters/poster-19.jpeg',
];

export default function Preloader({ onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLifting, setIsLifting] = useState(false);

  useEffect(() => {
    // 1. Preload the 5 intro images
    INTRO_IMAGES.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    // 2. Controlled 5-step sequence (each image shown exactly once)
    const stepDuration = 600; // 0.6s per image
    let step = 0;

    const timer = setInterval(() => {
      step++;
      if (step < INTRO_IMAGES.length) {
        setCurrentIndex(step);
      } else {
        clearInterval(timer);

        // 3. Pause briefly on 5th frame (100%), then slide upward
        setTimeout(() => {
          setIsLifting(true);

          // 4. Complete unmount after 1000ms upward curtain lift
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 1000);
        }, 250);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [onComplete]);

  const currentNumber = String(currentIndex + 1).padStart(2, '0');
  const totalCount = String(INTRO_IMAGES.length).padStart(2, '0');
  const percentage = Math.round(((currentIndex + 1) / INTRO_IMAGES.length) * 100);

  return (
    <div
      className={`fixed inset-0 w-screen h-screen z-[999999] bg-[#050505] text-[#F1F0EB] flex flex-col justify-between items-center p-6 md:p-10 select-none overflow-hidden font-mono will-change-transform ${
        isLifting ? '-translate-y-full pointer-events-none' : 'translate-y-0'
      }`}
      style={{
        zIndex: 999999,
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#050505',
        opacity: 1,
        visibility: 'visible',
        transitionProperty: 'transform',
        transitionDuration: '1000ms',
        transitionTimingFunction: 'cubic-bezier(0.76, 0, 0.24, 1)',
      }}
      aria-label="Studio Intro"
    >
      {/* Top Header: Brand Wordmark + Small Micro-Counter in Top-Right */}
      <div className="w-full max-w-6xl flex items-center justify-between z-20">
        <div className="flex items-center gap-3">
          <ReubgLogo variant="dark" className="w-[85px] sm:w-[100px] h-auto object-contain" />
          <span className="text-[10px] text-[#555555] tracking-widest uppercase hidden sm:inline-block">
            // STUDIO INTRO
          </span>
        </div>

        {/* Small Technical Micro-Counter */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-[#8B6DFF] font-bold tracking-widest">
            {currentNumber} / {totalCount}
          </span>
          <span className="text-[#666666] text-[10px] tracking-wider">
            [{percentage}%]
          </span>
        </div>
      </div>

      {/* Center Artwork Canvas (Large Work Frame with Smooth Crossfade) */}
      <div className="my-auto flex items-center justify-center relative z-10 w-full">
        <div className="relative w-[85vw] sm:w-[58vw] max-w-xl aspect-[2/3] sm:aspect-[3/4] max-h-[62vh] bg-[#0A0A0A] border border-white/15 p-1 shadow-2xl overflow-hidden flex items-center justify-center">
          
          {INTRO_IMAGES.map((src, idx) => {
            const isActive = idx === currentIndex;
            const isPrev = idx === currentIndex - 1;

            return (
              <div
                key={src}
                className={`absolute inset-0 w-full h-full flex items-center justify-center transition-all duration-500 ease-out ${
                  isActive
                    ? 'opacity-100 scale-100'
                    : isPrev
                    ? 'opacity-0 scale-[0.98] pointer-events-none'
                    : 'opacity-0 scale-[1.02] pointer-events-none'
                }`}
              >
                <img
                  src={src}
                  alt={`Work ${idx + 1}`}
                  className="w-full h-full object-contain filter contrast-115 brightness-95"
                />
              </div>
            );
          })}

          {/* Film Edge Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />
        </div>
      </div>

      {/* Bottom Minimal Status Bar */}
      <div className="w-full max-w-6xl flex items-center justify-between z-20 pt-3 border-t border-white/10 text-xs">
        <div className="text-[10px] text-[#555555] tracking-widest uppercase font-mono">
          VISUAL ARCHIVE // 5 SELECT MASTER WORKS
        </div>

        {/* Micro Purple Progress Track */}
        <div className="flex items-center gap-3">
          <div className="w-24 sm:w-36 h-[1.5px] bg-[#1A1A1A] overflow-hidden">
            <div
              className="h-full bg-[#8B6DFF] transition-all duration-500 ease-out"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <span className="text-[10px] text-[#888888] font-mono tracking-wider">
            {percentage === 100 ? 'ENTER' : 'LOAD'}
          </span>
        </div>
      </div>
    </div>
  );
}
