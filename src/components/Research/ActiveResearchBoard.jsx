import React, { useState } from 'react';
import { Kanban, ArrowUpRight, HelpCircle, Sparkles, AlertCircle, CheckCircle2, FlaskConical } from 'lucide-react';

const BOARD_COLUMNS = [
  {
    id: 'investigating',
    title: 'INVESTIGATING',
    badgeColor: 'bg-[#111111] text-white',
    icon: FlaskConical,
    items: [
      {
        id: 'INV-01',
        title: 'Hardware SRAM Tiling IO Bound in FlashAttention-3',
        question: 'Can asynchronous warp group instructions in NVIDIA Hopper overlap TMA loads with GEMM accumulation to push attention compute to 75% FP16 peak?',
        target: 'FlashAttention-3 Paper',
        date: 'SEP 2026'
      },
      {
        id: 'INV-02',
        title: 'KV-Cache Evacuation via Streaming Attention Sinks',
        question: 'What is the minimal number of initial sink tokens required to keep LLaMA-3 perplexity bounded over 1M token streams?',
        target: 'StreamingLLM Benchmark',
        date: 'OCT 2026'
      }
    ]
  },
  {
    id: 'experimenting',
    title: 'EXPERIMENTING',
    badgeColor: 'bg-[#FF1E27] text-white',
    icon: Sparkles,
    items: [
      {
        id: 'EXP-01',
        title: 'Mamba-2 vs Transformer Hybrid Duality',
        question: 'Evaluating hybrid models (3:1 Transformer to SSD state-space layers) on needle-in-a-haystack multi-hop reasoning benchmarks.',
        target: 'Jamba / Mamba-2 Repo',
        date: 'AUG 2026'
      },
      {
        id: 'EXP-02',
        title: 'FP4 / INT4 Linear Quantization Drift',
        question: 'Measuring activation outlier degradation in AWQ vs GPTQ across 70B parameter models under complex coding benchmarks.',
        target: 'vLLM Kernel Lab',
        date: 'OCT 2026'
      }
    ]
  },
  {
    id: 'open-question',
    title: 'OPEN QUESTION',
    badgeColor: 'bg-amber-600 text-white',
    icon: HelpCircle,
    items: [
      {
        id: 'QST-01',
        title: 'Will Test-Time Compute Scale Indefinitely?',
        question: 'At what point does Monte Carlo Tree Search over chain-of-thought traces encounter diminishing returns in verifiable domains like mathematics and coding?',
        target: 'Reasoning Scaling Laws',
        date: '2026'
      },
      {
        id: 'QST-02',
        title: 'Can Attention Completely Eliminate Hallucinations?',
        question: 'Is hallucination an intrinsic mathematical property of probabilistic next-token generation over finite parametric distributions?',
        target: 'Calibration Theory',
        date: '2026'
      }
    ]
  },
  {
    id: 'recent-breakthrough',
    title: 'RECENT BREAKTHROUGH',
    badgeColor: 'bg-emerald-700 text-white',
    icon: CheckCircle2,
    items: [
      {
        id: 'BRK-01',
        title: 'DeepSeek-R1 Reinforcement-Driven Reasoning',
        question: 'Incentivized long-horizon chain-of-thought exploration via pure rule-based RL without supervised cold-start data.',
        target: 'DeepSeek-R1 (2025)',
        date: 'JAN 2025'
      },
      {
        id: 'BRK-02',
        title: 'AlphaFold 3 Biomolecular Diffusion',
        question: 'Direct 3D diffusion on all biological molecules without manual docking priors; awarded 2024 Nobel Prize in Chemistry.',
        target: 'Nature (2024)',
        date: 'MAY 2024'
      }
    ]
  },
  {
    id: 'unsolved',
    title: 'UNSOLVED',
    badgeColor: 'bg-rose-700 text-white',
    icon: AlertCircle,
    items: [
      {
        id: 'UNS-01',
        title: 'Global Continual Lifelong Learning',
        question: 'Updating parametric knowledge on streaming real-time tokens without catastrophic forgetting of historical training distributions.',
        target: 'Continual Learning',
        date: 'ACTIVE'
      },
      {
        id: 'UNS-02',
        title: 'Truly Autonomous Software Red Teaming',
        question: 'Guaranteed mathematical safety boundaries against jailbreaking via recursive multi-turn persona conditioning.',
        target: 'AI Safety Research',
        date: 'ACTIVE'
      }
    ]
  }
];

