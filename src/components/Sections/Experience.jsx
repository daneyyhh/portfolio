import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';

export default function Experience({ engineerMode }) {
  const [expanded, setExpanded] = useState(0);

  const experiences = [
    {
      year: "2024 — PRESENT",
      role: "Full-Stack Developer & Creative Engineer",
      type: "Projects & Freelance Engineering",
      tech: ["React", "Next.js", "Node.js", "MongoDB", "LUA", "Three.js"],
      summary: "Architecting full-stack web applications, real-time collaboration platforms (TaskFlow), and high-concurrency multiplayer scripts in LUA for FiveM roleplay servers.",
      details: [
        "Engineered TaskFlow collaborative board with optimistic UI updates and real-time socket updates.",
        "Refactored FiveM server scripts in LUA and MySQL, reducing script tick times down to 0.02ms.",
        "Built custom responsive UI design systems and glassmorphic micro-interactions."
      ]
    },
    {
      year: "2023 — 2024",
      role: "UI/UX Designer & Frontend Developer",
      type: "Internship & Project Work",
      tech: ["Figma", "HTML5", "CSS3", "JavaScript", "Bootstrap 5"],
      summary: "Designed digital wireframes, user testing prototypes, design systems, and responsive enterprise web interfaces.",
      details: [
        "Created high-fidelity Figma prototypes for web and mobile platforms.",
        "Completed Meta Android UI Design certification and Scrimba UI Design program.",
        "Implemented clean component layouts with strict accessibility standards."
      ]
    },
    {
      year: "2022 — 2023",
      role: "Game Developer & ML Researcher",
      type: "BCA Specialization Projects",
      tech: ["Unity 3D", "C#", "Python", "Scikit-Learn"],
      summary: "Specialized in 3D game development with C# physics systems, volumetric lighting, and Python machine learning classification pipelines.",
      details: [
        "Developed Haunted Code 3D horror atmosphere experience in Unity with C# object-oriented architecture.",
        "Built NeuroVision ML classification pipeline using Python and Scikit-Learn with cross-validated ensemble models.",
        "Studied computer graphics theory, shader programming, and data structures."
      ]
    }
  ];

  return (
    <section id="experience" className="py-24 sm:py-28 px-4 sm:px-6 md:px-12 bg-[#F1F0EB] text-[#111111] relative overflow-x-clip border-t border-[#C9C7C0] font-mono w-full">
      <div className="max-w-7xl mx-auto space-y-12 relative z-10 w-full">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#C9C7C0] pb-6 sm:pb-8 w-full">
          <div className="w-full max-w-full">
            <div className="flex items-center gap-2 text-xs text-[#8B6DFF] tracking-widest uppercase mb-2 font-bold">
              <span className="w-2 h-2 rounded-full bg-[#8B6DFF]"></span>
              <span>VERIFIED CHRONOLOGY</span>
            </div>
            <h2
              className="font-syne font-extrabold text-[#111111] uppercase tracking-tight w-full max-w-full"
              style={{
                fontSize: 'clamp(1.85rem, 7.5vw, 3.75rem)',
                letterSpacing: 'clamp(-0.03em, -0.2vw, -0.01em)',
              }}
            >
              EXPERIENCE TIMELINE
            </h2>
          </div>
          <p className="text-xs text-[#555555] max-w-md">
            Chronological breakdown of practical full-stack projects, UI/UX design work, and game development milestones.
          </p>
        </div>

        {/* Timeline Items List */}
        <div className="space-y-4 w-full">
          {experiences.map((exp, index) => {
            const isOpen = expanded === index;

            return (
              <div
                key={index}
                className="bg-[#FAF9F5] border border-[#C9C7C0] rounded-none overflow-hidden transition-all duration-300 w-full"
              >
                {/* Header Row */}
                <div
                  onClick={() => setExpanded(isOpen ? -1 : index)}
                  className="p-4 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-[#F1F0EB] transition-colors select-none w-full"
                >
                  <div className="flex items-center gap-3 sm:gap-6 flex-wrap">
                    <span className="font-mono text-xs text-[#8B6DFF] font-bold bg-[#FAF9F5] px-2 py-1 border border-[#C9C7C0]">
                      {exp.year}
                    </span>
                    <div>
                      <h3 className="font-syne text-lg sm:text-xl font-bold text-[#111111]">
                        {exp.role}
                      </h3>
                      <div className="text-xs text-[#555555] font-sans">
                        {exp.type}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto">
                    <div className="flex flex-wrap gap-1">
                      {exp.tech.slice(0, 3).map(t => (
                        <span key={t} className="bg-[#E4E2DC] text-[#111111] text-[10px] px-2 py-0.5 border border-[#C9C7C0]">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="text-[#8B6DFF]">
                      {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-4 sm:px-6 pb-6 pt-2 border-t border-[#C9C7C0] bg-[#FAF9F5] space-y-4"
                  >
                    <p className="font-sans text-xs sm:text-sm text-[#333333] leading-relaxed">
                      {exp.summary}
                    </p>

                    <div className="space-y-2">
                      <div className="text-[10px] text-[#555555] uppercase tracking-wider font-bold">KEY ACHIEVEMENTS</div>
                      <ul className="space-y-1.5 text-xs font-sans text-[#444444]">
                        {exp.details.map((d, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 size={14} className="text-[#8B6DFF] shrink-0 mt-0.5" />
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-2 flex flex-wrap gap-1 text-[10px]">
                      {exp.tech.map(t => (
                        <span key={t} className="bg-[#E4E2DC] text-[#111111] px-2 py-0.5 border border-[#C9C7C0]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
