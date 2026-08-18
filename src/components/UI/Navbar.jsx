import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Eye, Terminal, FileText } from 'lucide-react';

export default function Navbar({ engineerMode, setEngineerMode, onOpenResume }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = ['hero', 'introduction', 'about', 'process', 'projects', 'skills', 'gamelab', 'ailab', 'contact'];
      for (const sId of sections) {
        const el = document.getElementById(sId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 250 && rect.bottom >= 250) {
            setActiveSection(sId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { num: '01', name: 'HOME', href: '#hero', id: 'hero' },
    { num: '02', name: 'ABOUT', href: '#introduction', id: 'introduction' },
    { num: '03', name: 'WORK', href: '#projects', id: 'projects' },
    { num: '04', name: 'PROCESS', href: '#process', id: 'process' },
    { num: '05', name: 'CONTACT', href: '#contact', id: 'contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#F1F0EB]/90 backdrop-blur-md border-b border-[#C9C7C0] py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between font-mono">
        
        {/* Brand Logo */}
        <a href="#hero" className="flex items-center gap-2 group">
          <span className="font-syne font-extrabold text-2xl tracking-tighter text-[#111111] group-hover:text-[#8B6DFF] transition-colors uppercase">
            reub<span className="text-[#8B6DFF]">g</span>
          </span>
        </a>

        {/* Desktop Editorial Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-xs font-bold tracking-wider">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`transition-colors duration-200 flex items-center gap-1.5 ${
                activeSection === link.id ? 'text-[#8B6DFF]' : 'text-[#111111] hover:text-[#8B6DFF]'
              }`}
            >
              <span className="text-[10px] text-[#555555] font-normal">{link.num}.</span>
              <span>{link.name}</span>
            </a>
          ))}
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden sm:flex items-center gap-4">
          <button
            onClick={() => setEngineerMode(!engineerMode)}
            className={`px-3 py-1.5 border text-xs tracking-wider rounded-none transition-all flex items-center gap-1.5 ${
              engineerMode
                ? 'bg-[#111111] border-[#111111] text-[#8B6DFF]'
                : 'bg-transparent border-[#111111] text-[#111111] hover:border-[#8B6DFF] hover:text-[#8B6DFF]'
            }`}
            title="Toggle Design / Engineer Mode"
          >
            {engineerMode ? <Terminal size={14} /> : <Eye size={14} />}
            <span>{engineerMode ? 'ENGINEER' : 'DESIGN'}</span>
          </button>

          <button
            onClick={onOpenResume}
            className="btn-editorial-purple py-1.5 px-4 text-xs"
          >
            RESUME
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-[#111111] hover:text-[#8B6DFF]"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#F1F0EB] border-b border-[#C9C7C0] px-6 py-6 font-mono"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm tracking-widest flex items-center gap-2 ${
                    activeSection === link.id ? 'text-[#8B6DFF] font-bold' : 'text-[#111111]'
                  }`}
                >
                  <span className="text-xs text-[#555555]">{link.num}.</span>
                  <span>{link.name}</span>
                </a>
              ))}

              <div className="pt-4 border-t border-[#C9C7C0] flex flex-col gap-2">
                <button
                  onClick={() => {
                    setEngineerMode(!engineerMode);
                    setMobileMenuOpen(false);
                  }}
                  className="btn-editorial-outline py-2 text-xs"
                >
                  TOGGLE {engineerMode ? 'DESIGN' : 'ENGINEER'} MODE
                </button>
                <button
                  onClick={() => {
                    onOpenResume();
                    setMobileMenuOpen(false);
                  }}
                  className="btn-editorial-purple py-2 text-xs"
                >
                  VIEW RESUME
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