export default function ActiveResearchBoard() {
  const [selectedColumn, setSelectedColumn] = useState('ALL');

  const visibleColumns = selectedColumn === 'ALL'
    ? BOARD_COLUMNS
    : BOARD_COLUMNS.filter(c => c.id === selectedColumn);

  return (
    <div className="bg-[#FAF9F5] border-2 border-[#111111] p-5 sm:p-8 shadow-[6px_6px_0px_#111111] font-mono text-[#111111] space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#C9C7C0] pb-4">
        <div>
          <span className="text-[10px] text-[#FF1E27] font-bold uppercase tracking-widest block">
            LIVE RESEARCH RADAR // CURRENT WORKBENCH
          </span>
          <h3 className="font-syne font-extrabold text-xl sm:text-2xl uppercase tracking-tight text-[#111111]">
            Active Research Board
          </h3>
        </div>

        {/* Column Filter Toggle */}
        <div className="flex items-center gap-1.5 flex-wrap text-[10px]">
          <button
            onClick={() => setSelectedColumn('ALL')}
            className={`px-2 py-1 uppercase tracking-wider font-bold border transition-colors cursor-pointer ${
              selectedColumn === 'ALL' ? 'bg-[#111111] text-white border-[#111111]' : 'bg-white text-stone-600 border-[#C9C7C0]'
            }`}
          >
            ALL (5 COLS)
          </button>
          {BOARD_COLUMNS.map(col => (
            <button
              key={col.id}
              onClick={() => setSelectedColumn(col.id)}
              className={`px-2 py-1 uppercase tracking-wider font-bold border transition-colors cursor-pointer ${
                selectedColumn === col.id ? 'bg-[#111111] text-white border-[#111111]' : 'bg-white text-stone-600 border-[#C9C7C0]'
              }`}
            >
              {col.title}
            </button>
          ))}
        </div>
      </div>

      {/* Kanban Board Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 items-start">
        {visibleColumns.map(col => {
          const Icon = col.icon;

          return (
            <div
              key={col.id}
              className="bg-white border-2 border-[#111111] p-4 shadow-[3px_3px_0px_#111111] space-y-3"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between border-b border-[#E4E2DC] pb-2">
                <div className="flex items-center gap-1.5">
                  <Icon size={13} className="text-[#FF1E27]" />
                  <span className="text-xs font-bold text-[#111111] uppercase tracking-wider">
                    {col.title}
                  </span>
                </div>
                <span className="text-[10px] text-stone-400 font-bold">
                  [{col.items.length}]
                </span>
              </div>

              {/* Column Cards */}
              <div className="space-y-2.5">
                {col.items.map(item => (
                  <div
                    key={item.id}
                    className="p-3 bg-[#FAF9F5] border border-[#C9C7C0] hover:border-[#FF1E27] transition-all space-y-1.5 group"
                  >
                    <div className="flex items-center justify-between text-[9px] text-[#888884]">
                      <span className="font-bold text-[#FF1E27]">{item.id}</span>
                      <span>{item.date}</span>
                    </div>

                    <h5 className="font-bold text-xs text-[#111111] uppercase tracking-wide group-hover:text-[#FF1E27] transition-colors leading-snug">
                      {item.title}
                    </h5>

                    <p className="font-sans text-[11px] text-[#444444] leading-relaxed">
                      {item.question}
                    </p>

                    <div className="pt-1.5 border-t border-[#E4E2DC] flex items-center justify-between text-[9px] text-stone-500">
                      <span className="truncate max-w-[130px] font-mono">{item.target}</span>
                      <ArrowUpRight size={11} className="text-stone-400 group-hover:text-[#FF1E27] transition-colors" />
                    </div>
                  </div>
                ))}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
