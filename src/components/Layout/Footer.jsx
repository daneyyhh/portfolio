import React from 'react';

const Footer = () => {
    return (
        <footer className="tera-footer" style={{ padding: '60px 20px', background: '#030303', borderTop: '1px solid rgba(255,255,255,0.03)', textAlign: 'center' }}>
            <div className="footer-inner">
                <div style={{ marginBottom: '30px', display: 'flex', justifyContent: 'center', gap: '40px' }}>
                    <a href="https://github.com/daneyyhh" target="_blank" rel="noopener noreferrer" className="val-nav-link" style={{ fontSize: '0.7rem' }}>GITHUB</a>
                    <a href="mailto:ftreuben1520@gmail.com" className="val-nav-link" style={{ fontSize: '0.7rem' }}>EMAIL</a>
                    <a href="#hero" className="val-nav-link" style={{ fontSize: '0.7rem' }}>TOP</a>
                </div>

                <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.6rem', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.3em' }}>
                    © 2026 REUBEN PORTFOLIO • VOID SYSTEMS v5.0 • PROTECTED BY CODE
                </p>

                {/* Minimalist Nexus Style Logo in Footer */}
                <div style={{ marginTop: '30px', opacity: 0.3 }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: '#fff' }}>TERA / DEV</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
