import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { Coffee, ArrowUpRight, ArrowLeft, ShieldCheck, Terminal, Heart, Sparkles, Copy, Check } from 'lucide-react';
import SupportCard from '../components/UI/SupportCard';

const EASE = [0.16, 1, 0.3, 1];
const BUY_ME_A_COFFEE_URL = "https://buymeacoffee.com/reubg.dev";

const SUSTAINED_AREAS = [
  {
    num: "01",
    title: "Open-Source Experiments",
    description: "Publishing accessible codebases, developer utilities, and reusable web modules for the community."
  },
  {
    num: "02",
    title: "Developer Projects",
    description: "Designing end-to-end full-stack architectures, interactive tools, and technical web experiences."
  },
  {
    num: "03",
    title: "AI Research",
    description: "Authoring deep first-principles dissertations, interactive model visualizations, and benchmark evaluations."
  },
  {
    num: "04",
    title: "Technical Experiments",
    description: "Prototyping cutting-edge 3D WebGL scenes, shader theory, and performance-tuned UI patterns."
  },
  {
    num: "05",
    title: "Game Development",
    description: "Creating procedural gameplay mechanics, atmosphere simulations, and Unity 3D physics engines."
  },
  {
    num: "06",
    title: "Portfolio Development",
    description: "Maintaining this live technical portfolio, continuous visual polish, and responsive performance."
  },
  {
    num: "07",
    title: "Future REUBG DEV Projects",
    description: "Funding development time and tooling for upcoming engineering releases and public research."
  }
];

