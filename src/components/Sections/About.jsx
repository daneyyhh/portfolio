import React from 'react';
import { motion } from 'framer-motion';
import { User, Code, Server, Gamepad2, Layers } from 'lucide-react';

const SkillBar = ({ label, level, color = "bg-cyan-500" }) => (
    <div className="mb-4">
        <div className="flex justify-between text-xs font-mono text-cyan-500 mb-1 pointer-events-none">
            <span>{label}</span>
            <span>LVL {level}</span>
        </div>
        <div className="h-2 w-full bg-gray-900 rounded-full overflow-hidden border border-gray-800">
            <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${level}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className={`h-full ${color} shadow-[0_0_10px_currentColor]`}
            />
        </div>
    </div>
);

const InventoryItem = ({ name }) => (
    <div className="bg-gray-900 border border-gray-800 px-3 py-1.5 rounded text-xs text-center hover:border-cyan-500 hover:text-cyan-400 hover:shadow-[0_0_10px_rgba(6,182,212,0.3)] transition-all cursor-default select-none">
        {name}
    </div>
);

const About = () => {
    return (
        <section id="about" className="min-h-screen py-20 relative bg-black flex items-center">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                {/* Left: Character Pose */}
                <div className="relative flex justify-center">
                    <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="w-full max-w-sm h-[400px] md:h-[500px] bg-gradient-to-t from-cyan-900/20 to-transparent border-x border-cyan-500/10 relative rounded-lg flex items-center justify-center"
                    >
                        {/* 2D Character Placeholder */}
                        <div className="relative z-10 w-48 h-48 md:w-64 md:h-64 bg-black border-2 border-cyan-600 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.2)]">
                            <User className="w-20 h-20 text-cyan-500" />
                        </div>

                        {/* Holo Base */}
                        <div className="absolute bottom-0 w-3/4 h-4 bg-cyan-500/20 blur-md rounded-[100%]"></div>

                        <div className="absolute top-4 left-4 text-[10px] font-mono text-cyan-700">
                            ID: REUBEN<br />
                            CLASS: DEV/GAMER
                        </div>
                    </motion.div>
                </div>

                {/* Right: Stats & Info */}
                <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="relative"
                >
                    <h2 className="text-3xl font-[Orbitron,sans-serif] font-bold text-white mb-6 flex items-center gap-3">
                        <span className="text-cyan-500">//</span> PLAYER INFO
                    </h2>

                    <div className="bg-gray-950/50 border border-gray-800 p-6 rounded-lg backdrop-blur-sm shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                        <p className="text-gray-400 mb-8 leading-relaxed border-l-2 border-cyan-800 pl-4">
                            Passionate Game Developer and Full Stack Engineer based in the digital realm.
                            I specialize in creating interactive experiences that bridge the gap between
                            traditional web apps and immersive gaming interfaces.
                        </p>

                        {/* Stats / Skills */}
                        <div className="mb-8">
                            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                                <Code className="w-4 h-4 text-purple-500" /> SKILLS / WEAPONS
                            </h3>
                            <SkillBar label="FRONTEND (React, Tailwind)" level={95} color="bg-cyan-500" />
                            <SkillBar label="BACKEND (Node, DB)" level={80} color="bg-purple-500" />
                            <SkillBar label="GAME DEV (Unity, C#)" level={85} color="bg-green-500" />
                            <SkillBar label="UI/UX DESIGN" level={90} color="bg-yellow-500" />
                        </div>

                        {/* Inventory / Tools */}
                        <div>
                            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                                <Layers className="w-4 h-4 text-yellow-500" /> TOOLS / INVENTORY
                            </h3>
                            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                                <InventoryItem name="Unity" />
                                <InventoryItem name="React" />
                                <InventoryItem name="Node.js" />
                                <InventoryItem name="TypeScript" />
                                <InventoryItem name="Tailwind" />
                                <InventoryItem name="Figma" />
                                <InventoryItem name="Git" />
                                <InventoryItem name="Vercel" />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
