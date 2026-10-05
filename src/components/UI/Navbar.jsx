import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import ReubgLogo from './ReubgLogo';

// Smooth cubic easeInOut curve (fluid, responsive, cinematic acceleration & deceleration)
const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const isProgrammaticScrollRef = useRef(false);
  const scrollLockTimerRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const isResearch = location.pathname.startsWith('/research');

  const navLinks = [
    { num: '01', name: 'HOME', href: '#hero', id: 'home' },
    { num: '02', name: 'ABOUT', href: '#about', id: 'about' },
    { num: '03', name: 'WORK', href: '#projects', id: 'work' },
    { num: '04', name: 'SKILLS', href: '#techstack', id: 'skills' },
    { num: '05', name: 'EXPERIENCE', href: '#experience', id: 'experience' },
    { num: '06', name: 'RESEARCH', href: '/research', id: 'research', isRoute: true },
    { num: '07', name: 'CONTACT', href: '#contact', id: 'contact' },
  ];

  /**
   * Universal smooth-scroll executor
   * - Uses Lenis if initialized, or fallback requestAnimationFrame
   * - Easing: easeInOutCubic
   * - Natural duration: 850ms (within 700-1000ms range)
   * - Target offset: 74px accounting for sticky header height
   */
  const performSmoothScroll = (targetElement, customOffset = 74) => {
    if (!targetElement) return;

    if (window.__lenis) {
      window.__lenis.scrollTo(targetElement, {
        offset: -customOffset,
        duration: 0.85,
        easing: easeInOutCubic,
        lock: false,
      });
      return;
    }

    const startY = window.pageYOffset || document.documentElement.scrollTop;
    const elementY = targetElement.getBoundingClientRect().top + startY;
    const targetY = Math.max(0, elementY - customOffset);
    const diff = targetY - startY;
    const durationMs = 850;
    let startTime = null;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      const easedProgress = easeInOutCubic(progress);

      window.scrollTo(0, startY + diff * easedProgress);

      if (elapsed < durationMs) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  /**
   * Smooth navigation handler
   * - Handles dedicated route transitions (/research) vs homepage hash scrolling
   * - Locks active state on clicked item to prevent intermediate scroll-spy flickering
   * - Closes mobile drawer seamlessly
   * - Preserves clean URL state via replaceState without reloads
   */
  const handleNavClick = (e, href, isRoute = false) => {
    if (e && e.preventDefault) e.preventDefault();

    if (isRoute || href.startsWith('/')) {
      setActiveSection('research');
      navigate(href);
      return;
    }

    const targetId = href.replace('#', '');
    const matchedLink = navLinks.find((l) => l.href === href);
    const linkId = matchedLink ? matchedLink.id : 'home';

    // Immediately reflect active link and lock scroll-spy during animation
    setActiveSection(linkId);
    isProgrammaticScrollRef.current = true;
    if (scrollLockTimerRef.current) clearTimeout(scrollLockTimerRef.current);
    scrollLockTimerRef.current = setTimeout(() => {
      isProgrammaticScrollRef.current = false;
    }, 920);

    // Cross-route navigation back to main page if on /research
    if (location.pathname !== '/') {
      navigate('/' + href);
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          performSmoothScroll(el, 74);
        }
      }, 160);
      return;
    }

    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      performSmoothScroll(targetElement, 74);

      if (window.history && window.history.replaceState) {
        window.history.replaceState(null, '', href);
      }
    }
  };

  // Scroll spy to update active section when user manually scrolls on homepage
  useEffect(() => {
    if (isResearch) {
      setActiveSection('research');
      return;
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Do not override activeSection while smooth scrolling programmatically
      if (isProgrammaticScrollRef.current) return;

      const navSectionMap = [
        { navId: 'home', elementIds: ['hero'] },
        { navId: 'about', elementIds: ['introduction', 'about'] },
        { navId: 'work', elementIds: ['projects', 'architecture'] },
        { navId: 'skills', elementIds: ['techstack', 'visual-archive'] },
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
  }, [isResearch]);

  return (
    <header
      className={`sticky top-0 left-0 w-full z-[100] transition-all duration-300 overflow-x-clip backdrop-blur-md bg-[#F1F0EB]/95 border-b border-[#E4E2DC] text-[#111111] ${
        scrolled ? 'py-2.5 sm:py-3 shadow-[0_4px_20px_rgba(0,0,0,0.03)]' : 'py-3.5 sm:py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between font-mono w-full">
        
        {/* Brand Logo - 100% Unchanged */}
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
        <nav className="hidden lg:flex items-center gap-4 xl:gap-6 text-xs font-mono font-bold tracking-wider">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href, link.isRoute)}
                className={`relative transition-colors duration-200 flex items-center gap-1.5 py-1 cursor-pointer group ${
                  isActive
                    ? 'text-[#FF1E27]'
                    : 'text-[#111111] hover:text-[#FF1E27]'
                }`}
              >
                <span
                  className={`text-[10px] transition-colors duration-200 ${
                    isActive ? 'text-[#FF1E27]/80 font-bold' : 'text-[#888884] group-hover:text-[#FF1E27]/80'
                  }`}
                >
                  {link.num}.
                </span>
                <span>{link.name}</span>
                {link.id === 'research' && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF1E27] animate-pulse" />
                )}
                {isActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#FF1E27]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Action Button Section: Direct Contact CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="btn-editorial-red py-1.5 px-4 text-xs font-bold tracking-wider cursor-pointer"
          >
            GET IN TOUCH
          </a>
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
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden px-4 sm:px-6 py-6 font-mono overflow-hidden bg-[#EDECE6] border-b border-[#111111]/15 text-[#111111]"
          >
            <div className="flex flex-col gap-1.5">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      setMobileMenuOpen(false);
                      handleNavClick(e, link.href, link.isRoute);
                    }}
                    className={`text-sm tracking-widest flex items-center justify-between py-2 px-3 transition-colors ${
                      isActive
                        ? 'bg-[#111111] text-white font-bold'
                        : 'text-[#111111] hover:bg-black/5 hover:text-[#FF1E27]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={`text-xs ${isActive ? 'text-[#FF1E27]' : 'text-[#888884]'}`}>
                        {link.num}.
                      </span>
                      <span>{link.name}</span>
                    </div>
                    {isActive ? (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF1E27] animate-pulse" />
                    ) : link.id === 'research' ? (
                      <span className="text-[10px] px-1.5 py-0.5 bg-[#FF1E27] text-white font-bold">
                        AI LAB
                      </span>
                    ) : null}
                  </a>
                );
              })}

              {/* Action Buttons in Mobile Drawer */}
              <div className="pt-4 border-t border-[#111111]/15 mt-3">
                <a
                  href="#contact"
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    handleNavClick(e, '#contact');
                  }}
                  className="btn-editorial-red w-full py-2.5 text-xs font-bold tracking-wider cursor-pointer text-center block"
                >
                  GET IN TOUCH
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
