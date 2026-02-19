import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -150]);

    return (
        <section id="hero" className="relative h-screen overflow-hidden flex items-center justify-center bg-void">
            {/* Background Parallax Layer (Fog/Smoke) */}
            <motion.div
                style={{ y: y1 }}
                className="absolute inset-0 z-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1542256844-3b957662c199?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay grayscale"
            ></motion.div>

            {/* Secondary Texture Layer */}
            <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/concrete-wall.png')]"></div>

            {/* Ember Particles Overlay */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-ember rounded-full blur-[1px]"
                        initial={{
                            x: Math.random() * 100 + "%",
                            y: "100vh",
                            opacity: 0
                        }}
                        animate={{
                            y: "-10vh",
                            opacity: [0, 1, 0],
                            x: `calc(${Math.random() * 100}% + ${Math.random() * 200 - 100}px)`
                        }}
                        transition={{
                            duration: Math.random() * 10 + 10,
                            repeat: Infinity,
                            ease: "linear",
                            delay: Math.random() * 10
                        }}
                    />
                ))}
            </div>

            {/* Foreground Content */}
            <motion.div
                style={{ y: y2 }}
                className="relative z-10 text-center px-4 flex flex-col items-center"
            >
                {/* Small Top Tag */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="text-ember font-tech tracking-[0.5em] text-sm md:text-base mb-4 uppercase"
                >
                    System Status: Critical
                </motion.div>

                {/* Main Brush Title */}
                <motion.h1
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1.2, ease: "easeOut" }}
                    className="text-6xl md:text-8xl lg:text-9xl font-brush text-ash leading-none mb-6 text-stroke shadow-black drop-shadow-2xl"
                >
                    KEEP <br />
                    <span className="text-ember">MOVING</span>
                </motion.h1>

                {/* Subtitle / Quote */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="text-dust font-tech text-lg md:text-xl max-w-xl mx-auto tracking-widest bg-black/50 p-4 border-l-2 border-ember backdrop-blur-sm"
                >
                    BUILD. SCAVENGE. DEPLOY. <br />
                    THE WEB IS A VAST, DYING WORLD.
                </motion.p>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-10 z-10 flex flex-col items-center gap-2 text-ember opacity-80"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
            >
                <span className="text-xs font-tech tracking-[0.3em]">DESCEND</span>
                <ArrowDown className="w-6 h-6" />
            </motion.div>

            {/* Bottom Rough Edge Mask */}
            <div className="absolute bottom-0 left-0 w-full h-24 bg-void clip-rough z-20 translate-y-1"></div>
        </section>
    );
};

export default Hero;
