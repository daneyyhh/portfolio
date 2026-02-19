import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Hero from '../Sections/Hero';
import About from '../Sections/About';
import Projects from '../Sections/Projects';
import Contact from '../Sections/Contact';
// Articles intentionally omitted to match the specific "Last Oasis" single-page reference flow, or can be added back if requested.

const DashboardLayout = () => {
    return (
        <div className="bg-void min-h-screen text-ash font-sans selection:bg-ember selection:text-white">
            <Header />

            <main className="flex flex-col">
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
