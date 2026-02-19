import React, { useState } from 'react';
import DashboardLayout from './components/Layout/DashboardLayout';
import CinematicLoader from './components/UI/CinematicLoader';

function App() {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <>
            {isLoading && <CinematicLoader onComplete={() => setIsLoading(false)} />}
            {!isLoading && <DashboardLayout />}
        </>
    );
}

export default App;
