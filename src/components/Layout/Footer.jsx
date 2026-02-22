import React from 'react';

const Footer = () => (
    <footer className="site-footer">
        <div className="section-inner">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', paddingBottom: '60px', textAlign: 'left' }}>
                {/* Brand */}
                <div>
                    <h4 style={{ fontFamily: 'var(--font-title)', fontSize: '2rem', color: '#fff', marginBottom: '15px' }}>REUBEN</h4>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'var(--rdr-muted)', lineHeight: '1.6' }}>
                        Providing digital solutions across the frontier. From FiveM scripts to Unity worlds.
                    </p>
                </div>

                {/* Nav */}
                <div>
                    <h5 className="rdr-label" style={{ fontSize: '0.8rem', marginBottom: '20px' }}>NAVIGATION</h5>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {[['HOME', '#hero'], ['THE OUTLAW', '#about'], ['WANTED', '#projects'], ['TELEGRAPH', '#contact']].map(([l, h]) => (
                            <a key={l} href={h} style={{ fontFamily: 'var(--font-title)', fontSize: '1.2rem', color: 'var(--rdr-muted)', textDecoration: 'none' }}>{l}</a>
                        ))}
                    </div>
                </div>

                {/* Social */}
                <div>
                    <h5 className="rdr-label" style={{ fontSize: '0.8rem', marginBottom: '20px' }}>THE TRAIL</h5>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <a href="https://github.com/daneyyhh" target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--font-title)', fontSize: '1.2rem', color: 'var(--rdr-muted)', textDecoration: 'none' }}>GITHUB</a>
                        <a href="mailto:ftreuben1520@gmail.com" style={{ fontFamily: 'var(--font-title)', fontSize: '1.2rem', color: 'var(--rdr-muted)', textDecoration: 'none' }}>EMAIL</a>
                    </div>
                </div>
            </div>

            <div style={{ borderTop: '1px solid var(--rdr-border)', paddingTop: '30px', textAlign: 'center' }}>
                <p style={{ fontFamily: 'var(--font-typewriter)', fontSize: '0.8rem', color: 'rgba(237, 228, 208, 0.4)' }}>
                    ESTABLISHED 1899 — REUBEN PORTFOLIO v4.0 — ALL RIGHTS RESERVED
                </p>
            </div>
        </div>
    </footer>
);

export default Footer;
