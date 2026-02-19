import React from 'react';
import { Send, Github, Linkedin, Twitter, Mail } from 'lucide-react';

const Contact = () => {
    return (
        <section id="contact" className="py-24 bg-carbon relative border-t-2 border-racing-orange/50">
            {/* Top Danger Bar */}
            <div className="absolute top-0 left-0 w-full h-4 danger-stripes opacity-20"></div>

            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

                    {/* Left: Transmission Form */}
                    <div>
                        <h2 className="font-speed text-5xl text-white italic mb-8">
                            ESTABLISH <span className="text-racing-orange">UPLINK</span>
                        </h2>

                        <form className="space-y-6">
                            <div>
                                <label className="block text-neon-teal font-tech text-xs tracking-widest mb-2">USER_ID</label>
                                <input type="text" className="w-full bg-void border border-steel p-4 text-white font-tech focus:border-racing-orange focus:outline-none transition-colors clip-bento" placeholder="ENTER NAME" />
                            </div>
                            <div>
                                <label className="block text-neon-teal font-tech text-xs tracking-widest mb-2">FREQUENCY</label>
                                <input type="email" className="w-full bg-void border border-steel p-4 text-white font-tech focus:border-racing-orange focus:outline-none transition-colors clip-bento" placeholder="ENTER EMAIL" />
                            </div>
                            <div>
                                <label className="block text-neon-teal font-tech text-xs tracking-widest mb-2">DATA_PACKET</label>
                                <textarea rows="4" className="w-full bg-void border border-steel p-4 text-white font-tech focus:border-racing-orange focus:outline-none transition-colors clip-bento" placeholder="MESSAGE CONTENT"></textarea>
                            </div>

                            <button className="bg-neon-teal text-black font-speed text-xl px-8 py-3 w-full hover:bg-white hover:scale-[1.02] transition-all clip-angle-button">
                                SEND TRANSMISSION <Send className="inline-block w-4 h-4 ml-2" />
                            </button>
                        </form>
                    </div>

                    {/* Right: Info / Footer */}
                    <div className="flex flex-col justify-between">
                        <div>
                            <div className="border border-neon-teal/20 bg-void/50 p-6 clip-card mb-8">
                                <h3 className="text-neon-teal font-speed text-2xl mb-4">SYSTEM STATUS</h3>
                                <div className="space-y-2">
                                    <div className="flex justify-between font-tech text-sm text-dust">
                                        <span>SERVER</span>
                                        <span className="text-green-500">ONLINE</span>
                                    </div>
                                    <div className="flex justify-between font-tech text-sm text-dust">
                                        <span>PING</span>
                                        <span className="text-white">12ms</span>
                                    </div>
                                    <div className="flex justify-between font-tech text-sm text-dust">
                                        <span>REGION</span>
                                        <span className="text-white">ASIA-PACIFIC</span>
                                    </div>
                                </div>
                            </div>

                            <div className="border border-racing-orange/20 bg-void/50 p-6 clip-card">
                                <h3 className="text-racing-orange font-speed text-2xl mb-4">CONNECT_NODES</h3>
                                <div className="flex gap-4">
                                    {[Github, Linkedin, Twitter, Mail].map((Icon, i) => (
                                        <a key={i} href="#" className="w-10 h-10 bg-steel flex items-center justify-center text-white hover:bg-racing-orange hover:text-black transition-colors clip-bento">
                                            <Icon className="w-5 h-5" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="text-right mt-12 md:mt-0">
                            <div className="text-6xl font-speed text-white/5 font-bold select-none">
                                REUBEN
                            </div>
                            <div className="text-dust font-tech text-xs">
                                © 2024 NEXUS PROTOCOL. ALL RIGHTS RESERVED.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
