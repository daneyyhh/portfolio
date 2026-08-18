export const personalData = {
  name: "Reuben Binu George",
  brand: "reubg",
  initials: "RBG",
  tagline: "I BUILD DIGITAL EXPERIENCES.",
  subTagline: "Full-Stack Developer × Creative Engineer",
  bio: "Creative Engineer specializing in Full-Stack Web Development, AI/ML models, UI/UX Design, and 3D Game Development. Passionate about bridging technical rigor with cinematic interactive aesthetics.",
  location: "Kerala, India",
  email: "hello@reubg.in",
  altEmail: "reubenbg04@gmail.com",
  domain: "https://reubg.in",
  github: "https://github.com/daneyyhh",
  linkedin: "https://linkedin.com/in/reubenbinugeorge",
  status: "Available for Opportunities",
  education: {
    degree: "Bachelor of Computer Applications (BCA)",
    specialization: "Game Development",
    institution: "University Institute of Technology",
    year: "Graduated",
    description: "Specialized in 3D game engines, graphics programming, gameplay systems in C#, physics simulation, and computer graphics theory."
  }
};

export const engineeringDomains = [
  {
    id: "01",
    title: "FULL-STACK DEVELOPMENT",
    subtitle: "Web Applications & APIs",
    description: "Architecting responsive frontends, modular REST APIs, and scalable databases. Focused on performance, state management, and real-time data sync.",
    skills: ["HTML5/CSS3", "JavaScript", "Bootstrap 5", "React", "Next.js", "PHP", "Node.js", "REST APIs", "MySQL", "Firebase"],
    codeSnippet: "const api = await fetch('/api/v1/system');\nconst data = await api.json();"
  },
  {
    id: "02",
    title: "AI / MACHINE LEARNING",
    subtitle: "Data & Predictive Models",
    description: "Building machine learning classification pipelines, data modeling, and intelligent algorithms with Python and Scikit-Learn.",
    skills: ["Python", "Scikit-Learn", "Classification", "Data Processing", "ML Models", "Predictive Analytics"],
    codeSnippet: "from sklearn.ensemble import RandomForestClassifier\nmodel.fit(X_train, y_train)"
  },
  {
    id: "03",
    title: "UI/UX DESIGN",
    subtitle: "User-Centered Interfaces",
    description: "Designing modern digital product layouts, interactive wireframes, design systems, and glassmorphic micro-interactions.",
    skills: ["Figma", "Wireframing", "User Research", "Prototyping", "Design Systems", "Component Libraries"],
    codeSnippet: "style={{ backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.1)' }}"
  },
  {
    id: "04",
    title: "GAME & 3D DEVELOPMENT",
    subtitle: "Unity & Interactive WebGL",
    description: "Crafting 3D game environments, C# gameplay logic, particle physics, custom shaders, and WebGL interactive experiences.",
    skills: ["Unity 3D", "C#", "Three.js", "WebGL", "Physics Systems", "LUA Scripting", "3D Lighting"],
    codeSnippet: "void Update() {\n    transform.Rotate(Vector3.up * speed * Time.deltaTime);\n}"
  }
];

