import React, { useState, useEffect, useRef } from 'react';
import ReubgLogo from './ReubgLogo';

// 5 unique master work images (each appears only once)
const INTRO_IMAGES = [
  '/images/posters/poster-01.jpeg',
  '/images/posters/poster-06.jpeg',
  '/images/posters/poster-09.jpeg',
  '/images/posters/poster-15.jpeg',
  '/images/posters/poster-19.jpeg',
];

// High-precision cubic-bezier(0.77, 0, 0.175, 1) for physical curtain release
function easeCurtain(t) {
  return t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export default function Preloader({ onComplete }) {
  const [animState, setAnimState] = useState({
    progress: 0,
    activeIdxA: 0,
    activeIdxB: 1,
    opacityA: 1,
    opacityB: 0,
    scaleA: 1,
    scaleB: 1.015,
    curtainY: 0,
    artworkScale: 1,
    currentStep: 1,
    isComplete: false,
  });

  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    // 1. Preload all 5 images
    INTRO_IMAGES.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    const totalDuration = 3200; // 3.2s continuous master timeline
    const startTime = performance.now();
    let frameId;

    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / totalDuration);

      // Phase 1: 0.00 -> 0.82 (Continuous mathematical image cross-dissolve)
      const imagePhaseEnd = 0.82;
      let idxA = 0;
      let idxB = 1;
      let opA = 1;
      let opB = 0;
      let scA = 1;
      let scB = 1.015;
      let stepNum = 1;

      if (progress < imagePhaseEnd) {
        const rawIndex = (progress / imagePhaseEnd) * (INTRO_IMAGES.length - 1);
        idxA = Math.floor(rawIndex);
        idxB = Math.min(INTRO_IMAGES.length - 1, idxA + 1);
        const fract = rawIndex - idxA;

        // Smooth cross-dissolve: outgoing scales down 1.00 -> 0.985, incoming settles 1.015 -> 1.00
        opA = 1 - fract;
        opB = fract;
        scA = 1.0 - fract * 0.015;
        scB = 1.015 - fract * 0.015;
        stepNum = Math.min(5, Math.floor(rawIndex) + 1);
      } else {
        // Hold final 5th image (100% state)
        idxA = INTRO_IMAGES.length - 1;
        idxB = INTRO_IMAGES.length - 1;
        opA = 1;
        opB = 0;
        scA = 1;
        scB = 1;
        stepNum = 5;
      }

      // Phase 2: 0.82 -> 1.00 (Continuous smooth upward curtain release)
      let curtainY = 0;
      let artworkScale = 1;
      if (progress >= imagePhaseEnd) {
        const exitProgress = (progress - imagePhaseEnd) / (1 - imagePhaseEnd);
        const eased = easeCurtain(exitProgress);
        curtainY = -eased * 115; // translateY(-115vh)
        artworkScale = 1.0 - eased * 0.06; // artwork scales down 1.0 -> 0.94 as it rises
      }

      setAnimState({
        progress,
        activeIdxA: idxA,
        activeIdxB: idxB,
        opacityA: opA,
        opacityB: opB,
        scaleA: scA,
        scaleB: scB,
        curtainY,
        artworkScale,
        currentStep: stepNum,
        isComplete: progress >= 1,
      });

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      } else {
        if (onCompleteRef.current) {
          onCompleteRef.current();
        }
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, []);

  const {
    activeIdxA,
    activeIdxB,
    opacityA,
    opacityB,
    scaleA,
    scaleB,
    curtainY,
    artworkScale,
    currentStep,
    progress
  } = animState;

  const isHundred = progress >= 0.80;
  const percentage = isHundred ? 100 : Math.round((currentStep / 5) * 100);

  return (
    <div
      className="fixed inset-0 w-screen h-screen z-[999999] text-[#111111] flex flex-col justify-between items-center p-6 md:p-10 select-none overflow-hidden font-mono will-change-transform pointer-events-none"
      style={{
        zIndex: 999999,
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100svh',
        minHeight: '100vh',
        backgroundColor: '#F1F0EB', // 100% Exact match with landing page background
        transform: `translate3d(0, ${curtainY}vh, 0)`,
      }}
      aria-label="Studio Intro"
    >
      {/* Top Header: Brand Wordmark + Micro Counter */}
      <div className="w-full max-w-6xl flex items-center justify-between z-20">
        <div className="flex items-center gap-3">
          <ReubgLogo variant="light" className="w-[78px] sm:w-[92px] h-auto object-contain" />
          <span className="text-[10px] text-[#777777] tracking-widest uppercase hidden sm:inline-block">
            // STUDIO INTRO
          </span>
        </div>

        {/* Small Micro-Counter */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-[#8B6DFF] font-bold tracking-widest">
            0{currentStep} / 05
          </span>
          <span className="text-[#777777] text-[10px] tracking-wider">
            [{percentage}%]
          </span>
        </div>
      </div>

      {/* Center Frameless Floating Artwork (Zero Box, Pure Floating on Landing Background) */}
      <div className="my-auto flex items-center justify-center relative z-10 w-full">
        <div
          className="relative w-[58vw] sm:w-[30vw] max-w-[380px] aspect-[2/3] sm:aspect-[3/4] max-h-[46vh] sm:max-h-[52vh] flex items-center justify-center bg-transparent border-none outline-none shadow-none"
          style={{
            background: 'transparent',
            border: 'none',
            outline: 'none',
            boxShadow: 'none',
            transform: `scale3d(${artworkScale}, ${artworkScale}, 1)`
          }}
        >
          {/* Layer A */}
          <div
            className="absolute inset-0 w-full h-full flex items-center justify-center will-change-transform"
            style={{
              opacity: opacityA,
              transform: `scale3d(${scaleA}, ${scaleA}, 1)`,
            }}
          >
            <img
              src={INTRO_IMAGES[activeIdxA]}
              alt=""
              className="w-full h-full object-contain filter contrast-110 brightness-95 select-none"
              style={{ background: 'transparent', border: 'none', boxShadow: 'none' }}
            />
          </div>

          {/* Layer B */}
          <div
            className="absolute inset-0 w-full h-full flex items-center justify-center will-change-transform"
            style={{
              opacity: opacityB,
              transform: `scale3d(${scaleB}, ${scaleB}, 1)`,
            }}
          >
            <img
              src={INTRO_IMAGES[activeIdxB]}
              alt=""
              className="w-full h-full object-contain filter contrast-110 brightness-95 select-none"
              style={{ background: 'transparent', border: 'none', boxShadow: 'none' }}
            />
          </div>
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="w-full max-w-6xl flex items-center justify-between z-20 pt-3 border-t border-[#C9C7C0] text-xs">
        <div className="text-[10px] text-[#777777] tracking-widest uppercase font-mono">
          VISUAL REEL // 5 STUDIES
        </div>

        {/* Continuous Progress Track */}
        <div className="flex items-center gap-3">
          <div className="w-20 sm:w-32 h-[1.5px] bg-[#D8D6CF] overflow-hidden">
            <div
              className="h-full bg-[#8B6DFF] will-change-transform"
              style={{ width: `${Math.min(100, Math.round((progress / 0.82) * 100))}%` }}
            />
          </div>
          <span className="text-[10px] text-[#666666] font-mono tracking-wider">
            {isHundred ? 'ENTER' : 'LOAD'}
          </span>
        </div>
      </div>
    </div>
  );
}
