import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, ChevronRight, Activity, ArrowDown, Cpu } from 'lucide-react';

export default function ArchitectureExplorer() {
  const [activeComponentId, setActiveComponentId] = useState('mha');

  const components = [
    {
      id: 'emb',
      title: '01. TOKEN & ROTARY EMBEDDING (RoPE)',
      type: 'Input Representation',
      tensorIn: '[B, N] (Token IDs)',
      tensorOut: '[B, N, d_model]',
      formula: 'x_i = Embed(w_i) + RoPE(pos_i)',
      description: 'Maps discrete subword vocabulary IDs into dense d_model continuous vector coordinates. In modern architectures (LLaMA/Mistral), Rotary Position Embeddings (RoPE) rotate query and key vectors in complex 2D subspaces to naturally encode relative token distances.',
      params: 'V * d_model (e.g. 128,000 * 4096 ≈ 524M params)',
      computationalRole: 'Vocabulary projection and geometric spatial orientation.'
    },
    {
      id: 'norm1',
      title: '02. PRE-RMSNORM (LAYER 1)',
      type: 'Stabilization & Scaling',
      tensorIn: '[B, N, d_model]',
      tensorOut: '[B, N, d_model]',
      formula: 'RMSNorm(x) = (x / RMS(x)) * g, where RMS(x) = sqrt((1/d) * sum(x_i^2) + eps)',
      description: 'Pre-Layer Normalization normalizes token activation scales before entering self-attention. RMSNorm skips mean-centering, saving 7-12% GPU memory bandwidth relative to standard LayerNorm while preserving identical training stability.',
      params: 'd_model learnable gain vectors (g)',
      computationalRole: 'Prevents activation blowup and enables training 100+ stacked layers without gradient divergence.'
    },
    {
      id: 'mha',
      title: '03. GROUPED-QUERY ATTENTION (GQA)',
      type: 'Contextual Routing',
      tensorIn: '[B, N, d_model]',
      tensorOut: '[B, N, d_model]',
      formula: 'MultiHead(Q, K, V) = Concat(head_1, ..., head_h) W_O',
      description: 'The core associative memory engine. Multiplies input by W_Q, W_K, W_V. Computes scaled dot-product scores between all pairs of tokens. With Grouped-Query Attention (GQA), 32 Query heads share 8 Key-Value heads, shrinking the KV-cache by 75% during inference.',
      params: 'W_Q, W_K, W_V, W_O matrices: 4 * d_model^2 params',
      computationalRole: 'Enables every token to exchange information with all prior tokens across the sequence.'
    },
    {
      id: 'res1',
      title: '04. RESIDUAL SKIP CONNECTION 1',
      type: 'Gradient Preservation',
      tensorIn: 'x, Attention(RMSNorm(x))',
      tensorOut: 'x + Attention(RMSNorm(x))',
      formula: 'y = x + Sublayer(x)',
      description: 'An unbroken identity shortcut that adds the sub-layer input directly to its output. In backpropagation, gradients flow directly through the addition operator without decay, eliminating the vanishing gradient problem.',
      params: '0 parameters (pure element-wise addition)',
      computationalRole: 'Creates an ensemble of shallow pathways and preserves identity signals.'
    },
    {
      id: 'norm2',
      title: '05. PRE-RMSNORM (LAYER 2)',
      type: 'Stabilization & Scaling',
      tensorIn: '[B, N, d_model]',
      tensorOut: '[B, N, d_model]',
      formula: 'RMSNorm(y) = (y / RMS(y)) * g_2',
      description: 'Second normalization stage preparing contextualized representations for dense non-linear feature transformation in the Feed-Forward Network.',
      params: 'd_model learnable parameters',
      computationalRole: 'Conditions feature variances before high-dimensional FFN expansion.'
    },
    {
      id: 'ffn',
      title: '06. SwiGLU FEED-FORWARD NETWORK (FFN)',
      type: 'Non-Linear Memory Bank',
      tensorIn: '[B, N, d_model]',
      tensorOut: '[B, N, d_model]',
      formula: 'FFN(x) = (SiLU(x * W_gate) * (x * W_up)) * W_down',
      description: 'Expands representation to 8/3 * d_model (e.g. 11,008 dimensions) using a gated linear unit with Swish/SiLU activation. Acts as a key-value storage bank for factual and linguistic world knowledge learned during pre-training.',
      params: '3 * d_model * (8/3 * d_model) ≈ 8 * d_model^2 params (66% of model parameters)',
      computationalRole: 'Inter-feature semantic reasoning, factual storage, and conceptual transformation.'
    },
    {
      id: 'res2',
      title: '07. RESIDUAL SKIP CONNECTION 2',
      type: 'Gradient Preservation',
      tensorIn: 'y, FFN(RMSNorm(y))',
      tensorOut: 'output = y + FFN(RMSNorm(y))',
      formula: 'LayerOutput = y + FFN(y)',
      description: 'Second residual highway summing the FFN transformation with the attention-routed features, ready to pass into layer L+1.',
      params: '0 parameters',
      computationalRole: 'Completes a single atomic Transformer block.'
    }
  ];

  const activeComp = components.find((c) => c.id === activeComponentId) || components[2];

  return (
    <div className="border border-white/20 bg-[#07070A] p-5 sm:p-7 font-mono text-slate-200 my-8 shadow-2xl">
      <div className="flex items-center gap-2 pb-4 border-b border-white/10 mb-6">
        <Cpu size={16} className="text-[#FF1E27]" />
        <span className="font-bold text-xs uppercase tracking-wider text-white">
          INTERACTIVE TRANSFORMER LAYER ARCHITECTURE EXPLORER
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Layer Stack Pipeline */}
        <div className="lg:col-span-5 space-y-2">
          <div className="text-[10px] text-slate-300 uppercase tracking-widest font-bold mb-3">
            Click any block to inspect tensor tensors & mechanics:
          </div>

          {components.map((comp) => {
            const isActive = comp.id === activeComponentId;
            return (
              <button
                key={comp.id}
                onClick={() => setActiveComponentId(comp.id)}
                className={`w-full text-left p-3 text-xs font-bold border transition-all flex items-center justify-between cursor-pointer ${
                  isActive
                    ? 'bg-[#FF1E27] text-white border-[#FF1E27] shadow-[0_0_15px_rgba(255,30,39,0.3)] translate-x-1'
                    : 'bg-white/[0.02] text-slate-300 border-white/10 hover:border-white/30 hover:bg-white/[0.04]'
                }`}
              >
                <div>
                  <div className="text-[11px] uppercase tracking-wider">{comp.title}</div>
                  <div className={`text-[10px] font-normal ${isActive ? 'text-white/80' : 'text-slate-300'}`}>
                    {comp.type}
                  </div>
                </div>
                <ChevronRight size={14} className={isActive ? 'text-white' : 'text-slate-300'} />
              </button>
            );
          })}
        </div>

        {/* Right Column: Deep Architectural Telemetry & Formula Inspector */}
        <div className="lg:col-span-7 bg-[#0E0E14] border border-white/15 p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <span className="text-[10px] text-[#FF1E27] font-bold uppercase tracking-widest block">
                COMPONENT INSPECTOR
              </span>
              <h3 className="text-sm sm:text-base font-bold text-white uppercase tracking-tight mt-0.5">
                {activeComp.title}
              </h3>
            </div>
            <span className="px-2 py-0.5 bg-white/5 border border-white/10 text-[10px] text-slate-300 uppercase">
              {activeComp.type}
            </span>
          </div>

          {/* Mathematical Transformation Formula */}
          <div className="bg-black/60 border border-white/10 p-3.5 space-y-1">
            <span className="text-[10px] text-slate-300 uppercase tracking-widest block font-bold">
              MATHEMATICAL FORMULATION:
            </span>
            <div className="font-mono text-xs sm:text-sm font-bold text-[#FF1E27] break-words">
              {activeComp.formula}
            </div>
          </div>

          {/* Tensor Dimensions Grid */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-white/[0.03] border border-white/10 p-3">
              <span className="text-[10px] text-slate-300 uppercase tracking-widest block">INPUT SHAPE:</span>
              <span className="font-mono font-bold text-white text-xs">{activeComp.tensorIn}</span>
            </div>
            <div className="bg-white/[0.03] border border-white/10 p-3">
              <span className="text-[10px] text-slate-300 uppercase tracking-widest block">OUTPUT SHAPE:</span>
              <span className="font-mono font-bold text-emerald-400 text-xs">{activeComp.tensorOut}</span>
            </div>
          </div>

          {/* Narrative Role */}
          <div className="space-y-1 text-xs text-slate-300 leading-relaxed pt-1">
            <span className="text-[10px] text-slate-300 uppercase tracking-widest block font-bold">
              INTERNAL MECHANISM:
            </span>
            <p>{activeComp.description}</p>
          </div>

          {/* Parameter Overhead & Hardware Role */}
          <div className="pt-3 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
            <div>
              <span className="text-slate-300 uppercase tracking-wider block text-[10px]">PARAMETER VOLUME:</span>
              <span className="font-bold text-white">{activeComp.params}</span>
            </div>
            <div>
              <span className="text-slate-300 uppercase tracking-wider block text-[10px]">HARDWARE FUNCTION:</span>
              <span className="font-bold text-slate-200">{activeComp.computationalRole}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
