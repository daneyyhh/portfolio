import React from 'react';
import { motion } from 'framer-motion';

const Stat = ({ label, value }) => (
    <div className="mb-6">
        <div className="flex justify-between font-tech text-ash uppercase tracking-widest text-sm mb-2">
            <span>{label}</span>
            <span className="text-ember">{value}%</span>
        </div>
        <div className="h-2 bg-charcoal w-full overflow-hidden skew-x-[-20deg] border border-dust/30">
            <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${value}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "circOut" }}
                className="h-full bg-ember"
            />
        </div>
    </div>
);

const About = () => {
    return (
        <section id="about" className="min-h-screen py-24 bg-void relative overflow-hidden flex items-center">
            {/* Background Splatter/Texture */}
            <div className="absolute top-0 right-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/black-felt.png')]"></div>

            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10">

                {/* Text Content */}
                <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-sm font-tech text-ember tracking-[0.5em] mb-4 uppercase">ABOUT THE SURVIVOR</h2>
                    <h1 className="text-6xl md:text-8xl font-brush text-ash -rotate-2 mb-8 drop-shadow-lg leading-tight">
                        FULL STACK <br />
                        <span className="text-stroke text-ember">WALKER</span>
                    </h1>

                    <div className="relative p-8 bg-charcoal/50 border-l-4 border-ember clip-angle backdrop-blur-sm">
                        <p className="font-sans text-dust leading-relaxed text-lg mb-6">
                            Traversing the digital wastelands to build robust, scalable applications.
                            Specializing in the REACT ecosystem and MMO-scale architectures.
                            I adapt. I scavenge new tech. I survive the crunch.
                        </p>
                        <p className="font-tech text-ash uppercase tracking-wider text-sm">
                            /// LAST LOCATION: SECTOR.REACT <br />
                            /// STATUS: ONLINE & READY
                        </p>
                    </div>
                </motion.div>

                {/* Stats / Graphic */}
                <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    className="flex flex-col justify-center"
                >
                    <div className="relative">
                        {/* Decorative Brush Stroke Background */}
                        <div className="absolute -inset-10 bg-ember opacity-5 blur-3xl rounded-full"></div>

                        <Stat label="Frontend Engineering" value={95} />
                        <Stat label="Backend Systems" value={80} />
                        <Stat label="Game Design" value={85} />
                        <Stat label="UI / UX Survival" value={90} />

                        {/* Inventory Grid */}
                        <div className="mt-12 grid grid-cols-4 gap-2">
                            {['JS', 'TS', 'REACT', 'NODE', 'C++', 'UNITY', 'GIT', 'SQL'].map((item) => (
                                <div key={item} className="border border-dust/30 p-2 text-center text-xs font-tech text-dust hover:text-ember hover:border-ember transition-colors cursor-crosshair">
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Bottom Torn Edge */}
            <div className="absolute bottom-0 w-full h-16 bg-gradient-to-t from-black to-transparent z-20"></div>
        </section>
    );
};

export default About;
