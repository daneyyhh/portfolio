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
  ListFilter
} from 'lucide-react';
import { researchTopics } from '../data/researchData';
import CodeBlock from '../components/Research/CodeBlock';
import AttentionVisualizer from '../components/Research/AttentionVisualizer';
import ArchitectureExplorer from '../components/Research/ArchitectureExplorer';
import MathStepVisualizer from '../components/Research/MathStepVisualizer';
import BenchmarkChart from '../components/Research/BenchmarkChart';

export default function ResearchDetailPage({ onOpenResume }) {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('abstract');
  const [copiedLink, setCopiedLink] = useState(false);
  const [mobileTocOpen, setMobileTocOpen] = useState(false);

  // Find topic
  const topic = researchTopics.find((t) => t.slug === slug) || researchTopics[0];

  // Scroll Progress Bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

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

  // Scroll Spy for TOC active indicator
  useEffect(() => {
    const sections = [
      'abstract', 'origin', 'why', 'fundamentals', 'how-it-works',
      'mathematics', 'algorithms', 'implementation', 'evolution',
      'experiments', 'data-lab', 'benchmarks', 'architecture',
      'applications', 'limitations', 'current-state', 'active-research',
      'future', 'conclusion', 'references'
    ];

    const handleScroll = () => {
      const scrollPos = window.scrollY + 140;
      for (const sId of sections) {
        const el = document.getElementById(sId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Previous & Next navigation
  const currentIndex = researchTopics.findIndex((t) => t.slug === topic.slug);
  const prevTopic = currentIndex > 0 ? researchTopics[currentIndex - 1] : null;
  const nextTopic = currentIndex < researchTopics.length - 1 ? researchTopics[currentIndex + 1] : null;

  const tocItems = [
    { id: 'abstract', label: '01. ABSTRACT' },
    { id: 'origin', label: '02. ORIGIN & TIMELINE' },
    { id: 'why', label: '03. WHY WAS IT CREATED?' },
    { id: 'fundamentals', label: '04. FUNDAMENTALS' },
    { id: 'how-it-works', label: '05. HOW IT WORKS' },
    { id: 'mathematics', label: '06. MATHEMATICS' },
    { id: 'algorithms', label: '07. ALGORITHMS' },
    { id: 'implementation', label: '08. IMPLEMENTATION' },
    { id: 'evolution', label: '09. EVOLUTION' },
    { id: 'experiments', label: '10. EXPERIMENTS' },
    { id: 'data-lab', label: '11. DATA LAB' },
    { id: 'benchmarks', label: '12. BENCHMARKS' },
    { id: 'architecture', label: '13. ARCHITECTURE' },
    { id: 'applications', label: '14. APPLICATIONS' },
    { id: 'limitations', label: '15. LIMITATIONS' },
    { id: 'current-state', label: '16. CURRENT STATE' },
    { id: 'active-research', label: '17. ACTIVE RESEARCH' },
    { id: 'future', label: '18. FUTURE' },
    { id: 'conclusion', label: '19. CONCLUSION' },
    { id: 'references', label: '20. REFERENCES' }
  ];

  return (
    <div className="min-h-screen bg-[#F1F0EB] text-[#111111] font-sans selection:bg-[#FF1E27] selection:text-white">
      {/* ─────────────────────────────────────────────────────────────
          FIXED TOP READING PROGRESS BAR
      ───────────────────────────────────────────────────────────── */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#FF1E27] z-[120] origin-left"
        style={{ scaleX }}
      />

      {/* ─────────────────────────────────────────────────────────────
          RESEARCH PAPER HEADER & METADATA BANNER
      ───────────────────────────────────────────────────────────── */}
      <header className="border-b border-[#C9C7C0] bg-[#FAF9F5] pt-10 sm:pt-14 pb-10 px-4 sm:px-6 md:px-12">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Breadcrumb & Navigation Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
            <Link
              to="/research"
              className="inline-flex items-center gap-2 text-[#555555] hover:text-[#FF1E27] transition-colors font-bold uppercase tracking-wider"
            >
              <ArrowLeft size={14} />
              <span>BACK TO RESEARCH ARCHIVE</span>
            </Link>

            <div className="flex items-center gap-3">
              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#C9C7C0] text-[11px] font-bold text-[#111111] hover:border-[#FF1E27] transition-colors cursor-pointer"
              >
                {copiedLink ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                <span>{copiedLink ? 'LINK COPIED' : 'SHARE RESEARCH'}</span>
              </button>
            </div>
          </div>

          {/* Research ID & Category Badges */}
          <div className="flex items-center gap-2.5 flex-wrap font-mono text-xs">
            <span className="px-2.5 py-1 bg-[#111111] text-white font-bold tracking-wider">
              {topic.id}
            </span>
            <span className="px-2.5 py-1 bg-white border border-[#C9C7C0] text-[#111111] font-bold uppercase">
              {topic.category}
            </span>
            {topic.status === 'Completed' ? (
              <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold uppercase flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                STATUS: COMPLETED
              </span>
            ) : (
              <span className="px-2.5 py-1 bg-amber-100 text-amber-800 border border-amber-300 font-bold uppercase flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                STATUS: {topic.status.toUpperCase()}
              </span>
            )}
          </div>

          {/* Title & Subtitle */}
          <div className="space-y-2 max-w-5xl">
            <h1 className="font-archivo text-3xl sm:text-5xl md:text-6xl text-[#111111] uppercase tracking-tight leading-[0.95]">
              {topic.title}
            </h1>
            {topic.subtitle && (
              <p className="font-mono text-base sm:text-lg md:text-xl font-bold text-[#FF1E27] leading-relaxed">
                {topic.subtitle}
              </p>
            )}
          </div>

          {/* Metadata Grid */}
          <div className="pt-4 border-t border-[#E4E2DC] grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3 font-mono text-xs">
            <div className="bg-white border border-[#C9C7C0] p-3">
              <span className="text-[10px] text-[#555555] uppercase block">STARTED</span>
              <span className="font-bold text-[#111111]">{topic.startedDate}</span>
            </div>
            <div className="bg-white border border-[#C9C7C0] p-3">
              <span className="text-[10px] text-[#555555] uppercase block">LAST AUDITED</span>
              <span className="font-bold text-[#111111]">{topic.lastUpdated}</span>
            </div>
            <div className="bg-white border border-[#C9C7C0] p-3">
              <span className="text-[10px] text-[#555555] uppercase block">READING TIME</span>
              <span className="font-bold text-[#111111]">{topic.readingTime}</span>
            </div>
            <div className="bg-white border border-[#C9C7C0] p-3">
              <span className="text-[10px] text-[#555555] uppercase block">DIFFICULTY</span>
              <span className="font-bold text-[#FF1E27] uppercase">{topic.difficulty}</span>
            </div>
            <div className="bg-white border border-[#C9C7C0] p-3 col-span-2 sm:col-span-1">
              <span className="text-[10px] text-[#555555] uppercase block">RESEARCH PROGRESS</span>
              <span className="font-bold text-emerald-700">{topic.progress}% VERIFIED</span>
            </div>
          </div>

        </div>
      </header>

      {/* ─────────────────────────────────────────────────────────────
          MAIN RESEARCH INTERACTION AREA (STICKY TOC + PAPER CONTENT)
      ───────────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* ─────────────────────────────────────────────────────────────
              STICKY SIDEBAR: TABLE OF CONTENTS (DESKTOP)
          ───────────────────────────────────────────────────────────── */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-24 space-y-4 font-mono">
            <div className="bg-white border-2 border-[#111111] p-4 shadow-[3px_3px_0px_#111111]">
              <div className="flex items-center gap-2 pb-3 border-b border-[#E4E2DC] text-xs font-extrabold uppercase text-[#111111]">
                <Bookmark size={14} className="text-[#FF1E27]" />
                <span>RESEARCH INDEX</span>
              </div>

              <nav className="pt-3 space-y-0.5 text-[11px] max-h-[70vh] overflow-y-auto no-scrollbar">
                {tocItems.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full text-left px-2.5 py-1.5 tracking-wider transition-all flex items-center justify-between cursor-pointer ${
                        isActive
                          ? 'bg-[#111111] text-white font-bold'
                          : 'text-[#555555] hover:text-[#111111] hover:bg-black/5'
                      }`}
                    >
                      <span className="truncate">{item.label}</span>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#FF1E27] shrink-0" />}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Quick Author Spec */}
            <div className="bg-[#FAF9F5] border border-[#C9C7C0] p-3 text-[10px] text-[#555555] space-y-1">
              <span className="font-bold text-[#111111] block uppercase">RESEARCH LEAD</span>
              <div>Reuben Binu George (reubg)</div>
              <div>AI Architecture & Systems Laboratory</div>
            </div>
          </aside>

          {/* ─────────────────────────────────────────────────────────────
              MOBILE TABLE OF CONTENTS ACCORDION TOGGLE
          ───────────────────────────────────────────────────────────── */}
          <div className="lg:hidden col-span-1 bg-white border border-[#C9C7C0] p-4 font-mono text-xs">
            <button
              onClick={() => setMobileTocOpen(!mobileTocOpen)}
              className="w-full flex items-center justify-between font-bold text-[#111111]"
            >
              <div className="flex items-center gap-2">
                <ListFilter size={15} className="text-[#FF1E27]" />
                <span>TABLE OF CONTENTS (20 SECTIONS)</span>
              </div>
              <span className="text-[#FF1E27]">{mobileTocOpen ? 'CLOSE ▲' : 'OPEN ▼'}</span>
            </button>

            {mobileTocOpen && (
              <div className="pt-4 border-t border-[#E4E2DC] mt-3 grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px]">
                {tocItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="text-left py-1 text-slate-700 hover:text-[#FF1E27]"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ─────────────────────────────────────────────────────────────
              PRIMARY EDITORIAL RESEARCH PAPER BODY (ALL 20 SECTIONS)
          ───────────────────────────────────────────────────────────── */}
          <main className="lg:col-span-9 space-y-16">
            
            {/* 01 — ABSTRACT */}
            <section id="abstract" className="space-y-4 pt-2">
              <div className="flex items-center gap-3 border-b border-[#C9C7C0] pb-2 font-mono text-xs font-bold text-[#FF1E27] tracking-widest uppercase">
                <span>01 // ABSTRACT</span>
                <span className="h-px flex-1 bg-[#C9C7C0]" />
              </div>

              <div className="bg-white border-l-4 border-l-[#FF1E27] border border-[#C9C7C0] p-6 sm:p-8 space-y-4 shadow-sm">
                <h3 className="font-mono text-xs font-bold text-[#555555] uppercase tracking-wider">
                  PRIMARY TECHNICAL DISPATCH ABSTRACT
                </h3>
                <p className="font-sans text-base sm:text-lg text-slate-800 leading-relaxed font-medium">
                  {topic.abstract}
                </p>
                
                <div className="pt-2 flex flex-wrap gap-2">
                  {topic.keyConcepts.map((c) => (
                    <span
                      key={c}
                      className="font-mono text-[11px] bg-[#EDECE6] border border-[#C9C7C0] text-[#111111] px-2.5 py-1 font-bold uppercase"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            {/* 02 — ORIGIN & HISTORICAL TIMELINE */}
            <section id="origin" className="space-y-6">
              <div className="flex items-center gap-3 border-b border-[#C9C7C0] pb-2 font-mono text-xs font-bold text-[#FF1E27] tracking-widest uppercase">
                <span>02 // ORIGIN & HISTORICAL EVOLUTION</span>
                <span className="h-px flex-1 bg-[#C9C7C0]" />
              </div>

              <div className="space-y-4 font-sans text-sm sm:text-base text-slate-700 leading-relaxed">
                <p>{topic.origin?.historicalContext}</p>
                <p>
                  <strong>Original Bottleneck:</strong> {topic.origin?.originalProblem}
                </p>
                <p>
                  <strong>Early Approaches:</strong> {topic.origin?.earlyApproaches}
                </p>
              </div>

              {/* Researchers Box */}
              {topic.origin?.pioneeringResearchers && (
                <div className="bg-white border border-[#C9C7C0] p-5 space-y-3 font-mono">
                  <span className="text-[11px] text-[#FF1E27] font-bold uppercase tracking-wider block">
                    PIONEERING ARCHITECTS & RESEARCHERS:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    {topic.origin.pioneeringResearchers.map((r) => (
                      <div key={r.name} className="border-l-2 border-[#111111] pl-3 py-1">
                        <div className="font-bold text-[#111111]">{r.name}</div>
                        <div className="text-[11px] text-[#555555]">{r.role}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Visual Chronological Timeline */}
              {topic.origin?.timeline && (
                <div className="space-y-3 pt-2">
                  <span className="font-mono text-xs font-bold text-[#111111] uppercase tracking-wider block">
                    CHRONOLOGICAL MILESTONE PROGRESSION:
                  </span>

                  <div className="border-l-2 border-[#FF1E27] ml-3 pl-6 space-y-6 font-mono">
                    {topic.origin.timeline.map((item, idx) => (
                      <div key={idx} className="relative group">
                        <span className="absolute -left-[31px] top-1 w-2.5 h-2.5 rounded-full bg-[#111111] border-2 border-[#FF1E27] group-hover:scale-125 transition-transform" />
                        <span className="text-xs font-bold text-[#FF1E27] tracking-wider block">
                          {item.year}
                        </span>
                        <p className="font-sans text-xs sm:text-sm text-slate-800 leading-relaxed mt-0.5">
                          {item.event}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>

            {/* 03 — WHY WAS IT CREATED? */}
            <section id="why" className="space-y-6">
              <div className="flex items-center gap-3 border-b border-[#C9C7C0] pb-2 font-mono text-xs font-bold text-[#FF1E27] tracking-widest uppercase">
                <span>03 // WHY WAS IT CREATED?</span>
                <span className="h-px flex-1 bg-[#C9C7C0]" />
              </div>

              <div className="space-y-4 font-sans text-sm sm:text-base text-slate-700 leading-relaxed">
                <p className="font-medium text-slate-900 text-base sm:text-lg">
                  {topic.whyCreated?.problemStatement}
                </p>

                {topic.whyCreated?.limitationsOfPredecessors && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs pt-2">
                    {topic.whyCreated.limitationsOfPredecessors.map((p, i) => (
                      <div key={i} className="bg-white border border-[#C9C7C0] p-4 space-y-1">
                        <span className="font-bold text-[#FF1E27] uppercase block">{p.model}</span>
                        <p className="font-sans text-slate-700">{p.limitation}</p>
                      </div>
                    ))}
                  </div>
                )}

                <p className="pt-2">{topic.whyCreated?.proposedSolution}</p>
              </div>

              {/* Solution Flowchart */}
              {topic.whyCreated?.flowchart && (
                <div className="bg-[#0A0A0E] text-white border border-white/20 p-5 sm:p-6 font-mono space-y-4">
                  <span className="text-xs font-bold text-[#FF1E27] uppercase tracking-wider block">
                    STRUCTURAL PROBLEM-SOLVING FLOW:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                    {topic.whyCreated.flowchart.map((step, idx) => (
                      <div key={idx} className="bg-white/5 border border-white/10 p-3 space-y-1.5 relative">
                        <div className="text-[#FF1E27] font-bold text-[10px]">
                          STEP 0{idx + 1}
                        </div>
                        <div className="font-bold text-white text-xs uppercase">{step.step}</div>
                        <div className="text-[11px] text-slate-400 font-sans leading-relaxed">{step.detail}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>

            {/* 04 — FUNDAMENTALS */}
            <section id="fundamentals" className="space-y-6">
              <div className="flex items-center gap-3 border-b border-[#C9C7C0] pb-2 font-mono text-xs font-bold text-[#FF1E27] tracking-widest uppercase">
                <span>04 // FUNDAMENTALS & PREREQUISITES</span>
                <span className="h-px flex-1 bg-[#C9C7C0]" />
              </div>

              <p className="font-sans text-sm sm:text-base text-slate-700 leading-relaxed">
                Zero assumptions. Every mathematical and structural prerequisite required to understand this research is deconstructed step-by-step:
              </p>

              <div className="space-y-4 font-mono">
                {topic.fundamentals?.map((fund, idx) => (
                  <div key={idx} className="bg-white border border-[#C9C7C0] p-5 space-y-1.5">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#111111] uppercase tracking-wider">
                      <span className="text-[#FF1E27]">PREREQ 0{idx + 1} //</span>
                      <span>{fund.concept}</span>
                    </div>
                    <p className="font-sans text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {fund.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* 05 — HOW IT WORKS */}
            <section id="how-it-works" className="space-y-6">
              <div className="flex items-center gap-3 border-b border-[#C9C7C0] pb-2 font-mono text-xs font-bold text-[#FF1E27] tracking-widest uppercase">
                <span>05 // HOW IT WORKS (INTERNAL MECHANISM)</span>
                <span className="h-px flex-1 bg-[#C9C7C0]" />
              </div>

              <p className="font-sans text-sm sm:text-base text-slate-700 leading-relaxed">
                {topic.howItWorks?.overview}
              </p>

              {/* Step by Step Pipeline */}
              {topic.howItWorks?.pipeline && (
                <div className="space-y-3 font-mono">
                  {topic.howItWorks.pipeline.map((p, i) => (
                    <div key={i} className="bg-white border-l-2 border-l-[#111111] border border-[#C9C7C0] p-4 space-y-1">
                      <div className="text-xs font-bold text-[#111111] uppercase">{p.stage}</div>
                      <p className="font-sans text-xs sm:text-sm text-slate-700">{p.description}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Interactive Attention Visualizer (For Transformers Topic) */}
              {topic.slug === 'transformers-attention' && (
                <AttentionVisualizer />
              )}
            </section>

            {/* 06 — MATHEMATICS */}
            <section id="mathematics" className="space-y-6">
              <div className="flex items-center gap-3 border-b border-[#C9C7C0] pb-2 font-mono text-xs font-bold text-[#FF1E27] tracking-widest uppercase">
                <span>06 // MATHEMATICAL FORMULATION & DERIVATION</span>
                <span className="h-px flex-1 bg-[#C9C7C0]" />
              </div>

              {/* Core Formula Box */}
              <div className="bg-[#0A0A0E] text-white border border-white/20 p-6 font-mono space-y-3 shadow-xl">
                <span className="text-[10px] text-[#FF1E27] font-bold uppercase tracking-widest block">
                  GOVERNING EQUATION:
                </span>
                <div className="text-base sm:text-xl md:text-2xl font-bold text-white break-words">
                  {topic.mathematics?.formula}
                </div>
                {topic.mathematics?.multiHeadFormula && (
                  <div className="text-xs sm:text-sm text-emerald-400 pt-1">
                    {topic.mathematics.multiHeadFormula}
                  </div>
                )}
              </div>

              {/* Variable Definitions */}
              {topic.mathematics?.variables && (
                <div className="bg-white border border-[#C9C7C0] p-5 space-y-3 font-mono">
                  <span className="text-xs font-bold text-[#111111] uppercase tracking-wider block">
                    VARIABLE DEFINITIONS & DIMENSIONS:
                  </span>
                  <div className="space-y-2 text-xs">
                    {topic.mathematics.variables.map((v, i) => (
                      <div key={i} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 border-b border-[#E4E2DC] pb-2">
                        <span className="font-extrabold text-[#FF1E27] w-24 shrink-0 font-mono">
                          {v.symbol}
                        </span>
                        <span className="text-slate-700 font-sans">{v.definition}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Derivation Notes */}
              {topic.mathematics?.derivationNotes && (
                <div className="bg-[#FAF9F5] border border-[#C9C7C0] p-5 space-y-1.5 font-mono text-xs">
                  <span className="text-[#FF1E27] font-bold uppercase tracking-wider block">
                    MATHEMATICAL DERIVATION ANALYSIS:
                  </span>
                  <p className="font-sans text-slate-700 leading-relaxed">
                    {topic.mathematics.derivationNotes}
                  </p>
                </div>
              )}

              {/* Interactive Step-by-Step Math Derivation Walkthrough */}
              {topic.slug === 'transformers-attention' && (
                <MathStepVisualizer />
              )}
            </section>

            {/* 07 — ALGORITHMS */}
            <section id="algorithms" className="space-y-6">
              <div className="flex items-center gap-3 border-b border-[#C9C7C0] pb-2 font-mono text-xs font-bold text-[#FF1E27] tracking-widest uppercase">
                <span>07 // ALGORITHMIC EXECUTION & COMPLEXITY</span>
                <span className="h-px flex-1 bg-[#C9C7C0]" />
              </div>

              {topic.algorithms && (
                <div className="space-y-4 font-mono">
                  {/* Complexity Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="bg-white border border-[#C9C7C0] p-3">
                      <span className="text-[10px] text-[#555555] block uppercase">TIME COMPLEXITY</span>
                      <span className="font-bold text-[#FF1E27]">{topic.algorithms.timeComplexity}</span>
                    </div>
                    <div className="bg-white border border-[#C9C7C0] p-3">
                      <span className="text-[10px] text-[#555555] block uppercase">SPACE COMPLEXITY</span>
                      <span className="font-bold text-[#111111]">{topic.algorithms.spaceComplexity}</span>
                    </div>
                    <div className="bg-white border border-[#C9C7C0] p-3">
                      <span className="text-[10px] text-[#555555] block uppercase">KV-CACHE / INFERENCE</span>
                      <span className="font-bold text-emerald-700">{topic.algorithms.kvCacheComplexity}</span>
                    </div>
                  </div>

                  {/* Pseudocode Block */}
                  {topic.algorithms.pseudocode && (
                    <CodeBlock
                      code={topic.algorithms.pseudocode}
                      language="python"
                      filename={`${topic.slug}-algorithm.py`}
                    />
                  )}
                </div>
              )}
            </section>

            {/* 08 — IMPLEMENTATION */}
            <section id="implementation" className="space-y-6">
              <div className="flex items-center gap-3 border-b border-[#C9C7C0] pb-2 font-mono text-xs font-bold text-[#FF1E27] tracking-widest uppercase">
                <span>08 // PRODUCTION CODE IMPLEMENTATION</span>
                <span className="h-px flex-1 bg-[#C9C7C0]" />
              </div>

              <p className="font-sans text-sm sm:text-base text-slate-700 leading-relaxed">
                Standalone, verifiable implementation written in clean modern software standards with zero black-box magic:
              </p>

              {topic.implementation?.code && (
                <CodeBlock
                  code={topic.implementation.code}
                  language={topic.implementation.language.toLowerCase().includes('python') ? 'python' : 'cpp'}
                  filename={`${topic.slug}-module.py`}
                />
              )}

              {topic.implementation?.performanceNotes && (
                <div className="p-4 bg-white border border-[#C9C7C0] font-mono text-xs text-slate-700 space-y-1">
                  <span className="text-[#FF1E27] font-bold uppercase tracking-wider block">
                    PRODUCTION PERFORMANCE CONSIDERATIONS:
                  </span>
                  <p className="font-sans">{topic.implementation.performanceNotes}</p>
                </div>
              )}
            </section>

            {/* 09 — EVOLUTION */}
            <section id="evolution" className="space-y-6">
              <div className="flex items-center gap-3 border-b border-[#C9C7C0] pb-2 font-mono text-xs font-bold text-[#FF1E27] tracking-widest uppercase">
                <span>09 // ARCHITECTURAL EVOLUTION</span>
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
                          <td className="p-3.5 text-slate-800 font-sans">{e.breakthrough}</td>
                          <td className="p-3.5 text-[#555555] font-sans">{e.limitation}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>

            {/* 10 — EXPERIMENTS */}
            <section id="experiments" className="space-y-6">
              <div className="flex items-center gap-3 border-b border-[#C9C7C0] pb-2 font-mono text-xs font-bold text-[#FF1E27] tracking-widest uppercase">
                <span>10 // EXPERIMENTAL RESEARCH PROTOCOLS</span>
                <span className="h-px flex-1 bg-[#C9C7C0]" />
              </div>

              <p className="font-sans text-sm sm:text-base text-slate-700 leading-relaxed">
                Empirical scientific rigor. Every experiment follows formal hypothesis testing with documented variables and real empirical measurements:
              </p>

              {topic.experiments?.map((exp) => (
                <div key={exp.id} className="bg-white border-2 border-[#111111] p-5 sm:p-7 space-y-4 font-mono shadow-[4px_4px_0px_#111111]">
                  <div className="flex justify-between items-center border-b border-[#E4E2DC] pb-3 flex-wrap gap-2">
                    <span className="text-xs font-bold text-[#FF1E27] tracking-wider uppercase">
                      EXPERIMENT {exp.id}
                    </span>
                    <span className="text-[10px] text-emerald-700 px-2 py-0.5 bg-emerald-50 border border-emerald-300 font-bold uppercase">
                      VERIFIED RESULT
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] text-[#555555] uppercase block font-bold">QUESTION:</span>
                    <h4 className="font-sans text-sm sm:text-base font-bold text-[#111111]">
                      {exp.question}
                    </h4>
                  </div>

                  <div className="p-3 bg-[#FAF9F5] border border-[#C9C7C0] text-xs text-slate-700 space-y-1">
                    <span className="text-[#FF1E27] font-bold uppercase block text-[10px]">HYPOTHESIS:</span>
                    <p className="font-sans">{exp.hypothesis}</p>
                  </div>

                  {/* Measurements Table */}
                  {exp.measurements && (
                    <div className="space-y-2 pt-2">
                      <span className="text-[10px] text-[#555555] uppercase block font-bold">EMPIRICAL MEASUREMENTS:</span>
                      <div className="border border-[#C9C7C0] bg-white overflow-x-auto text-xs">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="bg-[#FAF9F5] border-b border-[#C9C7C0] text-left text-[11px]">
                              {Object.keys(exp.measurements[0]).map((key) => (
                                <th key={key} className="p-2.5 font-bold uppercase text-[#111111]">
                                  {key}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#E4E2DC]">
                            {exp.measurements.map((row, rIdx) => (
                              <tr key={rIdx}>
                                {Object.values(row).map((val, cIdx) => (
                                  <td key={cIdx} className="p-2.5 text-slate-800">
                                    {String(val)}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  <div className="pt-2 text-xs space-y-1">
                    <span className="text-[10px] text-[#555555] uppercase block font-bold">ANALYSIS & CONCLUSION:</span>
                    <p className="font-sans text-slate-800 leading-relaxed">{exp.results}</p>
                    <p className="font-sans text-slate-800 font-bold pt-1">{exp.conclusion}</p>
                  </div>
                </div>
              ))}
            </section>

            {/* 11 — DATA LAB */}
            <section id="data-lab" className="space-y-6">
              <div className="flex items-center gap-3 border-b border-[#C9C7C0] pb-2 font-mono text-xs font-bold text-[#FF1E27] tracking-widest uppercase">
                <span>11 // DATA LAB & CORPORA DYNAMICS</span>
                <span className="h-px flex-1 bg-[#C9C7C0]" />
              </div>

              {topic.dataLab && (
                <div className="space-y-4 font-mono">
                  <div className="bg-white border border-[#C9C7C0] p-5 space-y-2">
                    <span className="text-xs font-bold text-[#111111] uppercase block">PRE-TRAINING CORPORA:</span>
                    <p className="font-sans text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {topic.dataLab.pretrainingCorpora}
                    </p>
                  </div>

                  {topic.dataLab.dataMixBreakdown && (
                    <div className="border border-[#C9C7C0] bg-white overflow-x-auto text-xs">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-[#FAF9F5] border-b border-[#C9C7C0] text-left">
                            <th className="p-3 font-bold text-[#111111] uppercase">DATA SOURCE</th>
                            <th className="p-3 font-bold text-[#FF1E27] uppercase">MIX RATIO</th>
                            <th className="p-3 font-bold text-[#555555] uppercase">QUALITY FILTERING CRITERIA</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E4E2DC]">
                          {topic.dataLab.dataMixBreakdown.map((d, i) => (
                            <tr key={i}>
                              <td className="p-3 font-bold text-[#111111]">{d.source}</td>
                              <td className="p-3 text-[#FF1E27] font-bold">{d.ratio}</td>
                              <td className="p-3 text-slate-700 font-sans">{d.qualityFilter}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </section>

            {/* 12 — GRAPHS & BENCHMARKS */}
            <section id="benchmarks" className="space-y-6">
              <div className="flex items-center gap-3 border-b border-[#C9C7C0] pb-2 font-mono text-xs font-bold text-[#FF1E27] tracking-widest uppercase">
                <span>12 // EMPIRICAL BENCHMARKS & SCALING</span>
                <span className="h-px flex-1 bg-[#C9C7C0]" />
              </div>

              <BenchmarkChart />
            </section>

            {/* 13 — ARCHITECTURE VISUALIZATION */}
            <section id="architecture" className="space-y-6">
              <div className="flex items-center gap-3 border-b border-[#C9C7C0] pb-2 font-mono text-xs font-bold text-[#FF1E27] tracking-widest uppercase">
                <span>13 // SYSTEM ARCHITECTURE VISUALIZATION</span>
                <span className="h-px flex-1 bg-[#C9C7C0]" />
              </div>

              <ArchitectureExplorer />
            </section>

            {/* 14 — REAL-WORLD APPLICATIONS */}
            <section id="applications" className="space-y-6">
              <div className="flex items-center gap-3 border-b border-[#C9C7C0] pb-2 font-mono text-xs font-bold text-[#FF1E27] tracking-widest uppercase">
                <span>14 // REAL-WORLD APPLICATIONS & SYSTEMS</span>
                <span className="h-px flex-1 bg-[#C9C7C0]" />
              </div>

              {topic.applications && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono">
                  {topic.applications.map((app, i) => (
                    <div key={i} className="bg-white border border-[#C9C7C0] p-5 space-y-2">
                      <div className="text-xs font-bold text-[#FF1E27] uppercase">{app.domain}</div>
                      <div className="font-bold text-[#111111] text-sm uppercase">{app.example}</div>
                      <p className="font-sans text-xs text-slate-700 leading-relaxed pt-1">{app.impact}</p>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* 15 — LIMITATIONS & FAILURE ANALYSIS */}
            <section id="limitations" className="space-y-6">
              <div className="flex items-center gap-3 border-b border-[#C9C7C0] pb-2 font-mono text-xs font-bold text-[#FF1E27] tracking-widest uppercase">
                <span>15 // LIMITATIONS & FAILURE ANALYSIS</span>
                <span className="h-px flex-1 bg-[#C9C7C0]" />
              </div>

              {topic.limitations && (
                <div className="space-y-4 font-mono text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="bg-white border border-[#C9C7C0] p-4 space-y-1">
                      <span className="text-[#FF1E27] font-bold uppercase block">COMPUTATIONAL BOTTLENECK</span>
                      <p className="font-sans text-slate-700">{topic.limitations.computationalBottleneck}</p>
                    </div>
                    <div className="bg-white border border-[#C9C7C0] p-4 space-y-1">
                      <span className="text-[#FF1E27] font-bold uppercase block">MEMORY BANDWIDTH BOTTLENECK</span>
                      <p className="font-sans text-slate-700">{topic.limitations.memoryBottleneck}</p>
                    </div>
                  </div>

                  {topic.limitations.failureDiagram && (
                    <div className="bg-[#181212] border border-[#FF1E27]/30 p-5 space-y-3">
                      <span className="text-xs font-bold text-[#FF1E27] uppercase tracking-wider block">
                        FAILURE CONDITIONAL CASCADE DIAGRAM:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                        {topic.limitations.failureDiagram.map((f, idx) => (
                          <div key={idx} className="bg-black/50 border border-white/10 p-3 space-y-1">
                            <span className="text-[#FF1E27] font-bold text-[10px]">STAGE 0{idx + 1}</span>
                            <div className="font-bold text-white text-xs">{f.stage}</div>
                            <div className="text-[11px] text-slate-400 font-sans">{f.note}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </section>

            {/* 16 — CURRENT STATE (2026 FRONTIER) */}
            <section id="current-state" className="space-y-6">
              <div className="flex items-center gap-3 border-b border-[#C9C7C0] pb-2 font-mono text-xs font-bold text-[#FF1E27] tracking-widest uppercase">
                <span>16 // CURRENT STATE OF THE FIELD (2026)</span>
                <span className="h-px flex-1 bg-[#C9C7C0]" />
              </div>

              {topic.currentState && (
                <div className="bg-white border-2 border-[#111111] p-6 space-y-4 font-mono shadow-[4px_4px_0px_#111111]">
                  <div className="flex items-center justify-between border-b border-[#E4E2DC] pb-3">
                    <span className="text-xs font-bold text-[#FF1E27] uppercase tracking-wider">
                      ACTIVE SOTA FRONTIER ERA
                    </span>
                    <span className="text-[11px] text-[#555555] font-bold">
                      {topic.currentState.era}
                    </span>
                  </div>

                  <ul className="space-y-2.5 font-sans text-xs sm:text-sm text-slate-800">
                    {topic.currentState.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF1E27] mt-2 shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>

            {/* 17 — ACTIVE RESEARCH */}
            <section id="active-research" className="space-y-6">
              <div className="flex items-center gap-3 border-b border-[#C9C7C0] pb-2 font-mono text-xs font-bold text-[#FF1E27] tracking-widest uppercase">
                <span>17 // ACTIVE RESEARCH & OPEN PROBLEMS</span>
                <span className="h-px flex-1 bg-[#C9C7C0]" />
              </div>

              {topic.activeResearch && (
                <div className="space-y-3 font-mono text-xs">
                  {topic.activeResearch.map((ar, i) => (
                    <div key={i} className="bg-white border border-[#C9C7C0] p-4 space-y-1.5">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-[#111111] uppercase">{ar.topic}</span>
                        <span className="text-[10px] text-[#FF1E27] font-bold uppercase">{ar.status}</span>
                      </div>
                      <p className="font-sans text-slate-700">{ar.question}</p>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* 18 — FUTURE */}
            <section id="future" className="space-y-6">
              <div className="flex items-center gap-3 border-b border-[#C9C7C0] pb-2 font-mono text-xs font-bold text-[#FF1E27] tracking-widest uppercase">
                <span>18 // FUTURE TRAJECTORY & HYPOTHESES</span>
                <span className="h-px flex-1 bg-[#C9C7C0]" />
              </div>

              {topic.future && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                  <div className="bg-white border border-emerald-300 p-4 space-y-1">
                    <span className="text-[10px] font-bold text-emerald-800 uppercase block">01 // KNOWN & VERIFIED</span>
                    <p className="font-sans text-slate-700">{topic.future.known}</p>
                  </div>
                  <div className="bg-white border border-sky-300 p-4 space-y-1">
                    <span className="text-[10px] font-bold text-sky-800 uppercase block">02 // LIKELY (1-3 YEARS)</span>
                    <p className="font-sans text-slate-700">{topic.future.likely}</p>
                  </div>
                  <div className="bg-white border border-amber-300 p-4 space-y-1">
                    <span className="text-[10px] font-bold text-amber-800 uppercase block">03 // UNCERTAIN</span>
                    <p className="font-sans text-slate-700">{topic.future.uncertain}</p>
                  </div>
                  <div className="bg-white border border-purple-300 p-4 space-y-1">
                    <span className="text-[10px] font-bold text-purple-800 uppercase block">04 // SPECULATIVE</span>
                    <p className="font-sans text-slate-700">{topic.future.speculative}</p>
                  </div>
                </div>
              )}
            </section>

            {/* 19 — CONCLUSION */}
            <section id="conclusion" className="space-y-6">
              <div className="flex items-center gap-3 border-b border-[#C9C7C0] pb-2 font-mono text-xs font-bold text-[#FF1E27] tracking-widest uppercase">
                <span>19 // RESEARCH CONCLUSION & SYNTHESIS</span>
                <span className="h-px flex-1 bg-[#C9C7C0]" />
              </div>

              {topic.conclusion && (
                <div className="bg-white border-2 border-[#111111] p-6 space-y-4 font-mono">
                  <div className="space-y-3 divide-y divide-[#E4E2DC] text-xs">
                    <div className="pt-2">
                      <span className="font-bold text-[#555555] uppercase block text-[10px]">WHAT WE KNEW:</span>
                      <p className="font-sans text-slate-800 pt-0.5">{topic.conclusion.whatWeKnew}</p>
                    </div>
                    <div className="pt-3">
                      <span className="font-bold text-[#FF1E27] uppercase block text-[10px]">WHAT RESEARCH DISCOVERED:</span>
                      <p className="font-sans text-slate-800 pt-0.5">{topic.conclusion.whatResearchDiscovered}</p>
                    </div>
                    <div className="pt-3">
                      <span className="font-bold text-[#111111] uppercase block text-[10px]">WHAT EXISTS TODAY:</span>
                      <p className="font-sans text-slate-800 pt-0.5">{topic.conclusion.whatExistsToday}</p>
                    </div>
                    <div className="pt-3">
                      <span className="font-bold text-red-600 uppercase block text-[10px]">WHAT STILL DOES NOT WORK:</span>
                      <p className="font-sans text-slate-800 pt-0.5">{topic.conclusion.whatStillDoesntWork}</p>
                    </div>
                    <div className="pt-3">
                      <span className="font-bold text-emerald-700 uppercase block text-[10px]">WHAT IS BEING RESEARCHED NEXT:</span>
                      <p className="font-sans text-slate-800 pt-0.5">{topic.conclusion.whatIsResearchedNext}</p>
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* 20 — REFERENCES */}
            <section id="references" className="space-y-6">
              <div className="flex items-center gap-3 border-b border-[#C9C7C0] pb-2 font-mono text-xs font-bold text-[#FF1E27] tracking-widest uppercase">
                <span>20 // PEER-REVIEWED REFERENCES & ARCHIVAL SOURCES</span>
                <span className="h-px flex-1 bg-[#C9C7C0]" />
              </div>

              {topic.references && (
                <div className="space-y-3 font-mono text-xs">
                  {topic.references.map((ref, idx) => (
                    <div key={ref.id} className="bg-white border border-[#C9C7C0] p-4 space-y-1">
                      <div className="flex items-center justify-between gap-2">
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
                            <span>ARXIV / SOURCE</span>
                            <ExternalLink size={12} />
                          </a>
                        )}
                      </div>
                      <div className="text-[11px] text-[#555555] font-sans">{ref.authors} · {ref.venue}</div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* ─────────────────────────────────────────────────────────────
                PREV / NEXT RESEARCH NAVIGATOR
            ───────────────────────────────────────────────────────────── */}
            <div className="pt-10 border-t border-[#C9C7C0] grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
              {prevTopic ? (
                <Link
                  to={`/research/${prevTopic.slug}`}
                  className="bg-white border border-[#C9C7C0] hover:border-[#111111] p-4 space-y-1 group transition-colors"
                >
                  <span className="text-[10px] text-[#555555] block">← PREVIOUS RESEARCH</span>
                  <div className="font-bold text-[#111111] group-hover:text-[#FF1E27] uppercase">
                    {prevTopic.title}
                  </div>
                </Link>
              ) : <div />}

              {nextTopic && (
                <Link
                  to={`/research/${nextTopic.slug}`}
                  className="bg-white border border-[#C9C7C0] hover:border-[#111111] p-4 space-y-1 group transition-colors text-right"
                >
                  <span className="text-[10px] text-[#555555] block">NEXT RESEARCH →</span>
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
          ARCHIVAL LEGAL & TECHNICAL CITATION FOOTER
      ───────────────────────────────────────────────────────────── */}
      <footer className="border-t border-[#C9C7C0] bg-[#FAF9F5] py-12 px-4 sm:px-6 md:px-12 font-mono text-xs text-[#555555] mt-16">
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
            <span>•</span>
            <button
              onClick={onOpenResume}
              className="text-[#111111] hover:text-[#FF1E27] cursor-pointer"
            >
              RESUME
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
