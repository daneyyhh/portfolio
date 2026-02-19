import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CinematicLoader = ({ onComplete }) => {
    const [step, setStep] = useState(0);

    useEffect(() => {
        const sequence = async () => {
            await new Promise(r => setTimeout(r, 1000)); // Initial black
            setStep(1); // "SURVIVE"
            await new Promise(r => setTimeout(r, 1500));
            setStep(2); // "CREATE"
            await new Promise(r => setTimeout(r, 1500));
            setStep(3); // "DEPLOY"
            await new Promise(r => setTimeout(r, 1500));
            onComplete();
        };
        sequence();
    }, [onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-[100] bg-void flex items-center justify-center overflow-hidden"
            exit={{ opacity: 0, transition: { duration: 1 } }}
        >
            {/* Background Texture/Noise */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/concrete-wall.png')] mix-blend-overlay"></div>

            <AnimatePresence>
                {step === 1 && (
                    <motion.div
                        key="step1"
                        initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -20, filter: "blur(5px)" }}
                        className="text-4xl md:text-6xl font-tech font-bold text-ash tracking-[0.5em]"
                    >
                        SURVIVE
                    </motion.div>
                )}
                {step === 2 && (
                    <motion.div
                        key="step2"
                        initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -20, filter: "blur(5px)" }}
                        className="text-4xl md:text-6xl font-tech font-bold text-white tracking-[0.5em]"
                    >
                        CREATE
                    </motion.div>
                )}
                {step === 3 && (
                    <motion.div
                        key="step3"
                        initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -20, filter: "blur(5px)" }}
                        className="text-4xl md:text-6xl font-brush text-ember transform -rotate-2"
                    >
                        DEPLOY
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Ember Particles (Simulated) */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-ember rounded-full"
                        initial={{
                            x: Math.random() * window.innerWidth,
                            y: window.innerHeight + 10,
                            opacity: 0
                        }}
                        animate={{
                            y: -100,
                            opacity: [0, 1, 0],
                            x: Math.random() * window.innerWidth + (Math.random() * 100 - 50)
                        }}
                        transition={{
                            duration: Math.random() * 5 + 3,
                            repeat: Infinity,
                            delay: Math.random() * 2
                        }}
                    />
                ))}
            </div>
        </motion.div>
    );
};

export default CinematicLoader;
