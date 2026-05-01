import React from 'react';
import { motion } from 'framer-motion';

const dossierItems = [
    { title: "React & Next.js", desc: "Core Logic Engine / Production Tier", icon: "⚛️" },
    { title: "Node.js", desc: "Server-Side Ops / High Bandwidth", icon: "⚡" },
    { title: "Three.js", desc: "Spatial Visualization / 3D Render", icon: "🧊" },
    { title: "System Arch", desc: "Structural Integrity / Scalability", icon: "🏗️" },
];

const About = () => {
    return (
        <section id="about" className="py-32 px-6 sm:px-12 relative bg-spider-white overflow-hidden">
            {/* Background Halftone */}
            <div className="absolute inset-0 halftone-overlay opacity-10 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col lg:flex-row gap-16 items-start">
                    {/* Left Side: Profile Dossier */}
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="w-full lg:w-1/2"
                    >
                        <div className="relative">
                            {/* Decorative Shadow */}
                            <div className="absolute inset-0 bg-spider-black translate-x-4 translate-y-4 -z-10"></div>
                            
                            <div className="bg-spider-white border-4 border-spider-black p-8 relative">
                                <div className="absolute -top-6 -left-6 bg-spider-red border-4 border-spider-black px-6 py-2 rotate-[-3deg]">
                                    <h2 className="font-bangers text-3xl text-spider-white tracking-wider">DOSSIER_01</h2>
                                </div>

                                <div className="mt-8 mb-8 relative aspect-[4/5] overflow-hidden border-4 border-spider-black">
                                    <img 
                                        src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80" 
                                        alt="Code Terminal" 
                                        className="w-full h-full object-cover filter contrast-125 saturate-150"
                                    />
                                    <div className="absolute inset-0 halftone-overlay opacity-30"></div>
                                    <div className="absolute inset-0 bg-spider-red/20 mix-blend-multiply"></div>
                                </div>

                                <h3 className="font-bangers text-5xl text-spider-black mb-4 leading-none">THE ARCHITECT</h3>
                                <div className="w-20 h-1.5 bg-spider-yellow mb-6"></div>
                                <p className="font-mono text-sm font-bold text-spider-black leading-relaxed">
                                    "I fuse rigorous engineering with premium aesthetics to build software that simply outclasses the rest. Engineering is art. Whether it's crafting complex React state or orchestrating microservices, to me, elegance under the hood matters just as much as on the surface."
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Side: Technical Specs */}
                    <div className="w-full lg:w-1/2 flex flex-col gap-8">
                        <div className="bg-spider-black p-4 inline-block self-start rotate-[1deg]">
                            <h4 className="font-bangers text-2xl text-spider-yellow tracking-widest uppercase">TECHNICAL_SPECIFICATIONS</h4>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {dossierItems.map((item, i) => (
                                <motion.div
                                    key={item.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 * i }}
                                    className="bg-spider-white border-4 border-spider-black p-6 relative group hover:bg-spider-yellow transition-colors"
                                >
                                    <div className="absolute -top-3 -left-3 bg-spider-black text-spider-white w-10 h-10 flex items-center justify-center border-2 border-spider-yellow font-bangers text-xl">
                                        {i + 1}
                                    </div>
                                    <div className="mt-4">
                                        <h5 className="font-bangers text-3xl text-spider-black mb-1">{item.title}</h5>
                                        <div className="h-0.5 w-full bg-spider-black/10 mb-2"></div>
                                        <p className="font-mono text-[10px] font-bold text-spider-black uppercase tracking-tighter">
                                            {item.desc}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Extra Status Box */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="bg-spider-red border-4 border-spider-black p-6 shadow-[8px_8px_0px_#0A0A0A]"
                        >
                            <h5 className="font-bangers text-2xl text-spider-white mb-2 tracking-wide">STATUS: ACTIVE // REDLINE</h5>
                            <p className="font-mono text-[10px] font-bold text-spider-white/90 leading-tight">
                                CONTINUOUS INTEGRATION DETECTED. SUBJECT IS CAPABLE OF RAPID PROTOTYPING AND MASSIVE SCALE DEPLOYMENTS. EXTREME CAUTION ADVISED DURING UI OVERHAULS.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;

