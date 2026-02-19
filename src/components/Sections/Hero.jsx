import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-void">

            {/* Background Texture/Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,77,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,77,0,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0a0a0a_90%)]"></div>

            {/* Giant Background Text */}
            <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none z-0">
                <h1 className="text-[25vw] font-speed font-bold text-transparent text-stroke opacity-20 italic tracking-tighter leading-none">
                    REUBEN
                </h1>
            </div>

            <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 h-screen items-center">

                {/* Left UI Panel */}
                <div className="lg:col-span-3 flex flex-col gap-8 order-2 lg:order-1 pt-10 lg:pt-0">
                    <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="bg-carbon border-l-4 border-neon-teal p-6 clip-card"
                    >
                        <h3 className="font-speed text-3xl text-white mb-2">FULL STACK DEV</h3>
                        <p className="font-tech text-dust text-sm leading-relaxed">
                            Specialized in high-performance web applications and immersive game interfaces.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="group"
                    >
                        <h2 className="text-6xl font-speed text-white italic group-hover:text-racing-orange transition-colors">
                            LVL <span className="text-transparent text-stroke">20</span>
                        </h2>
                        <div className="w-full h-2 bg-steel mt-2 skew-x-[-20deg]">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "80%" }}
                                transition={{ delay: 1, duration: 1 }}
                                className="h-full bg-racing-orange"
                            />
                        </div>
                    </motion.div>
                </div>

                {/* Center Character (Hook Placeholder) */}
                <div className="lg:col-span-6 relative flex justify-center order-1 lg:order-2 h-[50vh] lg:h-[80vh]">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="relative w-full h-full flex items-center justify-center"
                    >
                        {/* Glow Behind */}
                        <div className="absolute w-[300px] h-[300px] bg-racing-orange blur-[100px] opacity-20 animate-pulse"></div>

                        {/* Robot Character Placeholder */}
                        {/* User can replace 'src' with their actual Hook Character image */}
                        <img
                            src="https://images.unsplash.com/photo-1616169542099-56833c87dc14?q=80&w=1000&auto=format&fit=crop"
                            alt="Hook Character"
                            className="h-full object-contain grayscale-[0.2] drop-shadow-[0_0_30px_rgba(255,77,0,0.3)] mask-image:linear-gradient(to bottom, black 80%, transparent 100%)"
                        />

                        {/* Floating HUD Elements */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 4 }}
                            className="absolute top-20 right-10 bg-void/80 backdrop-blur border border-neon-teal/50 px-4 py-1 rounded text-neon-teal font-tech text-xs"
                        >
                            SYS: OPTIMAL
                        </motion.div>
                    </motion.div>
                </div>

                {/* Right UI Panel */}
                <div className="lg:col-span-3 flex flex-col items-end gap-6 order-3">
                    <motion.div
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="text-right"
                    >
                        <div className="font-speed text-9xl text-white leading-none italic">
                            DEV
                        </div>
                        <div className="font-speed text-4xl text-transparent text-stroke -mt-4 italic">
                            OPS_MODE
                        </div>
                    </motion.div>

                    <motion.a
                        href="#projects"
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="bg-racing-orange text-black font-speed text-2xl px-10 py-3 skew-x-[-20deg] hover:bg-white hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,77,0,0.4)]"
                    >
                        <span className="block skew-x-[20deg]">START GAME</span>
                    </motion.a>

                    <div className="mt-8 border border-racing-orange/30 p-4 w-full bg-racing-orange/5 clip-bento relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-1 bg-racing-orange text-[10px] text-black font-bold">DANGER</div>
                        <p className="font-tech text-dust text-xs">
                            CAUTION: HIGH VELOCITY CODING IN PROGRESS.
                            KEEP HANDS AND FEET INSIDE THE RIG.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
