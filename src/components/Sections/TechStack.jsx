import React from 'react';
import { motion } from 'framer-motion';

export default function TechStack() {
  const techCategories = [
    {
      id: "01",
      name: "FRONTEND",
      items: [
        { name: "HTML5", logo: "https://cdn.jsdelivr.net/gh/devicon/devicon/icons/html5/html5-original.svg" },
        { name: "CSS3", logo: "https://cdn.jsdelivr.net/gh/devicon/devicon/icons/css3/css3-original.svg" },
        { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicon/devicon/icons/javascript/javascript-original.svg" },
        { name: "Bootstrap", logo: "https://cdn.jsdelivr.net/gh/devicon/devicon/icons/bootstrap/bootstrap-original.svg" },
        { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicon/devicon/icons/react/react-original.svg" },
        { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicon/devicon/icons/nextjs/nextjs-original.svg" },
      ]
    },
    {
      id: "02",
      name: "BACKEND",
      items: [
        { name: "PHP", logo: "https://cdn.jsdelivr.net/gh/devicon/devicon/icons/php/php-original.svg" },
        { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicon/devicon/icons/nodejs/nodejs-original.svg" },
        { name: "REST APIs", logo: "https://cdn.jsdelivr.net/gh/devicon/devicon/icons/express/express-original.svg" },
      ]
    },
    {
      id: "03",
      name: "DATABASE",
      items: [
        { name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicon/devicon/icons/mysql/mysql-original.svg" },
        { name: "SQL", logo: "https://cdn.jsdelivr.net/gh/devicon/devicon/icons/azuresqldatabase/azuresqldatabase-original.svg" },
        { name: "Firebase", logo: "https://cdn.jsdelivr.net/gh/devicon/devicon/icons/firebase/firebase-plain.svg" },
        { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicon/devicon/icons/mongodb/mongodb-original.svg" },
      ]
    },
    {
      id: "04",
      name: "AI / ML",
      items: [
        { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicon/devicon/icons/python/python-original.svg" },
        { name: "Scikit-Learn", logo: "https://cdn.jsdelivr.net/gh/devicon/devicon/icons/scikitlearn/scikitlearn-original.svg" },
        { name: "ML Classification", logo: "https://cdn.jsdelivr.net/gh/devicon/devicon/icons/tensorflow/tensorflow-original.svg" },
      ]
    },
    {
      id: "05",
      name: "GAME DEVELOPMENT",
      items: [
        { name: "Unity 3D", logo: "https://cdn.jsdelivr.net/gh/devicon/devicon/icons/unity/unity-original.svg" },
        { name: "C#", logo: "https://cdn.jsdelivr.net/gh/devicon/devicon/icons/csharp/csharp-original.svg" },
        { name: "Lua Scripting", logo: "https://cdn.jsdelivr.net/gh/devicon/devicon/icons/lua/lua-original.svg" },
      ]
    },
    {
      id: "06",
      name: "DESIGN",
      items: [
        { name: "Figma", logo: "https://cdn.jsdelivr.net/gh/devicon/devicon/icons/figma/figma-original.svg" },
      ]
    },
    {
      id: "07",
      name: "TOOLS",
      items: [
        { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicon/devicon/icons/git/git-original.svg" },
        { name: "GitHub", logo: "https://cdn.jsdelivr.net/gh/devicon/devicon/icons/github/github-original.svg" },
        { name: "Postman", logo: "https://cdn.jsdelivr.net/gh/devicon/devicon/icons/postman/postman-original.svg" },
        { name: "VS Code", logo: "https://cdn.jsdelivr.net/gh/devicon/devicon/icons/vscode/vscode-original.svg" },
      ]
    }
  ];

  return (
    <section id="skills" className="py-28 px-6 md:px-12 bg-[#F1F0EB] text-[#111111] relative border-t border-[#C9C7C0] font-mono">
      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end border-b border-[#C9C7C0] pb-8">
          <div className="hidden lg:flex lg:col-span-1">
            <span className="font-mono text-4xl font-extrabold text-[#111111]">06</span>
          </div>

          <div className="lg:col-span-11 space-y-1">
            <div className="text-xs text-[#8B6DFF] font-bold uppercase tracking-widest">
              TOOLING & STACK
            </div>
            <h2 className="font-syne text-4xl md:text-6xl font-extrabold text-[#111111] uppercase tracking-tight">
              TECHNOLOGIES
            </h2>
            <p className="font-sans text-slate-700 text-sm md:text-base mt-2 max-w-2xl leading-relaxed">
              Tools and technologies I work with across web, AI, design, game development, and interactive experiences.
            </p>
          </div>
        </div>

        {/* Editorial Technology Index Categories */}
        <div className="space-y-12">
          {techCategories.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="border-b border-[#C9C7C0] pb-10 space-y-6"
            >
              {/* Category Header */}
              <div className="flex items-center gap-4">
                <span className="font-mono text-sm font-bold text-[#8B6DFF]">
                  {cat.id}
                </span>
                <h3 className="font-syne text-xl md:text-2xl font-extrabold text-[#111111] uppercase tracking-tight">
                  {cat.name}
                </h3>
              </div>

              {/* Technologies Row (Informational & Non-Clickable) */}
              <div className="flex flex-wrap gap-8 md:gap-12 items-center pt-2">
                {cat.items.map((tech) => (
                  <div
                    key={tech.name}
                    className="group select-none flex flex-col items-center gap-3 transition-transform duration-300 hover:scale-105"
                  >
                    {/* Official Tech Logo (Grayscale by default, color on hover) */}
                    <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center p-1">
                      <img
                        src={tech.logo}
                        alt={tech.name}
                        className="w-full h-full object-contain filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-300"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>

                    {/* Technology Name */}
                    <span className="font-mono text-xs md:text-sm font-bold text-[#111111] group-hover:text-[#8B6DFF] transition-colors">
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Technical Editorial Footer */}
        <div className="pt-6 border-t border-[#C9C7C0] flex flex-col md:flex-row justify-between items-center text-xs font-mono text-[#555555] gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#8B6DFF]"></span>
            <span>SELECTED TOOLS / CURRENT STACK</span>
          </div>
          <div className="uppercase tracking-widest font-bold text-[#111111]">
            WEB • AI • 3D • GAME DEVELOPMENT • DESIGN
          </div>
        </div>

      </div>
    </section>
  );
}
