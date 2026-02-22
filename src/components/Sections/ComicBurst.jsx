import React from 'react';
import { motion } from 'framer-motion';

const ComicBurst = () => {
    return (
        <section className="comic-burst-extra" style={{
            height: '400px',
            background: 'url(https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&w=1200&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderTop: '5px solid #000',
            borderBottom: '5px solid #000',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Halftone Overlay */}
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '4px 4px', opacity: 0.2 }} />

            <motion.div
                initial={{ scale: 0.5, rotate: -20, opacity: 0 }}
                whileInView={{ scale: 1.2, rotate: 10, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 300, damping: 10 }}
                style={{
                    background: '#ffde00',
                    color: '#000',
                    padding: '20px 60px',
                    border: '6px solid #000',
                    boxShadow: '20px 20px 0px #ff00ea',
                    zIndex: 10,
                    transform: 'skew(-5deg)'
                }}
            >
                <h2 style={{
                    fontFamily: 'var(--font-title)',
                    fontSize: 'clamp(3rem, 10vw, 6rem)',
                    margin: 0,
                    lineHeight: 0.9,
                    textTransform: 'uppercase',
                    textAlign: 'center'
                }}>
                    KABOOM!
                </h2>
                <p style={{
                    fontFamily: 'var(--font-marker)',
                    fontSize: '1.5rem',
                    textAlign: 'center',
                    marginTop: '10px'
                }}>
                    THE ART OF EXECUTION
                </p>
            </motion.div>

            {/* Floating Action Bubbles */}
            <motion.div
                animate={{ y: [0, -20, 0], rotate: [-10, -15, -10] }}
                transition={{ repeat: Infinity, duration: 2 }}
                style={{
                    position: 'absolute', top: 50, left: '15%',
                    background: '#fff', border: '3px solid #000',
                    padding: '10px 20px', fontFamily: 'var(--font-accent)',
                    fontSize: '1.5rem', transform: 'rotate(-10deg)'
                }}
            >
                THWACK!
            </motion.div>

            <motion.div
                animate={{ y: [0, 20, 0], rotate: [15, 20, 15] }}
                transition={{ repeat: Infinity, duration: 2.5 }}
                style={{
                    position: 'absolute', bottom: 50, right: '15%',
                    background: '#ff00ea', color: '#fff', border: '3px solid #000',
                    padding: '10px 20px', fontFamily: 'var(--font-accent)',
                    fontSize: '1.5rem', transform: 'rotate(15deg)'
                }}
            >
                WHAM!
            </motion.div>
        </section>
    );
};

export default ComicBurst;
