import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, AlertTriangle, ArrowDown, CheckCircle2, ChevronRight, HelpCircle } from 'lucide-react';

const CANONICAL_FAILURES = [
  {
    id: 'coref-collapse',
    title: 'ATTENTION SINK & KV-CACHE EVACUATION COLLAPSE',
    inputPrompt: '"The user streams 64,000 continuous tokens into an autoregressive model without resetting context."',
    modelProcessing: 'Sliding window attention evicts initial tokens (tokens 0..3) to fit inside finite 8k KV cache budget.',
    failureCondition: 'Token 0 (initial BOS/newline) acts as an "Attention Sink", collecting massive unnormalized Softmax probability mass.',
    incorrectOutput: 'Perplexity spikes to >10,000; the model outputs catastrophic repetitive loops or gibberish (Xiao et al., 2023).',
    observation: 'OBSERVATION: When initial 4 tokens are deleted from the KV cache, model perplexity immediately explodes, regardless of how much subsequent text remains in context.',
    interpretation: 'INTERPRETATION: Softmax requires attention weights across keys to sum to 1. Even when no token is semantically relevant, the network dumps residual probability onto the first token. Removing it destroys the internal normalization invariant.',
    mitigation: 'StreamingLLM (Xiao et al., 2023): Retain the initial 4 sink tokens in the KV-cache permanently alongside the sliding window buffer.'
  },
  {
    id: 'hallucination-sycophancy',
    title: 'SYCOPHANCY & RAG REVERSAL FAILURE',
    inputPrompt: '"Query: Who discovered the electron? Context provided: In 1897, Albert Einstein discovered the electron."',
    modelProcessing: 'Model weights encode J.J. Thomson (1897) with high parametric prior, but in-context attention weights attend heavily to the user-provided erroneous context.',
    failureCondition: 'Parametric memory clashes directly with non-parametric retrieval tokens (Sycophancy vs Prior).',
    incorrectOutput: '"Albert Einstein discovered the electron in 1897." (Model confidently yields to erroneous in-context retrieval).',
    observation: 'OBSERVATION: Frontier models defer to incorrect context ~82% of the time when context explicitly contradicts pre-training weights.',
    interpretation: 'INTERPRETATION: RLHF tuning heavily penalizes models for ignoring provided retrieval passages in QA benchmarks, conditioning the attention heads to over-trust context over internal weights.',
    mitigation: 'Bidirectional conflict detection with calibration verification tokens and confidence scoring before synthesis.'
  },
  {
    id: 'length-extrapolation',
    title: 'ROPE FREQUENCY EXTENSION LOSS (NEEDLE IN A HAYSTACK)',
    inputPrompt: '"A secret passkey is embedded at depth 48% within a 200,000-token document evaluated on an 8k-trained model."',
    modelProcessing: 'Rotary Position Embeddings rotate Query/Key pairs at frequency θ_i = 10000^{-2(i-1)/d}.',
    failureCondition: 'Positions past index 8,192 encounter rotation angles never seen during pre-training phase.',
    incorrectOutput: 'Model fails to locate the passkey; retrieval accuracy drops from 99.8% to <12% at the 16k boundary.',
    observation: 'OBSERVATION: Standard Transformer models fail catastrophically when evaluating sequence lengths greater than training length L_train.',
    interpretation: 'INTERPRETATION: Dot products Q · K depend on (m - n)θ. Unseen position offsets produce out-of-distribution rotation angles, breaking the learned attention query manifolds.',
    mitigation: 'Dynamic NTK-aware RoPE frequency scaling or YaRN (Yet another RoPE extensioN) interpolation.'
  }
];

