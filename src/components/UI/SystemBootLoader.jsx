import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SystemBootLoader = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [logs, setLogs] = useState([]);

    const bootLogs = [
        "INITIALIZING KERNEL...",
        "LOADING ASSETS...",
        "MOUNTING DRIVERS...",
        "CHECKING MEMORY...",
        "ESTABLISHING UPLINK...",
        "DECRYPTING DATA...",
        "SYSTEM OPTIMAL."
    ];

    useEffect(() => {
        let currentLog = 0;
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(onComplete, 800);
                    return 100;
                }
                return prev + Math.random() * 5;
            });

            if (currentLog < bootLogs.length && Math.random() > 0.7) {
                setLogs(prev => [...prev.slice(-4), bootLogs[currentLog]]);
                currentLog++;
            }
        }, 100);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-[100] bg-void flex flex-col items-center justify-center font-tech text-neon-teal p-8 cursor-wait"
            exit={{ y: "-100%", transition: { duration: 0.8, ease: "anticipate" } }}
        >
            {/* Scanlines */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none z-10"></div>

            <div className="w-full max-w-md">
                <div className="flex justify-between items-end mb-2">
                    <span className="text-xl font-bold tracking-widest text-white">REUBEN<span className="text-racing-orange">OS</span> v4.0</span>
                    <span className="text-racing-orange">{Math.min(100, Math.floor(progress))}%</span>
                </div>

                {/* Progress Bar */}
                <div className="h-2 bg-steel w-full overflow-hidden mb-8">
                    <motion.div
                        className="h-full bg-racing-orange"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                {/* Terminal Logs */}
                <div className="font-mono text-xs text-dust h-24 overflow-hidden border border-steel/50 p-2 bg-black/50">
                    {logs.map((log, i) => (
                        <div key={i} className="mb-1 text-neon-teal/80">
                            <span className="text-racing-orange mr-2">{`>`}</span>
                            {log}
                        </div>
                    ))}
                    <motion.div
                        animate={{ opacity: [0, 1] }}
                        transition={{ repeat: Infinity, duration: 0.5 }}
                        className="inline-block w-2 h-4 bg-racing-orange align-middle"
                    />
                </div>
            </div>

            <div className="absolute bottom-8 text-center text-[10px] text-dust tracking-[0.5em] opacity-50">
                COPYRIGHT 2024 NEXUS INDUSTRIES
            </div>
        </motion.div>
    );
};

export default SystemBootLoader;
