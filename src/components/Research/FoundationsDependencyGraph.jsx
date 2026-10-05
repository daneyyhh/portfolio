import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, Layers, CheckCircle2, ChevronRight, Binary, Cpu, Compass } from 'lucide-react';

const DEFAULT_FOUNDATIONS = [
  {
    id: 'math',
    level: 1,
    title: 'LINEAR ALGEBRA & CALCULUS',
    prereq: 'Foundational',
    formula: '∇_θ L(θ) = E [ (∂L / ∂y) * (∂y / ∂θ) ]',
    explanation: 'High-dimensional vector spaces, matrix multiplication, inner products (dot products), projections, and partial derivatives via the multivariate chain rule form the rigorous computational foundation of all neural network representations.',
    roleInTopic: 'Without dot products, there is no similarity metric to measure token correlation.'
  },
  {
    id: 'vectors',
    level: 2,
    title: 'VECTOR EMBEDDINGS',
    prereq: 'Linear Algebra',
    formula: 'e_i ∈ R^{d_model} (e.g. d = 768 or 4096)',
    explanation: 'Discrete symbolic tokens (e.g. words or subwords) are mapped into dense continuous vector spaces where geometric distance (cosine angle) corresponds to semantic similarity (e.g. king - man + woman ≈ queen).',
    roleInTopic: 'Transforms discrete text into continuous tensors that neural networks can differentiate and multiply.'
  },
  {
    id: 'matrices',
    level: 3,
    title: 'TENSOR TRANSFORMATIONS',
    prereq: 'Vector Embeddings',
    formula: 'X ∈ R^{N × d_model}, W ∈ R^{d_model × d_k}',
    explanation: 'Matrices represent linear operators that rotate, scale, and project vector representations into alternate feature subspaces. Matrix multiplication (GEMM) saturates modern GPU tensor cores at 100% compute efficiency.',
    roleInTopic: 'Allows simultaneously projecting an entire sequence of N tokens with a single hardware matrix multiply.'
  },
  {
    id: 'nn',
    level: 4,
    title: 'MULTI-LAYER FEEDFORWARD NETWORKS',
    prereq: 'Tensor Transformations',
    formula: 'FFN(x) = max(0, xW_1 + b_1)W_2 + b_2  (or SwiGLU)',
    explanation: 'Stacking linear transformations with non-linear activation functions (ReLU, GELU, SwiGLU) creates universal function approximators capable of capturing arbitrary complex relationships.',
    roleInTopic: 'Provides position-wise factual knowledge recall and feature consolidation following attention mixing.'
  },
  {
    id: 'seq',
    level: 5,
    title: 'SEQUENCE MODELING & RECURRENCE',
    prereq: 'Neural Networks',
    formula: 'h_t = tanh(W_{hh} h_{t-1} + W_{xh} x_t)',
    explanation: 'Modeling temporal sequence order was traditionally solved by unrolling a cyclic recurrent state over time t = 1...T. However, vanishing gradients across long time spans and serial compute prevented scaling.',
    roleInTopic: 'Exposed the fundamental sequential bottleneck that attention-only architectures were invented to replace.'
  },
  {
    id: 'attn',
    level: 6,
    title: 'CROSS-ATTENTION (ALIGNMENT)',
    prereq: 'Sequence Modeling',
    formula: 'α_{t,i} = exp(score(s_t, h_i)) / ∑_k exp(score(s_t, h_k))',
    explanation: 'Bahdanau (2014) introduced soft attention to allow a decoder state s_t to compute a dynamic alignment vector across all encoder hidden states h_i, breaking the fixed-vector compression bottleneck.',
    roleInTopic: 'Proved that dynamic weighted averaging of memory vectors solves long-range dependency decay.'
  },
  {
    id: 'self-attn',
    level: 7,
    title: 'SCALED DOT-PRODUCT SELF-ATTENTION',
    prereq: 'Cross-Attention',
    formula: 'Attention(Q, K, V) = softmax(QK^T / √d_k) V',
    explanation: 'Instead of attending between separate encoder and decoder networks, self-attention allows a sequence to attend to itself. Every token simultaneously queries every other token in the sequence with constant O(1) path length.',
    roleInTopic: 'The core computational engine that models global semantic syntax without recurrence.'
  },
  {
    id: 'transformer',
    level: 8,
    title: 'THE TRANSFORMER ARCHITECTURE',
    prereq: 'Self-Attention',
    formula: 'Block(x) = x + FFN(RMSNorm(x + Attention(RMSNorm(x))))',
    explanation: 'Combining Multi-Head Self-Attention with residual skip connections, layer normalization (RMSNorm), rotary positional encodings (RoPE), and feed-forward MLPs into an arbitrarily deep stacked foundation.',
    roleInTopic: 'The state-of-the-art computational paradigm behind all modern Large Language Models.'
  }
];

