import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Hero from '../Sections/Hero';
import About from '../Sections/About';
import Capabilities from '../Sections/Capabilities';
import Projects from '../Sections/Projects';
import Contact from '../Sections/Contact';
import { useAnimations } from '../../hooks/useAnimations';

const DashboardLayout = () => {
    useAnimations();

    return (
        <div className="relative z-10 flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow pt-24">
                <Hero />
                <About />
                <Capabilities />
                <Projects />
                <Contact />
            </main>
            <Footer />
        </div>
    );
};

export default DashboardLayout;
