import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

const navItems = [
    { href: '#hero', label: 'HOME', idx: '01' },
    { href: '#about', label: 'ABOUT', idx: '02' },
    { href: '#projects', label: 'PROJECTS', idx: '03' },
    { href: '#contact', label: 'CONTACT', idx: '04' },
];

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [active, setActive] = useState('#hero');
    const [hovered, setHovered] = useState(null);

    /* ── Scroll detection ── */
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    /* ── Active section via IntersectionObserver ── */
    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => entries.forEach(e => { if (e.isIntersecting) setActive('#' + e.target.id); }),
            { threshold: 0.35 }
        );
        document.querySelectorAll('section[id]').forEach(s => observer.observe(s));
        return () => observer.disconnect();
    }, []);

    const handleNav = (href) => { setMenuOpen(false); setActive(href); };

    /* ── Animation variants ── */
    const headerVars = {
        hidden: { y: -80, opacity: 0 },
        show: {
            y: 0, opacity: 1,
            transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }
        }
    };

    const linkVars = {
        hidden: { opacity: 0, y: -12 },
        show: (i) => ({
            opacity: 1, y: 0,
            transition: { delay: 0.3 + i * 0.07, duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }
        })
    };

    return (
        <motion.header
            className={`site-header val-header ${scrolled ? 'scrolled' : ''}`}
            variants={headerVars}
            initial="hidden"
            animate="show"
        >
            {/* ── Top red accent line – animates in ── */}
            <motion.div
                className="header-top-line"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
            />

            <div className="header-inner">

                {/* ── Logo ── */}
                <motion.a
                    href="#hero"
                    className="header-logo val-logo"
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                    onClick={() => handleNav('#hero')}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                >
                    {/* V-chevron SVG */}
                    <svg className="logo-chevron" viewBox="0 0 20 18" fill="none" width="20" height="18">
                        <path d="M0 0L10 18L20 0H15L10 10L5 0H0Z" fill="#ff4655" />
                    </svg>
                    <span className="logo-text-val">
                        <span className="logo-r">R</span>EUBEN
                    </span>
                    <span className="logo-tag-val">DEV</span>
                </motion.a>

                {/* ── Desktop Nav ── */}
                <nav className="desktop-nav val-desktop-nav">
                    {navItems.map((item, i) => (
                        <motion.a
                            key={item.href}
                            href={item.href}
                            className={`val-nav-link ${active === item.href ? 'val-nav-active' : ''}`}
                            onClick={() => handleNav(item.href)}
                            custom={i}
                            variants={linkVars}
                            initial="hidden"
                            animate="show"
                            onHoverStart={() => setHovered(item.href)}
                            onHoverEnd={() => setHovered(null)}
                        >
                            {/* Superscript number */}
                            <span className="val-nav-sup">{item.idx}</span>
                            {item.label}

                            {/* Animated red underline on active/hover */}
                            <AnimatePresence>
                                {(active === item.href || hovered === item.href) && (
                                    <motion.span
                                        className="val-nav-underline"
                                        layoutId="navUnderline"
                                        initial={{ scaleX: 0, opacity: 0 }}
                                        animate={{ scaleX: 1, opacity: 1 }}
                                        exit={{ scaleX: 0, opacity: 0 }}
                                        transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                                    />
                                )}
                            </AnimatePresence>
                        </motion.a>
                    ))}
                </nav>

                {/* ── CTA Button ── */}
                <motion.a
                    href="#contact"
                    className="header-cta val-cta"
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
                    whileHover={{ scale: 1.05, boxShadow: '0 0 28px rgba(255,70,85,0.5)' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleNav('#contact')}
                >
                    <motion.span
                        className="cta-dot"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                    />
                    HIRE ME
                </motion.a>

                {/* ── Hamburger ── */}
                <button
                    className="burger val-burger"
                    onClick={() => setMenuOpen(v => !v)}
                    aria-label="Toggle menu"
                    aria-expanded={menuOpen}
                >
                    {[0, 1, 2].map(i => (
                        <motion.span
                            key={i}
                            className="burger-line"
                            animate={menuOpen
                                ? i === 0 ? { rotate: 45, y: 8 }
                                    : i === 1 ? { opacity: 0, x: -8 }
                                        : { rotate: -45, y: -8 }
                                : { rotate: 0, y: 0, opacity: 1, x: 0 }
                            }
                            transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
                        />
                    ))}
                </button>
            </div>

            {/* ── Mobile Menu ── */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        className="mobile-menu val-mobile-menu"
                        key="mobile-menu"
                        initial={{ opacity: 0, y: -20, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: -20, height: 0 }}
                        transition={{ duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                        {navItems.map((item, i) => (
                            <motion.a
                                key={item.href}
                                href={item.href}
                                className={`mobile-nav-link val-mobile-link ${active === item.href ? 'nav-active' : ''}`}
                                onClick={() => handleNav(item.href)}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ delay: i * 0.06, duration: 0.3 }}
                            >
                                <span className="val-nav-sup" style={{ marginRight: '10px' }}>{item.idx}</span>
                                {item.label}
                                {active === item.href && (
                                    <motion.span
                                        className="mobile-active-bar"
                                        layoutId="mobileBar"
                                        initial={{ scaleX: 0 }}
                                        animate={{ scaleX: 1 }}
                                    />
                                )}
                            </motion.a>
                        ))}
                        <motion.a
                            href="#contact"
                            className="mobile-cta val-mobile-cta"
                            onClick={() => handleNav('#contact')}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.28 }}
                            whileTap={{ scale: 0.96 }}
                        >
                            HIRE ME ⊙
                        </motion.a>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
};

export default Header;
