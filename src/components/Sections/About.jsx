import React from 'react';
import { motion } from 'framer-motion';

const abilities = [
    { name: 'AGILITY', val: '95', desc: 'React / Framer Motion' },
    { name: 'STRENGTH', val: '88', desc: 'Node.js / Systems' },
    { name: 'INTELLECT', val: '92', desc: 'Unity / Game Dev' },
    { name: 'STEALTH', val: '80', desc: 'Lua / FiveM' },
];

const About = () => {
    return (
        <section id="about" className="about-section" style={{ padding: '100px 20px' }}>
            <motion.div
                className="about-page"
                initial={{ rotate: -2, y: 50, opacity: 0 }}
                whileInView={{ rotate: 0, y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                {/* Left: Illustration */}
                <div style={{ position: 'relative' }}>
                    <div className="caption-box" style={{ position: 'absolute', top: -20, left: -20, zIndex: 10 }}>TOP SECRET FILE</div>
                    <div style={{ border: '4px solid #000', height: '100%', overflow: 'hidden', background: '#e0e0e0' }}>
                        <img
                            src="https://images.unsplash.com/photo-1604076913837-52ab5629fde9?auto=format&fit=crop&w=600&q=80"
                            alt="The Developer"
                            style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(1) contrast(1.5)' }}
                        />
                    </div>
                </div>

                {/* Right: Data */}
                <div>
                    <h2 className="section-title" data-text="PROFILE" style={{ fontSize: '4rem', marginBottom: '30px' }}>PROFILE</h2>
                    <p style={{ fontFamily: 'var(--font-marker)', fontSize: '1.2rem', marginBottom: '30px', background: 'yellow', padding: '10px' }}>
                        "I've been building digital worlds since Issue #1..."
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {abilities.map((a) => (
                            <div key={a.name}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-title)', fontSize: '0.8rem' }}>
                                    <span>{a.name}</span>
                                    <span>{a.val}%</span>
                                </div>
                                <div style={{ height: '15px', border: '3px solid #000', background: '#fff', marginTop: '5px', position: 'relative' }}>
                                    <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: `${a.val}%`, background: '#000' }} />
                                </div>
                                <span style={{ fontSize: '0.7rem', opacity: 0.6 }}>{a.desc}</span>
                            </div>
                        ))}
                    </div>

                    <div style={{ marginTop: '40px', fontFamily: 'var(--font-body)', fontSize: '0.9rem' }}>
                        <p><b>Name:</b> Reuben</p>
                        <p><b>Base:</b> Haripad, India</p>
                        <p><b>Alignment:</b> Creative Neutral</p>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default About;
