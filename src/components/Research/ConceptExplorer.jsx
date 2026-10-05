import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Layers, HelpCircle, AlertTriangle, ArrowRight, BookOpen, Binary, Cpu } from 'lucide-react';

const EASE = [0.16, 1, 0.3, 1];

const DEFAULT_CONCEPTS = [
  {
    id: 'self-attention',
    title: 'SCALED DOT-PRODUCT SELF-ATTENTION',
    badge: 'CORE MECHANISM',
    summary: 'Direct O(1) all-to-all sequence token alignment calculating normalized pairwise affinity weights without recurrent hidden state propagation.',
    whatIsIt: 'Self-attention is an operation that transforms an input sequence of vectors into an output sequence where each vector is a weighted sum of all input vectors, weighted dynamically by their pairwise contextual relevance.',
    whyCreated: 'Prior sequence models (RNNs/LSTMs) encoded tokens sequentially, causing information decay across long contexts (vanishing gradient) and forcing sequential O(N) GPU computation that could not scale.',
    problemSolved: 'Eliminates the sequential information bottleneck. Any token can attend directly to any other token across arbitrary sequence lengths with constant path length O(1).',
    howItWorks: 'Computes Query, Key, and Value vectors via linear matrix projection. Computes raw dot product affinity QK^T, divides by sqrt(d_k) to prevent vanishing gradients in softmax, applies softmax normalization, and multiplies by Value V.',
    math: 'Attention(Q, K, V) = softmax((Q K^T) / sqrt(d_k)) * V',
    example: 'For sequence ["The", "animal", "didn\'t", "cross", "because", "it", "was", "tired"], token "it" produces maximum dot-product alignment with "animal" (weight 0.82), transferring its semantic identity into the updated representation of "it".',
    limitations: 'Quadratic computational and memory complexity O(N^2 * d) in sequence length N. Processing a 128k token document requires materializing large NxN attention matrices unless tiled via FlashAttention.',
    relatedConcepts: ['Multi-Head Projections', 'FlashAttention', 'Linear Attention', 'State-Space Models']
  },
  {
    id: 'multi-head',
    title: 'MULTI-HEAD ATTENTION (MHA)',
    badge: 'PARALLEL SUBSPACES',
    summary: 'Splitting Q, K, and V into h independent projection subspaces to capture orthogonal syntactic, grammatical, and semantic relationships simultaneously.',
    whatIsIt: 'Instead of performing a single attention calculation with d_model dimensions, Multi-Head Attention projects Q, K, and V into h heads of dimension d_k = d_model / h, computes attention in parallel, and concatenates the outputs.',
    whyCreated: 'A single attention head averages all token affinity relationships into one scalar distribution, preventing the model from simultaneously attending to syntax, coreference, and semantic role labeling.',
    problemSolved: 'Allows the model to jointly attend to information from different representation subspaces at different positions. One head can track grammatical subject-verb agreement while another tracks semantic entity resolution.',
    howItWorks: 'MultiHead(Q,K,V) = Concat(head_1, ..., head_h) * W^O where head_i = Attention(Q * W_i^Q, K * W_i^K, V * W_i^V).',
    math: 'd_model = 4096, h = 32 heads -> d_k = 128 per head. Output is projected through W^O in R^(4096 x 4096).',
    example: 'In the sentence "Alice threw the ball to Bob", Head 1 attends between "threw" and "ball" (action-object), while Head 4 attends between "threw" and "Alice" (action-agent).',
    limitations: 'Increases memory bandwidth overhead during autoregressive generation because each head requires caching its own independent Key and Value matrices in GPU SRAM/HBM.',
    relatedConcepts: ['Grouped-Query Attention (GQA)', 'Multi-Query Attention (MQA)', 'KV Cache Compression']
  },
  {
    id: 'rope',
    title: 'ROTARY POSITION EMBEDDINGS (RoPE)',
    badge: 'POSITION ENCODING',
    summary: 'Encoding positional coordinates by rotating query and key vectors in complex 2D subspaces, preserving relative token distances invariant under absolute shifts.',
    whatIsIt: 'RoPE (Su et al., 2021) encodes absolute position with a rotation matrix and simultaneously incorporates explicit relative position dependency in self-attention.',
    whyCreated: 'Transformers have permutation-invariant attention matrices. Without positional information, "dog bites man" produces identical attention scores to "man bites dog". Absolute sinusoidal embeddings failed to extrapolate beyond pretraining length.',
    problemSolved: 'Naturally extrapolates to longer context windows via NTK-aware scaling and frequency interpolation, maintaining decaying affinity as relative token distance increases.',
    howItWorks: 'Pairs consecutive vector elements (x_{2i}, x_{2i+1}) and rotates them by angle m * theta_i, where m is token sequence position and theta_i = 10000^(-2(i-1)/d). The dot product of two rotated vectors depends strictly on their relative distance (m - n).',
    math: '<R_m^d * q, R_n^d * k> = Re(q * k^* * e^(j(m-n)theta))',
    example: 'Tokens at positions 10 and 15 have relative distance 5. Tokens at positions 1000 and 1005 have relative distance 5. RoPE guarantees their dot products receive identical positional modulation.',
    limitations: 'High-frequency components degrade at extreme sequence extrapolation (e.g. 1M tokens) without frequency-base scaling (YaRN, LongRoPE).',
    relatedConcepts: ['ALiBi', 'Sinusoidal Positional Encoding', 'YaRN Context Extension']
  },
  {
    id: 'kv-cache',
    title: 'KEY-VALUE (KV) CACHING',
    badge: 'INFERENCE EFFICIENCY',
    summary: 'Caching previous Key and Value projection matrices in GPU high-bandwidth memory to prevent redundant O(N^2) recomputation during autoregressive token generation.',
    whatIsIt: 'During autoregressive decoding, each new token requires attending to all prior tokens. Instead of recalculating K and V for past tokens, they are saved in a GPU tensor buffer.',
    whyCreated: 'Without caching, generating token N requires re-running the forward pass for tokens 1 through N-1, turning generation time from O(N) into O(N^2) GEMMs.',
    problemSolved: 'Reduces per-step token generation latency from O(N^2) to O(N), changing the workload from compute-bound matrix multiplications to memory-bandwidth-bound tensor lookups.',
    howItWorks: 'During the initial prefill phase, all prompt tokens compute K and V and write them to the cache. In decoding, only the single new token vector is projected into Q, K_new, V_new. K_new and V_new are appended to the cache.',
    math: 'KV_Memory_Bytes = 2 * n_layers * n_heads * d_k * seq_len * batch_size * precision_bytes. For Llama-3-70B with 128k context, KV-cache requires ~65 GB per concurrent user.',
    example: 'In a 1000-token generation loop, step 500 computes only 1 new query vector against 500 cached key vectors, accelerating throughput by ~500x.',
    limitations: 'High memory footprint limits concurrent batch size on GPUs. Solved via PagedAttention (vLLM), Grouped-Query Attention (GQA), and 4-bit KV quantization.',
    relatedConcepts: ['PagedAttention', 'Grouped-Query Attention', 'KV Quantization (FP8/INT4)']
  }
];

