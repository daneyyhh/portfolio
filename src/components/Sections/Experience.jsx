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
    <section id="experience" className="py-24 px-6 md:px-12 bg-[#F1F0EB] text-[#111111] relative overflow-hidden border-t border-[#C9C7C0] font-mono">
      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#C9C7C0] pb-8">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#8B6DFF] tracking-widest uppercase mb-2 font-bold">
              <span className="w-2 h-2 rounded-full bg-[#8B6DFF]"></span>
              <span>VERIFIED CHRONOLOGY</span>
            </div>
            <h2 className="font-syne text-4xl md:text-6xl font-extrabold text-[#111111] uppercase tracking-tight">
              EXPERIENCE TIMELINE
            </h2>
          </div>
          <p className="text-xs text-[#555555] max-w-md">
            Chronological breakdown of practical full-stack projects, UI/UX design work, and game development milestones.
          </p>
        </div>

        {/* Timeline Items List */}
        <div className="space-y-4">
          {experiences.map((exp, index) => {
            const isOpen = expanded === index;

            return (
              <div
                key={index}
                className="bg-[#FAF9F5] border border-[#C9C7C0] rounded-none overflow-hidden transition-all duration-300"
              >
                {/* Header Row */}
                <div
                  onClick={() => setExpanded(isOpen ? null : index)}
                  className="p-6 flex flex-wrap justify-between items-center gap-4 cursor-pointer hover:bg-[#E4E2DC] transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-[#8B6DFF] font-bold tracking-widest">
                        {exp.year}
                      </span>
                      <span className="text-[10px] text-[#111111] bg-[#E4E2DC] px-2 py-0.5 border border-[#C9C7C0] font-bold">
                        {exp.type}
                      </span>
                    </div>

                    <h3 className="font-syne text-xl md:text-2xl font-bold text-[#111111] uppercase">
                      {exp.role}
                    </h3>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="hidden md:flex gap-1.5">
                      {exp.tech.slice(0, 4).map(t => (
                        <span key={t} className="bg-[#E4E2DC] text-[#555555] text-[10px] px-2 py-0.5 border border-[#C9C7C0]">
                          {t}
                        </span>
                      ))}
                    </div>
                    {isOpen ? <ChevronUp size={20} className="text-[#8B6DFF]" /> : <ChevronDown size={20} className="text-[#555555]" />}
                  </div>
                </div>

                {/* Expandable Details Body */}
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-6 pt-0 border-t border-[#C9C7C0] space-y-4 font-sans text-sm text-slate-800"
                  >
                    <p className="leading-relaxed font-mono text-xs text-slate-700">
                      {exp.summary}
                    </p>

                    <div className="space-y-2 pt-2">
                      <div className="text-xs font-mono text-[#8B6DFF] uppercase font-bold">KEY DELIVERABLES:</div>
                      {exp.details.map((d, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs font-mono text-[#111111]">
                          <CheckCircle2 size={14} className="text-[#8B6DFF] shrink-0 mt-0.5" />
                          <span>{d}</span>
                        </div>
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
