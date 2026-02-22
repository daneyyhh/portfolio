import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Hero from '../Sections/Hero';
import About from '../Sections/About';
import Capabilities from '../Sections/Capabilities';
import ComicStrip from '../Sections/ComicStrip';
import Projects from '../Sections/Projects';
import Contact from '../Sections/Contact';

const DashboardLayout = () => {
    return (
        <div className="portfolio-wrapper">
            <Header />
            <main>
                <Hero />
                <About />
                <Capabilities />
                <ComicStrip />
                <Projects />
                <Contact />
            </main>
            <Footer />
        </div>
    );
};

export default DashboardLayout;
