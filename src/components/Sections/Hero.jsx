import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Gamepad2, Database, Terminal, Cpu } from 'lucide-react';

const Hero = () => {
    return (
        <section id="hero" className="min-h-screen flex items-center justify-center relative bg-black overflow-hidden pt-20">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)] pointer-events-none"></div>

            <div className="container mx-auto px-6 flex flex-col-reverse md:flex-row items-center justify-between gap-12 relative z-10">

                {/* Text Content */}
                <div className="flex-1 text-center md:text-left">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 3.5 }}
                    >
                        <h2 className="text-cyan-400 font-mono text-lg mb-4 tracking-widest uppercase">
                            // System Optimized
                        </h2>
                        <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500 mb-6 font-[Orbitron,sans-serif]">
                            GAMER <br />
                            <span className="text-cyan-500 text-stroke">DEVELOPER</span>
                        </h1>
                        <p className="text-gray-400 text-lg md:text-xl max-w-lg mb-8 leading-relaxed">
                            Crafting immersive digital experiences. Gamer by passion, Developer by craft. Leveling up the web one pixel at a time.
                        </p>

                        <motion.a
                            href="#projects"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-black font-bold py-3 px-8 rounded-none skew-x-[-10deg] shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all"
                        >
                            <span className="skew-x-[10deg] uppercase tracking-wider">Start Mission</span>
                            <Gamepad2 className="w-5 h-5 skew-x-[10deg]" />
                        </motion.a>
                    </motion.div>
                </div>

                {/* Visual Content (Avatar + Icons) */}
                <div className="flex-1 relative flex justify-center items-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 3.8 }}
                        className="relative w-80 h-80 md:w-[500px] md:h-[500px]"
                    >
                        {/* Placeholder 2D Avatar - Using a CSS Shape/Icon combo if no image */}
                        {/* In a real scenario, this would be an <img> to the generated artwork. 
                            For now, we use a stylized energetic graphic container. */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>

                        {/* Central "Avatar" Representation (since we can't generate image directly here) */}
                        <div className="relative w-full h-full flex items-center justify-center">
                            <div className="w-64 h-64 bg-black border-4 border-cyan-500/50 rounded-2xl flex items-center justify-center relative shadow-[0_0_50px_rgba(6,182,212,0.2)]">
                                <Terminal className="w-24 h-24 text-cyan-400" />
                                <div className="absolute -top-4 -right-4 bg-purple-600 text-white text-xs px-2 py-1 rotate-12">Lvl. 99</div>
                            </div>

                            {/* Floating Skill Icons */}
                            <motion.div
                                animate={{ y: [0, -20, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute top-0 right-10 bg-black/80 border border-cyan-500 p-3 rounded-lg text-cyan-400 shadow-lg"
                            >
                                <Code2 className="w-8 h-8" />
                            </motion.div>

                            <motion.div
                                animate={{ y: [0, 20, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                className="absolute bottom-10 left-0 bg-black/80 border border-purple-500 p-3 rounded-lg text-purple-400 shadow-lg"
                            >
                                <Database className="w-8 h-8" />
                            </motion.div>

                            <motion.div
                                animate={{ x: [0, 15, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                                className="absolute top-1/2 -left-8 bg-black/80 border border-green-500 p-3 rounded-lg text-green-400 shadow-lg"
                            >
                                <Cpu className="w-8 h-8" />
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-cyan-500/50 flex flex-col items-center gap-1"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
            >
                <div className="w-[1px] h-10 bg-gradient-to-b from-transparent to-cyan-500"></div>
                <span className="text-xs uppercase tracking-[0.2em]">Scroll</span>
            </motion.div>
        </section>
    );
};

export default Hero;
