import React from 'react';
import { motion } from 'framer-motion';
import { Bot, ArrowRight } from 'lucide-react';

export default function AiLab() {
  return (
    <section id="ailab" className="py-28 px-6 md:px-12 bg-[#0A0A0A] text-white relative border-t border-white/10 font-mono">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Vertical Tag */}
        <div className="hidden lg:flex lg:col-span-1 flex-col items-center justify-start h-full">
          <div className="font-mono text-4xl font-extrabold text-[#8B6DFF]">08</div>
          <div className="vertical-tag font-mono text-xs text-slate-400 uppercase tracking-[0.3em] font-bold mt-6">
            AI LAB
          </div>
        </div>

        {/* Text Details */}
        <div className="lg:col-span-6 space-y-6">
          <div className="text-xs text-[#8B6DFF] font-bold uppercase tracking-widest flex items-center gap-2">
            <Bot size={16} />
            <span>INTELLIGENT SYSTEMS</span>
          </div>

          <h2 className="font-syne text-4xl sm:text-6xl font-extrabold text-white uppercase tracking-tight">
            AI / ML PROJECTS
          </h2>

          <p className="font-sans text-slate-300 text-base leading-relaxed">
            Exploring machine learning and AI to build intelligent algorithms and impactful data classification models using Python, Scikit-Learn, and cross-validated ensemble models.
          </p>

          <div className="pt-2">
            <a href="#projects" className="btn-editorial-purple flex items-center gap-3 inline-flex">
              <span>EXPLORE AI PROJECTS</span>
              <ArrowRight size={16} />
            </a>
          </div>
        </div>

        {/* Visual Box (Matching Neural Network Graphic from Reference) */}
        <div className="lg:col-span-5 relative">
          <div className="border border-white/20 p-2 bg-[#141414]">
            <img
              src="https://cdn.pixabay.com/photo/2018/05/08/08/44/artificial-intelligence-3382507_1280.jpg"
              alt="AI ML Lab Network"
              className="w-full h-[360px] object-cover filter contrast-125 brightness-90"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
