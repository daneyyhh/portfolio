import React from 'react';
import { motion } from 'framer-motion';

const SystemBootLoader = ({ pct }) => {
    return (
        <motion.div
            className="loader-screen"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            style={{ cursor: 'none', position: 'fixed', inset: 0, zIndex: 10000 }}
        >
            <div style={{ textAlign: 'center' }}>
                <motion.div
                    initial={{ scale: 0.5, rotate: -20, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    transition={{ type: 'spring', damping: 10 }}
                    style={{
                        background: 'yellow',
                        color: '#000',
                        padding: '20px 60px',
                        border: '6px solid #fff',
                        boxShadow: '10px 10px 0px #fff',
                        marginBottom: '40px'
                    }}
                >
                    <h1 style={{ fontFamily: 'var(--font-title)', fontSize: '5rem', lineHeight: 1 }}>BOOM!</h1>
                </motion.div>

                <div className="loader-logo">
                    <span style={{ color: '#fff' }}>REUBEN CHRONICLES</span>
                </div>

                <div className="loader-bar-wrap">
                    <motion.div
                        className="loader-bar-fill"
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                    />
                </div>

                <div style={{ marginTop: '20px', fontFamily: 'var(--font-accent)', fontSize: '1.2rem', color: 'yellow' }}>
                    INKING PAGES: {pct}%
                </div>
            </div>
        </motion.div>
    );
};

export default SystemBootLoader;
