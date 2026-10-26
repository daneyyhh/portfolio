import React, { useState, useEffect } from 'react';
import { roadmapPhases } from '../../data/roadmap/roadmapPhasesData';
import { projectsLadder } from '../../data/roadmap/roadmapProjectsData';
import { CheckCircle2, RotateCcw, Save, AlertCircle, FileText, CheckSquare, Square } from 'lucide-react';

const STORAGE_KEY = 'reubg_roadmap_local_progress';

export default function RoadmapTrackerView() {
  const [phaseStatuses, setPhaseStatuses] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.phaseStatuses || {};
      }
    } catch (e) {
      // Ignore
    }
    return {};
  });

  const [completedTopics, setCompletedTopics] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.completedTopics || {};
      }
    } catch (e) {
      // Ignore
    }
    return {};
  });

  const [completedProjects, setCompletedProjects] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.completedProjects || {};
      }
    } catch (e) {
      // Ignore
    }
    return {};
  });

  const [notes, setNotes] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.notes || {};
      }
    } catch (e) {
      // Ignore
    }
    return {};
  });

  const [selectedPhaseForNotes, setSelectedPhaseForNotes] = useState('01');
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [saveToast, setSaveToast] = useState(false);

  // Sync state to localStorage
  const saveState = (updated) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setSaveToast(true);
      setTimeout(() => setSaveToast(false), 2000);
    } catch (e) {
      console.error('Failed to save roadmap progress to localStorage', e);
    }
  };

  const handlePhaseStatusChange = (phaseId, status) => {
    const updated = {
      ...phaseStatuses,
      [phaseId]: status,
    };
    setPhaseStatuses(updated);
    saveState({ phaseStatuses: updated, completedTopics, completedProjects, notes });
  };

  const handleToggleTopic = (topicKey) => {
    const updated = {
      ...completedTopics,
      [topicKey]: !completedTopics[topicKey],
    };
    setCompletedTopics(updated);
    saveState({ phaseStatuses, completedTopics: updated, completedProjects, notes });
  };

  const handleToggleProject = (projId) => {
    const updated = {
      ...completedProjects,
      [projId]: !completedProjects[projId],
    };
    setCompletedProjects(updated);
    saveState({ phaseStatuses, completedTopics, completedProjects: updated, notes });
  };

  const handleNoteChange = (phaseId, text) => {
    const updated = {
      ...notes,
      [phaseId]: text,
    };
    setNotes(updated);
    saveState({ phaseStatuses, completedTopics, completedProjects, notes: updated });
  };

  const handleResetProgress = () => {
    localStorage.removeItem(STORAGE_KEY);
    setPhaseStatuses({});
    setCompletedTopics({});
    setCompletedProjects({});
    setNotes({});
    setShowResetConfirm(false);
  };

  // Calculate overall metrics
  const totalPhases = roadmapPhases.length;
  const completedPhasesCount = Object.values(phaseStatuses).filter((s) => s === 'COMPLETED').length;
  const inProgressPhasesCount = Object.values(phaseStatuses).filter((s) => s === 'IN_PROGRESS').length;

  const allTopicsCount = roadmapPhases.reduce(
    (acc, p) => acc + p.coreSections.reduce((sAcc, s) => sAcc + s.topics.length, 0),
    0
  );
  const verifiedTopicsCount = Object.values(completedTopics).filter(Boolean).length;

  const totalProjectsCount = projectsLadder.length;
  const verifiedProjectsCount = Object.values(completedProjects).filter(Boolean).length;

  // Weighted overall calculation: 40% phases, 40% topics, 20% projects
  const phaseProgressWeight = totalPhases > 0 ? (completedPhasesCount / totalPhases) * 40 : 0;
  const topicProgressWeight = allTopicsCount > 0 ? (verifiedTopicsCount / allTopicsCount) * 40 : 0;
  const projectProgressWeight = totalProjectsCount > 0 ? (verifiedProjectsCount / totalProjectsCount) * 20 : 0;
  const overallPercentage = Math.round(phaseProgressWeight + topicProgressWeight + projectProgressWeight);

  return (
    <div className="space-y-8 font-mono text-[#111111]">
      {/* ── 01. SECTION INTRO ── */}
      <div className="p-5 sm:p-6 bg-[#FAF9F5] border border-[#C9C7C0] space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FF1E27]" />
            <span className="text-xs font-bold text-[#FF1E27] uppercase tracking-wider">
              BROWSER-LOCAL PROGRESS TRACKER
            </span>
          </div>
          {saveToast && (
            <span className="text-[10px] text-[#228B22] font-bold uppercase animate-fade-in">
              ✓ SAVED LOCALLY
            </span>
          )}
        </div>

        <h3 className="text-xl sm:text-2xl font-extrabold text-[#000000] uppercase tracking-tight">
          PERSONAL ROADMAP TRACKER & LEARNING SCRATCHPAD
        </h3>

        <p className="text-xs sm:text-sm text-[#444440] font-sans leading-relaxed max-w-3xl">
          Track your personal progress through topics, record technical findings, and check off project milestones as you build them. All data is persisted directly in your browser's local storage with zero account requirement.
        </p>

        {/* Disclaimer Alert */}
        <div className="p-3 bg-[#FFFFFF] border-l-2 border-l-[#111111] border border-[#C9C7C0] text-[11px] text-[#444440] font-sans flex items-start gap-2 mt-2">
          <AlertCircle size={14} className="text-[#888880] shrink-0 mt-0.5" />
          <span>
            <strong className="font-mono text-[#000000]">DISCLAIMER:</strong> Progress is stored locally in your browser. Checking a box does not constitute a certification of professional proficiency; true competence is demonstrated by independently writing and debugging working code.
          </span>
        </div>
      </div>

      {/* ── 02. OVERALL PROGRESS METRICS MATRIX ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 bg-[#FFFFFF] border border-[#C9C7C0] space-y-1">
          <span className="text-[10px] text-[#888880] uppercase font-bold block">
            OVERALL PROGRESS
          </span>
          <div className="text-2xl font-extrabold text-[#000000]">
            {overallPercentage}%
          </div>
          <div className="w-full bg-[#E5E4DE] h-1.5 mt-2">
            <div
              className="bg-[#FF1E27] h-1.5 transition-all duration-300"
              style={{ width: `${overallPercentage}%` }}
            />
          </div>
        </div>

        <div className="p-4 bg-[#FFFFFF] border border-[#C9C7C0] space-y-1">
          <span className="text-[10px] text-[#888880] uppercase font-bold block">
            PHASES COMPLETED
          </span>
          <div className="text-2xl font-extrabold text-[#000000]">
            {completedPhasesCount} / {totalPhases}
          </div>
          <span className="text-[10px] text-[#666660]">
            {inProgressPhasesCount} in progress
          </span>
        </div>

        <div className="p-4 bg-[#FFFFFF] border border-[#C9C7C0] space-y-1">
          <span className="text-[10px] text-[#888880] uppercase font-bold block">
            TOPICS UNDERSTOOD
          </span>
          <div className="text-2xl font-extrabold text-[#000000]">
            {verifiedTopicsCount} / {allTopicsCount}
          </div>
          <span className="text-[10px] text-[#666660]">
            {Math.round((verifiedTopicsCount / allTopicsCount) * 100)}% verified
          </span>
        </div>

        <div className="p-4 bg-[#FFFFFF] border border-[#C9C7C0] space-y-1">
          <span className="text-[10px] text-[#888880] uppercase font-bold block">
            PROJECTS BUILT
          </span>
          <div className="text-2xl font-extrabold text-[#000000]">
            {verifiedProjectsCount} / {totalProjectsCount}
          </div>
          <span className="text-[10px] text-[#666660]">
            {Math.round((verifiedProjectsCount / totalProjectsCount) * 100)}% built
          </span>
        </div>
      </div>

      {/* ── 03. PHASE STATUS CONTROLLER & TOPIC CHECKLIST ── */}
      <div className="border border-[#C9C7C0] bg-[#FFFFFF] p-5 sm:p-7 space-y-6">
        <div className="flex items-center justify-between border-b border-[#C9C7C0] pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#000000]">
            PHASE STATUS & TOPIC VERIFICATION
          </span>
          <span className="text-[10px] text-[#666660] uppercase">
            Click status pills to change
          </span>
        </div>

        <div className="space-y-4">
          {roadmapPhases.map((phase) => {
            const currentStatus = phaseStatuses[phase.phase] || 'NOT_STARTED';
            return (
              <div
                key={phase.phase}
                className="p-4 bg-[#FAF9F5] border border-[#C9C7C0] space-y-3"
              >
                {/* Phase Status Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D0CECB] pb-3">
                  <div>
                    <span className="text-[10px] text-[#FF1E27] font-bold block uppercase">
                      PHASE {phase.phase} // {phase.category}
                    </span>
                    <h4 className="font-bold text-sm text-[#000000] uppercase mt-0.5">
                      {phase.title}
                    </h4>
                  </div>

                  {/* Status Switcher Buttons */}
                  <div className="flex items-center gap-1 text-[10px]">
                    {[
                      { id: 'NOT_STARTED', label: 'NOT STARTED' },
                      { id: 'IN_PROGRESS', label: 'IN PROGRESS' },
                      { id: 'COMPLETED', label: 'COMPLETED' },
                    ].map((st) => (
                      <button
                        key={st.id}
                        type="button"
                        onClick={() => handlePhaseStatusChange(phase.phase, st.id)}
                        className={`px-2 py-1 border transition-all ${
                          currentStatus === st.id
                            ? st.id === 'COMPLETED'
                              ? 'bg-[#111111] text-[#FFFFFF] border-[#111111] font-bold'
                              : st.id === 'IN_PROGRESS'
                              ? 'bg-[#FF1E27] text-[#FFFFFF] border-[#FF1E27] font-bold'
                              : 'bg-[#D0CECB] text-[#111111] border-[#C9C7C0] font-bold'
                            : 'bg-[#FFFFFF] text-[#666660] border-[#C9C7C0] hover:border-[#111111]'
                        }`}
                      >
                        {st.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Topics Micro-Checklist */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] text-[#888880] uppercase font-bold block">
                    TOPICS CHECKLIST (CLICK TO MARK UNDERSTOOD):
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {phase.coreSections.map((sec) =>
                      sec.topics.map((t, tidx) => {
                        const topicKey = `${phase.phase}-${sec.letter}-${tidx}`;
                        const isDone = !!completedTopics[topicKey];
                        return (
                          <button
                            key={topicKey}
                            type="button"
                            onClick={() => handleToggleTopic(topicKey)}
                            className={`p-2 text-left text-xs border flex items-start gap-2 transition-all ${
                              isDone
                                ? 'bg-[#FFFFFF] border-[#111111] text-[#111111]'
                                : 'bg-[#FFFFFF] border-[#D0CECB] text-[#555550] hover:border-[#888880]'
                            }`}
                          >
                            <span className={`font-bold mt-0.5 ${isDone ? 'text-[#228B22]' : 'text-[#C9C7C0]'}`}>
                              {isDone ? '☑' : '☐'}
                            </span>
                            <span className="truncate leading-tight font-sans text-[11px]">
                              {t.name}
                            </span>
                          </button>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── 04. PROJECTS COMPLETION CHECKLIST ── */}
      <div className="border border-[#C9C7C0] bg-[#FFFFFF] p-5 sm:p-7 space-y-4">
        <div className="flex items-center justify-between border-b border-[#C9C7C0] pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#000000]">
            PRACTICAL PROJECT LADDER VERIFICATION
          </span>
          <span className="text-[10px] text-[#666660] uppercase">
            6 MILESTONES
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {projectsLadder.map((proj) => {
            const isBuilt = !!completedProjects[proj.id];
            return (
              <button
                key={proj.id}
                type="button"
                onClick={() => handleToggleProject(proj.id)}
                className={`p-4 text-left border flex flex-col justify-between h-28 transition-all ${
                  isBuilt
                    ? 'bg-[#111111] text-[#FFFFFF] border-[#111111]'
                    : 'bg-[#FAF9F5] text-[#111111] border-[#C9C7C0] hover:border-[#111111]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-[10px]">
                    <span className={`font-bold ${isBuilt ? 'text-[#FF1E27]' : 'text-[#888880]'}`}>
                      PROJECT {proj.num}
                    </span>
                    <span className="font-bold">{isBuilt ? '✓ COMPLETED' : 'PENDING'}</span>
                  </div>
                  <span className="font-bold text-xs uppercase block mt-1 line-clamp-2">
                    {proj.title}
                  </span>
                </div>
                <span className="text-[9px] uppercase tracking-wider opacity-70">
                  {proj.difficulty}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── 05. PERSONAL STUDY SCRATCHPAD & TECHNICAL NOTES ── */}
      <div className="border border-[#C9C7C0] bg-[#FFFFFF] p-5 sm:p-7 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#C9C7C0] pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#000000] flex items-center gap-1.5">
            <FileText size={14} className="text-[#FF1E27]" />
            PHASE TECHNICAL JOURNAL / LOCAL NOTES
          </span>

          <div className="flex items-center gap-1 text-[11px]">
            <span className="text-[10px] text-[#888880] mr-1">SELECT PHASE:</span>
            {roadmapPhases.map((p) => (
              <button
                key={p.phase}
                type="button"
                onClick={() => setSelectedPhaseForNotes(p.phase)}
                className={`px-2 py-0.5 border text-[10px] font-bold ${
                  selectedPhaseForNotes === p.phase
                    ? 'bg-[#111111] text-[#FFFFFF] border-[#111111]'
                    : 'bg-[#FAF9F5] text-[#555550] border-[#C9C7C0]'
                }`}
              >
                {p.phase}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-[10px] text-[#666660] uppercase">
            NOTES FOR PHASE {selectedPhaseForNotes}:
          </div>
          <textarea
            rows={5}
            value={notes[selectedPhaseForNotes] || ''}
            onChange={(e) => handleNoteChange(selectedPhaseForNotes, e.target.value)}
            placeholder={`Record key takeaways, tricky bugs encountered, and architecture decisions for Phase ${selectedPhaseForNotes}...`}
            className="w-full p-3 bg-[#FAF9F5] border border-[#C9C7C0] text-xs font-mono text-[#111111] placeholder-[#888880] focus:outline-none focus:border-[#111111] leading-relaxed"
          />
          <span className="text-[10px] text-[#888880] block text-right">
            Autosaved to browser storage.
          </span>
        </div>
      </div>

      {/* ── 06. RESET ACTIONS BAR ── */}
      <div className="p-4 bg-[#FAF9F5] border border-[#C9C7C0] flex flex-wrap items-center justify-between gap-3 text-xs">
        <span className="text-[#666660] text-[11px]">
          Want to clear your browser's roadmap progress and start fresh?
        </span>

        {showResetConfirm ? (
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-[#FF1E27] font-bold uppercase">
              CONFIRM RESET?
            </span>
            <button
              type="button"
              onClick={handleResetProgress}
              className="px-3 py-1 bg-[#FF1E27] text-[#FFFFFF] border border-[#FF1E27] font-bold uppercase hover:bg-black transition-all"
            >
              YES, CLEAR ALL DATA
            </button>
            <button
              type="button"
              onClick={() => setShowResetConfirm(false)}
              className="px-3 py-1 bg-[#FFFFFF] text-[#111111] border border-[#C9C7C0] font-bold uppercase"
            >
              CANCEL
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setShowResetConfirm(true)}
            className="px-3 py-1.5 border border-[#C9C7C0] bg-[#FFFFFF] hover:border-[#FF1E27] hover:text-[#FF1E27] font-bold uppercase flex items-center gap-1.5 text-xs transition-all"
          >
            <RotateCcw size={12} />
            RESET ALL LOCAL PROGRESS
          </button>
        )}
      </div>
    </div>
  );
}
