import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [currentText, setCurrentText] = useState('INITIALIZING REUBG.EXE...');

  useEffect(() => {
    const textSequence = [
      'INITIALIZING REUBG.EXE...',
      'LOADING THREE.JS ENGINE...',
      'CONNECTING AI/ML PIPELINE...',
      'COMPILING FULL-STACK MODULES...',
      'SYSTEM READY.'
    ];

    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 400);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 8) + 4;
        const textIdx = Math.min(Math.floor((next / 100) * textSequence.length), textSequence.length - 1);
        setCurrentText(textSequence[textIdx]);
        return next > 100 ? 100 : next;
      });
    }, 40);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[100] bg-[#050507] text-white flex flex-col justify-between p-8 md:p-16 selection:bg-[#ccff00] selection:text-black font-mono overflow-hidden"
    >
      {/* Background Grid & Scanlines */}
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <div className="absolute inset-0 scanline opacity-30 pointer-events-none" />

      {/* Top Header */}
      <div className="flex justify-between items-center z-10 text-xs text-slate-400 tracking-widest uppercase">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-pulse"></span>
          <span>REUBG.EXE // CORE_V2.5</span>
        </div>
        <div>2026 EDITION</div>
      </div>

      {/* Center Geometric Logo & Title (Inspired by uploaded reference images) */}
      <div className="flex flex-col items-center justify-center z-10 my-auto text-center">
        {/* Futuristic sharp reubg lettering */}
        <div className="relative mb-6">
          <h1 className="font-syne text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter text-white uppercase select-none drop-shadow-[0_0_25px_rgba(168,85,247,0.3)]">
            reub<span className="text-[#ccff00]">g</span>
          </h1>
          {/* Node line styling matching reference image */}
          <div className="flex items-center justify-center gap-2 mt-2">
            <span className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_#a855f7]"></span>
            <div className="h-[2px] w-32 md:w-56 bg-gradient-to-r from-purple-500 via-[#ccff00] to-purple-500"></div>
            <span className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_#a855f7]"></span>
          </div>
        </div>

        <div className="font-mono text-xs md:text-sm text-slate-300 tracking-[0.3em] uppercase mb-8">
          FULL-STACK DEVELOPER <span className="text-[#ccff00]">•</span> UI/UX DESIGNER <span className="text-[#ccff00]">•</span> AI ENTHUSIAST
        </div>

        {/* Progress Bar */}
        <div className="w-64 md:w-96 space-y-2">
          <div className="h-1.5 w-full bg-slate-900 rounded-none overflow-hidden border border-white/10 p-0.5">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 to-[#ccff00] shadow-[0_0_12px_rgba(204,255,0,0.8)]"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
          <div className="flex justify-between text-[11px] font-mono text-slate-400">
            <span className="text-[#ccff00] animate-pulse">{currentText}</span>
            <span className="font-bold text-white">{progress}%</span>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="flex justify-between items-center z-10 text-xs text-slate-500 uppercase tracking-widest font-mono">
        <div>REUBEN BINU GEORGE</div>
        <div className="text-[#ccff00]">STAY CREATIVE</div>
      </div>
    </motion.div>
  );
}
