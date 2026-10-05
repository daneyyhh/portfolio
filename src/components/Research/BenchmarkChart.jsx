import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Cpu, Database } from 'lucide-react';

export default function BenchmarkChart() {
  const [activeTab, setActiveTab] = useState('memory'); // 'memory' or 'mmlu' or 'gsm8k'

  const memoryData = [
    { seqLen: '2,048', standardVram: 0.8, flashVram: 0.3, speedup: '4.0x' },
    { seqLen: '8,192', standardVram: 12.8, flashVram: 1.1, speedup: '5.1x' },
    { seqLen: '16,384', standardVram: 51.2, flashVram: 2.2, speedup: '5.4x' },
    { seqLen: '32,768', standardVram: 85.0, isOom: true, flashVram: 4.4, speedup: 'Standard OOM' },
    { seqLen: '65,536', standardVram: 170.0, isOom: true, flashVram: 8.8, speedup: 'Standard OOM' },
  ];

  const mmluData = [
    { model: 'Vanilla Transformer (2017)', score: 24.2, year: '2017' },
    { model: 'BERT-Large (2018)', score: 34.1, year: '2018' },
    { model: 'GPT-3 175B (2020)', score: 43.9, year: '2020' },
    { model: 'LLaMA-1 65B (2023)', score: 68.9, year: '2023' },
    { model: 'LLaMA-3 70B (2024)', score: 82.0, year: '2024' },
    { model: 'Claude 3.5 Sonnet (2024)', score: 88.7, year: '2024' },
    { model: 'DeepSeek V3 (2025)', score: 88.5, year: '2025' },
  ];

  const gsm8kData = [
    { model: 'GPT-3 (175B)', score: 35.0, year: '2020' },
    { model: 'PaLM (540B)', score: 58.1, year: '2022' },
    { model: 'LLaMA-2 70B', score: 56.8, year: '2023' },
    { model: 'LLaMA-3 70B', score: 93.0, year: '2024' },
    { model: 'DeepSeek R1 (2025)', score: 97.3, year: '2025' },
  ];

  return (
    <div className="border border-white/20 bg-[#07070A] p-5 sm:p-7 font-mono text-slate-200 my-8 shadow-2xl">
      {/* Top Header & Tab Switcher */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-white/10 gap-3">
        <div className="flex items-center gap-2">
          <BarChart3 size={16} className="text-[#FF1E27]" />
          <span className="font-bold text-xs uppercase tracking-wider text-white">
            EMPIRICAL BENCHMARKS & SCALING EVIDENCE
          </span>
        </div>

        {/* Tab Pills */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <button
            onClick={() => setActiveTab('memory')}
            className={`px-2.5 py-1 text-[11px] font-bold border transition-colors cursor-pointer ${
              activeTab === 'memory'
                ? 'bg-[#FF1E27] text-white border-[#FF1E27]'
                : 'bg-white/5 text-slate-300 border-white/10 hover:border-white/30'
            }`}
          >
            VRAM SCALING: FLASHATTENTION
          </button>
          <button
            onClick={() => setActiveTab('mmlu')}
            className={`px-2.5 py-1 text-[11px] font-bold border transition-colors cursor-pointer ${
              activeTab === 'mmlu'
                ? 'bg-[#FF1E27] text-white border-[#FF1E27]'
                : 'bg-white/5 text-slate-300 border-white/10 hover:border-white/30'
            }`}
          >
            MMLU PROGRESSION
          </button>
          <button
            onClick={() => setActiveTab('gsm8k')}
            className={`px-2.5 py-1 text-[11px] font-bold border transition-colors cursor-pointer ${
              activeTab === 'gsm8k'
                ? 'bg-[#FF1E27] text-white border-[#FF1E27]'
                : 'bg-white/5 text-slate-300 border-white/10 hover:border-white/30'
            }`}
          >
            GSM8K MATH SATURATION
          </button>
        </div>
      </div>

      {/* ── VIEW 1: Memory Scaling (FlashAttention vs Standard) ── */}
      {activeTab === 'memory' && (
        <div className="py-5 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 text-xs">
            <div>
              <span className="font-bold text-white uppercase text-sm block">
                Peak Activation VRAM Footprint vs Sequence Length (A100 80GB)
              </span>
              <span className="text-[11px] text-slate-300">
                Units: Gigabytes (GB) VRAM · Batch size = 1 · 32 Heads · d_k = 128 · FP16
              </span>
            </div>
            <div className="text-[10px] text-slate-300">
              Source: Dao et al., NeurIPS 2022
            </div>
          </div>

          {/* Visual Bar Comparison */}
          <div className="space-y-4 pt-2">
            {memoryData.map((d) => (
              <div key={d.seqLen} className="space-y-1.5 bg-white/[0.02] border border-white/10 p-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-white">Sequence Length: {d.seqLen} Tokens</span>
                  <span className="text-emerald-400 font-bold text-[11px]">{d.speedup}</span>
                </div>

                {/* Standard Attention Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] text-slate-300">
                    <span>Standard PyTorch Attention (O(N²))</span>
                    <span className={d.isOom ? 'text-red-500 font-bold' : 'text-slate-300'}>
                      {d.isOom ? 'OUT OF MEMORY (>80 GB)' : `${d.standardVram} GB`}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-white/10 overflow-hidden">
                    <motion.div
                      className={`h-full ${d.isOom ? 'bg-red-500/80' : 'bg-slate-400'}`}
                      initial={{ width: 0 }}
                      animate={{ width: d.isOom ? '100%' : `${(d.standardVram / 80) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                {/* FlashAttention Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] text-slate-300">
                    <span className="text-emerald-400 font-bold">FlashAttention (O(N) in SRAM)</span>
                    <span className="text-emerald-400 font-bold">{d.flashVram} GB</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 overflow-hidden">
                    <motion.div
                      className="h-full bg-emerald-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${(d.flashVram / 80) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-black/50 border border-white/10 text-xs text-slate-300">
            <span className="text-[#FF1E27] font-bold mr-1">INTERPRETATION:</span>
            Standard attention allocates an N×N matrix in High Bandwidth Memory (HBM), crashing an 80GB GPU at 32k tokens. FlashAttention-2 reorganizes softmax into SRAM tiles without materializing the N×N intermediate tensor, scaling linearly to 65,536 tokens on only 8.8 GB VRAM.
          </div>
        </div>
      )}

      {/* ── VIEW 2: MMLU Progression ── */}
      {activeTab === 'mmlu' && (
        <div className="py-5 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 text-xs">
            <div>
              <span className="font-bold text-white uppercase text-sm block">
                MMLU (Massive Multitask Language Understanding) Progression
              </span>
              <span className="text-[11px] text-slate-300">
                Units: 5-Shot Benchmark Accuracy (%) across 57 humanities, STEM, and social science subjects
              </span>
            </div>
            <div className="text-[10px] text-slate-300">
              Source: Hendrycks et al. / Stanford HELM
            </div>
          </div>

          <div className="space-y-3 pt-2">
            {mmluData.map((m) => (
              <div key={m.model} className="space-y-1 bg-white/[0.02] border border-white/10 p-2.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-white">{m.model}</span>
                  <span className="text-[#FF1E27] font-bold">{m.score}%</span>
                </div>
                <div className="w-full h-2.5 bg-white/10 overflow-hidden">
                  <motion.div
                    className="h-full bg-[#FF1E27]"
                    initial={{ width: 0 }}
                    animate={{ width: `${m.score}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-black/50 border border-white/10 text-xs text-slate-300">
            <span className="text-[#FF1E27] font-bold mr-1">INTERPRETATION:</span>
            Over 8 years, identical Transformer backbones scaled from 24.2% (near random 25% 4-choice baseline) to 88.7% (expert human domain baseline). The primary driver was pre-training data volume (from 1B words to 15T tokens) and synthetic refinement.
          </div>
        </div>
      )}

      {/* ── VIEW 3: GSM8K Math Saturation ── */}
      {activeTab === 'gsm8k' && (
        <div className="py-5 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 text-xs">
            <div>
              <span className="font-bold text-white uppercase text-sm block">
                GSM8K Grade School Math 8K Saturation Curve
              </span>
              <span className="text-[11px] text-slate-300">
                Units: Execution Accuracy (%) on multi-step arithmetic word problems
              </span>
            </div>
            <div className="text-[10px] text-slate-300">
              Source: OpenAI / DeepMind / DeepSeek
            </div>
          </div>

          <div className="space-y-3 pt-2">
            {gsm8kData.map((m) => (
              <div key={m.model} className="space-y-1 bg-white/[0.02] border border-white/10 p-2.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-white">{m.model}</span>
                  <span className="text-[#FF1E27] font-bold">{m.score}%</span>
                </div>
                <div className="w-full h-2.5 bg-white/10 overflow-hidden">
                  <motion.div
                    className="h-full bg-emerald-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${m.score}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-black/50 border border-white/10 text-xs text-slate-300">
            <span className="text-[#FF1E27] font-bold mr-1">INTERPRETATION:</span>
            GSM8K has achieved near 100% saturation (DeepSeek R1 at 97.3%). The benchmark no longer discriminates between leading models, prompting the research community to transition to FrontierMath and AIME 2024 for mathematical frontier evaluation.
          </div>
        </div>
      )}
    </div>
  );
}
