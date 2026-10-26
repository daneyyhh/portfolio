import React, { useState } from 'react';
import { learningResources, documentationGuideSteps } from '../../data/roadmap/roadmapResourcesData';
import { BookOpen, ExternalLink, Search, CheckCircle2, Compass, Layers } from 'lucide-react';

export default function RoadmapResourcesView() {
  const [selectedPhaseFilter, setSelectedPhaseFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredResources = learningResources.filter((res) => {
    const matchesPhase =
      selectedPhaseFilter === 'all' || res.phases.includes(selectedPhaseFilter);
    const matchesSearch =
      searchQuery === '' ||
      res.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.whyUseful.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPhase && matchesSearch;
  });

  return (
    <div className="space-y-8 font-mono text-[#111111]">
      {/* ── 01. SECTION INTRO ── */}
      <div className="p-5 sm:p-6 bg-[#FAF9F5] border border-[#C9C7C0] space-y-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#FF1E27]" />
          <span className="text-xs font-bold text-[#FF1E27] uppercase tracking-wider">
            AUTHORITATIVE REFERENCES & OFFICIAL DOCUMENTATION
          </span>
        </div>
        <h3 className="text-xl sm:text-2xl font-extrabold text-[#000000] uppercase tracking-tight">
          PRIMARY SOURCES & THE DOCUMENTATION STUDY METHOD
        </h3>
        <p className="text-xs sm:text-sm text-[#444440] font-sans leading-relaxed max-w-3xl">
          High-performing software engineers read documentation directly from specification authors rather than relying on hearsay or third-party regurgitations. Treat video courses as secondary intuition builders; build software against primary docs.
        </p>
      </div>

      {/* ── 02. THE 7-STEP GUIDE TO READING OFFICIAL DOCUMENTATION ── */}
      <div className="p-5 sm:p-6 bg-[#FFFFFF] border border-[#111111] space-y-4">
        <div className="flex items-center justify-between border-b border-[#C9C7C0] pb-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FF1E27]" />
            <span className="font-bold uppercase tracking-wider text-[#000000]">
              THE 7-STEP METHOD TO READING OFFICIAL DOCUMENTATION
            </span>
          </div>
          <span className="text-[10px] text-[#666660] uppercase">
            Best Practice Study Guide
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {documentationGuideSteps.map((step) => (
            <div
              key={step.step}
              className="p-3 bg-[#FAF9F5] border border-[#C9C7C0] space-y-1.5 flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] text-[#FF1E27] font-bold block uppercase">
                  STEP {step.step}
                </span>
                <span className="font-bold text-xs text-[#000000] block mt-0.5 uppercase">
                  {step.title}
                </span>
                <p className="text-[11px] text-[#555550] font-sans mt-1.5 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 03. FILTER & SEARCH BAR ── */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-b border-[#C9C7C0] pb-4">
        {/* Phase Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <button
            type="button"
            onClick={() => setSelectedPhaseFilter('all')}
            className={`px-3 py-1.5 border font-bold transition-all ${
              selectedPhaseFilter === 'all'
                ? 'bg-[#111111] text-[#FFFFFF] border-[#111111]'
                : 'bg-[#FAF9F5] text-[#444440] border-[#C9C7C0] hover:border-[#111111]'
            }`}
          >
            ALL PHASES
          </button>
          {['01', '02', '03', '04', '05', '06', '07', '08'].map((ph) => (
            <button
              key={ph}
              type="button"
              onClick={() => setSelectedPhaseFilter(ph)}
              className={`px-2.5 py-1.5 border text-xs transition-all ${
                selectedPhaseFilter === ph
                  ? 'bg-[#111111] text-[#FFFFFF] border-[#111111] font-bold'
                  : 'bg-[#FAF9F5] text-[#444440] border-[#C9C7C0] hover:border-[#111111]'
              }`}
            >
              PH {ph}
            </button>
          ))}
        </div>

        {/* Search Field */}
        <div className="relative min-w-[220px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#888880]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search documentation..."
            className="w-full pl-8 pr-3 py-1.5 bg-[#FFFFFF] border border-[#C9C7C0] text-xs font-mono text-[#111111] placeholder-[#888880] focus:outline-none focus:border-[#111111]"
          />
        </div>
      </div>

      {/* ── 04. CURATED RESOURCES LIST ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredResources.length === 0 ? (
          <div className="col-span-full p-12 text-center border border-[#C9C7C0] bg-[#FAF9F5] text-xs text-[#666660]">
            NO DOCUMENTATION REFERENCES MATCHED YOUR FILTER.
          </div>
        ) : (
          filteredResources.map((res, idx) => (
            <a
              key={idx}
              href={res.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 bg-[#FFFFFF] border border-[#C9C7C0] hover:border-[#111111] hover:bg-[#FAF9F5] transition-all flex flex-col justify-between space-y-3 group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-bold text-[#FF1E27] uppercase">
                    {res.type}
                  </span>
                  <div className="flex items-center gap-1 text-[#888880]">
                    {res.phases.map((p) => (
                      <span key={p} className="px-1 border border-[#D0CECB]">
                        PH {p}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-bold text-sm text-[#000000] group-hover:text-[#FF1E27] transition-colors uppercase">
                    {res.name}
                  </h4>
                  <ExternalLink size={13} className="text-[#888880] group-hover:text-[#FF1E27] shrink-0 mt-0.5" />
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] text-[#888880] uppercase font-bold block">
                    COVERAGE
                  </span>
                  <p className="text-xs text-[#333330] font-sans leading-relaxed">
                    {res.topic}
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] text-[#888880] uppercase font-bold block">
                    WHY AUTHORITATIVE
                  </span>
                  <p className="text-xs text-[#555550] font-sans leading-relaxed">
                    {res.whyUseful}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-[#D0CECB] flex items-center justify-between text-[10px] text-[#888880] font-bold uppercase">
                <span className="truncate">{res.url.replace('https://', '')}</span>
                <span className="group-hover:text-[#FF1E27]">OPEN SOURCE ↗</span>
              </div>
            </a>
          ))
        )}
      </div>
    </div>
  );
}
