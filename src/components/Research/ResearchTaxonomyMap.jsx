import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Network, GitBranch, Sparkles, Compass, CheckCircle2, Clock, Activity } from 'lucide-react';

const EASE = [0.16, 1, 0.3, 1];

// Interactive hierarchical research taxonomy tree
const TAXONOMY_NODES = {
  ai: {
    id: 'ai',
    title: 'ARTIFICIAL INTELLIGENCE',
    level: 0,
    category: 'ROOT DISCIPLINE',
    code: 'AI-ROOT',
    description: 'The formal study and algorithmic synthesis of computational intelligence, sequence representation, and automated inference.',
    status: 'FOUNDATION',
    slug: 'transformers-attention',
    children: ['ml', 'dl', 'genai'],
    parents: [],
    prereqs: ['Mathematics', 'Linear Algebra', 'Information Theory']
  },
  ml: {
    id: 'ml',
    title: 'MACHINE LEARNING',
    level: 1,
    category: 'PARADIGM',
    code: 'ML-01',
    description: 'Statistical optimization, empirical loss minimization, and probabilistic inference over data distributions without hardcoded rule systems.',
    status: 'DOCUMENTED',
    slug: 'benchmarks-and-saturation',
    children: ['rl_ml'],
    parents: ['ai'],
    prereqs: ['Multivariate Calculus', 'Probability Distributions']
  },
  dl: {
    id: 'dl',
    title: 'DEEP LEARNING',
    level: 1,
    category: 'PARADIGM',
    code: 'DL-02',
    description: 'Hierarchical representation learning through layered non-linear activations, backpropagation, and dense tensor transformations.',
    status: 'DOCUMENTED',
    slug: 'transformers-attention',
    children: ['transformers', 'cv'],
    parents: ['ai'],
    prereqs: ['Backpropagation', 'Stochastic Gradient Descent']
  },
  genai: {
    id: 'genai',
    title: 'GENERATIVE AI',
    level: 1,
    category: 'APPLICATION',
    code: 'GENAI-03',
    description: 'Probabilistic modeling of high-dimensional data distributions capable of synthesizing novel text, code, audio, and visual representations.',
    status: 'DOCUMENTED',
    slug: 'how-llms-work',
    children: ['llms', 'multimodal'],
    parents: ['ai'],
    prereqs: ['Autoregressive Modeling', 'Maximum Likelihood Estimation']
  },
  rl_ml: {
    id: 'rl_ml',
    title: 'REINFORCEMENT LEARNING',
    level: 2,
    category: 'LEARNING MODEL',
    code: 'RL-04',
    description: 'Markov decision processes, reward optimization, policy gradients, and dynamic environment interaction (RLHF / DPO).',
    status: 'UPDATED',
    slug: 'reinforcement-learning',
    children: [],
    parents: ['ml'],
    prereqs: ['Markov Decision Processes', 'Bellman Optimality']
  },
  transformers: {
    id: 'transformers',
    title: 'TRANSFORMERS & ATTENTION',
    level: 2,
    category: 'CORE ARCHITECTURE',
    code: 'RBG-RES-02',
    description: 'Scaled dot-product self-attention mechanism that discarded recurrence for constant O(1) path length across token sequences.',
    status: 'UPDATED',
    slug: 'transformers-attention',
    children: ['llms'],
    parents: ['dl'],
    prereqs: ['Multi-Head Projections', 'Scaled Dot-Product']
  },
  cv: {
    id: 'cv',
    title: 'COMPUTER VISION',
    level: 2,
    category: 'PERCEPTION',
    code: 'RBG-RES-14',
    description: 'Spatial feature extraction, convolutional inductive bias, vision transformers (ViT), and latent patch embeddings.',
    status: 'DOCUMENTED',
    slug: 'computer-vision',
    children: ['multimodal'],
    parents: ['dl'],
    prereqs: ['Spatial Convolutions', 'Patch Tokenization']
  },
  llms: {
    id: 'llms',
    title: 'LARGE LANGUAGE MODELS',
    level: 2,
    category: 'FOUNDATION MODEL',
    code: 'RBG-RES-01',
    description: 'Autoregressive probability distribution predictors trained over trillions of tokens displaying emergent reasoning and in-context learning.',
    status: 'DOCUMENTED',
    slug: 'how-llms-work',
    children: ['rag', 'agents', 'memory'],
    parents: ['genai', 'transformers'],
    prereqs: ['Transformers', 'Compute Scaling Laws']
  },
  multimodal: {
    id: 'multimodal',
    title: 'MULTIMODAL AI',
    level: 2,
    category: 'CROSS-MODAL',
    code: 'RBG-RES-13',
    description: 'Joint representation spaces binding visual patch tokens and language embeddings (CLIP, cross-attention projection).',
    status: 'RESEARCHING',
    slug: 'multimodal-ai',
    children: [],
    parents: ['genai', 'cv'],
    prereqs: ['Contrastive Learning', 'Cross-Attention']
  },
  rag: {
    id: 'rag',
    title: 'RETRIEVAL-AUGMENTED GENERATION',
    level: 3,
    category: 'HYBRID SYSTEMS',
    code: 'RBG-RES-03',
    description: 'Coupling non-parametric external vector memory stores with parametric autoregressive generators to eliminate hallucination.',
    status: 'DOCUMENTED',
    slug: 'retrieval-augmented-generation',
    children: ['retrieval'],
    parents: ['llms'],
    prereqs: ['Dense Vector Embeddings', 'Cosine Similarity HNSW']
  },
  agents: {
    id: 'agents',
    title: 'AI AGENTS & TOOL USE',
    level: 3,
    category: 'COGNITIVE ARCHITECTURE',
    code: 'RBG-RES-04',
    description: 'Autonomous multi-step reasoning loops (ReAct, Plan-and-Solve) invoking external deterministic APIs and code execution sandboxes.',
    status: 'EXPERIMENTING',
    slug: 'ai-agents',
    children: ['tool_use'],
    parents: ['llms'],
    prereqs: ['Function Calling Schema', 'Stateful Reasoning Loops']
  },
  memory: {
    id: 'memory',
    title: 'AI MEMORY ARCHITECTURES',
    level: 3,
    category: 'STATE MANAGEMENT',
    code: 'RBG-RES-06',
    description: 'Multi-tier storage reconciling episodic session cache, semantic knowledge graphs, and persistent working context.',
    status: 'EXPERIMENTING',
    slug: 'ai-memory',
    children: [],
    parents: ['llms'],
    prereqs: ['Hierarchical State Buffers', 'Recency Weighting']
  },
  retrieval: {
    id: 'retrieval',
    title: 'DENSE VECTOR RETRIEVAL',
    level: 4,
    category: 'SYSTEM SUBSYSTEM',
    code: 'SYS-RET',
    description: 'Approximate nearest neighbor graph algorithms (HNSW, IVFPQ) indexing multi-million token embedding corpora.',
    status: 'DOCUMENTED',
    slug: 'retrieval-augmented-generation',
    children: [],
    parents: ['rag'],
    prereqs: ['Vector Quantization', 'Graph Traversal']
  },
  tool_use: {
    id: 'tool_use',
    title: 'DETERMINISTIC TOOL EXECUTION',
    level: 4,
    category: 'SYSTEM SUBSYSTEM',
    code: 'SYS-TOOL',
    description: 'Model Context Protocol (MCP) clients, shell execution bridges, and deterministic JSON schema validation pipelines.',
    status: 'EXPERIMENTING',
    slug: 'ai-agents',
    children: [],
    parents: ['agents'],
    prereqs: ['Structured JSON Decoding', 'Sandboxed Runtime']
  }
};

