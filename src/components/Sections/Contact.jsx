import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Mail, Github, MapPin, Send, CheckCircle2, Copy, Check } from 'lucide-react';
import { personalData } from '../../data/portfolioData';
import ReubgLogo from '../UI/ReubgLogo';
import { MaskHeading, FadeInUp } from '../UI/TextReveal';

const EASE = [0.16, 1, 0.3, 1];

export default function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const prefersReduced = useReducedMotion();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormState({ name: '', email: '', message: '' });
    }, 4000);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="min-h-[100svh] py-20 sm:py-24 px-4 sm:px-6 md:px-12 bg-[#0A0A0A] text-white relative border-t border-white/10 font-mono w-full overflow-x-clip flex flex-col justify-between">
      <div className="max-w-7xl mx-auto space-y-10 sm:space-y-14 relative z-10 w-full">
        
        {/* Editorial Section Header with Masked Text Reveal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start w-full border-b border-white/10 pb-6 sm:pb-8">
          <div className="hidden lg:flex lg:col-span-1">
            <motion.span
              initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 0.6, ease: EASE }}
              className="font-mono text-4xl font-extrabold text-[#FF1E27]"
            >
              07
            </motion.span>
          </div>

          <div className="lg:col-span-11 space-y-3 w-full max-w-full">
            <motion.div
              initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 0.6, ease: EASE }}
              className="flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-[#FF1E27] animate-pulse shadow-[0_0_8px_#FF1E27]" />
              <span className="text-xs text-[#FF1E27] font-bold uppercase tracking-widest">
                LET'S CONNECT
              </span>
            </motion.div>

            <div className="space-y-3 w-full max-w-full">
              <h2
                className="font-syne font-extrabold text-white uppercase tracking-tight leading-none w-full max-w-full"
                style={{
                  fontSize: 'clamp(2rem, 7vw, 4.5rem)',
                  letterSpacing: 'clamp(-0.03em, -0.2vw, -0.01em)',
                }}
              >
                {["LET'S BUILD", "SOMETHING", "AMAZING"].map((line, idx) => (
                  <span key={line} className="block overflow-hidden py-[0.04em] -my-[0.04em]">
                    <motion.span
                      className="block will-change-transform"
                      initial={prefersReduced ? { opacity: 0 } : { y: "110%", opacity: 0 }}
                      whileInView={{ y: "0%", opacity: 1 }}
                      viewport={{ once: true, margin: "-8% 0px" }}
                      transition={{ duration: prefersReduced ? 0.3 : 0.85, delay: prefersReduced ? 0 : 0.15 + idx * 0.08, ease: EASE }}
                    >
                      {line}
                      {idx === 2 && <span className="text-[#FF1E27]">.</span>}
                    </motion.span>
                  </span>
                ))}
              </h2>
            </div>
          </div>
        </div>

        {/* 2-Column Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 w-full items-start">
          
          {/* Left Column: Direct Contact & Social Cards */}
          <div className="lg:col-span-5 space-y-6 w-full">
            
            {/* Primary Email Card */}
            <FadeInUp delay={0.2} yOffset={20}>
              <div className="bg-[#141414] border border-[#FF1E27]/30 p-5 sm:p-6 shadow-xl space-y-3 group hover:border-[#FF1E27] transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#FF1E27] font-bold tracking-widest uppercase">
                    PRIMARY EMAIL
                  </span>
                  <button
                    onClick={handleCopyEmail}
                    className="flex items-center gap-1 text-[10px] text-white/50 hover:text-white transition-colors cursor-pointer bg-white/5 px-2 py-1 border border-white/10"
                  >
                    {copied ? (
                      <>
                        <Check size={12} className="text-green-400" />
                        <span className="text-green-400 font-bold">COPIED</span>
                      </>
                    ) : (
                      <>
                        <Copy size={12} />
                        <span>COPY</span>
                      </>
                    )}
                  </button>
                </div>

                <a
                  href={`mailto:${personalData.email}`}
                  className="flex items-center gap-3 sm:gap-4 pt-1 group"
                >
                  <div className="p-3 bg-[#FF1E27]/15 text-[#FF1E27] border border-[#FF1E27]/40 shrink-0">
                    <Mail size={20} />
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-slate-400 text-[10px] font-mono uppercase">DIRECT MAIL</div>
                    <div className="text-white font-bold text-sm sm:text-base group-hover:text-[#FF1E27] transition-colors truncate">
                      {personalData.email}
                    </div>
                  </div>
                </a>
              </div>
            </FadeInUp>

            {/* Location & Status Card */}
            <FadeInUp delay={0.3} yOffset={20} className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              <div className="bg-[#141414] border border-white/10 p-4 space-y-1">
                <div className="flex items-center gap-2 text-[#FF1E27] text-[10px] font-bold uppercase tracking-wider">
                  <MapPin size={14} />
                  <span>LOCATION</span>
                </div>
                <div className="text-white font-bold text-xs sm:text-sm pt-0.5">{personalData.location}</div>
              </div>

              <div className="bg-[#141414] border border-white/10 p-4 space-y-1">
                <div className="flex items-center gap-2 text-green-400 text-[10px] font-bold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span>AVAILABILITY</span>
                </div>
                <div className="text-white font-bold text-xs sm:text-sm pt-0.5">{personalData.status}</div>
              </div>
            </FadeInUp>

            {/* Online Profiles Card */}
            <FadeInUp delay={0.4} yOffset={20} className="bg-[#141414] border border-white/10 p-5 space-y-3">
              <div className="text-[10px] text-[#FF1E27] font-bold uppercase tracking-widest">
                ONLINE PROFILES
              </div>
              <div className="flex flex-wrap gap-2">
                <a
                  href={personalData.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 px-4 py-2.5 bg-[#0A0A0A] border border-white/15 text-slate-200 hover:text-white hover:border-[#FF1E27] transition-all text-xs font-bold font-mono group"
                >
                  <Github size={16} className="text-[#FF1E27] group-hover:scale-110 transition-transform" />
                  <span>GITHUB PROFILE</span>
                </a>
              </div>
            </FadeInUp>

            {/* Brand Logo Accent */}
            <FadeInUp delay={0.5} yOffset={15} className="pt-2">
              <ReubgLogo variant="dark" className="w-[130px] sm:w-[160px] h-auto opacity-80" />
            </FadeInUp>

          </div>

          {/* Right Column: High-Impact Contact Form */}
          <FadeInUp delay={0.35} yOffset={25} className="lg:col-span-7 w-full">
            <form onSubmit={handleSubmit} className="bg-[#141414] border border-white/10 p-6 sm:p-8 space-y-5 sm:space-y-6 w-full shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-xs text-[#FF1E27] font-bold uppercase tracking-widest font-mono">
                  SEND A MESSAGE
                </span>
                <span className="text-[10px] text-white/40 font-mono">
                  [ DIRECT DISPATCH ]
                </span>
              </div>

              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-[#FF1E27]/15 border border-[#FF1E27] text-white text-xs flex items-center gap-3 font-mono"
                >
                  <CheckCircle2 size={16} className="text-[#FF1E27] shrink-0" />
                  <span>MESSAGE DISPATCHED. THANK YOU FOR REACHING OUT.</span>
                </motion.div>
              )}

              <div className="space-y-4 font-mono text-xs">
                <div>
                  <label className="block text-[10px] text-slate-400 uppercase tracking-wider mb-2 font-bold">
                    01 // YOUR NAME *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Satoshi Nakamoto"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full bg-[#0A0A0A] border border-white/15 px-4 py-3 text-white text-xs placeholder:text-white/20 focus:outline-none focus:border-[#FF1E27] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-slate-400 uppercase tracking-wider mb-2 font-bold">
                    02 // YOUR EMAIL *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. satoshi@bitcoin.org"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full bg-[#0A0A0A] border border-white/15 px-4 py-3 text-white text-xs placeholder:text-white/20 focus:outline-none focus:border-[#FF1E27] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-slate-400 uppercase tracking-wider mb-2 font-bold">
                    03 // PROJECT SCOPE / MESSAGE *
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Describe what you want to build, timelines, or general inquiries..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full bg-[#0A0A0A] border border-white/15 px-4 py-3 text-white text-xs placeholder:text-white/20 focus:outline-none focus:border-[#FF1E27] transition-colors resize-none"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="btn-editorial-red flex items-center gap-3 text-xs w-full sm:w-auto justify-center cursor-pointer"
                >
                  <span>DISPATCH MESSAGE</span>
                  <Send size={14} />
                </button>
              </div>
            </form>
          </FadeInUp>

        </div>

      </div>

      {/* Editorial Footer Strip */}
      <div className="max-w-7xl mx-auto w-full pt-16 mt-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] sm:text-xs text-slate-500 font-mono">
        <div>
          © {new Date().getFullYear()} REUBEN BINU GEORGE · ALL RIGHTS RESERVED
        </div>
        <div className="flex items-center gap-4">
          <span>PORTFOLIO V2.4</span>
          <span>•</span>
          <span>BUILT WITH REACT + THREE.JS</span>
        </div>
      </div>
    </section>
  );
}
