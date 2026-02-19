import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-paper-white">

            {/* Split Background (Pink Right Side) */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-cyber-pink clip-angle-left z-0"></div>

            {/* Geometric Decor */}
            <div className="absolute top-20 left-10 w-12 h-1 bg-void mb-2"></div>
            <div className="absolute top-24 left-10 w-8 h-1 bg-cyber-pink"></div>
            <div className="absolute bottom-10 right-10 w-24 h-24 border-2 border-void opacity-20 rotate-45"></div>

            <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 h-full items-center">

                {/* Left: Text & Info */}
                <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col justify-center h-full order-2 lg:order-1 pt-20 lg:pt-0"
                >
                    <h5 className="font-tech text-void tracking-[0.5em] text-sm mb-4 bg-cyber-pink inline-block px-2 py-1 w-max">
                        REUBX_DEV // V3.0
                    </h5>

                    {/* Giant Typography */}
                    <div className="relative leading-[0.8] mix-blend-difference text-void z-20">
                        <h1 className="font-poster text-[15vw] lg:text-[12rem] uppercase flex flex-col">
                            <span>BURN</span>
                            <span className="text-stroke text-transparent ml-20">THE</span>
                            <span>PAST</span>
                        </h1>
                    </div>

                    <p className="font-sans text-charcoal max-w-md mt-8 text-lg font-bold border-l-4 border-void pl-6 tracking-wide">
                        MOVE ON. BUILD FASTER. <br />
                        RE-IMAGINE THE DIGITAL LANDSCAPE.
                    </p>

                    <div className="mt-12 flex gap-4">
                        <a href="#projects" className="px-8 py-3 bg-void text-white font-poster tracking-wider text-xl hover:bg-cyber-pink transition-colors skew-x-[-10deg]">
                            <span className="skew-x-[10deg] block">VIEW WORK</span>
                        </a>
                    </div>
                </motion.div>

                {/* Right: Character Visual (Placeholder) */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="relative h-[50vh] lg:h-[80vh] flex items-center justify-center order-1 lg:order-2"
                >
                    {/* Glitch Box / Image Placeholder */}
                    <div className="relative w-full h-full max-w-md bg-charcoal clip-angle overflow-hidden group">
                        <img
                            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1760&auto=format&fit=crop"
                            alt="Cyber Character"
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-110"
                        />

                        {/* Glitch Overlay Layers */}
                        <div className="absolute inset-0 bg-cyber-pink opacity-0 group-hover:opacity-20 mix-blend-multiply transition-opacity"></div>
                        <div className="absolute top-10 left-0 w-full h-1 bg-white translate-x-full group-hover:translate-x-0 transition-transform duration-300 delay-75"></div>
                        <div className="absolute bottom-20 right-0 w-full h-2 bg-cyber-pink translate-x-full group-hover:translate-x-0 transition-transform duration-300 delay-150"></div>
                    </div>

                    {/* Floating Tech Elements */}
                    <div className="absolute -right-8 top-1/4 font-tech text-xs text-white rotate-90 tracking-widest opacity-50">
                        SYSTEM_OVERRIDE
                    </div>
                </motion.div>
            </div>

            {/* Bottom Glitch Bar */}
            <div className="absolute bottom-0 w-full h-4 bg-void flex space-x-1">
                <div className="w-1/4 h-full bg-cyber-pink animate-pulse"></div>
                <div className="w-1/2 h-full bg-charcoal"></div>
                <div className="w-1/4 h-full bg-ash"></div>
            </div>
        </section>
    );
};

export default Hero;
