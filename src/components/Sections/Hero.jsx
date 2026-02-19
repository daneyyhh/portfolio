import React from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, MessageSquare, ArrowDown } from 'lucide-react';

const Hero = () => {
    return (
        <section id="hero" className="min-h-screen flex flex-col items-center justify-center relative bg-black overflow-hidden pt-20 pb-16">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)] pointer-events-none"></div>

            <div className="container mx-auto px-6 flex flex-col items-center text-center z-10">

                {/* 2D Illustration Placeholder */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="w-64 h-64 md:w-80 md:h-80 bg-gradient-to-b from-cyan-900/20 to-transparent rounded-full flex items-center justify-center mb-8 border border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.15)]"
                >
                    <div className="text-cyan-500/50 font-mono text-sm">[AVATAR_MODEL_LOADED]</div>
                    {/* Ideally replace this div with an <img> tag pointing to the character illustration */}
                </motion.div>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <h1 className="text-5xl md:text-7xl font-bold font-[Orbitron,sans-serif] text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-gray-400 mb-2">
                        REUBEN
                    </h1>
                    <h2 className="text-xl md:text-2xl text-cyan-400 font-mono tracking-widest mb-6">
                        GAMER & GAME DEVELOPER
                    </h2>
                    <p className="text-gray-400 max-w-lg mx-auto mb-10 text-lg">
                        Building immersive worlds and digital experiences.
                        Ready to join your party.
                    </p>

                    <div className="flex flex-col md:flex-row gap-6 justify-center">
                        <motion.a
                            href="#projects"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-black font-bold py-3 px-8 rounded skew-x-[-10deg] shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all"
                        >
                            <Gamepad2 className="w-5 h-5 skew-x-[10deg]" />
                            <span className="skew-x-[10deg]">VIEW QUESTS</span>
                        </motion.a>

                        <motion.a
                            href="#contact"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 border border-cyan-500 text-cyan-400 hover:bg-cyan-950 font-bold py-3 px-8 rounded skew-x-[-10deg] transition-all shadow-[0_0_10px_rgba(6,182,212,0.1)]"
                        >
                            <MessageSquare className="w-5 h-5 skew-x-[10deg]" />
                            <span className="skew-x-[10deg]">TALK / CONTACT</span>
                        </motion.a>
                    </div>
                </motion.div>
            </div>

            {/* Bottom UI Elements */}
            <div className="absolute bottom-10 w-full flex flex-col items-center gap-6 z-10 pointer-events-none">

                {/* Press Start */}
                <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex flex-col items-center text-cyan-500 cursor-pointer pointer-events-auto"
                >
                    <span className="font-[Orbitron,sans-serif] tracking-[0.2em] text-sm mb-2">PRESS START</span>
                    <ArrowDown className="w-5 h-5 animate-bounce" />
                </motion.div>

                {/* Fake Loading Bar */}
                <div className="w-full max-w-2xl px-6">
                    <div className="flex justify-between text-[10px] text-cyan-600 font-mono mb-1">
                        <span>LOADING PLAYER: REUBEN...</span>
                        <span>87%</span>
                    </div>
                    <div className="h-1.5 w-full bg-cyan-950 rounded-full overflow-hidden">
                        <div className="h-full bg-cyan-600 w-[87%] shadow-[0_0_10px_#0891b2]"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
