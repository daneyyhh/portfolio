import React, { useRef } from 'react';
import { 
  Search, 
  Target, 
  Layout, 
  Code2, 
  Rocket, 
  ShieldCheck, 
  RefreshCw, 
  ArrowRight, 
  ArrowDown, 
  Sparkles,
  Layers,
  Wrench,
  CheckCircle2
} from 'lucide-react';

const STAGES = [
  {
    id: "01",
    name: "DISCOVER",
    icon: Search,
    subtitle: "Problem Space & Constraint Audit",
    headline: "Deconstruct the core problem and operational boundaries before writing code.",
    summary: "High-impact engineering begins with domain inquiry. We extract user friction, audit third-party dependencies, analyze competing architectures, and lock down immutable operational parameters.",
    pillars: [
      { title: "Contextual User Inquiry", desc: "Engaging end-users to expose workflow bottlenecks and friction." },
      { title: "Technical Feasibility Spikes", desc: "Prototyping high-risk architectural assumptions & rate limits early." },
      { title: "Boundary & Constraint Modeling", desc: "Locking hard parameters for memory budgets and network resilience." }
    ],
    pipeline: [
      { step: "01", title: "Stakeholder Inquiry", desc: "Define core goals & problem space" },
      { step: "02", title: "Technical Spikes", desc: "Validate API latency & limits" },
      { step: "03", title: "Constraint Sign-off", desc: "Lock operational targets & SLAs" }
    ],
    tools: ["Figma FigJam", "Google Analytics 4", "Postman", "Technical Spikes"],
    sla: "100% Problem Space Clarity",
    deliverable: "Problem Space Dossier & Technical Feasibility Report",
    realWorld: "In NEXORA: Audited Socket.IO vs SSE under 500 concurrent carts to eliminate race conditions.",
    bgTint: "bg-[#09090C]"
  },
  {
    id: "02",
    name: "DEFINE",
    icon: Target,
    subtitle: "System Architecture & Contract Typing",
    headline: "Translate research into a rigorous system topology, data models, and API contracts.",
    summary: "Ambiguity creates technical debt. In this phase, we author exact entity relationship models, strict TypeScript interfaces, REST & WebSocket contracts, and formal Architectural Decision Records (ADRs).",
    pillars: [
      { title: "Decoupled Topology Blueprints", desc: "Designing client-server boundaries, state hydration, and event buses." },
      { title: "Strict End-to-End Typing", desc: "Authoring rigid TypeScript schemas, Zod validators, and OpenAPI specs." },
      { title: "Scope Freeze & ADR Sign-off", desc: "Locking non-negotiable milestones and documenting technical trade-offs." }
    ],
    pipeline: [
      { step: "01", title: "System Blueprints", desc: "Diagram component hierarchies & data flows" },
      { step: "02", title: "Schema Contracts", desc: "Define TypeScript interfaces & Zod validators" },
      { step: "03", title: "Scope Freeze", desc: "Sign off Architectural Decision Records" }
    ],
    tools: ["TypeScript", "Zod", "Mermaid.js", "OpenAPI", "Draw.io"],
    sla: "100% API Surface Definition",
    deliverable: "System Architecture Blueprint & Formal API Contract Suite",
    realWorld: "In NEXORA: Architected dual-mode persistence (MongoDB + JSON disk fallback) and 14 event payloads.",
    bgTint: "bg-[#0B0B0F]"
  },
  {
    id: "03",
    name: "DESIGN",
    icon: Layout,
    subtitle: "Design Systems & Spatial Ergonomics",
    headline: "Construct mathematical design tokens, spatial ergonomics, and 60fps motion fidelity.",
    summary: "Interface design is functional psychology. We establish strict typographic scales, cohesive token libraries, ergonomic mobile interactions, WCAG AAA contrast compliance, and buttery 60fps spring physics.",
    pillars: [
      { title: "Mathematical Token Architecture", desc: "Structuring color tokens (HSL tailored), Major Third typography, and 4px baseline rhythm." },
      { title: "Responsive Spatial Ergonomics", desc: "Crafting fluid layouts across mobile, tablet, and desktop with thumb-zone ergonomics." },
      { title: "Physical Motion & Micro-Interactions", desc: "Calibrating spring physics, gesture momentum, and interactive hover transitions." }
    ],
    pipeline: [
      { step: "01", title: "Token Foundations", desc: "Establish color, typography & spacing tokens" },
      { step: "02", title: "Responsive Layouts", desc: "Design multi-viewport ergonomic wireframes" },
      { step: "03", title: "Motion Physics", desc: "Calibrate Framer Motion springs & micro-states" }
    ],
    tools: ["Figma & Tokens", "Framer Motion", "Spline / Blender", "Tailwind CSS"],
    sla: "60 FPS Motion Lock • 7:1 Contrast Compliance",
    deliverable: "Production Design System & Interactive Prototype",
    realWorld: "In Merch Lab: Engineered 3D physical t-shirt studio canvas with luxury dark brutalist styling.",
    bgTint: "bg-[#0A0A0E]"
  },
  {
    id: "04",
    name: "BUILD",
    icon: Code2,
    subtitle: "Full-Stack Implementation & WebGL",
    headline: "Engineer production-grade software with strict typings and decoupled systems.",
    summary: "Execution is where design vision meets engineering discipline. We build resilient full-stack architectures using modern frameworks, clean state management, modular APIs, and hardware-accelerated graphics.",
    pillars: [
      { title: "Modular Component Trees", desc: "Constructing atomic, reusable components with isolated state and zero props drilling." },
      { title: "Real-Time Event Pipelines", desc: "Deploying bidirectional Socket.IO event buses and optimistic UI state caching." },
      { title: "Hardware-Accelerated WebGL", desc: "Orchestrating Three.js scenes with custom GLSL vertex and fragment shaders." }
    ],
    pipeline: [
      { step: "01", title: "State Topology", desc: "Configure Zustand store & API client layers" },
      { step: "02", title: "Core Logic & APIs", desc: "Implement full-stack routes & real-time events" },
      { step: "03", title: "Canvas Acceleration", desc: "Wire Three.js scenes & custom WebGL shaders" }
    ],
    tools: ["React 19", "Vite / Next.js", "TypeScript", "Node.js", "Socket.IO", "Three.js"],
    sla: "100% Strict Type Coverage • < 150kB JS Bundle",
    deliverable: "Production-Grade Full-Stack Application Codebase",
    realWorld: "In NEXORA: Built atomic warehouse decrement logic ($inc) and client-side dual-angle crossfades.",
    bgTint: "bg-[#0E0E14]"
  },
  {
    id: "05",
    name: "DEPLOY",
    icon: Rocket,
    subtitle: "Global Edge Infrastructure & CI/CD",
    headline: "Automate edge distribution, immutable caching, and CI/CD pipelines.",
    summary: "Shipping software reliably demands automated pipelines. We orchestrate automated continuous integration, edge network routing, HTTPS/TLS 1.3 hardening, and asset compression for worldwide speed.",
    pillars: [
      { title: "Automated CI/CD Workflows", desc: "Executing automated build checks, lint verification, and preview environment creation." },
      { title: "Multi-Region Edge Routing", desc: "Serving static assets via global edge nodes with instant TTFB and Brotli compression." },
      { title: "Immutable Caching & Security", desc: "Configuring cache-control headers, content-hashed assets, and Content Security Policies." }
    ],
    pipeline: [
      { step: "01", title: "CI Pipeline", desc: "Setup GitHub Actions lint & build checks" },
      { step: "02", title: "Edge CDN Routing", desc: "Configure global edge network & Brotli compression" },
      { step: "03", title: "Security Hardening", desc: "Verify CSP headers, CORS policies & TLS 1.3" }
    ],
    tools: ["GitHub Actions", "Vercel Edge Network", "Cloudflare DNS", "Terser"],
    sla: "< 50ms Edge TTFB • Zero-Downtime Rollouts",
    deliverable: "Live Globally Distributed Production Cloud Infrastructure",
    realWorld: "In reubg.in: Deployed on Vercel Edge with Brotli compression and hashed immutable assets.",
    bgTint: "bg-[#09090C]"
  },
  {
    id: "06",
    name: "TEST",
    icon: ShieldCheck,
    subtitle: "System Stress Benchmarks & QA",
    headline: "Subject every user path, viewport, and network condition to rigorous testing.",
    summary: "Quality is non-negotiable. We stress-test cross-browser rendering, audit WCAG accessibility compliance, measure Core Web Vitals under CPU throttling, and verify edge-case recovery.",
    pillars: [
      { title: "Core Web Vitals Optimization", desc: "Guaranteeing sub-second LCP, zero Cumulative Layout Shift, and minimal INP latency." },
      { title: "Cross-Device Engine Matrix", desc: "Testing across Chromium, WebKit (Safari), and Gecko (Firefox) on real devices." },
      { title: "Accessibility (WCAG AAA)", desc: "Validating full keyboard navigation, screen reader ARIA roles, and modal focus traps." }
    ],
    pipeline: [
      { step: "01", title: "Automated Test Runs", desc: "Execute unit & end-to-end integration suites" },
      { step: "02", title: "Vitals Profiling", desc: "Audit LCP, CLS & INP under 4x CPU throttling" },
      { step: "03", title: "Device Matrix QA", desc: "Verify iOS, Android, macOS & Windows layouts" }
    ],
    tools: ["Google Lighthouse", "Playwright", "Axe Accessibility", "Chrome Profiler"],
    sla: "99+ Lighthouse Score • Zero Unhandled Exceptions",
    deliverable: "Hardened, Audited, and Performance-Certified Production Build",
    realWorld: "In Portfolio: Profiled Lenis smooth scroll under 4x CPU throttle; verified 60fps on mobile Safari.",
    bgTint: "bg-[#0C0C10]"
  },
  {
    id: "07",
    name: "ITERATE",
    icon: RefreshCw,
    subtitle: "Live Telemetry & Continuous Evolution",
    headline: "Harness live user telemetry and feedback to continuously evolve the product.",
    summary: "Software launch is Day One. We analyze real user telemetry, identify conversion bottlenecks, profile runtime memory, and push continuous refinements to keep the platform ahead of expectations.",
    pillars: [
      { title: "Real User Monitoring (RUM)", desc: "Capturing real-time field data, error telemetry, and interaction drop-offs." },
      { title: "Runtime GPU & Memory Profiling", desc: "Monitoring WebGL buffer geometry disposal and garbage collection pauses." },
      { title: "Continuous Upgrade Sprints", desc: "Shipping bi-weekly patch updates, dependency upgrades, and security improvements." }
    ],
    pipeline: [
      { step: "01", title: "Telemetry Ingestion", desc: "Monitor field Core Web Vitals & crash reports" },
      { step: "02", title: "Memory Leak Audits", desc: "Inspect WebGL geometry disposal & GC cycles" },
      { step: "03", title: "Sprint Deployment", desc: "Ship bi-weekly optimizations & feature upgrades" }
    ],
    tools: ["Vercel Analytics", "Sentry", "Hotjar", "GitHub Issues", "Lighthouse CI"],
    sla: "99.99% Uptime • Continuous Optimization Cycles",
    deliverable: "Continuously Evolving, Telemetry-Monitored Digital Platform",
    realWorld: "In Live Deployments: Continuous performance monitoring, proactive bundle trimming, and active sprint roadmaps.",
    bgTint: "bg-[#08080B]"
  }
];

