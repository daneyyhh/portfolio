import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ReubgLogo from './ReubgLogo';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('loading'); // 'loading' | 'completing' | 'done'

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setPhase('completing');
          
          setTimeout(() => {
            setPhase('done');
            if (onComplete) onComplete();
          }, 500);
          
          return 100;
        }
        const step = Math.floor(Math.random() * 6) + 4;
        return prev + step > 100 ? 100 : prev + step;
      });
    }, 40);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } }}
      className="fixed inset-0 z-[999] bg-[#0A0A0A] text-white flex flex-col justify-center items-center p-6 md:p-12 font-mono overflow-hidden selection:bg-[#8B6DFF] selection:text-white"
    >
      {/* Centered Pre-loader Hierarchy */}
      <div className="flex flex-col items-center justify-center text-center space-y-8 w-full max-w-2xl my-auto z-10">
        
        {/* 1. LARGE REUBG LOGO (420px–500px on Desktop, Clean sitting on #0A0A0A without any glow box) */}
        <motion.div
          animate={phase === 'completing' ? { scale: [1, 1.03, 1] } : { scale: 1 }}
          transition={{ duration: 0.4 }}
          className="flex justify-center w-full"
        >
          <ReubgLogo variant="dark" className="w-[clamp(240px,75vw,360px)] md:w-[clamp(320px,35vw,500px)] h-auto" />
        </motion.div>

        {/* 2. FULL-STACK DEVELOPER */}
        <div className="text-xs md:text-sm font-mono text-slate-300 tracking-[0.3em] uppercase">
          FULL-STACK DEVELOPER
        </div>

        {/* 3. PROGRESS BAR LINE */}
        <div className="w-64 md:w-96 space-y-3 pt-2">
          <div className="h-[2px] w-full bg-white/10 rounded-none overflow-hidden">
            <motion.div
              className="h-full bg-[#8B6DFF]"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
          
          {/* 4. INITIALIZING EXPERIENCE + PERCENTAGE */}
          <div className="flex justify-between text-[11px] font-mono text-slate-400">
            <span className="text-[#8B6DFF] uppercase tracking-widest">
              {phase === 'completing' ? 'EXPERIENCE READY' : 'INITIALIZING EXPERIENCE'}
            </span>
            <span className="font-bold text-white">{progress}%</span>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
