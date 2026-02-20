import React from 'react';
import { motion } from 'framer-motion';

const Header = ({ onOpenQuests, onOpenInventory }) => {
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
                        REUBEN<span className="text-acid-lime">X</span>
                    </span>
                    <span className="hidden md:block py-1 px-3 bg-steel/50 text-acid-lime font-tech text-xs tracking-widest rounded-sm border border-acid-lime/20">
                        SYSTEM_ONLINE
                    </span>
                </motion.div>

                {/* Nav */}
                <nav className="flex items-center gap-6">
                    <ul className="hidden md:flex gap-8">
                        <li>
                            <a href="#projects" className="text-white hover:text-acid-lime font-speed text-xl tracking-wider transition-colors">
                                NEXUS
                            </a>
                        </li>
                        <li>
                            <button onClick={onOpenQuests} className="text-white hover:text-acid-lime font-speed text-xl tracking-wider transition-colors">
                                MISSIONS
                            </button>
                        </li>
                        <li>
                            <button onClick={onOpenInventory} className="text-white hover:text-acid-lime font-speed text-xl tracking-wider transition-colors">
                                DATA_LOG
                            </button>
                        </li>
                    </ul>

                    {/* CTA Button */}
                    <a href="#contact" className="relative group">
                        <div className="absolute inset-0 bg-acid-lime skew-x-[-20deg] blur-md opacity-20 group-hover:opacity-50 transition-opacity"></div>
                        <div className="relative bg-void border border-acid-lime text-acid-lime px-6 py-2 skew-x-[-20deg] hover:bg-acid-lime hover:text-black transition-all">
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
