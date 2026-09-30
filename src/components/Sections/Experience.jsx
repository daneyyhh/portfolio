import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Briefcase, GraduationCap, Code2, Gamepad2, Check } from 'lucide-react';
import { MaskHeading, MaskParagraph } from '../UI/TextReveal';

const EASE = [0.16, 1, 0.3, 1];

export default function Experience() {
  const prefersReduced = useReducedMotion();

  const experiences = [
    {
      id: "exp-01",
      year: "2026",
      period: "MAR 2026 – APR 2026",
      category: "INDUSTRY INTERNSHIP",
      role: "UI/UX DESIGN INTERN",
      company: "Honeycomb India",
      location: "Bangalore, India",
      icon: Briefcase,
      summary: "Designed 3 complete client websites in Figma adhering to strict client brand identity, typography, and responsive grid layouts.",
      achievements: [
        "Crafted 20+ high-fidelity desktop and mobile viewports for Honeycomb and Zenpoint Wellness.",
        "Built clickable interactive prototypes demonstrating complex navigation workflows and component states.",
        "Applied user-centred design principles to elevate visual consistency, contrast, and navigation clarity.",
        "Delivered all sprint milestones on schedule while iterating directly with client stakeholder reviews."
      ],
      tech: ["Figma", "UI/UX Design", "Wireframing", "Clickable Prototypes", "Design Systems", "User Research"]
    },
    {
      id: "exp-02",
      year: "2024 — 2025",
      period: "PROJECT ARCHITECTURE",
      category: "FULL-STACK ENGINEERING",
      role: "FULL-STACK WEB DEVELOPER",
      company: "Independent Engineering & Client Platforms",
      location: "Remote / Kerala, India",
      icon: Code2,
      summary: "Architected multi-tier web platforms including the Nexora MERN e-commerce architecture and a College Student Portal with secure data pipelines.",
      achievements: [
        "Engineered Nexora MERN platform with Socket.IO real-time event streaming and atomic inventory concurrency control.",
        "Developed College Student Portal in PHP 8.1, MySQL 8.0, and Bootstrap 5 with Chart.js analytics.",
        "Designed RESTful API endpoints with JWT session authentication, CRUD data models, and input validation schemas.",
        "Configured continuous integration, GitHub version control, and production deployments via Vercel."
      ],
      tech: ["React.js", "Node.js", "Express.js", "MongoDB", "PHP 8.1", "MySQL 8.0", "Bootstrap 5", "Chart.js", "REST APIs"]
    },
    {
      id: "exp-03",
      year: "2023 — 2025",
      period: "GAME SYSTEMS PROGRAMMING",
      category: "INTERACTIVE SYSTEMS",
      role: "GAME DEVELOPER & SYSTEMS PROGRAMMER",
      company: "Specialized Game Projects",
      location: "Bangalore, India",
      icon: Gamepad2,
      summary: "Engineered and shipped interactive 2D and 3D games in Unity, developing core mechanics, procedural systems, and environmental audio.",
      achievements: [
        "Designed and shipped Haunted House 3D horror atmosphere game with custom C# physics scripting.",
        "Implemented modular player controllers, raycast interaction triggers, and volumetric lighting scenes.",
        "Optimized WebGL build pipelines to guarantee smooth 60 FPS execution in modern web browsers.",
        "Integrated custom audio triggers and atmospheric state management for immersive player feedback."
      ],
      tech: ["Unity 3D", "C#", "Game Physics", "Shader Theory", "Level Design", "WebGL", "Audio Systems"]
    },
    {
      id: "exp-04",
      year: "2023 — 2026",
      period: "HIGHER EDUCATION",
      category: "ACADEMIC DEGREE",
      role: "BACHELOR OF COMPUTER APPLICATIONS (BCA)",
      company: "Yenepoya (Deemed to be University)",
      location: "Bangalore, India",
      icon: GraduationCap,
      summary: "Undergraduate degree specializing in Game Development, computer systems theory, web development, and software architecture.",
      achievements: [
        "Core coursework in Data Structures, Web Technologies, Database Management, and Object-Oriented Programming.",
        "Completed Meta professional certification in user interface creation with Android Studio.",
        "Completed Scrimba UI Design certification and DeepLearning.AI ML foundations program.",
        "Consistently built and deployed practical working software alongside academic curricula."
      ],
      tech: ["Game Development", "Data Structures", "Database Management", "OOP", "Mobile UI", "Web Tech"]
    }
  ];

  return (
    <section
      id="experience"
      className="min-h-[100svh] py-20 sm:py-28 px-4 sm:px-6 md:px-12 bg-[#F1F0EB] text-[#111111] relative overflow-x-clip border-t border-[#C9C7C0] font-mono w-full"
    >
      <div className="max-w-7xl mx-auto space-y-14 sm:space-y-20 relative z-10 w-full">
        
        {/* Section Header with 12-Column Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-end border-b border-[#C9C7C0] pb-6 sm:pb-8 w-full">
          <div className="hidden lg:flex lg:col-span-1">
            <motion.span
              initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 0.6, ease: EASE }}
              className="font-mono text-4xl font-extrabold text-[#111111]"
            >
              05
            </motion.span>
          </div>

          <div className="lg:col-span-11 space-y-1 w-full max-w-full">
            <motion.div
              initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 0.6, ease: EASE }}
              className="text-xs text-[#FF1E27] font-bold uppercase tracking-widest flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF1E27]" />
              <span>CAREER & ACADEMIC CHRONOLOGY</span>
            </motion.div>

            <MaskHeading
              lines={["EXPERIENCE TIMELINE"]}
              className="font-syne font-extrabold text-[#111111] uppercase tracking-tight w-full max-w-full overflow-visible"
              style={{
                fontSize: 'clamp(1.75rem, 6.8vw, 3.5rem)',
                letterSpacing: 'clamp(-0.03em, -0.2vw, 0em)',
              }}
              delay={0.15}
            />

            <MaskParagraph delay={0.3} className="font-sans text-slate-700 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
              <p>Documented journey across industry design internships, production full-stack engineering, game systems programming, and degree coursework.</p>
            </MaskParagraph>
          </div>
        </div>

        {/* Editorial Timeline Spine Layout */}
        <div className="relative w-full">
          
          {/* Continuous Vertical Timeline Spine */}
          <div className="hidden md:block absolute left-8 lg:left-12 top-6 bottom-6 w-[2px] bg-gradient-to-b from-[#FF1E27] via-[#C9C7C0] to-[#C9C7C0]/30" />

          {/* Timeline Nodes & Editorial Milestone Cards */}
          <div className="space-y-10 sm:space-y-14 w-full">
            {experiences.map((exp, index) => {
              const IconComponent = exp.icon;

              return (
                <motion.div
                  key={exp.id}
                  initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-8% 0px" }}
                  transition={{ duration: prefersReduced ? 0.25 : 0.65, delay: prefersReduced ? 0 : index * 0.1, ease: EASE }}
                  className="relative md:pl-24 lg:pl-32 group"
                >
                  {/* Timeline Indicator Node on Spine */}
                  <div className="hidden md:flex absolute left-8 lg:left-12 -translate-x-1/2 top-8 items-center justify-center">
                    <div className="w-7 h-7 bg-[#FAF9F5] border-2 border-[#111111] group-hover:border-[#FF1E27] transition-colors duration-300 flex items-center justify-center shadow-xs">
                      <div className="w-2 h-2 bg-[#111111] group-hover:bg-[#FF1E27] transition-colors duration-300" />
                    </div>
                  </div>

                  {/* Main Milestone Card */}
                  <div className="bg-[#FAF9F5] border border-[#C9C7C0] p-6 sm:p-8 md:p-10 group-hover:border-[#FF1E27] transition-all duration-300 shadow-sm hover:shadow-lg space-y-6 w-full">
                    
                    {/* Header Row: Category Badge, Period, Year */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#C9C7C0] pb-4">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="font-mono text-xs font-bold text-white bg-[#FF1E27] px-2.5 py-0.5 tracking-wider uppercase">
                          {exp.year}
                        </span>
                        <span className="font-mono text-[11px] text-[#555555] uppercase tracking-wider font-semibold">
                          {exp.category}
                        </span>
                        <span className="hidden sm:inline text-stone-300">·</span>
                        <span className="font-mono text-[11px] text-stone-600 uppercase tracking-widest">
                          {exp.period}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-stone-600 text-xs font-mono">
                        <IconComponent size={15} className="text-[#FF1E27]" />
                        <span>{exp.location}</span>
                      </div>
                    </div>

                    {/* Role Title & Organization */}
                    <div className="space-y-1">
                      <h3 className="font-syne text-xl sm:text-2xl md:text-3xl font-extrabold text-[#111111] uppercase tracking-tight">
                        {exp.role}
                      </h3>
                      <p className="font-mono text-xs sm:text-sm text-[#FF1E27] font-bold uppercase tracking-wider">
                        {exp.company}
                      </p>
                    </div>

                    {/* Summary Narrative */}
                    <p className="font-sans text-xs sm:text-sm md:text-[15px] text-[#333333] leading-relaxed max-w-4xl">
                      {exp.summary}
                    </p>

                    {/* Key Deliverables & Achievements Grid */}
                    <div className="space-y-3 pt-2">
                      <span className="font-mono text-[10px] text-[#777777] font-bold uppercase tracking-widest block">
                        KEY DELIVERABLES & OUTCOMES
                      </span>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                        {exp.achievements.map((item, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-2.5 text-xs font-sans text-[#444444] bg-[#F1F0EB]/60 p-2.5 border border-[#C9C7C0]/60"
                          >
                            <span className="w-1.5 h-1.5 bg-[#FF1E27] mt-1.5 shrink-0" />
                            <span className="leading-relaxed">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Technology Stack Pills */}
                    <div className="space-y-2 pt-2 border-t border-[#C9C7C0]/60">
                      <span className="font-mono text-[10px] text-[#777777] font-bold uppercase tracking-widest block">
                        APPLIED TECHNOLOGIES & TOOLS
                      </span>
                      <div className="flex flex-wrap gap-2 pt-0.5">
                        {exp.tech.map((t) => (
                          <span
                            key={t}
                            className="font-mono text-[10px] sm:text-[11px] bg-[#E4E2DC] text-[#111111] px-2.5 py-1 border border-[#C9C7C0] font-medium"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