export default function FailureCascade({ failures = null }) {
  const failureCases = failures || CANONICAL_FAILURES;
  const [selectedCaseId, setSelectedCaseId] = useState(failureCases[0].id);

  const activeCase = failureCases.find(c => c.id === selectedCaseId) || failureCases[0];

  return (
    <div className="bg-[#FAF9F5] border-2 border-[#111111] p-5 sm:p-8 shadow-[6px_6px_0px_#111111] font-mono text-[#111111] space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#C9C7C0] pb-4">
        <div>
          <span className="text-[10px] text-[#FF1E27] font-bold uppercase tracking-widest block">
            LIMITATIONS & FAILURE ANALYSIS // EMPIRICAL STRESS TESTS
          </span>
          <h3 className="font-syne font-extrabold text-xl sm:text-2xl uppercase tracking-tight text-[#111111]">
            Failure Cascade Architecture
          </h3>
        </div>
        <div className="text-[10px] text-stone-500 bg-white border border-[#C9C7C0] px-3 py-1">
          SEPARATION OF EMPIRICAL OBSERVATION & THEORETICAL INTERPRETATION
        </div>
      </div>

      {/* Case Selector Tabs */}
      <div className="flex flex-wrap gap-2 pt-1">
        {failureCases.map(fc => (
          <button
            key={fc.id}
            onClick={() => setSelectedCaseId(fc.id)}
            className={`px-3 py-2 border-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              selectedCaseId === fc.id
                ? 'bg-[#111111] text-white border-[#FF1E27] shadow-[3px_3px_0px_#FF1E27]'
                : 'bg-white text-[#111111] border-[#C9C7C0] hover:border-[#111111]'
            }`}
          >
            {fc.title.split('&')[0].trim()}
          </button>
        ))}
      </div>

      {/* Visual Failure Flow Pipeline (Input → Model → Failure Condition → Incorrect Output) */}
      <div className="space-y-3 pt-2">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          
          {/* Step 1: Input */}
          <div className="p-4 bg-white border border-[#C9C7C0] space-y-1">
            <span className="text-[10px] text-stone-500 font-bold uppercase tracking-wider block">
              01 // INPUT TRIGGER
            </span>
            <p className="font-sans text-xs text-[#333333] leading-relaxed">
              {activeCase.inputPrompt}
            </p>
          </div>

          {/* Step 2: Model Processing */}
          <div className="p-4 bg-white border border-[#C9C7C0] space-y-1">
            <span className="text-[10px] text-[#111111] font-bold uppercase tracking-wider block">
              02 // MODEL INTERNAL STATE
            </span>
            <p className="font-sans text-xs text-[#333333] leading-relaxed">
              {activeCase.modelProcessing}
            </p>
          </div>

          {/* Step 3: Failure Condition */}
          <div className="p-4 bg-white border-2 border-[#FF1E27] space-y-1">
            <span className="text-[10px] text-[#FF1E27] font-bold uppercase tracking-wider block">
              03 // FAILURE CONDITION
            </span>
            <p className="font-sans text-xs text-[#111111] font-bold leading-relaxed">
              {activeCase.failureCondition}
            </p>
          </div>

          {/* Step 4: Incorrect Output */}
          <div className="p-4 bg-[#111111] text-white border border-[#111111] space-y-1">
            <span className="text-[10px] text-[#FF1E27] font-bold uppercase tracking-wider block">
              04 // INCORRECT OUTPUT
            </span>
            <p className="font-sans text-xs text-stone-200 leading-relaxed">
              {activeCase.incorrectOutput}
            </p>
          </div>

        </div>

        {/* Observation vs Interpretation Rigorous Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          
          <div className="p-4 bg-[#FAF9F5] border border-[#C9C7C0] space-y-1">
            <div className="flex items-center gap-1.5 text-[10px] text-[#111111] font-bold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
              <span>EMPIRICAL OBSERVATION (WHAT HAPPENED IN BENCHMARK)</span>
            </div>
            <p className="font-sans text-xs text-[#333333] leading-relaxed pt-1">
              {activeCase.observation}
            </p>
          </div>

          <div className="p-4 bg-[#FAF9F5] border border-[#C9C7C0] space-y-1">
            <div className="flex items-center gap-1.5 text-[10px] text-[#FF1E27] font-bold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF1E27]" />
              <span>THEORETICAL ROOT CAUSE (WHY IT FAILED)</span>
            </div>
            <p className="font-sans text-xs text-[#333333] leading-relaxed pt-1">
              {activeCase.interpretation}
            </p>
          </div>

        </div>

        {/* Recommended Mitigation */}
        <div className="p-4 bg-emerald-50 border border-emerald-300 flex items-start gap-3">
          <CheckCircle2 size={16} className="text-emerald-700 shrink-0 mt-0.5" />
          <div className="space-y-0.5 text-xs font-mono">
            <span className="font-bold text-emerald-800 uppercase tracking-wider">
              VERIFIED ARCHITECTURAL MITIGATION:
            </span>
            <p className="font-sans text-emerald-950">
              {activeCase.mitigation}
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
