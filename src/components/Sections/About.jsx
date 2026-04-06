import React from 'react';
import { motion } from 'framer-motion';

const bentoItems = [
    { title: "React & Next.js", desc: "Building massive scale UI", span: "col-span-12 md:col-span-8", icon: "⚛️" },
    { title: "Node.js", desc: "Robust backend systems", span: "col-span-12 md:col-span-4", icon: "⚡" },
    { title: "Three.js / GLSL", desc: "Immersive 3D experiences", span: "col-span-12 md:col-span-4", icon: "🧊" },
    { title: "System Architecture", desc: "Scalable infrastructure", span: "col-span-12 md:col-span-8", icon: "🏗️" },
];

const About = () => {
    return (
        <section id="about" className="py-24 px-6 sm:px-12 relative">
            <div className="max-w-7xl mx-auto">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="mb-16"
                >
                    <h2 className="text-SM text-indigo-400 font-semibold tracking-widest uppercase mb-3">About The Architect</h2>
                    <h3 className="text-4xl md:text-5xl font-outfit font-bold text-white max-w-3xl leading-tight">
                        I fuse rigorous engineering with premium aesthetics to build software that simply outclasses the rest.
                    </h3>
                </motion.div>

                <div className="grid grid-cols-12 gap-6">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="col-span-12 lg:col-span-5 glass-panel rounded-3xl p-8 flex flex-col justify-end min-h-[400px] relative overflow-hidden group"
                    >
                        <img 
                            src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80" 
                            alt="Code Terminal" 
                            className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent"></div>
                        <div className="relative z-10">
                            <h4 className="text-2xl font-outfit font-bold text-white mb-2">My Philosophy</h4>
                            <p className="text-gray-400">
                                Engineering is art. Whether it's crafting complex React state or orchestrating microservices, to me, elegance under the hood matters just as much as on the surface.
                            </p>
                        </div>
                    </motion.div>

                    <div className="col-span-12 lg:col-span-7 grid grid-cols-12 gap-6">
                        {bentoItems.map((item, i) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 * i }}
                                className={`glass-card rounded-3xl p-8 flex flex-col justify-between group overflow-hidden relative ${item.span}`}
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-colors"></div>
                                <span className="text-3xl mb-4">{item.icon}</span>
                                <div>
                                    <h5 className="text-xl font-outfit font-semibold text-white mb-1 group-hover:text-indigo-300 transition-colors">{item.title}</h5>
                                    <p className="text-gray-500 text-sm font-inter">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
