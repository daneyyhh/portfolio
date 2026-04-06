import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const navItems = [
    { href: '#hero', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#capabilities', label: 'Expertise' },
    { href: '#projects', label: 'Work' },
    { href: '#contact', label: 'Contact' },
];

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [active, setActive] = useState('#hero');

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', onScroll, { passive: true });
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) setActive(`#${entry.target.id}`);
            });
        }, { rootMargin: '-20% 0px -70% 0px' });

        document.querySelectorAll('section[id]').forEach(sec => observer.observe(sec));
        return () => {
            window.removeEventListener('scroll', onScroll);
            document.querySelectorAll('section[id]').forEach(sec => observer.unobserve(sec));
        };
    }, []);

    return (
        <motion.header
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'py-4 glass-panel border-b border-white/10' : 'py-6 bg-transparent'}`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
        >
            <div className="max-w-7xl mx-auto px-6 sm:px-12 flex justify-between items-center">
                <a href="#hero" className="font-outfit font-bold text-2xl tracking-tight flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center text-white text-sm">R</span>
                    <span className="text-white hidden sm:block delay-150">Reuben<span className="text-indigo-400">.dev</span></span>
                </a>

                <nav className="hidden md:flex items-center gap-8 glass-panel px-8 py-3 rounded-full">
                    {navItems.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            className={`text-sm font-medium transition-colors ${active === item.href ? 'text-indigo-400' : 'text-gray-400 hover:text-white'}`}
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>

                <div className="flex items-center gap-4">
                    <a href="#contact" className="btn-primary text-sm py-2 px-6">
                        Let's Talk
                    </a>
                </div>
            </div>
        </motion.header>
    );
};

export default Header;
