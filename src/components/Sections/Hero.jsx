import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section id="hero" className="hero-section tera-hero">
            {/* Background elements */}
            <div className="hero-bg-media">
                <img
                    src="https://images.unsplash.com/photo-1614728263952-84ea206f25ab?q=80&w=2000&auto=format&fit=crop"
                    alt="Space Background"
                    className="hero-backdrop"
                />
                <div className="hero-overlay-mist" />
                <div className="lightning-fx" />
            </div>

            <div className="center-character">
                <motion.img
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    src="https://images.unsplash.com/photo-1559153105-837699411982?q=80&w=800&auto=format&fit=crop"
                    alt="Main Character"
                    className="tera-character"
                    style={{ filter: 'drop-shadow(0 0 30px var(--tera-red-glow)) contrast(1.2)' }}
                />
            </div>

            <div className="hero-content">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="hero-branding"
                >
                    <span className="brand-sup">C O D E / D E S I G N / S Y S T E M</span>
                    <h1 className="brand-logo-text">REUBEN</h1>
                    <p className="brand-sub">AN OUTLAW OF THE DIGITAL REALM</p>
                </motion.div>

                <motion.div
                    className="play-btn-wrap"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <div className="play-btn-circle">
                        <div className="play-icon" />
                    </div>
                </motion.div>
            </div>

            {/* Sub Nav / Tabs */}
            <div className="hero-subnav">
                <a href="#about" className="subnav-item active">OVERVIEW</a>
                <a href="#projects" className="subnav-item">MISSIONS</a>
                <a href="#skills" className="subnav-item">ABILITIES</a>
                <a href="#contact" className="subnav-item">TELEGRAPH</a>
            </div>
        </section>
    );
};

export default Hero;
