import React from 'react';
import { motion } from 'framer-motion';
import { Send, Github, Linkedin, Twitter, Mail } from 'lucide-react';

const SocialLink = ({ icon: Icon, href }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="p-3 bg-gray-900 rounded-full border border-cyan-900/50 text-cyan-500 hover:bg-cyan-500 hover:text-black hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all"
    >
        <Icon className="w-5 h-5" />
    </a>
);

const Contact = () => {
    return (
        <section id="contact" className="min-h-screen py-20 bg-black relative flex items-center justify-center">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(147,51,234,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(147,51,234,0.05)_1px,transparent_1px)] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)] pointer-events-none"></div>

            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">

                {/* Left: Text & Socials */}
                <div className="flex flex-col justify-center">
                    <h2 className="text-4xl md:text-5xl font-[Orbitron,sans-serif] font-bold text-white mb-6">
                        READY TO <br />
                        <span className="text-purple-500 text-stroke">TEAM UP?</span>
                    </h2>

                    <p className="text-gray-400 text-lg mb-8 max-w-md">
                        Whether you need a player 2 for your next project or want to discuss game mechanics, my comms are open.
                        <br /><br />
                        Initiate a transmission via the form or connect on these channels.
                    </p>

                    <div className="flex gap-4">
                        <SocialLink icon={Github} href="https://github.com/daneyyhh" />
                        <SocialLink icon={Linkedin} href="#" />
                        <SocialLink icon={Twitter} href="#" />
                        <SocialLink icon={Mail} href="mailto:reuben@example.com" />
                    </div>
                </div>

                {/* Right: Holographic Form */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="bg-gray-900/40 backdrop-blur-md border border-cyan-500/30 p-8 rounded-lg shadow-[0_0_30px_rgba(6,182,212,0.1)] relative overflow-hidden"
                >
                    {/* Decorative Corner */}
                    <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-cyan-500/50 rounded-tr-lg"></div>
                    <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-cyan-500/50 rounded-bl-lg"></div>

                    <form className="flex flex-col gap-6">
                        <div>
                            <label className="text-xs font-mono text-cyan-500 mb-1 block">PLAYER NAME</label>
                            <input
                                type="text"
                                className="w-full bg-black/50 border border-gray-700 rounded p-3 text-white focus:border-cyan-500 focus:outline-none focus:shadow-[0_0_10px_rgba(6,182,212,0.2)] transition-all font-mono"
                                placeholder="Enter your UserID"
                            />
                        </div>

                        <div>
                            <label className="text-xs font-mono text-cyan-500 mb-1 block">COMMS CHANNEL (EMAIL)</label>
                            <input
                                type="email"
                                className="w-full bg-black/50 border border-gray-700 rounded p-3 text-white focus:border-cyan-500 focus:outline-none focus:shadow-[0_0_10px_rgba(6,182,212,0.2)] transition-all font-mono"
                                placeholder="name@server.com"
                            />
                        </div>

                        <div>
                            <label className="text-xs font-mono text-cyan-500 mb-1 block">QUEST TYPE</label>
                            <select className="w-full bg-black/50 border border-gray-700 rounded p-3 text-gray-400 focus:border-cyan-500 focus:text-white focus:outline-none transition-all font-mono">
                                <option>General Inquiry</option>
                                <option>Project Collaboration</option>
                                <option>Recruitment</option>
                                <option>Bug Report</option>
                            </select>
                        </div>

                        <div>
                            <label className="text-xs font-mono text-cyan-500 mb-1 block">TRANSMISSION MESSAGE</label>
                            <textarea
                                rows="4"
                                className="w-full bg-black/50 border border-gray-700 rounded p-3 text-white focus:border-cyan-500 focus:outline-none focus:shadow-[0_0_10px_rgba(6,182,212,0.2)] transition-all font-mono"
                                placeholder="Type your message here..."
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="bg-cyan-600 hover:bg-cyan-500 text-black font-bold py-4 px-8 rounded flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] group overflow-hidden relative"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                <Send className="w-4 h-4" /> SEND TRANSMISSION
                            </span>
                            {/* Hover shine effect */}
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                        </button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
