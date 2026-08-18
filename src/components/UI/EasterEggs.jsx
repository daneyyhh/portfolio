import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, X, Terminal, Sparkles } from 'lucide-react';

export default function EasterEggs() {
  const [konamiUnlocked, setKonamiUnlocked] = useState(false);
  const [gameModeActive, setGameModeActive] = useState(false);
  const [keySequence, setKeySequence] = useState([]);

  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Check for Game Mode 'g' key when not typing in inputs
      if ((e.key === 'g' || e.key === 'G') && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
        setGameModeActive(prev => !prev);
      }

      // Track Konami Code
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
            className="fixed top-20 right-6 z-[200] bg-[#ccff00] text-black font-mono border-2 border-black p-4 shadow-2xl rounded-sm flex items-center gap-4"
          >
            <Sparkles className="animate-spin" size={24} />
            <div>
              <div className="font-extrabold text-sm uppercase">DEVELOPER ACCESS GRANTED!</div>
              <div className="text-xs">Konami Cheat Code Activated // Cyber Overdrive Active</div>
            </div>
            <button
              onClick={() => setKonamiUnlocked(false)}
              className="p-1 hover:bg-black hover:text-[#ccff00] rounded-sm transition-colors"
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
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-6 md:p-12 font-mono text-[#ccff00] selection:bg-[#ccff00] selection:text-black overflow-hidden"
          >
            {/* Top Bar */}
            <div className="flex justify-between items-center border-b border-[#ccff00]/30 pb-4">
              <div className="flex items-center gap-3">
                <Gamepad2 className="animate-bounce" size={24} />
                <span className="font-syne font-extrabold text-lg md:text-xl text-white tracking-widest uppercase">
                  REUBG GAME LAB // MINI ARCADE
                </span>
              </div>
              <button
                onClick={() => setGameModeActive(false)}
                className="bg-[#ccff00] text-black p-2 font-bold hover:bg-[#b8ff00] rounded-sm flex items-center gap-2 text-xs"
              >
                <X size={18} />
                <span>EXIT GAME MODE</span>
              </button>
            </div>

            {/* Game Canvas Box */}
            <div className="flex-1 flex flex-col items-center justify-center my-6 relative border border-[#ccff00]/20 bg-[#050507] rounded-sm p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-[#ccff00]/10 border-2 border-[#ccff00] flex items-center justify-center mb-6 shadow-[0_0_25px_rgba(204,255,0,0.5)]">
                <Gamepad2 size={36} />
              </div>
              
              <h2 className="font-syne text-3xl md:text-5xl font-extrabold text-white mb-2 uppercase">
                BCA GAME DEV ENGINE MODE
              </h2>
              
              <p className="text-slate-400 text-xs md:text-sm max-w-lg mb-8 leading-relaxed">
                Reuben George specialized in 3D Game Development in BCA. C# physics engines, custom shaders, and low-level game loops form the core of his creative engineering background.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-xl text-xs font-mono">
                <div className="bg-[#0f0f13] border border-[#ccff00]/30 p-3 rounded-sm">
                  <span className="block text-white font-bold mb-1">C# PHYSICS</span>
                  <span className="text-[#ccff00]">60 FPS ENGINE</span>
                </div>
                <div className="bg-[#0f0f13] border border-[#ccff00]/30 p-3 rounded-sm">
                  <span className="block text-white font-bold mb-1">UNITY 3D</span>
                  <span className="text-[#ccff00]">URP SHADERS</span>
                </div>
                <div className="bg-[#0f0f13] border border-[#ccff00]/30 p-3 rounded-sm">
                  <span className="block text-white font-bold mb-1">THREE.JS</span>
                  <span className="text-[#ccff00]">WEBGL SHADERS</span>
                </div>
                <div className="bg-[#0f0f13] border border-[#ccff00]/30 p-3 rounded-sm">
                  <span className="block text-white font-bold mb-1">LUA CORE</span>
                  <span className="text-[#ccff00]">TICK RATE &lt; 0.02ms</span>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="flex justify-between items-center text-xs text-slate-400 border-t border-[#ccff00]/30 pt-4">
              <div>PRESS <span className="text-[#ccff00] font-bold">G</span> ANYTIME TO TOGGLE GAME MODE</div>
              <div>REUBG.IN // GAME DEV EXPERIENCE</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
