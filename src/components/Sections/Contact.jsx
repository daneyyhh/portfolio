import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, MapPin, Send, CheckCircle2, Globe } from 'lucide-react';
import { personalData } from '../../data/portfolioData';

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
    <section id="contact" className="py-24 px-6 md:px-12 bg-[#050507] relative overflow-hidden border-t border-white/10 font-mono">
      {/* Background Glow */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* Cinematic Headline CTA */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ccff00]/10 border border-[#ccff00]/30 text-[#ccff00] text-xs tracking-widest uppercase rounded-sm">
            <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-pulse"></span>
            <span>AVAILABLE FOR OPPORTUNITIES</span>
          </div>

          <h2 className="font-syne text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white uppercase tracking-tight leading-tight">
            LET'S BUILD SOMETHING <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ccff00] to-purple-400">
              EXTRAORDINARY.
            </span>
          </h2>
        </div>

        {/* Contact Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <h3 className="font-syne text-2xl font-bold text-white uppercase">CONNECT DIRECTLY</h3>
              <p className="font-sans text-sm text-slate-300 leading-relaxed">
                Whether you have a full-stack project, an AI/ML initiative, a 3D interactive application, or an engineering role, feel free to reach out.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              {/* Email */}
              <a
                href={`mailto:${personalData.email}`}
                className="flex items-center gap-4 p-4 bg-[#0f0f13] border border-white/10 rounded-sm hover:border-[#ccff00] transition-colors group"
              >
                <div className="p-2.5 bg-[#ccff00]/10 border border-[#ccff00]/30 text-[#ccff00] rounded-sm group-hover:bg-[#ccff00] group-hover:text-black transition-colors">
                  <Mail size={18} />
                </div>
                <div>
                  <div className="text-slate-400">PRIMARY EMAIL:</div>
                  <div className="text-white font-bold text-sm group-hover:text-[#ccff00]">{personalData.email}</div>
                </div>
              </a>

              {/* Alt Email */}
              <a
                href={`mailto:${personalData.altEmail}`}
                className="flex items-center gap-4 p-4 bg-[#0f0f13] border border-white/10 rounded-sm hover:border-purple-500 transition-colors group"
              >
                <div className="p-2.5 bg-purple-500/10 border border-purple-500/30 text-purple-400 rounded-sm group-hover:bg-purple-500 group-hover:text-white transition-colors">
                  <Mail size={18} />
                </div>
                <div>
                  <div className="text-slate-400">DIRECT EMAIL:</div>
                  <div className="text-white font-bold text-sm group-hover:text-purple-300">{personalData.altEmail}</div>
                </div>
              </a>

              {/* Location & Domain */}
              <div className="flex items-center gap-4 p-4 bg-[#0f0f13] border border-white/10 rounded-sm">
                <div className="p-2.5 bg-white/5 border border-white/10 text-slate-300 rounded-sm">
                  <MapPin size={18} />
                </div>
                <div>
                  <div className="text-slate-400">LOCATION & DOMAIN:</div>
                  <div className="text-white font-bold text-sm">{personalData.location} // <span className="text-[#ccff00]">{personalData.domain}</span></div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 pt-2">
              <a
                href={personalData.github}
                target="_blank"
                rel="noreferrer"
                className="p-3 bg-[#0f0f13] border border-white/15 text-white hover:border-[#ccff00] hover:text-[#ccff00] rounded-sm transition-colors"
                title="GitHub"
              >
                <Github size={20} />
              </a>

              <a
                href={personalData.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-3 bg-[#0f0f13] border border-white/15 text-white hover:border-purple-400 hover:text-purple-400 rounded-sm transition-colors"
                title="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-[#0f0f13] border border-white/15 p-8 rounded-sm">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                <CheckCircle2 size={48} className="text-[#ccff00] animate-bounce" />
                <h3 className="font-syne text-2xl font-bold text-white uppercase">MESSAGE RECEIVED</h3>
                <p className="text-xs text-slate-300 max-w-sm">
                  Thank you for reaching out! Reuben will review your inquiry and get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 text-xs">
                <div className="border-b border-white/10 pb-4">
                  <h3 className="font-syne text-xl font-bold text-white uppercase">SEND A DIRECT TRANSMISSION</h3>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 block">YOUR NAME:</label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="e.g. Alex Morgan"
                    className="w-full bg-[#050507] border border-white/10 p-3 text-white font-mono focus:border-[#ccff00] focus:outline-none rounded-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 block">YOUR EMAIL:</label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="e.g. alex@company.com"
                    className="w-full bg-[#050507] border border-white/10 p-3 text-white font-mono focus:border-[#ccff00] focus:outline-none rounded-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 block">PROJECT / INQUIRY DETAILS:</label>
                  <textarea
                    rows="4"
                    required
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Tell me about your project, timeline, or engineering opportunity..."
                    className="w-full bg-[#050507] border border-white/10 p-3 text-white font-mono focus:border-[#ccff00] focus:outline-none rounded-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-lime w-full flex items-center justify-center gap-2"
                >
                  <Send size={16} />
                  <span>TRANSMIT MESSAGE</span>
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Footer Copyright */}
        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <div>© {new Date().getFullYear()} REUBEN BINU GEORGE. ALL RIGHTS RESERVED.</div>
          <div className="text-[#ccff00]">DOMAIN: REUBG.IN</div>
        </div>

      </div>
    </section>
  );
}
