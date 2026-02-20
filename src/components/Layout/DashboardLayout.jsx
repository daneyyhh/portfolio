import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Hero from '../Sections/Hero';
import About from '../Sections/About';
import Projects from '../Sections/Projects';
import Contact from '../Sections/Contact';

import StickyWrapper from './StickyWrapper';

const DashboardLayout = () => {
    return (
        <div className="bg-void min-h-screen text-ash font-sans selection:bg-ember selection:text-white">
            <Header />

            <main className="relative z-10">
                <StickyWrapper>
                    <Hero />
                    <About />
                    <Projects />
                    <Contact />
                </StickyWrapper>
            </main>

            <Footer />
        </div>
    );
};

export default DashboardLayout;
