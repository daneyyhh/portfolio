import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="not-found-page" style={{
            minHeight: '100vh',
            background: 'var(--comic-bg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background Halftone - Heavy */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(var(--comic-gray) 2px, transparent 2px)',
                backgroundSize: '10px 10px',
                opacity: 0.3
            }} />

            {/* Speed Lines */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'repeating-linear-gradient(45deg, transparent, transparent 100px, rgba(0,0,0,0.03) 100px, rgba(0,0,0,0.03) 200px)',
                pointerEvents: 'none'
            }} />

            <div className="content-wrapper" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>

                {/* 404 Burst */}
                <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: -5 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                    style={{
                        background: '#ff0000',
                        color: '#fff',
                        padding: '40px 80px',
                        border: '8px solid #000',
                        boxShadow: '20px 20px 0px #000',
                        display: 'inline-block',
                        marginBottom: '40px',
                        position: 'relative'
                    }}
                >
                    <h1 style={{
                        fontFamily: 'var(--font-title)',
                        fontSize: 'clamp(5rem, 15vw, 12rem)',
                        margin: 0,
                        lineHeight: 0.8,
                        textTransform: 'uppercase',
                        WebkitTextStroke: '3px #000'
                    }}>
                        404!
                    </h1>
                </motion.div>

                {/* Speech Bubbles */}
                <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="speech-bubble"
                    style={{
                        position: 'absolute',
                        top: '-60px',
                        left: '-100px',
                        transform: 'rotate(-15deg)',
                        background: '#fff',
                        fontSize: '1.2rem'
                    }}
                >
                    GADZOOKS! THE PAGE IS GONE!
                </motion.div>

                <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="speech-bubble comic-shake"
                    style={{
                        position: 'absolute',
                        bottom: '20px',
                        right: '-80px',
                        transform: 'rotate(10deg)',
                        background: 'var(--comic-accent)',
                        fontSize: '1.1rem'
                    }}
                >
                    CRITICAL ERROR IN THE MULTIVERSE!
                </motion.div>

                {/* Subtext */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    <p style={{
                        fontFamily: 'var(--font-marker)',
                        fontSize: '2rem',
                        marginBottom: '40px',
                        maxWidth: '600px',
                        margin: '0 auto 40px'
                    }}>
                        It looks like this panel was never drawn, or a villain deleted it from reality!
                    </p>

                    <Link
                        to="/"
                        className="btn-comic"
                        style={{
                            fontSize: '2rem',
                            textDecoration: 'none',
                            display: 'inline-block'
                        }}
                    >
                        RETURN TO ISSUE #1
                    </Link>
                </motion.div>
            </div>

            {/* Background Decorative Bursts */}
            <div style={{
                position: 'absolute',
                top: '10%',
                right: '10%',
                width: '150px',
                height: '150px',
                background: '#ffde00',
                clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                zIndex: 1,
                opacity: 0.5
            }} />
        </div>
    );
};

export default NotFound;
