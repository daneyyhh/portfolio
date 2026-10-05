import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight, Binary, Cpu, Layers, Sparkles } from 'lucide-react';

const ALGO_STEPS = [
  {
    step: 1,
    title: 'STEP 01: INPUT TOKENS & STRING TOKENIZATION',
    tensorName: 'Tokens: ["The", "animal", "didn\'t", "cross", "the", "street", "because", "it", "was", "too", "tired"]',
    dimensions: 'Input Length N = 11 tokens',
    description: 'Text is split into BPE vocabulary tokens. Each token represents an index into the model vocabulary V.',
    visualization: [
      { token: 'The', id: 464 },
      { token: 'animal', id: 7421 },
      { token: "didn't", id: 1845 },
      { token: 'cross', id: 3278 },
      { token: 'the', id: 262 },
      { token: 'street', id: 5410 },
      { token: 'because', id: 780 },
      { token: 'it', id: 340, highlight: true },
      { token: 'was', id: 373 },
      { token: 'too', id: 1165 },
      { token: 'tired', id: 8219, target: true }
    ],
    mathSnippet: 'Token_IDs = Tokenizer.encode("The animal didn\'t cross...")'
  },
  {
    step: 2,
    title: 'STEP 02: DENSE EMBEDDING LOOKUP & RoPE',
    tensorName: 'X_0 ∈ R^{N × d_model} (e.g. 11 × 4096)',
    dimensions: 'Shape: [Batch=1, Seq=11, Dim=4096]',
    description: 'Each token index retrieves a 4096-dimensional continuous vector from the embedding table. Rotary Positional Encodings (RoPE) rotate pairs of dimensions to inject relative distance information.',
    visualization: [
      { token: 'The', norm: '3.42' },
      { token: 'animal', norm: '4.18' },
      { token: 'cross', norm: '3.89' },
      { token: 'street', norm: '3.95' },
      { token: 'it', norm: '4.02', highlight: true },
      { token: 'tired', norm: '4.11', target: true }
    ],
    mathSnippet: 'X = Embedding[Tokens]; X_rotated = ApplyRoPE(X, pos=[0...10])'
  },
  {
    step: 3,
    title: 'STEP 03: QUERY, KEY, VALUE LINEAR PROJECTIONS',
    tensorName: 'Q = X W_q,  K = X W_k,  V = X W_v',
    dimensions: 'Shape: [Batch=1, Heads=32, Seq=11, d_head=128]',
    description: 'The embedding tensor is multiplied by 3 learnable weight matrices W_q, W_k, W_v. The Query represents what token i seeks, Key is what token j matches, and Value is the information transferred.',
    visualization: [
      { name: 'Query ("it")', vector: '[0.42, -0.81, 1.15, ...]' },
      { name: 'Key ("animal")', vector: '[0.39, -0.78, 1.09, ...]' },
      { name: 'Key ("street")', vector: '[-0.21, 0.44, -0.32, ...]' },
      { name: 'Value ("animal")', vector: '[1.85, 0.12, -0.94, ...]' }
    ],
    mathSnippet: 'Q_i = X_i W_q,  K_j = X_j W_k,  V_j = X_j W_v'
  },
  {
    step: 4,
    title: 'STEP 04: COMPUTING ATTENTION AFFINITY SCORES',
    tensorName: 'Raw Scores: S_{ij} = (Q_i · K_j) / √d_k',
    dimensions: 'Shape: [Batch=1, Heads=32, Seq=11, Seq=11]',
    description: 'Dot product between Query ("it") and all Keys ("The", "animal", "street", "tired"). Scaled by 1/√d_k (1/√128 ≈ 0.088) to prevent gradients from vanishing in extreme saturation regions.',
    visualization: [
      { pair: 'it → animal', score: '+18.4 (High match)' },
      { pair: 'it → street', score: '+3.1 (Low match)' },
      { pair: 'it → tired', score: '+12.7 (Contextual match)' },
      { pair: 'it → cross', score: '+4.2 (Weak match)' }
    ],
    mathSnippet: 'Scores = (Q @ K.transpose(-2, -1)) / math.sqrt(d_k)'
  },
  {
    step: 5,
    title: 'STEP 05: ROW-WISE SOFTMAX NORMALIZATION',
    tensorName: 'Attention Matrix: A = softmax(Scores, dim=-1)',
    dimensions: 'Matrix: A ∈ [0, 1]^{11 × 11}, sum(row) = 1.000',
    description: 'Exponentiating and normalizing raw scores converts them into strict probability distributions summing to 1.0 across the sequence.',
    visualization: [
      { pair: 'it → animal', weight: '0.782 (78.2%)', bar: 78.2 },
      { pair: 'it → tired', weight: '0.145 (14.5%)', bar: 14.5 },
      { pair: 'it → street', weight: '0.041 (4.1%)', bar: 4.1 },
      { pair: 'it → others', weight: '0.032 (3.2%)', bar: 3.2 }
    ],
    mathSnippet: 'A_{i,j} = exp(S_{i,j}) / sum_k(exp(S_{i,k}))'
  },
  {
    step: 6,
    title: 'STEP 06: WEIGHTED VALUES AGGREGATION',
    tensorName: 'Context Representation: O = A × V',
    dimensions: 'Shape: [Batch=1, Heads=32, Seq=11, d_head=128]',
    description: 'The attention weights act as mixing coefficients. The new representation of "it" is computed as 78.2% of the Value vector of "animal" plus 14.5% of "tired", successfully resolving coreference!',
    visualization: [
      { token: '"it" New State', composition: '78.2% [animal] + 14.5% [tired] + 7.3% [other]' }
    ],
    mathSnippet: 'Context_i = sum_j ( A_{i,j} * V_j )'
  },
  {
    step: 7,
    title: 'STEP 07: MULTI-HEAD PROJECTION & RESIDUAL OUTPUT',
    tensorName: 'Final Block Output: Y = RMSNorm(X + W_o [Head_1; ...; Head_H])',
    dimensions: 'Shape: [Batch=1, Seq=11, Dim=4096]',
    description: 'Outputs of all 32 attention heads are concatenated and multiplied by output matrix W_o. The result is added directly back to the input via a residual skip connection (x + f(x)) to preserve gradient flow.',
    visualization: [
      { stage: 'Head Concat', dim: '32 × 128 = 4096' },
      { stage: 'Linear W_o', dim: '4096 → 4096' },
      { stage: 'Residual Add', dim: 'X + Attention(X)' }
    ],
    mathSnippet: 'Output = W_o @ Concat(Head_1, ..., Head_H) + Residual'
  }
];

