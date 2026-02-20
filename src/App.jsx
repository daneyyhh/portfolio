import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import DashboardLayout from './components/Layout/DashboardLayout';
import SystemBootLoader from './components/UI/SystemBootLoader';

function App() {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <>
            {/* <AnimatePresence>
                {isLoading && <SystemBootLoader onComplete={() => setIsLoading(false)} />}
            </AnimatePresence> */}
            <DashboardLayout />
        </>
    );
}

export default App;
