import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = [
        { href: '#hero', label: 'Home' },
        { href: '#about', label: 'About Me' },
        { href: '#projects', label: 'Projects' },
        { href: '#contact', label: 'Talk' }
    ];

    return (
        <header className="header fixed top-0 inset-x-0 z-50 py-6 px-4 md:px-8 flex items-center justify-center pointer-events-none">
            <div className="container mx-auto flex justify-between items-center pointer-events-auto">

                {/* Left: Logo */}
                <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="flex items-center gap-2"
                >
                    <span className="text-2xl md:text-3xl font-speed font-bold text-acid-lime tracking-widest flex items-center gap-2">
                        <span className="text-white">PORTFOLIO</span>
                    </span>
                </motion.div>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-12 bg-black/50 backdrop-blur-md px-8 py-2 rounded-full border border-white/5">
                    {navItems.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            className="text-sm font-tech text-white hover:text-acid-lime tracking-widest transition-colors"
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="md:hidden text-white hover:text-acid-lime transition-colors"
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Right: CTA - Hidden on mobile, shown in mobile menu */}
                <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="hidden md:block"
                >
                    <a href="#contact" className="px-6 py-2 border border-acid-lime text-acid-lime font-tech text-sm tracking-widest hover:bg-acid-lime hover:text-black transition-all uppercase">
                        Talk
                    </a>
                </motion.div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="md:hidden absolute top-full left-0 right-0 bg-black/90 backdrop-blur-md border-t border-white/10"
                >
                    <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
                        {navItems.map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-white hover:text-acid-lime transition-colors font-tech tracking-widest"
                            >
                                {item.label}
                            </a>
                        ))}
                        <a
                            href="#contact"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="px-6 py-2 border border-acid-lime text-acid-lime font-tech text-sm tracking-widest hover:bg-acid-lime hover:text-black transition-all uppercase text-center"
                        >
                            Talk
                        </a>
                    </div>
                </motion.div>
            )}
        </header>
    );
};

export default Header;
