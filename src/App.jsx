import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeroReveal from './components/Sections/HeroReveal';
import OriginSection from './components/Sections/OriginSection';
import ComicScrollSection from './components/Sections/ComicScrollSection';
import FaceOffSection from './components/Sections/FaceOffSection';
import TransitionCtaSection from './components/Sections/TransitionCtaSection';
import SeoPage from './components/Sections/SeoPage';
import NotFound from './components/Sections/NotFound';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={
                    <>
                        <HeroReveal />
                        <OriginSection />
                        <ComicScrollSection />
                        <FaceOffSection />
                        <TransitionCtaSection />
                    </>
                } />
                <Route path="/seo" element={<SeoPage />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default App;
