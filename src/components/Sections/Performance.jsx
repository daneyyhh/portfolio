import React from 'react';
import { motion } from 'framer-motion';
import { Zap, ShieldCheck, Award, Search, CheckCircle2 } from 'lucide-react';
import { performanceMetrics } from '../../data/portfolioData';

export default function Performance({ engineerMode }) {
  const scores = [
    { label: "PERFORMANCE", value: performanceMetrics.performance, icon: Zap, color: "text-[#ccff00]", border: "border-[#ccff00]" },
    { label: "ACCESSIBILITY", value: performanceMetrics.accessibility, icon: ShieldCheck, color: "text-purple-400", border: "border-purple-500" },
    { label: "BEST PRACTICES", value: performanceMetrics.bestPractices, icon: Award, color: "text-cyan-400", border: "border-cyan-400" },
    { label: "SEO OPTIMIZED", value: performanceMetrics.seo, icon: Search, color: "text-emerald-400", border: "border-emerald-400" },
  ];

  return (
    <section id="performance" className="py-24 px-6 md:px-12 bg-[#09090b] relative overflow-hidden border-t border-white/10 font-mono">
      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#ccff00] tracking-widest uppercase mb-2">
              <span className="w-2 h-2 rounded-full bg-[#ccff00]"></span>
              <span>VERIFIED MEASURED METRICS</span>
            </div>
            <h2 className="font-syne text-4xl md:text-6xl font-extrabold text-white uppercase tracking-tight">
              PERFORMANCE DASHBOARD
            </h2>
          </div>

          <div className="bg-[#ccff00]/10 border border-[#ccff00]/30 px-4 py-2 text-xs text-[#ccff00] font-bold tracking-widest uppercase">
            {performanceMetrics.tagline}
          </div>
        </div>

        {/* 4 Score Dial Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {scores.map((score, index) => {
            const Icon = score.icon;

            return (
              <motion.div
                key={score.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-[#0f0f13] border border-white/15 p-6 rounded-sm space-y-4 text-center group hover:border-white/40 transition-colors"
              >
                <div className="flex justify-center">
                  <div className={`p-3 rounded-full border ${score.border} bg-white/5`}>
                    <Icon size={24} className={score.color} />
                  </div>
                </div>

                <div>
                  <div className={`font-syne text-5xl md:text-6xl font-extrabold ${score.color}`}>
                    {score.value}
                  </div>
                  <div className="text-xs text-slate-300 uppercase tracking-wider mt-1 font-bold">
                    {score.label}
                  </div>
                </div>

                <div className="text-[10px] text-slate-500 uppercase tracking-widest pt-2 border-t border-white/10">
                  VERIFIED AUDIT // 100%
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Real-world Speed Index Specs */}
        <div className="bg-[#0f0f13] border border-white/15 p-6 rounded-sm flex flex-wrap justify-between items-center text-xs gap-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 size={18} className="text-[#ccff00]" />
            <span className="text-white font-bold">SPEED INDEX: {performanceMetrics.speedIndex}</span>
          </div>

          <div className="flex items-center gap-3">
            <CheckCircle2 size={18} className="text-purple-400" />
            <span className="text-white font-bold">FIRST CONTENTFUL PAINT: {performanceMetrics.firstContentfulPaint}</span>
          </div>

          <div className="text-slate-400">
            HOSTED ON VERCEL // DOMAIN: <strong className="text-[#ccff00]">REUBG.IN</strong>
          </div>
        </div>

      </div>
    </section>
  );
}