export const projectsData = [
  {
    id: "taskflow",
    title: "TASKFLOW",
    category: "Full-Stack Web App",
    role: "Lead Full-Stack Developer",
    technologies: ["React", "Next.js", "Node.js", "MongoDB", "Tailwind CSS"],
    shortDesc: "Real-time collaborative task management platform with drag-and-drop workflow boards and instant activity feeds.",
    img: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
    challenge: "Handling concurrent state updates across multiple clients while maintaining sub-100ms render response times.",
    built: "Designed responsive UI in Figma, implemented JWT authentication, WebSocket sync streams, and MongoDB schema optimization.",
    githubLink: "https://github.com/daneyyhh",
    demoLink: "https://reubg.in",
    caseStudy: {
      overview: "TaskFlow is a high-performance productivity application engineered to streamline team workflows with real-time updates and intuitive task cards.",
      problem: "Traditional task managers suffer from bloated UI, sluggish state sync, and complex navigation for quick sprint tracking.",
      approach: "Built a minimalist, zero-latency dashboard leveraging modern React optimistic UI updates and lightweight serverless endpoints.",
      architecture: [
        { node: "Client UI", tech: "React / Tailwind", detail: "Optimistic updates & drag-and-drop state" },
        { node: "API Gateway", tech: "Node.js REST", detail: "Authentication middleware & rate limiting" },
        { node: "Database", tech: "MongoDB Atlas", detail: "Indexed document queries & change streams" }
      ],
      development: "Utilized custom React hooks for state persistence, optimistic UI updates for instant drag response, and Tailwind grid layouts.",
      uiDesign: "Focused on dark mode glassmorphism, high visual contrast for priority tags, and keyboard shortcuts.",
      result: "Reduced average task update payload latency to under 45ms with 100% responsiveness on mobile viewports."
    }
  },
  {
    id: "fivem-chronicles",
    title: "FIVEM CHRONICLES",
    category: "Game Systems & LUA",
    role: "Systems Architect & Developer",
    technologies: ["LUA", "SQL", "MySQL", "Unity / Game Logic"],
    shortDesc: "Advanced server infrastructure and custom gameplay frameworks for FiveM multiplayer roleplay environments.",
    img: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=1200&q=80",
    challenge: "Optimizing script CPU tick rates (ms execution time per frame) under 100+ concurrent player server loads.",
    built: "Developed custom inventory systems, economy databases, vehicle persistence engines, and secure permission layers.",
    githubLink: "https://github.com/daneyyhh",
    demoLink: "https://reubg.in",
    caseStudy: {
      overview: "FiveM Chronicles is a complete backend framework engineered for high-concurrency multiplayer roleplay servers built on LUA and MySQL.",
      problem: "Unoptimized server scripts caused CPU frame drops, desynchronization, and SQL connection bottlenecking under heavy player loads.",
      approach: "Refactored blocking database queries into asynchronous batch queues and modularized client-side event listeners.",
      architecture: [
        { node: "Game Client", tech: "LUA Native API", detail: "Client-side prediction & localized UI rendering" },
        { node: "Server Kernel", tech: "LUA Async Engine", detail: "Event routing & thread pooling" },
        { node: "Database Layer", tech: "MySQL / MariaDB", detail: "Prepared statements & indexed tables" }
      ],
      development: "Wrote modular LUA scripts utilizing strict variable scoping, cached native calls, and prepared SQL procedures.",
      uiDesign: "Designed minimalist in-game HUD panels with crisp typography and clean status notifications.",
      result: "Achieved average script tick times under 0.02ms with zero SQL deadlocks during peak player sessions."
    }
  },
  {
    id: "erp-system",
    title: "ENTERPRISE ERP",
    category: "Full-Stack Web System",
    role: "Full-Stack Engineer",
    technologies: ["React", "PostgreSQL", "PHP", "REST API", "Bootstrap 5"],
    shortDesc: "Modular Enterprise Resource Planning system featuring student admissions, fee tracking, and transport management.",
    img: "https://cdn.pixabay.com/photo/2018/05/08/08/44/artificial-intelligence-3382507_1280.jpg",
    challenge: "Handling complex multi-table relational queries while generating automated PDF reports and audit logs.",
    built: "Engineered database schemas, authentication middleware, dynamic table filters, and administrative analytics dashboards.",
    githubLink: "https://github.com/daneyyhh",
    demoLink: "https://reubg.in",
    caseStudy: {
      overview: "Custom enterprise management portal built to automate institution admissions, financial ledgers, and transport logistics.",
      problem: "Legacy manual paperwork created data entry errors, delayed payment tracking, and lacked centralized analytics.",
      approach: "Designed a centralized relational database schema coupled with a responsive dashboard for multi-role staff access.",
      architecture: [
        { node: "Staff Dashboard", tech: "React / Bootstrap 5", detail: "Role-based access control & dynamic search" },
        { node: "Backend Engine", tech: "PHP REST API", detail: "Data validation, auth tokens, CSV export" },
        { node: "Database", tech: "PostgreSQL / MySQL", detail: "ACID transactions & automated backup triggers" }
      ],
      development: "Implemented parameterized SQL queries to eliminate security risks, built reusable UI components, and export tools.",
      uiDesign: "Clean enterprise aesthetic focusing on data legibility, quick filters, and responsive tables.",
      result: "Eliminated manual paper records for admissions, providing instant reporting for administrative staff."
    }
  },
  {
    id: "haunted-code",
    title: "HAUNTED CODE 3D",
    category: "Game Development",
    role: "3D Game Programmer",
    technologies: ["Unity 3D", "C#", "Custom Shaders", "Lighting VFX"],
    shortDesc: "Immersive 3D horror atmosphere experience built in Unity with dynamic lighting systems and physics interactions.",
    img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
    challenge: "Creating believable real-time volumetric shadows and dynamic audio triggers without dropping target 60FPS frame rates.",
    built: "Programmed player movement mechanics, flashlight volumetric lighting, inventory interactions, and procedural audio cues.",
    githubLink: "https://github.com/daneyyhh",
    demoLink: "https://reubg.in",
    caseStudy: {
      overview: "Haunted Code is a first-person 3D atmospheric exploration game demonstrating Unity 3D engine capabilities and C# system design.",
      problem: "Maintaining tight atmospheric horror tension requires complex real-time lighting and raycasts that can easily degrade performance.",
      approach: "Utilized baked ambient lightmaps combined with dynamic spotlight raycasting and occlusion culling.",
      architecture: [
        { node: "Player Controller", tech: "Unity C# Rigidbody", detail: "Head bob, raycast pickup, stamina system" },
        { node: "Environment Engine", tech: "Unity URP / Shaders", detail: "Occlusion culling & fog volume" },
        { node: "Audio Manager", tech: "Spatial 3D Audio", detail: "Distance-attenuated sound triggers" }
      ],
      development: "Authored clean object-oriented C# scripts for state machines, door interactions, inventory management, and trigger zones.",
      uiDesign: "Minimalist diegetic in-game UI to preserve player immersion.",
      result: "Maintained stable 60+ FPS playback on target systems with realistic dynamic lighting."
    }
  },
  {
    id: "neurovision",
    title: "NEUROVISION ML",
    category: "AI / Machine Learning",
    role: "ML Engineer & Developer",
    technologies: ["Python", "Scikit-Learn", "Classification", "NumPy", "Pandas"],
    shortDesc: "Machine learning classification model trained to analyze dataset parameters and accurately predict target outcomes.",
    img: "https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg",
    challenge: "Feature selection, handling missing data distributions, and tuning hyper-parameters to avoid model overfitting.",
    built: "Cleaned raw datasets, evaluated Random Forest & SVM classification algorithms, tuned cross-validation, and visualized metrics.",
    githubLink: "https://github.com/daneyyhh",
    demoLink: "https://reubg.in",
    caseStudy: {
      overview: "NeuroVision is a data classification pipeline developed using Python and Scikit-Learn for accurate predictive modeling.",
      problem: "Raw input data contained noisy features and imbalanced classes leading to biased model predictions.",
      approach: "Implemented feature scaling, SMOTE class balancing, and cross-validated ensemble models.",
      architecture: [
        { node: "Data Pipeline", tech: "Pandas / NumPy", detail: "Imputation, encoding, feature scaling" },
        { node: "ML Core", tech: "Scikit-Learn", detail: "Random Forest Classifier & Hyperparameter tuning" },
        { node: "Evaluation", tech: "Matplotlib / Seaborn", detail: "Confusion matrix & ROC-AUC curves" }
      ],
      development: "Wrote structured Python scripts for model training, feature importance extraction, and validation benchmarks.",
      uiDesign: "Generated clean visualization charts and summary tables for model diagnostic analysis.",
      result: "Achieved high classification accuracy with low false-positive rates on test datasets."
    }
  },
  {
    id: "echosphere",
    title: "ECHOSPHERE UI",
    category: "UI/UX & Web Frontend",
    role: "UI/UX Designer & Frontend Developer",
    technologies: ["Next.js", "React", "Framer Motion", "Tailwind CSS", "Figma"],
    shortDesc: "Next-generation music streaming experience with glassmorphism UI, audio visualizers, and fluid animations.",
    img: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&w=1200&q=80",
    challenge: "Designing complex micro-interactions and audio spectrum visualizers while maintaining high frame rates during playback.",
    built: "Designed high-fidelity wireframes in Figma, built animated player controls with Framer Motion, and integrated Web Audio APIs.",
    githubLink: "https://github.com/daneyyhh",
    demoLink: "https://reubg.in",
    caseStudy: {
      overview: "Echosphere explores futuristic UI/UX trends for digital audio discovery through spatial glassmorphic design.",
      problem: "Most streaming apps have cluttered interfaces with static album grid layouts.",
      approach: "Crafted a cinematic player interface with dynamic color extraction and smooth page transitions.",
      architecture: [
        { node: "UX Layer", tech: "Figma Mockups", detail: "User journey maps & component variants" },
        { node: "Frontend App", tech: "Next.js / Tailwind", detail: "Responsive layout & theme engine" },
        { node: "Audio Engine", tech: "Web Audio API", detail: "Frequency analysis & visualizer canvas" }
      ],
      development: "Built reusable React component library with customized CSS keyframe animations and audio context hook.",
      uiDesign: "Glassmorphism panels, glowing neon sound waves, and smooth cursor interactions.",
      result: "Demonstrated creative UI/UX excellence combined with functional web audio integration."
    }
  }
];

