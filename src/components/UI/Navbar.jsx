import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Eye, Code2, Menu, X, FileText } from 'lucide-react';
import { personalData } from '../../data/portfolioData';

export default function Navbar({ engineerMode, setEngineerMode, onOpenResume }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ['hero', 'about', 'domains', 'projects', 'architecture', 'journey', 'skills', 'experience', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero', id: 'hero' },
    { name: 'Profile', href: '#domains', id: 'domains' },
    { name: 'Works', href: '#projects', id: 'projects' },
    { name: 'Architecture', href: '#architecture', id: 'architecture' },
    { name: 'Journey', href: '#journey', id: 'journey' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Experience', href: '#experience', id: 'experience' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#050507]/90 backdrop-blur-md border-b border-white/10 py-3 shadow-xl' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a href="#hero" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-sm bg-[#0f0f13] border border-white/20 flex items-center justify-center group-hover:border-[#ccff00] transition-colors">
            <span className="font-syne font-extrabold text-[#ccff00] text-sm">RB</span>
          </div>
          <span className="font-syne font-bold text-xl tracking-tight text-white group-hover:text-[#ccff00] transition-colors">
            reub<span className="text-[#ccff00]">g</span>
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`font-mono text-xs uppercase tracking-wider transition-all duration-200 relative ${
                activeSection === link.id ? 'text-[#ccff00] font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              {link.name}
              {activeSection === link.id && (
                <motion.span
                  layoutId="activeIndicator"
                  className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#ccff00]"
                />
              )}
            </a>
          ))}
        </nav>

        {/* Mode Toggle & Resume CTA */}
        <div className="hidden sm:flex items-center gap-4">
          {/* Design / Engineer Mode Toggle */}
          <button
            onClick={() => setEngineerMode(!engineerMode)}
            className={`flex items-center gap-2 px-3 py-1.5 border font-mono text-xs tracking-wider rounded-sm transition-all duration-300 ${
              engineerMode
                ? 'bg-[#ccff00]/10 border-[#ccff00] text-[#ccff00] shadow-[0_0_12px_rgba(204,255,0,0.3)]'
                : 'bg-white/5 border-white/20 text-slate-300 hover:border-white/40'
            }`}
            title="Toggle between Visual Design view and Deep Technical Specs"
          >
            {engineerMode ? (
              <>
                <Terminal size={14} className="animate-pulse" />
                <span>ENGINEER MODE</span>
              </>
            ) : (
              <>
                <Eye size={14} />
                <span>DESIGN MODE</span>
              </>
            )}
          </button>

          {/* Interactive Resume Button */}
          <button
            onClick={onOpenResume}
            className="flex items-center gap-2 bg-[#ccff00] text-black font-mono font-bold text-xs px-4 py-1.5 rounded-sm hover:bg-[#b8ff00] transition-colors shadow-md active:scale-95"
          >
            <FileText size={14} />
            <span>RESUME</span>
          </button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-slate-300 hover:text-white"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#09090b] border-b border-white/10 px-6 py-6 font-mono"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm uppercase tracking-widest ${
                    activeSection === link.id ? 'text-[#ccff00] font-bold' : 'text-slate-300'
                  }`}
                >
                  {link.name}
                </a>
              ))}

              <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
                <button
                  onClick={() => {
                    setEngineerMode(!engineerMode);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center justify-center gap-2 py-2 border font-mono text-xs tracking-wider rounded-sm ${
                    engineerMode
                      ? 'bg-[#ccff00]/10 border-[#ccff00] text-[#ccff00]'
                      : 'bg-white/5 border-white/20 text-slate-300'
                  }`}
                >
                  {engineerMode ? <Terminal size={14} /> : <Eye size={14} />}
                  <span>{engineerMode ? 'ENGINEER MODE (ACTIVE)' : 'SWITCH TO ENGINEER MODE'}</span>
                </button>

                <button
                  onClick={() => {
                    onOpenResume();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 bg-[#ccff00] text-black font-mono font-bold text-xs py-2 rounded-sm"
                >
                  <FileText size={14} />
                  <span>VIEW INTERACTIVE RESUME</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
