import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section id="hero" className="hero-section">
            {/* Left: Text & Story */}
            <div className="hero-left">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="caption-box" style={{ marginBottom: '20px' }}>ISSUE #01 — THE DEVELOPER ORIGIN</div>
                    <h1 className="section-title" data-text="REUBEN">REUBEN</h1>
                    <p style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '1.2rem',
                        maxWidth: '500px',
                        marginBottom: '40px',
                        borderLeft: '4px solid var(--comic-ink)',
                        paddingLeft: '20px'
                    }}>
                        By day, a software engineer. By night... also a software engineer.
                        Master of <b>FiveM</b>, <b>Unity</b>, and the arcane arts of <b>React</b>.
                        Welcome to the chronicle of code.
                    </p>
                    <div style={{ display: 'flex', gap: '20px' }}>
                        <button className="btn-comic comic-shake comic-zap">READ MISSIONS</button>
                        <button className="btn-comic comic-shake comic-zap" style={{ background: '#fff' }}>THE STORY</button>
                    </div>
                </motion.div>
            </div>

            {/* Right: Comic Grid panels */}
            <div className="hero-right">
                <motion.div
                    className="hero-panel wide"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80" alt="Action 1" />
                    <div className="caption-box" style={{ position: 'absolute', bottom: 10, right: 10, fontSize: '0.8rem' }}>HARIPAD — 10:42 PM</div>
                </motion.div>

                <motion.div
                    className="hero-panel"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <img src="https://images.unsplash.com/photo-1604076913837-52ab5629fde9?auto=format&fit=crop&w=600&q=80" alt="Action 2" />
                    <div className="caption-box" style={{ position: 'absolute', top: 10, left: 10, fontSize: '0.6rem', background: '#fff' }}>CLICK!</div>
                </motion.div>

                <motion.div
                    className="hero-panel"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    <img src="https://images.unsplash.com/photo-1519669556878-63bdad8a1a49?auto=format&fit=crop&w=600&q=80" alt="Action 3" />
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
