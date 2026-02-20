import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-void pt-24 lg:pt-0">

            {/* Background Texture - Clean Black */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20"></div>

            <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                {/* Left: Text Content */}
                <div className="flex flex-col items-start text-left gap-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col gap-2"
                    >
                        <h1 className="text-6xl lg:text-8xl font-speed font-bold text-white leading-[0.9] tracking-wide uppercase">
                            REUBEN
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="font-tech text-gray-400 text-sm lg:text-base max-w-md leading-relaxed"
                    >
                        A hardcore gamer and relentless game developer, grinding final-year BCA at Yenepoya University to craft addictive Unity worlds fueled by C# fury.

From Haripad's battlegrounds, I dominate with AI chess crushers, FiveM mayhem servers, and Discord bots that rule esports empires 24/7.

Every raid in BGMI, Fortnite drop, or CoD clutch sharpens my code—I'm the raid boss scripting immersive chaos and glitchless 3D spectacles.

Gaming isn't a hobby; it's my blood—obsessed with turning noob dreams into pro-level hits via endless dev marathons.

Level up with me: hardcore collabs only for the next viral gaming apocalypse.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex gap-4"
                    >
                        <a href="#projects" className="bg-acid-lime text-black font-tech font-bold text-sm px-8 py-4 uppercase tracking-widest hover:bg-white transition-colors">
                            GET STARTED
                        </a>
                        <button className="border border-acid-lime text-acid-lime font-tech font-bold text-sm px-8 py-4 uppercase tracking-widest hover:bg-acid-lime hover:text-black transition-colors">
                            EXPLORE
                        </button>
                    </motion.div>
                </div>

                {/* Right: Portal Image */}
                <div className="relative flex items-center justify-center h-[50vh] lg:h-[80vh]">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="relative w-full h-full"
                    >
                        {/* Portal Glow */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] lg:w-[500px] lg:h-[500px] bg-acid-lime/30 blur-[100px] rounded-full animate-pulse"></div>

                        {/* Image Placeholder - Replaced with a Portal-like asset or CSS shape if image fails */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-[300px] h-[300px] lg:w-[500px] lg:h-[500px] border-[20px] border-acid-lime/20 rounded-full flex items-center justify-center relative bg-black">
                                <div className="w-[90%] h-[90%] bg-[url('https://images.unsplash.com/photo-1614726365723-49cfae9e035d?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center rounded-full opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"></div>

                                {/* Floating Orbitals */}
                                <div className="absolute inset-0 border border-acid-lime/50 rounded-full animate-[spin_10s_linear_infinite]"></div>
                                <div className="absolute inset-4 border border-dashed border-acid-lime/30 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
                            </div>
                        </div>
                    </motion.div>
                </div>

            </div>
        </section>
    );
};

export default Hero;
