import React, { useState, useEffect, useRef } from 'react';
import ReubgLogo from './ReubgLogo';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // Smooth deterministic progress increment
    let currentProgress = 0;
    const startTime = performance.now();
    const duration = 1300; // 1.3 seconds total loading experience
    let animationFrameId;

    const updateProgress = (now) => {
      const elapsed = now - startTime;
      const progressFraction = Math.min(elapsed / duration, 1);
      
      // Easing curve: fast start, steady middle, clean snap to 100
      const eased = Math.min(1, Math.pow(progressFraction, 0.85));
      currentProgress = Math.round(eased * 100);
      setProgress(currentProgress);

      if (progressFraction < 1) {
        animationFrameId = requestAnimationFrame(updateProgress);
      } else {
        setProgress(100);
        // Clean hold at 100% then smooth dissolve
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 450);
        }, 220);
      }
    };

    animationFrameId = requestAnimationFrame(updateProgress);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#0A0A0A] flex flex-col justify-center items-center select-none overflow-hidden transition-opacity duration-450 ease-out ${
        isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{ minHeight: '100dvh', height: '100vh', width: '100vw' }}
      aria-label="Loading portfolio"
      role="status"
    >
      {/* Centered Composition with Generous Spacing */}
      <div
        className={`flex flex-col items-center justify-center text-center w-full px-6 max-w-xl mx-auto space-y-7 sm:space-y-8 md:space-y-10 z-10 transition-all duration-500 ease-out ${
          isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}
      >
        
        {/* 1. BRAND LOGO (Large, crisp, sitting directly on #0A0A0A, no box, no glow) */}
        <div className="w-[min(74vw,300px)] sm:w-[380px] md:w-[480px] max-w-[520px] flex items-center justify-center shrink-0">
          <ReubgLogo
            variant="dark"
            className="w-full h-auto object-contain max-h-[140px] md:max-h-[180px]"
          />
        </div>

        {/* 2. SUBTITLE */}
        <div className="text-[11px] sm:text-xs md:text-sm font-mono text-[#A0A0A0] tracking-[0.35em] uppercase font-medium">
          FULL-STACK DEVELOPER
        </div>

        {/* 3. MINIMAL PROGRESS BAR & STATUS */}
        <div className="w-[min(78vw,320px)] sm:w-[350px] md:w-[420px] max-w-[440px] space-y-2.5 pt-1 sm:pt-2">
          
          {/* Status Label & Percentage (INITIALIZING EXPERIENCE on left, percentage on right) */}
          <div className="flex justify-between items-center text-[10px] sm:text-[11px] font-mono tracking-widest uppercase">
            <span className="text-[#8B6DFF] font-semibold">
              {progress >= 100 ? 'INITIALIZING EXPERIENCE' : 'INITIALIZING EXPERIENCE'}
            </span>
            <span className="font-bold text-[#F1F0EB] tabular-nums">
              {progress}%
            </span>
          </div>

          {/* Minimal 2px Rectangular Progress Bar Track (No glow, no pill shape, no gradient) */}
          <div className="w-full h-[2px] bg-[#1A1A1A] rounded-none overflow-hidden relative">
            <div
              className="h-full bg-[#8B6DFF] rounded-none transition-all duration-75 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

        </div>

      </div>
    </div>
  );
}
