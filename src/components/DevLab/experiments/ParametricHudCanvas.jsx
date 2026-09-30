import React, { useRef, useState, useEffect } from 'react';

export default function ParametricHudCanvas({
  isDetail = false,
  interactive = true,
  className = ""
}) {
  const containerRef = useRef(null);
  const [coords, setCoords] = useState({ x: 120, y: 80 });
  const [activeLayer, setActiveLayer] = useState('ALL'); // 'ALL' | 'RADAR' | 'GRID'

  const handlePointerMove = (e) => {
    if (!interactive || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const cx = e.clientX ?? (e.touches && e.touches[0]?.clientX) ?? 0;
    const cy = e.clientY ?? (e.touches && e.touches[0]?.clientY) ?? 0;
    
    const x = Math.max(0, Math.min(rect.width, cx - rect.left));
    const y = Math.max(0, Math.min(rect.height, cy - rect.top));

    setCoords({ x: Math.round(x), y: Math.round(y) });

    containerRef.current.style.setProperty('--mouse-x', `${x}px`);
    containerRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.setProperty('--mouse-x', '140px');
      containerRef.current.style.setProperty('--mouse-y', '90px');
    }
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handlePointerMove}
      onTouchMove={handlePointerMove}
      className={`relative w-full h-full min-h-[220px] bg-[#08080A] p-4 font-mono select-none overflow-hidden flex flex-col justify-between cursor-crosshair border border-white/5 ${className}`}
      style={{
        '--mouse-x': '140px',
        '--mouse-y': '90px'
      }}
    >
      {/* 1. Underlying CSS Grid Lines */}
      {(activeLayer === 'ALL' || activeLayer === 'GRID') && (
        <div
          className="absolute inset-0 pointer-events-none opacity-25"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)
            `,
            backgroundSize: '24px 24px'
          }}
        />
      )}

      {/* 2. Interactive Following Reticle via CSS Variables */}
      <div
        className="absolute pointer-events-none transition-transform duration-75 ease-out z-10"
        style={{
          transform: `translate3d(calc(var(--mouse-x) - 40px), calc(var(--mouse-y) - 40px), 0)`
        }}
      >
        <div className="w-20 h-20 border border-[#FF1E27]/50 rounded-full flex items-center justify-center relative">
          <div className="w-2 h-2 bg-[#FF1E27] rounded-full animate-ping" />
          <div className="w-1 h-1 bg-white rounded-full" />
          {/* Crosshair ticks */}
          <span className="absolute -top-1 w-2 h-[1px] bg-[#FF1E27]" />
          <span className="absolute -bottom-1 w-2 h-[1px] bg-[#FF1E27]" />
          <span className="absolute -left-1 h-2 w-[1px] bg-[#FF1E27]" />
          <span className="absolute -right-1 h-2 w-[1px] bg-[#FF1E27]" />
        </div>
      </div>

      {/* 3. Conic Gradient Radar Sweep */}
      {(activeLayer === 'ALL' || activeLayer === 'RADAR') && (
        <div className="absolute right-4 top-4 w-28 h-28 border border-white/10 rounded-full overflow-hidden pointer-events-none hidden sm:block">
          <div
            className="w-full h-full rounded-full animate-spin"
            style={{
              animationDuration: '4s',
              background: 'conic-gradient(from 0deg, rgba(255,30,39,0.3) 0deg, transparent 60deg, transparent 360deg)'
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[8px] text-[#FF1E27] tracking-tighter">RADAR 360°</span>
          </div>
        </div>
      )}

      {/* Top Header Telemetry */}
      <div className="relative z-10 flex items-center justify-between w-full">
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#0A0A0A]/90 border border-white/10 font-mono text-[9px] text-[#FF1E27] tracking-wider uppercase backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF1E27] animate-pulse" />
          <span>PARAMETRIC CSS // HUD MATRIX</span>
        </span>
        <div className="text-[10px] text-stone-400 font-mono flex items-center gap-3">
          <span>X: <strong className="text-white">{coords.x}</strong></span>
          <span>Y: <strong className="text-white">{coords.y}</strong></span>
        </div>
      </div>

      {/* Center Layout Diagnostic Grid (Pure Modern CSS Grid) */}
      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-2 my-auto py-2">
        <div className="border border-white/10 p-2 bg-black/40 backdrop-blur-sm">
          <span className="text-[9px] text-stone-500 block uppercase">SUBSYSTEM</span>
          <span className="text-xs text-stone-200 font-bold">GRID_ARCH.01</span>
        </div>
        <div className="border border-white/10 p-2 bg-black/40 backdrop-blur-sm">
          <span className="text-[9px] text-stone-500 block uppercase">FREQUENCY</span>
          <span className="text-xs text-[#FF1E27] font-bold">48.24 MHz</span>
        </div>
        <div className="border border-white/10 p-2 bg-black/40 backdrop-blur-sm">
          <span className="text-[9px] text-stone-500 block uppercase">DISPERSION</span>
          <span className="text-xs text-stone-200 font-bold">0.048 RAD</span>
        </div>
        <div className="border border-white/10 p-2 bg-black/40 backdrop-blur-sm">
          <span className="text-[9px] text-stone-500 block uppercase">STATUS</span>
          <span className="text-xs text-emerald-400 font-bold">ACTIVE_OK</span>
        </div>
      </div>

      {/* Detail Mode Controls */}
      {isDetail ? (
        <div className="z-20 flex flex-wrap items-center justify-between gap-3 bg-[#111111]/90 border border-white/10 p-2.5 backdrop-blur-md text-xs mt-2">
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-stone-400">LAYER FILTER:</span>
            {['ALL', 'RADAR', 'GRID'].map((layer) => (
              <button
                key={layer}
                onClick={() => setActiveLayer(layer)}
                className={`px-2 py-0.5 border text-[10px] uppercase font-bold transition-colors ${
                  activeLayer === layer ? 'border-[#FF1E27] bg-[#FF1E27] text-white' : 'border-white/15 text-stone-300 hover:border-white/30'
                }`}
              >
                {layer}
              </button>
            ))}
          </div>
          <span className="text-[10px] text-stone-500">
            POINTER POS DRIVES CSS CUSTOM PROPERTIES IN REAL-TIME
          </span>
        </div>
      ) : (
        <div className="text-[10px] text-stone-500 text-right">
          <span>TRACKING REAL-TIME POINTER VECTOR</span>
        </div>
      )}
    </div>
  );
}
