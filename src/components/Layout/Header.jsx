import React, { useState } from 'react';
import { motion } from 'framer-motion';

const navItems = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Articles', href: '#articles' },
    { name: 'Talk', href: '#contact' },
];

const Header = () => {
    const [activeTab, setActiveTab] = useState('Home');

    return (
        <motion.header
            className="fixed top-0 left-0 w-full z-50 flex justify-center py-4 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm pointer-events-none"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ delay: 3, type: 'spring', stiffness: 100 }} // Delay to sync with LoadingScreen
        >
            <nav className="pointer-events-auto bg-black/60 border border-cyan-900/50 rounded-full px-6 py-2 flex gap-4 shadow-[0_0_15px_rgba(6,182,212,0.15)] relative overflow-hidden backdrop-blur-md">
                {/* Circuit Line Decor */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>

                {navItems.map((item) => (
                    <a
                        key={item.name}
                        href={item.href}
                        onClick={() => setActiveTab(item.name)}
                        className={`relative px-4 py-2 text-sm md:text-base font-mono uppercase tracking-wider transition-colors duration-300 ${activeTab === item.name ? 'text-cyan-400' : 'text-gray-400 hover:text-cyan-200'
                            }`}
                    >
                        {item.name}

                        {/* Active Tab Indicator (Underline/Glow) */}
                        {activeTab === item.name && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-400 shadow-[0_0_8px_#22d3ee]"
                                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            />
                        )}

                        {/* Hover Glitch Effect (could be expanded) */}
                        <span className="absolute inset-0 bg-cyan-400/5 opacity-0 hover:opacity-100 rounded transition-opacity -z-10"></span>
                    </a>
                ))}
            </nav>
        </motion.header>
    );
};

export default Header;
