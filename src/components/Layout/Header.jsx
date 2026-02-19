import React from 'react';
import { motion } from 'framer-motion';

const Header = () => {
    return (
        <header className="fixed top-0 inset-x-0 z-50 py-6 px-4 md:px-8">
            <div className="container mx-auto flex justify-between items-center">

                {/* Logo */}
                <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="flex items-center gap-2"
                >
                    <span className="text-4xl font-speed font-bold text-white tracking-widest">
                        REUBEN<span className="text-racing-orange">X</span>
                    </span>
                    <span className="hidden md:block py-1 px-3 bg-steel/50 text-neon-teal font-tech text-xs tracking-widest rounded-sm border border-neon-teal/20">
                        SYSTEM_ONLINE
                    </span>
                </motion.div>

                {/* Nav */}
                <nav className="flex items-center gap-6">
                    <ul className="hidden md:flex gap-8">
                        {['NEXUS', 'MISSIONS', 'DATA_LOG'].map((item) => (
                            <li key={item}>
                                <a href={`#${item.toLowerCase().split('_')[0] === 'missions' ? 'projects' : item.toLowerCase().split('_')[0] === 'data' ? 'about' : 'hero'}`}
                                    className="text-white hover:text-racing-orange font-speed text-xl tracking-wider transition-colors">
                                    {item}
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* CTA Button */}
                    <a href="#contact" className="relative group">
                        <div className="absolute inset-0 bg-neon-teal skew-x-[-20deg] blur-md opacity-20 group-hover:opacity-50 transition-opacity"></div>
                        <div className="relative bg-void border border-neon-teal text-neon-teal px-6 py-2 skew-x-[-20deg] hover:bg-neon-teal hover:text-black transition-all">
                            <span className="block skew-x-[20deg] font-bold font-tech tracking-widest">
                                INITIATE_CHAT
                            </span>
                        </div>
                    </a>
                </nav>
            </div>
        </header>
    );
};

export default Header;
