import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { Play, Pause, RotateCcw } from 'lucide-react';

export default function KineticTypeCanvas({
  isDetail = false,
  interactive = true,
  className = ""
}) {
  const containerRef = useRef(null);
  const timelineRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  const PHRASE = "REUBG // EXPERIMENTAL KINETIC TIMELINE";
  const words = ["KINETIC", "PROTOTYPE", "GSAP 3", "SUB-FRAME", "ACCELERATION"];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const chars = container.querySelectorAll('.kinetic-char');
      const lines = container.querySelectorAll('.kinetic-slice');

      const tl = gsap.timeline({
        repeat: -1,
        yoyo: true,
        onUpdate: () => {
          setProgress(Math.round(tl.progress() * 100));
        }
      });

      timelineRef.current = tl;

      // 1. Kinetic Staggered Wave
      tl.to(chars, {
        y: (i) => Math.sin(i * 0.45) * -24,
        scaleY: 1.15,
        color: '#FF1E27',
        stagger: {
          each: 0.035,
          from: 'center'
        },
        duration: 0.9,
        ease: 'power3.out'
      })
      // 2. Skew and slice displacement
      .to(lines, {
        skewX: (i) => (i % 2 === 0 ? 12 : -12),
        x: (i) => (i % 2 === 0 ? 15 : -15),
        duration: 0.7,
        ease: 'expo.inOut'
      }, "-=0.4")
      // 3. Return and contract
      .to(chars, {
        y: 0,
        scaleY: 1,
        color: '#F1F0EB',
        stagger: {
          each: 0.02,
          from: 'edges'
        },
        duration: 0.7,
        ease: 'power2.inOut'
      });
    }, container);

    // Mouse velocity tilt on hover
    let lastX = 0;
    const onMouseMove = (e) => {
      const dx = e.clientX - lastX;
      lastX = e.clientX;
      const targetSkew = Math.max(-15, Math.min(15, dx * 0.4));
      gsap.to('.kinetic-wrapper', {
        skewX: targetSkew,
        duration: 0.4,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    };

    if (interactive) {
      container.addEventListener('mousemove', onMouseMove, { passive: true });
    }

    return () => {
      if (interactive) {
        container.removeEventListener('mousemove', onMouseMove);
      }
      ctx.revert();
    };
  }, [interactive]);

  const togglePlay = () => {
    if (!timelineRef.current) return;
    if (timelineRef.current.paused()) {
      timelineRef.current.play();
      setIsPlaying(true);
    } else {
      timelineRef.current.pause();
      setIsPlaying(false);
    }
  };

  const restartTimeline = () => {
    if (!timelineRef.current) return;
    timelineRef.current.restart();
    setIsPlaying(true);
  };

  const handleScrub = (e) => {
    const val = parseFloat(e.target.value);
    setProgress(val);
    if (timelineRef.current) {
      timelineRef.current.pause();
      timelineRef.current.progress(val / 100);
      setIsPlaying(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full min-h-[220px] bg-[#0A0A0A] flex flex-col justify-between p-6 select-none overflow-hidden font-mono ${className}`}
    >
      {/* Top HUD Tag */}
      <div className="flex items-center justify-between w-full z-10">
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#0A0A0A]/80 border border-white/10 font-mono text-[9px] text-[#FF1E27] tracking-wider uppercase backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF1E27] animate-pulse" />
          <span>GSAP 3 // TIMELINE: {progress}%</span>
        </span>
        <span className="text-[10px] text-stone-500 uppercase tracking-widest hidden sm:inline">
          [RAF SYNCHRONIZED TIMELINE]
        </span>
      </div>

      {/* Main Kinetic Typography Stage */}
      <div className="kinetic-wrapper my-auto py-4 space-y-2 w-full text-center">
        {/* Upper Sliced Ribbon */}
        <div className="kinetic-slice flex justify-center flex-wrap gap-1 sm:gap-2 text-xl sm:text-3xl lg:text-4xl font-syne font-black tracking-tight text-[#F1F0EB] uppercase">
          {"KINETIC CHOREOGRAPHY".split("").map((c, i) => (
            <span
              key={i}
              className="kinetic-char inline-block transition-colors"
            >
              {c === " " ? "\u00A0" : c}
            </span>
          ))}
        </div>

        {/* Lower Sliced Sub-banner */}
        <div className="kinetic-slice flex justify-center items-center gap-3 text-[10px] sm:text-xs text-[#FF1E27] font-mono tracking-[0.25em] font-bold uppercase">
          <span>// INTERPOLATION: CUBIC-BEZIER</span>
          <span className="w-1.5 h-1.5 bg-[#FF1E27] rounded-full" />
          <span>STEPPED SUB-FRAME</span>
        </div>
      </div>

      {/* Detail Mode Interactive Scrubber Controls */}
      {isDetail ? (
        <div className="z-20 flex flex-wrap items-center justify-between gap-3 bg-[#111111]/90 border border-white/10 p-2.5 backdrop-blur-md text-xs mt-2">
          <div className="flex items-center gap-2">
            <button
              onClick={togglePlay}
              className="p-1.5 border border-white/15 bg-white/5 hover:border-[#FF1E27] text-white transition-colors"
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} />}
            </button>
            <button
              onClick={restartTimeline}
              className="p-1.5 border border-white/15 bg-white/5 hover:border-[#FF1E27] text-white transition-colors"
              title="Restart"
            >
              <RotateCcw size={14} />
            </button>
            <span className="text-[11px] text-stone-400 ml-1">SCRUB TIMELINE:</span>
          </div>

          <div className="flex-1 min-w-[140px] max-w-xs flex items-center gap-2">
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleScrub}
              className="w-full accent-[#FF1E27] cursor-pointer"
            />
            <span className="text-[10px] text-[#FF1E27] w-8">{progress}%</span>
          </div>

          <span className="text-[10px] text-stone-500 hidden md:inline">
            MOVE CURSOR ACROSS BOX TO TRIGGER DYNAMIC SKEW
          </span>
        </div>
      ) : (
        <div className="text-[10px] text-stone-500 text-right">
          <span>HOVER CURSOR TO PERTURB VELOCITY</span>
        </div>
      )}
    </div>
  );
}
