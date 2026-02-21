import React from 'react';

const Footer = () => (
    <footer className="site-footer">
        <div className="footer-inner">
            {/* Logo */}
            <div style={{ gridColumn: '1', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div className="footer-logo">
                    <span>R</span>EUBEN
                </div>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.15em', color: 'var(--val-faint)', maxWidth: '200px', lineHeight: '1.6' }}>
                    DEVELOPER // GAME CREATOR // FREELANCER
                </p>
            </div>

            {/* Navigation */}
            <div>
                <p className="footer-col-title">Navigate</p>
                <div className="footer-links">
                    <a href="#hero" className="footer-link">Home</a>
                    <a href="#about" className="footer-link">About</a>
                    <a href="#projects" className="footer-link">Projects</a>
                    <a href="#contact" className="footer-link">Contact</a>
                </div>
            </div>

            {/* Projects */}
            <div>
                <p className="footer-col-title">Projects</p>
                <div className="footer-links">
                    <a href="https://github.com/daneyyhh" target="_blank" rel="noopener noreferrer" className="footer-link">FiveM Scripts</a>
                    <a href="https://github.com/daneyyhh" target="_blank" rel="noopener noreferrer" className="footer-link">Unity Games</a>
                    <a href="https://github.com/daneyyhh" target="_blank" rel="noopener noreferrer" className="footer-link">Discord Bots</a>
                </div>
            </div>

            {/* Social */}
            <div>
                <p className="footer-col-title">Follow</p>
                <div className="footer-links">
                    <a href="https://github.com/daneyyhh" target="_blank" rel="noopener noreferrer" className="footer-link">GitHub</a>
                    <a href="mailto:ftreuben1520@gmail.com" className="footer-link">Email</a>
                </div>
            </div>

            {/* Copyright */}
            <div className="footer-copy" style={{ gridColumn: '1 / -1' }}>
                © 2025 Reuben · Built with React · All rights reserved
            </div>
        </div>
    </footer>
);

export default Footer;