export default function ConceptExplorer({ concepts = DEFAULT_CONCEPTS }) {
  const [expandedId, setExpandedId] = useState(concepts[0]?.id || null);
  const [activeTab, setActiveTab] = useState('what'); // 'what' | 'math' | 'example' | 'limits'

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="border border-[#C9C7C0] bg-[#FAF9F5] p-5 sm:p-7 space-y-6 font-mono text-[#111111]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#C9C7C0] pb-4">
        <div>
          <div className="flex items-center gap-2 text-[#FF1E27] text-xs font-bold uppercase tracking-widest">
            <Layers size={14} />
            <span>13 / CONCEPT EXPLORER & PROGRESSIVE DISCLOSURE</span>
          </div>
          <h3 className="font-syne text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#111111] mt-1">
            CORE MATHEMATICAL & ARCHITECTURAL ABSTRACTIONS
          </h3>
        </div>
        <div className="text-[10px] text-[#666660]">
          CLICK CONCEPT TO UNROLL DEEP TECHNICAL TELEMETRY
        </div>
      </div>

      <div className="space-y-3">
        {concepts.map((concept, index) => {
          const isExpanded = expandedId === concept.id;
          return (
            <div
              key={concept.id}
              className={`border transition-all ${
                isExpanded ? 'border-[#111111] bg-[#F1F0EB] shadow-sm' : 'border-[#C9C7C0] bg-[#FAF9F5] hover:border-[#111111]'
              }`}
            >
              {/* Header Bar */}
              <button
                onClick={() => toggleExpand(concept.id)}
                className="w-full p-4 flex items-center justify-between text-left cursor-pointer gap-4"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-[#FF1E27]">
                    0{index + 1}.
                  </span>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-syne text-sm sm:text-base font-bold text-[#111111] uppercase">
                        {concept.title}
                      </span>
                      <span className="bg-[#111111] text-white text-[9px] px-2 py-0.5 font-bold">
                        {concept.badge}
                      </span>
                    </div>
                    <p className="text-xs text-[#555555] font-sans mt-0.5 line-clamp-1">
                      {concept.summary}
                    </p>
                  </div>
                </div>

                <div className="p-1 text-[#555555]">
                  {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </div>
              </button>

              {/* Unrolled Progressive Disclosure Body */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="border-t border-[#C9C7C0] p-4 sm:p-6 space-y-5"
                  >
                    {/* Navigation Tabs */}
                    <div className="flex flex-wrap gap-2 border-b border-[#C9C7C0] pb-3 text-xs font-bold">
                      {[
                        { id: 'what', label: '01 / WHAT & WHY IT EXISTS' },
                        { id: 'math', label: '02 / MATHEMATICS & TENSORS' },
                        { id: 'example', label: '03 / WORKED EXAMPLE' },
                        { id: 'limits', label: '04 / LIMITATIONS & LIMITS' }
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`px-3 py-1.5 transition-colors cursor-pointer ${
                            activeTab === tab.id
                              ? 'bg-[#111111] text-white'
                              : 'bg-[#FAF9F5] border border-[#C9C7C0] text-[#555555] hover:text-[#111111]'
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>

                    {/* Tab 1: What is it & Why created */}
                    {activeTab === 'what' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
                        <div className="bg-[#FAF9F5] p-4 border border-[#C9C7C0] space-y-2">
                          <div className="text-[10px] font-mono font-bold text-[#FF1E27] uppercase">
                            WHAT IS IT?
                          </div>
                          <p className="text-[#333333] leading-relaxed">{concept.whatIsIt}</p>
                        </div>

                        <div className="bg-[#FAF9F5] p-4 border border-[#C9C7C0] space-y-2">
                          <div className="text-[10px] font-mono font-bold text-[#FF1E27] uppercase">
                            WHY WAS IT CREATED & PROBLEM SOLVED
                          </div>
                          <p className="text-[#333333] leading-relaxed">{concept.whyCreated}</p>
                          <div className="pt-2 border-t border-[#C9C7C0]/50 text-[11px] text-[#111111] font-bold">
                            Resolved: {concept.problemSolved}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Tab 2: Mathematics & Mechanism */}
                    {activeTab === 'math' && (
                      <div className="space-y-4">
                        <div className="bg-[#FAF9F5] p-4 border border-[#C9C7C0] space-y-2">
                          <div className="text-[10px] font-mono font-bold text-[#FF1E27] uppercase">
                            FORMAL MATHEMATICAL REPRESENTATION
                          </div>
                          <div className="font-mono text-xs sm:text-sm bg-[#EDECE6] p-3 border border-[#C9C7C0] text-[#111111] font-bold overflow-x-auto">
                            {concept.math}
                          </div>
                        </div>

                        <div className="bg-[#FAF9F5] p-4 border border-[#C9C7C0] space-y-2 text-xs font-sans">
                          <div className="text-[10px] font-mono font-bold text-[#FF1E27] uppercase">
                            HOW THE TENSORS INTERACT
                          </div>
                          <p className="text-[#333333] leading-relaxed">{concept.howItWorks}</p>
                        </div>
                      </div>
                    )}

                    {/* Tab 3: Worked Example */}
                    {activeTab === 'example' && (
                      <div className="bg-[#FAF9F5] p-4 border border-[#C9C7C0] space-y-2 text-xs font-sans">
                        <div className="text-[10px] font-mono font-bold text-[#FF1E27] uppercase">
                          CONCRETE NUMERICAL & LINGUISTIC APPLICATION
                        </div>
                        <p className="text-[#333333] leading-relaxed font-mono bg-[#EDECE6] p-3 border border-[#C9C7C0]">
                          {concept.example}
                        </p>
                      </div>
                    )}

                    {/* Tab 4: Limitations & Related Concepts */}
                    {activeTab === 'limits' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
                        <div className="bg-[#FAF9F5] p-4 border border-[#C9C7C0] space-y-2">
                          <div className="text-[10px] font-mono font-bold text-[#FF1E27] uppercase flex items-center gap-1.5">
                            <AlertTriangle size={12} />
                            <span>COMPUTATIONAL & MEMORY BOTTLENECKS</span>
                          </div>
                          <p className="text-[#333333] leading-relaxed">{concept.limitations}</p>
                        </div>

                        <div className="bg-[#FAF9F5] p-4 border border-[#C9C7C0] space-y-2">
                          <div className="text-[10px] font-mono font-bold text-[#FF1E27] uppercase">
                            CONNECTED ARCHITECTURAL ABSTRACTIONS
                          </div>
                          <div className="flex flex-wrap gap-2 pt-1 font-mono">
                            {concept.relatedConcepts.map((c) => (
                              <span key={c} className="bg-[#EDECE6] border border-[#C9C7C0] text-[#111111] px-2.5 py-1 text-[11px] font-bold">
                                {c}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
