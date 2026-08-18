import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ReubgLogo from './ReubgLogo';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 350);
          return 100;
        }
        return prev + Math.floor(Math.random() * 8) + 5;
      });
    }, 45);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[100] bg-[#0A0A0A] text-white flex flex-col justify-between p-8 md:p-16 selection:bg-[#8B6DFF] font-mono overflow-hidden"
    >
      {/* Top Header */}
      <div className="flex justify-between items-center z-10 text-xs text-slate-400 uppercase tracking-widest">
        <div>REUBG // EXPERIENCE</div>
        <div className="text-[#8B6DFF]">2026 EDITION</div>
      </div>

      {/* Center reubg logo and progress bar */}
      <div className="flex flex-col items-center justify-center z-10 my-auto text-center space-y-6">
        {/* Exact User Uploaded Logo Image */}
        <ReubgLogo className="h-16 sm:h-24 md:h-32 lg:h-36 w-auto filter drop-shadow-[0_0_20px_rgba(139,109,255,0.4)]" />

        <div className="text-xs md:text-sm text-slate-300 tracking-[0.3em] uppercase pt-2">
          FULL-STACK DEVELOPER
        </div>

        {/* Progress Bar & Percentage */}
        <div className="w-64 md:w-80 space-y-2 pt-2">
          <div className="h-1 w-full bg-white/10 rounded-none overflow-hidden">
            <motion.div
              className="h-full bg-[#8B6DFF]"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
          <div className="flex justify-between text-[11px] text-slate-400">
            <span className="text-[#8B6DFF] animate-pulse">INITIALIZING EXPERIENCE...</span>
            <span className="font-bold text-white">{progress}%</span>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="flex justify-between items-center z-10 text-xs text-slate-500 uppercase tracking-widest font-mono">
        <div>REUBEN BINU GEORGE</div>
        <div>STAY CREATIVE</div>
      </div>
    </motion.div>
  );
}
