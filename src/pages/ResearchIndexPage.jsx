import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  ArrowRight, 
  SlidersHorizontal, 
  Microscope,
  CheckCircle2, 
  Clock, 
  ExternalLink,
  Layers,
  Terminal,
  Activity,
  GitBranch,
  BookOpen,
  Filter,
  X,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { 
  researchTopics, 
  getResearchStats, 
  PRIMARY_RESEARCH_CATEGORIES,
  getParentCategory,
  RESEARCH_STATUSES, 
  RESEARCH_DIFFICULTIES 
} from '../data/researchData';
import ResearchHeader from '../components/Research/ResearchHeader';
import ScientificHeroVisual from '../components/Research/ScientificHeroVisual';
import { 
  AiCategoryVisual, 
  CognitionCategoryVisual, 
  SystemsCategoryVisual, 
  ApplicationsCategoryVisual 
} from '../components/Research/CategoryVisuals';
import ResearchTaxonomyMap from '../components/Research/ResearchTaxonomyMap';

export default function ResearchIndexPage() {
  const navigate = useNavigate();
  const discoveryRef = useRef(null);

  // Discovery Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedDifficulty, setSelectedDifficulty] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [sortBy, setSortBy] = useState('progress');
  const [activeTab, setActiveTab] = useState('papers'); // 'papers' | 'taxonomy'

  const stats = useMemo(() => getResearchStats(), []);

  useEffect(() => {
    document.title = 'RESEARCH LAB // REUBG.DEV';
    window.scrollTo(0, 0);
  }, []);

  const scrollToDiscovery = (category = null) => {
    if (category) {
      setSelectedCategory(category);
    }
    if (discoveryRef.current) {
      const topOffset = 80;
      const elementPosition = discoveryRef.current.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - topOffset,
        behavior: 'smooth'
      });
    }
  };

  // Filter and sort research papers
  const filteredTopics = useMemo(() => {
    let result = researchTopics.filter((topic) => {
      const parentCat = getParentCategory(topic);

      // Primary Category Filter
      if (selectedCategory !== 'ALL') {
        const matchesParent = parentCat.toUpperCase() === selectedCategory.toUpperCase();
        const matchesCat = topic.category?.toUpperCase() === selectedCategory.toUpperCase();
        const matchesSec = topic.secondaryCategory?.toUpperCase() === selectedCategory.toUpperCase();
        if (!matchesParent && !matchesCat && !matchesSec) {
          return false;
        }
      }

      // Difficulty Filter
      if (selectedDifficulty !== 'ALL' && topic.difficulty !== selectedDifficulty) {
        return false;
      }

      // Status Filter
      if (selectedStatus !== 'ALL' && topic.status !== selectedStatus) {
        return false;
      }

      // Text Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = topic.title?.toLowerCase().includes(q);
        const matchesSubtitle = topic.subtitle?.toLowerCase().includes(q);
        const matchesAbstract = topic.abstract?.toLowerCase().includes(q);
        const matchesId = topic.id?.toLowerCase().includes(q);
        const matchesConcepts = topic.keyConcepts?.some((c) => c.toLowerCase().includes(q));
        const matchesTags = topic.tags?.some((t) => t.toLowerCase().includes(q));

        if (!matchesTitle && !matchesSubtitle && !matchesAbstract && !matchesId && !matchesConcepts && !matchesTags) {
          return false;
        }
      }

      return true;
    });

    result.sort((a, b) => {
      if (sortBy === 'progress') return (b.progress || 0) - (a.progress || 0);
      if (sortBy === 'newest') return new Date(b.startedDate || '2024') - new Date(a.startedDate || '2024');
      if (sortBy === 'updated') return new Date(b.lastUpdated || '2026') - new Date(a.lastUpdated || '2026');
      if (sortBy === 'difficulty') {
        const weights = { 'Beginner': 1, 'Intermediate': 2, 'Advanced': 3 };
        return (weights[b.difficulty] || 0) - (weights[a.difficulty] || 0);
      }
      return 0;
    });

    return result;
  }, [searchQuery, selectedCategory, selectedDifficulty, selectedStatus, sortBy]);

  const hasActiveFilters = searchQuery || selectedCategory !== 'ALL' || selectedDifficulty !== 'ALL' || selectedStatus !== 'ALL';

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('ALL');
    setSelectedDifficulty('ALL');
    setSelectedStatus('ALL');
    setSortBy('progress');
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'DOCUMENTED':
        return (
          <span className="inline-flex items-center gap-1 bg-[#000000] text-[#FFFFFF] px-2 py-0.5 text-[9px] font-mono font-bold tracking-wider uppercase">
            <span className="w-1 h-1 rounded-full bg-[#FFFFFF]" />
            DOCUMENTED
          </span>
        );
      case 'UPDATED':
        return (
          <span className="inline-flex items-center gap-1 bg-[#FF0000] text-[#FFFFFF] px-2 py-0.5 text-[9px] font-mono font-bold tracking-wider uppercase">
            <span className="w-1 h-1 rounded-full bg-[#FFFFFF] animate-pulse" />
            UPDATED
          </span>
        );
      case 'EXPERIMENTING':
        return (
          <span className="inline-flex items-center gap-1 bg-[#FAF9F5] border border-[#FF0000] text-[#FF0000] px-2 py-0.5 text-[9px] font-mono font-bold tracking-wider uppercase">
            <span className="w-1 h-1 rounded-full bg-[#FF0000]" />
            EXPERIMENTING
          </span>
        );
      case 'RESEARCHING':
      default:
        return (
          <span className="inline-flex items-center gap-1 bg-[#FAF9F5] border border-[#E2E0D8] text-[#555555] px-2 py-0.5 text-[9px] font-mono font-bold tracking-wider uppercase">
            <span className="w-1 h-1 rounded-full bg-[#888880]" />
            {status}
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#F1F0EA] text-[#000000] font-sans selection:bg-[#FF0000] selection:text-[#FFFFFF]">
      
      {/* ── 01. EDITORIAL RESEARCH HEADER ── */}
      <ResearchHeader />

      {/* ── 02. HERO SECTION ── */}
      <section className="relative pt-10 sm:pt-16 pb-12 sm:pb-16 px-4 sm:px-6 md:px-12 border-b border-[#E2E0D8] bg-[#F1F0EA] overflow-hidden">
        
        {/* Subtle Technical Edge Telemetry */}
        <div className="max-w-7xl mx-auto flex items-center justify-between text-[10px] font-mono text-[#555555] tracking-widest pb-6 select-none border-b border-[#E2E0D8]/60 mb-8">
          <div>RESEARCH ARCHIVE // REUBG.DEV</div>
          <div className="hidden sm:block">SYSTEM: VERIFIED_PEER_NOTEBOOK</div>
          <div className="text-[#FF0000] font-bold">STATUS: SOTA_ACTIVE</div>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Heading, Supporting Text & Primary CTA */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 font-mono text-xs font-bold tracking-widest text-[#FF0000] uppercase">
              <span>RESEARCH</span>
              <span className="text-[#555555]">/</span>
              <span>03</span>
            </div>

            {/* Main Heading: Bold Condensed Display Typography */}
            <div className="space-y-1">
              <h1 className="font-sans font-black text-6xl sm:text-7xl md:text-8xl tracking-tighter text-[#000000] uppercase leading-[0.88]">
                RESEARCH<br />LAB<span className="text-[#FF0000]">.</span>
              </h1>
            </div>

            {/* Supporting Text */}
            <p className="font-sans text-base sm:text-lg text-[#555555] leading-relaxed max-w-md">
              “Exploring technologies, ideas, and systems that shape the future. A space for deep research, analysis, and real-world experimentation.”
            </p>

            {/* Primary CTA Button */}
            <div className="pt-2">
              <button
                onClick={() => scrollToDiscovery()}
                className="group inline-flex items-center gap-3 px-6 py-3.5 bg-[#000000] text-[#FFFFFF] font-mono text-xs font-bold tracking-widest uppercase hover:bg-[#FF0000] transition-colors cursor-pointer"
              >
                <span>EXPLORE RESEARCH</span>
                <span className="text-[#FF0000] group-hover:text-[#FFFFFF] transition-colors group-hover:translate-x-1 duration-200">
                  →
                </span>
              </button>
            </div>

          </div>

          {/* Center / Central Visual: Restrained Abstract Scientific Illustration */}
          <div className="lg:col-span-4 flex items-center justify-center py-4">
            <div className="w-full bg-[#FAF9F5] border border-[#E2E0D8] p-4 shadow-xs">
              <ScientificHeroVisual />
            </div>
          </div>

          {/* Right Column: Research For A Better Tomorrow & Categories Preview */}
          <div className="lg:col-span-3 space-y-6 border-l border-[#E2E0D8] lg:pl-8">
            
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-[#FF0000] font-bold tracking-widest block uppercase">
                DIRECTIVE
              </span>
              <h2 className="font-sans font-bold text-lg sm:text-xl text-[#000000] tracking-tight uppercase leading-snug">
                RESEARCH FOR A BETTER TOMORROW.
              </h2>
              <p className="text-xs text-[#555555] leading-relaxed">
                A rigorous investigation into foundational architectures, biological cognitive models, complex dynamical patterns, and tangible developer systems.
              </p>
            </div>

            {/* 4 Research Categories List */}
            <div className="space-y-2.5 pt-2 border-t border-[#E2E0D8] font-mono text-xs">
              {PRIMARY_RESEARCH_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => scrollToDiscovery(cat.title)}
                  className="w-full text-left py-1.5 px-2.5 bg-[#FAF9F5] border border-[#E2E0D8] hover:border-[#000000] hover:bg-[#FFFFFF] flex items-center justify-between group transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-[#FF0000] font-bold">{cat.num} —</span>
                    <span className="font-bold text-[#000000] text-[11px] group-hover:text-[#FF0000] transition-colors">
                      {cat.title}
                    </span>
                  </div>
                  <span className="text-[#555555] group-hover:translate-x-0.5 transition-transform text-[10px]">
                    →
                  </span>
                </button>
              ))}
            </div>

            {/* Quick Metrics Bar */}
            <div className="pt-2 border-t border-[#E2E0D8] grid grid-cols-2 gap-3 text-center font-mono">
              <div className="bg-[#FAF9F5] p-2 border border-[#E2E0D8]">
                <div className="text-[9px] text-[#555555] uppercase">TOPICS</div>
                <div className="text-lg font-bold text-[#000000]">{stats.totalResearches}</div>
              </div>
              <div className="bg-[#FAF9F5] p-2 border border-[#E2E0D8]">
                <div className="text-[9px] text-[#555555] uppercase">VERIFIED</div>
                <div className="text-lg font-bold text-[#FF0000]">{stats.documentedTopics + stats.updatedTopics}</div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── 03. RESEARCH CATEGORY CARDS SECTION ── */}
      <section id="categories" className="py-14 sm:py-16 px-4 sm:px-6 md:px-12 border-b border-[#E2E0D8] bg-[#F1F0EA]">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E2E0D8] pb-4">
            <div>
              <span className="text-[10px] font-mono text-[#FF0000] font-bold uppercase tracking-widest block">
                SECTION // 03.A
              </span>
              <h2 className="font-sans font-black text-2xl sm:text-3xl text-[#000000] tracking-tight uppercase">
                RESEARCH CATEGORIES
              </h2>
            </div>
            <div className="font-mono text-xs text-[#555555]">
              SELECT A DOMAIN TO EXPLORE ITS TECHNICAL INVESTIGATIONS
            </div>
          </div>

          {/* 4 Cards Responsive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* CARD 01 — ARTIFICIAL INTELLIGENCE */}
            <div className="bg-[#FAF9F5] border border-[#E2E0D8] hover:border-[#000000] p-5 flex flex-col justify-between transition-all group shadow-xs">
              <div className="space-y-4">
                
                {/* Header: Number & Visual */}
                <div className="flex items-center justify-between font-mono text-xs pb-2 border-b border-[#E2E0D8]">
                  <span className="text-[10px] text-[#FF0000] font-bold tracking-wider uppercase">CATEGORY / 01</span>
                  <span className="text-[10px] text-[#555555]">AI ARCHITECTURES</span>
                </div>

                <div className="bg-[#FFFFFF] border border-[#E2E0D8] p-2 overflow-hidden">
                  <AiCategoryVisual className="w-full h-24" />
                </div>

                <div className="space-y-1">
                  <h3 className="font-sans font-bold text-lg text-[#000000] uppercase tracking-tight group-hover:text-[#FF0000] transition-colors">
                    ARTIFICIAL INTELLIGENCE
                  </h3>
                  <p className="text-xs text-[#555555] leading-relaxed">
                    Foundational machine learning, deep learning mechanisms, LLM scaling laws, and transformer attention.
                  </p>
                </div>

                {/* Topics List */}
                <div className="space-y-1.5 pt-2 border-t border-[#E2E0D8]">
                  <span className="text-[9px] font-mono text-[#555555] font-bold uppercase block">
                    FEATURED TOPICS:
                  </span>
                  <ul className="text-xs font-mono text-[#000000] space-y-1">
                    <li className="flex items-center gap-1.5">• Machine Learning</li>
                    <li className="flex items-center gap-1.5">• Large Language Models</li>
                    <li className="flex items-center gap-1.5">• Transformer Architecture</li>
                    <li className="flex items-center gap-1.5">• Retrieval-Augmented Gen</li>
                    <li className="flex items-center gap-1.5">• AI Agents & Tool Calling</li>
                    <li className="flex items-center gap-1.5">• Model Evaluation & SOTA</li>
                    <li className="flex items-center gap-1.5">• AI Safety and Alignment</li>
                    <li className="flex items-center gap-1.5">• Local AI & Quantization</li>
                  </ul>
                </div>

              </div>

              {/* Action Button */}
              <div className="pt-6 mt-4 border-t border-[#E2E0D8]">
                <button
                  onClick={() => scrollToDiscovery('ARTIFICIAL INTELLIGENCE')}
                  className="w-full py-2.5 px-3 bg-[#FFFFFF] border border-[#E2E0D8] text-[#000000] font-mono text-xs font-bold flex items-center justify-between group-hover:bg-[#000000] group-hover:text-[#FFFFFF] transition-colors cursor-pointer"
                >
                  <span>BROWSE PAPERS</span>
                  <span className="text-[#FF0000] group-hover:text-[#FFFFFF]">→</span>
                </button>
              </div>
            </div>

            {/* CARD 02 — HUMAN COGNITION */}
            <div className="bg-[#FAF9F5] border border-[#E2E0D8] hover:border-[#000000] p-5 flex flex-col justify-between transition-all group shadow-xs">
              <div className="space-y-4">
                
                {/* Header: Number & Visual */}
                <div className="flex items-center justify-between font-mono text-xs pb-2 border-b border-[#E2E0D8]">
                  <span className="text-[10px] text-[#FF0000] font-bold tracking-wider uppercase">CATEGORY / 02</span>
                  <span className="text-[10px] text-[#555555]">COGNITIVE THEORY</span>
                </div>

                <div className="bg-[#FFFFFF] border border-[#E2E0D8] p-2 overflow-hidden">
                  <CognitionCategoryVisual className="w-full h-24" />
                </div>

                <div className="space-y-1">
                  <h3 className="font-sans font-bold text-lg text-[#000000] uppercase tracking-tight group-hover:text-[#FF0000] transition-colors">
                    HUMAN COGNITION
                  </h3>
                  <p className="text-xs text-[#555555] leading-relaxed">
                    Neurobiological memory systems, attention allocation, heuristic biases, and cognitive interfaces.
                  </p>
                </div>

                {/* Topics List */}
                <div className="space-y-1.5 pt-2 border-t border-[#E2E0D8]">
                  <span className="text-[9px] font-mono text-[#555555] font-bold uppercase block">
                    FEATURED TOPICS:
                  </span>
                  <ul className="text-xs font-mono text-[#000000] space-y-1">
                    <li className="flex items-center gap-1.5">• Neuroplasticity & Plasticity</li>
                    <li className="flex items-center gap-1.5">• Memory and Learning (L1–L5)</li>
                    <li className="flex items-center gap-1.5">• Cognitive Biases & Heuristics</li>
                    <li className="flex items-center gap-1.5">• Attention and Perception</li>
                    <li className="flex items-center gap-1.5">• Decision-Making Frameworks</li>
                    <li className="flex items-center gap-1.5">• Human–Computer Interaction</li>
                  </ul>
                </div>

              </div>

              {/* Action Button */}
              <div className="pt-6 mt-4 border-t border-[#E2E0D8]">
                <button
                  onClick={() => scrollToDiscovery('HUMAN COGNITION')}
                  className="w-full py-2.5 px-3 bg-[#FFFFFF] border border-[#E2E0D8] text-[#000000] font-mono text-xs font-bold flex items-center justify-between group-hover:bg-[#000000] group-hover:text-[#FFFFFF] transition-colors cursor-pointer"
                >
                  <span>BROWSE PAPERS</span>
                  <span className="text-[#FF0000] group-hover:text-[#FFFFFF]">→</span>
                </button>
              </div>
            </div>

            {/* CARD 03 — SYSTEMS & PATTERNS */}
            <div className="bg-[#FAF9F5] border border-[#E2E0D8] hover:border-[#000000] p-5 flex flex-col justify-between transition-all group shadow-xs">
              <div className="space-y-4">
                
                {/* Header: Number & Visual */}
                <div className="flex items-center justify-between font-mono text-xs pb-2 border-b border-[#E2E0D8]">
                  <span className="text-[10px] text-[#FF0000] font-bold tracking-wider uppercase">CATEGORY / 03</span>
                  <span className="text-[10px] text-[#555555]">COMPLEX SYSTEMS</span>
                </div>

                <div className="bg-[#FFFFFF] border border-[#E2E0D8] p-2 overflow-hidden">
                  <SystemsCategoryVisual className="w-full h-24" />
                </div>

                <div className="space-y-1">
                  <h3 className="font-sans font-bold text-lg text-[#000000] uppercase tracking-tight group-hover:text-[#FF0000] transition-colors">
                    SYSTEMS & PATTERNS
                  </h3>
                  <p className="text-xs text-[#555555] leading-relaxed">
                    Emergence in non-linear networks, behavioral game theory, entropy metrics, and predictive dynamics.
                  </p>
                </div>

                {/* Topics List */}
                <div className="space-y-1.5 pt-2 border-t border-[#E2E0D8]">
                  <span className="text-[9px] font-mono text-[#555555] font-bold uppercase block">
                    FEATURED TOPICS:
                  </span>
                  <ul className="text-xs font-mono text-[#000000] space-y-1">
                    <li className="flex items-center gap-1.5">• Complex Dynamic Systems</li>
                    <li className="flex items-center gap-1.5">• Behavioral Patterns & Agents</li>
                    <li className="flex items-center gap-1.5">• Predictive Time-Series Models</li>
                    <li className="flex items-center gap-1.5">• Empirical Data Analysis</li>
                    <li className="flex items-center gap-1.5">• Mathematical Foundations</li>
                    <li className="flex items-center gap-1.5">• Information Theory & Entropy</li>
                  </ul>
                </div>

              </div>

              {/* Action Button */}
              <div className="pt-6 mt-4 border-t border-[#E2E0D8]">
                <button
                  onClick={() => scrollToDiscovery('SYSTEMS & PATTERNS')}
                  className="w-full py-2.5 px-3 bg-[#FFFFFF] border border-[#E2E0D8] text-[#000000] font-mono text-xs font-bold flex items-center justify-between group-hover:bg-[#000000] group-hover:text-[#FFFFFF] transition-colors cursor-pointer"
                >
                  <span>BROWSE PAPERS</span>
                  <span className="text-[#FF0000] group-hover:text-[#FFFFFF]">→</span>
                </button>
              </div>
            </div>

            {/* CARD 04 — REAL-WORLD APPLICATIONS */}
            <div className="bg-[#FAF9F5] border border-[#E2E0D8] hover:border-[#000000] p-5 flex flex-col justify-between transition-all group shadow-xs">
              <div className="space-y-4">
                
                {/* Header: Number & Visual */}
                <div className="flex items-center justify-between font-mono text-xs pb-2 border-b border-[#E2E0D8]">
                  <span className="text-[10px] text-[#FF0000] font-bold tracking-wider uppercase">CATEGORY / 04</span>
                  <span className="text-[10px] text-[#555555]">PROD PIPELINES</span>
                </div>

                <div className="bg-[#FFFFFF] border border-[#E2E0D8] p-2 overflow-hidden">
                  <ApplicationsCategoryVisual className="w-full h-24" />
                </div>

                <div className="space-y-1">
                  <h3 className="font-sans font-bold text-lg text-[#000000] uppercase tracking-tight group-hover:text-[#FF0000] transition-colors">
                    REAL-WORLD APPLICATIONS
                  </h3>
                  <p className="text-xs text-[#555555] leading-relaxed">
                    Engineering intelligence into production software, developer agents, generative engines, and interactive games.
                  </p>
                </div>

                {/* Topics List */}
                <div className="space-y-1.5 pt-2 border-t border-[#E2E0D8]">
                  <span className="text-[9px] font-mono text-[#555555] font-bold uppercase block">
                    FEATURED TOPICS:
                  </span>
                  <ul className="text-xs font-mono text-[#000000] space-y-1">
                    <li className="flex items-center gap-1.5">• AI in Everyday Software Tools</li>
                    <li className="flex items-center gap-1.5">• Creative Generative Workflows</li>
                    <li className="flex items-center gap-1.5">• Developer Productivity Agents</li>
                    <li className="flex items-center gap-1.5">• AI in Game Development (R3F)</li>
                    <li className="flex items-center gap-1.5">• Frontier Emerging Tech</li>
                    <li className="flex items-center gap-1.5">• Experimental Benchmarks</li>
                  </ul>
                </div>

              </div>

              {/* Action Button */}
              <div className="pt-6 mt-4 border-t border-[#E2E0D8]">
                <button
                  onClick={() => scrollToDiscovery('REAL-WORLD APPLICATIONS')}
                  className="w-full py-2.5 px-3 bg-[#FFFFFF] border border-[#E2E0D8] text-[#000000] font-mono text-xs font-bold flex items-center justify-between group-hover:bg-[#000000] group-hover:text-[#FFFFFF] transition-colors cursor-pointer"
                >
                  <span>BROWSE PAPERS</span>
                  <span className="text-[#FF0000] group-hover:text-[#FFFFFF]">→</span>
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── 07. RESEARCH DISCOVERY & RESEARCH PAPERS ARCHIVE ── */}
      <section ref={discoveryRef} className="py-14 sm:py-16 px-4 sm:px-6 md:px-12 border-b border-[#E2E0D8] bg-[#F1F0EA]">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Section Header & View Mode Switcher */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E2E0D8] pb-4">
            <div>
              <span className="text-[10px] font-mono text-[#FF0000] font-bold uppercase tracking-widest block">
                SECTION // 07.A
              </span>
              <h2 className="font-sans font-black text-2xl sm:text-3xl text-[#000000] tracking-tight uppercase">
                RESEARCH DISCOVERY & ARCHIVE
              </h2>
            </div>

            {/* View Mode Tabs: Papers List vs Interactive System Taxonomy */}
            <div className="flex items-center font-mono text-xs border border-[#E2E0D8] bg-[#FAF9F5] p-1">
              <button
                onClick={() => setActiveTab('papers')}
                className={`px-3 py-1.5 font-bold transition-colors cursor-pointer ${
                  activeTab === 'papers'
                    ? 'bg-[#000000] text-[#FFFFFF]'
                    : 'text-[#555555] hover:text-[#000000]'
                }`}
              >
                INVESTIGATIVE PAPERS ({filteredTopics.length})
              </button>
              <button
                onClick={() => setActiveTab('taxonomy')}
                className={`px-3 py-1.5 font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'taxonomy'
                    ? 'bg-[#000000] text-[#FFFFFF]'
                    : 'text-[#555555] hover:text-[#000000]'
                }`}
              >
                <span>TAXONOMY MAP</span>
                <span className="text-[9px] px-1 bg-[#FF0000] text-[#FFFFFF] rounded-xs font-bold">TREE</span>
              </button>
            </div>
          </div>

          {activeTab === 'taxonomy' ? (
            <div className="bg-[#FAF9F5] border border-[#E2E0D8] p-4 sm:p-6 shadow-xs">
              <ResearchTaxonomyMap />
            </div>
          ) : (
            <div className="space-y-6">
              
              {/* Filter Workspace Toolbar */}
              <div className="bg-[#FAF9F5] border border-[#E2E0D8] p-4 sm:p-6 space-y-4 shadow-xs">
                
                {/* Search Input Bar */}
                <div className="relative">
                  <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#555555]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by keyword, paper title, mathematical equation, algorithm (e.g., 'Transformers', 'FlashAttention', 'MemGPT', 'Backprop')..."
                    className="w-full bg-[#FFFFFF] border border-[#E2E0D8] focus:border-[#000000] pl-10 pr-10 py-2.5 text-xs font-mono text-[#000000] placeholder:text-[#888880] outline-none transition-colors"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#555555] hover:text-[#000000]"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>

                {/* Category Filter Pills (01 - 04) */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#555555] uppercase">
                    <span className="font-bold">PRIMARY CATEGORY:</span>
                    <span>SHOWING: {selectedCategory}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                    <button
                      onClick={() => setSelectedCategory('ALL')}
                      className={`px-3 py-1 border transition-colors cursor-pointer ${
                        selectedCategory === 'ALL'
                          ? 'bg-[#000000] text-[#FFFFFF] border-[#000000] font-bold'
                          : 'bg-[#FFFFFF] text-[#555555] border-[#E2E0D8] hover:border-[#000000]'
                      }`}
                    >
                      ALL CATEGORIES ({researchTopics.length})
                    </button>
                    {PRIMARY_RESEARCH_CATEGORIES.map((cat) => {
                      const count = researchTopics.filter((t) => getParentCategory(t).toUpperCase() === cat.title).length;
                      const isSelected = selectedCategory === cat.title;
                      return (
                        <button
                          key={cat.id}
                          onClick={() => setSelectedCategory(cat.title)}
                          className={`px-3 py-1 border transition-colors cursor-pointer flex items-center gap-1.5 ${
                            isSelected
                              ? 'bg-[#FF0000] text-[#FFFFFF] border-[#FF0000] font-bold'
                              : 'bg-[#FFFFFF] text-[#000000] border-[#E2E0D8] hover:border-[#000000]'
                          }`}
                        >
                          <span className={isSelected ? 'text-[#FFFFFF]' : 'text-[#FF0000]'}>{cat.num}.</span>
                          <span>{cat.title}</span>
                          <span className="text-[10px] opacity-75">({count})</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Secondary Filters: Difficulty, Status, Sorting */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 border-t border-[#E2E0D8] font-mono text-xs">
                  
                  {/* Difficulty Filter */}
                  <div className="space-y-1">
                    <span className="text-[10px] text-[#555555] uppercase block font-bold">DIFFICULTY LEVEL</span>
                    <select
                      value={selectedDifficulty}
                      onChange={(e) => setSelectedDifficulty(e.target.value)}
                      className="w-full bg-[#FFFFFF] border border-[#E2E0D8] p-1.5 text-xs text-[#000000] outline-none"
                    >
                      {RESEARCH_DIFFICULTIES.map((d) => (
                        <option key={d} value={d}>{d === 'ALL' ? 'ALL DIFFICULTIES' : d}</option>
                      ))}
                    </select>
                  </div>

                  {/* Status Filter */}
                  <div className="space-y-1">
                    <span className="text-[10px] text-[#555555] uppercase block font-bold">RESEARCH STATUS</span>
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="w-full bg-[#FFFFFF] border border-[#E2E0D8] p-1.5 text-xs text-[#000000] outline-none"
                    >
                      {RESEARCH_STATUSES.map((s) => (
                        <option key={s} value={s}>{s === 'ALL' ? 'ALL STATUSES' : s}</option>
                      ))}
                    </select>
                  </div>

                  {/* Sort By */}
                  <div className="space-y-1">
                    <span className="text-[10px] text-[#555555] uppercase block font-bold">SORT ARCHIVE</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full bg-[#FFFFFF] border border-[#E2E0D8] p-1.5 text-xs text-[#000000] outline-none"
                    >
                      <option value="progress">RESEARCH COMPLETION</option>
                      <option value="updated">LAST UPDATED (2026)</option>
                      <option value="newest">NEWEST ADDITIONS</option>
                      <option value="difficulty">TECHNICAL COMPLEXITY</option>
                    </select>
                  </div>

                </div>

                {/* Active Filter Clear Bar */}
                {hasActiveFilters && (
                  <div className="flex items-center justify-between pt-2 border-t border-[#E2E0D8] text-[11px] font-mono">
                    <span className="text-[#555555]">
                      FOUND {filteredTopics.length} INVESTIGATIONS MATCHING CRITERIA
                    </span>
                    <button
                      onClick={resetFilters}
                      className="text-[#FF0000] hover:underline font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <X size={12} />
                      <span>RESET ALL FILTERS</span>
                    </button>
                  </div>
                )}

              </div>

              {/* Research Topic Cards Grid */}
              {filteredTopics.length === 0 ? (
                <div className="bg-[#FAF9F5] border border-[#E2E0D8] p-12 text-center space-y-4">
                  <div className="font-mono text-xs text-[#FF0000] font-bold uppercase tracking-wider">
                    NO TECHNICAL PAPERS MATCH QUERY
                  </div>
                  <p className="text-sm text-[#555555] max-w-md mx-auto">
                    Try broadening your search term or resetting your filter criteria.
                  </p>
                  <button
                    onClick={resetFilters}
                    className="px-4 py-2 bg-[#000000] text-[#FFFFFF] font-mono text-xs font-bold uppercase"
                  >
                    RESET FILTERS
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {filteredTopics.map((topic) => {
                    const parentCat = getParentCategory(topic);
                    return (
                      <article
                        key={topic.id}
                        className="bg-[#FAF9F5] border border-[#E2E0D8] hover:border-[#000000] p-6 flex flex-col justify-between transition-all group shadow-xs"
                      >
                        <div className="space-y-4">
                          
                          {/* Card Top Row: ID, Category, Badge & Reading Time */}
                          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E2E0D8] pb-3 text-xs font-mono">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-[#FF0000] tracking-wider">{topic.id}</span>
                              <span className="text-[#E2E0D8]">/</span>
                              <span className="text-[#555555] uppercase text-[10px]">{parentCat}</span>
                            </div>

                            <div className="flex items-center gap-2">
                              {getStatusBadge(topic.status)}
                              <span className="text-[#555555] text-[10px]">{topic.readingTime || '20 min'}</span>
                            </div>
                          </div>

                          {/* Paper Title & Subtitle */}
                          <div className="space-y-1.5">
                            <Link
                              to={`/research/${topic.slug}`}
                              className="block font-sans font-black text-xl sm:text-2xl text-[#000000] uppercase tracking-tight group-hover:text-[#FF0000] transition-colors leading-tight"
                            >
                              {topic.title}
                            </Link>
                            <p className="font-mono text-xs text-[#555555] leading-normal font-semibold">
                              {topic.subtitle}
                            </p>
                          </div>

                          {/* Abstract Excerpt */}
                          <p className="text-xs text-[#444444] leading-relaxed line-clamp-3">
                            {topic.abstract}
                          </p>

                          {/* Key Concepts Tags */}
                          {topic.keyConcepts && topic.keyConcepts.length > 0 && (
                            <div className="space-y-1.5 pt-2 border-t border-[#E2E0D8]">
                              <span className="text-[9px] font-mono text-[#555555] font-bold uppercase block">
                                CORE MECHANISMS:
                              </span>
                              <div className="flex flex-wrap gap-1.5">
                                {topic.keyConcepts.slice(0, 5).map((concept, idx) => (
                                  <span
                                    key={idx}
                                    className="bg-[#FFFFFF] border border-[#E2E0D8] px-2 py-0.5 text-[10px] font-mono text-[#000000]"
                                  >
                                    {concept}
                                  </span>
                                ))}
                                {topic.keyConcepts.length > 5 && (
                                  <span className="text-[10px] font-mono text-[#555555] self-center">
                                    +{topic.keyConcepts.length - 5} more
                                  </span>
                                )}
                              </div>
                            </div>
                          )}

                        </div>

                        {/* Card Footer: Metadata & Action CTA */}
                        <div className="pt-6 mt-6 border-t border-[#E2E0D8] flex items-center justify-between text-xs font-mono">
                          <div className="flex items-center gap-3 text-[10px] text-[#555555]">
                            <span>DIFF: <strong className="text-[#000000]">{topic.difficulty}</strong></span>
                            <span>UPDATED: <strong className="text-[#000000]">{topic.lastUpdated}</strong></span>
                          </div>

                          <Link
                            to={`/research/${topic.slug}`}
                            className="inline-flex items-center gap-1.5 font-bold text-[#FF0000] group-hover:text-[#000000] group-hover:translate-x-1 transition-all"
                          >
                            <span>READ INVESTIGATION</span>
                            <span>→</span>
                          </Link>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}

            </div>
          )}

        </div>
      </section>

      {/* ── 08. RESEARCH FOOTER NOTE ── */}
      <footer className="py-10 px-4 sm:px-6 md:px-12 bg-[#FAF9F5] border-t border-[#E2E0D8] text-xs font-mono text-[#555555]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FF0000]" />
            <span className="font-bold text-[#000000]">REUBG DEV RESEARCH ARCHIVE</span>
            <span>—</span>
            <span>OPEN PEER-REVIEWED SPECIFICATION</span>
          </div>
          <div>
            SOURCE: <a href="https://reubg.in" className="hover:text-[#FF0000] underline font-bold">reubg.in</a> // PROD_2026
          </div>
        </div>
      </footer>

    </div>
  );
}
