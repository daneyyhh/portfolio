import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Network, ArrowUpRight, Sparkles, Filter, Info, Layers } from 'lucide-react';

// Graph topology definitions with curated nodes & thematic clusters
const GRAPH_NODES = [
  { id: 'transformers-attention', label: 'TRANSFORMERS & ATTENTION', cluster: 'core', x: 50, y: 46, status: 'UPDATED', progress: 100, category: 'LLMs', difficulty: 'Advanced' },
  { id: 'how-llms-work', label: 'HOW LLMs WORK', cluster: 'core', x: 26, y: 38, status: 'DOCUMENTED', progress: 100, category: 'LLMs', difficulty: 'Intermediate' },
  { id: 'retrieval-augmented-generation', label: 'RETRIEVAL-AUGMENTED GEN', cluster: 'systems', x: 74, y: 34, status: 'DOCUMENTED', progress: 100, category: 'AI SYSTEMS', difficulty: 'Intermediate' },
  { id: 'ai-agents', label: 'AI AGENTS', cluster: 'systems', x: 80, y: 64, status: 'EXPERIMENTING', progress: 85, category: 'AI AGENTS', difficulty: 'Advanced' },
  { id: 'ai-agents-vs-chatbots', label: 'AGENTS vs CHATBOTS', cluster: 'systems', x: 92, y: 80, status: 'DOCUMENTED', progress: 100, category: 'AI SYSTEMS', difficulty: 'Beginner' },
  { id: 'ai-memory', label: 'AI MEMORY & STATE', cluster: 'systems', x: 65, y: 82, status: 'EXPERIMENTING', progress: 80, category: 'AI MEMORY', difficulty: 'Advanced' },
  { id: 'slms-vs-llms', label: 'SLMs vs LLMs', cluster: 'efficiency', x: 18, y: 62, status: 'DOCUMENTED', progress: 100, category: 'LLMs', difficulty: 'Intermediate' },
  { id: 'local-ai', label: 'LOCAL & EDGE AI', cluster: 'efficiency', x: 30, y: 80, status: 'DOCUMENTED', progress: 100, category: 'AI SYSTEMS', difficulty: 'Intermediate' },
  { id: 'ai-model-quantization', label: 'MODEL QUANTIZATION', cluster: 'efficiency', x: 36, y: 94, status: 'DOCUMENTED', progress: 100, category: 'AI INFRASTRUCTURE', difficulty: 'Advanced' },
  { id: 'ai-hallucination', label: 'AI HALLUCINATION', cluster: 'safety', x: 12, y: 22, status: 'DOCUMENTED', progress: 100, category: 'AI SAFETY', difficulty: 'Intermediate' },
  { id: 'ai-evaluation', label: 'AI EVALUATION', cluster: 'safety', x: 38, y: 16, status: 'RESEARCHING', progress: 75, category: 'AI SAFETY', difficulty: 'Advanced' },
  { id: 'benchmarks-and-saturation', label: 'BENCHMARK SATURATION', cluster: 'safety', x: 58, y: 14, status: 'RESEARCHING', progress: 70, category: 'AI SYSTEMS', difficulty: 'Advanced' },
  { id: 'multimodal-ai', label: 'MULTIMODAL AI', cluster: 'frontier', x: 70, y: 20, status: 'RESEARCHING', progress: 80, category: 'GENERATIVE AI', difficulty: 'Advanced' },
  { id: 'computer-vision', label: 'COMPUTER VISION', cluster: 'frontier', x: 88, y: 18, status: 'DOCUMENTED', progress: 100, category: 'COMPUTER VISION', difficulty: 'Intermediate' },
  { id: 'reinforcement-learning', label: 'REINFORCEMENT LEARNING', cluster: 'core', x: 44, y: 66, status: 'UPDATED', progress: 100, category: 'REINFORCEMENT LEARNING', difficulty: 'Advanced' },
  { id: 'ai-safety-and-alignment', label: 'SAFETY & ALIGNMENT', cluster: 'safety', x: 8, y: 44, status: 'PLANNED', progress: 65, category: 'AI SAFETY', difficulty: 'Advanced' },
  { id: 'ai-red-teaming', label: 'RED TEAMING & ATTACKS', cluster: 'safety', x: 2, y: 72, status: 'RESEARCHING', progress: 75, category: 'AI SAFETY', difficulty: 'Advanced' },
  { id: 'ai-compute-infrastructure', label: 'COMPUTE & HARDWARE', cluster: 'efficiency', x: 48, y: 88, status: 'DOCUMENTED', progress: 100, category: 'AI INFRASTRUCTURE', difficulty: 'Advanced' },
  { id: 'ai-x-science', label: 'AI × SCIENCE', cluster: 'frontier', x: 88, y: 46, status: 'DOCUMENTED', progress: 100, category: 'AI × SCIENCE', difficulty: 'Advanced' },
  { id: 'ai-for-game-development', label: 'AI × GAME DEVELOPMENT', cluster: 'frontier', x: 94, y: 62, status: 'DOCUMENTED', progress: 100, category: 'AI × GAME DEVELOPMENT', difficulty: 'Intermediate' }
];

