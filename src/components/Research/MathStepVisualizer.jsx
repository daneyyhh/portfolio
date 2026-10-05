import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Binary, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function MathStepVisualizer() {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      step: 1,
      title: "Query & Key Dot-Product (QKᵀ)",
      latex: "Scores = Q * K^T",
      shapeEquation: "[N, d_k] × [d_k, N] = [N, N]",
      explanation: "Every query vector q_i computes a scalar dot-product with every key vector k_j across the sequence. A sequence of N tokens produces an N × N square matrix containing all N² pairwise cross-token affinities.",
      numericalExample: "Let q = [1.2, -0.4, 0.8, 0.1] and k = [0.9, -0.2, 1.1, -0.5]. Dot product q · k = (1.2×0.9) + (-0.4×-0.2) + (0.8×1.1) + (0.1×-0.5) = 1.08 + 0.08 + 0.88 - 0.05 = 1.99.",
      insight: "Measures raw unnormalized directional alignment in high-dimensional vector space."
    },
    {
      step: 2,
      title: "Variance Scaling Factor (1 / √d_k)",
      latex: "ScaledScores = (Q * K^T) / sqrt(d_k)",
      shapeEquation: "[N, N] / scalar = [N, N]",
      explanation: "Assuming components of q and k are independent random variables with zero mean and variance 1, their dot product has variance d_k. For d_k = 128, std dev is √128 ≈ 11.31. Unscaled scores would grow large, pushing softmax into extreme saturation where gradients vanish (dSoftmax/dz ≈ 0).",
      numericalExample: "Raw score 1.99 divided by √4 (since d_k = 4) = 1.99 / 2.0 = 0.995.",
      insight: "Prevents vanishing gradients during backpropagation through softmax."
    },
    {
      step: 3,
      title: "Causal Masking & Softmax Normalization",
      latex: "A = softmax( (Q * K^T) / sqrt(d_k) + M )",
      shapeEquation: "softmax([N, N]) across columns = [N, N] (rows sum to 1.0)",
      explanation: "For autoregressive generation, upper-triangular elements (future tokens) are masked with -∞ so exp(-∞) = 0. Softmax exponentiates scores and normalizes each row so attention weights sum strictly to 1.0, forming a valid probability distribution.",
      numericalExample: "Row scores [0.995, -0.42, 1.84] → Exponentials [2.70, 0.66, 6.30] → Sum = 9.66 → Probabilities [0.28, 0.07, 0.65].",
      insight: "Converts continuous geometric affinities into differentiable routing weights."
    },
    {
      step: 4,
      title: "Value Aggregation (A × V)",
      latex: "Output = A * V",
      shapeEquation: "[N, N] × [N, d_v] = [N, d_v]",
      explanation: "The attention probability matrix A multiplies the Value matrix V. Every output token representation becomes a linear combination of all value vectors, weighted precisely by how much attention was allocated to each position.",
      numericalExample: "Token 1 receives 28% of Value_1 + 7% of Value_2 + 65% of Value_3.",
      insight: "Produces dynamic, context-aware representations where words absorb relevant information from their surrounding context."
    }
  ];

  const active = steps[currentStep];

  return (
    <div className="border border-white/20 bg-[#08080C] p-5 sm:p-7 font-mono text-slate-200 my-8 shadow-2xl">
      <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Binary size={16} className="text-[#FF1E27]" />
          <span className="font-bold text-xs uppercase tracking-wider text-white">
            STEP-BY-STEP MATHEMATICAL DERIVATION: Attention(Q, K, V)
          </span>
        </div>

        {/* Step Counter Pills */}
        <div className="flex items-center gap-1.5">
          {steps.map((s, idx) => (
            <button
              key={s.step}
              onClick={() => setCurrentStep(idx)}
              className={`w-7 h-7 text-xs font-bold border transition-colors cursor-pointer flex items-center justify-center ${
                currentStep === idx
                  ? 'bg-[#FF1E27] text-white border-[#FF1E27]'
                  : 'bg-white/5 text-slate-300 border-white/10 hover:border-white/30'
              }`}
            >
              0{s.step}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active.step}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="space-y-5"
        >
          {/* Step Header */}
          <div className="flex items-center justify-between">
            <h4 className="text-sm sm:text-base font-bold text-white uppercase tracking-tight">
              STAGE 0{active.step} // {active.title}
            </h4>
            <span className="text-[10px] text-[#FF1E27] font-bold tracking-widest uppercase">
              TENSOR STEP {active.step} OF 4
            </span>
          </div>

          {/* Formula Display Box */}
          <div className="bg-[#101018] border border-white/15 p-4 rounded-none space-y-1">
            <span className="text-[10px] text-slate-300 uppercase tracking-widest block font-bold">
              EQUATION:
            </span>
            <div className="text-base sm:text-lg font-bold text-[#FF1E27] font-mono">
              {active.latex}
            </div>
            <div className="text-xs text-emerald-400 font-mono pt-1">
              Dimension Flow: {active.shapeEquation}
            </div>
          </div>

          {/* Explanation */}
          <div className="text-xs text-slate-300 leading-relaxed space-y-1">
            <span className="text-[10px] text-slate-300 uppercase tracking-widest block font-bold">
              THEORETICAL EXPLANATION:
            </span>
            <p>{active.explanation}</p>
          </div>

          {/* Concrete Numerical Example */}
          <div className="bg-white/[0.02] border border-white/10 p-3.5 space-y-1 text-xs">
            <span className="text-[10px] text-slate-300 uppercase tracking-widest block font-bold">
              WORKED NUMERICAL EXAMPLE:
            </span>
            <p className="text-slate-200">{active.numericalExample}</p>
          </div>

          {/* Core Takeaway Insight */}
          <div className="p-3 bg-[#FF1E27]/10 border border-[#FF1E27]/30 text-xs text-slate-200 flex items-start gap-2">
            <span className="text-[#FF1E27] font-bold shrink-0">KEY TAKEAWAY:</span>
            <span>{active.insight}</span>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center pt-6 mt-6 border-t border-white/10 text-xs">
        <button
          onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
          disabled={currentStep === 0}
          className="px-3 py-1.5 bg-white/5 border border-white/10 text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
        >
          ← PREVIOUS STEP
        </button>

        <span className="text-[11px] text-slate-300 font-mono">
          {currentStep + 1} / {steps.length}
        </span>

        <button
          onClick={() => setCurrentStep((prev) => Math.min(steps.length - 1, prev + 1))}
          disabled={currentStep === steps.length - 1}
          className="px-3 py-1.5 bg-[#FF1E27] border border-[#FF1E27] text-white font-bold hover:bg-[#E00208] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
        >
          NEXT STEP →
        </button>
      </div>
    </div>
  );
}
