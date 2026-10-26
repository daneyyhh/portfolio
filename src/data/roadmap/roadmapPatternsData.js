/**
 * REUBG DEV — Full-Stack Developer Roadmap
 * Engineering Pattern Library (4 Distinct Categories)
 *
 * For each pattern:
 * - Problem
 * - Basic Idea
 * - Code / Architectural Example
 * - Advantages
 * - Trade-offs
 * - When to Use
 * - When NOT to Use
 * - Common Misuse
 */

export const patternCategories = [
  { id: 'code', label: 'CODE-LEVEL PATTERNS', count: 8 },
  { id: 'frontend', label: 'FRONTEND PATTERNS', count: 7 },
  { id: 'backend', label: 'BACKEND PATTERNS', count: 7 },
  { id: 'system', label: 'SYSTEM-LEVEL PATTERNS', count: 7 }
];

export const patternsData = [
  // ── 01. CODE-LEVEL PATTERNS ──
  {
    id: 'single-responsibility',
    category: 'code',
    name: 'Single Responsibility Principle (SRP)',
    tagline: 'A module should have one, and only one, reason to change',
    problem: 'Functions or classes that mix business rules, data fetching, formatting, and DOM updates become unmaintainable monsters. A change to the database breaks the UI formatter.',
    basicIdea: 'Decompose code so every function, component, or module is solely responsible for one conceptual piece of functionality.',
    example: `// ❌ ANTI-PATTERN: God function
async function processUser(userId) {
  const user = await db.query('SELECT * FROM users WHERE id = ?', [userId]);
  if (!user.email.includes('@')) throw new Error('Invalid email');
  const report = \`User: \${user.name}, Plan: \${user.plan.toUpperCase()}\`;
  await emailService.send(user.email, report);
}

// ✅ CLEAN SRP: Decomposed into single responsibilities
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function formatUserReport(user) {
  return \`User: \${user.name}, Plan: \${user.plan.toUpperCase()}\`;
}
async function sendUserSummary(user, userRepo, mailer) {
  if (!validateEmail(user.email)) throw new ValidationError('Invalid email format');
  const report = formatUserReport(user);
  await mailer.send(user.email, report);
}`,
    advantages: [
      'High testability: each piece can be unit-tested in complete isolation without mocks',
      'Refactoring safety: changing the report format cannot corrupt database queries',
      'Reusability: validation and formatting can be reused across multiple API routes'
    ],
    tradeoffs: [
      'Increased number of files and abstractions',
      'Requires mental discipline to avoid over-fragmenting tiny trivial scripts'
    ],
    whenToUse: 'Whenever a function exceeds 25-30 lines or touches more than one system layer (e.g., HTTP parsing + SQL queries).',
    whenNotToUse: 'Simple one-off shell scripts, build configurations, or trivial glue code where separation adds pure overhead.',
    commonMisuse: 'Creating single-line wrappers around standard language library functions in the name of "single responsibility".'
  },
  {
    id: 'composition',
    category: 'code',
    name: 'Object & Function Composition',
    tagline: 'Favor composition over class inheritance',
    problem: 'Deep class inheritance hierarchies (`class Dog extends Animal extends LivingOrganism extends Entity`) cause the "fragile base class" problem: changing a parent method breaks unrelated subclasses.',
    basicIdea: 'Assemble complex behaviors by combining small, focused, independent functions or objects rather than inheriting properties from an ancestor.',
    example: `// ✅ COMPOSITION: Combining specialized behaviors
const withTimestamp = (obj) => ({ ...obj, createdAt: new Date().toISOString() });
const withAuditUser = (userId) => (obj) => ({ ...obj, updatedBy: userId });
const withId = (id) => (obj) => ({ ...obj, id });

const createInvoice = (data, userId, id) => {
  const pipeline = [withId(id), withTimestamp, withAuditUser(userId)];
  return pipeline.reduce((acc, fn) => fn(acc), data);
};`,
    advantages: [
      'Flexible assembly without rigid inheritance hierarchies',
      'No hidden state leakage from ancestor classes',
      'Easy to replace or mock individual traits'
    ],
    tradeoffs: [
      'Can feel less intuitive for developers trained purely in classical OOP (Java/C++)',
      'Type signatures can become verbose in TypeScript if composing dynamically'
    ],
    whenToUse: 'Building reusable data transformations, business policy pipelines, or sharing capabilities across unrelated entities.',
    whenNotToUse: 'When the domain genuinely features an is-a relationship with strict polymorphism recognized by external frameworks.',
    commonMisuse: 'Chaining dozens of tiny pipe functions until tracing runtime execution becomes impossible.'
  },
  {
    id: 'pure-functions',
    category: 'code',
    name: 'Pure Functions & Immutability',
    tagline: 'Same inputs produce same outputs with zero side effects',
    problem: 'Functions that mutate global variables, alter their incoming arguments, or rely on ambient clock/network state produce erratic, non-reproducible bugs.',
    basicIdea: 'A pure function derives its return value strictly from its parameters, never modifies external state, and mutates nothing outside its local scope.',
    example: `// ❌ IMPURE: Mutates external array and relies on system clock
const cart = [];
function addItem(item) {
  item.addedAt = Date.now(); // Mutates argument!
  cart.push(item); // Mutates outer state!
}

// ✅ PURE: Returns a new array, copies data, time passed as parameter
function addItemToCart(existingCart, itemToAdd, timestamp = Date.now()) {
  return [
    ...existingCart,
    { ...itemToAdd, addedAt: timestamp }
  ];
}`,
    advantages: [
      '100% deterministic: testing requires zero setup or teardown',
      'Trivially parallelizable and memoizable for high-performance caching',
      'Eliminates insidious race conditions caused by shared mutable references'
    ],
    tradeoffs: [
      'Creating new objects and arrays causes temporary garbage collection allocation',
      'Real applications ultimately require side effects (I/O, database writes, screen updates)'
    ],
    whenToUse: 'Calculation of business rules, data formatting, tax/discount computations, and React state updates.',
    whenNotToUse: 'I/O boundaries, logging sinks, streaming large binary buffers where in-place mutation is mandatory for throughput.',
    commonMisuse: 'Trying to make everything pure to the point of wrapping database queries in convoluted monads that obscure the real intent.'
  },
  {
    id: 'early-returns',
    category: 'code',
    name: 'Early Returns (Guard Clauses)',
    tagline: 'Fail fast and keep the happy path unindented',
    problem: 'Nested `if-else` pyramids ("arrow anti-pattern") push core business logic 6 levels deep, forcing readers to keep a mental stack of 10 boolean conditions.',
    basicIdea: 'Check preconditions and invalid states at the top of the function and return immediately. The remaining body represents the clean happy path.',
    example: `// ❌ NESTED PYRAMID
function transferFunds(sender, recipient, amount) {
  if (sender) {
    if (recipient) {
      if (amount > 0) {
        if (sender.balance >= amount) {
          // Actual work 5 levels deep...
          return executeTransfer(sender, recipient, amount);
        } else { return { error: 'Insufficient funds' }; }
      } else { return { error: 'Amount must be positive' }; }
    } else { return { error: 'Recipient missing' }; }
  } else { return { error: 'Sender missing' }; }
}

// ✅ GUARD CLAUSES: Flat, readable, and fail-fast
function transferFunds(sender, recipient, amount) {
  if (!sender) return { error: 'Sender missing' };
  if (!recipient) return { error: 'Recipient missing' };
  if (amount <= 0) return { error: 'Amount must be positive' };
  if (sender.balance < amount) return { error: 'Insufficient funds' };

  return executeTransfer(sender, recipient, amount);
}`,
    advantages: [
      'Eliminates cognitive load by dismissing edge cases early',
      'Keeps indentation flat and line length concise',
      'Makes precondition validation explicit and easy to audit'
    ],
    tradeoffs: [
      'Requires clean cleanup if allocating unmanaged resources (rare in modern JS/TS)'
    ],
    whenToUse: 'Every public function, API handler, or domain operation that accepts parameters needing validation.',
    whenNotToUse: 'When an operation inherently requires a two-way branch where both sides have equal weight and continuation.',
    commonMisuse: 'Using early return to silently hide errors instead of throwing or returning an explicit error object.'
  },
  {
    id: 'dependency-injection',
    category: 'code',
    name: 'Dependency Injection (DI)',
    tagline: 'Pass collaborators in rather than hardcoding their instantiation',
    problem: 'If a service directly instantiates `new StripeClient()` or `new MongoDatabase()`, you cannot test it without connecting to real third-party servers.',
    basicIdea: 'Supply dependent services as arguments (or via constructor) so the consumer depends on an interface rather than a concrete implementation.',
    example: `// ❌ HARDCODED DEPENDENCY
class OrderService {
  constructor() {
    this.mailer = new SendGridMailer(process.env.SENDGRID_API_KEY); // Tight coupling!
  }
}

// ✅ DEPENDENCY INJECTION: Collaborators provided from outside
class OrderService {
  constructor({ orderRepo, paymentGateway, mailer }) {
    this.orderRepo = orderRepo;
    this.paymentGateway = paymentGateway;
    this.mailer = mailer;
  }
  async placeOrder(order) {
    await this.paymentGateway.charge(order.total);
    await this.orderRepo.save(order);
    await this.mailer.sendReceipt(order);
  }
}`,
    advantages: [
      'Effortless unit testing with lightweight in-memory test doubles',
      'Seamless switching between providers (e.g., SendGrid in prod vs Mock in tests)',
      'Clear visibility of everything a component touches'
    ],
    tradeoffs: [
      'Requires a composition root where objects are wired together on app startup',
      'Overkill for small, self-contained leaf functions'
    ],
    whenToUse: 'Backend services that communicate with databases, network APIs, email gateways, or payment processors.',
    whenNotToUse: 'Standard library utilities or pure domain objects that have no external infrastructure dependencies.',
    commonMisuse: 'Importing heavy enterprise Java-style DI reflection frameworks into lightweight Node.js microservices.'
  },
  {
    id: 'strategy',
    category: 'code',
    name: 'Strategy Pattern',
    tagline: 'Interchangeable algorithms behind a common contract',
    problem: 'A massive `switch (shippingMethod)` statement with 300 lines of different discount or shipping calculation algorithms violates the Open/Closed Principle.',
    basicIdea: 'Define a family of algorithms, encapsulate each one inside a strategy object implementing a common interface, and make them interchangeable at runtime.',
    example: `// Strategy implementations
const shippingStrategies = {
  standard: (weight) => weight * 1.5,
  express: (weight) => weight * 3.0 + 10,
  overnight: (weight) => weight * 6.0 + 25,
  localPickup: () => 0
};

function calculateShipping(method, weight) {
  const strategy = shippingStrategies[method];
  if (!strategy) throw new Error(\`Unsupported shipping method: \${method}\`);
  return strategy(weight);
}`,
    advantages: [
      'Open for extension: adding a new shipping method does not touch existing calculators',
      'Eliminates sprawling conditional branches',
      'Encapsulates algorithm-specific data inside its strategy'
    ],
    tradeoffs: [
      'Clients must know which strategy to request or select'
    ],
    whenToUse: 'Dynamic payment gateways, pricing rules, tax computations, file format exporters (CSV, PDF, JSON).',
    whenNotToUse: 'When you only have 2 stable algorithms that will never change.'
  },
  {
    id: 'adapter',
    category: 'code',
    name: 'Adapter Pattern',
    tagline: 'Translate third-party APIs into your domain language',
    problem: 'Calling vendor-specific SDK methods (`paypalClient.executePaymentRequest()`) directly inside your checkout code tightly binds your core business to a vendor that may change their API.',
    basicIdea: 'Wrap external APIs behind an adapter that exposes the exact interface your application domain expects, translating data structures in both directions.',
    example: `// Application expects this standard contract:
// interface PaymentGateway { charge(amount: number, currency: string): Promise<{ success: boolean, transactionId: string }> }

class StripePaymentAdapter {
  constructor(stripeClient) { this.client = stripeClient; }
  async charge(amount, currency) {
    const paymentIntent = await this.client.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe uses cents!
      currency: currency.toLowerCase()
    });
    return { success: paymentIntent.status === 'succeeded', transactionId: paymentIntent.id };
  }
}`,
    advantages: [
      'Shields your domain from third-party breaking changes and strange quirks',
      'Allows swapping vendors (Stripe -> Adyen) by writing one new adapter file',
      'Standardizes disparate error structures into your app error hierarchy'
    ],
    tradeoffs: [
      'Adds one layer of indirection and data translation'
    ],
    whenToUse: 'Any interaction with third-party payment gateways, SMS providers, analytics tools, or legacy SOAP/XML services.',
    whenNotToUse: 'Standard runtime built-ins like Node `fs` or `fetch` where no proprietary vendor format exists.'
  },
  {
    id: 'observer',
    category: 'code',
    name: 'Observer / Event-Driven Pattern',
    tagline: 'Decouple producers from multiple independent consumers',
    problem: 'When a user registers, you must: send a welcome email, create an analytics profile, provision a default workspace, and notify Slack. Hardcoding all 4 into `registerUser` makes it slow and fragile.',
    basicIdea: 'The subject emits an event (`USER_REGISTERED`) without knowing who is listening. Any number of observers can register callbacks to react independently.',
    example: `import { EventEmitter } from 'node:events';
const userEvents = new EventEmitter();

// Observers register their independent concerns
userEvents.on('USER_REGISTERED', async ({ user }) => await sendWelcomeEmail(user));
userEvents.on('USER_REGISTERED', async ({ user }) => await provisionWorkspace(user.id));
userEvents.on('USER_REGISTERED', async ({ user }) => await recordAnalytics('signup', user.id));

// Core domain simply emits without knowing observers
async function registerUser(userData) {
  const user = await userRepo.insert(userData);
  userEvents.emit('USER_REGISTERED', { user });
  return user;
}`,
    advantages: [
      'Extreme decoupling: new features can be added without modifying the registration core',
      'Listeners can be made asynchronous or moved to background workers'
    ],
    tradeoffs: [
      'Flow of control becomes harder to trace via static code analysis',
      'Unhandled errors in one observer can crash the process if not isolated'
    ],
    whenToUse: 'Cross-cutting side effects: notifications, analytics, audit logging, cache invalidation.',
    whenNotToUse: 'Sequential business workflows where step 2 strictly requires data generated by step 1.'
  },

  // ── 02. FRONTEND PATTERNS ──
  {
    id: 'component-composition',
    category: 'frontend',
    name: 'Component Composition',
    tagline: 'Build flexible UI by nesting components rather than passing 25 props',
    problem: 'Creating a `<Modal title="..." isLarge="..." showCancel="..." hasTabs="..." tabList={...} ... />` with 30 boolean props creates an unmaintainable nightmare.',
    basicIdea: 'Break the component down into composable slots using `children` so the caller controls content layout and visual structure.',
    example: `// ✅ COMPOSED MODAL: Flexible and clean
function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

Modal.Header = ({ title, children }) => (
  <header className="flex justify-between border-b pb-2">
    <h3>{title}</h3>
    {children}
  </header>
);
Modal.Body = ({ children }) => <div className="py-4">{children}</div>;
Modal.Footer = ({ children }) => <footer className="flex justify-end gap-2">{children}</footer>;`,
    advantages: [
      'Infinite flexibility without prop bloat',
      'Eliminates prop drilling and reduces re-rendering churn',
      'Natural alignment with HTML mental model'
    ],
    tradeoffs: [
      'Slightly more JSX syntax required at the call site'
    ],
    whenToUse: 'Layout containers, cards, dialogs, accordions, dropdowns, and form wrappers.',
    whenNotToUse: 'Trivial atomic components like a plain icon button.'
  },
  {
    id: 'custom-hooks',
    category: 'frontend',
    name: 'Custom Hooks for Stateful Logic',
    tagline: 'Extract reusable state and side effects out of UI markup',
    problem: 'Duplicating the same 40 lines of `window.addEventListener("resize")` or debounce logic across 8 different components.',
    basicIdea: 'Wrap React primitives (`useState`, `useEffect`, `useCallback`) into a custom function prefixed with `use` to encapsulate stateful behavior.',
    example: `function useDebounce(value, delayMs = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delayMs);
    return () => clearTimeout(handler);
  }, [value, delayMs]);

  return debouncedValue;
}

// In Component:
function SearchInput({ onSearch }) {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 350);

  useEffect(() => {
    if (debouncedQuery) onSearch(debouncedQuery);
  }, [debouncedQuery, onSearch]);

  return <input value={query} onChange={(e) => setQuery(e.target.value)} />;
}`,
    advantages: [
      'Decouples stateful business logic from DOM presentation',
      'Trivially testable with `@testing-library/react-hooks`',
      'Follows React rules of hooks with clean teardown'
    ],
    tradeoffs: [
      'State is not shared across calls (each invocation gets its own independent state)'
    ],
    whenToUse: 'Window listeners, debouncing, media queries, local storage sync, clipboard actions, form controllers.',
    whenNotToUse: 'When you simply need a pure utility function that doesn’t use any React hooks.'
  },
  {
    id: 'controlled-forms',
    category: 'frontend',
    name: 'Controlled vs Uncontrolled Forms',
    tagline: 'Explicit single source of truth for user inputs',
    problem: 'Reading form values directly from `document.getElementById` or having input state desynchronized from React component state.',
    basicIdea: 'Bind form inputs directly to React state via `value` and `onChange`, giving the component complete control over validation, masking, and submission.',
    example: `function LoginForm({ onSubmit }) {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!credentials.email.includes('@')) {
      setErrors({ email: 'Valid email required' });
      return;
    }
    onSubmit(credentials);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" value={credentials.email} onChange={handleChange} />
      {errors.email && <span className="text-red-500">{errors.email}</span>}
      <input type="password" name="password" value={credentials.password} onChange={handleChange} />
      <button type="submit">Log In</button>
    </form>
  );
}`,
    advantages: [
      'Instant real-time validation and input formatting (e.g. phone numbers, currency)',
      'Programmatic control over disable states and submission triggers',
      'Zero DOM querying required'
    ],
    tradeoffs: [
      'Rerenders on every keystroke (can be mitigated with React Hook Form for large forms)'
    ],
    whenToUse: 'Forms requiring instant validation, conditional fields, or character counters.',
    whenNotToUse: 'Massive 100-field data entry grids where uncontrolled inputs (`useRef` or React Hook Form) prevent keystroke re-render lag.'
  },
  {
    id: 'state-colocation',
    category: 'frontend',
    name: 'State Colocation',
    tagline: 'Keep state as close as possible to where it is used',
    problem: 'Dumping every variable (modal open state, active tab, hover tooltip) into a global Redux or Context store triggers entire-app rerenders on a single mouse hover.',
    basicIdea: 'Declare state in the lowest possible common ancestor that actually needs it. If only one button cares about a tooltip, that tooltip state belongs inside that button.',
    example: `// ❌ ANTI-PATTERN: Global store for a local search dropdown
// App.jsx -> Redux store: { isSearchBarDropdownOpen: true }

// ✅ CLEAN COLOCATION: State stays inside the search widget
function SearchWidget() {
  const [isOpen, setIsOpen] = useState(false); // Only SearchWidget rerenders!
  return (
    <div>
      <input onFocus={() => setIsOpen(true)} onBlur={() => setIsOpen(false)} />
      {isOpen && <SearchResultsDropdown />}
    </div>
  );
}`,
    advantages: [
      'Eliminates unnecessary re-renders across the component tree',
      'Components become portable self-contained units you can copy anywhere',
      'Much easier to delete features without untangling global stores'
    ],
    tradeoffs: [
      'When two sibling components eventually need shared state, you must "lift" it up'
    ],
    whenToUse: 'Modals, dropdowns, hover states, local search filters, accordion toggles.',
    whenNotToUse: 'Truly global data like current authenticated user profile, active theme, or internationalization language.'
  },
  {
    id: 'derived-state',
    category: 'frontend',
    name: 'Derived State vs Duplicated State',
    tagline: 'Calculate values during render rather than syncing multiple state variables',
    problem: 'Storing `items`, `filterText`, and `filteredItems` in state, then trying to keep `filteredItems` in sync with a `useEffect`. If you miss an edge case, state gets out of sync.',
    basicIdea: 'Store only the minimal raw source of truth. Compute everything else (totals, filtered lists, active counts) on the fly during render or with `useMemo`.',
    example: `// ❌ DANGEROUS: Syncing state with effects
function Cart({ items }) {
  const [total, setTotal] = useState(0);
  useEffect(() => {
    setTotal(items.reduce((sum, item) => sum + item.price, 0));
  }, [items]); // Extra render cycle, risk of tearing!
}

// ✅ CLEAN: Derived synchronously in render
function Cart({ items }) {
  // Pure derivation during render
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.length;
  const isEligibleForFreeShipping = total >= 50;
  return <div>Total: \${total} | Items: \${itemCount}</div>;
}`,
    advantages: [
      'Impossible for state to become stale or out-of-sync',
      'Removes unnecessary `useEffect` cycles and race conditions',
      'Simpler code with fewer variables to track'
    ],
    tradeoffs: [
      'Expensive calculations on huge lists (>10,000 items) may require `useMemo`'
    ],
    whenToUse: 'Filtering lists, calculating sums, checking form validity, determining disabled states.',
    whenNotToUse: 'Values that must be independently manipulated by user overrides that differ from the source.'
  },
  {
    id: 'server-state-separation',
    category: 'frontend',
    name: 'Server State vs Client State Separation',
    tagline: 'Treat server data as an asynchronous cache, not local UI state',
    problem: 'Storing API responses in global Redux stores and manually orchestrating `FETCH_START`, `FETCH_SUCCESS`, `FETCH_FAIL`, caching, refetching on window focus, and cache invalidation.',
    basicIdea: 'Separate UI state (modal open, theme) from Server State (products, users, orders). Use a dedicated server-state tool (TanStack Query / SWR) that handles caching, deduping, and background updates.',
    example: `import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

function UserProfile({ userId }) {
  const queryClient = useQueryClient();
  
  // Handled automatically: caching, deduping, background refresh, loading/error states
  const { data: user, isLoading, error } = useQuery({
    queryKey: ['users', userId],
    queryFn: () => fetchUserById(userId)
  });

  const mutation = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users', userId] })
  });

  if (isLoading) return <SkeletonLoader />;
  if (error) return <ErrorMessage message={error.message} />;
  return <div>{user.name}</div>;
}`,
    advantages: [
      'Deletes thousands of lines of boilerplate Redux/thunk code',
      'Automatic cache invalidation, deduplication, and stale-while-revalidate',
      'Built-in optimistic updates and retry logic'
    ],
    tradeoffs: [
      'Adds a runtime dependency (TanStack Query) to the bundle'
    ],
    whenToUse: 'Any frontend that consumes REST or GraphQL APIs.',
    whenNotToUse: 'Pure offline apps, canvas games, or static brochure sites with zero API interaction.'
  },
  {
    id: 'feature-based-organisation',
    category: 'frontend',
    name: 'Feature-Based Folder Organisation',
    tagline: 'Group files by business feature, not by technical role',
    problem: 'Storing all components in `/components`, all hooks in `/hooks`, all styles in `/styles`. To edit the "Checkout" flow, you have to scroll through 4 different top-level folders across 50 unrelated files.',
    basicIdea: 'Organize files by feature domain (`/features/auth`, `/features/billing`, `/features/catalog`). Each feature contains its own components, hooks, API client, and tests.',
    example: `src/
├── components/          # Shared global primitives (Button, Modal, Input)
├── features/
│   ├── auth/
│   │   ├── api/login.js
│   │   ├── components/LoginForm.jsx
│   │   ├── hooks/useAuth.js
│   │   └── types.ts
│   └── billing/
│       ├── api/invoices.js
│       ├── components/InvoiceTable.jsx
│       └── hooks/useSubscription.js
└── routes/              # Page views that assemble feature components`,
    advantages: [
      'High cohesion: everything needed for a feature lives in one place',
      'Deleting or refactoring a feature is as simple as deleting one folder',
      'Reduces merge conflicts on large engineering teams'
    ],
    tradeoffs: [
      'Requires clear agreement on what constitutes a feature vs a shared primitive'
    ],
    whenToUse: 'Any production frontend project with more than 5 distinct views or features.',
    whenNotToUse: 'Single-page portfolio websites or tiny weekend prototypes.'
  },

  // ── 03. BACKEND PATTERNS ──
  {
    id: 'middleware-pipeline',
    category: 'backend',
    name: 'Middleware Pipeline',
    tagline: 'Chain request processors using the Chain of Responsibility',
    problem: 'Duplicating token validation, IP rate limiting, logging, and CORS headers at the beginning of every single route handler.',
    basicIdea: 'Execute an ordered chain of middleware functions where each can inspect the request, modify context, abort early, or pass execution via `next()`.',
    example: `// Clean Express Middleware Pipeline
app.use(helmet());                // 1. Security headers
app.use(cors(corsOptions));       // 2. CORS policy
app.use(express.json({ limit: '1mb' })); // 3. Body parsing
app.use(requestLogger);           // 4. Structured logging
app.use(rateLimiter({ max: 60 }));// 5. Abuse prevention

// Route-specific middleware
app.post('/api/orders',
  authenticateToken,              // 6. Identity verification
  requireRole('CUSTOMER'),        // 7. Role-based authorization
  validateBody(orderSchema),      // 8. Payload validation
  orderController.createOrder     // 9. Actual controller
);`,
    advantages: [
      'Clean separation between cross-cutting concerns (auth, logging) and business logic',
      'Fail-fast architecture: invalid tokens or spam payloads never touch controllers',
      'Reusable across routes and sub-routers'
    ],
    tradeoffs: [
      'Order of registration matters critically (e.g. body-parser before route handler)'
    ],
    whenToUse: 'Authentication, logging, body parsing, CORS, compression, rate-limiting, error handling.',
    whenNotToUse: 'Deep domain business rules that depend on complex database transaction state.'
  },
  {
    id: 'service-layer',
    category: 'backend',
    name: 'Service Layer (Domain Boundary)',
    tagline: 'Separate HTTP request parsing from core business logic',
    problem: 'Writing SQL queries and complex business rules directly inside Express route callbacks (`(req, res) => { ... }`). You cannot run business logic in a background worker or CLI script without mocking Express `req` and `res`.',
    basicIdea: 'Controllers only handle HTTP (extract params, call service, send status code). Services contain pure business rules and domain logic.',
    example: `// 1. Controller: Strictly HTTP concerns
async function handleCreateOrder(req, res, next) {
  try {
    const { userId } = req.user;
    const { items, paymentMethodId } = req.body;
    const order = await orderService.checkout(userId, items, paymentMethodId);
    return res.status(201).json({ success: true, data: order });
  } catch (error) {
    next(error); // Delegated to centralized error middleware
  }
}

// 2. Service: Pure business rules, zero Express dependencies
class OrderService {
  async checkout(userId, items, paymentMethodId) {
    const user = await userRepo.findById(userId);
    if (user.isSuspended) throw new ForbiddenError('Account suspended');
    const inventoryAvailable = await inventoryRepo.verifyStock(items);
    if (!inventoryAvailable) throw new ConflictError('Out of stock');
    const payment = await paymentGateway.charge(user.stripeCustomerId, paymentMethodId);
    return await orderRepo.create({ userId, items, paymentId: payment.id });
  }
}`,
    advantages: [
      'Business rules can be reused by background workers, CRON jobs, or WebSocket handlers',
      'Controllers stay wafer-thin (under 15 lines of code)',
      'Trivially unit-testable without spinning up HTTP servers'
    ],
    tradeoffs: [
      'Requires an extra file and function invocation per operation'
    ],
    whenToUse: 'Any backend application handling financial transactions, workflows, or multi-step business logic.',
    whenNotToUse: 'Trivial CRUD proxies that simply read a table and output raw JSON without any business rules.'
  },
  {
    id: 'repository-pattern',
    category: 'backend',
    name: 'Repository Pattern (When Justified)',
    tagline: 'Mediate between domain logic and data mapping layers',
    problem: 'Scattering raw database queries or ORM queries across 50 controllers makes it impossible to change database structure, add caching, or test without a live database.',
    basicIdea: 'Encapsulate data access logic behind an interface that provides collection-like access to domain objects (`findActiveUsers()`, `save()`, `delete()`).',
    example: `class MongoUserRepository {
  async findById(id) {
    return await UserModel.findById(id).lean();
  }
  async findByEmail(email) {
    return await UserModel.findOne({ email: email.toLowerCase() }).lean();
  }
  async updateLastLogin(id, timestamp) {
    return await UserModel.findByIdAndUpdate(id, { lastLoginAt: timestamp }, { new: true });
  }
}`,
    advantages: [
      'Centralizes query logic and index optimizations in one place',
      'Allows swapping data stores or adding Redis caching transparently to services',
      'Simplifies testing by mocking the repository interface'
    ],
    tradeoffs: [
      'Mongoose and Prisma already act as repository/ORM abstractions; wrapping them in another identical layer without a concrete reason is pure redundant boilerplate'
    ],
    whenToUse: 'When queries are complex, when adding a caching layer, or when supporting multiple databases.',
    whenNotToUse: 'Simple applications where the repository just duplicates ORM methods (`userRepo.findById(id)` -> `User.findById(id)`).'
  },
  {
    id: 'centralised-error-handling',
    category: 'backend',
    name: 'Centralised Error Handling',
    tagline: 'One authoritative place to catch, log, and format error responses',
    problem: "Every route callback has its own try-catch block returning inconsistent JSON structures: { error: 'msg' }, { message: 'msg' }, { err: 500 }, sometimes leaking database passwords in stack traces.",
    basicIdea: 'Throw custom application error classes in services; catch them in a single Express error middleware `(err, req, res, next)` that sanitizes and returns standard JSON.',
    example: `// Domain Error Hierarchy
class AppError extends Error {
  constructor(message, statusCode, code = 'INTERNAL_ERROR') {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = true; // Expected business error vs unexpected bug
  }
}
class NotFoundError extends AppError { constructor(msg) { super(msg, 404, 'NOT_FOUND'); } }
class ValidationError extends AppError { constructor(msg) { super(msg, 400, 'VALIDATION_FAILED'); } }

// Centralized Express Error Middleware (Registered LAST)
function errorHandler(err, req, res, next) {
  const isProd = process.env.NODE_ENV === 'production';
  const statusCode = err.statusCode || 500;
  
  // Log unexpected runtime crashes with stack trace
  if (!err.isOperational) logger.error(err);

  return res.status(statusCode).json({
    success: false,
    error: {
      code: err.code || 'INTERNAL_SERVER_ERROR',
      message: err.isOperational ? err.message : (isProd ? 'Something went wrong' : err.message),
      ...(isProd ? {} : { stack: err.stack })
    }
  });
}`,
    advantages: [
      'Guarantees identical error JSON envelope across the entire API',
      'Never accidentally leaks internal database connection strings or stack traces to clients in production',
      'Clean separation between operational errors and unhandled server crashes'
    ],
    tradeoffs: [
      'Must ensure all asynchronous errors are forwarded with `next(error)` (or use Express 5)'
    ],
    whenToUse: 'Mandatory in 100% of production REST and GraphQL backends.',
    whenNotToUse: 'Never omit this in any backend application.'
  },
  {
    id: 'request-validation',
    category: 'backend',
    name: 'Schema-Based Request Validation',
    tagline: 'Validate all external input at the network edge before it reaches controllers',
    problem: 'Trusting `req.body.age` to be a number, then having the database throw a cast error or suffering a NoSQL injection payload (`req.body.password = { $gt: "" }`).',
    basicIdea: 'Define declarative schema contracts using tools like Zod or Joi, and validate incoming params, query, and body in middleware before executing business logic.',
    example: `import { z } from 'zod';

const registerSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    age: z.number().int().min(18, 'Must be 18 or older')
  })
});

const validate = (schema) => async (req, res, next) => {
  try {
    await schema.parseAsync({ body: req.body, query: req.query, params: req.params });
    next();
  } catch (error) {
    return res.status(400).json({ success: false, errors: error.errors });
  }
};`,
    advantages: [
      'Zero invalid or malicious data shapes ever penetrate your controllers',
      'Automatic type inference in TypeScript matching runtime validation',
      'Clear, actionable client feedback on exactly which field failed'
    ],
    tradeoffs: [
      'Requires declaring schemas upfront for every mutating endpoint'
    ],
    whenToUse: 'Every mutating endpoint (POST, PUT, PATCH) and query string parser.',
    whenNotToUse: 'Endpoints that accept raw binary streaming data (like multipart file streams handled by specialized stream parsers).'
  },
  {
    id: 'dependency-inversion',
    category: 'backend',
    name: 'Dependency Inversion Principle (DIP)',
    tagline: 'High-level modules should not depend on low-level modules; both should depend on abstractions',
    problem: 'Core business domain models import specific database drivers or vendor SDKs directly, meaning a database migration forces a rewrite of core business rules.',
    basicIdea: 'Define an abstract interface in the domain layer. The database or external integration implements that interface and is injected at runtime.',
    example: `// Core Domain defines the port (interface):
// export interface NotificationPort { send(to: string, message: string): Promise<void>; }

// Infrastructure layer implements the adapter:
export class TwilioSmsAdapter /* implements NotificationPort */ {
  async send(to, message) { /* calls Twilio SDK */ }
}

// Service depends ONLY on the port:
export class AuthService {
  constructor(notificationPort) {
    this.notifier = notificationPort; // Knows nothing about Twilio!
  }
  async sendOtp(phone, otp) {
    await this.notifier.send(phone, \`Your code is: \${otp}\`);
  }
}`,
    advantages: [
      'Clean architectural boundaries that survive technological changes',
      'Domain rules are 100% independent of infrastructure frameworks',
      'Easy to swap providers without touching domain tests'
    ],
    tradeoffs: [
      'Introduces interface indirection that may feel heavy for tiny CRUD apps'
    ],
    whenToUse: 'Large enterprise applications, long-lived domain services, multi-tenant systems.',
    whenNotToUse: 'Small 5-table microservices where infrastructure changes are practically zero.'
  },
  {
    id: 'idempotency',
    category: 'backend',
    name: 'Idempotency Keys for State Mutations',
    tagline: 'Executing an operation multiple times produces the exact same state as executing once',
    problem: 'A customer clicks "Pay $500", the network lags, and they panic-click 3 times. If the backend is not idempotent, their card gets charged $1,500.',
    basicIdea: 'Clients attach a unique `Idempotency-Key` header (UUID) to mutating requests. The server records the key; if a duplicate key arrives within 24h, the server returns the cached initial response without re-executing.',
    example: `async function handlePayment(req, res) {
  const idempotencyKey = req.headers['idempotency-key'];
  if (!idempotencyKey) return res.status(400).json({ error: 'Idempotency-Key header required' });

  // Check cache (e.g. Redis)
  const cachedResponse = await redis.get(\`idemp:\${idempotencyKey}\`);
  if (cachedResponse) {
    return res.status(200).json(JSON.parse(cachedResponse));
  }

  // Execute charge once
  const payment = await paymentGateway.charge(req.body);
  await redis.set(\`idemp:\${idempotencyKey}\`, JSON.stringify(payment), 'EX', 86400); // 24h TTL
  return res.status(201).json(payment);
}`,
    advantages: [
      'Prevents double-charges, duplicate order creation, and corrupt inventory states',
      'Gives frontend safe retry capabilities on network timeouts',
      'Critical for financial, healthcare, and inventory transactions'
    ],
    tradeoffs: [
      'Requires a distributed cache (Redis) with TTL management to store keys'
    ],
    whenToUse: 'Payment processing, order placement, invoice generation, balance transfers.',
    whenNotToUse: 'Safe read-only operations (GET, HEAD, OPTIONS) which are inherently idempotent.'
  },

  // ── 04. SYSTEM-LEVEL PATTERNS ──
  {
    id: 'modular-monolith',
    category: 'system',
    name: 'Modular Monolith Architecture',
    tagline: 'All the architectural cleanliness of microservices without the distributed systems tax',
    problem: 'Prematurely splitting a 3-person team into 12 microservices introduces network latency, distributed transactions, Docker orchestration overhead, and RPC serialization bugs.',
    basicIdea: 'Keep the entire application in a single repository and single deployment artifact, but strictly enforce module boundaries, distinct database schemas, and clean internal interfaces.',
    example: `monolith/
├── modules/
│   ├── auth/           # Own models, services, routes
│   ├── inventory/      # Own models, services, routes
│   ├── billing/        # Own models, services, routes
│   └── shipping/       # Own models, services, routes
└── shared/             # Logger, database connector, error types`,
    advantages: [
      'Zero network latency between modules (function calls instead of HTTP/gRPC)',
      'ACID database transactions across modules when strictly necessary',
      'Extremely simple deployment: one Docker container, one server',
      'Can be decomposed into microservices later if a specific module needs independent scaling'
    ],
    tradeoffs: [
      'All modules must be written in the same primary runtime language',
      'A fatal memory leak in one module can crash the shared process'
    ],
    whenToUse: 'Default starting architecture for 95% of new products, startups, and mid-sized teams.',
    whenNotToUse: 'Large organizations with 200+ engineers where team deployment autonomy is the primary constraint.'
  },
  {
    id: 'layered-architecture',
    category: 'system',
    name: 'Layered (N-Tier) Architecture',
    tagline: 'Rigid separation between Presentation, Application, Domain, and Data',
    problem: 'Spaghetti code where SQL queries live inside React components or HTTP headers are inspected inside database models.',
    basicIdea: 'Divide the system into horizontal layers with strict one-way dependency rules: Presentation -> Application Service -> Domain -> Infrastructure.',
    example: `[ HTTP / UI Layer ]       -> Extracts headers, query, body
         ↓
[ Application Layer ]    -> Orchestrates workflows, handles authorization
         ↓
[ Domain Layer ]         -> Pure business entities and mathematical calculations
         ↓
[ Infrastructure Layer ] -> PostgreSQL, MongoDB, Redis, AWS S3`,
    advantages: [
      'Well-understood industry standard pattern with high team familiarity',
      'Easy to divide tasks among frontend, backend, and database engineers',
      'Clear, predictable place for every piece of code'
    ],
    tradeoffs: [
      'Can lead to "anemic domain models" where services do all the work and data classes are just dumb structs'
    ],
    whenToUse: 'Enterprise web backends, RESTful APIs, traditional line-of-business applications.',
    whenNotToUse: 'Complex event-driven architectures where data flows circularly or reactively.'
  },
  {
    id: 'event-driven-processing',
    category: 'system',
    name: 'Event-Driven Asynchronous Processing',
    tagline: 'Decouple producers from consumers via immutable event streams',
    problem: 'Synchronously sending 1,000 PDF invoices during a checkout HTTP request causes the user to wait 45 seconds and eventually triggers an HTTP 504 Gateway Timeout.',
    basicIdea: 'The API server quickly records the order, publishes an `OrderCreated` message to an event broker (RabbitMQ / Redis / Kafka), and returns HTTP 201 immediately. Background workers process the event asynchronously.',
    example: `// Producer: API Server
async function handleCheckout(req, res) {
  const order = await orderRepo.create(req.body);
  await messageQueue.publish('ORDER_CREATED', { orderId: order.id, customerEmail: order.email });
  return res.status(201).json({ status: 'Processing', orderId: order.id }); // Returns in 30ms!
}

// Consumer: Background Worker (Runs in separate process)
messageQueue.subscribe('ORDER_CREATED', async (event) => {
  await generatePdfInvoice(event.orderId);
  await sendEmailReceipt(event.customerEmail);
  await notifyWarehouse(event.orderId);
});`,
    advantages: [
      'Blazing-fast HTTP response times for end users',
      'Fault isolation: if the email service goes down, orders are still safely captured in the queue',
      'Workloads can be scaled independently (1 API server + 10 background worker instances)'
    ],
    tradeoffs: [
      'Introduces eventual consistency: data is not immediately processed across all views',
      'Requires handling duplicate messages, dead-letter queues, and message ordering'
    ],
    whenToUse: 'Image/video processing, sending emails, generating reports, processing webhooks.',
    whenNotToUse: 'Operations where the user requires immediate feedback (e.g., verifying a credit card PIN).'
  },
  {
    id: 'multi-tier-caching',
    category: 'system',
    name: 'Multi-Tier Caching Strategy',
    tagline: 'Serve hot reads from fast in-memory stores before hitting persistent disks',
    problem: 'Every page load makes 15 database queries for static navigation menus or product categories, bottlenecking database CPU at 100%.',
    basicIdea: 'Implement caching at multiple layers: Browser (Cache-Control headers) -> Edge CDN -> Application Redis -> Database Query Cache.',
    example: `// Read-Through Cache Pattern with Redis
async function getProductById(productId) {
  const cacheKey = \`product:\${productId}\`;
  
  // 1. Check in-memory Redis cache
  const cached = await redis.get(cacheKey);
  if (cached) return JSON.parse(cached); // ~1ms latency

  // 2. Cache miss: fetch from slow disk database
  const product = await db.products.findById(productId);
  if (product) {
    // 3. Populate cache with 15-minute Time-To-Live (TTL)
    await redis.set(cacheKey, JSON.stringify(product), 'EX', 900);
  }
  return product;
}`,
    advantages: [
      'Reduces database read load by up to 90%',
      'Cuts API latency from 200ms down to 5ms',
      'Allows surviving sudden traffic spikes (e.g. Black Friday or frontpage features)'
    ],
    tradeoffs: [
      'Cache invalidation is notoriously difficult: risking serving stale data to users',
      'Consumes expensive RAM memory'
    ],
    whenToUse: 'High-read, low-write data: product catalogs, blog posts, user profile summaries, site configuration.',
    whenNotToUse: 'Rapidly changing real-time balances, stock tickers, or audit logs where stale reads cause errors.'
  },
  {
    id: 'queue-background-jobs',
    category: 'system',
    name: 'Queue-Based Background Jobs',
    tagline: 'Manage bursts of intensive tasks with durable queues and concurrency limits',
    problem: '100 users upload 50MB videos simultaneously. If the server tries to transcode all 100 concurrently, it runs out of RAM and crashes the entire website.',
    basicIdea: 'Place tasks in a persistent queue (e.g. BullMQ with Redis). Dedicated worker processes pull jobs one-by-one with controlled concurrency and automatic retries.',
    example: `import { Queue, Worker } from 'bullmq';

// Define the durable queue
const videoQueue = new Queue('video-transcoding', { connection: redisConfig });

// Enqueue job with exponential backoff on failure
await videoQueue.add('transcode', { videoId: 'v123', resolution: '1080p' }, {
  attempts: 3,
  backoff: { type: 'exponential', delay: 5000 }
});

// Worker with controlled concurrency limit (e.g. 2 concurrent jobs)
const worker = new Worker('video-transcoding', async (job) => {
  await ffmpegTranscode(job.data.videoId, job.data.resolution);
}, { concurrency: 2, connection: redisConfig });`,
    advantages: [
      'Smooths out spiky workloads without server resource exhaustion',
      'Automatic retries with exponential backoff when downstream services fail temporarily',
      'Jobs persist across server reboots without data loss'
    ],
    tradeoffs: [
      'Requires operational maintenance of Redis and worker process monitoring'
    ],
    whenToUse: 'Video encoding, PDF generation, bulk data export/import, external API batch synchronisation.',
    whenNotToUse: 'Instant synchronous queries where the caller is blocked waiting for the answer.'
  },
  {
    id: 'circuit-breaker',
    category: 'system',
    name: 'Circuit Breaker Pattern',
    tagline: 'Fail fast when downstream dependencies are down to prevent cascading collapse',
    problem: 'An external shipping API goes down and hangs for 30s per request. Your server keeps 500 requests open waiting for it, exhausting all Node.js sockets and crashing your entire store.',
    basicIdea: 'Monitor failure rates of external calls. If failures exceed a threshold (e.g. 50% failures), the breaker "TRIPS OPEN", immediately returning fallback errors without attempting the network call. After a cooldown, it lets a test request through ("HALF-OPEN").',
    example: `// Three Breaker States: CLOSED (healthy), OPEN (failing, fail fast), HALF-OPEN (testing)
class CircuitBreaker {
  constructor(fn, failureThreshold = 5, cooldownPeriodMs = 30000) {
    this.fn = fn;
    this.failureThreshold = failureThreshold;
    this.cooldownPeriodMs = cooldownPeriodMs;
    this.failureCount = 0;
    this.state = 'CLOSED';
    this.lastFailureTime = null;
  }
  async execute(...args) {
    if (this.state === 'OPEN') {
      if (Date.now() - this.lastFailureTime > this.cooldownPeriodMs) {
        this.state = 'HALF-OPEN';
      } else {
        throw new Error('Service Unavailable: Circuit Breaker is OPEN');
      }
    }
    try {
      const result = await this.fn(...args);
      this.reset();
      return result;
    } catch (err) {
      this.recordFailure();
      throw err;
    }
  }
}`,
    advantages: [
      'Prevents cascading failures across a distributed microservices ecosystem',
      'Provides instantaneous fallback responses rather than keeping users waiting for timeouts',
      'Gives struggling downstream services breathing room to recover'
    ],
    tradeoffs: [
      'Adds state tracking and complexity to integration clients'
    ],
    whenToUse: 'Any critical integration with third-party APIs (payment gateways, map geocoders, email services).',
    whenNotToUse: 'Local database queries inside the same high-availability virtual private cloud (VPC).'
  },
  {
    id: 'retry-with-backoff',
    category: 'system',
    name: 'Retry with Exponential Backoff & Jitter',
    tagline: 'Resiliently handle transient network hiccups without overwhelming recovering servers',
    problem: 'A network packet drops, so your code immediately retries 10 times in 1 millisecond ("thundering herd"), permanently crashing the server trying to recover.',
    basicIdea: 'Retry failed idempotent requests with exponentially increasing intervals: 100ms, 200ms, 400ms, 800ms... plus random "jitter" to avoid synchronized retry waves.',
    example: `async function fetchWithRetry(url, options = {}, retries = 3, baseDelayMs = 200) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url, options);
      if (response.ok || response.status < 500) return response; // Do not retry 4xx client errors
      throw new Error(\`Server returned status \${response.status}\`);
    } catch (error) {
      if (attempt === retries) throw error; // Exhausted attempts
      
      // Exponential backoff: base * 2^attempt + random jitter (0-100ms)
      const jitter = Math.random() * 100;
      const delay = (baseDelayMs * Math.pow(2, attempt)) + jitter;
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}`,
    advantages: [
      'Recovers transparently from momentary network blips and server deployments',
      'Jitter scatters retry attempts, preventing thundering herds',
      'Standard best practice for webhook deliveries and cloud SDKs'
    ],
    tradeoffs: [
      'Increases latency on permanent failures that can never succeed'
    ],
    whenToUse: 'Transient network calls, webhook dispatchers, cloud storage uploads, database connection handshakes.',
    whenNotToUse: 'Non-idempotent operations where retrying could cause duplicate state (like blind credit card charges without idempotency keys).'
  }
];
