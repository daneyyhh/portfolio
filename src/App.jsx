import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import DashboardLayout from './components/Layout/DashboardLayout';
import SystemBootLoader from './components/UI/SystemBootLoader';
import Cursor from './Cursor';

function App() {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <>
            <Cursor />
            <AnimatePresence>
                {isLoading && <SystemBootLoader onComplete={() => setIsLoading(false)} />}
            </AnimatePresence>
            {!isLoading && <DashboardLayout />}
        </>
    );
}

export default App;
