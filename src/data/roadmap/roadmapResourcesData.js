/**
 * REUBG DEV — Full-Stack Developer Roadmap
 * Authoritative Learning Resources & Documentation Guide
 */

export const documentationGuideSteps = [
  {
    step: '01',
    title: 'SEARCH FOR THE EXACT CONCEPT',
    description: 'Avoid vague keyword searches like "how to do react". Query specific language features, methods, or error codes (e.g., "MDN Array.prototype.reduce", "React useEffect cleanup function", "Express error handling middleware").'
  },
  {
    step: '02',
    title: 'READ THE MENTAL MODEL FIRST',
    description: 'Skip straight past the code copy button to the introduction or architecture overview. Understand the problem the feature was designed to solve and its underlying execution model before touching syntax.'
  },
  {
    step: '03',
    title: 'INSPECT THE FORMAL API SIGNATURE',
    description: 'Examine parameter types, default values, return values, and whether the return is synchronous or returns a Promise. Pay special attention to thrown exceptions and error conditions.'
  },
  {
    step: '04',
    title: 'STUDY THE CANONICAL EXAMPLE',
    description: 'Trace the official minimal example line-by-line. Identify which values are inputs, what the output represents, and how errors are caught. Resist the temptation to skim.'
  },
  {
    step: '05',
    title: 'REPRODUCE IN AN ISOLATED SCRATCHPAD',
    description: 'Type the minimal example by hand into a scratch file (`scratch.js` or Node REPL). Execute it. Confirm your understanding of runtime behavior before integrating it into a complex application.'
  },
  {
    step: '06',
    title: 'TEST BOUNDARY VARIATIONS & FAILURES',
    description: 'Pass `null`, pass an empty array, trigger a network error, pass an unexpected data type. Observe how the API responds when abused. Real mastery comes from knowing how tools fail.'
  },
  {
    step: '07',
    title: 'RECORD INSIGHTS & REMAINING QUESTIONS',
    description: 'Write down a 2-sentence summary in your technical notebook explaining when you would use this API, when you would avoid it, and any subtle gotchas discovered.'
  }
];