export default function ResearchTaxonomyMap() {
  const [selectedNodeId, setSelectedNodeId] = useState('transformers');
  const [hoveredNodeId, setHoveredNodeId] = useState(null);

  const activeNode = TAXONOMY_NODES[selectedNodeId] || TAXONOMY_NODES['transformers'];

  // Check if a node is in the active lineage
  const isLineage = (nodeId) => {
    if (!hoveredNodeId) return false;
    if (nodeId === hoveredNodeId) return true;
    const target = TAXONOMY_NODES[hoveredNodeId];
    if (target?.parents.includes(nodeId) || target?.children.includes(nodeId)) return true;
    return false;
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'DOCUMENTED':
        return <span className="bg-[#111111] text-white px-2 py-0.5 text-[9px] font-bold">DOCUMENTED</span>;
      case 'UPDATED':
        return <span className="bg-[#FF1E27] text-white px-2 py-0.5 text-[9px] font-bold">UPDATED</span>;
      case 'EXPERIMENTING':
        return <span className="bg-[#FAF9F5] border border-[#FF1E27] text-[#FF1E27] px-2 py-0.5 text-[9px] font-bold">EXPERIMENTING</span>;
      default:
        return <span className="bg-[#EDECE6] border border-[#C9C7C0] text-[#555555] px-2 py-0.5 text-[9px] font-bold">{status}</span>;
    }
  };

  return (
    <div className="border border-[#C9C7C0] bg-[#FAF9F5] p-5 sm:p-7 space-y-6 font-mono text-[#111111]">
      
      {/* Top Header Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#C9C7C0] pb-4">
        <div>
          <div className="flex items-center gap-2 text-[#FF1E27] text-xs font-bold uppercase tracking-widest">
            <Network size={14} />
            <span>04 / RESEARCH TOPOLOGICAL MAP</span>
          </div>
          <h3 className="font-syne text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#111111] mt-1">
            HIERARCHICAL AI KNOWLEDGE ECOSYSTEM
          </h3>
        </div>

        <div className="flex items-center gap-2 text-[10px] text-[#666660]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF1E27] animate-pulse" />
          <span>INTERACTIVE NODES · CLICK TO INSPECT TELEMETRY</span>
        </div>
      </div>

      {/* Main Diagram & Inspector Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Side: Visual Interactive Tree Canvas */}
        <div className="lg:col-span-8 bg-[#F1F0EB] border border-[#C9C7C0] p-4 sm:p-6 space-y-6 relative overflow-x-auto">
          
          {/* Subtle Technical Grid Marks */}
          <div className="absolute top-2 left-2 text-[9px] text-[#999990] select-none font-mono">
            SYS_REF: 0x4F8A // AI_MAP_GRID
          </div>
          <div className="absolute top-2 right-2 text-[9px] text-[#999990] select-none font-mono">
            COORDS: [N 12.9716, E 77.5946]
          </div>

          {/* Level 0: AI Root */}
          <div className="flex justify-center pt-4">
            <button
              onClick={() => setSelectedNodeId('ai')}
              onMouseEnter={() => setHoveredNodeId('ai')}
              onMouseLeave={() => setHoveredNodeId(null)}
              className={`px-6 py-2.5 border transition-all text-xs font-bold uppercase tracking-widest cursor-pointer ${
                selectedNodeId === 'ai'
                  ? 'bg-[#111111] text-white border-[#111111] shadow-md scale-105'
                  : isLineage('ai')
                  ? 'bg-[#FF1E27] text-white border-[#FF1E27]'
                  : 'bg-[#FAF9F5] text-[#111111] border-[#C9C7C0] hover:border-[#111111]'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FF1E27]" />
                <span>ARTIFICIAL INTELLIGENCE</span>
              </div>
            </button>
          </div>

          {/* Down Connector */}
          <div className="flex justify-center">
            <div className="w-[1px] h-6 bg-[#C9C7C0]" />
          </div>

          {/* Level 1: ML / DL / GenAI */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 relative">
            <div className="hidden sm:block absolute -top-3 left-[16.6%] right-[16.6%] h-[1px] bg-[#C9C7C0]" />
            
            {[
              { id: 'ml', label: 'MACHINE LEARNING', code: 'ML' },
              { id: 'dl', label: 'DEEP LEARNING', code: 'DL' },
              { id: 'genai', label: 'GENERATIVE AI', code: 'GENAI' }
            ].map((node) => {
              const isSelected = selectedNodeId === node.id;
              const isHighlighted = isLineage(node.id);
              return (
                <button
                  key={node.id}
                  onClick={() => setSelectedNodeId(node.id)}
                  onMouseEnter={() => setHoveredNodeId(node.id)}
                  onMouseLeave={() => setHoveredNodeId(null)}
                  className={`p-3 border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#111111] text-white border-[#111111] shadow-md scale-102'
                      : isHighlighted
                      ? 'bg-[#FF1E27]/10 border-[#FF1E27] text-[#111111]'
                      : 'bg-[#FAF9F5] border-[#C9C7C0] text-[#111111] hover:border-[#111111]'
                  }`}
                >
                  <div className="text-[9px] text-[#777770] font-mono">{node.code}</div>
                  <div className="text-xs font-bold mt-0.5">{node.label}</div>
                </button>
              );
            })}
          </div>

          {/* Down Connectors */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="flex justify-center"><div className="w-[1px] h-6 bg-[#C9C7C0]" /></div>
            <div className="flex justify-center"><div className="w-[1px] h-6 bg-[#C9C7C0]" /></div>
            <div className="flex justify-center"><div className="w-[1px] h-6 bg-[#C9C7C0]" /></div>
          </div>

          {/* Level 2: RL / Transformers / LLMs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: 'rl_ml', label: 'RL / ML ALGORITHMS', code: 'RBG-RES-16' },
              { id: 'transformers', label: 'TRANSFORMERS & ATTENTION', code: 'RBG-RES-02' },
              { id: 'llms', label: 'LARGE LANGUAGE MODELS', code: 'RBG-RES-01' }
            ].map((node) => {
              const isSelected = selectedNodeId === node.id;
              const isHighlighted = isLineage(node.id);
              return (
                <button
                  key={node.id}
                  onClick={() => setSelectedNodeId(node.id)}
                  onMouseEnter={() => setHoveredNodeId(node.id)}
                  onMouseLeave={() => setHoveredNodeId(null)}
                  className={`p-3 border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#111111] text-white border-[#111111] shadow-md scale-102'
                      : isHighlighted
                      ? 'bg-[#FF1E27]/10 border-[#FF1E27] text-[#111111]'
                      : 'bg-[#FAF9F5] border-[#C9C7C0] text-[#111111] hover:border-[#111111]'
                  }`}
                >
                  <div className="text-[9px] text-[#FF1E27] font-mono font-bold">{node.code}</div>
                  <div className="text-xs font-bold mt-0.5">{node.label}</div>
                </button>
              );
            })}
          </div>

          {/* LLM Sub-tree Branching Down */}
          <div className="pt-2 border-t border-[#C9C7C0]/60 space-y-3">
            <div className="text-[10px] text-[#777770] font-bold uppercase tracking-wider flex items-center gap-2">
              <GitBranch size={12} className="text-[#FF1E27]" />
              <span>FRONTIER FOUNDATION SUBSYSTEMS (DERIVED FROM LLMS)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'rag', label: 'RAG ARCHITECTURES', code: 'RBG-RES-03', sub: 'RETRIEVAL' },
                { id: 'agents', label: 'AI AGENTS & MCP', code: 'RBG-RES-04', sub: 'TOOL USE' },
                { id: 'memory', label: 'AI MEMORY SYSTEMS', code: 'RBG-RES-06', sub: 'STATE BUFFERS' }
              ].map((node) => {
                const isSelected = selectedNodeId === node.id;
                const isHighlighted = isLineage(node.id);
                return (
                  <button
                    key={node.id}
                    onClick={() => setSelectedNodeId(node.id)}
                    onMouseEnter={() => setHoveredNodeId(node.id)}
                    onMouseLeave={() => setHoveredNodeId(null)}
                    className={`p-3 border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#111111] text-white border-[#111111] shadow-md scale-102'
                        : isHighlighted
                        ? 'bg-[#FF1E27]/10 border-[#FF1E27] text-[#111111]'
                        : 'bg-[#FAF9F5] border-[#C9C7C0] text-[#111111] hover:border-[#111111]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] text-[#FF1E27] font-mono font-bold">{node.code}</span>
                      <span className="text-[8px] bg-[#EDECE6] px-1 py-0.2 border border-[#C9C7C0]">{node.sub}</span>
                    </div>
                    <div className="text-xs font-bold mt-1">{node.label}</div>
                  </button>
                );
              })}
            </div>

            {/* Level 4 Leaf Nodes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                { id: 'retrieval', label: 'DENSE VECTOR RETRIEVAL (HNSW)', code: 'SUBSYSTEM' },
                { id: 'tool_use', label: 'DETERMINISTIC TOOL EXECUTION', code: 'SUBSYSTEM' }
              ].map((node) => {
                const isSelected = selectedNodeId === node.id;
                return (
                  <button
                    key={node.id}
                    onClick={() => setSelectedNodeId(node.id)}
                    onMouseEnter={() => setHoveredNodeId(node.id)}
                    onMouseLeave={() => setHoveredNodeId(null)}
                    className={`p-2.5 border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#111111] text-white border-[#111111]'
                        : 'bg-[#FAF9F5] border-[#C9C7C0] text-[#111111] hover:border-[#111111]'
                    }`}
                  >
                    <div className="text-[8px] text-[#777770] font-mono">LEAF // {node.code}</div>
                    <div className="text-[11px] font-bold">{node.label}</div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Side: Active Node Inspector Panel */}
        <div className="lg:col-span-4 bg-[#F1F0EB] border border-[#C9C7C0] p-5 sm:p-6 space-y-5">
          <div className="border-b border-[#C9C7C0] pb-3 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-[#FF1E27] font-mono font-bold uppercase tracking-wider">
                NODE TELEMETRY AUDIT
              </span>
              {getStatusBadge(activeNode.status)}
            </div>
            <h4 className="font-syne text-lg font-bold text-[#111111] uppercase tracking-tight">
              {activeNode.title}
            </h4>
            <div className="text-[10px] text-[#777770]">
              CATEGORY: <span className="font-bold text-[#111111]">{activeNode.category}</span>
            </div>
          </div>

          <div className="space-y-2 text-xs font-sans text-[#444444] leading-relaxed">
            <p>{activeNode.description}</p>
          </div>

          {/* Prerequisite Chains */}
          <div className="space-y-2 pt-2 border-t border-[#C9C7C0]">
            <div className="text-[10px] text-[#777770] font-bold uppercase tracking-wider">
              MATHEMATICAL & ALGORITHMIC PREREQUISITES
            </div>
            <div className="flex flex-wrap gap-1.5">
              {activeNode.prereqs.map((p) => (
                <span key={p} className="bg-[#FAF9F5] border border-[#C9C7C0] text-[#111111] text-[10px] px-2 py-0.5">
                  {p}
                </span>
              ))}
            </div>
          </div>

          {/* Open Research Button */}
          <div className="pt-2">
            <Link
              to={`/research/${activeNode.slug}`}
              className="btn-editorial-red w-full flex items-center justify-center gap-2 py-2.5 text-xs font-bold tracking-wider cursor-pointer"
            >
              <span>OPEN RESEARCH RECORD</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}
