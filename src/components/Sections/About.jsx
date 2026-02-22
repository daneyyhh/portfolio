import React from 'react';
import { motion } from 'framer-motion';

const abilities = [
    { name: 'FIVEM / LUA', level: '90%', desc: 'Crafting complex server architectures.' },
    { name: 'UNITY / C#', level: '85%', desc: 'Building immersive 3D environments.' },
    { name: 'REACT / JS', level: '80%', desc: 'Designing high-performance web interfaces.' },
    { name: 'NODE JS', level: '75%', desc: 'Scalable backend solutions.' },
];

const About = () => {
    return (
        <section id="about" className="about-section">
            <div className="section-inner">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>

                    {/* Character Card / Left */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="profile-card"
                        style={{ position: 'relative', border: '1px solid var(--tera-red)', padding: '20px', background: 'rgba(255,255,255,0.02)' }}
                    >
                        <img
                            src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop"
                            alt="Reuben Avatar"
                            style={{ width: '100%', filter: 'grayscale(0.5) contrast(1.2)' }}
                        />
                        <div style={{ position: 'absolute', bottom: '20px', left: '20px', right: '20px', background: 'rgba(7,7,7,0.8)', padding: '20px', borderLeft: '4px solid var(--tera-red)' }}>
                            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem' }}>REUBEN</h3>
                            <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.7rem', color: 'var(--tera-red)', letterSpacing: '0.2em' }}>CLASS: SENIOR OUTLAW DEVELOPER</p>
                        </div>
                    </motion.div>

                    {/* Bio & Abilities / Right */}
                    <div className="about-details">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="section-label">CHAPTER II — IDENTITY</span>
                            <h2 className="section-title">THE <span style={{ color: 'var(--tera-red)' }}>PROFILE</span></h2>

                            <p style={{ fontSize: '1.2rem', marginBottom: '40px', color: 'var(--tera-muted)' }}>
                                Based in the digital wilderness of Haripad, I master the arts of systems and interactions.
                                My blade is code, and my shield is logic. I weave experiences that are as sharp as steel
                                and as deep as the void.
                            </p>

                            <div className="ability-list" style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                                {abilities.map((a, i) => (
                                    <motion.div
                                        key={a.name}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                            <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.8rem', letterSpacing: '0.1em' }}>{a.name}</span>
                                            <span style={{ color: 'var(--tera-red)', fontFamily: 'var(--font-ui)', fontSize: '0.7rem' }}>{a.level}</span>
                                        </div>
                                        <div style={{ width: '100%', height: '2px', background: 'rgba(255,255,255,0.1)', position: 'relative' }}>
                                            <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: a.level, background: 'var(--tera-red)', boxShadow: '0 0 10px var(--tera-red)' }} />
                                        </div>
                                        <p style={{ fontSize: '0.9rem', color: 'var(--tera-muted)', marginTop: '8px' }}>{a.desc}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
