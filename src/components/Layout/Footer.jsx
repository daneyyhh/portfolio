import React from 'react';

const Footer = () => {
    return (
        <footer className="gp-footer">
            <div className="gp-footer-marquee marquee" aria-hidden="true">
                <div className="marquee-track">
                    <span>Let’s work together •</span><span>Let’s work together •</span><span>Let’s work together •</span><span>Let’s work together •</span>
                    <span>Let’s work together •</span><span>Let’s work together •</span><span>Let’s work together •</span><span>Let’s work together •</span>
                </div>
            </div>
            <div className="container gp-footer-inner">
                <div className="gp-footer-top">
                    <div className="gp-audio">
                        {/* Audio component placeholder */}
                    </div>
                </div>
                <div className="gp-footer-bottom">
                    <div className="gp-mini">Copyright 2026 • All rights reserved (v0.0.16)</div>
                    <div className="gp-footer-links">
                        <a href="https://github.com/daneyyhh" target="_blank" rel="noreferrer">Github</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
