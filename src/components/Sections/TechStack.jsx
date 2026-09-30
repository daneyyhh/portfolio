import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { MaskHeading, MaskParagraph } from '../UI/TextReveal';

const EASE = [0.16, 1, 0.3, 1];

export default function TechStack() {
  const prefersReduced = useReducedMotion();

  const skillCategories = [
    {
      id: "01",
      name: "FRONTEND",
      items: [
        { name: "React.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
        { name: "JavaScript (ES6+)", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
        { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
        { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
        { name: "Bootstrap 5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" }
      ]
    },
    {
      id: "02",
      name: "BACKEND",
      items: [
        { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
        { name: "Express.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
        { name: "PHP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
        { name: "REST API design", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" }
      ]
    },
    {
      id: "03",
      name: "DATABASES",
      items: [
        { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
        { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
        { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" }
      ]
    },
    {
      id: "04",
      name: "LANGUAGES",
      items: [
        { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
        { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
        { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
        { name: "C#", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" },
        { name: "PHP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
        { name: "SQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" }
      ]
    },
    {
      id: "05",
      name: "TOOLS & PLATFORMS",
      items: [
        { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
        { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
        { name: "Vercel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg" },
        { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
        { name: "Unity 3D", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg" },
        { name: "Android Studio", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/androidstudio/androidstudio-original.svg" }
      ]
    },
    {
      id: "06",
      name: "CORE CONCEPTS",
      items: [
        { name: "MERN stack" },
        { name: "CRUD operations" },
        { name: "Authentication" },
        { name: "OOP" },
        { name: "Responsive design" },
        { name: "Wireframing & prototyping" }
      ]
    }
  ];

  return (
    <section id="techstack" className="min-h-[100svh] py-20 sm:py-24 px-4 sm:px-6 md:px-12 bg-[#F1F0EB] text-[#111111] relative border-t border-[#C9C7C0] font-mono w-full overflow-x-clip">
      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16 relative z-10 w-full">
        
        {/* Section Header with Staggered Sequence */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-end border-b border-[#C9C7C0] pb-6 sm:pb-8 w-full">
          <div className="hidden lg:flex lg:col-span-1">
            <motion.span
              initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 0.6, ease: EASE }}
              className="font-mono text-4xl font-extrabold text-[#111111]"
            >
              04
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
              <span>SKILLS & CAPABILITIES</span>
            </motion.div>

            <MaskHeading
              lines={["SKILLS"]}
              className="font-syne font-extrabold text-[#111111] uppercase tracking-tight w-full max-w-full overflow-visible"
              style={{
                fontSize: 'clamp(1.75rem, 6.8vw, 3.5rem)',
                letterSpacing: 'clamp(-0.03em, -0.2vw, 0em)',
              }}
              delay={0.15}
            />

            <MaskParagraph delay={0.3} className="font-sans text-slate-700 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
              <p>Practical proficiencies across frontend, backend, databases, programming languages, development tools, and core software engineering concepts.</p>
            </MaskParagraph>
          </div>
        </div>

        {/* Editorial Skills Index Categories with Staggered Viewport Entrance */}
        <div className="space-y-10 sm:space-y-12 w-full">
          {skillCategories.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-6% 0px" }}
              transition={{ duration: prefersReduced ? 0.25 : 0.65, delay: prefersReduced ? 0 : index * 0.08, ease: EASE }}
              className="border-b border-[#C9C7C0] pb-8 sm:pb-10 space-y-4 sm:space-y-6 w-full"
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 sm:gap-4">
                <span className="font-mono text-xs sm:text-sm font-bold text-[#FF1E27]">
                  {cat.id}
                </span>
                <h3 className="font-syne text-lg sm:text-xl md:text-2xl font-extrabold text-[#111111] uppercase tracking-tight">
                  {cat.name}
                </h3>
              </div>

              {/* Skills Row with Smooth Item Hover */}
              <div className="flex flex-wrap gap-3 sm:gap-6 md:gap-8 items-center pt-2 w-full">
                {cat.items.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-center gap-2 sm:gap-3 py-1.5 px-3 bg-[#FAF9F5] border border-[#C9C7C0] group select-none transition-all hover:border-[#FF1E27] hover:-translate-y-0.5 duration-200 shadow-xs"
                  >
                    {skill.icon ? (
                      <img
                        src={skill.icon}
                        alt={skill.name}
                        className="w-4 h-4 sm:w-5 sm:h-5 object-contain filter grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-300 shrink-0"
                      />
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF1E27] shrink-0" />
                    )}
                    <span className="font-mono text-xs sm:text-sm text-[#222222] group-hover:text-[#111111] font-semibold tracking-wide">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
