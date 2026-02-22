import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const comicLogs = [
    "DRAWING THE HERO...",
    "INKING THE BORDERS...",
    "WRITING THE DIALOGUE...",
    "ADDING SHADOWS...",
    "COLORING THE PANELS...",
    "LETTERING THE PLOT...",
    "PRINTING ISSUE #1..."
];

const SystemBootLoader = ({ pct }) => {
    const [currentLog, setCurrentLog] = useState(comicLogs[0]);

    useEffect(() => {
        const logIndex = Math.min(
            Math.floor((pct / 100) * comicLogs.length),
            comicLogs.length - 1
        );
        setCurrentLog(comicLogs[logIndex]);
    }, [pct]);

    return (
        <motion.div
            className="loader-screen"
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.6, ease: "circIn" }}
            style={{
                cursor: 'none',
                position: 'fixed',
                inset: 0,
                zIndex: 10000,
                background: '#000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
            }}
        >
            {/* Halftone BG local to loader */}
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)',
                backgroundSize: '8px 8px',
                pointerEvents: 'none'
            }} />

            <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', width: '90%' }}>

                {/* Massive Comic Splash */}
                <div style={{ position: 'relative', marginBottom: '60px' }}>
                    <motion.div
                        initial={{ scale: 0, rotate: -25 }}
                        animate={{ scale: 1, rotate: -5 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 12 }}
                        style={{
                            background: 'var(--comic-accent)',
                            color: '#000',
                            padding: '15px 40px',
                            border: '5px solid #000',
                            boxShadow: '15px 15px 0px #fff',
                            display: 'inline-block',
                            position: 'relative',
                            zIndex: 2
                        }}
                    >
                        <h1 style={{
                            fontFamily: 'var(--font-title)',
                            fontSize: 'clamp(3rem, 10vw, 7rem)',
                            lineHeight: 0.8,
                            margin: 0,
                            padding: 0
                        }}>
                            POW!
                        </h1>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50, y: 30 }}
                        animate={{ opacity: 1, x: 20, y: 10 }}
                        transition={{ delay: 0.3 }}
                        style={{
                            position: 'absolute',
                            top: '50%', left: '50%',
                            background: '#fff',
                            color: '#000',
                            padding: '8px 15px',
                            border: '3px solid #000',
                            fontFamily: 'var(--font-accent)',
                            fontSize: '1.5rem',
                            zIndex: 3,
                            boxShadow: '4px 4px 0px #000'
                        }}
                    >
                        CRACKLE!
                    </motion.div>
                </div>

                {/* Comic Title */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    style={{ marginBottom: '40px' }}
                >
                    <h2 style={{
                        fontFamily: 'var(--font-accent)',
                        fontSize: '2.5rem',
                        color: '#fff',
                        letterSpacing: '2px',
                        textShadow: '4px 4px 0px var(--comic-ink)'
                    }}>
                        REUBEN CHRONICLES
                    </h2>
                    <p style={{ color: 'var(--comic-accent)', fontFamily: 'var(--font-marker)', fontSize: '1.2rem' }}>
                        THE RISE OF THE CODE-STAINED HERO
                    </p>
                </motion.div>

                {/* Progress Group */}
                <div style={{ maxWidth: '400px', margin: '0 auto' }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '10px',
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.8rem',
                        fontWeight: 'bold',
                        color: '#fff',
                        textTransform: 'uppercase'
                    }}>
                        <span>{currentLog}</span>
                        <span>{pct}%</span>
                    </div>

                    <div style={{
                        height: '24px',
                        border: '4px solid #fff',
                        background: '#111',
                        padding: '4px',
                        boxShadow: '5px 5px 0px rgba(255,255,255,0.2)'
                    }}>
                        <motion.div
                            style={{
                                height: '100%',
                                background: 'var(--comic-accent)',
                                width: `${pct}%`
                            }}
                            initial={{ width: 0 }}
                            animate={{ width: `${pct}%` }}
                        />
                    </div>
                </div>

                <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    style={{
                        marginTop: '40px',
                        fontFamily: 'var(--font-marker)',
                        color: 'rgba(255,255,255,0.4)',
                        fontSize: '1rem'
                    }}
                >
                    CLICK! TO START (SOON)
                </motion.div>
            </div>

            {/* Kinetic Lines (Background) */}
            <div style={{ position: 'absolute', inset: 0, opacity: 0.1, pointerEvents: 'none' }}>
                {[...Array(12)].map((_, i) => (
                    <div
                        key={i}
                        style={{
                            position: 'absolute',
                            left: '50%', top: '50%',
                            width: '200vw', height: '2px',
                            background: '#fff',
                            transform: `translate(-50%, -50%) rotate(${i * 30}deg)`,
                            transformOrigin: 'center'
                        }}
                    />
                ))}
            </div>
        </motion.div>
    );
};

export default SystemBootLoader;