const GRAPH_EDGES = [
  { from: 'transformers-attention', to: 'how-llms-work' },
  { from: 'transformers-attention', to: 'retrieval-augmented-generation' },
  { from: 'transformers-attention', to: 'multimodal-ai' },
  { from: 'transformers-attention', to: 'reinforcement-learning' },
  { from: 'transformers-attention', to: 'ai-compute-infrastructure' },
  { from: 'how-llms-work', to: 'slms-vs-llms' },
  { from: 'how-llms-work', to: 'ai-hallucination' },
  { from: 'how-llms-work', to: 'ai-evaluation' },
  { from: 'retrieval-augmented-generation', to: 'ai-agents' },
  { from: 'retrieval-augmented-generation', to: 'ai-memory' },
  { from: 'ai-agents', to: 'ai-agents-vs-chatbots' },
  { from: 'ai-agents', to: 'ai-memory' },
  { from: 'slms-vs-llms', to: 'local-ai' },
  { from: 'local-ai', to: 'ai-model-quantization' },
  { from: 'ai-model-quantization', to: 'ai-compute-infrastructure' },
  { from: 'ai-evaluation', to: 'benchmarks-and-saturation' },
  { from: 'multimodal-ai', to: 'computer-vision' },
  { from: 'ai-safety-and-alignment', to: 'ai-red-teaming' },
  { from: 'ai-safety-and-alignment', to: 'reinforcement-learning' },
  { from: 'ai-agents', to: 'ai-for-game-development' },
  { from: 'transformers-attention', to: 'ai-x-science' },
];

