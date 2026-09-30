import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  Download,
  Mail,
  Phone,
  MapPin,
  Github,
  Globe,
  Briefcase,
  GraduationCap,
  FolderGit2,
  Cpu,
  Award,
  Languages,
  ArrowUpRight,
  ExternalLink,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import {
  resumeProfile,
  resumeExperience,
  resumeEducation,
  resumeProjects,
  resumeSkills,
  resumeCertifications,
  resumeLanguages,
  resumeTimelineData
} from '../../data/resumeCvData';
import { MaskHeading, FadeInUp } from '../UI/TextReveal';

const EASE = [0.16, 1, 0.3, 1];

export default function InteractiveResume() {
  const prefersReduced = useReducedMotion();
  const [activeTab, setActiveTab] = useState('ALL');
  const [activeNav, setActiveNav] = useState('profile');
  const sectionRef = useRef(null);

  const internalNavItems = [
    { id: 'profile', label: 'PROFILE' },
    { id: 'timeline', label: 'TIMELINE' },
    { id: 'experience', label: 'EXPERIENCE' },
    { id: 'education', label: 'EDUCATION' },
    { id: 'projects', label: 'PROJECTS' },
    { id: 'skills', label: 'SKILLS' },
    { id: 'certifications', label: 'CERTIFICATIONS' },
    { id: 'languages', label: 'LANGUAGES' },
  ];

  // Smooth scroll to internal resume sub-sections
  const scrollToSubSection = (targetId) => {
    setActiveNav(targetId);
    const element = document.getElementById(`resume-${targetId}`);
    if (element) {
      const headerOffset = 90;
      if (window.__lenis) {
        window.__lenis.scrollTo(element, { offset: -headerOffset, duration: 0.75 });
      } else {
        const top = element.getBoundingClientRect().top + window.pageYOffset - headerOffset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  };

  // Scroll spy to highlight active internal nav item
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 140;
      for (const item of internalNavItems) {
        const el = document.getElementById(`resume-${item.id}`);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveNav(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="resume"
      ref={sectionRef}
      className="py-24 sm:py-32 px-4 sm:px-6 md:px-12 bg-[#0A0A0A] text-[#F1F0EB] relative border-t border-white/10 font-mono w-full overflow-x-clip"
      aria-label="Interactive Resume Section"
    >
      {/* Background Matrix Watermark */}
      <div className="absolute top-10 right-8 text-[10px] text-white/5 uppercase select-none pointer-events-none hidden xl:block leading-relaxed tracking-widest text-right">
        [CURRICULUM VITAE // VERIFIED SOURCE]<br />
        REUBEN BINU GEORGE · 2026 GRADUATE<br />
        BCA GAME DEV · FULL-STACK DEVELOPER
      </div>

      <div className="max-w-7xl mx-auto space-y-16 sm:space-y-20 relative z-10 w-full">
        
        {/* Section Header: Title, Subtitle & Download Action */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-end border-b border-white/10 pb-8 sm:pb-10 w-full">
          
          {/* Left Vertical Tag */}
          <div className="hidden lg:flex lg:col-span-1 flex-col items-center justify-start h-full">
            <motion.div
              initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 0.6, ease: EASE }}
              className="font-mono text-4xl font-extrabold text-[#FF1E27]"
            >
              CV
            </motion.div>
            <motion.div
              initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
              className="vertical-tag font-mono text-xs text-stone-400 uppercase tracking-[0.3em] font-bold mt-6"
            >
              RESUME
            </motion.div>
          </div>

          {/* Title & Subtitle */}
          <div className="lg:col-span-7 space-y-3 w-full max-w-full">
            <motion.div
              initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 0.6, ease: EASE }}
              className="text-xs text-[#FF1E27] font-bold uppercase tracking-widest flex items-center gap-2"
            >
              <Briefcase size={15} />
              <span>OFFICIAL CURRICULUM VITAE</span>
            </motion.div>

            <MaskHeading
              lines={["INTERACTIVE RESUME"]}
              className="font-syne font-extrabold text-white uppercase tracking-tight w-full max-w-full"
              style={{
                fontSize: 'clamp(2.2rem, 7vw, 4.25rem)',
                letterSpacing: 'clamp(-0.03em, -0.2vw, -0.01em)',
              }}
              delay={0.15}
            />

            <motion.p
              initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 0.6, delay: 0.25, ease: EASE }}
              className="font-sans text-stone-300 text-sm sm:text-base leading-relaxed"
            >
              A closer look at my journey, skills, and work.
            </motion.p>
          </div>

          {/* Download CV CTA */}
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-3 w-full">
            <a
              href={resumeProfile.cvFile}
              download="Reuben-Binu-George-CV.pdf"
              className="btn-editorial-red w-full sm:w-auto inline-flex items-center justify-center gap-2.5 py-3 px-6 text-xs sm:text-sm font-mono font-bold tracking-wider uppercase transition-all duration-300 shadow-lg cursor-pointer"
              title="Download Reuben Binu George CV PDF"
            >
              <Download size={16} />
              <span>DOWNLOAD CV →</span>
            </a>
            <span className="text-[10px] text-stone-400 font-mono">
              VERIFIED OFFICIAL PDF · 2026 EDITION
            </span>
          </div>

        </div>

        {/* Sticky Internal Resume Navigation Bar */}
        <div className="sticky top-[68px] sm:top-[74px] z-30 bg-[#0A0A0A]/95 backdrop-blur-md border border-white/10 p-2 sm:p-2.5 flex items-center justify-start overflow-x-auto no-scrollbar gap-1.5 shadow-md">
          {internalNavItems.map((item) => {
            const isActive = activeNav === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSubSection(item.id)}
                className={`px-3 py-1.5 text-[11px] font-mono font-bold tracking-wider uppercase transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#FF1E27] text-white border border-[#FF1E27] shadow-sm'
                    : 'text-stone-300 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* PROFILE SECTION */}
        <div id="resume-profile" className="scroll-mt-32 space-y-6">
          <div className="border border-white/10 bg-[#0E0E12] p-6 sm:p-8 space-y-6 relative">
            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#FF1E27]" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-white/20" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-white/20" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#FF1E27]" />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <span className="text-[10px] text-[#FF1E27] uppercase tracking-widest font-bold block mb-1">
                  CANDIDATE DOSSIER
                </span>
                <h3 className="font-syne text-2xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
                  {resumeProfile.name}
                </h3>
                <span className="text-xs sm:text-sm text-stone-300 font-bold uppercase tracking-wider block mt-1">
                  {resumeProfile.role}
                </span>
              </div>

              {/* Contact Chips */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-stone-300">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/5 border border-white/10">
                  <MapPin size={13} className="text-[#FF1E27]" />
                  <span>{resumeProfile.location}</span>
                </span>
                <a
                  href={`mailto:${resumeProfile.email}`}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/5 border border-white/10 hover:border-[#FF1E27] hover:text-[#FF1E27] transition-colors"
                >
                  <Mail size={13} className="text-[#FF1E27]" />
                  <span>{resumeProfile.email}</span>
                </a>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/5 border border-white/10">
                  <Phone size={13} className="text-[#FF1E27]" />
                  <span>{resumeProfile.phone}</span>
                </span>
                <a
                  href={resumeProfile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/5 border border-white/10 hover:border-[#FF1E27] hover:text-[#FF1E27] transition-colors"
                >
                  <Github size={13} className="text-[#FF1E27]" />
                  <span>{resumeProfile.githubDisplay}</span>
                </a>
              </div>
            </div>

            {/* Summary */}
            <div className="space-y-2">
              <span className="text-[10px] text-stone-400 font-bold uppercase tracking-widest block">
                EXECUTIVE SUMMARY
              </span>
              <p className="font-sans text-sm sm:text-base text-stone-200 leading-relaxed max-w-4xl">
                {resumeProfile.summary}
              </p>
            </div>
          </div>
        </div>

        {/* RESUME TIMELINE (CAREER / EDUCATION TREE) */}
        <div id="resume-timeline" className="scroll-mt-32 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="text-xs text-[#FF1E27] uppercase tracking-widest font-bold flex items-center gap-2">
              <Sparkles size={14} />
              <span>CAREER & EDUCATION TIMELINE</span>
            </span>
            <span className="text-[10px] text-stone-400 uppercase tracking-widest">
              2023 — 2026 CHRONOLOGY
            </span>
          </div>

          <div className="border border-white/10 bg-[#0E0E12] p-6 sm:p-8 space-y-8 font-mono">
            {resumeTimelineData.map((node, nIdx) => (
              <div key={node.year} className="relative pl-6 sm:pl-8 border-l-2 border-[#FF1E27]/40 space-y-3">
                {/* Timeline Year Node */}
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#0A0A0A] border-2 border-[#FF1E27] flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FF1E27]" />
                </div>

                <div className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  {node.year}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
                  {node.items.map((item, iIdx) => (
                    <div
                      key={iIdx}
                      className="border border-white/10 p-3 bg-white/5 hover:border-white/30 transition-colors space-y-1"
                    >
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-[#FF1E27] font-bold uppercase">{item.category}</span>
                      </div>
                      <div className="text-xs sm:text-sm text-stone-100 font-bold">
                        {item.title}
                      </div>
                      <div className="font-sans text-[11px] text-stone-400">
                        {item.details}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="pt-2 text-[10px] text-stone-400 border-t border-white/5">
              * Note: Chronological milestone tree represents verified education, project deliverables, and internship periods from the CV.
            </div>
          </div>
        </div>

        {/* 01 — EXPERIENCE */}
        <div id="resume-experience" className="scroll-mt-32 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-3">
              <span className="font-mono text-2xl font-extrabold text-[#FF1E27]">01</span>
              <span className="text-xs text-white uppercase tracking-widest font-bold">
                EXPERIENCE
              </span>
            </div>
            <span className="text-[10px] text-stone-400 uppercase tracking-widest">
              INTERACTIVE TIMELINE
            </span>
          </div>

          <div className="space-y-4">
            {resumeExperience.map((exp) => (
              <div
                key={exp.id}
                className="border border-white/10 bg-[#0E0E12] p-6 sm:p-8 space-y-4 hover:border-[#FF1E27]/50 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
                  <div>
                    <h4 className="font-syne text-xl sm:text-2xl font-extrabold text-white tracking-tight uppercase">
                      {exp.role}
                    </h4>
                    <span className="text-xs text-[#FF1E27] font-bold uppercase tracking-wider block mt-0.5">
                      {exp.company} · {exp.location}
                    </span>
                  </div>

                  <span className="inline-flex items-center px-3 py-1 bg-white/5 border border-white/10 text-stone-300 text-xs font-bold uppercase">
                    {exp.period}
                  </span>
                </div>

                <div className="space-y-2.5 pt-2">
                  {exp.details.map((detail, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-3 text-xs sm:text-sm text-stone-300">
                      <span className="text-[#FF1E27] font-bold mt-0.5">•</span>
                      <p className="font-sans leading-relaxed">{detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 02 — EDUCATION */}
        <div id="resume-education" className="scroll-mt-32 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-3">
              <span className="font-mono text-2xl font-extrabold text-[#FF1E27]">02</span>
              <span className="text-xs text-white uppercase tracking-widest font-bold">
                EDUCATION
              </span>
            </div>
            <span className="text-[10px] text-stone-400 uppercase tracking-widest">
              DEGREE & SPECIALIZATION
            </span>
          </div>

          <div className="space-y-4">
            {resumeEducation.map((edu) => (
              <div
                key={edu.id}
                className="border border-white/10 bg-[#0E0E12] p-6 sm:p-8 space-y-5 hover:border-[#FF1E27]/50 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
                  <div>
                    <h4 className="font-syne text-xl sm:text-2xl font-extrabold text-white tracking-tight uppercase">
                      {edu.degree}
                    </h4>
                    <span className="text-xs text-[#FF1E27] font-bold uppercase tracking-wider block mt-0.5">
                      SPECIALIZATION: {edu.specialization}
                    </span>
                    <span className="text-xs text-stone-400 block mt-1">
                      {edu.institution}, {edu.location}
                    </span>
                  </div>

                  <span className="inline-flex items-center px-3 py-1 bg-white/5 border border-white/10 text-stone-300 text-xs font-bold uppercase self-start sm:self-auto">
                    {edu.period}
                  </span>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] text-stone-400 font-bold uppercase tracking-widest block">
                    RELEVANT COURSEWORK
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {edu.coursework.map((course) => (
                      <span
                        key={course}
                        className="px-2.5 py-1 bg-white/5 border border-white/10 text-xs text-stone-200"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 03 — PROJECTS */}
        <div id="resume-projects" className="scroll-mt-32 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-3">
              <span className="font-mono text-2xl font-extrabold text-[#FF1E27]">03</span>
              <span className="text-xs text-white uppercase tracking-widest font-bold">
                REAL PROJECTS
              </span>
            </div>
            <span className="text-[10px] text-stone-400 uppercase tracking-widest">
              {resumeProjects.length} DOCUMENTED DELIVERABLES
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {resumeProjects.map((proj) => (
              <div
                key={proj.number}
                className="border border-white/10 bg-[#0E0E12] p-5 sm:p-6 flex flex-col justify-between space-y-4 hover:border-[#FF1E27]/60 transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="text-2xl font-black text-[#FF1E27]">
                      {proj.number}
                    </span>
                    <span className="text-[11px] text-stone-400 font-bold">
                      {proj.period}
                    </span>
                  </div>

                  <h5 className="font-syne text-lg font-extrabold text-white tracking-tight uppercase">
                    {proj.title}
                  </h5>

                  <p className="font-sans text-xs text-stone-300 leading-relaxed">
                    {proj.description}
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-white/10">
                  <div className="flex flex-wrap gap-1.5">
                    {proj.technologies.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 bg-white/5 border border-white/10 text-[10px] text-stone-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {proj.github && (
                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-[#FF1E27] hover:underline font-bold uppercase pt-1"
                    >
                      <span>GITHUB REPO</span>
                      <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 04 — TECHNICAL SKILLS */}
        <div id="resume-skills" className="scroll-mt-32 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-3">
              <span className="font-mono text-2xl font-extrabold text-[#FF1E27]">04</span>
              <span className="text-xs text-white uppercase tracking-widest font-bold">
                TECHNICAL SKILLS
              </span>
            </div>
            <span className="text-[10px] text-stone-400 uppercase tracking-widest">
              ORGANIZED CATEGORIES
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {resumeSkills.map((cat) => (
              <div
                key={cat.category}
                className="border border-white/10 bg-[#0E0E12] p-5 space-y-3 hover:border-white/30 transition-colors"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-xs font-bold text-[#FF1E27] tracking-wider uppercase">
                    {cat.category}
                  </span>
                  <span className="text-[10px] text-stone-400">
                    {cat.skills.length} ITEMS
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {cat.skills.map((s) => (
                    <span
                      key={s}
                      className="px-2.5 py-1 bg-white/5 border border-white/10 text-xs text-stone-200 hover:border-[#FF1E27]/50 hover:text-white transition-colors"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 05 — CERTIFICATIONS */}
        <div id="resume-certifications" className="scroll-mt-32 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-3">
              <span className="font-mono text-2xl font-extrabold text-[#FF1E27]">05</span>
              <span className="text-xs text-white uppercase tracking-widest font-bold">
                CERTIFICATIONS
              </span>
            </div>
            <span className="text-[10px] text-stone-400 uppercase tracking-widest">
              {resumeCertifications.length} CREDENTIALS
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {resumeCertifications.map((cert, cIdx) => (
              <div
                key={cIdx}
                className="border border-white/10 bg-[#0E0E12] p-4 flex flex-col justify-between space-y-2 hover:border-[#FF1E27]/50 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-[10px] text-[#FF1E27] font-bold uppercase">
                    <Award size={13} />
                    <span>{cert.issuer}</span>
                  </div>
                  <h6 className="font-syne text-sm font-bold text-white tracking-tight">
                    {cert.title}
                  </h6>
                </div>
                <div className="text-[10px] text-stone-400 pt-2 border-t border-white/5 uppercase">
                  VERIFIED CV CERTIFICATE
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 06 — LANGUAGES */}
        <div id="resume-languages" className="scroll-mt-32 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-3">
              <span className="font-mono text-2xl font-extrabold text-[#FF1E27]">06</span>
              <span className="text-xs text-white uppercase tracking-widest font-bold">
                LANGUAGES
              </span>
            </div>
            <span className="text-[10px] text-stone-400 uppercase tracking-widest">
              SPOKEN & WRITTEN
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
            {resumeLanguages.map((lang) => (
              <div
                key={lang.name}
                className="border border-white/10 bg-[#0E0E12] p-5 flex items-center justify-between hover:border-white/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Languages size={20} className="text-[#FF1E27]" />
                  <span className="font-syne text-base font-extrabold text-white">
                    {lang.name}
                  </span>
                </div>
                <span className="px-2.5 py-1 bg-white/5 border border-white/10 text-xs text-stone-300 font-bold uppercase">
                  {lang.proficiency}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CONTACT / END OF RESUME */}
        <div id="resume-contact" className="scroll-mt-32 pt-10 border-t border-white/10">
          <div className="border border-white/15 bg-[#0E0E12] p-8 sm:p-12 relative flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-xl">
              <span className="text-xs text-[#FF1E27] font-bold tracking-widest uppercase block">
                COLLABORATION & HIRING
              </span>

              <h3 className="font-syne text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
                LET'S BUILD SOMETHING.
              </h3>

              <div className="flex flex-col gap-1.5 text-xs text-stone-300 pt-2 font-mono">
                <div>
                  <span className="text-stone-400 uppercase">EMAIL:</span>{' '}
                  <a href={`mailto:${resumeProfile.email}`} className="text-white hover:text-[#FF1E27] underline">
                    {resumeProfile.email}
                  </a>
                </div>
                <div>
                  <span className="text-stone-400 uppercase">WEBSITE:</span>{' '}
                  <a href={resumeProfile.website} className="text-white hover:text-[#FF1E27]">
                    {resumeProfile.websiteDisplay}
                  </a>
                </div>
                <div>
                  <span className="text-stone-400 uppercase">GITHUB:</span>{' '}
                  <a href={resumeProfile.github} target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#FF1E27]">
                    {resumeProfile.githubDisplay}
                  </a>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
              <a
                href={`mailto:${resumeProfile.email}`}
                className="btn-editorial-red inline-flex items-center justify-center gap-2 py-3 px-8 text-xs sm:text-sm font-bold uppercase tracking-wider cursor-pointer shadow-lg"
              >
                <span>GET IN TOUCH →</span>
              </a>

              <a
                href={resumeProfile.cvFile}
                download="Reuben-Binu-George-CV.pdf"
                className="btn-editorial-outline text-white border-white hover:border-[#FF1E27] inline-flex items-center justify-center gap-2 py-3 px-6 text-xs font-bold uppercase tracking-wider"
              >
                <Download size={14} />
                <span>DOWNLOAD CV</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
