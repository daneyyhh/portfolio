import React, { useState } from 'react';
import { patternCategories, patternsData } from '../../data/roadmap/roadmapPatternsData';
import { Search, Code2, AlertTriangle, CheckCircle2, XCircle, ArrowUpRight } from 'lucide-react';

export default function RoadmapPatternsView() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedPatternId, setExpandedPatternId] = useState(null);

  const filteredPatterns = patternsData.filter((pat) => {
    const matchesCategory = selectedCategory === 'all' || pat.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      pat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pat.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pat.problem.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8 font-mono text-[#111111]">
      {/* ── 01. SECTION INTRO ── */}
      <div className="p-5 sm:p-6 bg-[#FAF9F5] border border-[#C9C7C0] space-y-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#FF1E27]" />
          <span className="text-xs font-bold text-[#FF1E27] uppercase tracking-wider">
            REUSABLE ARCHITECTURAL BLUEPRINTS
          </span>
        </div>
        <h3 className="text-xl sm:text-2xl font-extrabold text-[#000000] uppercase tracking-tight">
          ENGINEERING PATTERNS LIBRARY (29 PATTERNS)
        </h3>
        <p className="text-xs sm:text-sm text-[#444440] font-sans leading-relaxed max-w-3xl">
          Patterns are reusable approaches to recurring engineering challenges, not rigid rules to be forced everywhere. For every pattern, analyze the problem, the core mechanism, its concrete trade-offs, and critical anti-pattern misuses.
        </p>
      </div>

      {/* ── 02. CATEGORY FILTERS & SEARCH BAR ── */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-b border-[#C9C7C0] pb-4">
        {/* Category Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 border font-bold transition-all ${
              selectedCategory === 'all'
                ? 'bg-[#111111] text-[#FFFFFF] border-[#111111]'
                : 'bg-[#FAF9F5] text-[#444440] border-[#C9C7C0] hover:border-[#111111]'
            }`}
          >
            ALL PATTERNS ({patternsData.length})
          </button>
          {patternCategories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 border font-bold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#111111] text-[#FFFFFF] border-[#111111]'
                  : 'bg-[#FAF9F5] text-[#444440] border-[#C9C7C0] hover:border-[#111111]'
              }`}
            >
              {cat.label} ({cat.count})
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[220px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#888880]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search patterns..."
            className="w-full pl-8 pr-3 py-1.5 bg-[#FFFFFF] border border-[#C9C7C0] text-xs font-mono text-[#111111] placeholder-[#888880] focus:outline-none focus:border-[#111111]"
          />
        </div>
      </div>

      {/* ── 03. PATTERNS CATALOG LIST ── */}
      <div className="space-y-4">
        {filteredPatterns.length === 0 ? (
          <div className="p-12 text-center border border-[#C9C7C0] bg-[#FAF9F5] text-xs text-[#666660]">
            NO PATTERNS MATCHED YOUR SEARCH FILTER.
          </div>
        ) : (
          filteredPatterns.map((pat) => {
            const isExpanded = expandedPatternId === pat.id;
            return (
              <div
                key={pat.id}
                className="border border-[#C9C7C0] bg-[#FFFFFF] transition-all duration-150"
              >
                {/* Header Row */}
                <div
                  onClick={() => setExpandedPatternId(isExpanded ? null : pat.id)}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer hover:bg-[#FAF9F5]"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[10px]">
                      <span className="font-bold text-[#FF1E27] uppercase tracking-wider">
                        {pat.category.toUpperCase()} PATTERN
                      </span>
                      <span className="text-[#888880]">•</span>
                      <span className="text-[#666660] uppercase">{pat.tagline}</span>
                    </div>
                    <h4 className="text-base sm:text-lg font-bold text-[#000000] uppercase tracking-tight">
                      {pat.name}
                    </h4>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs font-bold uppercase text-[#111111]">
                      {isExpanded ? 'COLLAPSE' : 'INSPECT BLUEPRINT'}
                    </span>
                    <span className="text-sm font-bold">{isExpanded ? '−' : '+'}</span>
                  </div>
                </div>

                {/* Expanded Deep-Dive Details */}
                {isExpanded && (
                  <div className="border-t border-[#C9C7C0] p-5 sm:p-7 space-y-6 bg-[#FAF9F5]">
                    {/* Problem & Basic Idea */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div className="p-4 bg-[#FFF5F5] border-l-2 border-l-[#FF1E27] border border-[#FFD0D0] space-y-1.5">
                        <span className="font-bold text-[#FF1E27] uppercase block text-[10px]">
                          THE PROBLEM
                        </span>
                        <p className="text-[#333330] font-sans leading-relaxed">
                          {pat.problem}
                        </p>
                      </div>

                      <div className="p-4 bg-[#FFFFFF] border-l-2 border-l-[#111111] border border-[#C9C7C0] space-y-1.5">
                        <span className="font-bold text-[#111111] uppercase block text-[10px]">
                          THE BASIC IDEA
                        </span>
                        <p className="text-[#333330] font-sans leading-relaxed">
                          {pat.basicIdea}
                        </p>
                      </div>
                    </div>

                    {/* Code or Architecture Snippet */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-[10px] text-[#666660] uppercase font-bold">
                        <span>CODE IMPLEMENTATION EXAMPLE</span>
                        <span>JAVASCRIPT / TYPESCRIPT</span>
                      </div>
                      <pre className="p-4 bg-[#111111] text-[#E0DFD8] text-xs font-mono overflow-x-auto leading-relaxed border border-[#333333]">
                        <code>{pat.example}</code>
                      </pre>
                    </div>

                    {/* Advantages & Trade-Offs Matrix */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      {/* Advantages */}
                      <div className="p-4 bg-[#FFFFFF] border border-[#C9C7C0] space-y-2">
                        <span className="font-bold text-[#228B22] uppercase tracking-wider block text-[10px] flex items-center gap-1.5">
                          <CheckCircle2 size={13} />
                          ADVANTAGES
                        </span>
                        <ul className="space-y-1.5 text-[#333330] font-sans">
                          {pat.advantages.map((adv, aidx) => (
                            <li key={aidx} className="flex items-start gap-1.5">
                              <span className="text-[#228B22] font-bold">✓</span>
                              <span>{adv}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Trade-Offs */}
                      <div className="p-4 bg-[#FFFFFF] border border-[#C9C7C0] space-y-2">
                        <span className="font-bold text-[#FF1E27] uppercase tracking-wider block text-[10px] flex items-center gap-1.5">
                          <XCircle size={13} />
                          TRADE-OFFS & COSTS
                        </span>
                        <ul className="space-y-1.5 text-[#333330] font-sans">
                          {pat.tradeoffs.map((tro, tidx) => (
                            <li key={tidx} className="flex items-start gap-1.5">
                              <span className="text-[#FF1E27] font-bold">✕</span>
                              <span>{tro}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* When to Use vs When NOT to Use & Common Misuse */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                      <div className="p-3 bg-[#FFFFFF] border border-[#C9C7C0] space-y-1">
                        <span className="font-bold text-[#000000] uppercase block text-[10px]">
                          WHEN TO USE IT
                        </span>
                        <p className="text-[#444440] font-sans leading-relaxed text-[11px]">
                          {pat.whenToUse}
                        </p>
                      </div>

                      <div className="p-3 bg-[#FFFFFF] border border-[#C9C7C0] space-y-1">
                        <span className="font-bold text-[#888880] uppercase block text-[10px]">
                          WHEN NOT TO USE IT
                        </span>
                        <p className="text-[#444440] font-sans leading-relaxed text-[11px]">
                          {pat.whenNotToUse}
                        </p>
                      </div>

                      <div className="p-3 bg-[#FFF5F5] border border-[#FFD0D0] space-y-1">
                        <span className="font-bold text-[#FF1E27] uppercase block text-[10px]">
                          COMMON MISUSE WARNING
                        </span>
                        <p className="text-[#444440] font-sans leading-relaxed text-[11px]">
                          {pat.commonMisuse}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
