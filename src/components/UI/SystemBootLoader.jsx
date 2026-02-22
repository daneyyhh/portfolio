import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const bootLogs = [
    '> PREPARING THE HORSE ...',
    '> LOADING THE CARBINE ...',
    '> CHECKING THE BOUNTY LIST ...',
    '> SADDLING UP ...',
    '> RIDING TO VALENTINE ...',
    '> ENTERING THE SALOON ...',
    '> READY FOR THE DUEL ✓',
];

const SystemBootLoader = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [logs, setLogs] = useState([]);
    const [done, setDone] = useState(false);

    useEffect(() => {
        let logIdx = 0;
        const tick = setInterval(() => {
            setProgress(prev => {
                const next = prev + Math.random() * 4 + 1.5;
                if (next >= 100) {
                    clearInterval(tick);
                    setDone(true);
                    setTimeout(onComplete, 900);
                    return 100;
                }
                // Add a log entry every ~15%
                const threshold = (logIdx + 1) * (100 / bootLogs.length);
                if (next >= threshold && logIdx < bootLogs.length) {
                    setLogs(l => [...l, bootLogs[logIdx]]);
                    logIdx++;
                }
                return next;
            });
        }, 130);
        return () => clearInterval(tick);
    }, [onComplete]);

    const pct = Math.min(Math.round(progress), 100);

    return (
        <AnimatePresence>
            {!done && (
                <motion.div
                    className="loader-screen"
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{ cursor: 'none' }}
                >
                    <div className="loader-silhouette" style={{ backgroundImage: `url('/rdr-silhouette.png')` }} />

                    <div className="loader-content">
                        <motion.div
                            className="loader-logo"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1 }}
                        >
                            <span>REUBEN</span>
                            <span className="logo-tag">OUTLAW OF CODE</span>
                        </motion.div>

                        <div className="loader-bar-wrap">
                            <div className="loader-bar-track">
                                <motion.div
                                    className="loader-bar-fill"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${pct}%` }}
                                    transition={{ duration: 0.2 }}
                                />
                            </div>
                            <div className="loader-pct">{pct}%</div>
                        </div>

                        <p className="loader-footer">ESTABLISHED 1899 // PORTFOLIO v4.0</p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SystemBootLoader;
