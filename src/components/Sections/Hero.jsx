import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section id="hero" className="min-h-[90vh] flex flex-col items-center justify-center relative overflow-hidden px-6 sm:px-12">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-5 mix-blend-luminosity"></div>
            
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="z-10 text-center max-w-4xl mx-auto"
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="inline-flex py-1 px-3 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-semibold tracking-widest uppercase mb-8 backdrop-blur-md"
                >
                    Available for Work
                </motion.div>
                
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black font-outfit tracking-tighter leading-tight mb-6">
                    Building the <span className="text-gradient">Future</span> <br /> of Interfaces.
                </h1>
                
                <p className="text-gray-400 text-lg md:text-xl font-inter max-w-2xl mx-auto mb-10">
                    I'm Reuben, a creative engineer crafting ultra-modern, high-performance web applications and systems that leave a lasting impression.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a href="#projects" className="w-full sm:w-auto px-8 py-3 rounded-full bg-white text-gray-900 font-semibold font-outfit hover:bg-indigo-50 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                        Explore Work
                    </a>
                    <a href="#contact" className="w-full sm:w-auto px-8 py-3 rounded-full glass-card text-white font-medium font-outfit flex items-center justify-center gap-2 group">
                        Let's Talk
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </a>
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;
