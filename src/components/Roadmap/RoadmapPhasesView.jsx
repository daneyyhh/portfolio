import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  ChevronUp,
  Layers,
  CheckCircle2,
  AlertTriangle,
  Code2,
  ExternalLink,
  Target,
  Wrench,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import RoadmapDiagrams from './RoadmapDiagrams';

export default function RoadmapPhasesView({ phases = [], activePhaseId, onSelectPhase }) {
  const [expandedPhaseId, setExpandedPhaseId] = useState(activePhaseId || '01');
  const [activeSubTab, setActiveSubTab] = useState('concepts'); // 'overview' | 'concepts' | 'tools-patterns' | 'exercises-project' | 'mistakes-exit'

  const selectedPhase = phases.find((p) => p.phase === expandedPhaseId) || phases[0];

  const handleTogglePhase = (phaseId) => {
    setExpandedPhaseId(phaseId);
    if (onSelectPhase) onSelectPhase(phaseId);
  };

  // Determine which diagram to render based on phase
  const getDiagramForPhase = (phaseId) => {
    switch (phaseId) {
      case '01':
        return <RoadmapDiagrams diagramType="request-response" />;
      case '02':
        return <RoadmapDiagrams diagramType="event-loop" />;
      case '03':
        return <RoadmapDiagrams diagramType="backend-lifecycle" />;
      case '04':
        return <RoadmapDiagrams diagramType="request-response" />;
      case '05':
        return <RoadmapDiagrams diagramType="fullstack-architecture" />;
      case '06':
        return <RoadmapDiagrams diagramType="backend-lifecycle" />;
      case '07':
        return <RoadmapDiagrams diagramType="cicd" />;
      case '08':
        return <RoadmapDiagrams diagramType="fullstack-architecture" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8 font-mono text-[#111111]">
      {/* ── 01. COMPACT PHASES OVERVIEW GRID (8 PHASES) ── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between border-b border-[#C9C7C0] pb-2 text-xs">
          <span className="font-bold uppercase tracking-wider text-[#111111] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF1E27]" />
            PHASE SELECTOR // 08 PROGRESSIVE MODULES
          </span>
          <span className="text-[10px] text-[#666660] uppercase">
            Click any phase to expand full syllabus
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {phases.map((p) => {
            const isSelected = expandedPhaseId === p.phase;
            return (
              <button
                key={p.phase}
                type="button"
                onClick={() => handleTogglePhase(p.phase)}
                className={`p-4 text-left border transition-all duration-150 flex flex-col justify-between h-44 ${
                  isSelected
                    ? 'bg-[#111111] text-[#FFFFFF] border-[#111111] shadow-md ring-1 ring-[#FF1E27]'
                    : 'bg-[#FAF9F5] text-[#111111] border-[#C9C7C0] hover:border-[#111111] hover:bg-[#FFFFFF]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-extrabold ${
                        isSelected ? 'text-[#FF1E27]' : 'text-[#888880]'
                      }`}
                    >
                      PHASE {p.phase}
                    </span>
                    <span
                      className={`text-[9px] uppercase px-1.5 py-0.5 border ${
                        isSelected
                          ? 'border-white/30 text-white/80'
                          : 'border-[#C9C7C0] text-[#555550]'
                      }`}
                    >
                      {p.timeline}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm tracking-tight mt-2 uppercase line-clamp-2">
                    {p.title}
                  </h3>
                </div>

                <div className="pt-2 border-t border-current/20 flex items-center justify-between text-[10px]">
                  <span className="uppercase opacity-80 truncate">{p.category}</span>
                  <span className={`font-bold flex items-center gap-1 ${isSelected ? 'text-[#FF1E27]' : 'text-[#111111]'}`}>
                    {isSelected ? 'ACTIVE' : 'EXPAND'} →
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── 02. ACTIVE EXPANDED PHASE DEEP-DIVE SYLLABUS ── */}
      <div className="border border-[#111111] bg-[#FFFFFF] shadow-sm">
        {/* Phase Header Banner */}
        <div className="bg-[#111111] text-[#FFFFFF] p-5 sm:p-7 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF1E27]" />
              <span className="font-extrabold text-[#FF1E27] uppercase tracking-widest">
                PHASE {selectedPhase.phase} // {selectedPhase.category}
              </span>
              <span className="text-white/40">•</span>
              <span className="text-white/70 uppercase">{selectedPhase.timeline}</span>
            </div>
            <div className="text-[10px] text-white/60 uppercase">
              STATUS: SYLLABUS UNLOCKED
            </div>
          </div>

          <h2 className="text-xl sm:text-3xl font-extrabold uppercase tracking-tight text-white">
            {selectedPhase.title}
          </h2>

          <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-sans max-w-4xl">
            {selectedPhase.subtitle}
          </p>
        </div>

        {/* Phase Sub-Navigation Tabs */}
        <div className="flex flex-wrap border-b border-[#C9C7C0] bg-[#FAF9F5] text-xs">
          {[
            { id: 'concepts', label: '1. CORE CONCEPTS (A-E)' },
            { id: 'diagram', label: '2. ARCHITECTURE DIAGRAM' },
            { id: 'tools-patterns', label: '3. TOOLS & PATTERNS' },
            { id: 'exercises-project', label: '4. EXERCISES & PROJECT' },
            { id: 'mistakes-exit', label: '5. MISTAKES & EXIT CRITERIA' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveSubTab(tab.id)}
              className={`px-4 py-3 font-bold border-r border-[#C9C7C0] transition-colors ${
                activeSubTab === tab.id
                  ? 'bg-[#FFFFFF] text-[#FF1E27] border-b-2 border-b-[#FF1E27]'
                  : 'text-[#444440] hover:text-[#000000] hover:bg-[#FFFFFF]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content Display */}
        <div className="p-5 sm:p-8 space-y-6">
          {/* TAB 1: CORE CONCEPTS (SECTIONS A-E) */}
          {activeSubTab === 'concepts' && (
            <div className="space-y-6">
              {/* Purpose & Prerequisites Banner */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 bg-[#FAF9F5] border border-[#C9C7C0] text-xs">
                <div className="md:col-span-8 space-y-1">
                  <span className="font-bold text-[#FF1E27] uppercase text-[10px] block">
                    PURPOSE // WHY THIS PHASE MATTERS
                  </span>
                  <p className="text-[#333330] leading-relaxed font-sans">
                    {selectedPhase.purpose}
                  </p>
                </div>
                <div className="md:col-span-4 space-y-1 border-t md:border-t-0 md:border-l border-[#C9C7C0] pt-2 md:pt-0 md:pl-4">
                  <span className="font-bold text-[#666660] uppercase text-[10px] block">
                    PREREQUISITES
                  </span>
                  <p className="text-[#444440] text-[11px] leading-relaxed">
                    {selectedPhase.prerequisites}
                  </p>
                </div>
              </div>

              {/* Learning Objectives List */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#111111] flex items-center gap-1.5">
                  <Target size={14} className="text-[#FF1E27]" />
                  FIVE CONCRETE LEARNING OBJECTIVES
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {selectedPhase.learningObjectives.map((obj, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-[#FFFFFF] border border-[#C9C7C0] flex items-start gap-2.5"
                    >
                      <span className="text-[#FF1E27] font-bold shrink-0">0{idx + 1}</span>
                      <span className="text-[#333330] font-sans text-xs leading-relaxed">
                        {obj}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Detailed Core Concept Subsections (A through E) */}
              <div className="space-y-4 pt-2">
                <div className="border-b border-[#C9C7C0] pb-2 text-xs font-bold uppercase tracking-wider text-[#111111]">
                  DETAILED CONCEPT SUBSECTIONS
                </div>

                <div className="space-y-4">
                  {selectedPhase.coreSections.map((sec) => (
                    <div
                      key={sec.letter}
                      className="p-4 sm:p-5 bg-[#FAF9F5] border border-[#C9C7C0] space-y-3"
                    >
                      <div className="flex items-center gap-2 border-b border-[#D0CECB] pb-2">
                        <span className="w-5 h-5 rounded-full bg-[#111111] text-[#FFFFFF] text-xs font-bold flex items-center justify-center">
                          {sec.letter}
                        </span>
                        <h4 className="font-bold text-sm uppercase text-[#000000]">
                          {sec.title}
                        </h4>
                      </div>

                      <p className="text-xs text-[#555550] italic font-sans">
                        {sec.summary}
                      </p>

                      <div className="space-y-3 pt-1">
                        {sec.topics.map((t, tidx) => (
                          <div key={tidx} className="p-3 bg-[#FFFFFF] border border-[#D0CECB] space-y-1">
                            <span className="font-bold text-xs text-[#111111] block">
                              • {t.name}
                            </span>
                            <p className="text-xs text-[#444440] font-sans leading-relaxed">
                              {t.explanation}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ARCHITECTURE DIAGRAM */}
          {activeSubTab === 'diagram' && (
            <div className="space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-[#111111] flex items-center gap-2">
                <Layers size={14} className="text-[#FF1E27]" />
                ARCHITECTURAL EXECUTION DIAGRAM // PHASE {selectedPhase.phase}
              </div>
              {getDiagramForPhase(selectedPhase.phase)}
            </div>
          )}

          {/* TAB 3: TOOLS & PATTERNS */}
          {activeSubTab === 'tools-patterns' && (
            <div className="space-y-6">
              {/* Tools Matrix */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#111111] flex items-center gap-1.5">
                  <Wrench size={14} className="text-[#FF1E27]" />
                  RECOMMENDED TOOLS & DEVELOPMENT ENVIRONMENTS
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {selectedPhase.tools.map((t, idx) => (
                    <div key={idx} className="p-3 bg-[#FAF9F5] border border-[#C9C7C0] space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#000000]">{t.name}</span>
                        <span className="text-[10px] text-[#FF1E27] font-bold uppercase">TOOL {idx + 1}</span>
                      </div>
                      <p className="text-[11px] text-[#555550] font-sans">{t.role}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Patterns Matrix */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#111111] flex items-center gap-1.5">
                  <Code2 size={14} className="text-[#FF1E27]" />
                  ARCHITECTURAL PATTERNS & REUSABLE PRINCIPLES
                </span>
                <div className="space-y-2 text-xs">
                  {selectedPhase.patterns.map((pat, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-[#FFFFFF] border-l-2 border-l-[#111111] border border-[#C9C7C0] flex items-start gap-2 text-xs text-[#333330]"
                    >
                      <span className="text-[#FF1E27] font-bold">✓</span>
                      <span className="font-sans leading-relaxed">{pat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: EXERCISES & PROJECT */}
          {activeSubTab === 'exercises-project' && (
            <div className="space-y-6">
              {/* Hands-on Exercises */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#111111] flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-[#FF1E27]" />
                  PRACTICAL EXERCISES TO REINFORCE CONCEPTS
                </span>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  {selectedPhase.exercises.map((ex, idx) => (
                    <div key={idx} className="p-4 bg-[#FAF9F5] border border-[#C9C7C0] space-y-2 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] text-[#FF1E27] font-bold block uppercase">
                          EXERCISE 0{idx + 1}
                        </span>
                        <span className="font-bold text-xs text-[#000000] block mt-1">
                          {ex.title}
                        </span>
                        <p className="text-[11px] text-[#555550] font-sans mt-2 leading-relaxed">
                          {ex.task}
                        </p>
                      </div>
                      <span className="text-[10px] text-[#888880] uppercase tracking-wider block pt-2 border-t border-[#D0CECB]">
                        UNTIMED PRACTICE
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tangible Project Milestone */}
              <div className="p-5 bg-[#FAF9F5] border-2 border-[#111111] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#FF1E27] uppercase tracking-wider">
                    PHASE {selectedPhase.phase} PROJECT MILESTONE // SOMETHING TANGIBLE TO BUILD
                  </span>
                  <span className="text-[10px] bg-[#111111] text-[#FFFFFF] px-2 py-0.5 uppercase font-bold">
                    PORTFOLIO WORTHY
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#000000] uppercase">
                  {selectedPhase.project.title}
                </h3>
                <p className="text-xs text-[#444440] font-sans leading-relaxed">
                  {selectedPhase.project.description}
                </p>
              </div>
            </div>
          )}

          {/* TAB 5: MISTAKES & EXIT CRITERIA */}
          {activeSubTab === 'mistakes-exit' && (
            <div className="space-y-6">
              {/* Common Mistakes & Anti-Patterns */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#FF1E27] flex items-center gap-1.5">
                  <AlertTriangle size={14} className="text-[#FF1E27]" />
                  COMMON MISTAKES & ANTI-PATTERNS (WHAT TO AVOID & WHY)
                </span>
                <div className="space-y-2 text-xs">
                  {selectedPhase.commonMistakes.map((mis, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-[#FFF5F5] border-l-2 border-l-[#FF1E27] border border-[#FFD0D0] flex items-start gap-2.5 text-xs text-[#333330]"
                    >
                      <span className="text-[#FF1E27] font-bold">✕</span>
                      <span className="font-sans leading-relaxed">{mis}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Official Documentation References */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#111111] flex items-center gap-1.5">
                  <BookOpen size={14} className="text-[#FF1E27]" />
                  OFFICIAL DOCUMENTATION & REFERENCES
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {selectedPhase.documentation.map((doc, idx) => (
                    <a
                      key={idx}
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-[#FFFFFF] border border-[#C9C7C0] hover:border-[#111111] hover:bg-[#FAF9F5] transition-all flex items-center justify-between group"
                    >
                      <span className="font-bold text-xs text-[#111111] truncate">{doc.name}</span>
                      <ExternalLink size={12} className="text-[#888880] group-hover:text-[#FF1E27] shrink-0" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Exit Criteria Checklist Box */}
              <div className="p-4 bg-[#111111] text-[#FFFFFF] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#FF1E27] uppercase tracking-wider">
                    EXIT CRITERIA // EVIDENCE OF READINESS FOR NEXT PHASE
                  </span>
                  <span className="text-[10px] text-white/60 uppercase">VERIFICATION STANDARD</span>
                </div>
                <p className="text-xs text-white/90 font-sans leading-relaxed">
                  {selectedPhase.exitCriteria}
                </p>
              </div>
            </div>
          )}

          {/* Bottom Footer: The 5 Questions Framework Banner */}
          <div className="pt-4 border-t border-[#C9C7C0] flex flex-wrap items-center justify-between gap-3 text-[11px] text-[#666660]">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-bold text-[#111111] uppercase">MASTERY BENCHMARK:</span>
              <span className="px-1.5 py-0.5 bg-[#FAF9F5] border border-[#C9C7C0]">1. What is it?</span>
              <span className="px-1.5 py-0.5 bg-[#FAF9F5] border border-[#C9C7C0]">2. Why does it matter?</span>
              <span className="px-1.5 py-0.5 bg-[#FAF9F5] border border-[#C9C7C0]">3. How does it work?</span>
              <span className="px-1.5 py-0.5 bg-[#FAF9F5] border border-[#C9C7C0]">4. How do I practise?</span>
              <span className="px-1.5 py-0.5 bg-[#FAF9F5] border border-[#C9C7C0]">5. How do I know I understand?</span>
            </div>
            <button
              type="button"
              onClick={() => {
                const currentIndex = phases.findIndex((p) => p.phase === selectedPhase.phase);
                const nextPhase = phases[(currentIndex + 1) % phases.length];
                handleTogglePhase(nextPhase.phase);
              }}
              className="font-bold text-[#FF1E27] hover:underline uppercase flex items-center gap-1"
            >
              NEXT PHASE →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
