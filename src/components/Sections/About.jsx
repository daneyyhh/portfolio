import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <section id="about" className="py-24 bg-void relative overflow-hidden min-h-screen flex items-center">
            {/* Decor */}
            <div className="absolute -left-10 top-1/4 w-40 h-[500px] bg-acid-lime skew-x-[-20deg] opacity-10"></div>

            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row gap-12 items-center">

                    {/* Text Panel */}
                    <div className="flex-1">
                        <h2 className="font-speed text-6xl text-white italic mb-6">
                            CODE <span className="text-acid-lime">RUNNER</span>
                        </h2>
                        <div className="bg-carbon border-l-4 border-acid-lime p-8 clip-angle-button">
                            <p className="font-tech text-ash text-lg mb-4">
                                Navigating the bleeding edge of web development.
                                I build responsive, high-performance applications that feel like modern gaming experiences.
                            </p>
                            <p className="font-tech text-dust">
                                // CURRENT OBJECTIVE: DOMINATE THE STACK
                            </p>
                        </div>
                    </div>

                    {/* Stats Panel */}
                    <div className="flex-1 w-full">
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { label: "SPEED", val: "98" },
                                { label: "DESIGN", val: "94" },
                                { label: "LOGIC", val: "90" },
                                { label: "ARMOR", val: "100" }
                            ].map((stat) => (
                                <motion.div
                                    key={stat.label}
                                    whileHover={{ scale: 1.05 }}
                                    className="bg-steel p-6 clip-card hover:bg-acid-lime hover:text-black transition-colors group"
                                >
                                    <div className="text-xs font-tech tracking-widest text-dust group-hover:text-black/70">{stat.label}</div>
                                    <div className="text-4xl font-speed font-bold">{stat.val}%</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
