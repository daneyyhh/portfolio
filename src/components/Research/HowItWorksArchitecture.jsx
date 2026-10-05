import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, ArrowRight, ArrowDown, Cpu, Sparkles, Binary, CheckCircle2, ChevronRight } from 'lucide-react';

const DEFAULT_STAGES = [
  {
    id: 'stage-1',
    name: '01 // INPUT',
    label: 'RAW TEXT TOKENS & BPE ENCODING',
    icon: Binary,
    whatIsThis: 'Byte-Pair Encoding (BPE) or WordPiece tokenizer converting natural language strings into discrete integer vocabulary IDs.',
    whyExists: 'Neural networks are mathematical function approximators that cannot process raw character bytes or ASCII symbols directly.',
    whatGoesIn: 'Raw UTF-8 string: "The bank of the river was steep."',
    whatComesOut: 'Discrete token ID sequence: [464, 2872, 286, 262, 7357, 373, 8569, 13] where each ID ∈ [0, V - 1].'
  },
  {
    id: 'stage-2',
    name: '02 // PROCESSING',
    label: 'EMBEDDING TABLE & RoPE ROTATION',
    icon: Layers,
    whatIsThis: 'Lookup table matrix E ∈ R^{V × d} retrieving dense vector representations, followed by Rotary Position Embeddings (RoPE).',
    whyExists: 'Self-attention is mathematically permutation-equivariant; without positional injection, token order would be completely ignored.',
    whatGoesIn: 'Token integer indices [1, N] of batch size B.',
    whatComesOut: 'Dense embedding tensor X_0 ∈ R^{B × N × d_model} rotated in 2D block-diagonal complex planes.'
  },
  {
    id: 'stage-3',
    name: '03 // INTERNAL REPRESENTATION',
    label: 'Q, K, V LINEAR PROJECTIONS',
    icon: Cpu,
    whatIsThis: 'Three separate learnable weight projection matrices (W_q, W_k, W_v) mapping normalized input representations into Query, Key, and Value subspaces.',
    whyExists: 'Decouples what a token is searching for (Query), what information it broadcasts to others (Key), and the actual semantic payload it delivers (Value).',
    whatGoesIn: 'RMSNorm(X_l) ∈ R^{B × N × d_model}.',
    whatComesOut: 'Q ∈ R^{B × H × N × d_k}, K ∈ R^{B × H × N × d_k}, V ∈ R^{B × H × N × d_v} where H is the number of attention heads.'
  },
  {
    id: 'stage-4',
    name: '04 // MODEL CORE',
    label: 'SCALED DOT-PRODUCT & SOFTMAX ATTENTION',
    icon: Sparkles,
    whatIsThis: 'Matrix multiplication of Queries and transposed Keys, scaled by 1/√d_k, causal triangular masking, and row-wise softmax normalization.',
    whyExists: 'Calculates the exact affinity and cross-correlation between every pair of tokens in the document with constant O(1) step distance.',
    whatGoesIn: 'Query and Key tensors Q, K, and causal upper-triangular mask (-inf for future positions).',
    whatComesOut: 'Attention weight probability matrix A = softmax(QK^T / √d_k) ∈ [0, 1]^{B × H × N × N}.'
  },
  {
    id: 'stage-5',
    name: '05 // INFERENCE TRANSFORM',
    label: 'SWIGLU MLP & RESIDUAL INTEGRATION',
    icon: Layers,
    whatIsThis: 'Weighted sum of Value vectors (A × V), projected through W_o, added back via residual skip connections (x + f(x)), and processed by SwiGLU FFN.',
    whyExists: 'Self-attention only routes and mixes existing information across tokens; the non-linear feedforward MLP performs factual memory recall and token refinement.',
    whatGoesIn: 'Attention context vectors + original input skip tensor.',
    whatComesOut: 'Deep enriched hidden representations X_{l+1} ∈ R^{B × N × d_model}.'
  },
  {
    id: 'stage-6',
    name: '06 // OUTPUT',
    label: 'UNEMBEDDING HEAD & LOGITS SAMPLING',
    icon: Binary,
    whatIsThis: 'Final RMSNorm followed by linear projection through language modeling head W_u ∈ R^{d_model × V} producing next-token probabilities.',
    whyExists: 'Projects the deep latent semantic state back into vocabulary space so the model can sample or beam-search the next token.',
    whatGoesIn: 'Final hidden state h_N of the last prompt token.',
    whatComesOut: 'Vocabulary logits vector z ∈ R^{V}, converted to probabilities via temperature-scaled softmax.'
  }
];

