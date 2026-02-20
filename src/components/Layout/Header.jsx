import React from 'react';
import { motion } from 'framer-motion';

const Header = ({ onOpenQuests, onOpenInventory }) => {
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
                        <span className="text-white">GAME</span>FY
                    </span>
                </motion.div>

                {/* Center: Nav */}
                <nav className="hidden md:flex items-center gap-12 bg-black/50 backdrop-blur-md px-8 py-2 rounded-full border border-white/5">
                    <a href="#hero" className="text-sm font-tech text-white hover:text-acid-lime tracking-widest transition-colors">TOP GAMERS</a>
                    <a href="#projects" className="text-sm font-tech text-white hover:text-acid-lime tracking-widest transition-colors">GAME</a>
                    <button onClick={onOpenInventory} className="text-sm font-tech text-white hover:text-acid-lime tracking-widest transition-colors">
                        GAMERS
                    </button>
                    <button onClick={onOpenQuests} className="text-sm font-tech text-white hover:text-acid-lime tracking-widest transition-colors">
                        MISSIONS
                    </button>
                </nav>

                {/* Right: CTA */}
                <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                >
                    <a href="#contact" className="px-6 py-2 border border-acid-lime text-acid-lime font-tech text-sm tracking-widest hover:bg-acid-lime hover:text-black transition-all uppercase">
                        SIGN IN
                    </a>
                </motion.div>
            </div>
        </header>
    );
};

export default Header;
