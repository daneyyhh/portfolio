import React, { useState, useEffect } from 'react';
import ReubgLogo from './ReubgLogo';

// Exactly 5 unique work images (each appears only once)
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
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // 1. Preload all 5 images before starting sequence
    let loaded = 0;
    INTRO_IMAGES.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loaded++;
        if (loaded >= INTRO_IMAGES.length) {
          setIsReady(true);
        }
      };
      img.onerror = () => {
        loaded++;
        if (loaded >= INTRO_IMAGES.length) {
          setIsReady(true);
        }
      };
    });

    // Fallback in case caching makes onload instantaneous or delayed
    const readyTimeout = setTimeout(() => setIsReady(true), 200);
    return () => clearTimeout(readyTimeout);
  }, []);

  useEffect(() => {
    if (!isReady) return;

    // 2. Stage 01: 5-step smooth dissolve sequence (0.65s per frame)
    const stepDuration = 650;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      if (step < INTRO_IMAGES.length) {
        setCurrentIndex(step);
      } else {
        clearInterval(timer);

        // 3. Stage 02: 100% state hold (250ms on the 5th artwork)
        setTimeout(() => {
          // 4. Stage 03: Physical upward curtain lift (1.2s smooth exit)
          setIsLifting(true);

          setTimeout(() => {
            if (onComplete) onComplete();
          }, 1200);
        }, 250);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isReady, onComplete]);

  const currentNumber = String(currentIndex + 1).padStart(2, '0');
  const totalCount = String(INTRO_IMAGES.length).padStart(2, '0');
  const percentage = Math.round(((currentIndex + 1) / INTRO_IMAGES.length) * 100);

  return (
    <div
      className={`fixed inset-0 w-screen h-screen z-[999999] bg-[#050505] text-[#F1F0EB] flex flex-col justify-between items-center p-6 md:p-10 select-none overflow-hidden font-mono will-change-transform ${
        isLifting ? '-translate-y-[110vh] pointer-events-none' : 'translate-y-0'
      }`}
      style={{
        zIndex: 999999,
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100svh',
        minHeight: '100vh',
        backgroundColor: '#050505',
        transitionProperty: 'transform',
        transitionDuration: '1200ms',
        transitionTimingFunction: 'cubic-bezier(0.76, 0, 0.24, 1)',
      }}
      aria-label="Studio Intro"
    >
      {/* Top Header: Brand Wordmark + Small Micro-Counter in Top-Right */}
      <div className="w-full max-w-6xl flex items-center justify-between z-20">
        <div className="flex items-center gap-3">
          <ReubgLogo variant="dark" className="w-[80px] sm:w-[95px] h-auto object-contain" />
          <span className="text-[10px] text-[#444444] tracking-widest uppercase hidden sm:inline-block">
            // INTRO
          </span>
        </div>

        {/* Small Technical Micro-Counter */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-[#8B6DFF] font-bold tracking-widest">
            {currentNumber} / {totalCount}
          </span>
          <span className="text-[#555555] text-[10px] tracking-wider">
            [{percentage}%]
          </span>
        </div>
      </div>

      {/* Center Frameless Artwork (Floats directly on background, no box/border/stroke) */}
      <div className="my-auto flex items-center justify-center relative z-10 w-full">
        <div
          className={`relative w-[60vw] sm:w-[32vw] max-w-[420px] aspect-[2/3] sm:aspect-[3/4] max-h-[48vh] sm:max-h-[54vh] flex items-center justify-center bg-transparent border-none outline-none shadow-none transition-transform duration-1000 ease-out ${
            isLifting ? 'scale-95' : 'scale-100'
          }`}
          style={{ background: 'transparent', border: 'none', boxShadow: 'none', outline: 'none' }}
        >
          {INTRO_IMAGES.map((src, idx) => {
            const isActive = idx === currentIndex;
            const isPrev = idx === currentIndex - 1;

            return (
              <div
                key={src}
                className={`absolute inset-0 w-full h-full flex items-center justify-center transition-all duration-750 ease-[cubic-bezier(0.65,0,0.35,1)] ${
                  isActive
                    ? 'opacity-100 scale-100 z-10'
                    : isPrev
                    ? 'opacity-0 scale-[0.98] z-0 pointer-events-none'
                    : 'opacity-0 scale-[1.02] z-0 pointer-events-none'
                }`}
                style={{
                  transitionDuration: '750ms',
                  transitionTimingFunction: 'cubic-bezier(0.65, 0, 0.35, 1)'
                }}
              >
                <img
                  src={src}
                  alt={`Artwork Preview ${idx + 1}`}
                  className="w-full h-full object-contain filter contrast-110 brightness-95 select-none"
                  style={{ background: 'transparent', border: 'none', boxShadow: 'none' }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Minimal Progress Track */}
      <div className="w-full max-w-6xl flex items-center justify-between z-20 pt-3 border-t border-white/10 text-xs">
        <div className="text-[10px] text-[#444444] tracking-widest uppercase font-mono">
          VISUAL ARCHIVE // 5 STUDIES
        </div>

        {/* Micro Purple Progress Track */}
        <div className="flex items-center gap-3">
          <div className="w-20 sm:w-32 h-[1.5px] bg-[#1A1A1A] overflow-hidden">
            <div
              className="h-full bg-[#8B6DFF] transition-all duration-500 ease-out"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <span className="text-[10px] text-[#777777] font-mono tracking-wider">
            {percentage === 100 ? 'ENTER' : 'LOAD'}
          </span>
        </div>
      </div>
    </div>
  );
}