export default function HowItWorksArchitecture({ stages = null, title = "SYSTEM ARCHITECTURE & TENSOR PIPELINE" }) {
  const pipelineStages = stages || DEFAULT_STAGES;
  const [selectedStageId, setSelectedStageId] = useState(pipelineStages[3].id); // Default to Model Core

  const activeStage = pipelineStages.find(s => s.id === selectedStageId) || pipelineStages[0];

  return (
    <div className="bg-[#FAF9F5] border-2 border-[#111111] p-5 sm:p-8 shadow-[6px_6px_0px_#111111] font-mono text-[#111111] space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#C9C7C0] pb-4">
        <div>
          <span className="text-[10px] text-[#FF1E27] font-bold uppercase tracking-widest block">
            INTERACTIVE SYSTEM ARCHITECTURE // DATA FLOW
          </span>
          <h3 className="font-syne font-extrabold text-xl sm:text-2xl uppercase tracking-tight text-[#111111]">
            {title}
          </h3>
        </div>
        <div className="text-[10px] text-stone-500 bg-white border border-[#C9C7C0] px-3 py-1">
          HOVER / CLICK COMPONENT TO AUDIT TENSORS
        </div>
      </div>

      {/* Interactive Horizontal Pipeline Stepper */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 pt-2">
        {pipelineStages.map((stage) => {
          const isSelected = selectedStageId === stage.id;
          const Icon = stage.icon;

          return (
            <button
              key={stage.id}
              type="button"
              onClick={() => setSelectedStageId(stage.id)}
              className={`p-3.5 border-2 text-left transition-all flex flex-col justify-between cursor-pointer relative group ${
                isSelected
                  ? 'bg-[#111111] text-white border-[#FF1E27] shadow-[3px_3px_0px_#FF1E27]'
                  : 'bg-white text-[#111111] border-[#C9C7C0] hover:border-[#111111]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-bold ${isSelected ? 'text-[#FF1E27]' : 'text-[#888884]'}`}>
                    {stage.name}
                  </span>
                  <Icon size={13} className={isSelected ? 'text-[#FF1E27]' : 'text-stone-400'} />
                </div>
                <div className="text-[11px] font-bold uppercase tracking-wide leading-tight line-clamp-2">
                  {stage.label}
                </div>
              </div>

              <div className="mt-4 pt-2 border-t border-stone-200/40 text-[9px] flex items-center justify-between">
                <span className={isSelected ? 'text-stone-300' : 'text-stone-500'}>AUDIT TENSOR</span>
                <ChevronRight size={12} className={isSelected ? 'text-[#FF1E27]' : 'text-stone-400'} />
              </div>
            </button>
          );
        })}
      </div>

      {/* Detailed Component Deep-Dive Inspection Box */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStage.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="bg-white border-2 border-[#111111] p-6 shadow-[5px_5px_0px_#111111] space-y-5"
        >
          <div className="flex items-center justify-between border-b border-[#E4E2DC] pb-3 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold bg-[#111111] text-white px-2 py-0.5 uppercase tracking-wider">
                {activeStage.name}
              </span>
              <h4 className="font-syne font-extrabold text-base sm:text-lg text-[#111111] uppercase">
                {activeStage.label}
              </h4>
            </div>
            <span className="text-[10px] font-mono text-[#FF1E27] font-bold">
              [ COMPONENT_TELEMETRY ]
            </span>
          </div>

          {/* 4-Box Technical Audit Grid (What is this, Why it exists, What goes in, What comes out) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="p-4 bg-[#FAF9F5] border border-[#C9C7C0] space-y-1">
              <span className="text-[10px] text-[#FF1E27] font-bold uppercase tracking-wider block">
                01 // WHAT IS THIS?
              </span>
              <p className="font-sans text-xs text-[#333333] leading-relaxed">
                {activeStage.whatIsThis}
              </p>
            </div>

            <div className="p-4 bg-[#FAF9F5] border border-[#C9C7C0] space-y-1">
              <span className="text-[10px] text-[#111111] font-bold uppercase tracking-wider block">
                02 // WHY DOES IT EXIST?
              </span>
              <p className="font-sans text-xs text-[#333333] leading-relaxed">
                {activeStage.whyExists}
              </p>
            </div>

            <div className="p-4 bg-[#EDECE6]/50 border border-[#C9C7C0] space-y-1">
              <span className="text-[10px] text-stone-600 font-bold uppercase tracking-wider block">
                03 // WHAT GOES IN (INPUT TENSOR)
              </span>
              <div className="font-mono text-xs text-[#111111] bg-white p-2 border border-[#C9C7C0]/60 overflow-x-auto">
                {activeStage.whatGoesIn}
              </div>
            </div>

            <div className="p-4 bg-[#EDECE6]/50 border border-[#C9C7C0] space-y-1">
              <span className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider block">
                04 // WHAT COMES OUT (OUTPUT TENSOR)
              </span>
              <div className="font-mono text-xs text-[#111111] bg-white p-2 border border-[#C9C7C0]/60 overflow-x-auto">
                {activeStage.whatComesOut}
              </div>
            </div>

          </div>

        </motion.div>
      </AnimatePresence>

    </div>
  );
}
