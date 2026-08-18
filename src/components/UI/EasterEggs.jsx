import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, X, Sparkles } from 'lucide-react';

export default function EasterEggs() {
  const [konamiUnlocked, setKonamiUnlocked] = useState(false);
  const [gameModeActive, setGameModeActive] = useState(false);
  const [keySequence, setKeySequence] = useState([]);

  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.key === 'g' || e.key === 'G') && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
        setGameModeActive(prev => !prev);
      }

      setKeySequence(prev => {
        const updated = [...prev, e.key].slice(-10);
        if (JSON.stringify(updated) === JSON.stringify(konamiCode)) {
          setKonamiUnlocked(true);
        }
        return updated;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      {/* Konami Unlock Banner Notification */}
      <AnimatePresence>
        {konamiUnlocked && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-20 right-6 z-[200] bg-[#8B6DFF] text-white font-mono border border-white p-4 shadow-2xl rounded-none flex items-center gap-4 text-xs"
          >
            <Sparkles className="animate-spin" size={20} />
            <div>
              <div className="font-extrabold text-sm uppercase">DEVELOPER ACCESS GRANTED</div>
              <div className="text-[11px] text-white/90">Konami Cheat Code Activated // Cyber Overdrive Active</div>
            </div>
            <button
              onClick={() => setKonamiUnlocked(false)}
              className="p-1 hover:bg-white hover:text-[#8B6DFF] transition-colors"
            >
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Secret Game Mode Overlay ('G' Key Trigger) */}
      <AnimatePresence>
        {gameModeActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-[200] bg-[#0A0A0A]/95 backdrop-blur-2xl flex flex-col justify-between p-6 md:p-12 font-mono text-white selection:bg-[#8B6DFF] selection:text-white overflow-hidden"
          >
            {/* Top Bar */}
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <Gamepad2 className="animate-bounce text-[#8B6DFF]" size={24} />
                <span className="font-syne font-extrabold text-lg md:text-xl text-white tracking-widest uppercase">
                  REUBG GAME LAB // MINI ARCADE
                </span>
              </div>
              <button
                onClick={() => setGameModeActive(false)}
                className="bg-[#8B6DFF] text-white px-4 py-2 font-bold hover:bg-[#7a5ceb] flex items-center gap-2 text-xs"
              >
                <X size={18} />
                <span>EXIT GAME MODE</span>
              </button>
            </div>

            {/* Game Canvas Box */}
            <div className="flex-1 flex flex-col items-center justify-center my-6 relative border border-white/10 bg-[#141414] p-6 text-center">
              <div className="w-16 h-16 bg-[#8B6DFF]/10 border-2 border-[#8B6DFF] flex items-center justify-center mb-6">
                <Gamepad2 size={36} className="text-[#8B6DFF]" />
              </div>
              
              <h2 className="font-syne text-3xl md:text-5xl font-extrabold text-white mb-2 uppercase">
                BCA GAME DEV ENGINE MODE
              </h2>
              
              <p className="text-slate-400 text-xs md:text-sm max-w-lg mb-8 leading-relaxed font-sans">
                Reuben George specialized in 3D Game Development in BCA. C# physics engines, custom shaders, and low-level game loops form the core of his creative engineering background.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-xl text-xs font-mono">
                <div className="bg-[#0A0A0A] border border-white/10 p-3">
                  <span className="block text-white font-bold mb-1">C# PHYSICS</span>
                  <span className="text-[#8B6DFF]">60 FPS ENGINE</span>
                </div>
                <div className="bg-[#0A0A0A] border border-white/10 p-3">
                  <span className="block text-white font-bold mb-1">UNITY 3D</span>
                  <span className="text-[#8B6DFF]">URP SHADERS</span>
                </div>
                <div className="bg-[#0A0A0A] border border-white/10 p-3">
                  <span className="block text-white font-bold mb-1">THREE.JS</span>
                  <span className="text-[#8B6DFF]">WEBGL SHADERS</span>
                </div>
                <div className="bg-[#0A0A0A] border border-white/10 p-3">
                  <span className="block text-white font-bold mb-1">LUA CORE</span>
                  <span className="text-[#8B6DFF]">TICK RATE &lt; 0.02ms</span>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="flex justify-between items-center text-xs text-slate-400 border-t border-white/10 pt-4">
              <div>PRESS <span className="text-[#8B6DFF] font-bold">G</span> ANYTIME TO TOGGLE GAME MODE</div>
              <div>REUBG.IN // GAME DEV EXPERIENCE</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
