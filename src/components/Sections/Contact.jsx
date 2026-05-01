import React from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
    return (
        <section id="contact" className="py-32 px-6 sm:px-12 relative bg-spider-black bg-grid halftone-overlay overflow-hidden">
            {/* Background Spidey Signal Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-spider-red/20 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
            
            <div className="max-w-4xl mx-auto relative z-10">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <div className="bg-spider-yellow text-spider-black font-bangers text-xl px-6 py-1 inline-block mb-6 rotate-[-1deg] border-2 border-spider-black shadow-[4px_4px_0px_#E8272A]">
                        URGENT // TRANSMISSION_REQUIRED
                    </div>
                    <h2 className="text-6xl md:text-8xl font-bangers text-spider-white drop-shadow-[6px_6px_0px_#E8272A] mb-8 leading-none">
                        SEND A <span className="text-spider-yellow">SIGNAL</span>
                    </h2>
                    <p className="font-mono text-xs font-bold text-spider-white/60 max-w-2xl mx-auto uppercase tracking-widest">
                        Whether it's a new scalable application or an immersive experience. I'm available for high-priority missions.
                    </p>
                </motion.div>

                <motion.form 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="bg-spider-black border-4 border-spider-yellow p-8 md:p-12 relative shadow-[12px_12px_0px_#E8272A]"
                >
                    {/* Comic Panel Header */}
                    <div className="absolute -top-5 left-8 bg-spider-black px-4 py-1 border-2 border-spider-yellow">
                        <span className="font-mono text-[10px] font-bold text-spider-yellow uppercase">Identity_Verification</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        <div className="flex flex-col gap-3">
                            <label className="font-bangers text-2xl text-spider-yellow uppercase tracking-wide">NAME / CODENAME</label>
                            <input
                                type="text" 
                                placeholder="PETER_PARKER"
                                className="bg-transparent border-b-4 border-spider-yellow p-4 font-mono text-sm font-bold text-spider-white focus:outline-none focus:border-spider-red transition-all placeholder:text-spider-white/20"
                            />
                        </div>
                        <div className="flex flex-col gap-3">
                            <label className="font-bangers text-2xl text-spider-yellow uppercase tracking-wide">SECURE_CHANNEL (EMAIL)</label>
                            <input
                                type="email" 
                                placeholder="STARK_INDUSTRIES@NET"
                                className="bg-transparent border-b-4 border-spider-yellow p-4 font-mono text-sm font-bold text-spider-white focus:outline-none focus:border-spider-red transition-all placeholder:text-spider-white/20"
                            />
                        </div>
                    </div>
                    
                    <div className="flex flex-col gap-3 mb-10">
                        <label className="font-bangers text-2xl text-spider-yellow uppercase tracking-wide">TRANSMISSION_DETAILS</label>
                        <textarea
                            placeholder="TELL ME ABOUT YOUR MISSION..." 
                            rows="4"
                            className="bg-spider-white/5 border-4 border-spider-yellow p-4 font-mono text-sm font-bold text-spider-white focus:outline-none focus:border-spider-red transition-all placeholder:text-spider-white/20 resize-none"
                        />
                    </div>
                    
                    <div className="flex justify-center">
                        <button className="relative group">
                            <div className="absolute inset-0 bg-spider-black translate-x-2 translate-y-2 group-hover:translate-x-1 group-hover:translate-y-1 transition-all"></div>
                            <div className="relative bg-spider-yellow border-4 border-spider-black px-12 py-4 font-bangers text-4xl text-spider-black group-hover:bg-spider-red group-hover:text-spider-white transition-all">
                                SEND SIGNAL_
                            </div>
                        </button>
                    </div>

                    {/* Decorative Corner */}
                    <div className="absolute bottom-4 right-4 opacity-10 font-mono text-[8px] font-bold text-spider-black">
                        SECURE_TRANS_V2.0
                    </div>
                </motion.form>
            </div>
        </section>
    );
};

export default Contact;

