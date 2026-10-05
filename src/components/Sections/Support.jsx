import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Coffee, ArrowUpRight, CheckCircle2, ShieldCheck, Terminal, Sparkles, ExternalLink } from 'lucide-react';
import { MaskHeading, MaskParagraph, FadeInUp } from '../UI/TextReveal';
import SupportCard from '../UI/SupportCard';

const EASE = [0.16, 1, 0.3, 1];
const BUY_ME_A_COFFEE_URL = "https://buymeacoffee.com/reubg.dev";

// 7 core pillars sustained by community support
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

export default function Support() {
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="support"
      className="min-h-[90svh] py-20 sm:py-28 px-4 sm:px-6 md:px-12 bg-[#F1F0EB] text-[#111111] relative overflow-x-clip border-t border-[#C9C7C0] font-mono w-full"
    >
      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16 relative z-10 w-full">
        
        {/* Section Header with 12-Column Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-end border-b border-[#C9C7C0] pb-6 sm:pb-8 w-full">
          <div className="hidden lg:flex lg:col-span-1">
            <motion.span
              initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 0.6, ease: EASE }}
              className="font-mono text-4xl font-extrabold text-[#111111]"
            >
              07
            </motion.span>
          </div>

          <div className="lg:col-span-11 space-y-2 w-full max-w-full">
            <motion.div
              initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 0.6, ease: EASE }}
              className="text-xs text-[#FF1E27] font-bold uppercase tracking-widest flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF1E27] animate-pulse" />
              <span>SUPPORT REUBG DEV // BUY ME A COFFEE</span>
            </motion.div>

            <MaskHeading
              lines={["SUPPORT THE BUILD"]}
              className="font-syne font-extrabold text-[#111111] uppercase tracking-tight w-full max-w-full overflow-visible"
              style={{
                fontSize: 'clamp(2rem, 7vw, 4rem)',
                letterSpacing: 'clamp(-0.03em, -0.2vw, 0em)',
              }}
              delay={0.15}
            />

            <MaskParagraph delay={0.25} className="font-sans text-slate-700 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
              <p>“If you like what I build, research, experiment with, or share, you can support the journey.”</p>
            </MaskParagraph>
          </div>
        </div>

        {/* 2-Column Main Support Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start w-full">
          
          {/* Left Column: Mission, Sustained Areas, and Direct CTA */}
          <div className="lg:col-span-7 space-y-8 w-full">
            
            {/* Overview Statement */}
            <FadeInUp delay={0.2} yOffset={20}>
              <div className="bg-[#FAF9F5] border border-[#C9C7C0] p-6 sm:p-8 space-y-4 shadow-sm">
                <div className="flex items-center justify-between border-b border-[#C9C7C0] pb-3">
                  <span className="text-xs font-mono font-bold text-[#FF1E27] uppercase tracking-widest">
                    SUPPORT THE WORK BEHIND REUBG DEV
                  </span>
                  <span className="text-[10px] text-[#888884] font-mono">
                    [ INDEPENDENT_CREATOR ]
                  </span>
                </div>

                <p className="font-sans text-sm sm:text-base text-[#333333] leading-relaxed">
                  Every technical project, AI research notebook, open-source experiment, and interactive game system showcased here is created independently. Your voluntary support directly enables me to invest dedicated time, study complex systems from first principles, and share knowledge transparently with the developer community.
                </p>

                {/* Primary CTA Button */}
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
            </FadeInUp>

            {/* Structured Sustained Areas Grid */}
            <FadeInUp delay={0.3} yOffset={20} className="space-y-4">
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
            </FadeInUp>

            {/* Official Platform Integrity Notice */}
            <FadeInUp delay={0.35} yOffset={15}>
              <div className="flex items-start gap-3 p-4 bg-[#EDECE6] border border-[#C9C7C0] text-xs text-[#555555] font-mono">
                <ShieldCheck size={18} className="text-[#111111] shrink-0 mt-0.5" />
                <div className="space-y-1 leading-relaxed">
                  <div className="text-[11px] font-bold text-[#111111] uppercase tracking-wider">
                    DIRECT CREATOR DESTINATION
                  </div>
                  <p className="text-[11px] text-[#666664]">
                    All support contributions route securely through the official Buy Me a Coffee platform at <span className="text-[#111111] font-semibold underline decoration-[#FF1E27]">buymeacoffee.com/reubg.dev</span>. No accounts, store systems, or payment credentials are processed or stored on this portfolio.
                  </p>
                </div>
              </div>
            </FadeInUp>

          </div>

          {/* Right Column: Compact Support Card & Interactive Details */}
          <div className="lg:col-span-5 space-y-6 w-full">
            
            {/* The Compact Support Card */}
            <FadeInUp delay={0.25} yOffset={25}>
              <SupportCard />
            </FadeInUp>

            {/* Engineering Ethics / Developer Transparency */}
            <FadeInUp delay={0.35} yOffset={20}>
              <div className="bg-[#FAF9F5] border border-[#C9C7C0] p-6 space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#111111] uppercase tracking-wider">
                  <Terminal size={14} className="text-[#FF1E27]" />
                  <span>DEVELOPMENT PHILOSOPHY</span>
                </div>
                
                <p className="font-sans text-xs text-[#555555] leading-relaxed">
                  REUBG DEV is built on a transparent foundation: no paywalled articles, no forced sponsorships, and no gated code. Supporting the build is 100% voluntary and directly motivates new open-source initiatives and technical explorations.
                </p>

                <div className="pt-2 border-t border-[#C9C7C0] flex items-center justify-between text-[11px] font-mono">
                  <span className="text-[#888884]">PORTAL STATUS</span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                    LIVE ON BUY ME A COFFEE
                  </span>
                </div>
              </div>
            </FadeInUp>

          </div>

        </div>

      </div>
    </section>
  );
}
