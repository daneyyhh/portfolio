/**
 * REUBG DEV — Full-Stack Developer Roadmap
 * The 8-Step Interactive Learning Cycle
 */

export const learningMethodSteps = [
  {
    step: '01',
    name: 'UNDERSTAND',
    tagline: 'Mental models before syntax',
    objective: 'Build an intuitive grasp of what problem the technology solves, why it exists, and where it fits in the wider stack.',
    description: 'Read the official documentation overview and a beginner-friendly architectural explanation. Do not start by memorising syntax or boilerplate. Focus on understanding the execution model and constraints.',
    keyQuestions: [
      'What specific problem does this technology or pattern solve that previous tools could not?',
      'What is its underlying execution model (synchronous, event-driven, compiled, interpreted)?',
      'What are its fundamental trade-offs and operational limitations?',
      'Where does it sit in the client-server-database journey?'
    ],
    checklist: [
      'Read official documentation introduction and architecture overview',
      'Draw a napkin mental model diagram of how data flows through it',
      'Identify at least 2 common alternatives and why someone would choose this over them',
      'Define its core vocabulary terms without ambiguous buzzwords'
    ],
    proTip: 'If you cannot explain why you would NOT use a technology, you do not truly understand it yet.'
  },
  {
    step: '02',
    name: 'FOLLOW A GUIDED EXAMPLE',
    tagline: 'Deconstruct working code with intent',
    objective: 'Walk through a focused, well-structured canonical example to see how concepts interact in practice.',
    description: 'Step through one minimal, high-quality tutorial or documentation example. Avoid blindly copying and pasting. Read every single line, trace variable flow, and note how error handling is structured.',
    keyQuestions: [
      'What is the distinct single responsibility of each file and folder?',
      'Where does input enter the system, and where does output exit?',
      'Why was this specific data structure or design pattern chosen?',
      'What happens when an unexpected input or network failure occurs?'
    ],
    checklist: [
      'Clone or open a verified reference implementation',
      'Trace request or data lifecycle from entry point to rendering',
      'Annotate non-obvious lines with inline comments explaining the rationale',
      'Identify which dependencies are core vs purely cosmetic utilities'
    ],
    proTip: 'Never copy-paste code you cannot explain to another developer line-by-line.'
  },
  {
    step: '03',
    name: 'REBUILD FROM MEMORY',
    tagline: 'Active recall and muscle memory',
    objective: 'Close the tutorial tab and reconstruct the minimal working example from a blank editor file.',
    description: 'Close reference code and re-implement the solution from scratch. When you hit a roadblock, resist immediately reopening the tutorial; consult official API reference docs, inspect runtime console errors, or use debugger breakpoints.',
    keyQuestions: [
      'Can I set up the boilerplate, configuration, and entry points without a generator?',
      'Where did my mental model fail when the compiler or runtime threw an error?',
      'What exact error message appeared, and what does it tell me about runtime state?'
    ],
    checklist: [
      'Start from an empty directory (`git init` + package setup)',
      'Construct core functionality relying purely on memory and official docs',
      'Use debugger breakpoints or structured logs to inspect state at each step',
      'Commit your working baseline with a clean, descriptive Git commit message'
    ],
    proTip: 'Struggling through an error message for 15 minutes builds more neural wiring than 5 hours of passive video watching.'
  },
  {
    step: '04',
    name: 'MODIFY THE EXAMPLE',
    tagline: 'Stress-test your comprehension',
    objective: 'Introduce non-trivial requirement changes to prove you understand the mechanics, not just the pattern.',
    description: 'Take the working baseline and deliberately change constraints: add server-side validation, introduce multi-field filtering, alter the database schema, handle a timeout, or add an extra endpoint.',
    keyQuestions: [
      'How does changing the data shape affect upstream components or downstream queries?',
      'Did introducing a new requirement break existing invariants or introduce race conditions?',
      'Is the new logic cleanly colocated or did it introduce messy coupling?'
    ],
    checklist: [
      'Add an unpredicted edge-case requirement (e.g., pagination, rate-limiting, debounce)',
      'Refactor one function into a reusable, pure utility with explicit type contracts',
      'Verify that existing tests or happy paths continue to function correctly',
      'Ensure errors fail fast with actionable client-facing error feedback'
    ],
    proTip: 'If your application breaks when requirements shift slightly, your architecture was brittle.'
  },
  {
    step: '05',
    name: 'BUILD A SMALL PROJECT',
    tagline: 'Synthesize concepts in isolated scope',
    objective: 'Apply the newly mastered technology alongside complementary tools on a realistic, bounded problem.',
    description: 'Select a project whose scope is tight enough to finish within a weekend, but complex enough to require genuine state management, data persistence, and error handling.',
    keyQuestions: [
      'What is the minimum viable set of features required to prove the core concept?',
      'How are errors propagated between system layers (UI, network, controller, database)?',
      'Is the repository structured cleanly for someone else to clone and run in 2 commands?'
    ],
    checklist: [
      'Write a 1-page spec listing functional requirements and data contracts',
      'Implement the solution end-to-end with automated linting and formatting',
      'Handle empty states, loading skeletons, and network failure gracefully',
      'Write a comprehensive README with setup instructions and environment variable specs'
    ],
    proTip: 'Finishing 3 small, fully polished applications is 10x better than abandoning 1 ambitious monolithic clone.'
  },
  {
    step: '06',
    name: 'DEBUG AND TEST',
    tagline: 'Break it deliberately before users do',
    objective: 'Subject the application to adversarial inputs, network disruptions, and concurrency edge cases.',
    description: 'Do not simply verify that the happy path works. Deliberately supply nulls, SQL/NoSQL injection payloads, ultra-long strings, expired tokens, slow network throttling, and double-clicks.',
    keyQuestions: [
      'What happens if the database connection drops mid-transaction?',
      'What happens if the client clicks the submit button 5 times in 200 milliseconds?',
      'Does the UI display a cryptic stack trace or a helpful, secure user message?',
      'Are automated tests verifying observable behavior or fragile internal implementation details?'
    ],
    checklist: [
      'Write automated unit and integration tests covering happy, boundary, and error paths',
      'Simulate 3G network latency and offline modes using browser DevTools',
      'Test invalid payload submissions and verify 400 Bad Request responses with field validation',
      'Verify that sensitive secrets and stack traces are NEVER leaked in HTTP response bodies'
    ],
    proTip: 'A feature without automated tests and error boundaries is just technical debt waiting to explode.'
  },
  {
    step: '07',
    name: 'REVIEW AND DOCUMENT',
    tagline: 'Codify lessons into reusable knowledge',
    objective: 'Write a technical post-mortem / architectural decision record (ADR) detailing the engineering decisions.',
    description: 'Step back and conduct an objective engineering review. Document what went well, what surprised you, what trade-offs you accepted, and what you would architect differently on the next iteration.',
    keyQuestions: [
      'What was the most difficult bug encountered and what was its root cause?',
      'What architectural compromise was made to meet constraints, and what is its future risk?',
      'What metrics or benchmarks prove that this implementation performs acceptably?'
    ],
    checklist: [
      'Draft an Architectural Decision Record (ADR) outlining Context, Decision, and Consequences',
      'Record common pitfalls encountered in a personal technical notebook or blog post',
      'Run a static analysis audit (`eslint`, `tsc`, `audit`) and resolve all warnings',
      'Tag a stable Git release version (`v1.0.0`) with release notes'
    ],
    proTip: 'Writing clear documentation is the highest leverage engineering habit you can develop.'
  },
  {
    step: '08',
    name: 'TEACH THE CONCEPT',
    tagline: 'The Feynman test of mastery',
    objective: 'Explain the technology, its trade-offs, and its mechanics to someone else in plain, unambiguous terms.',
    description: 'Prepare a 5-minute technical explanation or peer code review walkthrough. If you catch yourself using vague hand-waving or reciting buzzwords without explaining mechanisms, return to Step 01.',
    keyQuestions: [
      'Can I explain how this works to a junior developer without relying on jargon?',
      'Can I explain the trade-offs to a senior architect and defend my architectural choices?',
      'Can I diagram the system live on a whiteboard in under 3 minutes?'
    ],
    checklist: [
      'Deliver a lightning talk, write an editorial technical article, or pair-program',
      'Answer questions from peers without defensive reactions or guesswork',
      'Identify any remaining blind spots revealed during questions and document answers',
      'Mark the phase milestone as verified in your learning roadmap tracker'
    ],
    proTip: 'You only truly master what you can teach simply.'
  }
];
