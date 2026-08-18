import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Target, Layout, Code2, Rocket, ShieldCheck, RefreshCw, ArrowRight } from 'lucide-react';

export default function ProcessSection() {
  const [activeStage, setActiveStage] = useState(0);

  const processSteps = [
    { num: "01", name: "DISCOVER", icon: Search, desc: "Understanding the problem and research. User needs, business requirements, and constraints." },
    { num: "02", name: "DEFINE", icon: Target, desc: "Defining goals and planning the solution. Technical architecture and scope definition." },
    { num: "03", name: "DESIGN", icon: Layout, desc: "Designing clean and intuitive experiences. High-fidelity wireframes, UI/UX, and component systems." },
    { num: "04", name: "BUILD", icon: Code2, desc: "Writing clear code and building the product. Frontend, backend APIs, and database integrations." },
    { num: "05", name: "DEPLOY", icon: Rocket, desc: "Testing, deploying and delivering real impact. Production infrastructure and CI/CD." },
    { num: "06", name: "TEST", icon: ShieldCheck, desc: "Performance tuning, unit testing, browser compatibility, and security audits." },
    { num: "07", name: "ITERATE", icon: RefreshCw, desc: "Continuous improvement based on real analytics, user feedback, and metric logs." },
  ];

  return (
    <section id="process" className="py-28 px-6 md:px-12 bg-[#F1F0EB] text-[#111111] relative border-t border-[#C9C7C0] font-mono">
      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end border-b border-[#C9C7C0] pb-8">
          <div className="hidden lg:flex lg:col-span-1">
            <span className="font-mono text-4xl font-extrabold text-[#111111]">03</span>
          </div>

          <div className="lg:col-span-7">
            <div className="text-xs text-[#8B6DFF] font-bold uppercase tracking-widest mb-1">
              ENGINEERING METHODOLOGY
            </div>
            <h2 className="font-syne text-4xl md:text-6xl font-extrabold text-[#111111] uppercase tracking-tight">
              MY PROCESS
            </h2>
            <p className="font-sans text-slate-700 text-sm mt-2 max-w-lg">
              Turning ideas into powerful digital solutions through structured technical execution.
            </p>
          </div>

          <div className="lg:col-span-4 flex justify-end">
            <a href="#projects" className="btn-editorial flex items-center gap-2">
              <span>VIEW FULL PROCESS</span>
              <ArrowRight size={16} />
            </a>
          </div>
        </div>

        {/* Process Timeline Stepper Row (Matching Reference) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {processSteps.map((step, idx) => {
            const Icon = step.icon;
            const isActive = activeStage === idx;

            return (
              <button
                key={step.num}
                onClick={() => setActiveStage(idx)}
                className={`p-4 border font-mono text-left transition-all duration-300 ${
                  isActive
                    ? 'bg-[#111111] text-white border-[#111111] shadow-lg'
                    : 'bg-[#FAF9F5] border-[#C9C7C0] text-[#111111] hover:border-[#8B6DFF]'
                }`}
              >
                <div className="flex justify-between items-center text-xs mb-3">
                  <span className={`font-bold ${isActive ? 'text-[#8B6DFF]' : 'text-[#555555]'}`}>{step.num}</span>
                  <Icon size={16} className={isActive ? 'text-[#8B6DFF]' : 'text-[#111111]'} />
                </div>
                <div className="font-syne font-bold text-xs uppercase tracking-tight">
                  {step.name}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Stage Detailed Card */}
        <motion.div
          key={activeStage}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-[#FAF9F5] border-2 border-[#111111] p-8 rounded-none space-y-4 shadow-xl"
        >
          <div className="flex justify-between items-center border-b border-[#C9C7C0] pb-4">
            <div className="flex items-center gap-3">
              <span className="font-mono text-3xl font-extrabold text-[#8B6DFF]">
                STAGE {processSteps[activeStage].num}
              </span>
              <h3 className="font-syne text-2xl font-bold text-[#111111] uppercase">
                {processSteps[activeStage].name}
              </h3>
            </div>
          </div>

          <p className="font-sans text-slate-800 text-base leading-relaxed max-w-3xl">
            {processSteps[activeStage].desc}
          </p>
        </motion.div>

      </div>
    </section>
  );
}
