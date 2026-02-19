import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Hero from '../Sections/Hero';
import About from '../Sections/About';
import Projects from '../Sections/Projects';
import Articles from '../Sections/Articles';
import Contact from '../Sections/Contact';

const DashboardLayout = () => {
    return (
        <div className="bg-black min-h-screen text-cyan-50 font-sans selection:bg-cyan-500/30 pb-10">
            <Header />

            <main className="flex flex-col">
                <Hero />
                <About />
                <Projects />
                <Articles />
                <Contact />
            </main>

            <Footer />
        </div>
    );
};

export default DashboardLayout;