export default function SupportPage({ onOpenResume }) {
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#F1F0EB] text-[#111111] font-mono selection:bg-[#FF1E27] selection:text-white pb-24">
      
      {/* Top Breadcrumb & Return Bar */}
      <div className="border-b border-[#C9C7C0] bg-[#EDECE6]/80 backdrop-blur-sm sticky top-[61px] sm:top-[69px] z-30 px-4 sm:px-6 md:px-12 py-3 text-xs flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link
            to="/"
            className="flex items-center gap-1.5 text-[#555555] hover:text-[#FF1E27] transition-colors"
          >
            <ArrowLeft size={13} />
            <span>PORTFOLIO</span>
          </Link>
          <span className="text-[#C9C7C0]">/</span>
          <span className="text-[#111111] font-bold">SUPPORT REUBG DEV</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF1E27] animate-pulse" />
          <span className="text-[10px] text-[#FF1E27] font-bold uppercase tracking-wider hidden sm:inline">
            BUY ME A COFFEE
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pt-12 sm:pt-16 space-y-12 sm:space-y-16">
        
        {/* Hero Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-end border-b border-[#C9C7C0] pb-8">
          <div className="hidden lg:flex lg:col-span-1">
            <span className="font-mono text-4xl font-extrabold text-[#111111]">
              07
            </span>
          </div>

          <div className="lg:col-span-11 space-y-3">
            <div className="text-xs text-[#FF1E27] font-bold uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF1E27]" />
              <span>OFFICIAL BUY ME A COFFEE DESTINATION</span>
            </div>

            <h1
              className="font-syne font-extrabold text-[#111111] uppercase tracking-tight leading-none"
              style={{
                fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
                letterSpacing: 'clamp(-0.03em, -0.2vw, 0em)',
              }}
            >
              SUPPORT THE BUILD<span className="text-[#FF1E27]">.</span>
            </h1>

            <p className="font-sans text-slate-700 text-base sm:text-lg max-w-3xl leading-relaxed">
              “If you like what I build, research, experiment with, or share, you can support the journey.”
            </p>
          </div>
        </div>

        {/* 2-Column Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Narrative, Areas Sustained, CTA */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Overview Box */}
            <div className="bg-[#FAF9F5] border border-[#C9C7C0] p-6 sm:p-8 space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-[#C9C7C0] pb-3">
                <span className="text-xs font-mono font-bold text-[#FF1E27] uppercase tracking-widest">
                  SUPPORT THE WORK BEHIND REUBG DEV
                </span>
                <span className="text-[10px] text-[#888884]">
                  [ INDEPENDENT_CREATOR ]
                </span>
              </div>

              <p className="font-sans text-sm sm:text-base text-[#333333] leading-relaxed">
                Every project, deep-dive AI dissertation, open-source tool, and game prototype on this portfolio is engineered independently from first principles. If you find value in this work, your support directly fuels continuous research and production builds.
              </p>

              {/* Primary Action Button */}
              <div className="pt-2">
                <a
                  href={BUY_ME_A_COFFEE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-editorial-red inline-flex items-center gap-3 py-3.5 px-6 text-xs sm:text-sm font-bold tracking-wider group cursor-pointer"
                >
                  <Coffee size={17} className="shrink-0" />
                  <span>☕ SUPPORT REUBG DEV</span>
                  <ArrowUpRight size={16} className="shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>

            {/* Sustained Focus Areas */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#555555] font-bold uppercase tracking-wider">
                  WHAT YOUR SUPPORT HELPS SUSTAIN
                </span>
                <span className="text-[10px] text-[#888884] font-mono">
                  [ 07 FOCUS AREAS ]
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SUSTAINED_AREAS.map((item) => (
                  <div
                    key={item.num}
                    className="bg-[#FAF9F5] border border-[#C9C7C0] hover:border-[#FF1E27] p-4 transition-all duration-200 group"
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono text-[#888884] mb-1">
                      <span className="text-[#FF1E27] font-bold">{item.num} //</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#111111]/20 group-hover:bg-[#FF1E27] transition-colors" />
                    </div>
                    <h4 className="font-mono text-xs font-bold text-[#111111] uppercase tracking-wide group-hover:text-[#FF1E27] transition-colors">
                      {item.title}
                    </h4>
                    <p className="font-sans text-[11px] text-[#555555] leading-relaxed mt-1">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Official Platform Transparency Note */}
            <div className="flex items-start gap-3 p-4 bg-[#EDECE6] border border-[#C9C7C0] text-xs text-[#555555] font-mono">
              <ShieldCheck size={18} className="text-[#111111] shrink-0 mt-0.5" />
              <div className="space-y-1 leading-relaxed">
                <div className="text-[11px] font-bold text-[#111111] uppercase tracking-wider">
                  OFFICIAL DESTINATION NOTICE
                </div>
                <p className="text-[11px] text-[#666664]">
                  All support contributions route securely through the official Buy Me a Coffee page at <span className="text-[#111111] font-semibold underline decoration-[#FF1E27]">buymeacoffee.com/reubg.dev</span>. No payment data or account info is collected on this portfolio.
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Compact Card & Philosophy */}
          <div className="lg:col-span-5 space-y-6">
            <SupportCard />

            <div className="bg-[#FAF9F5] border border-[#C9C7C0] p-6 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#111111] uppercase tracking-wider">
                <Terminal size={14} className="text-[#FF1E27]" />
                <span>DEVELOPMENT PRINCIPLES</span>
              </div>
              <p className="font-sans text-xs text-[#555555] leading-relaxed">
                REUBG DEV is built on a transparent foundation: no paywalled articles, no forced sponsorships, and no gated code. Supporting the build is 100% voluntary and directly motivates new open-source initiatives and technical explorations.
              </p>
              <div className="pt-2 border-t border-[#C9C7C0] flex items-center justify-between text-[11px] font-mono">
                <span className="text-[#888884]">PORTAL DESTINATION</span>
                <a
                  href={BUY_ME_A_COFFEE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FF1E27] font-bold hover:underline flex items-center gap-1"
                >
                  <span>buymeacoffee.com/reubg.dev</span>
                  <ArrowUpRight size={12} />
                </a>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <Link
                to="/"
                className="btn-editorial text-xs py-2.5 px-4 inline-flex items-center gap-2"
              >
                <ArrowLeft size={13} />
                <span>RETURN TO PORTFOLIO</span>
              </Link>
              <Link
                to="/research"
                className="btn-editorial-outline text-xs py-2.5 px-4 inline-flex items-center gap-2"
              >
                <span>VISIT AI LAB</span>
                <ArrowUpRight size={13} />
              </Link>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