export const certificationsData = [
  {
    id: "cert-meta",
    title: "Create the User Interface in Android Studio",
    issuer: "Meta / Coursera",
    date: "Certified",
    skills: ["Android Studio", "UI Design", "XML Layouts", "Mobile UX"],
    badge: "Meta Certified",
    icon: "Meta",
    desc: "Comprehensive mobile user interface design and layout implementation in Android Studio."
  },
  {
    id: "cert-sklearn",
    title: "Scikit-Learn For Machine Learning Classification",
    issuer: "Coursera Guided Project",
    date: "Certified",
    skills: ["Python", "Scikit-Learn", "Machine Learning", "Classification"],
    badge: "Coursera ML",
    icon: "Python",
    desc: "Hands-on machine learning model training, decision trees, and classification algorithms."
  },
  {
    id: "cert-scrimba",
    title: "Learn UI Design",
    issuer: "Scrimba",
    date: "Certified",
    skills: ["UI Principles", "Typography", "Color Theory", "Spacing & Alignment"],
    badge: "Scrimba Design",
    icon: "Figma",
    desc: "Mastery of modern user interface aesthetics, hierarchy, grid systems, and visual consistency."
  },
  {
    id: "cert-ibm",
    title: "Collaborate Effectively for Professional Success",
    issuer: "IBM",
    date: "Certified",
    skills: ["Agile Collaboration", "Team Communication", "Problem Solving"],
    badge: "IBM Professional",
    icon: "IBM",
    desc: "Professional methodologies for engineering collaboration, project delivery, and team dynamics."
  },
  {
    id: "cert-java",
    title: "Fundamentals of Java Programming",
    issuer: "Board Infinity",
    date: "Certified",
    skills: ["Java Core", "OOP Principles", "Data Structures", "Algorithms"],
    badge: "Java Master",
    icon: "Java",
    desc: "Object-oriented programming principles, Java syntax, memory management, and data structures."
  }
];

