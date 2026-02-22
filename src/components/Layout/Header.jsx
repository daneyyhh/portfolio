import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
    { href: '#hero', label: 'HOME' },
    { href: '#about', label: 'THE OUTLAW' },
    { href: '#projects', label: 'WANTED' },
    { href: '#contact', label: 'TELEGRAPH' },
];

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [active, setActive] = useState('#hero');

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => entries.forEach(e => { if (e.isIntersecting) setActive('#' + e.target.id); }),
            { threshold: 0.35 }
        );
        document.querySelectorAll('section[id]').forEach(s => observer.observe(s));
        return () => observer.disconnect();
    }, []);

    const handleNav = (href) => { setMenuOpen(false); setActive(href); };

    return (
        <motion.header
            className={`val-header ${scrolled ? 'scrolled' : ''}`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <div className="header-inner">
                {/* Logo */}
                <a href="#hero" className="val-logo" onClick={() => handleNav('#hero')}>
                    <span style={{ fontSize: '1.8rem', color: '#fff', letterSpacing: '0.05em' }}>REUBEN</span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--rdr-red)', marginLeft: '8px', border: '1px solid var(--rdr-red)', padding: '2px 6px' }}>OUTLAW</span>
                </a>

                {/* Desktop Nav */}
                <nav className="desktop-nav">
                    {navItems.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            className={`val-nav-link ${active === item.href ? 'val-nav-active' : ''}`}
                            onClick={() => handleNav(item.href)}
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>

                {/* CTA */}
                <a href="#contact" className="val-cta" onClick={() => handleNav('#contact')}>
                    JOBS
                </a>

                {/* Mobile Burger */}
                <button className="val-burger" onClick={() => setMenuOpen(!menuOpen)}>
                    <span className="burger-line" style={{ transform: menuOpen ? 'rotate(45deg) translateY(7px)' : 'none' }} />
                    <span className="burger-line" style={{ opacity: menuOpen ? 0 : 1 }} />
                    <span className="burger-line" style={{ transform: menuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none' }} />
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        className="val-mobile-menu"
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'tween', duration: 0.4 }}
                    >
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', padding: '100px 40px' }}>
                            {navItems.map((item) => (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    className="val-mobile-link"
                                    onClick={() => handleNav(item.href)}
                                    style={{ fontSize: '3rem', fontFamily: 'var(--font-title)' }}
                                >
                                    {item.label}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
};

export default Header;
