import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-void pt-20 lg:pt-0">

            {/* Background Texture/Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,77,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,77,0,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0a0a0a_90%)]"></div>

            {/* Giant Background Text */}
            <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none z-0">
                <h1 className="text-[20vw] lg:text-[25vw] font-speed font-bold text-transparent text-stroke opacity-10 italic tracking-tighter leading-none whitespace-nowrap">
                    REUBEN
                </h1>
            </div>

            <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 min-h-[80vh] items-center gap-8 lg:gap-0">

                {/* Left UI Panel */}
                <div className="lg:col-span-3 flex flex-col gap-8 order-2 lg:order-1">
                    <motion.div
                        initial={{ x: -30, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="bg-carbon border-l-4 border-neon-teal p-4 lg:p-6 clip-card"
                    >
                        <h3 className="font-speed text-2xl lg:text-3xl text-white mb-2">FULL STACK DEV</h3>
                        <p className="font-tech text-dust text-xs lg:text-sm leading-relaxed">
                            Specialized in high-performance web apps and game interfaces.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="group hidden lg:block"
                    >
                        <h2 className="text-4xl lg:text-6xl font-speed text-white italic group-hover:text-racing-orange transition-colors">
                            LVL <span className="text-transparent text-stroke">20</span>
                        </h2>
                        <div className="w-full h-2 bg-steel mt-2 skew-x-[-20deg]">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "80%" }}
                                transition={{ delay: 1, duration: 1.5, ease: "circOut" }}
                                className="h-full bg-racing-orange shadow-[0_0_10px_#FF4D00]"
                            />
                        </div>
                    </motion.div>
                </div>

                {/* Center Character (Hook Placeholder) */}
                <div className="lg:col-span-6 relative flex flex-col items-center justify-center order-1 lg:order-2 h-[40vh] lg:h-[80vh]">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0, y: 50 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "backOut" }}
                        className="relative w-full h-full flex items-center justify-center"
                    >
                        {/* Glow Behind */}
                        <div className="absolute w-[200px] lg:w-[400px] h-[200px] lg:h-[400px] bg-racing-orange/20 blur-[60px] lg:blur-[100px] animate-pulse rounded-full"></div>

                        {/* Robot Character Placeholder */}
                        <motion.img
                            animate={{ y: [-10, 10, -10] }}
                            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                            src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop"
                            alt="Hook Character"
                            className="h-full object-contain grayscale-[0.2] drop-shadow-[0_0_20px_rgba(255,77,0,0.5)] z-10"
                        />

                        {/* Floating HUD Elements */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1, x: [0, 5, 0] }}
                            transition={{ delay: 1, repeat: Infinity, duration: 0.2, repeatDelay: 5 }}
                            className="absolute top-10 right-0 lg:right-10 bg-void/90 border border-neon-teal px-3 py-1 text-neon-teal font-tech text-[10px] tracking-widest z-20"
                        >
                            TARGET_LOCKED
                        </motion.div>
                    </motion.div>
                </div>

                {/* Right UI Panel */}
                <div className="lg:col-span-3 flex flex-col items-end gap-6 order-3">
                    <motion.div
                        initial={{ x: 30, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="text-right"
                    >
                        <div className="font-speed text-6xl lg:text-9xl text-white leading-none italic">
                            DEV
                        </div>
                        <div className="font-speed text-3xl lg:text-4xl text-transparent text-stroke -mt-2 lg:-mt-4 italic">
                            OPS_MODE
                        </div>
                    </motion.div>

                    <motion.a
                        href="#projects"
                        whileHover={{ scale: 1.05, skewX: -10 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-racing-orange text-black font-speed text-xl lg:text-2xl px-8 lg:px-10 py-3 skew-x-[-20deg] shadow-[0_0_20px_rgba(255,77,0,0.4)] hover:shadow-[0_0_40px_rgba(255,77,0,0.6)] transition-all"
                    >
                        <span className="block skew-x-[20deg]">START GAME</span>
                    </motion.a>
                </div>
            </div>
        </section>
    );
};

export default Hero;
