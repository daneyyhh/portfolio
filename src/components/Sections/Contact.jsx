import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { personalData } from '../../data/portfolioData';
import ReubgLogo from '../UI/ReubgLogo';

export default function Contact({ engineerMode }) {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormState({ name: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="min-h-[100svh] scroll-snap-start py-20 sm:py-24 px-4 sm:px-6 md:px-12 bg-[#0A0A0A] text-white relative border-t border-white/10 font-mono w-full overflow-x-clip flex flex-col justify-between">
      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16 relative z-10 w-full">
        
        {/* Editorial Contact Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start w-full">
          <div className="hidden lg:flex lg:col-span-1">
            <span className="font-mono text-4xl font-extrabold text-[#8B6DFF]">10</span>
          </div>

          <div className="lg:col-span-11 space-y-2 w-full max-w-full">
            <div className="text-xs text-[#8B6DFF] font-bold uppercase tracking-widest">
              LET'S CONNECT
            </div>

            <div className="space-y-4 w-full max-w-full">
              <h2
                className="font-syne font-extrabold text-white uppercase tracking-tight leading-none w-full max-w-full"
                style={{
                  fontSize: 'clamp(1.85rem, 7vw, 4.5rem)',
                  letterSpacing: 'clamp(-0.03em, -0.2vw, -0.01em)',
                }}
              >
                <span className="block">LET'S BUILD</span>
                <span className="block">SOMETHING</span>
                <span className="block">AMAZING<span className="text-[#8B6DFF]">.</span></span>
              </h2>

              <div className="pt-2">
                <ReubgLogo variant="dark" className="w-[140px] sm:w-[180px] h-auto" />
              </div>
            </div>

            <p className="font-sans text-slate-300 text-sm sm:text-base max-w-lg pt-2">
              Have a project in mind or just want to say hi? Let's connect!
            </p>
          </div>
        </div>

        {/* Contact Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-4 w-full">
          
          {/* Left Info Column */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-6 w-full">
            <div className="space-y-3 sm:space-y-4 text-xs w-full">
              <a
                href={`mailto:${personalData.email}`}
                className="flex items-center gap-3 sm:gap-4 p-3.5 sm:p-4 bg-[#141414] border border-white/10 hover:border-[#8B6DFF] transition-colors group w-full"
              >
                <div className="p-2.5 sm:p-3 bg-[#8B6DFF]/10 text-[#8B6DFF] border border-[#8B6DFF]/30 shrink-0">
                  <Mail size={16} />
                </div>
                <div className="overflow-hidden">
                  <div className="text-slate-400 text-[10px]">PRIMARY EMAIL:</div>
                  <div className="text-white font-bold text-xs sm:text-sm group-hover:text-[#8B6DFF] truncate">{personalData.email}</div>
                </div>
              </a>

              <a
                href={`mailto:${personalData.altEmail}`}
                className="flex items-center gap-3 sm:gap-4 p-3.5 sm:p-4 bg-[#141414] border border-white/10 hover:border-[#8B6DFF] transition-colors group w-full"
              >
                <div className="p-2.5 sm:p-3 bg-[#8B6DFF]/10 text-[#8B6DFF] border border-[#8B6DFF]/30 shrink-0">
                  <Mail size={16} />
                </div>
                <div className="overflow-hidden">
                  <div className="text-slate-400 text-[10px]">ALT EMAIL:</div>
                  <div className="text-white font-bold text-xs sm:text-sm group-hover:text-[#8B6DFF] truncate">{personalData.altEmail}</div>
                </div>
              </a>

              <div className="flex items-center gap-3 sm:gap-4 p-3.5 sm:p-4 bg-[#141414] border border-white/10 w-full">
                <div className="p-2.5 sm:p-3 bg-[#8B6DFF]/10 text-[#8B6DFF] border border-[#8B6DFF]/30 shrink-0">
                  <MapPin size={16} />
                </div>
                <div>
                  <div className="text-slate-400 text-[10px]">LOCATION:</div>
                  <div className="text-white font-bold text-xs sm:text-sm">{personalData.location}</div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-2">
              <div className="text-[10px] text-[#8B6DFF] font-bold uppercase tracking-widest mb-3">
                ONLINE PROFILES
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: 'GITHUB', icon: Github, url: personalData.github },
                  { name: 'LINKEDIN', icon: Linkedin, url: personalData.linkedin },
                ].map((s) => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={s.name}
                      href={s.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-[#141414] border border-white/10 text-slate-300 hover:text-white hover:border-[#8B6DFF] transition-colors text-xs"
                    >
                      <Icon size={14} />
                      <span>{s.name}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7 w-full">
            <form onSubmit={handleSubmit} className="bg-[#141414] border border-white/10 p-5 sm:p-8 space-y-4 sm:space-y-6 w-full max-w-full">
              <div className="text-xs text-[#8B6DFF] font-bold uppercase tracking-widest border-b border-white/10 pb-3">
                SEND A MESSAGE
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                <div className="space-y-1 w-full">
                  <label className="text-[10px] text-slate-400 uppercase tracking-wider block">NAME *</label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full bg-[#0A0A0A] border border-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-xs text-white focus:border-[#8B6DFF] focus:outline-none transition-colors"
                    placeholder="Your Name"
                  />
                </div>

                <div className="space-y-1 w-full">
                  <label className="text-[10px] text-slate-400 uppercase tracking-wider block">EMAIL *</label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full bg-[#0A0A0A] border border-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-xs text-white focus:border-[#8B6DFF] focus:outline-none transition-colors"
                    placeholder="name@domain.com"
                  />
                </div>
              </div>

              <div className="space-y-1 w-full">
                <label className="text-[10px] text-slate-400 uppercase tracking-wider block">MESSAGE *</label>
                <textarea
                  required
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="w-full bg-[#0A0A0A] border border-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-xs text-white focus:border-[#8B6DFF] focus:outline-none transition-colors resize-none"
                  placeholder="Tell me about your project, ideas, or opportunity..."
                />
              </div>

              <button
                type="submit"
                disabled={submitted}
                className="w-full btn-editorial-purple flex items-center justify-center gap-2"
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

      </div>
    </section>
  );
}
