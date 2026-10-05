import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import { 
  ArrowLeft, 
  ArrowRight, 
  Share2, 
  Copy, 
  Check, 
  Clock, 
  Calendar, 
  Layers, 
  Microscope, 
  BookOpen, 
  ExternalLink, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingUp, 
  Cpu, 
  Binary, 
  Activity, 
  ShieldAlert, 
  FlaskConical, 
  Bookmark, 
  ListFilter,
  Network,
  Compass,
  Zap,
  HelpCircle
} from 'lucide-react';
import { researchTopics } from '../data/researchData';
import CodeBlock from '../components/Research/CodeBlock';
import AttentionVisualizer from '../components/Research/AttentionVisualizer';
import ArchitectureExplorer from '../components/Research/ArchitectureExplorer';
import MathStepVisualizer from '../components/Research/MathStepVisualizer';
import BenchmarkChart from '../components/Research/BenchmarkChart';
import VisualTimeline from '../components/Research/VisualTimeline';
import ProblemBreakthroughFlow from '../components/Research/ProblemBreakthroughFlow';
import FoundationsDependencyGraph from '../components/Research/FoundationsDependencyGraph';
import HowItWorksArchitecture from '../components/Research/HowItWorksArchitecture';
import AlgorithmExplorer from '../components/Research/AlgorithmExplorer';
import FailureCascade from '../components/Research/FailureCascade';
import ActiveResearchBoard from '../components/Research/ActiveResearchBoard';
import FutureMap from '../components/Research/FutureMap';
import BenchmarkExplorer from '../components/Research/BenchmarkExplorer';

