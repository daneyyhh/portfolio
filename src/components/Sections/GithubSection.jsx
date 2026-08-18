import React from 'react';
import { motion } from 'framer-motion';
import { Github, GitCommit, Star, ExternalLink } from 'lucide-react';
import { personalData } from '../../data/portfolioData';

export default function GithubSection({ engineerMode }) {
  const repos = [
    { name: "daneyyhh/portfolio", desc: "Production editorial developer portfolio with Three.js WebGL, persistent camera scroll, and reubg identity.", lang: "JavaScript / React", stars: 12 },
    { name: "daneyyhh/fivem-lua-framework", desc: "High-performance LUA server kernel and MySQL async database queries for multiplayer game servers.", lang: "LUA / SQL", stars: 24 },
    { name: "daneyyhh/neurovision-ml", desc: "Machine learning classification models and data processing pipelines using Scikit-Learn.", lang: "Python", stars: 18 }
  ];

  return (
    <section id="github" className="py-24 px-6 md:px-12 bg-[#F1F0EB] text-[#111111] relative overflow-hidden border-t border-[#C9C7C0] font-mono">
      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#C9C7C0] pb-8">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#8B6DFF] tracking-widest uppercase mb-2 font-bold">
              <Github size={14} />
              <span>CODE REPOSITORIES</span>
            </div>
            <h2 className="font-syne text-4xl md:text-6xl font-extrabold text-[#111111] uppercase tracking-tight">
              GITHUB ACTIVITY
            </h2>
          </div>

          <a
            href={personalData.github}
            target="_blank"
            rel="noreferrer"
            className="btn-editorial-outline flex items-center gap-2 text-xs"
          >
            <Github size={16} />
            <span>VISIT GITHUB PROFILE</span>
          </a>
        </div>

        {/* Pinned Repos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {repos.map((repo, idx) => (
            <motion.a
              key={repo.name}
              href={personalData.github}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-[#FAF9F5] border border-[#C9C7C0] p-6 rounded-none space-y-4 hover:border-[#8B6DFF] transition-colors group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs text-[#8B6DFF]">
                  <span className="font-bold flex items-center gap-1.5">
                    <GitCommit size={14} />
                    <span>PINNED REPO</span>
                  </span>
                  <ExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>

                <h4 className="font-syne text-lg font-bold text-[#111111] uppercase group-hover:text-[#8B6DFF] transition-colors">
                  {repo.name}
                </h4>

                <p className="font-sans text-xs text-[#555555] leading-relaxed">
                  {repo.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-[#C9C7C0] flex justify-between items-center text-xs text-[#555555]">
                <span className="text-[#8B6DFF] font-bold">{repo.lang}</span>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1"><Star size={12} /> {repo.stars}</span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
}
