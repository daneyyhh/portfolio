/**
 * REUBG DEV — Full-Stack Developer Roadmap
 * The Eight Progressive Learning Phases (In-Depth Technical Syllabus)
 *
 * Each phase provides:
 * 1. Purpose (Why it matters)
 * 2. Prerequisites (What to know first)
 * 3. Learning Objectives
 * 4. Core Concepts (Detailed sub-sections A-E)
 * 5. Tools & Dev Environments
 * 6. Patterns & Architectural Principles
 * 7. Learning Method
 * 8. Hands-on Exercises
 * 9. Project Milestone
 * 10. Common Mistakes & Anti-Patterns
 * 11. Official Documentation Links
 * 12. Exit Criteria (Evidence of mastery)
 */

export const roadmapPhases = [
  // ─────────────────────────────────────────────────────────────
  // PHASE 01 — WEB AND PROGRAMMING FOUNDATIONS
  // ─────────────────────────────────────────────────────────────
  {
    phase: '01',
    title: 'WEB & PROGRAMMING FOUNDATIONS',
    subtitle: 'From Client-Server Mechanics to JavaScript Runtime Realities',
    timeline: 'Weeks 1 — 6',
    category: 'Foundations',
    purpose: 'Understand how the web functions under the hood before relying on high-level abstractions or frameworks. Every framework (React, Next.js, Express) is merely an abstraction over HTTP, the DOM, and the JavaScript runtime. Mastering foundations eliminates cargo-cult programming and gives developers the ability to diagnose any bug from first principles.',
    prerequisites: 'No prior programming experience required. Basic computer literacy, familiarity with file systems, text editing, and fundamental mathematical logic.',
    learningObjectives: [
      'Trace the complete journey of an HTTP request from DNS lookup to browser pixel rendering',
      'Author accessible, semantically structured HTML documents conforming to WCAG standards',
      'Master the CSS cascade, specificity hierarchy, box model, Flexbox, and CSS Grid without framework crutches',
      'Write modular, asynchronous JavaScript utilizing closures, Promises, async/await, and Fetch API',
      'Manage source code revisions, branching, conflict resolution, and PR workflows using Git and GitHub'
    ],
    coreSections: [
      {
        letter: 'A',
        title: 'Internet & Web Fundamentals',
        summary: 'How browsers, protocols, networks, and servers collaborate to transmit and render information.',
        topics: [
          {
            name: 'Internet vs World Wide Web',
            explanation: 'The Internet is the global interconnected network of physical and wireless hardware (cables, routers, switches, fiber-optics) communicating via TCP/IP. The World Wide Web is an information service operating on top of the internet, exchanging hypermedia documents via HTTP/HTTPS.'
          },
          {
            name: 'DNS Resolution & IP Routing',
            explanation: 'When a user enters a domain (e.g. reubg.in), the browser queries the OS DNS cache, then the recursive resolver, root nameserver, TLD nameserver, and authoritative nameserver to resolve the domain to a numerical IPv4 (e.g., 76.76.21.21) or IPv6 address. The browser then establishes a TCP connection (3-way handshake: SYN, SYN-ACK, ACK) and TLS 1.3 cryptographic handshake for HTTPS on port 443.'
          },
          {
            name: 'HTTP Protocol & Request Methods',
            explanation: 'HTTP is an application-layer, stateless request-response protocol. Requests consist of a method (GET, POST, PUT, PATCH, DELETE), URI path, protocol version, headers (Host, User-Agent, Accept, Authorization), cookies, and an optional body. Responses return a status code (1xx Informational, 2xx Success, 3xx Redirection, 4xx Client Error, 5xx Server Error), response headers (Content-Type, Cache-Control), and payload.'
          },
          {
            name: 'Client-Side vs Server-Side Execution',
            explanation: 'Client-side code executes on the user machine inside the sandboxed browser engine (V8, SpiderMonkey, WebKit). Server-side code executes in a managed environment (Node.js, Linux VM) with direct access to file systems, databases, and private secrets. Static websites serve pre-rendered files directly from CDNs; dynamic web applications generate responses on the fly based on runtime state.'
          },
          {
            name: 'Critical Rendering Path (CRP)',
            explanation: 'How the browser turns raw HTML bytes into pixels on screen: (1) Bytes -> Characters -> Tokens -> Nodes -> DOM Tree. (2) CSS bytes parsed into CSSOM Tree. (3) DOM + CSSOM merged into Render Tree (excluding display: none elements). (4) Layout: calculating exact geometry and positions of each node. (5) Paint: filling in pixels, text, colors, and borders across layers. (6) Composite: stacking layers onto the GPU framebuffer.'
          }
        ]
      },
      {
        letter: 'B',
        title: 'Semantic HTML & Web Accessibility',
        summary: 'Structuring information meaningfully for browsers, search engines, and assistive devices.',
        topics: [
          {
            name: 'Semantic Elements vs Div Soup',
            explanation: 'Semantic elements (<main>, <nav>, <header>, <article>, <section>, <aside>, <footer>) communicate the functional meaning of content to browsers, search engine indexers, and screen readers. Generic <div> and <span> provide zero semantic cues, breaking native keyboard focus and accessibility trees.'
          },
          {
            name: 'Content Hierarchy & Heading Flow',
            explanation: 'A document must feature a single, authoritative <h1> per view, followed by strictly descending <h2> and <h3> levels. Headings construct an outline for screen reader users, who navigate through heading leaps rather than reading entire pages sequentially.'
          },
          {
            name: 'Forms, Controls & Accessible Labels',
            explanation: 'Every form control (<input>, <textarea>, <select>) must possess an explicitly associated <label for="id">. Relying solely on placeholder text is an anti-pattern: placeholders vanish on keystrokes, lack sufficient color contrast, and are not reliably announced by assistive software.'
          },
          {
            name: 'Accessibility (a11y) & WCAG Principles',
            explanation: 'Building accessible software ensures usability for individuals with visual, motor, auditory, or cognitive disabilities. Key principles (POUR): Perceivable (alt text for non-text content, minimum 4.5:1 text contrast), Operable (full keyboard Tab/Shift+Tab navigation, focus visible rings), Understandable (predictable interactions, explicit validation errors), Robust (parsing standards, valid ARIA when native HTML lacks coverage).'
          }
        ]
      },
      {
        letter: 'C',
        title: 'Modern CSS & Responsive Systems',
        summary: 'Controlling visual styling, responsive layouts, and typography scales without CSS frameworks.',
        topics: [
          {
            name: 'The Cascade, Specificity & Inheritance',
            explanation: 'The CSS cascade resolves rule conflicts using Origin, Specificity (Inline > ID > Class/Attribute/Pseudo-class > Element), and Source Order. Avoid excessive specificity wars; embrace inheritance for typography and manage overrides through modern cascade layers (@layer) or flat class structures.'
          },
          {
            name: 'The CSS Box Model',
            explanation: 'Every element generates a rectangular box comprising Content, Padding, Border, and Margin. Always declare *, *::before, *::after { box-sizing: border-box; } so that padding and border widths are contained within declared widths and heights rather than expanding them outwards.'
          },
          {
            name: 'Layout Systems: Flexbox vs CSS Grid',
            explanation: 'Flexbox is designed for 1-dimensional layouts (rows OR columns): ideal for navigation bars, button groups, and vertical card alignment. CSS Grid is designed for 2-dimensional layouts (rows AND columns simultaneously): ideal for page scaffolding, editorial grids, and complex card layouts.'
          },
          {
            name: 'Responsive Design & Fluid Typography',
            explanation: 'Mobile-first design structures base styles for the smallest viewport, progressively enhancing layouts using min-width media queries. Modern fluid systems combine CSS custom properties (variables) with clamp() to scale typography and spacing smoothly across viewports without jarring breakpoint jumps.'
          }
        ]
      },
      {
        letter: 'D',
        title: 'JavaScript Fundamentals & Asynchronous Execution',
        summary: 'Core language semantics, closures, DOM events, and the asynchronous event loop.',
        topics: [
          {
            name: 'Data Types, Scope & Closures',
            explanation: 'JavaScript features 7 primitive types (string, number, bigint, boolean, undefined, symbol, null) passed by value, and Objects passed by reference. Lexical scope determines variable accessibility based on position in source code. A closure occurs when an inner function retains access to its outer enclosing scope even after that outer function has returned.'
          },
          {
            name: 'DOM Manipulation & Event Propagation',
            explanation: 'The DOM is the browser tree representation of the document. Modern manipulation uses querySelector(), createElement(), and classList. Events propagate in two phases: Capturing (down from window to target) and Bubbling (up from target to window). Event delegation leverages bubbling to listen for events on thousands of child nodes using a single parent listener.'
          },
          {
            name: 'Promises & Async/Await',
            explanation: 'A Promise represents the eventual completion or failure of an asynchronous operation (States: Pending, Fulfilled, Rejected). Async/await provides synchronous-looking syntax over Promises, eliminating callback hell. Always wrap await in try/catch blocks to handle network or parsing failures gracefully.'
          },
          {
            name: 'The Event Loop & Task Queues',
            explanation: 'JavaScript is single-threaded: it possesses one Call Stack. Long-running I/O operations are offloaded to browser Web APIs. When complete, callbacks enter queues: the Microtask Queue (Promises, queueMicrotask) has highest priority, drained completely after each stack frame; the Task Queue (setTimeout, setInterval, I/O events) executes next, coordinated by the Event Loop.'
          }
        ]
      },
      {
        letter: 'E',
        title: 'Version Control with Git & GitHub',
        summary: 'Professional source code tracking, branching, and team collaboration workflows.',
        topics: [
          {
            name: 'Working Tree, Staging & Commit DAG',
            explanation: 'Git tracks project snapshots across three areas: the Working Directory (modified files), the Staging Area (curated changes staged via git add), and the Repository (.git directory holding immutable commit objects forming a Directed Acyclic Graph).'
          },
          {
            name: 'Branching, Merging & Conflict Resolution',
            explanation: 'Branches are lightweight movable pointers to commit SHAs. Feature branch workflows isolate experimental code from the production main branch. Merging integrates histories; when two branches modify identical lines, Git halts to allow developers to resolve conflicts explicitly.'
          },
          {
            name: 'Pull Requests & Clean Commit Hygiene',
            explanation: 'Pull requests allow team members to review code, run automated tests, and discuss architectural decisions before merging. High-quality repositories require atomic commits with imperative messages ("Add user session timeout" rather than "updates") and comprehensive README documentation.'
          }
        ]
      }
    ],
    tools: [
      { name: 'VS Code', role: 'Primary editor with Prettier, ESLint, and Live Server' },
      { name: 'Browser DevTools', role: 'Elements DOM inspector, Console, Network waterfall' },
      { name: 'Git CLI', role: 'Terminal version control and revision management' },
      { name: 'W3C Validator', role: 'HTML and CSS specification conformance verification' }
    ],
    patterns: [
      'Semantic page skeleton with distinct landmark roles',
      'Mobile-first responsive fluid grids with CSS custom properties',
      'Pure utility functions with explicit return contracts',
      'Guard clauses (early returns) to dismiss invalid conditions early',
      'Event delegation on parent containers rather than individual list nodes'
    ],
    commonMistakes: [
      'Wrapping every single UI element in generic <div> tags instead of semantic tags',
      'Using !important to solve CSS specificity conflicts rather than refactoring the cascade',
      'Hardcoding fixed pixel widths (width: 800px) that trigger horizontal scrolling on mobile',
      'Mutating function argument objects directly inside functions instead of returning copies',
      'Treating async/await as magic and forgetting to handle network rejections with try/catch',
      'Committing node_modules, API keys, or build artifacts to public Git repositories'
    ],
    exercises: [
      {
        title: 'Accessible Profile Card',
        task: 'Build an accessible profile card with keyboard focus states, high contrast text, and zero external CSS libraries.'
      },
      {
        title: 'Filterable Data Table',
        task: 'Fetch public JSON data using fetch(), parse it, and render a table with real-time text search and category filtering in vanilla JS.'
      },
      {
        title: 'Async Event Loop Simulator',
        task: 'Predict the console output order of 6 mixed console.log, setTimeout, Promise.resolve().then(), and queueMicrotask statements, then verify in browser console.'
      }
    ],
    project: {
      title: 'Responsive Editorial Website',
      description: 'Design and build a multi-page, mobile-first responsive portfolio or digital publication using purely semantic HTML5, CSS custom properties, Flexbox/Grid, and modular vanilla JavaScript. Host publicly on GitHub Pages or Vercel with automated lighthouse score > 95.'
    },
    documentation: [
      { name: 'MDN Web Docs — HTML Foundations', url: 'https://developer.mozilla.org/en-US/docs/Learn/HTML' },
      { name: 'MDN Web Docs — CSS Cascade & Layout', url: 'https://developer.mozilla.org/en-US/docs/Learn/CSS' },
      { name: 'MDN Web Docs — JavaScript Language Reference', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
      { name: 'Git Official Reference Documentation', url: 'https://git-scm.com/doc' }
    ],
    exitCriteria: 'You can build a fully responsive, keyboard-navigable, accessible web page from a blank scratchpad without importing any external CSS frameworks or JavaScript libraries, and explain every line of code.'
  },

  // ─────────────────────────────────────────────────────────────
  // PHASE 02 — FRONTEND ENGINEERING
  // ─────────────────────────────────────────────────────────────
  {
    phase: '02',
    title: 'FRONTEND ENGINEERING',
    subtitle: 'Type Systems, Declarative Component Architectures, and Automated UI Testing',
    timeline: 'Weeks 7 — 12',
    category: 'Frontend',
    purpose: 'Transition from isolated web pages to scalable, maintainable web applications. Declarative UI frameworks like React allow engineers to represent interfaces as functions of state, eliminating fragile manual DOM manipulation. Pairing React with TypeScript and automated testing provides the safety required to build production software.',
    prerequisites: 'Solid grasp of JavaScript fundamentals (ES6+ syntax, closures, array methods, DOM manipulation, Promises, and async/await).',
    learningObjectives: [
      'Write type-safe frontend code using TypeScript interfaces, generics, narrowing, and strict configs',
      'Master React mental models: declarative rendering, reactive state, virtual DOM reconciliation, and hooks',
      'Architect maintainable component hierarchies with composition, custom hooks, and state colocation',
      'Distinguish client-side UI state from server cache state to eliminate redundant boilerplate',
      'Author robust unit and component tests verifying user-observable behavior using Vitest and React Testing Library'
    ],
    coreSections: [
      {
        letter: 'A',
        title: 'Advanced JavaScript & TypeScript',
        summary: 'Elevating JavaScript into an industrial-strength, statically typed engineering language.',
        topics: [
          {
            name: 'Structural Typing & Type Inference',
            explanation: 'TypeScript uses structural typing ("duck typing"): two types are compatible if their members are compatible. The compiler infers types automatically; explicit annotations should focus on function boundaries, public API contracts, and complex data structures.'
          },
          {
            name: 'Interfaces, Type Aliases & Generics',
            explanation: 'Interfaces define object shapes and support declaration merging. Type aliases define unions, intersections, and primitives. Generics (<T>) enable reusable functions and components that maintain strict type safety across diverse data types without resorting to any.'
          },
          {
            name: 'Type Narrowing & Discriminated Unions',
            explanation: 'Narrowing refines broad types into specific types using typeof, instanceof, in, and custom type predicates. Discriminated unions combine multiple object shapes sharing a common literal property (e.g. status: "loading" | "success" | "error"), enabling exhaustive pattern matching.'
          },
          {
            name: 'When TypeScript Helps vs When It Does Not',
            explanation: 'TypeScript excels at eliminating typos, documenting API contracts, refactoring safely, and preventing null reference errors. TypeScript CANNOT validate runtime data entering the system from external HTTP calls unless paired with runtime validation libraries like Zod.'
          }
        ]
      },
      {
        letter: 'B',
        title: 'React Core Principles & State Architecture',
        summary: 'Thinking declaratively in terms of components, props, state, and reconciliation.',
        topics: [
          {
            name: 'Declarative UI & Virtual DOM Reconciliation',
            explanation: 'In React, the UI is a pure projection of application state: UI = f(state). Instead of mutating the DOM directly, components return JSX trees. React compares the new virtual DOM tree with the previous snapshot (reconciliation/Fiber) and calculates the minimal set of real DOM mutations.'
          },
          {
            name: 'Hooks Mental Model: useState, useEffect, useMemo, useCallback',
            explanation: 'useState preserves local state across renders. useEffect synchronizes a component with an external system (timers, network, window listeners) — NOT for calculating derived values. useMemo caches expensive computation results between renders. useCallback caches function definitions to avoid breaking child memoization.'
          },
          {
            name: 'Derived State vs Duplicated State',
            explanation: 'Never store in state what can be computed during render. Storing filtered lists or cart totals in state and syncing with useEffect causes extra render passes, flickering, and stale state bugs.'
          },
          {
            name: 'Server State vs Client State',
            explanation: 'Client state is synchronous, ephemeral UI data owned entirely by the browser (modal open/closed, active tab). Server state is asynchronous, remote data owned by the database (user profile, product list). Treating server data as an asynchronous cache via TanStack Query eliminates 90% of global store bloat.'
          }
        ]
      },
      {
        letter: 'C',
        title: 'Component Architecture & Feature Organization',
        summary: 'Structuring large frontend codebases for high cohesion and team maintainability.',
        topics: [
          {
            name: 'Feature-Based Directory Structure',
            explanation: 'Group code by business feature rather than technical layer. Each feature directory contains its own components, custom hooks, API client, and tests, keeping related files adjacent and easy to refactor or delete.'
          },
          {
            name: 'Component Boundaries & Composition',
            explanation: 'Break monolithic views into focused components following the Single Responsibility Principle. Favor composition via children slots over giant components accepting dozens of boolean configuration props.'
          },
          {
            name: 'Error Boundaries & Suspense',
            explanation: 'React Error Boundaries catch JavaScript runtime errors anywhere in their child component tree, log the error, and display a graceful fallback UI rather than crashing the entire application into a white screen.'
          }
        ]
      },
      {
        letter: 'D',
        title: 'Frontend Automated Testing',
        summary: 'Testing observable user behavior, state transitions, and edge cases with Vitest.',
        topics: [
          {
            name: 'Testing Observable Behavior vs Implementation Details',
            explanation: 'Tests that query internal component state or hook internals are brittle: they break during refactoring even when user functionality remains intact. Test from the user perspective: find buttons by role, type into inputs by label, and assert visible text changes in the DOM.'
          },
          {
            name: 'Mocking Network Requests Safely',
            explanation: 'Use Mock Service Worker (MSW) or lightweight mock handlers at the network boundary rather than mocking internal fetch libraries. This verifies that your API client and error handling logic run realistically in tests.'
          }
        ]
      }
    ],
    tools: [
      { name: 'React 18 / 19', role: 'Declarative component library and virtual DOM runtime' },
      { name: 'TypeScript', role: 'Static type analysis and developer autocompletion' },
      { name: 'Vite', role: 'Blazing-fast build tool and development server' },
      { name: 'React Developer Tools', role: 'Component tree inspection and profiler' },
      { name: 'Vitest & React Testing Library', role: 'Unit and component automated test runners' }
    ],
    patterns: [
      'Component composition with slots via children',
      'Custom hooks to encapsulate reusable stateful behavior and listeners',
      'Derived state calculated synchronously during render',
      'Feature-based folder architecture (features/auth, features/catalog)',
      'Discriminated union state representation (idle, loading, success, error)'
    ],
    commonMistakes: [
      'Using useEffect to synchronize state variables instead of deriving values during render',
      'Dumping local component state into global Redux or Context stores unnecessarily',
      'Disabling TypeScript strict mode or using any to silence compiler warnings',
      'Ignoring React key warnings or using array indexes as keys for dynamically reordered lists',
      'Testing internal state values instead of observable DOM content'
    ],
    exercises: [
      {
        title: 'Type-Safe Data Fetcher Hook',
        task: 'Author a generic useFetch<T> custom hook in TypeScript with loading, error, and cached states, supporting request cancellation via AbortController.'
      },
      {
        title: 'Multi-Step Modal Form',
        task: 'Build a 3-step registration wizard with field-level validation, preserving state across step transitions without global stores.'
      },
      {
        title: 'Component Test Suite',
        task: 'Write automated component tests with React Testing Library verifying that an error alert displays when an API call fails with status 500.'
      }
    ],
    project: {
      title: 'Interactive Frontend Dashboard',
      description: 'Build a multi-page interactive web application in React and TypeScript with client-side routing (React Router), complex data filtering, debounced search, modal dialogues, optimistic UI updates, and an automated test suite.'
    },
    documentation: [
      { name: 'React.dev — The Modern React Documentation', url: 'https://react.dev' },
      { name: 'TypeScript Official Handbook', url: 'https://www.typescriptlang.org/docs/handbook/intro.html' },
      { name: 'Vitest Documentation & Guide', url: 'https://vitest.dev/guide/' },
      { name: 'React Testing Library Documentation', url: 'https://testing-library.com/docs/react-testing-library/intro/' }
    ],
    exitCriteria: 'You can build a multi-page React application in TypeScript, manage state predictably, isolate business logic into custom hooks, and write automated tests that verify user behavior.'
  },

  // ─────────────────────────────────────────────────────────────
  // PHASE 03 — BACKEND ENGINEERING
  // ─────────────────────────────────────────────────────────────
  {
    phase: '03',
    title: 'BACKEND ENGINEERING',
    subtitle: 'Runtimes, REST APIs, Authentication, Authorization, and Layered Systems',
    timeline: 'Weeks 13 — 18',
    category: 'Backend',
    purpose: 'Understand how servers receive requests, enforce business rules, authenticate clients, interact with data stores, and return dependable responses. A robust backend is the single source of truth for business invariants and security boundaries; the frontend can never be trusted.',
    prerequisites: 'Strong JavaScript and TypeScript skills, understanding of HTTP status codes, headers, and asynchronous event-driven programming.',
    learningObjectives: [
      'Understand Node.js runtime mechanics: the event loop, libuv threadpool, and non-blocking I/O',
      'Design RESTful web services in Express with strict routing, validation, and centralized error handling',
      'Implement secure authentication using salted password hashing, HTTP-only session cookies, and JWTs',
      'Enforce role-based access control (RBAC) and defense-in-depth security on every API endpoint',
      'Structure backends using clean layered architecture separating HTTP routing from domain services'
    ],
    coreSections: [
      {
        letter: 'A',
        title: 'Node.js Runtime Architecture',
        summary: 'How Node.js achieves high concurrency through non-blocking asynchronous I/O.',
        topics: [
          {
            name: 'The Event Loop & Libuv Architecture',
            explanation: 'Node.js utilizes the V8 engine and the libuv C library. The main thread executes JavaScript on a single thread. CPU-intensive or blocking operations (file system I/O, cryptographic hashing, DNS lookups) are delegated to the libuv background thread pool (default 4 threads), ensuring the main event loop remains unblocked.'
          },
          {
            name: 'Node.js vs Browser JavaScript',
            explanation: 'Node.js lacks browser globals (window, document, DOM). Instead, it provides low-level operating system APIs: process, fs, path, crypto, and net. Environment variables (process.env) govern application configuration across dev, staging, and production.'
          },
          {
            name: 'Streams & Buffers Fundamentals',
            explanation: 'Buffers represent fixed-size raw binary memory allocations outside the V8 heap. Streams process data chunk-by-chunk in real time (Readable, Writable, Transform, Duplex). Streaming prevents out-of-memory crashes when processing multi-gigabyte file uploads or exports.'
          }
        ]
      },
      {
        letter: 'B',
        title: 'Express.js & REST API Design',
        summary: 'Building predictable, standardized RESTful interfaces with middleware pipelines.',
        topics: [
          {
            name: 'The Request Lifecycle',
            explanation: 'The journey of an HTTP request: Client -> Reverse Proxy -> Express App -> Global Middleware (CORS, Helmet, Body Parser, Rate Limiter) -> Route Match -> Route Middleware (Auth, Validation) -> Controller -> Domain Service -> Data Layer -> JSON Response.'
          },
          {
            name: 'Schema-Based Request Validation',
            explanation: 'Never trust incoming request data. Use declarative validation libraries (Zod, Joi) to validate params, query strings, and request bodies before they reach controllers. Reject invalid payloads early with HTTP 400 and clear, field-level feedback.'
          },
          {
            name: 'Centralized Error Handling Architecture',
            explanation: 'Throw custom application error classes (NotFoundError, ValidationError, UnauthorizedError) in domain services. A single centralized Express error middleware (err, req, res, next) intercepts all errors, logs diagnostics, and returns standardized, safe JSON envelopes.'
          }
        ]
      },
      {
        letter: 'C',
        title: 'Authentication & Authorization Systems',
        summary: 'Verifying identity securely and enforcing permission boundaries.',
        topics: [
          {
            name: 'Authentication vs Authorization',
            explanation: 'Authentication (AuthN) verifies WHO you are (e.g. valid email and password). Authorization (AuthZ) verifies WHAT you are permitted to do (e.g. can this specific user delete this specific record?). Both must be verified on every protected server request.'
          },
          {
            name: 'Password Security & Cryptographic Hashing',
            explanation: 'Never store plaintext passwords. Passwords must be hashed using slow, memory-hard algorithms with unique cryptographic salts (bcrypt or Argon2). Salting prevents rainbow table lookups; high work factors defend against brute-force hardware attacks.'
          },
          {
            name: 'Session Cookies vs JWT Access Tokens',
            explanation: 'Session cookies store an opaque session ID referencing server-side state (Redis or DB); they can be revoked instantly. JSON Web Tokens (JWT) are self-contained signed payloads; they cannot be revoked before expiration without token blacklists. When using tokens, store them in HTTP-only, SameSite=Strict cookies to prevent XSS theft.'
          },
          {
            name: 'Role-Based Access Control (RBAC)',
            explanation: 'Guard sensitive endpoints with authorization middleware: requireRole("ADMIN", "MANAGER"). Ensure users can only modify resources they own (resource-level authorization checks in services).'
          }
        ]
      },
      {
        letter: 'D',
        title: 'Backend Architectural Design',
        summary: 'Building modular monoliths with clean separation between transport and business logic.',
        topics: [
          {
            name: 'Layered Architecture (N-Tier)',
            explanation: 'Strict separation of concerns: (1) Controllers handle HTTP protocol details (parsing headers, status codes). (2) Services encapsulate pure business domain logic. (3) Repositories encapsulate database queries. Services can be invoked by background workers or CLI scripts without mocking HTTP objects.'
          },
          {
            name: 'Why Start with a Modular Monolith',
            explanation: 'Microservices introduce distributed systems overhead: network latency, distributed transactions, serialization bugs, and complex orchestration. A modular monolith provides identical modularity within a single deployable unit, scaling effectively for 95% of applications.'
          }
        ]
      }
    ],
    tools: [
      { name: 'Node.js', role: 'Asynchronous JavaScript server-side runtime' },
      { name: 'Express.js', role: 'Minimalist web framework for routing and middleware' },
      { name: 'Zod', role: 'TypeScript-first schema declaration and data validation' },
      { name: 'bcrypt / Argon2', role: 'Cryptographic password hashing library' },
      { name: 'Postman / Thunder Client', role: 'Interactive HTTP API endpoint testing' },
      { name: 'Supertest', role: 'Automated integration testing for HTTP servers' }
    ],
    patterns: [
      'Chain of Responsibility middleware pipeline',
      'Thin Controllers, Rich Services architecture',
      'Centralized 4-parameter error middleware with custom domain errors',
      'Idempotency keys for non-safe mutating operations',
      'Graceful shutdown handling SIGTERM and SIGINT signals'
    ],
    commonMistakes: [
      'Writing raw database queries directly inside Express route callbacks',
      'Storing passwords in plaintext or using outdated algorithms like MD5 or SHA-256 without salts',
      'Storing JWT access tokens in browser localStorage where any XSS script can extract them',
      'Trusting client-side role assertions without re-verifying permissions on the backend',
      'Leaking raw database stack traces and credentials in production HTTP 500 responses'
    ],
    exercises: [
      {
        title: 'Custom Middleware Pipeline',
        task: 'Build custom Express middleware for request logging, Bearer token extraction, and IP rate limiting using an in-memory token bucket.'
      },
      {
        title: 'Complete Auth Flow',
        task: 'Implement user signup, login with bcrypt password comparison, HTTP-only cookie issuance, and protected profile endpoint.'
      },
      {
        title: 'Automated API Integration Tests',
        task: 'Author a Supertest suite verifying status codes 200, 201, 400, 401, 403, and 404 for a RESTful resource.'
      }
    ],
    project: {
      title: 'Production-Grade REST API',
      description: 'Design and build a complete REST API with user authentication, role-based access control, schema validation, paginated filtering, centralized error handling, and automated integration tests.'
    },
    documentation: [
      { name: 'Node.js Official API Documentation', url: 'https://nodejs.org/docs/latest/api/' },
      { name: 'Express.js Guide & API Reference', url: 'https://expressjs.com' },
      { name: 'OWASP Authentication Cheat Sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html' }
    ],
    exitCriteria: 'You can build a secure, validated REST API in Express, trace a request through middleware and service layers, enforce authentication, and defend against unauthorized access.'
  },

  // ─────────────────────────────────────────────────────────────
  // PHASE 04 — DATABASES AND DATA MODELLING
  // ─────────────────────────────────────────────────────────────
  {
    phase: '04',
    title: 'DATABASES & DATA MODELLING',
    subtitle: 'Persistence, Schema Design, Indexing Strategies, and Performance Optimization',
    timeline: 'Weeks 19 — 24',
    category: 'Databases',
    purpose: 'Learn how to model information reliably, query data efficiently, and maintain integrity across system lifecycles. Application code is ephemeral; data is permanent. Poor database schema design and missing indexes cause 90% of production performance bottlenecks.',
    prerequisites: 'Basic backend engineering, understanding of asynchronous operations, JSON data structures, and relational concepts.',
    learningObjectives: [
      'Design efficient NoSQL document schemas in MongoDB using embedding vs referencing trade-offs',
      'Build advanced aggregation pipelines for analytical transformations and reporting',
      'Understand relational database fundamentals (PostgreSQL, ACID transactions, joins, foreign keys)',
      'Optimize query performance using compound indexes, explain plans, and connection pooling',
      'Implement data integrity safeguards: unique constraints, soft deletes, and schema migrations'
    ],
    coreSections: [
      {
        letter: 'A',
        title: 'MongoDB & Document Databases',
        summary: 'Modeling hierarchical and polymorphic data in flexible JSON/BSON structures.',
        topics: [
          {
            name: 'BSON Documents & Collections',
            explanation: 'MongoDB stores records as BSON (Binary JSON), supporting rich types (ObjectId, Date, 64-bit integer, Decimal128). Documents in a collection can have flexible schemas, but production systems enforce strict schema validators.'
          },
          {
            name: 'CRUD Operations & Query Operators',
            explanation: 'Querying with comparison operators ($eq, $gt, $in), logical operators ($and, $or), element operators ($exists), and array operators ($elemMatch). Atomic update operators ($set, $inc, $push, $pull) ensure safe concurrent state changes.'
          },
          {
            name: 'Aggregation Pipelines',
            explanation: 'The aggregation framework processes documents through sequential stages ($match, $project, $group, $sort, $limit, $lookup, $unwind). It enables server-side analytics, calculated totals, and joining data from separate collections.'
          }
        ]
      },
      {
        letter: 'B',
        title: 'Data Modelling: Embedding vs Referencing',
        summary: 'Balancing read performance against data duplication and update anomalies.',
        topics: [
          {
            name: 'The Embedding Pattern (Denormalization)',
            explanation: 'Store related data in subdocuments or arrays within the same parent document (e.g. items inside an Order). Ideal when data is read together, has 1:1 or 1:Few cardinality, and does not grow unbounded.'
          },
          {
            name: 'The Referencing Pattern (Normalization)',
            explanation: 'Store ObjectIds pointing to documents in another collection (e.g. authorId in a Post). Ideal when data has 1:Many or Many:Many cardinality, is frequently updated independently, or when embedded arrays would exceed the 16MB document limit.'
          },
          {
            name: 'Design Around Access Patterns',
            explanation: 'In NoSQL, design your data model to satisfy your most frequent query access patterns, rather than normalizing purely for theoretical elegance.'
          }
        ]
      },
      {
        letter: 'C',
        title: 'Relational Database Fundamentals (PostgreSQL)',
        summary: 'Understanding relational tables, foreign keys, SQL joins, and ACID transactions.',
        topics: [
          {
            name: 'ACID Guarantees',
            explanation: 'Atomicity (all operations succeed or all roll back), Consistency (invariants and constraints enforced), Isolation (concurrent transactions execute without interference), Durability (committed data survives server crashes).'
          },
          {
            name: 'When PostgreSQL is Preferable to MongoDB',
            explanation: 'Choose PostgreSQL when your domain features highly relational data, complex multi-table joins, strict foreign-key integrity constraints, or financial accounting requirements where consistency takes precedence over schema flexibility.'
          }
        ]
      },
      {
        letter: 'D',
        title: 'Query Optimization & Indexing',
        summary: 'Transforming slow full-table scans into millisecond index lookups.',
        topics: [
          {
            name: 'Index Types & Explain Plans',
            explanation: 'Single-field indexes, compound indexes, unique indexes, and TTL indexes. Using explain("executionStats") to verify index usage: avoid COLLSCAN (scanning every document) in favor of IXSCAN (index key scan).'
          },
          {
            name: 'The Equality, Sort, Range (ESR) Rule',
            explanation: 'When designing compound indexes, order index keys: (1) Equality filters first, (2) Sort fields second, (3) Range filters last. This allows the database engine to locate and order results with minimal memory overhead.'
          },
          {
            name: 'Cursor-Based vs Offset-Based Pagination',
            explanation: 'Offset pagination (skip(10000).limit(20)) degrades in performance because the database must scan and discard 10,000 documents. Keyset / cursor-based pagination (where _id > lastSeenId) performs in O(1) time regardless of depth.'
          }
        ]
      }
    ],
    tools: [
      { name: 'MongoDB Community & Atlas', role: 'NoSQL document database engine' },
      { name: 'MongoDB Compass', role: 'Visual GUI for query profiling and aggregation pipeline testing' },
      { name: 'Mongoose', role: 'Object Data Modeling (ODM) library for Node.js' },
      { name: 'PostgreSQL', role: 'Open-source object-relational database management system' }
    ],
    patterns: [
      'Document embedding for 1:Few atomic reads',
      'Document referencing for 1:Many unbounded entities',
      'Compound indexing following the ESR (Equality, Sort, Range) rule',
      'Cursor-based pagination for high-volume datasets',
      'Optimistic concurrency control with version keys (__v)'
    ],
    commonMistakes: [
      'Creating unbounded arrays inside documents that eventually exceed the 16MB document limit',
      'Running production queries without indexes, causing 100% CPU spikes during traffic surges',
      'Using offset pagination on millions of records, degrading response times',
      'Treating MongoDB as an excuse to avoid thinking about schema design and consistency',
      'Neglecting to test database restore procedures from backup snapshots'
    ],
    exercises: [
      {
        title: 'Aggregation Pipeline Analysis',
        task: 'Build a MongoDB aggregation pipeline calculating monthly revenue, order volume, and top 5 customers from a collection of raw sales orders.'
      },
      {
        title: 'Query Plan Optimization',
        task: 'Use explain("executionStats") to diagnose an unindexed query, create an optimal compound index, and prove that totalDocsExamined dropped from 50,000 to 10.'
      },
      {
        title: 'Relational Schema Design',
        task: 'Model a multi-tenant booking system in PostgreSQL with primary keys, foreign keys, and unique constraints preventing double-bookings.'
      }
    ],
    project: {
      title: 'Multi-User Inventory & Booking Data Architecture',
      description: 'Architect and implement the complete database tier for a multi-tenant business platform. Implement compound indexes, validation schemas, aggregation pipelines, and atomic transactions preventing concurrency conflicts.'
    },
    documentation: [
      { name: 'MongoDB Manual & Query Reference', url: 'https://www.mongodb.com/docs/' },
      { name: 'Mongoose ODM Documentation', url: 'https://mongoosejs.com/docs/' },
      { name: 'PostgreSQL Documentation', url: 'https://www.postgresql.org/docs/' }
    ],
    exitCriteria: 'You can design a database model suited to real application access patterns, create optimal compound indexes, explain query plans, and justify NoSQL vs relational database choices.'
  },

  // ─────────────────────────────────────────────────────────────
  // PHASE 05 — FULL-STACK APPLICATION ARCHITECTURE
  // ─────────────────────────────────────────────────────────────
  {
    phase: '05',
    title: 'FULL-STACK ARCHITECTURE',
    subtitle: 'System Boundaries, End-to-End Workflows, Design Patterns, and State Consistency',
    timeline: 'Weeks 25 — 30',
    category: 'Architecture',
    purpose: 'Synthesize the frontend, backend, and database into a cohesive, production-grade application. Full-stack engineering is not simply writing frontend and backend in the same repository; it is the discipline of architecting end-to-end data contracts, managing asynchronous failure modes, and keeping user interfaces and persistent databases synchronized.',
    prerequisites: 'Completion of Phases 01 through 04 (Foundations, Frontend, Backend, Databases).',
    learningObjectives: [
      'Architect full-stack systems with clear boundaries, typed API contracts, and graceful error propagation',
      'Implement complete production workflows: auth, protected routes, CRUD, multi-criteria search, and file uploads',
      'Apply classic engineering design patterns (Adapter, Strategy, Observer, Dependency Injection) with real trade-offs',
      'Manage application consistency: optimistic UI updates, cache invalidation, race conditions, and idempotency',
      'Build and test an end-to-end multi-user business application with documented architecture'
    ],
    coreSections: [
      {
        letter: 'A',
        title: 'End-to-End System Structure',
        summary: 'Coordinating data flow across the client, API gateway, business logic, and database.',
        topics: [
          {
            name: 'The Full-Stack Architecture Pipeline',
            explanation: 'The request flows: Browser -> React View -> Typed API Client -> HTTP Request -> Express Router -> Middleware Pipeline -> Validation -> Controller -> Domain Service -> Data Repository -> Database -> JSON Response -> UI State Update.'
          },
          {
            name: 'Contract-Driven Development',
            explanation: 'Define shared TypeScript interfaces or schemas for API request and response envelopes. Both frontend and backend adhere to identical data contracts, eliminating mismatched property name bugs.'
          },
          {
            name: 'Environment Isolation & Configuration',
            explanation: 'Enforce strict environment separation across Development, Staging, and Production. All secrets (database URIs, API keys, JWT secrets) reside exclusively in environment variables, never hardcoded in source control.'
          }
        ]
      },
      {
        letter: 'B',
        title: 'Full-Stack Workflow Mechanics',
        summary: 'Deconstructing real-world workflows across frontend, backend, database, and security tiers.',
        topics: [
          {
            name: 'User Onboarding & Session Flow',
            explanation: 'Frontend captures input and validates format -> API validates against schema -> Service hashes password -> DB stores record -> Backend issues HTTP-only cookie -> Frontend updates AuthContext -> Protected views unlock.'
          },
          {
            name: 'File Upload Pipeline',
            explanation: 'Never upload large files directly through your main application database. Instead, request a presigned upload URL from the backend, upload the binary directly from the browser to cloud object storage (AWS S3), then submit the verified object URL to the database.'
          },
          {
            name: 'Multi-Field Search & Filtering',
            explanation: 'Frontend synchronizes filter state with URL search params (?category=tech&page=2) -> API parses query into typed filter object -> DB applies compound index filter -> Returns paginated result set with total counts.'
          }
        ]
      },
      {
        letter: 'C',
        title: 'Engineering Design Patterns in Practice',
        summary: 'Applying reusable architectural patterns to solve concrete problems.',
        topics: [
          {
            name: 'Service Layer & Repository Abstraction',
            explanation: 'Separates business logic from transport (HTTP) and persistence (SQL/NoSQL), allowing domain rules to be tested without running servers or databases.'
          },
          {
            name: 'Adapter Pattern for Third-Party Vendors',
            explanation: 'Wrap third-party APIs (Stripe, Twilio, SendGrid) behind internal interfaces, insulating your application from breaking vendor changes.'
          },
          {
            name: 'Strategy Pattern for Business Rules',
            explanation: 'Encapsulate interchangeable algorithms (shipping calculators, tax rules, discount engines) behind a common interface, keeping code open for extension.'
          }
        ]
      },
      {
        letter: 'D',
        title: 'Application State & Consistency',
        summary: 'Handling concurrency, race conditions, and network failures gracefully.',
        topics: [
          {
            name: 'Optimistic UI Updates with Rollback',
            explanation: 'Update local UI state immediately upon user action (e.g. liking a post or checking a task) while firing the network request in the background. If the request fails, cleanly roll back to previous state and notify the user.'
          },
          {
            name: 'Preventing Double Submissions & Race Conditions',
            explanation: 'Disable submit buttons during pending mutations, implement frontend request debouncing, and attach unique Idempotency Keys on mutating backend requests to prevent duplicate transactions.'
          }
        ]
      }
    ],
    tools: [
      { name: 'MERN / PERN Stack', role: 'Unified full-stack technology ecosystem' },
      { name: 'TanStack Query', role: 'Server-state synchronization and cache invalidation' },
      { name: 'Zod', role: 'Shared data validation across client and server' },
      { name: 'AWS S3 / Cloudinary', role: 'Direct-to-cloud object storage for user media' }
    ],
    patterns: [
      'Typed API contract envelopes ({ success: boolean, data?: T, error?: E })',
      'Presigned URLs for direct-to-cloud file uploads',
      'Optimistic updates with automatic error rollback',
      'Idempotency keys on financial and order mutations',
      'Layered modular monolith domain boundaries'
    ],
    commonMistakes: [
      'Storing business logic in React components or raw SQL inside Express routes',
      'Streaming large file uploads directly through Node.js RAM into database documents',
      'Trusting client-side calculation of order prices, discounts, or permissions',
      'Failing to handle network drops during asynchronous mutations',
      'Introducing premature microservices architecture before establishing product boundaries'
    ],
    exercises: [
      {
        title: 'Presigned S3 Upload Pipeline',
        task: 'Implement a secure file upload pipeline where the backend generates an AWS S3 presigned PUT URL and the frontend uploads a photo directly to S3.'
      },
      {
        title: 'Optimistic Task Manager',
        task: 'Build a React + Express kanban card move workflow with instant optimistic UI reordering and automatic rollback if the API responds with 500.'
      },
      {
        title: 'Idempotent Payment Handler',
        task: 'Write a payment mutation endpoint that accepts an Idempotency-Key header, caches responses in memory/Redis, and prevents double-charges.'
      }
    ],
    project: {
      title: 'Full-Stack Business Management Platform',
      description: 'Build an end-to-end multi-user application (e.g. Inventory & Order Management). Implement user authentication, role-based access, CRUD workflows, file uploads, server-state caching, and automated integration tests.'
    },
    documentation: [
      { name: 'React.dev — Synchronizing with Effects', url: 'https://react.dev/learn/synchronizing-with-effects' },
      { name: 'TanStack Query Guide', url: 'https://tanstack.com/query/latest' },
      { name: 'Refactoring Guru — Design Patterns Catalog', url: 'https://refactoring.guru/design-patterns' }
    ],
    exitCriteria: 'You can trace a complete user action from a button click in React through API routing, validation, service business logic, and database operations back to the UI state update.'
  },

  // ─────────────────────────────────────────────────────────────
  // PHASE 06 — TESTING, SECURITY AND CODE QUALITY
  // ─────────────────────────────────────────────────────────────
  {
    phase: '06',
    title: 'TESTING, SECURITY & CODE QUALITY',
    subtitle: 'Defect Detection, Threat Mitigation, and Long-Term Maintainability',
    timeline: 'Weeks 31 — 36',
    category: 'Quality & Security',
    purpose: 'Learn how to detect defects early, mitigate real-world security vulnerabilities, and keep codebases maintainable over years. Software engineering differs from casual programming because of verification: testing ensures code works today; security protects users against attacks; quality standards ensure someone else can maintain it tomorrow.',
    prerequisites: 'Experience building full-stack applications with React, Node.js, and databases.',
    learningObjectives: [
      'Formulate a comprehensive testing strategy balancing Unit, Integration, and End-to-End tests',
      'Understand and defend against the OWASP Top 10 web application vulnerabilities',
      'Implement defense-in-depth security: sanitize inputs, prevent injection, configure secure headers',
      'Establish automated code quality standards with static analysis, type checking, and code reviews',
      'Identify and refactor dangerous engineering anti-patterns and technical debt'
    ],
    coreSections: [
      {
        letter: 'A',
        title: 'Comprehensive Testing Pyramid',
        summary: 'Balancing test speed, isolation, and confidence across the application stack.',
        topics: [
          {
            name: 'The Testing Pyramid Philosophy',
            explanation: 'Unit tests (base of pyramid: fast, numerous, testing pure functions in isolation) -> Integration tests (middle: testing collaborations between controllers, services, and databases) -> End-to-End tests (peak: testing critical user journeys in real browsers with Playwright).'
          },
          {
            name: 'Test Doubles: Mocks, Stubs, and Fixtures',
            explanation: 'Differentiate between Stubs (canned answers to queries) and Mocks (verifying specific method calls occurred). Over-mocking leads to brittle tests that pass even when the real application is broken. Prefer testing with realistic in-memory test doubles.'
          },
          {
            name: 'End-to-End Testing with Playwright',
            explanation: 'Automating real browser sessions to test critical revenue flows (signup, checkout, billing). Playwright provides auto-waiting, visual debugging traces, and cross-browser execution across Chromium, Firefox, and WebKit.'
          }
        ]
      },
      {
        letter: 'B',
        title: 'Web Application Security & OWASP Top 10',
        summary: 'Understanding common attack vectors and implementing real mitigations.',
        topics: [
          {
            name: 'Broken Access Control & Insecure Direct Object References (IDOR)',
            explanation: 'The #1 web vulnerability. Occurs when an API allows a user to access or mutate records belonging to someone else simply by changing the ID in the URL (/api/invoices/123). Always verify ownership on the server before returning data.'
          },
          {
            name: 'Injection Attacks (SQL & NoSQL)',
            explanation: 'Untrusted user input executed as commands. In NoSQL, passing an object like {"$gt": ""} instead of a string can bypass password checks. Mitigate with parameterized queries, ORM abstraction, and strict input validation via Zod.'
          },
          {
            name: 'Cross-Site Scripting (XSS) & Content Security Policy (CSP)',
            explanation: 'Malicious scripts injected into the browser via unescaped user content. React escapes strings by default; avoid dangerouslySetInnerHTML. Configure strict Content-Security-Policy headers via Helmet to block unauthorized script execution.'
          },
          {
            name: 'Cross-Site Request Forgery (CSRF)',
            explanation: 'Tricking an authenticated user browser into executing unauthorized requests. Mitigate using SameSite=Strict cookies, custom authorization headers (Authorization: Bearer), and CSRF tokens.'
          }
        ]
      },
      {
        letter: 'C',
        title: 'Code Quality & Refactoring Standards',
        summary: 'Maintaining codebase health through automation and discipline.',
        topics: [
          {
            name: 'Automated Static Analysis & Linter Rules',
            explanation: 'Integrate ESLint and Prettier into your workflow to catch errors (unused variables, floating promises, accidental mutations) automatically before code review.'
          },
          {
            name: 'Managing Technical Debt & Refactoring',
            explanation: 'Technical debt is the implied cost of future rework caused by choosing an easy solution now instead of a better approach. Refactor continuously using the Boy Scout Rule: leave code cleaner than you found it.'
          }
        ]
      },
      {
        letter: 'D',
        title: 'Engineering Anti-Patterns',
        summary: 'Identifying structural flaws that degrade performance and maintainability.',
        topics: [
          {
            name: 'God Objects & Monolithic Components',
            explanation: 'Components or classes that know too much and do too much. Break them into composable single-responsibility modules.'
          },
          {
            name: 'Silent Error Swallowing',
            explanation: 'Using empty try { ... } catch (e) {} blocks that swallow exceptions. Errors must always be logged with diagnostic context and handled appropriately.'
          },
          {
            name: 'Premature Optimization',
            explanation: 'Spending days optimizing code paths that contribute 0.1% to latency while ignoring database queries that consume 90% of execution time. Always measure before optimizing.'
          }
        ]
      }
    ],
    tools: [
      { name: 'Vitest', role: 'Vite-native unit and integration test runner' },
      { name: 'React Testing Library', role: 'Component testing utility focusing on user behavior' },
      { name: 'Supertest', role: 'HTTP assertion library for testing REST endpoints' },
      { name: 'Playwright', role: 'End-to-end browser automation framework' },
      { name: 'Helmet', role: 'Security middleware setting HTTP defense headers' }
    ],
    patterns: [
      'Arrange-Act-Assert (AAA) test structure',
      'Parameterized queries to prevent injection attacks',
      'Server-side resource ownership validation on all routes',
      'Centralized audit logging for sensitive actions',
      'Strict Content-Security-Policy and CORS headers'
    ],
    commonMistakes: [
      'Testing internal component state rather than observable user output',
      'Trusting client-supplied IDs without verifying that the requesting user owns the resource',
      'Swallowing exceptions in empty catch blocks, masking critical production failures',
      'Hardcoding API keys or secrets in public source repositories',
      'Skipping automated tests under time pressure, accumulating unmanageable technical debt'
    ],
    exercises: [
      {
        title: 'IDOR Vulnerability Patching',
        task: 'Identify and patch an Insecure Direct Object Reference (IDOR) flaw in an API route to verify that users cannot view invoices belonging to other accounts.'
      },
      {
        title: 'Security Audit & Helmet Configuration',
        task: 'Configure Helmet with custom Content-Security-Policy, HSTS, and CORS origin whitelisting, and verify headers using curl -I.'
      },
      {
        title: 'Playwright E2E Flow',
        task: 'Author a Playwright test simulating a user signing up, creating an item, editing it, and verifying it renders in the table.'
      }
    ],
    project: {
      title: 'Automated Test Suite & Security Hardening',
      description: 'Perform a comprehensive security audit on an existing full-stack application. Mitigate OWASP Top 10 vulnerabilities, configure secure headers, and author a multi-tier test suite (Unit, Integration, E2E) that runs in CI.'
    },
    documentation: [
      { name: 'OWASP Top 10 Official Document', url: 'https://owasp.org/www-project-top-ten/' },
      { name: 'Playwright Official Documentation', url: 'https://playwright.dev/docs/intro' },
      { name: 'Vitest Official Documentation', url: 'https://vitest.dev/guide/' }
    ],
    exitCriteria: 'You can formulate a testing strategy, write tests that catch real regressions, conduct a security review, and demonstrate how tests and design changes mitigate major risks.'
  },

  // ─────────────────────────────────────────────────────────────
  // PHASE 07 — DEPLOYMENT AND DEVOPS
  // ─────────────────────────────────────────────────────────────
  {
    phase: '07',
    title: 'DEPLOYMENT & DEVOPS',
    subtitle: 'Containerization, CI/CD Pipelines, Cloud Infrastructure, and Observability',
    timeline: 'Weeks 37 — 42',
    category: 'DevOps',
    purpose: 'Transition software from a local development machine to a reliable, scalable production environment. Code that only runs locally has zero value. Modern DevOps practices automate verification, standardize container runtime environments, and provide the observability needed to diagnose production incidents.',
    prerequisites: 'Full-stack application development experience, command line proficiency, Git workflows.',
    learningObjectives: [
      'Understand production environments: build steps, environment variables, DNS, and SSL/TLS',
      'Package applications into lightweight, reproducible containers using Docker and multi-stage builds',
      'Build automated CI/CD pipelines using GitHub Actions to lint, test, build, and deploy code',
      'Deploy full-stack applications across specialized platforms (Vercel, Render, Atlas, Cloud)',
      'Implement production reliability standards: structured logging, health checks, and monitoring'
    ],
    coreSections: [
      {
        letter: 'A',
        title: 'Production Deployment Fundamentals',
        summary: 'Bridging the gap between local development and production environments.',
        topics: [
          {
            name: 'Environment Parity (Dev, Staging, Prod)',
            explanation: 'The Twelve-Factor App methodology mandates keeping development, staging, and production as similar as possible. Differences in database versions or operating system libraries lead to subtle production bugs.'
          },
          {
            name: 'Build Processes & Asset Optimization',
            explanation: 'Production builds minify JavaScript, tree-shake unused code, compile CSS, hash filenames for immutable caching (main.d41d8c.js), and compress images. The resulting static assets are distributed via global Content Delivery Networks (CDNs).'
          },
          {
            name: 'DNS, Custom Domains & SSL Certificates',
            explanation: 'Configuring A records (pointing to IP addresses) and CNAME records (aliasing domain names). Modern platforms automate SSL/TLS certificate issuance via Let\'s Encrypt, enforcing HTTPS and HSTS.'
          }
        ]
      },
      {
        letter: 'B',
        title: 'CI/CD Automation with GitHub Actions',
        summary: 'Automating the path from git push to production release.',
        topics: [
          {
            name: 'Continuous Integration (CI) Principles',
            explanation: 'Every pull request triggers an automated workflow in an isolated runner: checkout code -> install dependencies -> run linter -> run type-checker -> execute automated tests -> verify build passes. Pull requests cannot merge unless all checks succeed.'
          },
          {
            name: 'Continuous Deployment (CD) & Rollbacks',
            explanation: 'Upon merging into main, CD workflows build production artifacts and deploy automatically to cloud hosts. If health checks fail after deployment, the system initiates an automated rollback to the previous known good deployment.'
          }
        ]
      },
      {
        letter: 'C',
        title: 'Docker Fundamentals & Containers',
        summary: 'Packaging applications and runtime dependencies into immutable containers.',
        topics: [
          {
            name: 'Images vs Containers vs Virtual Machines',
            explanation: 'A Virtual Machine emulates an entire operating system on hypervisor hardware. A Docker container shares the host OS kernel while virtualizing user space, consuming far less RAM and starting in milliseconds. An Image is the immutable snapshot; a Container is the running instance.'
          },
          {
            name: 'Multi-Stage Dockerfiles',
            explanation: 'Multi-stage builds use one stage with full build tooling to compile TypeScript, then copy only the compiled artifacts into a lightweight production image (e.g. node:alpine). This keeps production images small (<100MB) and eliminates attack surface.'
          },
          {
            name: 'Docker Compose for Local Orchestration',
            explanation: 'Declare multi-container environments in docker-compose.yml (e.g., App + MongoDB + Redis). A single command (docker compose up) spins up the entire interconnected stack with private networking.'
          }
        ]
      },
      {
        letter: 'D',
        title: 'Production Observability & Reliability',
        summary: 'Monitoring system health, structured logging, and incident response.',
        topics: [
          {
            name: 'Structured JSON Logging',
            explanation: 'Never use console.log in production. Output structured JSON logs containing timestamp, log level (info, warn, error), message, and correlation IDs (reqId), enabling automated ingestion into log aggregation tools.'
          },
          {
            name: 'Application Health Checks (/health)',
            explanation: 'Expose a /health endpoint that tests database connectivity and returns HTTP 200 when operational. Cloud orchestrators query this endpoint periodically to determine whether to route traffic to the instance or restart it.'
          }
        ]
      }
    ],
    tools: [
      { name: 'GitHub Actions', role: 'Workflow automation and CI/CD pipeline runner' },
      { name: 'Docker', role: 'Container engine and image builder' },
      { name: 'Docker Compose', role: 'Multi-container local service orchestration' },
      { name: 'Vercel / Render / Railway', role: 'Managed production deployment platforms' },
      { name: 'MongoDB Atlas', role: 'Managed high-availability cloud database cluster' }
    ],
    patterns: [
      'Multi-stage Docker build pipeline',
      'Automated CI quality gate blocking pull request merges on failure',
      'Zero-downtime rolling deployments',
      'Structured JSON logging with request correlation IDs',
      'Dedicated /health and /ready probe endpoints'
    ],
    commonMistakes: [
      'Hardcoding environment-specific URLs or passwords into Docker images',
      'Using the latest tag on base images in production, introducing unpredictable breaking changes',
      'Running containers as the root user instead of declaring a restricted node user',
      'Deploying without automated health check probes, causing routing to crashed containers',
      'Neglecting to test restore procedures from automated database backups'
    ],
    exercises: [
      {
        title: 'Multi-Stage Dockerfile',
        task: 'Write a multi-stage Dockerfile for a TypeScript Express backend reducing the final image footprint below 120MB and running as non-root.'
      },
      {
        title: 'GitHub Actions CI Pipeline',
        task: 'Create a .github/workflows/ci.yml workflow that triggers on pull requests, installs dependencies, runs ESLint, tsc, and Vitest, and reports status.'
      },
      {
        title: 'Docker Compose Multi-Service Stack',
        task: 'Configure docker-compose.yml running a React frontend, an Express API, and a MongoDB container with persistent volume mounts.'
      }
    ],
    project: {
      title: 'Containerized Production Deployment',
      description: 'Containerize a full-stack application using Docker, configure automated CI/CD pipelines via GitHub Actions, deploy to cloud infrastructure, and document the complete deployment process and rollback strategy.'
    },
    documentation: [
      { name: 'Docker Documentation & Reference', url: 'https://docs.docker.com' },
      { name: 'GitHub Actions Documentation', url: 'https://docs.github.com/en/actions' },
      { name: 'The Twelve-Factor App Methodology', url: 'https://12factor.net' }
    ],
    exitCriteria: 'You can containerize an application, configure automated CI/CD pipelines, deploy safely to production cloud infrastructure, and explain how health checks and logs keep systems reliable.'
  },

  // ─────────────────────────────────────────────────────────────
  // PHASE 08 — ADVANCED ENGINEERING AND SYSTEM DESIGN
  // ─────────────────────────────────────────────────────────────
  {
    phase: '08',
    title: 'ADVANCED ENGINEERING & SYSTEM DESIGN',
    subtitle: 'Scalability, In-Memory Caching, Message Queues, Real-Time Streams, and Trade-Offs',
    timeline: 'Weeks 43 — 52',
    category: 'System Design',
    purpose: 'Develop the capacity to reason about architecture, scalability, reliability, and engineering trade-offs at scale. Advanced engineering is not about adopting every trendy distributed technology; it is about knowing when simpler solutions suffice, where system bottlenecks occur, and how to defend architectural decisions with empirical data.',
    prerequisites: 'Thorough comprehension of Phases 01 through 07; experience operating production applications.',
    learningObjectives: [
      'Compare architectural paradigms (modular monoliths, event-driven systems, microservices) with trade-offs',
      'Analyze and eliminate performance bottlenecks in browsers, runtimes, and databases using profiling',
      'Design caching and asynchronous processing systems using Redis, BullMQ, and dead-letter queues',
      'Build real-time bi-directional systems using WebSockets and Server-Sent Events (SSE)',
      'Master the 10-step repeatable system design methodology to architect resilient large-scale platforms'
    ],
    coreSections: [
      {
        letter: 'A',
        title: 'Architectural Paradigms & Evolution',
        summary: 'Navigating monoliths, event-driven architectures, and distributed systems.',
        topics: [
          {
            name: 'Domain-Driven Design (DDD) & Bounded Contexts',
            explanation: 'Structuring large domains into explicit Bounded Contexts (e.g. Identity, Billing, Catalog). Each context maintains its own domain models and ubiquitous language, preventing domain model pollution across business units.'
          },
          {
            name: 'Event-Driven Architecture (EDA)',
            explanation: 'Decoupling producers from consumers via immutable event streams. Producers emit events (OrderPlaced); multiple consumers react independently (EmailService, InventoryService) without direct synchronous coupling.'
          },
          {
            name: 'Microservices Realities & Trade-Offs',
            explanation: 'Microservices solve organizational scaling problems (enabling 20 independent teams to deploy without coordination), NOT code performance. They introduce distributed transactions, network latency, and operational complexity.'
          }
        ]
      },
      {
        letter: 'B',
        title: 'Performance Profiling & Optimization',
        summary: 'Measuring before optimizing across browser, server, and database layers.',
        topics: [
          {
            name: 'Browser Performance & Web Vitals',
            explanation: 'Optimizing Core Web Vitals: Largest Contentful Paint (LCP < 2.5s), Interaction to Next Paint (INP < 200ms), Cumulative Layout Shift (CLS < 0.1). Techniques: code-splitting, lazy loading, font preloading, image optimization.'
          },
          {
            name: 'Runtime Profiling & Memory Leaks',
            explanation: 'Diagnosing Node.js performance bottlenecks using clinic.js and Chrome DevTools heap snapshots. Identifying memory leaks caused by lingering event listeners, unclosed streams, or growing global caches.'
          },
          {
            name: 'Database N+1 Query Problem',
            explanation: 'Querying a list of 100 posts, then firing 100 individual queries to fetch each author. Mitigate using SQL JOINs, DataLoader batching, or MongoDB $lookup aggregation pipelines.'
          }
        ]
      },
      {
        letter: 'C',
        title: 'Caching & Asynchronous Processing',
        summary: 'Offloading intensive work to background queues and high-speed in-memory stores.',
        topics: [
          {
            name: 'In-Memory Caching with Redis',
            explanation: 'Redis operates in RAM, serving reads in under 1 millisecond. Patterns: Cache-Aside (check cache, fetch DB on miss, write to cache with TTL), Write-Through, and Cache Invalidation strategies.'
          },
          {
            name: 'Queue-Based Background Workers (BullMQ)',
            explanation: 'Moving slow operations (PDF generation, email dispatch, video transcoding) into persistent Redis-backed queues. Dedicated workers process jobs with controlled concurrency, exponential backoff retries, and dead-letter queues.'
          }
        ]
      },
      {
        letter: 'D',
        title: 'Real-Time Communication Protocols',
        summary: 'Comparing WebSockets, Server-Sent Events (SSE), and HTTP polling.',
        topics: [
          {
            name: 'WebSockets vs Server-Sent Events vs Polling',
            explanation: 'Polling is simple but wasteful. SSE provides one-way server-to-client streaming over HTTP (ideal for live feeds, LLM token streaming, notifications). WebSockets provide full-duplex, bi-directional communication over a persistent TCP connection (ideal for chat, collaborative canvases, multiplayer games).'
          },
          {
            name: 'Connection Management & Reconnection',
            explanation: 'Handling dropped mobile connections: heartbeat pings, client exponential reconnection backoff, missed message replay buffers, and distributed WebSocket connection state across clusters via Redis Pub/Sub.'
          }
        ]
      },
      {
        letter: 'E',
        title: 'The 10-Step Repeatable System Design Process',
        summary: 'A disciplined engineering methodology for designing large-scale systems.',
        topics: [
          {
            name: 'The 10-Step Framework',
            explanation: '(1) Clarify functional requirements. (2) Identify non-functional requirements (scale, latency, availability, consistency). (3) Estimate scale and capacity numbers. (4) Define high-level API contracts. (5) Model the core data schema. (6) Draw high-level architectural diagram. (7) Deep-dive into critical bottlenecks. (8) Address security, fault tolerance, and data consistency. (9) Compare design alternatives. (10) Document trade-offs and operational costs.'
          },
          {
            name: 'Concrete Design Exercises',
            explanation: 'Practicing the 10-step process on classic problems: (A) URL Shortener (high read-write ratio, hashing, base62 encoding, Redis caching). (B) Real-Time Notification System (WebSockets, Redis pub/sub, delivery guarantees). (C) Distributed File Upload & Transcoding Pipeline.'
          }
        ]
      }
    ],
    tools: [
      { name: 'Redis', role: 'In-memory key-value data store for caching and queues' },
      { name: 'BullMQ', role: 'Redis-backed distributed background job queue' },
      { name: 'Socket.IO / ws', role: 'Real-time bi-directional WebSocket communication' },
      { name: 'Autocannon / k6', role: 'HTTP load testing and benchmarking suite' },
      { name: 'Clinic.js / Chrome Profiler', role: 'Node.js performance and memory profiling' }
    ],
    patterns: [
      'Cache-aside with explicit Time-To-Live (TTL)',
      'Worker queue with exponential backoff and dead-letter queues',
      'Circuit Breaker to prevent cascading downstream failures',
      'Sliding window rate limiting with Redis',
      'Distributed WebSocket clustering using Redis Pub/Sub adapter'
    ],
    commonMistakes: [
      'Adopting microservices prematurely for small teams, creating immense operational drag',
      'Introducing caching without a clear invalidation strategy, serving stale or corrupt data',
      'Failing to handle WebSocket reconnection, leaving users in disconnected zombie states',
      'Running heavy background processing synchronously within HTTP request cycles',
      'Memorizing system design diagrams without understanding the underlying trade-offs'
    ],
    exercises: [
      {
        title: 'Redis Cache-Aside Layer',
        task: 'Implement a Redis caching layer for an API endpoint cutting response latency from 180ms to 4ms with automatic cache invalidation on mutations.'
      },
      {
        title: 'BullMQ Background Worker',
        task: 'Build a durable background job queue that simulates PDF generation with automatic retry backoff and dead-letter queue routing.'
      },
      {
        title: 'System Design Blueprint',
        task: 'Produce a complete 10-step system design document for a real-time collaborative document editor or auction platform.'
      }
    ],
    project: {
      title: 'Distributed Real-Time System',
      description: 'Architect and build an event-driven system featuring real-time WebSocket communication, Redis read-through caching, and a BullMQ background job processing worker with full fault-tolerance and load test verification.'
    },
    documentation: [
      { name: 'Redis Official Documentation', url: 'https://redis.io/docs/' },
      { name: 'BullMQ Guide & Documentation', url: 'https://docs.bullmq.io' },
      { name: 'Socket.IO Documentation', url: 'https://socket.io/docs/v4/' }
    ],
    exitCriteria: 'You can propose a scalable system architecture, identify bottlenecks, compare design alternatives, and justify decisions based on functional and non-functional requirements.'
  }
];
