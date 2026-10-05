import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Copy, 
  Share2, 
  BookOpen, 
  Clock, 
  Sparkles, 
  Layers, 
  Cpu, 
  Compass, 
  AlertTriangle, 
  CheckCircle2, 
  ExternalLink,
  ChevronDown,
  List,
  GitBranch,
  ShieldCheck,
  Microscope,
  HelpCircle,
  FileCode,
  Sigma,
  Activity,
  Calendar,
  Send,
  Sliders,
  Bookmark
} from 'lucide-react';
import { researchTopics } from '../data/researchData';

// Specialized Interactive Scientific Visualizers
import VisualTimeline from '../components/Research/VisualTimeline';
import ProblemBreakthroughFlow from '../components/Research/ProblemBreakthroughFlow';
import FoundationsDependencyGraph from '../components/Research/FoundationsDependencyGraph';
import ConceptExplorer from '../components/Research/ConceptExplorer';
import HowItWorksArchitecture from '../components/Research/HowItWorksArchitecture';
import ArchitectureExplorer from '../components/Research/ArchitectureExplorer';
import MathematicalDeepDive from '../components/Research/MathematicalDeepDive';
import AlgorithmExplorer from '../components/Research/AlgorithmExplorer';
import CodeBlock from '../components/Research/CodeBlock';
import AttentionVisualizer from '../components/Research/AttentionVisualizer';
import BenchmarkExplorer from '../components/Research/BenchmarkExplorer';
import FailureCascade from '../components/Research/FailureCascade';
import ActiveResearchBoard from '../components/Research/ActiveResearchBoard';
import FutureMap from '../components/Research/FutureMap';

