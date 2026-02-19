import React from 'react';
import { motion } from 'framer-motion';
import { Send, Github, Linkedin, Twitter, Mail } from 'lucide-react';

const InputField = ({ label, type = "text", placeholder }) => (
    <div className="mb-6">
        <label className="block text-xs font-tech text-dust tracking-[0.2em] uppercase mb-2">
            {label}
        </label>
        <input
            type={type}
            placeholder={placeholder}
            className="w-full bg-transparent border-b border-dust/30 py-2 text-ash font-sans focus:border-ember focus:outline-none transition-colors placeholder:text-charcoal"
        />
    </div>
);

const Contact = () => {
    return (
        <section id="contact" className="py-24 bg-void relative border-t border-charcoal">
            <div className="container mx-auto px-6 max-w-4xl">

                <div className="mb-12 text-center">
                    <h2 className="text-ember font-tech tracking-[0.5em] uppercase text-sm mb-4">
                        SEND SIGNAL
                    </h2>
                    <h1 className="text-5xl font-brush text-ash text-stroke">
                        JOIN THE <span className="text-ember text-stroke-0">OASIS</span>
                    </h1>
                </div>

                <form className="max-w-xl mx-auto mb-20">
                    <InputField label="Survivor ID" placeholder="NAME / HANDLE" />
                    <InputField label="Frequency" type="email" placeholder="EMAIL ADDRESS" />

                    <div className="mb-8">
                        <label className="block text-xs font-tech text-dust tracking-[0.2em] uppercase mb-2">
                            MESSAGE
                        </label>
                        <textarea
                            rows="4"
                            className="w-full bg-transparent border-b border-dust/30 py-2 text-ash font-sans focus:border-ember focus:outline-none transition-colors placeholder:text-charcoal resize-none"
                            placeholder="TRANSMISSION CONTENT..."
                        ></textarea>
                    </div>

                    <button className="group w-full py-4 bg-ash hover:bg-ember text-void font-tech font-bold uppercase tracking-[0.3em] transition-all clip-angle">
                        <span className="group-hover:hidden">SEND TRANSMISSION</span>
                        <span className="hidden group-hover:inline-flex items-center gap-2">
                            SIGNAL BOOSTED <Send className="w-4 h-4" />
                        </span>
                    </button>
                </form>

                {/* Footer Logo / Sigil area */}
                <div className="text-center pt-12 border-t border-charcoal/50">
                    <div className="font-brush text-4xl text-dust mb-6 opacity-30 select-none">
                        REUBX_DEV
                    </div>

                    <div className="flex justify-center gap-6">
                        {[Github, Linkedin, Twitter, Mail].map((Icon, i) => (
                            <a key={i} href="#" className="text-dust hover:text-ember transition-colors">
                                <Icon className="w-5 h-5" />
                            </a>
                        ))}
                    </div>

                    <div className="mt-8 text-xs font-tech text-charcoal tracking-widest">
                        © 2024 SURVIVOR EDITION. ALL RIGHTS RESERVED.
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
