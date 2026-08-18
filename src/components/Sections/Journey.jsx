import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, Zap, Layout, Globe, Bot, ChevronRight } from 'lucide-react';
import { journeySteps } from '../../data/portfolioData';

export default function Journey({ engineerMode }) {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="journey" className="py-24 px-6 md:px-12 bg-[#09090b] relative overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#ccff00] tracking-widest uppercase mb-2">
              <span className="w-2 h-2 rounded-full bg-[#ccff00]"></span>
              <span>CREATIVE DEVELOPMENT EVOLUTION</span>
            </div>
            <h2 className="font-syne text-4xl md:text-6xl font-extrabold text-white uppercase tracking-tight">
              GAME DEV → FULL-STACK JOURNEY
            </h2>
          </div>
          <p className="font-mono text-xs text-slate-400 max-w-md">
            Evolution from C# Unity game engines and LUA multiplayer scripting into full-stack web applications and AI/ML algorithms.
          </p>
        </div>

        {/* Horizontal Stepper Pipeline */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {journeySteps.map((item, index) => {
            const isActive = activeStep === index;

            return (
              <button
                key={item.step}
                onClick={() => setActiveStep(index)}
                className={`p-4 rounded-sm border font-mono text-left transition-all duration-300 ${
                  isActive
                    ? 'bg-[#ccff00] text-black border-[#ccff00] font-bold shadow-[0_0_20px_rgba(204,255,0,0.3)]'
                    : 'bg-[#0f0f13] border-white/10 text-slate-300 hover:border-white/30'
                }`}
              >
                <div className="flex justify-between items-center text-xs mb-2">
                  <span>STEP {item.step}</span>
                  <span className="text-base">{item.icon}</span>
                </div>
                <div className="font-syne font-extrabold text-sm uppercase leading-tight">
                  {item.phase}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Journey Stage Card */}
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-[#0f0f13] border border-white/15 p-8 rounded-sm space-y-6 relative overflow-hidden"
        >
          <div className="flex flex-wrap justify-between items-center border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <span className="font-mono text-3xl font-extrabold text-[#ccff00]">
                {journeySteps[activeStep].step}
              </span>
              <div>
                <h3 className="font-syne text-2xl font-bold text-white uppercase tracking-tight">
                  {journeySteps[activeStep].phase}
                </h3>
                <div className="font-mono text-xs text-purple-400 uppercase tracking-widest">
                  TECH STACK: {journeySteps[activeStep].tech}
                </div>
              </div>
            </div>

            <span className="font-mono text-4xl">{journeySteps[activeStep].icon}</span>
          </div>

          <p className="font-sans text-slate-300 text-base md:text-lg leading-relaxed">
            {journeySteps[activeStep].desc}
          </p>

          {engineerMode && (
            <div className="bg-[#050507] border border-[#ccff00]/30 p-3 rounded-sm font-mono text-xs text-[#ccff00]">
              <code>
                {`[EVOLUTION MILESTONE] Phase: ${journeySteps[activeStep].phase} | Core: ${journeySteps[activeStep].tech} | Verified CV Record`}
              </code>
            </div>
          )}

          {/* Nav Buttons */}
          <div className="flex justify-between items-center pt-4 border-t border-white/10 font-mono text-xs">
            <button
              disabled={activeStep === 0}
              onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
              className="text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed uppercase"
            >
              ← PREVIOUS PHASE
            </button>

            <button
              disabled={activeStep === journeySteps.length - 1}
              onClick={() => setActiveStep(prev => Math.min(journeySteps.length - 1, prev + 1))}
              className="text-[#ccff00] font-bold hover:underline disabled:opacity-30 disabled:cursor-not-allowed uppercase flex items-center gap-1"
            >
              <span>NEXT PHASE</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
