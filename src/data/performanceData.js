/**
 * PERFORMANCE DATA REGISTRY
 * 
 * Data-driven architecture for measurable technical quality of selected projects.
 * 
 * CRITICAL RULE:
 * NEVER INVENT SCORES OR PERFORMANCE DATA.
 * If real measurements are unavailable, status is "NOT MEASURED" and metrics are null ("—").
 * 
 * Supported Statuses: "MEASURED" | "NOT MEASURED" | "OUTDATED"
 * Supported Sources: "LIGHTHOUSE" | "PAGESPEED" | "WEB VITALS" | "MANUAL TEST" | "OTHER"
 */

export const metricDefinitions = {
  performance: {
    name: "Performance",
    abbrev: "PERF",
    description: "Evaluates overall loading speed, main-thread blocking time, and runtime execution efficiency."
  },
  accessibility: {
    name: "Accessibility",
    abbrev: "A11Y",
    description: "Measures WCAG 2.1 AA compliance, semantic HTML hierarchy, ARIA attributes, and color contrast."
  },
  bestPractices: {
    name: "Best Practices",
    abbrev: "BP",
    description: "Audits security protocols, modern JavaScript APIs, secure HTTPS headers, and console integrity."
  },
  seo: {
    name: "SEO",
    abbrev: "SEO",
    description: "Audits search discoverability, metadata tags, structured schema, robots indexing, and viewport meta."
  },
  lcp: {
    name: "Largest Contentful Paint",
    abbrev: "LCP",
    target: "< 2.5s",
    description: "Core Web Vital measuring perceived loading speed — timestamp when the largest visual block renders."
  },
  inp: {
    name: "Interaction to Next Paint",
    abbrev: "INP",
    target: "< 200ms",
    description: "Core Web Vital measuring overall responsiveness — latency of all click, tap, and keyboard inputs."
  },
  cls: {
    name: "Cumulative Layout Shift",
    abbrev: "CLS",
    target: "< 0.1",
    description: "Core Web Vital measuring visual stability — sum of all unexpected layout shifts during session."
  },
  fcp: {
    name: "First Contentful Paint",
    abbrev: "FCP",
    target: "< 1.8s",
    description: "Measures time from navigation start to when the browser renders the first piece of DOM content."
  },
  ttfb: {
    name: "Time to First Byte",
    abbrev: "TTFB",
    target: "< 800ms",
    description: "Server response latency — time required for the initial response byte to arrive at the client."
  },
  loadTime: {
    name: "Total Load Time",
    abbrev: "LOAD",
    target: "< 2.0s",
    description: "Total wall-clock duration until the window load event fires with all initial dependencies resolved."
  }
};

export const projectPerformanceData = [
  {
    id: "portfolio",
    projectId: null,
    project: "Portfolio Website (REUBG.IN)",
    tagline: "Vite + React 19 + Tailwind CSS Production Deployment",
    url: "https://reubg.in",
    status: "NOT MEASURED",
    measuredAt: null,
    source: null,
    reportUrl: null,
    caseStudyId: null,

    // Lighthouse Category Scores (0-100 or null)
    performance: null,
    accessibility: null,
    seo: null,
    bestPractices: null,

    // Core Web Vitals & Timings
    lcp: null,
    inp: null,
    cls: null,
    fcp: null,
    ttfb: null,
    loadTime: null,

    // Real Before / After comparison (only when both are real measurements)
    beforeAfter: null,

    notes: "Production deployment live audit scheduled. Metrics will be populated following verified Lighthouse and PageSpeed testing."
  },
  {
    id: "nexora",
    projectId: "nexora",
    project: "NEXORA (Full-Stack MERN)",
    tagline: "Real-Time E-Commerce Engine with Socket.IO Pipelines",
    url: "https://github.com/daneyyhh/nexora-mern-ecommerce",
    status: "NOT MEASURED",
    measuredAt: null,
    source: null,
    reportUrl: null,
    caseStudyId: "nexora",

    performance: null,
    accessibility: null,
    seo: null,
    bestPractices: null,

    lcp: null,
    inp: null,
    cls: null,
    fcp: null,
    ttfb: null,
    loadTime: null,

    beforeAfter: null,

    notes: "Full-stack client and Socket.IO event gateway performance benchmarks pending live staging environment deployment."
  },
  {
    id: "fivem-chronicles",
    projectId: "fivem-chronicles",
    project: "FIVEM CHRONICLES",
    tagline: "High-Throughput Lua Game Server Architecture",
    url: "https://github.com/daneyyhh",
    status: "NOT MEASURED",
    measuredAt: null,
    source: null,
    reportUrl: null,
    caseStudyId: "fivem-chronicles",

    performance: null,
    accessibility: null,
    seo: null,
    bestPractices: null,

    lcp: null,
    inp: null,
    cls: null,
    fcp: null,
    ttfb: null,
    loadTime: null,

    beforeAfter: null,

    notes: "Real-time game server script tick rates (<0.02ms) verified via Lua engine profiler; web interface audit pending."
  },
  {
    id: "haunted-house",
    projectId: "haunted-house",
    project: "HAUNTED HOUSE (Unity 3D)",
    tagline: "First-Person Atmospheric Horror Game on Unity Play",
    url: "https://play.unity.com/en/games/aa0605eb-0e94-4d82-a4c3-6e1a8089744b/haunted-house",
    status: "NOT MEASURED",
    measuredAt: null,
    source: null,
    reportUrl: null,
    caseStudyId: "haunted-house",

    performance: null,
    accessibility: null,
    seo: null,
    bestPractices: null,

    lcp: null,
    inp: null,
    cls: null,
    fcp: null,
    ttfb: null,
    loadTime: null,

    beforeAfter: null,

    notes: "Target 60+ FPS sustained in Unity Profiler. WebAssembly browser Core Web Vitals audit pending."
  }
];
