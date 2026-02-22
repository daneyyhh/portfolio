import React from 'react';

const Footer = () => {
    return (
        <footer className="comic-footer" style={{ padding: '80px 20px', background: '#000', color: '#fff', borderTop: '5px solid var(--comic-accent)', textAlign: 'center' }}>
            <div className="footer-inner" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ marginBottom: '40px' }}>
                    <h2 style={{ fontFamily: 'var(--font-accent)', fontSize: '3rem', color: 'var(--comic-accent)', marginBottom: '10px' }}>END OF ISSUE #01</h2>
                    <p style={{ fontFamily: 'var(--font-marker)', fontSize: '1.2rem', color: '#fff' }}>TO BE CONTINUED...</p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginBottom: '30px' }}>
                    <a href="https://github.com/daneyyhh" target="_blank" rel="noopener noreferrer" className="btn-comic" style={{ padding: '8px 20px', fontSize: '0.8rem', background: '#fff' }}>GITHUB</a>
                    <a href="mailto:ftreuben1520@gmail.com" className="btn-comic" style={{ padding: '8px 20px', fontSize: '0.8rem', background: '#fff' }}>SIGNAL (EMAIL)</a>
                </div>

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '30px', opacity: 0.6 }}>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem' }}>
                        DESIGNED BY REUBEN • POWERED BY COMIC-INK • ALL RIGHTS RESERVED © 2026
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
