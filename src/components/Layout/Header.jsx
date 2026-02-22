import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
    { href: '#hero', label: 'STORY' },
    { href: '#about', label: 'PROFILE' },
    { href: '#projects', label: 'MISSIONS' },
    { href: '#contact', label: 'SIGNAL' },
];

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [active, setActive] = useState('#hero');

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <motion.header
            className="val-header"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
        >
            <div className="header-inner">
                <a href="#hero" className="val-logo">REUBEN.CHR</a>

                <nav className="desktop-nav">
                    {navItems.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            className={`val-nav-link ${active === item.href ? 'val-nav-active' : ''}`}
                            onClick={() => setActive(item.href)}
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>

                <a href="#contact" className="btn-comic" style={{ fontSize: '0.8rem', padding: '5px 15px', boxShadow: '3px 3px 0px #000' }}>
                    SOS
                </a>
            </div>
        </motion.header>
    );
};

export default Header;
