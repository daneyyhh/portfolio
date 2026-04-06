import React from 'react';
import { motion } from 'framer-motion';

const skills = [
    { title: 'Frontend Ecosystem', desc: 'React, Next.js, Framer Motion, Tailwind, GSAP', level: 95 },
    { title: 'Backend Architecture', desc: 'Node.js, Express, PostgreSQL, MongoDB, Redis', level: 88 },
    { title: 'Game Engineering', desc: 'Unity, C#, LUA, FiveM Systems', level: 90 },
    { title: 'Design & UI/UX', desc: 'Figma, Glassmorphism, Premium Aesthetics', level: 85 },
];

const Capabilities = () => {
    return (
        <section id="capabilities" className="py-24 px-6 sm:px-12 relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-sm text-purple-400 font-semibold tracking-widest uppercase mb-3">Capabilities</h2>
                        <h3 className="text-4xl md:text-5xl font-outfit font-bold text-white">Technical Arsenal</h3>
                    </motion.div>
                    
                    <motion.p 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-400 max-w-md md:text-right"
                    >
                        Tools and languages are just a means to an end. My true capability is delivering scalable, elite products.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                    {skills.map((skill, i) => (
                        <motion.div
                            key={skill.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <div className="flex justify-between items-end mb-3">
                                <div>
                                    <h4 className="text-xl font-outfit font-semibold text-gray-100">{skill.title}</h4>
                                    <p className="text-xs text-gray-500 mt-1">{skill.desc}</p>
                                </div>
                                <span className="text-sm text-indigo-400 font-medium font-outfit">{skill.level}%</span>
                            </div>
                            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/10">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${skill.level}%` }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1, delay: 0.3 + (i * 0.1), ease: "easeOut" }}
                                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Capabilities;
