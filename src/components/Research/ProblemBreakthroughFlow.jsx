import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, AlertOctagon, HelpCircle, Lightbulb, Zap, AlertTriangle, FastForward } from 'lucide-react';

const DEFAULT_FLOW_STAGES = [
  {
    step: '01',
    phase: 'PROBLEM',
    icon: AlertOctagon,
    color: '#111111',
    summary: 'Arbitrary-Length Sequence Alignment',
    detail: 'Translating or modeling sentences required compressing variable-length source sequences into a single fixed-dimensional bottleneck vector h_t. Information loss grew exponentially once sequence length exceeded 20-30 tokens.'
  },
  {
    step: '02',
    phase: 'LIMITATION',
    icon: AlertTriangle,
    color: '#888884',
    summary: 'Sequential Computation Bottleneck O(N)',
    detail: 'Recurrent Neural Networks (RNNs) and LSTMs compute state h_t strictly conditioned on h_{t-1}. This serialized temporal dependency prohibited GPUs from parallelizing training across sequence length N, causing extreme wall-clock training times.'
  },
  {
    step: '03',
    phase: 'RESEARCH QUESTION',
    icon: HelpCircle,
    color: '#FF1E27',
    summary: 'Can Sequence Modeling Discard Recurrence Entirely?',
    detail: 'Is temporal sequential unrolling fundamentally necessary to understand syntactic order and long-range semantic relations, or can global pairwise token comparisons accomplish the same task in constant O(1) sequential operations?'
  },
  {
    step: '04',
    phase: 'PROPOSED SOLUTION',
    icon: Lightbulb,
    color: '#111111',
    summary: 'Scaled Dot-Product Multi-Head Self-Attention',
    detail: 'Project every token into Query, Key, and Value spaces. Allow every token at position i to directly calculate a normalized similarity score with every token at position j simultaneously via dense matrix multiplications (Q * K^T).'
  },
  {
    step: '05',
    phase: 'BREAKTHROUGH',
    icon: Zap,
    color: '#FF1E27',
    summary: 'Constant Path Length & Parallel Saturation',
    detail: 'Maximum distance between any two interacting tokens dropped from O(N) steps to O(1) direct attention connections. Training became 100% parallelizable across high-throughput GPU tensor cores, enabling modern massive foundation models.'
  },
  {
    step: '06',
    phase: 'NEW LIMITATION',
    icon: AlertTriangle,
    color: '#888884',
    summary: 'Quadratic O(N²) Compute & KV-Cache Footprint',
    detail: 'Computing the N x N attention matrix scales quadratically in sequence length N. At 128k+ context windows, materializing attention weights in GPU HBM consumes prohibitive memory, and autoregressive generation requires an ever-growing KV cache.'
  },
  {
    step: '07',
    phase: 'NEXT GENERATION',
    icon: FastForward,
    color: '#111111',
    summary: 'FlashAttention-3, Linear State-Space & Hybrids',
    detail: 'Hardware-aware SRAM tiling (FlashAttention-3), linear-time State Space Models (Mamba-2), and hybrid attention architectures combine sub-quadratic inference speed with long-range in-context retrieval.'
  }
];

export default function ProblemBreakthroughFlow({ stages = null, title = "PROBLEM → BREAKTHROUGH ARCHITECTURE FLOW" }) {
  const flowStages = stages || DEFAULT_FLOW_STAGES;
  const [activeStageIndex, setActiveStageIndex] = useState(4); // Default to Breakthrough

  const activeStage = flowStages[activeStageIndex];

  return (
    <div className="bg-[#FAF9F5] border-2 border-[#111111] p-5 sm:p-8 shadow-[6px_6px_0px_#111111] font-mono text-[#111111] space-y-6">
      
      {/* Header Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#C9C7C0] pb-4">
        <div>
          <span className="text-[10px] text-[#FF1E27] font-bold uppercase tracking-widest block">
            SIGNATURE RESEARCH VISUAL FLOW
          </span>
          <h3 className="font-syne font-extrabold text-xl sm:text-2xl uppercase tracking-tight text-[#111111]">
            {title}
          </h3>
        </div>
        <div className="text-[10px] text-stone-500 bg-white border border-[#C9C7C0] px-3 py-1">
          CLICK ANY STEP TO TRACE INSIGHT
        </div>
      </div>

      {/* Horizontal / Wrapped Flow Node Chain */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 pt-2">
        {flowStages.map((stage, idx) => {
          const Icon = stage.icon;
          const isSelected = activeStageIndex === idx;

          return (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveStageIndex(idx)}
              className={`p-3 border-2 transition-all flex flex-col justify-between text-left cursor-pointer relative group ${
                isSelected
                  ? 'border-[#FF1E27] bg-[#111111] text-white shadow-[3px_3px_0px_#FF1E27]'
                  : 'border-[#C9C7C0] bg-white hover:border-[#111111] text-[#111111]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-[10px] mb-1">
                  <span className={isSelected ? 'text-[#FF1E27] font-bold' : 'text-[#888884]'}>
                    {stage.step}
                  </span>
                  <Icon size={12} className={isSelected ? 'text-[#FF1E27]' : 'text-stone-400'} />
                </div>
                <div className={`text-[10px] font-extrabold uppercase tracking-wider line-clamp-1 ${
                  isSelected ? 'text-white' : 'text-[#111111]'
                }`}>
                  {stage.phase}
                </div>
              </div>

              <div className={`text-[9px] mt-2 pt-2 border-t font-sans line-clamp-2 ${
                isSelected ? 'border-white/20 text-stone-300' : 'border-[#E4E2DC] text-stone-600'
              }`}>
                {stage.summary}
              </div>

              {/* Direction Indicator */}
              {idx < flowStages.length - 1 && (
                <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
                  <span className="text-[#C9C7C0] font-bold">›</span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Detailed Inspection Showcase Pane */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStageIndex}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="p-5 sm:p-6 bg-white border-2 border-[#111111] shadow-[4px_4px_0px_#111111] space-y-3"
        >
          <div className="flex items-center justify-between border-b border-[#E4E2DC] pb-3 flex-wrap gap-2">
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-mono font-bold bg-[#FF1E27] text-white px-2 py-0.5 uppercase tracking-wider">
                STAGE {activeStage.step} // {activeStage.phase}
              </span>
              <span className="font-bold text-sm text-[#111111] uppercase">
                {activeStage.summary}
              </span>
            </div>

            <span className="text-[10px] text-stone-400">
              INSPECTION MODE: REUBG DEV TECHNICAL AUDIT
            </span>
          </div>

          <p className="font-sans text-xs sm:text-sm text-[#333333] leading-relaxed max-w-4xl">
            {activeStage.detail}
          </p>
        </motion.div>
      </AnimatePresence>

    </div>
  );
}
