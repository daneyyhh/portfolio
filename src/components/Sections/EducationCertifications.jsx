import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, CheckCircle2, ShieldCheck } from 'lucide-react';
import { personalData, certificationsData } from '../../data/portfolioData';

export default function EducationCertifications({ engineerMode }) {
  const edu = personalData.education;

  return (
    <section id="education" className="py-24 px-6 md:px-12 bg-[#09090b] relative overflow-hidden border-t border-white/10 font-mono">
      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* Section 1: Education */}
        <div className="space-y-8">
          <div className="flex items-center gap-2 text-xs text-[#ccff00] tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-[#ccff00]"></span>
            <span>ACADEMIC FOUNDATION</span>
          </div>

          <div className="bg-[#0f0f13] border-2 border-[#ccff00]/40 p-8 rounded-sm relative group overflow-hidden shadow-2xl">
            <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-[#ccff00] text-black rounded-sm font-bold">
                    <GraduationCap size={24} />
                  </div>
                  <div>
                    <span className="text-xs text-purple-400 font-bold uppercase">{edu.specialization} SPECIALIZATION</span>
                    <h3 className="font-syne text-3xl font-bold text-white uppercase">{edu.degree}</h3>
                  </div>
                </div>

                <p className="font-sans text-slate-300 text-sm max-w-2xl leading-relaxed">
                  {edu.description}
                </p>
              </div>

              <div className="bg-[#050507] border border-white/10 p-4 rounded-sm space-y-1 text-xs shrink-0">
                <div className="text-[#ccff00] font-bold">INSTITUTION:</div>
                <div className="text-white">{edu.institution}</div>
                <div className="text-slate-400">STATUS: VERIFIED GRADUATE</div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Verified Certifications */}
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6">
            <div>
              <div className="flex items-center gap-2 text-xs text-purple-400 tracking-widest uppercase mb-1">
                <Award size={14} />
                <span>INDUSTRY CREDENTIALS</span>
              </div>
              <h2 className="font-syne text-3xl md:text-5xl font-extrabold text-white uppercase">
                CERTIFICATIONS
              </h2>
            </div>

            <span className="text-xs text-slate-400">5 VERIFIED CREDENTIALS ON CV</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificationsData.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="bg-[#0f0f13] border border-white/15 p-6 rounded-sm space-y-4 hover:border-purple-500/50 transition-colors group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="bg-purple-500/10 text-purple-400 border border-purple-500/30 px-2 py-0.5 rounded-sm font-bold">
                      {cert.badge}
                    </span>
                    <ShieldCheck className="text-[#ccff00]" size={18} />
                  </div>

                  <h4 className="font-syne text-lg font-bold text-white uppercase group-hover:text-purple-300 transition-colors">
                    {cert.title}
                  </h4>

                  <div className="text-xs text-slate-400">ISSUER: <span className="text-slate-200">{cert.issuer}</span></div>

                  <p className="font-sans text-xs text-slate-300 leading-relaxed">
                    {cert.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex flex-wrap gap-1.5">
                  {cert.skills.map(s => (
                    <span key={s} className="bg-white/5 text-[10px] text-slate-400 px-2 py-0.5 rounded-sm">
                      {s}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
