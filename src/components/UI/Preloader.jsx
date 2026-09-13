import React, { useState, useEffect, useRef } from 'react';
import ReubgLogo from './ReubgLogo';

// Smooth cubic-bezier easing for exit curtain transition
function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('INITIALIZING CORE');
  const [exitPhase, setExitPhase] = useState(0); // 0 = loading, 0..1 = exiting
  const canvasRef = useRef(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  // Particle background canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 32 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5 + 0.5,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.4 + 0.1,
      baseAlpha: Math.random() * 0.4 + 0.1,
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw subtle ambient grid points
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 30, 39, ${p.alpha * 0.6})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Main Loading Timeline
  useEffect(() => {
    const totalDuration = 2400; // 2.4s active loading
    const exitDuration = 650;   // 0.65s smooth curtain transition
    const startTime = performance.now();
    let frameId;

    const tick = (now) => {
      const elapsed = now - startTime;
      const rawProgress = Math.min(1, elapsed / totalDuration);

      // Smooth custom deceleration curve
      const easedProgress = Math.min(100, Math.floor(Math.pow(rawProgress, 0.85) * 100));
      setProgress(easedProgress);

      // Dynamic telemetry stages
      if (easedProgress < 25) {
        setStatusText('INITIALIZING CORE ENGINE');
      } else if (easedProgress < 55) {
        setStatusText('CONFIGURING 3D ENVIRONMENT');
      } else if (easedProgress < 85) {
        setStatusText('COMPILING SHADERS & ASSETS');
      } else if (easedProgress < 100) {
        setStatusText('CALIBRATING INTERFACE');
      } else {
        setStatusText('SYSTEM READY // LAUNCHING');
      }

      if (rawProgress < 1) {
        frameId = requestAnimationFrame(tick);
      } else {
        // Exit transition phase
        const exitStartTime = performance.now();
        const exitTick = (exitNow) => {
          const exitElapsed = exitNow - exitStartTime;
          const exitProg = Math.min(1, exitElapsed / exitDuration);
          setExitPhase(exitProg);

          if (exitProg < 1) {
            frameId = requestAnimationFrame(exitTick);
          } else {
            if (onCompleteRef.current) {
              onCompleteRef.current();
            }
          }
        };
        frameId = requestAnimationFrame(exitTick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, []);

  // Exit interpolation calculations
  const translateY = easeInOutCubic(exitPhase) * -105;
  const opacity = 1 - Math.pow(exitPhase, 2);
  const scale = 1 - exitPhase * 0.05;

  return (
    <div
      className="fixed inset-0 z-[999999] w-screen h-screen bg-[#070709] text-white flex flex-col justify-between p-6 sm:p-10 select-none overflow-hidden font-mono pointer-events-none will-change-transform"
      style={{
        transform: `translate3d(0, ${translateY}vh, 0) scale3d(${scale}, ${scale}, 1)`,
        opacity: opacity,
      }}
      aria-label="Loading Application"
    >
      {/* Background Particle Layer & Subtle Ambient Glow */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-70"
      />
      
      {/* Subtle Central Radial Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, rgba(255, 30, 39, 0.06) 0%, rgba(7, 7, 9, 0) 70%)',
        }}
      />

      {/* Top Telemetry Header */}
      <div className="w-full max-w-6xl mx-auto flex items-center justify-between text-[10px] sm:text-xs text-white/40 z-10 tracking-widest uppercase">
        <div className="flex items-center gap-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF1E27] animate-pulse shadow-[0_0_8px_#FF1E27]" />
          <span>REUBG // PORTFOLIO</span>
        </div>
        <div className="hidden sm:flex items-center gap-4">
          <span>LAT 12.97° N</span>
          <span className="text-white/20">•</span>
          <span>EST. 2026</span>
        </div>
      </div>

      {/* Center Hero Logo & Minimalist Loading Core */}
      <div className="my-auto flex flex-col items-center justify-center text-center z-10 space-y-7 sm:space-y-8 max-w-xl mx-auto w-full px-4">
        
        {/* Prominent Brand Logo with Subtle Ambient Floating Effect */}
        <div className="relative group flex items-center justify-center">
          <div className="absolute -inset-6 bg-[#FF1E27]/10 rounded-full blur-2xl opacity-50 group-hover:opacity-100 transition-opacity" />
          <ReubgLogo
            variant="dark"
            className="w-[180px] sm:w-[240px] md:w-[280px] h-auto object-contain drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)] relative z-10"
          />
        </div>

        {/* Minimal Subtitle */}
        <div className="space-y-1">
          <p className="text-[10px] sm:text-xs font-mono text-white/50 tracking-[0.3em] sm:tracking-[0.4em] uppercase font-medium">
            FULL-STACK × CREATIVE ENGINEER
          </p>
        </div>

        {/* Refined Custom Progress Track */}
        <div className="w-full max-w-[280px] sm:max-w-[340px] space-y-3">
          
          {/* 2px Precision Progress Bar */}
          <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden relative">
            <div
              className="h-full bg-gradient-to-r from-[#FF1E27]/60 via-[#FF1E27] to-[#FF4D58] transition-all duration-150 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              {/* Glowing leading head tip */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#FF1E27] shadow-[0_0_10px_#FF1E27]" />
            </div>
          </div>

          {/* Status Text & Numerical Percentage */}
          <div className="flex items-center justify-between text-[10px] font-mono tracking-wider pt-0.5">
            <span className="text-white/60 flex items-center gap-1.5 truncate max-w-[190px] sm:max-w-[220px]">
              <span className="text-[#FF1E27] font-bold">›</span>
              {statusText}
            </span>
            <span className="text-[#FF1E27] font-bold tabular-nums">
              {progress.toString().padStart(2, '0')}%
            </span>
          </div>

        </div>

      </div>

      {/* Bottom Telemetry Footer */}
      <div className="w-full max-w-6xl mx-auto flex items-center justify-between text-[10px] text-white/30 z-10 tracking-widest uppercase border-t border-white/5 pt-3">
        <div className="flex items-center gap-2">
          <span>REACT + THREE.JS ENGINE</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400/80 animate-pulse" />
          <span>ALL SYSTEMS NOMINAL</span>
        </div>
      </div>

    </div>
  );
}
