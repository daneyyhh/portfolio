import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import ReubgLogo from './ReubgLogo';

export default function Navbar({ onOpenResume }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      // Map sections to the 5 exact navbar navigation IDs
      const navSectionMap = [
        { navId: 'home', elementIds: ['hero'] },
        { navId: 'about', elementIds: ['introduction', 'about'] },
        { navId: 'process', elementIds: ['process'] },
        { navId: 'work', elementIds: ['projects', 'architecture', 'skills', 'visual-archive'] },
        { navId: 'contact', elementIds: ['ailab', 'experience', 'contact'] }
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

  const navLinks = [
    { num: '01', name: 'HOME', href: '#hero', id: 'home' },
    { num: '02', name: 'ABOUT', href: '#introduction', id: 'about' },
    { num: '03', name: 'PROCESS', href: '#process', id: 'process' },
    { num: '04', name: 'WORK', href: '#projects', id: 'work' },
    { num: '05', name: 'CONTACT', href: '#contact', id: 'contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b border-[#E4E2DC] overflow-x-clip ${scrolled ? 'bg-[#F1F0EB]/95 backdrop-blur-md py-3' : 'bg-[#F1F0EB]/90 backdrop-blur-sm py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between font-mono w-full">
        
        {/* Single Source of Truth Brand Logo */}
        <a href="#hero" className="flex items-center group shrink-0">
          <ReubgLogo variant="light" className="w-[90px] sm:w-[120px] md:w-[145px] h-auto" />
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

        {/* Right Action: RESUME Button */}
        <div className="hidden sm:flex items-center">
          <button
            onClick={onOpenResume}
            className="btn-editorial-purple py-1.5 px-5 text-xs"
          >
            RESUME
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-[#111111] hover:text-[#8B6DFF]"
          aria-label="Toggle Navigation Menu"
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

              <div className="pt-4 border-t border-[#E4E2DC]">
                <button
                  onClick={() => {
                    onOpenResume();
                    setMobileMenuOpen(false);
                  }}
                  className="btn-editorial-purple w-full py-2.5 text-xs"
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
