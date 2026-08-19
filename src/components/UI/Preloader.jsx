import React, { useState, useEffect, useRef } from 'react';
import ReubgLogo from './ReubgLogo';

// All 24 authentic Work images from the visual archive
const WORK_IMAGES = Array.from({ length: 24 }, (_, i) => {
  const num = String(i + 1).padStart(2, '0');
  return `/images/posters/poster-${num}.jpeg`;
});

export default function Preloader({ onComplete }) {
  const [counter, setCounter] = useState(1);
  const [isLifting, setIsLifting] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    // Preload all 24 sequence images immediately
    WORK_IMAGES.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    const totalDuration = 3000; // 3 seconds for 01 -> 100 sequence
    const startTime = performance.now();
    let frameId;

    const animateSequence = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(1, elapsed / totalDuration);

      // Smooth mathematical easing curve for counting 1 to 100
      const currentNumber = Math.max(1, Math.min(100, Math.floor(progress * 99) + 1));
      setCounter(currentNumber);

      // Map 1-100 to the 24 images continuously cycling
      const imgIdx = (currentNumber - 1) % WORK_IMAGES.length;
      setActiveImageIndex(imgIdx);

      if (progress < 1) {
        frameId = requestAnimationFrame(animateSequence);
      } else {
        setCounter(100);
        setActiveImageIndex((100 - 1) % WORK_IMAGES.length);

        // Pause briefly on the 100th frame (220ms hold)
        setTimeout(() => {
          // Trigger physical upward curtain lift
          setIsLifting(true);

          try {
            sessionStorage.setItem('reubg_intro_seen', 'true');
          } catch (e) {}

          // Complete reveal after upward transition finishes (1000ms)
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 1050);
        }, 220);
      }
    };

    frameId = requestAnimationFrame(animateSequence);
    return () => cancelAnimationFrame(frameId);
  }, [onComplete]);

  const formattedNumber = String(counter).padStart(2, '0');

  return (
    <div
      className={`fixed inset-0 w-screen h-screen z-[999999] bg-[#0A0A0A] text-[#F1F0EB] flex flex-col justify-between items-center p-6 md:p-12 select-none overflow-hidden font-mono will-change-transform ${
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
        transitionDuration: '1000ms',
        transitionTimingFunction: 'cubic-bezier(0.76, 0, 0.24, 1)',
      }}
      aria-label="Portfolio Loading Reel"
    >
      {/* Top Header: Brand Identity + Technical Mode */}
      <div className="w-full max-w-7xl flex items-center justify-between z-20">
        <div className="flex items-center gap-3">
          <ReubgLogo variant="dark" className="w-[85px] sm:w-[105px] h-auto object-contain" />
          <span className="text-[10px] text-[#555555] tracking-widest uppercase hidden sm:inline-block">
            // VISUAL REEL
          </span>
        </div>

        <div className="text-[10px] sm:text-xs font-mono text-[#777777] tracking-[0.25em] uppercase">
          01 <span className="text-[#8B6DFF]">→</span> 100
        </div>
      </div>

      {/* Center Cinematic Film-Strip Canvas (Large Artwork + Synchronous Number) */}
      <div className="my-auto flex flex-col items-center justify-center relative z-10 w-full max-w-xl">
        
        {/* Large Prominent Changing Number (01 → 100) */}
        <div className="w-full flex items-baseline justify-between mb-3 px-2">
          <div className="font-syne text-5xl sm:text-7xl md:text-8xl font-extrabold text-white tracking-tighter leading-none">
            {formattedNumber}
          </div>
          <div className="text-right space-y-0.5">
            <div className="text-[10px] text-[#8B6DFF] font-bold tracking-widest uppercase">
              FRAME // {String(activeImageIndex + 1).padStart(2, '0')}
            </div>
            <div className="text-[9px] text-[#555555] tracking-wider uppercase hidden sm:block">
              300 DPI MASTER REEL
            </div>
          </div>
        </div>

        {/* Large Centered Artwork Frame (Preserves Proportions, Rapid Sequence Update) */}
        <div className="relative w-full aspect-[3/4] sm:aspect-[4/5] max-h-[58vh] bg-[#111111] border border-white/15 overflow-hidden shadow-2xl flex items-center justify-center">
          <img
            key={WORK_IMAGES[activeImageIndex]}
            src={WORK_IMAGES[activeImageIndex]}
            alt={`Reel ${formattedNumber}`}
            className="w-full h-full object-cover filter contrast-115 brightness-95"
            loading="eager"
          />

          {/* Film Reel Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

          {/* Thin Purple Scanning Line Indicator */}
          <div
            className="absolute bottom-0 left-0 h-[2px] bg-[#8B6DFF] transition-all duration-75 ease-out"
            style={{ width: `${counter}%` }}
          />
        </div>

      </div>

      {/* Bottom Footer Bar: Coordinates & Status */}
      <div className="w-full max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-3 z-20 pt-4 border-t border-white/10 text-xs">
        <div className="flex items-center gap-3 text-[#555555] text-[10px]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#8B6DFF] animate-pulse" />
          <span className="tracking-widest uppercase">
            FILM STRIP SEQUENCE // 24 MASTER ASSETS
          </span>
        </div>

        <div className="text-[10px] text-[#777777] tracking-[0.2em] uppercase text-right">
          PROGRESSION // <span className="text-white font-bold">{counter}%</span>
        </div>
      </div>
    </div>
  );
}
