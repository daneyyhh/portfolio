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
    <section id="contact" className="py-28 px-6 md:px-12 bg-[#0A0A0A] text-white relative border-t border-white/10 font-mono">
      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* Editorial Contact Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="hidden lg:flex lg:col-span-1">
            <span className="font-mono text-4xl font-extrabold text-[#8B6DFF]">10</span>
          </div>

          <div className="lg:col-span-11 space-y-2">
            <div className="text-xs text-[#8B6DFF] font-bold uppercase tracking-widest">
              LET'S CONNECT
            </div>

            <div className="space-y-4">
              <h2 className="font-syne text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white uppercase tracking-tight leading-none">
                LET'S BUILD<br />
                SOMETHING AMAZING<span className="text-[#8B6DFF]">.</span>
              </h2>

              <div className="pt-2">
                <ReubgLogo className="w-[180px] h-auto" />
              </div>
            </div>

            <p className="font-sans text-slate-300 text-base max-w-lg pt-2">
              Have a project in mind or just want to say hi? Let's connect!
            </p>
          </div>
        </div>

        {/* Contact Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-4">
          
          {/* Left Info Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-4 text-xs">
              <a
                href={`mailto:${personalData.email}`}
                className="flex items-center gap-4 p-4 bg-[#141414] border border-white/10 hover:border-[#8B6DFF] transition-colors group"
              >
                <div className="p-3 bg-[#8B6DFF]/10 text-[#8B6DFF] border border-[#8B6DFF]/30">
                  <Mail size={18} />
                </div>
                <div>
                  <div className="text-slate-400">PRIMARY EMAIL:</div>
                  <div className="text-white font-bold text-sm group-hover:text-[#8B6DFF]">{personalData.email}</div>
                </div>
              </a>

              <a
                href={`mailto:${personalData.altEmail}`}
                className="flex items-center gap-4 p-4 bg-[#141414] border border-white/10 hover:border-[#8B6DFF] transition-colors group"
              >
                <div className="p-3 bg-white/5 text-slate-300 border border-white/10">
                  <Mail size={18} />
                </div>
                <div>
                  <div className="text-slate-400">DIRECT EMAIL:</div>
                  <div className="text-white font-bold text-sm group-hover:text-[#8B6DFF]">{personalData.altEmail}</div>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 bg-[#141414] border border-white/10">
                <div className="p-3 bg-white/5 text-slate-300 border border-white/10">
                  <MapPin size={18} />
                </div>
                <div>
                  <div className="text-slate-400">LOCATION & DOMAIN:</div>
                  <div className="text-white font-bold text-sm">{personalData.location} // <span className="text-[#8B6DFF]">REUBG.IN</span></div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-2">
              <a href={personalData.github} target="_blank" rel="noreferrer" className="p-3 bg-[#141414] border border-white/15 text-white hover:border-[#8B6DFF] hover:text-[#8B6DFF]">
                <Github size={20} />
              </a>
              <a href={personalData.linkedin} target="_blank" rel="noreferrer" className="p-3 bg-[#141414] border border-white/15 text-white hover:border-[#8B6DFF] hover:text-[#8B6DFF]">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Right Direct Message Form */}
          <div className="lg:col-span-7 bg-[#141414] border border-white/15 p-8">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                <CheckCircle2 size={48} className="text-[#8B6DFF] animate-bounce" />
                <h3 className="font-syne text-2xl font-bold text-white uppercase">MESSAGE SENT</h3>
                <p className="text-xs text-slate-300">
                  Thank you for reaching out! Reuben will get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 text-xs">
                <div className="border-b border-white/10 pb-4 font-bold text-sm text-white">
                  TRANSMIT DIRECT INQUIRY
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 block">YOUR NAME:</label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="Enter your full name"
                    className="w-full bg-[#0A0A0A] border border-white/10 p-3 text-white focus:border-[#8B6DFF] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 block">YOUR EMAIL:</label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="Enter your email address"
                    className="w-full bg-[#0A0A0A] border border-white/10 p-3 text-white focus:border-[#8B6DFF] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 block">MESSAGE:</label>
                  <textarea
                    rows="4"
                    required
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Project details, opportunities, or feedback..."
                    className="w-full bg-[#0A0A0A] border border-white/10 p-3 text-white focus:border-[#8B6DFF] focus:outline-none"
                  />
                </div>

                <button type="submit" className="btn-editorial-purple w-full flex items-center justify-center gap-2">
                  <Send size={16} />
                  <span>SEND TRANSMISSION</span>
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <ReubgLogo className="w-[120px] h-auto" />
          <div>© {new Date().getFullYear()} REUBEN BINU GEORGE. ALL RIGHTS RESERVED.</div>
          <a href="#hero" className="hover:text-white uppercase font-bold">BACK TO TOP ↑</a>
        </div>

      </div>
    </section>
  );
}
