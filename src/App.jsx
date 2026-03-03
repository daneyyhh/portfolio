import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import DashboardLayout from './components/Layout/DashboardLayout';
import SystemBootLoader from './components/UI/SystemBootLoader';
import NotFound from './components/Sections/NotFound';
import Cursor from './Cursor';

import { useAnimations } from './hooks/useAnimations';

function App() {
    useAnimations();
    const isHome = window.location.pathname === '/' || window.location.pathname === '/index.html';
    const [isLoading, setIsLoading] = useState(isHome);

    return (
        <Router>
            <Cursor />
            <AnimatePresence>
                {isLoading && isHome && (
                    <SystemBootLoader onComplete={() => setIsLoading(false)} />
                )}
            </AnimatePresence>

            {(!isLoading || !isHome) && (
                <Routes>
                    <Route path="/" element={<DashboardLayout />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            )}
        </Router>
    );
}

export default App;
