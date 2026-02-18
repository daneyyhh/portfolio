import { useState, useEffect } from 'react';

const SystemTerminal = () => {
    const [text, setText] = useState('');
    const fullText = "SYSTEM ONLINE // CONNECTION SECURE // AWAITING INPUT...";

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setText(fullText.slice(0, i));
            i++;
            if (i > fullText.length) clearInterval(interval);
        }, 50);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm border-t border-cyan-900/50 p-2 hidden md:flex justify-between items-center text-xs font-mono text-cyan-600/80 z-40">
            <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span>{text}<span className="animate-blink">_</span></span>
            </div>
            <div className="flex gap-4">
                <span>MEM: 64TB</span>
                <span>CPU: 12%</span>
                <span>NET: 10Gbps</span>
            </div>
        </div>
    );
};

export default SystemTerminal;