export default function AlgorithmExplorer() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  const stepData = ALGO_STEPS.find(s => s.step === currentStep) || ALGO_STEPS[0];

  // Auto-play interval timer
  useEffect(() => {
    let timer = null;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStep(prev => (prev >= ALGO_STEPS.length ? 1 : prev + 1));
      }, 2400);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const handleNext = () => {
    setIsPlaying(false);
    setCurrentStep(prev => Math.min(prev + 1, ALGO_STEPS.length));
  };

  const handlePrev = () => {
    setIsPlaying(false);
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(1);
  };

  return (
    <div className="bg-[#FAF9F5] border-2 border-[#111111] p-5 sm:p-8 shadow-[6px_6px_0px_#111111] font-mono text-[#111111] space-y-6">
      
      {/* Header Bar with Control Palette */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#C9C7C0] pb-4">
        <div>
          <span className="text-[10px] text-[#FF1E27] font-bold uppercase tracking-widest block">
            INTERACTIVE ALGORITHM STEPPER // 7-PHASE EXECUTION
          </span>
          <h3 className="font-syne font-extrabold text-xl sm:text-2xl uppercase tracking-tight text-[#111111]">
            Attention Algorithm Explorer
          </h3>
        </div>

        {/* Player Controls Bar */}
        <div className="flex items-center gap-1.5 bg-white border-2 border-[#111111] p-1 shadow-[2px_2px_0px_#111111]">
          <button
            onClick={handlePrev}
            disabled={currentStep === 1}
            className="p-1.5 hover:bg-[#111111] hover:text-white transition-colors disabled:opacity-30 cursor-pointer"
            title="Previous Step"
          >
            <ChevronLeft size={16} />
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-2.5 py-1 text-xs font-bold flex items-center gap-1.5 bg-[#FF1E27] text-white hover:bg-[#111111] transition-colors cursor-pointer"
            title={isPlaying ? "Pause Execution" : "Play Algorithm"}
          >
            {isPlaying ? <Pause size={12} /> : <Play size={12} />}
            <span>{isPlaying ? 'PAUSE' : 'PLAY'}</span>
          </button>

          <button
            onClick={handleNext}
            disabled={currentStep === ALGO_STEPS.length}
            className="p-1.5 hover:bg-[#111111] hover:text-white transition-colors disabled:opacity-30 cursor-pointer"
            title="Next Step"
          >
            <ChevronRight size={16} />
          </button>

          <button
            onClick={handleReset}
            className="p-1.5 hover:bg-[#111111] hover:text-white transition-colors cursor-pointer"
            title="Reset Execution to Step 1"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* Progress Dots Bar */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2">
        {ALGO_STEPS.map(s => {
          const isCurrent = s.step === currentStep;
          const isPassed = s.step < currentStep;

          return (
            <button
              key={s.step}
              onClick={() => {
                setIsPlaying(false);
                setCurrentStep(s.step);
              }}
              className={`p-2 border transition-all text-left cursor-pointer ${
                isCurrent
                  ? 'bg-[#111111] text-white border-[#FF1E27] shadow-[2px_2px_0px_#FF1E27]'
                  : isPassed
                  ? 'bg-[#EDECE6] text-[#111111] border-[#C9C7C0]'
                  : 'bg-white text-stone-400 border-[#E4E2DC]'
              }`}
            >
              <div className="text-[9px] font-bold">0{s.step}</div>
              <div className="hidden sm:block text-[8px] truncate mt-0.5 font-bold uppercase">
                {s.title.split(':')[1]?.trim() || s.title}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Step Showcase Canvas */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="bg-white border-2 border-[#111111] p-5 sm:p-7 shadow-[5px_5px_0px_#111111] space-y-5"
        >
          {/* Step Title & Dimensions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E4E2DC] pb-3">
            <div>
              <span className="text-[10px] text-[#FF1E27] font-bold uppercase tracking-widest block">
                EXECUTION STEP 0{stepData.step} / 07
              </span>
              <h4 className="font-bold text-base sm:text-lg text-[#111111] uppercase">
                {stepData.title}
              </h4>
            </div>

            <div className="text-[10px] bg-[#FAF9F5] border border-[#C9C7C0] px-2.5 py-1">
              <span className="text-stone-500">TENSOR DIMENSIONS: </span>
              <span className="font-bold text-[#111111]">{stepData.dimensions}</span>
            </div>
          </div>

          <p className="font-sans text-xs sm:text-sm text-[#333333] leading-relaxed max-w-3xl">
            {stepData.description}
          </p>

          {/* Dynamic Visual Content */}
          <div className="p-4 bg-[#FAF9F5] border border-[#C9C7C0] space-y-3">
            <div className="flex items-center justify-between text-[10px] font-mono text-[#888884] border-b border-[#E4E2DC] pb-2">
              <span>LIVE TENSOR STATE REPRESENTATION</span>
              <span>{stepData.tensorName}</span>
            </div>

            {/* Step 1: Token blocks */}
            {currentStep === 1 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {stepData.visualization.map((item, idx) => (
                  <div
                    key={idx}
                    className={`px-2.5 py-1.5 border text-xs ${
                      item.highlight
                        ? 'bg-[#FF1E27] text-white border-[#111111] font-bold scale-105'
                        : item.target
                        ? 'bg-[#111111] text-white border-[#111111] font-bold'
                        : 'bg-white text-[#111111] border-[#C9C7C0]'
                    }`}
                  >
                    <span className="block font-bold">"{item.token}"</span>
                    <span className="text-[9px] opacity-70">id:{item.id}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Step 5: Softmax Bars */}
            {currentStep === 5 && (
              <div className="space-y-2 pt-1">
                {stepData.visualization.map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="font-bold text-[#111111]">{item.pair}</span>
                      <span className="text-[#FF1E27] font-bold">{item.weight}</span>
                    </div>
                    <div className="w-full h-3 bg-[#E4E2DC] overflow-hidden">
                      <div
                        className="h-full bg-[#FF1E27] transition-all duration-500"
                        style={{ width: `${item.bar}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Other Steps: Structured Table or Vectors */}
            {currentStep !== 1 && currentStep !== 5 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs font-mono">
                {stepData.visualization.map((item, idx) => (
                  <div key={idx} className="p-2.5 bg-white border border-[#C9C7C0] flex items-center justify-between gap-2">
                    <span className="font-bold text-[#111111] truncate">{item.name || item.pair || item.stage || item.token}</span>
                    <span className="text-[#FF1E27] font-semibold text-[11px] truncate">{item.vector || item.score || item.composition || item.norm || item.dim}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Mathematical Snippet */}
          <div className="p-3 bg-[#EDECE6]/60 border border-[#C9C7C0] flex items-center justify-between text-xs font-mono flex-wrap gap-2">
            <span className="text-[10px] text-stone-500 uppercase font-bold">PYTORCH VECTORIZED TENSOR CALL:</span>
            <code className="text-[#111111] font-bold bg-white px-2 py-0.5 border border-[#C9C7C0]">
              {stepData.mathSnippet}
            </code>
          </div>

        </motion.div>
      </AnimatePresence>

    </div>
  );
}