export default function FoundationsDependencyGraph({ foundations = null }) {
  const nodes = foundations || DEFAULT_FOUNDATIONS;
  const [selectedId, setSelectedId] = useState(nodes[nodes.length - 2].id); // Default to Self-Attention

  const activeNode = nodes.find(n => n.id === selectedId) || nodes[0];

  return (
    <div className="bg-[#FAF9F5] border-2 border-[#111111] p-5 sm:p-8 shadow-[6px_6px_0px_#111111] font-mono text-[#111111] space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#C9C7C0] pb-4">
        <div>
          <span className="text-[10px] text-[#FF1E27] font-bold uppercase tracking-widest block">
            THEORETICAL PREREQUISITE LADDER
          </span>
          <h3 className="font-syne font-extrabold text-xl sm:text-2xl uppercase tracking-tight text-[#111111]">
            Foundations Dependency Graph
          </h3>
        </div>
        <div className="text-[10px] text-stone-500 bg-white border border-[#C9C7C0] px-3 py-1">
          CLICK ANY NODE TO EXPAND MATHEMATICS & INTUITION
        </div>
      </div>

      {/* Dependency Hierarchy Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Visual Stack / Graph Nodes */}
        <div className="lg:col-span-5 space-y-2">
          {nodes.map((node, index) => {
            const isSelected = selectedId === node.id;

            return (
              <div key={node.id} className="relative">
                <button
                  type="button"
                  onClick={() => setSelectedId(node.id)}
                  className={`w-full p-3.5 border-2 text-left transition-all duration-200 flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-[#111111] border-[#FF1E27] text-white shadow-[4px_4px_0px_#FF1E27] translate-x-1'
                      : 'bg-white border-[#C9C7C0] hover:border-[#111111] text-[#111111]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 border ${
                      isSelected ? 'bg-[#FF1E27] text-white border-[#FF1E27]' : 'bg-[#EDECE6] text-[#555555] border-[#C9C7C0]'
                    }`}>
                      L{node.level}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wide">
                      {node.title}
                    </span>
                  </div>

                  <ChevronRight size={14} className={isSelected ? 'text-[#FF1E27]' : 'text-stone-400'} />
                </button>

                {/* Arrow Connector to next node */}
                {index < nodes.length - 1 && (
                  <div className="flex justify-center py-0.5">
                    <span className="text-[#C9C7C0] text-[10px] font-mono leading-none">↓</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right Column: Node Explanation & Math Lab */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeNode.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="bg-white border-2 border-[#111111] p-6 shadow-[5px_5px_0px_#111111] space-y-5"
            >
              <div className="flex items-center justify-between border-b border-[#E4E2DC] pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] bg-[#FF1E27] text-white font-bold px-2 py-0.5 uppercase tracking-wider">
                    LEVEL {activeNode.level} PREREQUISITE
                  </span>
                  <span className="text-[10px] text-stone-500">
                    REQUIRES: {activeNode.prereq}
                  </span>
                </div>
                <span className="w-2 h-2 rounded-full bg-[#FF1E27] animate-pulse" />
              </div>

              <div>
                <h4 className="font-syne font-extrabold text-xl text-[#111111] uppercase tracking-tight">
                  {activeNode.title}
                </h4>
              </div>

              {/* Mathematical Equation Box */}
              {activeNode.formula && (
                <div className="p-3.5 bg-[#FAF9F5] border border-[#C9C7C0] space-y-1">
                  <span className="text-[9px] text-[#888884] uppercase tracking-wider block">
                    MATHEMATICAL FORMULATION:
                  </span>
                  <div className="font-mono text-xs sm:text-sm font-bold text-[#111111] overflow-x-auto py-1">
                    {activeNode.formula}
                  </div>
                </div>
              )}

              {/* Detailed Conceptual Explanation */}
              <div className="space-y-2">
                <span className="text-[10px] text-[#FF1E27] font-bold uppercase tracking-wider block">
                  CONCEPTUAL INTUITION:
                </span>
                <p className="font-sans text-xs sm:text-sm text-[#333333] leading-relaxed">
                  {activeNode.explanation}
                </p>
              </div>

              {/* Role in Parent Architecture */}
              <div className="p-3 bg-[#EDECE6]/70 border border-[#C9C7C0] space-y-1">
                <span className="text-[10px] text-[#111111] font-bold uppercase tracking-wider block">
                  ROLE IN FINAL ARCHITECTURE:
                </span>
                <p className="font-sans text-xs text-stone-700 leading-relaxed">
                  {activeNode.roleInTopic}
                </p>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>

    </div>
  );
}