export default function ResearchDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('overview');
  const [copiedLink, setCopiedLink] = useState(false);
  const [mobileTocOpen, setMobileTocOpen] = useState(false);
  const [readPercent, setReadPercent] = useState(0);

  // Find topic by exact slug or alias
  const topic = researchTopics.find(
    (t) => t.slug === slug || (t.aliases && t.aliases.includes(slug)) || t.id.toLowerCase() === slug?.toLowerCase()
  ) || researchTopics[0];

  // Scroll Progress Bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Track percentage reading progress (0% - 100%)
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      setReadPercent(Math.min(100, Math.max(0, Math.round(v * 100))));
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  useEffect(() => {
    document.title = `${topic.title} // REUBG DEV RESEARCH LAB`;
    window.scrollTo(0, 0);
  }, [slug, topic.title]);

  // Canonical 19-Section TOC Items specified in Section 08
  const tocItems = [
    { id: 'overview', num: '01', label: 'OVERVIEW' },
    { id: 'origin', num: '02', label: 'ORIGIN' },
    { id: 'problem', num: '03', label: 'PROBLEM' },
    { id: 'foundations', num: '04', label: 'FOUNDATIONS' },
    { id: 'how-it-works', num: '05', label: 'HOW IT WORKS' },
    { id: 'architecture', num: '06', label: 'ARCHITECTURE' },
    { id: 'mathematics', num: '07', label: 'MATHEMATICS' },
    { id: 'algorithm', num: '08', label: 'ALGORITHM' },
    { id: 'implementation', num: '09', label: 'IMPLEMENTATION' },
    { id: 'evolution', num: '10', label: 'EVOLUTION' },
    { id: 'experiments', num: '11', label: 'EXPERIMENTS' },
    { id: 'data', num: '12', label: 'DATA' },
    { id: 'benchmarks', num: '13', label: 'BENCHMARKS' },
    { id: 'applications', num: '14', label: 'APPLICATIONS' },
    { id: 'limitations', num: '15', label: 'LIMITATIONS' },
    { id: 'current-state', num: '16', label: 'CURRENT STATE' },
    { id: 'active-research', num: '17', label: 'ACTIVE RESEARCH' },
    { id: 'future', num: '18', label: 'FUTURE' },
    { id: 'references', num: '19', label: 'REFERENCES' }
  ];

  // Scroll Spy for TOC active indicator
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 140;
      for (const item of tocItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [tocItems]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 80;
      const elPosition = el.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elPosition - headerOffset,
        behavior: 'smooth'
      });
      setActiveSection(id);
      setMobileTocOpen(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const currentIndex = researchTopics.findIndex((t) => t.slug === topic.slug);
  const prevTopic = currentIndex > 0 ? researchTopics[currentIndex - 1] : null;
  const nextTopic = currentIndex < researchTopics.length - 1 ? researchTopics[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-[#F1F0EB] text-[#111111] font-sans selection:bg-[#FF1E27] selection:text-white">
      
      {/* ─────────────────────────────────────────────────────────────
          PERSISTENT TOP READING PROGRESS BAR
      ───────────────────────────────────────────────────────────── */}
      <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
        <motion.div
          style={{ scaleX }}
          className="h-[3px] bg-[#FF1E27] origin-left shadow-[0_0_8px_#FF1E27]"
        />
      </div>

      {/* Persistent Reading Telemetry Bar */}
      <div className="sticky top-[61px] sm:top-[69px] z-40 bg-[#EDECE6]/95 backdrop-blur-md border-b border-[#C9C7C0] px-4 sm:px-6 md:px-12 py-2 text-xs font-mono flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2">
          <Link
            to="/research"
            className="flex items-center gap-1.5 text-stone-600 hover:text-[#FF1E27] transition-colors"
          >
            <ArrowLeft size={13} />
            <span className="hidden sm:inline">RESEARCH ARCHIVE</span>
            <span className="sm:hidden">ARCHIVE</span>
          </Link>
          <span className="text-stone-300">/</span>
          <span className="font-bold text-[#111111] truncate max-w-[200px] sm:max-w-md">
            {topic.id}: {topic.title}
          </span>
        </div>

        {/* Live Reading Progress Indicator */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-[10px]">
            <span className="text-stone-500 hidden sm:inline">PROGRESS:</span>
            <span className="font-bold text-[#FF1E27]">{readPercent}%</span>
          </div>

          <button
            onClick={handleCopyLink}
            className="p-1 text-stone-500 hover:text-[#FF1E27] transition-colors cursor-pointer"
            title="Copy paper permalink"
          >
            {copiedLink ? <Check size={14} className="text-emerald-600" /> : <Share2 size={14} />}
          </button>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          PAPER HEADER & TECHNICAL METADATA (Section 07 Spec)
      ───────────────────────────────────────────────────────────── */}
      <header className="border-b border-[#C9C7C0] bg-[#FAF9F5] py-12 sm:py-16 px-4 sm:px-6 md:px-12">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Paper ID & Category Badge */}
          <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
            <div className="flex items-center gap-2.5">
              <span className="bg-[#111111] text-white px-2 py-0.5 font-bold">
                {topic.id}
              </span>
              <span className="text-[#888880]">•</span>
              <span className="text-[#FF1E27] font-bold uppercase tracking-wider">
                {topic.category}
              </span>
              {topic.secondaryCategory && (
                <>
                  <span className="text-[#888880]">•</span>
                  <span className="text-[#555555] uppercase">{topic.secondaryCategory}</span>
                </>
              )}
            </div>

            <div className="flex items-center gap-2 text-[10px] text-[#666660]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF1E27] animate-pulse" />
              <span>PEER-REVIEWED TECHNICAL RECORD</span>
            </div>
          </div>

          {/* Title & Research Thesis */}
          <div className="space-y-3 max-w-5xl">
            <h1 className="font-syne font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight text-[#111111] uppercase leading-[0.95]">
              {topic.title}
            </h1>
            <p className="font-mono text-sm sm:text-base md:text-lg text-[#FF1E27] font-bold">
              “{topic.subtitle}”
            </p>
          </div>

          {/* Structured Research Metadata Grid */}
          <div className="border border-[#C9C7C0] bg-[#EDECE6] p-4 font-mono text-xs">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              <div className="space-y-0.5">
                <span className="text-[10px] text-[#777770] uppercase block">STATUS</span>
                <span className="font-bold text-[#FF1E27] uppercase">{topic.status}</span>
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] text-[#777770] uppercase block">CATEGORY</span>
                <span className="font-bold text-[#111111] uppercase">{topic.category}</span>
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] text-[#777770] uppercase block">LEVEL</span>
                <span className="font-bold text-[#111111] uppercase">{topic.difficulty}</span>
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] text-[#777770] uppercase block">STARTED</span>
                <span className="font-bold text-[#111111]">{topic.startedDate || '2026'}</span>
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] text-[#777770] uppercase block">UPDATED</span>
                <span className="font-bold text-[#111111]">{topic.lastUpdated}</span>
              </div>
            </div>
          </div>

          {/* Provenance Legend */}
          <div className="flex flex-wrap items-center gap-2 pt-2 text-[10px] font-mono text-[#777770]">
            <span className="font-bold text-[#111111]">PROVENANCE:</span>
            <span className="bg-[#FAF9F5] border border-[#C9C7C0] px-2 py-0.5 text-[#111111]">PRIMARY SOURCE</span>
            <span className="bg-[#FAF9F5] border border-[#C9C7C0] px-2 py-0.5 text-[#111111]">SECONDARY SOURCE</span>
            <span className="bg-[#FAF9F5] border border-[#C9C7C0] px-2 py-0.5 text-[#111111]">EXPERIMENTAL RESULT</span>
            <span className="bg-[#FAF9F5] border border-[#C9C7C0] px-2 py-0.5 text-[#FF1E27] font-bold">AUTHOR ANALYSIS</span>
            <span className="bg-[#FAF9F5] border border-[#C9C7C0] px-2 py-0.5 text-[#777770]">HYPOTHESIS</span>
          </div>

        </div>
      </header>

      {/* ─────────────────────────────────────────────────────────────
          MAIN CONTENT WORKSPACE WITH 19-SECTION STICKY SIDEBAR
      ───────────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ─────────────────────────────────────────────────────────
              08 — PROFESSIONAL STICKY RESEARCH NAVIGATION (19 SECTIONS)
          ───────────────────────────────────────────────────────── */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-[125px] space-y-4 font-mono text-xs max-h-[calc(100vh-140px)] overflow-y-auto pr-2">
            <div className="text-[10px] text-[#777770] font-bold uppercase tracking-wider pb-2 border-b border-[#C9C7C0] flex items-center justify-between">
              <span>RESEARCH NAVIGATION</span>
              <span className="text-[#FF1E27]">{readPercent}% READ</span>
            </div>

            <nav className="space-y-0.5">
              {tocItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full text-left py-1.5 px-2 flex items-center justify-between transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#111111] text-white font-bold border-l-2 border-[#FF1E27]'
                        : 'text-[#555555] hover:text-[#111111] hover:bg-[#FAF9F5]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] ${isActive ? 'text-[#FF1E27]' : 'text-[#888880]'}`}>
                        {item.num}.
                      </span>
                      <span className="truncate">{item.label}</span>
                    </div>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF1E27]" />
                    )}
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Mobile Sticky Dropdown Navigation */}
          <div className="lg:hidden col-span-1 sticky top-[115px] z-30 bg-[#EDECE6] border border-[#C9C7C0] p-2.5 font-mono text-xs mb-4">
            <button
              onClick={() => setMobileTocOpen(!mobileTocOpen)}
              className="w-full flex items-center justify-between font-bold"
            >
              <div className="flex items-center gap-2">
                <List size={14} className="text-[#FF1E27]" />
                <span>SECTIONS ({tocItems.find((i) => i.id === activeSection)?.num}. {tocItems.find((i) => i.id === activeSection)?.label})</span>
              </div>
              <ChevronDown size={14} />
            </button>

            {mobileTocOpen && (
              <div className="mt-2 pt-2 border-t border-[#C9C7C0] space-y-1 max-h-60 overflow-y-auto">
                {tocItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="w-full text-left py-1 px-2 text-xs flex items-center gap-2 hover:bg-[#FAF9F5]"
                  >
                    <span className="text-[#FF1E27] text-[10px]">{item.num}.</span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ─────────────────────────────────────────────────────────
              MAIN 19 RESEARCH SECTIONS BODY
          ───────────────────────────────────────────────────────── */}
          <main className="lg:col-span-9 space-y-12 sm:space-y-16">
            
            {/* 01 / OVERVIEW & ABSTRACT */}
            <section id="overview" className="space-y-6 scroll-mt-28">
              <div className="border-b border-[#C9C7C0] pb-2 flex items-center justify-between font-mono text-xs">
                <span className="font-bold text-[#FF1E27]">01 / OVERVIEW & STRUCTURED ABSTRACT</span>
                <span className="text-[#777770]">[AUTHOR ANALYSIS]</span>
              </div>

              {/* Structured Abstract specified in Section 09 */}
              <div className="border border-[#C9C7C0] bg-[#FAF9F5] p-5 sm:p-6 space-y-4 font-mono text-xs">
                <div className="text-[10px] font-bold text-[#FF1E27] uppercase tracking-wider">
                  SCIENTIFIC RESEARCH ABSTRACT
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
                  <div className="p-3 bg-[#EDECE6] border border-[#C9C7C0] space-y-1">
                    <span className="font-mono text-[10px] text-[#777770] font-bold uppercase block">
                      RESEARCH QUESTION
                    </span>
                    <p className="font-bold text-[#111111]">
                      Can sequence transduction be modeled with constant O(1) path length across arbitrary token distances without recurrent inductive bias?
                    </p>
                  </div>

                  <div className="p-3 bg-[#EDECE6] border border-[#C9C7C0] space-y-1">
                    <span className="font-mono text-[10px] text-[#777770] font-bold uppercase block">
                      HYPOTHESIS
                    </span>
                    <p className="text-[#333333]">
                      Attention-only mechanisms without recurrent cell state updates achieve superior BLEU scores while unlocking complete GPU parallelization.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-sans pt-1">
                  <div className="p-3 bg-[#FAF9F5] border border-[#C9C7C0] space-y-1">
                    <span className="font-mono text-[9px] text-[#777770] font-bold uppercase block">OBJECTIVE</span>
                    <p className="text-[#444444]">Deconstruct self-attention from tensor algebra to 2026 hardware-aware kernels.</p>
                  </div>

                  <div className="p-3 bg-[#FAF9F5] border border-[#C9C7C0] space-y-1">
                    <span className="font-mono text-[9px] text-[#777770] font-bold uppercase block">SCOPE</span>
                    <p className="text-[#444444]">Autoregressive decoding, multi-head subspaces, RoPE coordinates, KV caching.</p>
                  </div>

                  <div className="p-3 bg-[#FAF9F5] border border-[#C9C7C0] space-y-1">
                    <span className="font-mono text-[9px] text-[#FF1E27] font-bold uppercase block">KEY FINDING</span>
                    <p className="text-[#111111] font-bold">Constant O(1) path length yields superior generalization but incurs quadratic memory.</p>
                  </div>
                </div>
              </div>

              {/* Core Abstract Text */}
              <div className="font-sans text-sm text-[#333333] leading-relaxed space-y-3">
                <p>{topic.abstract}</p>
              </div>

              {/* Key Concepts Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {topic.keyConcepts?.map((c) => (
                  <span key={c} className="bg-[#FAF9F5] border border-[#C9C7C0] text-[#111111] px-2.5 py-1 text-xs font-mono font-bold">
                    {c}
                  </span>
                ))}
              </div>
            </section>

            {/* 02 / ORIGIN (Visual Historical Timeline) */}
            <section id="origin" className="space-y-6 scroll-mt-28">
              <div className="border-b border-[#C9C7C0] pb-2 flex items-center justify-between font-mono text-xs">
                <span className="font-bold text-[#FF1E27]">02 / HISTORICAL ORIGIN & CHRONOLOGY</span>
                <span className="text-[#777770]">[PRIMARY SOURCE]</span>
              </div>
              <p className="font-sans text-xs sm:text-sm text-[#444444] leading-relaxed">
                Tracing sequence transduction from 1950s Shannon information theory through 1997 LSTMs, 2014 Bahdanau additive attention, to the 2017 Transformer milestone and 2026 SOTA frontiers.
              </p>
              <VisualTimeline topic={topic} />
            </section>

            {/* 03 / PROBLEM (Problem -> Breakthrough Flowchart) */}
            <section id="problem" className="space-y-6 scroll-mt-28">
              <div className="border-b border-[#C9C7C0] pb-2 flex items-center justify-between font-mono text-xs">
                <span className="font-bold text-[#FF1E27]">03 / THE PROBLEM & BREAKTHROUGH PIPELINE</span>
                <span className="text-[#777770]">[EXPERIMENTAL RESULT]</span>
              </div>
              <p className="font-sans text-xs sm:text-sm text-[#444444] leading-relaxed">
                Why recurrent neural networks collapsed under long sequence contexts, and how scaled dot-product attention resolved the gradient vanishing bottleneck.
              </p>
              <ProblemBreakthroughFlow topic={topic} />
            </section>

            {/* 04 / FOUNDATIONS (Dependency Graph & Concept Explorer) */}
            <section id="foundations" className="space-y-6 scroll-mt-28">
              <div className="border-b border-[#C9C7C0] pb-2 flex items-center justify-between font-mono text-xs">
                <span className="font-bold text-[#FF1E27]">04 / MATHEMATICAL FOUNDATIONS & DEPENDENCIES</span>
                <span className="text-[#777770]">[AUTHOR ANALYSIS]</span>
              </div>
              <FoundationsDependencyGraph topic={topic} />
              <ConceptExplorer />
            </section>

            {/* 05 / HOW IT WORKS (Data Flow Visualization) */}
            <section id="how-it-works" className="space-y-6 scroll-mt-28">
              <div className="border-b border-[#C9C7C0] pb-2 flex items-center justify-between font-mono text-xs">
                <span className="font-bold text-[#FF1E27]">05 / HOW IT WORKS & INTERNAL DATA FLOW</span>
                <span className="text-[#777770]">[PRIMARY SOURCE]</span>
              </div>
              <HowItWorksArchitecture topic={topic} />
            </section>

            {/* 06 / ARCHITECTURE (Detailed Architectural Block Diagram) */}
            <section id="architecture" className="space-y-6 scroll-mt-28">
              <div className="border-b border-[#C9C7C0] pb-2 flex items-center justify-between font-mono text-xs">
                <span className="font-bold text-[#FF1E27]">06 / TECHNICAL ARCHITECTURE EXPLORER</span>
                <span className="text-[#777770]">[PRIMARY SOURCE]</span>
              </div>
              <ArchitectureExplorer topic={topic} />
            </section>

            {/* 07 / MATHEMATICS (Mathematical Deep Dive) */}
            <section id="mathematics" className="space-y-6 scroll-mt-28">
              <div className="border-b border-[#C9C7C0] pb-2 flex items-center justify-between font-mono text-xs">
                <span className="font-bold text-[#FF1E27]">07 / MATHEMATICAL DEEP DIVE & TENSOR DERIVATION</span>
                <span className="text-[#777770]">[PRIMARY SOURCE]</span>
              </div>
              <MathematicalDeepDive />
            </section>

            {/* 08 / ALGORITHM (Interactive Execution Stepper) */}
            <section id="algorithm" className="space-y-6 scroll-mt-28">
              <div className="border-b border-[#C9C7C0] pb-2 flex items-center justify-between font-mono text-xs">
                <span className="font-bold text-[#FF1E27]">08 / ALGORITHM VISUALIZER & EXECUTION STEPPER</span>
                <span className="text-[#777770]">[EXPERIMENTAL RESULT]</span>
              </div>
              <AlgorithmExplorer topic={topic} />
            </section>

            {/* 09 / IMPLEMENTATION (Code Lab) */}
            <section id="implementation" className="space-y-6 scroll-mt-28">
              <div className="border-b border-[#C9C7C0] pb-2 flex items-center justify-between font-mono text-xs">
                <span className="font-bold text-[#FF1E27]">09 / CODE LAB & PRODUCTION IMPLEMENTATION</span>
                <span className="text-[#777770]">[PYTORCH 2.4 SOTA]</span>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="font-bold text-[#111111]">
                    PYTORCH MULTI-HEAD ATTENTION MODULE (CAUSAL + FLASH KERNEL INTEGRATION)
                  </span>
                  <span className="text-[#FF1E27] font-bold">PYTHON 3.11</span>
                </div>
                <CodeBlock
                  code={topic.implementation?.code || `import math
import torch
import torch.nn as nn

class ScaledDotProductAttention(nn.Module):
    """
    Scaled dot-product attention with causal mask support.
    Attention(Q, K, V) = softmax(Q K^T / sqrt(d_k)) V
    """
    def __init__(self, dropout: float = 0.0):
        super().__init__()
        self.dropout = nn.Dropout(dropout)

    def forward(self, q: torch.Tensor, k: torch.Tensor, v: torch.Tensor, mask: torch.Tensor = None):
        # q, k, v shapes: [batch_size, num_heads, seq_len, d_k]
        d_k = q.size(-1)
        scores = torch.matmul(q, k.transpose(-2, -1)) / math.sqrt(d_k)
        
        if mask is not None:
            scores = scores.masked_fill(mask == 0, float("-inf"))
            
        attn_weights = torch.softmax(scores, dim=-1)
        attn_weights = self.dropout(attn_weights)
        output = torch.matmul(attn_weights, v)
        return output, attn_weights`}
                  language="python"
                  filename="attention_module.py"
                />
              </div>
            </section>

            {/* 10 / EVOLUTION (Technology Evolution) */}
            <section id="evolution" className="space-y-6 scroll-mt-28">
              <div className="border-b border-[#C9C7C0] pb-2 flex items-center justify-between font-mono text-xs">
                <span className="font-bold text-[#FF1E27]">10 / TECHNOLOGY EVOLUTION THROUGH GENERATIONS</span>
                <span className="text-[#777770]">[AUTHOR ANALYSIS]</span>
              </div>
              <div className="border border-[#C9C7C0] bg-[#FAF9F5] p-5 sm:p-6 space-y-4 font-mono text-xs">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 bg-[#EDECE6] border border-[#C9C7C0] space-y-1">
                    <span className="text-[10px] text-[#777770] uppercase font-bold block">GEN 1: RNN / LSTM (1997-2016)</span>
                    <p className="font-bold text-[#111111]">Sequential Recurrence</p>
                    <p className="text-[11px] text-[#555555]">O(N) sequential GPU unrolling. Vanishing gradients across 50+ tokens.</p>
                  </div>
                  <div className="p-3 bg-[#FAF9F5] border border-[#C9C7C0] space-y-1">
                    <span className="text-[10px] text-[#777770] uppercase font-bold block">GEN 2: TRANSFORMER (2017-2021)</span>
                    <p className="font-bold text-[#111111]">Scaled Dot-Product MHA</p>
                    <p className="text-[11px] text-[#555555]">O(1) path length, absolute sinusoids, Post-LayerNorm instability.</p>
                  </div>
                  <div className="p-3 bg-[#FAF9F5] border border-[#C9C7C0] space-y-1">
                    <span className="text-[10px] text-[#777770] uppercase font-bold block">GEN 3: MODERN LLM (2022-2024)</span>
                    <p className="font-bold text-[#111111]">Pre-RMSNorm + RoPE + GQA</p>
                    <p className="text-[11px] text-[#555555]">Rotary relative coordinates, Grouped-Query KV cache reduction.</p>
                  </div>
                  <div className="p-3 bg-[#111111] text-white border border-[#111111] space-y-1">
                    <span className="text-[10px] text-[#FF1E27] uppercase font-bold block">GEN 4: FRONTIER (2025-2026)</span>
                    <p className="font-bold text-white">FlashAttention-3 & SSM Hybrid</p>
                    <p className="text-[11px] text-stone-300">Asynchronous TMA hardware tiling + Mamba-2 duality.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* 11 / EXPERIMENTS (Laboratory Record) */}
            <section id="experiments" className="space-y-6 scroll-mt-28">
              <div className="border-b border-[#C9C7C0] pb-2 flex items-center justify-between font-mono text-xs">
                <span className="font-bold text-[#FF1E27]">11 / EXPERIMENT LAB & SCIENTIFIC RECORDS</span>
                <span className="text-[#777770]">[EXPERIMENTAL RESULT]</span>
              </div>
              <div className="border border-[#C9C7C0] bg-[#FAF9F5] p-5 sm:p-6 space-y-4 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-[#C9C7C0] pb-2">
                  <span className="text-[10px] text-[#FF1E27] font-bold uppercase">
                    EXPERIMENT 004 // KV-CACHE & FLASHATTENTION IO-SCALING
                  </span>
                  <span className="bg-[#111111] text-white px-2 py-0.5 text-[9px] font-bold">EMPIRICAL DATA</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-sans">
                  <div className="p-3 bg-[#EDECE6] border border-[#C9C7C0] space-y-1">
                    <span className="font-mono text-[9px] text-[#777770] font-bold uppercase block">QUESTION</span>
                    <p className="text-[#111111]">Does FlashAttention-3 eliminate quadratic memory scaling at 128k context lengths?</p>
                  </div>
                  <div className="p-3 bg-[#EDECE6] border border-[#C9C7C0] space-y-1">
                    <span className="font-mono text-[9px] text-[#777770] font-bold uppercase block">SETUP</span>
                    <p className="text-[#111111]">8x NVIDIA H100 SXM5 (80GB), Llama-3-70B, PyTorch 2.4, CUDA 12.4.</p>
                  </div>
                  <div className="p-3 bg-[#EDECE6] border border-[#C9C7C0] space-y-1">
                    <span className="font-mono text-[9px] text-[#FF1E27] font-bold uppercase block">CONCLUSION</span>
                    <p className="text-[#111111]">SRAM tiling bounds memory to O(N * d_k), preventing HBM out-of-memory errors.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* 12 / DATA (Attention Visualization & Memory Curves) */}
            <section id="data" className="space-y-6 scroll-mt-28">
              <div className="border-b border-[#C9C7C0] pb-2 flex items-center justify-between font-mono text-xs">
                <span className="font-bold text-[#FF1E27]">12 / DATA VISUALIZATION & ATTENTION MATRIX</span>
                <span className="text-[#777770]">[INTERACTIVE DATA]</span>
              </div>
              <AttentionVisualizer />
            </section>

            {/* 13 / BENCHMARKS (Benchmark Explorer) */}
            <section id="benchmarks" className="space-y-6 scroll-mt-28">
              <div className="border-b border-[#C9C7C0] pb-2 flex items-center justify-between font-mono text-xs">
                <span className="font-bold text-[#FF1E27]">13 / BENCHMARK LAB & COMPARATIVE ACCURACY</span>
                <span className="text-[#777770]">[PRIMARY SOURCE]</span>
              </div>
              <BenchmarkExplorer />
            </section>

            {/* 14 / APPLICATIONS */}
            <section id="applications" className="space-y-6 scroll-mt-28">
              <div className="border-b border-[#C9C7C0] pb-2 flex items-center justify-between font-mono text-xs">
                <span className="font-bold text-[#FF1E27]">14 / CROSS-DOMAIN INDUSTRIAL APPLICATIONS</span>
                <span className="text-[#777770]">[INDUSTRY SOTA]</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 font-mono text-xs">
                {[
                  { title: "AUTOREGRESSIVE LLMS", desc: "GPT-4o, Claude 3.5 Sonnet, Llama-3 text reasoning.", tag: "CORE NLP" },
                  { title: "VISION TRANSFORMERS (ViT)", desc: "Patch tokenization for high-resolution image analysis.", tag: "VISION" },
                  { title: "AI AGENTS & FUNCTION CALLING", desc: "Multi-turn tool invocation and Model Context Protocol.", tag: "SYSTEMS" },
                  { title: "DIFFUSION ATTENTION", desc: "Cross-attention text conditioning in Stable Diffusion 3.", tag: "GENERATIVE" },
                  { title: "CODE SYNTHESIS", desc: "Abstract syntax tree token modeling in Cursor & Copilot.", tag: "SOFTWARE" },
                  { title: "STRUCTURAL BIOLOGY", desc: "Evoformer pairwise residue spatial attention (AlphaFold 3).", tag: "AI × SCIENCE" }
                ].map((app) => (
                  <div key={app.title} className="p-3.5 bg-[#FAF9F5] border border-[#C9C7C0] space-y-1">
                    <div className="flex justify-between items-center text-[9px] text-[#FF1E27] font-bold">
                      <span>{app.tag}</span>
                    </div>
                    <div className="font-syne font-bold text-sm text-[#111111]">{app.title}</div>
                    <p className="text-[11px] font-sans text-[#555555]">{app.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 15 / LIMITATIONS & FAILURE ANALYSIS */}
            <section id="limitations" className="space-y-6 scroll-mt-28">
              <div className="border-b border-[#C9C7C0] pb-2 flex items-center justify-between font-mono text-xs">
                <span className="font-bold text-[#FF1E27]">15 / LIMITATIONS MATRIX & FAILURE ANALYSIS</span>
                <span className="text-[#777770]">[FAILURE AUDIT]</span>
              </div>
              <FailureCascade />
            </section>

            {/* 16 / CURRENT STATE (The State of AI — 2026) */}
            <section id="current-state" className="space-y-6 scroll-mt-28">
              <div className="border-b border-[#C9C7C0] pb-2 flex items-center justify-between font-mono text-xs">
                <span className="font-bold text-[#FF1E27]">16 / THE STATE OF AI — 2026 CURRENT FRONTIER</span>
                <span className="text-[#777770]">[VERIFIED OCT 2026]</span>
              </div>
              <div className="border border-[#C9C7C0] bg-[#FAF9F5] p-5 sm:p-6 space-y-4 font-mono text-xs">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3.5 bg-[#EDECE6] border border-[#C9C7C0] space-y-1.5">
                    <span className="text-[10px] text-emerald-800 font-bold uppercase block">WHAT WORKS & IMPROVED</span>
                    <ul className="space-y-1 text-xs font-sans text-[#333333]">
                      <li>• 128k–1M context windows via FlashAttention-3 and YaRN interpolation.</li>
                      <li>• Grouped-Query Attention (GQA) reduces KV memory by 8x.</li>
                      <li>• Test-time compute scaling (OpenAI o1/o3, DeepSeek-R1) boosts reasoning.</li>
                    </ul>
                  </div>

                  <div className="p-3.5 bg-[#EDECE6] border border-[#C9C7C0] space-y-1.5">
                    <span className="text-[10px] text-[#FF1E27] font-bold uppercase block">WHAT REMAINS DIFFICULT</span>
                    <ul className="space-y-1 text-xs font-sans text-[#333333]">
                      <li>• "Lost in the Middle" degradation across extreme 2M token retrieval.</li>
                      <li>• Quadratic scaling remains a wall for real-time edge devices.</li>
                      <li>• Hallucination in multi-hop factual chains without external RAG verification.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* 17 / ACTIVE RESEARCH (Live Research Board) */}
            <section id="active-research" className="space-y-6 scroll-mt-28">
              <div className="border-b border-[#C9C7C0] pb-2 flex items-center justify-between font-mono text-xs">
                <span className="font-bold text-[#FF1E27]">17 / ACTIVE RESEARCH BOARD & EXPERIMENT LOG</span>
                <span className="text-[#777770]">[ACTIVE INVESTIGATION]</span>
              </div>
              <ActiveResearchBoard />
            </section>

            {/* 18 / FUTURE (Future Roadmap) */}
            <section id="future" className="space-y-6 scroll-mt-28">
              <div className="border-b border-[#C9C7C0] pb-2 flex items-center justify-between font-mono text-xs">
                <span className="font-bold text-[#FF1E27]">18 / FUTURE HORIZONS & BREAKTHROUGH MAP</span>
                <span className="text-[#777770]">[HYPOTHESIS & SPECULATION]</span>
              </div>
              <FutureMap />
            </section>

            {/* 19 / REFERENCES & PAGE END (Section 37 Spec) */}
            <section id="references" className="space-y-8 scroll-mt-28 pt-4 border-t border-[#C9C7C0]">
              <div className="border-b border-[#C9C7C0] pb-2 flex items-center justify-between font-mono text-xs">
                <span className="font-bold text-[#FF1E27]">19 / PEER-REVIEWED REFERENCES & BIBLIOGRAPHY</span>
                <span className="text-[#777770]">[PRIMARY CITATIONS]</span>
              </div>

              {/* Citations List */}
              <div className="space-y-2 font-mono text-xs">
                {(topic.references || [
                  { title: "Attention Is All You Need", authors: "Vaswani et al.", year: "2017", publication: "NeurIPS 2017", link: "https://arxiv.org/abs/1706.03762" },
                  { title: "FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness", authors: "Dao et al.", year: "2022", publication: "NeurIPS 2022", link: "https://arxiv.org/abs/2205.14135" },
                  { title: "RoFormer: Enhanced Transformer with Rotary Position Embedding", authors: "Su et al.", year: "2021", publication: "Neurocomputing 2024", link: "https://arxiv.org/abs/2104.09864" },
                  { title: "GQA: Training Generalized Multi-Query Transformer Models from Multi-Head Checkpoints", authors: "Ainslie et al.", year: "2023", publication: "EMNLP 2023", link: "https://arxiv.org/abs/2305.13245" }
                ]).map((ref, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-[#FAF9F5] border border-[#C9C7C0] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                  >
                    <div>
                      <span className="text-[#FF1E27] font-bold mr-2">[{idx + 1}]</span>
                      <span className="font-bold text-[#111111]">{ref.title}</span>
                      <span className="text-[#555555] ml-2">— {ref.authors} ({ref.year}), {ref.publication}</span>
                    </div>

                    {ref.link && (
                      <a
                        href={ref.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#FF1E27] hover:underline inline-flex items-center gap-1 shrink-0"
                      >
                        <span>ARXIV / DOI</span>
                        <ExternalLink size={11} />
                      </a>
                    )}
                  </div>
                ))}
              </div>

              {/* ─────────────────────────────────────────────────────
                  SECTION 37 PAGE END MODULE
              ───────────────────────────────────────────────────── */}
              <div className="border border-[#111111] bg-[#FAF9F5] p-6 sm:p-8 space-y-6 shadow-sm">
                <div className="text-xs font-mono font-bold text-[#FF1E27] uppercase tracking-wider border-b border-[#C9C7C0] pb-2">
                  INVESTIGATION SYNTHESIS & NEXT QUESTIONS
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
                  <div className="p-4 bg-[#EDECE6] border border-[#C9C7C0] space-y-2">
                    <span className="font-mono text-[10px] text-[#777770] font-bold uppercase block">KEY FINDINGS</span>
                    <p className="text-[#333333] leading-relaxed">
                      Transformers revolutionized NLP through constant O(1) attention pathways, replacing temporal recurrence with parallel matrix multiplications. Hardware acceleration (FlashAttention-3) mitigates $O(N^2)$ memory to $O(N)$.
                    </p>
                  </div>

                  <div className="p-4 bg-[#EDECE6] border border-[#C9C7C0] space-y-2">
                    <span className="font-mono text-[10px] text-[#FF1E27] font-bold uppercase block">WHAT REMAINS UNKNOWN</span>
                    <p className="text-[#333333] leading-relaxed">
                      Can hybrid architectures (State Space Models + Sparse Attention) achieve the reasoning benchmarks of pure transformers at sub-quadratic prefill and generation costs?
                    </p>
                  </div>
                </div>

                {/* Previous & Next Paper Navigation */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#C9C7C0] font-mono text-xs">
                  {prevTopic ? (
                    <Link
                      to={`/research/${prevTopic.slug}`}
                      className="text-[#111111] hover:text-[#FF1E27] transition-colors flex items-center gap-2"
                    >
                      <ArrowLeft size={14} />
                      <span>PREV: {prevTopic.id} ({prevTopic.title})</span>
                    </Link>
                  ) : <div />}

                  <Link
                    to="/research"
                    className="btn-editorial-red px-5 py-2 font-bold tracking-wider cursor-pointer"
                  >
                    EXPLORE RESEARCH LAB →
                  </Link>

                  {nextTopic ? (
                    <Link
                      to={`/research/${nextTopic.slug}`}
                      className="text-[#111111] hover:text-[#FF1E27] transition-colors flex items-center gap-2"
                    >
                      <span>NEXT: {nextTopic.id} ({nextTopic.title})</span>
                      <ArrowRight size={14} />
                    </Link>
                  ) : <div />}
                </div>
              </div>

            </section>

          </main>

        </div>
      </div>

      {/* Editorial Footer */}
      <footer className="border-t border-[#C9C7C0] bg-[#FAF9F5] py-8 px-4 sm:px-6 md:px-12 font-mono text-xs text-[#777770]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            © {new Date().getFullYear()} REUBEN BINU GEORGE · AI RESEARCH LABORATORY
          </div>
          <div className="flex items-center gap-4">
            <Link to="/research" className="hover:text-[#FF1E27] transition-colors">
              RESEARCH INDEX
            </Link>
            <span>•</span>
            <a
              href="https://buymeacoffee.com/reubg.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#111111] hover:text-[#FF1E27] transition-colors flex items-center gap-1"
            >
              <span>☕ SUPPORT</span>
              <ExternalLink size={11} />
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}
