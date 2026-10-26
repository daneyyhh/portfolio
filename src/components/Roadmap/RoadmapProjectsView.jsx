import React, { useState } from 'react';
import { projectsLadder } from '../../data/roadmap/roadmapProjectsData';
import { CheckCircle2, ChevronDown, ChevronUp, Layers, Terminal, Sparkles, AlertCircle } from 'lucide-react';

export default function RoadmapProjectsView() {
  const [expandedProjectId, setExpandedProjectId] = useState('proj-01');

  return (
    <div className="space-y-8 font-mono text-[#111111]">
      {/* ── 01. SECTION INTRO ── */}
      <div className="p-5 sm:p-6 bg-[#FAF9F5] border border-[#C9C7C0] space-y-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#FF1E27]" />
          <span className="text-xs font-bold text-[#FF1E27] uppercase tracking-wider">
            HANDS-ON SYNTHESIS // THE PROJECT LADDER
          </span>
        </div>
        <h3 className="text-xl sm:text-2xl font-extrabold text-[#000000] uppercase tracking-tight">
          PRACTICAL PROJECT MILESTONES (06 PROGRESSIVE BUILDS)
        </h3>
        <p className="text-xs sm:text-sm text-[#444440] font-sans leading-relaxed max-w-3xl">
          Knowledge remains theoretical until tested against real constraints, asynchronous failure modes, and user input. The project ladder guides learners through building increasingly sophisticated applications, from semantic layouts up to distributed event-driven systems.
        </p>

        <div className="p-3 bg-[#FFF5F5] border-l-2 border-l-[#FF1E27] border border-[#FFD0D0] text-[11px] text-[#444440] font-sans mt-2">
          <strong className="font-mono text-[#000000]">NOTE:</strong> These milestones represent recommended engineering projects designed to systematically prove full-stack competencies. They are structured learning blueprints, not a claim of past completion.
        </div>
      </div>

      {/* ── 02. PROJECT LADDER ACCORDION / EXPANDABLE CARDS ── */}
      <div className="space-y-4">
        {projectsLadder.map((proj) => {
          const isExpanded = expandedProjectId === proj.id;
          return (
            <div
              key={proj.id}
              className="border border-[#C9C7C0] bg-[#FFFFFF] transition-all"
            >
              {/* Project Card Header */}
              <div
                onClick={() => setExpandedProjectId(isExpanded ? null : proj.id)}
                className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer hover:bg-[#FAF9F5]"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[10px]">
                    <span className="font-bold text-[#FF1E27] uppercase tracking-wider">
                      PROJECT {proj.num} // {proj.difficulty}
                    </span>
                    <span className="text-[#888880]">•</span>
                    <span className="text-[#666660] uppercase">{proj.tagline}</span>
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-[#000000] uppercase tracking-tight">
                    {proj.title}
                  </h4>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-bold uppercase text-[#111111]">
                    {isExpanded ? 'COLLAPSE SPEC' : 'VIEW PROJECT SPEC'}
                  </span>
                  <span className="text-sm font-bold">{isExpanded ? '−' : '+'}</span>
                </div>
              </div>

              {/* Expanded Project Blueprint Spec */}
              {isExpanded && (
                <div className="border-t border-[#C9C7C0] p-5 sm:p-8 space-y-6 bg-[#FAF9F5]">
                  {/* Problem Statement */}
                  <div className="p-4 bg-[#FFFFFF] border-l-2 border-l-[#111111] border border-[#C9C7C0] space-y-1.5">
                    <span className="font-bold text-[#111111] uppercase block text-[10px]">
                      PROBLEM STATEMENT
                    </span>
                    <p className="text-xs text-[#333330] font-sans leading-relaxed">
                      {proj.problemStatement}
                    </p>
                  </div>

                  {/* Requirements & Features Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    {/* Core Requirements */}
                    <div className="p-4 bg-[#FFFFFF] border border-[#C9C7C0] space-y-2">
                      <span className="font-bold text-[#FF1E27] uppercase tracking-wider block text-[10px]">
                        CORE ARCHITECTURAL REQUIREMENTS
                      </span>
                      <ul className="space-y-1.5 text-[#333330] font-sans">
                        {proj.requirements.map((req, ridx) => (
                          <li key={ridx} className="flex items-start gap-1.5">
                            <span className="text-[#FF1E27] font-bold">▪</span>
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Key Features */}
                    <div className="p-4 bg-[#FFFFFF] border border-[#C9C7C0] space-y-2">
                      <span className="font-bold text-[#111111] uppercase tracking-wider block text-[10px]">
                        ESSENTIAL USER FEATURES
                      </span>
                      <ul className="space-y-1.5 text-[#333330] font-sans">
                        {proj.features.map((feat, fidx) => (
                          <li key={fidx} className="flex items-start gap-1.5">
                            <span className="text-[#228B22] font-bold">✓</span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Recommended Tools & Suggested Architecture */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="p-4 bg-[#FFFFFF] border border-[#C9C7C0] space-y-2">
                      <span className="font-bold text-[#666660] uppercase tracking-wider block text-[10px]">
                        RECOMMENDED TOOLS
                      </span>
                      <ul className="space-y-1 text-[#333330]">
                        {proj.tools.map((tl, tidx) => (
                          <li key={tidx} className="text-xs">
                            • {tl}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 bg-[#FFFFFF] border border-[#C9C7C0] space-y-2">
                      <span className="font-bold text-[#666660] uppercase tracking-wider block text-[10px]">
                        SUGGESTED ARCHITECTURE
                      </span>
                      <p className="text-xs text-[#333330] font-sans leading-relaxed">
                        {proj.suggestedArchitecture}
                      </p>
                    </div>
                  </div>

                  {/* Milestones & Testing Checklist */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    {/* Development Milestones */}
                    <div className="p-4 bg-[#FFFFFF] border border-[#C9C7C0] space-y-2">
                      <span className="font-bold text-[#111111] uppercase tracking-wider block text-[10px]">
                        DEVELOPMENT SPRINT MILESTONES
                      </span>
                      <div className="space-y-1.5 text-[#333330] font-sans">
                        {proj.milestones.map((m, midx) => (
                          <div key={midx} className="text-xs leading-relaxed">
                            {m}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Testing Checklist */}
                    <div className="p-4 bg-[#FFFFFF] border border-[#C9C7C0] space-y-2">
                      <span className="font-bold text-[#228B22] uppercase tracking-wider block text-[10px]">
                        VERIFICATION & TESTING CHECKLIST
                      </span>
                      <div className="space-y-1.5 text-[#333330] font-sans">
                        {proj.testingChecklist.map((t, tidx) => (
                          <div key={tidx} className="flex items-start gap-1.5 text-xs">
                            <span className="text-[#228B22] font-bold">✓</span>
                            <span>{t}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Deployment Expectations & Completion Criteria */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="p-3 bg-[#FFFFFF] border border-[#C9C7C0] space-y-1">
                      <span className="font-bold text-[#888880] uppercase block text-[10px]">
                        DEPLOYMENT EXPECTATIONS
                      </span>
                      <p className="text-[#444440] font-sans text-[11px] leading-relaxed">
                        {proj.deploymentExpectations}
                      </p>
                    </div>

                    <div className="p-3 bg-[#111111] text-[#FFFFFF] space-y-1">
                      <span className="font-bold text-[#FF1E27] uppercase block text-[10px]">
                        COMPLETION CRITERIA
                      </span>
                      <p className="text-white/90 font-sans text-[11px] leading-relaxed">
                        {proj.completionCriteria}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
