import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Target, 
  Layout, 
  Code2, 
  Rocket, 
  ShieldCheck, 
  RefreshCw, 
  CheckCircle2, 
  ArrowRight, 
  ArrowDown, 
  Repeat,
  Layers,
  Wrench,
  Gauge,
  FileCheck2,
  Workflow,
  Sparkles
} from 'lucide-react';

const STAGES = [
  {
    id: "01",
    name: "DISCOVER",
    icon: Search,
    protocol: "PROTOCOL 01 // PROBLEM DISCOVERY & DOMAIN AUDIT",
    headline: "Deconstruct the core problem, user constraints, and technical feasibility before writing code.",
    detail: "High-impact software engineering begins with ruthless domain inquiry. Rather than jumping blindly into code, we extract user behavioral friction, audit technical dependencies, analyze competing architectures, and establish unshakeable operational parameters.",
    focus: "Contextual Inquiry • User Journey Mapping • Constraint Modeling • Technical Spikes",
    caseStudyRef: "In NEXORA: Audited concurrent cart behaviors, evaluated Socket.IO vs Server-Sent Events under 500 concurrent connections, and modeled warehouse inventory race conditions.",
    tools: ["Figma FigJam", "Google Analytics 4", "Postman / Bruno", "User Journey Maps", "Constraint Matrices", "Technical Spikes"],
    pillars: [
      { num: "01", title: "CONTEXTUAL INQUIRY", desc: "Engaging end-users and stakeholders to expose latent operational friction and workflow bottlenecks." },
      { num: "02", title: "TECHNICAL SPIKES", desc: "Prototyping high-risk architectural assumptions and evaluating third-party API rate limits early." },
      { num: "03", title: "COMPETITIVE BENCHMARK", desc: "Reverse-engineering category leaders to locate untapped design leverage and latency advantages." },
      { num: "04", title: "CONSTRAINT MODELING", desc: "Locking strict operational boundaries for memory overhead, network conditions, and hardware targets." }
    ],
    workflow: [
      { step: "1", title: "Stakeholder Inquiry", desc: "Extract problem boundaries & core goals" },
      { step: "2", title: "Journey Friction Mapping", desc: "Locate drop-off points & UX dead ends" },
      { step: "3", title: "Technical Spikes", desc: "Validate third-party API latency & limits" },
      { step: "4", title: "Constraint Sign-off", desc: "Finalize immutable engineering boundaries" }
    ],
    activities: [
      "Contextual user research & stakeholder inquiry sessions",
      "Problem space deconstruction & constraint modeling",
      "Technical viability & third-party dependency analysis",
      "Market benchmarking & competitive latency profiling"
    ],
    metrics: "100% Problem Space Clarity • Zero Unvetted Dependencies",
    deliverable: "Validated Problem Space Dossier & Technical Feasibility Report",
    bgTint: "bg-[#09090C]"
  },
  {
    id: "02",
    name: "DEFINE",
    icon: Target,
    protocol: "PROTOCOL 02 // SYSTEM ARCHITECTURE & CONTRACT TYPING",
    headline: "Translate research into a rigorous system architecture, data models, and API contracts.",
    detail: "Vagueness creates technical debt. In this stage, we crystallize exact entity relationship models, TypeScript interfaces, REST & WebSocket contracts, state management topologies, and MoSCoW prioritization to eliminate ambiguity.",
    focus: "System Architecture • Data Contracts • State Topologies • ADR Documentation",
    caseStudyRef: "In NEXORA: Engineered dual-mode persistence contracts (MongoDB Atlas primary with local JSON fallback) and defined 14 distinct bidirectional Socket.IO event payloads.",
    tools: ["TypeScript", "Zod", "Mermaid.js", "OpenAPI / Swagger", "Draw.io", "ADR Templates"],
    pillars: [
      { num: "01", title: "SYSTEM ARCHITECTURE", desc: "Drafting decoupled client-server topologies, state hydration flows, and distributed event buses." },
      { num: "02", title: "STRICT API CONTRACTS", desc: "Authoring end-to-end TypeScript interfaces, Zod runtime schemas, and OpenAPI/REST endpoints." },
      { num: "03", title: "MOSCOW ROADMAP", desc: "Locking non-negotiable MVP milestones and isolating speculative features for subsequent releases." },
      { num: "04", title: "ADR SPECIFICATIONS", desc: "Permanently documenting technical trade-offs, database paradigms, and compute infrastructure choices." }
    ],
    workflow: [
      { step: "1", title: "Topology Blueprint", desc: "Diagram component hierarchies & data flows" },
      { step: "2", title: "Strict Schema Typing", desc: "Define TypeScript interfaces & Zod validators" },
      { step: "3", title: "API Gateway Contracts", desc: "Document REST routes & WebSocket events" },
      { step: "4", title: "Scope Freeze Agreement", desc: "Lock MoSCoW deliverables & sign off ADRs" }
    ],
    activities: [
      "End-to-end entity relationship & component hierarchy blueprints",
      "Strict schema definitions with TypeScript & OpenAPI contracts",
      "MoSCoW milestone roadmap & scope freeze agreements",
      "Architectural Decision Records (ADR) for storage and compute"
    ],
    metrics: "100% API Surface Definition • Zero Scope Creep",
    deliverable: "System Architecture Blueprint & Formal API Contract Suite",
    bgTint: "bg-[#0C0C10]"
  },
  {
    id: "03",
    name: "DESIGN",
    icon: Layout,
    protocol: "PROTOCOL 03 // DESIGN SYSTEMS & KINETIC ERGONOMICS",
    headline: "Construct mathematical design tokens, spatial design systems, and 60fps motion fidelity.",
    detail: "Interface design is functional psychology. We establish strict mathematical typographic scales, cohesive token libraries, ergonomic mobile interactions, WCAG AAA contrast ratios, and buttery 60fps spring micro-animations.",
    focus: "Design Systems • Motion Physics • Spatial 3D • Ergonomics",
    caseStudyRef: "In REUBG DEV & Merch Lab: Engineered 3D physical t-shirt studio canvas, dark luxury brutalist aesthetics, and responsive custom smooth navigation.",
    tools: ["Figma & Tokens", "Framer Motion", "Spline / Blender", "Tailwind CSS", "WCAG Audit Tools"],
    pillars: [
      { num: "01", title: "MATHEMATICAL DESIGN TOKENS", desc: "Constructing scalable color (HSL tailored), typography (Major Third), and 4px baseline grids." },
      { num: "02", title: "RESPONSIVE ERGONOMICS", desc: "Crafting fluid layouts across mobile, tablet, desktop, and ultra-wide screens with thumb-zone ergonomics." },
      { num: "03", title: "PHYSICAL MOTION PHYSICS", desc: "Calibrating spring physics, gesture momentum, and interactive hover states." },
      { num: "04", title: "SPATIAL 3D OPTIMIZATION", desc: "Optimizing 3D GLTF models, ambient lighting, and shader textures for fast render times." }
    ],
    workflow: [
      { step: "1", title: "Design Tokens", desc: "Build typography, color & spacing tokens" },
      { step: "2", title: "Responsive Layouts", desc: "Design mobile, tablet & desktop viewports" },
      { step: "3", title: "Motion Physics", desc: "Tune Framer Motion springs & micro-states" },
      { step: "4", title: "3D Asset Baking", desc: "Compress GLTF meshes & generate textures" }
    ],
    activities: [
      "Design token architecture with accessible contrast ratios (WCAG AAA)",
      "Multi-breakpoint responsive layouts for mobile, tablet, and ultra-wide",
      "Physics-based spring animation curves & micro-interactive hover states",
      "WebGL shader drafting and 3D spatial canvas asset optimization"
    ],
    metrics: "60 FPS Motion Lock • 7:1 WCAG AAA Contrast",
    deliverable: "Production Design System & Interactive High-Fidelity Prototype",
    bgTint: "bg-[#0A0A0E]"
  },
  {
    id: "04",
    name: "BUILD",
    icon: Code2,
    protocol: "PROTOCOL 04 // FULL-STACK IMPLEMENTATION & CORE LOGIC",
    headline: "Engineer production-grade software with strict typings, clean architecture, and decoupled systems.",
    detail: "Execution is where design vision meets engineering discipline. We build resilient full-stack architectures using modern frameworks, clean state management, modular APIs, atomic warehouse transactions, and hardware-accelerated WebGL graphics.",
    focus: "Clean Architecture • State Topologies • WebGL Shaders • Strict Type Safety",
    caseStudyRef: "In NEXORA: Built atomic warehouse inventory decrement logic ($inc), JWT auth middleware, and client-side dual-angle image crossfade system.",
    tools: ["React 19", "Vite / Next.js", "TypeScript", "Tailwind CSS", "Node.js & Express", "Socket.IO", "Zustand"],
    pillars: [
      { num: "01", title: "MODULAR COMPONENT TREES", desc: "Constructing atomic, reusable components with decoupled state and zero props drilling." },
      { num: "02", title: "REAL-TIME PIPELINES", desc: "Deploying bidirectional Socket.IO event buses and optimistic UI state caching." },
      { num: "03", title: "HARDWARE-ACCELERATED SHADERS", desc: "Integrating Three.js canvas lifecycles with custom GLSL vertex and fragment shaders." },
      { num: "04", title: "STRICT COMPILATION", desc: "Enforcing zero TypeScript any types, rigorous ESLint standards, and tree-shakeable bundles." }
    ],
    workflow: [
      { step: "1", title: "Architecture Setup", desc: "Configure state store & API client topologies" },
      { step: "2", title: "Core Logic & APIs", desc: "Implement business rules, routes & real-time events" },
      { step: "3", title: "Canvas Acceleration", desc: "Wire Three.js scenes & custom WebGL shaders" },
      { step: "4", title: "Resilience Gates", desc: "Add optimistic mutations & error boundaries" }
    ],
    activities: [
      "Component development with React 19, TypeScript, and modern hooks",
      "Full-stack REST API & real-time bidirectional WebSocket implementation",
      "Three.js persistent WebGL canvas integration and memory management",
      "State store configuration with optimistic mutation handling"
    ],
    metrics: "100% Strict Type Coverage • < 150kB JS Bundle",
    deliverable: "Production-Grade Full-Stack Application Codebase",
    bgTint: "bg-[#0E0E14]"
  },
  {
    id: "05",
    name: "DEPLOY",
    icon: Rocket,
    protocol: "PROTOCOL 05 // EDGE DEPLOYMENT & PIPELINE AUTOMATION",
    headline: "Automate edge distribution, immutable caching, and CI/CD pipelines.",
    detail: "Shipping software reliably demands automated pipelines. We orchestrate automated continuous integration, edge network routing, HTTPS/TLS 1.3 hardening, and asset compression for worldwide sub-50ms Time-To-First-Byte.",
    focus: "CI/CD Pipelines • Edge CDN • Cache Optimization • Security Hardening",
    caseStudyRef: "In reubg.in: Deployed onto Vercel Edge with Brotli compression, instant HMR preview environments, and immutable hashed asset bundles.",
    tools: ["GitHub Actions", "Vercel Edge Network", "Cloudflare DNS", "Docker", "Terser / PostCSS"],
    pillars: [
      { num: "01", title: "AUTOMATED CI/CD WORKFLOWS", desc: "Executing automated build checks, lint verification, and preview environment creation." },
      { num: "02", title: "MULTI-REGION EDGE ROUTING", desc: "Serving static assets via global edge nodes with instant TTFB and Brotli compression." },
      { num: "03", title: "IMMUTABLE ASSET CACHING", desc: "Configuring cache-control headers, content-hashed filenames, and zero-downtime rollouts." },
      { num: "04", title: "SECURITY HEADERS", desc: "Configuring Content Security Policies (CSP), CORS controls, and strict HTTPS redirection." }
    ],
    workflow: [
      { step: "1", title: "CI Automation", desc: "Setup GitHub Actions lint & build checks" },
      { step: "2", title: "Global Edge Routing", desc: "Configure Vercel / Cloudflare edge network" },
      { step: "3", title: "Asset Optimization", desc: "Apply Brotli compression & bundle splitting" },
      { step: "4", title: "Security Hardening", desc: "Verify CSP headers, CORS & TLS 1.3" }
    ],
    activities: [
      "Continuous Integration & Continuous Deployment pipeline automation",
      "Global Edge CDN deployment with automated SSL/TLS certificates",
      "Bundle tree-shaking, code splitting, and Brotli asset compression",
      "Dynamic OpenGraph metadata, sitemap generation, and SEO schemas"
    ],
    metrics: "< 50ms Edge TTFB • Zero-Downtime Rollouts",
    deliverable: "Live Globally Distributed Production Cloud Infrastructure",
    bgTint: "bg-[#0A0A0D]"
  },
  {
    id: "06",
    name: "TEST",
    icon: ShieldCheck,
    protocol: "PROTOCOL 06 // SYSTEM AUDITING & STRESS BENCHMARKS",
    headline: "Subject every user path, viewport, and network condition to rigorous testing.",
    detail: "Quality is non-negotiable. We stress-test cross-browser rendering, audit WCAG accessibility compliance, measure Core Web Vitals under CPU throttling, and verify edge-case recovery to eliminate failure modes.",
    focus: "Core Web Vitals • Accessibility QA • Cross-Device Matrix • Stress Scenarios",
    caseStudyRef: "In Portfolio: Profiled Lenis smooth scroll momentum under 4x CPU throttle, verified 60fps canvas animations on mobile Safari, and zero layout shift.",
    tools: ["Google Lighthouse", "Chrome DevTools Profiler", "Axe Accessibility", "Playwright", "WebPageTest"],
    pillars: [
      { num: "01", title: "CORE WEB VITALS TUNING", desc: "Guaranteeing sub-second LCP, zero Cumulative Layout Shift, and minimal INP latency." },
      { num: "02", title: "CROSS-BROWSER AUDITING", desc: "Testing across Chromium, WebKit (Safari), and Gecko (Firefox) on both mobile and desktop." },
      { num: "03", title: "ACCESSIBILITY CERTIFICATION", desc: "Validating full keyboard navigation, screen reader ARIA roles, and modal focus traps." },
      { num: "04", title: "NETWORK STRESS SIMULATION", desc: "Benchmarking offline resilience, slow 3G performance, and edge error boundaries." }
    ],
    workflow: [
      { step: "1", title: "Automated Test Runs", desc: "Execute unit & end-to-end integration suites" },
      { step: "2", title: "Vitals Profiling", desc: "Audit LCP, CLS & INP under 4x CPU throttling" },
      { step: "3", title: "Device Matrix QA", desc: "Verify iOS, Android, macOS & Windows layouts" },
      { step: "4", title: "Accessibility Sign-off", desc: "Audit keyboard traps & screen reader ARIA" }
    ],
    activities: [
      "Core Web Vitals profiling under 4x CPU and network throttling",
      "Full keyboard tab-traversal and screen-reader accessibility auditing",
      "Cross-device rendering verification across iOS, Android, macOS, and Windows",
      "Graceful degradation and error boundary stress testing"
    ],
    metrics: "99+ Lighthouse Score • Zero Unhandled Exceptions",
    deliverable: "Hardened, Audited, and Performance-Certified Production Build",
    bgTint: "bg-[#0C0C10]"
  },
  {
    id: "07",
    name: "ITERATE",
    icon: RefreshCw,
    protocol: "PROTOCOL 07 // LIVE TELEMETRY & CONTINUOUS EVOLUTION",
    headline: "Harness live user telemetry and feedback to continuously evolve the product.",
    detail: "Software launch is Day One. We analyze real user telemetry, identify conversion bottlenecks, profile runtime memory, and push continuous refinements to keep the platform ahead of expectations.",
    focus: "Telemetry Monitoring • Performance Profiling • User Analytics • Continuous Loops",
    caseStudyRef: "In Live Deployments: Continuous performance monitoring, proactive bundle trimming, and real-time user feedback integration into active feature roadmaps.",
    tools: ["Vercel Analytics", "Sentry Error Monitoring", "Hotjar Heatmaps", "GitHub Issues", "Lighthouse CI"],
    pillars: [
      { num: "01", title: "REAL USER MONITORING (RUM)", desc: "Capturing real-time field data, error telemetry, and interaction drop-offs." },
      { num: "02", title: "RUNTIME MEMORY PROFILING", desc: "Monitoring WebGL GPU memory leaks and garbage collection pauses over long sessions." },
      { num: "03", title: "CONTINUOUS UPGRADE CYCLES", desc: "Shipping bi-weekly patch updates, dependency upgrades, and security improvements." },
      { num: "04", title: "FEEDBACK-DRIVEN EXPANSION", desc: "Iterating feature additions based on observed behavioral analytics and user surveys." }
    ],
    workflow: [
      { step: "1", title: "Telemetry Ingestion", desc: "Monitor field Core Web Vitals & crash reports" },
      { step: "2", title: "Memory Leak Audits", desc: "Inspect WebGL geometry disposal & GC cycles" },
      { step: "3", title: "Friction Point Review", desc: "Analyze interaction heatmaps & session replays" },
      { step: "4", title: "Sprint Deployment", desc: "Ship bi-weekly optimizations & feature upgrades" }
    ],
    activities: [
      "Real-time telemetry and error tracking pipeline integration",
      "User session heatmapping and interaction drop-off analysis",
      "Continuous dependency updates, security audits, and bundle pruning",
      "Iterative feature sprints and continuous platform evolution"
    ],
    metrics: "99.99% Uptime • Continuous Optimization Cycles",
    deliverable: "Continuously Evolving, Telemetry-Monitored Digital Platform",
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
      {/* 7 STICKY FULL PAGE SLIDES WITH DEEP DETAILS */}
      {STAGES.map((stage, idx) => {
        const Icon = stage.icon;
        const isFirst = idx === 0;
        const isLast = idx === STAGES.length - 1;

        return (
          <div
            key={stage.id}
            id={`process-stage-${stage.id}`}
            style={{
              zIndex: idx + 10,
            }}
            className={`sticky top-0 h-screen w-full ${stage.bgTint} border-t border-white/10 shadow-[0_-25px_60px_rgba(0,0,0,0.95)] pt-18 sm:pt-20 md:pt-22 pb-4 sm:pb-6 px-4 sm:px-8 md:px-12 flex flex-col justify-between overflow-y-auto select-none`}
          >
            {/* Massive Architectural Stage Number Watermark */}
            <span
              className="absolute right-4 sm:right-10 bottom-2 sm:bottom-6 font-syne font-black text-[28vw] sm:text-[20vw] text-white/[0.025] select-none pointer-events-none leading-none z-0"
              aria-hidden="true"
            >
              {stage.id}
            </span>

            {/* Ambient Red Accent Glow */}
            <div className="absolute top-0 left-1/4 w-1/2 h-36 bg-gradient-to-b from-[#FF1E27]/10 to-transparent blur-3xl pointer-events-none" />

            {/* ─────────────────────────────────────────────────────────
                TOP PROTOCOL HEADER & STAGE TRACKER
            ───────────────────────────────────────────────────────── */}
            <header className="relative z-10 max-w-7xl mx-auto w-full flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-white/10 pb-2.5 shrink-0">
              {/* Left Protocol Title */}
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF1E27] opacity-80" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF1E27]" />
                </span>
                <span className="text-[11px] font-mono text-[#FF1E27] tracking-widest uppercase font-bold">
                  03 // PROCESS LIFECYCLE
                </span>
                <span className="text-white/20 hidden md:inline">•</span>
                <span className="text-white/60 text-[11px] tracking-wider uppercase hidden md:inline">
                  {stage.protocol}
                </span>
              </div>

              {/* Center / Right: Interactive Stage Stepper */}
              <div className="flex items-center gap-1 sm:gap-1.5">
                {STAGES.map((s, i) => {
                  const isActive = i === idx;
                  const isPassed = i < idx;

                  return (
                    <button
                      key={s.id}
                      onClick={() => scrollToStage(i)}
                      className={`group flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider rounded-xs transition-all duration-200 cursor-pointer ${
                        isActive
                          ? 'bg-[#FF1E27] text-white font-bold shadow-[0_0_12px_rgba(255,30,39,0.6)]'
                          : isPassed
                          ? 'bg-white/10 text-white/70 hover:bg-white/20'
                          : 'bg-white/5 text-white/30 hover:bg-white/10'
                      }`}
                      title={`Jump to Stage ${s.id}: ${s.name}`}
                      aria-label={`Jump to Stage ${s.id}: ${s.name}`}
                    >
                      <span>{s.id}</span>
                      <span className="hidden lg:inline">{s.name}</span>
                    </button>
                  );
                })}

                <span className="text-[11px] font-mono font-bold text-[#FF1E27] bg-[#FF1E27]/10 px-2 py-0.5 border border-[#FF1E27]/30 ml-1">
                  {stage.id}/07
                </span>
              </div>
            </header>

            {/* ─────────────────────────────────────────────────────────
                MAIN FULL-SCREEN SLIDE BODY (2-COLUMN DEEP ARCHITECTURE)
            ───────────────────────────────────────────────────────── */}
            <main className="relative z-10 max-w-7xl mx-auto w-full flex-1 my-auto py-2.5 sm:py-3.5 flex items-center">
              <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
                
                {/* LEFT COLUMN: Hero Stage Title, Philosophy, Pillars & Real Project Ref */}
                <div className="lg:col-span-7 space-y-3.5 sm:space-y-4">
                  {/* Stage Tag */}
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xs bg-[#FF1E27]/15 border border-[#FF1E27]/40 flex items-center justify-center text-[#FF1E27] shadow-[0_0_14px_rgba(255,30,39,0.3)]">
                      <Icon size={18} />
                    </div>
                    <div>
                      <span className="text-[10px] text-[#FF1E27] font-mono font-bold tracking-widest block uppercase">
                        STAGE {stage.id} // 07
                      </span>
                      <span className="text-[11px] text-white/60 uppercase font-mono tracking-wider font-semibold">
                        {stage.name} EXECUTION PHASE
                      </span>
                    </div>
                  </div>

                  {/* Stage Name Headline */}
                  <div className="space-y-1">
                    <h2 className="font-syne font-black text-3xl sm:text-5xl md:text-6xl lg:text-[4.75rem] tracking-tight text-white uppercase leading-[0.9]">
                      {stage.name}
                    </h2>
                    <p className="font-sans text-sm sm:text-base md:text-lg text-stone-200 font-semibold leading-snug pt-0.5">
                      "{stage.headline}"
                    </p>
                  </div>

                  {/* Deep Narrative Detail */}
                  <p className="font-sans text-xs sm:text-[13px] text-stone-400 leading-relaxed max-w-xl">
                    {stage.detail}
                  </p>

                  {/* 4 Concrete Workflow Pillars Grid */}
                  <div className="pt-1 space-y-1.5">
                    <div className="flex items-center gap-2 text-[10px] text-white/50 uppercase font-mono font-bold tracking-widest">
                      <Layers size={12} className="text-[#FF1E27]" />
                      <span>CORE WORKFLOW PILLARS:</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {stage.pillars.map((pillar, pIdx) => (
                        <div
                          key={pIdx}
                          className="bg-white/[0.03] border border-white/10 p-2 sm:p-2.5 space-y-0.5 rounded-xs"
                        >
                          <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-[#FF1E27]">
                            <span>{pillar.num}.</span>
                            <span className="text-white uppercase">{pillar.title}</span>
                          </div>
                          <p className="font-sans text-[11px] text-stone-400 leading-snug">
                            {pillar.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Real Project Application Reference */}
                  <div className="bg-[#FF1E27]/[0.06] border border-[#FF1E27]/25 p-2.5 rounded-xs space-y-0.5 font-mono">
                    <div className="flex items-center gap-1.5 text-[9px] text-[#FF1E27] uppercase font-bold tracking-widest">
                      <Sparkles size={11} className="text-[#FF1E27]" />
                      <span>CASE STUDY BENCHMARK IN ACTION:</span>
                    </div>
                    <p className="font-sans text-[11px] text-stone-300 leading-snug">
                      {stage.caseStudyRef}
                    </p>
                  </div>

                  {/* Core Focus Badges */}
                  <div className="pt-0.5 flex flex-wrap gap-1.5">
                    {stage.focus.split('•').map((item, i) => (
                      <span
                        key={i}
                        className="text-[9px] font-mono font-medium text-[#FF1E27] bg-[#FF1E27]/10 px-2 py-0.5 border border-[#FF1E27]/30 tracking-wide"
                      >
                        {item.trim()}
                      </span>
                    ))}
                  </div>
                </div>

                {/* RIGHT COLUMN: Technical Specs, Tools, Stepper, Metrics & Deliverable Card */}
                <div className="lg:col-span-5">
                  <div className="bg-[#111116]/95 border border-white/10 border-t-2 border-t-[#FF1E27] p-4 sm:p-5 md:p-6 space-y-3.5 shadow-2xl relative">
                    
                    {/* Card Header */}
                    <div className="flex items-center justify-between border-b border-white/10 pb-2 font-mono">
                      <span className="text-[10px] text-[#FF1E27] font-bold tracking-widest uppercase flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF1E27]" />
                        STAGE SPECIFICATION & AUDIT
                      </span>
                      <span className="text-[10px] text-white/40">
                        [ {stage.id} / 07 ]
                      </span>
                    </div>

                    {/* Step-by-Step Execution Sequence */}
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-1.5 text-[10px] text-white/50 uppercase font-mono font-bold tracking-widest">
                        <Workflow size={11} className="text-[#FF1E27]" />
                        <span>EXECUTION SEQUENCE:</span>
                      </div>
                      <div className="grid grid-cols-2 gap-1.5 font-mono">
                        {stage.workflow.map((wf, wIdx) => (
                          <div key={wIdx} className="bg-white/[0.02] border border-white/10 p-1.5 space-y-0.5">
                            <div className="text-[9px] text-[#FF1E27] font-bold uppercase">
                              STEP 0{wf.step}: {wf.title}
                            </div>
                            <div className="text-[10px] text-stone-400 font-sans leading-tight">
                              {wf.desc}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tools & Methodologies */}
                    <div className="space-y-1.5 pt-0.5">
                      <div className="flex items-center gap-1.5 text-[10px] text-white/50 uppercase font-mono font-bold tracking-widest">
                        <Wrench size={11} className="text-[#FF1E27]" />
                        <span>TOOLING & ENVIRONMENT:</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {stage.tools.map((tool, tIdx) => (
                          <span
                            key={tIdx}
                            className="bg-[#1A1A22] border border-white/15 px-1.5 py-0.5 text-[10px] text-stone-300 font-mono"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Supporting Activities Checklist */}
                    <div className="space-y-1 pt-0.5">
                      <span className="text-[10px] text-white/50 uppercase tracking-widest font-mono font-bold block">
                        VERIFICATION ACTIVITIES:
                      </span>
                      <ul className="space-y-1 text-[11px] text-stone-300 font-mono">
                        {stage.activities.map((act, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <CheckCircle2 size={12} className="text-[#FF1E27] shrink-0 mt-0.5" />
                            <span className="leading-snug text-[10px] sm:text-[11px]">{act}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Target Metric Box */}
                    <div className="p-2 bg-white/[0.02] border border-white/10 flex items-center justify-between font-mono">
                      <div className="flex items-center gap-1.5 text-[10px] text-white/50 uppercase">
                        <Gauge size={12} className="text-[#FF1E27]" />
                        <span>SLA TARGET:</span>
                      </div>
                      <span className="text-[11px] text-[#FF1E27] font-bold">
                        {stage.metrics}
                      </span>
                    </div>

                    {/* Key Deliverable Box */}
                    <div className="pt-1.5 border-t border-white/10 space-y-1 font-mono">
                      <div className="flex items-center gap-1 text-[10px] text-white/40 uppercase tracking-widest font-bold">
                        <FileCheck2 size={11} className="text-[#FF1E27]" />
                        <span>PRIMARY DELIVERABLE ARTIFACT:</span>
                      </div>
                      <div className="bg-[#08080C] px-2.5 py-1.5 border border-white/10 flex items-center justify-between">
                        <span className="text-[11px] text-white font-bold truncate">
                          {stage.deliverable}
                        </span>
                        <span className="text-[#FF1E27] text-[9px] font-bold ml-2 shrink-0">
                          ✓ VERIFIED
                        </span>
                      </div>
                    </div>

                    {/* Iterate Indicator if Stage 07 */}
                    {stage.id === "07" && (
                      <div className="p-2 bg-[#FF1E27]/10 border border-[#FF1E27]/30 flex items-center gap-2 text-[11px] text-[#FF1E27] font-mono font-bold">
                        <Repeat size={13} className="animate-spin text-[#FF1E27]" style={{ animationDuration: '6s' }} />
                        <span>CONTINUOUS TELEMETRY & SPRINT LOOP</span>
                      </div>
                    )}

                  </div>
                </div>

              </div>
            </main>

            {/* ─────────────────────────────────────────────────────────
                BOTTOM STATUS BAR
            ───────────────────────────────────────────────────────── */}
            <footer className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between border-t border-white/10 pt-2.5 shrink-0 font-mono text-[10px] sm:text-xs text-white/40">
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
                    <ArrowRight size={13} />
                  </span>
                ) : (
                  <button
                    onClick={() => scrollToStage(idx + 1)}
                    className="flex items-center gap-1.5 text-stone-300 hover:text-[#FF1E27] uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    <span>SCROLL DOWN FOR STAGE 0{idx + 2} ({STAGES[idx + 1].name})</span>
                    <ArrowDown size={13} className="text-[#FF1E27] animate-bounce" />
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
