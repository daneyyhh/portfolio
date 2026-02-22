import React from 'react';
import { motion } from 'framer-motion';

const stats = [
    { v: '3+', l: 'YEARS ON THE TRAIL' }, { v: '50+', l: 'SCRIPTS TAMED' },
    { v: '10+', l: 'CREW PROJECTS' }, { v: '∞', l: 'GRIT' },
];

const About = () => (
    <section id="about" className="about-section">
        <div className="section-inner">
            <motion.div
                className="section-header"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                style={{ textAlign: 'left', marginBottom: '80px' }}
            >
                <span className="section-label">CHAPTER TWO</span>
                <h2 className="section-title">THE OUTLAW <span className="rdr-red">PROFILE</span></h2>
            </motion.div>

            <div className="about-grid">
                {/* Image */}
                <motion.div
                    className="about-img-wrap"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                >
                    <img
                        src="https://images.unsplash.com/photo-1535223289429-a8e95f0fd2ef?auto=format&fit=crop&w=600&q=85"
                        alt="Reuben — The Outlaw Developer"
                        style={{ border: '1px solid var(--rdr-red)' }}
                    />
                    <div className="hud-corner hud-tl" />
                    <div className="hud-corner hud-tr" />
                    <div className="hud-corner hud-bl" />
                    <div className="hud-corner hud-br" />
                </motion.div>

                {/* Content */}
                <motion.div
                    className="about-content"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <div className="about-bio">
                        <p>
                            I'm <span className="about-highlight">Reuben</span> — a developer based in Haripad,
                            sharpening my skills in the digital wilderness.
                            I don't just write code; I craft experiences that resonate like a gunshot in a canyon.
                        </p>
                        <p>
                            Specializing in <span className="about-highlight">FiveM</span>, <span className="about-highlight">Unity</span>,
                            and <span className="about-highlight">React</span>, I build robust systems and immersive
                            environments for those who demand excellence.
                        </p>
                    </div>

                    {/* Stats grid as Wanted posters / blocks */}
                    <div className="about-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', margin: '40px 0' }}>
                        {stats.map((s, i) => (
                            <motion.div
                                key={s.l}
                                style={{
                                    padding: '20px',
                                    background: '#111',
                                    border: '1px solid var(--rdr-border)',
                                    textAlign: 'center'
                                }}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 + i * 0.1 }}
                            >
                                <div style={{ fontFamily: 'var(--font-title)', fontSize: '2.5rem', color: 'var(--rdr-red)' }}>{s.v}</div>
                                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.8rem', color: 'var(--rdr-muted)', marginTop: '5px' }}>{s.l}</div>
                            </motion.div>
                        ))}
                    </div>

                    {/* CTAs */}
                    <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                        <a href="https://github.com/daneyyhh" target="_blank" rel="noopener noreferrer" className="btn-rdr">
                            GITHUB TRAIL
                        </a>
                        <a href="mailto:ftreuben1520@gmail.com" className="btn-outline-rdr">
                            SEND A TELEGRAPH
                        </a>
                    </div>
                </motion.div>
            </div>
        </div>
    </section>
);

export default About;
