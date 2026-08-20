import React from 'react';
import { motion } from 'framer-motion';

export default function TechStack({ engineerMode }) {
  const techCategories = [
    {
      id: "01",
      name: "CORE LANGUAGES",
      items: [
        { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
        { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
        { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
        { name: "C#", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" },
        { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
        { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
        { name: "LUA", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/lua/lua-original.svg" }
      ]
    },
    {
      id: "02",
      name: "FRAMEWORKS & LIBS",
      items: [
        { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
        { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
        { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
        { name: "Express", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
        { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
        { name: "Bootstrap 5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" },
        { name: "Three.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg" },
        { name: "Framer Motion", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/framermotion/framermotion-original.svg" }
      ]
    },
    {
      id: "03",
      name: "DATABASES & ORM",
      items: [
        { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
        { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
        { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
        { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
        { name: "Redis", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" }
      ]
    },
    {
      id: "04",
      name: "DEV TOOLS & ENGINES",
      items: [
        { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
        { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
        { name: "Unity 3D", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg" },
        { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
        { name: "Vercel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg" },
        { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" }
      ]
    },
    {
      id: "05",
      name: "AI & CREATIVE DESIGN",
      items: [
        { name: "Scikit-Learn", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg" },
        { name: "NumPy", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg" },
        { name: "Pandas", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" },
        { name: "Photoshop", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg" },
        { name: "Illustrator", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg" }
      ]
    }
  ];

  return (
    <section id="techstack" className="min-h-[100svh] scroll-snap-start py-20 sm:py-24 px-4 sm:px-6 md:px-12 bg-[#F1F0EB] text-[#111111] relative border-t border-[#C9C7C0] font-mono w-full overflow-x-clip">
      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16 relative z-10 w-full">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-end border-b border-[#C9C7C0] pb-6 sm:pb-8 w-full">
          <div className="hidden lg:flex lg:col-span-1">
            <span className="font-mono text-4xl font-extrabold text-[#111111]">06</span>
          </div>

          <div className="lg:col-span-11 space-y-1 w-full max-w-full">
            <div className="text-xs text-[#8B6DFF] font-bold uppercase tracking-widest">
              TOOLING & STACK
            </div>
            <h2
              className="font-syne font-extrabold text-[#111111] uppercase tracking-tight w-full max-w-full overflow-visible"
              style={{
                fontSize: 'clamp(1.75rem, 6.8vw, 3.5rem)',
                letterSpacing: 'clamp(-0.03em, -0.2vw, 0em)',
              }}
            >
              TECHNOLOGIES
            </h2>
            <p className="font-sans text-slate-700 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
              Tools and technologies I work with across web, AI, design, game development, and interactive experiences.
            </p>
          </div>
        </div>

        {/* Editorial Technology Index Categories */}
        <div className="space-y-10 sm:space-y-12 w-full">
          {techCategories.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="border-b border-[#C9C7C0] pb-8 sm:pb-10 space-y-4 sm:space-y-6 w-full"
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 sm:gap-4">
                <span className="font-mono text-xs sm:text-sm font-bold text-[#8B6DFF]">
                  {cat.id}
                </span>
                <h3 className="font-syne text-lg sm:text-xl md:text-2xl font-extrabold text-[#111111] uppercase tracking-tight">
                  {cat.name}
                </h3>
              </div>

              {/* Technologies Row */}
              <div className="flex flex-wrap gap-4 sm:gap-8 md:gap-12 items-center pt-2 w-full">
                {cat.items.map((tech) => (
                  <div
                    key={tech.name}
                    className="flex items-center gap-2 sm:gap-3 py-1 px-2 group select-none"
                  >
                    <img
                      src={tech.icon}
                      alt={tech.name}
                      className="w-5 h-5 sm:w-6 sm:h-6 object-contain filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-300 shrink-0"
                    />
                    <span className="font-mono text-xs sm:text-sm text-[#333333] group-hover:text-[#111111] font-medium tracking-wide">
                      {tech.name}
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
