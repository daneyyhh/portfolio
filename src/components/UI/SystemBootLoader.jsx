import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SystemBootLoader = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [logs, setLogs] = useState([]);
    const [done, setDone] = useState(false);

    const bootLogs = [
        'INIT KERNEL v4.0 ...',
        'LOADING GAME ENGINE ...',
        'MOUNTING ASSETS ...',
        'CALIBRATING UI ...',
        'ESTABLISHING UPLINK ...',
        'DECRYPTING PORTFOLIO ...',
        'ALL SYSTEMS OPTIMAL.',
    ];

    useEffect(() => {
        let logIdx = 0;
        const tick = setInterval(() => {
            setProgress(prev => {
                const next = prev + Math.random() * 4 + 1;
                if (next >= 100) {
                    clearInterval(tick);
                    setDone(true);
                    setTimeout(onComplete, 900);
                    return 100;
                }
                return next;
            });
            if (logIdx < bootLogs.length && Math.random() > 0.55) {
                const msg = bootLogs[logIdx++];
                setLogs(p => [...p.slice(-5), msg]);
            }
        }, 90);
        return () => clearInterval(tick);
    }, [onComplete]);

    return (
        <AnimatePresence>
            {!done ? (
                <motion.div
                    key="loader"
                    className="loader-screen"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: '-100%', transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}
                >
                    {/* Scanline overlay */}
                    <div className="scanlines" />

                    {/* Corner decorators */}
                    <div className="corner tl" />
                    <div className="corner tr" />
                    <div className="corner bl" />
                    <div className="corner br" />

                    <div className="loader-content">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="loader-logo"
                        >
                            <span className="logo-r">R</span>EUBEN
                            <span className="logo-tag">PORTFOLIO</span>
                        </motion.div>

                        <div className="loader-bar-wrap">
                            <div className="loader-bar-track">
                                <motion.div
                                    className="loader-bar-fill"
                                    style={{ width: `${progress}%` }}
                                />
                                <div className="loader-bar-glow" style={{ left: `${progress}%` }} />
                            </div>
                            <div className="loader-pct">{Math.min(100, Math.floor(progress))}%</div>
                        </div>

                        <div className="loader-terminal">
                            {logs.map((l, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -8 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="terminal-line"
                                >
                                    <span className="terminal-prompt">▶</span> {l}
                                </motion.div>
                            ))}
                            <motion.span
                                animate={{ opacity: [1, 0] }}
                                transition={{ repeat: Infinity, duration: 0.6 }}
                                className="terminal-cursor"
                            >▮</motion.span>
                        </div>

                        <div className="loader-footer">© 2025 REUBEN · NEXUS CORE</div>
                    </div>
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
};

export default SystemBootLoader;
