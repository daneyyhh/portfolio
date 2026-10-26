/**
 * REUBG DEV — Full-Stack Developer Roadmap
 * Practical Project Milestones (Progressive Ladder)
 *
 * For each project:
 * - Problem Statement
 * - Core Requirements
 * - Key Features
 * - Recommended Tools
 * - Suggested Architecture
 * - Development Milestones
 * - Testing Checklist
 * - Deployment Expectations
 * - Completion Criteria
 * - Potential Extensions
 */

export const projectsLadder = [
  {
    id: 'proj-01',
    num: '01',
    title: 'RESPONSIVE EDITORIAL WEBSITE',
    tagline: 'Web and Programming Foundations',
    difficulty: 'Foundational',
    problemStatement: 'Modern web developers frequently rely on heavy frameworks without understanding how HTML, CSS specificity, the box model, and the DOM cascade operate under the hood. Building a responsive, high-performance editorial website purely using semantic HTML, vanilla CSS custom properties, and foundational JavaScript forces mastery of core browser mechanisms.',
    requirements: [
      'Zero external UI frameworks (no Tailwind, Bootstrap, or React)',
      '100% semantic HTML5 document hierarchy with accessible landmarks',
      'Mobile-first responsive layout with CSS Grid and Flexbox',
      'Pure JavaScript DOM manipulation for interactive elements',
      'Flawless Lighthouse audit score (95+ across Performance, Accessibility, Best Practices, SEO)'
    ],
    features: [
      'Sticky navigation header with smooth scroll-spy indicators',
      'Multi-column editorial grid showcasing projects or articles',
      'Accessible mobile drawer menu with focus trap and keyboard navigation',
      'Interactive filterable gallery or search interface with zero layout shift',
      'Accessible contact form with client-side HTML5 & JS constraint validation'
    ],
    tools: [
      'Vanilla HTML5, CSS3, JavaScript (ES6+)',
      'VS Code with Live Server',
      'Browser DevTools (Elements, Console, Lighthouse)',
      'Git CLI & GitHub for version control'
    ],
    suggestedArchitecture: 'Static file structure: index.html for semantic layout, styles/main.css leveraging CSS custom properties for tokens, scripts/app.js decomposed into pure utility functions, and an assets/ directory with optimized WebP/SVG images.',
    milestones: [
      '1. Draft semantic HTML wireframe with proper heading hierarchy (h1 through h4)',
      '2. Establish CSS design system with custom properties for colors, spacing, and typography scales',
      '3. Implement mobile-first Flexbox and CSS Grid responsive layouts with media queries',
      '4. Add vanilla JS event listeners for the mobile drawer and live filter with debouncing',
      '5. Run accessibility audits via axe DevTools and resolve contrast and landmark issues'
    ],
    testingChecklist: [
      'Page scales seamlessly across 320px mobile up to 1920px 4K screens',
      'All interactive controls (buttons, links, inputs) are fully operable via Tab keyboard navigation',
      'Screen readers accurately announce form labels, errors, and image alt descriptions',
      'CSS animations respect @media (prefers-reduced-motion: reduce)'
    ],
    deploymentExpectations: 'Published on GitHub Pages or Vercel with clean repository structure, informative README, and zero 404 image errors.',
    completionCriteria: 'You can explain the exact difference between inline, block, and flex formatting contexts and build a clean page without a framework.',
    extensions: [
      'Add a client-side dark/light mode toggle that persists preference in localStorage',
      'Implement an in-memory client-side pagination system for gallery items'
    ]
  },
  {
    id: 'proj-02',
    num: '02',
    title: 'INTERACTIVE FRONTEND APPLICATION',
    tagline: 'Frontend Engineering & Component Architecture',
    difficulty: 'Intermediate',
    problemStatement: 'Single-page web applications require disciplined state management, clean component boundaries, and resilient asynchronous data fetching. Creating an interactive analytics or task management dashboard in React and TypeScript demonstrates frontend application architecture.',
    requirements: [
      'Built using React with Vite and strict TypeScript configuration',
      'Component composition with zero unnecessary prop drilling',
      'Strict separation between UI presentation and stateful business hooks',
      'Integration with a public REST API with robust loading, empty, and error states',
      'Automated component tests verifying user behavior with Vitest and React Testing Library'
    ],
    features: [
      'Dynamic multi-view routing with URL query parameters for search and filters',
      'Rich interactive data table with client-side sorting, filtering, and pagination',
      'Controlled modal forms with field-level schema validation and error feedback',
      'Optimistic UI state updates for immediate user feedback on mutations',
      'Accessible toast notification system for success and error alerts'
    ],
    tools: [
      'React 18 / 19, TypeScript, Vite',
      'React Router for declarative routing',
      'Lucide React for iconography',
      'Vitest & React Testing Library for automated testing'
    ],
    suggestedArchitecture: 'Feature-based directory structure (features/tasks, features/analytics) with colocated custom hooks, API clients, and presentation components. Shared global UI primitives located in components/ui/.',
    milestones: [
      '1. Configure Vite, TypeScript strict mode, and ESLint/Prettier configuration',
      '2. Construct reusable design system primitives (Button, Modal, Input, Badge)',
      '3. Implement custom hooks for data fetching with loading, error, and cached states',
      '4. Build filter and search view with debounced URL parameter synchronization',
      '5. Write automated unit and component tests covering happy and error paths'
    ],
    testingChecklist: [
      'Unit tests verify state transitions for all custom hooks',
      'Component tests verify that error messages render when API requests fail',
      'Forms block submission when required fields are missing or invalid',
      'No component triggers unneeded re-render cascades on keystroke input'
    ],
    deploymentExpectations: 'Automated CI/CD build on Vercel or Netlify with preview builds on pull requests and zero TypeScript compiler errors.',
    completionCriteria: 'You can articulate why state is colocated vs lifted, explain React reconciliation, and justify where component boundaries are drawn.',
    extensions: [
      'Add drag-and-drop column reordering or task kanban boards',
      'Implement full keyboard shortcut navigation across dashboard views'
    ]
  },
  {
    id: 'proj-03',
    num: '03',
    title: 'PRODUCTION-GRADE REST API',
    tagline: 'Backend Engineering & API Design',
    difficulty: 'Intermediate',
    problemStatement: 'Building a reliable backend requires far more than returning JSON. It requires structured error handling, schema validation, defense-in-depth security, authentication, and clean layered architecture separating HTTP controllers from domain business logic.',
    requirements: [
      'Built with Node.js and Express.js in a layered architecture',
      'Schema-based request payload validation for params, query, and body',
      'Centralized 4-parameter error middleware with custom domain error classes',
      'Secure authentication using JWT or session cookies with hashed passwords',
      'Automated API integration tests with Supertest and documented endpoints'
    ],
    features: [
      'User authentication (signup, login, refresh token rotation, password reset flow)',
      'Role-based access control (Admin, Editor, Viewer permissions)',
      'CRUD operations for resources with pagination, sorting, and field projection',
      'Rate-limiting middleware to protect sensitive endpoints from brute-force attacks',
      'Comprehensive request logging with request correlation IDs'
    ],
    tools: [
      'Node.js, Express.js, TypeScript',
      'Zod or Joi for request validation',
      'bcrypt or argon2 for secure password hashing',
      'Supertest and Vitest for automated HTTP testing',
      'Postman or OpenAPI specification for documentation'
    ],
    suggestedArchitecture: 'Layered architecture: Routes -> Middleware -> Controllers -> Services -> Data Access / Repositories -> Database. Business rules live strictly in Services with zero Express req/res dependencies.',
    milestones: [
      '1. Set up Express application with security headers (Helmet), CORS, and JSON parser',
      '2. Implement custom AppError hierarchy and centralized error handler middleware',
      '3. Create authentication service with password hashing and JWT token issuance',
      '4. Build resource CRUD routes with schema validation and role authorization guards',
      '5. Author Supertest integration test suite covering status codes 200, 201, 400, 401, 403, 404, 500'
    ],
    testingChecklist: [
      'API returns 400 with specific field errors on invalid payloads',
      'Protected endpoints return 401 on missing or expired tokens and 403 on unauthorized roles',
      'Password hashes never appear in database query responses or log files',
      'Internal server errors in production return safe generic error envelopes without stack traces'
    ],
    deploymentExpectations: 'Containerized with Docker or deployed to Render/Railway with environment variable isolation and health check endpoint (/health).',
    completionCriteria: 'You can trace an HTTP request through the entire backend pipeline and explain where validation, authorization, and error handling belong.',
    extensions: [
      'Add an OpenAPI / Swagger interactive documentation endpoint',
      'Implement API key generation and usage metering for public developer access'
    ]
  },
  {
    id: 'proj-04',
    num: '04',
    title: 'AUTHENTICATED FULL-STACK APP',
    tagline: 'End-to-End Application Architecture',
    difficulty: 'Advanced',
    problemStatement: 'Integrating a reactive frontend with a secure backend and persistent database creates real-world challenges in authentication state synchronization, data modeling, optimistic UI updates, and error propagation across network boundaries.',
    requirements: [
      'Complete end-to-end stack: React frontend + Express API + MongoDB/PostgreSQL',
      'Secure authentication using HTTP-only cookies to prevent XSS token theft',
      'Normalized or properly embedded data models with index optimizations',
      'Complete CRUD workflows with bidirectional state synchronization',
      'Automated integration tests spanning API and UI components'
    ],
    features: [
      'Seamless user onboarding with email verification and profile management',
      'Protected application dashboard with role-specific views and capabilities',
      'Rich multi-step forms with server-side validation and responsive feedback',
      'Real-time search with debounced backend queries and empty result states',
      'File upload workflow with cloud storage integration and MIME-type verification'
    ],
    tools: [
      'React, TypeScript, Vite, Tailwind or Vanilla CSS',
      'Node.js, Express, Mongoose / Prisma',
      'MongoDB Atlas or PostgreSQL',
      'Cloud storage (AWS S3 or Cloudinary) for file assets'
    ],
    suggestedArchitecture: 'Monorepo or decoupled client/server repository. The frontend communicates via a typed API client. The backend implements a modular architecture with unified environment configuration and structured logging.',
    milestones: [
      '1. Design and document database schemas with relationship diagrams and index selections',
      '2. Implement secure authentication pipeline with HTTP-only cookies and CSRF protections',
      '3. Build core resource REST endpoints and test with Supertest test suites',
      '4. Construct frontend views with route guards and auth context provider',
      '5. Connect frontend forms to API endpoints with error boundaries and toast feedback'
    ],
    testingChecklist: [
      'Authentication state survives browser page refreshes seamlessly',
      'Logging out invalidates tokens on both client and server sides',
      'Database operations maintain referential integrity without orphaned records',
      'Network timeouts trigger graceful user-facing retry options'
    ],
    deploymentExpectations: 'Frontend hosted on Vercel, backend hosted on Render/Railway, database hosted on MongoDB Atlas, communicating securely via HTTPS with strict CORS policies.',
    completionCriteria: 'You can trace a complete user action from a button click in React through API routing and database queries back to the UI state update.',
    extensions: [
      'Add Google / GitHub OAuth 2.0 social authentication',
      'Implement an activity audit trail logging who changed what and when'
    ]
  },
  {
    id: 'proj-05',
    num: '05',
    title: 'BUSINESS MANAGEMENT PLATFORM',
    tagline: 'Multi-User Operations & Engineering Discipline',
    difficulty: 'Production-Grade',
    problemStatement: 'Enterprise business applications demand sophisticated multi-user permissions, high-concurrency inventory or booking transactions, auditability, data export pipelines, and strict automated quality assurance.',
    requirements: [
      'Multi-tier role-based access control (Superadmin, Manager, Staff, Auditor)',
      'ACID database transactions for financial or inventory state changes',
      'Efficient pagination, multi-field filtering, and full-text search',
      'Audit logging tracking all sensitive operations with IP and user metadata',
      'Automated CI/CD pipeline enforcing linting, type checks, and tests on every commit'
    ],
    features: [
      'Multi-user workspace management with member invitations and permissions',
      'Inventory or order management with atomic stock deduction and checkout locks',
      'CSV and PDF report generation for financial summaries and inventory audits',
      'Admin analytics dashboard with visual metrics and time-series aggregation',
      'Soft-delete architecture with restore capabilities and archival history'
    ],
    tools: [
      'React, TypeScript, TanStack Query, Recharts / Chart.js',
      'Node.js, Express, MongoDB / PostgreSQL',
      'Docker & Docker Compose for local multi-service orchestration',
      'GitHub Actions for automated CI/CD pipelines'
    ],
    suggestedArchitecture: 'Modular monolith architecture organized into independent domain modules (Auth, Inventory, Billing, Analytics). Each module encapsulates its own routes, business services, and database queries.',
    milestones: [
      '1. Architect domain modules with explicit boundaries and interface contracts',
      '2. Implement atomic transactions ensuring inventory never over-sells under concurrency',
      '3. Build aggregation pipelines for analytics dashboards with index optimizations',
      '4. Implement CSV/PDF export workers avoiding memory leaks on large datasets',
      '5. Configure GitHub Actions CI workflow running lint, type checks, and integration tests'
    ],
    testingChecklist: [
      'Concurrent purchases of the last inventory item correctly allow only one winner',
      'Staff members cannot access Superadmin endpoints even by manipulating client requests',
      'Exporting 10,000 records streams data without crashing server memory',
      'CI/CD pipeline blocks pull requests whenever any test fails'
    ],
    deploymentExpectations: 'Containerized deployment via Docker with production health checks, database connection pooling, and continuous automated backup strategies.',
    completionCriteria: 'You can explain how database transactions prevent race conditions and defend your authorization architecture against privilege escalation.',
    extensions: [
      'Add email notifications with webhook delivery tracking',
      'Implement automated database backup verification scripts in CI'
    ]
  },
  {
    id: 'proj-06',
    num: '06',
    title: 'DISTRIBUTED / REAL-TIME SYSTEM',
    tagline: 'Advanced Engineering & System Design',
    difficulty: 'Architectural',
    problemStatement: 'At scale, traditional synchronous request-response architectures struggle with real-time collaboration, heavy background tasks, and high read volumes. Building an event-driven system demonstrates systems engineering maturity.',
    requirements: [
      'Real-time bi-directional communication via WebSockets or Server-Sent Events',
      'Asynchronous task processing using an in-memory queue with worker concurrency',
      'Multi-tier caching layer (Redis) with explicit cache invalidation strategies',
      'Resilient failure modes: circuit breakers, exponential backoff retries, and dead-letter queues',
      'Documented System Architecture Decision Record (ADR) analyzing trade-offs'
    ],
    features: [
      'Real-time multi-user collaborative workspace or live auction/bidding engine',
      'Asynchronous background job processing for media transcoding or PDF generation',
      'In-memory read-through cache cutting database query volume by >80%',
      'Rate-limiting with sliding window algorithm in Redis protecting against abuse',
      'Observability dashboard displaying request latency, throughput, and error rates'
    ],
    tools: [
      'Node.js, TypeScript, Socket.IO / ws',
      'Redis for caching, pub/sub, and job queue persistence',
      'BullMQ for distributed background workers',
      'Docker Compose for multi-container infrastructure (API, Worker, Redis, DB)',
      'Lighthouse and k6 or autocannon for load testing and performance profiling'
    ],
    suggestedArchitecture: 'Event-driven architecture separating the real-time API gateway from background processing workers. Redis acts as both a read-through cache and message broker for the worker fleet.',
    milestones: [
      '1. Implement WebSocket server with connection heartbeat, auth handshake, and room multiplexing',
      '2. Set up Redis read-through cache with time-to-live (TTL) and atomic invalidation',
      '3. Build BullMQ worker queue with retry policies, backoff jitter, and dead-letter queue handling',
      '4. Execute load testing with autocannon to identify bottlenecks and optimize query plans',
      '5. Draft comprehensive Architectural Decision Record (ADR) detailing system design trade-offs'
    ],
    testingChecklist: [
      'WebSocket connections automatically reconnect with state recovery on network interruption',
      'Worker crashes do not lose jobs; failed jobs move to dead-letter queue after 3 retries',
      'Load tests demonstrate sub-50ms read latency under 1,000 concurrent requests',
      'Redis cache hit ratio exceeds 80% for frequently accessed read endpoints'
    ],
    deploymentExpectations: 'Multi-service deployment with isolated worker processes, managed Redis, and structured JSON logs with correlation IDs for distributed tracing.',
    completionCriteria: 'You can present an architectural diagram to senior engineers, justify when real-time and caching tools are needed, and explain their operational costs.',
    extensions: [
      'Implement distributed lock manager using Redis Redlock algorithm',
      'Add OpenTelemetry instrumentation for distributed request tracing'
    ]
  }
];
