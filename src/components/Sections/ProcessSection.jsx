import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Target, Layout, Code2, Rocket, ShieldCheck, RefreshCw } from 'lucide-react';

export default function ProcessSection() {
  const [activeStage, setActiveStage] = useState(0);

  const processData = [
    {
      num: "01",
      name: "DISCOVER",
      icon: Search,
      desc: "We start by deeply understanding the problem, the users, and the business context.",
      keyActivities: [
        "User research & interviews",
        "Market & competitor analysis",
        "Problem identification",
        "Goal alignment",
        "Project roadmap"
      ],
      items: [
        {
          title: "USER RESEARCH",
          detail: "Understand user needs, pain points, behaviors and expectations before defining the solution."
        },
        {
          title: "COMPETITOR ANALYSIS",
          detail: "Study existing products, identify gaps and opportunities, and understand the competitive landscape."
        },
        {
          title: "PROBLEM IDENTIFICATION",
          detail: "Define the core problem worth solving and turn ambiguity into a clear problem statement."
        },
        {
          title: "GOAL ALIGNMENT",
          detail: "Align business objectives with user needs, technical constraints and measurable outcomes."
        },
        {
          title: "PROJECT ROADMAP",
          detail: "Establish priorities, milestones, scope and success criteria before development begins."
        }
      ]
    },
    {
      num: "02",
      name: "DEFINE",
      icon: Target,
      desc: "Turn research into a clear product direction, technical scope and execution plan.",
      keyActivities: [
        "Requirements gathering",
        "User flows",
        "Information architecture",
        "Feature prioritization",
        "Technical planning"
      ],
      items: [
        {
          title: "REQUIREMENTS",
          detail: "Translate research into clear functional and technical requirements."
        },
        {
          title: "USER FLOWS",
          detail: "Map how users move through the product and identify the critical interactions."
        },
        {
          title: "INFORMATION ARCHITECTURE",
          detail: "Organize content, features and navigation into an intuitive structure."
        },
        {
          title: "FEATURE PRIORITIZATION",
          detail: "Separate essential functionality from secondary features using impact, effort and project goals."
        },
        {
          title: "TECHNICAL PLANNING",
          detail: "Choose the architecture, APIs, database strategy and technologies required for the build."
        }
      ]
    },
    {
      num: "03",
      name: "DESIGN",
      icon: Layout,
      desc: "Create a visual system and user experience that balances usability, clarity and personality.",
      keyActivities: [
        "Wireframes",
        "UI/UX design",
        "Design system",
        "Responsive layouts",
        "Interactive prototypes"
      ],
      items: [
        {
          title: "WIREFRAMES",
          detail: "Create low-fidelity structures to validate layout and user flow before visual design."
        },
        {
          title: "UI/UX DESIGN",
          detail: "Design polished interfaces that are intuitive, accessible and aligned with the product goals."
        },
        {
          title: "DESIGN SYSTEM",
          detail: "Establish reusable components, typography, spacing and visual rules for consistency."
        },
        {
          title: "RESPONSIVE DESIGN",
          detail: "Design experiences that adapt naturally across desktop, tablet and mobile."
        },
        {
          title: "PROTOTYPING",
          detail: "Turn static designs into interactive prototypes to validate interactions and user journeys."
        }
      ]
    },
    {
      num: "04",
      name: "BUILD",
      icon: Code2,
      desc: "Turn validated designs into scalable, performant and production-ready software.",
      keyActivities: [
        "Frontend development",
        "Backend development",
        "Database integration",
        "API development",
        "3D / interactive experiences"
      ],
      items: [
        {
          title: "FRONTEND",
          detail: "Build responsive interfaces with clean component architecture and smooth interactions."
        },
        {
          title: "BACKEND",
          detail: "Develop secure server-side logic, authentication, business logic and application services."
        },
        {
          title: "DATABASE",
          detail: "Design and integrate reliable data models and persistence layers."
        },
        {
          title: "APIs",
          detail: "Build and integrate APIs that connect frontend experiences with backend services."
        },
        {
          title: "INTERACTIVE EXPERIENCES",
          detail: "Implement advanced interactions, animations and Three.js-powered 3D experiences where appropriate."
        }
      ]
    },
    {
      num: "05",
      name: "DEPLOY",
      icon: Rocket,
      desc: "Move the finished product from development into a reliable production environment.",
      keyActivities: [
        "Production setup",
        "CI/CD",
        "Environment configuration",
        "Hosting",
        "Monitoring"
      ],
      items: [
        {
          title: "PRODUCTION SETUP",
          detail: "Configure the application and infrastructure for real-world production use."
        },
        {
          title: "CI/CD",
          detail: "Automate testing, builds and deployments to make releases faster and safer."
        },
        {
          title: "ENVIRONMENT CONFIGURATION",
          detail: "Manage environment variables, secrets and production-specific configuration."
        },
        {
          title: "HOSTING",
          detail: "Deploy the application using suitable cloud or hosting infrastructure."
        },
        {
          title: "MONITORING",
          detail: "Track performance, errors and availability after launch."
        }
      ]
    },
    {
      num: "06",
      name: "TEST",
      icon: ShieldCheck,
      desc: "Validate functionality, performance and usability before and after release.",
      keyActivities: [
        "Functional testing",
        "Responsive testing",
        "Performance testing",
        "Security checks",
        "User feedback"
      ],
      items: [
        {
          title: "FUNCTIONAL TESTING",
          detail: "Verify that features behave correctly across expected use cases."
        },
        {
          title: "RESPONSIVE TESTING",
          detail: "Test layouts and interactions across different screen sizes and devices."
        },
        {
          title: "PERFORMANCE",
          detail: "Identify bottlenecks and optimize loading, rendering and runtime performance."
        },
        {
          title: "SECURITY",
          detail: "Review authentication, data handling, APIs and common security risks."
        },
        {
          title: "USER FEEDBACK",
          detail: "Collect real-world feedback and identify areas that need refinement."
        }
      ]
    },
    {
      num: "07",
      name: "ITERATE",
      icon: RefreshCw,
      desc: "Launch is not the end. We continuously improve the product using data, feedback and new requirements.",
      keyActivities: [
        "Analytics",
        "Feedback loops",
        "Bug fixes",
        "Feature improvements",
        "Continuous optimization"
      ],
      items: [
        {
          title: "ANALYTICS",
          detail: "Use real usage data to understand what works and where users struggle."
        },
        {
          title: "FEEDBACK LOOP",
          detail: "Turn user and stakeholder feedback into actionable improvements."
        },
        {
          title: "BUG FIXES",
          detail: "Identify, prioritize and resolve issues discovered after release."
        },
        {
          title: "FEATURE EVOLUTION",
          detail: "Improve existing features and introduce new capabilities based on real needs."
        },
        {
          title: "OPTIMIZATION",
          detail: "Continuously improve usability, performance, accessibility and reliability."
        }
      ]
    }
  ];

  const activeData = processData[activeStage] || processData[0];

  return (
    <section id="process" className="py-28 px-6 md:px-12 bg-[#F1F0EB] text-[#111111] relative border-t border-[#C9C7C0] font-mono">
      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end border-b border-[#C9C7C0] pb-8">
          <div className="hidden lg:flex lg:col-span-1">
            <span className="font-mono text-4xl font-extrabold text-[#111111]">03</span>
          </div>

          <div className="lg:col-span-11 space-y-1">
            <div className="text-xs text-[#8B6DFF] font-bold uppercase tracking-widest">
              ENGINEERING METHODOLOGY
            </div>
            <h2 className="font-syne text-4xl md:text-6xl font-extrabold text-[#111111] uppercase tracking-tight">
              MY PROCESS
            </h2>
            <p className="font-sans text-slate-700 text-sm md:text-base mt-2 max-w-xl leading-relaxed">
              A structured approach that turns ideas into powerful, scalable and user-centric digital solutions.
            </p>
          </div>
        </div>

        {/* Seven Stage Navigation Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {processData.map((stage, idx) => {
            const Icon = stage.icon;
            const isActive = activeStage === idx;

            return (
              <button
                key={stage.num}
                onClick={() => setActiveStage(idx)}
                className={`p-4 border text-left transition-all duration-300 rounded-none flex flex-col justify-between h-28 ${
                  isActive
                    ? 'bg-[#0A0A0A] text-white border-[#0A0A0A] shadow-xl'
                    : 'bg-[#FAF9F5] border-[#C9C7C0] text-[#111111] hover:border-[#8B6DFF]'
                }`}
              >
                <div className="flex justify-between items-center text-xs">
                  <span className={`font-bold ${isActive ? 'text-[#8B6DFF]' : 'text-[#555555]'}`}>{stage.num}</span>
                  <Icon size={16} className={isActive ? 'text-[#8B6DFF]' : 'text-[#111111]'} />
                </div>
                <div className="font-syne font-bold text-xs uppercase tracking-tight">
                  {stage.name}
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Process Content Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStage}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="bg-[#FAF9F5] border-2 border-[#111111] p-8 md:p-12 shadow-2xl rounded-none grid grid-cols-1 lg:grid-cols-12 gap-10"
          >
            {/* Left Column: Stage Info & Key Activities */}
            <div className="lg:col-span-5 space-y-6 lg:border-r border-[#C9C7C0] lg:pr-8">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-4xl font-extrabold text-[#8B6DFF]">
                    {activeData.num}
                  </span>
                  <h3 className="font-syne text-3xl font-extrabold text-[#111111] uppercase tracking-tight">
                    {activeData.name}
                  </h3>
                </div>
                <p className="font-sans text-slate-800 text-base leading-relaxed pt-2">
                  "{activeData.desc}"
                </p>
              </div>

              {/* Key Activities List */}
              <div className="space-y-3 pt-4 border-t border-[#C9C7C0]">
                <div className="text-xs font-mono text-[#8B6DFF] font-bold uppercase tracking-widest">
                  KEY DELIVERABLES & SCOPE:
                </div>
                <div className="space-y-2">
                  {activeData.keyActivities.map((act, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-mono text-[#111111]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8B6DFF]"></span>
                      <span>{act}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Detailed Breakdown Items */}
            <div className="lg:col-span-7 space-y-6">
              <div className="text-xs font-mono text-[#555555] font-bold uppercase tracking-widest">
                WORKFLOW EXECUTIONS:
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {activeData.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-[#E4E2DC] border border-[#C9C7C0] p-5 rounded-none space-y-2 hover:border-[#8B6DFF] transition-colors"
                  >
                    <div className="font-syne font-bold text-sm text-[#111111] uppercase tracking-tight flex items-center gap-2">
                      <span className="text-xs font-mono text-[#8B6DFF]">0{idx + 1}.</span>
                      <span>{item.title}</span>
                    </div>
                    <p className="font-sans text-xs text-slate-700 leading-relaxed">
                      "{item.detail}"
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
