import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, FlaskConical, AlertTriangle, RefreshCw, BookOpen } from 'lucide-react';
import { MaskHeading, MaskParagraph, FadeInUp } from '../UI/TextReveal';
import { useResearchData } from '../../hooks/useResearchData';
import { getParentCategory } from '../../data/researchData';

const EASE = [0.16, 1, 0.3, 1];

export default function ResearchPreview() {
  const prefersReduced = useReducedMotion();
  const { topics, isLoading, isError, isEmpty, error, retry } = useResearchData();

  const progressionSteps = [
    { num: '01', name: 'ORIGIN' },
    { num: '02', name: 'FUNDAMENTALS' },
    { num: '03', name: 'ARCHITECTURE' },
    { num: '04', name: 'EXPERIMENTS' },
    { num: '05', name: 'CURRENT FRONTIER' },
  ];

  // Pick top 4 research updates from the verified repository
  const recentUpdates = topics.slice(0, 4);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'DOCUMENTED':
        return (
          <span className="inline-flex items-center gap-1 bg-[#111111] text-white px-2 py-0.5 text-[9px] font-mono font-bold tracking-wider uppercase">
            <span className="w-1 h-1 rounded-full bg-white" />
            DOCUMENTED
          </span>
        );
      case 'UPDATED':
        return (
          <span className="inline-flex items-center gap-1 bg-[#FF1E27] text-white px-2 py-0.5 text-[9px] font-mono font-bold tracking-wider uppercase">
            <span className="w-1 h-1 rounded-full bg-white animate-pulse" />
            UPDATED
          </span>
        );
      case 'EXPERIMENTING':
        return (
          <span className="inline-flex items-center gap-1 bg-[#FAF9F5] border border-[#FF1E27] text-[#FF1E27] px-2 py-0.5 text-[9px] font-mono font-bold tracking-wider uppercase">
            <span className="w-1 h-1 rounded-full bg-[#FF1E27]" />
            EXPERIMENTING
          </span>
        );
      case 'RESEARCHING':
      default:
        return (
          <span className="inline-flex items-center gap-1 bg-[#FAF9F5] border border-[#C9C7C0] text-[#555555] px-2 py-0.5 text-[9px] font-mono font-bold tracking-wider uppercase">
            <span className="w-1 h-1 rounded-full bg-[#888880]" />
            {status}
          </span>
        );
    }
  };

  return (
    <section
      id="research"
      data-section="research-preview"
      className="py-20 sm:py-24 px-4 sm:px-6 md:px-12 bg-[#EDECE6] text-[#111111] relative border-t border-[#C9C7C0] font-mono w-full overflow-x-clip"
    >
      {/* Anchor shim for legacy #research-preview hashes */}
      <div id="research-preview" className="absolute -top-20 left-0" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start relative z-10 w-full">
        
        {/* Left Margin Vertical Tag */}
        <div className="hidden lg:flex lg:col-span-1 flex-col items-center justify-start h-full">
          <motion.div
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="font-mono text-4xl font-extrabold text-[#FF1E27]"
          >
            06
          </motion.div>
          <motion.div
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="vertical-tag font-mono text-xs text-[#555555] uppercase tracking-[0.3em] font-bold mt-6"
          >
            RESEARCH
          </motion.div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-11 space-y-8 sm:space-y-10 w-full max-w-full">
          
          {/* Header Row: Technical Badge & Notice */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#C9C7C0] pb-4">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#FF1E27] animate-pulse" />
              <span className="text-xs uppercase tracking-widest font-bold text-[#FF1E27]">
                AI RESEARCH / 001
              </span>
              <span className="text-[#888884] text-xs">•</span>
              <span className="text-xs text-[#555555] uppercase tracking-wider hidden sm:inline">
                TECHNICAL EXCERPT & ARCHIVE UPDATES
              </span>
            </div>

            <div className="flex items-center gap-2 text-[10px] sm:text-xs text-[#666660] bg-[#FAF9F5] px-3 py-1 border border-[#C9C7C0]">
              <FlaskConical size={12} className="text-[#FF1E27]" />
              <span>DEDICATED RESEARCH ENVIRONMENT</span>
            </div>
          </div>

          {/* Title & Core Thesis */}
          <div className="space-y-3">
            <MaskHeading
              lines={["HOW LARGE LANGUAGE", "MODELS WORK"]}
              className="font-syne font-extrabold text-[#111111] uppercase tracking-tight leading-[0.92] w-full max-w-full"
              style={{
                fontSize: 'clamp(2rem, 6vw, 3.75rem)',
                letterSpacing: 'clamp(-0.03em, -0.2vw, -0.01em)',
              }}
              delay={0.15}
            />

            <MaskParagraph delay={0.25}>
              <p className="font-mono text-xs sm:text-sm md:text-base text-[#444444] leading-relaxed max-w-3xl pt-1">
                From statistical language modelling to modern foundation models — an investigation into how LLMs evolved, how they process language, how they are trained, where they fail, and where the technology is heading.
              </p>
            </MaskParagraph>
          </div>

          {/* Compact Technical Progression Pipeline */}
          <FadeInUp delay={0.35} className="space-y-2 pt-1">
            <div className="text-[10px] text-[#777770] uppercase tracking-widest font-bold">
              INVESTIGATION PROGRESSION
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 bg-[#FAF9F5] p-3 sm:p-4 border border-[#C9C7C0] w-full">
              {progressionSteps.map((step, idx) => (
                <React.Fragment key={step.name}>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#111111]">
                    <span className="text-[10px] text-[#FF1E27] font-mono">{step.num}.</span>
                    <span>{step.name}</span>
                  </div>
                  {idx < progressionSteps.length - 1 && (
                    <span className="text-[#999990] text-xs font-mono font-normal">→</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </FadeInUp>

          {/* Small Technical Metadata Row */}
          <FadeInUp delay={0.45} className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
            <div className="bg-[#FAF9F5] p-3 border border-[#C9C7C0] space-y-1">
              <div className="text-[9px] uppercase tracking-widest text-[#777770] font-bold">CATEGORY</div>
              <div className="text-xs sm:text-sm font-bold text-[#111111]">GENERATIVE AI</div>
            </div>

            <div className="bg-[#FAF9F5] p-3 border border-[#C9C7C0] space-y-1">
              <div className="text-[9px] uppercase tracking-widest text-[#777770] font-bold">STATUS</div>
              <div className="text-xs sm:text-sm font-bold text-[#FF1E27] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF1E27] animate-pulse" />
                <span>RESEARCHING</span>
              </div>
            </div>

            <div className="bg-[#FAF9F5] p-3 border border-[#C9C7C0] space-y-1">
              <div className="text-[9px] uppercase tracking-widest text-[#777770] font-bold">DIFFICULTY</div>
              <div className="text-xs sm:text-sm font-bold text-[#111111]">INTERMEDIATE</div>
            </div>

            <div className="bg-[#FAF9F5] p-3 border border-[#C9C7C0] space-y-1">
              <div className="text-[9px] uppercase tracking-widest text-[#777770] font-bold">LAST UPDATED</div>
              <div className="text-xs sm:text-sm font-bold text-[#111111]">OCT 2026</div>
            </div>
          </FadeInUp>

          {/* ─────────────────────────────────────────────────────────────
              LATEST RESEARCH UPDATES GRID (RELIABLE UI STATES)
          ───────────────────────────────────────────────────────────── */}
          <div className="pt-4 border-t border-[#C9C7C0] space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-[#FF1E27] font-bold uppercase tracking-widest">
                  RESEARCH UPDATES
                </span>
                <span className="text-[#888880] text-xs">//</span>
                <span className="text-xs text-[#555555] uppercase font-bold tracking-wider">
                  RECENT PUBLICATIONS
                </span>
              </div>

              <Link
                to="/research"
                className="text-xs font-bold text-[#111111] hover:text-[#FF1E27] transition-colors flex items-center gap-1"
              >
                <span>VIEW ALL {topics.length > 0 ? topics.length : 20}</span>
                <span>→</span>
              </Link>
            </div>

            {/* 1. LOADING SKELETON */}
            {isLoading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-[#FAF9F5] border border-[#C9C7C0] p-4 space-y-3 animate-pulse">
                    <div className="h-3 bg-[#C9C7C0] w-1/3 rounded-xs" />
                    <div className="h-5 bg-[#C9C7C0] w-3/4 rounded-xs" />
                    <div className="h-10 bg-[#C9C7C0]/60 w-full rounded-xs" />
                  </div>
                ))}
              </div>
            )}

            {/* 2. ERROR STATE (WITH RETRY) */}
            {!isLoading && isError && (
              <div className="bg-[#FAF9F5] border border-[#FF1E27]/40 p-6 text-center space-y-3">
                <div className="flex items-center justify-center gap-2 text-[#FF1E27]">
                  <AlertTriangle size={18} />
                  <span className="text-xs font-bold uppercase">Research couldn't be loaded. Please try again.</span>
                </div>
                {error && (
                  <p className="text-[11px] text-[#777770] font-mono">{error.message || String(error)}</p>
                )}
                <button
                  onClick={retry}
                  className="px-4 py-2 bg-[#111111] text-white hover:bg-[#FF1E27] font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2 cursor-pointer"
                >
                  <RefreshCw size={12} />
                  <span>Retry</span>
                </button>
              </div>
            )}

            {/* 3. EMPTY STATE */}
            {!isLoading && !isError && isEmpty && (
              <div className="bg-[#FAF9F5] border border-[#C9C7C0] p-6 text-center space-y-2">
                <BookOpen size={20} className="mx-auto text-[#777770]" />
                <div className="text-xs font-bold text-[#111111]">No research published yet.</div>
                <p className="text-[11px] text-[#777770]">Explore our other development and game projects below.</p>
              </div>
            )}

            {/* 4. SUCCESS STATE: RESEARCH UPDATES CARDS */}
            {!isLoading && !isError && !isEmpty && recentUpdates.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {recentUpdates.map((topic) => {
                  const parentCat = getParentCategory(topic);
                  return (
                    <div
                      key={topic.id}
                      className="bg-[#FAF9F5] border border-[#C9C7C0] hover:border-[#111111] p-4 flex flex-col justify-between space-y-3 transition-colors group"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-[10px] pb-2 border-b border-[#C9C7C0]">
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-[#FF1E27]">{topic.id}</span>
                            <span className="text-[#C9C7C0]">/</span>
                            <span className="text-[#555555] uppercase">{parentCat}</span>
                          </div>
                          {getStatusBadge(topic.status)}
                        </div>

                        <Link
                          to={`/research/${topic.slug}`}
                          className="block font-syne font-bold text-sm sm:text-base text-[#111111] hover:text-[#FF1E27] transition-colors leading-tight"
                        >
                          {topic.title}
                        </Link>

                        <p className="font-sans text-xs text-[#555555] line-clamp-2 leading-relaxed">
                          {topic.abstract}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-[#C9C7C0] flex items-center justify-between text-[10px]">
                        <span className="text-[#777770]">{topic.readingTime || '15 min read'}</span>
                        <Link
                          to={`/research/${topic.slug}`}
                          className="font-bold text-[#FF1E27] group-hover:text-[#111111] group-hover:translate-x-0.5 transition-all inline-flex items-center gap-1"
                        >
                          <span>READ</span>
                          <span>→</span>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Action Call to Action */}
          <FadeInUp delay={0.55} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
            <Link
              to="/research/how-llms-work"
              className="btn-editorial-red flex items-center justify-center gap-3 text-xs sm:text-sm font-bold tracking-wider py-3 px-6 cursor-pointer group"
            >
              <span>READ THE WHOLE RESEARCH</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/research"
              className="btn-editorial-outline text-[#111111] border-[#111111] hover:border-[#FF1E27] hover:text-[#FF1E27] flex items-center justify-center gap-2 text-xs sm:text-sm font-bold tracking-wider py-3 px-6 transition-colors group cursor-pointer"
            >
              <span>VIEW ALL {topics.length > 0 ? topics.length : 20} RESEARCH PAPERS</span>
              <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </FadeInUp>

          {/* Editorial Excerpt Notice */}
          <div className="text-[10px] text-[#777770] leading-relaxed pt-1">
            * All research notebooks include mathematical formulations, algorithmic implementations, loss curves, and failure cascades inside the Research Lab.
          </div>

        </div>

      </div>
    </section>
  );
}
