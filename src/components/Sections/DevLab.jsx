import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { FlaskConical, Terminal, Activity, Sparkles, Filter } from 'lucide-react';
import { devLabExperiments } from '../../data/devLabData';
import ExperimentCard from '../DevLab/ExperimentCard';
import ExperimentDetailModal from '../DevLab/ExperimentDetailModal';
import { MaskHeading, FadeInUp } from '../UI/TextReveal';

const EASE = [0.16, 1, 0.3, 1];

export default function DevLab() {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [selectedExperiment, setSelectedExperiment] = useState(null);
  const prefersReduced = useReducedMotion();

  // Extract only categories that actually have experiments
  const categories = useMemo(() => {
    const uniqueCats = Array.from(new Set(devLabExperiments.map((e) => e.category)));
    return ['ALL', ...uniqueCats];
  }, []);

  // Filter experiments based on selected category
  const filteredExperiments = useMemo(() => {
    if (activeCategory === 'ALL') return devLabExperiments;
    return devLabExperiments.filter((e) => e.category === activeCategory);
  }, [activeCategory]);

  // Compute status metrics for laboratory telemetry
  const telemetry = useMemo(() => {
    const total = devLabExperiments.length;
    const experiments = devLabExperiments.filter((e) => e.status === 'EXPERIMENT').length;
    const inDev = devLabExperiments.filter((e) => e.status === 'IN DEVELOPMENT').length;
    const archived = devLabExperiments.filter((e) => e.status === 'ARCHIVED').length;
    return { total, experiments, inDev, archived };
  }, []);

  return (
    <section
      id="devlab"
      className="py-24 sm:py-32 px-4 sm:px-6 md:px-12 bg-[#0A0A0A] text-[#F1F0EB] relative border-t border-white/10 font-mono w-full overflow-x-clip"
      aria-label="REUBG DEV LAB Experimental Playground"
    >
      {/* Background Matrix Coordinates & Watermark */}
      <div className="absolute top-10 right-8 text-[10px] text-white/5 uppercase select-none pointer-events-none hidden xl:block leading-relaxed tracking-widest text-right">
        [REUBG // DEV LAB]<br />
        CREATIVE ENGINEERING SANDBOX<br />
        SHADERS · THREE.JS · GSAP · WEBGL
      </div>

      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16 relative z-10 w-full">
        
        {/* Section Header: Left Index + Masked Title + Philosophy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-end border-b border-white/10 pb-8 sm:pb-10 w-full">
          
          {/* Left Vertical Tag / Section Index */}
          <div className="hidden lg:flex lg:col-span-1 flex-col items-center justify-start h-full">
            <motion.div
              initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 0.6, ease: EASE }}
              className="font-mono text-4xl font-extrabold text-[#FF1E27]"
            >
              07
            </motion.div>
            <motion.div
              initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
              className="vertical-tag font-mono text-xs text-stone-400 uppercase tracking-[0.3em] font-bold mt-6"
            >
              DEV LAB
            </motion.div>
          </div>

          {/* Center Title and Mission Statement */}
          <div className="lg:col-span-7 space-y-4 w-full max-w-full">
            <motion.div
              initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 0.6, ease: EASE }}
              className="text-xs text-[#FF1E27] font-bold uppercase tracking-widest flex items-center gap-2"
            >
              <FlaskConical size={16} />
              <span>EXPERIMENTAL CREATIVE LABORATORY</span>
            </motion.div>

            <MaskHeading
              lines={["REUBG DEV LAB"]}
              className="font-syne font-extrabold text-white uppercase tracking-tight w-full max-w-full"
              style={{
                fontSize: 'clamp(2.2rem, 7vw, 4.25rem)',
                letterSpacing: 'clamp(-0.03em, -0.2vw, -0.01em)',
              }}
              delay={0.15}
            />

            <motion.p
              initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 0.6, delay: 0.25, ease: EASE }}
              className="font-sans text-stone-300 text-sm sm:text-base leading-relaxed max-w-2xl"
            >
              <strong>These are things I'm experimenting with.</strong> An open sandbox for interactive 3D, custom GLSL shaders, kinetic typography choreographies, and creative code prototypes. Not traditional portfolio case studies — pure technical exploration.
            </motion.p>
          </div>

          {/* Right Column: Laboratory Telemetry Console */}
          <div className="lg:col-span-4 w-full">
            <motion.div
              initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
              className="border border-white/10 bg-[#0E0E12] p-4 space-y-3"
            >
              <div className="flex items-center justify-between text-[11px] border-b border-white/10 pb-2 text-stone-300">
                <div className="flex items-center gap-1.5 text-[#FF1E27]">
                  <Activity size={13} />
                  <span className="font-bold">SYSTEM TELEMETRY</span>
                </div>
                <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  LIVE
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-stone-400">
                <div>
                  <span className="text-stone-500 block uppercase">TOTAL EXPERIMENTS:</span>
                  <strong className="text-white text-xs">{telemetry.total}</strong>
                </div>
                <div>
                  <span className="text-stone-500 block uppercase">ACTIVE SHADERS/3D:</span>
                  <strong className="text-[#FF1E27] text-xs">WebGL 2.0</strong>
                </div>
                <div>
                  <span className="text-stone-500 block uppercase">STAGE EXPERIMENT:</span>
                  <strong className="text-stone-200 text-xs">{telemetry.experiments}</strong>
                </div>
                <div>
                  <span className="text-stone-500 block uppercase">IN DEVELOPMENT:</span>
                  <strong className="text-amber-400 text-xs">{telemetry.inDev}</strong>
                </div>
              </div>
            </motion.div>
          </div>

        </div>

        {/* Category Filter Pills (Only categories with experiments) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="flex items-center gap-2 text-xs text-stone-400 uppercase tracking-wider">
            <Filter size={14} className="text-[#FF1E27]" />
            <span>DISCIPLINE:</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {categories.map((category) => {
              const isActive = activeCategory === category;
              const count = category === 'ALL'
                ? devLabExperiments.length
                : devLabExperiments.filter((e) => e.category === category).length;

              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-3 py-1.5 text-xs font-mono font-bold tracking-wider uppercase border transition-all duration-200 cursor-pointer flex items-center gap-1.5 relative ${
                    isActive
                      ? 'bg-[#FF1E27] text-white border-[#FF1E27] shadow-sm'
                      : 'bg-white/5 text-stone-300 border-white/10 hover:border-white/30 hover:text-white'
                  }`}
                >
                  <span>{category}</span>
                  <span
                    className={`text-[10px] px-1 rounded-sm ${
                      isActive ? 'bg-black/30 text-white' : 'text-stone-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Experiment Cards Grid (Desktop: Editorial 2/3 column grid; Mobile: Clean vertical sequence) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full">
          <AnimatePresence mode="popLayout">
            {filteredExperiments.map((experiment, idx) => (
              <ExperimentCard
                key={experiment.id}
                experiment={experiment}
                index={idx}
                onOpen={(exp) => setSelectedExperiment(exp)}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Bottom Technical Note */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-stone-500 font-mono">
          <div className="flex items-center gap-2">
            <Terminal size={14} className="text-[#FF1E27]" />
            <span>ALL EXPERIMENTS RUN REAL-TIME CLIENT-SIDE GPU SHADERS & 3D LOOPS</span>
          </div>
          <span className="text-[10px] text-stone-600 uppercase tracking-widest">
            SOURCE LICENSED MIT // REUBEN BINU GEORGE
          </span>
        </div>

      </div>

      {/* Full-Screen Experiment Detail Modal */}
      {selectedExperiment && (
        <ExperimentDetailModal
          experiment={selectedExperiment}
          onClose={() => setSelectedExperiment(null)}
        />
      )}
    </section>
  );
}
