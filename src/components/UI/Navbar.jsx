import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import ReubgLogo from './ReubgLogo';

export default function Navbar({ onOpenResume }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();
  const navigate = useNavigate();

  const isMerchLab = location.pathname === '/merch-lab';

  const navLinks = [
    { num: '01', name: 'HOME', href: '#hero', id: 'home' },
    { num: '02', name: 'ABOUT', href: '#introduction', id: 'about' },
    { num: '03', name: 'PROCESS', href: '#process', id: 'process' },
    { num: '04', name: 'WORK', href: '#projects', id: 'work' },
    { num: '05', name: 'SKILLS', href: '#techstack', id: 'skills' },
    { num: '06', name: 'EXPERIENCE', href: '#experience', id: 'experience' },
    { num: '07', name: 'CONTACT', href: '#contact', id: 'contact' },
  ];

  // Smooth scroll handler accounting for header height offset, Lenis, and cross-route navigation
  const handleNavClick = (e, href) => {
    e.preventDefault();
    const targetId = href.replace('#', '');

    if (location.pathname !== '/') {
      navigate('/' + href);
      setTimeout(() => {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          const headerOffset = 72;
          if (window.__lenis) {
            window.__lenis.scrollTo(targetElement, {
              offset: -headerOffset,
              duration: 1.15,
              easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            });
          } else {
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }
      }, 150);
      return;
    }

    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const headerOffset = 72;
      
      if (window.__lenis) {
        window.__lenis.scrollTo(targetElement, {
          offset: -headerOffset,
          duration: 1.15,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else {
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }

      if (window.history && window.history.pushState) {
        window.history.pushState(null, '', href);
      }
    }
  };

  useEffect(() => {
    if (isMerchLab) {
      setActiveSection('');
      return;
    }

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
  }, [isMerchLab]);

  return (
    <header
      className={`sticky top-0 left-0 w-full z-[100] transition-all duration-300 overflow-x-clip backdrop-blur-md ${
        isMerchLab
          ? 'bg-[#EDECE6]/85 border-b border-[#111111]/10 text-[#111111]'
          : 'bg-[#F1F0EB]/95 border-b border-[#E4E2DC] text-[#111111]'
      } ${scrolled ? 'py-3 shadow-sm' : 'py-4'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between font-mono w-full">
        
        {/* Brand Logo */}
        <Link
          to="/"
          onClick={(e) => {
            if (location.pathname === '/') {
              handleNavClick(e, '#hero');
            }
          }}
          className="flex items-center group shrink-0"
          title="REUBG DEV"
        >
          <ReubgLogo
            variant="light"
            className="w-[90px] sm:w-[120px] md:w-[135px] h-auto transition-transform duration-200 group-hover:scale-102"
          />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-6 text-xs font-bold tracking-wider">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`transition-all duration-200 flex items-center gap-1.5 py-1 ${
                !isMerchLab && activeSection === link.id
                  ? 'text-[#FF1E27] font-extrabold border-b-2 border-[#FF1E27]'
                  : 'text-[#111111] hover:text-[#FF1E27]'
              }`}
            >
              <span className="text-[10px] text-[#555555] font-normal">
                {link.num}.
              </span>
              <span>{link.name}</span>
            </a>
          ))}
        </nav>

        {/* Action Button Section: Merch Lab + Resume */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Dedicated MERCH LAB Button Section */}
          <Link
            to="/merch-lab"
            className={`inline-flex items-center gap-2 py-1.5 px-3 sm:px-3.5 text-xs font-mono font-bold tracking-wider uppercase border transition-all duration-200 cursor-pointer ${
              isMerchLab
                ? 'bg-[#111111] text-white border-[#111111] shadow-sm'
                : 'bg-[#FAF9F5] hover:bg-[#111111] text-[#111111] hover:text-white border-[#111111] hover:border-[#111111] shadow-sm'
            }`}
            title="Explore Merch Lab — Under Development"
          >
            <span className="relative flex h-2 w-2 shrink-0 items-center justify-center">
              <span
                className="absolute inline-flex h-3 w-3 rounded-full bg-[#FF1E27]/40 animate-pulse motion-reduce:hidden"
                style={{ animationDuration: '2.5s' }}
              />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#FF1E27]" />
            </span>
            <span>MERCH LAB</span>
            {isMerchLab ? (
              <span className="text-[9px] px-1 bg-[#FF1E27] text-white font-semibold tracking-tight">
                ACTIVE
              </span>
            ) : (
              <span className="text-[9px] text-[#FF1E27] font-semibold tracking-tight hidden xl:inline">
                DEV
              </span>
            )}
          </Link>

          {/* Resume Action */}
          <button
            onClick={onOpenResume}
            className="btn-editorial-red py-1.5 px-4 text-xs font-bold tracking-wider cursor-pointer"
          >
            RESUME
          </button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-[#111111] hover:text-[#FF1E27] transition-colors cursor-pointer"
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
            className="lg:hidden px-4 sm:px-6 py-6 font-mono overflow-hidden bg-[#EDECE6] border-b border-[#111111]/15 text-[#111111]"
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    handleNavClick(e, link.href);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-sm tracking-widest flex items-center gap-2.5 py-1.5 ${
                    !isMerchLab && activeSection === link.id
                      ? 'text-[#FF1E27] font-bold'
                      : 'text-[#111111] hover:text-[#FF1E27]'
                  }`}
                >
                  <span className="text-xs text-[#555555] font-normal">
                    {link.num}.
                  </span>
                  <span>{link.name}</span>
                </a>
              ))}

              {/* Action Buttons in Mobile Drawer */}
              <div className="pt-4 border-t border-[#111111]/15 mt-2 space-y-2.5">
                {/* MERCH LAB Mobile Button Section */}
                <Link
                  to="/merch-lab"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`w-full flex items-center justify-between py-2.5 px-4 text-xs font-mono font-bold tracking-wider uppercase border transition-all ${
                    isMerchLab
                      ? 'bg-[#111111] text-white border-[#111111]'
                      : 'bg-[#111111] text-white hover:bg-[#FF1E27] border-[#111111] hover:border-[#FF1E27]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2 shrink-0 items-center justify-center">
                      <span className="absolute inline-flex h-3 w-3 rounded-full bg-[#FF1E27]/40 animate-pulse motion-reduce:hidden" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#FF1E27]" />
                    </span>
                    <span>MERCH LAB</span>
                  </div>
                  <span className="text-[10px] text-stone-300 font-normal">UNDER DEV →</span>
                </Link>

                {/* View Resume Mobile Button */}
                <button
                  onClick={() => {
                    onOpenResume();
                    setMobileMenuOpen(false);
                  }}
                  className="btn-editorial-red w-full py-2.5 text-xs font-bold tracking-wider cursor-pointer"
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
