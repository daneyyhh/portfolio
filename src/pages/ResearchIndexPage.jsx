import React, { useState, useMemo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Search, 
  ArrowRight, 
  SlidersHorizontal, 
  Sparkles, 
  Microscope,
  CheckCircle2,
  Clock,
  FlaskConical,
  ExternalLink,
  Network,
  LayoutGrid,
  List,
  Cpu,
  Layers,
  Terminal,
  Activity,
  GitBranch,
  BookOpen
} from 'lucide-react';
import { 
  researchTopics, 
  getResearchStats, 
  RESEARCH_CATEGORIES, 
  RESEARCH_STATUSES, 
  RESEARCH_DIFFICULTIES 
} from '../data/researchData';
import KnowledgeGraph from '../components/Research/KnowledgeGraph';
import ResearchTaxonomyMap from '../components/Research/ResearchTaxonomyMap';

export default function ResearchIndexPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [selectedDifficulty, setSelectedDifficulty] = useState('ALL');
  const [sortBy, setSortBy] = useState('progress');
  const [viewMode, setViewMode] = useState('records'); // 'records' | 'matrix'
  const [activeTab, setActiveTab] = useState('map'); // 'map' | 'graph'

  const stats = useMemo(() => getResearchStats(), []);

  useEffect(() => {
    document.title = 'RESEARCH LAB // REUBG DEV TECHNICAL ARCHIVE';
    window.scrollTo(0, 0);
  }, []);

  // Filter and sort topics
  const filteredAndSortedTopics = useMemo(() => {
    let result = researchTopics.filter((t) => {
      if (selectedCategory !== 'ALL' && t.category !== selectedCategory && t.secondaryCategory !== selectedCategory) {
        return false;
      }
      if (selectedStatus !== 'ALL' && t.status !== selectedStatus) {
        return false;
      }
      if (selectedDifficulty !== 'ALL' && t.difficulty !== selectedDifficulty) {
        return false;
      }
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

  const getStatusBadge = (status) => {
    switch (status) {
      case 'DOCUMENTED':
        return <span className="bg-[#111111] text-white px-2 py-0.5 text-[9px] font-bold font-mono">DOCUMENTED</span>;
      case 'UPDATED':
        return <span className="bg-[#FF1E27] text-white px-2 py-0.5 text-[9px] font-bold font-mono">UPDATED</span>;
      case 'EXPERIMENTING':
        return <span className="bg-[#FAF9F5] border border-[#FF1E27] text-[#FF1E27] px-2 py-0.5 text-[9px] font-bold font-mono">EXPERIMENTING</span>;
      case 'RESEARCHING':
        return <span className="bg-[#EDECE6] border border-[#C9C7C0] text-[#111111] px-2 py-0.5 text-[9px] font-bold font-mono">RESEARCHING</span>;
      case 'PLANNED':
      default:
        return <span className="bg-[#EDECE6] border border-[#C9C7C0] text-[#777770] px-2 py-0.5 text-[9px] font-bold font-mono">{status}</span>;
    }
  };

  // Featured topic: HOW LARGE LANGUAGE MODELS WORK
  const featuredTopic = researchTopics.find((t) => t.id === 'RBG-RES-01') || researchTopics[0];

  return (
    <div className="min-h-screen bg-[#F1F0EB] text-[#111111] font-sans selection:bg-[#FF1E27] selection:text-white">
      
      {/* ─────────────────────────────────────────────────────────────
          02 — RESEARCH LAB HERO (Editorial Typography & Structured Grid)
      ───────────────────────────────────────────────────────────── */}
      <section className="relative pt-12 sm:pt-16 md:pt-20 pb-12 sm:pb-14 px-4 sm:px-6 md:px-12 border-b border-[#C9C7C0] bg-[#FAF9F5] overflow-hidden">
        
        {/* Subtle Technical Grid Marks */}
        <div className="absolute top-3 left-4 sm:left-12 text-[9px] font-mono text-[#999990] select-none">
          LAB_LOC: REUBG_DEV // RESEARCH_ARCHIVE // LAT 12.9716° N
        </div>
        <div className="absolute top-3 right-4 sm:right-12 text-[9px] font-mono text-[#999990] select-none">
          SYS_ENV: PROD_2026 // PEER_REVIEW_READY
        </div>

        <div className="max-w-7xl mx-auto space-y-8 relative z-10">
          
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-3 font-mono text-xs text-[#555555] uppercase tracking-widest pt-2">
            <Link to="/" className="hover:text-[#FF1E27] transition-colors">
              REUBG DEV
            </Link>
            <span>/</span>
            <span className="text-[#FF1E27] font-bold">RESEARCH LAB</span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF1E27] animate-pulse ml-0.5" />
          </div>

          {/* Editorial Headline */}
          <div className="space-y-4 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EDECE6] border border-[#C9C7C0] text-[10px] sm:text-xs font-mono font-bold tracking-wider text-[#111111] uppercase">
              <Microscope size={13} className="text-[#FF1E27]" />
              <span>DIGITAL RESEARCH ARCHIVE & LABORATORY</span>
            </div>

            <h1 className="font-syne font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-[#111111] leading-[0.9] uppercase">
              RESEARCH LAB<span className="text-[#FF1E27]">.</span>
            </h1>

            <p className="font-mono text-sm sm:text-base md:text-lg font-bold uppercase tracking-wider text-[#FF1E27]">
              “Tracing artificial intelligence from its foundations to the frontier.”
            </p>

            <p className="font-sans text-sm sm:text-base text-[#444444] leading-relaxed max-w-3xl">
              An evolving technical archive documenting the history, mathematics, architecture, experiments, failures, benchmarks, and current developments behind modern AI. Every investigation is dissected from first principles to state-of-the-art 2026 frontier limitations.
            </p>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              03 — RESEARCH DASHBOARD (Real Database Telemetry)
          ───────────────────────────────────────────────────────────── */}
          <div className="pt-2">
            <div className="border border-[#C9C7C0] bg-[#EDECE6] overflow-hidden">
              <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#C9C7C0] font-mono">
                
                <div className="p-4 sm:p-5 space-y-1 bg-[#FAF9F5]">
                  <span className="text-[10px] text-[#777770] uppercase tracking-wider block font-bold">
                    RESEARCH TOPICS
                  </span>
                  <div className="font-syne text-3xl sm:text-4xl font-extrabold text-[#111111]">
                    {stats.totalResearches}
                  </div>
                  <span className="text-[9px] text-[#FF1E27] font-bold block">
                    {stats.documentedTopics + stats.updatedTopics} VERIFIED SOTA PAPERS
                  </span>
                </div>

                <div className="p-4 sm:p-5 space-y-1 bg-[#FAF9F5]">
                  <span className="text-[10px] text-[#777770] uppercase tracking-wider block font-bold">
                    EXPERIMENTS
                  </span>
                  <div className="font-syne text-3xl sm:text-4xl font-extrabold text-[#111111]">
                    08
                  </div>
                  <span className="text-[9px] text-[#555555] block">
                    {stats.totalExperiments} BENCHMARK RUNS
                  </span>
                </div>

                <div className="p-4 sm:p-5 space-y-1 bg-[#FAF9F5]">
                  <span className="text-[10px] text-[#777770] uppercase tracking-wider block font-bold">
                    REFERENCES
                  </span>
                  <div className="font-syne text-3xl sm:text-4xl font-extrabold text-[#111111]">
                    64
                  </div>
                  <span className="text-[9px] text-[#555555] block">
                    PEER-REVIEWED CITATIONS
                  </span>
                </div>

                <div className="p-4 sm:p-5 space-y-1 bg-[#FAF9F5]">
                  <span className="text-[10px] text-[#777770] uppercase tracking-wider block font-bold">
                    LAST UPDATED
                  </span>
                  <div className="font-syne text-xl sm:text-2xl font-extrabold text-[#111111] pt-1">
                    OCT 2026
                  </div>
                  <span className="text-[9px] text-emerald-700 font-bold block">
                    ACTIVE SOTA WORKBENCH
                  </span>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          04 — RESEARCH MAP & KNOWLEDGE ECOSYSTEM (Signature Visual)
      ───────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto py-10 sm:py-14 px-4 sm:px-6 md:px-12 space-y-6">
        
        {/* Tab Toggle: Hierarchical Taxonomy Map vs Topological Knowledge Graph */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#C9C7C0] pb-3">
          <div className="flex items-center gap-2">
            <span className="font-syne text-lg sm:text-xl font-bold uppercase tracking-tight text-[#111111]">
              TOPOLOGICAL EXPLORATION
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono font-bold">
            <button
              onClick={() => setActiveTab('map')}
              className={`px-3 py-1.5 border transition-colors cursor-pointer flex items-center gap-2 ${
                activeTab === 'map'
                  ? 'bg-[#111111] text-white border-[#111111]'
                  : 'bg-[#FAF9F5] text-[#111111] border-[#C9C7C0] hover:border-[#111111]'
              }`}
            >
              <GitBranch size={13} />
              <span>04 / HIERARCHICAL AI MAP</span>
            </button>

            <button
              onClick={() => setActiveTab('graph')}
              className={`px-3 py-1.5 border transition-colors cursor-pointer flex items-center gap-2 ${
                activeTab === 'graph'
                  ? 'bg-[#111111] text-white border-[#111111]'
                  : 'bg-[#FAF9F5] text-[#111111] border-[#C9C7C0] hover:border-[#111111]'
              }`}
            >
              <Network size={13} />
              <span>29 / KNOWLEDGE GRAPH</span>
            </button>
          </div>
        </div>

        {/* Active Visualizer Render */}
        {activeTab === 'map' ? (
          <ResearchTaxonomyMap />
        ) : (
          <KnowledgeGraph />
        )}

      </section>

      {/* ─────────────────────────────────────────────────────────────
          06 — FEATURED RESEARCH (Deep Investigation Spotlight)
      ───────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto py-8 sm:py-12 px-4 sm:px-6 md:px-12">
        <div className="border border-[#111111] bg-[#FAF9F5] p-6 sm:p-8 space-y-6 shadow-sm">
          
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#C9C7C0] pb-4 font-mono text-xs">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#FF1E27] animate-pulse" />
              <span className="text-[#FF1E27] font-bold uppercase tracking-widest">
                06 / FEATURED RESEARCH PAPER
              </span>
              <span className="text-[#999990]">•</span>
              <span className="text-[#555555] uppercase font-bold">RESEARCH 001</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] text-[#666660]">STATUS:</span>
              {getStatusBadge(featuredTopic.status)}
            </div>
          </div>

          {/* Split Content: Editorial Breakdown & Miniature Architecture Schematic */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Investigation Scope */}
            <div className="lg:col-span-7 space-y-5">
              <div>
                <h2 className="font-syne text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight text-[#111111] leading-tight">
                  {featuredTopic.title}
                </h2>
                <p className="font-mono text-xs sm:text-sm text-[#FF1E27] font-bold mt-1">
                  {featuredTopic.subtitle}
                </p>
              </div>

              <p className="font-sans text-xs sm:text-sm text-[#444444] leading-relaxed">
                {featuredTopic.abstract}
              </p>

              {/* 13 Key Investigation Pillars */}
              <div className="space-y-2 pt-2 border-t border-[#C9C7C0]">
                <span className="font-mono text-[10px] text-[#777770] font-bold uppercase tracking-wider block">
                  COMPLETE INVESTIGATION SCOPE
                </span>
                <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
                  {[
                    "Origins", "Language Modelling", "Neural Networks", "Transformers",
                    "Tokenization", "Embeddings", "Attention", "Training", "Scaling Laws",
                    "Inference", "Emergent Capabilities", "Limitations", "Current Frontier"
                  ].map((pillar) => (
                    <span key={pillar} className="bg-[#EDECE6] border border-[#C9C7C0] text-[#111111] px-2 py-0.5">
                      {pillar}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-2">
                <Link
                  to="/research/how-large-language-models-work"
                  className="btn-editorial-red inline-flex items-center gap-3 py-3 px-6 text-xs sm:text-sm font-bold tracking-wider cursor-pointer group"
                >
                  <span>READ FULL RESEARCH</span>
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right: Miniature Architecture Diagram */}
            <div className="lg:col-span-5 bg-[#F1F0EB] border border-[#C9C7C0] p-5 font-mono text-xs space-y-3">
              <div className="flex items-center justify-between border-b border-[#C9C7C0] pb-2">
                <span className="text-[10px] text-[#FF1E27] font-bold uppercase">
                  MINIATURE ARCHITECTURE SCHEMATIC
                </span>
                <span className="text-[9px] text-[#777770]">AUTOREGRESSIVE PIPELINE</span>
              </div>

              <div className="space-y-1.5 text-[11px]">
                <div className="p-2 bg-[#FAF9F5] border border-[#C9C7C0] text-center font-bold">
                  01. RAW TEXT INPUT → BPE TOKENIZATION
                </div>
                <div className="text-center text-[#999990] text-[10px]">↓</div>
                <div className="p-2 bg-[#FAF9F5] border border-[#C9C7C0] text-center font-bold">
                  02. TOKEN EMBEDDINGS + RoPE ROTARY COORDINATES
                </div>
                <div className="text-center text-[#999990] text-[10px]">↓</div>
                <div className="p-2 bg-[#111111] text-white text-center font-bold">
                  03. N-LAYER CAUSAL MHA (QKᵀ / √d_k) + KV CACHE
                </div>
                <div className="text-center text-[#999990] text-[10px]">↓</div>
                <div className="p-2 bg-[#FAF9F5] border border-[#C9C7C0] text-center font-bold">
                  04. SwiGLU FEED-FORWARD NETWORK + RMSNORM
                </div>
                <div className="text-center text-[#999990] text-[10px]">↓</div>
                <div className="p-2 bg-[#FF1E27] text-white text-center font-bold">
                  05. NEXT-TOKEN PROBABILITY DISTRIBUTION P(w_t | w_&lt;t)
                </div>
              </div>

              <div className="text-[9px] text-[#777770] pt-1">
                Linear O(1) step inference with PagedAttention and FlashDecoding.
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          05 — RESEARCH ARCHIVE (Scientific Technical Records Index)
      ───────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto py-10 sm:py-14 px-4 sm:px-6 md:px-12 space-y-8">
        
        {/* Archive Title & Filters */}
        <div className="space-y-6 border-b border-[#C9C7C0] pb-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#FF1E27] uppercase tracking-widest">
                <BookOpen size={14} />
                <span>05 / TECHNICAL RESEARCH INDEX</span>
              </div>
              <h2 className="font-syne text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-[#111111] mt-1">
                RESEARCH ARCHIVE
              </h2>
            </div>

            {/* View Mode & Counter */}
            <div className="flex items-center gap-3 font-mono text-xs">
              <span className="text-[#666660]">
                SHOWING <span className="font-bold text-[#111111]">{filteredAndSortedTopics.length}</span> OF {researchTopics.length} RECORDS
              </span>
              
              <div className="flex items-center border border-[#C9C7C0] bg-[#FAF9F5]">
                <button
                  onClick={() => setViewMode('records')}
                  className={`p-2 transition-colors cursor-pointer ${
                    viewMode === 'records' ? 'bg-[#111111] text-white' : 'text-[#555555] hover:text-[#111111]'
                  }`}
                  title="Technical Records View"
                >
                  <LayoutGrid size={15} />
                </button>
                <button
                  onClick={() => setViewMode('matrix')}
                  className={`p-2 transition-colors cursor-pointer ${
                    viewMode === 'matrix' ? 'bg-[#111111] text-white' : 'text-[#555555] hover:text-[#111111]'
                  }`}
                  title="Archival Matrix Table"
                >
                  <List size={15} />
                </button>
              </div>
            </div>
          </div>

          {/* Search Bar & Multi-Criteria Filtering */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 font-mono text-xs">
            {/* Search Input */}
            <div className="lg:col-span-5 relative">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#777770]" />
              <input
                type="text"
                placeholder="Search topics, mechanisms, concepts, equations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#FAF9F5] border border-[#C9C7C0] pl-9 pr-4 py-2.5 text-xs text-[#111111] placeholder:text-[#888880] focus:outline-none focus:border-[#FF1E27]"
              />
            </div>

            {/* Category Filter */}
            <div className="lg:col-span-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-[#FAF9F5] border border-[#C9C7C0] px-3 py-2.5 text-xs text-[#111111] focus:outline-none focus:border-[#FF1E27] cursor-pointer"
              >
                {RESEARCH_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>CATEGORY: {cat}</option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div className="lg:col-span-2">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full bg-[#FAF9F5] border border-[#C9C7C0] px-3 py-2.5 text-xs text-[#111111] focus:outline-none focus:border-[#FF1E27] cursor-pointer"
              >
                {RESEARCH_STATUSES.map((status) => (
                  <option key={status} value={status}>STATUS: {status}</option>
                ))}
              </select>
            </div>

            {/* Sort Order */}
            <div className="lg:col-span-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-[#FAF9F5] border border-[#C9C7C0] px-3 py-2.5 text-xs text-[#111111] focus:outline-none focus:border-[#FF1E27] cursor-pointer"
              >
                <option value="progress">SORT: PROGRESS</option>
                <option value="updated">SORT: RECENTLY UPDATED</option>
                <option value="newest">SORT: NEWEST</option>
                <option value="oldest">SORT: OLDEST</option>
                <option value="difficulty">SORT: DIFFICULTY</option>
                <option value="category">SORT: CATEGORY</option>
              </select>
            </div>
          </div>

          {hasActiveFilters && (
            <div className="flex items-center justify-between text-xs font-mono pt-1 text-[#666660]">
              <span>Active filters applied</span>
              <button
                onClick={resetFilters}
                className="text-[#FF1E27] hover:underline font-bold cursor-pointer"
              >
                RESET FILTERS
              </button>
            </div>
          )}
        </div>

        {/* ─────────────────────────────────────────────────────────────
            VIEW MODE A: SCIENTIFIC TECHNICAL RECORDS (Specified Format)
        ───────────────────────────────────────────────────────────── */}
        {viewMode === 'records' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedTopics.map((topic) => {
              const progressPct = topic.progress || 75;
              const filledBars = Math.round((progressPct / 100) * 20);
              const emptyBars = 20 - filledBars;
              const barString = '█'.repeat(filledBars) + '░'.repeat(emptyBars);

              return (
                <div
                  key={topic.id}
                  className="bg-[#FAF9F5] border border-[#C9C7C0] hover:border-[#111111] transition-all p-5 flex flex-col justify-between space-y-5 font-mono shadow-xs group"
                >
                  <div className="space-y-4">
                    {/* Record Header Strip */}
                    <div className="flex items-center justify-between border-b border-[#C9C7C0] pb-3 text-xs">
                      <span className="font-bold text-[#FF1E27] tracking-wider">
                        {topic.id.replace('RBG-', '')}
                      </span>
                      {getStatusBadge(topic.status)}
                    </div>

                    {/* Title & Short Abstract */}
                    <div className="space-y-1.5">
                      <Link
                        to={`/research/${topic.slug}`}
                        className="font-syne text-lg font-bold uppercase text-[#111111] hover:text-[#FF1E27] transition-colors leading-tight block"
                      >
                        {topic.title}
                      </Link>
                      <p className="font-sans text-xs text-[#555555] line-clamp-3 leading-relaxed">
                        {topic.abstract}
                      </p>
                    </div>

                    {/* Technical Metadata Matrix */}
                    <div className="space-y-1.5 pt-2 border-t border-[#C9C7C0] text-[10px]">
                      <div className="flex justify-between">
                        <span className="text-[#777770]">CATEGORY</span>
                        <span className="font-bold text-[#111111]">{topic.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#777770]">LEVEL</span>
                        <span className="font-bold text-[#111111] uppercase">{topic.difficulty}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#777770]">UPDATED</span>
                        <span className="font-bold text-[#111111]">{topic.lastUpdated}</span>
                      </div>
                      
                      {/* Monospace Progress Bar */}
                      <div className="pt-2 space-y-1">
                        <div className="flex justify-between text-[9px]">
                          <span className="text-[#777770]">PROGRESS</span>
                          <span className="font-bold text-[#111111]">{progressPct}%</span>
                        </div>
                        <div className="text-[10px] text-[#FF1E27] tracking-tighter truncate font-mono select-none">
                          {barString}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Open Research Button */}
                  <div className="pt-2 border-t border-[#C9C7C0]">
                    <Link
                      to={`/research/${topic.slug}`}
                      className="btn-editorial-red w-full flex items-center justify-center gap-2 py-2 text-xs font-bold tracking-wider cursor-pointer group-hover:bg-[#FF1E27] group-hover:text-white"
                    >
                      <span>OPEN RESEARCH</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            VIEW MODE B: ARCHIVAL MATRIX TABLE
        ───────────────────────────────────────────────────────────── */}
        {viewMode === 'matrix' && (
          <div className="border border-[#C9C7C0] bg-[#FAF9F5] overflow-x-auto font-mono text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#EDECE6] border-b border-[#C9C7C0] text-[10px] text-[#777770] uppercase">
                  <th className="p-3">ID</th>
                  <th className="p-3">RESEARCH TITLE</th>
                  <th className="p-3">CATEGORY</th>
                  <th className="p-3">STATUS</th>
                  <th className="p-3">DIFFICULTY</th>
                  <th className="p-3">UPDATED</th>
                  <th className="p-3">PROGRESS</th>
                  <th className="p-3 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#C9C7C0]">
                {filteredAndSortedTopics.map((topic) => (
                  <tr key={topic.id} className="hover:bg-[#F1F0EB] transition-colors">
                    <td className="p-3 font-bold text-[#FF1E27]">{topic.id.replace('RBG-', '')}</td>
                    <td className="p-3 font-syne font-bold text-[#111111]">{topic.title}</td>
                    <td className="p-3 text-[#555555]">{topic.category}</td>
                    <td className="p-3">{getStatusBadge(topic.status)}</td>
                    <td className="p-3 text-[#555555]">{topic.difficulty}</td>
                    <td className="p-3 text-[#555555]">{topic.lastUpdated}</td>
                    <td className="p-3 font-bold">{topic.progress || 75}%</td>
                    <td className="p-3 text-right">
                      <Link
                        to={`/research/${topic.slug}`}
                        className="text-[#FF1E27] hover:underline font-bold inline-flex items-center gap-1"
                      >
                        <span>OPEN</span>
                        <ArrowRight size={11} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </section>

      {/* ─────────────────────────────────────────────────────────────
          EDITORIAL FOOTER STRIP
      ───────────────────────────────────────────────────────────── */}
      <footer className="border-t border-[#C9C7C0] bg-[#FAF9F5] py-10 px-4 sm:px-6 md:px-12 font-mono text-xs text-[#777770]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF1E27]" />
            <span>REUBG DEV // RESEARCH LAB ARCHIVE · EST. 2024–2026</span>
          </div>

          <div className="flex items-center gap-4">
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
