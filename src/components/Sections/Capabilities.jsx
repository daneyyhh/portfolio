import React from 'react';
import { motion } from 'framer-motion';

const skills = [
    { title: 'FRONTEND', desc: 'React, Tailwind, Framer Motion', icon: '⚡' },
    { title: 'BACKEND', desc: 'Node.js, Express, MongoDB', icon: '🛠️' },
    { title: 'GAME DEV', desc: 'Unity, C#, Lua scripts', icon: '🎮' },
    { title: 'DESIGN', desc: 'UI/UX, Comic Art style', icon: '🎨' },
];

const Capabilities = () => {
    return (
        <section id="capabilities" className="capabilities-section" style={{ padding: '100px 40px', background: '#fff' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ marginBottom: '60px', textAlign: 'center' }}>
                    <span className="caption-box" style={{ background: '#000', color: '#fff' }}>POWERS & ABILITIES</span>
                    <h2 className="section-title" data-text="CAPABILITIES" style={{ fontSize: '4rem', color: '#000' }}>CAPABILITIES</h2>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                    {skills.map((skill, i) => (
                        <motion.div
                            key={skill.title}
                            className="comic-panel"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            style={{ padding: '30px', textAlign: 'center' }}
                        >
                            <div style={{ fontSize: '3rem', marginBottom: '10px' }}>{skill.icon}</div>
                            <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '1.5rem', marginBottom: '10px' }}>{skill.title}</h3>
                            <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: '#666' }}>{skill.desc}</p>

                            <div style={{ marginTop: '20px', fontSize: '0.8rem', fontFamily: 'var(--font-accent)', background: 'var(--comic-accent)', padding: '5px' }}>
                                UNLOCKED!
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Capabilities;