export default function ProcessSection() {
  const containerRef = useRef(null);

  // Smooth scroll to a specific sticky slide
  const scrollToStage = (stageIndex) => {
    const section = document.getElementById('process');
    if (!section) return;

    const sectionTop = section.offsetTop;
    const targetY = sectionTop + stageIndex * window.innerHeight;

    if (window.__lenis) {
      window.__lenis.scrollTo(targetY, {
        duration: 0.85,
        easing: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
      });
    } else {
      window.scrollTo({
        top: targetY,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section
      id="process"
      ref={containerRef}
      className="relative w-full bg-[#08080A] text-[#F1F0EB] font-mono selection:bg-[#FF1E27] selection:text-white"
    >
      {/* 7 STICKY FULL PAGE SLIDES WITH ELEGANT, UNCONGESTED ARCHITECTURE */}
      {STAGES.map((stage, idx) => {
        const Icon = stage.icon || Layers;
        const isLast = idx === STAGES.length - 1;

        return (
          <div
            key={stage.id}
            id={`process-stage-${stage.id}`}
            style={{
              zIndex: idx + 10,
            }}
            className={`sticky top-0 h-screen w-full ${stage.bgTint} border-t border-white/10 shadow-[0_-25px_60px_rgba(0,0,0,0.95)] pt-20 sm:pt-24 pb-6 sm:pb-8 px-6 sm:px-10 md:px-14 lg:px-20 flex flex-col justify-between overflow-y-auto select-none`}
          >
            {/* Massive Subtle Stage Number Watermark */}
            <span
              className="absolute right-6 sm:right-12 bottom-4 sm:bottom-8 font-syne font-black text-[25vw] text-white/[0.02] select-none pointer-events-none leading-none z-0"
              aria-hidden="true"
            >
              {stage.id}
            </span>

            {/* Ambient Red Accent Glow */}
            <div className="absolute top-0 left-1/3 w-1/3 h-40 bg-gradient-to-b from-[#FF1E27]/10 to-transparent blur-3xl pointer-events-none" />

            {/* ─────────────────────────────────────────────────────────
                TOP PROTOCOL HEADER & STAGE TRACKER
            ───────────────────────────────────────────────────────── */}
            <header className="relative z-10 max-w-7xl mx-auto w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3 shrink-0">
              {/* Left Protocol Title */}
              <div className="flex items-center gap-3">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF1E27] opacity-80" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF1E27]" />
                </span>
                <span className="text-xs font-mono text-[#FF1E27] tracking-widest uppercase font-bold">
                  03 // PROCESS LIFECYCLE
                </span>
                <span className="text-white/20 hidden md:inline">•</span>
                <span className="text-white/60 text-xs tracking-wider uppercase hidden md:inline">
                  {stage.subtitle}
                </span>
              </div>

              {/* Center / Right: Interactive Stage Stepper */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                {STAGES.map((s, i) => {
                  const isActive = i === idx;
                  const isPassed = i < idx;

                  return (
                    <button
                      key={s.id}
                      onClick={() => scrollToStage(i)}
                      className={`group flex items-center gap-1 px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider rounded-xs transition-all duration-200 cursor-pointer ${
                        isActive
                          ? 'bg-[#FF1E27] text-white font-bold shadow-[0_0_14px_rgba(255,30,39,0.5)]'
                          : isPassed
                          ? 'bg-white/10 text-white/70 hover:bg-white/20'
                          : 'bg-white/5 text-white/30 hover:bg-white/10'
                      }`}
                      title={`Jump to Stage ${s.id}: ${s.name}`}
                      aria-label={`Jump to Stage ${s.id}: ${s.name}`}
                    >
                      <span>{s.id}</span>
                      <span className="hidden md:inline">{s.name}</span>
                    </button>
                  );
                })}

                <span className="text-xs font-mono font-bold text-[#FF1E27] bg-[#FF1E27]/10 px-2.5 py-1 border border-[#FF1E27]/30 ml-1">
                  {stage.id}/07
                </span>
              </div>
            </header>

            {/* ─────────────────────────────────────────────────────────
                MAIN FULL-SCREEN SLIDE BODY (SPACIOUS 2-COLUMN LAYOUT)
            ───────────────────────────────────────────────────────── */}
            <main className="relative z-10 max-w-7xl mx-auto w-full flex-1 my-auto py-6 sm:py-8 flex items-center">
              <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
                
                {/* LEFT COLUMN: Identity, Manifesto & 3 Core Pillars */}
                <div className="lg:col-span-7 space-y-6">
                  {/* Stage Tag */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xs bg-[#FF1E27]/15 border border-[#FF1E27]/40 flex items-center justify-center text-[#FF1E27] shadow-[0_0_16px_rgba(255,30,39,0.25)]">
                      {Icon && <Icon size={20} />}
                    </div>
                    <div>
                      <span className="text-[11px] text-[#FF1E27] font-mono font-bold tracking-widest block uppercase">
                        STAGE {stage.id} // 07
                      </span>
                      <span className="text-xs text-white/60 uppercase font-mono tracking-wider font-semibold">
                        {stage.subtitle}
                      </span>
                    </div>
                  </div>

                  {/* Stage Name & Headline */}
                  <div className="space-y-2">
                    <h2 className="font-syne font-black text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] tracking-tight text-white uppercase leading-[0.9]">
                      {stage.name}
                    </h2>
                    <p className="font-sans text-base sm:text-xl text-stone-200 font-semibold leading-snug">
                      "{stage.headline}"
                    </p>
                  </div>

                  {/* Summary Narrative */}
                  <p className="font-sans text-sm sm:text-base text-stone-400 leading-relaxed max-w-xl">
                    {stage.summary}
                  </p>

                  {/* 3 Clear, Spacious Workflow Pillars */}
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center gap-2 text-xs text-white/50 uppercase font-mono font-bold tracking-widest">
                      <Layers size={14} className="text-[#FF1E27]" />
                      <span>CORE METHODOLOGICAL PILLARS:</span>
                    </div>

                    <div className="space-y-2.5">
                      {stage.pillars.map((pillar, pIdx) => (
                        <div
                          key={pIdx}
                          className="flex items-start gap-3 p-3 bg-white/[0.02] border-l-2 border-l-[#FF1E27] border-y border-r border-white/5 hover:bg-white/[0.04] transition-colors"
                        >
                          <span className="text-xs font-mono font-bold text-[#FF1E27] mt-0.5">
                            0{pIdx + 1}.
                          </span>
                          <div>
                            <h4 className="text-xs sm:text-sm font-mono font-bold text-white uppercase tracking-wider">
                              {pillar.title}
                            </h4>
                            <p className="font-sans text-xs sm:text-[13px] text-stone-400 leading-relaxed mt-0.5">
                              {pillar.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Deliverable Capsule */}
                  <div className="inline-flex items-center gap-2.5 px-3 py-1.5 bg-white/[0.03] border border-white/10 text-xs font-mono">
                    <span className="text-[#FF1E27] font-bold">DELIVERABLE:</span>
                    <span className="text-stone-300 font-medium">{stage.deliverable}</span>
                    <span className="text-[#FF1E27] text-[10px] font-bold">✓</span>
                  </div>
                </div>

                {/* RIGHT COLUMN: Streamlined Technical Architecture Panel */}
                <div className="lg:col-span-5">
                  <div className="bg-[#111116]/95 border border-white/10 border-t-2 border-t-[#FF1E27] p-6 sm:p-7 space-y-6 shadow-2xl relative">
                    
                    {/* Card Header */}
                    <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono">
                      <span className="text-xs text-[#FF1E27] font-bold tracking-widest uppercase flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF1E27]" />
                        EXECUTION BLUEPRINT
                      </span>
                      <span className="text-xs text-white/40">
                        [ STAGE 0{idx + 1} / 07 ]
                      </span>
                    </div>

                    {/* 3-Step Execution Pipeline */}
                    <div className="space-y-3">
                      <span className="text-[11px] text-white/50 uppercase font-mono font-bold tracking-widest block">
                        EXECUTION PIPELINE:
                      </span>
                      <div className="space-y-2 font-mono">
                        {stage.pipeline.map((item, pIdx) => (
                          <div
                            key={pIdx}
                            className="flex items-center justify-between p-2.5 bg-white/[0.02] border border-white/10"
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="w-6 h-6 rounded-xs bg-[#FF1E27]/10 text-[#FF1E27] text-xs font-bold flex items-center justify-center border border-[#FF1E27]/30 shrink-0">
                                {item.step}
                              </span>
                              <div>
                                <span className="text-xs text-white font-bold block uppercase">
                                  {item.title}
                                </span>
                                <span className="text-[11px] text-stone-400 font-sans block leading-tight">
                                  {item.desc}
                                </span>
                              </div>
                            </div>
                            <CheckCircle2 size={14} className="text-[#FF1E27] shrink-0 ml-2" />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Toolchain & Stack */}
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-2 text-[11px] text-white/50 uppercase font-mono font-bold tracking-widest">
                        <Wrench size={13} className="text-[#FF1E27]" />
                        <span>VERIFIED TOOLCHAIN:</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {stage.tools.map((tool, tIdx) => (
                          <span
                            key={tIdx}
                            className="bg-[#1A1A22] border border-white/15 px-2.5 py-1 text-xs text-stone-300 font-mono"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* SLA Target Metric */}
                    <div className="p-3 bg-white/[0.02] border border-white/10 flex items-center justify-between font-mono">
                      <span className="text-[11px] text-white/50 uppercase tracking-wider">
                        SLA BENCHMARK:
                      </span>
                      <span className="text-xs text-[#FF1E27] font-bold">
                        {stage.sla}
                      </span>
                    </div>

                    {/* Real World Impact Reference */}
                    <div className="p-3 bg-[#FF1E27]/[0.05] border border-[#FF1E27]/25 space-y-1 font-mono">
                      <div className="flex items-center gap-1.5 text-[10px] text-[#FF1E27] uppercase font-bold tracking-widest">
                        <Sparkles size={12} className="text-[#FF1E27]" />
                        <span>PRODUCTION BENCHMARK:</span>
                      </div>
                      <p className="font-sans text-xs text-stone-300 leading-relaxed italic">
                        "{stage.realWorld}"
                      </p>
                    </div>

                  </div>
                </div>

              </div>
            </main>

            {/* ─────────────────────────────────────────────────────────
                BOTTOM STATUS BAR
            ───────────────────────────────────────────────────────── */}
            <footer className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between border-t border-white/10 pt-3 shrink-0 font-mono text-xs text-white/40">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF1E27]" />
                <span className="tracking-widest uppercase">
                  PROCESS STAGE {stage.id} // {stage.name}
                </span>
              </div>

              {/* Scroll Directional Prompt */}
              <div className="flex items-center gap-2 text-right">
                {isLast ? (
                  <span className="text-[#FF1E27] font-bold flex items-center gap-1.5 uppercase tracking-wider animate-pulse">
                    <span>CONTINUE SCROLLING FOR SELECTED WORK</span>
                    <ArrowRight size={14} />
                  </span>
                ) : (
                  <button
                    onClick={() => scrollToStage(idx + 1)}
                    className="flex items-center gap-1.5 text-stone-300 hover:text-[#FF1E27] uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    <span>SCROLL FOR STAGE 0{idx + 2} ({STAGES[idx + 1].name})</span>
                    <ArrowDown size={14} className="text-[#FF1E27] animate-bounce" />
                  </button>
                )}
              </div>
            </footer>

          </div>
        );
      })}
    </section>
  );
}
