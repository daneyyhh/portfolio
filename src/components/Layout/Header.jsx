import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
    { href: '#hero', label: 'Home' },
    { href: '#about', label: 'About Me' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Talk' },
];

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [active, setActive] = useState('#hero');

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(e => {
                    if (e.isIntersecting) setActive('#' + e.target.id);
                });
            },
            { threshold: 0.4 }
        );
        document.querySelectorAll('section[id]').forEach(s => observer.observe(s));
        return () => observer.disconnect();
    }, []);

    const handleNav = (href) => {
        setMenuOpen(false);
        setActive(href);
    };

    return (
        <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
            <div className="header-inner">
                {/* Logo */}
                <motion.a
                    href="#hero"
                    className="header-logo"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="logo-accent">R</span>EUBEN
                </motion.a>

                {/* Desktop Nav */}
                <nav className="desktop-nav">
                    {navItems.map((item, i) => (
                        <motion.a
                            key={item.href}
                            href={item.href}
                            className={`nav-link ${active === item.href ? 'nav-active' : ''}`}
                            onClick={() => handleNav(item.href)}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * i + 0.2 }}
                        >
                            {item.label}
                            {active === item.href && (
                                <motion.span
                                    layoutId="nav-indicator"
                                    className="nav-dot"
                                />
                            )}
                        </motion.a>
                    ))}
                </nav>

                {/* CTA */}
                <motion.a
                    href="#contact"
                    className="header-cta"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                >
                    Contact
                </motion.a>

                {/* Hamburger */}
                <button
                    className="burger"
                    onClick={() => setMenuOpen(v => !v)}
                    aria-label="Toggle menu"
                    aria-expanded={menuOpen}
                >
                    <span className={`burger-line ${menuOpen ? 'open' : ''}`} />
                    <span className={`burger-line ${menuOpen ? 'open' : ''}`} />
                    <span className={`burger-line ${menuOpen ? 'open' : ''}`} />
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        className="mobile-menu"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                        {navItems.map((item, i) => (
                            <motion.a
                                key={item.href}
                                href={item.href}
                                className={`mobile-nav-link ${active === item.href ? 'nav-active' : ''}`}
                                onClick={() => handleNav(item.href)}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.05 * i }}
                            >
                                {item.label}
                            </motion.a>
                        ))}
                        <a
                            href="#contact"
                            className="mobile-cta"
                            onClick={() => setMenuOpen(false)}
                        >
                            Talk to Me
                        </a>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;
