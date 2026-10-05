import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ChevronDown, ChevronUp, BookOpen, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';

export default function VisualTimeline({ timelineData = [], defaultMilestones = null }) {
  const [expandedIndex, setExpandedIndex] = useState(0);

  // Curated deep-dive canonical milestones if topic does not supply its own
  const milestones = defaultMilestones || (timelineData.length > 0 ? timelineData.map((item, idx) => ({
    era: item.year || item.era || `STAGE ${idx + 1}`,
    title: item.event?.split('.')[0] || item.title || 'Historical Milestone',
    whatHappened: item.event || item.whatHappened || 'Pioneering mathematical or algorithmic breakthrough established.',
    whyItMattered: item.whyItMattered || 'Overcame sequential computation bottlenecks and introduced parallel tensor representations.',
    whatChanged: item.whatChanged || 'Deprecated pure recurrence loops in favor of dense global context lookups.',
    keyPaper: item.keyPaper || 'Vaswani et al. (2017) "Attention Is All You Need", NeurIPS.',
    sourceUrl: item.sourceUrl || 'https://arxiv.org/abs/1706.03762'
  })) : [
    {
      era: "1950s",
      title: "EARLY AI & SYMBOLIC FOUNDATIONS",
      whatHappened: "Alan Turing proposes the Turing Test in 'Computing Machinery and Intelligence' (1950); Frank Rosenblatt invents the Perceptron (1958) at Cornell Aeronautical Laboratory.",
      whyItMattered: "Established the fundamental question of whether machines can simulate human cognition through linear threshold computing units.",
      whatChanged: "Shifted focus from abstract philosophical logic to physical electro-mechanical synaptic networks.",
      keyPaper: "Rosenblatt, F. (1958). 'The Perceptron: A Probabilistic Model for Information Storage and Organization in the Brain.'",
      sourceUrl: "https://psycnet.apa.org/record/1959-09865-001"
    },
    {
      era: "1980s",
      title: "CONNECTIONISM & BACKPROPAGATION",
      whatHappened: "Rumelhart, Hinton, and Williams popularize the backpropagation algorithm (1986), enabling multi-layer feedforward networks to learn internal representations.",
      whyItMattered: "Resolved the fatal critique by Minsky and Papert (1969) that single-layer perceptrons could not compute non-linear functions like XOR.",
      whatChanged: "Allowed gradient descent with the chain rule to train deep internal feature layers automatically.",
      keyPaper: "Rumelhart, D. E., Hinton, G. E., & Williams, R. J. (1986). 'Learning representations by back-propagating errors.' Nature, 323(6088), 533-536.",
      sourceUrl: "https://www.nature.com/articles/323533a0"
    },
    {
      era: "1990s",
      title: "STATISTICAL METHODS & SEQUENCE BARRIERS",
      whatHappened: "Support Vector Machines (Cortes & Vapnik, 1995) and LSTMs (Hochreiter & Schmidhuber, 1997) emerge; statistical n-gram models dominate language processing.",
      whyItMattered: "Mitigated exponential vanishing and exploding gradients in recurrent networks via constant error carousels (gates).",
      whatChanged: "Sequence learning could bridge 100+ steps, but sequential unrolling remained strictly single-threaded.",
      keyPaper: "Hochreiter, S., & Schmidhuber, J. (1997). 'Long Short-Term Memory.' Neural Computation, 9(8), 1735-1780.",
      sourceUrl: "https://doi.org/10.1162/neco.1997.9.8.1735"
    },
    {
      era: "2010s",
      title: "DEEP LEARNING & GPU ACCELERATION",
      whatHappened: "Krizhevsky, Sutskever, and Hinton win ImageNet with AlexNet (2012) using CUDA GPUs; Bahdanau et al. (2014) introduce additive soft attention for Seq2Seq translation.",
      whyItMattered: "Demonstrated that high-compute GPU parallelism combined with big data beats handcrafted feature engineering.",
      whatChanged: "Soft attention allowed decoders to dynamically look back at encoder hidden states, eliminating the fixed-vector compression bottleneck.",
      keyPaper: "Bahdanau, D., Cho, K., & Bengio, Y. (2014). 'Neural Machine Translation by Jointly Learning to Align and Translate.' ICLR 2015.",
      sourceUrl: "https://arxiv.org/abs/1409.0473"
    },
    {
      era: "2017",
      title: "THE TRANSFORMER BREAKTHROUGH",
      whatHappened: "Vaswani et al. publish 'Attention Is All You Need', discarding recurrence and convolutions entirely in favor of scaled dot-product multi-head self-attention.",
      whyItMattered: "Eliminated the O(N) sequential computation bottleneck; allowed all tokens in sequence length N to attend to every other token with O(1) path length and 100% GPU matrix-multiplication saturation.",
      whatChanged: "Language modeling became infinitely parallelizable across clusters, unlocking the scaling laws of modern AI.",
      keyPaper: "Vaswani, A., et al. (2017). 'Attention Is All You Need.' Advances in Neural Information Processing Systems (NeurIPS 30).",
      sourceUrl: "https://arxiv.org/abs/1706.03762"
    },
    {
      era: "2020s",
      title: "FOUNDATION MODELS & EMPIRICAL SCALING",
      whatHappened: "Kaplan et al. (2020) formulate neural scaling laws; GPT-3 (175B), PaLM (540B), and LLaMA democratize open weights; instruction tuning (RLHF) aligns base models.",
      whyItMattered: "Proved that cross-entropy loss scales smoothly as a pure power-law function of compute, dataset size, and parameter count.",
      whatChanged: "Shifted paradigm from task-specific fine-tuning to generalist in-context learners steered by natural language prompts.",
      keyPaper: "Brown, T., et al. (2020). 'Language Models are Few-Shot Learners.' NeurIPS 2020.",
      sourceUrl: "https://arxiv.org/abs/2005.14165"
    },
    {
      era: "2026",
      title: "CURRENT FRONTIER — REASONING & AGENTS",
      whatHappened: "Test-time compute scaling (OpenAI o1/o3, DeepSeek R1), hybrid State-Space Transformers (Mamba-2 / Jamba), FlashAttention-3, and autonomous agent systems operating live software toolchains.",
      whyItMattered: "Shifts from pre-training token memorization to test-time chain-of-thought verification, Monte Carlo tree search, and programmatic self-correction.",
      whatChanged: "Models solve competitive programming and PhD-level mathematical Olympiad proofs through reinforcement-guided thinking traces.",
      keyPaper: "DeepSeek-AI (2025). 'DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning.'",
      sourceUrl: "https://arxiv.org/abs/2501.12948"
    }
  ]);

  return (
    <div className="bg-[#FAF9F5] border-2 border-[#111111] p-5 sm:p-8 shadow-[6px_6px_0px_#111111] font-mono text-[#111111] space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#C9C7C0] pb-4">
        <div>
          <span className="text-[10px] text-[#FF1E27] font-bold uppercase tracking-widest block">
            HISTORICAL GENEALOGY // 1950 — 2026
          </span>
          <h3 className="font-syne font-extrabold text-xl sm:text-2xl uppercase tracking-tight text-[#111111]">
            Visual Historical Timeline
          </h3>
        </div>
        <div className="text-[10px] text-stone-500 bg-white border border-[#C9C7C0] px-3 py-1">
          EXPANDABLE MILESTONES // CLICK TO INSPECT
        </div>
      </div>

      {/* Interactive Timeline Stepper */}
      <div className="relative pl-6 sm:pl-10 space-y-6">
        
        {/* Continuous Spine Line */}
        <div className="absolute left-2.5 sm:left-4 top-4 bottom-4 w-[2px] bg-gradient-to-b from-[#111111] via-[#FF1E27] to-[#111111]" />

        {milestones.map((m, index) => {
          const isExpanded = expandedIndex === index;

          return (
            <div key={index} className="relative group">
              
              {/* Stepper Node on Line */}
              <button
                type="button"
                onClick={() => setExpandedIndex(isExpanded ? null : index)}
                className={`absolute -left-6 sm:-left-10 top-3.5 -translate-x-1/2 w-6 h-6 border-2 transition-all flex items-center justify-center cursor-pointer ${
                  isExpanded
                    ? 'bg-[#FF1E27] border-[#111111] text-white scale-110 shadow-sm'
                    : 'bg-white border-[#111111] hover:border-[#FF1E27] text-[#111111]'
                }`}
                title={`Toggle milestone ${m.era}`}
              >
                <div className={`w-1.5 h-1.5 ${isExpanded ? 'bg-white' : 'bg-[#111111]'}`} />
              </button>

              {/* Milestone Card Container */}
              <div
                onClick={() => setExpandedIndex(isExpanded ? null : index)}
                className={`border-2 transition-all duration-200 cursor-pointer ${
                  isExpanded
                    ? 'border-[#111111] bg-white shadow-[4px_4px_0px_#111111]'
                    : 'border-[#C9C7C0] bg-[#FAF9F5] hover:border-[#111111] hover:bg-white'
                }`}
              >
                {/* Clickable Header Row */}
                <div className="p-4 sm:p-5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                    <span className={`text-xs sm:text-sm font-extrabold px-2.5 py-0.5 border ${
                      isExpanded
                        ? 'bg-[#111111] text-white border-[#111111]'
                        : 'bg-[#EDECE6] text-[#FF1E27] border-[#C9C7C0]'
                    }`}>
                      {m.era}
                    </span>
                    <span className="font-bold text-xs sm:text-sm text-[#111111] uppercase tracking-wide">
                      {m.title}
                    </span>
                  </div>

                  <div className="shrink-0 text-[#888884] group-hover:text-[#111111] transition-colors">
                    {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </div>

                {/* Expandable Details Tray */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden border-t border-[#E4E2DC] bg-[#FAF9F5]"
                    >
                      <div className="p-4 sm:p-6 space-y-4 text-xs font-mono">
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-white p-3.5 border border-[#C9C7C0] space-y-1">
                            <span className="text-[10px] text-[#FF1E27] font-bold uppercase tracking-wider block">
                              01 // WHAT HAPPENED
                            </span>
                            <p className="font-sans text-[12px] text-[#333333] leading-relaxed">
                              {m.whatHappened}
                            </p>
                          </div>

                          <div className="bg-white p-3.5 border border-[#C9C7C0] space-y-1">
                            <span className="text-[10px] text-[#111111] font-bold uppercase tracking-wider block">
                              02 // WHY IT MATTERED
                            </span>
                            <p className="font-sans text-[12px] text-[#333333] leading-relaxed">
                              {m.whyItMattered}
                            </p>
                          </div>

                          <div className="bg-white p-3.5 border border-[#C9C7C0] space-y-1">
                            <span className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider block">
                              03 // WHAT CHANGED
                            </span>
                            <p className="font-sans text-[12px] text-[#333333] leading-relaxed">
                              {m.whatChanged}
                            </p>
                          </div>
                        </div>

                        {/* Verified Paper / Primary Source */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-[#C9C7C0] text-[11px]">
                          <div className="flex items-center gap-2 text-stone-600">
                            <BookOpen size={13} className="text-[#FF1E27] shrink-0" />
                            <span className="font-bold text-[#111111]">KEY PAPER / PRIMARY CITATION:</span>
                            <span className="italic truncate max-w-sm sm:max-w-md">{m.keyPaper}</span>
                          </div>

                          {m.sourceUrl && (
                            <a
                              href={m.sourceUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#FF1E27] font-bold hover:underline inline-flex items-center gap-1 shrink-0"
                            >
                              <span>ARXIV / DOI</span>
                              <ExternalLink size={12} />
                            </a>
                          )}
                        </div>

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
}
