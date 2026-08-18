import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Play, RefreshCw, Sparkles } from 'lucide-react';

export default function Playground() {
  const [speed, setSpeed] = useState(2);
  const [color, setColor] = useState('#ccff00');
  const [particleCount, setParticleCount] = useState(30);
  const [shape, setShape] = useState('OCTAHEDRON');

  return (
    <section id="playground" className="py-24 px-6 md:px-12 bg-[#050507] relative overflow-hidden border-t border-white/10 font-mono">
      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#ccff00] tracking-widest uppercase mb-2">
              <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-pulse"></span>
              <span>LIVE CODE EXPERIMENT</span>
            </div>
            <h2 className="font-syne text-4xl md:text-6xl font-extrabold text-white uppercase tracking-tight">
              TRY THE CODE
            </h2>
          </div>
          <p className="text-xs text-slate-400 max-w-md">
            Interactive lightweight code playground allowing visitors to adjust visual properties and see real-time canvas updates.
          </p>
        </div>

        {/* Playground Split Editor & Canvas Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Code Controls */}
          <div className="lg:col-span-6 bg-[#0f0f13] border border-white/15 p-6 rounded-sm space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2 text-xs text-[#ccff00]">
                <Code2 size={16} />
                <span>THREEJS_CONFIG.JS</span>
              </div>
              <span className="text-[10px] text-slate-400 uppercase">EDITABLE PARAMETERS</span>
            </div>

            <div className="space-y-4 text-xs">
              {/* Shape Selector */}
              <div>
                <label className="block text-slate-300 mb-2">GEOMETRY SHAPE:</label>
                <div className="flex gap-2">
                  {['OCTAHEDRON', 'CUBE', 'TORUS'].map((s) => (
                    <button
                      key={s}
                      onClick={() => setShape(s)}
                      className={`px-3 py-1.5 border text-xs font-mono transition-all ${
                        shape === s
                          ? 'bg-[#ccff00] text-black border-[#ccff00] font-bold'
                          : 'bg-white/5 border-white/10 text-slate-300'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Speed Slider */}
              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>ROTATION SPEED:</span>
                  <span className="text-[#ccff00] font-bold">{speed}x</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="5"
                  step="0.5"
                  value={speed}
                  onChange={(e) => setSpeed(parseFloat(e.target.value))}
                  className="w-full accent-[#ccff00] bg-slate-800"
                />
              </div>

              {/* Color Picker Buttons */}
              <div>
                <label className="block text-slate-300 mb-2">ACCENT GLOW COLOR:</label>
                <div className="flex gap-3">
                  {[
                    { label: 'NEON LIME', hex: '#ccff00' },
                    { label: 'CYBER PURPLE', hex: '#a855f7' },
                    { label: 'ELECTRIC CYAN', hex: '#00f0ff' }
                  ].map((c) => (
                    <button
                      key={c.hex}
                      onClick={() => setColor(c.hex)}
                      className={`px-3 py-1 border text-xs flex items-center gap-2 ${
                        color === c.hex ? 'border-white text-white font-bold' : 'border-white/10 text-slate-400'
                      }`}
                    >
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: c.hex }} />
                      <span>{c.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Code Output Sandbox */}
              <div className="bg-[#050507] border border-[#ccff00]/30 p-4 rounded-sm text-[11px] text-[#ccff00] overflow-x-auto">
                <pre>
                  <code>
{`const scene = new THREE.Scene();
const mesh = new THREE.Mesh(
  new THREE.${shape === 'OCTAHEDRON' ? 'OctahedronGeometry' : shape === 'CUBE' ? 'BoxGeometry' : 'TorusGeometry'}(),
  new THREE.MeshStandardMaterial({ color: '${color}' })
);
mesh.rotation.y += ${speed * 0.01};`}
                  </code>
                </pre>
              </div>
            </div>
          </div>

          {/* Right Column: Live Visual Canvas Output */}
          <div className="lg:col-span-6 bg-[#09090b] border border-white/15 p-6 rounded-sm flex flex-col items-center justify-center relative min-h-[350px]">
            <div className="absolute top-4 left-4 text-[10px] text-[#ccff00]">
              LIVE VISUAL OUTPUT
            </div>

            {/* Simulated Animated Interactive Geometry Mesh */}
            <motion.div
              animate={{
                rotate: 360,
                scale: [1, 1.05, 1],
              }}
              transition={{
                rotate: { duration: 10 / speed, repeat: Infinity, ease: 'linear' },
                scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
              }}
              style={{
                borderColor: color,
                boxShadow: `0 0 35px ${color}66`
              }}
              className={`w-36 h-36 border-4 flex items-center justify-center relative ${
                shape === 'OCTAHEDRON' ? 'rotate-45 rounded-sm' : shape === 'TORUS' ? 'rounded-full' : 'rounded-none'
              }`}
            >
              <div
                className="w-16 h-16 border-2 border-white opacity-80"
                style={{ backgroundColor: color }}
              />
            </motion.div>

            <div className="mt-8 text-xs text-slate-400">
              Interactive WebGL Simulation // Rendering at 60 FPS
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
