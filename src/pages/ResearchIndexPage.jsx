import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Layers, 
  ArrowRight, 
  Activity, 
  BookOpen, 
  Calendar, 
  SlidersHorizontal, 
  Sparkles, 
  Compass, 
  Microscope,
  CheckCircle2,
  Clock,
  FlaskConical,
  X,
  ExternalLink
} from 'lucide-react';
import { 
  researchTopics, 
  getResearchStats, 
  RESEARCH_CATEGORIES, 
  RESEARCH_STATUSES, 
  RESEARCH_DIFFICULTIES 
} from '../data/researchData';

const EASE = [0.16, 1, 0.3, 1];

export default function ResearchIndexPage({ onOpenResume }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [selectedDifficulty, setSelectedDifficulty] = useState('ALL');

  const stats = useMemo(() => getResearchStats(), []);

  useEffect(() => {
    document.title = 'AI RESEARCH LABORATORY // REUBG DEV';
    window.scrollTo(0, 0);
  }, []);

  // Filtered topics calculation
  const filteredTopics = useMemo(() => {
    return researchTopics.filter((t) => {
      // Category filter
      if (selectedCategory !== 'ALL' && t.category !== selectedCategory && t.secondaryCategory !== selectedCategory) {
        return false;
      }

      // Status filter
      if (selectedStatus !== 'ALL' && t.status !== selectedStatus) {
        return false;
      }

      // Difficulty filter
      if (selectedDifficulty !== 'ALL' && t.difficulty !== selectedDifficulty) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = t.title.toLowerCase().includes(q);
        const matchesSub = t.subtitle?.toLowerCase().includes(q);
        const matchesAbstract = t.abstract.toLowerCase().includes(q);
        const matchesConcepts = t.keyConcepts.some((c) => c.toLowerCase().includes(q));
        const matchesTags = t.tags.some((tag) => tag.toLowerCase().includes(q));
        const matchesId = t.id.toLowerCase().includes(q);

        if (!matchesTitle && !matchesSub && !matchesAbstract && !matchesConcepts && !matchesTags && !matchesId) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, selectedCategory, selectedStatus, selectedDifficulty]);

  const hasActiveFilters = searchQuery || selectedCategory !== 'ALL' || selectedStatus !== 'ALL' || selectedDifficulty !== 'ALL';

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('ALL');
    setSelectedStatus('ALL');
    setSelectedDifficulty('ALL');
  };

  return (
    <div className="min-h-screen bg-[#F1F0EB] text-[#111111] font-sans selection:bg-[#FF1E27] selection:text-white">
      {/* ─────────────────────────────────────────────────────────────
          RESEARCH HERO SECTION
      ───────────────────────────────────────────────────────────── */}
      <section className="relative pt-12 sm:pt-16 md:pt-20 pb-12 sm:pb-16 px-4 sm:px-6 md:px-12 border-b border-[#C9C7C0] bg-[#FAF9F5]">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Top Breadcrumb & Division Marker */}
          <div className="flex items-center gap-3 font-mono text-xs text-[#555555] uppercase tracking-widest">
            <Link to="/" className="hover:text-[#FF1E27] transition-colors">
              REUBG DEV
            </Link>
            <span>/</span>
            <span className="text-[#FF1E27] font-bold">AI RESEARCH ARCHIVE</span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF1E27] animate-pulse ml-1" />
          </div>

          {/* Main Title & Subtitle */}
          <div className="space-y-4 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#C9C7C0] text-[10px] sm:text-xs font-mono font-bold tracking-wider text-[#111111] uppercase">
              <Microscope size={13} className="text-[#FF1E27]" />
              <span>LABORATORY DISPATCHES // FIRST PRINCIPLES TO CURRENT FRONTIER</span>
            </div>

            <h1 className="font-archivo text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-[#111111] leading-[0.9] uppercase">
              RESEARCH
            </h1>

            <p className="font-mono text-base sm:text-lg md:text-xl font-bold uppercase tracking-wide text-[#FF1E27]">
              Investigating AI from first principles to the current frontier.
            </p>

            <p className="font-sans text-sm sm:text-base text-slate-700 leading-relaxed max-w-3xl">
              REUBG DEV Research is a continuously evolving, highly structured technical archive investigating the mathematical foundations, historical origin, algorithmic execution, empirical experiments, system limitations, and modern frontiers of Artificial Intelligence. No shallow summaries. Every subject is deconstructed progressively from foundational linear algebra to state-of-the-art 2026 reasoning models.
            </p>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              DYNAMIC RESEARCH TELEMETRY / REAL STATISTICS
          ───────────────────────────────────────────────────────────── */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-4 font-mono">
            <div className="bg-white border border-[#C9C7C0] p-4 space-y-1">
              <span className="text-[10px] text-[#555555] uppercase tracking-wider block font-bold">TOTAL RESEARCHES</span>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#111111] font-archivo">
                {stats.totalResearches}
              </div>
              <span className="text-[10px] text-[#555555] block">20 Canonical Topics</span>
            </div>

            <div className="bg-white border border-[#C9C7C0] p-4 space-y-1">
              <span className="text-[10px] text-[#555555] uppercase tracking-wider block font-bold">COMPLETED PAPERS</span>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 font-archivo">
                {stats.completedTopics}
              </div>
              <span className="text-[10px] text-[#555555] block">Exhaustively Verified</span>
            </div>

            <div className="bg-white border border-[#C9C7C0] p-4 space-y-1">
              <span className="text-[10px] text-[#555555] uppercase tracking-wider block font-bold">DOCUMENTED EXPERIMENTS</span>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#FF1E27] font-archivo">
                {stats.totalExperiments}
              </div>
              <span className="text-[10px] text-[#555555] block">Empirical Benchmarks</span>
            </div>

            <div className="bg-white border border-[#C9C7C0] p-4 space-y-1">
              <span className="text-[10px] text-[#555555] uppercase tracking-wider block font-bold">ACADEMIC REFERENCES</span>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#111111] font-archivo">
                {stats.totalReferences}
              </div>
              <span className="text-[10px] text-[#555555] block">Peer-Reviewed Citations</span>
            </div>

            <div className="bg-white border border-[#C9C7C0] p-4 space-y-1 col-span-2 sm:col-span-1">
              <span className="text-[10px] text-[#555555] uppercase tracking-wider block font-bold">LAST ARCHIVE AUDIT</span>
              <div className="text-sm sm:text-base font-extrabold text-[#111111] pt-1">
                {stats.lastUpdated}
              </div>
              <span className="text-[10px] text-[#FF1E27] font-bold block">FRONTIER CALIBRATED</span>
            </div>
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SEARCH, MULTI-TIER FILTERS & CONTROLS
      ───────────────────────────────────────────────────────────── */}
      <section className="py-8 px-4 sm:px-6 md:px-12 border-b border-[#C9C7C0] bg-[#EDECE6] sticky top-16 z-30 backdrop-blur-md bg-[#EDECE6]/95">
        <div className="max-w-7xl mx-auto space-y-4">
          
          {/* Top Search & Reset Row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Search Input Bar */}
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#555555]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search research topics, mathematics, algorithms, concepts (e.g. FlashAttention, QLoRA, RAG, Bellman)..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#C9C7C0] text-xs font-mono placeholder:text-slate-400 focus:outline-none focus:border-[#FF1E27] text-[#111111] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#555555] hover:text-[#111111]"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Quick Status / Difficulty Dropdowns */}
            <div className="flex items-center gap-2 font-mono text-xs">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="bg-white border border-[#C9C7C0] py-2 px-3 text-xs font-mono font-bold text-[#111111] cursor-pointer focus:outline-none focus:border-[#FF1E27]"
              >
                {RESEARCH_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    STATUS: {s}
                  </option>
                ))}
              </select>

              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="bg-white border border-[#C9C7C0] py-2 px-3 text-xs font-mono font-bold text-[#111111] cursor-pointer focus:outline-none focus:border-[#FF1E27]"
              >
                {RESEARCH_DIFFICULTIES.map((d) => (
                  <option key={d} value={d}>
                    DIFFICULTY: {d}
                  </option>
                ))}
              </select>

              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="px-3 py-2 bg-[#111111] text-white hover:bg-[#FF1E27] text-xs font-mono font-bold transition-colors cursor-pointer shrink-0"
                >
                  RESET
                </button>
              )}
            </div>
          </div>

          {/* Horizontal Category Pill Filter Strip */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 no-scrollbar text-xs font-mono">
            {RESEARCH_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 whitespace-nowrap text-[11px] font-bold border transition-all cursor-pointer uppercase ${
                    isSelected
                      ? 'bg-[#111111] text-white border-[#111111] shadow-sm'
                      : 'bg-white text-[#555555] border-[#C9C7C0] hover:border-[#111111] hover:text-[#111111]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Filter Status Bar */}
          <div className="flex items-center justify-between text-[11px] font-mono text-[#555555] pt-1">
            <div>
              SHOWING <span className="font-bold text-[#111111]">{filteredTopics.length}</span> OF <span className="font-bold text-[#111111]">{researchTopics.length}</span> RESEARCH TOPICS
            </div>
            {hasActiveFilters && (
              <span className="text-[#FF1E27] font-semibold">
                ● FILTERS ACTIVE
              </span>
            )}
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          RESEARCH TOPICS DATABASE GRID
      ───────────────────────────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:px-12">
        {filteredTopics.length === 0 ? (
          <div className="p-12 text-center bg-white border border-[#C9C7C0] space-y-4 my-8">
            <FlaskConical size={36} className="mx-auto text-[#FF1E27]" />
            <h3 className="font-mono text-base font-bold text-[#111111] uppercase tracking-wider">
              No Matching Research Entries Found
            </h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              No research topics match the selected search query or category filters. Try adjusting your parameters.
            </p>
            <button
              onClick={resetFilters}
              className="btn-editorial-red px-5 py-2 text-xs font-mono font-bold"
            >
              CLEAR ALL FILTERS
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {filteredTopics.map((topic, index) => {
              const isFlagship = topic.progress === 100;
              return (
                <article
                  key={topic.id}
                  className="bg-white border-2 border-[#111111] hover:border-[#FF1E27] transition-all duration-300 flex flex-col justify-between shadow-[4px_4px_0px_#111111] hover:shadow-[6px_6px_0px_#FF1E27] group relative overflow-hidden"
                >
                  {/* Top Metadata Header Strip */}
                  <div className="p-5 sm:p-6 pb-4 border-b border-[#E4E2DC] bg-[#FAF9F5] space-y-3">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-extrabold text-[#FF1E27] tracking-wider">
                          {topic.id}
                        </span>
                        <span className="h-3 w-px bg-[#C9C7C0]" />
                        <span className="font-mono text-[10px] font-bold text-[#555555] uppercase tracking-wider px-2 py-0.5 bg-white border border-[#C9C7C0]">
                          {topic.category}
                        </span>
                      </div>

                      {/* Status Badge */}
                      <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-wider">
                        {topic.status === 'Completed' ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                            COMPLETED
                          </span>
                        ) : topic.status === 'In Research' ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-50 text-amber-800 border border-amber-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                            IN RESEARCH
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-sky-50 text-sky-800 border border-sky-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                            {topic.status.toUpperCase()}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Topic Title & Subtitle */}
                    <div className="space-y-1">
                      <h2 className="font-syne text-xl sm:text-2xl font-extrabold text-[#111111] uppercase tracking-tight group-hover:text-[#FF1E27] transition-colors leading-tight">
                        <Link to={`/research/${topic.slug}`}>
                          {topic.title}
                        </Link>
                      </h2>
                      {topic.subtitle && (
                        <p className="font-mono text-xs text-[#555555] font-medium leading-relaxed">
                          {topic.subtitle}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
                    {/* Abstract */}
                    <p className="font-sans text-xs sm:text-sm text-slate-700 leading-relaxed line-clamp-3">
                      {topic.abstract}
                    </p>

                    {/* Key Concepts Tags */}
                    <div className="space-y-2 pt-2">
                      <span className="font-mono text-[10px] text-[#555555] font-bold uppercase tracking-wider block">
                        KEY ARCHITECTURAL CONCEPTS:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {topic.keyConcepts.slice(0, 4).map((concept) => (
                          <span
                            key={concept}
                            className="font-mono text-[10px] bg-[#EDECE6] border border-[#C9C7C0] text-[#111111] px-2 py-0.5 uppercase"
                          >
                            {concept}
                          </span>
                        ))}
                        {topic.keyConcepts.length > 4 && (
                          <span className="font-mono text-[10px] text-[#555555] px-1.5 py-0.5">
                            +{topic.keyConcepts.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Progress Bar & Telemetry */}
                    <div className="pt-3 border-t border-[#E4E2DC] space-y-1.5 font-mono text-[11px]">
                      <div className="flex justify-between items-center text-[#555555]">
                        <span className="text-[10px] uppercase">RESEARCH DEPTH:</span>
                        <span className="font-bold text-[#111111]">{topic.progress}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-[#E4E2DC] overflow-hidden">
                        <div
                          className="h-full bg-[#FF1E27]"
                          style={{ width: `${topic.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Card Action Footer */}
                  <div className="px-5 sm:px-6 py-3.5 bg-[#FAF9F5] border-t border-[#E4E2DC] flex items-center justify-between font-mono text-xs">
                    <div className="flex items-center gap-3 text-[11px] text-[#555555]">
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {topic.readingTime}
                      </span>
                      <span>•</span>
                      <span className="font-bold text-[#111111] uppercase">
                        {topic.difficulty}
                      </span>
                    </div>

                    <Link
                      to={`/research/${topic.slug}`}
                      className="font-bold text-[#111111] group-hover:text-[#FF1E27] inline-flex items-center gap-1.5 tracking-wider uppercase transition-colors"
                    >
                      <span>READ RESEARCH</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>

      {/* ─────────────────────────────────────────────────────────────
          SUPPORT AI RESEARCH STRIP
      ───────────────────────────────────────────────────────────── */}
      <section className="border-t border-[#C9C7C0] bg-[#EDECE6]/60 py-10 px-4 sm:px-6 md:px-12 font-mono">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="text-[10px] text-[#FF1E27] font-bold uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF1E27] animate-pulse" />
              <span>SUPPORT REUBG DEV RESEARCH & LABORATORY</span>
            </div>
            <div className="font-syne font-bold text-lg sm:text-xl text-[#111111] uppercase">
              Independent AI Research Built From First Principles
            </div>
            <p className="font-sans text-xs text-[#555555] max-w-xl">
              Support continuous paper evaluations, GPU model benchmarks, and open technical dissertations.
            </p>
          </div>

          <a
            href="https://buymeacoffee.com/reubg.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-editorial-red text-xs py-2.5 px-5 flex items-center gap-2 font-bold cursor-pointer shrink-0"
          >
            <span>☕ SUPPORT ON BUY ME A COFFEE</span>
            <ExternalLink size={13} />
          </a>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          ARCHIVAL LEGAL & TECHNICAL CITATION FOOTER
      ───────────────────────────────────────────────────────────── */}
      <footer className="border-t border-[#C9C7C0] bg-[#FAF9F5] py-12 px-4 sm:px-6 md:px-12 font-mono text-xs text-[#555555]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1">
            <div className="font-bold uppercase tracking-wider text-[#111111]">
              REUBEN BINU GEORGE · REUBG DEV AI RESEARCH LABORATORY
            </div>
            <div>
              Investigating computational architectures, linear algebra, deep learning, and frontier AI systems.
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-bold flex-wrap">
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
              className="text-[#FF1E27] hover:underline cursor-pointer"
            >
              VIEW RESUME
            </button>
            <span>•</span>
            <a
              href="https://github.com/daneyyhh"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#111111] hover:text-[#FF1E27] transition-colors"
            >
              GITHUB
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
