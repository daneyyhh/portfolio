import React from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
    return (
        <section id="contact" className="py-32 px-6 sm:px-12 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="max-w-4xl mx-auto relative z-10">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-sm text-indigo-400 font-semibold tracking-widest uppercase mb-3 block">Start A Project</span>
                    <h2 className="text-4xl md:text-6xl font-outfit font-bold text-white mb-6">Let's Build <span className="text-gradient">Together</span></h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Whether it's a new scalable application, a web3 platform, or an immersive 3D experience. I'm available for freelance and full-time opportunities.
                    </p>
                </motion.div>

                <motion.form 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="glass-panel p-8 md:p-12 rounded-3xl grid grid-cols-1 gap-6"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm text-gray-400 font-medium">Name</label>
                            <input
                                type="text" 
                                placeholder="John Doe"
                                className="bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-indigo-500/50 focus:bg-white/10 transition-all placeholder:text-gray-600"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm text-gray-400 font-medium">Email</label>
                            <input
                                type="email" 
                                placeholder="john@example.com"
                                className="bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-indigo-500/50 focus:bg-white/10 transition-all placeholder:text-gray-600"
                            />
                        </div>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-gray-400 font-medium">Project Details</label>
                        <textarea
                            placeholder="Tell me about your vision..." 
                            rows="5"
                            className="bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-indigo-500/50 focus:bg-white/10 transition-all placeholder:text-gray-600 resize-none"
                        />
                    </div>
                    
                    <button className="btn-primary mt-4 py-4 w-full md:w-auto md:px-12 md:mx-auto">
                        Send Message
                    </button>
                </motion.form>
            </div>
        </section>
    );
};

export default Contact;