export default function ResearchDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('overview');
  const [copiedLink, setCopiedLink] = useState(false);
  const [mobileTocOpen, setMobileTocOpen] = useState(false);
  const [readPercent, setReadPercent] = useState(0);

  // Find topic by exact slug or alias
  const topic = researchTopics.find((t) => t.slug === slug || (t.aliases && t.aliases.includes(slug))) || researchTopics[0];

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
    document.title = `${topic.title} // REUBG DEV RESEARCH`;
    window.scrollTo(0, 0);
  }, [slug, topic.title]);

  // Handle TOC smooth scroll
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

  // Canonical TOC Items specified in prompt section 8
  const tocItems = [
    { id: 'overview', label: 'OVERVIEW' },
    { id: 'origin', label: 'ORIGIN' },
    { id: 'why', label: 'WHY' },
    { id: 'foundations', label: 'FOUNDATIONS' },
    { id: 'how-it-works', label: 'HOW IT WORKS' },
    { id: 'mathematics', label: 'MATHEMATICS' },
    { id: 'algorithm', label: 'ALGORITHM' },
    { id: 'implementation', label: 'IMPLEMENTATION' },
    { id: 'evolution', label: 'EVOLUTION' },
    { id: 'experiments', label: 'EXPERIMENTS' },
    { id: 'data', label: 'DATA' },
    { id: 'benchmarks', label: 'BENCHMARKS' },
    { id: 'limitations', label: 'LIMITATIONS' },
    { id: 'applications', label: 'APPLICATIONS' },
    { id: 'current-state', label: 'CURRENT STATE' },
    { id: 'active-research', label: 'ACTIVE RESEARCH' },
    { id: 'future', label: 'FUTURE' },
    { id: 'references', label: 'REFERENCES' }
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

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Previous & Next navigation
  const currentIndex = researchTopics.findIndex((t) => t.slug === topic.slug);
  const prevTopic = currentIndex > 0 ? researchTopics[currentIndex - 1] : null;
  const nextTopic = currentIndex < researchTopics.length - 1 ? researchTopics[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-[#F1F0EB] text-[#111111] font-sans selection:bg-[#FF1E27] selection:text-white">
      
      {/* ─────────────────────────────────────────────────────────────
          PERSISTENT TOP READING PROGRESS BAR (Section 25 Spec)
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
            <span className="text-stone-500 uppercase">RESEARCH PROGRESS:</span>
            <span className="font-extrabold text-[#FF1E27]">{readPercent}%</span>
          </div>

          <button
            onClick={handleCopyLink}
            className="hidden sm:flex items-center gap-1 text-[10px] text-stone-600 hover:text-[#111111] border border-[#C9C7C0] bg-white px-2 py-0.5 cursor-pointer"
            title="Copy URL"
          >
            {copiedLink ? <Check size={11} className="text-[#FF1E27]" /> : <Copy size={11} />}
            <span>{copiedLink ? 'COPIED' : 'SHARE'}</span>
          </button>

          {/* Mobile TOC Button */}
          <button
            onClick={() => setMobileTocOpen(!mobileTocOpen)}
            className="lg:hidden flex items-center gap-1 text-[10px] bg-[#111111] text-white px-2 py-1 cursor-pointer"
          >
            <ListFilter size={12} />
            <span>TOC</span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Table of Contents */}
      {mobileTocOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[100px] z-50 bg-[#FAF9F5] border-b-2 border-[#111111] p-4 max-h-[70vh] overflow-y-auto shadow-2xl font-mono text-xs space-y-1">
          <div className="flex items-center justify-between pb-2 border-b border-[#C9C7C0] mb-2 font-bold">
            <span>TABLE OF CONTENTS</span>
            <button onClick={() => setMobileTocOpen(false)}>✕</button>
          </div>
          {tocItems.map(item => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`w-full text-left py-1.5 px-2 font-mono text-xs block transition-colors ${
                activeSection === item.id
                  ? 'bg-[#111111] text-white font-bold'
                  : 'text-stone-700 hover:bg-stone-200'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          RESEARCH PAPER HEADER (Section 8 Spec)
      ───────────────────────────────────────────────────────────── */}
      <header className="border-b-2 border-[#111111] bg-[#FAF9F5] py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-12">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Metadata Badges Strip */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 font-mono text-xs">
            <span className="bg-[#111111] text-white px-2.5 py-1 font-bold tracking-wider">
              {topic.id}
            </span>
            <span className="bg-white border border-[#C9C7C0] text-[#555555] px-2.5 py-1 font-bold uppercase tracking-wider">
              {topic.category}
            </span>
            <span className="bg-[#FF1E27] text-white px-2.5 py-1 font-bold uppercase tracking-wider">
              STATUS: {topic.status}
            </span>
            <span className="bg-white border border-[#C9C7C0] text-stone-600 px-2.5 py-1 font-bold uppercase">
              LEVEL: {topic.difficulty}
            </span>
            <span className="text-stone-500 font-bold ml-auto text-[11px] hidden md:inline">
              PROGRESS: {topic.progress}% COMPLETE
            </span>
          </div>

          {/* Main Title & Subtitle */}
          <div className="space-y-4 max-w-5xl">
            <h1 className="font-syne font-extrabold text-3xl sm:text-5xl md:text-6xl text-[#111111] uppercase tracking-tight leading-[1.05]">
              {topic.title}
            </h1>
            <p className="font-mono text-base sm:text-xl text-[#FF1E27] font-bold leading-relaxed">
              “{topic.subtitle}”
            </p>
          </div>

          {/* Research Dates & Reading Metadata */}
          <div className="pt-6 border-t border-[#C9C7C0] grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs text-[#555555]">
            <div>
              <span className="text-[10px] text-stone-400 uppercase block">RESEARCH STARTED:</span>
              <strong className="text-[#111111]">{topic.startedDate || '2024-03-12'}</strong>
            </div>
            <div>
              <span className="text-[10px] text-stone-400 uppercase block">LAST AUDIT / UPDATED:</span>
              <strong className="text-[#111111]">{topic.lastUpdated}</strong>
            </div>
            <div>
              <span className="text-[10px] text-stone-400 uppercase block">ESTIMATED READING:</span>
              <strong className="text-[#111111]">{topic.readingTime || '22 min read'}</strong>
            </div>
            <div>
              <span className="text-[10px] text-stone-400 uppercase block">RESEARCH CLASSIFICATION:</span>
              <strong className="text-[#111111]">DEEP-DIVE DISSERTATION</strong>
            </div>
          </div>

        </div>
      </header>

      {/* ─────────────────────────────────────────────────────────────
          MAIN 2-COLUMN RESEARCH NOTEBOOK WORKBENCH
      ───────────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Sticky Research Navigation Sidebar (Desktop) */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-[130px] font-mono text-xs space-y-4">
            <div className="bg-[#FAF9F5] border-2 border-[#111111] p-4 shadow-[4px_4px_0px_#111111] space-y-3">
              <div className="flex items-center justify-between border-b border-[#C9C7C0] pb-2 font-bold text-[11px] uppercase tracking-wider text-[#111111]">
                <span>RESEARCH INDEX</span>
                <span className="text-[#FF1E27]">{readPercent}%</span>
              </div>

              <nav className="space-y-0.5 max-h-[calc(100vh-230px)] overflow-y-auto pr-1">
                {tocItems.map(item => {
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full text-left py-1.5 px-2 text-[11px] block transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-[#111111] text-white font-bold translate-x-1'
                          : 'text-stone-600 hover:bg-stone-200 hover:text-[#111111]'
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Quick Stats Widget */}
            <div className="p-3 bg-white border border-[#C9C7C0] text-[10px] space-y-1 text-stone-500">
              <div className="font-bold text-[#111111]">METHODOLOGY: FIRST PRINCIPLES</div>
              <div>Zero superficial summaries. Formulated for engineering verification.</div>
            </div>
          </aside>

          {/* Main Paper Content Flow (18 Stages) */}
          <main className="lg:col-span-9 space-y-16 sm:space-y-20">
            
            {/* 01 — OVERVIEW & ABSTRACT */}
            <section id="overview" className="space-y-6">
              <div className="flex items-center gap-3 border-b-2 border-[#111111] pb-2 font-mono text-xs font-bold text-[#FF1E27] tracking-widest uppercase">
                <span>01 // TECHNICAL ABSTRACT & PROBLEM STATEMENT</span>
                <span className="h-px flex-1 bg-[#C9C7C0]" />
              </div>

              <div className="p-6 bg-white border-2 border-[#111111] shadow-[5px_5px_0px_#111111] space-y-4">
                <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest block font-bold">
                  EXECUTIVE RESEARCH SUMMARY
                </span>
                <p className="font-sans text-sm sm:text-base text-[#222222] leading-relaxed">
                  {topic.abstract}
                </p>
              </div>

              {/* Key Concept Pills */}
              <div className="space-y-2 font-mono text-xs">
                <span className="text-[10px] text-stone-500 font-bold uppercase tracking-wider block">
                  CORE TECHNICAL VOCABULARY:
                </span>
                <div className="flex flex-wrap gap-2">
                  {topic.keyConcepts?.map((c, i) => (
                    <span key={i} className="px-2.5 py-1 bg-[#FAF9F5] border border-[#C9C7C0] text-[#111111] font-medium text-xs">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            {/* 02 — ORIGIN & VISUAL TIMELINE (Section 9 Spec) */}
            <section id="origin" className="space-y-6">
              <div className="flex items-center gap-3 border-b-2 border-[#111111] pb-2 font-mono text-xs font-bold text-[#FF1E27] tracking-widest uppercase">
                <span>02 // HISTORICAL ORIGIN & CHRONOLOGY</span>
                <span className="h-px flex-1 bg-[#C9C7C0]" />
              </div>

              <div className="space-y-4 font-sans text-sm sm:text-base text-slate-700 leading-relaxed">
                <p>{topic.origin?.historicalContext}</p>
                {topic.origin?.earlyApproaches && (
                  <p><strong>Early Approaches:</strong> {topic.origin.earlyApproaches}</p>
                )}
              </div>

              {/* Interactive Visual Timeline Component */}
              <VisualTimeline timelineData={topic.origin?.timeline || []} />
            </section>

            {/* 03 — WHY WAS IT CREATED? (Section 10 Spec) */}
            <section id="why" className="space-y-6">
              <div className="flex items-center gap-3 border-b-2 border-[#111111] pb-2 font-mono text-xs font-bold text-[#FF1E27] tracking-widest uppercase">
                <span>03 // MOTIVATION & PROBLEM → BREAKTHROUGH FLOW</span>
                <span className="h-px flex-1 bg-[#C9C7C0]" />
              </div>

              <div className="p-4 bg-white border border-[#C9C7C0] font-mono text-xs text-slate-700">
                <strong className="text-[#FF1E27] uppercase block mb-1">FOUNDATIONAL RESEARCH QUESTION:</strong>
                <p className="font-sans text-sm">{topic.whyCreated?.problemStatement}</p>
              </div>

              {/* Signature Flowchart Visualizer */}
              <ProblemBreakthroughFlow />
            </section>

            {/* 04 — FOUNDATIONS (Section 11 Spec) */}
            <section id="foundations" className="space-y-6">
              <div className="flex items-center gap-3 border-b-2 border-[#111111] pb-2 font-mono text-xs font-bold text-[#FF1E27] tracking-widest uppercase">
                <span>04 // THEORETICAL FOUNDATIONS & PREREQUISITES</span>
                <span className="h-px flex-1 bg-[#C9C7C0]" />
              </div>

              <p className="font-sans text-sm text-slate-700 leading-relaxed">
                We assume zero background. Every mathematical concept builds strictly from high-dimensional linear algebra up to dense multi-head self-attention:
              </p>

              {/* Interactive Dependency Graph Component */}
              <FoundationsDependencyGraph />
            </section>

            {/* 05 — HOW IT WORKS (Section 12 Spec) */}
            <section id="how-it-works" className="space-y-6">
              <div className="flex items-center gap-3 border-b-2 border-[#111111] pb-2 font-mono text-xs font-bold text-[#FF1E27] tracking-widest uppercase">
                <span>05 // HOW IT WORKS — ARCHITECTURE & DATA FLOW</span>
                <span className="h-px flex-1 bg-[#C9C7C0]" />
              </div>

              <p className="font-sans text-sm text-slate-700 leading-relaxed">
                Step-by-step tensor propagation from input tokenization through dense multi-head linear projections to the vocabulary unembedding layer:
              </p>

              {/* Interactive Architecture Inspector */}
              <HowItWorksArchitecture />

              {/* Live Attention Weight Coreference Visualizer */}
              <AttentionVisualizer />

              {/* Modular Block Inspector */}
              <ArchitectureExplorer />
            </section>

            {/* 06 — MATHEMATICS (Section 13 Spec) */}
            <section id="mathematics" className="space-y-6">
              <div className="flex items-center gap-3 border-b-2 border-[#111111] pb-2 font-mono text-xs font-bold text-[#FF1E27] tracking-widest uppercase">
                <span>06 // MATHEMATICAL DERIVATIONS & TENSOR EQUATIONS</span>
                <span className="h-px flex-1 bg-[#C9C7C0]" />
              </div>

              <p className="font-sans text-sm text-slate-700 leading-relaxed">
                Every symbol, scaling constant, and matrix operator derived from first principles with numerical tensor walkthroughs:
              </p>

              {/* Interactive Mathematical Derivation Visualizer */}
              <MathStepVisualizer />
            </section>

            {/* 07 — ALGORITHM (Section 14 Spec) */}
            <section id="algorithm" className="space-y-6">
              <div className="flex items-center gap-3 border-b-2 border-[#111111] pb-2 font-mono text-xs font-bold text-[#FF1E27] tracking-widest uppercase">
                <span>07 // ALGORITHM EXPLORER & EXECUTION PLAYBACK</span>
                <span className="h-px flex-1 bg-[#C9C7C0]" />
              </div>

              <p className="font-sans text-sm text-slate-700 leading-relaxed">
                Step through the 7-phase execution sequence from discrete string tokenization to residual output projection:
              </p>

              {/* Interactive Algorithm Player */}
              <AlgorithmExplorer />
            </section>

            {/* 08 — IMPLEMENTATION (Section 15 Spec) */}
            <section id="implementation" className="space-y-6">
              <div className="flex items-center gap-3 border-b-2 border-[#111111] pb-2 font-mono text-xs font-bold text-[#FF1E27] tracking-widest uppercase">
                <span>08 // PRODUCTION CODE IMPLEMENTATION</span>
                <span className="h-px flex-1 bg-[#C9C7C0]" />
              </div>

              <p className="font-sans text-sm text-slate-700 leading-relaxed">
                Clean, vectorized software standard written in pure modern PyTorch with zero black-box magic:
              </p>

              {topic.implementation?.code && (
                <CodeBlock
                  code={topic.implementation.code}
                  language={topic.implementation.language?.toLowerCase().includes('python') ? 'python' : 'cpp'}
                  filename={`${topic.slug}-module.py`}
                />
              )}

              {topic.implementation?.performanceNotes && (
                <div className="p-4 bg-white border border-[#C9C7C0] font-mono text-xs text-slate-700 space-y-1">
                  <span className="text-[#FF1E27] font-bold uppercase tracking-wider block">
                    HARDWARE PERFORMANCE CONSIDERATIONS:
                  </span>
                  <p className="font-sans">{topic.implementation.performanceNotes}</p>
                </div>
              )}
            </section>

            {/* 09 — EVOLUTION (Section 16 Spec) */}
            <section id="evolution" className="space-y-6">
              <div className="flex items-center gap-3 border-b-2 border-[#111111] pb-2 font-mono text-xs font-bold text-[#FF1E27] tracking-widest uppercase">
                <span>09 // ARCHITECTURAL EVOLUTION & CHRONOLOGY</span>
                <span className="h-px flex-1 bg-[#C9C7C0]" />
              </div>

              {topic.evolution && (
                <div className="border border-[#C9C7C0] bg-white overflow-x-auto font-mono text-xs">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-[#FAF9F5] border-b border-[#C9C7C0] text-left">
                        <th className="p-3.5 font-bold text-[#111111] uppercase tracking-wider">GENERATION / PHASE</th>
                        <th className="p-3.5 font-bold text-[#FF1E27] uppercase tracking-wider">BREAKTHROUGH</th>
                        <th className="p-3.5 font-bold text-[#555555] uppercase tracking-wider">UNRESOLVED LIMITATION</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E4E2DC]">
                      {topic.evolution.map((e, idx) => (
                        <tr key={idx} className="hover:bg-black/[0.02]">
                          <td className="p-3.5 font-bold text-[#111111] whitespace-nowrap">{e.generation}</td>
                          <td className="p-3.5 text-[#333333] font-sans">{e.breakthrough}</td>
                          <td className="p-3.5 text-stone-500 font-sans">{e.limitation}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>

            {/* 10 — EXPERIMENTS (Section 17 Spec) */}
            <section id="experiments" className="space-y-6">
              <div className="flex items-center gap-3 border-b-2 border-[#111111] pb-2 font-mono text-xs font-bold text-[#FF1E27] tracking-widest uppercase">
                <span>10 // LABORATORY EXPERIMENTAL RECORDS</span>
                <span className="h-px flex-1 bg-[#C9C7C0]" />
              </div>

              {topic.experiments?.map((exp) => (
                <div key={exp.id} className="p-6 bg-white border-2 border-[#111111] shadow-[5px_5px_0px_#111111] space-y-4 font-mono text-xs">
                  <div className="flex items-center justify-between border-b border-[#C9C7C0] pb-2">
                    <span className="font-bold text-[#FF1E27]">{exp.id}</span>
                    <span className="text-[10px] text-stone-400">LABORATORY AUDIT DOSSIER</span>
                  </div>

                  <div>
                    <span className="text-[10px] text-[#555555] uppercase font-bold block">RESEARCH QUESTION:</span>
                    <p className="font-bold text-sm text-[#111111]">{exp.question}</p>
                  </div>

                  <div className="p-3 bg-[#FAF9F5] border border-[#C9C7C0] space-y-1">
                    <span className="text-[10px] text-[#FF1E27] uppercase font-bold block">HYPOTHESIS:</span>
                    <p className="font-sans text-stone-800">{exp.hypothesis}</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
                    <div className="p-2.5 bg-[#FAF9F5] border border-[#C9C7C0]">
                      <span className="font-bold block text-stone-700">EXPERIMENTAL SETUP:</span>
                      <p className="font-sans text-stone-600">{exp.setup}</p>
                    </div>
                    <div className="p-2.5 bg-[#FAF9F5] border border-[#C9C7C0]">
                      <span className="font-bold block text-stone-700">DATASET:</span>
                      <p className="font-sans text-stone-600">{exp.dataset}</p>
                    </div>
                  </div>

                  {exp.measurements && (
                    <div className="pt-2">
                      <span className="text-[10px] font-bold text-stone-500 uppercase block mb-1">EMPIRICAL MEASUREMENTS:</span>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {exp.measurements.map((m, i) => (
                          <div key={i} className="p-2 bg-white border border-[#C9C7C0] text-center">
                            <span className="text-[10px] text-stone-500 block truncate">{m.seq || m.metric || m.method}</span>
                            <span className="text-xs font-bold text-[#FF1E27]">{m.sram_io || m.count || m.success}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="p-3 bg-emerald-50 border border-emerald-300 space-y-1">
                    <span className="text-[10px] text-emerald-800 uppercase font-bold block">CONCLUSION:</span>
                    <p className="font-sans text-emerald-950">{exp.conclusion}</p>
                  </div>
                </div>
              ))}
            </section>

            {/* 11 — DATA LAB */}
            <section id="data" className="space-y-6">
              <div className="flex items-center gap-3 border-b-2 border-[#111111] pb-2 font-mono text-xs font-bold text-[#FF1E27] tracking-widest uppercase">
                <span>11 // DATA LAB & PRE-TRAINING CORPORA</span>
                <span className="h-px flex-1 bg-[#C9C7C0]" />
              </div>

              {topic.dataLab && (
                <div className="p-6 bg-white border border-[#C9C7C0] space-y-4 font-mono text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <span className="text-[10px] text-stone-500 uppercase font-bold block">PRETRAINING CORPORA:</span>
                      <p className="font-sans text-stone-800">{topic.dataLab.pretrainingCorpora}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] text-stone-500 uppercase font-bold block">TOKENIZATION DYNAMICS:</span>
                      <p className="font-sans text-stone-800">{topic.dataLab.tokenizationDynamics}</p>
                    </div>
                  </div>

                  {topic.dataLab.dataMixBreakdown && (
                    <div className="pt-2 border-t border-[#E4E2DC]">
                      <span className="text-[10px] text-stone-500 uppercase font-bold block mb-2">CURATED DATA MIX BREAKDOWN:</span>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {topic.dataLab.dataMixBreakdown.map((item, idx) => (
                          <div key={idx} className="p-2.5 bg-[#FAF9F5] border border-[#C9C7C0] text-center space-y-0.5">
                            <span className="text-xs font-bold text-[#111111] block truncate">{item.source}</span>
                            <span className="text-xs font-bold text-[#FF1E27] block">{item.ratio}</span>
                            <span className="text-[9px] text-stone-400 block">{item.qualityFilter}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </section>

            {/* 12 — BENCHMARKS (Section 19 Spec) */}
            <section id="benchmarks" className="space-y-6">
              <div className="flex items-center gap-3 border-b-2 border-[#111111] pb-2 font-mono text-xs font-bold text-[#FF1E27] tracking-widest uppercase">
                <span>12 // EMPIRICAL BENCHMARKS & MODEL COMPARISON</span>
                <span className="h-px flex-1 bg-[#C9C7C0]" />
              </div>

              {/* Sourced Comparison Table Component */}
              <BenchmarkExplorer />

              {/* Visual Benchmark Scaling Chart */}
              <BenchmarkChart />
            </section>

            {/* 13 — LIMITATIONS & FAILURE ANALYSIS (Section 20 Spec) */}
            <section id="limitations" className="space-y-6">
              <div className="flex items-center gap-3 border-b-2 border-[#111111] pb-2 font-mono text-xs font-bold text-[#FF1E27] tracking-widest uppercase">
                <span>13 // LIMITATIONS & FAILURE MODES</span>
                <span className="h-px flex-1 bg-[#C9C7C0]" />
              </div>

              {/* Interactive Failure Cascade Component */}
              <FailureCascade />
            </section>

            {/* 14 — REAL-WORLD APPLICATIONS */}
            <section id="applications" className="space-y-6">
              <div className="flex items-center gap-3 border-b-2 border-[#111111] pb-2 font-mono text-xs font-bold text-[#FF1E27] tracking-widest uppercase">
                <span>14 // REAL-WORLD APPLICATIONS & DEPLOYMENTS</span>
                <span className="h-px flex-1 bg-[#C9C7C0]" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
                {topic.applications?.map((app, idx) => (
                  <div key={idx} className="p-5 bg-white border border-[#C9C7C0] hover:border-[#111111] space-y-2 transition-colors">
                    <span className="text-[10px] text-[#FF1E27] font-bold uppercase tracking-wider block">
                      {app.domain}
                    </span>
                    <h5 className="font-bold text-sm text-[#111111] uppercase">{app.example}</h5>
                    <p className="font-sans text-stone-600 leading-relaxed">{app.impact}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 15 — CURRENT STATE (Section 21 Spec) */}
            <section id="current-state" className="space-y-6">
              <div className="flex items-center gap-3 border-b-2 border-[#111111] pb-2 font-mono text-xs font-bold text-[#FF1E27] tracking-widest uppercase">
                <span>15 // CURRENT FRONTIER — 2026 AUDIT</span>
                <span className="h-px flex-1 bg-[#C9C7C0]" />
              </div>

              <div className="p-6 bg-white border-2 border-[#111111] shadow-[5px_5px_0px_#111111] space-y-4 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-[#E4E2DC] pb-2">
                  <span className="font-bold text-[#FF1E27] text-sm uppercase">
                    CURRENT STATE-OF-THE-ART: {topic.currentState?.era || 'Reasoning & State-Space Hybrid Era'}
                  </span>
                  <span className="text-[10px] text-stone-500">YEAR: 2026</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                  <div className="space-y-1 p-3.5 bg-[#FAF9F5] border border-[#C9C7C0]">
                    <span className="font-bold text-emerald-700 block uppercase">WHAT CAN IT DO TODAY?</span>
                    <p className="font-sans text-stone-700">
                      Zero-shot generalization, competitive Olympiad reasoning via test-time verification, million-token context lookups, and multi-turn autonomous coding toolchains.
                    </p>
                  </div>

                  <div className="space-y-1 p-3.5 bg-[#FAF9F5] border border-[#C9C7C0]">
                    <span className="font-bold text-rose-700 block uppercase">WHAT REMAINS BROKEN?</span>
                    <p className="font-sans text-stone-700">
                      Continual lifelong knowledge updates without catastrophic forgetting, true formal correctness guarantees outside sandboxes, and quadratic KV-cache memory costs.
                    </p>
                  </div>
                </div>

                {topic.currentState?.highlights && (
                  <div className="space-y-1 pt-2">
                    <span className="text-[10px] text-stone-500 font-bold uppercase block">KEY 2026 ARCHITECTURAL HIGHLIGHTS:</span>
                    <ul className="space-y-1.5 font-sans text-stone-800 list-disc list-inside">
                      {topic.currentState.highlights.map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </section>

            {/* 16 — ACTIVE RESEARCH (Section 22 Spec) */}
            <section id="active-research" className="space-y-6">
              <div className="flex items-center gap-3 border-b-2 border-[#111111] pb-2 font-mono text-xs font-bold text-[#FF1E27] tracking-widest uppercase">
                <span>16 // ACTIVE RESEARCH BOARD</span>
                <span className="h-px flex-1 bg-[#C9C7C0]" />
              </div>

              {/* Live Research Board Component */}
              <ActiveResearchBoard />
            </section>

            {/* 17 — FUTURE (Section 23 Spec) */}
            <section id="future" className="space-y-6">
              <div className="flex items-center gap-3 border-b-2 border-[#111111] pb-2 font-mono text-xs font-bold text-[#FF1E27] tracking-widest uppercase">
                <span>17 // FUTURE RESEARCH DIRECTION MAP</span>
                <span className="h-px flex-1 bg-[#C9C7C0]" />
              </div>

              {/* Future Evidence Map Component */}
              <FutureMap />
            </section>

            {/* 18 — REFERENCES */}
            <section id="references" className="space-y-6">
              <div className="flex items-center gap-3 border-b-2 border-[#111111] pb-2 font-mono text-xs font-bold text-[#FF1E27] tracking-widest uppercase">
                <span>18 // SCIENTIFIC CITATIONS & PEER-REVIEWED REFERENCES</span>
                <span className="h-px flex-1 bg-[#C9C7C0]" />
              </div>

              {topic.references && (
                <div className="space-y-3 font-mono text-xs">
                  {topic.references.map((ref, idx) => (
                    <div key={ref.id || idx} className="p-4 bg-white border border-[#C9C7C0] space-y-1 hover:border-[#111111] transition-colors">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <span className="font-bold text-[#111111] text-xs">
                          [{idx + 1}] {ref.title}
                        </span>
                        {ref.link && (
                          <a
                            href={ref.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[#FF1E27] hover:underline"
                          >
                            <span>ARXIV / DOI</span>
                            <ExternalLink size={12} />
                          </a>
                        )}
                      </div>
                      <div className="text-[11px] text-[#555555] font-sans">{ref.authors} · {ref.venue}</div>
                      {ref.citation && (
                        <div className="text-[10px] text-stone-400 italic font-mono pt-1 border-t border-[#E4E2DC]">
                          BibTeX: {ref.citation}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* ─────────────────────────────────────────────────────────────
                PREV / NEXT TOPIC NAVIGATOR
            ───────────────────────────────────────────────────────────── */}
            <div className="pt-10 border-t-2 border-[#111111] grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
              {prevTopic ? (
                <Link
                  to={`/research/${prevTopic.slug}`}
                  className="bg-white border-2 border-[#111111] hover:border-[#FF1E27] p-4 space-y-1 group transition-colors shadow-[3px_3px_0px_#111111]"
                >
                  <span className="text-[10px] text-[#555555] block">← PREVIOUS TOPIC</span>
                  <div className="font-bold text-[#111111] group-hover:text-[#FF1E27] uppercase">
                    {prevTopic.title}
                  </div>
                </Link>
              ) : <div />}

              {nextTopic && (
                <Link
                  to={`/research/${nextTopic.slug}`}
                  className="bg-white border-2 border-[#111111] hover:border-[#FF1E27] p-4 space-y-1 group transition-colors text-right shadow-[3px_3px_0px_#111111]"
                >
                  <span className="text-[10px] text-[#555555] block">NEXT TOPIC →</span>
                  <div className="font-bold text-[#111111] group-hover:text-[#FF1E27] uppercase">
                    {nextTopic.title}
                  </div>
                </Link>
              )}
            </div>

          </main>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          ARCHIVAL LEGAL & CITATION FOOTER
      ───────────────────────────────────────────────────────────── */}
      <footer className="border-t-2 border-[#111111] bg-[#FAF9F5] py-12 px-4 sm:px-6 md:px-12 font-mono text-xs text-[#555555] mt-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1">
            <div className="font-bold uppercase tracking-wider text-[#111111]">
              REUBEN BINU GEORGE · REUBG DEV AI RESEARCH LABORATORY
            </div>
            <div>
              Documenting Artificial Intelligence from first principles to the modern frontier.
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-bold flex-wrap">
            <Link to="/research" className="text-[#FF1E27] hover:underline">
              ALL TOPICS
            </Link>
            <span>•</span>
            <Link to="/" className="text-[#111111] hover:text-[#FF1E27] transition-colors">
              PORTFOLIO HOME
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
