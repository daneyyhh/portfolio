import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, MapPin, Send, CheckCircle2, Copy, Check } from 'lucide-react';
import { personalData } from '../../data/portfolioData';
import ReubgLogo from '../UI/ReubgLogo';

export default function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

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
    <section id="contact" className="min-h-[100svh] scroll-snap-start py-20 sm:py-24 px-4 sm:px-6 md:px-12 bg-[#0A0A0A] text-white relative border-t border-white/10 font-mono w-full overflow-x-clip flex flex-col justify-between">
      <div className="max-w-7xl mx-auto space-y-10 sm:space-y-14 relative z-10 w-full">
        
        {/* Editorial Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start w-full border-b border-white/10 pb-6 sm:pb-8">
          <div className="hidden lg:flex lg:col-span-1">
            <span className="font-mono text-4xl font-extrabold text-[#8B6DFF]">07</span>
          </div>

          <div className="lg:col-span-11 space-y-3 w-full max-w-full">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#8B6DFF] animate-pulse shadow-[0_0_8px_#8B6DFF]" />
              <span className="text-xs text-[#8B6DFF] font-bold uppercase tracking-widest">
                LET'S CONNECT
              </span>
            </div>

            <div className="space-y-3 w-full max-w-full">
              <h2
                className="font-syne font-extrabold text-white uppercase tracking-tight leading-none w-full max-w-full"
                style={{
                  fontSize: 'clamp(2rem, 7vw, 4.5rem)',
                  letterSpacing: 'clamp(-0.03em, -0.2vw, -0.01em)',
                }}
              >
                <span className="block">LET'S BUILD</span>
                <span className="block">SOMETHING</span>
                <span className="block">AMAZING<span className="text-[#8B6DFF]">.</span></span>
              </h2>
            </div>
          </div>
        </div>

        {/* 2-Column Redesigned Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 w-full items-start">
          
          {/* Left Column: Direct Contact & Social Cards */}
          <div className="lg:col-span-5 space-y-6 w-full">
            
            {/* Primary Email Card */}
            <div className="bg-[#141414] border border-[#8B6DFF]/30 p-5 sm:p-6 shadow-xl space-y-3 group hover:border-[#8B6DFF] transition-all">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-[#8B6DFF] font-bold tracking-widest uppercase">
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
                <div className="p-3 bg-[#8B6DFF]/15 text-[#8B6DFF] border border-[#8B6DFF]/40 shrink-0">
                  <Mail size={20} />
                </div>
                <div className="overflow-hidden">
                  <div className="text-slate-400 text-[10px] font-mono uppercase">DIRECT MAIL</div>
                  <div className="text-white font-bold text-sm sm:text-base group-hover:text-[#8B6DFF] transition-colors truncate">
                    {personalData.email}
                  </div>
                </div>
              </a>
            </div>

            {/* Location & Status Card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              <div className="bg-[#141414] border border-white/10 p-4 space-y-1">
                <div className="flex items-center gap-2 text-[#8B6DFF] text-[10px] font-bold uppercase tracking-wider">
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
            </div>

            {/* Online Profiles Card */}
            <div className="bg-[#141414] border border-white/10 p-5 space-y-3">
              <div className="text-[10px] text-[#8B6DFF] font-bold uppercase tracking-widest">
                ONLINE PROFILES
              </div>
              <div className="flex flex-wrap gap-2">
                <a
                  href={personalData.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 px-4 py-2.5 bg-[#0A0A0A] border border-white/15 text-slate-200 hover:text-white hover:border-[#8B6DFF] transition-all text-xs font-bold font-mono group"
                >
                  <Github size={16} className="text-[#8B6DFF] group-hover:scale-110 transition-transform" />
                  <span>GITHUB PROFILE</span>
                </a>
              </div>
            </div>

            {/* Brand Logo Accent */}
            <div className="pt-2">
              <ReubgLogo variant="dark" className="w-[130px] sm:w-[160px] h-auto opacity-80" />
            </div>

          </div>

          {/* Right Column: High-Impact Contact Form */}
          <div className="lg:col-span-7 w-full">
            <form onSubmit={handleSubmit} className="bg-[#141414] border border-white/10 p-6 sm:p-8 space-y-5 sm:space-y-6 w-full shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-xs text-[#8B6DFF] font-bold uppercase tracking-widest font-mono">
                  SEND A MESSAGE
                </span>
                <span className="text-[10px] text-white/40 font-mono">
                  [ DIRECT DISPATCH ]
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                <div className="space-y-1.5 w-full">
                  <label className="text-[10px] text-slate-400 uppercase tracking-wider block font-mono">YOUR NAME *</label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full bg-[#0A0A0A] border border-white/15 px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs text-white focus:border-[#8B6DFF] focus:outline-none transition-colors"
                    placeholder="John Doe"
                  />
                </div>

                <div className="space-y-1.5 w-full">
                  <label className="text-[10px] text-slate-400 uppercase tracking-wider block font-mono">YOUR EMAIL *</label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full bg-[#0A0A0A] border border-white/15 px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs text-white focus:border-[#8B6DFF] focus:outline-none transition-colors"
                    placeholder="name@domain.com"
                  />
                </div>
              </div>

              <div className="space-y-1.5 w-full">
                <label className="text-[10px] text-slate-400 uppercase tracking-wider block font-mono">PROJECT DETAILS / MESSAGE *</label>
                <textarea
                  required
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="w-full bg-[#0A0A0A] border border-white/15 px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs text-white focus:border-[#8B6DFF] focus:outline-none transition-colors resize-none"
                  placeholder="Tell me about your project, timeline, or opportunity..."
                />
              </div>

              <button
                type="submit"
                disabled={submitted}
                className="w-full btn-editorial-purple flex items-center justify-center gap-2 py-3 cursor-pointer"
              >
                {submitted ? (
                  <>
                    <CheckCircle2 size={16} className="text-green-400" />
                    <span>MESSAGE TRANSMITTED</span>
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    <span>SEND MESSAGE</span>
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

        {/* Footer Copyright */}
        <div className="border-t border-white/10 pt-4 flex flex-col sm:flex-row items-center justify-between text-[10px] text-white/40 font-mono gap-2">
          <span>© {new Date().getFullYear()} REUBEN BINU GEORGE (REUBG). ALL RIGHTS RESERVED.</span>
          <span>DESIGNED & ENGINEERED WITH REACT + THREE.JS</span>
        </div>

      </div>
    </section>
  );
}
