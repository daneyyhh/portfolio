import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const loadingTexts = [
    "Loading your next adventure...",
    "Booting up DevMode...",
    "Initializing Graphics Engine...",
    "Fetching Skills...",
    "Spawning Inspiration..."
];

const LoadingScreen = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [textIndex, setTextIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(onComplete, 500); // Small delay before finishing
                    return 100;
                }
                // Randomize speed for "realistic" loading feel
                const increment = Math.random() * 5 + 1;
                return Math.min(prev + increment, 100);
            });
        }, 100);

        const textInterval = setInterval(() => {
            setTextIndex(prev => (prev + 1) % loadingTexts.length);
        }, 1200);

        return () => {
            clearInterval(interval);
            clearInterval(textInterval);
        };
    }, [onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-[10000] bg-black flex flex-col items-center justify-center font-mono text-cyan-400"
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
        >
            {/* Pulsing Glitch Effect Background */}
            <div className="absolute inset-0 bg-[url('/grid.png')] opacity-10 pointer-events-none"></div>

            <div className="w-4/5 max-w-md relative">
                {/* Text */}
                <motion.div
                    key={textIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-center mb-4 text-sm md:text-base tracking-widest uppercase"
                >
                    {loadingTexts[textIndex]}
                </motion.div>

                {/* Progress Bar Container */}
                <div className="h-4 w-full border-2 border-cyan-800 p-1 relative shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                    {/* Progress Fill */}
                    <motion.div
                        className="h-full bg-cyan-500 shadow-[0_0_10px_#06b6d4]"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                {/* Percentage */}
                <div className="text-right mt-2 text-xs text-cyan-700">
                    {Math.floor(progress)}%
                </div>
            </div>

            {/* Corner Decorative Elements */}
            <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-cyan-900/50"></div>
            <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-cyan-900/50"></div>
        </motion.div>
    );
};

export default LoadingScreen;
