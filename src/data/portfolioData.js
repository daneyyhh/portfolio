export const personalData = {
  name: "Reuben Binu George",
  brand: "reubg",
  initials: "RBG",
  tagline: "I BUILD DIGITAL EXPERIENCES.",
  subTagline: "Full-Stack Developer × Creative Engineer",
  bio: "Creative Engineer specializing in Full-Stack Web Development, AI/ML models, UI/UX Design, and 3D Game Development. Passionate about bridging technical rigor with cinematic interactive aesthetics.",
  location: "Kerala, India",
  email: "reuben@reubg.in",
  domain: "https://reubg.in",
  github: "https://github.com/daneyyhh",
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
    id: "nexora",
    title: "NEXORA",
    category: "Full-Stack Web App",
    role: "Full-Stack System Architect",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Socket.IO", "Tailwind CSS"],
    shortDesc: "Advanced full-stack MERN e-commerce platform with Socket.IO real-time events, 2-angle physical photography rules, variant swapper, and live dispatch tracking.",
    desc: "Advanced full-stack MERN e-commerce platform with Socket.IO real-time events, 2-angle physical photography rules, variant swapper, and live dispatch tracking.",
    year: "2026",
    img: "/images/nexora-cover-v2.jpg",
    challenge: "Preventing race conditions during atomic warehouse inventory deductions and delivering sub-50ms WebSocket alert broadcasts under concurrent checkout load.",
    built: "Engineered bidirectional Socket.IO order pipelines, dual-mode persistent MongoDB engine, 4-step checkout flow, and executive analytics dashboard.",
    github: "https://github.com/daneyyhh/nexora-mern-ecommerce",
    githubLink: "https://github.com/daneyyhh/nexora-mern-ecommerce",
    link: "https://github.com/daneyyhh/nexora-mern-ecommerce",
    demoLink: "https://github.com/daneyyhh/nexora-mern-ecommerce",
    caseStudy: {
      overview: "NEXORA is an architectural full-stack e-commerce platform engineered with the MERN stack and bidirectional Socket.IO event pipelines, bridging customer storefronts with real-time administrative command.",
      problem: "Typical e-commerce web applications rely on static polling, lack atomic inventory decrements leading to overselling, and require tedious database configurations to run locally.",
      approach: "Engineered an event-driven architecture pairing Express REST endpoints with Socket.IO broadcast streams, backed by dual-mode MongoDB with automated local disk storage fallback.",
      architecture: [
        { node: "Customer Storefront", tech: "React 18 / Tailwind", detail: "2-angle hover crossfade, color variant swapper, and 7-stage live tracking" },
        { node: "Express & Socket Gateway", tech: "Node.js / Socket.IO", detail: "JWT auth, promotional coupon validation, and live order broadcast streams" },
        { node: "Data Persistence", tech: "MongoDB / Mongoose", detail: "Atomic inventory decrements, persistent disk storage, and indexed collections" }
      ],
      development: "Implemented modular Express controllers, Axios interceptors, responsive Tailwind layouts with Framer Motion, and embedded database fallback.",
      uiDesign: "Strict 2-angle physical photography rules, realistic multi-finish swatches, executive dark mode analytics, and step-by-step dispatch timeline.",
      result: "Sub-50ms WebSocket broadcast latency for incoming orders, zero race conditions on inventory depletion, and seamless instant setup."
    }
  },
  {
    id: "fivem-chronicles",
    title: "FIVEM CHRONICLES",
    category: "Game Systems & LUA",
    role: "Systems Architect & Developer",
    technologies: ["LUA", "SQL", "MySQL", "Unity / Game Logic"],
    shortDesc: "Advanced server infrastructure and custom gameplay frameworks for FiveM multiplayer roleplay environments.",
    desc: "Advanced server infrastructure and custom gameplay frameworks for FiveM multiplayer roleplay environments.",
    year: "2025",
    img: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=1200&q=80",
    challenge: "Optimizing script CPU tick rates (ms execution time per frame) under 100+ concurrent player server loads.",
    built: "Developed custom inventory systems, economy databases, vehicle persistence engines, and secure permission layers.",
    github: "https://github.com/daneyyhh",
    githubLink: "https://github.com/daneyyhh",
    link: "https://reubg.in",
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
    id: "haunted-code",
    title: "HAUNTED CODE 3D",
    category: "Game Development",
    role: "3D Game Programmer",
    technologies: ["Unity 3D", "C#", "Custom Shaders", "Lighting VFX"],
    shortDesc: "Immersive 3D horror atmosphere experience built in Unity with dynamic lighting systems and physics interactions.",
    desc: "Immersive 3D horror atmosphere experience built in Unity with dynamic lighting systems and physics interactions.",
    year: "2025",
    img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
    challenge: "Creating believable real-time volumetric shadows and dynamic audio triggers without dropping target 60FPS frame rates.",
    built: "Programmed player movement mechanics, flashlight volumetric lighting, inventory interactions, and procedural audio cues.",
    github: "https://github.com/daneyyhh",
    githubLink: "https://github.com/daneyyhh",
    link: "https://reubg.in",
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
  { domain: "Frontend", name: "HTML5 & CSS3", projects: ["nexora"] },
  { domain: "Frontend", name: "JavaScript (ES6+)", projects: ["nexora", "fivem-chronicles"] },
  { domain: "Frontend", name: "Bootstrap 5", projects: [] },
  { domain: "Frontend", name: "React / Next.js", projects: ["nexora"] },
  { domain: "Backend", name: "PHP", projects: [] },
  { domain: "Backend", name: "Node.js", projects: ["nexora"] },
  { domain: "Backend", name: "REST APIs", projects: ["nexora"] },
  { domain: "Database", name: "MySQL / SQL", projects: ["fivem-chronicles"] },
  { domain: "Database", name: "Firebase / MongoDB", projects: ["nexora"] },
  { domain: "AI / ML", name: "Python", projects: [] },
  { domain: "AI / ML", name: "Scikit-Learn", projects: [] },
  { domain: "AI / ML", name: "ML Classification", projects: [] },
  { domain: "Game Dev", name: "Unity 3D", projects: ["haunted-code"] },
  { domain: "Game Dev", name: "C#", projects: ["haunted-code"] },
  { domain: "Game Dev", name: "LUA Scripting", projects: ["fivem-chronicles"] },
  { domain: "Design", name: "Figma", projects: [] },
  { domain: "Tools", name: "Git / GitHub", projects: ["nexora", "fivem-chronicles", "haunted-code"] },
  { domain: "Tools", name: "Postman & VS Code", projects: ["nexora"] }
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
