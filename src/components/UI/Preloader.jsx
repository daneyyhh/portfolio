import React, { useState, useEffect } from 'react';
import ReubgLogo from './ReubgLogo';

// Exactly 5 select master Work images for the cinematic intro preview
const INTRO_IMAGES = [
  { src: '/images/posters/poster-01.jpeg', id: '01' },
  { src: '/images/posters/poster-06.jpeg', id: '02' },
  { src: '/images/posters/poster-09.jpeg', id: '03' },
  { src: '/images/posters/poster-15.jpeg', id: '04' },
  { src: '/images/posters/poster-19.jpeg', id: '05' },
];

export default function Preloader({ onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLifting, setIsLifting] = useState(false);

  useEffect(() => {
    // Check reduced motion preference
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (onComplete) onComplete();
      return;
    }

    // Preload only the 5 intro images
    INTRO_IMAGES.forEach((item) => {
      const img = new Image();
      img.src = item.src;
    });

    const stepDuration = 600; // 0.6s per image
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < INTRO_IMAGES.length) {
        setCurrentIndex(currentStep);
      } else {
        clearInterval(interval);

        // 100% reached on 5th image: brief 200ms hold, then lift curtain upward
        setTimeout(() => {
          setIsLifting(true);

          try {
            sessionStorage.setItem('introShown', 'true');
          } catch (e) {}

          // Complete reveal after upward transition completes (950ms)
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 950);
        }, 200);
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, [onComplete]);

  const currentNumber = String(currentIndex + 1).padStart(2, '0');
  const totalCount = String(INTRO_IMAGES.length).padStart(2, '0');
  const percentage = Math.round(((currentIndex + 1) / INTRO_IMAGES.length) * 100);

  return (
    <div
      className={`fixed inset-0 w-screen h-screen z-[999999] bg-[#0A0A0A] text-[#F1F0EB] flex flex-col justify-between items-center p-6 md:p-10 select-none overflow-hidden font-mono will-change-transform ${
        isLifting ? '-translate-y-full pointer-events-none' : 'translate-y-0'
      }`}
      style={{
        zIndex: 999999,
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        transitionProperty: 'transform',
        transitionDuration: '950ms',
        transitionTimingFunction: 'cubic-bezier(0.76, 0, 0.24, 1)',
      }}
      aria-label="Portfolio Studio Intro"
    >
      {/* Top Header: Brand Identity + Micro Technical Counter in Corner */}
      <div className="w-full max-w-6xl flex items-center justify-between z-20">
        <div className="flex items-center gap-3">
          <ReubgLogo variant="dark" className="w-[85px] sm:w-[100px] h-auto object-contain" />
          <span className="text-[10px] text-[#555555] tracking-widest uppercase hidden sm:inline-block">
            // INTRO
          </span>
        </div>

        {/* Small Technical Counter in Corner */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-[#8B6DFF] font-bold tracking-widest">
            {currentNumber} / {totalCount}
          </span>
          <span className="text-[#555555] text-[10px] tracking-wider">
            [{percentage}%]
          </span>
        </div>
      </div>

      {/* Center Visual Canvas (Large Single Work Frame with Smooth Crossfade) */}
      <div className="my-auto flex items-center justify-center relative z-10 w-full">
        <div className="relative w-[85vw] sm:w-[58vw] max-w-xl aspect-[2/3] sm:aspect-[3/4] max-h-[62vh] bg-[#0E0E0E] border border-white/15 p-1 shadow-2xl overflow-hidden flex items-center justify-center">
          
          {INTRO_IMAGES.map((item, idx) => {
            const isActive = idx === currentIndex;
            const isPrev = idx === currentIndex - 1;

            return (
              <div
                key={item.src}
                className={`absolute inset-0 w-full h-full flex items-center justify-center transition-all duration-500 ease-out ${
                  isActive
                    ? 'opacity-100 scale-100'
                    : isPrev
                    ? 'opacity-0 scale-[0.98] pointer-events-none'
                    : 'opacity-0 scale-[1.02] pointer-events-none'
                }`}
              >
                <img
                  src={item.src}
                  alt={`Creative Work ${item.id}`}
                  className="w-full h-full object-contain filter contrast-115 brightness-95"
                />
              </div>
            );
          })}

          {/* Ultra-subtle film edge vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />
        </div>
      </div>

      {/* Bottom Minimal Footer Bar */}
      <div className="w-full max-w-6xl flex items-center justify-between z-20 pt-3 border-t border-white/10 text-xs">
        <div className="text-[10px] text-[#555555] tracking-widest uppercase font-mono">
          VISUAL PREVIEW // 5 CURATED STUDIES
        </div>

        {/* Micro Purple Progress Track */}
        <div className="flex items-center gap-3">
          <div className="w-24 sm:w-36 h-[1.5px] bg-[#222222] overflow-hidden">
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