export const learningResources = [
  {
    name: 'MDN Web Docs — Web Fundamentals',
    topic: 'HTML, CSS, HTTP, Browser APIs, Web Accessibility',
    whyUseful: 'The gold standard, vendor-neutral authoritative reference for the open web platform maintained by Mozilla and web standards authors.',
    phases: ['01', '02'],
    url: 'https://developer.mozilla.org',
    type: 'Official Documentation'
  },
  {
    name: 'MDN JavaScript Guide & Reference',
    topic: 'Core JavaScript, Event Loop, Closures, Async/Await',
    whyUseful: 'Comprehensive, deep coverage of JavaScript language specifications, prototype inheritance, memory management, and built-in objects.',
    phases: ['01', '02', '03'],
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    type: 'Official Documentation'
  },
  {
    name: 'TypeScript Handbook',
    topic: 'Type Inference, Generics, Utility Types, Strict Configuration',
    whyUseful: 'The definitive guide written by the TypeScript compiler team explaining how structural typing, narrowing, and type calculus work.',
    phases: ['02', '03', '05'],
    url: 'https://www.typescriptlang.org/docs/handbook/intro.html',
    type: 'Official Documentation'
  },
  {
    name: 'React.dev — Modern React Docs',
    topic: 'Components, Hooks, State Architecture, Reconciliation',
    whyUseful: 'Interactive, diagram-rich documentation emphasizing modern functional components, declarative thinking, and eliminating redundant effects.',
    phases: ['02', '05'],
    url: 'https://react.dev',
    type: 'Official Documentation'
  },
  {
    name: 'Node.js API Reference',
    topic: 'Event Loop, Non-blocking I/O, Streams, Buffers, Process Lifecycle',
    whyUseful: 'Essential documentation covering low-level Node.js architecture, thread pools, file system APIs, and asynchronous process control.',
    phases: ['03', '05', '08'],
    url: 'https://nodejs.org/docs/latest/api/',
    type: 'Official Documentation'
  },
  {
    name: 'Express.js Documentation',
    topic: 'Routing, Middleware Pipelines, Request/Response, Error Handlers',
    whyUseful: 'Minimalist guide to structuring REST services, writing custom middleware, and integrating template engines or JSON parsers.',
    phases: ['03', '05'],
    url: 'https://expressjs.com',
    type: 'Official Documentation'
  },
  {
    name: 'MongoDB Official Documentation & Manual',
    topic: 'BSON Documents, Aggregation Pipelines, Indexes, Atlas Clusters',
    whyUseful: 'Complete manual for NoSQL data modeling, compound indexing strategies, write concerns, and distributed sharding architecture.',
    phases: ['04', '05'],
    url: 'https://www.mongodb.com/docs/',
    type: 'Official Documentation'
  },
  {
    name: 'Mongoose ODM Documentation',
    topic: 'Schemas, Models, Middleware Hooks, Population, Query Casting',
    whyUseful: 'Deep explanations of schema validation, virtuals, query helpers, and connection pooling when interacting with MongoDB from Node.',
    phases: ['04', '05'],
    url: 'https://mongoosejs.com/docs/',
    type: 'Official Documentation'
  },
  {
    name: 'PostgreSQL Official Documentation',
    topic: 'Relational Modeling, ACID Transactions, SQL Queries, Joins, Indexes',
    whyUseful: 'Unsurpassed technical depth on relational algebra, index types (B-Tree, GIN, GiST), explain plans, and isolation levels.',
    phases: ['04', '08'],
    url: 'https://www.postgresql.org/docs/',
    type: 'Official Documentation'
  },
  {
    name: 'Git Pro Book & Documentation',
    topic: 'Branching, Merging, Rebase, Plumbing vs Porcelain, Conflict Resolution',
    whyUseful: 'The authoritative book explaining the internal DAG (directed acyclic graph) object storage model behind Git commits and trees.',
    phases: ['01', '07'],
    url: 'https://git-scm.com/doc',
    type: 'Official Guide'
  },
  {
    name: 'GitHub Docs & Workflow Automation',
    topic: 'Pull Requests, Branch Protection, GitHub Actions CI/CD',
    whyUseful: 'Comprehensive reference for setting up professional engineering workflows, code review standards, and automated deployment pipelines.',
    phases: ['01', '07'],
    url: 'https://docs.github.com',
    type: 'Official Documentation'
  },
  {
    name: 'OWASP Top 10 Web Application Security',
    topic: 'Injection, Broken Access Control, XSS, CSRF, Secure Headers',
    whyUseful: 'The globally recognized standard security baseline for web applications, detailing the most critical risks and their mitigations.',
    phases: ['03', '05', '06'],
    url: 'https://owasp.org/www-project-top-ten/',
    type: 'Security Standard'
  },
  {
    name: 'Docker Docs & Container Reference',
    topic: 'Images, Multi-Stage Builds, Volumes, Networks, Docker Compose',
    whyUseful: 'Definitive guide on containerizing full-stack microservices, optimizing image layers, and orchestrating local dev clusters.',
    phases: ['07', '08'],
    url: 'https://docs.docker.com',
    type: 'Official Documentation'
  },
  {
    name: 'Vitest Testing Guide',
    topic: 'Unit Testing, Mocks, Spies, Snapshot Testing, Coverage Reports',
    whyUseful: 'Fast, modern testing guide illustrating how to test pure functions, custom hooks, and mock network services efficiently.',
    phases: ['02', '06'],
    url: 'https://vitest.dev/guide/',
    type: 'Official Documentation'
  },
  {
    name: 'Playwright Documentation',
    topic: 'End-to-End Testing, Browser Automation, Trace Viewer, Network Mocking',
    whyUseful: 'Authoritative guide on testing real user interactions in headless browsers with auto-waiting, screenshot comparisons, and visual debugging.',
    phases: ['02', '06'],
    url: 'https://playwright.dev/docs/intro',
    type: 'Official Documentation'
  }
];
