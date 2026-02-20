import React, { useLayoutEffect, useRef, useState } from 'react';

const StickyWrapper = ({ children }) => {
    return (
        <div className="relative w-full">
            {React.Children.map(children, (child, index) => (
                <StickyChild index={index}>{child}</StickyChild>
            ))}
        </div>
    );
};

const StickyChild = ({ children, index }) => {
    const ref = useRef(null);
    const [isTall, setIsTall] = useState(false);

    useLayoutEffect(() => {
        if (!ref.current) return;

        const updateHeight = () => {
            // We need to measure the content height, not the container constrained by sticky
            // But the container wraps the content.
            // If sticky is active, offsetHeight might be viewport height? No, sticky doesn't change dimensions, just position.
            const h = ref.current.scrollHeight; // Use scrollHeight to be safe? Or offsetHeight.
            const vh = window.innerHeight;
            // Add a small buffer to avoid flickering near exactly 100vh
            setIsTall(h > vh + 10);
        };

        updateHeight();
        window.addEventListener('resize', updateHeight);
        // Also update on DOM mutations if content loads?
        // A simple timeout for image loading might be wise
        const timer = setTimeout(updateHeight, 1000);
        return () => {
            window.removeEventListener('resize', updateHeight);
            clearTimeout(timer);
        };
    }, []);

    // Logic:
    // If tall (> screen): Stick at BOTTOM (so user scrolls to see bottom, then it sticks)
    // If short (<= screen): Stick at TOP (so it stays centered/top, and gets covered)

    return (
        <div
            ref={ref}
            className="sticky w-full border-t border-white/5 overflow-hidden flex flex-col"
            style={{
                zIndex: index + 1,
                backgroundColor: '#0a0a0a', // bg-void
                position: 'sticky',
                top: isTall ? 'auto' : 0,
                bottom: isTall ? 0 : 'auto',
                minHeight: '100vh'
            }}
        >
            {/* Shadow for depth perception between stacked cards */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/80 to-transparent pointer-events-none z-20" />

            {/* Render the section */}
            <div className="relative z-10 w-full h-full">
                {children}
            </div>
        </div>
    );
}

export default StickyWrapper;
