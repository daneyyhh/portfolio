import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import './Header.css';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        // Reveal header animation
        gsap.to('.header', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            delay: 0.5,
            visibility: 'visible'
        });
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleNavClick = (e, targetId) => {
        e.preventDefault();
        setIsMenuOpen(false);

        const target = document.querySelector(targetId);
        if (target) {
            gsap.to('#main-content', {
                opacity: 0,
                duration: 0.3,
                onComplete: () => {
                    target.scrollIntoView({ behavior: 'auto' });
                    gsap.to('#main-content', {
                        opacity: 1,
                        duration: 0.5,
                        ease: 'power2.out',
                        delay: 0.1
                    });
                }
            });
        }
    };

    return (
        <header className="header">
            <div className="container nav-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <a href="#" className="logo">REUBEN<span className="dot">_</span></a>

                <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="Toggle Menu">
                    <span className={`hamburger ${isMenuOpen ? 'open' : ''}`}></span>
                </button>

                <nav className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
                    <ul className="nav-links">
                        <li><a href="#" className="nav-item" onClick={(e) => handleNavClick(e, '#root')}>Home</a></li>
                        <li><a href="#about" className="nav-item" onClick={(e) => handleNavClick(e, '#about')}>About Us</a></li>
                        <li><a href="#cases" className="nav-item" onClick={(e) => handleNavClick(e, '#cases')}>Projects</a></li>
                        <li><a href="#articles" className="nav-item" onClick={(e) => handleNavClick(e, '#articles')}>Articles</a></li>
                        <li><a href="#contact" className="nav-item" onClick={(e) => handleNavClick(e, '#contact')}>Talk</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
