import React, { useState, useEffect } from 'react';
// Build: 2026-02-24T07:07:00Z - Triggering redeploy for clock update

const RealTimeClock = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });
    };

    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        }).toUpperCase();
    };

    return (
        <div className="comic-clock">
            <div className="clock-status">
                <span className="live-dot"></span>
                <span className="clock-label">LIVE</span>
            </div>
            <div className="clock-main">
                <span className="clock-date">{formatDate(time)}</span>
                <span className="clock-sep">|</span>
                <span className="clock-time">{formatTime(time)}</span>
            </div>
        </div>
    );
};

export default RealTimeClock;