export const skillMatrix = [
  { domain: "Frontend", name: "HTML5 & CSS3", projects: ["taskflow", "erp-system", "echosphere"] },
  { domain: "Frontend", name: "JavaScript (ES6+)", projects: ["taskflow", "fivem-chronicles", "erp-system", "echosphere"] },
  { domain: "Frontend", name: "Bootstrap 5", projects: ["erp-system"] },
  { domain: "Frontend", name: "React / Next.js", projects: ["taskflow", "erp-system", "echosphere"] },
  { domain: "Backend", name: "PHP", projects: ["erp-system"] },
  { domain: "Backend", name: "Node.js", projects: ["taskflow"] },
  { domain: "Backend", name: "REST APIs", projects: ["taskflow", "erp-system"] },
  { domain: "Database", name: "MySQL / SQL", projects: ["fivem-chronicles", "erp-system"] },
  { domain: "Database", name: "Firebase / MongoDB", projects: ["taskflow"] },
  { domain: "AI / ML", name: "Python", projects: ["neurovision"] },
  { domain: "AI / ML", name: "Scikit-Learn", projects: ["neurovision"] },
  { domain: "AI / ML", name: "ML Classification", projects: ["neurovision"] },
  { domain: "Game Dev", name: "Unity 3D", projects: ["haunted-code"] },
  { domain: "Game Dev", name: "C#", projects: ["haunted-code"] },
  { domain: "Game Dev", name: "LUA Scripting", projects: ["fivem-chronicles"] },
  { domain: "Design", name: "Figma", projects: ["taskflow", "echosphere"] },
  { domain: "Tools", name: "Git / GitHub", projects: ["taskflow", "fivem-chronicles", "erp-system", "haunted-code", "neurovision", "echosphere"] },
  { domain: "Tools", name: "Postman & VS Code", projects: ["taskflow", "erp-system"] }
];

export const journeySteps = [
  {
    step: "01",
    phase: "GAME DEV ROOT",
    tech: "Unity 3D & C#",
    desc: "Started coding in Unity 3D with C# — building physics interactions, player movement, 3D lighting, and game mechanics.",
    icon: "🎮"
  },
  {
    step: "02",
    phase: "SYSTEMS & SCRIPTING",
    tech: "LUA & SQL",
    desc: "Advanced into multiplayer server architecture, event routing, database persistence, and optimizing tick-rate execution in LUA.",
    icon: "⚡"
  },
  {
    step: "03",
    phase: "UI/UX DESIGN",
    tech: "Figma & Wireframing",
    desc: "Mastered user interface fundamentals, visual hierarchy, typography, glassmorphism aesthetics, and component layout systems.",
    icon: "🎨"
  },
  {
    step: "04",
    phase: "FULL-STACK WEB",
    tech: "React, Node, PHP & DBs",
    desc: "Expanded into modern full-stack web applications, creating responsive React/Next.js interfaces connected to Node/PHP REST backends.",
    icon: "🌐"
  },
  {
    step: "05",
    phase: "AI / MACHINE LEARNING",
    tech: "Python & Scikit-Learn",
    desc: "Integrated intelligent machine learning algorithms, dataset classification models, and data-driven insights into software solutions.",
    icon: "🤖"
  }
];

export const performanceMetrics = {
  performance: 99,
  accessibility: 100,
  bestPractices: 100,
  seo: 100,
  speedIndex: "0.6s",
  firstContentfulPaint: "0.4s",
  tagline: "Built for speed. Designed for interaction."
};
