import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Hero from '../Sections/Hero';
import About from '../Sections/About';
import Projects from '../Sections/Projects';
import Contact from '../Sections/Contact';

const DashboardLayout = () => {
    return (
        <div className="portfolio-wrapper">
            <Header />
            <main>
                <Hero />
                <About />
                <Projects />
                <Contact />
            </main>
            <Footer />
        </div>
    );
};

export default DashboardLayout;
