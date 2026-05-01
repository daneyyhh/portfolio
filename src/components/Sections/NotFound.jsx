import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="not-found-page bg-spider-black bg-grid halftone-overlay flex items-center justify-center min-h-screen p-5 relative overflow-hidden">
            <div className="content-wrapper relative z-10 text-center">
                {/* 404 Burst */}
                <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: -5 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                    className="bg-spider-red border-8 border-spider-black px-10 py-6 md:px-20 md:py-10 shadow-[20px_20px_0px_#0A0A0A] relative mb-12"
                >
                    <h1 className="font-bangers text-8xl md:text-[12rem] text-spider-white leading-none uppercase drop-shadow-[5px_5px_0px_#000]">
                        404!
                    </h1>
                </motion.div>

                {/* Subtext */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="max-w-2xl mx-auto"
                >
                    <p className="font-bangers text-3xl md:text-5xl text-spider-yellow mb-8 leading-tight drop-shadow-[2px_2px_0px_#000]">
                        GADZOOKS! THIS PANEL WAS NEVER DRAWN!
                    </p>
                    
                    <p className="font-mono text-sm font-bold text-spider-white/70 mb-12 uppercase tracking-widest">
                        It looks like a villain deleted this page from the multiverse.
                    </p>

                    <Link
                        to="/"
                        className="relative group inline-block"
                    >
                        <div className="absolute inset-0 bg-spider-black translate-x-2 translate-y-2 group-hover:translate-x-1 group-hover:translate-y-1 transition-all"></div>
                        <div className="relative bg-spider-yellow border-4 border-spider-black px-12 py-4 font-bangers text-3xl text-spider-black group-hover:bg-spider-red group-hover:text-spider-white transition-all">
                            RETURN TO ISSUE #1
                        </div>
                    </Link>
                </motion.div>
            </div>
            
            {/* Speed Lines Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-10 bg-[repeating-linear-gradient(45deg,transparent,transparent_100px,rgba(255,255,255,0.05)_100px,rgba(255,255,255,0.05)_200px)]"></div>
        </div>
    );
};

export default NotFound;
