import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import ReubgLogo from './ReubgLogo';

export default function Navbar({ onOpenResume }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { num: '01', name: 'HOME', href: '#hero', id: 'home' },
    { num: '02', name: 'ABOUT', href: '#introduction', id: 'about' },
    { num: '03', name: 'PROCESS', href: '#process', id: 'process' },
    { num: '04', name: 'WORK', href: '#projects', id: 'work' },
    { num: '05', name: 'SKILLS', href: '#techstack', id: 'skills' },
    { num: '06', name: 'EXPERIENCE', href: '#experience', id: 'experience' },
    { num: '07', name: 'CONTACT', href: '#contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const navSectionMap = [
        { navId: 'home', elementIds: ['hero'] },
        { navId: 'about', elementIds: ['introduction', 'about'] },
        { navId: 'process', elementIds: ['process'] },
        { navId: 'work', elementIds: ['projects', 'architecture'] },
        { navId: 'skills', elementIds: ['techstack', 'visual-archive', 'ailab'] },
        { navId: 'experience', elementIds: ['experience'] },
        { navId: 'contact', elementIds: ['contact'] }
      ];

      const viewportCenter = window.scrollY + window.innerHeight / 3;
      let currentNavId = 'home';

      for (const group of navSectionMap) {
        for (const elId of group.elementIds) {
          const el = document.getElementById(elId);
          if (el) {
            const top = el.offsetTop;
            const height = el.offsetHeight;
            if (viewportCenter >= top && viewportCenter < top + height) {
              currentNavId = group.navId;
              break;
            }
          }
        }
      }

      setActiveSection(currentNavId);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 left-0 w-full z-50 transition-all duration-300 border-b border-[#E4E2DC] overflow-x-clip ${scrolled ? 'bg-[#F1F0EB]/95 backdrop-blur-md py-3 shadow-sm' : 'bg-[#F1F0EB]/85 backdrop-blur-sm py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between font-mono w-full">
        
        {/* Brand Logo */}
        <a href="#hero" className="flex items-center group shrink-0">
          <ReubgLogo variant="light" className="w-[90px] sm:w-[120px] md:w-[135px] h-auto" />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-7 text-xs font-bold tracking-wider">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`transition-colors duration-200 flex items-center gap-1.5 py-1 ${
                activeSection === link.id ? 'text-[#8B6DFF] font-extrabold border-b-2 border-[#8B6DFF]' : 'text-[#111111] hover:text-[#8B6DFF]'
              }`}
            >
              <span className="text-[10px] text-[#555555] font-normal">{link.num}.</span>
              <span>{link.name}</span>
            </a>
          ))}
        </nav>

        {/* Action Button */}
        <div className="hidden sm:flex items-center">
          <button
            onClick={onOpenResume}
            className="btn-editorial-purple py-1.5 px-4 text-xs font-bold tracking-wider"
          >
            RESUME
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-[#111111] hover:text-[#8B6DFF]"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#F1F0EB] border-b border-[#E4E2DC] px-4 sm:px-6 py-6 font-mono"
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm tracking-widest flex items-center gap-2.5 py-1.5 ${
                    activeSection === link.id ? 'text-[#8B6DFF] font-bold' : 'text-[#111111]'
                  }`}
                >
                  <span className="text-xs text-[#555555] font-normal">{link.num}.</span>
                  <span>{link.name}</span>
                </a>
              ))}

              <div className="pt-4 border-t border-[#E4E2DC] mt-2">
                <button
                  onClick={() => {
                    onOpenResume();
                    setMobileMenuOpen(false);
                  }}
                  className="btn-editorial-purple w-full py-2.5 text-xs font-bold tracking-wider"
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
