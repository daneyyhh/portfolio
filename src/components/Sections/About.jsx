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
                    <div style={{ border: '4px solid #000', height: '100%', overflow: 'hidden', background: '#000' }}>
                        <img
                            src="https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=600&q=80"
                            alt="Miles Morales"
                            style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'contrast(1.2)' }}
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

                    <div className="comic-bio-block" style={{ marginTop: '40px', fontFamily: 'var(--font-body)', fontSize: '0.9rem', border: '2px solid #000', padding: '15px', background: '#f0f0f0', boxShadow: '4px 4px 0px #000', transform: 'rotate(-0.5deg)' }}>
                        <p style={{ marginBottom: '5px' }}><b>NAME:</b> <span style={{ fontFamily: 'var(--font-accent)', fontSize: '1.1rem' }}>REUBEN</span></p>
                        <p style={{ marginBottom: '5px' }}><b>BASE:</b> <span style={{ fontFamily: 'var(--font-accent)', fontSize: '1.1rem' }}>KERALA, INDIA</span></p>
                        <p><b>ALIGNMENT:</b> <span style={{ fontFamily: 'var(--font-accent)', fontSize: '1.1rem' }}>CREATIVE NEUTRAL</span></p>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default About;
