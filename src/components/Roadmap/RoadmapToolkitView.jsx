import React, { useState } from 'react';
import { toolkitCategories, toolkitData } from '../../data/roadmap/roadmapToolkitData';
import { Wrench, CheckCircle2, Search, Filter, ShieldCheck, Sparkles } from 'lucide-react';

export default function RoadmapToolkitView() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all'); // 'all' | 'Essential' | 'Optional'
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTools = toolkitData.filter((t) => {
    const matchesCategory = selectedCategory === 'all' || t.category === selectedCategory;
    const matchesStatus = filterStatus === 'all' || t.status === filterStatus;
    const matchesSearch =
      searchQuery === '' ||
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.whatItDoes.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.problemSolved.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-8 font-mono text-[#111111]">
      {/* ── 01. SECTION INTRO ── */}
      <div className="p-5 sm:p-6 bg-[#FAF9F5] border border-[#C9C7C0] space-y-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#FF1E27]" />
          <span className="text-xs font-bold text-[#FF1E27] uppercase tracking-wider">
            ESSENTIAL & COMPLEMENTARY TOOLING
          </span>
        </div>
        <h3 className="text-xl sm:text-2xl font-extrabold text-[#000000] uppercase tracking-tight">
          THE DEVELOPER TOOLKIT ({toolkitData.length} TOOLS)
        </h3>
        <p className="text-xs sm:text-sm text-[#444440] font-sans leading-relaxed max-w-3xl">
          A craftsman is defined by how well they know their tools, not how many logos they accumulate. Every tool here is mapped to the concrete problem it solves, when you should reach for it, and whether it is foundational or optional.
        </p>
      </div>

      {/* ── 02. CATEGORY FILTERS & SEARCH ── */}
      <div className="flex flex-col gap-3 border-b border-[#C9C7C0] pb-4">
        {/* Category Pills */}
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
            ALL CATEGORIES ({toolkitData.length})
          </button>
          {toolkitCategories.map((cat) => (
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
              {cat.name}
            </button>
          ))}
        </div>

        {/* Secondary Filter: Essential vs Optional + Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-[10px] text-[#666660] uppercase font-bold mr-1">STATUS:</span>
            {['all', 'Essential', 'Optional'].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setFilterStatus(st)}
                className={`px-2.5 py-1 text-[11px] border uppercase transition-all ${
                  filterStatus === st
                    ? 'bg-[#111111] text-[#FFFFFF] border-[#111111] font-bold'
                    : 'bg-[#FFFFFF] text-[#555550] border-[#C9C7C0] hover:border-[#111111]'
                }`}
              >
                {st === 'all' ? 'All Tiers' : st}
              </button>
            ))}
          </div>

          <div className="relative min-w-[220px]">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#888880]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter tools..."
              className="w-full pl-8 pr-3 py-1.5 bg-[#FFFFFF] border border-[#C9C7C0] text-xs font-mono text-[#111111] placeholder-[#888880] focus:outline-none focus:border-[#111111]"
            />
          </div>
        </div>
      </div>

      {/* ── 03. TOOLKIT GRID CARDS ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTools.length === 0 ? (
          <div className="col-span-full p-12 text-center border border-[#C9C7C0] bg-[#FAF9F5] text-xs text-[#666660]">
            NO TOOLS MATCHED THE SELECTED CRITERIA.
          </div>
        ) : (
          filteredTools.map((tool, idx) => (
            <div
              key={idx}
              className="p-5 bg-[#FFFFFF] border border-[#C9C7C0] flex flex-col justify-between space-y-4 hover:border-[#111111] transition-all"
            >
              <div className="space-y-3">
                {/* Header: Name + Badges */}
                <div className="flex items-start justify-between gap-2 border-b border-[#D0CECB] pb-3">
                  <div>
                    <span className="text-[10px] text-[#FF1E27] uppercase font-bold block">
                      PHASE {tool.phase} // {tool.phaseName}
                    </span>
                    <h4 className="font-bold text-base text-[#000000] uppercase mt-0.5">
                      {tool.name}
                    </h4>
                  </div>
                  <span
                    className={`text-[9px] uppercase px-2 py-0.5 font-bold border shrink-0 ${
                      tool.status === 'Essential'
                        ? 'bg-[#111111] text-[#FFFFFF] border-[#111111]'
                        : 'bg-[#FAF9F5] text-[#555550] border-[#C9C7C0]'
                    }`}
                  >
                    {tool.status}
                  </span>
                </div>

                {/* What it Does */}
                <div className="space-y-1">
                  <span className="text-[10px] text-[#888880] uppercase font-bold block">
                    FUNCTION // WHAT IT DOES
                  </span>
                  <p className="text-xs text-[#333330] font-sans leading-relaxed">
                    {tool.whatItDoes}
                  </p>
                </div>

                {/* Problem it Solves */}
                <div className="space-y-1">
                  <span className="text-[10px] text-[#888880] uppercase font-bold block">
                    UTILITY // PROBLEM SOLVED
                  </span>
                  <p className="text-xs text-[#444440] font-sans leading-relaxed">
                    {tool.problemSolved}
                  </p>
                </div>

                {/* When to Reach for it */}
                <div className="space-y-1">
                  <span className="text-[10px] text-[#888880] uppercase font-bold block">
                    CONTEXT // WHEN TO USE IT
                  </span>
                  <p className="text-[11px] text-[#555550] font-sans leading-relaxed">
                    {tool.whenToUse}
                  </p>
                </div>
              </div>

              {/* Footer Pro-Tip */}
              {tool.proTip && (
                <div className="p-2.5 bg-[#FAF9F5] border-l-2 border-l-[#111111] border border-[#D0CECB] text-[10px] text-[#333330] font-sans">
                  <strong className="text-[#000000] font-mono">PRO TIP:</strong> {tool.proTip}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
