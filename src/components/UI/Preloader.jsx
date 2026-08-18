import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ReubgLogo from './ReubgLogo';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('loading'); // 'loading' | 'completing' | 'done'

  useEffect(() => {
    // Smooth progress simulation handling asset loading continuity
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setPhase('completing');
          
          // Trigger transition sequence at 100%
          setTimeout(() => {
            setPhase('done');
            if (onComplete) onComplete();
          }, 600);
          
          return 100;
        }
        // Controlled progression from 0 -> 100
        const step = Math.floor(Math.random() * 6) + 4;
        return prev + step > 100 ? 100 : prev + step;
      });
    }, 40);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={phase === 'completing' ? { opacity: 1 } : { opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } }}
      className="fixed inset-0 z-[999] bg-[#0A0A0A] text-white flex flex-col justify-between p-8 md:p-16 selection:bg-[#8B6DFF] font-mono overflow-hidden"
    >
      {/* Top Bar Header */}
      <div className="flex justify-between items-center z-10 text-xs text-slate-400 uppercase tracking-widest">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#8B6DFF] animate-pulse"></span>
          <span>REUBG // IMMERSIVE ENGINE</span>
        </div>
        <div className="text-[#8B6DFF]">2026 EDITION</div>
      </div>

      {/* Center Image Logo Asset & Loading Progress */}
      <div className="flex flex-col items-center justify-center z-10 my-auto text-center space-y-6">
        
        {/* Animated Logo Container (Exact Image Asset) */}
        <motion.div
          animate={{
            scale: phase === 'completing' ? [1, 1.1, 1.05] : progress > 20 ? [1, 1.02, 1] : 1,
            filter: phase === 'completing'
              ? 'drop-shadow(0 0 35px rgba(139,109,255,0.9))'
              : progress > 40
              ? 'drop-shadow(0 0 20px rgba(139,109,255,0.5))'
              : 'drop-shadow(0 0 5px rgba(139,109,255,0.2))'
          }}
          transition={{ duration: 0.5 }}
          className="relative px-4"
        >
          <ReubgLogo className="h-16 sm:h-24 md:h-32 lg:h-36 w-auto object-contain" />
        </motion.div>

        {/* Subtitle */}
        <div className="text-xs md:text-sm font-mono text-slate-300 tracking-[0.3em] uppercase pt-2">
          FULL-STACK DEVELOPER
        </div>

        {/* Loading Progress Bar & Percentage */}
        <div className="w-64 md:w-80 space-y-2 pt-2">
          <div className="h-1 w-full bg-white/10 rounded-none overflow-hidden">
            <motion.div
              className="h-full bg-[#8B6DFF] shadow-[0_0_12px_rgba(139,109,255,0.9)]"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
          
          <div className="flex justify-between text-[11px] font-mono text-slate-400">
            <span className="text-[#8B6DFF] uppercase tracking-widest">
              {phase === 'completing' ? 'EXPERIENCE READY' : 'INITIALIZING EXPERIENCE'}
            </span>
            <span className="font-bold text-white">{progress}%</span>
          </div>
        </div>
      </div>

      {/* Bottom Footer Details */}
      <div className="flex justify-between items-center z-10 text-xs text-slate-500 uppercase tracking-widest font-mono">
        <div>REUBEN BINU GEORGE</div>
        <div className="text-[#8B6DFF]">STAY CREATIVE</div>
      </div>
    </motion.div>
  );
}