export default function KnowledgeGraph({ onSelectTopic, activeTopicId = null }) {
  const [hoveredNode, setHoveredNode] = useState(null);
  const [selectedCluster, setSelectedCluster] = useState('ALL');

  const activeNode = GRAPH_NODES.find(n => n.id === (hoveredNode || activeTopicId));

  // Determine connected edges and neighbors
  const connectedNodeIds = new Set();
  if (activeNode) {
    connectedNodeIds.add(activeNode.id);
    GRAPH_EDGES.forEach(edge => {
      if (edge.from === activeNode.id) connectedNodeIds.add(edge.to);
      if (edge.to === activeNode.id) connectedNodeIds.add(edge.from);
    });
  }

  return (
    <div className="bg-[#FAF9F5] border-2 border-[#111111] p-5 sm:p-7 shadow-[6px_6px_0px_#111111] font-mono relative overflow-hidden">
      
      {/* Top Controller Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#C9C7C0] pb-4 mb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Network size={16} className="text-[#FF1E27]" />
            <span className="text-xs font-bold text-[#111111] uppercase tracking-wider">
              AI RESEARCH KNOWLEDGE GRAPH // CONNECTED TOPIC TOPOLOGY
            </span>
          </div>
          <p className="text-[11px] font-sans text-slate-600">
            Interactive knowledge map documenting theoretical and architectural dependencies across 20 research directions.
          </p>
        </div>

        {/* Cluster Filter Buttons */}
        <div className="flex items-center gap-1.5 flex-wrap text-[10px]">
          {['ALL', 'core', 'systems', 'efficiency', 'safety', 'frontier'].map(cluster => (
            <button
              key={cluster}
              onClick={() => setSelectedCluster(cluster)}
              className={`px-2 py-1 uppercase tracking-wider font-bold border transition-colors cursor-pointer ${
                selectedCluster === cluster
                  ? 'bg-[#111111] text-white border-[#111111]'
                  : 'bg-white text-[#555555] border-[#C9C7C0] hover:border-[#111111]'
              }`}
            >
              {cluster}
            </button>
          ))}
        </div>
      </div>

      {/* SVG Canvas Container */}
      <div className="relative w-full h-[400px] sm:h-[480px] bg-white border border-[#C9C7C0] overflow-hidden select-none">
        
        {/* Subtle Background Coordinate Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#EFEFEA_1px,transparent_1px),linear-gradient(to_bottom,#EFEFEA_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-80" />

        <svg className="w-full h-full relative z-10">
          <defs>
            <linearGradient id="edgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#111111" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#FF1E27" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          {/* Render Connection Edges */}
          {GRAPH_EDGES.map((edge, idx) => {
            const fromNode = GRAPH_NODES.find(n => n.id === edge.from);
            const toNode = GRAPH_NODES.find(n => n.id === edge.to);
            if (!fromNode || !toNode) return null;

            const isHighlighted = activeNode && (
              (edge.from === activeNode.id && connectedNodeIds.has(edge.to)) ||
              (edge.to === activeNode.id && connectedNodeIds.has(edge.from))
            );

            const isDimmed = activeNode && !isHighlighted;

            return (
              <line
                key={idx}
                x1={`${fromNode.x}%`}
                y1={`${fromNode.y}%`}
                x2={`${toNode.x}%`}
                y2={`${toNode.y}%`}
                stroke={isHighlighted ? '#FF1E27' : '#C9C7C0'}
                strokeWidth={isHighlighted ? 2.5 : 1}
                strokeDasharray={isHighlighted ? 'none' : '3,3'}
                opacity={isDimmed ? 0.2 : isHighlighted ? 1 : 0.6}
                className="transition-all duration-300"
              />
            );
          })}

          {/* Render Nodes */}
          {GRAPH_NODES.map(node => {
            const isMatchCluster = selectedCluster === 'ALL' || node.cluster === selectedCluster;
            const isHovered = hoveredNode === node.id || activeTopicId === node.id;
            const isConnected = connectedNodeIds.has(node.id);
            const isDimmed = activeNode ? (!isConnected && !isHovered) : !isMatchCluster;

            return (
              <g
                key={node.id}
                className="cursor-pointer transition-opacity duration-300"
                opacity={isDimmed ? 0.25 : 1}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={() => onSelectTopic ? onSelectTopic(node.id) : null}
              >
                {/* Outer Pulse Halo for Core Nodes */}
                {(isHovered || node.id === 'transformers-attention') && (
                  <circle
                    cx={`${node.x}%`}
                    cy={`${node.y}%`}
                    r={isHovered ? 20 : 16}
                    fill="none"
                    stroke="#FF1E27"
                    strokeWidth={1.5}
                    opacity={0.4}
                    className="animate-ping"
                  />
                )}

                {/* Main Node Circle */}
                <circle
                  cx={`${node.x}%`}
                  cy={`${node.y}%`}
                  r={isHovered ? 12 : 8}
                  fill={isHovered ? '#FF1E27' : node.cluster === 'core' ? '#111111' : '#FAF9F5'}
                  stroke={isHovered ? '#111111' : '#111111'}
                  strokeWidth={2}
                  className="transition-all duration-200"
                />

                {/* Node Center Dot */}
                <circle
                  cx={`${node.x}%`}
                  cy={`${node.y}%`}
                  r={3}
                  fill={isHovered ? '#FFFFFF' : node.cluster === 'core' ? '#FF1E27' : '#111111'}
                />

                {/* Node Label (shown on hover or for core nodes) */}
                <text
                  x={`${node.x}%`}
                  y={`${node.y + 4.5}%`}
                  textAnchor="middle"
                  className={`text-[9px] font-mono tracking-wider transition-all select-none ${
                    isHovered
                      ? 'fill-[#FF1E27] font-bold scale-105'
                      : 'fill-[#111111] font-semibold'
                  }`}
                >
                  {node.label.length > 20 ? node.label.slice(0, 18) + '...' : node.label}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hover / Active Node Telemetry Card Overlay */}
        <AnimatePresence>
          {activeNode && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-md bg-[#111111] text-white p-4 border-2 border-[#FF1E27] shadow-xl z-20 font-mono text-xs space-y-2 pointer-events-auto"
            >
              <div className="flex items-center justify-between border-b border-white/20 pb-2">
                <span className="text-[10px] text-[#FF1E27] font-bold uppercase tracking-widest">
                  TOPOLOGY NODE TELEMETRY
                </span>
                <span className="text-[10px] bg-white/10 px-2 py-0.5 uppercase tracking-wider text-stone-300">
                  {activeNode.status} // {activeNode.progress}%
                </span>
              </div>

              <div>
                <h4 className="font-bold text-white text-sm uppercase tracking-wide">
                  {activeNode.label}
                </h4>
                <div className="flex items-center gap-2 text-[10px] text-stone-400 mt-0.5">
                  <span>CATEGORY: {activeNode.category}</span>
                  <span>•</span>
                  <span>LEVEL: {activeNode.difficulty}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-white/10 text-[10px]">
                <span className="text-stone-400">
                  {connectedNodeIds.size - 1} Direct Graph Connections
                </span>
                <Link
                  to={`/research/${activeNode.id}`}
                  className="text-[#FF1E27] font-bold hover:underline flex items-center gap-1"
                >
                  <span>OPEN TOPIC DOSSIER</span>
                  <ArrowUpRight size={12} />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Footer Legend */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 text-[10px] text-[#555555] font-mono">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#111111] border border-[#111111]" />
            <span>CORE ARCHITECTURES</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-white border border-[#111111]" />
            <span>SYSTEMS & SUBSYSTEMS</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-0.5 bg-[#FF1E27]" />
            <span>DEPENDENCY AXIS</span>
          </div>
        </div>

        <span className="text-stone-400">
          CLICK ANY NODE TO INSPECT RESEARCH
        </span>
      </div>

    </div>
  );
}
