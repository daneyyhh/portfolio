import React, { useState, useEffect } from 'react';
import { Cpu, Wifi, Activity } from 'lucide-react';

const Footer = () => {
    const [ping, setPing] = useState(24);

    // Fake ping fluctuation for "live" feel
    useEffect(() => {
        const interval = setInterval(() => {
            setPing(prev => Math.max(10, Math.min(99, prev + Math.floor(Math.random() * 10) - 5)));
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <footer className="fixed bottom-0 left-0 w-full z-50 bg-black/90 border-t border-cyan-900/50 backdrop-blur-md h-8 flex items-center justify-between px-4 text-[10px] md:text-xs font-mono text-cyan-500/70 select-none">
            {/* Left Status */}
            <div className="flex items-center gap-4">
                <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                    SYSTEM ONLINE
                </span>
                <span className="hidden md:inline text-gray-600">|</span>
                <span className="hidden md:inline">PORTFOLIO v1.0</span>
            </div>

            {/* Center Text (Mobile Hidden) */}
            <div className="hidden md:block opacity-50">
                MADE WITH REACT & UNITY ICONS
            </div>

            {/* Right Metrics */}
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                    <Cpu className="w-3 h-3" />
                    <span>CPU: NORMAL</span>
                </div>
                <div className="flex items-center gap-1.5 min-w-[60px]">
                    <Wifi className="w-3 h-3" />
                    <span>NET: {ping}ms</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
