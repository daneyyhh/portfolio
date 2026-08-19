import React, { useState, useEffect } from 'react';
import ReubgLogo from './ReubgLogo';

const SEQUENCE_IMAGES = [
  '/images/posters/poster-01.jpeg',
  '/images/posters/poster-02.jpeg',
  '/images/posters/poster-03.jpeg',
  '/images/posters/poster-04.jpeg',
  '/images/posters/poster-05.jpeg',
  '/images/posters/poster-06.jpeg',
  '/images/posters/poster-07.jpeg',
  '/images/posters/poster-08.jpeg',
];

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [isSlidingUp, setIsSlidingUp] = useState(false);

  useEffect(() => {
    // Preload images immediately
    SEQUENCE_IMAGES.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    const isReturning = typeof window !== 'undefined' && sessionStorage.getItem('reubg_visited');
    const totalDuration = isReturning ? 1400 : 2200; // ms
    const startTime = performance.now();

    const updateLoader = (now) => {
      const elapsed = now - startTime;
      const rawProgress = Math.min(1, elapsed / totalDuration);
      
      // Studio Olimpo style smooth eased counter
      const currentPct = Math.floor(rawProgress * 100);
      setProgress(currentPct);

      // Cycle through 8 images synchronized with progress (0-100%)
      const imgIdx = Math.min(
        SEQUENCE_IMAGES.length - 1,
        Math.floor(rawProgress * SEQUENCE_IMAGES.length)
      );
      setActiveImageIdx(imgIdx);

      if (rawProgress < 1) {
        requestAnimationFrame(updateLoader);
      } else {
        setProgress(100);
        setActiveImageIdx(SEQUENCE_IMAGES.length - 1);

        // Hold frame briefly at 100% then execute Studio Olimpo curtain slide-up reveal
        setTimeout(() => {
          setIsSlidingUp(true);
          try {
            sessionStorage.setItem('reubg_visited', 'true');
          } catch (e) {}

          setTimeout(() => {
            if (onComplete) onComplete();
          }, 850); // Matches smooth cubic-bezier(0.53, 0, 0, 1) transition
        }, 120);
      }
    };

    const animId = requestAnimationFrame(updateLoader);
    return () => cancelAnimationFrame(animId);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 w-screen h-screen z-[999999] bg-[#0A0A0A] text-[#F1F0EB] flex flex-col justify-center items-center select-none overflow-hidden font-mono transition-transform duration-800 ease-[cubic-bezier(0.53,0,0,1)] ${
        isSlidingUp ? '-translate-y-full' : 'translate-y-0'
      }`}
      style={{
        zIndex: 999999,
        transitionDuration: '800ms',
        transitionTimingFunction: 'cubic-bezier(0.53, 0, 0, 1)',
      }}
    >
      {/* Centered Editorial Container (Studio Olimpo Layout) */}
      <div className="w-full max-w-[420px] sm:max-w-[480px] md:max-w-[520px] px-6 flex flex-col gap-3">
        
        {/* Top Header: Brand Name + 0-100 Progress Number */}
        <div className="flex items-center justify-between text-xs sm:text-sm font-mono tracking-widest text-[#F1F0EB]">
          <div className="flex items-center gap-2">
            <ReubgLogo variant="dark" className="w-[78px] sm:w-[90px] h-auto object-contain" />
          </div>
          <div className="text-right text-[#8B6DFF] font-bold">
            {progress}
          </div>
        </div>

        {/* Center Visual: Ratio-Vertical Window with Rapid Sequenced Work Images */}
        <div className="relative w-full aspect-[3/4] sm:aspect-[4/5] bg-[#111111] overflow-hidden border border-white/10 shadow-2xl">
          {SEQUENCE_IMAGES.map((src, i) => (
            <div
              key={src}
              className={`absolute inset-0 w-full h-full transition-opacity duration-150 ease-out ${
                i === activeImageIdx ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <img
                src={src}
                alt=""
                className="w-full h-full object-cover filter contrast-110 brightness-95"
              />
            </div>
          ))}

          {/* Ultra subtle ambient vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none z-20" />
        </div>

      </div>
    </div>
  );
}
