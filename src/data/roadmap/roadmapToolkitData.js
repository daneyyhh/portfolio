/**
 * REUBG DEV — Full-Stack Developer Roadmap
 * The Developer Toolkit (Grouped by Category)
 *
 * For every tool:
 * - What it does
 * - Which problem it solves
 * - When to use it
 * - Essential vs Optional badge
 * - Which roadmap phase introduces it
 */

export const toolkitCategories = [
  { id: 'editor', name: 'EDITOR & DEVELOPMENT' },
  { id: 'frontend', name: 'FRONTEND ENGINEERING' },
  { id: 'backend', name: 'BACKEND ENGINEERING' },
  { id: 'database', name: 'DATABASES & PERSISTENCE' },
  { id: 'quality', name: 'CODE QUALITY & TESTING' },
  { id: 'devops', name: 'DEPLOYMENT & OPERATIONS' },
  { id: 'debugging', name: 'LEARNING & DEBUGGING' }
];

export const toolkitData = [
  // ── 01. EDITOR & DEVELOPMENT ──
  {
    name: 'VS Code',
    category: 'editor',
    status: 'Essential',
    phase: '01',
    phaseName: 'Foundations',
    whatItDoes: 'Extensible code editor with native TypeScript support, language servers, integrated terminal, and debugging capabilities.',
    problemSolved: 'Replaces sluggish IDEs or basic text editors with a fast, modern environment that provides real-time linting, autocompletion, and Git diff inspection.',
    whenToUse: 'Primary daily driver for full-stack JavaScript, TypeScript, HTML, CSS, and configuration files.',
    proTip: 'Master multi-cursor editing (`Ctrl+D` / `Alt+Click`) and the command palette (`Ctrl+Shift+P`) to 3x your editing speed.'
  },
  {
    name: 'Browser DevTools',
    category: 'editor',
    status: 'Essential',
    phase: '01',
    phaseName: 'Foundations',
    whatItDoes: 'In-browser diagnostic suite containing DOM inspector, CSS cascade visualizer, console, network waterfall, and performance profiler.',
    problemSolved: 'Eliminates guesswork by allowing you to inspect live computed styles, debug JavaScript execution with breakpoints, and inspect HTTP headers and payloads.',
    whenToUse: 'Every time you touch CSS layouts, investigate JavaScript runtime errors, or inspect API network requests.',
    proTip: 'Use `$0` in the browser console to instantly inspect whichever DOM node is currently highlighted in the Elements panel.'
  },
  {
    name: 'Node.js Runtime',
    category: 'editor',
    status: 'Essential',
    phase: '01',
    phaseName: 'Foundations',
    whatItDoes: 'Chrome V8-powered asynchronous JavaScript runtime that executes code outside the browser on servers and local developer workstations.',
    problemSolved: 'Enables developers to run local development servers, build tools, package managers, and production backend services using unified JavaScript/TypeScript.',
    whenToUse: 'Running backend servers, running build scripts (Vite, Webpack), and executing CLI tooling.',
    proTip: 'Use a version manager like `nvm` or `fnm` so you can switch between Node versions across different projects effortlessly.'
  },
  {
    name: 'npm / pnpm',
    category: 'editor',
    status: 'Essential',
    phase: '01',
    phaseName: 'Foundations',
    whatItDoes: 'Package manager and registry for installing, updating, and managing open-source third-party dependencies and executable CLI binaries.',
    problemSolved: 'Prevents reinventing wheels by managing semantic versioning (`package.json`), dependency trees, and executable scripts (`npm run build`).',
    whenToUse: 'Initializing projects, installing libraries, and locking dependency versions via `package-lock.json`.',
    proTip: 'Always commit `package-lock.json` to ensure identical builds across team machines and CI/CD pipelines.'
  },
  {
    name: 'Git CLI',
    category: 'editor',
    status: 'Essential',
    phase: '01',
    phaseName: 'Foundations',
    whatItDoes: 'Distributed version control system for tracking source code revisions, branching, and collaborating on codebases.',
    problemSolved: 'Eliminates fear of breaking working code: allows rolling back regressions, isolating experimental features in branches, and merging safely.',
    whenToUse: 'Every software project, from the very first commit (`git init`) to production hotfixes.',
    proTip: 'Write commit messages in the imperative mood ("Fix layout bug on mobile" rather than "Fixed layout bug").'
  },
  {
    name: 'GitHub',
    category: 'editor',
    status: 'Essential',
    phase: '01',
    phaseName: 'Foundations',
    whatItDoes: 'Cloud hosting platform for Git repositories with pull requests, code reviews, issue tracking, and automated CI/CD workflows.',
    problemSolved: 'Centralizes collaboration, facilitates asynchronous code reviews, and serves as the authoritative source of truth for deployment pipelines.',
    whenToUse: 'Publishing open-source code, team code reviews, backup hosting, and automated CI/CD triggering.',
    proTip: 'Protect your `main` branch with branch protection rules requiring passing tests and pull request approval before merging.'
  },

  // ── 02. FRONTEND ENGINEERING ──
  {
    name: 'React 18 / 19',
    category: 'frontend',
    status: 'Essential',
    phase: '02',
    phaseName: 'Frontend',
    whatItDoes: 'Declarative, component-based library for building user interfaces using reactive state and virtual DOM reconciliation.',
    problemSolved: 'Eliminates manual, error-prone DOM mutation (`document.getElementById`). UI updates automatically whenever underlying component state changes.',
    whenToUse: 'Interactive applications with dynamic state, rich user interactions, and reusable interface components.',
    proTip: 'Design components with minimal state. Calculate everything you can during the render phase.'
  },
  {
    name: 'TypeScript',
    category: 'frontend',
    status: 'Essential',
    phase: '02',
    phaseName: 'Frontend',
    whatItDoes: 'Typed superset of JavaScript that compiles to plain JavaScript, providing static type analysis, autocompletion, and compile-time error detection.',
    problemSolved: 'Catches `undefined is not a function`, typo bugs, and payload contract mismatches during development before they ever hit production.',
    whenToUse: 'Any serious web application that will be maintained for longer than a week or worked on by more than one person.',
    proTip: 'Enable `"strict": true` in `tsconfig.json`. Avoid `any`; use `unknown` when input is unvalidated and narrow it with type guards.'
  },
  {
    name: 'Vite',
    category: 'frontend',
    status: 'Essential',
    phase: '02',
    phaseName: 'Frontend',
    whatItDoes: 'Next-generation frontend build tool powered by native browser ES Modules (ESM) and Rollup/esbuild bundling.',
    problemSolved: 'Replaces legacy slow Webpack setups with near-instantaneous server startup (<300ms) and lightning-fast Hot Module Replacement (HMR).',
    whenToUse: 'Default build tool and dev server for React, Vue, Svelte, or vanilla frontend applications.',
    proTip: 'Use Vite aliases (`@/components`) in `vite.config.js` to avoid messy relative path traversals (`../../components`).'
  },
  {
    name: 'React Developer Tools',
    category: 'frontend',
    status: 'Essential',
    phase: '02',
    phaseName: 'Frontend',
    whatItDoes: 'Browser extension for inspecting the React component tree, props, hooks state, and render profiling.',
    problemSolved: 'Shows exactly why a component re-rendered and pinpoints which hook or prop triggered the update.',
    whenToUse: 'Debugging UI regressions, prop-drilling issues, and performance bottlenecks in React applications.',
    proTip: 'Enable "Highlight updates when components render" in settings to visually identify accidental re-render cascades.'
  },
  {
    name: 'React Router',
    category: 'frontend',
    status: 'Essential',
    phase: '02',
    phaseName: 'Frontend',
    whatItDoes: 'Standard routing library for Single Page Applications (SPAs) connecting browser URLs to React component trees.',
    problemSolved: 'Enables multi-page browser navigation, back/forward history, URL parameters (`/users/:id`), and nested layouts without full page refreshes.',
    whenToUse: 'Any multi-view React application.',
    proTip: 'Use `<Outlet />` to create persistent shared layouts (headers, sidebars) while switching child routes.'
  },
  {
    name: 'TanStack Query',
    category: 'frontend',
    status: 'Optional',
    phase: '02',
    phaseName: 'Frontend',
    whatItDoes: 'Asynchronous server-state management library for fetching, caching, synchronizing, and updating server data.',
    problemSolved: 'Eliminates repetitive `useEffect` data fetching boilerplate, manual loading/error states, duplicate network requests, and stale caches.',
    whenToUse: 'When your frontend frequently reads and mutates data from a REST or GraphQL backend.',
    proTip: 'Configure `staleTime` intentionally (e.g. 5 minutes) to prevent aggressive refetching on window refocus.'
  },

  // ── 03. BACKEND ENGINEERING ──
  {
    name: 'Express.js',
    category: 'backend',
    status: 'Essential',
    phase: '03',
    phaseName: 'Backend',
    whatItDoes: 'Minimalist and flexible Node.js web application framework providing robust features for building REST APIs.',
    problemSolved: 'Abstracts away low-level Node `http` request/response parsing with elegant routing, middleware pipelines, and helper methods.',
    whenToUse: 'Building RESTful microservices, monolithic API servers, and web application backends.',
    proTip: 'Always register a centralized 4-parameter error middleware `(err, req, res, next)` at the bottom of your Express app.'
  },
  {
    name: 'Postman / Thunder Client',
    category: 'backend',
    status: 'Essential',
    phase: '03',
    phaseName: 'Backend',
    whatItDoes: 'GUI and CLI API clients for crafting HTTP requests, testing endpoints, setting headers, and inspecting raw response payloads.',
    problemSolved: 'Allows testing backend API routes thoroughly before building any frontend user interface.',
    whenToUse: 'Developing and debugging REST API endpoints, inspecting authentication headers, and sharing endpoint collections with teammates.',
    proTip: 'Use environment variables for `baseUrl` and `authToken` so you can switch between Local and Production environments with one click.'
  },
  {
    name: 'OpenAPI / Swagger',
    category: 'backend',
    status: 'Optional',
    phase: '03',
    phaseName: 'Backend',
    whatItDoes: 'Standard specification for describing, documenting, and testing RESTful web services in JSON or YAML.',
    problemSolved: 'Prevents out-of-sync API documentation by generating interactive docs directly from schemas and enabling automated client code generation.',
    whenToUse: 'Production APIs consumed by multiple teams, external clients, or mobile apps.',
    proTip: 'Use tools like `tsoa` or `zod-to-openapi` to generate OpenAPI specs directly from your TypeScript code instead of writing manual YAML.'
  },

  // ── 04. DATABASES & PERSISTENCE ──
  {
    name: 'MongoDB',
    category: 'database',
    status: 'Essential',
    phase: '04',
    phaseName: 'Databases',
    whatItDoes: 'Document-oriented NoSQL database that stores data in flexible, JSON-like BSON documents with powerful indexing and aggregation.',
    problemSolved: 'Allows fast iteration with polymorphic data models, hierarchical nested arrays, and horizontal scale-out capabilities.',
    whenToUse: 'Applications with evolving schemas, content management, analytics, catalogs, or real-time event logs.',
    proTip: 'Design your document schema around your read queries, not around traditional relational normalization.'
  },
  {
    name: 'MongoDB Compass',
    category: 'database',
    status: 'Essential',
    phase: '04',
    phaseName: 'Databases',
    whatItDoes: 'Official GUI for MongoDB to explore data visually, run queries, build aggregation pipelines, and analyze index usage.',
    problemSolved: 'Replaces typing complex terminal shell queries with visual document filtering, schema sampling, and visual query plan inspection.',
    whenToUse: 'Verifying data integrity during development and analyzing slow queries via the Explain Plan tab.',
    proTip: 'Use the Aggregation Pipeline builder in Compass to preview each transformation stage before copying the code to your backend.'
  },
  {
    name: 'Mongoose',
    category: 'database',
    status: 'Essential',
    phase: '04',
    phaseName: 'Databases',
    whatItDoes: 'Object Data Modeling (ODM) library for MongoDB and Node.js that provides schema validation, middleware, and query casting.',
    problemSolved: 'Enforces data consistency in NoSQL: prevents accidental missing fields, type errors, and invalid relationships.',
    whenToUse: 'Node.js and Express backends using MongoDB as their primary operational database.',
    proTip: 'Always use `.lean()` on read-only queries to bypass heavy Mongoose document hydration, yielding a 3-5x performance boost.'
  },
  {
    name: 'PostgreSQL',
    category: 'database',
    status: 'Optional',
    phase: '04',
    phaseName: 'Databases',
    whatItDoes: 'Powerful open-source object-relational database system with strong ACID compliance, complex SQL queries, and robust table constraints.',
    problemSolved: 'Guarantees strict relational integrity for financial transactions, multi-table joins, and complex relational domain models.',
    whenToUse: 'Fintech, e-commerce inventories, multi-tenant B2B SaaS, and applications requiring strict foreign-key integrity.',
    proTip: 'Use composite indexes for queries filtering across multiple columns simultaneously.'
  },

  // ── 05. CODE QUALITY & TESTING ──
  {
    name: 'ESLint',
    category: 'quality',
    status: 'Essential',
    phase: '06',
    phaseName: 'Testing & Security',
    whatItDoes: 'Static code analysis tool for identifying problematic patterns and enforcing consistent coding standards across JavaScript/TypeScript.',
    problemSolved: 'Catches unused variables, unreachable code, unhandled promises, and syntax bugs before running the code.',
    whenToUse: 'Every project. Run locally in the editor and automatically in CI pipelines.',
    proTip: 'Use `typescript-eslint` with recommended type-checked rules to catch bugs involving promises and nullability.'
  },
  {
    name: 'Prettier',
    category: 'quality',
    status: 'Essential',
    phase: '06',
    phaseName: 'Testing & Security',
    whatItDoes: 'Opinionated code formatter that enforces uniform formatting (quotes, tabs, semi-colons, line wraps) automatically on save.',
    problemSolved: 'Eliminates time-wasting arguments in pull request reviews about tabs vs spaces, trailing commas, and line breaks.',
    whenToUse: 'Every project. Integrate with editor auto-format on save.',
    proTip: 'Set up a `.prettierignore` file so build artifacts (`dist`, `node_modules`) are never parsed.'
  },
  {
    name: 'Vitest',
    category: 'quality',
    status: 'Essential',
    phase: '06',
    phaseName: 'Testing & Security',
    whatItDoes: 'Blazing-fast Vite-native unit and integration test framework compatible with Jest APIs.',
    problemSolved: 'Runs thousands of unit tests in milliseconds using Vite transformation pipeline, eliminating slow Jest Babel transforms.',
    whenToUse: 'Unit testing utility functions, domain services, custom hooks, and mathematical algorithms.',
    proTip: 'Use `vitest watch` during development for instant test re-execution on every file save.'
  },
  {
    name: 'React Testing Library',
    category: 'quality',
    status: 'Essential',
    phase: '06',
    phaseName: 'Testing & Security',
    whatItDoes: 'Lightweight testing utility for React components focused on testing user behavior rather than internal implementation details.',
    problemSolved: 'Prevents brittle tests that break when you rename an internal state variable. Tests query DOM elements the way real users interact with them.',
    whenToUse: 'Component testing for forms, modals, navigation flows, and interactive UI widgets.',
    proTip: 'Prefer getByRole("button", { name: /submit/i }) over querying by CSS class or test ID.'
  },
  {
    name: 'Supertest',
    category: 'quality',
    status: 'Essential',
    phase: '06',
    phaseName: 'Testing & Security',
    whatItDoes: 'High-level abstraction for testing HTTP endpoints in Node.js without binding to an actual network port.',
    problemSolved: 'Allows end-to-end testing of Express route handlers, middleware pipelines, and validation schemas in automated CI.',
    whenToUse: 'Backend integration testing of REST APIs.',
    proTip: 'Pass your Express `app` instance directly to `supertest(app)` so tests run in-memory without port collisions.'
  },
  {
    name: 'Playwright',
    category: 'quality',
    status: 'Optional',
    phase: '06',
    phaseName: 'Testing & Security',
    whatItDoes: 'Modern End-to-End (E2E) browser automation framework for Chromium, Firefox, and WebKit.',
    problemSolved: 'Tests critical user journeys (signup, checkout, payment) inside real browser engines with automatic waiting and video traces.',
    whenToUse: 'Testing critical revenue and registration workflows before deploying to production.',
    proTip: 'Use the Playwright Trace Viewer to visually inspect DOM snapshots and network logs for tests that fail in CI.'
  },

  // ── 06. DEPLOYMENT & OPERATIONS ──
  {
    name: 'GitHub Actions',
    category: 'devops',
    status: 'Essential',
    phase: '07',
    phaseName: 'DevOps',
    whatItDoes: 'Automated CI/CD workflow platform integrated directly into GitHub repositories.',
    problemSolved: 'Guarantees that broken code cannot be merged into `main`: automatically runs linting, type checks, and tests on every pull request.',
    whenToUse: 'Automating tests, building production bundles, running security vulnerability scans, and deploying to cloud hosts.',
    proTip: 'Cache `node_modules` between CI runs using `actions/setup-node` with `cache: "npm"` to cut pipeline times in half.'
  },
  {
    name: 'Docker',
    category: 'devops',
    status: 'Essential',
    phase: '07',
    phaseName: 'DevOps',
    whatItDoes: 'Containerization platform that packages applications and all their dependencies into a standardized, reproducible runtime container.',
    problemSolved: 'Eliminates the "it works on my machine" nightmare. The exact same container image runs identically on macOS, Windows, and production Linux.',
    whenToUse: 'Deploying backend services, running multi-container local environments (App + MongoDB + Redis) via Docker Compose.',
    proTip: 'Use multi-stage Docker builds to keep production images tiny (under 100MB) by discarding build tools and devDependencies.'
  },
  {
    name: 'Cloud Hosting (Vercel / Render)',
    category: 'devops',
    status: 'Essential',
    phase: '07',
    phaseName: 'DevOps',
    whatItDoes: 'Cloud platforms that deploy web applications with automated Git integration, SSL certificates, global CDNs, and environment variable management.',
    problemSolved: 'Removes the manual overhead of provisioning Linux VPS servers, configuring NGINX reverse proxies, and renewing Let\'s Encrypt certificates.',
    whenToUse: 'Deploying frontend SPAs (Vercel) and backend web services (Render, Railway, or VPS).',
    proTip: 'Always configure preview deployments for pull requests so you can verify features in a real web browser before merging.'
  },
  {
    name: 'MongoDB Atlas',
    category: 'devops',
    status: 'Essential',
    phase: '07',
    phaseName: 'DevOps',
    whatItDoes: 'Fully managed cloud database-as-a-service with automated backups, performance advisory, scaling, and high-availability clusters.',
    problemSolved: 'Prevents data loss with point-in-time recovery, automated patching, disk monitoring, and zero-downtime replication.',
    whenToUse: 'Production database hosting for MongoDB applications.',
    proTip: 'Restrict Atlas IP access lists to your backend host\'s static outbound IP rather than allowing `0.0.0.0/0` in production.'
  },

  // ── 07. LEARNING & DEBUGGING ──
  {
    name: 'Official Documentation',
    category: 'debugging',
    status: 'Essential',
    phase: '01',
    phaseName: 'Foundations',
    whatItDoes: 'The primary, authoritative source of truth maintained directly by library and language authors (MDN, Node docs, React docs).',
    problemSolved: 'Protects developers from outdated Stack Overflow answers, incorrect tutorial blogs, and hallucinations from AI models.',
    whenToUse: 'Every time you learn a new API, verify function signature arguments, or research performance characteristics.',
    proTip: 'Read the "Mental Model" or "Philosophy" section of docs before touching the API reference.'
  },
  {
    name: 'VS Code Debugger',
    category: 'debugging',
    status: 'Essential',
    phase: '01',
    phaseName: 'Foundations',
    whatItDoes: 'Integrated breakpoint debugger for stepping through Node.js and browser code line-by-line with call-stack inspection.',
    problemSolved: 'Replaces sprinkling `console.log("here 1")` across 20 files with interactive variable inspection, watch expressions, and step-into debugging.',
    whenToUse: 'Investigating complex logic bugs, recursive functions, or unexpected state mutations in backend and frontend code.',
    proTip: 'Use conditional breakpoints (right click on line number) to only pause execution when a specific variable hits an edge condition.'
  },
  {
    name: 'Database Explain Plans',
    category: 'debugging',
    status: 'Essential',
    phase: '04',
    phaseName: 'Databases',
    whatItDoes: 'Database query diagnostic command (`explain("executionStats")`) showing how the database engine executed a query.',
    problemSolved: 'Reveals whether a query scanned 2 documents via an index (IXSCAN) or scanned 2,000,000 documents sequentially (COLLSCAN).',
    whenToUse: 'Every query that runs in an endpoint expected to handle high throughput or slow response times.',
    proTip: 'If your explain plan shows `COLLSCAN` on a table with more than 1,000 rows, you are missing an index.'
  }
];
