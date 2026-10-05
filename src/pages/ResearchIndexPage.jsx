import React, { useState, useMemo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
  ExternalLink,
  Network,
  ArrowUpDown,
  LayoutGrid,
  List,
  ChevronRight,
  TrendingUp,
  Cpu,
  AlertTriangle,
  HelpCircle,
  ShieldCheck,
  Terminal
} from 'lucide-react';
import { 
  researchTopics, 
  getResearchStats, 
  RESEARCH_CATEGORIES, 
  RESEARCH_STATUSES, 
  RESEARCH_DIFFICULTIES 
} from '../data/researchData';
import KnowledgeGraph from '../components/Research/KnowledgeGraph';

const EASE = [0.16, 1, 0.3, 1];

export default function ResearchIndexPage({ onOpenResume }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [selectedDifficulty, setSelectedDifficulty] = useState('ALL');
  const [sortBy, setSortBy] = useState('progress'); // 'newest' | 'oldest' | 'progress' | 'difficulty' | 'category' | 'updated'
  const [viewMode, setViewMode] = useState('records'); // 'records' | 'matrix'
  const [showGraph, setShowGraph] = useState(true);

  const stats = useMemo(() => getResearchStats(), []);

  useEffect(() => {
    document.title = 'RESEARCH LAB // REUBG DEV AI ARCHIVE';
    window.scrollTo(0, 0);
  }, []);

  // Filtered and sorted topics calculation
  const filteredAndSortedTopics = useMemo(() => {
    let result = researchTopics.filter((t) => {
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
        const matchesConcepts = t.keyConcepts?.some((c) => c.toLowerCase().includes(q));
        const matchesTags = t.tags?.some((tag) => tag.toLowerCase().includes(q));
        const matchesId = t.id.toLowerCase().includes(q);

        if (!matchesTitle && !matchesSub && !matchesAbstract && !matchesConcepts && !matchesTags && !matchesId) {
          return false;
        }
      }

      return true;
    });

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'progress') return (b.progress || 0) - (a.progress || 0);
      if (sortBy === 'newest') return new Date(b.startedDate) - new Date(a.startedDate);
      if (sortBy === 'oldest') return new Date(a.startedDate) - new Date(b.startedDate);
      if (sortBy === 'updated') return new Date(b.lastUpdated) - new Date(a.lastUpdated);
      if (sortBy === 'category') return a.category.localeCompare(b.category);
      if (sortBy === 'difficulty') {
        const diffWeight = { 'Beginner': 1, 'Intermediate': 2, 'Advanced': 3 };
        return (diffWeight[b.difficulty] || 0) - (diffWeight[a.difficulty] || 0);
      }
      return 0;
    });

    return result;
  }, [searchQuery, selectedCategory, selectedStatus, selectedDifficulty, sortBy]);

  const hasActiveFilters = searchQuery || selectedCategory !== 'ALL' || selectedStatus !== 'ALL' || selectedDifficulty !== 'ALL';

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('ALL');
    setSelectedStatus('ALL');
    setSelectedDifficulty('ALL');
  };

  // Status badge styling helper
  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case 'DOCUMENTED':
        return 'bg-emerald-50 text-emerald-800 border-emerald-300';
      case 'UPDATED':
        return 'bg-[#FF1E27] text-white border-[#111111] font-bold';
      case 'EXPERIMENTING':
        return 'bg-amber-50 text-amber-900 border-amber-300';
      case 'RESEARCHING':
        return 'bg-sky-50 text-sky-800 border-sky-300';
      case 'PLANNED':
      default:
        return 'bg-stone-100 text-stone-600 border-stone-300';
    }
  };

  return (
    <div className="min-h-screen bg-[#F1F0EB] text-[#111111] font-sans selection:bg-[#FF1E27] selection:text-white">
      
      {/* ─────────────────────────────────────────────────────────────
          1. RESEARCH COMMAND CENTER HERO
      ───────────────────────────────────────────────────────────── */}
      <section className="relative pt-12 sm:pt-16 md:pt-20 pb-12 sm:pb-16 px-4 sm:px-6 md:px-12 border-b-2 border-[#111111] bg-[#FAF9F5]">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Top Breadcrumb & Status Telemetry */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs text-[#555555]">
            <div className="flex items-center gap-3 uppercase tracking-widest">
              <Link to="/" className="hover:text-[#FF1E27] transition-colors">
                REUBG DEV
              </Link>
              <span>/</span>
              <span className="text-[#FF1E27] font-bold">RESEARCH LAB</span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF1E27] animate-pulse ml-1" />
            </div>

            <div className="flex items-center gap-2 text-[10px] text-stone-500">
              <Terminal size={12} className="text-[#FF1E27]" />
              <span>TERMINAL TELEMETRY // AI ARCHITECTURE ARCHIVE</span>
            </div>
          </div>

          {/* Hero Typography & Mission Statement */}
          <div className="space-y-4 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border-2 border-[#111111] text-[10px] sm:text-xs font-mono font-bold tracking-wider text-[#111111] uppercase shadow-[2px_2px_0px_#111111]">
              <Microscope size={13} className="text-[#FF1E27]" />
              <span>REUBG DEV — RESEARCH LAB</span>
            </div>

            <h1 className="font-syne font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-[#111111] leading-[0.9] uppercase">
              RESEARCH LAB<span className="text-[#FF1E27]">.</span>
            </h1>

            <p className="font-mono text-base sm:text-lg md:text-xl font-bold uppercase tracking-wide text-[#FF1E27]">
              “Tracing artificial intelligence from its foundations to the frontier.”
            </p>

            <p className="font-sans text-sm sm:text-base text-slate-700 leading-relaxed max-w-3xl">
              An evolving technical archive documenting the origins, mechanisms, experiments, failures, and current developments behind modern AI. Every topic is examined from zero assumptions to mathematical derivation, empirical benchmarking, and active 2026 frontier limitations.
            </p>
          </div>

          {/* Live Research Metadata Dashboard (Calculated from real dataset) */}
          <div className="pt-4 border-t border-[#C9C7C0]">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 font-mono">
              
              <div className="p-4 bg-white border-2 border-[#111111] shadow-[3px_3px_0px_#111111] space-y-1">
                <span className="text-[10px] text-[#555555] uppercase tracking-wider block">
                  RESEARCHES
                </span>
                <span className="font-syne text-2xl sm:text-3xl font-extrabold text-[#111111]">
                  {stats.totalResearches}
                </span>
                <span className="text-[9px] text-[#FF1E27] font-bold block">
                  {stats.documentedTopics + stats.updatedTopics} VERIFIED SOTA
                </span>
              </div>

              <div className="p-4 bg-white border-2 border-[#111111] shadow-[3px_3px_0px_#111111] space-y-1">
                <span className="text-[10px] text-[#555555] uppercase tracking-wider block">
                  EXPERIMENTS
                </span>
                <span className="font-syne text-2xl sm:text-3xl font-extrabold text-[#FF1E27]">
                  {stats.totalExperiments}
                </span>
                <span className="text-[9px] text-stone-500 block">
                  EMPIRICAL RUNS
                </span>
              </div>

              <div className="p-4 bg-white border-2 border-[#111111] shadow-[3px_3px_0px_#111111] space-y-1">
                <span className="text-[10px] text-[#555555] uppercase tracking-wider block">
                  TOPICS
                </span>
                <span className="font-syne text-2xl sm:text-3xl font-extrabold text-[#111111]">
                  20
                </span>
                <span className="text-[9px] text-stone-500 block">
                  ACTIVE DOMAINS
                </span>
              </div>

              <div className="p-4 bg-white border-2 border-[#111111] shadow-[3px_3px_0px_#111111] space-y-1">
                <span className="text-[10px] text-[#555555] uppercase tracking-wider block">
                  REFERENCES
                </span>
                <span className="font-syne text-2xl sm:text-3xl font-extrabold text-[#111111]">
                  {stats.totalReferences}
                </span>
                <span className="text-[9px] text-stone-500 block">
                  PEER-REVIEWED PAPERS
                </span>
              </div>

              <div className="p-4 bg-white border-2 border-[#111111] shadow-[3px_3px_0px_#111111] space-y-1 col-span-2 sm:col-span-1">
                <span className="text-[10px] text-[#555555] uppercase tracking-wider block">
                  LAST UPDATED
                </span>
                <span className="font-syne text-lg sm:text-xl font-extrabold text-[#111111] truncate block pt-1">
                  {stats.lastUpdated}
                </span>
                <span className="text-[9px] text-emerald-700 font-bold block">
                  ACTIVE WORKBENCH
                </span>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. INTERACTIVE KNOWLEDGE GRAPH SECTION
      ───────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto py-8 sm:py-10 px-4 sm:px-6 md:px-12">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#111111] uppercase tracking-wider">
              <Network size={16} className="text-[#FF1E27]" />
              <span>TOPOLOGY // RESEARCH TOPIC NETWORK</span>
            </div>
            <button
              onClick={() => setShowGraph(!showGraph)}
              className="text-[10px] font-mono text-[#555555] hover:text-[#FF1E27] font-bold border border-[#C9C7C0] bg-white px-2.5 py-1 cursor-pointer"
            >
              {showGraph ? 'COLLAPSE GRAPH [-]' : 'EXPAND GRAPH [+]'}
            </button>
          </div>

          <AnimatePresence>
            {showGraph && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <KnowledgeGraph
                  onSelectTopic={(topicId) => navigate(`/research/${topicId}`)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. ARCHIVE FILTERING & COMMAND TOOLBAR
      ───────────────────────────────────────────────────────────── */}
      <section className="sticky top-[61px] sm:top-[69px] z-30 bg-[#EDECE6]/95 backdrop-blur-md border-y border-[#C9C7C0] py-3.5 px-4 sm:px-6 md:px-12 font-mono text-xs shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          
          {/* Search Input Bar */}
          <div className="relative flex-1 max-w-lg">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
            <input
              type="text"
              placeholder="Search concepts, equations, tensors, benchmarks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 bg-white border border-[#C9C7C0] text-xs text-[#111111] placeholder:text-stone-400 focus:outline-none focus:border-[#FF1E27] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-[#111111] cursor-pointer"
              >
                <X size={13} />
              </button>
            )}
          </div>

          {/* Filter Dropdowns and View Controls */}
          <div className="flex items-center gap-2 flex-wrap">
            
            {/* Status Dropdown */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-2.5 py-2 bg-white border border-[#C9C7C0] text-xs text-[#111111] font-bold focus:outline-none focus:border-[#FF1E27] cursor-pointer"
            >
              <option value="ALL">STATUS: ALL (5)</option>
              <option value="DOCUMENTED">STATUS: DOCUMENTED</option>
              <option value="UPDATED">STATUS: UPDATED</option>
              <option value="EXPERIMENTING">STATUS: EXPERIMENTING</option>
              <option value="RESEARCHING">STATUS: RESEARCHING</option>
              <option value="PLANNED">STATUS: PLANNED</option>
            </select>

            {/* Difficulty Dropdown */}
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-2.5 py-2 bg-white border border-[#C9C7C0] text-xs text-[#111111] focus:outline-none focus:border-[#FF1E27] cursor-pointer"
            >
              <option value="ALL">LEVEL: ALL</option>
              <option value="Beginner">LEVEL: BEGINNER</option>
              <option value="Intermediate">LEVEL: INTERMEDIATE</option>
              <option value="Advanced">LEVEL: ADVANCED</option>
            </select>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-2.5 py-2 bg-white border border-[#C9C7C0] text-xs text-[#111111] font-bold focus:outline-none focus:border-[#FF1E27] cursor-pointer"
            >
              <option value="progress">SORT: PROGRESS</option>
              <option value="newest">SORT: NEWEST</option>
              <option value="oldest">SORT: OLDEST</option>
              <option value="updated">SORT: RECENTLY UPDATED</option>
              <option value="difficulty">SORT: DIFFICULTY</option>
              <option value="category">SORT: CATEGORY</option>
            </select>

            {/* View Mode Switcher */}
            <div className="flex items-center border border-[#C9C7C0] bg-white">
              <button
                onClick={() => setViewMode('records')}
                className={`p-2 transition-colors cursor-pointer ${
                  viewMode === 'records' ? 'bg-[#111111] text-white' : 'text-stone-500 hover:text-[#111111]'
                }`}
                title="Technical Research Records Grid"
              >
                <LayoutGrid size={14} />
              </button>
              <button
                onClick={() => setViewMode('matrix')}
                className={`p-2 transition-colors cursor-pointer ${
                  viewMode === 'matrix' ? 'bg-[#111111] text-white' : 'text-stone-500 hover:text-[#111111]'
                }`}
                title="Archival Telemetry Matrix Table"
              >
                <List size={14} />
              </button>
            </div>

            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="px-2.5 py-2 bg-[#FF1E27] text-white font-bold text-xs uppercase hover:bg-[#111111] transition-colors cursor-pointer"
              >
                RESET
              </button>
            )}

          </div>

        </div>

        {/* Category Filter Pills Scroll Strip */}
        <div className="max-w-7xl mx-auto pt-3 flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          <span className="text-[10px] text-stone-500 font-bold uppercase tracking-wider shrink-0 mr-1">
            CATEGORY:
          </span>
          {RESEARCH_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 text-[10px] font-mono tracking-wider font-bold whitespace-nowrap border transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#111111] text-white border-[#111111]'
                  : 'bg-white text-stone-600 border-[#C9C7C0] hover:border-[#111111]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. RESEARCH TOPICS DATABASE ARCHIVE
      ───────────────────────────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:px-12">
        {filteredAndSortedTopics.length === 0 ? (
          <div className="p-12 text-center bg-white border-2 border-[#111111] space-y-4 my-8 shadow-[4px_4px_0px_#111111]">
            <FlaskConical size={36} className="mx-auto text-[#FF1E27]" />
            <h3 className="font-mono text-base font-bold text-[#111111] uppercase tracking-wider">
              No Matching Research Entries Found
            </h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto font-sans">
              No research topics match the selected search query or category filters. Try adjusting your parameters.
            </p>
            <button
              onClick={resetFilters}
              className="btn-editorial-red px-5 py-2 text-xs font-mono font-bold cursor-pointer"
            >
              CLEAR ALL FILTERS
            </button>
          </div>
        ) : viewMode === 'records' ? (
          
          /* Technical Research Records Grid (Section 5 Spec) */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {filteredAndSortedTopics.map((topic) => (
              <article
                key={topic.id}
                className="bg-white border-2 border-[#111111] hover:border-[#FF1E27] transition-all duration-300 flex flex-col justify-between shadow-[5px_5px_0px_#111111] hover:shadow-[7px_7px_0px_#FF1E27] group relative font-mono text-[#111111]"
              >
                {/* Technical Record Header Strip */}
                <div className="p-5 sm:p-6 pb-4 border-b border-[#E4E2DC] bg-[#FAF9F5] space-y-3">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-extrabold text-[#FF1E27] tracking-wider">
                        {topic.id.replace('RBG-', '')}
                      </span>
                      <span className="h-3 w-px bg-[#C9C7C0]" />
                      <span className="text-[10px] font-bold text-[#555555] uppercase tracking-wider px-2 py-0.5 bg-white border border-[#C9C7C0]">
                        {topic.category}
                      </span>
                    </div>

                    {/* Status Badge */}
                    <span className={`text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider border ${getStatusBadgeStyle(topic.status)}`}>
                      {topic.status}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h3 className="font-syne font-extrabold text-xl sm:text-2xl text-[#111111] group-hover:text-[#FF1E27] transition-colors uppercase tracking-tight leading-tight">
                      <Link to={`/research/${topic.slug}`}>
                        {topic.title}
                      </Link>
                    </h3>
                    <p className="font-mono text-xs text-stone-500 mt-1 line-clamp-1">
                      {topic.subtitle}
                    </p>
                  </div>
                </div>

                {/* Technical Abstract Body */}
                <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <p className="font-sans text-xs sm:text-[13px] text-[#444444] leading-relaxed line-clamp-3">
                    {topic.abstract}
                  </p>

                  {/* Key Technologies & Concepts */}
                  <div className="space-y-1.5 pt-2">
                    <span className="text-[9px] text-[#888884] uppercase tracking-wider block font-bold">
                      KEY ARCHITECTURAL CONCEPTS:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {topic.keyConcepts?.slice(0, 4).map((concept, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] bg-[#FAF9F5] text-[#333333] px-2 py-0.5 border border-[#C9C7C0] truncate max-w-[200px]"
                        >
                          {concept}
                        </span>
                      ))}
                      {topic.keyConcepts?.length > 4 && (
                        <span className="text-[9px] text-stone-400 self-center">
                          +{topic.keyConcepts.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Structured Progress & Telemetry Bar */}
                  <div className="pt-3 border-t border-[#E4E2DC] space-y-2">
                    <div className="flex items-center justify-between text-[10px] text-[#555555]">
                      <div className="flex items-center gap-2">
                        <span>LEVEL: <strong className="text-[#111111]">{topic.difficulty.toUpperCase()}</strong></span>
                        <span>•</span>
                        <span>UPDATED: <strong>{topic.lastUpdated}</strong></span>
                      </div>
                      <span className="font-bold text-[#FF1E27]">{topic.progress}% COMPLETE</span>
                    </div>

                    <div className="w-full h-1.5 bg-[#E4E2DC] overflow-hidden">
                      <div
                        className="h-full bg-[#FF1E27] transition-all duration-300"
                        style={{ width: `${topic.progress}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Card Footer Link */}
                <div className="p-4 sm:p-5 pt-3 border-t border-[#E4E2DC] bg-[#FAF9F5] flex items-center justify-between text-xs">
                  <span className="text-[10px] text-stone-500 font-mono">
                    {topic.readingTime || '15 min read'}
                  </span>

                  <Link
                    to={`/research/${topic.slug}`}
                    className="font-bold text-xs uppercase tracking-wider text-[#111111] group-hover:text-[#FF1E27] flex items-center gap-1.5 transition-colors"
                  >
                    <span>OPEN RESEARCH</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform text-[#FF1E27]" />
                  </Link>
                </div>

              </article>
            ))}
          </div>

        ) : (

          /* Dense Archival Matrix Table View */
          <div className="border-2 border-[#111111] bg-white overflow-x-auto shadow-[5px_5px_0px_#111111] font-mono text-xs">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#FAF9F5] border-b-2 border-[#111111] text-left">
                  <th className="p-3.5 font-bold text-[#FF1E27] uppercase tracking-wider">ID</th>
                  <th className="p-3.5 font-bold text-[#111111] uppercase tracking-wider">RESEARCH TOPIC</th>
                  <th className="p-3.5 font-bold text-[#111111] uppercase tracking-wider">CATEGORY</th>
                  <th className="p-3.5 font-bold text-[#111111] uppercase tracking-wider">STATUS</th>
                  <th className="p-3.5 font-bold text-[#111111] uppercase tracking-wider">PROGRESS</th>
                  <th className="p-3.5 font-bold text-[#111111] uppercase tracking-wider">DIFFICULTY</th>
                  <th className="p-3.5 font-bold text-[#111111] uppercase tracking-wider">UPDATED</th>
                  <th className="p-3.5 font-bold text-[#111111] uppercase tracking-wider text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E4E2DC]">
                {filteredAndSortedTopics.map((topic) => (
                  <tr key={topic.id} className="hover:bg-black/[0.02] group">
                    <td className="p-3.5 font-bold text-[#FF1E27] whitespace-nowrap">{topic.id}</td>
                    <td className="p-3.5 font-bold text-[#111111] whitespace-nowrap">
                      <Link to={`/research/${topic.slug}`} className="hover:text-[#FF1E27] transition-colors">
                        {topic.title}
                      </Link>
                    </td>
                    <td className="p-3.5 text-[#555555] whitespace-nowrap">{topic.category}</td>
                    <td className="p-3.5 whitespace-nowrap">
                      <span className={`text-[10px] font-bold px-2 py-0.5 border ${getStatusBadgeStyle(topic.status)}`}>
                        {topic.status}
                      </span>
                    </td>
                    <td className="p-3.5 font-bold whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-[#E4E2DC]">
                          <div className="h-full bg-[#FF1E27]" style={{ width: `${topic.progress}%` }} />
                        </div>
                        <span className="text-[10px] text-stone-600">{topic.progress}%</span>
                      </div>
                    </td>
                    <td className="p-3.5 text-stone-600 whitespace-nowrap">{topic.difficulty}</td>
                    <td className="p-3.5 text-stone-500 whitespace-nowrap text-[11px]">{topic.lastUpdated}</td>
                    <td className="p-3.5 text-right whitespace-nowrap">
                      <Link
                        to={`/research/${topic.slug}`}
                        className="text-[#FF1E27] font-bold hover:underline inline-flex items-center gap-1"
                      >
                        <span>DOSSIER</span>
                        <ArrowRight size={12} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        )}
      </main>

      {/* ─────────────────────────────────────────────────────────────
          5. RESEARCH HOME EXPERIENCE CONCLUSION (Section 31 Spec)
      ───────────────────────────────────────────────────────────── */}
      <section className="border-t-2 border-[#111111] bg-[#FAF9F5] py-14 sm:py-20 px-4 sm:px-6 md:px-12 font-mono text-[#111111]">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Section Header */}
          <div className="border-b border-[#C9C7C0] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-[10px] text-[#FF1E27] font-bold uppercase tracking-widest block">
                LABORATORY SYNCHRONIZATION // RADAR
              </span>
              <h2 className="font-syne font-extrabold text-2xl sm:text-3xl uppercase tracking-tight text-[#111111]">
                Active Workbench & Research Roadmap
              </h2>
            </div>
            <span className="text-xs text-stone-500">
              DISPATCH DATE: OCTOBER 2026
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            
            {/* CURRENTLY RESEARCHING */}
            <div className="p-5 bg-white border-2 border-[#111111] shadow-[3px_3px_0px_#111111] space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#111111] uppercase tracking-wider border-b border-[#E4E2DC] pb-2">
                <FlaskConical size={14} className="text-[#FF1E27]" />
                <span>CURRENTLY RESEARCHING</span>
              </div>
              <ul className="space-y-2 text-xs">
                {researchTopics.filter(t => t.status === 'RESEARCHING' || t.status === 'EXPERIMENTING').slice(0, 4).map(t => (
                  <li key={t.id} className="p-2 bg-[#FAF9F5] border border-[#C9C7C0] space-y-1">
                    <Link to={`/research/${t.slug}`} className="font-bold hover:text-[#FF1E27] block truncate">
                      {t.title}
                    </Link>
                    <div className="flex items-center justify-between text-[10px] text-stone-500">
                      <span>{t.category}</span>
                      <span className="text-[#FF1E27] font-bold">{t.progress}%</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* RECENTLY UPDATED */}
            <div className="p-5 bg-white border-2 border-[#111111] shadow-[3px_3px_0px_#111111] space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#111111] uppercase tracking-wider border-b border-[#E4E2DC] pb-2">
                <Clock size={14} className="text-[#FF1E27]" />
                <span>RECENTLY UPDATED</span>
              </div>
              <ul className="space-y-2 text-xs">
                {researchTopics.filter(t => t.status === 'UPDATED').slice(0, 4).map(t => (
                  <li key={t.id} className="p-2 bg-[#FAF9F5] border border-[#C9C7C0] space-y-1">
                    <Link to={`/research/${t.slug}`} className="font-bold hover:text-[#FF1E27] block truncate">
                      {t.title}
                    </Link>
                    <div className="flex items-center justify-between text-[10px] text-stone-500">
                      <span>{t.lastUpdated}</span>
                      <span className="text-emerald-700 font-bold">100% COMPLETE</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* OPEN QUESTIONS */}
            <div className="p-5 bg-white border-2 border-[#111111] shadow-[3px_3px_0px_#111111] space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#111111] uppercase tracking-wider border-b border-[#E4E2DC] pb-2">
                <HelpCircle size={14} className="text-[#FF1E27]" />
                <span>OPEN QUESTIONS</span>
              </div>
              <div className="space-y-2 text-xs text-stone-700">
                <div className="p-2.5 bg-[#FAF9F5] border border-[#C9C7C0] space-y-1">
                  <span className="text-[10px] font-bold text-[#FF1E27] block">Q1 // TEST-TIME SCALING</span>
                  <p className="font-sans text-[11px] leading-relaxed">
                    Will search-based inference models hit a ceiling in non-verifiable, open-ended human creative tasks?
                  </p>
                </div>
                <div className="p-2.5 bg-[#FAF9F5] border border-[#C9C7C0] space-y-1">
                  <span className="text-[10px] font-bold text-[#111111] block">Q2 // ATTENTION DUALITY</span>
                  <p className="font-sans text-[11px] leading-relaxed">
                    Can structured state-space models (Mamba-2) fully displace attention or will hybrids dominate?
                  </p>
                </div>
              </div>
            </div>

            {/* RESEARCH ROADMAP & CTA */}
            <div className="p-5 bg-[#111111] text-white border-2 border-[#111111] shadow-[4px_4px_0px_#FF1E27] flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="text-[10px] text-[#FF1E27] font-bold uppercase tracking-widest block">
                  RESEARCH ROADMAP
                </span>
                <h3 className="font-syne font-extrabold text-xl uppercase tracking-tight text-white leading-tight">
                  Enter The AI Laboratory
                </h3>
                <p className="font-sans text-xs text-stone-300 leading-relaxed">
                  Start with zero knowledge and study the complete 20-stage journey from theoretical origin to modern hardware architecture.
                </p>
              </div>

              <div className="pt-2">
                <Link
                  to="/research/transformers-attention"
                  className="btn-editorial-red w-full py-3 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>ENTER THE LAB →</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          ARCHIVAL LEGAL & TECHNICAL CITATION FOOTER
      ───────────────────────────────────────────────────────────── */}
      <footer className="border-t-2 border-[#111111] bg-[#FAF9F5] py-12 px-4 sm:px-6 md:px-12 font-mono text-xs text-[#555555]">
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
