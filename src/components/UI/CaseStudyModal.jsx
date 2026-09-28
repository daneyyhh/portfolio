import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ExternalLink,
  Github,
  Layers,
  CheckCircle2,
  GitBranch,
  Cpu,
  Zap,
  ShieldCheck,
  ArrowRight,
  Play,
  Pause,
  RotateCcw,
  Code2,
  Scale,
  Gauge,
  Terminal,
  Activity
} from 'lucide-react';

export default function CaseStudyModal({ project, onClose }) {
  const [activeTab, setActiveTab] = useState('flowchart');
  const [selectedStepIdx, setSelectedStepIdx] = useState(0);
  const [isPlayingFlow, setIsPlayingFlow] = useState(false);

  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  // Flow playback simulation
  useEffect(() => {
    let interval;
    if (isPlayingFlow && project?.caseStudy?.flowchart?.length) {
      interval = setInterval(() => {
        setSelectedStepIdx((prev) => (prev + 1) % project.caseStudy.flowchart.length);
      }, 2400);
    }
    return () => clearInterval(interval);
  }, [isPlayingFlow, project]);

  if (!project) return null;
  const cs = project.caseStudy || {};
  const flowchart = cs.flowchart || [];
  const patterns = cs.patterns || [];
  const tradeoffs = cs.tradeoffs || [];
  const metrics = cs.metrics || [];

  const currentStep = flowchart[selectedStepIdx] || flowchart[0] || null;

  const tabs = [
    { id: 'flowchart', label: '01. ARCHITECTURE FLOWCHART', icon: GitBranch },
    { id: 'patterns', label: '02. DESIGN PATTERNS', icon: Code2 },
    { id: 'tradeoffs', label: '03. TRADE-OFFS & METRICS', icon: Scale },
    { id: 'specs', label: '04. SPECIFICATIONS & LEARNINGS', icon: Terminal },
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[99999] bg-[#0A0A0A]/95 backdrop-blur-xl flex items-center justify-center p-2 sm:p-4 md:p-8 overflow-y-auto font-mono selection:bg-[#FF1E27] selection:text-white"
      >
        <div className="relative w-full max-w-6xl bg-[#111111] border border-white/15 my-6 overflow-hidden shadow-2xl rounded-none text-slate-200">
          
          {/* Top Bar Header */}
          <div className="sticky top-0 z-30 bg-[#0A0A0A] border-b border-white/10 px-4 sm:px-6 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF1E27] animate-pulse"></span>
              <div className="flex items-center gap-2 text-xs font-mono text-[#FF1E27] tracking-widest uppercase">
                <span className="font-bold">SYSTEM CASE STUDY //</span>
                <span className="text-white hidden sm:inline">{project.title}</span>
                <span className="text-slate-500 text-[10px]">[{project.year || "2026"}]</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="hidden md:inline-block text-[10px] text-slate-400 border border-white/10 px-2 py-0.5">
                ESC TO CLOSE
              </span>
              <button
                onClick={onClose}
                className="p-1.5 sm:p-2 bg-white/5 hover:bg-[#FF1E27] hover:text-white border border-white/10 rounded-none transition-all cursor-pointer"
                title="Close Case Study"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Modal Scrollable Container */}
          <div className="p-4 sm:p-8 md:p-10 space-y-8 max-h-[82vh] overflow-y-auto scrollbar-thin scrollbar-thumb-white/20">
            
            {/* Hero Title & System Tags */}
            <div className="space-y-4 border-b border-white/10 pb-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="inline-flex items-center gap-2 bg-[#FF1E27]/10 border border-[#FF1E27]/30 text-[#FF1E27] px-3 py-1 text-xs font-mono tracking-widest uppercase">
                  <Activity size={13} />
                  <span>{project.category}</span>
                </div>
                <div className="text-xs font-mono text-slate-400">
                  ROLE: <span className="text-white font-bold">{project.role || "System Architect"}</span>
                </div>
              </div>
              
              <h1 className="font-syne text-3xl sm:text-4xl md:text-6xl font-black text-white tracking-tight uppercase">
                {project.title}
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-sans max-w-4xl">
                {cs.overview || project.shortDesc}
              </p>

              {/* Technologies Pill Grid */}
              <div className="flex flex-wrap gap-2 pt-2">
                {project.technologies.map(tech => (
                  <span key={tech} className="bg-white/5 border border-white/10 text-xs px-2.5 py-1 text-slate-300 font-mono flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-[#FF1E27]"></span>
                    {tech}
                  </span>
                ))}
              </div>

              {/* Visual Banner */}
              <div className="relative h-48 sm:h-72 md:h-80 w-full overflow-hidden border border-white/10 mt-4 group">
                <img
                  src={project.img}
                  alt={project.title}
                  className="w-full h-full object-cover filter contrast-115"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/40 to-transparent"></div>
                <div className="absolute bottom-4 left-4 sm:left-6 flex items-center gap-2 bg-[#0A0A0A]/90 border border-white/15 px-3 py-1.5 text-xs text-white">
                  <Cpu size={14} className="text-[#FF1E27]" />
                  <span className="font-bold tracking-wider">PRODUCTION ARCHITECTURE PROFILE</span>
                </div>
              </div>
            </div>

            {/* Navigation Tab Bar */}
            <div className="sticky top-0 z-20 bg-[#111111]/95 backdrop-blur-md py-2 border-b border-white/15 flex flex-wrap gap-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-3 sm:px-4 py-2 text-xs font-mono font-bold tracking-wider uppercase border transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#FF1E27] text-white border-[#FF1E27] shadow-lg shadow-[#FF1E27]/20'
                        : 'bg-[#0A0A0A] border-white/10 text-slate-300 hover:border-white/30 hover:text-white'
                    }`}
                  >
                    <Icon size={14} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* TAB 01: ARCHITECTURE FLOWCHART & PIPELINE */}
            {activeTab === 'flowchart' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                {/* Intro summary & simulator controls */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0A0A0A] border border-white/10 p-5">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-[#FF1E27] font-bold tracking-widest uppercase">
                      <GitBranch size={15} />
                      <span>END-TO-END DATA EXECUTION PIPELINE</span>
                    </div>
                    <p className="text-slate-400 text-xs font-sans">
                      Interactive sequential dataflow from user interaction, security gateway, concurrency lock, persistence, to real-time event distribution.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-start md:self-auto">
                    <button
                      onClick={() => setIsPlayingFlow(!isPlayingFlow)}
                      className={`flex items-center gap-2 px-3 py-1.5 text-xs font-mono font-bold border transition-all cursor-pointer ${
                        isPlayingFlow
                          ? 'bg-[#FF1E27] text-white border-[#FF1E27]'
                          : 'bg-white/5 border-white/20 text-slate-200 hover:bg-white/10'
                      }`}
                    >
                      {isPlayingFlow ? <Pause size={13} /> : <Play size={13} />}
                      <span>{isPlayingFlow ? 'PAUSE PIPELINE' : 'RUN SIMULATION'}</span>
                    </button>
                    <button
                      onClick={() => {
                        setIsPlayingFlow(false);
                        setSelectedStepIdx(0);
                      }}
                      className="p-1.5 bg-white/5 hover:bg-white/10 border border-white/20 text-slate-300 transition-all cursor-pointer"
                      title="Reset Pipeline"
                    >
                      <RotateCcw size={13} />
                    </button>
                  </div>
                </div>

                {/* Flowchart Horizontal Visualizer Grid */}
                <div className="space-y-3">
                  <div className="text-[10px] text-slate-400 font-mono tracking-widest uppercase flex items-center justify-between">
                    <span>CLICK ANY STAGE TO INSPECT TELEMETRY & I/O</span>
                    <span>ACTIVE STAGE: {selectedStepIdx + 1} OF {flowchart.length}</span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
                    {flowchart.map((step, idx) => {
                      const isSelected = selectedStepIdx === idx;
                      return (
                        <button
                          key={step.id || idx}
                          onClick={() => {
                            setIsPlayingFlow(false);
                            setSelectedStepIdx(idx);
                          }}
                          className={`relative text-left p-3.5 border transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                            isSelected
                              ? 'bg-[#181818] border-[#FF1E27] shadow-lg shadow-[#FF1E27]/10 -translate-y-1'
                              : 'bg-[#0A0A0A] border-white/10 hover:border-white/30 opacity-75 hover:opacity-100'
                          }`}
                        >
                          {/* Active Step Indicator Pulse */}
                          {isSelected && (
                            <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-[#FF1E27] rounded-full animate-ping"></span>
                          )}

                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                              <span className={`text-[10px] font-mono font-bold ${isSelected ? 'text-[#FF1E27]' : 'text-slate-500'}`}>
                                STEP {step.step}
                              </span>
                              <span className="text-[9px] font-mono px-1.5 py-0.2 bg-white/5 border border-white/10 text-slate-400">
                                {step.type?.split('_')[0] || "NODE"}
                              </span>
                            </div>

                            <h4 className="text-xs font-bold text-white uppercase leading-snug line-clamp-2">
                              {step.title}
                            </h4>
                          </div>

                          <div className="pt-3 border-t border-white/5 mt-2 space-y-1">
                            <div className="text-[9px] font-mono text-[#FF1E27] truncate">
                              {step.protocol}
                            </div>
                            <div className="text-[9px] font-mono text-slate-400 truncate">
                              {step.latency}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Animated Pipeline Connector Line Indicator */}
                <div className="relative h-2 bg-[#0A0A0A] border border-white/10 overflow-hidden">
                  <motion.div
                    className="absolute top-0 bottom-0 bg-[#FF1E27]"
                    animate={{
                      left: `${(selectedStepIdx / (flowchart.length - 1 || 1)) * 90}%`,
                      width: '10%'
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                </div>

                {/* Selected Node Deep-Dive Inspector Panel */}
                {currentStep && (
                  <div className="bg-[#0A0A0A] border-2 border-[#FF1E27] p-5 sm:p-8 space-y-6">
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="bg-[#FF1E27] text-white text-[10px] font-bold px-2 py-0.5">
                            STAGE {currentStep.step}
                          </span>
                          <span className="text-xs font-mono text-slate-400">
                            {currentStep.type}
                          </span>
                        </div>
                        <h3 className="font-syne text-xl sm:text-2xl font-bold text-white uppercase">
                          {currentStep.title}
                        </h3>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-right font-mono">
                          <div className="text-[10px] text-slate-400">EXECUTION SLA</div>
                          <div className="text-xs font-bold text-[#FF1E27]">{currentStep.latency}</div>
                        </div>
                        <div className="text-right font-mono border-l border-white/10 pl-3">
                          <div className="text-[10px] text-slate-400">PROTOCOL</div>
                          <div className="text-xs font-bold text-white">{currentStep.protocol}</div>
                        </div>
                      </div>
                    </div>

                    {/* Operational Action Description */}
                    <div className="space-y-2">
                      <div className="text-xs text-[#FF1E27] font-mono tracking-widest">STAGE OPERATION //</div>
                      <p className="text-sm text-slate-200 font-sans leading-relaxed">
                        {currentStep.action}
                      </p>
                    </div>

                    {/* I/O Payloads Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Input schema */}
                      <div className="bg-[#141414] border border-white/10 p-4 space-y-2">
                        <div className="flex items-center justify-between text-[11px] text-slate-400">
                          <span className="text-emerald-400 font-bold">INPUT DATA PAYLOAD</span>
                          <span className="font-mono text-[10px]">INGRESS</span>
                        </div>
                        <pre className="font-mono text-[11px] text-slate-300 bg-[#0A0A0A] p-3 border border-white/5 overflow-x-auto whitespace-pre-wrap">
                          {currentStep.inputs}
                        </pre>
                      </div>

                      {/* Output schema */}
                      <div className="bg-[#141414] border border-white/10 p-4 space-y-2">
                        <div className="flex items-center justify-between text-[11px] text-slate-400">
                          <span className="text-cyan-400 font-bold">OUTPUT / STATE MUTATION</span>
                          <span className="font-mono text-[10px]">EGRESS</span>
                        </div>
                        <pre className="font-mono text-[11px] text-slate-300 bg-[#0A0A0A] p-3 border border-white/5 overflow-x-auto whitespace-pre-wrap">
                          {currentStep.outputs}
                        </pre>
                      </div>
                    </div>

                    {/* Tech & Resilience */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div className="flex items-start gap-3 bg-white/5 p-3.5 border border-white/10">
                        <Cpu size={18} className="text-[#FF1E27] shrink-0 mt-0.5" />
                        <div className="space-y-1">
                          <div className="text-[10px] text-slate-400 uppercase font-bold">Technology Stack</div>
                          <div className="text-xs text-white font-mono">{currentStep.tech}</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 bg-white/5 p-3.5 border border-white/10">
                        <ShieldCheck size={18} className="text-emerald-400 shrink-0 mt-0.5" />
                        <div className="space-y-1">
                          <div className="text-[10px] text-slate-400 uppercase font-bold">Failover & Circuit Breaker</div>
                          <div className="text-xs text-slate-300 font-sans leading-relaxed">{currentStep.failover}</div>
                        </div>
                      </div>
                    </div>

                    {/* Stepper Navigator Buttons */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <button
                        onClick={() => setSelectedStepIdx(Math.max(0, selectedStepIdx - 1))}
                        disabled={selectedStepIdx === 0}
                        className="px-4 py-2 bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed border border-white/15 text-xs font-mono transition-all cursor-pointer"
                      >
                        [ ← PREVIOUS STAGE ]
                      </button>

                      <div className="text-xs font-mono text-slate-400">
                        STAGE {selectedStepIdx + 1} / {flowchart.length}
                      </div>

                      <button
                        onClick={() => setSelectedStepIdx(Math.min(flowchart.length - 1, selectedStepIdx + 1))}
                        disabled={selectedStepIdx === flowchart.length - 1}
                        className="px-4 py-2 bg-[#FF1E27] hover:bg-[#E00208] disabled:opacity-30 disabled:cursor-not-allowed text-white text-xs font-mono font-bold transition-all cursor-pointer"
                      >
                        [ NEXT STAGE → ]
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* TAB 02: DESIGN PATTERNS */}
            {activeTab === 'patterns' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="bg-[#0A0A0A] border border-white/10 p-5 space-y-1">
                  <div className="flex items-center gap-2 text-xs text-[#FF1E27] font-bold tracking-widest uppercase">
                    <Code2 size={15} />
                    <span>SOFTWARE DESIGN PATTERNS & PRINCIPLES</span>
                  </div>
                  <p className="text-slate-400 text-xs font-sans">
                    Architectural paradigms implemented to solve concurrency, latency, distributed state, and hardware resource constraints.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {patterns.map((pat, idx) => (
                    <div
                      key={idx}
                      className="bg-[#0A0A0A] border border-white/15 hover:border-[#FF1E27] transition-all p-6 space-y-4 rounded-none flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono text-[#FF1E27] font-bold">
                            PATTERN 0{idx + 1}
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 bg-white/5 border border-white/10 text-slate-300">
                            {pat.category}
                          </span>
                        </div>

                        <h3 className="font-syne text-lg font-bold text-white uppercase">
                          {pat.title}
                        </h3>

                        <div className="space-y-2 text-xs font-sans text-slate-300">
                          <div>
                            <span className="font-mono text-[10px] text-rose-400 uppercase font-bold block">
                              Problem Addressed:
                            </span>
                            <p className="leading-relaxed text-slate-300 mt-0.5">{pat.problem}</p>
                          </div>

                          <div className="pt-1">
                            <span className="font-mono text-[10px] text-emerald-400 uppercase font-bold block">
                              Engineering Solution:
                            </span>
                            <p className="leading-relaxed text-slate-300 mt-0.5">{pat.solution}</p>
                          </div>
                        </div>

                        {/* Code snippet */}
                        {pat.code && (
                          <div className="bg-[#141414] border border-white/10 p-3 mt-3">
                            <div className="text-[9px] font-mono text-slate-500 uppercase pb-1 border-b border-white/5 mb-2">
                              Implementation Sample
                            </div>
                            <pre className="font-mono text-[11px] text-slate-200 overflow-x-auto whitespace-pre leading-relaxed">
                              {pat.code}
                            </pre>
                          </div>
                        )}
                      </div>

                      <div className="bg-[#FF1E27]/10 border border-[#FF1E27]/30 p-3 mt-4">
                        <div className="text-[9px] font-mono text-[#FF1E27] uppercase font-bold">ENGINEERING IMPACT</div>
                        <div className="text-xs text-white font-sans font-semibold mt-0.5">{pat.impact}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* TAB 03: TRADE-OFFS & METRICS */}
            {activeTab === 'tradeoffs' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                {/* Telemetry Metrics Grid */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs text-[#FF1E27] font-bold tracking-widest uppercase">
                    <Gauge size={15} />
                    <span>SYSTEM TELEMETRY & VERIFIED BENCHMARKS</span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {metrics.map((m, idx) => (
                      <div key={idx} className="bg-[#0A0A0A] border border-white/15 p-5 space-y-2">
                        <div className="text-[10px] font-mono text-slate-400 uppercase">{m.label}</div>
                        <div className="font-syne text-2xl sm:text-3xl font-black text-white">{m.value}</div>
                        <div className="text-[11px] font-sans text-slate-400">{m.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Architectural Trade-off Matrix */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs text-[#FF1E27] font-bold tracking-widest uppercase">
                    <Scale size={15} />
                    <span>ARCHITECTURAL TRADE-OFF MATRIX</span>
                  </div>

                  <div className="border border-white/15 bg-[#0A0A0A] overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs font-mono">
                      <thead>
                        <tr className="border-b border-white/15 bg-white/5 text-slate-300">
                          <th className="p-3.5 sm:p-4 uppercase">Decision Domain</th>
                          <th className="p-3.5 sm:p-4 uppercase text-[#FF1E27]">Selected Approach</th>
                          <th className="p-3.5 sm:p-4 uppercase text-slate-400">Alternative Evaluated</th>
                          <th className="p-3.5 sm:p-4 uppercase">Trade-off Rationale</th>
                          <th className="p-3.5 sm:p-4 uppercase text-emerald-400">Verdict</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/10">
                        {tradeoffs.map((item, idx) => (
                          <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                            <td className="p-3.5 sm:p-4 font-bold text-white whitespace-nowrap">
                              {item.area}
                            </td>
                            <td className="p-3.5 sm:p-4 text-[#FF1E27] font-bold">
                              {item.chosen}
                            </td>
                            <td className="p-3.5 sm:p-4 text-slate-400">
                              {item.alternative}
                            </td>
                            <td className="p-3.5 sm:p-4 font-sans text-slate-300 min-w-[240px]">
                              {item.tradeoff}
                            </td>
                            <td className="p-3.5 sm:p-4 text-emerald-400 font-sans font-semibold min-w-[180px]">
                              {item.verdict}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 04: FULL SPECIFICATIONS & LEARNINGS */}
            {activeTab === 'specs' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                {/* 01 OVERVIEW */}
                <section className="space-y-3 border-l-2 border-[#FF1E27] pl-6">
                  <div className="text-xs text-[#FF1E27] font-mono tracking-widest">01 — ARCHITECTURAL OVERVIEW</div>
                  <p className="text-slate-300 text-sm md:text-base leading-relaxed font-sans">
                    {cs.overview || project.shortDesc}
                  </p>
                </section>

                {/* 02 PROBLEM & CHALLENGE */}
                <section className="space-y-3 border-l-2 border-slate-500 pl-6">
                  <div className="text-xs text-slate-400 font-mono tracking-widest">02 — CORE ENGINEERING CHALLENGE</div>
                  <p className="text-slate-300 text-sm md:text-base leading-relaxed font-sans">
                    {cs.problem || project.challenge}
                  </p>
                </section>

                {/* 03 APPROACH */}
                <section className="space-y-3 border-l-2 border-[#FF1E27] pl-6">
                  <div className="text-xs text-[#FF1E27] font-mono tracking-widest">03 — SYSTEM ARCHITECTURE APPROACH</div>
                  <p className="text-slate-300 text-sm md:text-base leading-relaxed font-sans">
                    {cs.approach || project.built}
                  </p>
                </section>

                {/* Core Architecture Nodes */}
                {cs.architecture && (
                  <section className="space-y-4">
                    <div className="text-xs text-[#FF1E27] font-mono tracking-widest">04 — PRIMARY ARCHITECTURAL NODES</div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {cs.architecture.map((item, idx) => (
                        <div key={idx} className="bg-[#0A0A0A] border border-white/10 p-5 rounded-none space-y-2">
                          <div className="flex justify-between items-center text-xs text-[#FF1E27]">
                            <span className="font-bold">NODE 0{idx + 1}</span>
                            <Layers size={14} />
                          </div>
                          <h4 className="font-bold text-white text-sm uppercase">{item.node}</h4>
                          <div className="text-xs font-mono text-slate-400">{item.tech}</div>
                          <p className="text-xs text-slate-400 leading-relaxed font-sans">{item.detail}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* 05 DEVELOPMENT */}
                <section className="space-y-3 bg-[#0A0A0A] border border-white/10 p-6">
                  <div className="text-xs text-[#FF1E27] font-mono tracking-widest">05 — DEVELOPMENT & CODE STANDARDS</div>
                  <p className="text-slate-300 text-sm leading-relaxed font-sans">
                    {cs.development || "Executed modular design pattern with clean component interfaces and strict unit testing constraints."}
                  </p>
                </section>

                {/* 06 INTERACTION / UI */}
                <section className="space-y-3 border-l-2 border-[#FF1E27] pl-6">
                  <div className="text-xs text-[#FF1E27] font-mono tracking-widest">06 — UI/UX & KINETIC INTERACTION</div>
                  <p className="text-slate-300 text-sm md:text-base leading-relaxed font-sans">
                    {cs.uiDesign || "Engineered responsive component layouts with high visual contrast, accessible font sizing, and smooth state updates."}
                  </p>
                </section>

                {/* 07 RESULT / LEARNING */}
                <section className="bg-[#FF1E27]/10 border border-[#FF1E27]/30 p-6 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-[#FF1E27] font-mono tracking-widest">
                    <CheckCircle2 size={16} />
                    <span>07 — RESULTS & VERIFIED ENGINEERING OUTCOMES</span>
                  </div>
                  <p className="text-white text-sm font-semibold leading-relaxed font-sans">
                    {cs.result || "Achieved high performance metrics and clean deployment pipeline."}
                  </p>
                </section>
              </motion.div>
            )}

            {/* Bottom Action Footer */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap gap-4 justify-between items-center">
              <div className="flex flex-wrap gap-3">
                {(project.github || project.githubLink) && (
                  <a
                    href={project.github || project.githubLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/20 text-white font-mono text-xs px-4 py-2.5 transition-all"
                  >
                    <Github size={16} />
                    <span>SOURCE REPOSITORY</span>
                  </a>
                )}
                {(project.link || project.demoLink) && (
                  <a
                    href={project.link || project.demoLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 bg-[#FF1E27] text-white font-mono font-bold text-xs px-4 py-2.5 hover:bg-[#E00208] transition-all"
                  >
                    <ExternalLink size={16} />
                    <span>LIVE DEMO / PREVIEW</span>
                  </a>
                )}
              </div>

              <button
                onClick={onClose}
                className="text-xs text-slate-400 hover:text-white uppercase tracking-widest cursor-pointer"
              >
                [ CLOSE CASE STUDY ]
              </button>
            </div>

          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
