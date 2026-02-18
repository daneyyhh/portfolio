import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

const Loader = ({ onComplete }) => {
    const loaderRef = useRef(null);
    const progressRef = useRef(null);
    const textRef = useRef(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                gsap.to(loaderRef.current, {
                    opacity: 0,
                    duration: 0.5,
                    onComplete: () => {
                        if (loaderRef.current) loaderRef.current.style.display = 'none';
                        if (onComplete) onComplete();
                    }
                });
            }
        });

        // Simulate loading progress
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                // Random increment
                return Math.min(prev + Math.floor(Math.random() * 10) + 1, 100);
            });
        }, 150);

        return () => clearInterval(interval);
    }, [onComplete]);

    // Update width based on state
    useEffect(() => {
        if (progressRef.current) {
            progressRef.current.style.width = `${progress}%`;
        }
    }, [progress]);

    return (
        <div ref={loaderRef} className="loader-overlay">
            <div className="loader-content">
                <div className="loader-text" ref={textRef}>
                    INITIALIZING SYSTEM... {progress}%
                </div>
                <div className="loader-bar-container">
                    <div ref={progressRef} className="loader-bar-fill"></div>
                </div>
                <div className="loader-status">
                    {progress > 20 && <div className="status-item">Loading Core Modules...</div>}
                    {progress > 50 && <div className="status-item">Initializing 3D Environment...</div>}
                    {progress > 80 && <div className="status-item">Accessing Neural Interface...</div>}
                </div>
            </div>
        </div>
    );
};

export default Loader;
