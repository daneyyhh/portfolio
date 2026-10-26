import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { learningMethodSteps } from '../../data/roadmap/roadmapMethodData';
import { CheckCircle2, ArrowRight, ArrowLeft, Lightbulb, Compass, HelpCircle } from 'lucide-react';

export default function RoadmapMethodView() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const activeStep = learningMethodSteps[activeStepIndex];

  return (
    <div className="space-y-8 font-mono text-[#111111]">
      {/* ── 01. METHOD HEADER & INTRODUCTION ── */}
      <div className="p-5 sm:p-6 bg-[#FAF9F5] border border-[#C9C7C0] space-y-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#FF1E27]" />
          <span className="text-xs font-bold text-[#FF1E27] uppercase tracking-wider">
            THE 8-STEP ITERATIVE LEARNING CYCLE
          </span>
        </div>
        <h3 className="text-xl sm:text-2xl font-extrabold text-[#000000] uppercase tracking-tight">
          HOW TO STUDY & INTERNALIZE ANY TECHNICAL SUBJECT
        </h3>
        <p className="text-xs sm:text-sm text-[#444440] font-sans leading-relaxed max-w-3xl">
          Syntax is transient; mental models and debugging competence are permanent. Rather than passively watching video tutorials or memorizing boilerplate, execute this disciplined eight-step cycle for every major framework, tool, and design pattern.
        </p>
      </div>

      {/* ── 02. INTERACTIVE 8-STEP PROGRESSION CYCLE BAR ── */}
      <div className="border border-[#C9C7C0] bg-[#FFFFFF] p-2 sm:p-3">
        <div className="text-[10px] text-[#666660] uppercase font-bold tracking-wider mb-2 flex items-center justify-between">
          <span>THE EIGHT-STEP SEQUENCE</span>
          <span>STEP {activeStep.step} OF 08</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-1.5">
          {learningMethodSteps.map((stepItem, idx) => {
            const isCurrent = activeStepIndex === idx;
            return (
              <button
                key={stepItem.step}
                type="button"
                onClick={() => setActiveStepIndex(idx)}
                className={`p-2.5 text-left border text-[11px] font-mono transition-all duration-150 flex flex-col justify-between h-20 ${
                  isCurrent
                    ? 'bg-[#111111] text-[#FFFFFF] border-[#111111] shadow-sm font-bold'
                    : 'bg-[#FAF9F5] text-[#222222] border-[#C9C7C0] hover:border-[#111111]'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className={`text-[10px] ${isCurrent ? 'text-[#FF1E27]' : 'text-[#888880]'}`}>
                    {stepItem.step}
                  </span>
                  {idx < activeStepIndex && (
                    <span className="text-[10px] text-[#228B22]">✓</span>
                  )}
                </div>
                <span className="truncate w-full font-bold text-[10px] uppercase">
                  {stepItem.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── 03. ACTIVE STEP INTERACTIVE WORKBENCH CARD ── */}
      <div className="border border-[#111111] bg-[#FFFFFF] shadow-sm">
        {/* Step Banner */}
        <div className="bg-[#111111] text-[#FFFFFF] p-5 sm:p-7 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#FF1E27] font-bold uppercase tracking-widest">
              STEP {activeStep.step} // {activeStep.tagline}
            </span>
            <span className="text-[10px] text-white/60 uppercase">
              STUDY METHODOLOGY
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold uppercase text-white tracking-tight">
            {activeStep.name}
          </h2>

          <p className="text-xs sm:text-sm text-white/80 font-sans leading-relaxed max-w-3xl">
            {activeStep.objective}
          </p>
        </div>

        {/* Step Body */}
        <div className="p-5 sm:p-8 space-y-6">
          {/* Detailed Description */}
          <div className="p-4 bg-[#FAF9F5] border border-[#C9C7C0] text-xs text-[#333330] font-sans leading-relaxed">
            {activeStep.description}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Key Questions Checklist */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#111111] flex items-center gap-1.5">
                <HelpCircle size={14} className="text-[#FF1E27]" />
                QUESTIONS TO ANSWER BEFORE PROCEEDING
              </span>
              <div className="space-y-2 text-xs">
                {activeStep.keyQuestions.map((q, qidx) => (
                  <div key={qidx} className="p-3 bg-[#FFFFFF] border border-[#C9C7C0] flex items-start gap-2.5">
                    <span className="text-[#FF1E27] font-bold shrink-0">?</span>
                    <span className="text-[#333330] font-sans text-xs leading-relaxed">
                      {q}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actionable Practical Checklist */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#111111] flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-[#228B22]" />
                ACTIONABLE STEP CHECKLIST
              </span>
              <div className="space-y-2 text-xs">
                {activeStep.checklist.map((c, cidx) => (
                  <div key={cidx} className="p-3 bg-[#FFFFFF] border border-[#C9C7C0] flex items-start gap-2.5">
                    <span className="text-[#228B22] font-bold shrink-0">✓</span>
                    <span className="text-[#333330] font-sans text-xs leading-relaxed">
                      {c}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pro-Tip Box */}
          <div className="p-4 bg-[#FAF9F5] border-l-2 border-l-[#FF1E27] border border-[#C9C7C0] flex items-start gap-3">
            <Lightbulb size={16} className="text-[#FF1E27] shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="text-[10px] font-bold text-[#FF1E27] uppercase tracking-wider block">
                ENGINEERING MINDSET
              </span>
              <p className="text-xs text-[#222220] font-sans italic">
                "{activeStep.proTip}"
              </p>
            </div>
          </div>

          {/* Next / Previous Step Switchers */}
          <div className="pt-4 border-t border-[#C9C7C0] flex items-center justify-between text-xs">
            <button
              type="button"
              disabled={activeStepIndex === 0}
              onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
              className="px-3 py-2 border border-[#C9C7C0] bg-[#FAF9F5] hover:bg-[#FFFFFF] disabled:opacity-30 disabled:pointer-events-none font-bold uppercase flex items-center gap-1.5"
            >
              <ArrowLeft size={12} />
              PREVIOUS STEP
            </button>

            <span className="text-[11px] text-[#666660] uppercase">
              STEP {activeStep.step} / 08
            </span>

            <button
              type="button"
              disabled={activeStepIndex === learningMethodSteps.length - 1}
              onClick={() => setActiveStepIndex((prev) => Math.min(learningMethodSteps.length - 1, prev + 1))}
              className="px-3 py-2 border border-[#111111] bg-[#111111] text-[#FFFFFF] hover:bg-[#FF1E27] disabled:opacity-30 disabled:pointer-events-none font-bold uppercase flex items-center gap-1.5"
            >
              NEXT STEP
              <ArrowRight size={12} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
